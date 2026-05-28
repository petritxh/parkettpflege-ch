import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, CheckCircle, Info } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import PriceEstimator from '@/components/PriceEstimator';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Parkett-Kostenrechner online | parkett-pflege.ch',
  description: 'Berechnen Sie sofort online die Kosten für das Schleifen, Ölen, Reinigen oder Reparieren Ihres Parkettbodens in Zürich. Unverbindliche Budgethilfe.',
  alternates: {
    canonical: 'https://parkett-pflege.ch/tools/parkett-kostenrechner',
  },
};

export default function KostenrechnerPage() {
  const estimationSteps = [
    {
      step: 1,
      title: "Fläche auswählen",
      description: "Geben Sie die ungefähre Quadratmeterzahl Ihres Zimmers oder Ihrer gesamten Wohnung ein."
    },
    {
      step: 2,
      title: "Zustand beschreiben",
      description: "Wählen Sie das passende Schadensbild: von leichten Gebrauchsspuren bis zu tiefen Verfärbungen."
    },
    {
      step: 3,
      title: "Preise ermitteln",
      description: "Unser Rechner kalkuliert in Echtzeit Richtpreise für alle infrage kommenden Behandlungsmethoden."
    },
    {
      step: 4,
      title: "Einschätzung vertiefen",
      description: "Senden Sie uns bei Bedarf direkt ein Foto über die integrierte Analyse für eine verbindliche Offerte."
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Parkett-Kostenrechner von parkett-pflege.ch',
    url: 'https://parkett-pflege.ch/tools/parkett-kostenrechner',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description: 'Berechnen Sie online die m²-Kosten für die Renovation oder Reinigung Ihres Parketts im Raum Zürich.',
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
          <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Kosten-Rechner</span>
          <h1 className="font-headline-lg text-4xl md:text-5xl mb-6">Parkett-Kostenrechner</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Ermitteln Sie mit unserem präzisen Online-Kostenrechner sofort ein realistisches Budget für Ihre Parkettaufbereitung. Transparent, verlässlich und ohne Registrierung.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <nav className="py-4 px-margin-mobile md:px-margin-desktop bg-surface border-b border-outline-variant/30 text-xs max-w-container-max-width mx-auto">
        <div className="flex gap-2 text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-on-surface font-medium">Tools & Kostenrechner</span>
        </div>
      </nav>

      {/* Interactive Tool Embed Area */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface text-on-surface">
        <div className="max-w-container-max-width mx-auto space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Tool Instruction (4 cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              <h2 className="font-headline-md text-2xl md:text-3xl font-bold">Wie berechnen sich die Parkettkosten?</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Der Preis für eine professionelle Parkettbehandlung setzt sich aus mehreren Faktoren zusammen. Neben der reinen Grundfläche spielen der Holz-Härtegrad (z.B. Eiche vs. weichere Nadelhölzer) und die Art der bisherigen Beschichtung eine entscheidende Rolle.
              </p>
              
              <div className="space-y-4">
                {estimationSteps.map((step, idx) => (
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
                  <strong>Hinweis zur Genauigkeit:</strong> Unser Rechner gibt Ihnen eine sehr präzise Orientierung für den Raum Zürich. Kleine Abweichungen können durch spezielle Vorarbeiten vor Ort entstehen.
                </p>
              </div>
            </div>

            {/* PriceEstimator Box (8 cols) */}
            <div className="lg:col-span-8">
              <PriceEstimator />
            </div>

          </div>

          <div className="max-w-3xl space-y-6 pt-8 border-t border-outline-variant/10">
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold">Wo liegen die Unterschiede im Budget?</h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Viele Kunden sind überrascht, dass eine komplette Parkettsanierung gar nicht immer notwendig ist. Durch gezielte Massnahmen lässt sich das Budget erheblich schonen:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-on-surface-variant leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-bold text-on-surface">1. Maschinelle Tiefenreinigung (Sehr preiswert)</h4>
                <p>
                  Wenn die Oberfläche intakt ist, aber der Boden durch Schmutz und Reste alter Reinigungsmittel stumpf wirkt. Zieht den Grauschleier porentief aus dem Holz – ganz ohne Materialabtrag.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-on-surface">2. Lokale Reparaturen (Kostensparend)</h4>
                <p>
                  Haben Sie einen Brandfleck oder tiefe Kratzer nur an einer Stelle? Statt den gesamten Raum abzuschleifen, reparieren wir gezielt nur die Schadstellen. Das spart bis zu 80% der Kosten.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-on-surface">3. Abschliff & Neuaufbau (Höchster Werterhalt)</h4>
                <p>
                  Erst wenn das Holz grossflächige mechanische Schäden aufweist oder die Lackschicht an den Kanten durchgescheuert ist, ist ein staubfreier Abschliff die nachhaltigste Investition.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-on-surface">4. Regelmässiges Nachölen (Präventiv)</h4>
                <p>
                  Wer geöltes Parkett alle 1–2 Jahre hauchdünn nachölt, verhindert, dass Schmutz und Feuchtigkeit ins Holz eindringen. Diese günstige Pflege erspart Ihnen langfristig den Schleifaufwand.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        title="Häufige Fragen zu den Parkettkosten"
        subtitle="Erfahren Sie, wie wir transparent und fair kalkulieren."
        faqs={[
          {
            question: "Gibt es versteckte Zusatzkosten bei parkett-pflege.ch?",
            answer: "Nein. Wir stehen für absolute Preistransparenz. Nach einer Begutachtung erhalten Sie eine verbindliche Festpreis-Offerte – inklusive aller Vorbereitungsarbeiten, Schleifmaterialien und Entsorgungen."
          },
          {
            question: "Muss der Raum für die Parkettarbeiten komplett leer sein?",
            answer: "Bei einer vollflächigen Behandlung (Reinigung, Ölung oder Abschliff) muss der Raum komplett ausgeräumt sein. Bei lokalen Reparaturen oder einer punktuellen Ausbesserung ist das in der Regel nicht nötig."
          },
          {
            question: "Sind Anfahrtskosten im Preis enthalten?",
            answer: "Ja. Für alle Liegenschaften im Kanton Zürich und in angrenzenden Gemeinden berechnen wir keine zusätzlichen Anfahrtskosten. Unsere Teams sind ohnehin täglich in der Region unterwegs."
          }
        ]}
      />

      <CTABanner />
    </>
  );
}
