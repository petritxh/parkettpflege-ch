'use client';

import Link from 'next/link';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';
import { homepageContent } from '@/data/homepage-content';

export default function HomeServiceArea() {
  const data = homepageContent.serviceArea;

  return (
    <section className="py-20 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="service-gebiet">
      <div className="max-w-container-max-width mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-secondary font-label-md text-xs font-bold tracking-widest uppercase block">
              Regionaler Partner
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

            <div className="pt-4">
              <Link 
                href={data.cta.href}
                className="inline-flex items-center gap-2 bg-primary text-on-primary hover:bg-primary/95 px-7 py-4 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all hover:translate-y-[-1px]"
              >
                <span>{data.cta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Grid list of municipalities with custom map icons */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-outline-variant/30 rounded-3xl p-8 md:p-10 shadow-md">
              <span className="text-xs text-secondary font-bold uppercase tracking-wider block mb-6 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-primary" />
                Einsatzgebiete im Kanton Zürich (Keine Anfahrtskosten)
              </span>

              {/* Responsive Grid representing municipalities */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {data.municipalities.map((city, idx) => {
                  // Format the dynamic dynamic V5 municipality slug
                  const formattedSlug = city.toLowerCase()
                    .replace(/ü/g, 'ue')
                    .replace(/ö/g, 'oe')
                    .replace(/ä/g, 'ae');
                  const municipalityHref = `/zuerich/parkettpflege-${formattedSlug}`;

                  return (
                    <Link 
                      key={idx}
                      href={municipalityHref}
                      className="flex items-center gap-2.5 px-3 py-2 hover:bg-surface-variant rounded-xl text-on-surface text-xs font-semibold hover:text-primary transition-all group"
                    >
                      <MapPin className="w-3.5 h-3.5 text-secondary group-hover:text-primary flex-shrink-0" />
                      <span className="truncate">{city}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Grid disclaimer Footer */}
              <div className="mt-8 border-t border-outline-variant/20 pt-6 text-[11px] text-on-surface-variant/80 leading-relaxed text-center">
                Ihre Ortschaft ist nicht gelistet? Keine Sorge. Wir betreuen den gesamten Grossraum und Kanton Zürich. Kontaktieren Sie uns einfach!
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
