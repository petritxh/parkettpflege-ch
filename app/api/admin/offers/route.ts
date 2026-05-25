import { NextResponse } from 'next/server';
import { getOffers, saveOffer } from '@/lib/data-service';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const leadId = searchParams.get('leadId');
    
    let offers = await getOffers();
    
    if (leadId) {
      offers = offers.filter(o => o.leadId === leadId);
    }
    
    offers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return NextResponse.json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await saveOffer(body);
    return NextResponse.json({ success: true, id: body.id }, { status: 201 });
  } catch (error) {
    console.error('Error saving offer:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
