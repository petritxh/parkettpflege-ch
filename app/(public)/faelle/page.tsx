import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';
import { homepageContent } from '@/data/homepage-content';

export const metadata: Metadata = {
  title: 'Vorher-Nachher-Fälle & Praxisberichte | Parkett-Pflege.ch',
  description: 'Sehen Sie echte Ergebnisse unserer Parkettrenovierungen, Tiefenreinigungen und Spot-Reparaturen im Raum Zürich. Ausgangslage, Methode und Kosten.',
  alternates: {
    canonical: 'https://parkett-pflege.ch/faelle',
  },
};

export default function FaellePage() {
  const cases = homepageContent.beforeAfter.cases;

  const extraCases = [
    {
      id: 4,
      title: "Matte Eichendielen nach Mieterwechsel",
      problem: "Graue Laufspuren und ausgetrocknete Oberfläche",
      text: "Maschinelle Tiefenreinigung und anschliessende intensive Nachölung mit WOCA Pflegeöl.",
      slug: "parkett-mieterwechsel-zuerich-oerlikon"
    },
    {
      id: 5,
      title: "Stumpfes Parkett im Schlafzimmer",
      problem: "Ausgelaugte Wachs- und Pflegemittelschichten",
      text: "Porentiefe Schmutzentfernung mit dem Neutralisations-Verfahren und neuer, dünner Glanz-Refresher.",
      slug: "graues-parkett-zuerich-altstetten"
    }
  ];

  const allCases = [...cases, ...extraCases];

  const faqs = [
    {
      question: "Lassen sich graue Laufstrassen immer komplett durch Reinigung beheben?",
      answer: "Ja, in den allermeisten Fällen! Ein grauer Schleier entsteht, wenn Schmutzpartikel in die geöffneten Poren eines trockenen Holzbodens eingetreten sind. Unsere Tiefenreinigung zieht diesen Schmutz kraftvoll heraus, und das anschliessende Pflegeöl sättigt das Holz wieder, sodass der Grauschleier verschwindet. Erst wenn die Holzfasern selbst mechanisch zerstört sind, muss geschliffen werden."
    },
    {
      question: "Werden bei einem Spot-Repair Farbunterschiede sichtbar sein?",
      answer: "Frisch reparierte Stellen können unmittelbar nach der Behandlung minimal anders wirken, da das frische Öl oder Wachs noch nicht dem UV-Licht ausgesetzt war. Innerhalb weniger Wochen dunkelt das Holz jedoch natürlich nach und gleicht sich der Umgebung nahezu perfekt an."
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Vorher-Nachher-Fälle und Parkettsanierungs-Referenzen',
    description: 'Echte Referenzen von Parkettreinigung, Ölen und Spot-Repair aus dem Raum Zürich. Vorher-Nachher-Beispiele mit Projektablauf.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Startseite',
          item: 'https://parkett-pflege.ch/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Fälle',
          item: 'https://parkett-pflege.ch/faelle'
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection 
        label="Echte Praxisbeispiele"
        title="Vorher-Nachher-Fälle"
        description="Echte Beispiele zeigen am besten, was bei Parkettpflege, Reparatur oder Renovation möglich ist. Hier sammeln wir Fälle mit Ausgangslage, Methode und Ergebnis."
        backgroundImageUrl={undefined}
        showAIAdvisor={true}
        primaryButtonText="Eigene Fotoanalyse starten"
        primaryButtonHref="/tools/fotoanalyse-parkett"
      />

      {/* Breadcrumbs */}
      <nav className="py-4 px-margin-mobile md:px-margin-desktop bg-surface border-b border-outline-variant/30 text-xs max-w-container-max-width mx-auto">
        <div className="flex gap-2 text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-on-surface font-medium">Fälle</span>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-surface text-on-surface">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
          
          <div className="max-w-3xl space-y-6">
            <h2 className="font-headline-md text-3xl font-bold">Ergebnisse, die für sich sprechen</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Jedes Holz besitzt einen einzigartigen Charakter und erzählt eine eigene Geschichte. Wir sehen es als unsere Aufgabe, diesen Charakter zu schützen und beschädigte oder abgenutzte Böden materialschonend in ihren bestmöglichen Zustand zurückzuversetzen. Unsere Fallberichte zeigen Ihnen transparent, was mit handwerklichem Geschick und modernster Technik möglich ist.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCases.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:border-secondary/20"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Projekt #{item.id}</span>
                  </div>
                  <h3 className="font-headline-sm text-xl font-bold text-on-surface">
                    {item.title}
                  </h3>
                  <div className="space-y-1 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20">
                    <span className="text-[10px] text-on-surface-variant/80 font-bold uppercase tracking-wider block">Ausgangslage</span>
                    <p className="text-xs text-on-surface font-medium leading-relaxed">{item.problem}</p>
                  </div>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    {item.text}
                  </p>
                </div>

                <div className="pt-6 border-t border-outline-variant/10 mt-6">
                  {/* Since /faelle/[slug] is a dynamic router, let's link to `/faelle/${item.slug}` */}
                  <Link 
                    href={`/faelle/${item.slug}`}
                    className="inline-flex items-center gap-1.5 font-bold text-sm text-primary hover:text-primary-hover group"
                  >
                    <span>Projektbericht ansehen</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <FAQSection title="Häufige Fragen zu den Projekten" subtitle="Nützliche Informationen zu Aufwand und Resultaten." faqs={faqs} />
      
      <CTABanner />
    </>
  );
}
