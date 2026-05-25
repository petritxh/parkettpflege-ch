import { Metadata } from 'next';
import PriceEstimator from '@/components/PriceEstimator';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Parkett schleifen & ölen: Kosten & Preise Schweiz | Kostenrechner',
  description: 'Transparente Preise für die Parkettrenovierung. Nutzen Sie unseren online Kostenrechner für eine sofortige Schätzung Ihres Projekts in der Schweiz.',
};

export default function KostenPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-surface-container-low mt-20">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center mb-16">
          <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Transparenz</span>
          <h1 className="font-headline-lg text-4xl md:text-5xl mb-6">Was kostet eine Parkettrenovierung?</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Nutzen Sie unseren Kostenrechner für eine unverbindliche erste Einschätzung. Die finalen Preise hängen vom genauen Zustand Ihres Bodens ab.
          </p>
        </div>
        
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
           <PriceEstimator />
        </div>
      </section>

      <FAQSection 
        title="Fragen zu unseren Preisen"
        subtitle="Wir kalkulieren fair und transparent."
        faqs={[
          {
            question: "Sind Anfahrtskosten im Preis inbegriffen?",
            answer: "In unseren Richtpreisen sind die Anfahrtskosten für den Grossraum Zürich/Zug/Aargau bereits einkalkuliert. Für weiter entfernte Regionen berechnen wir eine kleine Pauschale."
          },
          {
            question: "Gibt es versteckte Kosten?",
            answer: "Nein. Nach einer Begutachtung vor Ort oder via KI-Analyse erhalten Sie einen verbindlichen Kostenvoranschlag. Dieser Preis ist fix, es sei denn, es werden unerwartete Untergrundschäden festgestellt, über die wir Sie aber sofort informieren."
          },
          {
            question: "Warum variieren die Preise für Versiegelung?",
            answer: "Es gibt verschiedene Lackqualitäten. Ein normaler Wohnraumlack ist günstiger als ein extrem widerstandsfähiger 2K-Lack für stark frequentierte Gewerbeflächen."
          }
        ]}
      />

      <CTABanner />
    </>
  );
}
