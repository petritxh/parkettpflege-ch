'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import { ArrowLeft, Check, Truck, ShieldCheck, ShoppingBag, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/components/providers/CartProvider';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [addingToCart, setAddingToCart] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAddingToCart(true);
    addToCart(product);
    setTimeout(() => {
      setAddingToCart(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }, 400);
  };

  return (
    <div className="bg-surface-container-lowest min-h-screen pb-24 pt-24 md:pt-32">
      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        
        <div className="flex justify-between items-center mb-8">
          <Link href="/shop" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Zurück zum Shop
          </Link>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="md:hidden flex items-center gap-2 text-primary font-label-md text-xs uppercase tracking-widest"
          >
            <ShoppingBag className="w-4 h-4" /> Warenkorb
          </button>
        </div>

        <div className="bg-surface rounded-[40px] border border-outline-variant/30 p-4 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left: Image */}
            <div className="rounded-[32px] overflow-hidden bg-surface-container h-[350px] md:h-[500px] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="bg-white/90 backdrop-blur-md text-primary font-label-md text-[10px] uppercase tracking-widest px-4 py-2 rounded-full shadow-sm w-fit">
                  {product.category}
                </span>
                {product.isAffiliate && (
                  <span className="bg-surface/90 backdrop-blur-md border border-outline-variant/50 text-on-surface-variant font-label-md text-[10px] uppercase tracking-widest px-4 py-2 rounded-full shadow-sm w-fit">
                    Partner-Produkt
                  </span>
                )}
              </div>
            </div>

            {/* Right: Details */}
            <div className="flex flex-col justify-center py-4">
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map(tag => (
                  <span key={tag} className="bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1.5 rounded-lg text-[10px] font-label-md uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="font-display-sm text-3xl md:text-5xl text-on-surface mb-6">
                {product.name}
              </h1>
              
              <p className="font-body-lg text-lg text-on-surface-variant mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-6 mb-10 pb-10 border-b border-outline-variant/30">
                <div className="flex flex-col">
                  <span className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant mb-1">Preis inkl. MwSt.</span>
                  <span className="font-display-md text-4xl text-primary">CHF {product.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span className="font-body-md text-on-surface-variant">Sofort verfügbar, Lieferzeit 2-3 Werktage (CH)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span className="font-body-md text-on-surface-variant">Kostenloser Versand in der Schweiz ab CHF 100.-</span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span className="font-body-md text-on-surface-variant">Profiqualität, von unseren Handwerkern empfohlen</span>
                </div>
              </div>

              <div className="mt-auto">
                {product.isAffiliate ? (
                  <a 
                    href={product.affiliateLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-variant hover:border-secondary/50 py-4 rounded-xl font-label-md text-sm uppercase tracking-widest transition-all"
                  >
                    Jetzt beim Partner kaufen
                  </a>
                ) : (
                  <button 
                    onClick={handleAddToCart}
                    disabled={addingToCart || added}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-label-md text-sm uppercase tracking-widest transition-all shadow-md active:scale-[0.98] ${
                      added 
                      ? 'bg-green-600 text-white shadow-green-600/20'
                      : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                  >
                    {addingToCart ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Wird hinzugefügt...</>
                    ) : added ? (
                      <><Check className="w-5 h-5" /> Hinzugefügt</>
                    ) : (
                      <><ShoppingBag className="w-5 h-5" /> In den Warenkorb</>
                    )}
                  </button>
                )}
              </div>
              
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
