'use client';

import Link from 'next/link';
import { Camera, ArrowRight, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { homepageContent } from '@/data/homepage-content';

export default function HomePhotoAnalysis() {
  const data = homepageContent.photoAnalysis;

  return (
    <section className="py-20 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface-bright border-y border-outline-variant/10 relative overflow-hidden" id="fotoanalyse">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-container-max-width mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left column: Step descriptions & Information */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-secondary font-label-md text-xs font-bold tracking-widest uppercase block">
            Schnell-Service
          </span>
          <h2 className="font-headline-lg text-3xl md:text-5xl font-extrabold text-on-surface leading-tight">
            {data.h2}
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            {data.text}
          </p>
          <p className="font-body-md text-sm text-on-surface-variant/80 border-l-2 border-secondary/30 pl-4 py-1 leading-relaxed">
            {data.subtext}
          </p>

          <div className="pt-6">
            <Link 
              href={data.cta.href}
              className="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-primary/95 px-7 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-xl transition-all hover:translate-y-[-1px]"
            >
              <Camera className="w-4 h-4" />
              <span>{data.cta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-on-surface-variant/75 italic mt-3">
              {data.microcopy}
            </p>
          </div>
        </div>

        {/* Right column: Steps cards inside glassmorphism container */}
        <div className="lg:col-span-6">
          <div className="bg-white/40 backdrop-blur-xl border border-outline-variant/40 rounded-3xl p-8 md:p-10 shadow-2xl relative">
            <div className="absolute top-[-15px] left-8 bg-secondary text-on-secondary px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
              In nur 2 Minuten erledigt
            </div>

            <div className="space-y-6 pt-4">
              {data.steps.map((step, index) => (
                <div key={index} className="flex gap-4 items-start group">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5 border border-primary/20">
                    {index + 1}
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-headline-sm text-sm md:text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                      {step}
                    </p>
                    <span className="text-xs text-on-surface-variant/80">Einfach, schnell & unverbindlich</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Note Badge */}
            <div className="mt-8 border-t border-outline-variant/20 pt-6 flex items-center gap-3 text-xs text-on-surface-variant leading-relaxed">
              <ClipboardCheck className="w-5 h-5 text-secondary flex-shrink-0" />
              <span>Ihre hochgeladenen Fotos werden absolut vertraulich behandelt und ausschliesslich für Ihre Parkettpflege-Analyse genutzt.</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
