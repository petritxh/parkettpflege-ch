import { Metadata } from 'next';
import Gallery from '@/components/Gallery';
import CTABanner from '@/components/sections/CTABanner';

import { cases, CATEGORIES, WOOD_TYPES } from '@/data/cases';

export const metadata: Metadata = {
  title: 'Parkett Vorher/Nachher Bilder | Referenzen Parkettpflege.ch',
  description: 'Sehen Sie echte Ergebnisse unserer Parkettrenovierungen. Von stark beschädigten Böden zu neuwertigen Holzoberflächen.',
};

export default function VorherNachherPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-surface mt-20">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center mb-16">
          <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Referenzen</span>
          <h1 className="font-headline-lg text-4xl md:text-5xl mb-6">Vorher & Nachher Ergebnisse</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Bilder sagen mehr als tausend Worte. Sehen Sie sich an, wie wir alte, verkratzte und fleckige Parkettböden wieder in echte Schmuckstücke verwandeln.
          </p>
        </div>
        
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
           <Gallery cases={cases} categories={CATEGORIES} woodTypes={WOOD_TYPES} />
        </div>
      </section>

      <CTABanner 
         title="Haben Sie einen ähnlichen Boden?"
         description="Senden Sie uns ein Foto Ihres Parketts und wir sagen Ihnen, ob ein solches Ergebnis auch bei Ihnen möglich ist."
         primaryButtonText="Foto hochladen (KI Check)"
         secondaryButtonText="Persönlich anfragen"
      />
    </>
  );
}
