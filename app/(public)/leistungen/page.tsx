import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Leistungen für Parkettpflege in Zürich | Reinigung & Renovation',
  description: 'Parkett reinigen, ölen, schleifen, reparieren, versiegeln und auffrischen in Zürich. Schweizer Meisterqualität für den Werterhalt Ihres Holzbodens.',
  alternates: {
    canonical: 'https://parkett-pflege.ch/leistungen',
  },
};

export default function LeistungenPage() {
  const services = [
    {
      title: "Parkett reinigen",
      text: "Professionelle Tiefenreinigung für stumpfe, verschmutzte oder beanspruchte Oberflächen. Wir entfernen Grauschleier und alte Pflegefilme porentief und schonend.",
      benefit: "Sichtbare Auffrischung Ihres Bodens komplett ohne Schleifstaub und Substanzverlust.",
      href: "/leistungen/parkett-reinigen-zuerich"
    },
    {
      title: "Parkett ölen",
      text: "Nährt trockenes, mattes oder ausgelaugtes Holz tiefenwirksam. Schützt vor Feuchtigkeit und Flecken, belebt die Maserung und bewahrt die natürliche Haptik.",
      benefit: "Atmungsaktiver, seidig-matter Schutz und kinderleichtes lokales Ausbessern von Kratzern.",
      href: "/leistungen/parkett-oelen-zuerich"
    },
    {
      title: "Parkett schleifen",
      text: "Komplette Renovation bei tiefen Kratzern, Dellen, Flecken oder alten Versiegelungen. Staubfreier Abschliff in mehreren präzisen Schleifgängen.",
      benefit: "Beseitigt selbst starke Beschädigungen und schafft die Basis für eine neue Oberfläche.",
      href: "/leistungen/parkett-schleifen-zuerich"
    },
    {
      title: "Parkett reparieren",
      text: "Lokale Reparatur (Spot-Repair) von Kratzern, Wasserflecken, Brandlöchern oder Dellen. Bei Bedarf tauschen wir auch einzelne beschädigte Dielen präzise aus.",
      benefit: "Sparsames, schnelles und punktgenaues Beheben von Einzelschäden ohne Ausräumen des Zimmers.",
      href: "/leistungen/parkett-reparieren-zuerich"
    },
    {
      title: "Parkett versiegeln",
      text: "Lackierung mit umweltfreundlichen, extrem widerstandsfähigen Wasserlacken für stark beanspruchte Wohnbereiche, Küchen oder Gewerberäume.",
      benefit: "Maximaler Schutz vor Feuchtigkeit, hohe Strapazierfähigkeit und unkomplizierte Unterhaltspflege.",
      href: "/leistungen/parkett-versiegeln-zuerich"
    },
    {
      title: "Parkett auffrischen",
      text: "Schonende Pflegebehandlung und Glanz-Reaktivierung. Perfekt für Mietwohnungen vor der Übergabe oder den Werterhalt vor einem Immobilienverkauf.",
      benefit: "Geringer Aufwand, schnelle Trocknung und ein makelloser erster Eindruck für Übergaben.",
      href: "/leistungen/parkett-auffrischen-zuerich"
    }
  ];

  const faqs = [
    {
      question: "Wann reicht eine Reinigung statt Schleifen?",
      answer: "Eine professionelle Tiefenreinigung reicht aus, wenn Ihr Parkett nur oberflächlich verschmutzt, matt oder stumpf ist, die Schutzschicht aber grundsätzlich noch intakt ist. Sobald tiefe Kratzer, Verfärbungen im Holz oder aufgequollene Dielen vorliegen, ist meist ein Abschliff oder eine Reparatur notwendig."
    },
    {
      question: "Muss für die Parkettpflege der gesamte Raum geräumt werden?",
      answer: "Bei einer vollflächigen Reinigung, Ölung oder einem Abschliff muss der Raum komplett leer sein. Bei lokalen Reparaturen (Spot-Repair) oder Teilflächenbehandlungen ist das oft nicht nötig – wir bearbeiten gezielt nur die betroffene Stelle."
    },
    {
      question: "Welche Oberflächenbehandlung ist besser: Ölen oder Versiegeln?",
      answer: "Das geölte Parkett besticht durch eine natürliche, matte Optik und Haptik; zudem lässt es sich künftig einfach lokal reparieren. Ein versiegelter Boden (lackiert) bildet eine geschlossene Schutzschicht und ist extrem pflegeleicht, kann dafür aber bei tiefen Kratzern nur schwer lokal ausgebessert werden."
    },
    {
      question: "Wie erhalte ich ein Angebot für mein Parkett in Zürich?",
      answer: "Nutzen Sie einfach unsere kostenlose Fotoanalyse. Laden Sie 1–3 Fotos Ihres Bodens hoch, beschreiben Sie Ihr Anliegen, und ein Parkett-Experte gibt Ihnen eine erste Einschätzung zu Aufwand, Kosten und passender Methode."
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Parkettpflege-Dienstleistungen in Zürich',
    description: 'Übersicht aller professionellen Parkettpflege-Dienstleistungen von parkett-pflege.ch im Raum Zürich: Reinigen, Ölen, Schleifen, Versiegeln, Reparieren, Auffrischen.',
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
        label="Dienstleistungen"
        title="Leistungen für Parkettpflege in Zürich"
        description="parkett-pflege.ch unterstützt Eigentümer, Mieter, Verwaltungen und Gewerbekunden im Raum Zürich bei der Pflege, Reparatur und Renovation von Parkettböden. Ob Reinigung, Ölen, Schleifen, Versiegeln oder lokale Reparatur: Entscheidend ist, was der Boden wirklich braucht."
        backgroundImageUrl={undefined}
        showAIAdvisor={true}
        primaryButtonText="Kosten berechnen"
        primaryButtonHref="/tools/parkett-kostenrechner"
      />

      {/* Breadcrumbs */}
      <nav className="py-4 px-margin-mobile md:px-margin-desktop bg-surface border-b border-outline-variant/30 text-xs max-w-container-max-width mx-auto">
        <div className="flex gap-2 text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-on-surface font-medium">Leistungen</span>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface text-on-surface">
        <div className="max-w-container-max-width mx-auto space-y-16">
          
          <div className="max-w-3xl space-y-6">
            <h2 className="font-headline-md text-3xl font-bold">Welche Behandlung braucht Ihr Parkettboden?</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Jeder Parkettboden hat eine individuelle Geschichte. Holzart, Beanspruchung und das bisherige Pflegeverhalten bestimmen, welche Massnahme langfristig den besten Werterhalt verspricht. Unser Grundsatz lautet immer: <strong>Parkett retten statt ersetzen</strong>. Das schont nicht nur Ihr Budget, sondern erhält auch den gewachsenen Charakter Ihres Raumes.
            </p>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Wir prüfen jeden Boden genau und beraten Sie ehrlich. Oftmals lässt sich durch eine professionelle maschinelle Reinigung und anschliessende Sättigung mit Pflegeölen oder dem Reaktivieren von Lackfilmen ein erstaunliches Ergebnis erzielen, ohne dass direkt geschliffen werden muss.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:border-secondary/20"
              >
                <div className="space-y-5">
                  <h3 className="font-headline-sm text-xl font-bold text-on-surface">
                    {item.title}
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    {item.text}
                  </p>
                  <div className="flex gap-2.5 bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/20">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-[11px] text-on-surface-variant/80 font-bold uppercase tracking-wide">Ihr Vorteil</span>
                      <p className="text-xs text-on-surface font-semibold leading-normal">{item.benefit}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-outline-variant/10 mt-6">
                  <Link 
                    href={item.href}
                    className="inline-flex items-center gap-1.5 font-bold text-sm text-primary hover:text-primary-hover group"
                  >
                    <span>Mehr zu {item.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <FAQSection title="Häufige Fragen zu unseren Parkettleistungen" subtitle="Wir helfen Ihnen, fundierte Entscheidungen für Ihren Fussboden zu treffen." faqs={faqs} />
      
      <CTABanner />
    </>
  );
}
