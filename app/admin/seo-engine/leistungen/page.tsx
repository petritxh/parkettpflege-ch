import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import PageIdeasTable from '@/components/admin/seo-engine/PageIdeasTable';
import SeoStatCard from '@/components/admin/seo-engine/SeoStatCard';
import { getSeoServicePages } from '@/lib/seo-engine';
import { mergePageIdeasWithStatus } from '@/lib/seo-content-status';
import { Wrench, Shield, Zap, CheckCircle2 } from 'lucide-react';

export default function LeistungenPage() {
  const rawServices = getSeoServicePages();
  const servicesWithStatus = mergePageIdeasWithStatus(rawServices);

  const total = servicesWithStatus.length;
  const commercialIntent = servicesWithStatus.filter(p => p.intent?.includes('transactional') || p.intent?.includes('commercial')).length;
  const veryHighPriority = servicesWithStatus.filter(p => p.priority === 'very_high').length;
  const published = servicesWithStatus.filter(p => p.status === 'published').length;

  return (
    <SeoEngineShell 
      title="Leistungen (Geldseiten)" 
      description="Übersicht aller kommerziellen Landingpages für konkrete Dienstleistungen im Raum Zürich."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-8">
        <SeoStatCard 
          title="Dienstleistungen Gesamt" 
          value={total} 
          icon={Wrench} 
          color="blue"
          description="Kommerzielle Fokusseiten"
        />
        <SeoStatCard 
          title="Verkaufsorientiert" 
          value={commercialIntent} 
          icon={Zap} 
          color="orange"
          description="Suchanfragen mit starkem Kaufbezug"
        />
        <SeoStatCard 
          title="Top-Priorität (Very High)" 
          value={veryHighPriority} 
          icon={Shield} 
          color="purple"
          description="Kernkompetenzen des Betriebs"
        />
        <SeoStatCard 
          title="Veröffentlicht" 
          value={published} 
          icon={CheckCircle2} 
          color="green"
          description={`Fortschritt: ${total > 0 ? Math.round((published / total) * 100) : 0}%`}
        />
      </div>

      <PageIdeasTable initialData={servicesWithStatus} />
    </SeoEngineShell>
  );
}
