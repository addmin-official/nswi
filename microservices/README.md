# Iraq National Single Window for Trade — Backend Microservices Core

This directory contains the production-ready codebases, Dockerfiles, and Kubernetes (K8s/Istio) deployment manifests for the 6 core microservices powering Iraq's National Single Window (NSW) for Trade.

Designed under a **Sovereign Multi-Region Hybrid Architecture**, these services integrate relational financial ledgers with semi-structured compliance workflows and high-performance GPS streams.

---

## 🏗️ Architectural Core Checklist & Stack

- **Languages**: 
  - **Go (Golang v1.22)** for performance-critical engines (Customs, Payments, Logistics)
  - **Python v3.11 with FastAPI/SQLAlchemy** for AI-driven and data-focused engines (Document OCR, Reporting & Metrics)
- **High-Performance Communication**:
  - `gRPC` with Protocol Buffers for high-speed, low-latency internal service-to-service communication.
  - `REST JSON` with OpenAPI/Swagger for external agency/broker integration.
- **Message Broker**: GCP Cloud Pub/Sub with local fallback emulator capability.
- **Relational Ledger Key**: Cloud Spanner utilizing pgAgent interface with active connection pooling.
- **Containerization**: Multi-stage Docker files reducing attack surface and cold starts.
- **Orchestration**: Kubernetes with GitOps configs and Istio VirtualServices for mutual TLS (mTLS) enforcement.

---

## 📁 Repository Structure

```tree
/microservices
├── README.md                                    # Architectural specification manual
├── customs_declaration_service/                 # Go (SAD Customs processing)
│   ├── main.go                                  # Go / Gin router, JWT verification, rate limiting
│   ├── Dockerfile                               # Multi-stage security profile
│   └── deployment.yaml                          # GKE & Istio VirtualService manifests
├── document_verification_service/               # Python (FastAPI with OCR capabilities)
│   ├── main.py                                  # Document AI model parsing, security verification
│   ├── Dockerfile                               # Python slim image with PyMuPDF
│   └── deployment.yaml                          # GKE resources
├── payment_integration_service/                 # Go (CBI RTGS & ISO 20022 parser)
│   ├── main.go                                  # pacs.008 message ledger reconciliation
│   ├── Dockerfile                               # Scratch-based execution image
│   └── deployment.yaml                          # Payment network ingress controls
├── logistics_tracking_service/                  # Go (IoT Telemetry stream ingest)
│   ├── main.go                                  # Real-time GPS coordinates checker
│   ├── Dockerfile                               # Minimal distroless run
│   └── deployment.yaml                          # Edge gateway GKE config
├── notification_service/                        # Python (SMS & Push notifications)
│   ├── main.py                                  # Arabic/Kurdish templated notification router
│   ├── Dockerfile
│   └── deployment.yaml
└── reporting_service/                           # Python (BigQuery analytics aggregations)
    ├── main.py                                  # Compliance auditing exporter
    ├── Dockerfile
    └── deployment.yaml
```

---

## ⚡ Setup & Local Development Run

Ensure you have Go 1.22+ and Python 3.11+ installed.

### Running Go Services (e.g., Customs Declaration)
```bash
cd customs_declaration_service
go mod init customs_declaration_service
go get github.com/gin-gonic/gin github.com/grpc/grpc-go github.com/golang-jwt/jwt/v5
go run main.go
```

### Running Python Services (e.g., Document Verification)
```bash
cd document_verification_service
pip install fastapi uvicorn pydantic requests
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 🐳 Docker Container Compilation
To build a secure, hardened container for production:
```bash
docker build -t gcr.io/iraq-nsw/customs-declaration:v1 . --no-cache
docker run -d -p 8080:8080 -e DB_POOL_MAX=50 -e JWT_SECRET=iraq-sovereign-key gcr.io/iraq-nsw/customs-declaration:v1
```

---

## ☸️ Kubernetes (GKE) GitOps Automated CD
Deploy all services to the cluster under the `iraq-nsw` namespace:
```bash
kubectl apply -f customs_declaration_service/deployment.yaml
# Ensure mutual TLS is active through Istio
kubectl get peerauthentication -n iraq-nsw
```
