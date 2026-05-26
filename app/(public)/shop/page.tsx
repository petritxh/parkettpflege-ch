'use client';

import { useState } from 'react';
import { products, ProductCategory } from '@/data/products';
import { ShoppingCart, Star, ExternalLink, Info, CheckCircle2, Search, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'Alle'>('Alle');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories: (ProductCategory | 'Alle')[] = ['Alle', 'Reinigung', 'Pflege', 'Reparatur', 'Maschinen'];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'Alle' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-surface-container-lowest min-h-screen pb-24">
      {/* Premium Hero Section */}
      <div className="relative bg-[#061b0e] pt-32 pb-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 border border-secondary/30 text-secondary font-label-md text-xs uppercase tracking-widest mb-6 backdrop-blur-sm">
              Offizieller Parkettpflege Shop
            </span>
            <h1 className="font-display-lg text-4xl md:text-6xl text-white mb-6">
              Professionelle Pflegeprodukte für Ihren Boden.
            </h1>
            <p className="text-white/80 font-body-lg text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
              Bestellen Sie dieselben hochwertigen Produkte, die wir bei unseren täglichen Kundenbesuchen in der ganzen Schweiz verwenden. Garantiert schonend, effektiv und werterhaltend.
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-white/90 font-label-md text-sm">
                <Truck className="w-5 h-5 text-secondary" />
                <span>Kostenloser Versand in CH ab CHF 100.-</span>
              </div>
              <div className="flex items-center gap-2 text-white/90 font-label-md text-sm">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <span>Geprüfte Handwerker-Qualität</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom mt-12">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                {product.isAffiliate && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-surface/90 backdrop-blur-md border border-outline-variant/50 text-on-surface-variant font-label-md text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Partner
                    </span>
                  </div>
                )}

                {/* Image */}
                <div className="h-64 relative overflow-hidden bg-surface-container-highest">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-headline-sm text-xl text-on-surface mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="font-body-md text-sm text-on-surface-variant mb-6 line-clamp-3">
                    {product.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-surface-variant text-on-surface-variant px-2 py-1 rounded-md text-[10px] font-label-md uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-4 border-t border-outline-variant/30">
                    <div>
                      <span className="block font-label-md text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Preis</span>
                      <span className="font-display-sm text-2xl text-on-surface">CHF {product.price.toFixed(2)}</span>
                    </div>
                    
                    {product.isAffiliate ? (
                      <a 
                        href={product.affiliateLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-variant hover:border-secondary/50 px-4 py-2.5 rounded-xl font-label-md text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                      >
                        Zum Partner <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link 
                        href={`/shop/${product.id}`}
                        className="bg-primary text-white px-5 py-2.5 rounded-xl font-label-md text-xs uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98]"
                      >
                        Details <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
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
    </div>
  );
}
