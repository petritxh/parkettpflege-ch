import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/data-service';

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Fehler beim Laden der Einstellungen' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newSettings = {
      offerIntroTemplate: body.offerIntroTemplate,
      offerFooterTemplate: body.offerFooterTemplate,
      emailOfferLinkTemplate: body.emailOfferLinkTemplate,
      emailConfirmationTemplate: body.emailConfirmationTemplate,
      emailOrderConfirmationTemplate: body.emailOrderConfirmationTemplate
    };
    await saveSettings(newSettings);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ error: 'Fehler beim Speichern der Einstellungen' }, { status: 500 });
  }
}
