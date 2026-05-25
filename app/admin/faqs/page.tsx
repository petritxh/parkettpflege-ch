'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Loader2, Save, X, Search, Filter } from 'lucide-react';
import { FAQ } from '@/lib/types/crm';

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Edit & Add State
  const [isEditing, setIsEditing] = useState(false);
  const [currentFaq, setCurrentFaq] = useState<Partial<FAQ>>({});
  
  // Filter State
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/faqs');
      if (!res.ok) throw new Error('Fehler beim Laden der FAQs');
      const data = await res.json();
      setFaqs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!currentFaq.question || !currentFaq.answer) {
        alert('Frage und Antwort sind Pflichtfelder');
        return;
      }

      const method = currentFaq.id ? 'PUT' : 'POST';
      const url = currentFaq.id ? `/api/admin/faqs/${currentFaq.id}` : '/api/admin/faqs';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentFaq)
      });
      
      if (!res.ok) throw new Error('Fehler beim Speichern');
      
      await fetchFaqs();
      setIsEditing(false);
      setCurrentFaq({});
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('FAQ wirklich löschen?')) return;
    
    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Fehler beim Löschen');
      await fetchFaqs();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = filterCategory === 'all' || faq.category === filterCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.targetSlug.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-sm text-display-sm mb-2">FAQs & Antworten</h1>
          <p className="text-on-surface-variant font-body-md">Verwalten Sie hier alle FAQs für Ihre Landingpages zentral.</p>
        </div>
        <button
          onClick={() => {
            setCurrentFaq({ category: 'service', targetSlug: '' });
            setIsEditing(true);
          }}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-label-md hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Neue FAQ
        </button>
      </div>

      <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        
        {/* Filters */}
        <div className="p-4 border-b border-outline-variant/30 bg-surface-container-lowest flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Suchen..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-5 h-5 text-on-surface-variant" />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-surface border border-outline-variant rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">Alle Kategorien</option>
              <option value="service">Dienstleistungen</option>
              <option value="problem">Probleme</option>
              <option value="location">Standorte</option>
              <option value="general">Allgemein</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="p-8 text-error">{error}</div>
        ) : (
          <div className="divide-y divide-outline-variant/30">
            {filteredFaqs.length === 0 ? (
              <div className="p-12 text-center text-on-surface-variant">
                Keine FAQs gefunden.
              </div>
            ) : (
              filteredFaqs.map((faq) => (
                <div key={faq.id} className="p-6 hover:bg-surface-container-lowest transition-colors flex flex-col md:flex-row gap-6 items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium uppercase tracking-wider bg-secondary/10 text-secondary px-2 py-1 rounded-md">
                        {faq.category}
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        Seite: {faq.targetSlug || 'Global'}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-lg text-on-surface">{faq.question}</h3>
                    <p className="text-on-surface-variant">{faq.answer}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setCurrentFaq(faq);
                        setIsEditing(true);
                      }}
                      className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors text-on-surface-variant"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(faq.id)}
                      className="p-2 hover:bg-error/10 hover:text-error rounded-lg transition-colors text-on-surface-variant"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-sm text-2xl">{currentFaq.id ? 'FAQ bearbeiten' : 'Neue FAQ erstellen'}</h2>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-surface-variant rounded-full text-on-surface-variant">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Kategorie</label>
                  <select 
                    value={currentFaq.category || 'service'}
                    onChange={(e) => setCurrentFaq({...currentFaq, category: e.target.value as any})}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="service">Dienstleistung</option>
                    <option value="problem">Problem</option>
                    <option value="location">Standort</option>
                    <option value="general">Allgemein</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ziel-Seite (Slug)</label>
                  <input 
                    type="text"
                    value={currentFaq.targetSlug || ''}
                    onChange={(e) => setCurrentFaq({...currentFaq, targetSlug: e.target.value})}
                    placeholder="z.B. parkett-schleifen"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Frage</label>
                <input 
                  type="text"
                  value={currentFaq.question || ''}
                  onChange={(e) => setCurrentFaq({...currentFaq, question: e.target.value})}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Antwort</label>
                <textarea 
                  value={currentFaq.answer || ''}
                  onChange={(e) => setCurrentFaq({...currentFaq, answer: e.target.value})}
                  rows={4}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 rounded-xl font-medium hover:bg-surface-variant transition-colors"
              >
                Abbrechen
              </button>
              <button 
                onClick={handleSave}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
