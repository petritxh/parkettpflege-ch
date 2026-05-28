'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { homepageContent } from '@/data/homepage-content';

export default function HomeGuides() {
  const data = homepageContent.guides;

  return (
    <section className="py-20 md:py-24 bg-surface" id="ratgeber-teaser">
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-secondary font-label-md text-xs font-bold tracking-widest uppercase block">
            Wissen & Praxistipps
          </span>
          <h2 className="font-headline-lg text-3xl md:text-5xl font-extrabold text-on-surface">
            {data.h2}
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            {data.intro}
          </p>
        </div>

        {/* 2-Column Responsive list representation for articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {data.list.map((item, index) => (
            <Link 
              key={index}
              href={item.href}
              className="bg-white rounded-3xl p-6 border border-outline-variant/30 flex items-center justify-between transition-all duration-300 hover:shadow-md hover:translate-y-[-1px] hover:border-secondary/20 group"
            >
              <div className="flex gap-4 items-center text-left">
                <div className="w-10 h-10 rounded-2xl bg-surface border border-outline-variant/30 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-headline-sm text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed max-w-xs md:max-w-md">
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

        {/* Bottom CTA to all guides */}
        <div className="text-center">
          <Link 
            href={data.cta.href}
            className="inline-flex items-center gap-1 text-secondary hover:text-primary font-bold text-sm px-4 py-2 transition-colors group"
          >
            <span>{data.cta.label}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
