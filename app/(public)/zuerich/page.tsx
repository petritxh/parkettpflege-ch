import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Parkettpflege im Raum Zürich | Lokaler Fachbetrieb',
  description: 'Ihr Spezialist für Parkettpflege, Reinigung, Schleifen und Reparatur im ganzen Kanton Zürich. Erfahren Sie mehr über unsere regionalen Service-Standorte.',
  alternates: {
    canonical: 'https://parkett-pflege.ch/zuerich',
  },
};

export default function ZuerichPage() {
  const locations = [
    { name: 'Stadt Zürich', slug: 'parkettpflege-zuerich' },
    { name: 'Winterthur', slug: 'parkettpflege-winterthur' },
    { name: 'Uster', slug: 'parkettpflege-uster' },
    { name: 'Dübendorf', slug: 'parkettpflege-duebendorf' },
    { name: 'Küsnacht', slug: 'parkettpflege-kuesnacht' },
    { name: 'Horgen', slug: 'parkettpflege-horgen' },
    { name: 'Meilen', slug: 'parkettpflege-meilen' },
    { name: 'Thalwil', slug: 'parkettpflege-thalwil' },
    { name: 'Adliswil', slug: 'parkettpflege-adliswil' },
    { name: 'Zollikon', slug: 'parkettpflege-zollikon' }
  ];

  const serviceOffers = [
    {
      title: "Parkett schleifen Zürich",
      slug: "parkett-schleifen-zuerich",
      text: "Professioneller und staubfreier Abschliff Ihrer Parkettböden direkt in der Stadt Zürich und Umgebung."
    },
    {
      title: "Parkett reparieren Zürich",
      slug: "parkett-reparieren-zuerich",
      text: "Schnelles Spot-Repair für Flecken, Kratzer oder lokale Dellen in Zürich."
    }
  ];

  const faqs = [
    {
      question: "Werden für die Orte im Kanton Zürich Anfahrtskosten berechnet?",
      answer: "Nein. Da unsere Teams täglich im gesamten Kanton Zürich und den angrenzenden Regionen im Einsatz sind, verrechnen wir Ihnen keinerlei Anfahrtskosten – weder für Beratungstermine noch für die eigentliche Ausführung."
    },
    {
      question: "Wie schnell erhalte ich einen Termin vor Ort?",
      answer: "Dank unserer regionalen Aufstellung sind wir sehr flexibel. Für eine erste Foto-Diagnose erhalten Sie meist innerhalb von 24 Stunden eine Einschätzung. Besichtigungen und Ausführungen vor Ort können in der Regel innerhalb von 2 bis 5 Werktagen geplant werden."
    },
    {
      question: "Arbeitet parkett-pflege.ch auch für Verwaltungen?",
      answer: "Ja, wir betreuen zahlreiche renommierte Immobilienverwaltungen im Grossraum Zürich und führen Parkett-Auffrischungen oder Reparaturen hocheffizient zwischen zwei Mietverhältnissen aus, um Leerstände zu minimieren."
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Parkettpflege-Standorte und Region Zürich',
    description: 'parkett-pflege.ch ist Ihr regionaler Partner für Parkettreinigung, Schleifen, Reparatur und Pflege im Kanton Zürich und allen Gemeinden.',
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
          name: 'Zürich',
          item: 'https://parkett-pflege.ch/zuerich'
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
        label="Regionale Abdeckung"
        title="Parkettpflege im Raum Zürich"
        description="parkett-pflege.ch betreut Parkettböden in Zürich und Umgebung – von Eigentumswohnungen und Einfamilienhäusern bis zu Mietobjekten, Verwaltungen, Büros und Gewerbeflächen."
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
          <span className="text-on-surface font-medium">Zürich</span>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-surface text-on-surface">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-headline-md text-3xl font-bold">Kurze Wege, Schweizer Meisterqualität & ehrliche Beratung</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                Als spezialisierter Fachbetrieb für Parkettrenovierung im Raum Zürich legen wir grössten Wert auf Kundennähe und Verlässlichkeit. Weil unsere qualifizierten Teams täglich in der ganzen Region unterwegs sind, profitieren Sie von schnellen Reaktionszeiten, flexiblen Terminvereinbarungen und einer kostenfreien Anfahrt.
              </p>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Egal, ob es sich um ein historisches Tafelparkett in einer Zürcher Altbauwohnung, einen modernen Landhausdielen-Boden in einer Dübendorfer Neubau-Attika oder stark beanspruchte Riemenböden in einem Winterthurer Büro handelt: Wir kennen die spezifischen Anforderungen und Holzarten bestens und wählen das schonendste und werthaltigste Verfahren für Ihren Boden.
              </p>

              {/* Special Service Cards */}
              <div className="pt-8 space-y-6">
                <h3 className="font-headline-sm text-xl font-bold text-on-surface">Spezialisierte Services in Zürich</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {serviceOffers.map((item, index) => (
                    <div key={index} className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30">
                      <h4 className="font-bold text-md mb-2">{item.title}</h4>
                      <p className="text-xs text-on-surface-variant mb-4">{item.text}</p>
                      <Link 
                        href={`/zuerich/${item.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-hover group"
                      >
                        <span>Details ansehen</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Side-Box: Standorte */}
            <div className="lg:col-span-5 bg-surface-container-low p-8 rounded-3xl border border-outline-variant/30 h-fit space-y-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                <h3 className="font-headline-sm text-xl font-bold">Regionale Standorte</h3>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Wählen Sie Ihre Gemeinde, um Ihren lokalen Ansprechpartner und spezifische Pflegehinweise zu finden:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {locations.map((loc, index) => (
                  <Link 
                    key={index}
                    href={`/zuerich/${loc.slug}`}
                    className="flex items-center gap-1.5 p-2 rounded-xl text-xs font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                    <span>{loc.name}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      <FAQSection title="Fragen zur Parkettpflege in der Region Zürich" subtitle="Wichtige Details zu unseren regionalen Dienstleistungen." faqs={faqs} />
      
      <CTABanner />
    </>
  );
}
