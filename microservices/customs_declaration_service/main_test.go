package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

// Unit tests for the Database pool and Acquire limits
func TestDbConnPool_AcquireRelease(t *testing.T) {
	pool := NewDbConnPool(2)

	// Acquire 1st connection
	err := pool.Acquire()
	if err != nil {
		t.Fatalf("Expected acquire to succeed, got: %v", err)
	}

	// Acquire 2nd connection
	err = pool.Acquire()
	if err != nil {
		t.Fatalf("Expected second acquire to succeed, got: %v", err)
	}

	// Try acquiring 3rd connection (should fail as capacity is 2)
	err = pool.Acquire()
	if err == nil {
		t.Fatal("Expected acquire to fail due to pool exhaust, but it succeeded")
	}

	// Release 1 connection and re-acquire (should work)
	pool.Release()
	err = pool.Acquire()
	if err != nil {
		t.Fatalf("Expected acquire to succeed after release, got: %v", err)
	}
}

// Unit test verifying the API /health routing endpoint
func TestHealthCheckEndpoint(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()

	ctrl := NewCustomsDeclarationController()
	r.GET("/health", ctrl.HealthCheck)

	// Build request recorder
	req, _ := http.NewRequest("GET", "/health", nil)
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status OK (200), got: %d", w.Code)
	}

	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		t.Fatalf("Failed to parse health endpoint JSON: %v", err)
	}

	if response["status"] != "healthy" {
		t.Errorf("Expected status to be 'healthy', got: %v", response["status"])
	}
}

// Unit test verifying payload schema validation and rejection
func TestCreateDeclaration_InvalidPayload(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.New()

	ctrl := NewCustomsDeclarationController()
	// Exclude JWT middleware to isolate payload validations
	r.POST("/api/v1/declarations", ctrl.CreateDeclaration)

	// Incomplete input (missing total value and HSCode elements)
	invalidJSON := []byte(`{
		"declaration_number": "IQ2026111",
		"type": "IMPORT",
		"trader_id": "trader_baghdad_99"
	}`)

	req, _ := http.NewRequest("POST", "/api/v1/declarations", bytes.NewBuffer(invalidJSON))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	r.ServeHTTP(w, req)

	// Should reject with status 400 Bad Request
	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected bad request status 400, got: %d", w.Code)
	}

	var jsonResponse map[string]interface{}
	_ = json.Unmarshal(w.Body.Bytes(), &jsonResponse)

	if jsonResponse["code"] != "FIELD_VALIDATION_ERROR" {
		t.Errorf("Expected error code to be FIELD_VALIDATION_ERROR, got: %v", jsonResponse["code"])
	}
}
