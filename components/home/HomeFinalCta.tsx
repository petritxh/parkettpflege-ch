'use client';

import Link from 'next/link';
import { Camera, Calculator, Mail, ArrowRight } from 'lucide-react';
import { homepageContent } from '@/data/homepage-content';

export default function HomeFinalCta() {
  const data = homepageContent.finalCta;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-t from-surface-bright via-surface to-surface-container-lowest border-t border-outline-variant/10 relative overflow-hidden" id="abschluss-cta">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop text-center space-y-8 relative z-10">
        
        <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary border border-secondary/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          Jetzt den ersten Schritt machen
        </span>

        <h2 className="font-headline-lg text-3xl md:text-5xl font-extrabold text-on-surface leading-tight max-w-2xl mx-auto">
          {data.h2}
        </h2>

        <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          {data.text}
        </p>

        {/* Action CTAs Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 pt-4">
          <Link 
            href={data.primaryCta.href}
            className="flex items-center justify-center gap-2 bg-primary text-on-primary hover:bg-primary/95 px-7 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:translate-y-[-1px] transition-all"
          >
            <Camera className="w-4 h-4" />
            {data.primaryCta.label}
          </Link>
          
          <Link 
            href={data.secondaryCta.href}
            className="flex items-center justify-center gap-2 border border-outline text-on-surface hover:bg-surface-variant px-7 py-4 rounded-2xl font-bold text-sm hover:translate-y-[-1px] transition-all"
          >
            <Calculator className="w-4 h-4 text-secondary" />
            {data.secondaryCta.label}
          </Link>

          <Link 
            href={data.tertiaryCta.href}
            className="flex items-center justify-center gap-2 bg-white hover:bg-surface-variant border border-outline px-7 py-4 rounded-2xl font-bold text-sm hover:translate-y-[-1px] transition-all"
          >
            <Mail className="w-4 h-4 text-primary" />
            {data.tertiaryCta.label}
          </Link>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-on-surface-variant font-medium">
            {data.microcopy}
          </p>
          <span className="block text-[11px] text-on-surface-variant/80">Alle Online-Tools sind komplett kostenfrei und ohne Angabe von Zahlungsdaten nutzbar.</span>
        </div>

      </div>
    </section>
  );
}
