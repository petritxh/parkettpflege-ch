import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { customer, items, total } = data;

    if (!customer || !items || items.length === 0) {
      return NextResponse.json({ error: 'Ungültige Daten' }, { status: 400 });
    }

    // Save order as a Lead or separate Orders file
    const newOrder = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      type: 'SHOP_ORDER',
      status: 'NEU',
      customer,
      items,
      total,
    };

    // For simplicity, we just save it to a new file or append to leads
    // Let's create an orders.json if it doesn't exist, or just use leads.json
    const leadsPath = path.join(process.cwd(), 'data', 'leads.json');
    let leads = [];
    if (fs.existsSync(leadsPath)) {
      leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
    }

    // Convert shop order to lead format for the CRM
    const shopLead = {
      id: newOrder.id,
      createdAt: newOrder.date,
      status: 'NEU',
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone || '',
      },
      objectDetails: {
        address: `${customer.address}, ${customer.zip} ${customer.city}`,
        areaSqM: 0,
        woodType: 'Shop Bestellung',
        problem: items.map((i: any) => `${i.quantity}x ${i.name}`).join(', '),
      },
      serviceInfo: {
        service: 'Shop Bestellung',
        preferredDate: 'Schnellstmöglich',
      },
      source: 'Shop'
    };

    leads.unshift(shopLead);
    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));

    return NextResponse.json({ success: true, orderId: newOrder.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Interner Server Fehler' }, { status: 500 });
  }
}
