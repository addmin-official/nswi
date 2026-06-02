import { useState } from 'react';
import { Copy, Check, Info, Server, Database, Globe, Layers, ShieldCheck, Zap } from 'lucide-react';
import { Language } from '../types';
import { RAW_MERMAID_DIAGRAM } from '../data/architectureData';

interface NodeDetail {
  id: string;
  name: { en: string; ar: string; ku: string };
  role: { en: string; ar: string; ku: string };
  details: { en: string; ar: string; ku: string };
  tech: string[];
}

interface ArchitectureDiagramProps {
  lang: Language;
}

export default function ArchitectureDiagram({ lang }: ArchitectureDiagramProps) {
  const [copied, setCopied] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("apigw");

  const nodesInfo: Record<string, NodeDetail> = {
    apigw: {
      id: "apigw",
      name: { en: "Apigee Enterprise Gateway", ar: "بوابة سحابية Apigee Enterprise", ku: "دەروازەی سحابی سەرەکی Apigee" },
      role: { en: "Security Proxy & Traffic Router", ar: "تأمين حماية فحص حركة المرور بالتعاون مع WCO", ku: "پاراستنی دەروازە و پشکنینی هاتوچۆی داتا" },
      details: {
        en: "Acting as Iraq's unified entry point. Strips invalid traffic, applies OAuth 2.0 validation, maps client schemas directly to the underlying microservices, and rates limits requests to 15k/sec to mitigate DDoS threats targeting national systems.",
        ar: "يعمل كنقطة دخول وطنية موحدة لكل المعاملات المعولمة. يقوم بتصفية حركة المرور وفحص شهادات التحقق (MFA)، ومنع هجمات حجب الخدمة (DDoS) مع الحفاظ على سرعة المعالجة.",
        ku: "کار دەکات وەک ناوەندی یەکەمی هاتوچۆی گشتی بۆ پاراستنی بەیاننامەکان، پێدانی مۆڵەتی خێرا و ڕێگریکردن لە هێرشە سێرڤەرییە دەرەکییەکان (DDoS)."
      },
      tech: ["Apigee Core", "OAuth 2.0", "mTLS Encryption", "Cloud Load Balancing"]
    },
    kafka: {
      id: "kafka",
      name: { en: "Apache Kafka Event Bus", ar: "ناقل المعالجة غير المتزامن Apache Kafka", ku: "هێڵی لۆجیستیکی هێندە خێرا Apache Kafka" },
      role: { en: "Asynchronous Message Orchestrator", ar: "منظم ومجدول رسائل العمليات اللامتزامنة", ku: "تۆمارکردن و ڕێکخستنی پەیامەکان بەبێ ڕاگرتنی بەکارهێنەران" },
      details: {
        en: "Provides decoupled high-availability stream queues. Essential for border areas with poor connectivity: logs events, delays synchronous database pressure, and synchronizes with ASYCUDA database nodes asynchronously.",
        ar: "يوفر قنوات ومسارات متوازية لمعالجة آلاف الرسائل والملفات بالثانية. نظام ضروري لضمان عدم ضياع المعاملات حتى في أصعب الظروف وانقطاع الإنترنت في المنافذ الحدودية البعيدة.",
        ku: "سیستمێکی زۆر بەهێزە بۆ هێشتنەوەی گشت زانیارییەکان لە ناو یەک هێڵدا بە شێوەی پەیام بۆ ڕێگریکردن لە ونبوونی فایل لە کاتی خراپی هێڵەکانی ئینتەرنێت لەسەر سنورەکان."
      },
      tech: ["Apache Kafka", "Confluent Operator", "gRPC Connectors", "schema registry"]
    },
    spanner: {
      id: "spanner",
      name: { en: "Google Cloud Spanner Database", ar: "قاعدة البيانات السحابية السائدة Cloud Spanner", ku: "بنکەی زانیاری دابەشکراو Google Spanner" },
      role: { en: "Regionally Consistent Ledger Database", ar: "السجل والوعاء الرئيسي الموحد لكافة الوزارات والمصارف", ku: "تۆماری گشتی و ناوەندی بۆ هەموو وەزارەت و بانکەکان" },
      details: {
        en: "Fully managed on GCP physical sovereign host pods. Replicates synchronously across Baghdad, Basra disaster recovery site, and Erbil regional hub. Guarantees transactional consistency for duty calculation payments & custom logs without any locking overhead.",
        ar: "قاعدة بيانات سيادية موزعة بالكامل داخل حدود العراق ومحمية بمفاتيح التشفير الوطنية. تقدم التزامن السحابي والمالي الفوري بين بغداد وأربيل والبصرة لضمان التماسك والشفافية.",
        ku: "خزمەتگوزارییەکی گشتی سحابییە لە خاکی عێراقدا بۆ نوێکردنەوە و بەیەکەوە بەستنی داتاکانی بەغدا، بەسرە و هەولێر بە هاوئاهەنگی کاتی بۆ ڕێگری لە جیاوازی زانیاری باجەکان."
      },
      tech: ["Cloud Spanner", "Distributed SQL", "Cryptographic Hashing Ledger", "Sovereign Cloud KMS"]
    },
    asycuda: {
      id: "asycuda",
      name: { en: "UNCTAD ASYCUDA World System", ar: "نظام أسيكودا العالمي التابع للأمم المتحدة", ku: "سیستمی جیهانی ئاسیکۆدا (ASYCUDA)" },
      role: { en: "Legacy Customs Declarations Engine", ar: "النظام المركزي القديم للبيانات الجمركية والاتحاد", ku: "سیستمی سەرەکی کۆن بۆ بڕیاردانی گومرگی" },
      details: {
        en: "The historic system of record deployed in Iraqi custom stations. Our NSW integration proxy translates XML/SOAP structures directly, safely injecting validated declarations (SAD) into ASYCUDA's back-end database without manual operations.",
        ar: "النظام التقليدي المعتمد حالياً في الجمرك العراقي. تقوم بوابتنا الآمنة NSW بترجمة واستخراج البيانات وتحويلها إلى SOAP/XML وحقنها آلياً في أسيكودا لتفادي تزوير المخلصين.",
        ku: "سیستمی کۆنی بەکارھێنراو لە گومرگی عێراقدا. پەنجەرەی پێشەنگ داتاکان وەردەگێڕێتە سەر شێوازی SOAP/XML بە شێوازێکی ئۆتۆماتیکی تا ڕێگە لە گەندەڵی و ساختەکردنی پاشەکەوت بگرێت."
      },
      tech: ["ASYCUDA SOAP Webservices", "Oracle DB Backend", "EDIFACT Mapping Gateway"]
    },
    edge: {
      id: "edge",
      name: { en: "Border Edge Workstations", ar: "الحوسبة والأنظمة الطرفية اللامركزية بالمعابر", ku: "سیستمی لێواری کارکردنی مەرزەکان" },
      role: { en: "Resilient Offline Core Terminal", ar: "بوابة المعابر والمكاتب الحدودية لضمان استمرار الدعم", ku: "داڵدەی خۆڕاگری کار لەسەر سنور بۆ کاتی بێ ئینتەرنێتی" },
      details: {
        en: "Rugged localized hardware nodes deployed at active border checkpoints (such as Ibrahim Khalil in the north, Safwan in the south). Runs edge database clusters (CockroachDB) storing regional tax directories to permit continuous customs check-outs offline.",
        ar: "أنظمة حوسبة معززة مادياً للمجالات الصعبة ومثبّته جغرافياً بالمعابر الحدودية (كإبراهيم خليل وسفوان وأم قصر). تتيح تسجيل وتدقيق وإطلاق الشاحنات فوراً بمعزل تام عن المركز في انقطاع الشبكة.",
        ku: "ئامێری توندی کۆمپیوتەری ناوخۆیی لە مەرزەکاندا (وەک ئیبراهیم خەلیل لە باکور و سەفوان لە باشور). خاوەنی داتابەیسی لێواریCockroachDBە بۆ مۆڵەت پێدان بە شاحناکان لە کاتی نەبوونی پەیوەندی بە بەغداوە."
      },
      tech: ["CockroachDB Edge", "Rust Daemon Core", "SQLite Fallback Cache", "Biometric Terminal Scan"]
    }
  };

  const currentSelected = nodesInfo[selectedNodeId || "apigw"];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(RAW_MERMAID_DIAGRAM);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const isRtl = lang === 'ar' || lang === 'ku';

  return (
    <div className="space-y-6" id="architecture-diagram-container">
      {/* Header spec info */}
      <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-sans font-semibold text-emerald-400 flex items-center gap-2">
            <Layers className="w-5 h-5" />
            {lang === 'en' && "Multi-Region Topology & Data Stream"}
            {lang === 'ar' && "الهياكل والنواحي المتلاقية للتوزيع المالي والجغرافي"}
            {lang === 'ku' && "تەلارسازی دابەشبوونی هەرێمی و گرێدانی زانیاری"}
          </h3>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {lang === 'en' && "Interactive blueprint demonstrating how Iraqi trade data routes from the trader API, triggers parallel ministry licensing steps, processes ISO 20022 billing, and injects into raw ASYCUDA nodes."}
            {lang === 'ar' && "مخطط تفاعلي يوضح كيفية انتقال معطيات التجارة العراقية من بوابة المستورد، وإجراء الموافقات المتوازية، والتحصيل المالي السيادي وحقنها آلياً في نظام أسيكودا."}
            {lang === 'ku' && "نەخشەی تەفاعلی پیشاندانی چۆنیەتی هاتنی داتای بازرگانی لە دەروازەوە بۆ وەزارەتە جیاوازەکان و ڕێکارەکانی باج بە شێوازی مۆدێرن بەبێ وەستان."}
          </p>
        </div>

        <button
          onClick={handleCopyCode}
          id="copy-mermaid-btn"
          className="bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 text-slate-300 border border-slate-700 hover:border-emerald-500/50 px-4 py-2.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer self-start md:self-center"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400 animate-bounce" /> : <Copy className="w-4 h-4" />}
          {copied ? (lang === 'en' ? "Copied Code!" : lang === 'ar' ? "تم النسخ!" : "کۆپی کرا!") : (lang === 'en' ? "Copy Mermaid Schema" : lang === 'ar' ? "نسخ نظام ميرميد" : "کۆپیکردنی کۆدی مێرمەید")}
        </button>
      </div>

      {/* Grid Dashboard for System Blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Schematic Diagram in Center */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl p-4 md:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[500px]">
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              {lang === 'en' && "Iraq Sovereign Sandbox Live Core"}
              {lang === 'ar' && "خادم المحاكاة السيادي العراقي الحي"}
              {lang === 'ku' && "سێرڤەری تاقیکردنەوەی تەکنیکی سەروەری عێراق"}
            </span>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-4 text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded bg-emerald-500"></span>
              {lang === 'en' ? "NSW Core Node" : lang === 'ar' ? "العقدة الأساسية" : "گرێی سەرەکی"}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded bg-blue-500"></span>
              {lang === 'en' ? "Legacy/Bank Link" : lang === 'ar' ? "الأنظمة الخارجية/المصارف" : "بانک و سیستمی کۆن"}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded bg-amber-500"></span>
              {lang === 'en' ? "Rugged Edge" : lang === 'ar' ? "البوابة الحدودية" : "مەرزی سەر سنور"}
            </span>
          </div>

          {/* Graphical Map Topology */}
          <div className="my-auto py-8">
            <div className="relative w-full max-w-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-16 md:gap-x-8 text-center" style={{ direction: 'ltr' }}>
              
              {/* Row 1: Merchant & API Gateway */}
              <div className="md:col-span-3 flex flex-col items-center justify-center relative">
                <div 
                  id="node-apigw"
                  onClick={() => setSelectedNodeId("apigw")}
                  className={`w-64 cursor-pointer p-4 rounded-xl border transition-all ${
                    selectedNodeId === 'apigw' 
                      ? 'bg-emerald-950/70 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]Scale-105' 
                      : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Globe className={`w-5 h-5 ${selectedNodeId === 'apigw' ? 'text-emerald-400 animate-spin-slow' : 'text-slate-400'}`} />
                    <span className="text-sm font-sans font-bold text-white">APIGW Portal</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">Apigee Gateway Proxy</div>
                  <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden relative">
                    <div className="bg-emerald-400 h-full w-2/3 absolute left-0 rounded-full animate-pulse"></div>
                  </div>
                </div>
                {/* Visual Connection line */}
                <div className="h-10 w-0.5 bg-gradient-to-b from-emerald-500 to-emerald-800 hidden md:block mt-2"></div>
              </div>

              {/* Row 2 Core Service Bus Left & Right */}
              {/* LEFT: Kafka Event Logs */}
              <div className="flex flex-col items-center relative">
                <div 
                  id="node-kafka"
                  onClick={() => setSelectedNodeId("kafka")}
                  className={`w-full max-w-[170px] cursor-pointer p-3.5 rounded-xl border transition-all ${
                    selectedNodeId === 'kafka' 
                      ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_15px_rgba(5,150,105,0.4)]' 
                      : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-sans font-semibold text-white">Apache Kafka</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">Events Message Bus</span>
                  <div className="flex gap-1 justify-center mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  </div>
                </div>
              </div>

              {/* CENTER: Google Spanner Database */}
              <div className="flex flex-col items-center relative">
                <div 
                  id="node-spanner"
                  onClick={() => setSelectedNodeId("spanner")}
                  className={`w-full max-w-[170px] cursor-pointer p-3.5 rounded-xl border transition-all ${
                    selectedNodeId === 'spanner' 
                      ? 'bg-emerald-950/40 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                      : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-sans font-semibold text-white">Cloud Spanner</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">Iraq Sovereign Master Ledger</span>
                  <div className="flex gap-1 justify-center mt-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                </div>
              </div>

              {/* RIGHT: ASYCUDA World legacy connect */}
              <div className="flex flex-col items-center relative">
                <div 
                  id="node-asycuda"
                  onClick={() => setSelectedNodeId("asycuda")}
                  className={`w-full max-w-[170px] cursor-pointer p-3.5 rounded-xl border transition-all ${
                    selectedNodeId === 'asycuda' 
                      ? 'bg-blue-950/40 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                      : 'bg-slate-900 border-slate-800 hover:border-blue-500/50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Server className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-sans font-semibold text-white">ASYCUDA World</span>
                  </div>
                  <span className="text-[9px] font-mono text-blue-300">UNCTAD Legacy SOAP Node</span>
                  <div className="mt-2 text-[9px] text-blue-400 font-mono bg-blue-950 px-1 py-0.5 rounded border border-blue-900/40">XML Tunnel Active</div>
                </div>
              </div>

              {/* Row 3 Border Resilient Edges */}
              <div className="md:col-span-3 flex flex-col items-center justify-center relative mt-6">
                <div className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-semibold mb-3">
                  {lang === 'en' && "Rugged Border Edge Offices"}
                  {lang === 'ar' && "المنافذ الحدودية البرية والبحرية الفعالة"}
                  {lang === 'ku' && "مەرزە ئەلیکترۆنییەکاتی سەر سنوری دەوڵەت"}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                  <div 
                    onClick={() => setSelectedNodeId("edge")}
                    className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                      selectedNodeId === 'edge' 
                        ? 'bg-amber-950/30 border-amber-500 shadow-[0_0_10px_rgba(217,119,6,0.2)]' 
                        : 'bg-slate-900 border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="text-xs font-sans font-semibold text-white">Zakho Edge Point</div>
                    <span className="text-[9px] font-mono text-amber-500">Ibrahim Khalil Gate</span>
                  </div>

                  <div 
                    onClick={() => setSelectedNodeId("edge")}
                    className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                      selectedNodeId === 'edge' 
                        ? 'bg-amber-950/30 border-amber-500 shadow-[0_0_10px_rgba(217,119,6,0.2)]' 
                        : 'bg-slate-900 border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="text-xs font-sans font-semibold text-white">Umm Qasr Port</div>
                    <span className="text-[9px] font-mono text-amber-500">Basra Sea Gate</span>
                  </div>

                  <div 
                    onClick={() => setSelectedNodeId("edge")}
                    className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                      selectedNodeId === 'edge' 
                        ? 'bg-amber-950/30 border-amber-500 shadow-[0_0_10px_rgba(217,119,6,0.2)]' 
                        : 'bg-slate-900 border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="text-xs font-sans font-semibold text-white">Safwan Gate</div>
                    <span className="text-[9px] font-mono text-amber-500">Kuwait Border Gate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-3 text-[11px] text-slate-500 flex items-center justify-between">
            <span>{lang === 'en' ? "💡 Click on colored system nodes to explore architecture details" : lang === 'ar' ? "💡 انقر على العقد البرمجية الملونة لاستعراض تفاصيلها التقنية" : "💡 بۆ زانیاری تەواوی تەکنیکی کلیک لەسەر رەنگەکان بکە"}</span>
            <span className="font-mono text-emerald-500 select-none">SHA-256 SOVEREIGN CA CERT</span>
          </div>
        </div>

        {/* Selected Node Details Panel right hand side */}
        <div 
          id="architecture-details-panel"
          className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 bg-slate-900 px-2 py-1 rounded">
                {lang === 'en' && "Deployment Node Metadata"}
                {lang === 'ar' && "مواصفات وحدة النشر السيادية"}
                {lang === 'ku' && "زانیاری تەواوی خزمەتگوزاری ناوخۆیی"}
              </span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>

            <div>
              <h4 className="text-base font-sans font-bold text-white flex items-center gap-1.5">
                {currentSelected.name[lang]}
              </h4>
              <p className="text-[11px] text-emerald-400 font-mono mt-1">
                {currentSelected.role[lang]}
              </p>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-900">
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {currentSelected.details[lang]}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                {lang === 'en' ? "Embedded System Technology" : lang === 'ar' ? "التقنيات البرمجية المعتمدة" : "تەکنەلۆجیای نەرمەکاڵا"}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentSelected.tech.map((t) => (
                  <span key={t} className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-800 px-2 py-0.5 rounded transition-all">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-900 text-xs text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <p>
              {lang === 'en' && "Complies with UNCTAD guidelines regarding direct programmatic injection into ASYCUDA."}
              {lang === 'ar' && "يتوافق تماماً مع توجيهات الأونكتاد للأمم المتحدة في الربط البرمجي الخاص بأسيكودا."}
              {lang === 'ku' && "پابەندبوونی تەواو بە مەرجەکانی UNCTAD سەبارەت بە پەیوەندی دیجیتاڵی ئاسیکۆدا."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
