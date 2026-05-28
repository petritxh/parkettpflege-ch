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
import { CheckSquare, Star, ShoppingBag, Sparkles, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';

import { getRatgeberPageData } from '@/lib/seo-mapper';
import { getSeoGuidePages } from '@/lib/seo-engine';
import { getAutoLinkDictionary, applyAutoLinks } from '@/lib/seo-linker';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const guide = await getRatgeberPageData(resolvedParams.slug);
  
  if (!guide) {
    return { title: 'Nicht gefunden' };
  }

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
  };
}

export async function generateStaticParams() {
  const pages = getSeoGuidePages();
  return pages.map((page) => ({
    slug: page.slug.replace('/ratgeber/', ''),
  }));
}

export default async function RatgeberPage({ params }: Props) {
  const resolvedParams = await params;
  const guide = await getRatgeberPageData(resolvedParams.slug);

  if (!guide) {
    notFound();
  }

  // Auto link text
  const linkDictionary = await getAutoLinkDictionary();
  const linkedMarkdown = applyAutoLinks(guide.contentMarkdown || '', linkDictionary, `/ratgeber/${resolvedParams.slug}`);

  // Schema Markup for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": guide.h1,
    "description": guide.metaDescription,
    "about": {
      "@type": "Thing",
      "name": "Parkettpflege"
    },
    "inLanguage": "de-CH"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection 
        label="Evergreen-Ratgeber"
        title={guide.h1}
        description={guide.intro}
        backgroundImageUrl={undefined}
        showAIAdvisor={true}
        primaryButtonText="Checkliste ansehen"
        primaryButtonHref="#checklist"
      />

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Table of Contents - Sticky Sidebar */}
          {guide.contentMarkdown && (
            <div className="hidden lg:block w-64 flex-shrink-0">
              <TableOfContents markdown={guide.contentMarkdown} />
            </div>
          )}

          {/* Main Content */}
          <div className={`flex-1 max-w-3xl w-full mx-auto ${guide.contentMarkdown ? 'lg:mx-0' : 'lg:mx-auto'}`}>
            
            {/* Guide Content Intro Banner */}
            <div className="mb-12 bg-surface-container-low p-8 rounded-3xl border border-outline-variant/30 flex gap-4 text-left">
              <BookOpen className="w-8 h-8 text-secondary shrink-0 mt-1" />
              <div>
                <h3 className="font-headline-sm text-xl mb-2">Erste-Hand-Wissen</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Dieser Leitfaden beruht auf jahrelanger handwerklicher Praxis in der Aufbereitung von Holzböden in Zürich. Wir vermitteln Ihnen ausschliesslich praxiserprobte Anleitungen.
                </p>
              </div>
            </div>

            {/* Markdown Content */}
            {guide.contentMarkdown && (
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

            {/* Structured Checklist for the user */}
            <div className="mt-16 bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 text-left" id="checklist">
              <h3 className="font-headline-sm text-2xl mb-6 flex items-center gap-2 text-on-surface">
                <CheckSquare className="w-6 h-6 text-primary" /> Ihre Schritt-für-Schritt Checkliste
              </h3>
              <ul className="space-y-4 text-on-surface-variant">
                <li className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded border-2 border-outline mt-1 shrink-0"></span>
                  <div>
                    <strong>Staubfrei vorsaugen:</strong> Entfernen Sie grobe Steinchen und Staub mit der weichen Parkettdüse des Staubsaugers.
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded border-2 border-outline mt-1 shrink-0"></span>
                  <div>
                    <strong>Richtige Seife anmischen:</strong> Verwenden Sie WOCA Holzbodenseife im Mischverhältnis 1:40 in lauwarmem Wasser.
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded border-2 border-outline mt-1 shrink-0"></span>
                  <div>
                    <strong>Nebelfeucht wischen:</strong> Der Mopp sollte so ausgewrungen sein, dass keine Pfützen oder Wasserläufe stehen bleiben.
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded border-2 border-outline mt-1 shrink-0"></span>
                  <div>
                    <strong>Vollständig trocknen lassen:</strong> Lassen Sie dem Parkett mindestens 1 Stunde Ruhezeit, bevor Sie es wieder belaufen.
                  </div>
                </li>
              </ul>
            </div>

            {/* Expert Pro-Tip */}
            <div className="mt-12 bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-3xl text-left">
              <h4 className="font-headline-sm text-lg text-secondary flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 fill-secondary" /> Profi-Tipp für ein glänzendes Finish
              </h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Nutzen Sie für das regelmässige Wischen am besten zwei Eimer: einen mit Seifenwasser und einen mit klarem Wasser zum Ausspülen des schmutzigen Mopps. So verteilen Sie den gelösten Dreck nicht wieder auf der Holzhaut!
              </p>
            </div>

            {/* Product Recommendations */}
            {guide.products.length > 0 && (
              <div className="mt-16 border-t border-surface-variant pt-12">
                <h3 className="font-headline-md text-3xl mb-8 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-secondary animate-pulse" /> Empfohlene Pflegeprodukte für Ihr Parkett
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {guide.products.slice(0, 2).map((product) => (
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
            <h2 className="font-headline-md text-3xl md:text-5xl mb-4">Braucht Ihr Parkett eine Grundreinigung?</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Unser maschinelles Tiefenreinigungsverfahren holt hartnäckige Grauschleier restlos aus den Holzporen.
            </p>
          </div>
          <InteractiveGuide />
        </div>
      </section>

      {guide.faqs && guide.faqs.length > 0 && (
        <FAQSection title="Häufige Fragen zum Pflegeratgeber" subtitle="" faqs={guide.faqs} />
      )}

      <CTABanner />
    </>
  );
}
