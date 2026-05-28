import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import PageIdeasTable from '@/components/admin/seo-engine/PageIdeasTable';
import SeoStatCard from '@/components/admin/seo-engine/SeoStatCard';
import { getSeoProblemPages } from '@/lib/seo-engine';
import { mergePageIdeasWithStatus } from '@/lib/seo-content-status';
import { AlertTriangle, ShieldCheck, HelpCircle, FileText } from 'lucide-react';

export default function ProblemfaellePage() {
  const rawProblems = getSeoProblemPages();
  const problemsWithStatus = mergePageIdeasWithStatus(rawProblems);

  const total = problemsWithStatus.length;
  const highPriority = problemsWithStatus.filter(p => p.priority === 'very_high' || p.priority === 'high').length;
  const informationalIntent = problemsWithStatus.filter(p => p.intent === 'informational' || p.intent === 'informational_commercial').length;
  const published = problemsWithStatus.filter(p => p.status === 'published').length;

  return (
    <SeoEngineShell 
      title="Problemfälle (Schadensdiagnose)" 
      description="Übersicht aller Ratgeber- und Diagnose-Seiten für spezifische Parkettschäden im Raum Zürich."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-8">
        <SeoStatCard 
          title="Schadensseiten Gesamt" 
          value={total} 
          icon={AlertTriangle} 
          color="orange"
          description="Geplante Problem-Lösungsseiten"
        />
        <SeoStatCard 
          title="Hohe Priorität" 
          value={highPriority} 
          icon={ShieldCheck} 
          color="blue"
          description="Fokus-Keywords mit hohem Suchvolumen"
        />
        <SeoStatCard 
          title="Informativer Intent" 
          value={informationalIntent} 
          icon={HelpCircle} 
          color="purple"
          description="Nutzer sucht nach Ursachen & Hilfe"
        />
        <SeoStatCard 
          title="Veröffentlicht" 
          value={published} 
          icon={FileText} 
          color="green"
          description={`Fortschritt: ${total > 0 ? Math.round((published / total) * 100) : 0}%`}
        />
      </div>

      <PageIdeasTable initialData={problemsWithStatus} />
    </SeoEngineShell>
  );
}
