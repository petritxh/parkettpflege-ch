'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '@/components/providers/CartProvider';
import { X, Trash2, Plus, Minus, ShoppingBag, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', zip: '', city: ''
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/shop/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items.map(i => ({ id: i.product.id, name: i.product.name, price: i.product.price, quantity: i.quantity })),
          total: cartTotal
        })
      });
      
      if (res.ok) {
        setSuccess(true);
        clearCart();
        setTimeout(() => {
          setSuccess(false);
          setCheckoutMode(false);
          setIsCartOpen(false);
        }, 4000);
      } else {
        alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      }
    } catch (err) {
      alert('Ein Fehler ist aufgetreten.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-container-lowest shadow-2xl z-[101] flex flex-col border-l border-outline-variant/30"
          >
            {/* Header */}
            <div className="h-20 flex items-center justify-between px-6 border-b border-outline-variant/30 bg-surface">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-headline-sm text-lg">Warenkorb</h2>
              </div>
              <button 
                onClick={() => { setIsCartOpen(false); setCheckoutMode(false); }}
                className="p-2 hover:bg-surface-variant rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-on-surface-variant" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {success ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-headline-sm text-2xl text-on-surface">Vielen Dank!</h3>
                  <p className="text-on-surface-variant">Ihre Bestellung wurde erfolgreich übermittelt. Wir senden Ihnen die Rechnung und Lieferdetails in Kürze per E-Mail.</p>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
                  <ShoppingBag className="w-16 h-16 text-outline" />
                  <p className="font-body-lg text-on-surface-variant">Ihr Warenkorb ist leer.</p>
                  <button onClick={() => setIsCartOpen(false)} className="text-primary hover:underline font-label-md uppercase tracking-widest text-sm mt-4">
                    Weiter einkaufen
                  </button>
                </div>
              ) : checkoutMode ? (
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                  <h3 className="font-label-md uppercase tracking-widest text-xs text-on-surface-variant mb-4 border-b border-outline-variant/30 pb-2">Liefer- & Rechnungsadresse</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider mb-1 text-on-surface-variant">Vorname</label>
                      <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-surface border border-outline-variant/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider mb-1 text-on-surface-variant">Nachname</label>
                      <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-surface border border-outline-variant/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider mb-1 text-on-surface-variant">E-Mail</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-surface border border-outline-variant/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider mb-1 text-on-surface-variant">Adresse</label>
                    <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-surface border border-outline-variant/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <label className="block text-[10px] uppercase tracking-wider mb-1 text-on-surface-variant">PLZ</label>
                      <input required type="text" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} className="w-full bg-surface border border-outline-variant/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] uppercase tracking-wider mb-1 text-on-surface-variant">Ort (CH)</label>
                      <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-surface border border-outline-variant/50 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none" />
                    </div>
                  </div>
                  
                  <div className="bg-surface-variant/50 p-4 rounded-xl mt-6">
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Sie bestellen auf <strong>Rechnung</strong>. Die Rechnung liegt dem Paket bei. Kostenloser Versand ab CHF 100.-.
                    </p>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 items-center bg-surface p-3 rounded-2xl border border-outline-variant/30">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-on-surface leading-tight line-clamp-2">{item.product.name}</h4>
                        <p className="text-primary font-bold text-sm mt-1">CHF {item.product.price.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 bg-surface-container rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:bg-white rounded text-on-surface-variant"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:bg-white rounded text-on-surface-variant"><Plus className="w-3 h-3" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-error/70 hover:text-error p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {!success && items.length > 0 && (
              <div className="border-t border-outline-variant/30 bg-surface p-6 space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Zwischentotal</span>
                  <span className="font-medium">CHF {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-on-surface-variant">Versand (CH)</span>
                  <span className="font-medium">{cartTotal >= 100 ? 'Kostenlos' : 'CHF 9.00'}</span>
                </div>
                <div className="border-t border-outline-variant/30 pt-3 flex justify-between items-center">
                  <span className="font-bold text-on-surface">Total</span>
                  <span className="font-display-sm text-2xl text-primary">
                    CHF {(cartTotal + (cartTotal >= 100 ? 0 : 9)).toFixed(2)}
                  </span>
                </div>

                {checkoutMode ? (
                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => setCheckoutMode(false)}
                      className="px-4 py-3 rounded-xl border border-outline-variant hover:bg-surface-variant transition-colors text-sm font-medium"
                    >
                      Zurück
                    </button>
                    <button 
                      type="submit"
                      form="checkout-form"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary text-white py-3 rounded-xl font-label-md text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      Kostenpflichtig bestellen
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setCheckoutMode(true)}
                    className="w-full bg-gradient-to-r from-primary to-[#2a5a3b] text-white py-4 rounded-xl font-label-md text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md mt-2"
                  >
                    Zur Kasse <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Add Check icon missing from lucide-react import
function Check(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
