import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Parkett-Probleme erkennen & richtig behandeln | Schadens-Zentrum',
  description: 'Wasserflecken, Hundekratzer, schwarze Flecken, aufgequollenes oder stumpfes Parkett? Diagnostizieren Sie Schäden und finden Sie die richtige Lösung.',
  alternates: {
    canonical: 'https://parkett-pflege.ch/problemfaelle',
  },
};

export default function ProblemfaellePage() {
  const problems = [
    {
      title: "Wasserflecken im Parkett",
      text: "Ob Giesskannen, Blumentöpfe oder umgekippte Gläser: Helle Flecken sitzen meist nur in der Wachs- oder Ölschicht, dunkle Verfärbungen sind oxidative Reaktionen im Holz.",
      cta: "Wasserflecken entfernen",
      href: "/problemfaelle/wasserflecken-parkett"
    },
    {
      title: "Hundekratzer & Krallenspuren",
      text: "Feine oberflächliche Kratzer lassen sich besonders bei geölten Böden einfach auspolieren. Bei versiegelten Lackflächen bedarf es spezieller Retusche-Verfahren.",
      cta: "Kratzer reparieren",
      href: "/problemfaelle/hundekratzer-parkett"
    },
    {
      title: "Schwarze Flecken auf Eiche",
      text: "Entstehen, wenn Eisenrückstände (z.B. von Metallfüssen) mit Wasser und der Gerbsäure im Holz reagieren. Hier helfen Gerbsäure-Neutralisierer oder Spot-Repair.",
      cta: "Schwarze Flecken verstehen",
      href: "/problemfaelle/schwarze-flecken-parkett"
    },
    {
      title: "Graues und stumpfes Parkett",
      text: "Abgetragene Schutzschichten führen dazu, dass sich Schmutz in den Holzporen festsetzt. Maschinelle Tiefenreinigung zieht den Grauschleier restlos heraus.",
      cta: "Boden wiederbeleben",
      href: "/problemfaelle/parkett-grau-und-stumpf"
    },
    {
      title: "Parkett quillt auf",
      text: "Ein kritischer Feuchtigkeitsschaden. Zuerst muss die Ursache behoben und das Holz getrocknet werden, bevor Dielen geschliffen oder getauscht werden.",
      cta: "Aufquellung prüfen",
      href: "/problemfaelle/parkett-quillt-auf"
    },
    {
      title: "Tiefe Kratzer & Dellen",
      text: "Fühlbare Kerben durch Möbelrücken oder Absatzschuhe zerstören den Holzschutz. Spot-Repair mit farbigen Hartwachsen macht die Stellen fast unsichtbar.",
      cta: "Tiefe Kratzer ausbessern",
      href: "/problemfaelle/tiefe-kratzer-parkett"
    },
    {
      title: "Laufstrassen im Wohnbereich",
      text: "Ungleichmässige Abnutzung auf Hauptwegen (z.B. im Flur). Gezieltes Nachölen oder eine Reinigungs-Pflegebehandlung gleicht das Erscheinungsbild an.",
      cta: "Laufstrassen behandeln",
      href: "/problemfaelle/laufstrassen-parkett"
    },
    {
      title: "Parkett falsch gereinigt",
      text: "Dampfreiniger, Mikrofasertücher oder säurehaltige Reiniger greifen Öle und Lacke an. Wir entfernen alte Rückstände und bauen den Schutz neu auf.",
      cta: "Pflegefehler beheben",
      href: "/problemfaelle/parkett-nach-falscher-reinigung"
    }
  ];

  const faqs = [
    {
      question: "Kann man jeden Parkettschaden reparieren?",
      answer: "Die meisten oberflächlichen und lokalen Schäden lassen sich durch Spot-Repair, Tiefenreinigung oder Nachölen hervorragend optisch verbessern. Ist die Holzsubstanz jedoch tief verfault (z.B. bei langanhaltenden Wasserschäden) oder die Nutzschicht komplett durchgerieben, müssen Dielen getauscht oder der Boden neu geschliffen werden."
    },
    {
      question: "Was sollte ich bei einem frischen Wasserschaden sofort tun?",
      answer: "Nehmen Sie stehendes Wasser unverzüglich mit Tüchern auf. Sorgen Sie für eine gute Raumlüftung, damit das Holz abtrocknen kann. Verwenden Sie niemals Föhne oder Heizlüfter, da die starke Hitze das Holz zum Reißen bringt. Machen Sie Fotos und lassen Sie den Schaden per Fotoanalyse einschätzen."
    },
    {
      question: "Warum werden Flecken auf Eichenparkett manchmal schwarz?",
      answer: "Eichenholz enthält von Natur aus einen hohen Anteil an Gerbsäure. Kommt diese Gerbsäure mit Wasser und gleichzeitig mit kleinsten Eisenpartikeln (z.B. von Metallgleitern an Stühlen oder Resten im Leitungswasser) in Kontakt, oxidiert sie schwarz. Dies lässt sich oft mit speziellen reaktiven Reinigern (Gerbsäure-Neutralisierern) aufhellen."
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Parkett-Probleme und Lösungen | Diagnose-Zentrum',
    description: 'Diagnostizieren Sie typische Parkettschäden wie Flecken, Kratzer, Laufspuren, Aufquellungen und falsche Reinigung. Tipps zur Selbsthilfe und Profi-Optionen.',
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
          name: 'Problemfälle',
          item: 'https://parkett-pflege.ch/problemfaelle'
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
        label="Schadens- & Diagnosezentrum"
        title="Parkett-Probleme erkennen und richtig behandeln"
        description="Wasserflecken, Kratzer, graue Laufstrassen oder aufgequollene Stellen bedeuten nicht automatisch, dass der ganze Boden ersetzt werden muss. Viele Schäden lassen sich reinigen, lokal reparieren oder durch eine passende Oberflächenbehandlung verbessern."
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
          <span className="text-on-surface font-medium">Problemfälle</span>
        </div>
      </nav>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-surface text-on-surface">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
          
          <div className="max-w-3xl space-y-6">
            <h2 className="font-headline-md text-3xl font-bold">Erste Hilfe bei Parkettschäden: Richtig handeln</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Wenn das geliebte Parkett Schaden nimmt, ist die Sorge vor horrenden Kosten oft gross. Doch Holz ist ein lebendiger, extrem dankbarer Werkstoff. In 80% der Fälle lässt sich der Schaden gezielt beheben, ohne dass der ganze Raum geräumt, staubintensiv geschliffen oder neu verlegt werden muss.
            </p>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Wichtig ist eine präzise Diagnose. Welches Holz liegt vor? Ist die Oberfläche geölt oder lackiert? Wie tief ist die Beschädigung? Wählen Sie unten Ihr Schadensbild aus, um verständliche Erklärungen, Sofortmassnahmen und die passenden Behandlungsmethoden zu finden.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:border-secondary/20"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-secondary" />
                    </div>
                    <h3 className="font-headline-sm text-xl font-bold text-on-surface">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    {item.text}
                  </p>
                </div>

                <div className="pt-6 border-t border-outline-variant/10 mt-6 flex justify-between items-center">
                  <Link 
                    href={item.href}
                    className="inline-flex items-center gap-1.5 font-bold text-sm text-primary hover:text-primary-hover group"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <FAQSection title="Häufige Fragen zu Parkettschäden" subtitle="Praktische Antworten rund um Diagnose und Reparatur." faqs={faqs} />
      
      <CTABanner />
    </>
  );
}
