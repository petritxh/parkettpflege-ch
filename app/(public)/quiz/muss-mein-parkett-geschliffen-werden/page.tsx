import { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, CheckCircle, Info } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import InteractiveGuide from '@/components/InteractiveGuide';
import FAQSection from '@/components/sections/FAQSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Muss mein Parkett geschliffen werden? Quiz | parkett-pflege.ch',
  description: 'Finden Sie mit unserem interaktiven Selbsttest in 4 kurzen Schritten heraus, ob Ihr Parkettboden einen Abschliff benötigt oder eine Reinigung ausreicht.',
  alternates: {
    canonical: 'https://parkett-pflege.ch/quiz/muss-mein-parkett-geschliffen-werden',
  },
};

export default function SchleifQuizPage() {
  const diagnosticChecks = [
    {
      title: "Der Wassertropfen-Test",
      text: "Geben Sie einen winzigen Tropfen Wasser auf das Holz. Zieht er sofort ein, ist die Schutzschicht ausgetrocknet oder das Öl abgetragen. Der Boden ist gefährdet."
    },
    {
      title: "Fühlbare Kratzer & Dellen",
      text: "Fahren Sie mit dem Finger über Kratzer. Sind diese deutlich ins Holz eingeschnitten und weisen raue Kanten auf, ist meist nur ein Abschliff zielführend."
    },
    {
      title: "Dunkle Verfärbungen",
      text: "Haben Sie dunkle oder fast schwarze Flecken (z.B. unter Pflanzentöpfen)? Hier hat Feuchtigkeit mit Gerbsäure reagiert – dies sitzt meist tiefer."
    },
    {
      title: "Graue Laufstrassen",
      text: "Wirkt das Parkett in viel belaufenen Wegen grau? Das Holz liegt offen und nimmt Schmutz auf. Hier entscheidet die Tiefe über Reinigung oder Abschliff."
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Parkett-Diagnose-Quiz von parkett-pflege.ch',
    url: 'https://parkett-pflege.ch/quiz/muss-mein-parkett-geschliffen-werden',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    description: 'Interaktiver Selbsttest zur Ermittlung des Renovationsbedarfs Ihres Parkettbodens.',
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
          <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Selbsttest</span>
          <h1 className="font-headline-lg text-4xl md:text-5xl mb-6">Muss mein Parkett geschliffen werden?</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Machen Sie den schnellen, interaktiven Test. Finden Sie heraus, ob Ihr Holzboden einen kompletten Abschliff benötigt – oder ob eine vitaminschonende Reinigung ausreicht.
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
          <span className="text-on-surface font-medium">Muss mein Parkett geschliffen werden?</span>
        </div>
      </nav>

      {/* Interactive Tool Embed Area */}
      <section className="py-16 bg-surface text-on-surface">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Tool Instruction (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-headline-md text-2xl md:text-3xl font-bold">Diagnose in wenigen Klicks</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Viele Holzböden werden voreilig abgeschliffen. Das kostet nicht nur unnötiges Geld, sondern trägt auch wertvolle Nutzschicht ab. Unser Diagnose-Quiz hilft Ihnen, das Schadensbild Ihres Parketts richtig einzuschätzen und die schonendste Methode zu wählen.
              </p>
              
              <div className="space-y-4">
                {diagnosticChecks.map((item, idx) => (
                  <div key={idx} className="flex gap-3.5 items-start">
                    <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-on-surface">{item.title}</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl flex gap-3 text-xs text-on-surface-variant leading-relaxed">
                <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <p>
                  <strong>Unser Grundsatz:</strong> Parkett retten statt ersetzen. Wir raten Ihnen nur dann zum Schleifen, wenn es aus technischer Sicht unumgänglich ist.
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
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold">Wann reicht eine Tiefenreinigung aus?</h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Eine maschinelle Tiefenreinigung ist eine hochwirksame und substanzschonende Alternative zum Abschliff. Sie ist in folgenden Fällen die beste Wahl:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-on-surface-variant">
              <li>
                <strong>Vergrauter Schleier:</strong> Schmutzpartikel haben sich in die Poren des Holzes gesetzt, die Versiegelung oder Ölung ist aber ansonsten noch intakt.
              </li>
              <li>
                <strong>Klebrige Rückstände:</strong> Falsche Pflegemittel (z.B. Allzweckreiniger oder zu viel Wachs) haben einen klebrigen Film gebildet, der Schmutz anzieht.
              </li>
              <li>
                <strong>Matte Oberfläche:</strong> Das Holz hat seinen Glanz verloren, weist aber keine tiefen mechanischen Beschädigungen wie Risse oder Löcher auf.
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        title="Häufige Fragen zum Schleifen"
        subtitle="Erfahren Sie, wann ein Abschliff wirklich notwendig ist."
        faqs={[
          {
            question: "Wie oft kann ein Parkettboden geschliffen werden?",
            answer: "Das hängt von der Dicke der Nutzschicht ab. Massivparkett oder hochwertiges Mehrschichtparkett hat meist eine Nutzschicht von 3.5 bis 6 mm und kann problemlos 2- bis 4-mal im Leben geschliffen werden. Furnierparkett mit einer Nutzschicht unter 2 mm lässt sich in der Regel nicht schleifen."
          },
          {
            question: "Ist das Schleifen von Parkett staubig?",
            answer: "Bei parkett-pflege.ch arbeiten wir ausschliesslich mit hochentwickelten Schleifmaschinen, die an leistungsstarke Absaugsysteme angeschlossen sind. Dadurch bleibt der Schleifstaub zu 99% im System und Ihr Wohnraum absolut sauber."
          },
          {
            question: "Wie lange darf der Boden nach dem Schleifen nicht betreten werden?",
            answer: "Nach einer Ölung ist der Boden meist nach 12-24 Stunden wieder vorsichtig begehbar. Nach einer Lackversiegelung sollten Sie ebenfalls 24 Stunden warten. Die vollständige chemische Aushärtung und volle Strapazierfähigkeit ist nach ca. 5-7 Tagen erreicht."
          }
        ]}
      />

      <CTABanner />
    </>
  );
}
