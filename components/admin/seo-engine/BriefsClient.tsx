'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SeoSectionCard from '@/components/admin/seo-engine/SeoSectionCard';
import SeoStatCard from '@/components/admin/seo-engine/SeoStatCard';
import { FileText, Target, AlertCircle, Compass, ShieldAlert } from 'lucide-react';

interface BriefsClientProps {
  pageIdeas: any[];
  briefs: any[];
  categories: any[];
  contentTypes: any[];
}

function BriefsClientContent({ pageIdeas, briefs, categories, contentTypes }: BriefsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slugParam = searchParams.get('slug');
  
  const [selectedSlug, setSelectedSlug] = useState<string>('');

  useEffect(() => {
    if (slugParam) {
      setSelectedSlug(slugParam);
    } else if (briefs.length > 0 && !selectedSlug) {
      setSelectedSlug(briefs[0].slug);
    } else if (pageIdeas.length > 0 && !selectedSlug) {
      setSelectedSlug(pageIdeas[0].slug);
    }
  }, [slugParam, briefs, pageIdeas, selectedSlug]);

  const activeBrief = briefs.find(b => b.slug === selectedSlug) || pageIdeas.find(p => p.slug === selectedSlug);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    setSelectedSlug(slug);
    router.push(`/admin/seo-engine/briefs?slug=${encodeURIComponent(slug)}`);
  };

  if (!activeBrief) {
    return (
      <div className="p-8 text-center text-on-surface-variant bg-surface rounded-xl border border-outline-variant/30 mt-6">
        <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="font-headline-sm text-lg font-bold">Keine Seitenbriefings gefunden</h3>
        <p className="text-sm mt-2">Es sind aktuell keine Seitenideen im System vorhanden.</p>
      </div>
    );
  }

  // Find category name
  const categoryObj = categories.find(c => c.id === activeBrief.category);
  const categoryName = categoryObj ? categoryObj.name : activeBrief.category;

  // Find content type requirements
  const typeObj = contentTypes.find(t => t.id === activeBrief.contentType);

  const isRealBrief = briefs.some(b => b.slug === selectedSlug);

  return (
    <div className="space-y-6 mt-6">
      {/* Page Select and Meta */}
      <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Inhaltsseite auswählen</label>
          <select 
            className="w-full px-3 py-2 rounded-lg border border-outline-variant/50 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={selectedSlug}
            onChange={handleSelectChange}
          >
            <optgroup label="Vorhandene Briefings">
              {briefs.map(b => (
                <option key={b.slug} value={b.slug}>{b.primaryKeyword || b.slug} ({b.slug})</option>
              ))}
            </optgroup>
            <optgroup label="Seitenideen aus Content Engine">
              {pageIdeas.filter(p => !briefs.some(b => b.slug === p.slug)).map(p => (
                <option key={p.slug} value={p.slug}>{p.primaryKeyword || p.slug} ({p.slug})</option>
              ))}
            </optgroup>
          </select>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-stretch md:self-end pt-4 md:pt-0">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            isRealBrief 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            {isRealBrief ? 'Briefing Generiert' : 'Auto-Idee aus Engine'}
          </span>
        </div>
      </div>

      {/* Briefing Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SeoStatCard 
          title="Fokus-Keyword" 
          value={activeBrief.primaryKeyword || 'Nicht definiert'} 
          icon={Target} 
          color="blue"
          description="Primäres Such-Keyword für Zürich"
        />
        <SeoStatCard 
          title="Suchintention" 
          value={activeBrief.intent || 'informational'} 
          icon={Compass} 
          color="purple"
          description="Erwartetes Nutzerbedürfnis"
        />
        <SeoStatCard 
          title="Seitentyp & Kategorie" 
          value={activeBrief.contentType || 'Standard'} 
          icon={FileText} 
          color="green"
          description={`Kategorie: ${categoryName}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Briefing Info */}
        <div className="lg:col-span-2 space-y-6">
          <SeoSectionCard title="Struktur & Inhaltliche Vorgaben">
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Geplante Hauptüberschrift (H1)</span>
                <p className="text-on-surface font-headline-sm text-lg font-bold border-l-4 border-primary pl-3 py-1 bg-surface-variant/30 rounded-r-lg">
                  {activeBrief.h1 || `Parkett-Pflege: ${activeBrief.primaryKeyword}`}
                </p>
              </div>

              <div>
                <span className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Empfohlene H2-Gliederung (Outline)</span>
                {typeObj?.requiredH2Sections && typeObj.requiredH2Sections.length > 0 ? (
                  <div className="space-y-2 mt-2">
                    {typeObj.requiredH2Sections.map((h2: string, i: number) => (
                      <div key={i} className="flex gap-3 items-center bg-surface-container p-2.5 rounded-lg border border-outline-variant/30 text-sm">
                        <span className="font-bold text-primary bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">
                          H2
                        </span>
                        <span className="text-on-surface font-medium">{h2}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-on-surface-variant italic">Keine feste Gliederung vorgegeben. Gilt standardmässig nach Seitentyp-Schema.</p>
                )}
              </div>
            </div>
          </SeoSectionCard>

          {activeBrief.ctaBlocks && activeBrief.ctaBlocks.length > 0 && (
            <SeoSectionCard title="Call-to-Action (CTA) Blöcke">
              <div className="space-y-3">
                {activeBrief.ctaBlocks.map((cta: any, i: number) => (
                  <div key={i} className="bg-surface-container p-4 rounded-xl border border-outline-variant/30">
                    <div className="font-bold text-sm text-on-surface mb-1">{cta.title || 'CTA-Element'}</div>
                    <div className="text-xs text-on-surface-variant mb-2">{cta.description || 'Nutzer zum Handeln auffordern'}</div>
                    <span className="px-2 py-0.5 rounded bg-primary text-white text-[10px] font-bold">{cta.type || 'Button'}</span>
                  </div>
                ))}
              </div>
            </SeoSectionCard>
          )}
        </div>

        {/* Technical Requirements Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <SeoSectionCard title="Technische SEO-Regeln">
            <div className="space-y-5">
              <div>
                <span className="block text-xs font-bold text-on-surface-variant uppercase mb-1.5">Ziel-Slug (URL)</span>
                <code className="block p-2 bg-surface-container rounded text-xs text-secondary font-mono truncate select-all">
                  {activeBrief.slug}
                </code>
              </div>

              <div>
                <span className="block text-xs font-bold text-on-surface-variant uppercase mb-1.5">Empfohlene Länge</span>
                <div className="text-sm font-medium text-on-surface">
                  Mindestanzahl: <strong className="text-primary">{typeObj?.minimumWordCount || 1200}</strong> Wörter
                </div>
                <div className="text-xs text-on-surface-variant mt-0.5">
                  Empfohlen: {typeObj?.recommendedWordCount || '1500 - 2500'} Wörter
                </div>
              </div>

              {typeObj?.schemaTypes && typeObj.schemaTypes.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase mb-1.5">JSON-LD Schemas</span>
                  <div className="flex flex-wrap gap-1.5">
                    {typeObj.schemaTypes.map((schema: string) => (
                      <span key={schema} className="px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200 text-xs font-mono font-semibold">
                        {schema}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeBrief.tags && activeBrief.tags.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase mb-1.5">Zugeordnete Tags</span>
                  <div className="flex flex-wrap gap-1">
                    {activeBrief.tags.map((tag: string) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-surface-variant text-on-surface-variant text-[11px] border border-outline-variant/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SeoSectionCard>
        </div>
      </div>
    </div>
  );
}

export default function BriefsClient({ pageIdeas, briefs, categories, contentTypes }: BriefsClientProps) {
  return (
    <Suspense fallback={
      <div className="p-8 text-center text-on-surface-variant">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        Lade Briefings...
      </div>
    }>
      <BriefsClientContent 
        pageIdeas={pageIdeas} 
        briefs={briefs} 
        categories={categories} 
        contentTypes={contentTypes} 
      />
    </Suspense>
  );
}
