'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import FAQSection from '@/components/sections/FAQSection';

export default function KontaktPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-surface mt-20">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop text-center mb-16">
          <span className="text-secondary font-label-md text-label-md tracking-widest uppercase mb-4 block">Kontakt</span>
          <h1 className="font-headline-lg text-4xl md:text-5xl mb-6">Wir sind für Sie da</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Haben Sie Fragen zu unseren Leistungen oder wünschen Sie eine persönliche Beratung? Kontaktieren Sie uns unverbindlich.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-surface-container-low p-8 rounded-2xl text-center flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Phone className="w-8 h-8" />
             </div>
             <h3 className="font-headline-sm mb-2">Telefon</h3>
             <p className="text-on-surface-variant mb-4">Mo-Fr, 08:00 - 17:00 Uhr</p>
             <a href="tel:+41440000000" className="text-secondary font-bold hover:underline">044 000 00 00</a>
          </div>

          <div className="bg-surface-container-low p-8 rounded-2xl text-center flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Mail className="w-8 h-8" />
             </div>
             <h3 className="font-headline-sm mb-2">E-Mail</h3>
             <p className="text-on-surface-variant mb-4">Wir antworten innert 24h</p>
             <a href="mailto:info@parkett-pflege.ch" className="text-secondary font-bold hover:underline">info@parkett-pflege.ch</a>
          </div>

          <div className="bg-surface-container-low p-8 rounded-2xl text-center flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <MapPin className="w-8 h-8" />
             </div>
             <h3 className="font-headline-sm mb-2">Standort</h3>
             <p className="text-on-surface-variant mb-4">Einsatzgebiet: ganze Deutschschweiz</p>
             <span className="text-on-surface">Zürich & Region</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30">
          <h2 className="font-headline-md text-2xl mb-6 text-center">Nachricht senden</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Vorname</label>
                <input type="text" className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-secondary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nachname</label>
                <input type="text" className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-secondary transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">E-Mail</label>
              <input type="email" className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-secondary transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Nachricht</label>
              <textarea rows={4} className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-secondary transition-colors resize-none"></textarea>
            </div>
            <button className="w-full bg-secondary text-white font-bold rounded-xl py-4 hover:bg-secondary/90 transition-all">
              Nachricht absenden
            </button>
          </form>
        </div>
      </section>

      <FAQSection />
    </>
  );
}
