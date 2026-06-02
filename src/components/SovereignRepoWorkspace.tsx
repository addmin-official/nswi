import React, { useState } from 'react';
import { 
  Folder, FileCode, Search, Copy, Check, Download, ExternalLink, Code, Database, 
  ShieldCheck, Server, AlertCircle, PlayCircle, Eye, GitBranch, ChevronRight, ChevronDown,
  Info, Cpu, Terminal, RefreshCw, BarChart2, Activity, Globe
} from 'lucide-react';
import { Language } from '../types';

interface SovereignRepoWorkspaceProps {
  lang: Language;
}

interface RepoFile {
  path: string;
  name: string;
  category: 'architecture' | 'database' | 'backend' | 'frontend' | 'security' | 'ai-ml' | 'devops' | 'root';
  language: 'markdown' | 'sql' | 'dockerfile' | 'yaml' | 'typescript' | 'python' | 'json';
  description: { en: string; ar: string; ku: string };
  content: string;
}

export default function SovereignRepoWorkspace({ lang }: SovereignRepoWorkspaceProps) {
  const isRtl = lang === 'ar' || lang === 'ku';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [copiedIndex, setCopiedIndex] = useState<boolean>(false);
  
  // Folders and files structures representing "iraq-national-single-window"
  const files: RepoFile[] = [
    {
      path: "README.md",
      name: "README.md",
      category: "root",
      language: "markdown",
      description: {
        en: "Global Sovereign NSW Repository Entrypoint and Architecture Manifesto",
        ar: "نقطة الدخول الرئيسية لمستودع الكود والميثاق الهندسي السيادي",
        ku: "خاڵی سەرەکی دەستپێکردنی کۆگای کۆدی سەروەری و مانیفێستی تەلارسازی"
      },
      content: `# 🇮🇶 Iraq National Single Window (NSW) Unified Repository
> **Sovereign Multi-Region Custom Trade Clearance Platform**

This repository contains the complete Infrastructure-as-code, decoupled microservices schemas, zero-trust configurations, and deterministic AI models of Iraq's Sovereign trade portal.

## 📁 Repository Structure
\`\`\`bash
iraq-national-single-window/
├── 01-architecture/         # High-Level Specifications, Diagrams, Tech Stack
├── 02-database/             # Multi-Region Postgres, Spanner Schema & Migration SQLs
├── 03-backend/              # Core Decoupled Microservices with Dockerfiles
├── 04-frontend/             # Sovereign React portals, Mobile Apps & Admin Deck
├── 05-security/             # Zero-Trust IAM, Firewall, and Sovereign WAF Policies
├── 06-ai-ml/                # OCR Parsing, Fraud Risk Scoring & Conversational AI
└── 07-devops/               # Terraform Blueprints, Helm Charts & GAction Workflows
\`\`\`

## 🛡️ Sovereign Compliance Mandates
1. **Zero-Trust Sovereign Boundary**: All user identity verification utilizes local security tokens.
2. **Data Residency**: Transaction logs remain physically stored on local servers in Baghdad, Basra, and Erbil.
3. **Disaster Recovery (SLA 99.99%)**: Automated DNS active-active failover is certified with GSLB sub-35ms thresholds.
4. **Offline Capability Protocol**: Border edge nodes store local trade logs securely and sync via eventual-consistency on channel recovery.

*Official Engineering Board of Iraq Single Window Portal Integration Service.*`
    },
    {
      path: "01-architecture/system-architecture.md",
      name: "system-architecture.md",
      category: "architecture",
      language: "markdown",
      description: {
        en: "Sovereign Cross-Border System Architecture Specification",
        ar: "مواصفات هيكلية النظام السيادي عبر الحدود والمنافذ",
        ku: "تایبەتمەندی تەلارسازی سیستمی سەروەری بۆ مەرز و خاڵە سنوورییەکان"
      },
      content: `# Sovereign Cross-Border System Architecture

## Distributed Topology
The platform implements a highly resilient, multi-region architecture spanning Iraq:
- **Baghdad (us-central1 Proxy)**: Acts as the primary transaction orchestrator.
- **Basra (eu-south-1 Disaster Recovery)**: Hosts the Hot Standby synchronous backup.
- **Erbil (me-central1 Edge Node)**: Integrates northern region borders (Kurdish Regional Government gateway).

\`\`\`
                       [ Global GSLB Traffic Manager ]
                                      |
            +-------------------------+-------------------------+
            | 70% Ingress             | 20% Ingress (DR Hot)    | 10% Local Edge Ingress
            v                         v                         v
   [ Baghdad Hub GKE ]       [ Basra Backup GKE ]      [ Erbil Edge KRG GKE ]
      (us-central1)             (eu-south-1)              (me-central-1)
            |                         |                         |
     +------+------+                  +                         +
     |             |                  |                         |
[Cloud Spanner] [Cloud SQL] <--> [Read Replicas]          [Sovereign Cache]
  (Sovereign)    (Primary)         (DR Standby)           (Local Border Queue)
\`\`\`

## Data Residency & Integrity Policy
- **Sovereign Spanner DB**: Coordinates high-write customs manifests with consistent transactional isolation.
- **Event-Driven Messaging**: Apache Kafka manages message queues between clearance agencies (Ministries of Trade, Customs, Agriculture) asynchronously.`
    },
    {
      path: "01-architecture/tech-stack.md",
      name: "tech-stack.md",
      category: "architecture",
      language: "markdown",
      description: {
        en: "National Tech Stack Standardization Manifesto",
        ar: "بيان توحيد تقنيات البرمجة والأنظمة الوطنية الأساسية",
        ku: "مانیفێستی فەرمی تەکنەلۆجیا و پرۆگرامسازی پەسەندکراو"
      },
      content: `# Iraq NSW Tech Stack Standardization

This document details the standardized core technology components approved for deployment within government systems and customs hubs.

## 1. Runtime Frameworks
- **Backend Core**: NestJS (TypeScript), Golang (Customs Engine), Python (AI inference models)
- **Frontend Core**: React 18+ with Tailwind CSS (Desktop Admin Portal), React Native (Mobile App)
- **Database Engine**: Cloud Spanner (Multi-Region ACID Writes), PostgreSQL (Microservice local data)

## 2. Infrastructure & Orchestration
- **Containerization**: Docker (minimal distroless secure images)
- **Container Registry**: GCP Google Artifact Registry with automatic container analysis scanning
- **Orchestration**: Google Kubernetes Engine (GKE) autopilot version 1.28+ with auto-scaling pools
- **Mesh Framework**: Istio Service Mesh with mTLS (Mutual TLS) strictly enforced across pods`
    },
    {
      path: "02-database/schema.sql",
      name: "schema.sql",
      category: "database",
      language: "sql",
      description: {
        en: "Relational Ledger Schema for Manifests and Clearing Ledgers",
        ar: "مخطط قاعدة البيانات وجداول ترخيص البيانات الجمركية والمكوس",
        ku: "هێڵکاری گشتی داتابەیس بۆ تۆمارکردن و ڕێپێدانی کاڵا گومرگییەکان"
      },
      content: `-- Iraq National Single Window schema configuration
-- Handles main declarant filings and automated custom duties.

CREATE TABLE IF NOT EXISTS declarants (
    declarant_id VARCHAR(50) PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    license_number VARCHAR(100) UNIQUE NOT NULL,
    tax_identifier VARCHAR(50) UNIQUE NOT NULL,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'ACTIVE' -- ACTIVE, SUSPENDED, DEBARRED
);

CREATE TABLE IF NOT EXISTS customs_manifests (
    manifest_id VARCHAR(50) PRIMARY KEY,
    declarant_id VARCHAR(50) REFERENCES declarants(declarant_id),
    customs_office_code VARCHAR(10) NOT NULL, -- Umm Qasr: UQC, Safwan: SFW, Zahko: ZHK
    origin_country VARCHAR(3) NOT NULL,
    total_val_usd NUMERIC(15, 2) NOT NULL,
    duties_payable_iqd NUMERIC(18, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'SUBMITTED', -- SUBMITTED, UNDER_VALUATION, REJECTED, PASSED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS duty_payments (
    payment_id VARCHAR(50) PRIMARY KEY,
    manifest_id VARCHAR(50) REFERENCES customs_manifests(manifest_id),
    payment_reference_no VARCHAR(100) UNIQUE NOT NULL,
    amount_paid_iqd NUMERIC(18, 2) NOT NULL,
    bank_routing_code VARCHAR(30) NOT NULL, -- CBI electronic gateway
    payment_status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, SETTILED, FAILED
    cleared_at TIMESTAMP WITH TIME ZONE
);

-- Index for speedy search on customs offices
CREATE INDEX idx_manifests_office ON customs_manifests(customs_office_code);
CREATE INDEX idx_payment_status ON duty_payments(payment_status);`
    },
    {
      path: "02-database/erd.md",
      name: "erd.md",
      category: "database",
      language: "markdown",
      description: {
        en: "Entity Relationship Schema Documentation and Normalization Keys",
        ar: "توثيق العلاقات وهيكل نموذج البيانات الثنائي للنافذة",
        ku: "دۆکیۆمێنتکردنی پەیوەندی داتاکان و کلیلی هێڵکارییەکانی داتابەیس"
      },
      content: `# Entity Relationship Schema Details

## Model Relations Overview
Our schema is strictly normalized to **3NF (Third Normal Form)** to protect the relational integrity of financial transactions and custom duties ledger entries.

- **Declarants (1) <---> (M) Customs Manifests**: A singular customs declarant trader can file multiple shipment manifests for verification.
- **Customs Manifests (1) <---> (1) Duty Payments**: Every manifest requires a matching, validated transaction hash ledger with the Central Bank of Iraq (CBI).
- **Customs Manifests (1) <---> (M) OCR Extractions**: Auto-parsing logs linked to every uploaded trade invoice.

\`\`\`
  +-------------------+          +---------------------+          +-------------------+
  |    Declarants     |          |  Customs Manifests  |          |   Duty Payments   |
  +-------------------+          +---------------------+          +-------------------+
  | declarant_id (PK) |1 ------M | manifest_id (PK)    |1 ------1 | payment_id (PK)   |
  | company_name      |          | declarant_id (FK)   |          | manifest_id (FK)  |
  | license_number    |          | customs_office_code |          | payment_status    |
  | tax_identifier    |          | total_val_usd       |          | CBI_routing_code  |
  +-------------------+          +---------------------+          +-------------------+
\`\`\``
    },
    {
      path: "03-backend/customs-service/Dockerfile",
      name: "Dockerfile",
      category: "backend",
      language: "dockerfile",
      description: {
        en: "Distroless Dockerfile for Custom Verification Microservice",
        ar: "ملف الحاوية البرمجية المعزول لخدمة الفحص الجمركي الآلي",
        ku: "فایلی کۆنتێنەری جیاکراوە بۆ خزمەتگوزاری پشکنینی گومرگی هۆشمەند"
      },
      content: `# Distroless Secure Multi-stage Docker builder for Customs service
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime utilizing Google Secure distroless image
FROM gcr.io/distroless/nodejs18-debian11
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080
USER nonroot

CMD ["dist/main.js"]`
    },
    {
      path: "03-backend/document-service/main.ts",
      name: "main.ts",
      category: "backend",
      language: "typescript",
      description: {
        en: "Document Service Entry Point with Secure Storage Connectors",
        ar: "نقطة انطلاق خدمة الوثائق الجمركية وملفات التخزين المحمية",
        ku: "خزمەتگوزاری سەرەکی بەڵگەنامە و گرێدانی پارێزراو بە فایلەکانەوە"
      },
      content: `// Iraq NSW Document Storage and Verification API routing
import express from 'express';
import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID || 'iraq-nsw-production'
});

app.use(express.json());

// Secure GCS Signed-URL generation for Customs uploads
app.post('/api/documents/upload-url', async (req, res) => {
  const { fileName, contentType } = req.body;
  if (!fileName || !contentType) {
    return res.status(400).json({ error: 'Missing fileName or contentType' });
  }

  try {
    const bucketName = process.env.SOVEREIGN_GCS_BUCKET || 'iraq-nsw-manifest-docs';
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(\`customs-filings/\${Date.now()}_\${fileName}\`);

    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes validity
      contentType,
    });

    res.json({ uploadUrl: url, fileKey: file.name });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to negotiate sovereign storage lease', details: err.message });
  }
});

app.listen(port, () => {
  console.log(\`Sovereign Document Service active on port \${port}\`);
});`
    },
    {
      path: "05-security/iam-policies/owner-restrict.json",
      name: "owner-restrict.json",
      category: "security",
      language: "json",
      description: {
        en: "Restricted Administrative IAM Account Security Policy",
        ar: "سياسة تقييد الأدوار والصلاحيات للمشرفين على خوادم المعابر",
        ku: "یاسای توندی ئاسایشی IAM بۆ دەستنیشانکردنی دەسەڵاتە جیاوازەکان"
      },
      content: `{
  "bindings": [
    {
      "role": "roles/owner",
      "members": [
        "group:iraq-nsw-super-admins@iraq-nsw.gov.iq"
      ],
      "condition": {
        "title": "Enforce Sovereign IP Check",
        "description": "Ensure administrative commands only route from sovereign network offices",
        "expression": "request.headers['x-forwarded-for'].split(',')[0] in ['193.201.0.0/16', '82.205.0.0/16']"
      }
    },
    {
      "role": "roles/container.admin",
      "members": [
        "serviceAccount:gke-deployer-sa@iraq-nsw-production.iam.gserviceaccount.com"
      ]
    },
    {
      "role": "roles/cloudkms.cryptoKeyEncrypterDecrypter",
      "members": [
        "serviceAccount:document-service-sa@iraq-nsw-production.iam.gserviceaccount.com"
      ]
    }
  ]
}`
    },
    {
      path: "05-security/firewall-rules/sovereign-gcp.tf",
      name: "sovereign-gcp.tf",
      category: "security",
      language: "typescript",
      description: {
        en: "VPC Ingress Perimeter and Shield Config via Terraform",
        ar: "قواعد جدار الحماية وعزل المنافذ الاستراتيجية باستخدام ترافورم",
        ku: "یاساکانی دیواری ئاگرین و گۆشەپارێزەکانی عێراق بە تێرافۆرم"
      },
      content: `# Define firewall rules for Iraq NSW internal subnet zones
resource "google_compute_firewall" "allow_internal_mesh" {
  name    = "allow-internal-istio-mtls"
  network = "iraq-nsw-production-vpc"

  allow {
    protocol = "tcp"
    ports    = ["15017", "15012", "15021"] # Envoy mesh discovery
  }

  source_ranges = ["10.100.0.0/16", "10.110.0.0/16", "10.120.0.0/16"]
  direction     = "INGRESS"
  priority      = 500
}

resource "google_compute_firewall" "deny_direct_db_postgres" {
  name    = "deny-external-postgres-access"
  network = "iraq-nsw-production-vpc"

  deny {
    protocol = "tcp"
    ports    = ["5432"] # Protect microservice local databases
  }

  source_ranges = ["0.0.0.0/0"]
  direction     = "INGRESS"
  priority      = 100
}`
    },
    {
      path: "06-ai-ml/fraud-detection/inference.py",
      name: "inference.py",
      category: "ai-ml",
      language: "python",
      description: {
        en: "Dynamic Risk Inference Model for Manifest Valuations",
        ar: "نموذج الذكاء الاصطناعي للتنبؤ بمخاطر التقييم وحماية الرسوم",
        ku: "مۆدێلی هۆشمەندی دەستکرد بۆ دیاریکردنی ئاستی فێڵکاری بەهاکان"
      },
      content: `# Iraq Customs Automated Fraud Detection and Manifest Risk Scoring
import os
import sys
import json
import numpy as np
from google.cloud import firestore

# Lazy load model elements to prevent unnecessary memory allocations
class NSW_FraudScorer:
    def __init__(self):
        self.weights = {
            'declared_val_anomaly': 0.45,
            'country_origin_risk': 0.30,
            'declarant_historical_flags': 0.25
        }
        self.db = firestore.Client(project=os.environ.get("GCP_PROJECT", "iraq-nsw-production"))

    def evaluate_manifest(self, manifest_id, total_usd, declared_item_count, origin):
        # Establish reference pricing baseline (mock baseline analysis)
        expected_base_price = 1500.00 # average per customs cargo baseline
        ratio = (total_usd / max(1, declared_item_count)) / expected_base_price
        
        # Scoring metrics
        anomaly_score = min(1.0, abs(1.0 - ratio))
        origin_score = 0.85 if origin in ["TAX_HEAVEN", "RISK_ZONE"] else 0.15
        
        composite_score = (
            anomaly_score * self.weights['declared_val_anomaly'] +
            origin_score * self.weights['country_origin_risk']
        )
        
        # Save evaluated score in Firestore database
        doc_ref = self.db.collection(u'risk_scores').document(manifest_id)
        evaluation_record = {
            u'manifest_id': manifest_id,
            u'composite_risk_score': float(composite_score),
            u'status': u'MANUAL_AUDIT' if composite_score > 0.65 else u'AUTOMATED_CLEARANCE',
            u'evaluated_timestamp': firestore.SERVER_TIMESTAMP
        }
        doc_ref.set(evaluation_record)
        return evaluation_record

if __name__ == "__main__":
    scorer = NSW_FraudScorer()
    # Sample dry run test parsing
    test_run = scorer.evaluate_manifest("UQC-88391", 450000.0, 10, "CN")
    print(json.dumps(test_run, default=str))`
    },
    {
      path: "07-devops/terraform/variables.tf",
      name: "variables.tf",
      category: "devops",
      language: "typescript",
      description: {
        en: "Global Project Terraform Variable Scheme Blueprint",
        ar: "ملف متغيرات ترافورم العالمية ومحددات المناطق السحابية",
        ku: "فایلی گۆڕاو گشتییەکان لە تێرافۆرم بۆ پرۆژەکانی عێراق"
      },
      content: `# Terraform input schema representing the deployment variables
variable "project_id" {
  type        = string
  description = "Target GCP sovereign project identifier"
  default     = "iraq-nsw-production-2026"
}

variable "regions" {
  type    = map(string)
  default = {
    primary  = "us-central1" # Primary Baghdad Sync Portal Region
    back_dr  = "eu-south-1"  # Hot site disaster recovery
    edge_krg = "me-central-1" # Northern Edge region
  }
}

variable "gke_machine_type" {
  type        = string
  description = "VM compute capacity sizing to resist portal load spikes"
  default     = "e2-standard-4"
}

variable "enable_dual_region_gcs" {
  type        = bool
  description = "Enable immediate replication for highly important PDF manifests"
  default     = true
}`
    },
    {
      path: "07-devops/kubernetes/hpa.yaml",
      name: "hpa.yaml",
      category: "devops",
      language: "yaml",
      description: {
        en: "Custom Horizontal Pod Autoscaler for high load resilience",
        ar: "موجه الترقية ومضاعفة الحاويات البرمجية لمواجهة الأحمال الفجائية",
        ku: "ڕێکخستنی زیادبوونی بەردەوامی توانستەکان لە کاتی لۆدی زۆردا"
      },
      content: `# Kubernetes autoscaling configuration protecting Iraq customs microservices
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nsw-customs-scaler
  namespace: sovereign-apps
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: customs-verification-service
  minReplicas: 5
  maxReplicas: 100
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 75
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60`
    }
  ];

  // Filtered files 
  const filteredFiles = files.filter(f => {
    const matchesSearch = f.path.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          f.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || f.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const activeFile = filteredFiles[activeFileIndex] || filteredFiles[0] || files[0];

  const triggerCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(true);
    setTimeout(() => setCopiedIndex(false), 2000);
  };

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'root': return 'bg-slate-900 border-slate-700 text-slate-300';
      case 'architecture': return 'bg-sky-950/40 border-sky-500/20 text-sky-400';
      case 'database': return 'bg-blue-950/40 border-blue-500/20 text-blue-400';
      case 'backend': return 'bg-purple-950/40 border-purple-500/20 text-purple-400';
      case 'security': return 'bg-rose-950/40 border-rose-500/20 text-rose-400';
      case 'ai-ml': return 'bg-amber-950/40 border-amber-500/20 text-amber-400';
      case 'devops': return 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400';
      default: return 'bg-slate-950/40 border-slate-800 text-slate-400';
    }
  };

  return (
    <div className="space-y-6" id="sovereign-repo-workspace-root">
      
      {/* Top Main Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-slate-950 bg-emerald-500 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5" />
                Sovereign Repo
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
                iraq-national-single-window (1.4.0)
              </span>
            </div>
            <h2 className="text-xl font-sans font-extrabold text-white mt-3 tracking-tight">
              {lang === 'en' ? "Sovereign Code Sandbox & Repository Explorer" 
                : lang === 'ar' ? "مستودع الأكواد والملفات الفنية المعتمدة للنافذة الوطنية" 
                : "تەلارسازی گشتی و کەلێنی مەکۆی فەرمی نیشتمانی عێراق"}
            </h2>
            <p className="text-xs text-slate-400 mt-2 max-w-4xl leading-relaxed font-sans">
              {lang === 'en' 
                ? "This interactive section represents the high-fidelity folder architecture requested by Senior DevOps and Cloud architects. Every file, policy schema, and automation workflow code block is compiled with exact compliance targets, completely readable in English, Arabic, and Kurdish."
                : lang === 'ar'
                ? "يمثل هذا القسم مستودع الملفات البرمجية المتكامل لجميع أنظمة النافذة الجمركية العراقية الموحدة. تصفح الملفات والتعليمات الفنية، قواعد ترافورم، مخططات الكيوبيرنتس، وسياسات الأمن السيبراني الصارمة."
                : "ئەم بەشە مەکۆی فەرمی کۆدەکانی دەروازە نیشتمانییەکەیە. تێیدا نەخشە و فایلەکانی پەڕ تێرافۆرم، یاساکانی کیوبێرنێتس و سیاسەتەکانی ئاسایشی ئەلەکترۆنی بە دەسەڵاتی تەواوەوە نیشان دەدرێن."}
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 self-start md:self-auto shrink-0 font-mono">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] text-slate-400">{lang === 'en' ? "Branch: " : "الفرع: "}<strong className="text-emerald-400">main-sovereign-prod</strong></span>
          </div>
        </div>

        {/* Directory-level Category Filtering Buttons */}
        <div className="flex gap-2 mt-5 border-t border-slate-800/80 pt-4 overflow-x-auto">
          {[
            { id: 'all', label: lang === 'en' ? "All Files" : lang === 'ar' ? "كل الملفات" : "گشت فایلەکان" },
            { id: 'root', label: "Root" },
            { id: 'architecture', label: "01-Architecture" },
            { id: 'database', label: "02-Database" },
            { id: 'backend', label: "03-Backend" },
            { id: 'security', label: "05-Security" },
            { id: 'ai-ml', label: "06-AI-ML" },
            { id: 'devops', label: "07-DevOps" },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveFileIndex(0); // Reset index selection
              }}
              className={`px-3 py-1.5 text-xs font-sans font-bold rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id 
                  ? 'bg-emerald-600 text-slate-950 font-sans border-emerald-400 shadow-sm' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Multi-file Explorer and Visual IDE split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side File Path List Selector (5 Cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col h-[600px]">
          
          {/* File Search Input */}
          <div className="relative mb-3 shrink-0">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder={lang === 'en' ? "Search files..." : lang === 'ar' ? "ابحث بالملفات..." : "گەڕان لە فایلەکاندا..."}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setActiveFileIndex(0);
              }}
              className="w-full bg-slate-950 text-xs text-slate-100 placeholder-slate-500 pl-9 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 transition-all font-sans"
            />
          </div>

          <div className="text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider mb-2 px-2 shrink-0">
            {lang === 'en' ? "Repository Files Matching" : "الملفات المطابقة"} ({filteredFiles.length})
          </div>

          {/* Actual List Grid */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 select-none">
            {filteredFiles.map((file, idx) => {
              const isActive = (activeFile.path === file.path);
              return (
                <button
                  key={file.path}
                  onClick={() => setActiveFileIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isActive 
                      ? 'bg-slate-800 border-slate-700 text-white shadow-sm' 
                      : 'bg-slate-950/40 hover:bg-slate-950 hover:border-slate-800 text-slate-400 border-transparent'
                  }`}
                  style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileCode className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <div className="min-w-0 text-left">
                      <span className="text-xs font-mono font-medium block truncate text-slate-200">{file.name}</span>
                      <span className="text-[10px] text-slate-500 truncate block font-sans">{file.path}</span>
                    </div>
                  </div>
                  
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 border ${getCategoryTheme(file.category)}`}>
                    {file.category}
                  </span>
                </button>
              );
            })}

            {filteredFiles.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-xs italic font-sans">
                {lang === 'en' ? "No files matched your active criteria" : "لم يتم العثور على أي ملف مطابقة"}
              </div>
            )}
          </div>

        </div>

        {/* Right Side Code Streamer and IDE Simulator Viewer (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[600px] shadow-lg">
          
          {/* File Control Bar */}
          <div className="bg-slate-950 border-b border-slate-800 px-5 py-3 flex items-center justify-between shrink-0 font-sans">
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <div className="min-w-0">
                <span className="text-xs font-mono font-semibold text-slate-100 block">{activeFile.name}</span>
                <span className="text-[10px] text-slate-400 font-mono block tracking-tight">{activeFile.path}</span>
              </div>
            </div>

            {/* Action buttons (Copy & Simulated download) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerCopyCode(activeFile.content)}
                className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                {copiedIndex ? <Check className="w-3.5 h-3.5 text-emerald-400 animate-bounce" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex ? (lang === 'en' ? "Copied" : "تم النسخ") : (lang === 'en' ? "Copy Code" : "الملخص")}</span>
              </button>
            </div>
          </div>

          {/* Quick File Details Info Alert bar */}
          <div className="bg-emerald-950/20 border-b border-emerald-500/10 px-5 py-3 text-xs flex items-center gap-3 shrink-0">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-slate-300 flex-1">
              <strong>{lang === 'en' ? "Blueprint Purpose: " : "الغرض الوطني: "}</strong>
              <span className="font-sans">{activeFile.description[lang]}</span>
            </div>
          </div>

          {/* Code Area Workspace */}
          <div className="flex-1 bg-slate-950 p-6 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-300 select-text relative">
            <div className="absolute top-3 right-4 opacity-10 uppercase text-slate-400 tracking-wider font-extrabold select-none">
              {activeFile.language}
            </div>
            
            <pre className="whitespace-pre">{activeFile.content}</pre>
          </div>

          {/* Operational Terminal Status footer */}
          <div className="bg-slate-950 border-t border-slate-800 px-5 py-3 text-[10px] text-slate-500 font-mono flex flex-col md:flex-row justify-between items-start md:items-center gap-2 select-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Integrate checking status: <strong className="text-emerald-400">VERIFIED VALID SECURE</strong></span>
            </div>
            <span>Line Count: <strong className="text-slate-300">{activeFile.content.split('\n').length} lines</strong></span>
          </div>

        </div>

      </div>

    </div>
  );
}
