'use client';

import { CheckCircle } from 'lucide-react';
import { homepageContent } from '@/data/homepage-content';

export default function HomeTrustBar() {
  const trustBar = homepageContent.trustBar;

  return (
    <section className="py-8 bg-surface-container border-b border-outline-variant/30">
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        
        {/* Short Text */}
        <p className="font-body-md text-sm text-on-surface-variant font-medium max-w-xl xl:mb-0 leading-relaxed text-center xl:text-left">
          {trustBar.shortText}
        </p>

        {/* Dynamic Chips list */}
        <div className="flex flex-wrap justify-center xl:justify-end gap-3.5">
          {trustBar.items.map((item, index) => (
            <div 
              key={index}
              className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-outline-variant/40 px-4 py-2 rounded-xl text-xs font-semibold text-on-surface shadow-sm"
            >
              <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
