'use client';

import FAQAccordion from '@/components/FAQAccordion';
import { FAQItem, generalFaqs } from '@/data/faqs';

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
}

export default function FAQSection({
  title = "Häufig gestellte Fragen",
  subtitle = "Alles Wissenswerte zur Parkettpflege, Aufbereitung und Reinigung.",
  faqs = generalFaqs
}: FAQSectionProps) {
  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop bg-surface" id="faq">
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
         <div className="text-center mb-16">
          <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Fragen & Antworten</span>
          <h2 className="font-headline-lg text-headline-lg mb-4">{title}</h2>
          {subtitle && (
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}
