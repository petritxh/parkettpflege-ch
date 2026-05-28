import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
import HeroSection from '@/components/sections/HeroSection';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';
import InteractiveGuide from '@/components/InteractiveGuide';
import TableOfContents from '@/components/TableOfContents';
import { CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';

import { getServicePageData } from '@/lib/seo-mapper';
import { getSeoServicePages } from '@/lib/seo-engine';
import { getFAQsByTarget } from '@/lib/data-service';
import { getAutoLinkDictionary, applyAutoLinks } from '@/lib/seo-linker';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = await getServicePageData(resolvedParams.slug);
  
  if (!service) {
    return { title: 'Nicht gefunden' };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export async function generateStaticParams() {
  const pages = getSeoServicePages();
  return pages.map((page) => ({
    slug: page.slug.replace('/leistungen/', ''),
  }));
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params;
  const service = await getServicePageData(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const dynamicFaqs = await getFAQsByTarget('service', service.slug);

  // Auto link text
  const linkDictionary = await getAutoLinkDictionary();
  const linkedMarkdown = applyAutoLinks(service.contentMarkdown || '', linkDictionary, `/leistungen/${resolvedParams.slug}`);

  // Schema Markup for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.h1,
    description: service.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Parkett-Pflege.ch',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRCeQlyl_ZrejbSyV0FunoFKwjkjKCeGvMY0CVKnU_4UOB-wMPEUFxPaEpuoEiEPlWTqsHRBHt7RBIBjGD_V9XVd4aaNOhqW5kra7KEBuMWuKXU0Z93pk65SyPuGBA6koofeZTFytJWKy-XVBRKOQhaNR1AaiRM03RDkyrXRExayAqviHQUWUtMh6bKKjZ_v37zZ8R9kqqSpWXjLJjqVOHcVYyASFJLbqlMprHcV1j-0N1QFmNPc9znpBaYlzZEESAebodotlZOmU'
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Kanton Zürich'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection 
        label="Dienstleistung"
        title={service.h1}
        description={service.intro}
        backgroundImageUrl={service.imageUrl}
        showAIAdvisor={true}
        primaryButtonText="Offerte berechnen"
        primaryButtonHref="#estimator"
      />

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Table of Contents - Sticky Sidebar */}
          {service.contentMarkdown && (
            <div className="hidden lg:block w-64 flex-shrink-0">
              <TableOfContents markdown={service.contentMarkdown} />
            </div>
          )}

          {/* Main Content */}
          <div className={`flex-1 max-w-3xl w-full mx-auto ${service.contentMarkdown ? 'lg:mx-0' : 'lg:mx-auto'}`}>
            
            {/* Quick Benefits */}
            {service.benefits && (
              <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30">
                {service.benefits.map((benefit: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-headline-sm text-lg mb-1">{benefit.title}</h4>
                      <p className="text-sm text-on-surface-variant">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Markdown Content */}
            {service.contentMarkdown && (
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
            
            {/* Process Steps */}
            {service.processSteps && (
              <div className="mt-16 border-t border-surface-variant pt-12">
                <h2 className="font-headline-md text-3xl mb-8">So funktioniert unser Service</h2>
                <div className="space-y-8">
                  {service.processSteps.map((step: any, index: number) => (
                    <div key={index} className="flex gap-6 relative">
                      {index !== service.processSteps!.length - 1 && (
                        <div className="absolute left-6 top-14 bottom-[-32px] w-0.5 bg-surface-variant"></div>
                      )}
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm text-xl z-10">
                        {step.step}
                      </div>
                      <div className="pt-2">
                        <h4 className="font-headline-sm text-xl mb-2">{step.title}</h4>
                        <p className="text-on-surface-variant">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="estimator">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline-md text-3xl md:text-5xl mb-4">Erhalten Sie eine kostenlose Offerte</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Beantworten Sie ein paar Fragen und ermitteln Sie direkt die Kosten für Ihr Parkettvorhaben.
            </p>
          </div>
          <InteractiveGuide />
        </div>
      </section>

      {dynamicFaqs.length > 0 && (
        <FAQSection title={`Häufige Fragen zu ${service.h1}`} subtitle="" faqs={dynamicFaqs} />
      )}

      <CTABanner />
    </>
  );
}
