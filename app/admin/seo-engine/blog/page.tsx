import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import PageIdeasTable from '@/components/admin/seo-engine/PageIdeasTable';
import SeoStatCard from '@/components/admin/seo-engine/SeoStatCard';
import { getSeoBlogPages } from '@/lib/seo-engine';
import { mergePageIdeasWithStatus } from '@/lib/seo-content-status';
import { FileText, Calendar, PenTool, CheckSquare } from 'lucide-react';

export default function BlogPage() {
  const rawBlog = getSeoBlogPages();
  const blogWithStatus = mergePageIdeasWithStatus(rawBlog);

  const total = blogWithStatus.length;
  const highPriority = blogWithStatus.filter(p => p.priority === 'very_high' || p.priority === 'high').length;
  const published = blogWithStatus.filter(p => p.status === 'published').length;

  return (
    <SeoEngineShell 
      title="Blog & Magazin" 
      description="Laufende und aktuelle Themen, Pflegefehler, Mieterwechsel-Fragen und saisonale Ratgeberartikel."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-8">
        <SeoStatCard 
          title="Blogartikel Gesamt" 
          value={total} 
          icon={FileText} 
          color="orange"
          description="Inhaltspool für Fachartikel"
        />
        <SeoStatCard 
          title="Fokus-Beiträge" 
          value={highPriority} 
          icon={PenTool} 
          color="purple"
          description="Starke strategische Relevanz"
        />
        <SeoStatCard 
          title="Planungsintervall" 
          value="Monatlich" 
          icon={Calendar} 
          color="blue"
          description="Laufende Inhaltserweiterung"
        />
        <SeoStatCard 
          title="Veröffentlicht" 
          value={published} 
          icon={CheckSquare} 
          color="green"
          description={`Fortschritt: ${total > 0 ? Math.round((published / total) * 100) : 0}%`}
        />
      </div>

      <PageIdeasTable initialData={blogWithStatus} />
    </SeoEngineShell>
  );
}
