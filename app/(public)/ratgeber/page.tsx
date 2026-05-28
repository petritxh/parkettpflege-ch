import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import CTABanner from '@/components/sections/CTABanner';
import InteractiveGuide from '@/components/InteractiveGuide';
import { homepageContent } from '@/data/homepage-content';

export const metadata: Metadata = {
  title: 'Ratgeber für Parkettpflege & Werterhalt | parkett-pflege.ch',
  description: 'Fachwissen zu Parkett: Geöltes & lackiertes Parkett pflegen, schleifen oder reinigen, Dampfreiniger-Risiken und Winter-Tipps. Werte bewahren.',
  alternates: {
    canonical: 'https://parkett-pflege.ch/ratgeber',
  },
};

export default function RatgeberHubPage() {
  const guides = [
    {
      title: "Geöltes Parkett richtig pflegen",
      text: "Geöltes Holz bleibt atmungsaktiv und fühlt sich wunderbar samtig an. Erfahren Sie, wie Sie es im Alltag schonend reinigen und durch regelmässiges Nachölen schützen.",
      href: "/ratgeber/geoeltes-parkett-richtig-pflegen"
    },
    {
      title: "Lackiertes Parkett pflegen",
      text: "Versiegelte Oberflächen sind äusserst pflegeleicht. Doch falsche Allzweckreiniger oder zu viel Nässe können dem Lack schaden. So bleibt der Schutzfilm makellos.",
      href: "/ratgeber/lackiertes-parkett-pflegen"
    },
    {
      title: "Parkett ölen oder versiegeln?",
      text: "Vor- und Nachteile im direkten Vergleich. Erfahren Sie, welche Behandlung besser zu Ihrem Nutzungsverhalten, Haustieren und Ihrem ästhetischen Anspruch passt.",
      href: "/ratgeber/parkett-oelen-oder-versiegeln"
    },
    {
      title: "Parkett schleifen oder reinigen?",
      text: "Muss der Holzboden zwingend geschliffen werden? Oft reicht eine maschinelle Tiefenreinigung aus. Wir erklären Ihnen die Unterschiede und Entscheidungshilfen.",
      href: "/ratgeber/parkett-schleifen-oder-reinigen"
    },
    {
      title: "Dampfreiniger auf Parkett",
      text: "Warum heisser Dampf unter hohem Druck der absolute Feind Ihres Parkettbodens ist und welche materialschonenden Alternativen wirklich Schmutz entfernen.",
      href: "/ratgeber/dampfreiniger-auf-parkett"
    },
    {
      title: "Parkettpflege im Winter",
      text: "Trockene Heizungsluft entzieht dem Holz Feuchtigkeit, was zu unschönen Fugen führen kann. So pflegen und schützen Sie Ihr Parkett optimal in der kalten Jahreszeit.",
      href: "/ratgeber/parkettpflege-im-winter"
    }
  ];

  return (
    <>
      <HeroSection 
        label="Tipps & Praxiswissen"
        title="Ratgeber für Parkettpflege und Werterhalt"
        description="Wer Parkett richtig pflegt, vermeidet viele Schäden und erhält die Wirkung des Bodens länger. Im Ratgeber finden Sie verständliche Erklärungen zu Pflege, Oberflächen, Fehlern und sinnvollen Behandlungen."
        backgroundImageUrl={undefined}
        showAIAdvisor={true}
        primaryButtonText="KI-Diagnose starten"
        primaryButtonHref="#ai-diagnostic"
      />

      {/* Breadcrumbs */}
      <nav className="py-4 px-margin-mobile md:px-margin-desktop bg-surface border-b border-outline-variant/30 text-xs max-w-container-max-width mx-auto">
        <div className="flex gap-2 text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-on-surface font-medium">Ratgeber</span>
        </div>
      </nav>

      {/* Articles Grid Section */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface text-on-surface">
        <div className="max-w-container-max-width mx-auto space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content Info */}
            <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
              <h2 className="font-headline-md text-3xl font-bold">Wissen schützt Ihren Fussboden</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Ein hochwertiger Parkettboden hält Generationen – vorausgesetzt, er erhält die richtige Pflege. Viele gravierende Schäden entstehen nicht durch Abnutzung, sondern durch gut gemeinte, aber falsche Pflegepraktiken (z.B. Dampfreiniger, ungeeignete Pflegemittel oder übermässige Nässe beim Wischen).
              </p>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Unsere Fachartikel vermitteln Ihnen praxiserprobtes Wissen, basierend auf den Standards des Schweizer Handwerks. Wir zeigen Ihnen, wie Sie kleinere Flecken selbst behandeln können und wann die Unterstützung eines Fachbetriebs sinnvoll ist.
              </p>
              
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 space-y-3">
                <h4 className="font-bold text-sm text-secondary">Unser Leitprinzip</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <strong>Parkett retten statt ersetzen.</strong> Jede Pflege- und Aufbereitungsmassnahme, die wir im Ratgeber beschreiben, zielt darauf ab, die Lebensdauer Ihres bestehenden Holzbodens nachhaltig zu maximieren.
                </p>
              </div>
            </div>

            {/* Guides Cards Grid */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {guides.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-3xl p-8 border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:border-secondary/20"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="font-headline-sm text-xl font-bold text-on-surface">
                      {item.title}
                    </h3>
                    <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                      {item.text}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-outline-variant/10 mt-6">
                    <Link 
                      href={item.href}
                      className="inline-flex items-center gap-1.5 font-bold text-sm text-primary hover:text-primary-hover group"
                    >
                      <span>Ratgeber aufrufen</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Diagnostic Guide */}
      <section id="ai-diagnostic" className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-headline-md text-3xl md:text-5xl font-bold">Welche Parkettpflege brauchen Sie?</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Unser interaktiver Parkett-Check analysiert den Zustand Ihres Bodens anhand weniger Fragen und liefert Ihnen direkt eine massgeschneiderte Pflegeempfehlung.
            </p>
          </div>
          <InteractiveGuide />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
