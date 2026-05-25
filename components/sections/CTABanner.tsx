'use client';

import Image from 'next/image';
import { useBooking } from '@/components/providers/BookingProvider';

interface CTABannerProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

export default function CTABanner({
  title = "Bereit für einen neuen Boden?",
  description = "Lassen Sie Ihr Parkett wieder in altem Glanz erstrahlen. Kontaktieren Sie uns noch heute für ein unverbindliches Angebot oder nutzen Sie unsere KI-Analyse.",
  primaryButtonText = "Kostenloses Angebot anfordern",
  secondaryButtonText = "Kontakt aufnehmen"
}: CTABannerProps) {
  const { openBooking } = useBooking();

  return (
    <section className="py-section-gap-mobile md:py-section-gap-desktop px-margin-mobile md:px-margin-desktop relative overflow-hidden bg-primary text-on-primary">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
          <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUcIl3jKLrwUMT_37Z_PjS19D07p_bHz2qjC9MFZ34i-sLAni5QH6p8us6qVWvkUSFdenv9-rfL-ss5aF40ENNi_3Rl0IesbZ1LclP1HztLqjGC5iyjdWfZtNNf8_MM5DVzVeo3bIC-91Lw0bRrTajfs4zoz2HThJDytm0nJcL0m0njlqBorKNuQ6AyoIlzsSb4gcCqwetsD55yKq7VEd8dQKtPb6rD2lpdVMqR49eqjMudxp-UGijIl5CEBL2upOhygtuDQDfqSc" 
              alt="Wood texture background" 
              fill
              className="object-cover scale-110"
          />
      </div>
      <div className="relative z-10 max-w-container-max-width mx-auto text-center">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-8">
            {title}
          </h2>
          <p className="font-body-lg text-body-lg mb-12 max-w-2xl mx-auto text-white/80">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button 
                  onClick={() => openBooking()}
                  className="bg-secondary text-white px-10 py-5 rounded-xl font-headline-sm text-[20px] hover:bg-secondary/90 transition-all shadow-xl active:scale-95"
              >
                  {primaryButtonText}
              </button>
              <a href="/kontakt" className="border border-white/30 text-white px-10 py-5 rounded-xl font-headline-sm text-[20px] hover:bg-white/10 transition-all backdrop-blur-sm inline-block">
                  {secondaryButtonText}
              </a>
          </div>
      </div>
    </section>
  );
}
