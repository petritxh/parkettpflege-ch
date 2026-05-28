import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import BriefsClient from '@/components/admin/seo-engine/BriefsClient';
import { getSeoPageIdeas, getSeoCategories, getSeoContentTypes } from '@/lib/seo-engine';
import { getSeoContentBriefs } from '@/lib/seo-content-briefs';

export default function BriefsPage() {
  const pageIdeas = getSeoPageIdeas();
  const briefs = getSeoContentBriefs();
  const categories = getSeoCategories();
  const contentTypes = getSeoContentTypes();

  return (
    <SeoEngineShell 
      title="Content-Briefings & Vorgaben" 
      description="Detaillierte SEO-Briefings für Texter und Redakteure zur optimalen inhaltlichen Abdeckung pro Unterseite."
    >
      <BriefsClient 
        pageIdeas={pageIdeas}
        briefs={briefs}
        categories={categories}
        contentTypes={contentTypes}
      />
    </SeoEngineShell>
  );
}
