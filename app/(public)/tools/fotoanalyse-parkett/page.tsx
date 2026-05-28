import { Metadata } from 'next';
import Link from 'next/link';
import { Camera, CheckCircle, Info } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import AIAdvisor from '@/components/AIAdvisor';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Kostenlose Parkett-Fotoanalyse online | parkett-pflege.ch',
  description: 'Schaden fotografieren & sofortige Einschätzung erhalten. Erfahren Sie online, ob Ihr Parkett gereinigt, geölt, repariert oder geschliffen werden muss.',
  alternates: {
    canonical: 'https://parkett-pflege.ch/tools/fotoanalyse-parkett',
  },
};

export default function FotoanalysePage() {
  const processSteps = [
    {
      step: 1,
      title: "Foto aufnehmen",
      description: "Machen Sie ein Foto aus der Distanz (Übersicht) und ein scharfes Detailfoto aus der Nähe."
    },
    {
      step: 2,
      title: "Bild hochladen",
      description: "Laden Sie die Bilder in unser sicheres KI-Tool hoch und beschreiben Sie kurz Ihr Anliegen."
    },
    {
      step: 3,
      title: "Einschätzung erhalten",
      description: "Unsere KI analysiert Holzart, Oberfläche und Schadensbild für eine erste handwerkliche Orientierung."
    },
    {
      step: 4,
      title: "Richtofferte anfordern",
      description: "Auf Wunsch erhalten Sie direkt ein unverbindliches Angebot für die fachgerechte Sanierung."
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'KI-Fotoanalyse von parkett-pflege.ch',
    url: 'https://parkett-pflege.ch/tools/fotoanalyse-parkett',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description: 'Interaktive Fotoanalyse für Parkettschäden. Ermitteln Sie online, welche Behandlung (Reinigung, Ölung, Abschliff oder Spot-Repair) Ihr Holzboden benötigt.',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'CHF'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-surface-container-low mt-20 text-on-surface">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">KI-Diagnose</span>
          <h1 className="font-headline-lg text-4xl md:text-5xl mb-6">Fotoanalyse für Ihr Parkett</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Sie wissen nicht, ob Ihr Parkett gereinigt, repariert, geölt oder geschliffen werden muss? Laden Sie Fotos hoch und beschreiben Sie kurz Fläche, Oberfläche und Schaden. Unsere KI analysiert Ihren Boden sofort.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <nav className="py-4 px-margin-mobile md:px-margin-desktop bg-surface border-b border-outline-variant/30 text-xs max-w-container-max-width mx-auto">
        <div className="flex gap-2 text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-on-surface font-medium">Tools & Fotoanalyse</span>
        </div>
      </nav>

      {/* Interactive Tool Embed Area */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface text-on-surface">
        <div className="max-w-container-max-width mx-auto space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Tool Instruction (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-headline-md text-2xl md:text-3xl font-bold">Wie funktioniert die Online-Fotoanalyse?</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Unsere eigens entwickelte Bildanalyse-Technologie gleicht Ihr Foto mit tausenden dokumentierten Parkettschäden ab. So können wir in Echtzeit feststellen, ob es sich um einen oberflächlichen Grauschleier, einen oxidierten Gerbsäurefleck oder einen tiefen mechanischen Schaden handelt.
              </p>
              
              <div className="space-y-4">
                {processSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-on-surface">{step.title}</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl flex gap-3 text-xs text-on-surface-variant leading-relaxed">
                <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <p>
                  <strong>Datenschutz:</strong> Ihre hochgeladenen Fotos werden absolut vertraulich behandelt und ausschliesslich zur Ermittlung Ihres Richtangebotes verwendet.
                </p>
              </div>
            </div>

            {/* AIAdvisor Box (7 cols) */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-[500px]">
                <AIAdvisor />
              </div>
            </div>

          </div>

          <div className="max-w-3xl space-y-6 pt-8 border-t border-outline-variant/10">
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold">Wann ist eine Fotoanalyse besonders wertvoll?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-on-surface-variant leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-bold text-on-surface flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Vor einer Wohnungsübergabe
                </h4>
                <p>
                  Als Mieter möchten Sie böse Überraschungen und überteuerte Schadensabzüge vermeiden. Die Fotoanalyse zeigt Ihnen sofort, ob Spot-Repair ausreicht.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-on-surface flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Bei akuten Wasserflecken
                </h4>
                <p>
                  Sie haben einen umgekippten Blumentopf oder ausgelaufenes Wasser bemerkt? Je schneller wir die Verfärbung analysieren, desto einfacher lässt sie sich behandeln.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-on-surface flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Bei grauen Laufstrassen
                </h4>
                <p>
                  Bevor Sie Tausende von Franken für ein komplettes Abschleifen investieren, prüfen wir per Foto, ob eine Tiefenreinigung ausreicht.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-on-surface flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Beim Kauf einer Immobilie
                </h4>
                <p>
                  Sie besichtigen ein Haus und sind sich unsicher über den Zustand des Holzbodens? Senden Sie uns die Maklerbilder für eine Ersteinschätzung.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        title="Häufige Fragen zur Fotoanalyse"
        subtitle="Erfahren Sie mehr über die Funktionsweise unseres digitalen Diagnose-Tools."
        faqs={[
          {
            question: "Ersetzt die Online-Fotoanalyse einen Experten vor Ort?",
            answer: "Die Fotoanalyse dient als hervorragende erste Orientierung und hilft, die richtige Methode (z.B. Reinigung vs. Schleifen) einzugrenzen. Für eine verbindliche Offerte oder bei extrem komplexen Schäden prüfen wir den Boden bei Bedarf natürlich auch persönlich vor Ort."
          },
          {
            question: "Welche Fotos eignen sich am besten für den Upload?",
            answer: "Nehmen Sie idealerweise ein Übersichtsfoto auf, das das gesamte Zimmer und das Lichtspiel zeigt, sowie ein direktes, gut ausgeleuchtetes Detailfoto des Schadens aus geringer Entfernung."
          },
          {
            question: "Ist die Fotoanalyse wirklich kostenlos?",
            answer: "Ja, dieser Service ist für Sie komplett kostenlos und unverbindlich. Es ist unser Beitrag dazu, Eigentümer und Mieter im Raum Zürich fair und fachlich fundiert zu beraten."
          }
        ]}
      />

      <CTABanner />
    </>
  );
}
