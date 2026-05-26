'use client';

import { useState, useEffect } from 'react';
import { Package, Plus, Edit2, Trash2, Save, X, Loader2, ExternalLink } from 'lucide-react';
import { Product, ProductCategory } from '@/data/products';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const saveAllProducts = async (newProducts: Product[]) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProducts),
      });
      if (res.ok) {
        setProducts(newProducts);
        setEditingId(null);
        setEditForm(null);
      }
    } catch (error) {
      alert('Fehler beim Speichern.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleSaveEdit = () => {
    if (!editForm) return;
    const newProducts = products.map(p => p.id === editForm.id ? editForm : p);
    saveAllProducts(newProducts);
  };

  const handleDelete = (id: string) => {
    if (confirm('Möchten Sie dieses Produkt wirklich löschen?')) {
      saveAllProducts(products.filter(p => p.id !== id));
    }
  };

  const handleAdd = () => {
    const newProduct: Product = {
      id: `woca-neu-${Date.now()}`,
      name: 'Neues WOCA Produkt',
      category: 'Reinigung',
      shortDescription: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1581850518616-bcb8077a2336?w=600&h=600&fit=crop',
      price: 0,
      isAffiliate: false,
      tags: [],
      suitableFor: { woodTypes: ['alle'], damageTypes: ['alle'] }
    };
    saveAllProducts([...products, newProduct]);
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display-sm text-display-sm">Shop Produkte</h1>
          <p className="text-on-surface-variant mt-1">Verwalten Sie Ihr exklusives WOCA-Sortiment.</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 font-label-md text-sm hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Produkt hinzufügen
        </button>
      </div>

      <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-surface-variant/30">
            <tr>
              <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Produkt</th>
              <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Kategorie</th>
              <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Preis (CHF)</th>
              <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant">Typ</th>
              <th className="px-6 py-4 font-label-md text-xs uppercase tracking-widest text-on-surface-variant text-right">Aktion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-surface-variant/20 transition-colors">
                {editingId === product.id && editForm ? (
                  <td colSpan={5} className="p-6 bg-surface-container-lowest">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-1">Name</label>
                          <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full border border-outline-variant/50 rounded-lg px-3 py-2 text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-1">Kurzbeschreibung</label>
                          <input type="text" value={editForm.shortDescription} onChange={e => setEditForm({...editForm, shortDescription: e.target.value})} className="w-full border border-outline-variant/50 rounded-lg px-3 py-2 text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-1">Preis (CHF)</label>
                            <input type="number" step="0.05" value={editForm.price} onChange={e => setEditForm({...editForm, price: parseFloat(e.target.value)})} className="w-full border border-outline-variant/50 rounded-lg px-3 py-2 text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-1">Kategorie</label>
                            <select value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value as ProductCategory})} className="w-full border border-outline-variant/50 rounded-lg px-3 py-2 text-sm">
                              <option value="Reinigung">Reinigung</option>
                              <option value="Pflege">Pflege</option>
                              <option value="Reparatur">Reparatur</option>
                              <option value="Maschinen">Maschinen</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-1">Bild URL</label>
                          <input type="text" value={editForm.imageUrl} onChange={e => setEditForm({...editForm, imageUrl: e.target.value})} className="w-full border border-outline-variant/50 rounded-lg px-3 py-2 text-sm" />
                        </div>
                        <div className="flex items-center gap-2 mt-6">
                          <input type="checkbox" id="isAffiliate" checked={editForm.isAffiliate} onChange={e => setEditForm({...editForm, isAffiliate: e.target.checked})} className="rounded text-primary" />
                          <label htmlFor="isAffiliate" className="text-sm">Ist ein Affiliate-Produkt (Weiterleitung)</label>
                        </div>
                        {editForm.isAffiliate && (
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-on-surface-variant mb-1">Affiliate Link</label>
                            <input type="text" value={editForm.affiliateLink || ''} onChange={e => setEditForm({...editForm, affiliateLink: e.target.value})} className="w-full border border-outline-variant/50 rounded-lg px-3 py-2 text-sm" />
                          </div>
                        )}
                        <div className="flex justify-end gap-2 pt-4">
                          <button onClick={() => setEditingId(null)} className="px-4 py-2 border border-outline-variant rounded-lg text-sm hover:bg-surface-variant">Abbrechen</button>
                          <button onClick={handleSaveEdit} disabled={saving} className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 flex items-center gap-2">
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Speichern
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                ) : (
                  <>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-on-surface">{product.name}</p>
                          <p className="text-xs text-on-surface-variant">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{product.category}</td>
                    <td className="px-6 py-4 font-medium">{product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {product.isAffiliate ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">
                          <ExternalLink className="w-3 h-3" /> Affiliate
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                          Lokal
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => handleEdit(product)} className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
