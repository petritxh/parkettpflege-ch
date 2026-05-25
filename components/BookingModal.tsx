'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

const SERVICES = [
  { id: 'besichtigung', name: 'Kostenlose Besichtigung', desc: 'Wir begutachten Ihren Boden vor Ort.' },
  { id: 'kostenvoranschlag', name: 'Kostenvoranschlag', desc: 'Detaillierte Offerte für Ihr Projekt.' },
  { id: 'pflegearbeiten', name: 'Pflege & Reinigung', desc: 'Schleifen, Ölen, Versiegeln, etc.' }
];

const DATES = [
  'Heute', 'Morgen', 'In 2 Tagen', 'Nächste Woche'
];

const TIMES = [
  '08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00'
];

export default function BookingModal({ isOpen, onClose, aiDiagnosis }: { isOpen: boolean; onClose: () => void; aiDiagnosis?: any }) {
  const [step, setStep] = useState<'service' | 'datetime' | 'contact' | 'loading' | 'success' | 'error'>('service');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const nextStep = (next: typeof step) => setStep(next);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('loading');
    
    try {
      const payload = { ...formData };
      if (aiDiagnosis) {
        (payload as any).aiDiagnosis = aiDiagnosis;
      }
      
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Fehler beim Senden der Anfrage');
      }
      
      setStep('success');
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);
      setStep('error');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('service');
      setFormData({
        service: '', date: '', time: '', firstName: '', lastName: '', email: '', phone: '', message: ''
      });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-surface-container-highest/60 backdrop-blur-sm" onClick={handleClose}></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-surface w-full max-w-2xl rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] border border-outline-variant/30"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-outline-variant/30">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Termin buchen</h2>
          <button onClick={handleClose} className="p-2 hover:bg-surface-variant rounded-full transition-colors">
            <X className="w-6 h-6 text-on-surface" />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow">
          <AnimatePresence mode="wait">
            
            {step === 'service' && (
              <motion.div key="service" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-label-md text-sm text-on-surface uppercase tracking-widest mb-6">Wobei können wir helfen?</h3>
                <div className="space-y-3">
                  {SERVICES.map(s => (
                    <button 
                      key={s.id}
                      onClick={() => { setFormData({...formData, service: s.name}); nextStep('datetime'); }}
                      className="w-full text-left p-4 rounded-xl border border-outline-variant/50 hover:border-secondary hover:bg-surface-variant transition-all group"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="block font-body-md text-on-surface font-medium mb-1">{s.name}</span>
                          <span className="block font-caption text-caption text-on-surface-variant">{s.desc}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-on-surface-variant group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'datetime' && (
              <motion.div key="datetime" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-label-md text-sm text-on-surface uppercase tracking-widest mb-6">Wann passt es Ihnen am besten?</h3>
                
                <div className="mb-6">
                  <label className="flex items-center gap-2 font-label-md text-xs text-on-surface-variant uppercase tracking-widest mb-3">
                    <Calendar className="w-4 h-4" /> Datum wählen
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {DATES.map(d => (
                      <button 
                        key={d}
                        onClick={() => setFormData({...formData, date: d})}
                        className={`p-3 rounded-xl border font-body-md text-sm transition-colors ${formData.date === d ? 'border-secondary bg-secondary/10 text-secondary' : 'border-outline-variant/50 text-on-surface hover:bg-surface-variant'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="flex items-center gap-2 font-label-md text-xs text-on-surface-variant uppercase tracking-widest mb-3">
                    <Clock className="w-4 h-4" /> Zeitfenster wählen
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {TIMES.map(t => (
                      <button 
                        key={t}
                        onClick={() => setFormData({...formData, time: t})}
                        className={`p-3 rounded-xl border font-body-md text-sm transition-colors ${formData.time === t ? 'border-secondary bg-secondary/10 text-secondary' : 'border-outline-variant/50 text-on-surface hover:bg-surface-variant'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-auto pt-4">
                  <button onClick={() => nextStep('service')} className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant hover:text-on-surface">Zurück</button>
                  <button 
                    onClick={() => nextStep('contact')}
                    disabled={!formData.date || !formData.time}
                    className="bg-primary text-white px-6 py-3 rounded-xl font-label-md text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                  >
                    Weiter
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'contact' && (
              <motion.form key="contact" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSubmit}>
                <h3 className="font-label-md text-sm text-on-surface uppercase tracking-widest mb-6">Ihre Kontaktdaten</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-md text-[10px] text-on-surface uppercase tracking-widest mb-1.5">Vorname</label>
                      <input required type="text" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 py-3 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                    </div>
                    <div>
                      <label className="block font-label-md text-[10px] text-on-surface uppercase tracking-widest mb-1.5">Nachname</label>
                      <input required type="text" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 py-3 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-md text-[10px] text-on-surface uppercase tracking-widest mb-1.5">E-Mail Adresse</label>
                    <input required type="email" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 py-3 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block font-label-md text-[10px] text-on-surface uppercase tracking-widest mb-1.5">Telefonnummer</label>
                    <input required type="tel" className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 py-3 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block font-label-md text-[10px] text-on-surface uppercase tracking-widest mb-1.5">Nachricht (optional)</label>
                    <textarea className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 py-3 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition resize-none" rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button type="button" onClick={() => nextStep('datetime')} className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant hover:text-on-surface">Zurück</button>
                  <button 
                    type="submit"
                    className="bg-primary text-white px-8 py-3 rounded-xl font-label-md text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-md"
                  >
                    Jetzt anfragen
                  </button>
                </div>
                <p className="mt-4 text-[10px] text-on-surface-variant text-center">
                  Ihre Daten werden sicher und gemäss der Datenschutzgrundverordnung (DSGVO) sowie dem Schweizer Datenschutzgesetz (DSG) verarbeitet.
                </p>
              </motion.form>
            )}

            {step === 'loading' && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12 text-center">
                <Loader2 className="w-12 h-12 text-secondary animate-spin mb-4" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Buchung wird verarbeitet...</h3>
                <p className="font-body-md text-on-surface-variant">Bitte haben Sie einen Moment Geduld.</p>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Vielen Dank!</h3>
                <p className="font-body-md text-on-surface-variant mb-6 max-w-md">
                  Ihre Anfrage für <strong>{formData.service}</strong> wurde erfolgreich übermittelt. Wir werden uns in Kürze mit Ihnen in Verbindung setzen.
                </p>
                <button 
                  onClick={handleClose}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-label-md text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors"
                >
                  Schliessen
                </button>
              </motion.div>
            )}

            {step === 'error' && (
              <motion.div key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <X className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Fehler bei der Anfrage</h3>
                <p className="font-body-md text-red-600 mb-6 max-w-md">
                  {errorMessage || 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'}
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => nextStep('contact')}
                    className="border border-outline-variant text-on-surface px-8 py-3 rounded-xl font-label-md text-xs uppercase tracking-widest hover:bg-surface-variant transition-colors"
                  >
                    Zurück
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
