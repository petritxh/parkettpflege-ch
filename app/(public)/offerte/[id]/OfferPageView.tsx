'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock, CheckCircle2, XCircle, HelpCircle, Send } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Offer, AdminSettings } from '@/lib/types/crm';

export default function OfferPageView({ 
  offer, 
  settings, 
  isAuthorized,
  lead
}: { 
  offer: Offer; 
  settings: AdminSettings; 
  isAuthorized: boolean;
  lead: any;
}) {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  
  const [isResponding, setIsResponding] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError('');
    
    try {
      const res = await fetch(`/api/offer/${offer.id}/verify-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      
      const data = await res.json();
      if (data.success) {
        router.refresh();
      } else {
        setError(data.error || 'Falscher PIN');
      }
    } catch (err) {
      setError('Verbindungsfehler');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleAction = async (action: 'accepted' | 'rejected' | 'rethinking') => {
    setIsResponding(true);
    try {
      const res = await fetch(`/api/offer/${offer.id}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, feedback, pin: offer.accessPin })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        alert(`Es gab einen Fehler: ${data.error || 'Server Fehler'}`);
      } else {
        // Erfolgreich! Lade die Seite neu, um die Dankesseite/Konfetti zu sehen
        window.location.reload(); 
        // window.location.reload() ist robuster als router.refresh() bei hartnäckigem Next.js Cache
      }
    } catch (err) {
      alert('Netzwerkfehler. Bitte probieren Sie es nochmal.');
    } finally {
      setIsResponding(false);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Geschütztes Angebot</h1>
          <p className="text-gray-500 mb-8">Bitte geben Sie den 4-stelligen PIN-Code ein, den Sie per E-Mail erhalten haben.</p>
          
          <form onSubmit={handleVerify}>
            <input 
              type="text" 
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="PIN eingeben"
              className="w-full text-center text-3xl tracking-[0.5em] font-bold bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 mb-4 focus:ring-0 focus:border-primary outline-none transition"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button 
              type="submit" 
              disabled={isVerifying || pin.length < 4}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center hover:bg-primary/90 transition disabled:opacity-50"
            >
              {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Angebot ansehen'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Bereits beantwortet?
  if (offer.customerStatus === 'accepted') {
    // Konfetti auslösen, wenn die Seite das erste Mal mit 'accepted' geladen wird
    useEffect(() => {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      const redirectTimer = setTimeout(() => {
        router.push('/ratgeber');
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(redirectTimer);
      };
    }, [router]);

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full text-center relative overflow-hidden"
        >
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Vielen Dank für Ihre Buchung!</h1>
          <p className="text-gray-600 mb-6">Wir haben Ihre Annahme erfolgreich registriert und freuen uns sehr auf die Zusammenarbeit mit Ihnen.</p>
          <p className="text-gray-600 font-medium">Sie erhalten von uns noch eine formelle Auftragsbestätigung per E-Mail. Wir werden uns in Kürze telefonisch bei Ihnen melden, um die genauen Termindetails zu besprechen.</p>
          <p className="text-gray-400 text-sm mt-8">Bei Fragen stehen wir jederzeit gerne zur Verfügung.</p>
        </motion.div>
      </div>
    );
  }
  
  if (offer.customerStatus === 'rejected') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-3xl shadow-xl max-w-lg w-full text-center">
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Angebot abgelehnt</h1>
          <p className="text-gray-600">Schade, dass wir Sie diesmal nicht überzeugen konnten. Wir haben Ihre Entscheidung vermerkt. Bei Fragen stehen wir jederzeit zur Verfügung.</p>
        </div>
      </div>
    );
  }

  // Formatierter Intro-Text
  const personalizedIntro = settings.offerIntroTemplate.replace('{KUNDE_NAME}', `${offer.customer.firstName} ${offer.customer.lastName}`);
  const combinedIntro = `${personalizedIntro}\n\n${offer.introText}`;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-8">
      
      {/* Offerten Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-t-3xl p-8 md:p-12 shadow-sm border-b-2 border-primary"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#061b0e] tracking-tight mb-2">Parkett-Pflege.ch</h1>
            <p className="text-gray-500 font-medium">Offizielle Richtofferte</p>
          </div>
          <div className="text-left md:text-right text-gray-600 bg-gray-50 p-4 rounded-xl">
            <p className="text-sm font-bold text-gray-900 mb-1">Offerten-Nr: {offer.id.substring(0,8).toUpperCase()}</p>
            <p className="text-sm">Datum: {new Date(offer.createdAt).toLocaleDateString('de-CH')}</p>
            <p className="text-sm font-medium text-amber-600 mt-2">Gültig bis: {offer.validUntil}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-6 rounded-2xl mb-12">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Angebot für:</h3>
            <p className="font-bold text-gray-900 text-lg">{offer.customer.firstName} {offer.customer.lastName}</p>
            {lead?.objectDetails?.address && <p className="text-gray-600">{lead.objectDetails.address}</p>}
            <p className="text-gray-600">{offer.customer.email}</p>
            {offer.customer.phone && <p className="text-gray-600">{offer.customer.phone}</p>}
          </div>
          <div className="md:text-right">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Unser Kontakt:</h3>
             <p className="font-bold text-gray-900">Parkett-Pflege.ch</p>
             <p className="text-gray-600">Zürichstrasse 12, 8001 Zürich</p>
             <p className="text-gray-600">info@parkett-pflege.ch</p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{offer.title}</h2>
        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
          {combinedIntro}
        </div>
      </motion.div>

      {/* Positionen */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-8 md:p-12 shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Position</th>
                <th className="py-4 font-bold text-gray-500 uppercase text-xs tracking-wider text-center">Menge</th>
                <th className="py-4 font-bold text-gray-500 uppercase text-xs tracking-wider text-right">Einzelpreis</th>
                <th className="py-4 font-bold text-gray-500 uppercase text-xs tracking-wider text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {offer.lineItems.map(item => (
                <tr key={item.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                  <td className="py-5 text-gray-900 font-medium pr-4">{item.description}</td>
                  <td className="py-5 text-gray-600 text-center">{item.quantity} {item.unit}</td>
                  <td className="py-5 text-gray-600 text-right">CHF {item.unitPrice.toFixed(2)}</td>
                  <td className="py-5 font-bold text-gray-900 text-right">CHF {item.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-end">
          <div className="w-full md:w-1/2 bg-surface-variant p-6 rounded-2xl">
            <div className="flex justify-between items-center text-xl font-bold text-gray-900">
              <span>Total inkl. MwSt:</span>
              <span className="text-primary">CHF {offer.totalAmount.toFixed(2)}</span>
            </div>
            {offer.isFixedPrice && (
              <div className="mt-3 flex items-center justify-end gap-2 text-green-600 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Garantierter Fixpreis</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Bedingungen & Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-b-3xl p-8 md:p-12 shadow-sm border-t border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {offer.assumptions.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Inklusive / Annahmen</h4>
              <ul className="space-y-2">
                {offer.assumptions.map((a, i) => (
                  <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {offer.exclusions.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><XCircle className="w-5 h-5 text-red-500" /> Exklusive</h4>
              <ul className="space-y-2">
                {offer.exclusions.map((e, i) => (
                  <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-500 whitespace-pre-wrap border-t border-gray-100 pt-8 text-center">
          {settings.offerFooterTemplate}
        </div>
      </motion.div>

      {/* Interaktive Aktionen (Floating Bar) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring', damping: 20 }}
        className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-4 md:p-6 z-50"
      >
        <div className="max-w-4xl mx-auto">
          {showFeedback ? (
            <div className="animate-in slide-in-from-bottom-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Ihre Frage oder Feedback:</label>
              <textarea 
                rows={3}
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-primary outline-none"
                placeholder="Schreiben Sie uns, was noch unklar ist..."
              />
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowFeedback(false)}
                  className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition"
                >
                  Abbrechen
                </button>
                <button 
                  onClick={() => handleAction('rethinking')}
                  disabled={isResponding || !feedback}
                  className="flex-1 bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition disabled:opacity-50"
                >
                  {isResponding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  Nachricht senden
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="hidden md:block">
                <p className="font-bold text-gray-900">Wie möchten Sie verfahren?</p>
                <p className="text-xs text-gray-500">Ihre Entscheidung ist verbindlich.</p>
              </div>
              
              <div className="flex flex-wrap sm:flex-nowrap w-full md:w-auto gap-3">
                <button 
                  onClick={() => setShowFeedback(true)}
                  className="w-full sm:w-auto px-6 py-3 md:py-4 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">Frage stellen</span>
                </button>
                
                <button 
                  onClick={() => {
                    if(confirm('Möchten Sie dieses Angebot wirklich ablehnen?')) {
                      handleAction('rejected');
                    }
                  }}
                  disabled={isResponding}
                  className="w-full sm:w-auto px-6 py-3 md:py-4 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 transition flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Ablehnen
                </button>

                <button 
                  onClick={() => {
                    if(confirm('Kostenpflichtig buchen: Möchten Sie dieses Angebot annehmen?')) {
                      handleAction('accepted');
                    }
                  }}
                  disabled={isResponding}
                  className="w-full sm:w-auto px-8 py-3 md:py-4 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
                >
                  {isResponding ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                  Angebot annehmen
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Spacer for floating bar */}
      <div className="h-32" />
    </div>
  );
}
