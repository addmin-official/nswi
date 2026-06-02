import { Calendar, DollarSign, ShieldCheck, CheckSquare, Clock } from 'lucide-react';
import { Language } from '../types';
import { INVESTMENT_PLAN, TIMELINE_MILESTONES, METRICS_DATA } from '../data/architectureData';

interface BudgetTimelineProps {
  lang: Language;
}

export default function BudgetTimeline({ lang }: BudgetTimelineProps) {
  const isRtl = lang === 'ar' || lang === 'ku';

  return (
    <div className="space-y-8" id="budget-timeline-core">
      {/* Financial Breakdown Section */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-900 pb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-sans font-bold text-white">
              {lang === 'en' ? "Consolidated Capital Allocation ($180M Budget)" : lang === 'ar' ? "توزيع الميزانية الإجمالية المعتمدة ($180 مليون دولار)" : "دابەشبوونی بودجەی فەرمی نیشتمانی (١٨٠ ملیۆن دۆلار)"}
            </h3>
          </div>
          <span className="text-xs bg-emerald-950 text-emerald-400 px-3 py-1 rounded font-mono font-bold border border-emerald-500/10">
            {METRICS_DATA.budget}
          </span>
        </div>

        {/* Multi-Progress Consolidated Bar Chart */}
        <div className="space-y-1.5" style={{ direction: 'ltr' }}>
          <div className="h-4 bg-slate-900 rounded-full flex overflow-hidden border border-slate-800">
            {INVESTMENT_PLAN.map((item, idx) => {
              const colors = [
                'bg-emerald-600',
                'bg-emerald-400',
                'bg-blue-500',
                'bg-slate-700',
                'bg-amber-600',
                'bg-slate-500'
              ];
              return (
                <div
                  key={idx}
                  className={`${colors[idx % colors.length]} h-full`}
                  style={{ width: `${item.percentage}%` }}
                  title={`${item.category.en}: ${item.allocation}M (${item.percentage}%)`}
                ></div>
              );
            })}
          </div>

          {/* Mini Legend of Consolidated Bar */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center py-1">
            {INVESTMENT_PLAN.map((item, idx) => {
              const bgColors = [
                'bg-emerald-600',
                'bg-emerald-400',
                'bg-blue-500',
                'bg-slate-700',
                'bg-amber-600',
                'bg-slate-500'
              ];
              return (
                <span key={idx} className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                  <span className={`w-2 h-2 rounded-full ${bgColors[idx % bgColors.length]}`}></span>
                  <span>{item.category[lang].slice(0, 25)}...</span>
                  <span className="text-white font-bold">({item.percentage}%)</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Detailed Financial mapping list table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {INVESTMENT_PLAN.map((item, idx) => (
            <div key={idx} className="bg-slate-900/50 border border-slate-900 p-4 rounded-lg flex flex-col justify-between hover:border-slate-800 transition-all">
              <div>
                <div className="flex justify-between items-start mb-2" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
                  <span className="text-xs font-sans font-bold text-white max-w-[80%] leading-snug">
                    {item.category[lang]}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/10 shrink-0">
                    ${item.allocation.toFixed(1)}M
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
                  {item.description[lang]}
                </p>
              </div>

              <div className="border-t border-slate-900/40 pt-2 mt-3 flex items-center justify-between text-[9px] font-mono text-slate-500">
                <span>{item.percentage}% of overall budget</span>
                <span>Category ID: ACT-0{idx+1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 18-Month Phased Timelines Roadmap */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-900 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-sans font-bold text-white">
              {lang === 'en' ? "Sovereign Implementation Roadmap (18-Month Goal)" : lang === 'ar' ? "خارطة القنوات والمراحل التنفيذية (هدف 18 شهراً)" : "نەخشەی جێبەجێکردنی کاتی گشتی (ئامانجی ١٨ مانگ)"}
            </h3>
          </div>
          <span className="text-xs bg-emerald-950 text-emerald-400 px-3 py-1 rounded font-mono font-bold border border-emerald-500/10 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {METRICS_DATA.timeline}
          </span>
        </div>

        {/* Phased milestone vertical trail */}
        <div className="space-y-6 relative border-l-2 border-slate-900 ml-4 py-2">
          {TIMELINE_MILESTONES.map((milestone, idx) => (
            <div key={idx} className="relative pl-6 space-y-2">
              {/* Floating bullet pin */}
              <div className="absolute -left-2.5 top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></div>
              </div>

              {/* Core Milestone Details */}
              <div className="bg-slate-900/30 border border-slate-900 p-5 rounded-xl space-y-3" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-1">
                  <div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase mr-2 shrink-0">
                      {milestone.quarter}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {milestone.months}
                    </span>
                  </div>
                  <h4 className="text-xs md:text-sm font-sans font-bold text-white mt-1 md:mt-0">
                    {milestone.title[lang]}
                  </h4>
                </div>

                {/* Subtask list checkboxes */}
                <ul className="space-y-1.5 md:space-y-2 border-t border-slate-900/70 pt-3">
                  {milestone.tasks[lang].map((task, taskIdx) => (
                    <li key={taskIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                      <CheckSquare className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
