import React from 'react';
import SeoEngineShell from '@/components/admin/seo-engine/SeoEngineShell';
import SeoSectionCard from '@/components/admin/seo-engine/SeoSectionCard';
import SeoStatCard from '@/components/admin/seo-engine/SeoStatCard';
import { getSeoRoadmap } from '@/lib/seo-engine';
import { CalendarDays, Flag, Compass, CheckCircle } from 'lucide-react';

export default function RoadmapPage() {
  const roadmap = getSeoRoadmap();
  const phases = Object.keys(roadmap);

  const colors = [
    "border-blue-500 bg-blue-50/50 text-blue-800",
    "border-emerald-500 bg-emerald-50/50 text-emerald-800",
    "border-amber-500 bg-amber-50/50 text-amber-800",
    "border-purple-500 bg-purple-50/50 text-purple-800",
    "border-pink-500 bg-pink-50/50 text-pink-800",
    "border-indigo-500 bg-indigo-50/50 text-indigo-800",
  ];

  const iconColors = [
    "text-blue-500",
    "text-emerald-500",
    "text-amber-500",
    "text-purple-500",
    "text-pink-500",
    "text-indigo-500",
  ];

  return (
    <SeoEngineShell 
      title="90-Tage Content-Roadmap" 
      description="Planungs-Phasen zur schrittweisen Etablierung von parkett-pflege.ch als stärkste Branchenplattform im Raum Zürich."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-8">
        <SeoStatCard 
          title="Fokus-Phasen" 
          value={phases.length} 
          icon={Flag} 
          color="purple"
          description="Strukturierter Stufenplan"
        />
        <SeoStatCard 
          title="Planungszeitraum" 
          value="90 Tage" 
          icon={CalendarDays} 
          color="blue"
          description="Fokus auf schnelle Sichtbarkeit"
        />
        <SeoStatCard 
          title="Ausrichtung" 
          value="Marktdominanz" 
          icon={Compass} 
          color="green"
          description="Zürich & Agglomeration"
        />
      </div>

      <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-outline-variant/30">
        {phases.map((phase, index) => {
          const items = roadmap[phase] || [];
          const colorClass = colors[index % colors.length];
          const iconColorClass = iconColors[index % iconColors.length];
          const isLeft = index % 2 === 0;

          return (
            <div key={phase} className="relative flex flex-col md:flex-row items-start md:items-center">
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1.5 md:-translate-x-2 w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-white border-2 border-primary z-10 shadow-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>

              {/* Grid Wrapper for Left/Right spacing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:px-0 pl-10">
                {/* Left Side (Content for even, empty for odd) */}
                <div className={`md:text-right ${isLeft ? 'order-1' : 'order-1 md:order-2 opacity-0 pointer-events-none hidden md:block'}`}>
                  <div className={`inline-block p-6 rounded-2xl border text-left w-full shadow-sm bg-surface ${isLeft ? 'border-primary/20' : 'border-outline-variant/20'}`}>
                    <h3 className={`font-headline-sm text-lg font-bold mb-3 flex items-center gap-2 ${iconColorClass}`}>
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      {phase}
                    </h3>
                    <ul className="space-y-2">
                      {items.map((item: string, i: number) => (
                        <li key={i} className="flex gap-2.5 items-start text-on-surface-variant text-sm font-body-md">
                          <span className="text-secondary shrink-0 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Side (Content for odd, empty for even) */}
                <div className={`${!isLeft ? 'order-2 md:order-2' : 'order-2 md:order-2 opacity-0 pointer-events-none hidden md:block'}`}>
                  <div className={`inline-block p-6 rounded-2xl border text-left w-full shadow-sm bg-surface hover:shadow-md transition-shadow ${!isLeft ? 'border-primary/20' : 'border-outline-variant/20'}`}>
                    <h3 className={`font-headline-sm text-lg font-bold mb-3 flex items-center gap-2 ${iconColorClass}`}>
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      {phase}
                    </h3>
                    <ul className="space-y-2">
                      {items.map((item: string, i: number) => (
                        <li key={i} className="flex gap-2.5 items-start text-on-surface-variant text-sm font-body-md">
                          <span className="text-secondary shrink-0 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SeoEngineShell>
  );
}
