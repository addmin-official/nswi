import { useState, useEffect } from 'react';
import { 
  Cpu, Server, ArrowUpRight, Zap, RefreshCw, BarChart2, CheckCircle2, AlertTriangle, 
  Terminal, ShieldCheck, Download, Code2, Play, Users, Layers, Cloud, ChevronRight, 
  HelpCircle, Sliders, Database, Network, Percent, Clock, AlertOctagon, Heart, Save
} from 'lucide-react';
import { Language } from '../types';

interface CloudDevOpsIaCProps {
  lang: Language;
}

export default function CloudDevOpsIaC({ lang }: CloudDevOpsIaCProps) {
  const isRtl = lang === 'ar' || lang === 'ku';

  // Sub tab state in DevOps portal
  const [activeSubTab, setActiveSubTab] = useState<'topology' | 'iac' | 'pipeline' | 'monitoring' | 'runbook'>('topology');

  // Multi-region traffic routing model
  const [baghdadWeight, setBaghdadWeight] = useState<number>(70);
  const [basraWeight, setBasraWeight] = useState<number>(20);
  const [erbilWeight, setErbilWeight] = useState<number>(10);

  // GKE Pod scaling simulation
  const [simulatedRps, setSimulatedRps] = useState<number>(4500);
  const [podsCountBaghdad, setPodsCountBaghdad] = useState<number>(12);
  const [podsCountBasra, setPodsCountBasra] = useState<number>(4);
  const [podsCountErbil, setPodsCountErbil] = useState<number>(3);

  // Active blackout check for Disaster Recovery simulator
  const [primaryHubBlackout, setPrimaryHubBlackout] = useState<boolean>(false);
  const [drStatusMsg, setDrStatusMsg] = useState<string>("Sovereign multi-region healthy and routing standard traffic.");

  // Selected IaC snippet
  const [selectedIaC, setSelectedIaC] = useState<'terraform_vpc' | 'terraform_gke' | 'helm_values' | 'istio_routing' | 'cloud_armor_waf'>('terraform_vpc');
  const [copiedText, setCopiedText] = useState<boolean>(false);

  // CI/CD simulator state
  const [pipelineRunning, setPipelineRunning] = useState<boolean>(false);
  const [pipelineProgress, setPipelineProgress] = useState<number>(0);
  const [pipelineStatus, setPipelineStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [injectScanFailure, setInjectScanFailure] = useState<boolean>(false);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);

  // Monitoring Threshold Controls & Metrics
  const [cpuThreshold, setCpuThreshold] = useState<number>(80);
  const [baghdadCpu, setBaghdadCpu] = useState<number>(68);
  const [basraCpu, setBasraCpu] = useState<number>(24);
  const [erbilCpu, setErbilCpu] = useState<number>(31);
  const [isBackupSecured, setIsBackupSecured] = useState<boolean>(true);

  // Cost optimization calculators
  const [spotEnabled, setSpotEnabled] = useState<boolean>(true);
  const [commitmentYear, setCommitmentYear] = useState<'none' | '1yr' | '3yr'>('3yr');

  // Triggering pod recalculations based on RPS & weight distributions
  useEffect(() => {
    if (primaryHubBlackout) {
      // Baghdad weight shifts to Basra
      const totalAllocated = basraWeight + erbilWeight;
      const factorBasra = basraWeight / (totalAllocated || 1);
      const factorErbil = erbilWeight / (totalAllocated || 1);

      // Distribute 100% target
      const targetBasra = Math.round(factorBasra * 100);
      const targetErbil = 100 - targetBasra;

      // Simulated Pod scales based on traffic
      const podsBasra = Math.max(Math.ceil((simulatedRps * (targetBasra / 100)) / 250), 3);
      const podsErbil = Math.max(Math.ceil((simulatedRps * (targetErbil / 100)) / 250), 3);

      setPodsCountBaghdad(0);
      setPodsCountBasra(podsBasra);
      setPodsCountErbil(podsErbil);
      setDrStatusMsg("CRITICAL: Baghdad primary cluster offline! Health check failed. Route 53 & GSLB instantly diverted 100% traffic to Basra Hot Site and Erbil Edge Node.");
    } else {
      // Normal weight scales
      const podsBaghdad = Math.max(Math.ceil((simulatedRps * (baghdadWeight / 100)) / 250), 2);
      const podsBasra = Math.max(Math.ceil((simulatedRps * (basraWeight / 100)) / 250), 2);
      const podsErbil = Math.max(Math.ceil((simulatedRps * (erbilWeight / 100)) / 250), 2);

      setPodsCountBaghdad(podsBaghdad);
      setPodsCountBasra(podsBasra);
      setPodsCountErbil(podsErbil);
      setDrStatusMsg("Sovereign multi-region fully operational. GSLB active-active configurations verified.");
    }
  }, [baghdadWeight, basraWeight, erbilWeight, simulatedRps, primaryHubBlackout]);

  // Adjust active monitoring signals
  useEffect(() => {
    const timer = setInterval(() => {
      if (primaryHubBlackout) {
        setBaghdadCpu(0);
        setBasraCpu(Math.min(92, Math.max(76, Math.floor(Math.random() * 10) + 80)));
        setErbilCpu(Math.min(85, Math.max(45, Math.floor(Math.random() * 10) + 55)));
      } else {
        const bagBase = Math.round((simulatedRps / 8000) * 100);
        setBaghdadCpu(Math.min(99, Math.max(15, bagBase + Math.floor(Math.random() * 8) - 4)));
        setBasraCpu(Math.min(99, Math.max(10, Math.floor(Math.random() * 10) + 15)));
        setErbilCpu(Math.min(99, Math.max(12, Math.floor(Math.random() * 10) + 20)));
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [simulatedRps, primaryHubBlackout]);

  // Copy helper
  const triggerCopyNotification = () => {
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Run GitHub Actions simulator
  const startPipelineSim = () => {
    setPipelineRunning(true);
    setPipelineStatus('running');
    setPipelineProgress(5);
    setPipelineLogs(["[INFO] Initiating GitHub Actions runner on ubuntu-latest container...", "[INFO] Checking out sovereign repository main branch..."]);

    const steps = [
      { prg: 15, log: "[SUCCESS] Checked out codebase. Detecting GCP authentication keys...", s: 400 },
      { prg: 30, log: "[STAGE 1] Triggering CodeQL and SonarQube SAST vulnerability scans...", s: 700 },
      { prg: 45, log: "[STAGE 2] Checking Terraform configs with Checkov linter...", s: 600 },
      { prg: 60, log: injectScanFailure 
          ? "[CRITICAL ERROR] Checkov Security gate failed: Misconfigured public S3/GCS bucket write permissions detected outside organization boundaries!"
          : "[SUCCESS] Checkov security screening cleared with zero findings. Safe to bundle.", s: 800 },
      { prg: 75, log: injectScanFailure 
          ? "[STAGE 5] Triggering fallback emergency abort sequence. Safe container push halted!"
          : "[STAGE 3] Building Docker images. Tagging artifact as `asia-east1-docker.pkg.dev/iraq-nsw/v1.4.1`...", s: 700 },
      { prg: 90, log: injectScanFailure 
          ? "[CD ARRESTED] Pipeline pipeline aborted." 
          : "[STAGE 4] Uploading container manifest to Artifact Registry. Launching GCP Container Analysis scanning...", s: 600 },
      { prg: 100, log: injectScanFailure 
          ? "[STATUS] Red cluster deployed status preserved. Non-conforming images deleted."
          : "[SUCCESS] GCP Security Analyzer confirmed zero critical container vulnerabilities. Triggering GKE Blue-Green canary deploy!", s: 800 }
    ];

    let count = 0;
    const runNextStep = () => {
      if (count >= steps.length) {
        setPipelineRunning(false);
        setPipelineStatus(injectScanFailure ? 'failed' : 'success');
        return;
      }
      setTimeout(() => {
        setPipelineProgress(steps[count].prg);
        setPipelineLogs(prev => [...prev, steps[count].log]);
        if (injectScanFailure && count === 3) {
          // halt with error
          setPipelineRunning(false);
          setPipelineStatus('failed');
          setPipelineLogs(prev => [...prev, "[CRITICAL BUILD DEFEATED] Termination at Commit Ref #78a02c.", "[ROLLBACK] Reverted GKE routing mapping back to latest stable production state."]);
          return;
        }
        count++;
        runNextStep();
      }, steps[count].s);
    };

    runNextStep();
  };

  // Static translations dictionary
  const dict = {
    en: {
      devopsTitle: "Iraq NSW DevOps & Sovereign Cloud IaC Gateway",
      subtitle: "GCP Multi-Region High-Availability Infrastructure Controller",
      description: "Complete Cloud Infrastructure Automation and DevOps Control deck adhering strictly to Iraq's cyber-security standards. Standard multi-region high durability (99.99% targets) leveraging sovereign hosting nodes across Baghdad, Basra, and the KRG.",
      tabTopology: "Multi-Region Traffic Controller",
      tabIac: "Terraform & Helm Blueprints",
      tabPipeline: "Sovereign CI/CD Pipeline (GitHub)",
      tabMonitoring: "Sovereign Alarm & Monitoring Pods",
      tabRunbook: "Active Resilience Playbook",
      rpsLabel: "Simulated Traffic Request Volume (RPS)",
      blackoutBtnName: "Simulate Baghdad Primary Cluster Blackout",
      restoreBtnName: "Restore Healthy Sovereign Architecture Status",
      trafficWeightTitle: "Global Traffic Routing Weight Ratio %",
      baghdadWeightLabel: "us-central1 Baghdad Active Node",
      basraWeightLabel: "eu-south-1 Basra Secondary DR Hub",
      erbilWeightLabel: "me-central-1 Erbil Gateway Node",
      scalingLogsTitle: "Active Kubernetes scaling telemetry & metrics",
      alertBreach: "THRESHOLD ALERT BREACH: CPU load higher than set limit!",
      secScanMode: "Pipeline Security Control mode:"
    },
    ar: {
      devopsTitle: "بوابة النافذة الوطنية لإدارة السحابية والبنية التحتية (DevOps IaC)",
      subtitle: "جهاز التحكم الموزع للتشغيل متعدد الأقاليم لتأمين الخدمات السيادية",
      description: "منصة كاملة لأتمتة البنية التحتية، إعداد الحاويات، وإدارة عمليات الدمج والنشر المستمر وفقاً لمتطلبات الأمن الاستراتيجي لجمهورية العراق. تضمن عمل الأنظمة بنسبة 99.99% عبر مراكز بغداد، البصرة، وأربيل.",
      tabTopology: "موزع وحجم حركة مرور الشبكة",
      tabIac: "مخططات ترافورم وهلم (IaC)",
      tabPipeline: "مراقبة أنابيب النشر (CI/CD Pipeline)",
      tabMonitoring: "غرفة التحقق والمراقبة السحابية",
      tabRunbook: "دليل إدارة الكوارث واستعادة العمل",
      rpsLabel: "مستوى محاكاة الضغط وتدفق الطلبات (طلباً/الثانية)",
      blackoutBtnName: "محاكاة انقطاع وتوقف مركز بغداد الرئيسي",
      restoreBtnName: "إنهاء المحاكاة واعادة التشغيل الطبيعي الكامل",
      trafficWeightTitle: "توزيع وتوجيه أحمال المرور الوطنية %",
      baghdadWeightLabel: "عقدة بغداد السحابية (الرئيسية) us-central1",
      basraWeightLabel: "موقع البصرة (المعد لاستعادة البيانات) eu-south-1",
      erbilWeightLabel: "بوابة أربيل الإقليمية me-central-1",
      scalingLogsTitle: "مؤشرات وتوسيع عقد الكوبيرنتس (Kubernetes Telemetry)",
      alertBreach: "تحذير أمني: تجاوز استهلاك وحدة المعالجة الحد المسموح به!",
      secScanMode: "فحص قيود الحماية التلقائي للأكواد:"
    },
    ku: {
      devopsTitle: "سەنتەری کارپێکردن و حوسبەی سحابی فەرمی عێراق (DevOps IaC)",
      subtitle: "کۆنترۆڵی زیرەکی دابەشبوون لە نێوان دەروازە جیاوازەکانی عێراق",
      description: "مەکۆی ئۆتۆماتیکی بنیاتنانی نەخشەی سحابی و کۆنتێنەرەکانی کوبێرنێتس بۆ دابینکردنی ئاستی کارکردنی بەرز (٩٩.٩٩٪). هاوسەنگی مامەڵەکان لە نێوان بەغداد، بەسرە، و هەولێر دەپارێزێت.",
      tabTopology: "کۆنترۆڵی لۆد و هاتوچۆی دەروازەکان",
      tabIac: "فایل و نەخشەکانی تێرافۆرم و خشتەی هێڵم",
      tabPipeline: "هاوشێوەکەری خۆکاری دەروازەی CI/CD",
      tabMonitoring: "چاودێری لۆد و هێڵەکانی زانیاری",
      tabRunbook: "پلانی ئاسایش و دەرچوون لە کێشەکان",
      rpsLabel: "کۆی لۆدی تاقیکراوە لە چرکەیەکدا (RPS)",
      blackoutBtnName: "تاقیکردنەوەی لەکارکەوتنی گشتی بنکەی بەغداد",
      restoreBtnName: "گەڕانەوە بۆ باری ئاسایی گشت سنورەکان",
      trafficWeightTitle: "ڕێژەی دابەشبوونی کارلێککاران سەر هێڵەکان %",
      baghdadWeightLabel: "بەرنامەی فەرمی بەغدادی سەرەکی us-central1",
      basraWeightLabel: "ناوەندی فریاگوزاری بەسرە (یەدەگ) eu-south-1",
      erbilWeightLabel: "ناوەندی گەیاندنی هەولێری باکور me-central-1",
      scalingLogsTitle: "هێڵەکانی چاودێری و فراوانبوونی خۆکاری پۆدەکان",
      alertBreach: "ئاگاداری: لۆدی سەر پرۆسێسەر زۆر بەرزە لە دیاریکراو!",
      secScanMode: "جۆری پشکنینی ئاسایشی کۆدەکان لە کاتی بەستندا:"
    }
  };

  const t = dict[lang];

  // Raw mock IaC Data Snippets representing enterprise standards
  const iacData = {
    terraform_vpc: `# VPC Deployment Config representing Multi-Region Sovereign standards
resource "google_compute_network" "iraq_nsw_vpc" {
  name                    = "iraq-nsw-production-vpc"
  auto_create_subnets     = false
  routing_mode            = "GLOBAL"
}

resource "google_compute_subnetwork" "subnet_baghdad_primary" {
  name          = "subnet-baghdad-us-central1"
  ip_cidr_range = "10.100.0.0/20"
  region        = "us-central1"
  network       = google_compute_network.iraq_nsw_vpc.id
  private_ip_google_access = true
}

resource "google_compute_subnetwork" "subnet_basra_dr" {
  name          = "subnet-basra-eu-south1"
  ip_cidr_range = "10.110.0.0/20"
  region        = "eu-south-1"  # Hot disaster recovery node
  network       = google_compute_network.iraq_nsw_vpc.id
  private_ip_google_access = true
}

resource "google_compute_subnetwork" "subnet_erbil_krg" {
  name          = "subnet-erbil-me-central1"
  ip_cidr_range = "10.120.0.0/20"
  region        = "me-central-1" # Local KRG node for sovereign synchronization
  network       = google_compute_network.iraq_nsw_vpc.id
  private_ip_google_access = true
}`,
    terraform_gke: `# GKE Sovereign Multi-Region Cluster Configuration with autoscaling enabled
resource "google_container_cluster" "gke_baghdad" {
  name     = "nsw-baghdad-primary-cluster"
  location = "us-central1-a"

  network    = google_compute_network.iraq_nsw_vpc.name
  subnetwork = google_compute_subnetwork.subnet_baghdad_primary.name

  remove_default_node_pool = true
  initial_node_count       = 1

  ip_allocation_policy {
    use_ip_aliases = true
  }

  private_cluster_config {
    enable_private_nodes    = true
    enable_private_endpoint = false # Restrict master to secure access points
    master_ipv4_cidr_block  = "172.16.0.0/28"
  }
}

resource "google_container_node_pool" "primary_nodes" {
  name       = "nsw-high-availability-pool"
  location   = "us-central1-a"
  cluster    = google_container_cluster.gke_baghdad.name
  node_count = 3

  autoscaling {
    min_node_count = 3
    max_node_count = 50 # Handles customs peak seasons
  }

  node_config {
    preemptible  = false
    machine_type = "e2-standard-4"

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]

    metadata = {
      disable-legacy-endpoints = "true"
    }
  }
}`,
    helm_values: `# Helm Release values for Iraq NSW Gateway microservices
global:
  environment: production
  sovereignComplianceMode: strict
  replicaCount: 5

gateway:
  image:
    repository: asia-east1-docker.pkg.dev/iraq-nsw/v1.4.1
    tag: stable
    pullPolicy: IfNotPresent
  service:
    type: ClusterIP
    port: 8080
  resources:
    limits:
      cpu: 2000m
      memory: 4Gi
    requests:
      cpu: 500m
      memory: 1Gi
  hpa:
    enabled: true
    minReplicas: 5
    maxReplicas: 100
    targetCPUUtilizationPercentage: 75
  secretManagerEnv:
    enabled: true
    project: iraq-nsw-prod-2026
    secretKeys: [DATABASE_PWD, API_SEC_JWT, HSM_PIN]
`,
    istio_routing: `# Istio VirtualService configuration Routing Canary Traffic
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: nsw-customs-router
  namespace: sovereign-apps
spec:
  hosts:
  - "customs.iraq-nsw.gov.iq"
  gateways:
  - nsw-production-gateway
  http:
  - route:
    - destination:
        host: customs-service
        subset: v1-stable
      weight: 90
    - destination:
        host: customs-service
        subset: v2-canary
      weight: 10
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: customs-service-subsets
  namespace: sovereign-apps
spec:
  host: customs-service
  subsets:
  - name: v1-stable
    labels:
      version: v1.4.0
  - name: v2-canary
    labels:
      version: v1.4.1
`,
    cloud_armor_waf: `# WAF Cloud Armor Policy for Iraq NSW Border Endpoints
resource "google_compute_security_policy" "nsw_waf_shield" {
  name        = "nsw-sovereign-waf-protection"
  description = "Thwarts Layer 7 DDoS, SQLi, and custom geographic boundaries IP blocks"

  # Rule 1: Thwart SQL Injection patterns
  rule {
    action   = "deny(403)"
    priority = "1000"
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('sqli-stable')"
      }
    }
    description = "Preconfigured SQLi prevention rule"
  }

  # Rule 2: Thwart Cross-Site Scripting (XSS)
  rule {
    action   = "deny(403)"
    priority = "1010"
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('xss-stable')"
      }
    }
    description = "Preconfigured XSS prevention rule"
  }

  # Rule 3: Restrict API traffic to rate limits
  rule {
    action   = "rate_based_ban"
    priority = "2000"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    rate_limit_options {
      rate_limit_threshold {
        count        = 120
        interval_sec = 60
      }
      ban_duration_sec = 3600
      exceed_action    = "deny(429)"
    }
    description = "Enforce customs terminal rate thresholds"
  }
}`
  };

  return (
    <div className="space-y-6" id="cloud-devops-iac-root">
      
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-slate-950 bg-emerald-500 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Cloud className="w-3 h-3" />
                DevOps Core
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
                GCP Blueprints & IaC
              </span>
            </div>
            <h2 className="text-xl font-sans font-extrabold text-white mt-3 tracking-tight">
              {t.devopsTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-2 max-w-3xl leading-relaxed">
              {t.description}
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 self-start md:self-auto shrink-0 font-mono">
            <Percent className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] text-slate-300">Live Uptime: <strong className="text-emerald-400">99.998%</strong></span>
          </div>
        </div>

        {/* DevOps Tab Panel Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-6 border-t border-slate-800 pt-5">
          {[
            { id: 'topology', label: t.tabTopology, icon: <Network className="w-4 h-4" /> },
            { id: 'iac', label: t.tabIac, icon: <Code2 className="w-4 h-4" /> },
            { id: 'pipeline', label: t.tabPipeline, icon: <Terminal className="w-4 h-4" /> },
            { id: 'monitoring', label: t.tabMonitoring, icon: <Cpu className="w-4 h-4" /> },
            { id: 'runbook', label: t.tabRunbook, icon: <ShieldCheck className="w-4 h-4" /> },
          ].map(subTab => (
            <button
              key={subTab.id}
              onClick={() => setActiveSubTab(subTab.id as any)}
              className={`flex flex-col md:flex-row items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                activeSubTab === subTab.id 
                  ? 'bg-emerald-600 text-slate-950 font-bold border-emerald-400 shadow-md scale-[1.01]' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <div>{subTab.icon}</div>
              <span className="text-[10px] md:text-xs font-sans font-bold leading-none truncate">{subTab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Sandbox Interactive Area */}
      <div className="grid grid-cols-1 gap-6">

        {/* 1. INTERACTIVE MULTI-REGION TOPOLOGY CONTROLLER */}
        {activeSubTab === 'topology' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Parameters Controller (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">
                  {lang === 'en' ? "Simulate Live Ingress Traffic Routing" : lang === 'ar' ? "التحكم ومحاكاة توجيه المرور" : "هاوشێوەکەری ناردنی لۆد و هاتوچۆ"}
                </h3>
              </div>

              {/* RPS Simulation slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-300 font-sans">{t.rpsLabel}</span>
                  <span className="font-mono font-bold text-emerald-400">{simulatedRps.toLocaleString()} RPS</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="500"
                  value={simulatedRps}
                  onChange={(e) => setSimulatedRps(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Geographic IP Weight Distribution inputs */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">{t.trafficWeightTitle}</h4>
                
                <div className="space-y-3">
                  {/* Baghdad Slider weight */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>{t.baghdadWeightLabel}</span>
                      <span className="font-mono text-emerald-400 font-bold">{primaryHubBlackout ? 0 : baghdadWeight}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="90" 
                      disabled={primaryHubBlackout}
                      value={baghdadWeight}
                      onChange={(e) => {
                        const newB = Number(e.target.value);
                        setBaghdadWeight(newB);
                        // Balance other two dynamically
                        const diff = 100 - newB;
                        setBasraWeight(Math.round(diff * 0.65));
                        setErbilWeight(100 - newB - Math.round(diff * 0.65));
                      }}
                      className="w-full accent-emerald-500 bg-slate-950 h-1.5 rounded cursor-pointer disabled:opacity-30"
                    />
                  </div>

                  {/* Basra weight */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>{t.basraWeightLabel}</span>
                      <span className="font-mono text-emerald-400 font-bold">{primaryHubBlackout ? (100 - erbilWeight) : basraWeight}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="90" 
                      disabled={primaryHubBlackout}
                      value={basraWeight}
                      onChange={(e) => {
                        const newBas = Number(e.target.value);
                        setBasraWeight(newBas);
                        const diff = 100 - newBas;
                        setBaghdadWeight(Math.round(diff * 0.75));
                        setErbilWeight(100 - newBas - Math.round(diff * 0.75));
                      }}
                      className="w-full accent-emerald-500 bg-slate-950 h-1.5 rounded cursor-pointer disabled:opacity-30"
                    />
                  </div>

                  {/* Erbil weight */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>{t.erbilWeightLabel}</span>
                      <span className="font-mono text-emerald-400 font-bold">{erbilWeight}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="5" 
                      max="50" 
                      disabled={primaryHubBlackout}
                      value={erbilWeight}
                      onChange={(e) => {
                        const newE = Number(e.target.value);
                        setErbilWeight(newE);
                        const diff = 100 - newE;
                        setBaghdadWeight(Math.round(diff * 0.8));
                        setBasraWeight(100 - newE - Math.round(diff * 0.8));
                      }}
                      className="w-full accent-emerald-500 bg-slate-950 h-1.5 rounded cursor-pointer disabled:opacity-30"
                    />
                  </div>
                </div>
              </div>

              {/* Chaos Engineering: Blackout Simulate trigger buttons */}
              <div className="border-t border-slate-800/80 pt-5 space-y-3">
                <span className="text-[10px] font-mono tracking-wider text-rose-400 flex items-center gap-1 uppercase">
                  <AlertOctagon className="w-4 h-4 animate-pulse" />
                  Chaos Engineering Sandbox
                </span>
                
                {!primaryHubBlackout ? (
                  <button
                    onClick={() => setPrimaryHubBlackout(true)}
                    className="w-full bg-rose-950/20 text-rose-300 hover:bg-rose-900 hover:text-white border border-rose-500/30 font-sans font-bold text-xs p-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    {t.blackoutBtnName}
                  </button>
                ) : (
                  <button
                    onClick={() => setPrimaryHubBlackout(false)}
                    className="w-full bg-emerald-600 text-slate-950 hover:bg-emerald-500 font-sans font-bold text-xs p-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-extrabold shadow-md animate-bounce"
                  >
                    <RefreshCw className="w-4 h-4" />
                    {t.restoreBtnName}
                  </button>
                )}
              </div>

            </div>

            {/* Right Topology Display Panel (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Network className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">
                    {lang === 'en' ? "Sovereign Ingress Architecture Status" : lang === 'ar' ? "حالة توجيه البوابة السيادية المشتركة" : "بارودۆخی گرێدانی تۆڕی دەروازەکان"}
                  </h3>
                </div>

                {/* Primary Alert Warning box for blackout status */}
                <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1 ${
                  primaryHubBlackout 
                    ? 'bg-rose-950/20 border-rose-500/30 text-rose-300' 
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className={`w-2.5 h-2.5 rounded-full ${primaryHubBlackout ? 'bg-rose-500 animate-ping' : 'bg-emerald-400 animate-pulse'}`}></span>
                    <span className={primaryHubBlackout ? 'text-rose-400 uppercase tracking-widest font-mono text-[10px]' : 'text-slate-400'}>
                      {primaryHubBlackout ? "DISASTER MODE ACTIVE" : "MULTI-REGION TOPOLOGY STATUS"}
                    </span>
                  </div>
                  <p className="mt-1 font-sans">{drStatusMsg}</p>
                </div>

                {/* Active Regions Pod cluster visualizers */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">{t.scalingLogsTitle}</h4>
                  
                  {/* Baghdad cluster */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border font-bold ${
                        primaryHubBlackout ? 'bg-rose-950/20 border-rose-500/20 text-rose-500' : 'bg-emerald-950/60 border-emerald-500/20 text-emerald-400'
                      }`}>
                        BG
                      </div>
                      <div>
                        <span className="text-xs font-sans font-bold text-slate-200">Baghdad Primary Node</span>
                        <div className="flex gap-2 text-[10px] text-slate-500 font-mono">
                          <span>us-central1</span>
                          <span>•</span>
                          <span>Core Portal & Spanner DB</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-[10px] text-slate-500 font-bold block">ACTIVE POD REPLICAS</span>
                      <span className={`text-sm font-extrabold ${primaryHubBlackout ? 'text-rose-500' : 'text-emerald-400'}`}>
                        {podsCountBaghdad} Pods (HPA)
                      </span>
                    </div>
                  </div>

                  {/* Basra DR cluster */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-500/20 font-bold text-blue-400 flex items-center justify-center">
                        BS
                      </div>
                      <div>
                        <span className="text-xs font-sans font-bold text-slate-200">Basra Backup DR site</span>
                        <div className="flex gap-2 text-[10px] text-slate-500 font-mono">
                          <span>eu-south-1 (DR)</span>
                          <span>•</span>
                          <span>Hot Standby Active Replica</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-[10px] text-slate-500 font-bold block">ACTIVE POD REPLICAS</span>
                      <span className="text-sm font-extrabold text-blue-400">
                        {podsCountBasra} Pods {primaryHubBlackout && " (AutoScaled)"}
                      </span>
                    </div>
                  </div>

                  {/* Erbil cluster */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-500/20 font-bold text-purple-400 flex items-center justify-center">
                        ER
                      </div>
                      <div>
                        <span className="text-xs font-sans font-bold text-slate-200">Erbil Boundary Gateway</span>
                        <div className="flex gap-2 text-[10px] text-slate-500 font-mono">
                          <span>me-central-1 (KRG)</span>
                          <span>•</span>
                          <span>Regional Sync Node</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-[10px] text-slate-500 font-bold block">ACTIVE POD REPLICAS</span>
                      <span className="text-sm font-extrabold text-purple-400">
                        {podsCountErbil} Pods
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Informational SLA footer */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-500 font-mono flex items-center justify-between">
                <span>DNS Failover Metric: <strong className="text-emerald-400">Active-Active GSLB</strong></span>
                <span>Latency Threshold: <strong className="text-emerald-400">&lt; 35ms</strong></span>
              </div>

            </div>

          </div>
        )}

        {/* 2. INFRASTRUCTURE AS CODE BLUEPRINTS (TERRAFORM / HELM) */}
        {activeSubTab === 'iac' && (
          <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">Sovereign Land GCP Deployments</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Explore production-ready compiled DevOps configuration scripts.</p>
                </div>
              </div>

              {/* Select active snippet code block */}
              <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-lg self-start overflow-x-auto max-w-full">
                {[
                  { id: 'terraform_vpc', label: "TF VPC Config" },
                  { id: 'terraform_gke', label: "TF GKE Pool" },
                  { id: 'helm_values', label: "Helm Values" },
                  { id: 'istio_routing', label: "Istio Canary Routing" },
                  { id: 'cloud_armor_waf', label: "Cloud Armor WAF" }
                ].map(snippet => (
                  <button
                    key={snippet.id}
                    onClick={() => setSelectedIaC(snippet.id as any)}
                    className={`px-3 py-1.5 text-[10px] font-sans font-bold rounded cursor-pointer whitespace-nowrap transition-all ${
                      selectedIaC === snippet.id ? 'bg-emerald-600 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {snippet.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive script file with copy feature */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>{selectedIaC}.tf_manifest</span>
                </div>
                <button
                  onClick={triggerCopyNotification}
                  className="bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-1.5 cursor-pointer font-sans"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copiedText ? "Copied manifest" : "Copy Manifest"}</span>
                </button>
              </div>

              {/* Code viewer panel */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 max-h-[450px] overflow-y-auto relative font-mono text-[11px] leading-relaxed text-slate-300">
                <pre>{iacData[selectedIaC]}</pre>
              </div>
            </div>
          </div>
        )}

        {/* 3. SOVEREIGN CI/CD PIPELINE (GITHUB ACTIONS & CLOUD BUILD RUNNER) */}
        {activeSubTab === 'pipeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left controller parameters for runner triggers */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Zap className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">
                  {lang === 'en' ? "CI/CD Pipeline Core Controller" : lang === 'ar' ? "متحكم واجهة النشر والبرمجة" : "هێڵکاری بەستن و کارکردنی بەردەوام"}
                </h3>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Execute a simulated production deployment sequence. The pipeline integrates vulnerability scanning tools (Checkov, CodeQL, Container Security), and deploys microservices securely to GKE via Cloud Build.
                </p>

                {/* Secure Scan Injection Mode parameters */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                  <span className="text-[10px] text-slate-500 uppercase font-mono font-bold block">{t.secScanMode}</span>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-sans font-semibold">Strict SAST Security Gate</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">Checkov Enabled</span>
                  </div>

                  <hr className="border-slate-900" />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-xs text-slate-300 font-sans font-semibold block">Inject Synthetic Misconfiguration</span>
                      <span className="text-[10px] text-slate-500 font-mono block">Simulates build block of unsafe configs</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={injectScanFailure}
                      onChange={(e) => setInjectScanFailure(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-800 bg-slate-950 accent-rose-500 text-slate-200 outline-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Execute Pipeline script Button */}
                <button
                  disabled={pipelineRunning}
                  onClick={startPipelineSim}
                  className={`w-full font-sans font-bold text-xs p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-extrabold ${
                    pipelineRunning 
                      ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed' 
                      : 'bg-emerald-600 text-slate-950 hover:bg-emerald-500 shadow-md'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  {pipelineRunning ? "PIPELINE ACTIVE IN GITHUB ACTIONS..." : "RUN SOVEREIGN CI/CD DEPLOY"}
                </button>
              </div>

            </div>

            {/* Right log streamer view terminal */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">GitHub Actions Run Terminal</h3>
                </div>
                <span className="font-mono text-[10px] bg-slate-950 px-2 py-1 rounded text-slate-500">workflow_run_id: #GH-299301</span>
              </div>

              {/* Status Visual progress bar */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span>Deployment Pipeline Execution</span>
                  <span className={pipelineStatus === 'failed' ? 'text-rose-400' : pipelineStatus === 'success' ? 'text-emerald-400' : 'text-slate-400'}>
                    {pipelineStatus === 'failed' ? "FAILED & REVERTED" : pipelineStatus === 'success' ? "DEPLOY SUCCESS" : pipelineRunning ? `${pipelineProgress}%` : "READY"}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      pipelineStatus === 'failed' ? 'bg-rose-500' : pipelineStatus === 'success' ? 'bg-emerald-500' : 'bg-emerald-400 animate-pulse'
                    }`} 
                    style={{ width: `${pipelineProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Shell output runner logs */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 h-[250px] overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-400 space-y-1.5 select-text">
                {pipelineLogs.map((log, idx) => (
                  <div key={idx} className={`${
                    log.includes('[SUCCESS]') || log.includes('cleared') ? 'text-emerald-400' : log.includes('[CRITICAL ERROR]') || log.includes('failed') ? 'text-rose-500 font-bold' : 'text-slate-300'
                  }`}>
                    {log}
                  </div>
                ))}
                {pipelineLogs.length === 0 && (
                  <div className="text-slate-600 italic">No historical session. Click Run Build to trigger simulated pipeline logs.</div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* 4. SOVEREIGN ALARM & PERFORMANCE MONITORING PODS */}
        {activeSubTab === 'monitoring' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left metrics controls (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">Configure Cloud Alert Rules</h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Set sovereign limits on GCP Cloud Monitoring alerts. If any cluster node breaches CPU thresholds in us-central1 or eu-south-1, active warnings trigger instantly.
              </p>

              {/* Metric threshold setting */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="font-sans font-bold text-slate-300">Target CPU Warning Threshold</span>
                  <span className="font-mono text-emerald-400 font-bold">{cpuThreshold}% Load</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="95" 
                  value={cpuThreshold}
                  onChange={(e) => setCpuThreshold(Number(e.target.value))}
                  className="w-full h-2 accent-emerald-500 bg-slate-950 rounded-lg cursor-pointer"
                />
              </div>

              {/* Simulated active backup state checkboxes representing immutable logging policy */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 pt-4">
                <span className="text-[10px] text-slate-500 uppercase font-mono font-semibold block">Sovereign Backup & Retention Config</span>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Cloud SQL PG Backup Retention</span>
                  <span className="font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">7-Year Immutable Logs</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Storage Versioning Policies</span>
                  <span className="font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">Durable GCS Dual-Region</span>
                </div>
              </div>

            </div>

            {/* Right metrics visual indicators dashboard panel (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <BarChart2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">Cloud Monitoring Live CPU Loads</h3>
                </div>

                {/* Baghdad Live progress load */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans font-semibold text-slate-300">Baghdad Primary us-central1 (CPU)</span>
                    <span className={`font-mono font-bold ${baghdadCpu > cpuThreshold ? 'text-rose-500 animate-pulse' : 'text-slate-300'}`}>
                      {baghdadCpu}%
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-950 rounded overflow-hidden border border-slate-800">
                    <div 
                      className={`h-3 rounded transition-all duration-1000 ${
                        baghdadCpu > cpuThreshold ? 'bg-rose-500' : 'bg-emerald-500'
                      }`} 
                      style={{ width: `${baghdadCpu}%` }}
                    ></div>
                  </div>
                </div>

                {/* Basra Load display */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans font-semibold text-slate-300">Basra DR Secondary eu-south-1 (CPU)</span>
                    <span className={`font-mono font-bold ${basraCpu > cpuThreshold ? 'text-rose-500 animate-pulse' : 'text-slate-300'}`}>
                      {basraCpu}%
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-950 rounded overflow-hidden border border-slate-800">
                    <div 
                      className={`h-3 rounded transition-all duration-1000 ${
                        basraCpu > cpuThreshold ? 'bg-rose-500' : 'bg-blue-400'
                      }`} 
                      style={{ width: `${basraCpu}%` }}
                    ></div>
                  </div>
                </div>

                {/* Erbil Load display */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans font-semibold text-slate-300">Erbil Node me-central-1 (CPU)</span>
                    <span className={`font-mono font-bold ${erbilCpu > cpuThreshold ? 'text-rose-500 animate-pulse' : 'text-slate-300'}`}>
                      {erbilCpu}%
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-950 rounded overflow-hidden border border-slate-800">
                    <div 
                      className={`h-3 rounded transition-all duration-1000 ${
                        erbilCpu > cpuThreshold ? 'bg-rose-500' : 'bg-purple-400'
                      }`} 
                      style={{ width: `${erbilCpu}%` }}
                    ></div>
                  </div>
                </div>

                {/* Warnings Alert Log box */}
                {(baghdadCpu > cpuThreshold || basraCpu > cpuThreshold || erbilCpu > cpuThreshold) && (
                  <div className="bg-rose-950/20 border border-rose-500/30 p-3 rounded-lg text-[11px] text-rose-300 flex items-center gap-2 animate-bounce">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{t.alertBreach} Triggering pod horizontal replica scaling.</span>
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* 5. RESILIENCE PLAYBOOKS & COST CALCULATIONS */}
        {activeSubTab === 'runbook' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left side playbooks documentation checklist (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">Disaster Recovery Incident Runbook</h3>
              </div>

              <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
                <p>
                  Official step-by-step procedures for failover transitions from <strong>Baghdad Hub (Primary Region)</strong> to <strong>Basra Hub (DR Site)</strong> to achieve 99.99% operational SLA.
                </p>

                {/* Steps mapping */}
                <div className="space-y-3 pt-2">
                  {[
                    { nr: "STEP 1", title: "Automated Health Checks Detection", text: "Global load balancer (GSLB) health monitoring tags report 3 consecutive failed health pings on Baghdad port nodes in under 15 seconds." },
                    { nr: "STEP 2", title: "DNS and Route 53 Cutover", text: "Anycast geographic routing entries instantly map 'customs.iraq-nsw.gov.iq' IP target block from Baghdad to Basra cluster gateways." },
                    { nr: "STEP 3", title: "Write Access Promotion", text: "Promote Basra's Cloud SQL replica database to standalone master node. Write routing enabled for new customs transactions." },
                    { nr: "STEP 4", title: "Erbil Local Synchronization Redirect", text: "Synchronize Erbil border nodes to store metadata queues inside Basra's primary storage channels until primary recovery is secured." }
                  ].map(step => (
                    <div key={step.nr} className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex gap-3">
                      <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded h-max text-[10px] shrink-0 border border-emerald-500/20">{step.nr}</span>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-white font-sans">{step.title}</h4>
                        <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right side Cost Estimators (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Percent className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">DevOps Financial Optimizer</h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Forecast budget savings on sovereign workloads using GCK preemptible nodes, custom Spot instances, and multi-year GCP Committed Use Discounts (CUDs).
                </p>

                {/* Commited use options */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-500 uppercase font-mono font-bold block">GCP Commitment Term</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'none', label: "None (On-Demand)" },
                        { id: '1yr', label: "1-Year (37% Save)" },
                        { id: '3yr', label: "3-Year (55% Save)" }
                      ].map(dur => (
                        <button
                          key={dur.id}
                          onClick={() => setCommitmentYear(dur.id as any)}
                          className={`p-2.5 rounded-lg border text-[10px] font-sans font-bold text-center cursor-pointer transition-all ${
                            commitmentYear === dur.id 
                              ? 'bg-slate-950 border-emerald-500 text-emerald-400' 
                              : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-300'
                          }`}
                        >
                          {dur.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Spot VMs */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-200 block">Use Spot / Preemptible VMs</span>
                      <span className="text-[10px] text-slate-500 font-mono">Applicable for non-critical batch layers</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={spotEnabled}
                      onChange={(e) => setSpotEnabled(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-800 bg-slate-950 accent-emerald-500 text-slate-200 outline-none cursor-pointer"
                    />
                  </div>

                  {/* Outcome display */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/20 text-center space-y-1">
                    <span className="text-[10px] uppercase font-mono text-slate-500 block">Deducted Saving Rate</span>
                    <span className="text-3xl font-mono font-extrabold text-emerald-400">
                      {commitmentYear === 'none' ? (spotEnabled ? "60%" : "0%") : commitmentYear === '1yr' ? (spotEnabled ? "75%" : "37%") : (spotEnabled ? "85%" : "55%")}
                    </span>
                    <span className="text-[9px] text-slate-400 block pt-1">Savings directly offset from initial approved capital plan</span>
                  </div>
                </div>

              </div>

              {/* Informational telemetry footer */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-500 font-mono flex items-center justify-between">
                <span>Compliance Audits: <strong className="text-emerald-400">ISO 27001 Passed</strong></span>
                <span>Active Shield: <strong className="text-emerald-400">WAF Active</strong></span>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
