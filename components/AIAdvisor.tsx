'use client';

import { useState, useRef } from 'react';
import { Sparkles, ChevronRight, Upload, X, Loader2, AlertTriangle, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AnalysisResult {
  suspectedDamage?: string;
  suspectedWoodType?: string;
  suspectedSurface?: string;
  severity?: string;
  urgency?: string;
  diyPossible?: boolean;
  recommendedService?: string;
  priceRange?: string;
  leadScore?: number;
  customerExplanation?: string;
  internalSummary?: string;
}

export default function AIAdvisor({ onOpenBooking }: { onOpenBooking?: (diagnosis: any) => void }) {
  const [step, setStep] = useState<'intro' | 'form' | 'loading' | 'result'>('intro');
  const [formData, setFormData] = useState({
    concerns: '',
  });
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStart = () => setStep('form');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');

    try {
      if (!image) {
        setResult('Bitte laden Sie ein Foto Ihres Parketts hoch, damit die KI es analysieren kann.');
        setStep('result');
        return;
      }

      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concerns: formData.concerns, imageBase64: image }),
      });

      if (!response.ok) {
        throw new Error('API Error');
      }

      const data = await response.json();
      setResult(data);
      setStep('result');
    } catch (error) {
      console.error(error);
      setResult('Entschuldigung, es gab ein Problem bei der Verbindung mit dem digitalen Berater. Bitte versuchen Sie es später noch einmal.');
      setStep('result');
    }
  };

  const currentStepContent = () => {
    if (step === 'intro') {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full justify-between">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="font-headline-md text-[28px] text-white mb-2">
              KI-Fotoanalyse
            </h2>
            <p className="text-white/70 text-sm font-body-md mb-6 leading-relaxed">Foto hochladen & sofortige Experten-Analyse zum Zustand Ihres Parketts erhalten.</p>
            
            <ol className="space-y-3 mt-2 mb-6">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0 text-white/50">1</div>
                <span className="text-white/80 text-sm">Foto hochladen</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0 text-white/50">2</div>
                <span className="text-white/80 text-sm">KI analysiert Oberfläche & Zustand</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
                <span className="text-white font-medium text-sm">Diagnose & Handlungsempfehlung erhalten</span>
              </li>
            </ol>
          </div>
          <button 
            onClick={handleStart}
            className="border border-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-label-md text-label-md text-center hover:bg-white/10 transition-all flex justify-center items-center gap-2 mt-auto relative z-10 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Jetzt KI-Analyse starten
          </button>
        </motion.div>
      );
    }

    if (step === 'form') {
      return (
        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="flex flex-col h-full justify-between" suppressHydrationWarning>
          <div className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-label-md text-white/80 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                Foto <span className="bg-secondary/20 text-secondary-fixed px-1.5 py-0.5 rounded text-[9px]">Erforderlich</span>
              </label>
              {!image ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-white/20 bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 hover:border-secondary/50 transition-colors"
                >
                  <Upload className="w-6 h-6 text-white/40 mb-2" />
                  <span className="text-sm font-medium text-white/80 mb-1">Tippen zum Hochladen</span>
                  <span className="text-xs text-white/50 text-center">Gute Beleuchtung verbessert die Analyse</span>
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                </div>
              ) : (
                <div className="relative w-full h-28 rounded-lg overflow-hidden border border-secondary/50 shadow-lg shadow-secondary/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt="Uploaded preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                     <span className="text-xs text-white flex items-center gap-1"><Sparkles className="w-3 h-3"/> KI bereit zur Analyse</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-white/10 backdrop-blur p-1.5 rounded-full shadow-md hover:bg-white/20 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-label-md text-white/80 uppercase tracking-widest mb-1.5">Ihre Frage oder Ihr Anliegen (optional)</label>
              <textarea 
                placeholder="z.B. Wie bekomme ich den Wasserfleck weg?" 
                className="w-full bg-white/5 border border-white/20 text-white rounded-lg px-3 py-2 text-sm focus:bg-white/10 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition placeholder:text-white/30 resize-none h-16"
                value={formData.concerns}
                onChange={(e) => setFormData(prev => ({...prev, concerns: e.target.value}))}
                suppressHydrationWarning
              />
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 relative z-10">
            <button 
              type="button" 
              onClick={() => setStep('intro')}
              className="px-4 py-2.5 rounded-xl text-xs font-label-md uppercase tracking-wide text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              Zurück
            </button>
            <button 
              type="submit"
              className="flex-1 bg-secondary hover:bg-secondary/90 text-white px-4 py-2.5 rounded-xl font-label-md uppercase tracking-wide transition-colors flex justify-center items-center gap-2"
            >
              Analysieren
            </button>
          </div>
        </motion.form>
      );
    }

    if (step === 'loading') {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full items-center justify-center text-center relative z-10">
          <Loader2 className="w-10 h-10 text-secondary animate-spin mb-4" />
          <h3 className="font-headline-sm text-headline-sm text-white mb-2">Die KI analysiert...</h3>
          <p className="font-body-md text-white/60 max-w-[200px]">Ihre Angaben und das Bildmaterial werden ausgewertet.</p>
        </motion.div>
      );
    }

    if (step === 'result') {
      const isStringError = typeof result === 'string';
      const analysis = !isStringError ? (result as AnalysisResult) : null;
      const needsHelp = analysis?.severity === 'Schwer' || analysis?.severity === 'Hoch' || analysis?.urgency === 'Hoch';

      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full relative z-10 text-white">
          <div className="flex justify-between items-center mb-4">
             <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-fixed text-[9px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> KI Voranalyse
            </div>
            <button onClick={() => {setStep('intro'); setFormData({concerns: ''}); setImage(null);}} className="text-xs font-bold uppercase hover:underline text-white/60 hover:text-white">
              Neu starten
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar pb-2">
            {isStringError ? (
               <div className="text-sm text-white/80 p-4 bg-red-500/20 rounded-xl border border-red-500/30">
                 {result as string}
               </div>
            ) : (
               <div className="space-y-4">
                 
                 <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                      <span className="block text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Schaden</span>
                      <span className="font-medium text-white/90">{analysis?.suspectedDamage || '-'}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                      <span className="block text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Holzart</span>
                      <span className="font-medium text-white/90">{analysis?.suspectedWoodType || 'Unbekannt'}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                      <span className="block text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Oberfläche</span>
                      <span className="font-medium text-white/90">{analysis?.suspectedSurface || 'Unbekannt'}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                      <span className="block text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Schweregrad</span>
                      <span className={`font-medium ${needsHelp ? 'text-red-300' : 'text-secondary-fixed'}`}>{analysis?.severity || '-'}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                      <span className="block text-white/50 text-[10px] uppercase tracking-wider mb-0.5">Dringlichkeit</span>
                      <span className={`font-medium ${needsHelp ? 'text-red-300' : 'text-secondary-fixed'}`}>{analysis?.urgency || '-'}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                      <span className="block text-white/50 text-[10px] uppercase tracking-wider mb-0.5">DIY Möglich?</span>
                      <span className="font-medium text-white/90">{analysis?.diyPossible ? 'Ja' : 'Besser Profi'}</span>
                    </div>
                 </div>

                 <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                   <h4 className="flex items-center gap-2 text-sm font-semibold mb-2"><Search className="w-4 h-4 text-secondary" /> Ersteinschätzung</h4>
                   <p className="text-xs text-white/80 leading-relaxed mb-3">{analysis?.customerExplanation}</p>
                   
                   <p className="text-[10px] text-white/40 italic flex items-start gap-1.5 leading-tight">
                     <AlertTriangle className="w-3 h-3 shrink-0" />
                     Hinweis: Diese KI-Voranalyse ersetzt keine professionelle Begutachtung vor Ort.
                   </p>
                 </div>

                 <div className="bg-surface-variant/20 border border-secondary/30 rounded-xl p-3">
                   <span className="block text-white/50 text-[10px] uppercase tracking-wider mb-1">Empfehlung</span>
                   <p className="text-sm font-medium text-white mb-1">{analysis?.recommendedService}</p>
                   <p className="text-xs text-white/60">Kostenschätzung: {analysis?.priceRange}</p>
                 </div>

                 {needsHelp && onOpenBooking && (
                   <button 
                     onClick={() => onOpenBooking(analysis)}
                     className="w-full bg-primary text-white py-3 rounded-xl font-label-md text-xs uppercase tracking-widest font-bold shadow-lg shadow-black/20 hover:bg-primary/90 flex justify-center items-center gap-2 transition-all"
                   >
                     Kostenlose Begutachtung anfragen <ArrowRight className="w-4 h-4" />
                   </button>
                 )}
               </div>
            )}
          </div>
        </motion.div>
      );
    }
  };

  return (
    <div className="relative group animate-in fade-in slide-in-from-right-10 duration-1000 w-full h-[450px]">
      {/* Ambient static glow */}
      <div className="absolute -inset-4 bg-secondary/10 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-70 transition-all duration-700 pointer-events-none"></div>
      
      {/* Rotating running glow effect */}
      <div className="absolute -inset-[2px] rounded-[2rem] overflow-hidden pointer-events-none mask-image:radial-gradient(white,black)">
        <div className="absolute top-1/2 left-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_70%,rgba(253,203,155,0.7)_100%)] animate-[spin_4s_linear_infinite] group-hover:bg-[conic-gradient(from_0deg,transparent_70%,rgba(253,203,155,1)_100%)] transition-colors"></div>
      </div>
      
      {/* Content Box */}
      <div className="p-6 md:p-8 rounded-[calc(2rem-2px)] relative z-10 flex flex-col justify-between h-full border border-white/10 bg-black/50 backdrop-blur-3xl m-[2px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
        <AnimatePresence mode="wait">
          {currentStepContent()}
        </AnimatePresence>
        <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.4);
        }
      `}</style>
      </div>
    </div>
  );
}
