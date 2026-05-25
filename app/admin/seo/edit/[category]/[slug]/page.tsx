'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, Save, ArrowLeft, Wand2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SEOEditorPage() {
  const { category, slug } = useParams() as { category: string; slug: string };
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<any>({
    metaTitle: '',
    metaDescription: '',
    h1: '',
    intro: '',
    contentMarkdown: '',
    name: '' // for locations
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/admin/seo/item?category=${category}&slug=${slug}`);
        if (!res.ok) throw new Error('Item not found');
        const data = await res.json();
        
        setFormData({
          metaTitle: data.metaTitle || '',
          metaDescription: data.metaDescription || '',
          h1: data.h1 || data.name || '',
          intro: data.intro || '',
          contentMarkdown: data.contentMarkdown || data.solutionText || '',
          name: data.name || '',
          focusKeyword: data.focusKeyword || ''
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess('');
    setError('');

    try {
      // Map back to proper fields based on category
      const updates: any = {
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        intro: formData.intro,
        focusKeyword: formData.focusKeyword
      };

      if (category === 'location') {
        updates.name = formData.h1;
        updates.h1 = formData.h1;
        updates.contentMarkdown = formData.contentMarkdown;
      } else if (category === 'problem') {
        updates.h1 = formData.h1;
        updates.solutionText = formData.contentMarkdown; // problems map this
      } else {
        updates.h1 = formData.h1;
        updates.contentMarkdown = formData.contentMarkdown;
      }

      const res = await fetch('/api/admin/seo/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, slug, updates })
      });

      if (!res.ok) throw new Error('Fehler beim Speichern');
      setSuccess('Änderungen erfolgreich gespeichert!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAIExpand = async () => {
    setExpanding(true);
    setSuccess('');
    setError('');

    try {
      const res = await fetch('/api/admin/seo/expand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: formData.h1, 
          currentContent: formData.contentMarkdown 
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setFormData((prev: any) => ({ ...prev, contentMarkdown: data.expandedContent }));
      setSuccess('KI hat den Text erfolgreich erweitert! Bitte prüfen und speichern.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setExpanding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-20">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/seo" className="p-2 bg-surface hover:bg-surface-variant rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-on-surface-variant" />
          </Link>
          <div>
            <h1 className="font-display-sm text-display-sm">Seite bearbeiten</h1>
            <p className="text-on-surface-variant font-body-sm">{category} / {slug}</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-label-md flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50 transition-all shadow-md hover:shadow-lg"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Speichern
        </button>
      </div>

      {error && (
        <div className="p-4 bg-error/10 text-error rounded-xl font-body-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 text-green-800 rounded-xl font-body-sm flex items-start gap-3 border border-green-200">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <p>{success}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Meta Tags & Intro */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm p-6 space-y-5">
            <h2 className="font-headline-sm text-lg border-b border-outline-variant/30 pb-3">Meta Tags & SEO</h2>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-on-surface-variant">Fokus-Keyword</label>
              </div>
              <input 
                name="focusKeyword"
                value={formData.focusKeyword}
                onChange={handleChange}
                placeholder="z.B. Parkett ölen"
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container focus:ring-2 focus:ring-secondary focus:outline-none text-sm font-medium text-primary"
              />
              <p className="text-[11px] text-on-surface-variant mt-1">Wird für die automatische interne Verlinkung verwendet.</p>
            </div>

            <div className="pt-2 border-t border-outline-variant/30">
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-on-surface-variant">Meta Title</label>
                <span className={`text-xs ${formData.metaTitle.length > 65 ? 'text-amber-600' : 'text-on-surface-variant'}`}>
                  {formData.metaTitle.length} / 60
                </span>
              </div>
              <input 
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container focus:ring-2 focus:ring-secondary focus:outline-none text-sm"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-on-surface-variant">Meta Description</label>
                <span className={`text-xs ${formData.metaDescription.length > 160 ? 'text-amber-600' : 'text-on-surface-variant'}`}>
                  {formData.metaDescription.length} / 160
                </span>
              </div>
              <textarea 
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container focus:ring-2 focus:ring-secondary focus:outline-none text-sm resize-none"
              />
            </div>

            <div className="pt-2 border-t border-outline-variant/30">
              <label className="block text-sm font-medium text-on-surface-variant mb-1">H1 Überschrift</label>
              <input 
                name="h1"
                value={formData.h1}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container focus:ring-2 focus:ring-secondary focus:outline-none text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Intro (Kurzbeschreibung)</label>
              <textarea 
                name="intro"
                value={formData.intro}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container focus:ring-2 focus:ring-secondary focus:outline-none text-sm resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Markdown Editor */}
        <div className="lg:col-span-2">
          <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm p-6 flex flex-col h-[800px]">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-outline-variant/30">
              <h2 className="font-headline-sm text-lg">Inhalt (Markdown Editor)</h2>
              <button 
                onClick={handleAIExpand}
                disabled={expanding}
                className="bg-secondary/10 text-secondary px-4 py-2 rounded-xl font-label-sm flex items-center justify-center gap-2 hover:bg-secondary/20 disabled:opacity-50 transition-colors"
              >
                {expanding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                {expanding ? 'KI schreibt...' : 'Mit KI erweitern'}
              </button>
            </div>
            
            <p className="text-xs text-on-surface-variant mb-2">
              Nutze Markdown (## für H2, ### für H3, **fett**, - Listen). Das Frontend generiert daraus automatisch Inhaltsverzeichnisse.
            </p>
            
            <textarea
              name="contentMarkdown"
              value={formData.contentMarkdown}
              onChange={handleChange}
              className="flex-1 w-full p-4 rounded-xl border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-secondary focus:outline-none font-mono text-sm leading-relaxed resize-none shadow-inner"
              placeholder="Füge hier deinen Markdown-Text ein..."
            />
          </div>
        </div>

      </div>
    </div>
  );
}
