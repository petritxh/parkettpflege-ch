import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import SeoSectionCard from '@/components/admin/seo-engine/SeoSectionCard';
import SeoStatCard from '@/components/admin/seo-engine/SeoStatCard';
import { getSeoJsonLdRules } from '@/lib/seo-engine';
import { Code, CheckCircle, ShieldAlert, Award } from 'lucide-react';

export default function JsonLdPage() {
  const jsonLdData = getSeoJsonLdRules();
  const globalRules = jsonLdData.globalRules || [];
  const schemaByContentType = jsonLdData.schemaByContentType || {};
  const contentTypes = Object.keys(schemaByContentType);

  return (
    <SeoEngineShell 
      title="JSON-LD & Strukturierte Daten" 
      description="Übersicht aller Schema-Regeln zur optimalen Darstellung in den Google SERPs (z. B. Rich Snippets, FAQs und Sternebewertungen)."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-8">
        <SeoStatCard 
          title="Strukturierte Regeln" 
          value={globalRules.length} 
          icon={CheckCircle} 
          color="blue"
          description="Qualitätsvorgaben für Schemas"
        />
        <SeoStatCard 
          title="Erfasste Inhaltstypen" 
          value={contentTypes.length} 
          icon={Code} 
          color="purple"
          description="Typen mit festen Schemas"
        />
        <SeoStatCard 
          title="SERP-Boost" 
          value="Rich Snippets" 
          icon={Award} 
          color="green"
          description="Optimiert für hohe Klickraten"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schema Rules */}
        <div className="lg:col-span-1">
          <SeoSectionCard title="Globale Schema-Regeln">
            <ul className="space-y-4">
              {globalRules.map((rule: string, i: number) => (
                <li key={i} className="flex gap-2.5 items-start text-on-surface-variant text-sm font-body-md leading-relaxed">
                  <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </SeoSectionCard>
        </div>

        {/* Mappings */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-headline-sm text-lg font-bold text-on-surface mb-2">Schemas nach Inhaltstyp</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contentTypes.map((type) => (
              <SeoSectionCard 
                key={type} 
                title={type.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
              >
                <div className="flex flex-wrap gap-2">
                  {schemaByContentType[type].map((schema: string, i: number) => {
                    const isOptional = schema.toLowerCase().includes('optional');
                    return (
                      <span 
                        key={i} 
                        className={`px-3 py-1 rounded-full text-xs font-mono border ${
                          isOptional 
                            ? 'bg-surface-variant text-on-surface-variant/70 border-outline-variant/20 italic' 
                            : 'bg-green-50 text-green-700 border-green-200 font-bold'
                        }`}
                      >
                        {schema}
                      </span>
                    );
                  })}
                </div>
              </SeoSectionCard>
            ))}
          </div>
        </div>
      </div>
    </SeoEngineShell>
  );
}
