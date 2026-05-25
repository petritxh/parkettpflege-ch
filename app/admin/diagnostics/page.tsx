'use client';

import { useState, useEffect } from 'react';
import { Lead } from '@/lib/types/crm';
import { BrainCircuit, Loader2, BarChart3, Target, Sparkles, ArrowRight, Upload, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function DiagnosticsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Manual Scan state
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch('/api/admin/leads');
        if (res.ok) {
          const data = await res.json();
          // Filter only leads that have AI diagnosis
          setLeads(data.filter((l: Lead) => l.aiDiagnosis));
        }
      } catch (error) {
        console.error('Failed to load leads:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  // Compute Analytics
  const totalScans = leads.length;
  const avgScore = totalScans > 0 
    ? Math.round(leads.reduce((acc, lead) => acc + (lead.aiDiagnosis?.leadScore || 0), 0) / totalScans)
    : 0;
  
  // Calculate top damage
  const damages = leads.map(l => l.aiDiagnosis?.suspectedDamage).filter(Boolean);
  const topDamage = damages.length > 0 
    ? damages.sort((a,b) => damages.filter(v => v===a).length - damages.filter(v => v===b).length).pop()
    : '-';

  const handleManualScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setScanResult(null);
    setScanError(null);

    // Convert file to base64 for API
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Image = event.target?.result as string;

      try {
        const res = await fetch('/api/admin/diagnostics/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image })
        });
        
        const data = await res.json();
        if (res.ok && data.diagnosis) {
          setScanResult({ ...data.diagnosis, imageUrl: base64Image });
        } else {
          setScanError(data.error || 'Ein Fehler ist aufgetreten.');
        }
      } catch (error) {
        setScanError('Fehler bei der Verbindung zur KI-Schnittstelle.');
      } finally {
        setIsScanning(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-sm text-display-sm mb-2">KI-Diagnosen</h1>
          <p className="text-on-surface-variant font-body-md">Übersicht aller vom AI-Advisor durchgeführten Parkett-Analysen.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-6 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-label-md text-on-surface-variant uppercase tracking-widest">Total Analysen</p>
                <p className="text-3xl font-display-sm">{totalScans}</p>
              </div>
            </div>

            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-6 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-label-md text-on-surface-variant uppercase tracking-widest">Ø Lead Score</p>
                <p className="text-3xl font-display-sm">{avgScore}<span className="text-lg text-on-surface-variant">/100</span></p>
              </div>
            </div>

            <div className="bg-surface rounded-2xl border border-outline-variant/30 p-6 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-label-md text-on-surface-variant uppercase tracking-widest">Top Schaden</p>
                <p className="text-xl font-headline-sm truncate max-w-[150px]">{topDamage}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Left Column: Diagnostics Grid */}
            <div className="xl:col-span-2 space-y-6">
              <h2 className="font-headline-sm text-xl mb-4">Kürzliche Scans</h2>
              
              {leads.length === 0 ? (
                <div className="bg-surface rounded-2xl border border-outline-variant/30 p-12 text-center text-on-surface-variant">
                  <BrainCircuit className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>Noch keine KI-Diagnosen vorhanden.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {leads.map(lead => (
                    <div key={lead.id} className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm flex flex-col group hover:border-secondary/50 transition-colors">
                      {lead.aiDiagnosis?.imageUrl && (
                        <div className="h-48 overflow-hidden relative">
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={lead.aiDiagnosis.imageUrl} alt="Schaden" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-2 right-2 bg-secondary/90 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                            <Sparkles className="w-3 h-3" /> {lead.aiDiagnosis.leadScore}/100 Score
                          </div>
                          <div className="absolute bottom-2 left-2 bg-surface/90 text-on-surface text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-sm">
                            {lead.customer.firstName} {lead.customer.lastName}
                          </div>
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-headline-sm text-lg mb-1 truncate">{lead.aiDiagnosis?.suspectedDamage || 'Unbekannter Schaden'}</h3>
                        <p className="text-sm text-on-surface-variant mb-4">{lead.aiDiagnosis?.recommendedService || 'Keine Empfehlung'}</p>
                        
                        <div className="flex gap-2 mb-4">
                          <span className={`text-[10px] px-2 py-1 rounded-md font-medium ${lead.aiDiagnosis?.severity?.includes('Hoch') ? 'bg-red-100 text-red-700' : 'bg-surface-variant text-on-surface-variant'}`}>
                            {lead.aiDiagnosis?.severity}
                          </span>
                          <span className={`text-[10px] px-2 py-1 rounded-md font-medium ${lead.aiDiagnosis?.diyPossible ? 'bg-green-100 text-green-700' : 'bg-surface-variant text-on-surface-variant'}`}>
                            {lead.aiDiagnosis?.diyPossible ? 'DIY Möglich' : 'Profi nötig'}
                          </span>
                        </div>

                        <div className="mt-auto pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                          <span className="font-label-md text-xs">CHF {lead.aiDiagnosis?.priceRange?.min} - {lead.aiDiagnosis?.priceRange?.max}</span>
                          <Link href={`/admin/leads/${lead.id}`} className="text-secondary hover:underline flex items-center gap-1 text-sm font-medium">
                            Akte öffnen <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Manual Scanner */}
            <div className="space-y-6">
              <div className="bg-surface-bright rounded-2xl border border-secondary/30 p-6 shadow-sm relative overflow-hidden sticky top-6">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="w-24 h-24 text-secondary" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="font-headline-sm flex items-center gap-2 mb-2 text-secondary"><Sparkles className="w-5 h-5"/> Manueller Scanner</h3>
                  <p className="text-sm text-on-surface-variant mb-6">Lade ein Foto von einem Kundenschaden hoch (z.B. aus WhatsApp), um sofort eine KI-Diagnose zu erhalten.</p>
                  
                  <label className="border-2 border-dashed border-secondary/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-secondary/5 transition-colors group">
                    <input type="file" accept="image/*" className="hidden" onChange={handleManualScan} disabled={isScanning} />
                    {isScanning ? (
                      <>
                        <Loader2 className="w-8 h-8 text-secondary animate-spin mb-3" />
                        <span className="font-headline-sm text-sm text-secondary">KI analysiert Foto...</span>
                        <span className="text-xs text-on-surface-variant mt-1">Das dauert ca. 5-10 Sekunden</span>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6" />
                        </div>
                        <span className="font-headline-sm text-sm">Foto hochladen</span>
                        <span className="text-xs text-on-surface-variant mt-1">JPG, PNG</span>
                      </>
                    )}
                  </label>

                  {scanError && (
                    <div className="mt-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-sm flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="font-bold">Analyse fehlgeschlagen</p>
                        <p>{scanError}</p>
                      </div>
                    </div>
                  )}

                  {scanResult && !isScanning && (
                    <div className="mt-6 animate-in fade-in slide-in-from-bottom-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-headline-sm text-sm">Ergebnis</h4>
                        <span className="bg-secondary text-white text-[10px] px-2 py-1 rounded-full font-bold">Score {scanResult.leadScore}/100</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-white/50 p-3 rounded-lg border border-outline-variant/20">
                          <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Schaden</span>
                          <span className="font-medium text-sm">{scanResult.suspectedDamage}</span>
                        </div>
                        <div className="bg-white/50 p-3 rounded-lg border border-outline-variant/20">
                          <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Empfehlung</span>
                          <span className="font-medium text-sm text-primary">{scanResult.recommendedService}</span>
                        </div>
                        <div className="bg-white/50 p-3 rounded-lg border border-outline-variant/20">
                          <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Zusammenfassung</span>
                          <span className="text-sm">{scanResult.internalSummary}</span>
                        </div>
                      </div>

                      <button className="w-full mt-6 bg-secondary text-white py-3 px-4 rounded-xl font-label-md text-xs uppercase tracking-widest font-bold shadow-md hover:bg-secondary/90 transition-all">
                        Als Lead speichern
                      </button>
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
