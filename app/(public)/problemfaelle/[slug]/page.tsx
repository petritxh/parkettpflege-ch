import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
import Image from 'next/image';
import Link from 'next/link';
import HeroSection from '@/components/sections/HeroSection';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';
import InteractiveGuide from '@/components/InteractiveGuide';
import TableOfContents from '@/components/TableOfContents';
import { CheckCircle2, AlertTriangle, Info, ShoppingBag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';

import { getProblemPageData } from '@/lib/seo-mapper';
import { getSeoProblemPages } from '@/lib/seo-engine';
import { getRecommendedProducts } from '@/lib/products';
import { getFAQsByTarget } from '@/lib/data-service';
import { getAutoLinkDictionary, applyAutoLinks } from '@/lib/seo-linker';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const problem = await getProblemPageData(resolvedParams.slug);
  
  if (!problem) {
    return { title: 'Nicht gefunden' };
  }

  return {
    title: problem.metaTitle,
    description: problem.metaDescription,
  };
}

export async function generateStaticParams() {
  const pages = getSeoProblemPages();
  return pages.map((page) => ({
    slug: page.slug.replace('/problemfaelle/', ''),
  }));
}

export default async function ProblemPage({ params }: Props) {
  const resolvedParams = await params;
  const problem = await getProblemPageData(resolvedParams.slug);

  if (!problem) {
    notFound();
  }

  // Find products (e.g. wood type = 'alle')
  let damageType = 'keine';
  if (resolvedParams.slug.includes('kratzer') || resolvedParams.slug.includes('tier')) damageType = 'fein';
  else if (resolvedParams.slug.includes('wasser') || resolvedParams.slug.includes('fleck')) damageType = 'wasser';
  else if (resolvedParams.slug.includes('stumpf') || resolvedParams.slug.includes('laufstrasse')) damageType = 'laufstrassen';
  
  const recommendedProducts = getRecommendedProducts('alle', damageType);

  const dynamicFaqs = await getFAQsByTarget('problem', problem.slug);
  const combinedFaqs = [...(problem.faqs || []), ...dynamicFaqs];

  // Auto link text
  const linkDictionary = await getAutoLinkDictionary();
  const linkedMarkdown = applyAutoLinks(problem.contentMarkdown || '', linkDictionary, `/problemfaelle/${resolvedParams.slug}`);

  // Schema Markup for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: problem.h1,
    description: problem.metaDescription,
    image: problem.imageUrl?.startsWith('http') 
      ? problem.imageUrl 
      : `https://parkett-pflege.ch${problem.imageUrl || '/uploads/seo_1779825221071_kratzer_im_parkett__so_retten_.jpg'}`,
    author: {
      '@type': 'Organization',
      name: 'Parkett-Pflege.ch',
      url: 'https://parkett-pflege.ch'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Parkett-Pflege.ch',
      logo: {
        '@type': 'ImageObject',
        url: 'https://parkett-pflege.ch/logo.png'
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection 
        label="Schadensanalyse & Hilfe"
        title={problem.h1}
        description={problem.intro}
        backgroundImageUrl={problem.imageUrl?.startsWith('/') ? problem.imageUrl : undefined}
        showAIAdvisor={true}
        primaryButtonText="Profi-Hilfe anfordern"
        primaryButtonHref="#estimator"
      />

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Table of Contents - Sticky Sidebar */}
          {problem.contentMarkdown && (
            <div className="hidden lg:block w-64 flex-shrink-0">
              <TableOfContents markdown={problem.contentMarkdown} />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 max-w-3xl">
            
            {/* Quick Solution Card */}
            {problem.solutionTitle && (
              <div className="mb-12 bg-primary-container/10 p-8 rounded-3xl border border-primary/20">
                <div className="flex gap-4 items-start mb-4">
                  <Info className="w-8 h-8 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-headline-sm text-2xl text-on-surface mb-2">{problem.solutionTitle}</h3>
                    <p className="text-on-surface-variant font-body-lg leading-relaxed">{problem.solutionText}</p>
                  </div>
                </div>
                {problem.recommendedServiceUrl && (
                  <Link 
                    href={problem.recommendedServiceUrl}
                    className="mt-4 inline-flex items-center gap-2 bg-primary text-on-primary font-label-md px-6 py-3 rounded-full hover:bg-primary-hover transition-colors"
                  >
                    {problem.recommendedServiceText || 'Mehr über unsere Lösung erfahren'}
                  </Link>
                )}
              </div>
            )}

            {/* Markdown Content */}
            {problem.contentMarkdown && (
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

            {/* Do's & Don'ts */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-surface-variant pt-12">
              <div className="bg-success-container/10 p-6 rounded-3xl border border-success/20">
                <h4 className="font-headline-sm text-success text-xl mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" /> Empfohlen (Do's)
                </h4>
                <ul className="space-y-3 text-sm text-on-surface-variant list-disc pl-4">
                  <li>Flüssigkeiten sofort mit einem weichen Baumwolltuch aufsaugen.</li>
                  <li>Nur spezielle, pH-neutrale Holzseifen zur Reinigung nutzen.</li>
                  <li>Filzgleiter unter allen beweglichen Möbelstücken anbringen.</li>
                  <li>Das Raumklima bei 20–22°C und 50% Luftfeuchtigkeit halten.</li>
                </ul>
              </div>
              <div className="bg-error-container/10 p-6 rounded-3xl border border-error/20">
                <h4 className="font-headline-sm text-error text-xl mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" /> Zu vermeiden (Don'ts)
                </h4>
                <ul className="space-y-3 text-sm text-on-surface-variant list-disc pl-4">
                  <li>Aggressive Allzweckreiniger oder Spülmittel verwenden (zerstört die Schutzschicht).</li>
                  <li>Stehende Nässe oder extrem feuchtes Wischen.</li>
                  <li>Verwendung von Dampfreinigern (heisser Wasserdampf zerstört das Holz).</li>
                  <li>Kratzende Reinigungsschwämme oder Scheuermittel.</li>
                </ul>
              </div>
            </div>

            {/* Recommended Products Showcase */}
            {recommendedProducts.length > 0 && (
              <div className="mt-16 border-t border-surface-variant pt-12">
                <h3 className="font-headline-md text-3xl mb-8">Empfohlene Produkte für dieses Problem</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {recommendedProducts.slice(0, 2).map((product) => (
                    <div key={product.id} className="bg-surface-container-low border border-outline-variant/30 rounded-3xl overflow-hidden flex flex-col hover:shadow-lg transition-all">
                      <div className="h-48 relative overflow-hidden">
                        <Image 
                          src={product.imageUrl} 
                          alt={product.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow text-left">
                        <h4 className="font-headline-sm text-xl mb-2">{product.name}</h4>
                        <p className="text-sm text-on-surface-variant flex-grow mb-4">{product.shortDescription}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="font-headline-sm text-lg text-primary">CHF {product.price.toFixed(2)}</span>
                          <Link 
                            href={`/shop`}
                            className="bg-primary text-on-primary p-3 rounded-full hover:bg-primary-hover transition-colors flex items-center gap-2 text-xs font-label-md"
                          >
                            <ShoppingBag className="w-4 h-4" /> Zum Shop
                          </Link>
                        </div>
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
            <h2 className="font-headline-md text-3xl md:text-5xl mb-4">Möchten Sie ein professionelles Ergebnis?</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Unser Expertenteam hilft Ihnen bei der fachmännischen Schadensbehebung vor Ort.
            </p>
          </div>
          <InteractiveGuide />
        </div>
      </section>

      {combinedFaqs.length > 0 && (
        <FAQSection title="Häufige Fragen & Antworten" subtitle="Hilfreiche Tipps rund um dieses Parkett-Problem" faqs={combinedFaqs} />
      )}

      <CTABanner />
    </>
  );
}
