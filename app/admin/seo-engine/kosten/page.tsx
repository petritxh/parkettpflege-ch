import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import PageIdeasTable from '@/components/admin/seo-engine/PageIdeasTable';
import SeoStatCard from '@/components/admin/seo-engine/SeoStatCard';
import { getSeoCostPages } from '@/lib/seo-engine';
import { mergePageIdeasWithStatus } from '@/lib/seo-content-status';
import { DollarSign, Percent, TrendingUp, CheckCircle } from 'lucide-react';

export default function KostenPage() {
  const rawCosts = getSeoCostPages();
  const costsWithStatus = mergePageIdeasWithStatus(rawCosts);

  const total = costsWithStatus.length;
  const highPriority = costsWithStatus.filter(p => p.priority === 'very_high' || p.priority === 'high').length;
  const published = costsWithStatus.filter(p => p.status === 'published').length;

  return (
    <SeoEngineShell 
      title="Kosten & Preise" 
      description="Übersicht aller preisbezogenen SEO-Seiten und Kalkulatoren für maximale Transparenz."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-8">
        <SeoStatCard 
          title="Kostenseiten Gesamt" 
          value={total} 
          icon={DollarSign} 
          color="green"
          description="Kalkulatorische Landingpages"
        />
        <SeoStatCard 
          title="Fokus-Priorität" 
          value={highPriority} 
          icon={TrendingUp} 
          color="blue"
          description="Hohes Suchvolumen bei Preisfragen"
        />
        <SeoStatCard 
          title="Transparenz-Score" 
          value="100%" 
          icon={Percent} 
          color="purple"
          description="Garantierte Richtpreise"
        />
        <SeoStatCard 
          title="Veröffentlicht" 
          value={published} 
          icon={CheckCircle} 
          color="green"
          description={`Fortschritt: ${total > 0 ? Math.round((published / total) * 100) : 0}%`}
        />
      </div>

      <PageIdeasTable initialData={costsWithStatus} />
    </SeoEngineShell>
  );
}
