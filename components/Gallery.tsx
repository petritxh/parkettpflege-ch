'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Filter } from 'lucide-react';

import { CaseItem } from '@/data/cases';

interface GalleryProps {
  cases: CaseItem[];
  categories: string[];
  woodTypes: string[];
}

function GalleryItem({ item }: { item: CaseItem }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
    >
      <div 
        ref={containerRef}
        className="relative h-72 bg-surface-variant overflow-hidden shrink-0 cursor-ew-resize select-none touch-none"
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        <div className="absolute inset-0 w-full pointer-events-none">
          <Image src={item.imgAfter} alt="Nachher" fill className="object-cover" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-on-surface px-3 py-1.5 rounded-md font-label-md text-[10px] tracking-widest uppercase shadow-sm">Nachher</div>
        </div>
        
        <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
          <Image src={item.imgBefore} alt="Vorher" fill className="object-cover grayscale sepia-[0.3] brightness-75 contrast-75 blur-[0.5px]" />
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-md font-label-md text-[10px] tracking-widest uppercase">Vorher</div>
        </div>

        {/* The dividing line */}
        <div 
           className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none -ml-[1px]"
           style={{ left: `${sliderPos}%` }}
        ></div>
        
        {/* Visual slider indicator */}
        <div 
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg z-20 flex items-center justify-center pointer-events-none"
            style={{ left: `calc(${sliderPos}% - 16px)` }}
        >
            <ChevronRight className="w-5 h-5 text-on-surface" />
            <ChevronRight className="w-5 h-5 text-on-surface rotate-180 -ml-4" />
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow text-left">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">{item.title}</h3>
          <span className="bg-secondary/10 text-secondary px-3 py-1.5 rounded-md font-label-md text-[10px] tracking-widest uppercase shrink-0">{item.woodType}</span>
        </div>
        <div className="space-y-4 flex-grow flex flex-col justify-end">
          <div>
            <span className="font-label-md text-[10px] tracking-widest uppercase text-on-surface-variant/80 block mb-1">Problem</span>
            <p className="font-body-md text-body-md text-on-surface-variant">{item.problem}</p>
          </div>
          <div>
            <span className="font-label-md text-[10px] tracking-widest uppercase text-on-surface-variant/80 block mb-1">Lösung ({item.service})</span>
            <p className="font-body-md text-body-md text-on-surface-variant">{item.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery({ cases = [], categories = ['Alle'], woodTypes = ['Alle'] }: GalleryProps) {
  const [filterCat, setFilterCat] = useState('Alle');
  const [filterWood, setFilterWood] = useState('Alle');

  const filteredData = cases.filter(item => {
    const matchCat = filterCat === 'Alle' || item.category === filterCat;
    const matchWood = filterWood === 'Alle' || item.woodType === filterWood;
    return matchCat && matchWood;
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-end items-center mb-12 gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-on-surface-variant mr-2" />
          <select 
            value={filterCat} 
            onChange={e => setFilterCat(e.target.value)}
            className="bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 font-label-md text-sm text-on-surface focus:outline-none focus:border-secondary cursor-pointer"
            suppressHydrationWarning
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
           <select 
            value={filterWood} 
            onChange={e => setFilterWood(e.target.value)}
            className="bg-surface border border-outline-variant/50 rounded-lg px-4 py-3 font-label-md text-sm text-on-surface focus:outline-none focus:border-secondary cursor-pointer"
            suppressHydrationWarning
          >
            {woodTypes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredData.map((item) => (
             <GalleryItem key={item.id} item={item} />
          ))}
        </AnimatePresence>
        
        {filteredData.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">Keine Ergebnisse für diese Filterkombination.</p>
            <button 
              onClick={() => {setFilterCat('Alle'); setFilterWood('Alle')}}
              className="font-label-md text-sm text-secondary hover:underline underline-offset-4"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
