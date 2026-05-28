import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import SeoSectionCard from '@/components/admin/seo-engine/SeoSectionCard';
import { getSeoCategories } from '@/lib/seo-engine';
import Link from 'next/link';

export default function CategoriesPage() {
  const categories = getSeoCategories();

  return (
    <SeoEngineShell 
      title="Inhalts-Kategorien" 
      description="Hier sind alle verfügbaren Kategorien der Content-Engine definiert."
    >
      <div className="space-y-6 mt-6">
        {categories.map((cat) => (
          <SeoSectionCard 
            key={cat.id} 
            title={cat.name || cat.id || 'Unbekannt'}
            action={
              <Link 
                href={`/admin/seo-engine/page-ideas?category=${cat.id}`}
                className="text-xs font-bold text-primary hover:underline"
              >
                Ideen filtern →
              </Link>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                {cat.purpose && (
                  <div>
                    <span className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Zweck</span>
                    <p className="text-on-surface font-body-md">{cat.purpose}</p>
                  </div>
                )}
                {cat.description && (
                  <div>
                    <span className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Beschreibung</span>
                    <p className="text-on-surface font-body-md">{cat.description}</p>
                  </div>
                )}
                {cat.goal && (
                  <div>
                    <span className="block text-xs font-bold text-on-surface-variant uppercase mb-1">Primäres Ziel</span>
                    <p className="text-on-surface font-body-md">{cat.goal}</p>
                  </div>
                )}
                
                {cat.examplePages && cat.examplePages.length > 0 && (
                  <div className="pt-4">
                    <span className="block text-xs font-bold text-on-surface-variant uppercase mb-2">
                      Beispiel-Seiten ({cat.examplePages.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {cat.examplePages.slice(0, 5).map((p, i) => (
                        <span key={i} className="px-2 py-1 bg-surface-container rounded text-xs border border-outline-variant/30">
                          {p.slug.split('/').pop()}
                        </span>
                      ))}
                      {cat.examplePages.length > 5 && (
                        <span className="px-2 py-1 bg-surface-container rounded text-xs border border-outline-variant/30 text-on-surface-variant">
                          + {cat.examplePages.length - 5} weitere
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4 border-t md:border-t-0 md:border-l border-outline-variant/30 pt-4 md:pt-0 md:pl-6">
                <div>
                  <span className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Base Path</span>
                  <code className="px-2 py-1 bg-surface-container rounded text-sm text-secondary font-mono">
                    {cat.basePath || `/${cat.id}`}
                  </code>
                </div>
                
                {cat.contentTypesAllowed && cat.contentTypesAllowed.length > 0 && (
                  <div>
                    <span className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Erlaubte Typen</span>
                    <ul className="list-disc pl-4 text-sm text-on-surface-variant space-y-1">
                      {cat.contentTypesAllowed.map(t => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {cat.requiredModules && cat.requiredModules.length > 0 && (
                  <div>
                    <span className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Pflichtmodule</span>
                    <ul className="list-disc pl-4 text-sm text-on-surface-variant space-y-1">
                      {cat.requiredModules.map(m => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </SeoSectionCard>
        ))}
      </div>
    </SeoEngineShell>
  );
}
