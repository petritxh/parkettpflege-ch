'use client';

import Link from 'next/link';
import { Camera, Calculator, ChevronRight, ShieldCheck } from 'lucide-react';
import { homepageContent } from '@/data/homepage-content';

export default function HomeHero() {
  const hero = homepageContent.hero;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface-bright via-surface to-surface-container-lowest py-20 md:py-28 px-margin-mobile md:px-margin-desktop border-b border-outline-variant/10">
      
      {/* Dynamic ambient blur circles in background */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-container-max-width mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left column: Text Content */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary border border-secondary/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            {hero.eyebrow}
          </span>

          <h1 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface leading-[1.1] max-w-2xl">
            {hero.h1}
          </h1>

          <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed max-w-xl">
            {hero.subheadline}
          </p>

          <p className="font-body-md text-sm text-on-surface-variant/80 border-l-2 border-secondary/30 pl-4 py-1.5 leading-relaxed max-w-xl">
            {hero.extendedText}
          </p>

          {/* Action CTAs Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
            <Link 
              href={hero.primaryCta.href}
              className="flex items-center justify-center gap-2 bg-primary text-on-primary hover:bg-primary/95 px-7 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:translate-y-[-1px] transition-all"
            >
              <Camera className="w-4 h-4" />
              {hero.primaryCta.label}
            </Link>
            
            <Link 
              href={hero.secondaryCta.href}
              className="flex items-center justify-center gap-2 border border-outline text-on-surface hover:bg-surface-variant px-7 py-4 rounded-2xl font-bold text-sm hover:translate-y-[-1px] transition-all"
            >
              <Calculator className="w-4 h-4 text-secondary" />
              {hero.secondaryCta.label}
            </Link>

            <Link 
              href={hero.tertiaryLink.href}
              className="flex items-center justify-center gap-1 text-secondary hover:text-primary font-bold text-sm px-4 py-4 transition-colors group"
            >
              {hero.tertiaryLink.label}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-xs text-on-surface-variant/75 italic pt-1">
            {hero.microcopy}
          </p>

        </div>

        {/* Right column: Premium Hero Visual Card / Trust Panel */}
        <div className="lg:col-span-5">
          <div className="bg-white/40 backdrop-blur-xl border border-outline-variant/40 rounded-3xl p-8 shadow-2xl relative">
            <div className="absolute top-3 right-3 bg-secondary/15 text-secondary p-2 rounded-2xl font-bold text-[10px] tracking-wide uppercase select-none border border-secondary/10">
              Zürich & Umgebung
            </div>

            <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Ihre Vorteile bei parkett-pflege.ch
            </h3>

            <div className="space-y-4">
              {hero.trustChips.map((chip, index) => (
                <div key={index} className="flex items-center gap-3.5 bg-white/70 border border-outline-variant/30 px-4.5 py-3 rounded-2xl shadow-sm hover:bg-white transition-all">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="font-label-md text-sm text-on-surface font-semibold">{chip}</span>
                </div>
              ))}
            </div>

            {/* Decorative wood-grain subtle mockup placeholder */}
            <div className="mt-8 border-t border-outline-variant/20 pt-6 flex items-center justify-between text-xs text-on-surface-variant">
              <span>Spezialbetrieb für Holzfußböden</span>
              <span className="font-bold text-primary">Est. in Switzerland</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
