import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { locations, getLocationBySlug } from '@/data/locations';
import HeroSection from '@/components/sections/HeroSection';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';
import InteractiveGuide from '@/components/InteractiveGuide';
import TableOfContents from '@/components/TableOfContents';
import { MapPin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';

interface Props {
  params: Promise<{ location: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const location = getLocationBySlug(resolvedParams.location);
  
  if (!location) {
    return { title: 'Nicht gefunden' };
  }

  return {
    title: location.metaTitle,
    description: location.metaDescription,
  };
}

export async function generateStaticParams() {
  return locations.map((location) => ({
    location: location.slug,
  }));
}

import { getFAQsByTarget } from '@/lib/data-service';

export default async function LocationPage({ params }: Props) {
  const resolvedParams = await params;
  const location = getLocationBySlug(resolvedParams.location);

  if (!location) {
    notFound();
  }

  const dynamicFaqs = await getFAQsByTarget('location', location.slug);

  return (
    <>
      <HeroSection 
        label={`Regionaler Service in ${location.name}`}
        title={location.h1}
        description={location.intro}
        backgroundImageUrl={location.imageUrl}
        showAIAdvisor={true}
        primaryButtonText="Kostenlose Offerte"
        primaryButtonHref="#estimator"
      />

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-y border-outline-variant/30">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 justify-center">
          <div className="flex items-center gap-4 text-primary">
             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-8 h-8" />
             </div>
             <div>
                <h3 className="font-headline-sm text-2xl">Lokaler Experte</h3>
                <p className="font-body-md text-on-surface-variant">Wir sind schnell in {location.name} vor Ort.</p>
             </div>
          </div>
          <div className="h-px w-full md:w-px md:h-16 bg-outline-variant/30"></div>
          <div className="grid grid-cols-2 gap-8 w-full md:w-auto">
             {location.stats.map((stat, index) => (
               <div key={index}>
                 <div className="font-label-md text-label-md text-secondary tracking-widest uppercase mb-1">{stat.label}</div>
                 <div className="font-headline-sm text-xl text-on-surface">{stat.value}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Table of Contents - Sticky Sidebar */}
          {location.contentMarkdown && (
            <div className="hidden lg:block w-64 flex-shrink-0">
              <TableOfContents markdown={location.contentMarkdown} />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 max-w-3xl">
            {/* Markdown Content */}
            {location.contentMarkdown && (
              <div className="prose prose-lg prose-slate max-w-none 
                prose-headings:font-headline prose-headings:text-on-surface
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-surface-variant
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-on-surface-variant prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-ul:text-on-surface-variant prose-li:my-2
                prose-strong:text-on-surface prose-strong:font-medium">
                <ReactMarkdown rehypePlugins={[rehypeSlug]}>
                  {location.contentMarkdown}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-t border-outline-variant/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline-md text-3xl md:text-5xl mb-4">Starten Sie Ihren Parkettcheck in {location.name}</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Nutzen Sie unseren kostenlosen KI-Parkettcheck. Beantworten Sie 4 kurze Fragen und erhalten Sie sofort eine massgeschneiderte Empfehlung für die Reparatur oder Pflege.
            </p>
          </div>
          <InteractiveGuide />
        </div>
      </section>

      {dynamicFaqs.length > 0 && (
        <FAQSection title={`Häufige Fragen zu Parkettarbeiten in ${location.name}`} subtitle="" faqs={dynamicFaqs} />
      )}

      <CTABanner 
         title={`Parkettpflege in ${location.name} buchen`}
      />
    </>
  );
}
