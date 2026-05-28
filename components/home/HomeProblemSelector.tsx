'use client';

import Link from 'next/link';
import { Eye, Droplet, Sparkles, AlertTriangle, CloudRain, HelpCircle, ArrowRight } from 'lucide-react';
import { homepageContent } from '@/data/homepage-content';

export default function HomeProblemSelector() {
  const data = homepageContent.problemSelector;

  // Icon mapping
  const icons = [
    <Sparkles className="w-5 h-5 text-primary" key={0} />,
    <Droplet className="w-5 h-5 text-primary" key={1} />,
    <AlertTriangle className="w-5 h-5 text-primary" key={2} />,
    <CloudRain className="w-5 h-5 text-primary" key={3} />,
    <Eye className="w-5 h-5 text-primary" key={4} />,
    <HelpCircle className="w-5 h-5 text-secondary" key={5} />
  ];

  return (
    <section className="py-20 md:py-24 bg-surface" id={data.anchor}>
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-secondary font-label-md text-xs font-bold tracking-widest uppercase block">
            Schadensanalyse
          </span>
          <h2 className="font-headline-lg text-3xl md:text-5xl font-extrabold text-on-surface">
            {data.h2}
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            {data.intro}
          </p>
        </div>

        {/* 3x2 Grid for Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.cards.map((card, index) => {
            const isHighlighted = index === 5; // Highlight the "Ich bin unsicher" card
            return (
              <div 
                key={index}
                className={`rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] ${
                  isHighlighted 
                    ? 'bg-secondary-container/20 border-secondary/30 shadow-md shadow-secondary/5' 
                    : 'bg-white border-outline-variant/30 hover:border-primary/20'
                }`}
              >
                <div className="space-y-4">
                  {/* Card Icon Header */}
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-sm ${
                    isHighlighted ? 'bg-secondary/10 border-secondary/20' : 'bg-surface border-outline-variant/30'
                  }`}>
                    {icons[index] || icons[5]}
                  </div>

                  <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                    {card.title}
                  </h3>

                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    {card.text}
                  </p>
                </div>

                <div className="pt-6">
                  <Link 
                    href={card.href}
                    className={`inline-flex items-center gap-1.5 font-bold text-sm transition-all group ${
                      isHighlighted ? 'text-secondary hover:text-primary' : 'text-primary hover:text-primary-hover'
                    }`}
                  >
                    <span>{card.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
