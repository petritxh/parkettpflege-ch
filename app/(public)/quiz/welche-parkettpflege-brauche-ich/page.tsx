import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, CheckCircle, Info } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import InteractiveGuide from '@/components/InteractiveGuide';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Welche Parkettpflege brauche ich? Quiz | parkett-pflege.ch',
  description: 'Ermitteln Sie mit unserem interaktiven Online-Pflegeberater in wenigen Schritten die perfekte Pflegebehandlung und Produkte für Ihren Parkettboden.',
  alternates: {
    canonical: 'https://parkett-pflege.ch/quiz/welche-parkettpflege-brauche-ich',
  },
};

export default function PflegeQuizPage() {
  const benefitCards = [
    {
      title: "Passgenaue Empfehlung",
      text: "Ob geölt, gewachst oder lackiert: Jede Holzoberfläche benötigt eine spezifische Pflege. Unser Quiz identifiziert den genauen Bedarf."
    },
    {
      title: "Schutz vor Pflegefehlern",
      text: "Falsche Produkte können die schützende Versiegelung zerstören oder klebrige Schichten aufbauen. Vermeiden Sie kostspielige Fehler."
    },
    {
      title: "Materialschonende Lösungen",
      text: "Wir empfehlen Ihnen nur Pflegemassnahmen und pH-neutrale Produkte, die das Holz nachhaltig nähren und die Struktur erhalten."
    },
    {
      title: "Effektiver Werterhalt",
      text: "Mit der richtigen Pflegeroutine bleibt die edle Ausstrahlung Ihres Bodens über Jahrzehnte erhalten – ganz ohne Schleifen."
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Parkett-Pflege-Quiz von parkett-pflege.ch',
    url: 'https://parkett-pflege.ch/quiz/welche-parkettpflege-brauche-ich',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description: 'Interaktiver Selbsttest zur Bestimmung der idealen Pflegemethode für Ihren Parkettboden.',
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
          <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Pflege-Berater</span>
          <h1 className="font-headline-lg text-4xl md:text-5xl mb-6">Welche Parkettpflege brauche ich?</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Finden Sie in wenigen Sekunden heraus, welche Pflegebehandlung, Reinigungsmethode oder Oberflächensättigung Ihr Parkettboden aktuell wirklich benötigt.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <nav className="py-4 px-margin-mobile md:px-margin-desktop bg-surface border-b border-outline-variant/30 text-xs max-w-container-max-width mx-auto">
        <div className="flex gap-2 text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
          <span>/</span>
          <span className="hover:text-primary transition-colors">Quiz</span>
          <span>/</span>
          <span className="text-on-surface font-medium">Welche Parkettpflege brauche ich?</span>
        </div>
      </nav>

      {/* Interactive Tool Embed Area */}
      <section className="py-16 bg-surface text-on-surface">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Tool Instruction (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-headline-md text-2xl md:text-3xl font-bold">Die passende Pflege bestimmt die Lebensdauer</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Ein edler Parkettboden reagiert sensibel auf seine Umwelt. Faktoren wie Luftfeuchtigkeit im Winter, spielende Kinder, Haustiere oder die Wahl des Wischmops bestimmen, wie stark die Schutzschicht abgenutzt wird. Unser interaktiver Berater ermittelt das optimale Vorgehen.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefitCards.map((card, idx) => (
                  <div key={idx} className="p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl space-y-1.5">
                    <h4 className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-secondary" />
                      {card.title}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">{card.text}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl flex gap-3 text-xs text-on-surface-variant leading-relaxed">
                <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <p>
                  <strong>Schon gewusst?</strong> Ein mattes Parkett hat oft nur einen Grauschleier durch alte Seifenschichten. Mit der richtigen Reinigungsmethode erstrahlt es wieder – ganz ohne Abschliff.
                </p>
              </div>
            </div>

            {/* InteractiveGuide Box (7 cols) */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-[600px] bg-surface-container-lowest p-8 border border-outline-variant/30 rounded-3xl shadow-xl">
                <InteractiveGuide />
              </div>
            </div>

          </div>

          <div className="max-w-3xl space-y-6 pt-8 border-t border-outline-variant/10">
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold">Die wichtigsten Pflegeregeln für den Alltag</h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Unabhängig von der genauen Behandlung Ihres Holzbodens gibt es einige goldene Regeln, die Sie für jeden Parkettboden im Raum Zürich beachten sollten:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-on-surface-variant">
              <li>
                <strong>Niemals klitschnass wischen:</strong> Wischen Sie Parkett immer nur nebelfeucht. Stehendes Wasser dringt in die Fugen ein und führt zum Aufquellen des Holzes.
              </li>
              <li>
                <strong>Verzicht auf Dampfreiniger:</strong> Dampfreiniger pressen heissen Dampf unter hohem Druck in das Holz und zerstören Lacke und Öle nachhaltig.
              </li>
              <li>
                <strong>Vorsicht mit Mikrofasertüchern:</strong> Viele handelsübliche Mikrofasertücher wirken wie feines Schleifpapier und hinterlassen kleinste Kratzer auf der Oberfläche. Nutzen Sie weiche Baumwolltücher.
              </li>
              <li>
                <strong>Schmutzschleusen einrichten:</strong> Sand und feiner Kies wirken auf Parkett wie Schleifpapier. Matten im Eingangsbereich halten diese Partikel effektiv fern.
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        title="Häufige Fragen zur Parkettpflege"
        subtitle="Erfahren Sie, wie Sie Ihren Boden langfristig schützen."
        faqs={[
          {
            question: "Wie oft muss geöltes Parkett gepflegt werden?",
            answer: "Ein geölter Boden sollte je nach Beanspruchung alle 1–2 Jahre mit einem speziellen Pflegeöl nachbehandelt werden. Im Alltag reicht das regelmässige Staubsaugen und nebelfeuchte Wischen mit einer rückfettenden Holzbodenseife."
          },
          {
            question: "Wie lässt sich lackiertes Parkett auffrischen?",
            answer: "Für lackierte (versiegelte) Böden gibt es spezielle Parkett-Refresher oder Polish-Produkte. Diese gleichen feine Kratzer im Lack optisch aus und reaktivieren den Glanz des Bodens."
          },
          {
            question: "Was hilft bei stumpfen Laufstrassen?",
            answer: "Stumpfe Laufstrassen deuten auf eine abgenutzte Schutzschicht hin. Hier hilft eine professionelle maschinelle Tiefenreinigung mit anschliessender Intensivpflege (Nachölung bzw. Reaktivierung der Versiegelung), um ein gleichmässiges Bild wiederherzustellen."
          }
        ]}
      />

      <CTABanner />
    </>
  );
}
