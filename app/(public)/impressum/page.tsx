import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Mail, MapPin, Info } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import CTABanner from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Impressum | parkett-pflege.ch',
  description: 'Impressum von parkett-pflege.ch – Ihr Spezialist für Parkettpflege, Parkettreparatur und Parkettrenovation im Grossraum Zürich.',
  alternates: {
    canonical: 'https://parkett-pflege.ch/impressum',
  },
};

export default function ImpressumPage() {
  return (
    <>
      <HeroSection 
        label="Rechtliche Hinweise"
        title="Impressum"
        description="Verantwortlichkeiten, Kontaktangaben und rechtliche Rahmenbedingungen für die Nutzung der Plattform parkett-pflege.ch."
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
          <span className="text-on-surface font-medium">Impressum</span>
        </div>
      </nav>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface text-on-surface">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 space-y-6">
            <h2 className="font-headline-sm text-2xl font-bold text-on-surface flex items-center gap-2 border-b border-outline-variant/30 pb-4">
              <MapPin className="w-6 h-6 text-primary" />
              Verantwortlich für den Inhalt
            </h2>
            <div className="font-body-md text-on-surface-variant space-y-2 leading-relaxed">
              <p className="font-bold text-on-surface">parkett-pflege.ch</p>
              <p>c/o Antigravity Parkett-Services</p>
              <p>Seefeldstrasse 120</p>
              <p>8008 Zürich</p>
              <p>Schweiz</p>
            </div>
            
            <div className="font-body-md text-on-surface-variant space-y-2 pt-2 border-t border-outline-variant/20">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="font-bold text-on-surface">E-Mail:</span> info@parkett-pflege.ch
              </p>
              <p className="flex items-center gap-2">
                <Info className="w-4 h-4 text-secondary" />
                <span className="font-bold text-on-surface">Webseite:</span> https://parkett-pflege.ch
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <div>
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface mb-4">
                Haftungsausschluss (Disclaimer)
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen. Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
              </p>
            </div>

            <div>
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface mb-4">
                Haftung für Links
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin.
              </p>
            </div>

            <div>
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface mb-4">
                Urheberrechte
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich der Marke **parkett-pflege.ch** oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.
              </p>
            </div>

            <div>
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface mb-4">
                Markenrechtlicher Hinweis
              </h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Der Markenname **parkett-pflege.ch** ist eine geschützte Bezeichnung für unsere Parkettdienstleistungen in der Schweiz. Jede unbefugte Verwendung, insbesondere in zusammengeschriebener Form wie `parkettpflege.ch` im geschäftlichen Verkehr, wird rechtlich verfolgt.
              </p>
            </div>
          </div>

          {/* Internal Links Block */}
          <div className="border-t border-outline-variant/30 pt-8">
            <h3 className="font-headline-sm text-xl font-bold text-on-surface mb-4">Relevante rechtliche & organisatorische Seiten</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/datenschutz" className="p-4 bg-surface-container-low hover:bg-surface-variant rounded-2xl border border-outline-variant/20 transition-all text-sm font-semibold text-primary text-center">
                Datenschutzerklärung
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
