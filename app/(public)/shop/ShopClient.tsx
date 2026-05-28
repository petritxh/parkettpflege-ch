'use client';

import { useState } from 'react';
import { Product, ProductCategory } from '@/data/products';
import { ShoppingBag, Search, ExternalLink, ArrowRight, Truck, ShieldCheck, Info, Check } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/components/providers/CartProvider';

export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'Alle'>('Alle');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, setIsCartOpen } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  
  const categories: (ProductCategory | 'Alle')[] = ['Alle', 'Reinigung', 'Pflege', 'Reparatur', 'Maschinen'];

  const filteredProducts = initialProducts.filter(p => {
    const matchesCategory = activeCategory === 'Alle' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if clicking the add button inside a Link
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="bg-surface-container-lowest min-h-screen pb-24">
      {/* Premium Hero Section */}
      <div className="relative bg-[#362112] pt-32 pb-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#4a2f1d]/30 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2E1A0F]/80 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="flex justify-between items-start">
            <div className="max-w-2xl">
              <span className="text-secondary-fixed font-label-md text-label-md tracking-widest uppercase mb-4 block">
                Offizieller WOCA Partner Shop
              </span>
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-6 leading-tight">
                Professionelle Pflege für Ihren Holzboden.
              </h1>
              <p className="font-body-lg text-body-lg mb-8 text-white/90 max-w-xl">
                Bestellen Sie exakt dieselben hochwertigen WOCA-Produkte, die wir bei unseren täglichen Einsätzen verwenden. Garantiert schonend, effektiv und werterhaltend.
              </p>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-white/90 font-label-md text-label-md">
                  <Truck className="w-5 h-5 text-secondary" />
                  <span>Kostenloser Versand in CH ab CHF 100.-</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 font-label-md text-label-md">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                  <span>Geprüfte Handwerker-Qualität</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="hidden md:flex items-center justify-center w-14 h-14 bg-surface rounded-full shadow-lg hover:scale-105 transition-transform text-primary relative"
            >
              <ShoppingBag className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop mt-12">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-label-md text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-surface border border-outline-variant/50 text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Produkte suchen..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-outline-variant/50 rounded-full pl-11 pr-4 py-2.5 font-body-md text-sm focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProducts.map(product => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-surface rounded-3xl border border-outline-variant/30 overflow-hidden group hover:shadow-xl hover:border-secondary/30 transition-all flex flex-col h-full relative"
              >
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  <span className="bg-white/90 backdrop-blur-md text-primary font-label-md text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>

                <Link href={`/shop/${product.id}`} className="block h-56 relative overflow-hidden bg-surface-container-highest">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <Link href={`/shop/${product.id}`}>
                    <h3 className="font-headline-sm text-lg text-on-surface mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <p className="font-body-md text-sm text-on-surface-variant mb-6 line-clamp-3">
                    {product.shortDescription}
                  </p>

                  <div className="mt-auto flex items-end justify-between pt-4 border-t border-outline-variant/30">
                    <div>
                      <span className="block font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Preis</span>
                      <span className="font-display-sm text-xl text-on-surface">CHF {product.price.toFixed(2)}</span>
                    </div>
                    
                    {product.isAffiliate ? (
                      <a 
                        href={product.affiliateLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-variant hover:border-secondary/50 px-4 py-2.5 rounded-xl font-label-md text-[10px] uppercase tracking-widest transition-all flex items-center gap-1.5"
                      >
                        Zum Partner <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button 
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`px-4 py-2.5 rounded-xl font-label-md text-[10px] uppercase tracking-widest transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md active:scale-[0.98] ${
                          addedItems[product.id] 
                          ? 'bg-green-600 text-white' 
                          : 'bg-primary text-white hover:bg-primary/90'
                        }`}
                      >
                        {addedItems[product.id] ? (
                          <><Check className="w-3.5 h-3.5" /> Hinzugefügt</>
                        ) : (
                          <><ShoppingBag className="w-3.5 h-3.5" /> In den Warenkorb</>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center">
            <Info className="w-12 h-12 text-on-surface-variant/30 mb-4" />
            <h3 className="font-headline-sm text-xl mb-2">Keine Produkte gefunden</h3>
            <p className="text-on-surface-variant">Versuchen Sie einen anderen Suchbegriff oder eine andere Kategorie.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('Alle');}}
              className="mt-6 text-secondary hover:underline font-label-md text-sm uppercase tracking-widest"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
      
      {/* Mobile Cart Floating Action Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center active:scale-95 transition-transform relative"
        >
          <ShoppingBag className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
