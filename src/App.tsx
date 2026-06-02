import { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  Terminal, 
  ShieldCheck, 
  DollarSign, 
  Globe2, 
  Menu, 
  X, 
  Users, 
  FileCheck2, 
  Database,
  Cpu,
  BookmarkCheck,
  Languages
} from 'lucide-react';

import { Language } from './types';
import { UI_TRANSLATIONS, METRICS_DATA } from './data/architectureData';

// Local modular components
import ArchitectureDiagram from './components/ArchitectureDiagram';
import DataFlowSimulator from './components/DataFlowSimulator';
import TechStackViewer from './components/TechStackViewer';
import ApiDesignPortal from './components/ApiDesignPortal';
import MicroservicesList from './components/MicroservicesList';
import SecurityRadar from './components/SecurityRadar';
import BudgetTimeline from './components/BudgetTimeline';
import DatabaseSchemaViewer from './components/DatabaseSchemaViewer';
import InteractiveNSWPortal from './components/InteractiveNSWPortal';
import AIPredictiveAnalytics from './components/AIPredictiveAnalytics';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<'overview' | 'portal' | 'ai_platform' | 'archi' | 'services' | 'flows' | 'apis' | 'secu' | 'roadmap' | 'database'>('portal');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = UI_TRANSLATIONS[lang];

  useEffect(() => {
    // Scroll to top of panel view on tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const isRtl = lang === 'ar' || lang === 'ku';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative antialiased" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      
      {/* Top Professional Governance Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center border border-emerald-500/20 shadow-md shrink-0">
            <Building2 className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <h1 className="text-base font-sans font-extrabold text-white tracking-tight">
              {t.title}
            </h1>
            <p className="text-[11px] font-sans text-emerald-400 font-semibold tracking-wide">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Global Controls & Language Switcher Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-0.5" id="language-switcher">
            {(['en', 'ar', 'ku'] as const).map((currLang) => (
              <button
                key={currLang}
                onClick={() => setLang(currLang)}
                className={`px-2.5 py-1 text-[11px] font-sans font-bold rounded-md transition-all cursor-pointer ${
                  lang === currLang 
                    ? 'bg-emerald-600 text-slate-950 font-sans' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {currLang === 'en' ? 'EN' : currLang === 'ar' ? 'العربية' : 'کوردی'}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Structural Interactive Split Layout */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-8">
        
        {/* LEFT BAR: General Blueprint Overview stats */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Executive Architect Board Tag */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl relative overflow-hidden" id="architect-board-panel">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-bl-full"></div>
            <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest block mb-1 bg-emerald-950/40 border border-emerald-500/10 px-2 py-0.5 rounded w-max">
              PROPOSAL ACTIVE
            </span>
            <h2 className="text-sm font-sans font-bold text-white mt-2">
              {t.architectTitle}
            </h2>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {t.architectSub}
            </p>

            <div className="border-t border-slate-800/80 pt-4 mt-4 space-y-3 font-sans">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                  {t.budgetLabel}
                </span>
                <span className="text-sm font-bold text-white font-sans flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                  {METRICS_DATA.budget}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                  {t.timelineLabel}
                </span>
                <span className="text-sm font-bold text-white font-sans flex items-center gap-1">
                  <BookmarkCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  {METRICS_DATA.timeline}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">
                  {t.scaleLabel}
                </span>
                <span className="text-sm font-bold text-white font-sans flex items-center gap-1">
                  <Database className="w-4 h-4 text-emerald-400 shrink-0" />
                  {METRICS_DATA.transactionScale}
                </span>
              </div>
            </div>
          </div>

          {/* Regional deployment topology status */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3" id="regional-footprint-panel">
            <div className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 border-b border-slate-800 pb-2">
              {t.regionsLabel}
            </div>

            <div className="space-y-3">
              {METRICS_DATA.regions.map((reg, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-200 font-sans font-semibold">
                      {reg.name[lang]}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                    {reg.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ASYCUDA integration details */}
          <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-xl space-y-2">
            <h4 className="text-xs font-sans font-bold text-white flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-emerald-500" />
              {t.asycudaIntegrationTitle}
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t.asycudaIntegrationDesc}
            </p>
          </div>

          {/* Offline edge capabilities */}
          <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-xl space-y-2">
            <h4 className="text-xs font-sans font-bold text-white flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-500" />
              {t.offlineCapTitle}
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t.offlineCapDesc}
            </p>
          </div>
        </div>

        {/* RIGHT AREA: Interactive tab options & solutions display */}
        <div className="lg:col-span-9 space-y-6 flex flex-col justify-start">
          
          {/* Main Workspace Navigation Options bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-1.5 flex flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                activeTab === 'overview' ? 'bg-emerald-600 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {t.tabOverview}
            </button>
            <button
              onClick={() => setActiveTab('portal')}
              className={`flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer min-w-max ${
                activeTab === 'portal' ? 'bg-emerald-600 text-slate-950 shadow-md animate-pulse' : 'text-slate-200 hover:text-white hover:bg-slate-800/40 bg-emerald-950/20 border border-emerald-400/20 shadow'
              }`}
            >
              ✨ {t.tabPortal}
            </button>
            <button
              onClick={() => setActiveTab('ai_platform')}
              className={`flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer min-w-max ${
                activeTab === 'ai_platform' ? 'bg-emerald-600 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800/40 bg-emerald-950/10 border border-emerald-500/10'
              }`}
            >
              🧠 {t.tabAI}
            </button>
            <button
              onClick={() => setActiveTab('archi')}
              className={`flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                activeTab === 'archi' ? 'bg-emerald-600 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {t.tabArchitecture}
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                activeTab === 'services' ? 'bg-emerald-600 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {t.tabMicroservices}
            </button>
            <button
              onClick={() => setActiveTab('flows')}
              className={`flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                activeTab === 'flows' ? 'bg-emerald-600 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {t.tabDataFlow}
            </button>
            <button
              onClick={() => setActiveTab('apis')}
              className={`flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                activeTab === 'apis' ? 'bg-emerald-600 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {t.tabApiDesign}
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                activeTab === 'database' ? 'bg-emerald-600 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {t.tabDatabase}
            </button>
            <button
              onClick={() => setActiveTab('secu')}
              className={`flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                activeTab === 'secu' ? 'bg-emerald-600 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {t.tabSecurity}
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex-1 text-center py-2.5 px-3 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                activeTab === 'roadmap' ? 'bg-emerald-600 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {t.tabBudgetTimeline}
            </button>
          </div>

          {/* Active Tab rendering zone with descriptive layout frames */}
          <div className="transition-all duration-300" id="active-tab-render-portal">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Visual Overview intro */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800">
                      <BookmarkCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-sans font-bold text-white">
                        {lang === 'en' && "Iraqi National Single Window for International Trade"}
                        {lang === 'ar' && "النافذة الوطنية للتجارة الدولية والجمارك الموحدة"}
                        {lang === 'ku' && "پەنجەرەی پێشەنگ و یەکگرتووی نیشتمانی عێراق بۆ بازرگانی"}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {lang === 'en' && "A Sovereign, Secure, and Highly Resilient Inter-Agency Commerce Backbone"}
                        {lang === 'ar' && "منظومة معززة وسيادية لربط دوائر الدولة وحوسبة مستندات المعابر الحدودية"}
                        {lang === 'ku' && "سیستمێکی سەلامەت بۆ بەیەکەوە بەستنی وەزارەتەکان و نەهێشتنی گەندەڵی"}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans pt-2">
                    {lang === 'en' && "This portal presents Iraq's National Single Window (NSW) system architecture proposal. Built entirely upon GCP Distributed Cloud and local Sovereign nodes, this enterprise solution merges customs ASYCUDA World systems, Ministry of Finance treasuries, Central Bank clearing networks, multi-agency ministerial permits, real-time logistics providers, and border checkpoint edge caches into a singular cohesive stream."}
                    {lang === 'ar' && "تقدم هذه الخدمة المخطط الهيكلي التقني للنافذة الوطنية العراقية الواحدة للتجارة الخارجية (NSW). تعمل المنظومة بالكامل على خواديم سحابية سيادية وموزعة لحماية البيانات الوطنية، وتوحيد المعاملات مع نظام أسيكودا الجمركي المعتمد دولياً."}
                    {lang === 'ku' && "ئەم پۆرتاڵە تایبەتە بە پیشاندانی نەخشەسازی گشتی تەکنیکی پەنجەرەی نیشتمانی عێراق بۆ مۆڵەتپێدان بە کاڵاکان بە هاوئاهەنگی تەواو لەگەڵ نوێنەرانی وەزارەتەکانی دارایی، کشتوکاڵ، تەندروستی و سیستمی سەرەکی ئاسیکۆدا."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-900">
                      <h4 className="text-xs font-sans font-bold text-white mb-1">
                        {lang === 'en' ? "UNCTAD ASYCUDA Link" : lang === 'ar' ? "التكامل مع أسيكودا" : "گرێدان بە ئاسیکۆدا"}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        {lang === 'en' ? "Translates XML schemas and SOAP structures directly to ASYCUDA World's database nodes without downtime, utilizing durable message stream queues." : lang === 'ar' ? "يربط ويلائم حزم البيانات بصيغ XML/SOAP مباشرة بنظام أسيكودا التابع للأمم المتحدة بدون أي معوقات أو تدخل يدوي." : "داگرتن و وەرگێڕانی فایلی XML بۆ زمانی جیهانی ئاسیکۆدا بە توندی بە هاوپەیمانی نێودەوڵەتی."}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-900">
                      <h4 className="text-xs font-sans font-bold text-white mb-1">
                        {lang === 'en' ? "ISO 20022 Financials" : lang === 'ar' ? "الدفع بمعايير ISO 20022" : "پاکتاوکردنی ISO 20022"}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        {lang === 'en' ? "All banking collections map directly to the Central Bank's RTGS core utilizing certified pacs.008 digital blocks to minimize auditing leakages." : lang === 'ar' ? "المصادقة الرقمية والتحصيل المالي يرتبطان بالكامل بنظام تسويات البنك المركزي العراقي لضمان الإيرادات وتجنب التلاعب." : "پارەدانە گومرگییەکان پێویستە بە فایلی ستانداردی جیهانی pacs.008 ڕاستەوخۆ بگەنە دەستی بانکی نیشتمانی."}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-900">
                      <h4 className="text-xs font-sans font-bold text-white mb-1">
                        {lang === 'en' ? "Offline Border Resiliency" : lang === 'ar' ? "استمرارية المنافذ دون اتصال" : "خۆڕاگری بێ هێڵ لە سنور"}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        {lang === 'en' ? "Embedded hardware clusters process local directories offline, automatic sync to central hubs once connectivity routes normalize." : lang === 'ar' ? "حوسبة طرفية محلية في الجمارك (ئیبراهیم خەلیل، أم قصر، سفوان) تتيح تسيير الشاحنات وتدقيقها حتى في حالات انقطاع الكابلات الضوئية." : "هێشتنەوەی داتابەیسێکی ناوخۆیی لەسەر سنور بۆ کارکردنی ئەفسەران تەنانەت لە کاتی خراپبوونی تەواوی ئینتەرنێتدا."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* System highlight grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
                    <h3 className="text-sm font-sans font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-1.5">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      {lang === 'en' ? "National Security & Sovereign Controls" : lang === 'ar' ? "السيادة الوطنية وعناصر الحماية" : "ئاسایشی نیشتمانی و کۆنترۆڵی سەروەری"}
                    </h3>
                    <ul className="space-y-3">
                      <li className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-500 font-bold shrink-0">•</span>
                        <span>{lang === 'en' ? "GDC Sovereign Clouds: Strict regulatory limits run code inside Iraqi border." : lang === 'ar' ? "خوادم سحابية سيادية: حوسبة في حدود الأراضي العراقية تمنع خروج معلومات المعاطنات." : "سحابی سەروەری گۆگڵ: ڕێکارە یاساییەکان پڕۆگرامەکان لە ناو خاکی عێراق ڕادەگرن."}</span>
                      </li>
                      <li className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-500 font-bold shrink-0">•</span>
                        <span>{lang === 'en' ? "CBI Vault HSM Key Control: Cryptographic stamps managed strictly by Central Bank keys." : lang === 'ar' ? "إدارة التشفير المركزي: إعداد الأختام والتواقيع الرقمية تحت إشراف البنك المركزي." : "کۆنترۆڵی مۆری دیجیتاڵ لە ناو بانکی ناوەندیدا بەبێ توانای دەرچوونی کلیلەکان بە هیچ شێوازێک."}</span>
                      </li>
                      <li className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-500 font-bold shrink-0">•</span>
                        <span>{lang === 'en' ? "Zero-Trust mTLS Network Encounters: All internal service layers require signed certificates." : lang === 'ar' ? "مبدأ الثقة الصفرية mTLS للشبكة: كل الخدمات تستوجب شهادات رقمية للتنسيق والربط." : "ڕێڕەوی متمانەی سفری تەواو بۆ هەر جۆرە کێشە و چوونەژوورەوەیەکی نافەرمی."}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
                    <h3 className="text-sm font-sans font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-1.5">
                      <Layers className="w-5 h-5 text-emerald-400" />
                      {lang === 'en' ? "High Latency & Scale Goals" : lang === 'ar' ? "أهداف التوسع وحجم الاستجابة" : "ئامانجەکانی توانای کارکردن و لۆدی بەرز"}
                    </h3>
                    <ul className="space-y-3">
                      <li className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-500 font-bold shrink-0">•</span>
                        <span>{lang === 'en' ? "10M+ transaction scale goal leveraging globally consistent Google Cloud Spanner." : lang === 'ar' ? "تحمل الضغط والذروة لأكثر من 10 ملايين معاملة شهرية بنظام Cloud Spanner المتقدم." : "دابین کردنی بنکەیەکی داتای بەهێز بۆ وەڵامدانەوەی پێداویستی ١٠ ملیۆن مامەڵە بەبێ وەستان."}</span>
                      </li>
                      <li className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-500 font-bold shrink-0">•</span>
                        <span>{lang === 'en' ? "Sub-second submission latency on all frontend trade applications." : lang === 'ar' ? "سرعة استجابة بأقل من ثانية لكافة بوابات المستورد والمخلص الجمركي." : "وەڵامدانەوەی خێرا بە کاربەری ناوخۆ تەنها لە ناو یەک چرکەدا بۆ ڕێگریکردن لە لۆد."}</span>
                      </li>
                      <li className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-500 font-bold shrink-0">•</span>
                        <span>{lang === 'en' ? "Peer-to-peer eventual data consistency across rugged port networks." : lang === 'ar' ? "مزامنة المعاطيات المستمرة والموزعة بين المنافذ الصعبة في البلاد." : "هاوسەنگی زانیاری بەردەوامی لێواری لە ناو مەرزەکاندا بە شێوازێکی بێ کێشە."}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Next button suggestion to discover architecture */}
                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-sans">
                    {lang === 'en' && "Ready to inspect the multi-region topology roadmap & diagrams?"}
                    {lang === 'ar' && "هل تود البدء باستعراض المخطط التفاعلي والنوافذ الجغرافية؟"}
                    {lang === 'ku' && "ئامادەی بۆ بینینی تەواوی نەخشەسازی و دەروازەکان بەیەکەوە؟"}
                  </span>
                  <button
                    onClick={() => setActiveTab('archi')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-4 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer"
                  >
                    {lang === 'en' ? "Explore Architecture" : lang === 'ar' ? "استكشف الهيكل التقني" : "بینینی نەخشەکە"}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'portal' && <InteractiveNSWPortal lang={lang} />}
            {activeTab === 'ai_platform' && <AIPredictiveAnalytics lang={lang} />}
            {activeTab === 'archi' && <ArchitectureDiagram lang={lang} />}
            {activeTab === 'services' && <MicroservicesList lang={lang} />}
            {activeTab === 'flows' && <DataFlowSimulator lang={lang} />}
            {activeTab === 'apis' && <ApiDesignPortal lang={lang} />}
            {activeTab === 'database' && <DatabaseSchemaViewer lang={lang} />}
            {activeTab === 'secu' && <SecurityRadar lang={lang} />}
            {activeTab === 'roadmap' && <BudgetTimeline lang={lang} />}
          </div>
        </div>

      </div>

      {/* Professional Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-xs text-slate-500 py-4 px-8 text-center mt-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <span>© 2026 Iraq National Single Window Architecture Portal. All specifications cleared.</span>
        <div className="flex gap-4 font-mono text-[10px]">
          <span>UN/EDIFACT D96A</span>
          <span>WCO DATA MODEL V3</span>
          <span>ISO 20022</span>
        </div>
      </footer>
    </div>
  );
}
