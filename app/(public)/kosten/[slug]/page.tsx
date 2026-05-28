import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import CTABanner from '@/components/sections/CTABanner';
import PriceEstimator from '@/components/PriceEstimator';
import { Check, ShieldAlert, Sparkles, Scale } from 'lucide-react';

import { getCostPageData } from '@/lib/seo-mapper';
import { getSeoCostPages } from '@/lib/seo-engine';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const costData = await getCostPageData(resolvedParams.slug);
  
  if (!costData) {
    return { title: 'Nicht gefunden' };
  }

  return {
    title: costData.metaTitle,
    description: costData.metaDescription,
  };
}

export async function generateStaticParams() {
  const pages = getSeoCostPages();
  return pages.map((page) => ({
    slug: page.slug.replace('/kosten/', ''),
  }));
}

export default async function CostPage({ params }: Props) {
  const resolvedParams = await params;
  const costData = await getCostPageData(resolvedParams.slug);

  if (!costData) {
    notFound();
  }

  const { prices, serviceTitle, factors, baseSlug } = costData;

  // Let's create some example calculations dynamically
  const calc1Area = 30;
  const calc2Area = 70;
  
  const calc1Min = calc1Area * prices.min;
  const calc1Max = calc1Area * prices.max;
  const calc2Min = calc2Area * prices.min;
  const calc2Max = calc2Area * prices.max;

  return (
    <>
      <HeroSection 
        label="Preise & Kosten"
        title={`Kosten für ${serviceTitle}`}
        description={`Transparente Preiskalkulationen, Kostenfaktoren und Beispiele für ${serviceTitle.toLowerCase()} in der Schweiz.`}
        backgroundImageUrl={costData.service.imageUrl}
        showAIAdvisor={false}
        primaryButtonText="Kosten kalkulieren"
        primaryButtonHref="#estimator"
      />

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-container-max-width mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Price Range Card */}
            <div className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant/30 text-center flex flex-col justify-between lg:col-span-1">
              <div>
                <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Richtpreis</span>
                <h3 className="font-headline-lg text-4xl mb-4">CHF {prices.min} – {prices.max}</h3>
                <p className="text-on-surface-variant font-body-md mb-6">pro {prices.unit} inkl. Anfahrt & Maschinen</p>
                <div className="h-0.5 bg-outline-variant/30 my-6"></div>
              </div>
              <ul className="space-y-3 text-left font-body-md text-on-surface-variant mb-8">
                <li className="flex gap-2 items-center"><Check className="w-5 h-5 text-success shrink-0" /> Inklusive MwSt.</li>
                <li className="flex gap-2 items-center"><Check className="w-5 h-5 text-success shrink-0" /> Staubfreies Absaugen</li>
                <li className="flex gap-2 items-center"><Check className="w-5 h-5 text-success shrink-0" /> Ökologische Öle/Lacke</li>
                <li className="flex gap-2 items-center"><Check className="w-5 h-5 text-success shrink-0" /> Lokale Schweizer Fachkräfte</li>
              </ul>
              <a href="#estimator" className="bg-secondary text-on-secondary w-full py-4 rounded-full font-label-md block hover:bg-secondary-hover transition-colors">
                Individuelle Offerte berechnen
              </a>
            </div>

            {/* Calculations Card */}
            <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 lg:col-span-2 text-left flex flex-col justify-between">
              <div>
                <h3 className="font-headline-sm text-2xl mb-6 flex items-center gap-2">
                  <Scale className="w-6 h-6 text-primary" /> Rechenbeispiele (Richtwerte)
                </h3>
                <p className="text-on-surface-variant font-body-md mb-8">
                  Hier finden Sie zwei typische Projektbeispiele für {serviceTitle.toLowerCase()}, um die Kostengrösseneinordnung besser einschätzen zu können:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20">
                    <h4 className="font-headline-sm text-lg mb-2">Beispiel 1: Wohnzimmer ({calc1Area}m²)</h4>
                    <p className="text-xs text-on-surface-variant mb-4">Kleinere Fläche, optimal bei minimaler Möblierung.</p>
                    <div className="flex justify-between items-center text-sm font-body-md text-on-surface-variant border-t border-outline-variant/20 pt-4">
                      <span>Kostenrahmen:</span>
                      <strong className="text-primary text-lg">CHF {calc1Min} – {calc1Max}.-</strong>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20">
                    <h4 className="font-headline-sm text-lg mb-2">Beispiel 2: Ganze Wohnung ({calc2Area}m²)</h4>
                    <p className="text-xs text-on-surface-variant mb-4">Mittelgrosse Wohnung, fliessende Übergänge.</p>
                    <div className="flex justify-between items-center text-sm font-body-md text-on-surface-variant border-t border-outline-variant/20 pt-4">
                      <span>Kostenrahmen:</span>
                      <strong className="text-primary text-lg">CHF {calc2Min} – {calc2Max}.-</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-primary-container/10 p-4 rounded-xl border border-primary/20 text-xs text-on-surface-variant flex gap-2 items-center">
                <ShieldAlert className="w-5 h-5 text-primary shrink-0" />
                <span><strong>Hinweis:</strong> Die tatsächlichen Kosten hängen von vielen Faktoren ab. Nutzen Sie unseren Rechner unten für ein präzises Angebot.</span>
              </div>
            </div>
          </div>

          {/* Cost Factors */}
          <div className="max-w-3xl mx-auto text-left mb-24">
            <h3 className="font-headline-sm text-3xl mb-8 flex items-center gap-2 text-on-surface">
              <Sparkles className="w-6 h-6 text-secondary" /> Welche Faktoren beeinflussen die Kosten?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {factors.map((factor: string, index: number) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-sm text-sm shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-lg mb-1">{factor}</h4>
                    <p className="text-sm text-on-surface-variant">
                      Je komplexer diese Anforderung, desto mehr verschiebt sich die Kalkulation an das obere Ende der Richtpreis-Skala.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Estimator */}
          <div className="pt-16 border-t border-outline-variant/30" id="estimator">
            <div className="text-center mb-12">
              <h2 className="font-headline-md text-3xl md:text-5xl mb-4">Interaktiver Preiskalkulator</h2>
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                Tragen Sie Ihre Quadratmeterzahl und Anforderungen ein, um sofort ein transparentes Angebot zu erhalten.
              </p>
            </div>
            <PriceEstimator />
          </div>

        </div>
      </section>

      <CTABanner />
    </>
  );
}
