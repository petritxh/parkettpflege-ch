import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { problems, getProblemBySlug } from '@/data/problems';
import HeroSection from '@/components/sections/HeroSection';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getFAQsByTarget } from '@/lib/data-service';
import { getAutoLinkDictionary, applyAutoLinks } from '@/lib/seo-linker';
import TableOfContents from '@/components/TableOfContents';
import rehypeSlug from 'rehype-slug';
import InteractiveGuide from '@/components/InteractiveGuide';

interface Props {
  params: Promise<{ problem: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const problem = getProblemBySlug(resolvedParams.problem);
  
  if (!problem) {
    return { title: 'Nicht gefunden' };
  }

  return {
    title: problem.metaTitle,
    description: problem.metaDescription,
  };
}

export async function generateStaticParams() {
  return problems.map((p) => ({
    problem: p.slug,
  }));
}

export default async function ProblemPage({ params }: Props) {
  const resolvedParams = await params;
  const problem = getProblemBySlug(resolvedParams.problem);

  if (!problem) {
    notFound();
  }

  const dynamicFaqs = await getFAQsByTarget('problem', problem.slug);
  
  // Auto link text
  const linkDictionary = await getAutoLinkDictionary();
  const linkedMarkdown = applyAutoLinks(problem.solutionText || '', linkDictionary, `/probleme/${problem.slug}`);

  return (
    <>
      <HeroSection 
        label="Ratgeber & Hilfe"
        title={problem.h1}
        description={problem.intro}
        backgroundImageUrl={problem.imageUrl}
        showAIAdvisor={true}
        primaryButtonText="Lösung anzeigen"
        primaryButtonHref="#solution"
      />

      <section id="solution" className="py-section-gap-mobile md:py-section-gap-desktop bg-surface">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop flex flex-col lg:flex-row gap-12 w-full">
          
          {/* Table of Contents - Sticky Sidebar */}
          {problem.solutionText && (
            <div className="hidden lg:block w-64 flex-shrink-0">
              <TableOfContents markdown={problem.solutionText} />
            </div>
          )}

          {/* Main Content */}
          <div className={`flex-1 max-w-3xl w-full mx-auto ${problem.solutionText ? 'lg:mx-0' : 'lg:mx-auto'}`}>
            
            {/* Quick Benefits (if available) */}
            {problem.benefits && (
              <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-container-lowest p-8 rounded-3xl">
                {problem.benefits.map((benefit, index) => (
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

            {/* Core Solution Box (Old format) */}
            {problem.solutionTitle && (
            <div className="mb-12 bg-primary-container/20 p-8 md:p-10 rounded-3xl border border-primary/10">
              <h2 className="font-headline-md text-3xl mb-4 text-on-surface">{problem.solutionTitle}</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed mb-8">
                {problem.solutionText}
              </p>
              {problem.recommendedServiceUrl && (
                <Link href={problem.recommendedServiceUrl} className="inline-flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-xl font-label-md text-label-md hover:bg-secondary/90 transition-all shadow-md">
                  {problem.recommendedServiceText} <ArrowRight className="w-5 h-5" />
                </Link>
              )}
            </div>
            )}

            {/* Markdown Content (New format) */}
            {problem.solutionText && !problem.solutionTitle ? (
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
            ) : null}
            
            {/* Process Steps (if available) */}
            {problem.processSteps && (
              <div className="mt-16 border-t border-surface-variant pt-12">
                <h2 className="font-headline-md text-3xl mb-8">So beheben wir das Problem</h2>
                <div className="space-y-8">
                  {problem.processSteps.map((step, index) => (
                    <div key={index} className="flex gap-6 relative">
                      {index !== problem.processSteps!.length - 1 && (
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

      {/* Cross-Selling: Related Services */}
      {problem.relatedServices && problem.relatedServices.length > 0 && (
        <section className="py-section-gap-mobile md:py-section-gap-desktop bg-surface-container-lowest">
          <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
            <h2 className="font-headline-md text-3xl mb-8">Passende Dienstleistungen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {problem.relatedServices.map((serviceSlug) => (
                <Link href={`/${serviceSlug}`} key={serviceSlug} className="group flex items-center justify-between p-6 bg-surface rounded-2xl border border-outline-variant/30 hover:border-secondary/50 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    <span className="font-headline-sm text-lg text-on-surface">{serviceSlug.replace('-', ' ')}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-secondary group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {dynamicFaqs.length > 0 && (
        <FAQSection title="Häufige Fragen" subtitle="Weitere Infos zu diesem Problem" faqs={dynamicFaqs} />
      )}

      <CTABanner />
    </>
  );
}
