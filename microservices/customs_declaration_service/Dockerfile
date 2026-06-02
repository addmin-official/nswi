# -------------------------------------------------------------
# STAGE 1: SECURE BASE COMPILE BUILD ENVIRONMENT
# -------------------------------------------------------------
FROM golang:1.22-alpine AS builder

# Set default secure system environment variables
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /build

# Pre-fetch dependencies safely to optimize docker layer caching
COPY go.mod go.sum ./
RUN go mod download

# Copy the actual source code
COPY . .

# Build hardened static application binary stripping debug headers
RUN go build \
    -ldflags="-s -w" \
    -o customs_declaration_service \
    main.go

# -------------------------------------------------------------
# STAGE 2: HIGH-HARDENED, RUNTIME SYSTEM WITHOUT OS LIBRARIES
# -------------------------------------------------------------
FROM gcr.io/distroless/static-debian12:latest-amd64

# Maintain high sovereign security metadata controls
LABEL maintainer="Iraq NSW Data Security Team <security.idg@gov.iq>"
LABEL security.audit="ISO-27001-COMPLIANT"

WORKDIR /app

# Copy compiled minimal binary from builder stage
COPY --from=builder /build/customs_declaration_service .

# Secure environment configurations
ENV PORT=8080 \
    GIN_MODE=release

EXPOSE 8080

# Distroless runs as non-root (nobody:999) automatically by default
USER 999:999

ENTRYPOINT ["./customs_declaration_service"]
