import { OfferDraftInput, OfferDraft } from './types';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

/**
 * Offer Draft Agent
 * 
 * Aufgabe: Erstellt einen Rohentwurf für ein Angebot auf Basis des Leads.
 * GUARDRAIL: Darf niemals automatisch direkt als finale Offerte an den Kunden gesendet werden.
 * 
 * @param input - Lead-Daten, Qualifizierung und Kunden-Details
 * @returns OfferDraft (Entwurfstext, Annahmen, Fragen)
 */
export async function runOfferDraftAgent(input: OfferDraftInput): Promise<OfferDraft> {
  const schema = z.object({
    draftText: z.string().describe('Der Text der Offerte/E-Mail an den Kunden. Sehr höflich und professionell, aber deutlich als "grober Entwurf" oder "erste Einschätzung" deklariert.'),
    assumptions: z.array(z.string()).describe('Annahmen, die wir treffen (z.B. "Boden ist eben", "Zimmer sind leer").'),
    openQuestions: z.array(z.string()).describe('Fragen an den Kunden, die für ein finales Angebot nötig sind (z.B. genaue m2, Treppen).'),
    estimatedPriceRange: z.object({
      min: z.number(),
      max: z.number()
    }),
    isFinal: z.boolean().describe('GUARDRAIL: Muss immer false sein.')
  });

  try {
    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: schema,
      system: `Du bist ein professioneller Verkaufsberater für eine Schweizer Parkettfirma (Parkettpflege.ch).
      Deine Aufgabe ist es, einen ersten Offerten-ENTWURF für einen Kunden zu erstellen.
      Der Entwurf darf KEINE bindenden Garantien oder finalen Preise enthalten.
      Die Preise in CHF müssen als "grobe Kostenschätzung" deklariert werden.
      Die Sprache ist Schweizer Hochdeutsch (kein 'ß', immer 'ss').
      Verwende die geschätzten Kosten aus der internen Qualifikation als Basis.`,
      prompt: `Erstelle einen Offerten-Entwurf für diesen Kunden:
      Kunde: ${input.customerDetails.firstName} ${input.customerDetails.lastName}
      Service: ${input.lead.serviceOfInterest}
      Kunden-Nachricht: ${input.lead.message}
      Interne Kostenschätzung (Qualifikation): CHF ${input.qualification.estimatedPriceRange.min} - ${input.qualification.estimatedPriceRange.max}
      `
    });

    // Guardrail Enforcement: Immer false
    object.isFinal = false;

    return object as OfferDraft;
  } catch (error) {
    console.error('Gemini API Error in OfferDraftAgent:', error);
    return {
      draftText: `Sehr geehrte(r) ${input.customerDetails.firstName} ${input.customerDetails.lastName},\n\nvielen Dank für Ihre Anfrage. Wir prüfen diese derzeit und melden uns in Kürze mit einer Einschätzung. (Fehler bei der KI-Generierung)`,
      assumptions: ["Standardannahmen"],
      openQuestions: ["Können wir Sie telefonisch für Details erreichen?"],
      estimatedPriceRange: input.qualification.estimatedPriceRange,
      isFinal: false
    };
  }
}
