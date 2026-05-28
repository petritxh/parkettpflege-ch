import { Metadata } from 'next';
import Link from 'next/link';
import PriceEstimator from '@/components/PriceEstimator';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Kosten für Parkettpflege in Zürich | Preistabelle & Rechner',
  description: 'Was kostet Parkett schleifen, ölen, reinigen oder reparieren? Transparente Richtpreise pro m² für den Raum Zürich. Kostenrechner & Fotoanalyse nutzen.',
  alternates: {
    canonical: 'https://parkett-pflege.ch/kosten',
  },
};

export default function KostenPage() {
  const priceFactors = [
    {
      title: "Flächengrösse (m²)",
      text: "Bei grösseren zusammenhängenden Flächen sinkt in der Regel der Quadratmeterpreis, da sich Rüst- und Anfahrzeiten besser verteilen."
    },
    {
      title: "Zustand & Schadensbild",
      text: "Oberflächlicher Schmutz erfordert eine Reinigung, während tiefe Kratzer, Verfärbungen oder Wasserschäden einen Abschliff oder Dielentausch nötig machen."
    },
    {
      title: "Gewünschte Oberfläche",
      text: "Die Wahl zwischen natürlichem Pflegeöl, farbigem Öl oder extrem strapazierfähigem 2K-Wasserlack beeinflusst den Materialaufwand."
    },
    {
      title: "Möblierung & Barrieren",
      text: "Leere Räume lassen sich zügiger bearbeiten. Müssen Möbel verschoben, Sockelleisten erneuert oder Treppenstufen integriert werden, erhöht dies den Aufwand."
    }
  ];

  const richtpreise = [
    { treatment: "Tiefenreinigung & Sättigung", price: "CHF 10.– bis 18.– / m²", note: "Für matte, oberflächlich beanspruchte Böden" },
    { treatment: "Parkett reinigen & nachölen", price: "CHF 15.– bis 25.– / m²", note: "Für ausgetrocknetes, stumpfes geöltes Parkett" },
    { treatment: "Kompletter Abschliff inkl. Ölung", price: "CHF 35.– bis 50.– / m²", note: "Beseitigt tiefe Kratzer, Flecken und Dellen" },
    { treatment: "Kompletter Abschliff inkl. Versiegelung", price: "CHF 40.– bis 55.– / m²", note: "Hervorragender Schutz für Küche & Gewerbe" },
    { treatment: "Lokale Parkettreparatur (Spot-Repair)", price: "CHF 150.– bis 450.– / Stelle", note: "Hartwachs-Retusche, Bleichen, Dielentausch" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-surface-container-low mt-20 text-on-surface">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Preise & Transparenz</span>
          <h1 className="font-headline-lg text-4xl md:text-5xl mb-6">Kosten für Parkettpflege, Reparatur und Renovation</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Die Kosten für Parkettpflege hängen von Fläche, Zustand, Oberfläche, Schadenstiefe und gewünschtem Ergebnis ab. Eine Reinigung ist meist weniger aufwendig als ein kompletter Abschliff, reicht aber nicht bei jedem Schaden.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <nav className="py-4 px-margin-mobile md:px-margin-desktop bg-surface border-b border-outline-variant/30 text-xs max-w-container-max-width mx-auto">
        <div className="flex gap-2 text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-on-surface font-medium">Kosten</span>
        </div>
      </nav>

      {/* Richtpreise Table & Hauptinhalt */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop bg-surface text-on-surface">
        <div className="max-w-container-max-width mx-auto space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Column: Text content */}
            <div className="space-y-6">
              <h2 className="font-headline-md text-2xl md:text-3xl font-bold">Warum sich Kosten nicht pauschal nennen lassen</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Holz ist ein lebendiges Naturmaterial. Jedes Parkettprojekt stellt andere Anforderungen. Während bei einer Mietwohnung vor der Übergabe oft eine maschinelle Reinigung und Auffrischung vollkommen ausreicht, muss ein edler Altbau-Boden mit Wasserschäden vorsichtig getrocknet, geschliffen und neu aufgebaut werden.
              </p>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Bei <strong>parkett-pflege.ch</strong> setzen wir auf absolute Kostenehrlichkeit. Wir versprechen Ihnen keine unrealistischen Schleifpreise, die sich im Nachhinein durch versteckte Nebenkosten vervielfachen. Jede Kalkulation basiert auf den tatsächlichen physikalischen Anforderungen Ihres Bodens.
              </p>

              <h2 className="font-headline-md text-2xl md:text-3xl font-bold pt-4">Welche Faktoren beeinflussen den Preis?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {priceFactors.map((factor, index) => (
                  <div key={index} className="space-y-2 p-5 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl">
                    <h3 className="font-headline-xs text-base font-bold text-on-surface">{factor.title}</h3>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">{factor.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Richtpreise Table */}
            <div className="bg-surface-container-lowest p-8 border border-outline-variant/30 rounded-3xl space-y-6">
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface">Richtpreise für den Raum Zürich</h2>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Die Angaben dienen als Orientierung. Der tatsächliche Aufwand hängt von Fläche, Zustand, Oberfläche, Holzart, Möbeln, Zugänglichkeit und gewünschtem Ergebnis ab. Eine Fotoanalyse oder Besichtigung ermöglicht eine genauere Einschätzung.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/30 text-on-surface-variant">
                      <th className="py-3 font-semibold">Behandlung</th>
                      <th className="py-3 font-semibold text-right">Richtpreis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10 text-on-surface">
                    {richtpreise.map((item, idx) => (
                      <tr key={idx} className="hover:bg-surface-variant/10">
                        <td className="py-4 pr-4">
                          <span className="font-bold block">{item.treatment}</span>
                          <span className="text-xs text-on-surface-variant">{item.note}</span>
                        </td>
                        <td className="py-4 text-right font-bold text-primary whitespace-nowrap">
                          {item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-primary-container/20 text-on-primary-container text-xs rounded-2xl border border-primary/10 leading-relaxed">
                <strong>Sparpotenzial nutzen:</strong> Eine rechtzeitige professionelle Reinigung oder Nachölung kostet oft nur ein Viertel eines kompletten Abschliffs. Zögern Sie die Pflege nicht hinaus, um teure Sanierungskosten zu vermeiden.
              </div>
            </div>

          </div>

          {/* Interactive price estimator embedded */}
          <div className="bg-surface-container-lowest p-8 md:p-12 border border-outline-variant/30 rounded-3xl space-y-8" id="estimator">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="font-headline-md text-3xl font-bold">Kosten direkt online berechnen</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Wählen Sie Ihre Raumgrösse und den aktuellen Zustand des Parketts, um sofort einen realistischen Preisrahmen für Ihr Projekt zu ermitteln.
              </p>
            </div>
            <PriceEstimator />
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        title="Häufige Fragen zu Preisen & Kosten"
        subtitle="Wir stehen für verlässliche Handwerkspreise ohne versteckte Gebühren."
        faqs={[
          {
            question: "Sind Anfahrtskosten im Preis inbegriffen?",
            answer: "Ja, für den gesamten Grossraum und Kanton Zürich sowie angrenzende Gemeinden berechnen wir keine separaten Anfahrtskosten. Unsere Teams sind täglich im Raum Zürich im Einsatz."
          },
          {
            question: "Gibt es versteckte Kosten bei parkett-pflege.ch?",
            answer: "Nein. Sie erhalten nach einer Begutachtung (online per Foto oder vor Ort) einen transparenten, schriftlichen Kostenvoranschlag. Dieser Preis ist für uns bindend."
          },
          {
            question: "Wann wird eine Parkettrenovierung aufwendiger?",
            answer: "Aufwendiger wird es, wenn wir mehrere alte, festsitzende Lackschichten abschleifen müssen, tiefe Urinflecken ausgebleicht oder einzelne Dielen wegen starker Fäulnis ausgetauscht werden müssen."
          },
          {
            question: "Zahlt die Hausrat- oder Haftpflichtversicherung den Schaden?",
            answer: "Bei plötzlichen, unvorhergesehenen Ereignissen wie einem Rohrbruch, ausgelaufenen Waschmaschinen oder Mieterschäden (z.B. tiefe Kratzer beim Zügeln) übernimmt oft die Haftpflicht- oder Hausratversicherung die Kosten. Wir erstellen Ihnen hierfür gerne einen professionellen Bericht für Ihre Versicherung."
          }
        ]}
      />

      <CTABanner />
    </>
  );
}
