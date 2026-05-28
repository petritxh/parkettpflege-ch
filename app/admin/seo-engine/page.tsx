import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import SeoStatCard from '@/components/admin/seo-engine/SeoStatCard';
import SeoSectionCard from '@/components/admin/seo-engine/SeoSectionCard';
import { 
  getSeoProject, 
  getSeoCategories, 
  getSeoContentTypes, 
  getSeoControlledTags, 
  getSeoInteractiveModules, 
  getSeoPageIdeas, 
  getSeoQualityScoreRules 
} from '@/lib/seo-engine';
import { getSeoContentStatus } from '@/lib/seo-content-status';
import { 
  FolderTree, 
  Type, 
  Tags, 
  MousePointer2, 
  Lightbulb, 
  AlertCircle, 
  Target, 
  BookOpen, 
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function SeoEngineDashboard() {
  const project = getSeoProject();
  const categories = getSeoCategories();
  const contentTypes = getSeoContentTypes();
  const tags = getSeoControlledTags();
  const interactiveModules = getSeoInteractiveModules();
  const pageIdeas = getSeoPageIdeas();
  const qualityScoreRules = getSeoQualityScoreRules();
  const statusData = getSeoContentStatus();

  const totalTags = tags.reduce((acc, group) => acc + (group.tags?.length || 0), 0);
  const plannedPages = statusData.pages.filter(p => p.status === 'planned').length;
  const publishedPages = statusData.pages.filter(p => p.status === 'published').length;
  
  // Categorized ideas
  const problemIdeas = pageIdeas.filter(p => p.category === 'problemfaelle').length;
  const serviceIdeas = pageIdeas.filter(p => p.category === 'leistungen').length;
  const costIdeas = pageIdeas.filter(p => p.category === 'kosten').length;
  const locationIdeas = pageIdeas.filter(p => p.category === 'zuerich').length;

  return (
    <SeoEngineShell 
      title="SEO Engine Übersicht" 
      description="Zentrale Steuerung für Content-Architektur, SEO-Regeln und Themenplanung."
    >
      
      {/* Project Meta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <SeoSectionCard title="Projekt-Metadaten">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/30 pb-3">
              <span className="text-on-surface-variant font-medium">Projekt</span>
              <span className="col-span-2 font-bold">{project.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/30 pb-3">
              <span className="text-on-surface-variant font-medium">Domain</span>
              <span className="col-span-2 text-primary">{project.domain}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/30 pb-3">
              <span className="text-on-surface-variant font-medium">Zielmarkt</span>
              <span className="col-span-2">{project.primaryMarket}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-outline-variant/30 pb-3">
              <span className="text-on-surface-variant font-medium">Strategie</span>
              <span className="col-span-2 italic text-on-surface-variant">{project.strategicConcept}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="text-on-surface-variant font-medium">Slogan</span>
              <span className="col-span-2">"{project.slogan}"</span>
            </div>
          </div>
        </SeoSectionCard>

        <div className="space-y-6">
          <SeoSectionCard title="Nächste Schritte" className="h-full">
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-on-surface-variant">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Es warten <strong>{pageIdeas.length} Seitenideen</strong> darauf, qualifiziert zu werden.
                  <Link href="/admin/seo-engine/page-ideas" className="text-primary hover:underline ml-2">Ideen prüfen →</Link>
                </span>
              </li>
              <li className="flex items-start gap-2 text-on-surface-variant">
                <BookOpen className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  Lesen Sie die Dokumentation, um die Content-Engine voll auszunutzen.
                  <Link href="/admin/seo-engine/docs" className="text-primary hover:underline ml-2">Zur Doku →</Link>
                </span>
              </li>
              <li className="flex items-start gap-2 text-on-surface-variant">
                <Target className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  Mindest-Quality Score für Veröffentlichung: <strong>{qualityScoreRules?.minimumToPublish || 85} Punkte</strong>.
                  <Link href="/admin/seo-engine/quality-score" className="text-primary hover:underline ml-2">Kriterien ansehen →</Link>
                </span>
              </li>
            </ul>
          </SeoSectionCard>
        </div>
      </div>

      <h2 className="font-headline-sm text-xl font-bold mb-4 mt-8">Struktur-Metriken</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SeoStatCard 
          title="Kategorien" 
          value={categories.length} 
          icon={FolderTree} 
          color="blue"
        />
        <SeoStatCard 
          title="Seitentypen" 
          value={contentTypes.length} 
          icon={Type} 
          color="purple"
        />
        <SeoStatCard 
          title="Kontrollierte Tags" 
          value={totalTags} 
          description={`${tags.length} Gruppen`}
          icon={Tags} 
          color="orange"
        />
        <SeoStatCard 
          title="Interaktive Module" 
          value={interactiveModules.length} 
          icon={MousePointer2} 
          color="green"
        />
      </div>

      <h2 className="font-headline-sm text-xl font-bold mb-4 mt-8">Content-Pipeline</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SeoStatCard 
          title="Seitenideen" 
          value={pageIdeas.length} 
          icon={Lightbulb} 
          color="blue"
        />
        <SeoStatCard 
          title="davon Problemfälle" 
          value={problemIdeas} 
          icon={AlertCircle} 
          color="orange"
        />
        <SeoStatCard 
          title="davon Leistungen" 
          value={serviceIdeas} 
          icon={Target} 
          color="green"
        />
        <SeoStatCard 
          title="davon Lokal (Zürich)" 
          value={locationIdeas} 
          icon={FolderTree} 
          color="purple"
        />
      </div>
      
    </SeoEngineShell>
  );
}
