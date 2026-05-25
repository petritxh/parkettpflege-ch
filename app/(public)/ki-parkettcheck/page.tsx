import { Metadata } from 'next';
import AIAdvisor from '@/components/AIAdvisor';
import FAQSection from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title: 'KI Parkettcheck: Kostenlose Schadensanalyse online',
  description: 'Laden Sie ein Foto Ihres Parketts hoch. Unsere KI analysiert den Schaden, erkennt die Holzart und gibt Ihnen eine erste Einschätzung zur Reparatur.',
};

export default function KIParkettcheckPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-surface-container-low mt-20">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center mb-16">
          <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Kostenlose Diagnose</span>
          <h1 className="font-headline-lg text-4xl md:text-5xl mb-6">KI Parkettcheck</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Laden Sie ein Bild Ihres Bodens hoch. Unser digitaler Assistent bewertet den Zustand und gibt Ihnen sofort eine erste Empfehlung für das weitere Vorgehen.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop">
           <AIAdvisor />
        </div>
      </section>

      <FAQSection 
        title="Fragen zum KI-Check"
        subtitle="Wie funktioniert die künstliche Intelligenz?"
        faqs={[
          {
            question: "Was passiert mit meinem hochgeladenen Bild?",
            answer: "Das Bild wird nur für die Dauer der Analyse verarbeitet und nicht dauerhaft gespeichert oder für andere Zwecke verwendet, es sei denn, Sie entscheiden sich, eine Offerte anzufragen. In diesem Fall wird das Bild zur Bearbeitung Ihrer Anfrage sicher übermittelt."
          },
          {
            question: "Ersetzt die KI eine Begutachtung vor Ort?",
            answer: "Nein. Die KI-Analyse liefert eine schnelle Ersteinschätzung (z.B. ob ein Boden tendenziell abgeschliffen werden muss oder nur gereinigt werden kann). Für eine verbindliche Offerte und eine genaue Schadensanalyse ist eine finale Begutachtung durch unsere Experten notwendig."
          },
          {
            question: "Welche Art von Bildern funktioniert am besten?",
            answer: "Bitte laden Sie ein gut beleuchtetes Bild hoch, das den Schaden oder den Bodenbereich scharf und deutlich zeigt. Vermeiden Sie starke Schatten oder Unschärfen."
          }
        ]}
      />
    </>
  );
}
