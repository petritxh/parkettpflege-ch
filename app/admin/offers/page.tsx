'use client';

import { useState, useEffect } from 'react';
import { Offer } from '@/lib/types/crm';
import { Loader2, Search, Filter, Eye } from 'lucide-react';
import Link from 'next/link';

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Alle');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/admin/offers');
        if (res.ok) setOffers(await res.json());
      } catch (error) {
        console.error('Failed to load offers:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = (offer.customer.firstName + ' ' + offer.customer.lastName + ' ' + offer.title)
      .toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Alle' || offer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-sm text-display-sm mb-2">Offerten</h1>
          <p className="text-on-surface-variant font-body-md">Übersicht aller erstellten Offerten und Entwürfe.</p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)]">
        {/* Toolbar */}
        <div className="p-4 border-b border-outline-variant/30 flex flex-col sm:flex-row gap-4 items-center bg-surface-container-lowest">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Suchen (Name, Titel)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface border border-outline-variant/50 rounded-xl pl-9 pr-4 py-2 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-on-surface-variant shrink-0" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto bg-surface border border-outline-variant/50 rounded-xl px-4 py-2 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition appearance-none"
            >
              <option value="Alle">Alle Status</option>
              <option value="Entwurf">Entwurf</option>
              <option value="Gesendet">Gesendet</option>
              <option value="Angenommen">Angenommen</option>
              <option value="Abgelehnt">Abgelehnt</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredOffers.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant">Keine Offerten gefunden.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-surface-container-lowest border-b border-outline-variant/30 z-10">
                <tr>
                  <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-medium">Datum</th>
                  <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-medium">Kunde</th>
                  <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-medium">Titel</th>
                  <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-medium">Betrag (CHF)</th>
                  <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-medium">Status</th>
                  <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-medium text-right">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredOffers.map(offer => (
                  <tr key={offer.id} className="hover:bg-surface-variant/50 transition-colors group">
                    <td className="px-6 py-4 text-sm text-on-surface-variant">
                      {new Date(offer.createdAt).toLocaleDateString('de-CH')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-sm text-on-surface">{offer.customer.firstName} {offer.customer.lastName}</div>
                      <div className="text-xs text-on-surface-variant">{offer.customer.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-on-surface">{offer.title}</div>
                      <div className="text-xs text-on-surface-variant">{offer.isFixedPrice ? 'Festpreis' : 'Schätzung'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-sm">{offer.totalAmount.toLocaleString('de-CH')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full whitespace-nowrap ${offer.status === 'Entwurf' ? 'bg-gray-100 text-gray-700' : offer.status === 'Gesendet' ? 'bg-blue-100 text-blue-700' : offer.status === 'Angenommen' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {offer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/admin/offers/${offer.id}`}
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-white transition-colors text-on-surface-variant"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
