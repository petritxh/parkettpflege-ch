'use client';

import Link from 'next/link';
import { ArrowRight, HelpCircle, ShieldAlert } from 'lucide-react';
import { homepageContent } from '@/data/homepage-content';

export default function HomeProblemCases() {
  const data = homepageContent.problemCases;

  return (
    <section className="py-20 md:py-24 bg-surface-container-lowest" id="typische-probleme">
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-secondary font-label-md text-xs font-bold tracking-widest uppercase block">
            Häufige Schadensbilder
          </span>
          <h2 className="font-headline-lg text-3xl md:text-5xl font-extrabold text-on-surface">
            {data.h2}
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            {data.intro}
          </p>
        </div>

        {/* 2-Column Responsive grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {data.list.map((item, index) => (
            <Link 
              key={index}
              href={item.href}
              className="bg-white rounded-3xl p-6 border border-outline-variant/30 flex items-center justify-between transition-all duration-300 hover:shadow-md hover:translate-y-[-1px] hover:border-primary/20 group"
            >
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-2xl bg-surface border border-outline-variant/30 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <ShieldAlert className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-0.5 text-left">
                  <h4 className="font-headline-sm text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed max-w-xs md:max-w-sm">
                    {item.text}
                  </p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant group-hover:text-primary transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom selector block link */}
        <div className="text-center">
          <Link 
            href={data.cta.href}
            className="inline-flex items-center gap-1.5 bg-secondary text-on-secondary hover:bg-secondary/95 px-6 py-3.5 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <span>{data.cta.label}</span>
            <HelpCircle className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
