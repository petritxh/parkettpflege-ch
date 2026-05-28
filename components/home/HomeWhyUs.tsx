'use client';

import { ShieldCheck, Trees, Info, MapPin, Eye, MessageSquare } from 'lucide-react';
import { homepageContent } from '@/data/homepage-content';

export default function HomeWhyUs() {
  const data = homepageContent.whyUs;

  // Icon array mapping
  const icons = [
    <ShieldCheck className="w-6 h-6 text-primary" key={0} />,
    <Trees className="w-6 h-6 text-primary" key={1} />,
    <Info className="w-6 h-6 text-primary" key={2} />,
    <MapPin className="w-6 h-6 text-primary" key={3} />,
    <Eye className="w-6 h-6 text-primary" key={4} />,
    <MessageSquare className="w-6 h-6 text-primary" key={5} />
  ];

  return (
    <section className="py-20 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface" id="warum-uns">
      <div className="max-w-container-max-width mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-secondary font-label-md text-xs font-bold tracking-widest uppercase block">
            Unsere Philosophie
          </span>
          <h2 className="font-headline-lg text-3xl md:text-5xl font-extrabold text-on-surface">
            {data.h2}
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            {data.intro}
          </p>
        </div>

        {/* 3x2 Grid for Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:border-primary/10 text-left"
            >
              <div className="space-y-4">
                {/* Icon box */}
                <div className="w-12 h-12 rounded-2xl bg-surface border border-outline-variant/30 flex items-center justify-center shadow-sm">
                  {icons[index] || icons[0]}
                </div>
                
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                  {benefit.title}
                </h3>
                
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  {benefit.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
