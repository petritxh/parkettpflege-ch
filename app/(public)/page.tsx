'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Award,
  AlertTriangle,
  MapPin
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

// Common problems list with their respective V5 slugs
const commonProblems = [
  {
    title: 'Tiefe Kratzer',
    description: 'Durch Haustiere oder Möbelstücke.',
    slug: 'tiefe-kratzer-parkett',
    icon: '🐾'
  },
  {
    title: 'Wasserflecken',
    description: 'Durch undichte Blumentöpfe oder Nässe.',
    slug: 'wasserflecken-parkett',
    icon: '💧'
  },
  {
    title: 'Schwarze Flecken',
    description: 'Reaktionsflecken auf Eichenholz.',
    slug: 'schwarze-flecken-parkett',
    icon: '⚫'
  },
  {
    title: 'Grau & Stumpf',
    description: 'Ausgelaugte Ölschicht oder abgenutzt.',
    slug: 'parkett-grau-und-stumpf',
    icon: '🪵'
  },
  {
    title: 'Falsche Reinigung',
    description: 'Klebriger Boden oder Schlieren.',
    slug: 'parkett-nach-falscher-reinigung',
    icon: '🧼'
  },
  {
    title: 'Mieterwechsel',
    description: 'Auffrischung vor Wohnungsabgabe.',
    slug: 'parkett-nach-mieterwechsel',
    icon: '🔑'
  }
];

// Service mapping to V5 slugs
const serviceV5Mapping: { [key: string]: string } = {
  'parkettpflege': 'parkett-auffrischen-zuerich',
  'parkettreinigung': 'parkett-tiefenreinigung-zuerich',
  'parkett-schleifen': 'parkett-schleifen-zuerich',
  'parkett-oelen': 'parkett-oelen-zuerich',
  'parkett-versiegeln': 'parkett-versiegeln-zuerich',
  'parkett-reparatur': 'parkett-reparieren-zuerich'
};

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Trust badging & Certifications */}
      <section className="py-8 bg-surface border-b border-outline-variant/30">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <p className="text-center font-label-md text-sm text-on-surface-variant uppercase tracking-widest mb-6">Zertifizierte Schweizer Qualität</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-75 hover:opacity-100 transition-all duration-500">
            <div className="flex items-center gap-2 font-headline-sm text-base md:text-lg font-semibold"><CheckCircle2 className="w-5 h-5 text-primary"/> Swiss Parkett Verband</div>
            <div className="flex items-center gap-2 font-headline-sm text-base md:text-lg font-semibold"><Leaf className="w-5 h-5 text-primary"/> FSC® Zertifiziert</div>
            <div className="flex items-center gap-2 font-headline-sm text-base md:text-lg font-semibold"><ShieldCheck className="w-5 h-5 text-primary"/> Meisterbetrieb</div>
            <div className="flex items-center gap-2 font-headline-sm text-base md:text-lg font-semibold"><CheckCircle2 className="w-5 h-5 text-primary"/> Bau-Garantie</div>
          </div>
        </div>
      </section>

      {/* Core Services Section with V5 Links */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-low" id="services">
        <div className="max-w-container-max-width mx-auto">
          <div className="text-center mb-16">
            <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Handwerk aus Meisterhand</span>
            <h2 className="font-headline-lg text-headline-lg mb-4">Professionelle Parkettleistungen</h2>
            <div className="h-1 w-24 bg-secondary mx-auto mb-4"></div>
            <p className="max-w-2xl mx-auto font-body-lg text-on-surface-variant">
              Wir sorgen für den perfekten Werterhalt Ihres Holzbodens. Erhalten Sie bei uns die beste Qualität für jede Parkettbehandlung in der Region Zürich.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => {
              const v5Slug = serviceV5Mapping[service.slug] || `${service.slug}-zuerich`;
              return (
                <div key={service.slug} className="bg-white rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 border border-outline-variant/30 hover:border-primary/30 flex flex-col">
                  <div className="h-60 overflow-hidden relative shrink-0">
                    <Image 
                      src={service.imageUrl} 
                      alt={service.h1} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow text-left">
                    <h3 className="font-headline-sm text-2xl mb-4 group-hover:text-primary transition-colors">{service.h1.replace('Die richtige ', '').replace(' für ein langes leben ihres bodens', '')}</h3>
                    <div className="flex-grow flex flex-col">
                      <p className="font-body-md text-on-surface-variant mb-6 flex-grow leading-relaxed">
                        {service.intro.substring(0, 115)}...
                      </p>
                      <Link 
                        className="text-primary font-label-md text-label-md flex items-center gap-2 hover:gap-3 transition-all w-fit mt-auto" 
                        href={`/leistungen/${v5Slug}`}
                      >
                        Service aufrufen <ArrowRight className="w-4 h-4"/>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Problem Diagnostic Center (NEW) */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface" id="problem-center">
        <div className="max-w-container-max-width mx-auto text-center">
          <div className="mb-16">
            <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Schadens- & Problem-Zentrum</span>
            <h2 className="font-headline-lg text-headline-lg mb-4">Hat Ihr Parkett einen Schaden erlitten?</h2>
            <p className="max-w-2xl mx-auto font-body-lg text-on-surface-variant">
              Wählen Sie Ihr konkretes Problem aus, um direkt Erste-Hilfe-Schritte, Ursachenanalysen und empfohlene Profilösungen zu erhalten.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            {commonProblems.map((prob) => (
              <Link 
                key={prob.slug} 
                href={`/problemfaelle/${prob.slug}`}
                className="bg-surface-container-low border border-outline-variant/30 rounded-3xl p-6 hover:border-primary/50 hover:bg-white hover:shadow-xl transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="text-4xl p-2 bg-surface-container-high rounded-2xl shrink-0 group-hover:scale-110 transition-transform">
                  {prob.icon}
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg mb-1 group-hover:text-primary transition-colors flex items-center gap-1">
                    {prob.title} <ChevronRight className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-all" />
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{prob.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-low" id="gallery">
        <div className="max-w-container-max-width mx-auto">
           <div className="text-center mb-16">
            <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Vorher & Nachher</span>
            <h2 className="font-headline-lg text-headline-lg mb-4">Erstklassige Ergebnisse</h2>
          </div>
          <Gallery cases={cases} categories={CATEGORIES} woodTypes={WOOD_TYPES} />
        </div>
      </section>

      {/* AI Estimator & Interactive Guide block */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="ratgeber">
        <div className="max-w-4xl mx-auto">
           <div className="text-center mb-16">
            <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Intelligenter Assistent</span>
            <h2 className="font-headline-lg text-headline-lg mb-4 text-on-surface">Digitaler Parkett-Check</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Beantworten Sie 4 kurze Fragen und erhalten Sie sofort eine massgeschneiderte Empfehlung zu Reinigungsmitteln, Pflegeprodukten und möglichen Reparaturmethoden von Parkett-Pflege.ch.
            </p>
          </div>
          <InteractiveGuide />
        </div>
      </section>

      {/* Municipalities Local Trust (Goldküste, Limmattal, Zürich-Stadt) */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-bright" id="locations-silo">
        <div className="max-w-container-max-width mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Region Zürich & Umgebung</span>
              <h2 className="font-headline-lg text-3xl md:text-5xl mb-6">Lokaler Partner vor Ort</h2>
              <p className="font-body-lg text-on-surface-variant mb-8 leading-relaxed">
                Wir sind Ihr verlässlicher Parkettpflege-Fachbetrieb im Kanton Zürich. Von der Goldküste über das Limmattal bis in das Zürcher Oberland bedienen wir unsere Privat- und Gewerbekunden ohne zusätzliche Anfahrtskosten. 
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm font-semibold">
                <Link href="/zuerich/parkettpflege-duebendorf" className="flex items-center gap-2 text-on-surface-variant hover:text-primary"><MapPin className="w-4 h-4 text-secondary"/> Dübendorf</Link>
                <Link href="/zuerich/parkettpflege-horgen" className="flex items-center gap-2 text-on-surface-variant hover:text-primary"><MapPin className="w-4 h-4 text-secondary"/> Horgen</Link>
                <Link href="/zuerich/parkettpflege-kuesnacht" className="flex items-center gap-2 text-on-surface-variant hover:text-primary"><MapPin className="w-4 h-4 text-secondary"/> Küsnacht</Link>
                <Link href="/zuerich/parkettpflege-uster" className="flex items-center gap-2 text-on-surface-variant hover:text-primary"><MapPin className="w-4 h-4 text-secondary"/> Uster</Link>
                <Link href="/zuerich/parkettpflege-winterthur" className="flex items-center gap-2 text-on-surface-variant hover:text-primary"><MapPin className="w-4 h-4 text-secondary"/> Winterthur</Link>
                <Link href="/zuerich/parkettpflege-thalwil" className="flex items-center gap-2 text-on-surface-variant hover:text-primary"><MapPin className="w-4 h-4 text-secondary"/> Thalwil</Link>
              </div>

              <div className="flex flex-wrap gap-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-outline-variant shadow-sm text-secondary">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-label-md text-xs">Meisterqualität</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-outline-variant shadow-sm text-secondary">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-label-md text-xs">Staubfrei-Garantie</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-outline-variant shadow-sm text-secondary">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-label-md text-xs">Faire Festpreise</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl group border border-outline-variant/20">
              <Image 
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIrJs8BLeEeepjntbFA420wiHaTe7Xd14SEOSZnejBedGBQa_8eVy1QsvP-wIbE7WDE5_9lrOpa0Cf6qiFV98LZDBOyxB_F0zXU6-pqMpoaksVcsfiJULNi1vnFqd5ceW-DxijaxfuVbtOAchai80dsH5ANulOMqcr1LCJXtshJMRuAplCAo7Xo6FM_XF2zSpgxIQZEyOevY37e49jijR43rjhbpLU1KpAeZr2WMySKPuuJ2Gku6DUegb1yzgzZjMZ874yTxnOySg" 
                 alt="Parkettrenovierung Zürich" 
                 fill
                 className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-low" id="bewertungen">
        <div className="max-w-container-max-width mx-auto">
          <div className="text-center mb-12">
            <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Erfahrungsberichte</span>
            <h2 className="font-headline-lg text-headline-lg mb-4">Das sagen unsere Zürcher Kunden</h2>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <FAQSection />

      {/* Conversion Hub (Price Estimator Widget) */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-low" id="estimator">
          <div className="max-w-container-max-width mx-auto">
             <div className="text-center mb-12">
               <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Kosten-Kalkulator</span>
               <h2 className="font-headline-lg text-headline-lg mb-4">Unverbindliche Kostenschätzung</h2>
               <p className="max-w-xl mx-auto font-body-lg text-on-surface-variant">
                 Ermitteln Sie die Richtkosten für Ihr Vorhaben in weniger als 60 Sekunden und fordern Sie Ihr massgeschneidertes Festpreisangebot an.
               </p>
             </div>
             <PriceEstimator />
          </div>
      </section>

      <CTABanner />
    </>
  );
}
