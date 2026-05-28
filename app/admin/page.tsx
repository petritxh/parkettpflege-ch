'use client';

import { useState, useEffect } from 'react';
import { Lead, Offer } from '@/lib/types/crm';
import { Users, FileText, AlertCircle, CheckCircle2, TrendingUp, Loader2, Database, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  // Sync state
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [leadsRes, offersRes] = await Promise.all([
          fetch('/api/admin/leads'),
          fetch('/api/admin/offers')
        ]);
        
        if (leadsRes.ok) setLeads(await leadsRes.json());
        if (offersRes.ok) setOffers(await offersRes.json());
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSyncToFirestore = async () => {
    setSyncing(true);
    setSyncStatus(null);
    try {
      const res = await fetch('/api/admin/seo/sync', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSyncStatus('Erfolgreich! Alle neuen Services, Problemfälle und Standorte wurden in Ihre Firestore-Datenbank geladen.');
      } else {
        setSyncStatus(`Fehler: ${data.error || 'Fehler beim Abgleich'}`);
      }
    } catch (e) {
      setSyncStatus('Verbindungsfehler zur API.');
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const newLeads = leads.filter(l => l.status === 'Neu').length;
  const highPriority = leads.filter(l => l.priority === 'Hoch' && l.status !== 'Gewonnen' && l.status !== 'Verloren').length;
  const wonLeads = leads.filter(l => l.status === 'Gewonnen').length;
  
  const openOffers = offers.filter(o => o.status === 'Entwurf' || o.status === 'Gesendet');
  const pipelineValue = openOffers.reduce((sum, offer) => sum + (offer.totalAmount || 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display-sm text-display-sm mb-2">Dashboard</h1>
          <p className="text-on-surface-variant font-body-md">Willkommen im Parkett-Pflege.ch CRM. Hier ist Ihre aktuelle Übersicht.</p>
        </div>

        {/* Database Sync Panel */}
        <div className="bg-surface-bright border border-secondary/35 p-5 rounded-2xl max-w-md w-full shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-2 text-secondary font-headline-sm text-sm">
            <Database className="w-5 h-5" />
            <span>Produktions-Datenbank</span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Wenn Sie neue Seiten/Routen hochgeladen haben, synchronisieren Sie hier die lokalen Daten in Ihre Live-Firestore-Datenbank.
          </p>
          <button
            onClick={handleSyncToFirestore}
            disabled={syncing}
            className="w-full inline-flex justify-center items-center gap-2 bg-secondary text-white py-2 px-3 rounded-xl font-label-md text-[11px] uppercase tracking-widest font-bold hover:bg-secondary/95 active:scale-95 transition-all disabled:opacity-50"
          >
            {syncing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Synchronisiere...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>In Live-Datenbank laden</span>
              </>
            )}
          </button>
          {syncStatus && (
            <p className={`text-xs font-semibold mt-1 p-2 rounded-lg ${syncStatus.startsWith('Fehler') ? 'bg-red-50 text-red-700 border border-red-150' : 'bg-green-50 text-green-700 border border-green-150'}`}>
              {syncStatus}
            </p>
          )}
        </div>
      </div>


      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        
        <div className="bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <span className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs">Neue Leads</span>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="font-headline-lg text-headline-lg">{newLeads}</div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <span className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs">Hohe Priorität</span>
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="font-headline-lg text-headline-lg">{highPriority}</div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <span className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs">Offene Offerten</span>
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="font-headline-lg text-headline-lg">{openOffers.length}</div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <span className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs">Gewonnene Leads</span>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="font-headline-lg text-headline-lg">{wonLeads}</div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-4 sm:col-span-2 lg:col-span-1 xl:col-span-1">
          <div className="flex justify-between items-start">
            <span className="font-label-md text-on-surface-variant uppercase tracking-widest text-xs">Pipeline Wert</span>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="font-headline-lg text-[24px]">CHF {pipelineValue.toLocaleString('de-CH')}</div>
        </div>
      </div>
      
      {/* Recent Activity / Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
           <h3 className="font-headline-sm mb-6">Neueste Anfragen</h3>
           {leads.length === 0 ? (
             <p className="text-on-surface-variant text-sm">Noch keine Leads vorhanden.</p>
           ) : (
             <div className="space-y-4">
               {leads.slice(0, 5).map(lead => (
                 <div key={lead.id} className="flex justify-between items-center p-4 border border-outline-variant/20 rounded-xl hover:bg-surface-variant transition-colors">
                   <div>
                     <p className="font-medium text-sm">{lead.customer.firstName} {lead.customer.lastName}</p>
                     <p className="text-xs text-on-surface-variant">{lead.serviceInfo.service}</p>
                   </div>
                   <div className="flex items-center gap-3">
                     <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full ${lead.priority === 'Hoch' ? 'bg-red-100 text-red-700' : lead.priority === 'Mittel' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                       {lead.priority}
                     </span>
                     <span className="text-[10px] bg-surface-container text-on-surface-variant px-2 py-1 rounded-full">{lead.status}</span>
                   </div>
                 </div>
               ))}
             </div>
           )}
         </div>

         <div className="bg-surface p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
           <h3 className="font-headline-sm mb-6">Aktuelle Offerten</h3>
           {offers.length === 0 ? (
             <p className="text-on-surface-variant text-sm">Noch keine Offerten vorhanden.</p>
           ) : (
             <div className="space-y-4">
               {offers.slice(0, 5).map(offer => (
                 <div key={offer.id} className="flex justify-between items-center p-4 border border-outline-variant/20 rounded-xl hover:bg-surface-variant transition-colors">
                   <div>
                     <p className="font-medium text-sm">{offer.customer.firstName} {offer.customer.lastName}</p>
                     <p className="text-xs text-on-surface-variant">CHF {offer.totalAmount.toLocaleString('de-CH')}</p>
                   </div>
                   <div>
                     <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full ${offer.status === 'Entwurf' ? 'bg-gray-100 text-gray-700' : offer.status === 'Gesendet' ? 'bg-blue-100 text-blue-700' : offer.status === 'Angenommen' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                       {offer.status}
                     </span>
                   </div>
                 </div>
               ))}
             </div>
           )}
         </div>
      </div>
    </div>
  );
}
