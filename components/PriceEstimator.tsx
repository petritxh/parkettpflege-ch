'use client';

import { useState } from 'react';
import { Calculator, ArrowRight, Info } from 'lucide-react';
import { servicePackages } from '@/data/packages';
import { useBooking } from '@/components/providers/BookingProvider';

export default function PriceEstimator() {
  const [area, setArea] = useState<number>(35);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('parkett-renovation');
  const { openBooking } = useBooking();

  const activePackage = servicePackages.find(p => p.id === selectedPackageId);
  const minPrice = activePackage ? area * activePackage.basePriceMin : 0;
  const maxPrice = activePackage ? area * activePackage.basePriceMax : 0;

  const handleBook = () => {
    openBooking({
      service: activePackage?.name || '',
    });
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 p-8 md:p-12 relative group">
      <div className="flex flex-col lg:flex-row gap-12 relative z-10">
        {/* Left Side: Configuration */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-secondary text-label-md font-label-md uppercase tracking-widest mb-4">
              <Calculator className="w-5 h-5" /> Preis- & Paket-Rechner
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight mb-2">
              Finden Sie Ihr passendes Paket
            </h2>
            <p className="text-on-surface-variant font-body-lg text-body-lg">
              Wählen Sie die gewünschte Intensität aus. Unser Rechner zeigt Ihnen direkt die Kostenspanne für Ihr Objekt.
            </p>
          </div>

          <div className="space-y-8">
            {/* Area Input */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-label-md text-on-surface uppercase tracking-widest">
                  Fläche ({area} m²)
                </label>
              </div>
              <div className="flex items-center gap-4">
                <input 
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2 bg-surface-variant rounded-full appearance-none outline-none focus:ring-2 focus:ring-secondary/30 cursor-pointer accent-secondary"
                />
                <div className="flex items-center gap-2">
                  <input 
                    type="number"
                    min="10"
                    max="500"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-20 bg-surface border border-outline-variant/50 rounded-lg px-3 py-2 text-sm text-center focus:bg-white focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition"
                    suppressHydrationWarning
                  />
                  <span className="text-sm font-label-md text-on-surface-variant uppercase">m²</span>
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-sm font-label-md text-on-surface uppercase tracking-widest mb-3">
                Empfohlenes Paket wählen
              </label>
              <div className="flex flex-col gap-3">
                {servicePackages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`text-left px-5 py-4 rounded-xl border transition-all ${
                      selectedPackageId === pkg.id 
                        ? 'border-secondary bg-secondary/5' 
                        : 'border-outline-variant/50 bg-transparent hover:bg-surface-variant'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-headline-sm text-lg ${selectedPackageId === pkg.id ? 'text-secondary' : 'text-on-surface'}`}>{pkg.name}</span>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant bg-surface-variant px-2 py-1 rounded-md">{pkg.targetAudience}</span>
                    </div>
                    <p className="font-body-md text-sm text-on-surface-variant mt-1">{pkg.purpose}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Result */}
        <div className="lg:w-[450px] shrink-0 sticky top-6 self-start">
          <div className="bg-surface rounded-2xl p-8 border border-outline-variant/30 flex flex-col pt-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 bg-secondary text-white font-label-md text-[10px] uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md transform rotate-3">
              Richtwert
            </div>

            <div className="flex-grow">
              <span className="font-label-md text-on-surface-variant text-sm uppercase tracking-widest block mb-2">Kostenspanne</span>
              <div className="flex items-baseline gap-2 text-on-surface mb-6">
                <span className="font-body-md font-light text-xl">CHF</span>
                <span className="font-display-lg-mobile md:text-5xl font-semibold tracking-tighter" suppressHydrationWarning>
                   {minPrice === 0 && maxPrice === 0 ? "Auf Anfrage" : `${minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")} - ${maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")}`}
                </span>
              </div>
              
              <div className="mb-8">
                 <h4 className="font-label-md uppercase tracking-widest text-xs text-secondary mb-3">Im Paket enthalten:</h4>
                 <ul className="space-y-3">
                    {activePackage?.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm font-body-md text-on-surface">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                 </ul>
              </div>

              <div className="flex text-xs font-body-md text-on-surface-variant opacity-80 mt-4 leading-relaxed mb-6">
                 <Info className="w-5 h-5 mr-2 shrink-0 mt-0.5 text-secondary" />
                 Hinweis: Offizielle Offerten erfordern eine visuelle KI-Analyse oder Besichtigung.
              </div>
            </div>

            <button onClick={handleBook} className="w-full bg-primary hover:bg-primary/90 text-white font-label-md uppercase tracking-widest py-4 rounded-xl text-sm transition-colors mt-auto flex items-center justify-center gap-2">
              Besichtigung anfragen
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
