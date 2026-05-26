import { NextResponse } from 'next/server';
import { getOfferById, saveOffer, getSettings } from '@/lib/data-service';
import { sendEmail } from '@/lib/email-service';

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
      let emailBody = settings.emailConfirmationTemplate;
      emailBody = emailBody.replace('{KUNDE_NAME}', `${offer.customer.firstName} ${offer.customer.lastName}`);
      emailBody = emailBody.replace('{OFFER_ID}', offer.id.substring(0, 8).toUpperCase());
      
      const subject = `Auftragsbestätigung: Offerte ${offer.id.substring(0, 8).toUpperCase()}`;
      await sendEmail(offer.customer.email, subject, emailBody);
      
      // Admin Benachrichtigung (Simulation)
      await sendEmail('info@parkett-pflege.ch', `Juhu! Angebot angenommen: ${offer.title}`, `Der Kunde ${offer.customer.firstName} ${offer.customer.lastName} hat die Offerte online angenommen!`);
    } else if (action === 'rethinking' && feedback) {
      await sendEmail('info@parkett-pflege.ch', `Kunden-Rückfrage: Offerte ${offer.title}`, `Der Kunde hat folgende Frage:\n\n${feedback}`);
    }

    return NextResponse.json({ success: true, status: offer.customerStatus });
  } catch (error) {
    console.error('Error processing offer response:', error);
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 });
  }
}
