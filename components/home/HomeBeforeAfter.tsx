'use client';

import Link from 'next/link';
import { ArrowRight, Image as ImageIcon, Sparkles } from 'lucide-react';
import { homepageContent } from '@/data/homepage-content';

export default function HomeBeforeAfter() {
  const data = homepageContent.beforeAfter;

  return (
    <section className="py-20 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface" id="vorher-nachher">
      <div className="max-w-container-max-width mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-secondary font-label-md text-xs font-bold tracking-widest uppercase block">
            Praxisberichte & Referenzen
          </span>
          <h2 className="font-headline-lg text-3xl md:text-5xl font-extrabold text-on-surface">
            {data.h2}
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            {data.intro}
          </p>
        </div>

        {/* 3 Cases Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.cases.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] overflow-hidden"
            >
              
              {/* Mock premium placeholder representing before/after preview */}
              <div className="relative aspect-[4/3] bg-surface-container-low flex items-center justify-center border-b border-outline-variant/20 overflow-hidden group">
                {/* Visual split representing before-after comparison slider */}
                <div className="absolute inset-0 grid grid-cols-2">
                  <div className="bg-amber-800/10 flex items-center justify-center border-r border-dashed border-white/60">
                    <span className="text-[10px] text-on-surface-variant/80 font-bold uppercase tracking-wider bg-white/80 border px-2 py-0.5 rounded-md absolute top-3 left-3 shadow-sm select-none">Vorher</span>
                  </div>
                  <div className="bg-amber-150/15 flex items-center justify-center">
                    <span className="text-[10px] text-primary font-bold uppercase tracking-wider bg-white/80 border px-2 py-0.5 rounded-md absolute top-3 right-3 shadow-sm select-none">Nachher</span>
                  </div>
                </div>

                <div className="text-center space-y-2 z-10">
                  <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm border shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="block text-[11px] text-on-surface-variant font-bold uppercase tracking-widest">Projektfall {index + 1}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 space-y-4">
                <span className="text-xs text-secondary font-bold uppercase tracking-wider block">{item.problem}</span>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">{item.title}</h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{item.text}</p>
              </div>

              {/* Link Footer */}
              <div className="px-8 pb-8 pt-4 border-t border-outline-variant/10">
                <Link 
                  href={`/faelle/${item.slug}`}
                  className="inline-flex items-center gap-1.5 font-bold text-sm text-primary hover:text-primary-hover group"
                >
                  <span>Projektbericht ansehen</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic CTA at the bottom */}
        <div className="text-center">
          <Link 
            href={data.cta.href}
            className="inline-flex items-center gap-1.5 bg-primary text-on-primary hover:bg-primary/95 px-7 py-4 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <span>{data.cta.label}</span>
            <Sparkles className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
