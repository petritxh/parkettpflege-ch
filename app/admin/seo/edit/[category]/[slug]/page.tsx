'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, Save, ArrowLeft, Wand2, CheckCircle2, Upload, Sparkles, Image, Plus } from 'lucide-react';
import Link from 'next/link';

export default function SEOEditorPage() {
  const { category, slug } = useParams() as { category: string; slug: string };
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const [imageGenerating, setImageGenerating] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [writingSection, setWritingSection] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const [imagePrompt, setImagePrompt] = useState('');
  const [sectionPrompt, setSectionPrompt] = useState('');

  const [formData, setFormData] = useState<any>({
    metaTitle: '',
    metaDescription: '',
    h1: '',
    intro: '',
    contentMarkdown: '',
    name: '', // for locations
    focusKeyword: '',
    imageUrl: ''
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
          focusKeyword: data.focusKeyword || '',
          imageUrl: data.imageUrl || ''
        });

        if (data.focusKeyword) {
          setImagePrompt(`schöner moderner parkettboden, ${data.focusKeyword}`);
        }
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
        focusKeyword: formData.focusKeyword,
        imageUrl: formData.imageUrl
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setImageUploading(true);
    setSuccess('');
    setError('');
    
    try {
      const file = e.target.files[0];
      const uploadData = new FormData();
      uploadData.append('file', file);
      
      const res = await fetch('/api/admin/seo/upload', {
        method: 'POST',
        body: uploadData
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fehler beim Upload');
      
      setFormData((prev: any) => ({ ...prev, imageUrl: data.imageUrl }));
      setSuccess('Bild erfolgreich hochgeladen!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setImageUploading(false);
    }
  };

  const handleImageGenerate = async () => {
    const promptText = imagePrompt || formData.focusKeyword || formData.h1;
    if (!promptText) {
      setError('Bitte gib ein Keyword oder einen Bild-Prompt ein.');
      return;
    }
    
    setImageGenerating(true);
    setSuccess('');
    setError('');
    
    try {
      const res = await fetch('/api/admin/seo/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fehler bei der Bildgenerierung');
      
      setFormData((prev: any) => ({ ...prev, imageUrl: data.imageUrl }));
      setSuccess('Neues Beitragsbild erfolgreich mit KI generiert und lokal auf Ihrem Server gespeichert!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setImageGenerating(false);
    }
  };

  const handleWriteSection = async () => {
    if (!sectionPrompt) {
      setError('Bitte gib ein Thema für den neuen Abschnitt ein.');
      return;
    }
    
    setWritingSection(true);
    setSuccess('');
    setError('');
    
    try {
      const res = await fetch('/api/admin/seo/write-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: formData.h1, 
          sectionPrompt: sectionPrompt 
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fehler beim Schreiben des Abschnitts');
      
      // Append the new section content to the markdown body
      setFormData((prev: any) => ({ 
        ...prev, 
        contentMarkdown: prev.contentMarkdown + '\n\n' + data.sectionContent 
      }));
      setSectionPrompt('');
      setSuccess('Neuer Abschnitt wurde erfolgreich mit KI geschrieben und unten in den Editor eingefügt!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setWritingSection(false);
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/seo" className="p-2 bg-surface hover:bg-surface-variant rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-on-surface-variant" />
          </Link>
          <div>
            <h1 className="font-display-sm text-display-sm">SEO-Seite bearbeiten</h1>
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
        
        {/* Left Column: Meta Tags, Keyword & Images */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* SEO & Meta Tags Card */}
          <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm p-6 space-y-5">
            <h2 className="font-headline-sm text-lg border-b border-outline-variant/30 pb-3 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-secondary" />
              Meta-Daten & Keywords
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-1">Fokus-Keyword</label>
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

          {/* Photo Management Card */}
          <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm p-6 space-y-5">
            <h2 className="font-headline-sm text-lg border-b border-outline-variant/30 pb-3 flex items-center gap-2">
              <Image className="w-4.5 h-4.5 text-primary" />
              Beitrags-Foto (Hero-Bild)
            </h2>

            {/* Current Image Preview */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Aktuelles Foto</label>
              {formData.imageUrl ? (
                <div className="relative group rounded-xl overflow-hidden border border-outline-variant/50 shadow-inner h-44 bg-surface-container flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={formData.imageUrl} 
                    alt={formData.h1 || 'Parkett'} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                    {formData.imageUrl.startsWith('/uploads/') ? 'Lokal gespeichert' : 'Externer Link'}
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-outline-variant bg-surface-container flex flex-col items-center justify-center py-10 rounded-xl text-on-surface-variant text-sm font-medium gap-2">
                  <Image className="w-8 h-8 text-on-surface-variant/40" />
                  Kein Bild vorhanden
                </div>
              )}
              
              <input 
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Bild-URL (extern oder lokal)"
                className="w-full px-3 py-2 mt-2 rounded-lg border border-outline-variant bg-surface-container focus:ring-2 focus:ring-secondary focus:outline-none text-xs"
              />
            </div>

            {/* Upload File Panel */}
            <div className="pt-2 border-t border-outline-variant/30 space-y-2">
              <label className="block text-sm font-medium text-on-surface-variant">Eigenes Foto hochladen</label>
              <div className="relative border-2 border-dashed border-outline-variant hover:border-primary/50 transition-colors rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-surface-containerLowest/50">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  disabled={imageUploading}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                />
                {imageUploading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                ) : (
                  <Upload className="w-6 h-6 text-on-surface-variant/60" />
                )}
                <span className="text-xs font-semibold text-primary mt-2">Datei auswählen</span>
                <span className="text-[10px] text-on-surface-variant mt-0.5">PNG, JPG, WEBP bis 5MB</span>
              </div>
            </div>

            {/* AI Image Generation Panel */}
            <div className="pt-2 border-t border-outline-variant/30 space-y-2">
              <label className="block text-sm font-medium text-on-surface-variant">Bild mit KI generieren</label>
              <div className="space-y-2">
                <input 
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="z.B. modern oak parquet floor with dog scratches"
                  className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container focus:ring-2 focus:ring-primary focus:outline-none text-xs"
                />
                <button
                  onClick={handleImageGenerate}
                  disabled={imageGenerating}
                  className="w-full bg-gradient-to-r from-secondary to-primary text-white py-2 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 transition-all shadow-sm"
                >
                  {imageGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  {imageGenerating ? 'Bild wird generiert...' : 'Parkett-Bild mit KI erstellen'}
                </button>
                <p className="text-[9.5px] text-on-surface-variant leading-relaxed">
                  Generiert ein ultra-realistisches, professionelles Parkett-Foto passend zu Ihrem Thema, lädt es herunter und speichert es dauerhaft auf Ihrem Server.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Markdown Editor & AI Writer */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Writing Assistant Card */}
          <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm p-6 space-y-4">
            <h2 className="font-headline-sm text-lg border-b border-outline-variant/30 pb-3 flex items-center gap-2">
              <Wand2 className="w-4.5 h-4.5 text-secondary" />
              KI-Schreib-Assistent (Abschnitte & Texte)
            </h2>
            <div className="space-y-3">
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Generieren Sie neue, hochoptimierte Abschnitte für Ihren Ratgeber! Geben Sie ein spezifisches Unterthema ein, und die KI schreibt sofort einen kompletten, formatierten Markdown-Abschnitt (mit H2/H3 Überschriften und tiefgehendem Fachwissen) und fügt ihn unten in den Editor ein.
              </p>
              <div className="flex gap-2">
                <input 
                  value={sectionPrompt}
                  onChange={(e) => setSectionPrompt(e.target.value)}
                  placeholder="z.B. Schritt für Schritt Anleitung um Flecken zu entfernen, Experten-Tipps für die Reinigung..."
                  className="flex-1 px-3 py-2 rounded-lg border border-outline-variant bg-surface-container focus:ring-2 focus:ring-secondary focus:outline-none text-xs"
                />
                <button
                  onClick={handleWriteSection}
                  disabled={writingSection}
                  className="bg-secondary text-on-secondary px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-secondary/90 active:scale-95 disabled:opacity-50 transition-all shrink-0"
                >
                  {writingSection ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  {writingSection ? 'Generiere...' : 'Abschnitt einfügen'}
                </button>
              </div>
            </div>
          </div>

          {/* Markdown Editor Card */}
          <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm p-6 flex flex-col h-[750px] space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
              <h2 className="font-headline-sm text-lg">Inhalt (Markdown Editor)</h2>
              <button 
                onClick={handleAIExpand}
                disabled={expanding}
                className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-label-sm flex items-center justify-center gap-2 hover:bg-primary/20 disabled:opacity-50 transition-colors"
              >
                {expanding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                {expanding ? 'KI schreibt...' : 'Ganzen Text optimieren'}
              </button>
            </div>
            
            <p className="text-xs text-on-surface-variant">
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
