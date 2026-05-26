import { NextResponse } from 'next/server';
import { getEvents, saveEvent } from '@/lib/data-service';
import crypto from 'crypto';

export async function GET() {
  try {
    const events = await getEvents();
    // Nach Datum sortieren (aufsteigend)
    events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newEvent = {
      id: crypto.randomUUID(),
      ...body
    };
    await saveEvent(newEvent);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
