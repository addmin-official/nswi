import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, CheckCircle2, Play, Terminal, Eye, Code, FileText, 
  Settings, Users, ChevronRight, Activity, Percent, Bug, Plus,
  Trash2, AlertTriangle, RefreshCw, BarChart2, Layers, Search, 
  Copy, Check, FileCheck, ThumbsUp, AlertCircle, HelpCircle, ArrowUpRight
} from 'lucide-react';
import { Language } from '../types';

interface QATestingPortalProps {
  lang: Language;
}

interface QAIssue {
  id: string;
  title: string;
  service: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'INVESTIGATING' | 'FIXED' | 'VERIFIED';
  reportedAt: string;
}

export default function QATestingPortal({ lang }: QATestingPortalProps) {
  const isRtl = lang === 'ar' || lang === 'ku';

  // Sub tabs
  const [activeSubTab, setActiveSubTab] = useState<'strategy' | 'runner' | 'accessibility' | 'reporter' | 'issues'>('strategy');
  
  // Selected test code view
  const [selectedSuite, setSelectedSuite] = useState<'unit_go' | 'integration_jest' | 'e2e_playwright' | 'perf_k6' | 'sec_owasp'>('unit_go');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Live simulation states
  const [isRunningTests, setIsRunningTests] = useState<boolean>(false);
  const [testProgress, setTestProgress] = useState<number>(0);
  const [testResult, setTestResult] = useState<'idle' | 'running' | 'passed' | 'failed'>('idle');
  const [runLogs, setRunLogs] = useState<string[]>([]);
  const [testFilter, setTestFilter] = useState<'all' | 'passed' | 'failed'>('all');

  // Performance simulation configurations
  const [virtualUsers, setVirtualUsers] = useState<number>(50);
  const [simulateSpike, setSimulateSpike] = useState<boolean>(false);
  const [simulatedLatency, setSimulatedLatency] = useState<number>(34);
  const [simulatedTps, setSimulatedTps] = useState<number>(450);

  // Issues database (stateful for live bug tracking)
  const [issues, setIssues] = useState<QAIssue[]>([
    { id: "BUG-101", title: "RTL Arabic font alignment collapse on customs declaration print template", service: "Document Service", severity: "HIGH", status: "INVESTIGATING", reportedAt: "2026-06-01" },
    { id: "BUG-102", title: "Umm Qasr edge node GCS signed lease negotiation timeout under 5000 RPS burst", service: "Tracking Service", severity: "CRITICAL", status: "OPEN", reportedAt: "2026-06-02" },
    { id: "BUG-103", title: "Central Bank payment webhook retry delays leading to ASYCUDA ledger delays", service: "Payment Service", severity: "MEDIUM", status: "FIXED", reportedAt: "2026-05-30" },
    { id: "BUG-104", title: "Unencrypted JWT payload cache validation fallback breach (Checkov Rule #CK-91)", service: "Gateway Proxy", severity: "CRITICAL", status: "VERIFIED", reportedAt: "2026-05-28" },
    { id: "BUG-105", title: "Offline reconciliation queue missing eventual consistency metadata key", service: "Synchronization Engine", severity: "MEDIUM", status: "OPEN", reportedAt: "25-05-2026" }
  ]);
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [newIssueService, setNewIssueService] = useState('Customs Clearance');
  const [newIssueSeverity, setNewIssueSeverity] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');

  // Trigger copy notify
  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Live Performance Metric generator loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (simulateSpike) {
        setSimulatedLatency(prev => Math.min(180, Math.max(90, Math.floor(Math.random() * 40) + 110)));
        setSimulatedTps(prev => Math.min(2200, Math.max(1600, Math.floor(Math.random() * 200) + 1800)));
      } else {
        const baseLatency = 20 + Math.ceil(virtualUsers / 10);
        setSimulatedLatency(prev => Math.min(50, Math.max(15, baseLatency + Math.floor(Math.random() * 6) - 3)));
        setSimulatedTps(prev => Math.min(900, Math.max(50, virtualUsers * 8 + Math.floor(Math.random() * 50) - 25)));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [virtualUsers, simulateSpike]);

  // Run Test Suite Simulator Logic
  const handleStartTests = () => {
    setIsRunningTests(true);
    setTestResult('running');
    setTestProgress(2);
    setRunLogs(["[QA-ENGINE] Initializing Automated National Single Window Portal Test Suite...", "[QA-ENGINE] Target environment detected: STAGING-CLUSTER-PRIMARY (us-central1)"]);

    const steps = [
      { prg: 15, log: "[UNIT-TEST] Running Golang 'customs_tax_test.go'... [PASSED: 48 tests, 0 warnings]", delay: 50 * 8 },
      { prg: 30, log: "[UNIT-TEST] Running Python 'fraud_risk_score_test.py' models... [PASSED: 12 epochs verified]", delay: 50 * 12 },
      { prg: 45, log: "[INTEGRATION-TEST] Probing CBI Banking Hook Web API sandbox endpoints... [SUCCESS: Status 200 OK]", delay: 50 * 15 },
      { prg: 65, log: "[INTEGRATION-TEST] Validating GCS signed-lease generation parameters... [PASSED]", delay: 50 * 14 },
      { prg: 78, log: "[E2E-PLAYWRIGHT] Executing simulated Iraqi Trader customs submission journey... [PASSED in 4.88s]", delay: 50 * 18 },
      { prg: 90, log: "[SECURITY-SCAN] Triggering OWASP ZAP secure api endpoint spider scans... [Zero High Vulnerabilities detected]", delay: 50 * 16 },
      { prg: 100, log: "[COMPLIANCE] WCAG 2.1 AA Checklist matching check complete! Arabic-Kurdish RTL alignment verified.", delay: 50 * 10 }
    ];

    let stepIndex = 0;
    const runNextStep = () => {
      if (stepIndex >= steps.length) {
        setIsRunningTests(false);
        setTestResult('passed');
        setRunLogs(prev => [...prev, "[SUCCESS] All National Single Window automated test scenarios executed with ZERO defects detected! Quality Level Certifed. STABLE."]);
        return;
      }
      setTimeout(() => {
        setTestProgress(steps[stepIndex].prg);
        setRunLogs(prev => [...prev, steps[stepIndex].log]);
        stepIndex++;
        runNextStep();
      }, steps[stepIndex].delay);
    };
    runNextStep();
  };

  // Dynamic add issue to our localized database
  const handleAddIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIssueTitle.trim()) return;

    const bugID = `BUG-${Math.floor(Math.random() * 900) + 200}`;
    const newBug: QAIssue = {
      id: bugID,
      title: newIssueTitle,
      service: newIssueService,
      severity: newIssueSeverity,
      status: 'OPEN',
      reportedAt: new Date().toISOString().split('T')[0]
    };

    setIssues([newBug, ...issues]);
    setNewIssueTitle('');
  };

  // Delete bug from log
  const handleDeleteIssue = (id: string) => {
    setIssues(issues.filter(b => b.id !== id));
  };

  // Status transitions
  const handleToggleStatus = (id: string) => {
    setIssues(issues.map(b => {
      if (b.id === id) {
        const statuses: QAIssue['status'][] = ['OPEN', 'INVESTIGATING', 'FIXED', 'VERIFIED'];
        const currentIdx = statuses.indexOf(b.status);
        const nextStatus = statuses[(currentIdx + 1) % statuses.length];
        return { ...b, status: nextStatus };
      }
      return b;
    }));
  };

  // Code snippets data bank
  const suiteCodeBank = {
    unit_go: `package customs_test

import (
	"testing"
	"time"
)

// Unit testing the central trade tax and auto calculation engine
func TestCalculateCustomsDutiesAndTaxes(t *testing.T) {
	tests := []struct {
		name              string
		declaredValUSD    float64
		customsOffice     string
		expectedDutyIQD   float64
		shouldError       bool
	}{
		{"Umm Qasr Bulk Soya", 150000.00, "UQC", 150000 * 1450 * 0.05, false}, // 5% tariff base
		{"Safwan Border Vehicles", 24000.00, "SFW", 24000 * 1450 * 0.15, false},  // X-Border vehicle tariff
		{"Negative Declared Cost", -12.00, "UQC", 0, true},                      // Out of bound validation
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			calcDuties, err := CalculateCustomsMetric(tt.declaredValUSD, tt.customsOffice)
			if (err != nil) != tt.shouldError {
				t.Fatalf("Calculation status mismatched expected error boundaries: %v", err)
			}
			if !tt.shouldError && calcDuties != tt.expectedDutyIQD {
				t.Errorf("Duty mismatch! Expected: %v, Computed: %v", tt.expectedDutyIQD, calcDuties)
			}
		})
	}
}`,
    integration_jest: `// Integration Testing the Central Bank of Iraq (CBI) payment integration
import { CBIPaymentGateway } from './payment-gateways';
import { mockDatabase } from './mock-database';

describe('Central Bank payment settlement workflow', () => {
  let gateway: CBIPaymentGateway;

  beforeEach(() => {
    gateway = new CBIPaymentGateway({
      apiUrl: 'https://sandbox.cbi.gov.iq/v2/settlement',
      apiKey: 'test-nsw-token-993d',
    });
    mockDatabase.clear();
  });

  test('Initiates payments and successfully processes state update webhook', async () => {
    const paymentResult = await gateway.initiateDutyTransfer({
      manifestId: 'MANIFEST-UQC-3990',
      amountIQD: 14500000,
      bankRouting: 'CBI-BAGH-001'
    });

    expect(paymentResult.referenceId).toBeDefined();
    expect(paymentResult.status).toBe('PENDING');

    // Simulate callback event from Central Bank IPN
    const ipnResponse = await gateway.handleCallbackEvent({
      paymentReference: paymentResult.referenceId,
      status: 'SETTLED',
      authHash: 'c7c82c9e7828ea28'
    });

    expect(ipnResponse.updatedManifestStatus).toBe('PASSED');
  });
});`,
    e2e_playwright: `// Playwright end-to-end user path simulation of the customs agent pipeline
import { test, expect } from '@playwright/test';

test.describe('Standard Iraqi Trader Clearance Journey E2E', () => {
  test('Submit manifest form, trigger risk scorer, and settle custom fees', async ({ page }) => {
    // 1. Visit Portal and Choose Login
    await page.goto('https://portal.iraq-nsw.gov.iq');
    await page.getByRole('button', { name: 'عربي' }).click(); // Select Arabic Locale
    
    await page.fill('#username-input', 'iraq-trader-corp');
    await page.fill('#password-input', 'SovereignSecurePass2026!');
    await page.click('#submit-login');

    // 2. Draft New Manifest Details
    await page.click('#new-declaration-btn');
    await page.selectOption('#customs-office-select', 'UQC'); // Umm Qasr Entry Point
    await page.fill('#declared-value-usd', '85000');
    await page.fill('#item-quantity', '120');
    await page.fill('#country-of-origin', 'CN');

    // Submit Document Attachment
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('#invoice-file-dropzone');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('./test-assets/invoice-manifest.pdf');

    await page.click('#submit-manifest-btn');

    // 3. Risk Engine automated verdict verification
    await expect(page.locator('#manifest-status')).toContainText('قيد المراجعة');
    await page.waitForTimeout(2000); // Wait for microservice async score

    // Payment prompt
    await expect(page.locator('#payment-notice')).toBeVisible();
    await page.click('#pay-duties-btn');
  });
});`,
    perf_k6: `// k6 Performance Testing Script representing customs gate under peak traffic load
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 }, // ramp up to 100 concurrent custom clearance traders
    { duration: '1m', target: 500 },  // spike loading Customs Gateway
    { duration: '30s', target: 0 },   // ramp down scale
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],    // under 1% total request failures allowed
    http_req_duration: ['p(95)<300'], // 95% of queries must resolve faster than 300ms
  },
};

export default function () {
  const payload = JSON.stringify({
    customs_office_code: "UQC",
    total_val_usd: 125000
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'X-Sovereign-Local-Token': 'test-session-k6-kurdish-baghdad'
    },
  };

  const res = http.post('https://api.iraq-nsw.gov.iq/api/v1/valuation/calculate', payload, params);
  
  check(res, {
    'status is 201 calculate response': (r) => r.status === 201,
    'calculating body returns valid schema': (r) => r.json().duty_payable_iqd !== undefined
  });

  sleep(1);
}`,
    sec_owasp: `# OWASP ZAP API Active Security vulnerability scanner task pipeline
zap-cli -p 8080 spider https://api.iraq-nsw.gov.iq/api/v1
zap-cli -p 8080 active-scan --scan-policy "StrictSovereignSecurity" https://api.iraq-nsw.gov.iq/api/v1

# Checkov static compliance screening
checkov -d /github/workspace/terraform --framework terraform --quiet --soft-fail-on HIGH`
  };

  return (
    <div className="space-y-6" id="qa-testing-portal-root">
      
      {/* Top QA Professional Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full animate-pulse"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-slate-950 bg-emerald-500 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                Senior QA Engine
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded">
                Test Automation Portal (v2.1)
              </span>
            </div>
            <h2 className="text-xl font-sans font-extrabold text-white mt-3 tracking-tight">
              {lang === 'en' ? "Testing Strategy & Automated Test Suites" 
                : lang === 'ar' ? "استراتيجية الجودة الشاملة وأتمتة الاختبارات البرمجية" 
                : "ستراتیژیتی گشتگیری پشکنین و کۆگا خۆکارییەکانی کوالیتی"}
            </h2>
            <p className="text-xs text-slate-400 mt-2 max-w-4xl leading-relaxed">
              {lang === 'en' 
                ? "Manage and simulate the complete QA Automation ecosystem for Iraq's National Single Window. Run continuous integration testing pipelines, view unit and E2E test files across frameworks (Go, Jest, Playwright, k6), analyze active performance load stress response, audit WCAG 2.1 compliance, and manage open bugs."
                : lang === 'ar'
                ? "إدارة ومحاكاة واجهة التحقق والاختبارات الشاملة للنافذة الوطنية العراقية الموحدة. تصفح ملفات الاختبار، قم بمحاكاة فحص الضغط والأداء (k6)، اختبر الالتزام بمعايير الوصول WCAG 2.1، وتابع سجل الأخطاء البرمجية."
                : "بەڕێوەبردن و هاوشێوەکردنی کۆگای پشکنینی کوالیتی بۆ دەروازەی عێراق. تاقیکردنەوەی لۆد و هێز (k6)، پشکنینی وەرگێڕان و ئاسانی گەیشتن بەپێی ستانداردەکانی WCAG 2.1، و چاودێریکردنی کێشە و باگە سەرەکییەکان."}
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 self-start md:self-auto shrink-0 font-mono">
            <Percent className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] text-slate-300">Minimum Coverage target: <strong className="text-emerald-400">85.0%</strong></span>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-6 border-t border-slate-800 pt-5">
          {[
            { id: 'strategy', label: lang === 'en' ? "1. Test Plan Strategy" : lang === 'ar' ? "الخطة الاستراتيجية للأمان" : "پلانی پشکنین", icon: <FileText className="w-4 h-4" /> },
            { id: 'runner', label: lang === 'en' ? "2. Code Suite & Runner" : lang === 'ar' ? "سجل التشغيل والاختبار" : "سەرچاوە و کارپێکەر", icon: <Code className="w-4 h-4" /> },
            { id: 'accessibility', label: lang === 'en' ? "3. WCAG RTL Audit" : lang === 'ar' ? "الامتثال وسهولة الاستخدام" : "ئاسانی دەستگەیشتن", icon: <Layers className="w-4 h-4" /> },
            { id: 'reporter', label: lang === 'en' ? "4. Reports Dashboard" : lang === 'ar' ? "لوحة الإحصائيات الشاملة" : "داشبۆردی ڕاپۆرتەکان", icon: <BarChart2 className="w-4 h-4" /> },
            { id: 'issues', label: lang === 'en' ? "5. Integrated Bug Desk" : lang === 'ar' ? "مركز متابعة الأخطاء" : "هاوکاری کێشەکان", icon: <Bug className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex flex-col md:flex-row items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer ${
                activeSubTab === tab.id 
                  ? 'bg-emerald-600 text-slate-950 font-bold border-emerald-400 shadow-md scale-[1.01]' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <div>{tab.icon}</div>
              <span className="text-[10px] md:text-xs font-sans font-extrabold leading-none truncate">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Panels Content Grid */}
      <div className="grid grid-cols-1 gap-6">

        {/* PANEL 1: TESTING STRATEGY PLAN SPECIFICATION */}
        {activeSubTab === 'strategy' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileText className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">Iraq National Single Window QA Master Plan</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/10 w-max">Unit & Integration Tests</span>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  <strong>Standard requirement:</strong> Over 80% coverage on Go language Customs calculative functions, NestJS endpoint handlers, and Python risk inference classes. Mock external frameworks (CBI, ASYCUDA) are completely utilized to mock communication networks.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Tools: Go Testing, Jest, PyTest</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/10 w-max">E2E Journey Verification</span>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  <strong>Standard requirement:</strong> Every customs agent and border inspector journey is fully scripted inside Cypress/Playwright workflows. Covers login, file download/uploads, and direct invoice manifest parsing under eventual consistency guidelines.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Tools: Playwright, Cypress</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/10 w-max">Performance & Load Target</span>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  <strong>SLA:</strong> 99.99% system availability targets. System is qualified to process up to 10,000 requests per second (RPS) peak custom clearances. Scaling tests are actively simulated in CI/CD before deployment merges.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Tools: k6, Locust, JMeter</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest block bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/10 w-max">Zero-Trust & Security Audit</span>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  <strong>Security rules:</strong> Includes static code vulnerability checking (SAST), container image dependencies scan via GCP container security, and live penetrations spider tests. No private tokens are committed or stored.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Tools: OWASP ZAP, Checkov, SonarQube</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/10 w-max">RTL & Localization AA</span>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  <strong>Audit standard:</strong> WCAG 2.1 AA compliant UI layout verification. Ensures extreme contrast targets, clear text options, and fluid RTL flex flow across Arabic/Kurdish languages without element overlapping.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Tools: Axe DevTools, Playwright-Axe</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/10 w-max">CI/CD Automation Integration</span>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  <strong>Process mapping:</strong> Gated checks inside GitHub Actions workflows. Commits fail on any unit test drop under 80% coverage limits or security alerts. Reverts to previous stable Blue-Green GKE state automatically.
                </p>
                <div className="text-[10px] text-slate-500 font-mono">Tools: GitHub Actions, Cloud Build</div>
              </div>

            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400 block uppercase tracking-wider">Governance Acceptance Certificate</span>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                The QA architectures and parameters represented here are built to comply with requirements from the **National Digital Transformation Committee of Iraq**. Compliance audits are executed periodically for continuous secure operations.
              </p>
            </div>
          </div>
        )}

        {/* PANEL 2: AUTOMATED TESTING ROOM & SUITE EXPLORER */}
        {activeSubTab === 'runner' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Play/Control Side (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              
              <div className="space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Play className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">Automated Verification Desk</h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Select an automated test suite code repository files to examine structure, then trigger the active test run to verify that all Iraq National Single Window components pass criteria.
                </p>

                {/* Sub-selector buttons */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold px-1">Select Code Manifest file:</span>
                  {[
                    { id: 'unit_go', label: "Go Unit Tests (Customs duty)", ext: ".go" },
                    { id: 'integration_jest', label: "Jest Integration Tests (C CBI)", ext: ".js" },
                    { id: 'e2e_playwright', label: "Playwright E2E User Flow", ext: ".ts" },
                    { id: 'perf_k6', label: "k6 Stress script (Peak RPS)", ext: ".js" },
                    { id: 'sec_owasp', label: "OWASP ZAP API scan rule", ext: ".sh" },
                  ].map(suite => (
                    <button
                      key={suite.id}
                      onClick={() => setSelectedSuite(suite.id as any)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono flex items-center justify-between cursor-pointer transition-all ${
                        selectedSuite === suite.id 
                          ? 'bg-emerald-600 text-slate-950 font-bold border-emerald-400' 
                          : 'bg-slate-950 text-slate-400 border-slate-850 hover:bg-slate-850 hover:text-white'
                      }`}
                      style={{ direction: 'ltr' }}
                    >
                      <span>{suite.label}</span>
                      <span className="opacity-65 text-[10px] font-bold">{suite.ext}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Controls triggers */}
              <div className="border-t border-slate-800 pt-5 mt-5 space-y-3 font-sans">
                <button
                  disabled={isRunningTests}
                  onClick={handleStartTests}
                  className={`w-full font-bold text-xs p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isRunningTests 
                      ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed' 
                      : 'bg-emerald-600 text-slate-950 hover:bg-emerald-500 shadow-md font-extrabold'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  {isRunningTests ? "RUNNING NATIONAL TESTING SUITES..." : "RUN ALL AUTOMATED TESTS"}
                </button>
              </div>

            </div>

            {/* Code and Terminal Log Stream Side (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between h-[580px]">
              
              <div className="flex flex-col h-full space-y-4">
                
                {/* Visual code viewer segment */}
                <div className="flex-1 flex flex-col min-h-0 bg-slate-950 rounded-xl border border-slate-850 overflow-hidden">
                  <div className="bg-slate-950 border-b border-slate-850 px-4 py-2.5 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 bg-slate-900 px-2 py-0.5 rounded text-emerald-400 text-[10px] font-bold">
                      <Code className="w-3.5 h-3.5" /> CODE SOURCE
                    </span>
                    <button
                      onClick={() => handleCopyCode(suiteCodeBank[selectedSuite])}
                      className="text-slate-400 hover:text-white flex items-center gap-1 font-sans cursor-pointer text-[11px]"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-400 animate-bounce" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto font-mono text-[10px] leading-relaxed text-slate-300 relative select-text">
                    <pre>{suiteCodeBank[selectedSuite]}</pre>
                  </div>
                </div>

                {/* Simulated run outputs logger */}
                <div className="h-[200px] shrink-0 bg-slate-950 rounded-xl border border-slate-850 p-4 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono font-bold text-slate-500 tracking-wider mb-2 select-none border-b border-slate-900 pb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-emerald-400" /> STAGING PIPELINE TERMINAL OUTPUT
                    </span>
                    <span className={testResult === 'passed' ? 'text-emerald-400' : isRunningTests ? 'text-amber-400 animate-pulse' : 'text-slate-500'}>
                      {testResult === 'passed' ? "Passed" : isRunningTests ? `Progress: ${testProgress}%` : "Idle"}
                    </span>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto font-mono text-[10px] leading-relaxed text-slate-400 space-y-1 select-text scrollbar-thin">
                    {runLogs.map((log, idx) => (
                      <div key={idx} className={log.includes('[SUCCESS]') || log.includes('PASSED') ? 'text-emerald-400 font-medium' : log.includes('[QA-ENGINE]') ? 'text-sky-400' : 'text-slate-300'}>
                        {log}
                      </div>
                    ))}
                    {runLogs.length === 0 && (
                      <div className="text-slate-600 italic">Test runner is currently idle. Click Run above to trigger simulated diagnostic validations.</div>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* PANEL 3: WCAG 2.1 AA RTL LOCALIZATION AUDITING */}
        {activeSubTab === 'accessibility' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Layers className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">Arabic & Kurdish RTL Accessibility (WCAG 2.1 AA)</h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              To support traders across Iraq, the National Single Window portal enforces complete Bilingual localization checks which must pass the following WCAG accessibility rule criteria:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Checklist Group 1 */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-850 space-y-3">
                <span className="text-xs font-sans font-bold text-slate-200 block border-b border-slate-900 pb-2">Visual Content & Mirror direction</span>
                
                <div className="space-y-2.5">
                  {[
                    "CSS Logical Properties usage over absolute properties (use margin-inline-start over margin-left for auto RTL shifting).",
                    "Mirror alignment of structural elements, sidebars, navigation dropdown items, and step counts wizards when lang='ar' or lang='ku'.",
                    "Automatic selection of RTL fonts (El Messiri, Cairo, Almarai) ensuring sufficient line spacing (line-height: 1.6+) for custom text readability.",
                    "Interactive forms inputs icons switch sides to align with right-to-left layout orientations constraints."
                  ].map((rule, idx) => (
                    <div key={idx} className="flex gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="font-sans leading-relaxed">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checklist Group 2 */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-850 space-y-3">
                <span className="text-xs font-sans font-bold text-slate-200 block border-b border-slate-900 pb-2">Technical Accessibility Policies</span>
                
                <div className="space-y-2.5">
                  {[
                    "Color contrast standards verification checking. Maintains AAA targets (&gt; 7:1) for critical text notifications.",
                    "Logical keyboard tab indexes (tabIndex) mapped carefully to read from top-right to bottom-left under Arabic/Kurdish screens.",
                    "All screen readers guidelines are enriched with local language alt attributes and dynamic aria-live feedback signals.",
                    "Interactive forms error prompts are mirrored clearly and accompanied with high warning vocal and color configurations."
                  ].map((rule, idx) => (
                    <div key={idx} className="flex gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="font-sans leading-relaxed">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Simulated Live RTL translation checker box */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <span className="text-xs font-sans font-bold text-emerald-400 block uppercase tracking-wider">Test Translation and RTL Layout sandbox:</span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* EN Card */}
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-850 space-y-1" style={{ direction: 'ltr' }}>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">English Translation Layout (LTR)</span>
                  <p className="text-xs text-slate-200 font-sans font-bold">Clearance Manifesto #UQC-8890</p>
                  <p className="text-[11px] text-emerald-400 font-mono">Status: Awaiting Duties Payment Settle</p>
                </div>

                {/* AR Card */}
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-850 space-y-1" style={{ direction: 'rtl' }}>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">تنسيق اللغة العربية (RTL)</span>
                  <p className="text-xs text-slate-200 font-sans font-bold">بيان التخليص الجمركي #UQC-8890</p>
                  <p className="text-[11px] text-emerald-400 font-mono">الحالة: بانتظار تسوية الرسوم الجمركية والمكوس</p>
                </div>

                {/* KU Card */}
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-850 space-y-1" style={{ direction: 'rtl' }}>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">ڕێکخستنی زمانی کوردی (RTL)</span>
                  <p className="text-xs text-slate-200 font-sans font-bold">ڕاگەیاندنی گومرگی فەرمی #UQC-8890</p>
                  <p className="text-[11px] text-emerald-400 font-mono">بارودۆخ: لە چاوەڕوانی دانانی تێچووی گومرگی</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* PANEL 4: TEST REPORTING & PERFORMANCE DASHBOARD */}
        {activeSubTab === 'reporter' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Metrics Control Panel (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Settings className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">k6 Stress Test Parameters</h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Simulate different load thresholds to audit the National Single Window's reaction metrics. High concurrent virtual users test the Auto-Scaling capability of our GKE production endpoints.
              </p>

              {/* Stress VU slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="font-sans font-bold text-slate-300">Concurrent Virtual Users (VUs)</span>
                  <span className="font-mono text-emerald-400 font-bold">{virtualUsers} VUs</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="150" 
                  value={virtualUsers}
                  disabled={simulateSpike}
                  onChange={(e) => setVirtualUsers(parseInt(e.target.value))}
                  className="w-full h-2 accent-emerald-500 bg-slate-950 rounded-lg cursor-pointer"
                />
              </div>

              {/* Spike Engineering Mode */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 pt-4 font-sans">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs text-slate-300 font-bold block">Trigger High Traffic Spike</span>
                    <span className="text-[10px] text-slate-500 font-mono block">Simulates 10,000 concurrent RPS logins</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={simulateSpike}
                    onChange={(e) => setSimulateSpike(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-850 bg-slate-950 accent-rose-500 text-slate-200 outline-none cursor-pointer"
                  />
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2.5 font-sans text-xs">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold block">GKE Scaling Policy Rule</span>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  When target load exceeds 75% API gateway container pool limits, Kubernetes horizontally spawns new Pods in us-central1 (up to 100 replicas) to buffer response latency.
                </p>
              </div>

            </div>

            {/* Right Live Gauge Results Panel (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">Continuous Performance KPI</h3>
                </div>

                {/* Dashboard KPI grid summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-center space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono uppercase font-bold block">Test Pass Rate</span>
                    <span className="text-base font-extrabold text-emerald-400 font-mono">100%</span>
                    <div className="text-[9px] text-slate-500">122 Scenarios</div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-center space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono uppercase font-bold block">Avg Latency</span>
                    <span className={`text-base font-extrabold font-mono ${simulateSpike ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {simulatedLatency}ms
                    </span>
                    <div className="text-[9px] text-slate-500">SLA &lt;100ms</div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-center space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono uppercase font-bold block">Auto-Scale Load</span>
                    <span className="text-base font-extrabold text-sky-400 font-mono">{simulatedTps} TPS</span>
                    <div className="text-[9px] text-slate-500">Peak Capacity</div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-center space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono uppercase font-bold block">Overall Coverage</span>
                    <span className="text-base font-extrabold text-purple-400 font-mono">86.4%</span>
                    <div className="text-[9px] text-slate-500">Standard &gt;80%</div>
                  </div>

                </div>

                {/* Simulated Loading chart block representation UI */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 font-mono">
                  <span className="text-[10px] text-slate-500 tracking-wider font-bold block">K6 STRESS METRIC FLOW STABILITY STATEMENT</span>
                  
                  {simulateSpike ? (
                    <div className="border border-rose-500/20 bg-rose-950/10 p-3.5 rounded-lg flex items-start gap-2.5 text-xs text-rose-300">
                      <AlertTriangle className="w-5 h-5 shrink-0 animate-bounce" />
                      <div className="font-sans">
                        <span className="font-bold block text-rose-400">SPIKE RECOVERY ACTIVE</span>
                        HPA successfully commanded scale-up of document and tracking services node instances. Network buffered successfully. Latency peak preserved safely within 150ms margins.
                      </div>
                    </div>
                  ) : (
                    <div className="border border-emerald-500/20 bg-emerald-950/10 p-3.5 rounded-lg flex items-start gap-2.5 text-xs text-emerald-300">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <div className="font-sans font-medium">
                        <span className="font-bold block text-emerald-400">HEALTHY OPERATIONS DETECTED</span>
                        Virtual user requests flow cleanly. Auto-scaled pools remain at minimum idle reserves. Systems are fully compliant with sovereign service resilience metrics.
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Informational SLA footer info */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-[10px] text-slate-500 font-mono flex justify-between">
                <span>Accessibility Quality Score: <strong className="text-emerald-400">WCAG AA Certified</strong></span>
                <span>Security Shield State: <strong className="text-emerald-400">OWASP Passed</strong></span>
              </div>

            </div>

          </div>
        )}

        {/* PANEL 5: DYNAMIC QA BUG TRACKING & ISSUE DESK */}
        {activeSubTab === 'issues' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Right Side Create Issue (5 Cols) */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              
              <form onSubmit={handleAddIssue} className="space-y-4 font-sans">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Plus className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Report New QA Bug</h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Found a defect while running localization audit, security scanners, or Playwright E2E suites? Create the issue here to integrate it cleanly with our tracking workflow.
                </p>

                {/* Bug Title */}
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-bold uppercase block">Defect Name / Description:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Header dropdown button out of boundary in Farsi fallback"
                    value={newIssueTitle}
                    onChange={(e) => setNewIssueTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-200"
                  />
                </div>

                {/* Bug service area */}
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-bold uppercase block">Affected Service:</label>
                  <select
                    value={newIssueService}
                    onChange={(e) => setNewIssueService(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none font-medium text-slate-300"
                  >
                    <option value="Customs Core Service">Customs Core Service</option>
                    <option value="Document Service">Document Service</option>
                    <option value="Payment Gateway Host">Payment Gateway Host</option>
                    <option value="Tracking Service">Tracking Service</option>
                    <option value="Sovereign Gateway Proxy">Sovereign Gateway Proxy</option>
                    <option value="Sync Portal (Arabic/Kurdish)">Sync Portal (Arabic/Kurdish)</option>
                  </select>
                </div>

                {/* Bug Severity level */}
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-bold uppercase block">Severity Profile:</label>
                  <select
                    value={newIssueSeverity}
                    onChange={(e) => setNewIssueSeverity(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-slate-300"
                  >
                    <option value="CRITICAL">CRITICAL (System Blocks)</option>
                    <option value="HIGH">HIGH (Feature Broken)</option>
                    <option value="MEDIUM">MEDIUM (Minor Glitch)</option>
                    <option value="LOW">LOW (Visual Cosmetic)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-sans font-bold text-xs p-3.5 rounded-xl cursor-pointer transition-all shadow-md mt-4 uppercase tracking-wider"
                >
                  Log Active Bug Verification
                </button>
              </form>

            </div>

            {/* Dynamic Issues List Feed (8 Cols) */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Bug className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-sans font-bold text-white uppercase tracking-wider">Unified QA Bug tracking board</h3>
                  </div>
                  <span className="font-mono text-xs text-slate-500">Count: <strong>{issues.length} active</strong></span>
                </div>

                {/* Bug database list */}
                <div className="space-y-2.5 overflow-y-auto max-h-[380px] pr-1">
                  {issues.map(issue => (
                    <div key={issue.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-start justify-between gap-4 select-none">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">{issue.id}</span>
                          <span className={`text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded border ${
                            issue.severity === 'CRITICAL' ? 'bg-rose-950/60 border-rose-500/20 text-rose-500' :
                            issue.severity === 'HIGH' ? 'bg-amber-950/65 border-amber-500/20 text-amber-500' :
                            issue.severity === 'MEDIUM' ? 'bg-blue-950/60 border-blue-500/20 text-blue-500' :
                            'bg-slate-900 border-slate-800 text-slate-400'
                          }`}>
                            {issue.severity}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono font-bold">{issue.service}</span>
                        </div>
                        <p className="text-xs text-slate-200 font-sans font-bold leading-normal truncate-2-lines">{issue.title}</p>
                        <div className="text-[9px] text-slate-500 font-mono">Report Date: {issue.reportedAt}</div>
                      </div>

                      {/* Status state interactive click */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleStatus(issue.id)}
                          className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold cursor-pointer transition-all border ${
                            issue.status === 'OPEN' ? 'bg-rose-950/20 border-rose-500/10 text-rose-400 hover:bg-rose-900' :
                            issue.status === 'INVESTIGATING' ? 'bg-amber-950/20 border-amber-400/10 text-amber-400 hover:bg-amber-900' :
                            issue.status === 'FIXED' ? 'bg-blue-950/20 border-blue-400/10 text-blue-400 hover:bg-blue-900' :
                            'bg-emerald-950/30 border-emerald-500/20 text-emerald-400 hover:bg-emerald-900'
                          }`}
                        >
                          {issue.status}
                        </button>
                        <button
                          onClick={() => handleDeleteIssue(issue.id)}
                          className="text-slate-500 hover:text-rose-500 p-1 rounded hover:bg-slate-900 cursor-pointer transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {issues.length === 0 && (
                    <div className="text-center py-12 text-slate-500 text-xs italic font-sans">
                      All verification defects are settled! Clear board.
                    </div>
                  )}
                </div>

              </div>

              {/* Bug desk tip */}
              <div className="text-[10px] text-slate-500 font-mono italic mt-4 pt-4 border-t border-slate-900 select-none">
                *Tip: Click the Status button of any bug log (OPEN / FIXED / VERIFIED) to toggle and updates status pipeline state.
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
