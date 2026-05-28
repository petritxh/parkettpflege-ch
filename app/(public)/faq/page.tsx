import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import FAQAccordion from '@/components/FAQAccordion';
import CTABanner from '@/components/sections/CTABanner';
import { homepageContent } from '@/data/homepage-content';

export const metadata: Metadata = {
  title: 'Häufige Fragen zur Parkettpflege | FAQ | parkett-pflege.ch',
  description: 'Antworten zu Parkettreinigung, Reparatur, Ölen, Schleifen und Versiegeln im Raum Zürich. Erfahren Sie alles über Kosten, Ablauf und Pflege im Alltag.',
  alternates: {
    canonical: 'https://parkett-pflege.ch/faq',
  },
};

export default function FAQPage() {
  const faqs = homepageContent.faq.items;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection 
        label="Fragen & Antworten"
        title="Häufige Fragen zur Parkettpflege"
        description="Sie haben Fragen zur Pflege, Reparatur oder Renovation Ihres Parkettbodens? Hier finden Sie klare, ehrliche und fachliche Antworten zu den wichtigsten Themen rund um den Werterhalt von Holzböden."
        backgroundImageUrl={undefined}
        showAIAdvisor={true}
        primaryButtonText="Fotoanalyse starten"
        primaryButtonHref="/tools/fotoanalyse-parkett"
      />

      {/* Breadcrumbs */}
      <nav className="py-4 px-margin-mobile md:px-margin-desktop bg-surface border-b border-outline-variant/30 text-xs max-w-container-max-width mx-auto">
        <div className="flex gap-2 text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-on-surface font-medium">FAQ</span>
        </div>
      </nav>

      {/* FAQ Accordion Section */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface text-on-surface">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="max-w-3xl space-y-6">
            <h2 className="font-headline-md text-3xl font-bold text-on-surface">
              Antworten von Parkett-Experten
            </h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Die richtige Behandlung von Parkett erfordert Fachwissen. Da Holz ein Naturprodukt ist, reagiert es empfindlich auf Feuchtigkeit, falsche Reinigungsmittel und mechanische Belastungen. In unserer FAQ-Übersicht klären wir die häufigsten Missverständnisse und geben Ihnen eine verlässliche Orientierung für Ihren Boden.
            </p>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface mb-6 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-primary" />
                Allgemeine Fragen & Pflege im Alltag
              </h2>
              <FAQAccordion faqs={faqs} />
            </div>
            
            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 space-y-6">
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface">
                Haben Sie ein spezifisches Problem oder einen akuten Schaden?
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Nicht jedes Schadensbild lässt sich mit einer allgemeinen Antwort lösen. Wenn Ihr Boden einen hartnäckigen Wasserfleck hat, durch Haustiere zerkratzt ist oder stellenweise aufquillt, empfehlen wir unsere kostenfreie Fotoanalyse.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link 
                  href="/tools/fotoanalyse-parkett" 
                  className="bg-primary text-on-primary hover:bg-primary/95 px-6 py-3 rounded-xl font-bold text-sm transition-all inline-block"
                >
                  Fotoanalyse starten
                </Link>
                <Link 
                  href="/problemfaelle" 
                  className="border border-outline text-on-surface hover:bg-surface-variant px-6 py-3 rounded-xl font-bold text-sm transition-all inline-block"
                >
                  Zu den Problemfällen
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <CTABanner />
    </>
  );
}
