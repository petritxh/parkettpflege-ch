import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import SeoSectionCard from '@/components/admin/seo-engine/SeoSectionCard';
import { getSeoQualityScoreRules } from '@/lib/seo-engine';
import { CheckCircle2 } from 'lucide-react';

export default function QualityScorePage() {
  const rules = getSeoQualityScoreRules();
  const criteria = rules.criteria || {};

  return (
    <SeoEngineShell 
      title="Quality Score" 
      description="Übersicht der Veröffentlichungsregeln und Qualitäts-Kriterien für SEO-Seiten."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Main Info */}
        <div className="lg:col-span-1 space-y-6">
          <SeoSectionCard title="Veröffentlichung">
            <div className="text-center py-6">
              <span className="block text-4xl font-display-md font-bold text-emerald-600 mb-2">
                {rules.minimumToPublish || 85}
              </span>
              <span className="block text-sm text-on-surface-variant uppercase tracking-wider font-bold">
                Mindest-Score
              </span>
              <p className="mt-4 text-sm text-on-surface">
                Seiten dürfen nur veröffentlicht werden, wenn sie diesen Score erreichen.
              </p>
            </div>
          </SeoSectionCard>
        </div>

        {/* Criteria List */}
        <div className="lg:col-span-2">
          <SeoSectionCard title="Qualitätskriterien (Checkliste)">
            <div className="space-y-4">
              {Object.keys(criteria).length > 0 ? (
                Object.keys(criteria).map(key => {
                  const rule = criteria[key];
                  const weight = typeof rule === 'number' ? rule : rule.weight;
                  const desc = typeof rule === 'object' ? rule.description : '';

                  return (
                    <div key={key} className="flex gap-4 p-4 border border-outline-variant/30 rounded-xl bg-surface-container-lowest">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-on-surface">{key}</span>
                          <span className="text-xs font-bold px-2 py-1 bg-surface-variant rounded text-on-surface-variant">
                            +{weight} Pkt.
                          </span>
                        </div>
                        {desc && <p className="text-sm text-on-surface-variant">{desc}</p>}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-on-surface-variant">
                  <p>Keine detaillierten Kriterien in der Konfiguration gefunden.</p>
                </div>
              )}
            </div>
          </SeoSectionCard>
        </div>

      </div>
    </SeoEngineShell>
  );
}
