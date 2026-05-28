import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import SeoSectionCard from '@/components/admin/seo-engine/SeoSectionCard';
import { getSeoContentTypes } from '@/lib/seo-engine';

export default function ContentTypesPage() {
  const contentTypes = getSeoContentTypes();

  return (
    <SeoEngineShell 
      title="Content-Typen" 
      description="Hier sind die Baupläne für die verschiedenen Arten von SEO-Seiten."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {contentTypes.map((type) => (
          <SeoSectionCard 
            key={type.id} 
            title={type.id || 'Unbekannt'}
          >
            <div className="space-y-4">
              {type.description && (
                <p className="text-on-surface font-body-md text-sm">{type.description}</p>
              )}
              
              <div className="flex gap-4 border-b border-outline-variant/30 pb-4">
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase">Intent</span>
                  <span className="font-medium text-sm text-primary">{type.primaryIntent || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase">Min. Wörter</span>
                  <span className="font-medium text-sm">{type.minimumWordCount || 'N/A'}</span>
                </div>
              </div>

              {type.requiredFields && type.requiredFields.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Benötigte Felder</span>
                  <div className="flex flex-wrap gap-2">
                    {type.requiredFields.map(field => (
                      <span key={field} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs border border-blue-200">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {type.requiredH2Sections && type.requiredH2Sections.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Pflicht H2-Sektionen</span>
                  <ul className="list-disc pl-4 text-sm text-on-surface-variant space-y-1">
                    {type.requiredH2Sections.map(h2 => (
                      <li key={h2}>{h2}</li>
                    ))}
                  </ul>
                </div>
              )}

              {type.interactiveModulesRecommended && type.interactiveModulesRecommended.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Empfohlene Module</span>
                  <div className="flex flex-wrap gap-2">
                    {type.interactiveModulesRecommended.map(mod => (
                      <span key={mod} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs border border-green-200">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {type.schemaTypes && type.schemaTypes.length > 0 && (
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Schema.org (JSON-LD)</span>
                  <div className="flex flex-wrap gap-2">
                    {type.schemaTypes.map(schema => (
                      <code key={schema} className="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded text-xs border border-gray-200 font-mono">
                        {schema}
                      </code>
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
