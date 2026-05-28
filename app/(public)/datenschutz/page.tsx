import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Eye, Lock, FileText } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | parkett-pflege.ch',
  description: 'Datenschutzerklärung von parkett-pflege.ch – Erfahren Sie, wie wir Ihre persönlichen Daten schützen, erfassen und verarbeiten.',
  alternates: {
    canonical: 'https://parkett-pflege.ch/datenschutz',
  },
};

export default function DatenschutzPage() {
  return (
    <>
      <HeroSection 
        label="Rechtliche Hinweise"
        title="Datenschutzerklärung"
        description="Wie wir Ihre persönlichen Daten erfassen, verarbeiten und schützen. Transparent und gemäss dem Schweizer Datenschutzgesetz (DSG)."
        backgroundImageUrl={undefined}
        showAIAdvisor={false}
        primaryButtonText="Kontakt aufnehmen"
        primaryButtonHref="/kontakt"
      />

      {/* Breadcrumbs */}
      <nav className="py-4 px-margin-mobile md:px-margin-desktop bg-surface border-b border-outline-variant/30 text-xs max-w-container-max-width mx-auto">
        <div className="flex gap-2 text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-on-surface font-medium">Datenschutz</span>
        </div>
      </nav>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface text-on-surface">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 space-y-6">
            <h2 className="font-headline-sm text-2xl font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/30 pb-4">
              <ShieldCheck className="w-6 h-6 text-primary" />
              Verpflichtung zum Datenschutz
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Gestützt auf Artikel 13 der Schweizerischen Bundesverfassung und die datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen Daten. Wir halten diese Bestimmungen strengstens ein. Persönliche Daten werden streng vertraulich behandelt und weder an Dritte verkauft noch weitergegeben.
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <div>
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface mb-4">
                1. Verantwortliche Stelle
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Verantwortlich für die Datenverarbeitung auf dieser Webseite im Sinne des schweizerischen Datenschutzgesetzes ist:
              </p>
              <div className="font-body-md text-on-surface-variant bg-surface-variant/20 p-6 rounded-2xl border border-outline-variant/20 mt-3">
                <p className="font-bold text-on-surface">parkett-pflege.ch</p>
                <p>c/o Antigravity Parkett-Services</p>
                <p>Seefeldstrasse 120</p>
                <p>8008 Zürich</p>
                <p>E-Mail: info@parkett-pflege.ch</p>
              </div>
            </div>

            <div>
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface mb-4">
                2. Erfassung und Verarbeitung personenbezogener Daten
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Beim Zugriff auf unsere Webseite werden automatisch Daten technischer Natur erfasst (z.B. IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp, Betriebssystem). Diese Daten werden anonym erhoben und dienen ausschliesslich statistischen Zwecken zur kontinuierlichen Optimierung unserer Plattform **parkett-pflege.ch**.
              </p>
            </div>

            <div>
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface mb-4">
                3. Nutzung des Kontaktformulars & Fotoanalyse
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Wenn Sie uns über das Kontaktformular oder die **Parkett-Fotoanalyse** Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten (Name, Telefonnummer, E-Mail-Adresse, Ortsangabe) sowie hochgeladene Bilder zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
            </div>

            <div>
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface mb-4">
                4. Verwendung von Cookies und Analyse-Tools
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Wir setzen auf unserer Website Cookies ein. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Sie dienen dazu, unsere Website benutzerfreundlicher und sicherer zu machen. Sie können das Speichern von Cookies in Ihren Browsereinstellungen jederzeit deaktivieren oder einschränken.
              </p>
            </div>

            <div>
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface mb-4">
                5. Datensicherheit
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. Wir bedienen uns im Übrigen geeigneter technischer und organisatorischer Sicherheitsmassnahmen, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen, teilweisen oder vollständigen Verlust, Zerstörung oder gegen den unbefugten Zugriff Dritter zu schützen.
              </p>
            </div>

            <div>
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface mb-4">
                6. Ihre Rechte als betroffene Person
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Wenden Sie sich hierzu bitte einfach per E-Mail an uns unter `info@parkett-pflege.ch`.
              </p>
            </div>
          </div>

          {/* Internal Links Block */}
          <div className="border-t border-outline-variant/30 pt-8">
            <h3 className="font-headline-sm text-xl font-bold text-on-surface mb-4">Relevante rechtliche & organisatorische Seiten</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/impressum" className="p-4 bg-surface-container-low hover:bg-surface-variant rounded-2xl border border-outline-variant/20 transition-all text-sm font-semibold text-primary text-center">
                Impressum
              </Link>
              <Link href="/kontakt" className="p-4 bg-surface-container-low hover:bg-surface-variant rounded-2xl border border-outline-variant/20 transition-all text-sm font-semibold text-primary text-center">
                Kontaktformular
              </Link>
              <Link href="/leistungen" className="p-4 bg-surface-container-low hover:bg-surface-variant rounded-2xl border border-outline-variant/20 transition-all text-sm font-semibold text-primary text-center">
                Dienstleistungen
              </Link>
            </div>
          </div>

        </div>
      </section>

      <CTABanner />
    </>
  );
}
