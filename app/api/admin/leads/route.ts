import { NextResponse } from 'next/server';
import { getLeads, saveLead } from '@/lib/data-service';

export async function GET(req: Request) {
  try {
    const leads = await getLeads();
    // Neueste Leads zuerst
    leads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await saveLead(body);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
