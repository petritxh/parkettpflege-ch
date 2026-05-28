import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import SeoSectionCard from '@/components/admin/seo-engine/SeoSectionCard';
import SeoStatCard from '@/components/admin/seo-engine/SeoStatCard';
import { getSeoInternalLinkingRules } from '@/lib/seo-engine';
import { LinkIcon, ShieldCheck, Layers, Eye } from 'lucide-react';
import Link from 'next/link';

export default function InternalLinksPage() {
  const linkingData = getSeoInternalLinkingRules();
  const rules = linkingData.rules || [];
  const clusters = linkingData.clusters || {};
  const clusterNames = Object.keys(clusters);

  const totalLinksInClusters = clusterNames.reduce((acc, name) => acc + (clusters[name]?.length || 0), 0);

  return (
    <SeoEngineShell 
      title="Interne Verlinkung (Silo & Cluster)" 
      description="Strategische interne Link-Verknüpfungen zur Stärkung der Themenautorität und Verteilung der Linkjuice im Raum Zürich."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-8">
        <SeoStatCard 
          title="Verlinkungs-Regeln" 
          value={rules.length} 
          icon={ShieldCheck} 
          color="blue"
          description="Eingebaute SEO-Vorgaben"
        />
        <SeoStatCard 
          title="Themen-Cluster" 
          value={clusterNames.length} 
          icon={Layers} 
          color="purple"
          description="Silos zur Themendominanz"
        />
        <SeoStatCard 
          title="Verlinkte URLs" 
          value={totalLinksInClusters} 
          icon={LinkIcon} 
          color="green"
          description="URLs in Clustern erfasst"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rules Card */}
        <div className="lg:col-span-1">
          <SeoSectionCard title="Globale Richtlinien">
            <ul className="space-y-4">
              {rules.map((rule: string, i: number) => (
                <li key={i} className="flex gap-2.5 items-start text-on-surface-variant text-sm font-body-md leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></div>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </SeoSectionCard>
        </div>

        {/* Clusters */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-headline-sm text-lg font-bold text-on-surface mb-2">Thematische Content-Cluster (Silostrukturen)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clusterNames.map((name) => (
              <SeoSectionCard 
                key={name} 
                title={name}
                action={
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    Silo-Cluster
                  </span>
                }
              >
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {clusters[name].map((url: string, i: number) => (
                    <div key={i} className="flex justify-between items-center bg-surface-container-lowest p-2 rounded-lg border border-outline-variant/30 text-xs font-mono">
                      <span className="truncate text-on-surface-variant font-medium select-all" title={url}>
                        {url}
                      </span>
                      <Link 
                        href={`/admin/seo-engine/briefs?slug=${encodeURIComponent(url)}`}
                        className="text-primary hover:text-primary-dark ml-2 shrink-0 flex items-center gap-0.5 font-bold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Info
                      </Link>
                    </div>
                  ))}
                </div>
              </SeoSectionCard>
            ))}
          </div>
        </div>
      </div>
    </SeoEngineShell>
  );
}
