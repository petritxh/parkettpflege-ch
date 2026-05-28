import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';
import InteractiveGuide from '@/components/InteractiveGuide';
import TableOfContents from '@/components/TableOfContents';
import { MapPin, Navigation, Clock, ShieldCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';

import { getRegionalPageData } from '@/lib/seo-mapper';
import { getSeoLocationPages } from '@/lib/seo-engine';
import { getFAQsByTarget } from '@/lib/data-service';
import { getAutoLinkDictionary, applyAutoLinks } from '@/lib/seo-linker';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const regionalData = await getRegionalPageData(resolvedParams.slug);
  
  if (!regionalData) {
    return { title: 'Nicht gefunden' };
  }

  return {
    title: regionalData.metaTitle,
    description: regionalData.metaDescription,
  };
}

export async function generateStaticParams() {
  const pages = getSeoLocationPages();
  return pages.map((page) => ({
    slug: page.slug.replace('/zuerich/', ''),
  }));
}

export default async function RegionalPage({ params }: Props) {
  const resolvedParams = await params;
  const regionalData = await getRegionalPageData(resolvedParams.slug);

  if (!regionalData) {
    notFound();
  }

  const { name, stats, h1, intro, imageUrl, contentMarkdown } = regionalData;

  const dynamicFaqs = await getFAQsByTarget('location', resolvedParams.slug);

  // Auto link text
  const linkDictionary = await getAutoLinkDictionary();
  const linkedMarkdown = applyAutoLinks(contentMarkdown || '', linkDictionary, `/zuerich/${resolvedParams.slug}`);

  // LocalBusiness Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Parkett-Pflege.ch ${name}`,
    description: regionalData.metaDescription,
    image: imageUrl,
    telephone: '+41 44 123 45 67',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: name,
      addressRegion: 'ZH',
      addressCountry: 'CH'
    },
    geo: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 47.3769,
        longitude: 8.5417
      },
      geoRadius: '15000'
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: name
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection 
        label={`Regionalpartner für ${name}`}
        title={h1}
        description={intro}
        backgroundImageUrl={undefined}
        showAIAdvisor={true}
        primaryButtonText="Kostenlose Beratung"
        primaryButtonHref="#estimator"
      />

      {/* Local stats grid */}
      <section className="py-8 bg-surface-container-low border-b border-outline-variant/30">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-headline-sm text-base mb-1 font-semibold">Anfahrt nach {name}</h4>
                <p className="text-xs text-on-surface-variant">100% kostenlos und unverbindlich</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-headline-sm text-base mb-1 font-semibold">Express-Termine</h4>
                <p className="text-xs text-on-surface-variant">In {name} meist innerhalb von 24–48h</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-headline-sm text-base mb-1 font-semibold">Fachbetrieb-Garantie</h4>
                <p className="text-xs text-on-surface-variant">Schweizer Meisterqualität & Gewährleistung</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Table of Contents - Sticky Sidebar */}
          {linkedMarkdown && (
            <div className="hidden lg:block w-64 flex-shrink-0">
              <TableOfContents markdown={linkedMarkdown} />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 max-w-3xl">
            
            {/* Municipal highlight box */}
            <div className="mb-12 bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-3xl text-left flex gap-4">
              <Navigation className="w-6 h-6 text-secondary shrink-0 mt-1" />
              <div>
                <h4 className="font-headline-sm text-lg text-secondary mb-1">Ihr lokaler Ansprechpartner</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Als Parkettprofi für {name} sind wir in kürzester Zeit bei Ihnen. Ob Besichtigung, Reparatur oder vollflächiges Schleifen – wir kennen die regionalen Gegebenheiten und arbeiten termintreu.
                </p>
              </div>
            </div>

            {/* Markdown Content */}
            {linkedMarkdown && (
              <div className="prose prose-lg prose-slate max-w-none 
                prose-headings:font-headline prose-headings:text-on-surface
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-surface-variant
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-on-surface-variant prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-ul:text-on-surface-variant prose-li:my-2
                prose-strong:text-on-surface prose-strong:font-medium">
                <ReactMarkdown rehypePlugins={[rehypeSlug]}>
                  {linkedMarkdown}
                </ReactMarkdown>
              </div>
            )}

          </div>
        </div>
      </section>

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="estimator">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline-md text-3xl md:text-5xl mb-4">Unverbindliches Angebot für {name} anfordern</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Nutzen Sie unseren Rechner, um die Kosten für Ihr Parkettprojekt in {name} sofort online einzuschätzen.
            </p>
          </div>
          <InteractiveGuide />
        </div>
      </section>

      {dynamicFaqs.length > 0 && (
        <FAQSection title={`Häufige Fragen aus ${name}`} subtitle="" faqs={dynamicFaqs} />
      )}

      <CTABanner />
    </>
  );
}
