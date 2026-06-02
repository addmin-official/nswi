package main

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// -------------------------------------------------------------
// STRUCTS, SCHEMAS & INPUT VALIDATION (UTF-8 COMPLIANT)
// -------------------------------------------------------------

type DeclarationStatus string

const (
	StatusSubmitted         DeclarationStatus = "SUBMITTED"
	StatusPendingInspection DeclarationStatus = "PENDING_INSPECTION"
	StatusCleared           DeclarationStatus = "CLEARED"
	StatusRejected          DeclarationStatus = "REJECTED"
)

type DeclarationItem struct {
	HSCode       string  `json:"hs_code" binding:"required"`       // e.g. "8703.23.19"
	Description  string  `json:"description_ar" binding:"required"` // Arabic/Kurdish goods description
	Quantity     float64 `json:"quantity" binding:"required,gt=0"`
	UnitOfMeasure string `json:"unit_of_measure" binding:"required"` // e.g. "KGM", "PCE"
	InvoiceValue float64 `json:"invoice_value" binding:"required,gt=0"`
}

type DeclarationRequest struct {
	DeclarationNumber string            `json:"declaration_number" binding:"required"` // e.g., "IQ20260001234"
	Type             string            `json:"type" binding:"required,oneof=IMPORT EXPORT"`
	TraderID         string            `json:"trader_id" binding:"required"`
	OriginCountry    string            `json:"origin_country" binding:"required,len=2"`
	DestinationPort  string            `json:"destination_port" binding:"required"` // e.g., "UMQASSAR"
	Currency         string            `json:"currency" binding:"required,oneof=IQD USD EUR"`
	TotalInvoiceValue float64          `json:"total_value_usd" binding:"required,gt=0"`
	Goods            []DeclarationItem `json:"goods" binding:"required,dive"`
}

type DeclarationResponse struct {
	Status                  DeclarationStatus `json:"status"`
	DeclarationID           string            `json:"declaration_id"`
	EstimatedClearanceHours int               `json:"estimated_clearance_hours"`
	RequiredDocuments       []string          `json:"required_documents"`
	IntegrityStamp          string            `json:"integrity_stamp"`
	CreatedAt               time.Time         `json:"created_at"`
}

// -------------------------------------------------------------
// CONNECTION POOL SIMULATION (PROD LEVEL CONFIG)
// -------------------------------------------------------------

type DbConnPool struct {
	mu          sync.Mutex
	ActiveCount int
	MaxConns    int
}

func NewDbConnPool(maxConns int) *DbConnPool {
	return &DbConnPool{
		MaxConns: maxConns,
	}
}

func (p *DbConnPool) Acquire() error {
	p.mu.Lock()
	defer p.mu.Unlock()
	if p.ActiveCount >= p.MaxConns {
		return errors.New("database connection pool exhausted (max conns: 50)")
	}
	p.ActiveCount++
	return nil
}

func (p *DbConnPool) Release() {
	p.mu.Lock()
	defer p.mu.Unlock()
	if p.ActiveCount > 0 {
		p.ActiveCount--
	}
}

// -------------------------------------------------------------
// MIDDLEWARE: SECURITY - JWT VERIFICATION
// -------------------------------------------------------------

type CustomClaims struct {
	UserID       string `json:"user_id"`
	MinistryCode string `json:"ministry_code"`
	Role         string `json:"role"`
	jwt.RegisteredClaims
}

func JWTAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing", "code": "AUTH_REQUIRED"})
			c.Abort()
			return
		}

		// Typically would verify against a secret (e.g. env.JWT_SECRET)
		// Simulating validation for presentation:
		if len(authHeader) < 7 || authHeader[:7] != "Bearer " {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format", "code": "AUTH_INVALID_FORMAT"})
			c.Abort()
			return
		}

		tokenString := authHeader[7:]
		// For mock execution, bypass or simulate decryptions
		claims := &CustomClaims{
			UserID:       "usr_iraqi_customs_12",
			MinistryCode: "MOF-CUSTOMS-BG",
			Role:         "AUDITOR",
		}
		
		c.Set("claims", claims)
		c.Set("user_id", claims.UserID)
		c.Set("ministry_code", claims.MinistryCode)

		c.Next()
	}
}

// -------------------------------------------------------------
// MIDDLEWARE: RATE LIMITER
// -------------------------------------------------------------

type SimpleRateLimiter struct {
	mu       sync.Mutex
	limit    int
	requests map[string]int
}

func NewSimpleRateLimiter(limit int) *SimpleRateLimiter {
	rl := &SimpleRateLimiter{
		limit:    limit,
		requests: make(map[string]int),
	}
	// background cleanup
	go func() {
		for {
			time.Sleep(1 * time.Minute)
			rl.mu.Lock()
			rl.requests = make(map[string]int) // clear count every minute
			rl.mu.Unlock()
		}
	}()
	return rl
}

func (rl *SimpleRateLimiter) LimitMiddleware(limiter *SimpleRateLimiter) gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()
		limiter.mu.Lock()
		count := limiter.requests[ip]
		if count >= limiter.limit {
			limiter.mu.Unlock()
			c.JSON(http.StatusTooManyRequests, gin.H{
				"error":      "Rate limit exceeded (100 requests per minute).",
				"retry_after": "60s",
				"code":       "RATE_LIMIT_EXCEEDED",
			})
			c.Abort()
			return
		}
		limiter.requests[ip] = count + 1
		limiter.mu.Unlock()
		c.Next()
	}
}

// -------------------------------------------------------------
// MAIN CONTROLLER ENTRY POINT
// -------------------------------------------------------------

type CustomsDeclarationController struct {
	pool    *DbConnPool
	limiter *SimpleRateLimiter
}

func NewCustomsDeclarationController() *CustomsDeclarationController {
	return &CustomsDeclarationController{
		pool:    NewDbConnPool(50),
		limiter: NewSimpleRateLimiter(100),
	}
}

func (ctrl *CustomsDeclarationController) CreateDeclaration(c *gin.Context) {
	// 1. Structured log initializing (Cloud Logging format)
	ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
	defer cancel()

	logPayload := map[string]interface{}{
		"severity":   "INFO",
		"timestamp":  time.Now().UTC().Format(time.RFC3339),
		"message":    "Received request to submit new Single Administrative Document (SAD)",
		"client_ip":  c.ClientIP(),
		"user_agent": c.Request.UserAgent(),
	}
	jsonLog, _ := json.Marshal(logPayload)
	fmt.Println(string(jsonLog))

	// Acquire DB Connection from pool
	if err := ctrl.pool.Acquire(); err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"error": "Ministry Database node connection timed out (Acquire error)",
			"code":  "CONN_POOL_EXHAUSTED",
		})
		return
	}
	defer ctrl.pool.Release()

	// 2. Body Payload Bind and Validate
	var req DeclarationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   "Payload validation failed",
			"details": err.Error(),
			"code":    "FIELD_VALIDATION_ERROR",
		})
		return
	}

	// 3. System Computations (CBI Dinars conversion & cryptographic seal)
	exchangeRateToIQD := 1310.000 // Frozen CBI legal Rate of Exchange for 2026
	convertedValueIQD := req.TotalInvoiceValue * exchangeRateToIQD

	// Calculate cryptographic integrity seal to prevent subsequent database tampering
	payloadString := fmt.Sprintf("%s|%s|%s|%.4f", req.DeclarationNumber, req.TraderID, req.DestinationPort, req.TotalInvoiceValue)
	hash := sha256.New()
	hash.Write([]byte(payloadString))
	integrityStamp := hex.EncodeToString(hash.Sum(nil))

	// Determine required compliance clearing paths based on country and port
	requiredDocs := []string{"commercial_invoice", "packing_list", "certificate_of_origin"}
	if req.OriginCountry != "IQ" {
		requiredDocs = append(requiredDocs, "ministry_of_health_quarantine_signoff")
		requiredDocs = append(requiredDocs, "cosqc_quality_conformance_certificate")
	}

	// Dynamic estimated hours calculation
	estimatedHours := 48
	if req.DestinationPort == "UMQASSAR" {
		estimatedHours = 36 // Express clearance priorities at deep seaport
	}

	// Simulate latency
	select {
	case <-ctx.Done():
		c.JSON(http.StatusGatewayTimeout, gin.H{"error": "Transaction cancelled due to timeout"})
		return
	case <-time.After(150 * time.Millisecond): // simulated cloud network delay
	}

	// 4. Respond with verified audit schema payload
	response := DeclarationResponse{
		Status:                  StatusSubmitted,
		DeclarationID:           fmt.Sprintf("dec_%s_%x", req.DestinationPort[:3], time.Now().Unix()%100000),
		EstimatedClearanceHours: estimatedHours,
		RequiredDocuments:       requiredDocs,
		IntegrityStamp:          integrityStamp,
		CreatedAt:               time.Now().UTC(),
	}

	// Structured Audit Success Log
	auditPayload := map[string]interface{}{
		"severity":           "NOTICE",
		"timestamp":          time.Now().UTC().Format(time.RFC3339),
		"action":             "DECLARATION_CREATED",
		"ref_number":         req.DeclarationNumber,
		"value_usd":          req.TotalInvoiceValue,
		"converted_val_iqd":  convertedValueIQD,
		"integrity_seal":     integrityStamp,
		"assigned_operator": c.GetString("user_id"),
	}
	jsonAudit, _ := json.Marshal(auditPayload)
	fmt.Println(string(jsonAudit))

	c.JSON(http.StatusCreated, response)
}

func (ctrl *CustomsDeclarationController) HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"service": "customs_declaration_service",
		"status":  "healthy",
		"db_pool": gin.H{
			"active_conns": ctrl.pool.ActiveCount,
			"max_conns":    ctrl.pool.MaxConns,
		},
		"version": "v1.2.0-SOVEREIGN",
	})
}

// -------------------------------------------------------------
// ENGINE STARTPOINT & ROUTING
// -------------------------------------------------------------

func main() {
	// Cloud native configuration overrides
	gin.SetMode(gin.ReleaseMode)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r := gin.New()
	r.Use(gin.Recovery())

	// Static health router
	ctrl := NewCustomsDeclarationController()
	r.GET("/health", ctrl.HealthCheck)

	// API Versioning
	v1 := r.Group("/api/v1")
	{
		v1.Use(JWTAuthMiddleware())
		v1.Use(ctrl.limiter.LimitMiddleware(ctrl.limiter))
		v1.POST("/declarations", ctrl.CreateDeclaration)
	}

	log.Printf("[SOVEREIGN LOGGING] Customs Declaration Microservice running on host 0.0.0.0 port %s", port)
	if err := r.Run("0.0.0.0:" + port); err != nil {
		log.Fatalf("Fatal service start failure: %v", err)
	}
}
