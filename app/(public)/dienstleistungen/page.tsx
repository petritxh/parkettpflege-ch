import { Metadata } from 'next';
import { services } from '@/data/services';
import HeroSection from '@/components/sections/HeroSection';
import CTABanner from '@/components/sections/CTABanner';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Alle Dienstleistungen | Parkett-Pflege.ch',
  description: 'Übersicht unserer Parkett-Dienstleistungen: Schleifen, Ölen, Versiegeln, Reinigen und Reparieren. Wir sind Ihr Fachbetrieb.',
};

export default function ServicesHubPage() {
  return (
    <>
      <HeroSection 
        label="Unser Angebot"
        title="Ihre Experten für Parkettpflege und Sanierung"
        description="Von der sanften Tiefenreinigung bis zum staubfreien Komplettschliff. Entdecken Sie unsere Service-Pakete und Einzelleistungen für einen langlebigen Holzboden."
        backgroundImageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDpu93OtXlPyxw3Fh8XWXP1eiKLfPGJzH5teHgLuKEiZXmrZSGLW-Zf--BKj2c1SGG0cTw1bVAUoEuxJq99uOwlEMNCxltT8xpWJ3b545ACcGEHH94IcFZiT_MlZE4yrHr-Shf7kC-aFN5H2JKU-OfZq1NYdtr7HtpmOpyewHaiUZVYrZD-YC9dEBzkkxnO__jrSZEuAi8Jf2BmuhyoQ6Fdue3u5I6TKtLbok4LWAcb66F-omZgTyn5UzsFFufhqcIuIMw0wcuG9H8"
        showAIAdvisor={true}
        primaryButtonText="Kostenlose Offerte"
        primaryButtonHref="#estimator"
      />

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link href={`/${service.slug}`} key={service.slug} className="group flex flex-col bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/30 hover:border-secondary/50 hover:shadow-xl transition-all duration-300">
                <div className="relative h-60 w-full overflow-hidden">
                  <Image 
                    src={service.imageUrl} 
                    alt={service.h1} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <h2 className="absolute bottom-6 left-6 right-6 font-headline-sm text-2xl text-white drop-shadow-md">
                    {service.h1}
                  </h2>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-on-surface-variant font-body-md line-clamp-3 mb-6 flex-grow">
                    {service.intro}
                  </p>
                  <div className="flex items-center gap-2 text-secondary font-label-md uppercase tracking-widest text-sm group-hover:gap-3 transition-all">
                    Details ansehen <ArrowRight className="w-4 h-4" />
                  </div>
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
