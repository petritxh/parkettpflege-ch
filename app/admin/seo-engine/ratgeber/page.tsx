import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import PageIdeasTable from '@/components/admin/seo-engine/PageIdeasTable';
import SeoStatCard from '@/components/admin/seo-engine/SeoStatCard';
import { getSeoGuidePages } from '@/lib/seo-engine';
import { mergePageIdeasWithStatus } from '@/lib/seo-content-status';
import { BookOpen, Star, HelpCircle, FileCheck } from 'lucide-react';

export default function RatgeberPage() {
  const rawGuides = getSeoGuidePages();
  const guidesWithStatus = mergePageIdeasWithStatus(rawGuides);

  const total = guidesWithStatus.length;
  const highPriority = guidesWithStatus.filter(p => p.priority === 'very_high' || p.priority === 'high').length;
  const published = guidesWithStatus.filter(p => p.status === 'published').length;

  return (
    <SeoEngineShell 
      title="Ratgeber (Evergreen-Wissen)" 
      description="Übersicht aller Fachratgeber, Vergleiche und detaillierten Pflegeanleitungen."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-8">
        <SeoStatCard 
          title="Ratgeber Gesamt" 
          value={total} 
          icon={BookOpen} 
          color="purple"
          description="Evergreen-Wissensdatenbank"
        />
        <SeoStatCard 
          title="Fokus-Artikel" 
          value={highPriority} 
          icon={Star} 
          color="orange"
          description="Wichtige Traffic-Bringer"
        />
        <SeoStatCard 
          title="Zielgruppe" 
          value="Besitzer & Mieter" 
          icon={HelpCircle} 
          color="blue"
          description="Lösungsorientierte Hilfe"
        />
        <SeoStatCard 
          title="Veröffentlicht" 
          value={published} 
          icon={FileCheck} 
          color="green"
          description={`Fortschritt: ${total > 0 ? Math.round((published / total) * 100) : 0}%`}
        />
      </div>

      <PageIdeasTable initialData={guidesWithStatus} />
    </SeoEngineShell>
  );
}
