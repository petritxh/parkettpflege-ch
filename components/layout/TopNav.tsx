'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Camera, Calculator } from 'lucide-react';
import { homepageContent } from '@/data/homepage-content';

export default function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const navContent = homepageContent.footer; // Re-use structured links from content file

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Dropdown list mappings
  const servicesDropdown = [
    { label: "Parkett reinigen", href: "/leistungen/parkett-reinigen-zuerich" },
    { label: "Parkett ölen", href: "/leistungen/parkett-oelen-zuerich" },
    { label: "Parkett schleifen", href: "/leistungen/parkett-schleifen-zuerich" },
    { label: "Parkett reparieren", href: "/leistungen/parkett-reparieren-zuerich" },
    { label: "Parkett versiegeln", href: "/leistungen/parkett-versiegeln-zuerich" },
    { label: "Parkett auffrischen", href: "/leistungen/parkett-auffrischen-zuerich" }
  ];

  const problemsDropdown = [
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
    <nav className="bg-surface/90 backdrop-blur-xl sticky docked top-0 z-50 border-b border-outline-variant/30 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto h-20">
        
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col justify-center select-none" onClick={handleLinkClick}>
          <span className="font-headline-md text-xl md:text-2xl font-bold tracking-tight text-primary leading-tight">
            parkett-pflege.ch
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-5">
          
          {/* Dropdown: Leistungen */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-on-surface-variant font-semibold hover:text-primary transition-colors font-label-md text-sm py-4">
              Leistungen <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-0 w-64 bg-white border border-outline-variant/40 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col p-2 pointer-events-none group-hover:pointer-events-auto">
              {servicesDropdown.map((item, idx) => (
                <Link 
                  key={idx} 
                  href={item.href} 
                  className="px-4 py-2.5 hover:bg-surface-variant rounded-xl text-on-surface text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Dropdown: Problemfälle */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-on-surface-variant font-semibold hover:text-primary transition-colors font-label-md text-sm py-4">
              Problemfälle <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-0 w-72 bg-white border border-outline-variant/40 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col p-2 pointer-events-none group-hover:pointer-events-auto">
              <div className="grid grid-cols-1 gap-1">
                {problemsDropdown.map((item, idx) => (
                  <Link 
                    key={idx} 
                    href={item.href} 
                    className="px-4 py-2 hover:bg-surface-variant rounded-xl text-on-surface text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Static Navigation Items */}
          <Link className="text-on-surface-variant font-semibold hover:text-primary transition-colors font-label-md text-sm py-4" href="/kosten">
            Kosten
          </Link>
          <Link className="text-on-surface-variant font-semibold hover:text-primary transition-colors font-label-md text-sm py-4" href="/faelle">
            Vorher-Nachher
          </Link>
          <Link className="text-on-surface-variant font-semibold hover:text-primary transition-colors font-label-md text-sm py-4" href="/ratgeber">
            Ratgeber
          </Link>
          <Link className="text-on-surface-variant font-semibold hover:text-primary transition-colors font-label-md text-sm py-4" href="/zuerich/parkettpflege-zuerich">
            Zürich
          </Link>
          <Link className="text-on-surface-variant font-semibold hover:text-primary transition-colors font-label-md text-sm py-4" href="/kontakt">
            Kontakt
          </Link>
        </div>

        {/* Action Buttons CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link 
            href="/tools/parkett-kostenrechner"
            className="flex items-center gap-1.5 border border-outline text-on-surface hover:bg-surface-variant px-4 py-2.5 rounded-xl font-semibold text-xs transition-all"
          >
            <Calculator className="w-3.5 h-3.5 text-secondary" />
            Kosten berechnen
          </Link>
          <Link 
            href="/tools/fotoanalyse-parkett"
            className="flex items-center gap-1.5 bg-primary text-on-primary hover:bg-primary/95 px-4 py-2.5 rounded-xl font-semibold text-xs shadow-md shadow-primary/10 hover:shadow-lg transition-all"
          >
            <Camera className="w-3.5 h-3.5 text-on-primary" />
            Fotoanalyse starten
          </Link>
        </div>

        {/* Mobile Menu & Dynamic Hamburger Button */}
        <div className="xl:hidden flex items-center gap-3">
          <Link 
            href="/tools/fotoanalyse-parkett" 
            className="bg-primary text-on-primary p-2.5 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center lg:hidden"
            title="Fotoanalyse"
          >
            <Camera className="w-4 h-4" />
          </Link>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-on-surface hover:text-primary focus:outline-none p-2 rounded-xl hover:bg-surface-variant transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden bg-surface border-t border-outline-variant/30 overflow-hidden"
          >
            <div className="px-margin-mobile py-6 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              
              {/* Category Dropdown: Leistungen */}
              <div className="border-b border-outline-variant/20 pb-2">
                <button 
                  onClick={() => toggleDropdown('services')}
                  className="flex justify-between items-center w-full py-2 text-sm font-bold text-on-surface"
                >
                  <span>Leistungen</span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'services' && (
                  <div className="pl-4 mt-2 space-y-2.5 py-1">
                    {servicesDropdown.map((item, idx) => (
                      <Link 
                        key={idx} 
                        href={item.href} 
                        onClick={handleLinkClick} 
                        className="block text-sm text-on-surface-variant hover:text-primary py-1"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Dropdown: Problemfälle */}
              <div className="border-b border-outline-variant/20 pb-2">
                <button 
                  onClick={() => toggleDropdown('problems')}
                  className="flex justify-between items-center w-full py-2 text-sm font-bold text-on-surface"
                >
                  <span>Problemfälle</span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${activeDropdown === 'problems' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'problems' && (
                  <div className="pl-4 mt-2 space-y-2.5 py-1">
                    {problemsDropdown.map((item, idx) => (
                      <Link 
                        key={idx} 
                        href={item.href} 
                        onClick={handleLinkClick} 
                        className="block text-sm text-on-surface-variant hover:text-primary py-1"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Static Mobile Links */}
              <Link href="/kosten" onClick={handleLinkClick} className="block py-2 text-sm font-bold text-on-surface border-b border-outline-variant/20">
                Kosten
              </Link>
              <Link href="/faelle" onClick={handleLinkClick} className="block py-2 text-sm font-bold text-on-surface border-b border-outline-variant/20">
                Vorher-Nachher
              </Link>
              <Link href="/ratgeber" onClick={handleLinkClick} className="block py-2 text-sm font-bold text-on-surface border-b border-outline-variant/20">
                Ratgeber
              </Link>
              <Link href="/zuerich/parkettpflege-zuerich" onClick={handleLinkClick} className="block py-2 text-sm font-bold text-on-surface border-b border-outline-variant/20">
                Zürich
              </Link>
              <Link href="/kontakt" onClick={handleLinkClick} className="block py-2 text-sm font-bold text-on-surface border-b border-outline-variant/20">
                Kontakt
              </Link>

              {/* CTAs at the bottom of Drawer */}
              <div className="pt-4 flex flex-col gap-3">
                <Link 
                  href="/tools/parkett-kostenrechner" 
                  onClick={handleLinkClick}
                  className="w-full flex items-center justify-center gap-2 border border-outline text-on-surface py-3 rounded-xl font-bold text-sm hover:bg-surface-variant transition-colors"
                >
                  <Calculator className="w-4 h-4 text-secondary" />
                  Kosten berechnen
                </Link>
                <Link 
                  href="/tools/fotoanalyse-parkett" 
                  onClick={handleLinkClick}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-3 rounded-xl font-bold text-sm hover:bg-primary/95 transition-colors shadow-md shadow-primary/10"
                >
                  <Camera className="w-4 h-4" />
                  Fotoanalyse starten
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
