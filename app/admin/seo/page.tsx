'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, Plus, CheckCircle2, AlertTriangle, XCircle, Edit } from 'lucide-react';
import Link from 'next/link';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';

export default function SEOPage() {
  const [city, setCity] = useState('');
  const [loadingCity, setLoadingCity] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  
  const [auditData, setAuditData] = useState<any[]>([]);
  const [loadingAudit, setLoadingAudit] = useState(true);

  useEffect(() => {
    fetchAuditData();
  }, []);

  const fetchAuditData = async () => {
    try {
      const res = await fetch('/api/admin/seo/audit');
      const data = await res.json();
      setAuditData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAudit(false);
    }
  };

  const generateCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoadingCity(true);
    setSuccessMessage('');
    setError('');

    try {
      const res = await fetch('/api/admin/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      setSuccessMessage(`Standort-Seite für "${data.location.name}" erfolgreich generiert und gespeichert!`);
      setCity('');
      fetchAuditData(); // Refresh table
    } catch (err: any) {
      setError(err.message || 'Ein Fehler ist aufgetreten');
    } finally {
      setLoadingCity(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 50) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const getIndicator = (val: boolean | number, thresholdGreen: number, thresholdYellow: number) => {
    if (typeof val === 'boolean') {
      return val ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />;
    }
    if (val >= thresholdGreen) return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (val >= thresholdYellow) return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  return (
    <SeoEngineShell
      title="SEO Content Manager & CMS"
      description="Überwache die SEO-Stärke aller Live-Seiten und bearbeite Inhalte direkt."
    >
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <div className="grid grid-cols-1 gap-6">
        {/* City Generator */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm p-6">
          <h2 className="font-headline-sm text-lg mb-2">Neuen Standort generieren (KI)</h2>
          <form onSubmit={generateCity} className="flex flex-col sm:flex-row gap-4 items-start">
            <input 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="z.B. Aarau, Chur, Thun..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container focus:ring-2 focus:ring-secondary focus:outline-none transition-all"
              required
            />
            <button 
              type="submit" 
              disabled={loadingCity}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-label-md flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50 transition-all whitespace-nowrap"
            >
              {loadingCity ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {loadingCity ? 'Generiere...' : 'Standort erstellen'}
            </button>
          </form>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {successMessage && <p className="mt-2 text-sm text-green-600">{successMessage}</p>}
        </div>

        {/* SEO Audit Table */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
            <h2 className="font-headline-sm text-xl">SEO Audit Übersicht</h2>
            <button onClick={fetchAuditData} className="text-sm font-medium text-secondary hover:underline flex items-center gap-2">
              <Loader2 className={`w-4 h-4 ${loadingAudit ? 'animate-spin' : ''}`} /> Aktualisieren
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-variant text-on-surface-variant font-medium">
                <tr>
                  <th className="px-6 py-4">URL / Titel</th>
                  <th className="px-6 py-4">Typ</th>
                  <th className="px-6 py-4">Score</th>
                  <th className="px-6 py-4">Title (40-60)</th>
                  <th className="px-6 py-4">Desc (130-160)</th>
                  <th className="px-6 py-4">Wörter (&gt;500)</th>
                  <th className="px-6 py-4">H2/H3</th>
                  <th className="px-6 py-4">FAQs</th>
                  <th className="px-6 py-4 text-right">Aktion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {loadingAudit ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-on-surface-variant">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Lade SEO Daten...
                    </td>
                  </tr>
                ) : (
                  auditData.map((item) => (
                    <tr key={`${item.category}-${item.slug}`} className="hover:bg-surface-variant/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-on-surface mb-0.5">{item.title}</p>
                        <a href={item.url} target="_blank" className="text-xs text-on-surface-variant hover:underline">{item.url}</a>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-surface-container text-on-surface-variant">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${getScoreColor(item.score)}`}>
                          {item.score}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getIndicator(item.metaTitleLength, 40, 1)}
                          <span className="text-xs text-on-surface-variant">{item.metaTitleLength}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getIndicator(item.metaDescLength, 130, 1)}
                          <span className="text-xs text-on-surface-variant">{item.metaDescLength}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getIndicator(item.wordCount, 500, 250)}
                          <span className="text-xs text-on-surface-variant">{item.wordCount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getIndicator(item.hasHeadings, 1, 1)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getIndicator(item.faqCount, 1, 1)}
                          <span className="text-xs text-on-surface-variant">{item.faqCount}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          href={`/admin/seo/edit/${item.category}/${item.slug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-lg text-sm font-medium transition-colors"
                        >
                          <Edit className="w-4 h-4" /> Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </SeoEngineShell>
);
}
