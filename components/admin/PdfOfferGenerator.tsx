'use client';

import { useState, useRef } from 'react';
import { Offer, Lead } from '@/lib/types/crm';
import { Download, Loader2 } from 'lucide-react';

interface PdfOfferGeneratorProps {
  offer: Offer;
  lead?: Lead | null;
}

export default function PdfOfferGenerator({ offer, lead }: PdfOfferGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!pdfRef.current) return;
    setIsGenerating(true);

    try {
      const element = pdfRef.current;
      
      // Dynamischer Import von html2pdf.js
      const html2pdf = (await import('html2pdf.js')).default;

      // Kurze Verzögerung für Font-Rendering
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const opt = {
        margin:       15,
        filename:     `Offerte_Parkettpflege_${offer.id.substring(0, 8)}.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(element).save();
      
    } catch (error: any) {
      console.error('PDF Generation failed:', error);
      alert('Fehler beim Generieren des PDFs: ' + (error.message || error));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className="w-full bg-secondary text-white py-3 px-4 rounded-xl font-label-md text-xs uppercase tracking-widest font-bold shadow-md hover:bg-secondary/90 flex justify-center items-center gap-2 transition-all disabled:opacity-50"
      >
        {isGenerating ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Generiere PDF...</>
        ) : (
          <><Download className="w-4 h-4" /> PDF herunterladen</>
        )}
      </button>

      {/* Hidden Container for PDF Rendering - darf nicht opacity-0 sein für html2canvas */}
      <div className="absolute top-[-9999px] left-[-9999px] w-[800px]">
        <div 
          ref={pdfRef} 
          className="w-[800px] bg-white text-black p-12 relative"
          style={{ fontFamily: "'Inter', sans-serif" }} // Standard Font für PDF falls Custom Font nicht lädt
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-12 border-b-2 border-black/10 pb-8">
             <div>
               <h1 className="text-4xl font-bold text-[#061b0e] tracking-tight">Parkett-Pflege.ch</h1>
               <p className="text-[#6b7280] mt-2 text-sm">Offizielle Richtofferte / Angebot</p>
             </div>
             <div className="text-right text-sm text-[#4b5563]">
               <p>Zürichstrasse 12</p>
               <p>8001 Zürich</p>
               <p>info@parkett-pflege.ch</p>
               <p>+41 44 000 00 00</p>
             </div>
          </div>

          {/* Adressat & Info */}
          <div className="flex justify-between items-end mb-12">
             <div className="text-base text-[#1f2937]">
                <p className="font-bold">{offer.customer.firstName} {offer.customer.lastName}</p>
                {lead?.objectDetails?.address && <p>{lead.objectDetails.address}</p>}
                <p>{offer.customer.email}</p>
             </div>
             <div className="text-right text-sm">
                <p><span className="text-[#6b7280]">Offerten-Nr:</span> {offer.id.substring(0,8).toUpperCase()}</p>
                <p><span className="text-[#6b7280]">Datum:</span> {new Date().toLocaleDateString('de-CH')}</p>
                <p><span className="text-[#6b7280]">Gültig bis:</span> {offer.validUntil}</p>
             </div>
          </div>

          {/* Titel & Intro */}
          <div className="mb-10">
             <h2 className="text-2xl font-bold text-[#061b0e] mb-4">{offer.title}</h2>
             <p className="text-[#374151] leading-relaxed whitespace-pre-wrap">{offer.introText}</p>
          </div>

          {/* Positionen */}
          <div className="mb-10">
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="border-b-2 border-[#061b0e]">
                      <th className="py-3 font-bold text-sm text-[#4b5563]">Position</th>
                      <th className="py-3 font-bold text-sm text-[#4b5563] text-center">Menge</th>
                      <th className="py-3 font-bold text-sm text-[#4b5563] text-right">Einzelpreis</th>
                      <th className="py-3 font-bold text-sm text-[#4b5563] text-right">Total</th>
                   </tr>
                </thead>
                <tbody>
                   {offer.lineItems.map((item, idx) => (
                     <tr key={item.id} className="border-b border-[#e5e7eb]">
                        <td className="py-4 text-sm text-[#1f2937] pr-4">{item.description}</td>
                        <td className="py-4 text-sm text-[#1f2937] text-center">{item.quantity} {item.unit}</td>
                        <td className="py-4 text-sm text-[#1f2937] text-right">CHF {item.unitPrice.toFixed(2)}</td>
                        <td className="py-4 text-sm font-bold text-[#1f2937] text-right">CHF {item.totalPrice.toFixed(2)}</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>

          {/* Total */}
          <div className="flex justify-end mb-12">
             <div className="w-1/2 bg-[#f9fafb] p-6 rounded-lg">
                <div className="flex justify-between items-center text-lg font-bold text-[#061b0e]">
                   <span>Totalbetrag (inkl. MwSt):</span>
                   <span>CHF {offer.totalAmount.toFixed(2)}</span>
                </div>
                {offer.isFixedPrice && (
                   <p className="text-xs text-[#15803d] mt-2 font-medium">Dies ist ein garantierter Fixpreis.</p>
                )}
             </div>
          </div>

          {/* Annahmen & Ausschlüsse */}
          <div className="grid grid-cols-2 gap-8 mb-12">
             {offer.assumptions.length > 0 && (
                <div>
                   <h4 className="font-bold text-sm text-[#1f2937] mb-2 uppercase tracking-wide">Inklusive / Annahmen</h4>
                   <ul className="list-disc list-inside text-sm text-[#4b5563] space-y-1">
                      {offer.assumptions.map((a, i) => <li key={i}>{a}</li>)}
                   </ul>
                </div>
             )}
             {offer.exclusions.length > 0 && (
                <div>
                   <h4 className="font-bold text-sm text-[#1f2937] mb-2 uppercase tracking-wide">Exklusive</h4>
                   <ul className="list-disc list-inside text-sm text-[#4b5563] space-y-1">
                      {offer.exclusions.map((e, i) => <li key={i}>{e}</li>)}
                   </ul>
                </div>
             )}
          </div>

          {/* Footer */}
          <div className="border-t border-[#e5e7eb] pt-8 mt-8 text-center text-xs text-[#6b7280]">
             <p>Vielen Dank für Ihr Vertrauen in Parkett-Pflege.ch. Bei Rückfragen stehen wir Ihnen gerne zur Verfügung.</p>
             <p className="mt-2">Bitte bestätigen Sie diese Offerte per E-Mail oder telefonisch, um den Termin final zu buchen.</p>
          </div>
        </div>
      </div>
    </>
  );
}
