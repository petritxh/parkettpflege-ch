import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import SeoSectionCard from '@/components/admin/seo-engine/SeoSectionCard';
import SeoStatCard from '@/components/admin/seo-engine/SeoStatCard';
import { getSeoInteractiveModules } from '@/lib/seo-engine';
import { MousePointer2, Settings, ListChecks, Play } from 'lucide-react';

export default function InteractivePage() {
  const modules = getSeoInteractiveModules();

  return (
    <SeoEngineShell 
      title="Interaktive Module" 
      description="Diese dynamischen Widgets qualifizieren Leads, halten Nutzer auf der Seite und optimieren die Conversion-Rate."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-8">
        <SeoStatCard 
          title="Module Gesamt" 
          value={modules.length} 
          icon={MousePointer2} 
          color="blue"
          description="Integrierte interaktive Tools"
        />
        <SeoStatCard 
          title="Fokus-Ziele" 
          value="Lead & Trust" 
          icon={Settings} 
          color="purple"
          description="Nutzerinteraktion & Datenermittlung"
        />
        <SeoStatCard 
          title="Conversion-Hebel" 
          value="Sehr Hoch" 
          icon={ListChecks} 
          color="green"
          description="Optimiert für den Zürcher Markt"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod) => (
          <SeoSectionCard 
            key={mod.id} 
            title={mod.id.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            action={
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                Aktiv
              </span>
            }
          >
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Zweck</span>
                <p className="text-on-surface font-body-md font-medium">{mod.purpose || 'Kein Zweck definiert'}</p>
              </div>

              {mod.questions && mod.questions.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Fragen im Quiz</span>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.questions.map((q: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-surface-container rounded-md text-xs border border-outline-variant/30 text-on-surface">
                        {q}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {mod.results && mod.results.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Ergebnis-Empfehlungen</span>
                  <ul className="list-disc pl-4 text-sm text-on-surface-variant space-y-1">
                    {mod.results.map((r: string, i: number) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {mod.inputs && mod.inputs.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Benutzereingaben (Inputs)</span>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.inputs.map((inp: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs border border-blue-200">
                        {inp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {mod.outputs && mod.outputs.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Ausgaben (Outputs)</span>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.outputs.map((out: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs border border-green-200">
                        {out}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {mod.situations && mod.situations.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Spielerische Lern-Situationen</span>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.situations.map((sit: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 rounded-md text-xs border border-amber-200">
                        {sit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {mod.requirements && mod.requirements.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Voraussetzungen / Qualitätsregeln</span>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.requirements.map((req: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-xs border border-purple-200">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SeoSectionCard>
        ))}
      </div>
    </SeoEngineShell>
  );
}
