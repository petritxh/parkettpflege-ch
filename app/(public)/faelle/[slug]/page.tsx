import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
import Image from 'next/image';
import HeroSection from '@/components/sections/HeroSection';
import CTABanner from '@/components/sections/CTABanner';
import InteractiveGuide from '@/components/InteractiveGuide';
import { Calendar, Hammer, Trees, ShieldAlert, Sparkles } from 'lucide-react';

import { getCasePageData } from '@/lib/seo-mapper';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const caseData = await getCasePageData(resolvedParams.slug);
  
  if (!caseData) {
    return { title: 'Nicht gefunden' };
  }

  return {
    title: caseData.metaTitle,
    description: caseData.metaDescription,
  };
}

const caseSlugs = [
  'wasserfleck-parkett-zuerich-seefeld',
  'hundekratzer-parkett-zuerich-wiedikon',
  'laufstrasse-parkett-zuerich-enge',
  'graues-parkett-zuerich-altstetten',
  'parkett-mieterwechsel-zuerich-oerlikon'
];

export async function generateStaticParams() {
  return caseSlugs.map(slug => ({ slug }));
}

export default async function CasePage({ params }: Props) {
  const resolvedParams = await params;
  const caseData = await getCasePageData(resolvedParams.slug);

  if (!caseData) {
    notFound();
  }

  const { title, woodType, service, problem, description, imgBefore, imgAfter } = caseData;

  // Render schema list
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CaseStudy',
    'name': title,
    'description': description,
    'about': {
      '@type': 'Service',
      'name': service
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection 
        label="Referenzprojekt / Fallstudie"
        title={title}
        description={`So haben wir das Problem '${problem}' mit einer professionellen '${service}' Behandlung gelöst.`}
        backgroundImageUrl={undefined}
        showAIAdvisor={false}
        primaryButtonText="Kostenlose Beratung"
        primaryButtonHref="#estimator"
      />

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface text-left">
        <div className="max-w-4xl mx-auto">
          
          {/* Metadata attributes grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-surface-container-low p-6 rounded-3xl border border-outline-variant/30 mb-12">
            <div className="flex gap-3 items-center">
              <Trees className="w-6 h-6 text-primary shrink-0" />
              <div>
                <span className="text-xs text-on-surface-variant block">Holzart</span>
                <strong className="text-sm font-semibold">{woodType}</strong>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <Hammer className="w-6 h-6 text-primary shrink-0" />
              <div>
                <span className="text-xs text-on-surface-variant block">Leistung</span>
                <strong className="text-sm font-semibold">{service}</strong>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <Calendar className="w-6 h-6 text-primary shrink-0" />
              <div>
                <span className="text-xs text-on-surface-variant block">Projektdauer</span>
                <strong className="text-sm font-semibold">1 bis 2 Tage</strong>
              </div>
            </div>
          </div>

          {/* Before & After comparison columns */}
          <h3 className="font-headline-sm text-3xl mb-8 flex items-center gap-2"><Sparkles className="w-6 h-6 text-secondary" /> Vorher & Nachher Visualisierung</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="flex flex-col">
              <span className="font-label-md text-sm text-error uppercase tracking-wider mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Vorher (Ausgangslage)
              </span>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-error/30 shadow-md">
                <Image 
                  src={imgBefore} 
                  alt={`${title} - Vorher`} 
                  fill 
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-on-surface-variant mt-2 italic">Beschädigte Oberfläche mit Flecken und Kratzern.</p>
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-sm text-success uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Nachher (Ergebnis)
              </span>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-success/30 shadow-md">
                <Image 
                  src={imgAfter} 
                  alt={`${title} - Nachher`} 
                  fill 
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-on-surface-variant mt-2 italic">Komplett restauriertes Parkett mit tiefenwirksamem Schutz.</p>
            </div>
          </div>

          {/* Detailed Project Story */}
          <div className="prose prose-lg prose-slate max-w-none 
            prose-headings:font-headline prose-headings:text-on-surface
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-on-surface-variant prose-p:leading-relaxed prose-p:mb-6">
            
            <h3 className="text-2xl font-headline-sm mb-4">Projektbeschreibung & Analyse</h3>
            <p>{description}</p>
            
            <h3 className="text-2xl font-headline-sm mb-4">Unser handwerkliches Vorgehen</h3>
            <p>
              Zuerst führten wir eine detaillierte Holzanalyse durch. Mit unserem absolut staubfreien Schleifverfahren haben wir die oberste, zerschlissene Holzschicht milimetergenau abgetragen, ohne Staub in der Wohnung zu verteilen. Im Anschluss wurden alle Fugen sorgfältig ausgekittet und die Poren gesättigt.
            </p>
            
            <h3 className="text-2xl font-headline-sm mb-4">Kostenrahmen</h3>
            <p>
              Projekte dieser Grössenordnung bewegen sich bei Eichen- oder Ahornparkett im Bereich von ca. CHF 1&apos;200.- bis 1&apos;800.- je nach Raumschnitt und Fugenbild. Dies erhöht die Lebensdauer des historischen Holzbodens um weitere 10 bis 15 Jahre drastisch!
            </p>
          </div>

        </div>
      </section>

      <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-lowest" id="estimator">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline-md text-3xl md:text-5xl mb-4">Haben Sie ein ähnliches Problem?</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Lassen Sie die Kosten für Ihr Vorhaben direkt berechnen oder kontaktieren Sie unsere Spezialisten.
            </p>
          </div>
          <InteractiveGuide />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
