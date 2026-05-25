'use client';

import { useState, useEffect, use } from 'react';
import { Offer, OfferLineItem } from '@/lib/types/crm';
import { Loader2, ArrowLeft, Save, FileText, Send, User, Calendar, Edit2, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import PdfOfferGenerator from '@/components/admin/PdfOfferGenerator';

export default function OfferDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadOffer() {
      try {
        const res = await fetch(`/api/admin/offers/${resolvedParams.id}`);
        if (res.ok) setOffer(await res.json());
      } catch (error) {
        console.error('Failed to load offer:', error);
      } finally {
        setLoading(false);
      }
    }
    loadOffer();
  }, [resolvedParams.id]);

  const handleSave = async () => {
    if (!offer) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/offers/${offer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offer)
      });
      if (res.ok) {
        alert('Offerte erfolgreich gespeichert.');
      } else {
        alert('Fehler beim Speichern.');
      }
    } catch (error) {
      console.error(error);
      alert('Fehler beim Speichern.');
    } finally {
      setSaving(false);
    }
  };

  const handleSendEmail = () => {
    if (!offer) return;
    const subject = encodeURIComponent(`Ihre Offerte von Parkettpflege.ch: ${offer.title}`);
    const body = encodeURIComponent(
      `Sehr geehrte(r) ${offer.customer.firstName} ${offer.customer.lastName},\n\n` +
      `Vielen Dank für Ihre Anfrage bei Parkettpflege.ch.\n\n` +
      `Wir haben Ihre Richtofferte mit der Nummer ${offer.id.substring(0, 8).toUpperCase()} erstellt.\n` +
      `Das detaillierte Angebot finden Sie im angehängten PDF.\n\n` +
      `Zusammenfassung der Leistungen:\n` +
      `${offer.lineItems.map(item => `- ${item.description}: CHF ${item.totalPrice.toFixed(2)}`).join('\n')}\n\n` +
      `Gesamtsumme: CHF ${offer.totalAmount.toFixed(2)} (inkl. MwSt)\n` +
      `Gültig bis: ${new Date(offer.validUntil).toLocaleDateString('de-CH')}\n\n` +
      `Haben Sie Fragen oder möchten Sie einen Termin buchen? Antworten Sie einfach auf diese E-Mail oder rufen Sie uns an.\n\n` +
      `Freundliche Grüsse,\n` +
      `Ihr Team von Parkettpflege.ch`
    );
    window.location.href = `mailto:${offer.customer.email}?subject=${subject}&body=${body}`;
  };

  const handleStatusChange = async (newStatus: Offer['status']) => {
    if (!offer) return;
    setOffer({ ...offer, status: newStatus });
    // Save is handled via the separate Save button, or we could auto-save status
  };

  const updateLineItem = (index: number, field: keyof OfferLineItem, value: any) => {
    if (!offer) return;
    const newItems = [...offer.lineItems];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Auto calculate total if unitPrice or quantity changed
    if (field === 'unitPrice' || field === 'quantity') {
      newItems[index].totalPrice = Number(newItems[index].quantity) * Number(newItems[index].unitPrice);
    }
    
    const newTotal = newItems.reduce((sum, item) => sum + (Number(item.totalPrice) || 0), 0);
    setOffer({ ...offer, lineItems: newItems, totalAmount: newTotal });
  };

  const removeLineItem = (index: number) => {
    if (!offer) return;
    const newItems = offer.lineItems.filter((_, i) => i !== index);
    const newTotal = newItems.reduce((sum, item) => sum + (Number(item.totalPrice) || 0), 0);
    setOffer({ ...offer, lineItems: newItems, totalAmount: newTotal });
  };

  const addLineItem = () => {
    if (!offer) return;
    const newItem: OfferLineItem = {
      id: crypto.randomUUID(),
      description: '',
      quantity: 1,
      unit: 'm2',
      unitPrice: 0,
      totalPrice: 0
    };
    setOffer({ ...offer, lineItems: [...offer.lineItems, newItem] });
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="text-center py-12">
        <h2 className="font-headline-sm mb-4">Offerte nicht gefunden</h2>
        <Link href="/admin/offers" className="text-secondary hover:underline">Zurück zur Übersicht</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/offers" className="p-2 hover:bg-surface-variant rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-on-surface-variant" />
          </Link>
          <div>
            <h1 className="font-display-sm text-display-sm">Offerte bearbeiten</h1>
            <p className="text-on-surface-variant font-body-md text-sm">{offer.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="w-48">
             <PdfOfferGenerator offer={offer} />
           </div>
           <button 
             onClick={handleSendEmail}
             className="px-4 py-2 bg-surface border border-outline-variant/50 rounded-xl hover:bg-surface-variant transition-colors flex items-center gap-2 text-sm font-medium"
           >
             <Send className="w-4 h-4" /> E-Mail
           </button>
           <button 
             onClick={handleSave}
             disabled={saving}
             className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50"
           >
             {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
             Speichern
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Offer Content) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-surface rounded-2xl border border-outline-variant/30 p-6 shadow-sm space-y-4">
             <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
               <h3 className="font-headline-sm flex items-center gap-2"><Edit2 className="w-5 h-5 text-secondary"/> Kopfdaten</h3>
             </div>
             
             <div>
               <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-widest mb-1.5">Titel der Offerte</label>
               <input 
                 type="text" 
                 value={offer.title} 
                 onChange={(e) => setOffer({...offer, title: e.target.value})}
                 className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 py-2 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 outline-none"
               />
             </div>
             
             <div>
               <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-widest mb-1.5">Einleitungstext</label>
               <textarea 
                 rows={6}
                 value={offer.introText} 
                 onChange={(e) => setOffer({...offer, introText: e.target.value})}
                 className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 py-2 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 outline-none resize-none"
               />
             </div>
          </div>

          <div className="bg-surface rounded-2xl border border-outline-variant/30 p-6 shadow-sm space-y-4">
             <div className="flex justify-between items-center border-b border-outline-variant/30 pb-4">
               <h3 className="font-headline-sm flex items-center gap-2"><FileText className="w-5 h-5 text-secondary"/> Leistungen</h3>
               <button onClick={addLineItem} className="text-secondary hover:text-secondary-fixed text-sm flex items-center gap-1 font-medium">
                 <Plus className="w-4 h-4"/> Position hinzufügen
               </button>
             </div>
             
             <div className="space-y-4 overflow-x-auto pb-2">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="pb-2 font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant">Beschreibung</th>
                      <th className="pb-2 font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant w-20">Menge</th>
                      <th className="pb-2 font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant w-20">Einheit</th>
                      <th className="pb-2 font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant w-28">EP (CHF)</th>
                      <th className="pb-2 font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant w-32 text-right">Total (CHF)</th>
                      <th className="pb-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {offer.lineItems.map((item, index) => (
                      <tr key={item.id} className="border-t border-outline-variant/10">
                        <td className="py-2 pr-2">
                           <input 
                             type="text" 
                             value={item.description} 
                             onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                             className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-1.5 text-sm outline-none"
                           />
                        </td>
                        <td className="py-2 pr-2">
                           <input 
                             type="number" 
                             value={item.quantity} 
                             onChange={(e) => updateLineItem(index, 'quantity', e.target.value)}
                             className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-1.5 text-sm outline-none"
                           />
                        </td>
                        <td className="py-2 pr-2">
                           <input 
                             type="text" 
                             value={item.unit} 
                             onChange={(e) => updateLineItem(index, 'unit', e.target.value)}
                             className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-1.5 text-sm outline-none"
                           />
                        </td>
                        <td className="py-2 pr-2">
                           <input 
                             type="number" 
                             value={item.unitPrice} 
                             onChange={(e) => updateLineItem(index, 'unitPrice', e.target.value)}
                             className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-1.5 text-sm outline-none"
                           />
                        </td>
                        <td className="py-2 pr-2 text-right">
                           <span className="font-medium">{(Number(item.totalPrice) || 0).toLocaleString('de-CH', { minimumFractionDigits: 2 })}</span>
                        </td>
                        <td className="py-2 text-right">
                           <button onClick={() => removeLineItem(index)} className="text-red-500 hover:text-red-700 p-1">
                             <Trash2 className="w-4 h-4" />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                     <tr className="border-t-2 border-outline-variant/30">
                        <td colSpan={4} className="pt-4 text-right font-bold text-lg">Gesamtsumme (CHF)</td>
                        <td className="pt-4 text-right font-bold text-lg text-primary">{(Number(offer.totalAmount) || 0).toLocaleString('de-CH', { minimumFractionDigits: 2 })}</td>
                        <td></td>
                     </tr>
                  </tfoot>
                </table>
             </div>
             
             <div className="flex items-center gap-2 mt-4 pt-4 border-t border-outline-variant/30">
               <input 
                 type="checkbox" 
                 id="isFixedPrice" 
                 checked={offer.isFixedPrice}
                 onChange={(e) => setOffer({...offer, isFixedPrice: e.target.checked})}
                 className="rounded border-outline-variant/50 text-secondary focus:ring-secondary"
               />
               <label htmlFor="isFixedPrice" className="text-sm font-medium">Dies ist ein verbindlicher Festpreis (keine Schätzung)</label>
             </div>
          </div>

          <div className="bg-surface rounded-2xl border border-outline-variant/30 p-6 shadow-sm space-y-4">
             <div>
               <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-widest mb-1.5">Annahmen (Eine pro Zeile)</label>
               <textarea 
                 rows={4}
                 value={offer.assumptions.join('\n')} 
                 onChange={(e) => setOffer({...offer, assumptions: e.target.value.split('\n').filter(s => s.trim())})}
                 className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 py-2 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 outline-none resize-none"
                 placeholder="Räume sind leergeräumt..."
               />
             </div>
             <div>
               <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-widest mb-1.5">Ausschlüsse (Eine pro Zeile)</label>
               <textarea 
                 rows={4}
                 value={offer.exclusions.join('\n')} 
                 onChange={(e) => setOffer({...offer, exclusions: e.target.value.split('\n').filter(s => s.trim())})}
                 className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-4 py-2 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 outline-none resize-none"
                 placeholder="Montage von Sockelleisten..."
               />
             </div>
          </div>

        </div>

        {/* Right Column (Meta & Actions) */}
        <div className="space-y-6">
           <div className="bg-surface rounded-2xl border border-outline-variant/30 p-6 shadow-sm sticky top-6">
             <h3 className="font-headline-sm mb-6">Metadaten</h3>
             
             <div className="space-y-6">
               <div>
                 <label className="block text-xs font-label-md text-on-surface-variant uppercase tracking-widest mb-2">Offerten-Status</label>
                 <select 
                   value={offer.status}
                   onChange={(e) => handleStatusChange(e.target.value as any)}
                   className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 outline-none transition"
                 >
                   <option value="Entwurf">Entwurf</option>
                   <option value="Gesendet">Gesendet</option>
                   <option value="Angenommen">Angenommen</option>
                   <option value="Abgelehnt">Abgelehnt</option>
                 </select>
               </div>
               
               <div className="border-t border-outline-variant/30 pt-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-4 h-4 text-on-surface-variant" />
                    <span>{offer.customer.firstName} {offer.customer.lastName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-on-surface-variant" />
                    <span>Erstellt: {new Date(offer.createdAt).toLocaleDateString('de-CH')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-on-surface-variant" />
                    <span>Gültig bis: {new Date(offer.validUntil).toLocaleDateString('de-CH')}</span>
                  </div>
               </div>
               
               <div className="border-t border-outline-variant/30 pt-4">
                 <Link href={`/admin/leads/${offer.leadId}`} className="text-secondary hover:underline text-sm font-medium">
                   Zugehörigen Lead öffnen
                 </Link>
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
