'use client';

import Image from 'next/image';
import { 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

import { cases, CATEGORIES, WOOD_TYPES } from '@/data/cases';
import { testimonials } from '@/data/testimonials';
import { services } from '@/data/services';

import InteractiveGuide from '@/components/InteractiveGuide';
import Gallery from '@/components/Gallery';
import PriceEstimator from '@/components/PriceEstimator';
import TestimonialCarousel from '@/components/TestimonialCarousel';

import HeroSection from '@/components/sections/HeroSection';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Trusted Partners / Certifications */}
      <section className="py-8 bg-surface border-b border-outline-variant/30">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <p className="text-center font-label-md text-sm text-on-surface-variant uppercase tracking-widest mb-6">Zertifizierte Qualität & Partner</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-3 font-headline-sm text-[20px] font-semibold"><CheckCircle2 className="w-6 h-6 text-on-surface-variant"/> Swiss Parkett Verband</div>
            <div className="flex items-center gap-3 font-headline-sm text-[20px] font-semibold"><Leaf className="w-6 h-6 text-on-surface-variant"/> FSC® Zertifiziert</div>
            <div className="flex items-center gap-3 font-headline-sm text-[20px] font-semibold"><ShieldCheck className="w-6 h-6 text-on-surface-variant"/> Meisterbetrieb</div>
            <div className="flex items-center gap-3 font-headline-sm text-[20px] font-semibold"><CheckCircle2 className="w-6 h-6 text-on-surface-variant"/> Bau-Garantie</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-low" id="services">
        <div className="max-w-container-max-width mx-auto">
          <div className="text-center mb-16">
            <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Handwerk</span>
            <h2 className="font-headline-lg text-headline-lg mb-4">Unsere Leistungen</h2>
            <div className="h-1 w-24 bg-secondary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service) => (
              <div key={service.slug} className="bg-white rounded-xl overflow-hidden group hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-500 hover:-translate-y-2 border border-outline-variant/30 hover:border-secondary/40 flex flex-col">
                <div className="h-64 overflow-hidden relative shrink-0">
                  <Image 
                    src={service.imageUrl} 
                    alt={service.h1} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-8 flex flex-col flex-grow text-left">
                  <h3 className="font-headline-sm text-headline-sm mb-4">{service.h1}</h3>
                  <div className="flex-grow flex flex-col transition-transform duration-500 group-hover:-translate-y-1">
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                        {service.intro.substring(0, 120)}...
                    </p>
                    <a className="text-secondary font-label-md text-label-md flex items-center gap-2 hover:gap-4 transition-all w-fit" href={`/${service.slug}`}>
                        Mehr erfahren <ArrowRight className="w-[18px] h-[18px]"/>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Integration */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface" id="gallery">
        <div className="max-w-container-max-width mx-auto">
           <div className="text-center mb-16">
            <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Vorher & Nachher</span>
            <h2 className="font-headline-lg text-headline-lg mb-4">Unsere Ergebnisse</h2>
          </div>
          <Gallery cases={cases} categories={CATEGORIES} woodTypes={WOOD_TYPES} />
        </div>
      </section>

      {/* Interactive Guide / Ratgeber */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="ratgeber">
        <div className="max-w-4xl mx-auto">
           <div className="text-center mb-16">
            <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Interaktive Analyse</span>
            <h2 className="font-headline-lg text-headline-lg mb-4 text-on-surface">Parkett-Ratgeber</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Beantworten Sie 4 kurze Fragen und erhalten Sie eine massgeschneiderte Empfehlung zu Reinigungsmitteln, Pflegeprodukten und möglichen Reparaturmethoden für Ihren Boden.
            </p>
          </div>
          <InteractiveGuide />
        </div>
      </section>

      {/* Innovation Deep Dive */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-bright" id="process">
        <div className="max-w-container-max-width mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
            <div className="order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl group border border-outline-variant/20">
                    <Image 
                       src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIrJs8BLeEeepjntbFA420wiHaTe7Xd14SEOSZnejBedGBQa_8eVy1QsvP-wIbE7WDE5_9lrOpa0Cf6qiFV98LZDBOyxB_F0zXU6-pqMpoaksVcsfiJULNi1vnFqd5ceW-DxijaxfuVbtOAchai80dsH5ANulOMqcr1LCJXtshJMRuAplCAo7Xo6FM_XF2zSpgxIQZEyOevY37e49jijR43rjhbpLU1KpAeZr2WMySKPuuJ2Gku6DUegb1yzgzZjMZ874yTxnOySg" 
                       alt="Before restoration" 
                       fill
                       className="object-cover"
                    />
                    <div className="absolute inset-y-0 left-1/2 w-1 bg-white shadow-lg cursor-col-resize flex items-center justify-center">
                        <div className="bg-white rounded-full p-2 shadow-lg -translate-x-1/2 text-secondary ring-4 ring-secondary/10">
                            <span className="material-symbols-outlined"><ChevronRight className="w-5 h-5"/></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-1 lg:order-2">
                <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Detailverliebt</span>
                <h2 className="font-headline-lg text-headline-lg mb-6">Präzision bis ins kleinste Detail</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                    Unsere Arbeit basiert auf jahrzehntelanger Erfahrung und modernster Technologie. Wir garantieren ein staubfreies Erlebnis und verwenden ausschließlich nachhaltige Materialien zum Schutz Ihrer Gesundheit und der Umwelt.
                </p>
                
                <div className="flex flex-wrap gap-8">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-outline-variant shadow-sm text-secondary">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <span className="font-label-md text-label-md">Meisterbetrieb</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-outline-variant shadow-sm text-secondary">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <span className="font-label-md text-label-md">Staubfrei-Garantie</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-outline-variant shadow-sm text-secondary">
                            <Leaf className="w-8 h-8" />
                        </div>
                        <span className="font-label-md text-label-md">Nachhaltig</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-low" id="bewertungen">
        <div className="max-w-container-max-width mx-auto">
          <div className="text-center mb-12">
            <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Kundenstimmen</span>
            <h2 className="font-headline-lg text-headline-lg mb-4">Das sagen unsere Kunden</h2>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <FAQSection />

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-low" id="estimator">
          <div className="max-w-container-max-width mx-auto">
             <PriceEstimator />
          </div>
      </section>

      <CTABanner />
    </>
  );
}
