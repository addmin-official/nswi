import { useState } from 'react';
import { Terminal, Copy, Check, FileCode, CheckCircle, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { API_SPEC_BLUEPRINTS } from '../data/architectureData';

interface ApiDesignPortalProps {
  lang: Language;
}

export default function ApiDesignPortal({ lang }: ApiDesignPortalProps) {
  const [activeCodeTabIndex, setActiveCodeTabIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const currentPayloadSample = API_SPEC_BLUEPRINTS.codeSamples[activeCodeTabIndex];

  const handleCopyCode = async (code: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const isRtl = lang === 'ar' || lang === 'ku';

  return (
    <div className="space-y-6" id="api-design-portal-root">
      {/* Overview stats header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {API_SPEC_BLUEPRINTS.principles.map((p, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-500/20 transition-all">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-sans font-bold text-xs mb-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{p.name[lang]}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {p.desc[lang]}
              </p>
            </div>
            <div className="mt-3 text-[9px] font-mono text-slate-500 uppercase tracking-wider text-right">
              {idx === 0 && "RFC 7231 / RESTFUL"}
              {idx === 1 && "WCO v3.4 Compliant"}
              {idx === 2 && "ISO 20022 XML"}
              {idx === 3 && "Kafka Streams Queue"}
            </div>
          </div>
        ))}
      </div>

      {/* Main interactive terminal structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left selector menu */}
        <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-2xl space-y-3">
          <div className="text-xs uppercase font-mono tracking-wider text-slate-400 border-b border-slate-900 pb-2">
            {lang === 'en' && "Iraqi National Trade Data Schemas"}
            {lang === 'ar' && "مواصفات حزم البيانات وتعديل الترميز الجمركي الوطني"}
            {lang === 'ku' && "شێوازی فۆرم و گواستنەوەی فایلی فەرمی"}
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-sans mb-3">
            {lang === 'en' && "The Single Window unifies legacy SOAP payloads from ASYCUDA with modern banking REST standards. Review sample payloads configured for real-time validation below."}
            {lang === 'ar' && "توحد النافذة الوطنية المدخلات القديمة من أسيكودا وصيغ البنوك الحديثة. يمكنك مراجعة حزم البيانات المعتمدة للتصميم الحسابي الجمركي أدناه."}
            {lang === 'ku' && "پەنجەرەی نیشتمانی نوێ فایلە کۆنەکانی ئاسیکۆدا دەگۆڕێت بۆ زمانی مۆدێرنی بازرگانی دەرەکی. دەتوانی شێوازی فایلەکان لە خوارەوە ببینی."}
          </p>

          <div className="space-y-1.5">
            {API_SPEC_BLUEPRINTS.codeSamples.map((sample, idx) => {
              const isActive = idx === activeCodeTabIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCodeTabIndex(idx)}
                  className={`w-full text-left p-3 rounded-lg border text-xs font-sans transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-emerald-950/20 border-emerald-500 text-white font-bold'
                      : 'bg-slate-900/40 border-slate-900 text-slate-400 hover:border-slate-800'
                  }`}
                  style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span className="truncate pr-1">{sample.title.split(' (')[0]}</span>
                  </div>
                  <span className="bg-slate-900 text-[9px] font-mono text-slate-500 px-1.5 py-0.5 rounded border border-slate-800 shrink-0 capitalize">
                    {sample.lang}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right JSON/XML code editor panel */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
          {/* Top terminal bar */}
          <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-mono text-slate-300">
                {currentPayloadSample.title}
              </span>
            </div>

            <button
              onClick={() => handleCopyCode(currentPayloadSample.code, activeCodeTabIndex)}
              className="bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500/35 text-slate-400 hover:text-white text-[10px] font-mono px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5"
            >
              {copiedIndex === activeCodeTabIndex ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>{lang === 'en' ? "Copied!" : "تم النسخ!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? "Copy Schema" : "نسخ البيانات"}</span>
                </>
              )}
            </button>
          </div>

          {/* Simulated Code window */}
          <div className="p-4 bg-slate-950 overflow-auto max-h-[460px] font-mono text-xs text-slate-300 leading-relaxed selection:bg-emerald-800 selection:text-white">
            <pre className="whitespace-pre-wrap font-mono select-all">
              <code>{currentPayloadSample.code}</code>
            </pre>
          </div>

          {/* Warning notice footer of code editor */}
          <div className="bg-slate-900/40 border-t border-slate-900 px-4 py-3 text-[10px] text-slate-400 font-sans flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              {lang === 'en' && "All integration pipelines strictly perform schema checks against these rules at the ingress API gateway level to protect internal SQL engines from malicious database mapping injection attempts."}
              {lang === 'ar' && "تقوم بوابات التدفق بفحص هياكل المعطيات فوراً قبل إرسالها لدوائر الحوسبة والوزارات لتجنب أي محاولات اختراق مبنية على قواعد البيانات."}
              {lang === 'ku' && "ئەم کۆدە پارێزراوە یەکسەر تاقی دەکرێتەوە پێش ئەوەی بنێردرێت تاوەکو ڕێگری بکات لە هەر جۆرە کێشەیەکی سیبرانی لە بنکەی داتاکاندا."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
