'use client';

import { homepageContent } from '@/data/homepage-content';

export default function HomeProcess() {
  const data = homepageContent.process;

  return (
    <section className="py-20 md:py-24 bg-surface-container-lowest" id="ablauf">
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-secondary font-label-md text-xs font-bold tracking-widest uppercase block">
            Ablauf & Planung
          </span>
          <h2 className="font-headline-lg text-3xl md:text-5xl font-extrabold text-on-surface">
            {data.h2}
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
            {data.intro}
          </p>
        </div>

        {/* Process Stepper Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl p-8 border border-outline-variant/20 flex gap-5 relative group"
            >
              {/* Number overlay */}
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-headline-sm text-xl font-bold border border-primary/20 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300 select-none">
                {step.step}
              </div>

              {/* Text */}
              <div className="space-y-2 text-left">
                <h4 className="font-headline-sm text-base md:text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                  {step.title}
                </h4>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  {step.text}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
