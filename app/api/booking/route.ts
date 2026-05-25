import { NextResponse } from 'next/server';
import { generateDraftOffer } from '@/lib/agents/offer-draft';
import { saveOffer } from '@/lib/data-service';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { firstName, lastName, email, phone, service, date, time, message } = body;
    
    // Grundlegende Validierung
    if (!firstName || !lastName || !email || !phone || !service || !date || !time) {
      return NextResponse.json({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
    }

    // Lead Score Berechnung (Einfaches System)
    let leadScore = 0;
    
    const messageLower = (message || '').toLowerCase();
    
    // Hohe Priorität Trigger-Wörter
    if (messageLower.includes('wasserschaden') || messageLower.includes('dringend') || messageLower.includes('gewerbe') || messageLower.includes('büro') || messageLower.includes('gross') || messageLower.includes('gross')) {
      leadScore += 50;
    }
    
    // Service-Bewertung
    if (service.includes('Pflege & Reinigung') || service.includes('Reinigung')) {
      leadScore += 20;
    } else if (service.includes('Kostenvoranschlag')) {
      leadScore += 30; 
    } else {
      // Besichtigung (am ehesten Top-of-Funnel)
      leadScore += 10;
    }
    
    // Termin-Dringlichkeit
    if (date === 'Heute' || date === 'Morgen') {
      leadScore += 20; // kurzfristiges Interesse -> oft hohe Conversion oder Notfall
    }
    
    const lead: any = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      status: 'Neu',
      funnelSource: 'BookingModal',
      customer: {
        firstName,
        lastName,
        email,
        phone
      },
      objectDetails: {},
      serviceInfo: {
        service,
        preferredDate: date,
        preferredTime: time,
        message: message || ''
      },
      leadScore,
      priority: leadScore >= 50 ? 'Hoch' : leadScore >= 30 ? 'Mittel' : 'Niedrig'
    };

    if (body.aiDiagnosis) {
      lead.aiDiagnosis = body.aiDiagnosis;
    }

    // Lokal speichern in JSON (als Mock-Datenbank / Vorstufe zu Postgres/Supabase)
    const { saveLead } = await import('@/lib/data-service');
    await saveLead(lead);

    // KI-Agent anstossen (asynchron, blockiert nicht die Response)
    // In Produktion würde man hier Vercel Inngest / Trigger.dev oder BullMQ nutzen
    Promise.resolve().then(async () => {
      try {
        console.log(`[Agent] Starte Offer Draft für Lead ${lead.id}`);
        const draftData = await generateDraftOffer(lead);
        
        const offer = {
          id: crypto.randomUUID(),
          leadId: lead.id,
          status: 'Entwurf' as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          customer: lead.customer,
          title: draftData.title,
          introText: draftData.introText,
          lineItems: draftData.lineItems,
          assumptions: draftData.assumptions,
          exclusions: draftData.exclusions,
          totalAmount: draftData.totalAmount,
          isFixedPrice: draftData.isFixedPrice,
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 Tage gültig
        };
        
        await saveOffer(offer);
        console.log(`[Agent] Offer Draft erfolgreich erstellt für Lead ${lead.id}`);
      } catch (err) {
        console.error(`[Agent] Fehler beim Erstellen des Offer Drafts:`, err);
      }
    });

    // Erfolgreiche Antwort zurückgeben
    return NextResponse.json({ 
      success: true, 
      message: 'Ihre Anfrage wurde erfolgreich übermittelt.',
      leadId: lead.id
    }, { status: 201 });

  } catch (error) {
    console.error('Fehler bei der Terminbuchung:', error);
    return NextResponse.json({ error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' }, { status: 500 });
  }
}
