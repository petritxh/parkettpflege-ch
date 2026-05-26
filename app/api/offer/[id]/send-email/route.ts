import { NextResponse } from 'next/server';
import { getOfferById, getSettings, saveOffer } from '@/lib/data-service';
import { sendEmail } from '@/lib/email-service';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const offer = await getOfferById(id);

    if (!offer) {
      return NextResponse.json({ error: 'Offerte nicht gefunden' }, { status: 404 });
    }

    const settings = await getSettings();
    
    // Fallback PIN falls aus irgendeinem Grund noch keiner existiert
    if (!offer.accessPin) {
      offer.accessPin = Math.floor(1000 + Math.random() * 9000).toString();
      await saveOffer(offer);
    }

    const publicLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/offerte/${offer.id}`;
    
    let emailBody = settings.emailOfferLinkTemplate;
    emailBody = emailBody.replace('{KUNDE_NAME}', `${offer.customer.firstName} ${offer.customer.lastName}`);
    emailBody = emailBody.replace('{LINK}', publicLink);
    emailBody = emailBody.replace('{PIN}', offer.accessPin);

    const subject = `Ihre Offerte von Parkett-Pflege.ch: ${offer.title}`;

    await sendEmail(offer.customer.email, subject, emailBody);

    // Update Status auf Gesendet
    if (offer.status === 'Entwurf') {
      offer.status = 'Gesendet';
      await saveOffer(offer);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending offer email:', error);
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 });
  }
}
