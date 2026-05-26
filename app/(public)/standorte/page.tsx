import { Metadata } from 'next';
import { locations } from '@/data/locations';
import HeroSection from '@/components/sections/HeroSection';
import CTABanner from '@/components/sections/CTABanner';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Standorte & Einsatzgebiete | Parkett-Pflege.ch',
  description: 'Wir schleifen und ölen Parkett in der ganzen Deutschschweiz. Zürich, Zug, Luzern, Aargau, Winterthur, Basel, Bern und St. Gallen.',
};

export default function StandorteHubPage() {
  return (
    <>
      <HeroSection 
        label="Lokal für Sie da"
        title="Unsere Einsatzgebiete"
        description="Egal ob in der Stadt oder auf dem Land – unsere Parkettprofis sind schnell und flexibel in der ganzen Deutschschweiz für Sie im Einsatz."
        backgroundImageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuADmDYLUFPdXz5Q4GDKThgWBBNR0gAwhs-BIDAz_OpiQonRVmzE-yxVa9WHEppwUsdg6IiImsD-W1X1jTwxGun3m9dvr5cZrpx0S2VxpZNHak_LnNaOXJmo2fzIjBkb2ms6eoDc1wabrcQ3Vi_3CpuoqKKlQDPWNUGwoLqOVW3ghIc__AECOsJEpNK8HGtGvEAztpD494bkpLEFnI0RKQhBMoajcvpVnRa_aHnUR_pe9L1mCoNOKnbDcixLaDbUhBPN9yX4IN1sbuA"
        showAIAdvisor={true}
        primaryButtonText="Verfügbarkeit prüfen"
        primaryButtonHref="/kontakt"
      />

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location) => (
              <Link href={`/standorte/${location.slug}`} key={location.slug} className="group bg-surface-container-low p-8 rounded-3xl border border-outline-variant/30 hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mb-6 transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-headline-sm text-2xl mb-2">{location.name}</h3>
                <p className="font-body-sm text-on-surface-variant group-hover:text-white/80 line-clamp-2 mb-6">
                  {location.intro}
                </p>
                <div className="mt-auto flex items-center gap-2 font-label-md uppercase tracking-widest text-xs text-primary group-hover:text-white group-hover:gap-3 transition-all">
                  Region ansehen <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
