'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { homepageContent } from '@/data/homepage-content';

export default function HomeServices() {
  const data = homepageContent.services;

  return (
    <section className="py-20 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="leistungen">
      <div className="max-w-container-max-width mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-secondary font-label-md text-xs font-bold tracking-widest uppercase block">
            Professionelle Handwerkskunst
          </span>
          <h2 className="font-headline-lg text-3xl md:text-5xl font-extrabold text-on-surface">
            {data.h2}
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            {data.intro}
          </p>
        </div>

        {/* 3x2 Grid for Commercial Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.cards.map((card, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:border-secondary/20"
            >
              <div className="space-y-5">
                
                {/* Title */}
                <h3 className="font-headline-sm text-xl font-bold text-on-surface">
                  {card.title}
                </h3>

                {/* Text */}
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  {card.text}
                </p>

                {/* Specific Benefit highlight */}
                <div className="flex gap-2.5 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/20">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-on-surface-variant/80 font-bold uppercase tracking-wide">Ihr Vorteil</span>
                    <p className="text-xs text-on-surface font-semibold leading-normal">{card.benefit}</p>
                  </div>
                </div>

              </div>

              {/* Link CTA */}
              <div className="pt-8 border-t border-outline-variant/10 mt-6">
                <Link 
                  href={card.href}
                  className="inline-flex items-center gap-1.5 font-bold text-sm text-primary hover:text-primary-hover group"
                >
                  <span>{card.title} lassen</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
