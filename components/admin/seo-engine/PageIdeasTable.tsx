'use client';

import React, { useState, useMemo } from 'react';
import SeoStatusBadge from './SeoStatusBadge';
import { Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function PageIdeasTable({ initialData }: { initialData: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const categories = Array.from(new Set(initialData.map(d => d.category).filter(Boolean)));
  const statuses = Array.from(new Set(initialData.map(d => d.status).filter(Boolean)));

  const filteredData = useMemo(() => {
    return initialData.filter(item => {
      const matchesSearch = item.primaryKeyword?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.slug?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [initialData, searchTerm, categoryFilter, statusFilter]);

  return (
    <div className="bg-surface rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden mt-6">
      {/* Filters */}
      <div className="p-4 border-b border-outline-variant/30 bg-surface-container-lowest flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <input 
            type="text" 
            placeholder="Suchen nach Keyword oder Slug..." 
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-outline-variant/50 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select 
            className="px-3 py-2 rounded-lg border border-outline-variant/50 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Alle Kategorien</option>
            {categories.map(c => <option key={c as string} value={c as string}>{c as string}</option>)}
          </select>
          <select 
            className="px-3 py-2 rounded-lg border border-outline-variant/50 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Alle Status</option>
            {statuses.map(s => <option key={s as string} value={s as string}>{s as string}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-container text-on-surface-variant font-label-md uppercase text-xs">
            <tr>
              <th className="px-6 py-3 font-medium">Keyword / Slug</th>
              <th className="px-6 py-3 font-medium">Kategorie</th>
              <th className="px-6 py-3 font-medium">Intent</th>
              <th className="px-6 py-3 font-medium">Priorität</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Aktion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {filteredData.length > 0 ? (
              filteredData.map((item, idx) => (
                <tr key={idx} className="hover:bg-surface-variant/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-on-surface">{item.primaryKeyword || '-'}</div>
                    <div className="text-xs text-on-surface-variant mt-1 font-mono">{item.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-surface-container rounded text-xs border border-outline-variant/30">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{item.intent || '-'}</td>
                  <td className="px-6 py-4"><SeoStatusBadge priority={item.priority} /></td>
                  <td className="px-6 py-4"><SeoStatusBadge status={item.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/seo-engine/briefs?slug=${encodeURIComponent(item.slug)}`}
                      className="text-primary hover:underline text-xs font-bold"
                    >
                      Briefing →
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">
                  Keine Seitenideen gefunden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-outline-variant/30 bg-surface-container-lowest text-xs text-on-surface-variant flex justify-between items-center">
        <span>Zeigt {filteredData.length} von {initialData.length} Ideen</span>
      </div>
    </div>
  );
}
