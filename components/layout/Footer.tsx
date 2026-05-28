'use client';

import Link from 'next/link';
import { homepageContent } from '@/data/homepage-content';

export default function Footer() {
  const content = homepageContent.footer;

  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/30 text-on-surface">
      <div className="w-full py-16 px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto">
        
        {/* Main Grid: 5 columns on desktop, responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <span className="font-headline-sm text-lg font-bold tracking-tight text-primary block leading-tight">
                {content.brand.logo}
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium tracking-wide uppercase">
                {content.brand.claim}
              </span>
            </div>
            <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
              {content.brand.text}
            </p>
          </div>

          {/* Column 2: Leistungen */}
          <div>
            <h5 className="font-label-md text-xs font-bold uppercase tracking-widest text-secondary mb-5">
              {content.services.title}
            </h5>
            <ul className="space-y-3.5">
              {content.services.items.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary/30 underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Problemfälle */}
          <div>
            <h5 className="font-label-md text-xs font-bold uppercase tracking-widest text-secondary mb-5">
              {content.problems.title}
            </h5>
            <ul className="space-y-3.5">
              {content.problems.items.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary/30 underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Tools & Wissen */}
          <div>
            <h5 className="font-label-md text-xs font-bold uppercase tracking-widest text-secondary mb-5">
              {content.toolsAndKnowledge.title}
            </h5>
            <ul className="space-y-3.5">
              {content.toolsAndKnowledge.items.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary/30 underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Regionen */}
          <div>
            <h5 className="font-label-md text-xs font-bold uppercase tracking-widest text-secondary mb-5">
              {content.regions.title}
            </h5>
            <ul className="space-y-3.5">
              {content.regions.items.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-secondary/30 underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-caption text-xs text-on-surface-variant text-center md:text-left leading-relaxed">
            © {new Date().getFullYear()} {content.brand.logo} — Parkett erhalten. Werte bewahren. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {content.legal.items.map((item, idx) => (
              <Link 
                key={idx} 
                className="text-xs text-on-surface-variant hover:text-primary transition-colors hover:underline underline-offset-4" 
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
