import { Shield, Lock, FileCheck, CheckCircle, Database } from 'lucide-react';
import { Language } from '../types';
import { SECURITY_ARCHITECTURE } from '../data/architectureData';

interface SecurityRadarProps {
  lang: Language;
}

export default function SecurityRadar({ lang }: SecurityRadarProps) {
  const isRtl = lang === 'ar' || lang === 'ku';

  return (
    <div className="space-y-6" id="security-framework-root">
      
      {/* Zero Trust Principles display grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SECURITY_ARCHITECTURE.principles.map((pr, idx) => (
          <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col justify-between hover:border-emerald-500/25 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-emerald-500/35 flex items-center justify-center">
                {idx === 0 && <Lock className="w-5 h-5 text-emerald-400" />}
                {idx === 1 && <Shield className="w-5 h-5 text-emerald-400" />}
                {idx === 2 && <Database className="w-5 h-5 text-emerald-400" />}
              </div>

              <h4 className="text-sm font-sans font-bold text-white">
                {pr.title[lang]}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {pr.desc[lang]}
              </p>
            </div>

            <div className="border-t border-slate-900 pt-3 mt-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest text-right">
              {idx === 0 && "National HSM Cryptography"}
              {idx === 1 && "mTLS Mutual Trust CA"}
              {idx === 2 && "SQL Ledger Integrity check"}
            </div>
          </div>
        ))}
      </div>

      {/* Compliance standards section */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mb-4">
          <FileCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-sans font-bold text-white">
            {lang === 'en' && "Iraqi National Trade Compliance Mapping"}
            {lang === 'ar' && "مطابقة معايير الامتثال والاتحاد للتجارة الوطنية"}
            {lang === 'ku' && "نەخشەی رێکخستنی پێوەرە نێودەوڵەتییەکان بۆ عێراق"}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
            <thead>
              <tr className="border-b border-slate-900 text-slate-400 font-mono text-[10px] uppercase tracking-wider bg-slate-900/40">
                <th className="py-2 px-3 text-emerald-500">
                  {lang === 'en' ? "Compliance Framework" : lang === 'ar' ? "إطار العمل الجمركي" : "پێوەرە جیهانییەکان"}
                </th>
                <th className="py-2 px-3">
                  {lang === 'en' ? "Direct Integration Layer" : lang === 'ar' ? "طبقة التكامل والربط الفني" : "گرێدانی ناوخۆیی"}
                </th>
                <th className="py-2 px-3">
                  {lang === 'en' ? "Enforced Policies & Schemas" : lang === 'ar' ? "السياسات والواجهات الإجبارية" : "یاساکان و فۆڕمەکان"}
                </th>
                <th className="py-2 px-3 text-right">
                  {lang === 'en' ? "Sovereignty" : lang === 'ar' ? "مستوى السيادة" : "ئاستی سەروەری"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 font-sans">
              <tr>
                <td className="py-3 px-3 font-semibold text-white">UNCTAD ASYCUDA World</td>
                <td className="py-3 px-3 font-mono">NSW-03-ASY Web Gateway</td>
                <td className="py-3 px-3">Single Administrative Document (SAD) automated integration via SOAP structure translations.</td>
                <td className="py-3 px-3 text-right text-emerald-400 font-mono text-[10px]">100% On-Soil Node</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">WCO Data Model v3.4</td>
                <td className="py-3 px-3 font-mono">NSW-02-VAL Broker Service</td>
                <td className="py-3 px-3">Harmonized System (HS) commodity code listings, strict customs tariff lookup mappings.</td>
                <td className="py-3 px-3 text-right text-emerald-400 font-mono text-[10px]">100% On-Soil Node</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">ISO 20022 Financials</td>
                <td className="py-3 px-3 font-mono">NSW-04-FIN Duties Clearing</td>
                <td className="py-3 px-3">Translates payments to pacs.008 customer credit blocks mapping directly to CBI core settlement.</td>
                <td className="py-3 px-3 text-right text-emerald-400 font-mono text-[10px]">CBI Safe HSM Control</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">UN/EDIFACT Messaging</td>
                <td className="py-3 px-3 font-mono">NSW-03-ASY Legacy Parser</td>
                <td className="py-3 px-3">Accepts traditional cargo files to support sea borders and old shipping software.</td>
                <td className="py-3 px-3 text-right text-slate-500 font-mono text-[10px]">Hybrid Converter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
