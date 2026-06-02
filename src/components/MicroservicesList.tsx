import { useState } from 'react';
import { Search, Server, ShieldAlert, Cpu, Database, Settings, RefreshCw, Key, FileCode, Presentation } from 'lucide-react';
import { Language } from '../types';
import { MICROSERVICES_SPEC } from '../data/architectureData';
import MicroservicesCodeExplorer from './MicroservicesCodeExplorer';

interface MicroservicesListProps {
  lang: Language;
}

export default function MicroservicesList({ lang }: MicroservicesListProps) {
  const [viewMode, setViewMode] = useState<'catalog' | 'codebase'>('catalog');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'core' | 'integration' | 'security' | 'intelligence'>('all');

  const filteredServices = MICROSERVICES_SPEC.filter(service => {
    // category filter
    if (selectedCategory !== 'all' && service.category !== selectedCategory) {
      return false;
    }
    // search filter
    const term = searchTerm.toLowerCase();
    const matchesName = service.name[lang].toLowerCase().includes(term);
    const matchesDesc = service.description[lang].toLowerCase().includes(term);
    const matchesTech = service.tech.some(t => t.toLowerCase().includes(term));
    const matchesEndpoints = service.endPoints.some(ep => ep.path.toLowerCase().includes(term) || ep.desc.toLowerCase().includes(term));
    return matchesName || matchesDesc || matchesTech || matchesEndpoints;
  });

  const categoryIcons = {
    core: <Cpu className="w-4 h-4 text-emerald-400" />,
    integration: <RefreshCw className="w-4 h-4 text-blue-400" />,
    security: <Key className="w-4 h-4 text-purple-400" />,
    intelligence: <Database className="w-4 h-4 text-amber-500" />
  };

  const isRtl = lang === 'ar' || lang === 'ku';

  return (
    <div className="space-y-6" id="microservices-specifications-container">
      {/* Supercharged Sub-tab toggle */}
      <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl max-w-md mx-auto">
        <button
          onClick={() => setViewMode('catalog')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            viewMode === 'catalog'
              ? 'bg-emerald-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <Presentation className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'Architectural Catalog' : lang === 'ar' ? 'كتالوج الأنظمة' : 'تەلارسازی گشتی'}</span>
        </button>
        <button
          onClick={() => setViewMode('codebase')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            viewMode === 'codebase'
              ? 'bg-emerald-600 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>{lang === 'en' ? 'Production Code & Sandbox' : lang === 'ar' ? 'أكواد برمجية ومختبر' : 'کۆد و تاقیکردنەوە'}</span>
        </button>
      </div>

      {viewMode === 'codebase' ? (
        <MicroservicesCodeExplorer lang={lang} />
      ) : (
        <>
          {/* Search and Category Filter Rail */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search bar inputs */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={
                  lang === 'en' ? "Search microservices, endpoints, or tech stacks..." 
                  : lang === 'ar' ? "ابحث عن الخدمات المصغرة، واجهات البيانات والتقنيات..."
                  : "گەڕان لە فۆرم، دەروازە و زمانەکانی تر..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs pl-10 pr-4 py-2.5 rounded-lg border border-slate-800 focus:border-emerald-500/50 outline-none transition-all"
                dir={isRtl ? 'rtl' : 'ltr'}
              />
            </div>

            {/* Category buttons */}
            <div className="flex flex-wrap gap-1.5" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
              {(['all', 'core', 'integration', 'security', 'intelligence'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-all capitalize cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {cat === 'all' && (lang === 'en' ? "All Services" : lang === 'ar' ? "كل الخدمات" : "هەموو")}
                  {cat === 'core' && (lang === 'en' ? "NSW Core APIs" : lang === 'ar' ? "الخدمات الأساسية" : "اصلي")}
                  {cat === 'integration' && (lang === 'en' ? "Integration Gateway" : lang === 'ar' ? "أدوات الربط" : "گرێدان")}
                  {cat === 'security' && (lang === 'en' ? "Identity & Security" : lang === 'ar' ? "الحماية الهوية" : "پاراستن")}
                  {cat === 'intelligence' && (lang === 'en' ? "Border Resilient Edge" : lang === 'ar' ? "الأنظمة اللامركزية" : "سنورەکان")}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Microservices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredServices.length > 0 ? (
              filteredServices.map(service => (
                <div
                  key={service.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col justify-between hover:border-emerald-500/25 transition-all relative overflow-hidden"
                  style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                >
                  <div>
                    {/* Meta Category and ID identifier */}
                    <div className="flex items-center justify-between border-b border-slate-950 pb-3 mb-3">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                        {service.id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {categoryIcons[service.category]}
                        <span className="text-[10px] font-mono capitalize tracking-wider text-slate-400">
                          {service.category}
                        </span>
                      </div>
                    </div>

                    {/* Service Name & localized info */}
                    <h4 className="text-sm font-sans font-bold text-white mb-2">
                      {service.name[lang]}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
                      {service.description[lang]}
                    </p>

                    {/* Key Responsibilities Bullet List mapped in state */}
                    <div className="space-y-2 mb-5">
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                        {lang === 'en' ? "Architectural Responsibilities" : lang === 'ar' ? "المسؤوليات التشغيلية والهندسية" : "بەرپرسیارێتییە سەرەکییەکان"}
                      </div>
                      <ul className="space-y-1.5 md:space-y-2">
                        {service.responsibilities[lang].map((resp, rIdx) => (
                          <li key={rIdx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-relaxed font-sans">
                            <span className="text-emerald-500 shrink-0 mt-1">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* API Endpoints specifications */}
                    <div className="space-y-2 mb-4">
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                        {lang === 'en' ? "Ingress API Schemas" : lang === 'ar' ? "مواصفات ونقاط واجهة التطبيقات" : "خاڵەکانی چوونەژوورەوەی API"}
                      </div>
                      <div className="space-y-1.5">
                        {service.endPoints.map((ep, epIdx) => {
                          const isPost = ep.method === 'POST';
                          return (
                            <div key={epIdx} className="bg-slate-900 border border-slate-900 rounded p-2 text-[11px] font-mono">
                              <div className="flex items-center gap-1.5 mb-1 bg-slate-950 p-1 rounded">
                                <span className={`px-1 rounded text-[9px] font-bold ${isPost ? 'bg-emerald-950 text-emerald-400' : 'bg-blue-950 text-blue-300'}`}>
                                  {ep.method}
                                </span>
                                <span className="text-white font-semibold truncate select-all">{ep.path}</span>
                              </div>
                              <span className="text-slate-400 block px-1 text-[10px]">
                                {ep.desc}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Technologies embedded metrics */}
                  <div className="border-t border-slate-900 pt-3 mt-4 flex flex-wrap gap-1">
                    {service.tech.map(t => (
                      <span key={t} className="bg-slate-900 border border-slate-900/60 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-12 text-center text-slate-500">
                <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-sm font-sans">
                  {lang === 'en' && "No microservices or API specifications found matching your query."}
                  {lang === 'ar' && "لم يتم العثور على مواصفات أو خدمات متطابقة مع البحث."}
                  {lang === 'ku' && "هیچ فۆرم یان خزمەتگوزارییەک لەگەڵ گەڕانەکەت ناگونجێت."}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
