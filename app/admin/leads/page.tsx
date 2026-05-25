'use client';

import { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '@/lib/types/crm';
import { Loader2, Search, Filter, Eye, Bot, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Alle');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/admin/leads');
        if (res.ok) setLeads(await res.json());
      } catch (error) {
        console.error('Failed to load leads:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus as LeadStatus } : l));
    try {
       // Mock API call - in a real app this would save to the DB
       // await fetch(`/api/admin/leads/${leadId}`, { method: 'PATCH', body: JSON.stringify({ status: newStatus }) });
    } catch (e) {
       console.error("Failed to update status", e);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = (lead.customer.firstName + ' ' + lead.customer.lastName + ' ' + lead.customer.email)
      .toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Alle' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-sm text-display-sm mb-2">Leads</h1>
          <p className="text-on-surface-variant font-body-md">Übersicht aller Anfragen. KI-Agenten bewerten eingehende Leads automatisch.</p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)]">
        {/* Toolbar */}
        <div className="p-4 border-b border-outline-variant/30 flex flex-col sm:flex-row gap-4 items-center bg-surface-container-lowest">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Suchen (Name, E-Mail)..." 
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
              <option value="Neu">Neu</option>
              <option value="Qualifiziert">Qualifiziert</option>
              <option value="Besichtigung geplant">Besichtigung geplant</option>
              <option value="Offerte gesendet">Offerte gesendet</option>
              <option value="Nachfassen">Nachfassen</option>
              <option value="Gewonnen">Gewonnen</option>
              <option value="Verloren">Verloren</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant">Keine Leads gefunden.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-surface-container-lowest border-b border-outline-variant/30 z-10">
                <tr>
                  <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-medium">Kunde & Kontakt</th>
                  <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-medium">KI Diagnose & Score</th>
                  <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-medium">Status</th>
                  <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant font-medium text-right">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-surface-variant/50 transition-colors group items-start">
                    {/* Kunde */}
                    <td className="px-6 py-4 align-top">
                      <div className="font-medium text-sm text-on-surface">{lead.customer.firstName} {lead.customer.lastName}</div>
                      <div className="text-xs text-on-surface-variant mb-1">{lead.customer.email}</div>
                      <div className="text-[11px] text-on-surface-variant/70">{new Date(lead.timestamp).toLocaleDateString('de-CH')}</div>
                      
                      <div className="mt-3">
                         <span className={`inline-block text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full ${lead.priority === 'Hoch' ? 'bg-red-100 text-red-700' : lead.priority === 'Mittel' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                           Prio: {lead.priority}
                         </span>
                      </div>
                    </td>
                    
                    {/* KI Diagnose & Score */}
                    <td className="px-6 py-4 align-top max-w-md">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1 bg-surface-container border border-outline-variant/30 px-2 py-1 rounded-md">
                          <TrendingUp className="w-3 h-3 text-secondary" />
                          <span className="text-xs font-bold font-mono text-secondary">{lead.leadScore}/100</span>
                        </div>
                        <div className="text-xs font-medium text-on-surface">{lead.serviceInfo.service}</div>
                      </div>
                      
                      <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/30 text-xs text-on-surface-variant leading-relaxed flex gap-2">
                        <Bot className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          {lead.aiDiagnosis?.internalSummary || 'Keine KI-Diagnose vorhanden. Manueller Lead.'}
                        </div>
                      </div>
                    </td>
                    
                    {/* Status Select */}
                    <td className="px-6 py-4 align-top">
                      <select 
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg border outline-none appearance-none cursor-pointer transition-colors
                          ${lead.status === 'Neu' ? 'bg-blue-50 border-blue-200 text-blue-700' : 
                            lead.status === 'Gewonnen' ? 'bg-green-50 border-green-200 text-green-700' : 
                            lead.status === 'Verloren' ? 'bg-red-50 border-red-200 text-red-700' : 
                            'bg-surface-container border-outline-variant/50 text-on-surface'
                          }
                        `}
                      >
                        <option value="Neu">Neu</option>
                        <option value="Qualifiziert">Qualifiziert</option>
                        <option value="Besichtigung geplant">Besichtigung geplant</option>
                        <option value="Offerte gesendet">Offerte gesendet</option>
                        <option value="Nachfassen">Nachfassen</option>
                        <option value="Gewonnen">Gewonnen</option>
                        <option value="Verloren">Verloren</option>
                      </select>
                    </td>
                    
                    {/* Aktionen */}
                    <td className="px-6 py-4 text-right align-top">
                      <Link 
                        href={`/admin/leads/${lead.id}`}
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-white transition-colors text-on-surface-variant"
                        title="Details ansehen"
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
