'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useBooking } from '@/components/providers/BookingProvider';
import { services } from '@/data/services';
import { problems } from '@/data/problems';
import { locations } from '@/data/locations';

export default function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  return (
    <nav className="bg-surface/80 backdrop-blur-lg docked full-width top-0 sticky z-50 border-b border-outline-variant/30 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto h-20">
        <Link href="/" className="font-headline-md text-headline-md font-medium text-primary">
          Parkettpflege.ch
        </Link>
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <Link className="flex items-center gap-1 text-on-surface-variant font-medium hover:text-primary transition-colors font-label-md text-label-md py-4" href="/dienstleistungen">
              Dienstleistungen <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </Link>
            <div className="absolute top-full left-0 w-64 bg-white border border-outline-variant/30 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col p-2 pointer-events-none group-hover:pointer-events-auto">
              {services.map((service) => (
                <Link key={service.slug} href={`/${service.slug}`} className="px-4 py-2 hover:bg-surface-variant rounded-xl text-on-surface text-sm transition-colors">{service.h1}</Link>
              ))}
              <div className="h-px bg-outline-variant/30 my-2"></div>
              <Link href="/dienstleistungen" className="px-4 py-2 text-secondary font-medium text-sm hover:underline">Alle ansehen</Link>
            </div>
          </div>

          <div className="relative group">
            <Link className="flex items-center gap-1 text-on-surface-variant font-medium hover:text-primary transition-colors font-label-md text-label-md py-4" href="/ratgeber">
              Ratgeber <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </Link>
            <div className="absolute top-full left-0 w-64 bg-white border border-outline-variant/30 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col p-2 pointer-events-none group-hover:pointer-events-auto">
              <Link href="/ki-parkettcheck" className="px-4 py-2 bg-primary/10 text-primary rounded-xl text-sm font-medium transition-colors mb-2">✨ KI-Parkettcheck</Link>
              {problems.slice(0, 5).map((problem) => (
                <Link key={problem.slug} href={`/probleme/${problem.slug}`} className="px-4 py-2 hover:bg-surface-variant rounded-xl text-on-surface text-sm transition-colors">{problem.solutionTitle || problem.h1}</Link>
              ))}
              <div className="h-px bg-outline-variant/30 my-2"></div>
              <Link href="/ratgeber" className="px-4 py-2 text-secondary font-medium text-sm hover:underline">Alle ansehen</Link>
            </div>
          </div>

          <div className="relative group">
            <Link className="flex items-center gap-1 text-on-surface-variant font-medium hover:text-primary transition-colors font-label-md text-label-md py-4" href="/standorte">
              Standorte <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </Link>
            <div className="absolute top-full left-0 w-48 bg-white border border-outline-variant/30 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col p-2 pointer-events-none group-hover:pointer-events-auto">
              {locations.map((loc) => (
                <Link key={loc.slug} href={`/standorte/${loc.slug}`} className="px-4 py-2 hover:bg-surface-variant rounded-xl text-on-surface text-sm transition-colors">{loc.name}</Link>
              ))}
            </div>
          </div>

          <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors font-label-md text-label-md hover:underline decoration-secondary underline-offset-4 py-4" href="/vorher-nachher">Galerie</Link>
          <Link className="text-on-surface-variant font-medium hover:text-primary transition-colors font-label-md text-label-md hover:underline decoration-secondary underline-offset-4 py-4" href="/kosten">Kostenrechner</Link>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => openBooking()}
            className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all hidden md:block">
              Gratis Offerte
          </button>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-on-surface hover:text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-surface border-b border-outline-variant/30 px-margin-mobile pt-2 pb-6 space-y-3 shadow-lg absolute w-full"
        >
          <Link href="/dienstleistungen" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant rounded-md">Dienstleistungen</Link>
          <Link href="/ratgeber" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant rounded-md">Ratgeber</Link>
          <Link href="/standorte" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant rounded-md">Standorte</Link>
          <Link href="/vorher-nachher" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant rounded-md">Galerie</Link>
          <Link href="/kosten" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant rounded-md">Kostenrechner</Link>
          <Link href="/kontakt" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant rounded-md">Kontakt</Link>
          <div className="pt-4 flex flex-col gap-3 px-3">
            <button 
              onClick={() => { openBooking(); setIsMobileMenuOpen(false); }}
              className="bg-primary text-on-primary w-full px-6 py-3 rounded-lg font-label-md text-label-md hover:shadow-lg transition-all"
            >
              Gratis Offerte
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
