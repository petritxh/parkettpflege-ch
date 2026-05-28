import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import PageIdeasTable from '@/components/admin/seo-engine/PageIdeasTable';
import SeoStatCard from '@/components/admin/seo-engine/SeoStatCard';
import { getSeoLocationPages } from '@/lib/seo-engine';
import { mergePageIdeasWithStatus } from '@/lib/seo-content-status';
import { MapPin, Navigation, Compass, Globe } from 'lucide-react';

export default function ZuerichPage() {
  const rawLocations = getSeoLocationPages();
  const locationsWithStatus = mergePageIdeasWithStatus(rawLocations);

  const total = locationsWithStatus.length;
  const highPriority = locationsWithStatus.filter(p => p.priority === 'very_high' || p.priority === 'high').length;
  const published = locationsWithStatus.filter(p => p.status === 'published').length;

  return (
    <SeoEngineShell 
      title="Zürich (Lokale Dominanz)" 
      description="Übersicht aller lokalen Landingpages für Zürcher Bezirke und Gemeinden zur maximalen Auffindbarkeit vor Ort."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-8">
        <SeoStatCard 
          title="Gemeinden Gesamt" 
          value={total} 
          icon={MapPin} 
          color="blue"
          description="Zielgebiete im Kanton Zürich"
        />
        <SeoStatCard 
          title="Fokus-Gebiete" 
          value={highPriority} 
          icon={Navigation} 
          color="orange"
          description="Umsatzstarke Regionen"
        />
        <SeoStatCard 
          title="Zielmarkt" 
          value="Raum Zürich" 
          icon={Compass} 
          color="purple"
          description="Lokale Suchintentionen"
        />
        <SeoStatCard 
          title="Veröffentlicht" 
          value={published} 
          icon={Globe} 
          color="green"
          description={`Fortschritt: ${total > 0 ? Math.round((published / total) * 100) : 0}%`}
        />
      </div>

      <PageIdeasTable initialData={locationsWithStatus} />
    </SeoEngineShell>
  );
}
