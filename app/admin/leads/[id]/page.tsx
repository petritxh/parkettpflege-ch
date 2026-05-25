'use client';

import { useState, useEffect, use } from 'react';
import { Lead } from '@/lib/types/crm';
import { Loader2, ArrowLeft, User, Phone, Mail, FileText, Sparkles, AlertTriangle, ArrowRight, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingOffer, setGeneratingOffer] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  useEffect(() => {
    async function loadLead() {
      try {
        const res = await fetch(`/api/admin/leads/${resolvedParams.id}`);
        if (res.ok) setLead(await res.json());
      } catch (error) {
        console.error('Failed to load lead:', error);
      } finally {
        setLoading(false);
      }
    }
    loadLead();
  }, [resolvedParams.id]);

  const handleStatusChange = async (newStatus: Lead['status']) => {
    if (!lead) return;
    setSavingStatus(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setLead({ ...lead, status: newStatus });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSavingStatus(false);
    }
  };

  const handleCreateOffer = async () => {
    if (!lead) return;
    setGeneratingOffer(true);
    try {
      const res = await fetch('/api/admin/draft-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id })
      });
      const data = await res.json();
      if (res.ok && data.offerId) {
        await handleStatusChange('Offerte gesendet');
        router.push(`/admin/offers/${data.offerId}`);
      } else {
        alert('Fehler bei der Offertenerstellung: ' + data.error);
      }
    } catch (error) {
      console.error(error);
      alert('Fehler bei der Offertenerstellung');
    } finally {
      setGeneratingOffer(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-12">
        <h2 className="font-headline-sm mb-4">Lead nicht gefunden</h2>
        <Link href="/admin/leads" className="text-secondary hover:underline">Zurück zur Übersicht</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/leads" className="p-2 hover:bg-surface-variant rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-on-surface-variant" />
        </Link>
        <div>
          <h1 className="font-display-sm text-display-sm">Lead Details</h1>
          <p className="text-on-surface-variant font-body-md text-sm">{lead.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-surface rounded-2xl border border-outline-variant/30 p-6 shadow-sm">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-headline-sm flex items-center gap-2"><User className="w-5 h-5 text-secondary"/> Kundendaten</h3>
               <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full ${lead.priority === 'Hoch' ? 'bg-red-100 text-red-700' : lead.priority === 'Mittel' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                 Priorität: {lead.priority}
               </span>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-label-md text-on-surface-variant uppercase tracking-widest mb-1">Name</label>
                  <p className="font-medium">{lead.customer.firstName} {lead.customer.lastName}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-label-md text-on-surface-variant uppercase tracking-widest mb-1">Quelle</label>
                  <p className="font-medium text-sm">{lead.funnelSource || 'Unbekannt'}</p>
                </div>
                <div>
                  <label className="block text-[10px] font-label-md text-on-surface-variant uppercase tracking-widest mb-1 flex items-center gap-1"><Mail className="w-3 h-3"/> E-Mail</label>
                  <a href={`mailto:${lead.customer.email}`} className="font-medium text-secondary hover:underline">{lead.customer.email}</a>
                </div>
                <div>
                  <label className="block text-[10px] font-label-md text-on-surface-variant uppercase tracking-widest mb-1 flex items-center gap-1"><Phone className="w-3 h-3"/> Telefon</label>
                  <a href={`tel:${lead.customer.phone}`} className="font-medium text-secondary hover:underline">{lead.customer.phone}</a>
                </div>
             </div>
          </div>

          <div className="bg-surface rounded-2xl border border-outline-variant/30 p-6 shadow-sm">
             <h3 className="font-headline-sm flex items-center gap-2 mb-6"><FileText className="w-5 h-5 text-secondary"/> Anfrage & Service</h3>
             
             <div className="space-y-4">
                <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
                  <label className="block text-[10px] font-label-md text-on-surface-variant uppercase tracking-widest mb-1">Gewünschter Service</label>
                  <p className="font-medium text-lg text-primary">{lead.serviceInfo.service}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
                    <label className="block text-[10px] font-label-md text-on-surface-variant uppercase tracking-widest mb-1">Wunschdatum</label>
                    <p className="font-medium">{lead.serviceInfo.preferredDate}</p>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
                    <label className="block text-[10px] font-label-md text-on-surface-variant uppercase tracking-widest mb-1">Zeitfenster</label>
                    <p className="font-medium">{lead.serviceInfo.preferredTime}</p>
                  </div>
                </div>

                {lead.serviceInfo.message && (
                  <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
                    <label className="block text-[10px] font-label-md text-on-surface-variant uppercase tracking-widest mb-1">Nachricht</label>
                    <p className="font-body-md text-sm whitespace-pre-wrap">{lead.serviceInfo.message}</p>
                  </div>
                )}
             </div>
          </div>

          {lead.aiDiagnosis && (
            <div className="bg-surface-bright rounded-2xl border border-secondary/30 p-6 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Sparkles className="w-24 h-24 text-secondary" />
               </div>
               
               <div className="relative z-10 flex flex-col md:flex-row gap-8">
                 
                 {/* Left Side: Data & Summaries */}
                 <div className="flex-1">
                   <h3 className="font-headline-sm flex items-center gap-2 mb-6 text-secondary"><Sparkles className="w-5 h-5"/> AI Diagnose (Voranalyse)</h3>
                   
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white/50 p-3 rounded-lg border border-outline-variant/20">
                        <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Schaden</span>
                        <span className="font-medium text-sm">{lead.aiDiagnosis.suspectedDamage || '-'}</span>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg border border-outline-variant/20">
                        <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Holzart</span>
                        <span className="font-medium text-sm">{lead.aiDiagnosis.suspectedWoodType || '-'}</span>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg border border-outline-variant/20">
                        <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Oberfläche</span>
                        <span className="font-medium text-sm">{lead.aiDiagnosis.suspectedSurface || '-'}</span>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg border border-outline-variant/20">
                        <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Schweregrad</span>
                        <span className="font-medium text-sm text-red-600">{lead.aiDiagnosis.severity || '-'}</span>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg border border-outline-variant/20">
                        <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Dringlichkeit</span>
                        <span className="font-medium text-sm text-red-600">{lead.aiDiagnosis.urgency || '-'}</span>
                      </div>
                      <div className="bg-white/50 p-3 rounded-lg border border-outline-variant/20">
                        <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Score</span>
                        <span className="font-medium text-sm">{lead.aiDiagnosis.leadScore || 0}/100</span>
                      </div>
                   </div>

                   <div className="space-y-4">
                      {lead.aiDiagnosis.customerExplanation && (
                        <div className="bg-white/50 p-4 rounded-xl border border-outline-variant/20">
                          <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mb-1 flex items-center gap-1"><User className="w-3 h-3"/> Kunden-Erklärung (Transkript)</span>
                          <p className="text-sm italic">"{lead.aiDiagnosis.customerExplanation}"</p>
                        </div>
                      )}
                      
                      <div className="bg-white/50 p-4 rounded-xl border border-outline-variant/20">
                        <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Interne Zusammenfassung</span>
                        <p className="text-sm font-medium">{lead.aiDiagnosis.internalSummary}</p>
                      </div>
                      
                      <div className="bg-white/50 p-4 rounded-xl border border-outline-variant/20 flex justify-between items-center">
                        <div>
                          <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Empfohlener Service</span>
                          <p className="text-sm font-medium text-primary">{lead.aiDiagnosis.recommendedService}</p>
                        </div>
                        <div className="text-right">
                          <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Preisrahmen (geschätzt)</span>
                          <p className="text-sm font-medium">CHF {lead.aiDiagnosis.priceRange?.min} - {lead.aiDiagnosis.priceRange?.max}</p>
                        </div>
                      </div>
                   </div>
                 </div>

                 {/* Right Side: Photo Analysis */}
                 {lead.aiDiagnosis.imageUrl && (
                   <div className="md:w-1/3 flex flex-col gap-3">
                     <span className="block text-[10px] font-label-md text-on-surface-variant uppercase tracking-widest mb-1">Kundenfoto (KI-Analysiert)</span>
                     <div className="relative rounded-2xl overflow-hidden border-2 border-secondary/20 shadow-lg aspect-square">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img 
                         src={lead.aiDiagnosis.imageUrl} 
                         alt="Schaden Analyse Foto" 
                         className="w-full h-full object-cover"
                       />
                       <div className="absolute top-2 right-2 bg-secondary/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                         <Sparkles className="w-3 h-3" /> KI Geprüft
                       </div>
                     </div>
                     {lead.aiDiagnosis.diyPossible ? (
                       <div className="bg-green-100 text-green-800 text-xs p-3 rounded-xl border border-green-200">
                         <strong>Tipp:</strong> Laut KI ist dieser Schaden potenziell selbst durch den Kunden behebbar (DIY). Ein Pflege-Set könnte hier als Alternative angeboten werden.
                       </div>
                     ) : (
                       <div className="bg-amber-100 text-amber-800 text-xs p-3 rounded-xl border border-amber-200">
                         <strong>Hinweis:</strong> Schaden erfordert professionelle Maschinen und Fachwissen. Kein DIY möglich.
                       </div>
                     )}
                   </div>
                 )}
                 
               </div>
            </div>
          )}

        </div>

        {/* Right Column (Actions) */}
        <div className="space-y-6">
           <div className="bg-surface rounded-2xl border border-outline-variant/30 p-6 shadow-sm sticky top-6">
             <h3 className="font-headline-sm mb-6">Aktionen</h3>
             
             <div className="space-y-4 mb-8">
               <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-widest mb-2">Lead Status</label>
               <select 
                 value={lead.status}
                 onChange={(e) => handleStatusChange(e.target.value as any)}
                 disabled={savingStatus}
                 className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 outline-none transition disabled:opacity-50"
               >
                 <option value="Neu">Neu</option>
                 <option value="Qualifiziert">Qualifiziert</option>
                 <option value="Besichtigung geplant">Besichtigung geplant</option>
                 <option value="Offerte gesendet">Offerte gesendet</option>
                 <option value="Nachfassen">Nachfassen</option>
                 <option value="Gewonnen">Gewonnen</option>
                 <option value="Verloren">Verloren</option>
               </select>
             </div>

             <div className="pt-6 border-t border-outline-variant/30">
               <button 
                 onClick={handleCreateOffer}
                 disabled={generatingOffer}
                 className="w-full bg-primary text-white py-3 px-4 rounded-xl font-label-md text-xs uppercase tracking-widest font-bold shadow-md hover:bg-primary/90 flex justify-center items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {generatingOffer ? (
                   <><Loader2 className="w-4 h-4 animate-spin" /> KI generiert...</>
                 ) : (
                   <><Sparkles className="w-4 h-4" /> Offerte erstellen <ArrowRight className="w-4 h-4" /></>
                 )}
               </button>
               <p className="text-[10px] text-on-surface-variant text-center mt-3 flex items-center justify-center gap-1">
                 <AlertTriangle className="w-3 h-3" /> Offerte wird via KI vorbereitet.
               </p>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
