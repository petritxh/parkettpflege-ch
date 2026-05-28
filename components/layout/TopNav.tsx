'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, Camera, Calculator, Wrench, AlertTriangle, BookOpen, DollarSign, Mail } from 'lucide-react';

export default function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Service pages (Zürich & Vorher/Nachher removed per request)
  const servicesList = [
    { label: "Parkett reinigen", href: "/leistungen/parkett-reinigen-zuerich" },
    { label: "Parkett ölen", href: "/leistungen/parkett-oelen-zuerich" },
    { label: "Parkett schleifen", href: "/leistungen/parkett-schleifen-zuerich" },
    { label: "Parkett reparieren", href: "/leistungen/parkett-reparieren-zuerich" },
    { label: "Parkett versiegeln", href: "/leistungen/parkett-versiegeln-zuerich" },
    { label: "Parkett auffrischen", href: "/leistungen/parkett-auffrischen-zuerich" }
  ];

  // Problem pages (Zürich & Vorher/Nachher removed per request)
  const problemsList = [
    { label: "Wasserflecken", href: "/problemfaelle/wasserflecken-parkett" },
    { label: "Hundekratzer", href: "/problemfaelle/hundekratzer-parkett" },
    { label: "Schwarze Flecken", href: "/problemfaelle/schwarze-flecken-parkett" },
    { label: "Graues Parkett", href: "/problemfaelle/parkett-grau-und-stumpf" },
    { label: "Aufgequollenes Parkett", href: "/problemfaelle/parkett-quillt-auf" },
    { label: "Tiefe Kratzer", href: "/problemfaelle/tiefe-kratzer-parkett" },
    { label: "Laufstrassen", href: "/problemfaelle/laufstrassen-parkett" },
    { label: "Falsche Reinigung", href: "/problemfaelle/parkett-nach-falscher-reinigung" }
  ];

  return (
    <>
      <nav className="bg-surface/85 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30 transition-all duration-300">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex flex-col justify-center select-none" onClick={handleLinkClick}>
            <span className="font-headline-md text-xl md:text-2xl font-bold tracking-tight text-primary leading-tight hover:opacity-90 transition-opacity">
              parkett-pflege.ch
            </span>
          </Link>

          {/* Right Action Items & modern Desktop Burger Button */}
          <div className="flex items-center gap-4">
            
            {/* Quick Header CTA (Hidden on small mobile, visible on tablet & desktop) */}
            <div className="hidden sm:flex items-center gap-3">
              <Link 
                href="/tools/parkett-kostenrechner"
                className="flex items-center gap-1.5 border border-outline hover:bg-surface-variant px-4 py-2.5 rounded-xl font-semibold text-xs transition-all text-on-surface"
              >
                <Calculator className="w-3.5 h-3.5 text-secondary" />
                <span>Kosten berechnen</span>
              </Link>
              <Link 
                href="/tools/fotoanalyse-parkett"
                className="flex items-center gap-1.5 bg-primary text-on-primary hover:bg-primary/95 px-4 py-2.5 rounded-xl font-semibold text-xs shadow-md shadow-primary/10 hover:shadow-lg transition-all"
              >
                <Camera className="w-3.5 h-3.5 text-on-primary" />
                <span>Fotoanalyse</span>
              </Link>
            </div>

            {/* Quick Mobile Camera CTA (Only shown on small mobile) */}
            <Link 
              href="/tools/fotoanalyse-parkett" 
              className="sm:hidden bg-primary text-on-primary p-2.5 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center"
              title="Fotoanalyse"
            >
              <Camera className="w-4 h-4" />
            </Link>

            {/* Modern Burger Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-2 text-on-surface hover:text-primary focus:outline-none p-2.5 rounded-xl hover:bg-surface-variant border border-outline-variant/30 transition-all font-semibold text-sm group"
              aria-label="Menü öffnen"
            >
              <span className="hidden md:inline font-label-md text-xs tracking-wider uppercase text-on-surface-variant group-hover:text-primary transition-colors">Menü</span>
              <Menu className="h-5 w-5 text-on-surface group-hover:text-primary transition-colors" />
            </button>
          </div>

        </div>
      </nav>

      {/* Modern Overlay Slide-Over Menu (Universal Burger Menu for Desktop and Mobile) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleLinkClick}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm cursor-pointer"
            />

            {/* Premium Slide-Over Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 w-full sm:w-[500px] md:w-[600px] lg:w-[850px] xl:w-[950px] h-full bg-surface-container-lowest z-[101] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-outline-variant/30 shrink-0">
                <Link href="/" className="flex flex-col justify-center select-none" onClick={handleLinkClick}>
                  <span className="font-headline-md text-lg md:text-xl font-bold tracking-tight text-primary leading-tight">
                    parkett-pflege.ch
                  </span>
                </Link>
                
                <button 
                  onClick={handleLinkClick} 
                  className="p-2.5 bg-surface-variant hover:bg-surface-variant/80 rounded-full text-on-surface transition-all duration-300 hover:rotate-90 hover:scale-105"
                  aria-label="Menü schliessen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
                  
                  {/* Category 1: Leistungen */}
                  <div className="lg:col-span-4 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary border-b border-outline-variant/35 pb-2 flex items-center gap-2">
                      <Wrench className="w-4 h-4" />
                      Unsere Leistungen
                    </h3>
                    <nav className="flex flex-col space-y-1">
                      {servicesList.map((item, idx) => (
                        <Link 
                          key={idx} 
                          href={item.href} 
                          onClick={handleLinkClick}
                          className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-surface-variant text-on-surface hover:text-primary font-medium text-sm transition-all group"
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Category 2: Problemfälle */}
                  <div className="lg:col-span-4 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary border-b border-outline-variant/35 pb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Typische Probleme
                    </h3>
                    <nav className="flex flex-col space-y-1">
                      {problemsList.map((item, idx) => (
                        <Link 
                          key={idx} 
                          href={item.href} 
                          onClick={handleLinkClick}
                          className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-surface-variant text-on-surface hover:text-primary font-medium text-sm transition-all group"
                        >
                          <span>{item.label}</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Category 3: Prominent Visual CTAs ("Kosten berechnen" & "Fotoanalyse") */}
                  <div className="lg:col-span-4 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary border-b border-outline-variant/35 pb-2">
                      Direkt-Services
                    </h3>
                    
                    <div className="flex flex-col gap-4">
                      {/* Cost Calculator Callout Card */}
                      <Link 
                        href="/tools/parkett-kostenrechner"
                        onClick={handleLinkClick}
                        className="group flex flex-col p-5 bg-gradient-to-br from-secondary/5 to-secondary/15 hover:from-secondary/10 hover:to-secondary/20 border border-secondary/20 hover:border-secondary/35 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-secondary/10 text-secondary rounded-xl group-hover:scale-105 transition-transform">
                            <Calculator className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-sm text-on-surface">Kosten berechnen</span>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
                          Erste Budget-Orientierung für Ihr Parkett in nur 2 Minuten – unverbindlich und transparent.
                        </p>
                        <span className="text-[11px] font-bold text-secondary inline-flex items-center gap-1 group-hover:underline">
                          Rechner starten <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </Link>

                      {/* Photo Analysis Callout Card */}
                      <Link 
                        href="/tools/fotoanalyse-parkett"
                        onClick={handleLinkClick}
                        className="group flex flex-col p-5 bg-gradient-to-br from-primary/5 to-primary/15 hover:from-primary/10 hover:to-primary/20 border border-primary/20 hover:border-primary/35 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary/10 text-primary rounded-xl group-hover:scale-105 transition-transform">
                            <Camera className="w-5 h-5" />
                          </div>
                          <span className="font-bold text-sm text-on-surface">Fotoanalyse starten</span>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
                          Senden Sie uns einfach Bilder Ihres Bodens für eine kostenlose, fachliche Experten-Einschätzung.
                        </p>
                        <span className="text-[11px] font-bold text-primary inline-flex items-center gap-1 group-hover:underline">
                          Fotos hochladen <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </Link>
                    </div>
                  </div>

                </div>

                {/* General/Static Link Section */}
                <div className="pt-8 border-t border-outline-variant/30 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  
                  {/* Left Link Row */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <Link href="/kosten" onClick={handleLinkClick} className="text-sm font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-primary" /> Kosten & Preise
                    </Link>
                    <Link href="/ratgeber" onClick={handleLinkClick} className="text-sm font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-1">
                      <BookOpen className="w-4 h-4 text-primary" /> Ratgeber & Wissen
                    </Link>
                    <Link href="/kontakt" onClick={handleLinkClick} className="text-sm font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-1">
                      <Mail className="w-4 h-4 text-primary" /> Kontakt & Anfrage
                    </Link>
                  </div>

                  {/* Right Region Info Tag */}
                  <div className="md:text-right">
                    <span className="inline-flex items-center px-3 py-1 bg-surface-variant text-on-surface-variant text-[11px] font-semibold rounded-full border border-outline-variant/30">
                      🇨🇭 Raum Zürich & Umgebung
                    </span>
                  </div>

                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
