import { NextResponse } from 'next/server';
import { getOfferById, saveOffer, getSettings, saveEvent, getLeadById } from '@/lib/data-service';
import { sendEmail } from '@/lib/email-service';
import crypto from 'crypto';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { action, feedback, pin } = body; 
    // action: 'accepted' | 'rejected' | 'rethinking'

    const offer = await getOfferById(id);

    if (!offer) {
      return NextResponse.json({ error: 'Offerte nicht gefunden' }, { status: 404 });
    }

    // PIN check for security before changing status
    if (offer.accessPin && offer.accessPin !== pin) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
    }

    if (action === 'accepted') {
      offer.customerStatus = 'accepted';
      offer.status = 'Angenommen'; // Synchronize with internal CRM status
    } else if (action === 'rejected') {
      offer.customerStatus = 'rejected';
      offer.status = 'Abgelehnt';
    } else if (action === 'rethinking') {
      offer.customerStatus = 'rethinking';
    }

    if (feedback) {
      offer.customerFeedback = feedback;
    }

    await saveOffer(offer);

    // E-Mail an den Kunden auslösen (Bestätigung) wenn angenommen
    if (action === 'accepted') {
      const settings = await getSettings();
      let emailBody = settings.emailOrderConfirmationTemplate || settings.emailConfirmationTemplate;
      emailBody = emailBody.replace('{KUNDE_NAME}', `${offer.customer.firstName} ${offer.customer.lastName}`);
      emailBody = emailBody.replace('{OFFER_ID}', offer.id.substring(0, 8).toUpperCase());
      
      const subject = `Auftragsbestätigung: Offerte ${offer.id.substring(0, 8).toUpperCase()}`;
      await sendEmail(offer.customer.email, subject, emailBody);
      
      // Admin Benachrichtigung (Simulation)
      await sendEmail('info@parkett-pflege.ch', `Juhu! Angebot angenommen: ${offer.title}`, `Der Kunde ${offer.customer.firstName} ${offer.customer.lastName} hat die Offerte online angenommen!`);

      // Im Kalender eintragen
      try {
        const lead = await getLeadById(offer.leadId);
        let eventDate = new Date().toISOString().split('T')[0];
        
        // Versuche das preferredDate zu parsen (sehr rudimentär, oft ist es Freitext wie "Nächste Woche")
        // Wenn es ein valides Datum ist, nehmen wir das, ansonsten das aktuelle Datum.
        if (lead?.serviceInfo?.preferredDate) {
          const parsed = new Date(lead.serviceInfo.preferredDate);
          if (!isNaN(parsed.getTime())) {
             eventDate = parsed.toISOString().split('T')[0];
          }
        }

        const newEvent = {
          id: crypto.randomUUID(),
          title: `${offer.title} - ${offer.customer.lastName}`,
          date: eventDate,
          offerId: offer.id,
          leadId: offer.leadId,
          status: 'Geplant',
          notes: `Automatisch erstellt aus angenommener Offerte.\nWunschdatum des Kunden war: ${lead?.serviceInfo?.preferredDate || 'Unbekannt'}`
        };

        await saveEvent(newEvent);
      } catch (err) {
        console.error("Fehler beim Erstellen des Kalendereintrags:", err);
      }
    } else if (action === 'rethinking' && feedback) {
      await sendEmail('info@parkett-pflege.ch', `Kunden-Rückfrage: Offerte ${offer.title}`, `Der Kunde hat folgende Frage:\n\n${feedback}`);
    }

    return NextResponse.json({ success: true, status: offer.customerStatus });
  } catch (error) {
    console.error('Error processing offer response:', error);
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 });
  }
}
