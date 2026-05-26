import { Metadata } from 'next';
import { problems } from '@/data/problems';
import HeroSection from '@/components/sections/HeroSection';
import CTABanner from '@/components/sections/CTABanner';
import InteractiveGuide from '@/components/InteractiveGuide';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ratgeber & Hilfe | Parkett-Pflege.ch',
  description: 'Ratgeber für Parkett: Kratzer, Wasserflecken, stumpfe Böden. Wir erklären die Ursachen und wie Sie Ihren Holzboden richtig pflegen und reparieren.',
};

export default function RatgeberHubPage() {
  return (
    <>
      <HeroSection 
        label="Tipps & Erste Hilfe"
        title="Parkett Ratgeber"
        description="Lernen Sie, wie Sie Wasserflecken entfernen, Kratzer kaschieren und Ihren Boden optimal pflegen. Oder nutzen Sie direkt unseren KI-Parkettcheck für eine Diagnose."
        backgroundImageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCRCeQlyl_ZrejbSyV0FunoFKwjkjKCeGvMY0CVKnU_4UOB-wMPEUFxPaEpuoEiEPlWTqsHRBHt7RBIBjGD_V9XVd4aaNOhqW5kra7KEBuMWuKXU0Z93pk65SyPuGBA6koofeZTFytJWKy-XVBRKOQhaNR1AaiRM03RDkyrXRExayAqviHQUWUtMh6bKKjZ_v37zZ8R9kqqSpWXjLJjqVOHcVYyASFJLbqlMprHcV1j-0N1QFmNPc9znpBaYlzZEESAebodotlZOmU"
        showAIAdvisor={true}
        primaryButtonText="Zum KI-Ratgeber"
        primaryButtonHref="#ai-check"
      />

      {/* Articles Grid */}
      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="font-headline-md text-3xl md:text-4xl text-on-surface">Alle Artikel & Lösungen</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {problems.map((problem) => (
              <Link href={`/probleme/${problem.slug}`} key={problem.slug} className="group flex flex-col bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/30 hover:border-secondary/50 hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={problem.imageUrl} 
                    alt={problem.h1} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-headline-sm text-xl mb-3 text-on-surface group-hover:text-secondary transition-colors">
                    {problem.h1}
                  </h3>
                  <p className="text-on-surface-variant font-body-md line-clamp-3 mb-6 flex-grow">
                    {problem.intro}
                  </p>
                  <div className="flex items-center gap-2 text-secondary font-label-md uppercase tracking-widest text-sm group-hover:gap-3 transition-all">
                    Beitrag lesen <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Check Component directly embedded for ease */}
      <section id="ai-check" className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline-md text-3xl md:text-5xl mb-4">Probleme direkt analysieren</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Keine Lust zu lesen? Starten Sie den interaktiven Diagnose-Check.
            </p>
          </div>
          <InteractiveGuide />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
