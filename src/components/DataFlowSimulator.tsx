import { useState } from 'react';
import { Play, RotateCcw, ArrowRight, ArrowLeft, Shield, CheckCircle, Database, Check } from 'lucide-react';
import { Language } from '../types';
import { DATA_FLOW_SIMULATOR_STEPS } from '../data/architectureData';

interface DataFlowSimulatorProps {
  lang: Language;
}

export default function DataFlowSimulator({ lang }: DataFlowSimulatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const stepsLength = DATA_FLOW_SIMULATOR_STEPS.length;
  const currentStepData = DATA_FLOW_SIMULATOR_STEPS[currentStep - 1];

  const handleNext = () => {
    if (currentStep < stepsLength) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(1); // loop
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isRtl = lang === 'ar' || lang === 'ku';

  return (
    <div className="space-y-6" id="data-flow-simulator-core">
      {/* Header descriptive card */}
      <div className="bg-slate-900 border border-emerald-500/20 rounded-xl p-5 shadow-xl">
        <h3 className="text-lg font-sans font-semibold text-emerald-400 flex items-center gap-2">
          <Play className="w-5 h-5 animate-pulse" />
          {lang === 'en' && "Iraqi National Trade Import Clearance Simulator"}
          {lang === 'ar' && "محاكي عمليات تخليص المستوردات للتجارة الوطنية العراقية"}
          {lang === 'ku' && "هاوشێوەکەری کارەکانی مۆڵەتدانی گشتی عێراقی"}
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          {lang === 'en' && "Validate how transactional documents flow asynchronously among trade participants, ministries, the Central Bank, and border stations step-by-step."}
          {lang === 'ar' && "تتبع ورصد حركة انتقال المستندات والمعاملات بين المستوردين، الوزارات السيادية، البنك المركزي العراقي والمنافذ بشكل حي وخطوة بخطوة."}
          {lang === 'ku' && "سەیرکردنی ڕێڕەوی ڕۆیشتنی فایلەکان لە نێوان بازرگانان، وەزارەتەکان، بانکی ناوەندی و مەرزەکانی عێراق بە وردی بێ دابڕان."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Step List Pipeline */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-2xl space-y-4">
          <div className="text-xs uppercase font-mono tracking-wider text-slate-400 border-b border-slate-900 pb-2">
            {lang === 'en' ? "NSW Phase Checkpoints" : lang === 'ar' ? "نقاط التحقق والمراحل" : "قۆناغەکانی گومرگی یەکگرتوو"}
          </div>

          <div className="space-y-2 relative">
            {DATA_FLOW_SIMULATOR_STEPS.map((s, index) => {
              const active = s.step === currentStep;
              const completed = s.step < currentStep;
              
              return (
                <div
                  key={s.step}
                  onClick={() => setCurrentStep(s.step)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex items-start gap-3 ${
                    active 
                      ? 'bg-emerald-950/20 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.15)]Scale-[1.01]' 
                      : completed 
                        ? 'bg-slate-900/40 border-slate-800 text-slate-400' 
                        : 'bg-slate-900/20 border-slate-900 text-slate-500 hover:border-slate-800'
                  }`}
                  style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 ${
                    active 
                      ? 'bg-emerald-500 text-slate-950 font-bold' 
                      : completed 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-slate-800 text-slate-400'
                  }`}>
                    {completed ? <Check className="w-3.5 h-3.5" /> : s.step}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-sans font-semibold shrink-0 truncate ${active ? 'text-white' : 'text-slate-300'}`}>
                      {s.title[lang]}
                    </p>
                    <span className="text-[10px] font-mono text-slate-500">
                      {s.actor[lang]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Simulator triggers */}
          <div className="pt-4 border-t border-slate-900 flex items-center justify-between gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              {lang === 'en' ? "Previous" : lang === 'ar' ? "السابق" : "پێشوو"}
            </button>

            <button
              onClick={() => setCurrentStep(1)}
              className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 p-2 rounded-lg text-xs transition-all cursor-pointer"
              title={lang === 'en' ? "Reset Pipeline" : lang === 'ar' ? "إعادة تعيين المحاكاة" : "دەستپێکردنەوە"}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-sans font-bold px-4 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer"
            >
              {lang === 'en' ? "Next State" : lang === 'ar' ? "الدولة التالية" : "هەنگاوی داهاتوو"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Execution Simulation Screen */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col justify-between min-h-[420px]">
          <div>
            {/* Visual Header */}
            <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-950 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/10">
                  {lang === 'en' ? `ACTIVE STEP ${currentStep} / ${stepsLength}` : lang === 'ar' ? `المرحلة الجارية ${currentStep} / ${stepsLength}` : `قۆناغی ${currentStep} / ${stepsLength}`}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <span className="text-xs font-mono text-slate-500">{lang === 'en' ? "Sovereign IPC Protocol" : lang === 'ar' ? "بروتوكول المعالجة السيادي" : "پرۆتۆکۆلی گشتی"}</span>
            </div>

            {/* Simulated Live Action Terminal */}
            <div className="space-y-4">
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-900">
                <h4 className="text-sm font-sans font-bold text-white mb-1.5">
                  {currentStepData.title[lang]}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">
                  {currentStepData.desc[lang]}
                </p>
              </div>

              {/* Graphical Node Transmitter Simulator */}
              <div className="bg-slate-900 border border-slate-900 p-4 rounded-xl flex items-center justify-between relative overflow-hidden h-28">
                {/* Background grid texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-10"></div>
                
                {/* Source Node */}
                <div className="flex flex-col items-center z-10 w-24">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-emerald-500/30 flex items-center justify-center shadow-lg">
                    <Database className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 mt-1.5 text-center truncate w-full">
                    {lang === 'en' ? "Local Client" : lang === 'ar' ? "العميل المحلي" : "کاربەری ناوخۆ"}
                  </span>
                </div>

                {/* Flying Data Bullet line pipeline */}
                <div className="flex-1 h-0.5 bg-slate-800 relative mx-2">
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 h-1.5 w-4 rounded-full bg-emerald-400 animate-ping"
                    style={{ 
                      animationDuration: '1.2s',
                    }}
                  ></div>
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 h-1 w-2 rounded-full bg-emerald-300 animate-[pulse_1s_infinite]"
                  ></div>
                </div>

                {/* Target Node */}
                <div className="flex flex-col items-center z-10 w-24">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-emerald-500/40 flex items-center justify-center shadow-lg relative">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-400 absolute -top-1 -right-1 bg-slate-950 rounded-full" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 mt-1.5 text-center truncate w-full">
                    {currentStepData.actor[lang]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 text-emerald-500/70 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              {lang === 'en' ? "AUTOMATED TRANSACTION PIPELINE" : lang === 'ar' ? "تدفق البيانات الموحد غير المنقطع" : "ڕێڕەوی داتای بەردەوام"}
            </span>
            <span className="font-mono text-[10px]">latency: ~210ms / step</span>
          </div>
        </div>
      </div>
    </div>
  );
}
