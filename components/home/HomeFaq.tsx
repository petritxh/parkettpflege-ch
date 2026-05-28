'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { homepageContent } from '@/data/homepage-content';

export default function HomeFaq() {
  const data = homepageContent.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="py-20 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="faq-section">
      <div className="max-w-container-max-width mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-secondary font-label-md text-xs font-bold tracking-widest uppercase block">
            Fragen & Antworten
          </span>
          <h2 className="font-headline-lg text-3xl md:text-5xl font-extrabold text-on-surface">
            {data.h2}
          </h2>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Hier finden Sie schnelle Antworten auf die wichtigsten Fragen zur Pflege, Aufbereitung und Reparatur von Parkettböden.
          </p>
        </div>

        {/* FAQ Accordion List - Centered container */}
        <div className="max-w-3xl mx-auto space-y-4">
          {data.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden transition-all duration-300 hover:border-primary/20 shadow-sm"
              >
                
                {/* Trigger Button */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center w-full px-6 py-5.5 text-left font-bold text-sm md:text-base text-on-surface transition-colors hover:text-primary gap-4"
                >
                  <div className="flex gap-3 items-center">
                    <HelpCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span>{item.question}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-on-surface-variant transform transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>

                {/* Content body with responsive transition */}
                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100 border-t border-outline-variant/10' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 py-5 text-sm text-on-surface-variant leading-relaxed">
                    {item.answer}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
