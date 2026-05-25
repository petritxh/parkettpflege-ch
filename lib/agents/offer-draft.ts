import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { Lead, OfferLineItem } from '@/lib/types/crm';

export async function generateDraftOffer(lead: Lead) {
  const prompt = `
Du bist ein erfahrener Handwerker und Experte für Parkettböden in der Schweiz (Parkettpflege.ch).
Ein Kunde hat soeben eine Anfrage eingereicht. 
Erstelle einen Entwurf für eine Offerte (Kostenvoranschlag) basierend auf den folgenden Lead-Daten:

Kunde: ${lead.customer.firstName} ${lead.customer.lastName}
Adresse: ${lead.objectDetails.address || 'Nicht angegeben'}
Fläche: ${lead.objectDetails.areaSqM || 0} m2
Parkettart: ${lead.objectDetails.woodType || 'Unbekannt'}
Problem: ${lead.objectDetails.problem || 'Keines'}
Empfohlenes Paket: ${lead.recommendedPackage || lead.serviceInfo.service}

AI Diagnose:
${lead.aiDiagnosis?.suspectedDamage ? `Schaden: ${lead.aiDiagnosis.suspectedDamage}` : ''}
${lead.aiDiagnosis?.internalSummary ? `Zusammenfassung: ${lead.aiDiagnosis.internalSummary}` : ''}

Bitte gib ein JSON-Objekt zurück, das Rechnungspositionen (Line Items), Annahmen und Ausschlüsse enthält. 
Rechne realistische Schweizer Preise (z.B. Parkett schleifen ca. 45-55 CHF / m2, Anfahrtspauschale ca. 80-120 CHF).
`;

  const { object } = await generateObject({
    model: google('gemini-3.5-flash'),
    schema: z.object({
      title: z.string().describe('Titel der Offerte, z.B. "Offerte: Parkett Renovation"'),
      introText: z.string().describe('Kurzer, freundlicher Einleitungstext für den Kunden (Schweizer Deutsch)'),
      lineItems: z.array(
        z.object({
          description: z.string(),
          quantity: z.number(),
          unit: z.string().describe('Einheit z.B. m2, pauschal, h'),
          unitPrice: z.number(),
        })
      ),
      assumptions: z.array(z.string()).describe('Annahmen, die wir getroffen haben (z.B. "Räume sind leergeräumt")'),
      exclusions: z.array(z.string()).describe('Ausschlüsse (z.B. "Keine Sockelleisten demontieren")'),
      isFixedPrice: z.boolean().describe('Ob es ein Fixpreis oder ein Kostendach ist'),
    }),
    prompt,
  });

  // Calculate totals
  const mappedLineItems: OfferLineItem[] = object.lineItems.map((item, index) => ({
    id: `pos-${index + 1}`,
    description: item.description,
    quantity: item.quantity,
    unit: item.unit,
    unitPrice: item.unitPrice,
    totalPrice: item.quantity * item.unitPrice,
  }));

  const totalAmount = mappedLineItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return {
    title: object.title,
    introText: object.introText,
    lineItems: mappedLineItems,
    assumptions: object.assumptions,
    exclusions: object.exclusions,
    totalAmount,
    isFixedPrice: object.isFixedPrice,
  };
}
