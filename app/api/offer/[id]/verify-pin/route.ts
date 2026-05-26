import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getOfferById } from '@/lib/data-service';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { pin } = body;

    if (!pin) {
      return NextResponse.json({ error: 'PIN erforderlich' }, { status: 400 });
    }

    const offer = await getOfferById(id);

    if (!offer) {
      return NextResponse.json({ error: 'Offerte nicht gefunden' }, { status: 404 });
    }
    if (!offer.accessPin || offer.accessPin === pin) {
      const cookieStore = await cookies();
      cookieStore.set(`offer_auth_${id}`, pin, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 Tage
        path: '/'
      });
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Falscher PIN-Code' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error verifying PIN:', error);
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 });
  }
}
