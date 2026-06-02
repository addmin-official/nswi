import { Layers, Box, Cpu, HardDrive, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { SOLID_TECH_STACK, SCALABILITY_STRATEGY } from '../data/architectureData';

interface TechStackViewerProps {
  lang: Language;
}

export default function TechStackViewer({ lang }: TechStackViewerProps) {
  const isRtl = lang === 'ar' || lang === 'ku';

  return (
    <div className="space-y-8" id="tech-stack-viewer-root">
      
      {/* Scalability strategy stats box */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 border border-emerald-500/20 rounded-xl p-5 shadow-xl">
        <h3 className="text-lg font-sans font-semibold text-emerald-400 flex items-center gap-2">
          <Cpu className="w-5 h-5 animate-pulse" />
          {lang === 'en' && "Scalability Protocol (10 Million+ Transactions / Month)"}
          {lang === 'ar' && "بروتوكول التوسع التشغيلي (أكثر من 10 مليون معاملة شهرياً)"}
          {lang === 'ku' && "پلانی فراوانکردنی گشتی (بۆ زۆرتر لە ١٠ ملیۆن مامەڵە)"}
        </h3>
        <p className="text-sm text-slate-400 mt-1 max-w-4xl">
          {lang === 'en' && "Engineered to withstand heavy volumetric bursts during seasonal trade peaks. Combines synchronous database witness replication with asynchronous event decoupling to prevent bottleneck congestion."}
          {lang === 'ar' && "مصمم لمقاومة موجات التحميل والذروة الجمركية المتوقعة في المواسم. يعتمد على شبكة من خوادم الكشف والمزامنة والجدولة المنفصلة تمنع الشلل الفني."}
          {lang === 'ku' && "شیکاری تەکنیکی بەرز بۆ پاراستنی هاوئاهەنگی کات لە کاتی لۆدی زۆر لەسەر مەرزەکان بەبێ خاوبوونەوەی دەروازە حکومییەکان."}
        </p>

        {/* Dynamic cards for scalability */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {SCALABILITY_STRATEGY.points.map((pt, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-900 rounded-lg p-4 hover:border-emerald-500/25 transition-all">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/10">
                {idx === 0 && "Database Layer"}
                {idx === 1 && "Decoupled Pipelines"}
                {idx === 2 && "Border Resilient Cache"}
              </span>
              <h4 className="text-xs font-sans font-bold text-white mt-2.5 mb-1">
                {pt.title[lang]}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {pt.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Structured Stack Layers Table */}
      <div className="space-y-4">
        <div className="text-xs uppercase font-mono tracking-wider text-slate-400 border-b border-slate-900 pb-2">
          {lang === 'en' && "Approved Infrastructure Stack & Sovereignty Metrics"}
          {lang === 'ar' && "تفاصيل حزم البرمجيات السحابية ومعايير السيادة المعتمدة"}
          {lang === 'ku' && "پێکهاتەی گشتی تەکنەلۆجیا و پێوەرەکانی سەروەری"}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {SOLID_TECH_STACK.map((layerItem, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-slate-900 px-5 py-3 flex items-center justify-between border-b border-slate-900">
                <span className="text-xs font-sans font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {layerItem.layer[lang]}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {idx === 0 && "Presentation Tier"}
                  {idx === 1 && "Inter-process Communication Tier"}
                  {idx === 2 && "Asynchronous Messaging Grid"}
                  {idx === 3 && "Durable Storage Registry"}
                  {idx === 4 && "Physical Sovereign Hardware Core"}
                </span>
              </div>

              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {layerItem.components.map((c, cIdx) => (
                  <div key={cIdx} className="bg-slate-900/40 border border-slate-900 p-4 rounded-lg flex flex-col justify-between hover:border-slate-800 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-mono font-bold text-white">
                          {c.name}
                        </h4>
                        
                        {c.isSovereign ? (
                          <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/20 text-[8px] font-mono uppercase px-1.5 py-0.5 rounded tracking-widest font-bold">
                            SOVEREIGN CONTROL
                          </span>
                        ) : (
                          <span className="bg-slate-950 text-slate-500 border border-slate-900 text-[8px] font-mono uppercase px-1.5 py-0.5 rounded tracking-widest">
                            OPEN HYBRID
                          </span>
                        )}
                      </div>

                      <p className="text-[10px] text-emerald-500 font-mono mb-2">
                        {c.role[lang]}
                      </p>

                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {c.description[lang]}
                      </p>
                    </div>

                    <div className="border-t border-slate-900/80 pt-2.5 mt-3 text-[10px] text-slate-500 flex items-center justify-between font-mono">
                      <span>status: active production blueprint</span>
                      <span className="text-slate-600">v1.4</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
