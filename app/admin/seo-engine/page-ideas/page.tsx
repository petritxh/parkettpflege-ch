import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import PageIdeasTable from '@/components/admin/seo-engine/PageIdeasTable';
import { getSeoPageIdeas } from '@/lib/seo-engine';
import { mergePageIdeasWithStatus } from '@/lib/seo-content-status';

export default function PageIdeasPage() {
  const rawIdeas = getSeoPageIdeas();
  const ideasWithStatus = mergePageIdeasWithStatus(rawIdeas);

  return (
    <SeoEngineShell 
      title="Seitenideen & Pipeline" 
      description="Übersicht aller aus der Content Engine extrahierten Seitenideen."
    >
      <PageIdeasTable initialData={ideasWithStatus} />
    </SeoEngineShell>
  );
}
