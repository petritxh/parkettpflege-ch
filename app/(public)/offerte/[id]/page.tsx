import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getOfferById, getSettings, getLeadById } from '@/lib/data-service';
import OfferPageView from './OfferPageView';

export default async function PublicOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offer = await getOfferById(id);

  if (!offer) {
    notFound();
  }

  const cookieStore = await cookies();
  const authCookie = cookieStore.get(`offer_auth_${id}`);
  
  // Überprüfe, ob der PIN im Cookie mit dem der Offerte übereinstimmt
  const isAuthorized = !offer.accessPin || authCookie?.value === offer.accessPin;

  const settings = await getSettings();
  const lead = await getLeadById(offer.leadId);

  return (
    <div className="min-h-screen bg-surface-variant font-sans text-on-surface">
      <OfferPageView 
        offer={offer} 
        settings={settings} 
        isAuthorized={isAuthorized} 
        lead={lead} 
      />
    </div>
  );
}
