'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import { WOOD_TYPES, CATEGORIES, CaseItem } from '@/data/cases';

export default function CaseStudiesAdmin() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<Partial<CaseItem> | null>(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const res = await fetch('/api/admin/cases');
      const data = await res.json();
      setCases(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (caseItem?: CaseItem) => {
    if (caseItem) {
      setEditingCase({ ...caseItem });
    } else {
      setEditingCase({
        title: '',
        woodType: 'Eiche',
        service: '',
        problem: '',
        description: '',
        category: 'Reparatur',
        imgBefore: '',
        imgAfter: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCase(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCase) return;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCase)
      });
      if (res.ok) {
        await fetchCases();
        handleCloseModal();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Fallstudie wirklich löschen?')) return;
    try {
      const res = await fetch(`/api/admin/cases/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchCases();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display-sm text-display-sm mb-2">Fallstudien CMS</h1>
          <p className="text-on-surface-variant font-body-md">Verwalte deine Vorher-/Nachher-Projekte für die Website.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-label-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Neue Fallstudie
        </button>
      </div>

      <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-variant text-on-surface-variant font-medium">
            <tr>
              <th className="px-6 py-4">Bilder</th>
              <th className="px-6 py-4">Titel & Beschreibung</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-on-surface-variant">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Lade Fallstudien...
                </td>
              </tr>
            ) : cases.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-on-surface-variant">
                  Keine Fallstudien gefunden.
                </td>
              </tr>
            ) : (
              cases.map((c) => (
                <tr key={c.id} className="hover:bg-surface-variant/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {c.imgBefore ? (
                        <img src={c.imgBefore} alt="Before" className="w-16 h-16 object-cover rounded-md border border-outline-variant" />
                      ) : (
                        <div className="w-16 h-16 bg-surface-container rounded-md flex items-center justify-center border border-outline-variant"><ImageIcon className="w-6 h-6 text-on-surface-variant/50" /></div>
                      )}
                      {c.imgAfter ? (
                        <img src={c.imgAfter} alt="After" className="w-16 h-16 object-cover rounded-md border border-outline-variant" />
                      ) : (
                        <div className="w-16 h-16 bg-surface-container rounded-md flex items-center justify-center border border-outline-variant"><ImageIcon className="w-6 h-6 text-on-surface-variant/50" /></div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-on-surface mb-1">{c.title}</p>
                    <p className="text-xs text-on-surface-variant line-clamp-2 max-w-md">{c.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-container text-on-surface-variant w-fit">
                        {c.category}
                      </span>
                      <span className="text-xs text-on-surface-variant">Holz: {c.woodType}</span>
                      <span className="text-xs text-on-surface-variant">Service: {c.service}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(c)}
                        className="p-2 text-on-surface-variant hover:text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
              <h2 className="font-headline-sm text-xl">{editingCase.id ? 'Fallstudie bearbeiten' : 'Neue Fallstudie'}</h2>
              <button onClick={handleCloseModal} className="text-on-surface-variant hover:text-on-surface">✕</button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Titel</label>
                  <input
                    required
                    value={editingCase.title || ''}
                    onChange={e => setEditingCase({...editingCase, title: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Kategorie</label>
                  <select
                    value={editingCase.category || ''}
                    onChange={e => setEditingCase({...editingCase, category: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    {CATEGORIES.filter(c => c !== 'Alle').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Holzart</label>
                  <input
                    value={editingCase.woodType || ''}
                    onChange={e => setEditingCase({...editingCase, woodType: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                    list="woodTypes"
                  />
                  <datalist id="woodTypes">
                    {WOOD_TYPES.filter(w => w !== 'Alle').map(w => <option key={w} value={w} />)}
                  </datalist>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Dienstleistung</label>
                  <input
                    value={editingCase.service || ''}
                    onChange={e => setEditingCase({...editingCase, service: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Problembeschreibung (Kurz)</label>
                  <input
                    value={editingCase.problem || ''}
                    onChange={e => setEditingCase({...editingCase, problem: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Detaillierte Lösung / Beschreibung</label>
                  <textarea
                    required
                    rows={3}
                    value={editingCase.description || ''}
                    onChange={e => setEditingCase({...editingCase, description: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Bild-URL: Vorher</label>
                  <input
                    type="url"
                    value={editingCase.imgBefore || ''}
                    onChange={e => setEditingCase({...editingCase, imgBefore: e.target.value})}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Bild-URL: Nachher</label>
                  <input
                    type="url"
                    value={editingCase.imgAfter || ''}
                    onChange={e => setEditingCase({...editingCase, imgAfter: e.target.value})}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-3 border-t border-outline-variant/30 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl font-label-md text-on-surface-variant hover:bg-surface-variant transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-primary text-on-primary px-5 py-2.5 rounded-xl font-label-md flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Speichern'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
