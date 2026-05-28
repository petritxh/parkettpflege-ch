import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import SeoSectionCard from '@/components/admin/seo-engine/SeoSectionCard';
import { getSeoControlledTags } from '@/lib/seo-engine';

export default function TagsPage() {
  const tagGroups = getSeoControlledTags();

  return (
    <SeoEngineShell 
      title="Kontrollierte Taxonomie (Tags)" 
      description="Diese Tags sind fix definiert und dürfen nicht durch freie Texteingabe im CMS erweitert werden."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {tagGroups.map((group) => (
          <SeoSectionCard 
            key={group.id} 
            title={group.name}
          >
            <div className="flex flex-wrap gap-2">
              {group.tags && group.tags.length > 0 ? (
                group.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-surface-variant text-on-surface-variant rounded-full text-sm border border-outline-variant/30"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-sm text-on-surface-variant italic">Keine Tags in dieser Gruppe</span>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-outline-variant/30">
              <span className="text-xs text-on-surface-variant">Insgesamt: <strong>{group.tags?.length || 0}</strong> Tags</span>
            </div>
          </SeoSectionCard>
        ))}
      </div>
    </SeoEngineShell>
  );
}
