'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-container border-t border-outline-variant/30">
      <div className="w-full py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-2">
                  <div className="font-headline-sm text-headline-sm text-primary mb-6">Parkett-Pflege.ch</div>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                      Ihr Partner für erstklassige Parkettrestaurierung in der gesamten Schweiz. Wir verbinden traditionelles Handwerk mit digitaler Präzision.
                  </p>
              </div>
              <div>
                  <h5 className="font-label-md text-label-md uppercase tracking-widest mb-6">Services</h5>
                  <ul className="space-y-4">
                      <li><Link className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary underline-offset-4" href="/parkett-schleifen">Schleifen</Link></li>
                      <li><Link className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary underline-offset-4" href="/parkett-versiegeln">Versiegeln</Link></li>
                      <li><Link className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary underline-offset-4" href="/ki-parkettcheck">KI-Analyse</Link></li>
                      <li><Link className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary underline-offset-4" href="/kontakt">Beratung</Link></li>
                  </ul>
              </div>
              <div>
                  <h5 className="font-label-md text-label-md uppercase tracking-widest mb-6">Rechtliches</h5>
                  <ul className="space-y-4">
                      <li><Link className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary underline-offset-4" href="/impressum">Impressum</Link></li>
                      <li><Link className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary underline-offset-4" href="/datenschutz">Datenschutz</Link></li>
                      <li><Link className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary underline-offset-4" href="/agb">AGB</Link></li>
                      <li><Link className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary underline-offset-4" href="/kontakt">Kontakt</Link></li>
                  </ul>
              </div>
          </div>
          
          <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-caption text-caption text-on-surface-variant">
                  © {new Date().getFullYear()} Parkett-Pflege.ch — Artisanal Precision in Wood Care. All rights reserved.
              </p>
              <div className="flex gap-6">
                  <Link className="text-on-surface-variant hover:text-primary transition-opacity" href="/kontakt">Kontakt</Link>
                  <Link className="text-on-surface-variant hover:text-primary transition-opacity" href="/ki-parkettcheck">Parkett-Check</Link>
              </div>
          </div>
      </div>
    </footer>
  );
}
