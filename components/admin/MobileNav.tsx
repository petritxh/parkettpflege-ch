'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, LogOut, LayoutDashboard, Users, BrainCircuit, 
  FileText, Camera, Search, MessageCircleQuestion, Package, TerminalSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className="md:hidden h-16 flex items-center justify-between px-4 bg-surface-container border-b border-outline-variant/30 sticky top-0 z-50">
        <span className="font-headline-sm text-headline-sm text-primary font-bold">Admin CRM</span>
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 text-on-surface-variant">
             <LogOut className="w-5 h-5" />
          </Link>
          <button onClick={() => setIsOpen(true)} className="p-2 text-on-surface">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[100] md:hidden backdrop-blur-sm"
              onClick={closeMenu}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-3/4 max-w-sm h-full bg-surface-container z-[101] flex flex-col shadow-2xl md:hidden"
            >
              <div className="h-16 flex items-center justify-between px-4 border-b border-outline-variant/30">
                <span className="font-headline-sm text-primary font-bold">Menü</span>
                <button onClick={closeMenu} className="p-2 bg-surface-variant rounded-full text-on-surface">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                <Link onClick={closeMenu} href="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-label-md transition-colors ${pathname === '/admin' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant'}`}><LayoutDashboard className="w-5 h-5" /> Dashboard</Link>
                
                <div className="pt-4 pb-2 px-4"><p className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">CRM</p></div>
                <Link onClick={closeMenu} href="/admin/leads" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant font-label-md"><Users className="w-5 h-5" /> Leads</Link>
                <Link onClick={closeMenu} href="/admin/diagnostics" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant font-label-md"><BrainCircuit className="w-5 h-5" /> AI-Diagnosen</Link>
                <Link onClick={closeMenu} href="/admin/offers" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant font-label-md"><FileText className="w-5 h-5" /> Offerten</Link>
                
                <div className="pt-4 pb-2 px-4"><p className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">Content & SEO</p></div>
                <Link onClick={closeMenu} href="/admin/case-studies" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant font-label-md"><Camera className="w-5 h-5" /> Fallstudien</Link>
                <Link onClick={closeMenu} href="/admin/seo" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant font-label-md"><Search className="w-5 h-5" /> SEO-Seiten</Link>
                <Link onClick={closeMenu} href="/admin/faqs" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant font-label-md"><MessageCircleQuestion className="w-5 h-5" /> FAQs</Link>

                <div className="pt-4 pb-2 px-4"><p className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">System</p></div>
                <Link onClick={closeMenu} href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant font-label-md"><Package className="w-5 h-5" /> Produkte</Link>
                <Link onClick={closeMenu} href="/admin/agent-logs" className="flex items-center gap-3 px-4 py-3 rounded-xl text-on-surface-variant font-label-md"><TerminalSquare className="w-5 h-5" /> Agenten-Logs</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
