'use client';

import Link from 'next/link';
import { Calculator, ArrowRight, Table } from 'lucide-react';
import { homepageContent } from '@/data/homepage-content';

export default function HomeCostTeaser() {
  const data = homepageContent.costTeaser;

  return (
    <section className="py-20 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface" id="kosten-teaser">
      <div className="max-w-container-max-width mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-secondary font-label-md text-xs font-bold tracking-widest uppercase block">
            Preise & Transparenz
          </span>
          <h2 className="font-headline-lg text-3xl md:text-5xl font-extrabold text-on-surface">
            {data.h2}
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            {data.intro}
          </p>
        </div>

        {/* 3 Columns Cost Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.cards.map((card, index) => {
            const isMiddle = index === 1; // style slightly different or keep consistent
            return (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:border-secondary/20"
              >
                <div className="space-y-4">
                  <span className="text-xs text-secondary font-bold uppercase tracking-wider block">Option 0{index + 1}</span>
                  <h3 className="font-headline-sm text-xl font-bold text-on-surface">{card.title}</h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{card.text}</p>
                </div>

                <div className="pt-8 border-t border-outline-variant/10 mt-6">
                  <Link 
                    href={card.href}
                    className="inline-flex items-center gap-1.5 font-bold text-sm text-primary hover:text-primary-hover group"
                  >
                    <span>{card.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Cost Calculator Callout */}
        <div className="bg-gradient-to-r from-surface-container-low to-surface-container-high border border-outline-variant/30 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
          <div className="space-y-3 text-left max-w-lg">
            <h4 className="font-headline-md text-2xl font-bold text-on-surface flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary" />
              Ermitteln Sie die Kosten sofort online
            </h4>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              {data.microcopy}
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <Link 
              href={data.mainCta.href}
              className="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-primary/95 px-8 py-4 rounded-2xl font-bold text-sm shadow-md shadow-primary/10 hover:shadow-lg transition-all hover:translate-y-[-1px]"
            >
              <Calculator className="w-4 h-4" />
              <span>{data.mainCta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
