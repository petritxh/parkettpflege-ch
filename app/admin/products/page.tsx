'use client';

import { Package, Loader2 } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-sm text-display-sm mb-2">Produkte & Materialien</h1>
          <p className="text-on-surface-variant font-body-md">Verwaltung der Pflegeprodukte und Materialien für den Onlineshop oder Offerten.</p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)] p-8">
        <div className="flex flex-col items-center justify-center h-full text-on-surface-variant gap-4">
           <Package className="w-12 h-12 text-secondary opacity-50" />
           <p>Modul im Aufbau.</p>
        </div>
      </div>
    </div>
  );
}
