import { FollowUpInput, FollowUpDraft } from './types';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

/**
 * Follow-up Agent
 * 
 * Aufgabe: Generiert freundliche Nachfassnachrichten für E-Mail und WhatsApp,
 * wenn der Kunde auf eine Offerte noch nicht reagiert hat.
 * 
 * @param input - Lead-Name, vergangene Tage, Service
 * @returns FollowUpDraft (E-Mail und WhatsApp Text)
 */
export async function runFollowUpAgent(input: FollowUpInput): Promise<FollowUpDraft> {
  const schema = z.object({
    emailSubject: z.string().describe('Ein kurzer, ansprechender E-Mail-Betreff.'),
    emailBody: z.string().describe('Der Text der E-Mail. Höflich, freundlich und auf den Service bezogen.'),
    whatsappMessage: z.string().describe('Eine kurze, informelle WhatsApp-Nachricht, inkl. Emojis (wie 👋 oder 🔨).')
  });

  try {
    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: schema,
      system: `Du bist ein freundlicher Kundenbetreuer für eine Schweizer Parkettfirma (Parkettpflege.ch).
      Deine Aufgabe ist es, Follow-up Nachrichten zu verfassen, wenn Kunden sich nach einer Offerte nicht mehr gemeldet haben.
      Die Sprache ist Schweizer Hochdeutsch (kein 'ß', immer 'ss').
      Wenn der Kontakt sehr lange her ist (> 14 Tage), frage höflich, ob das Projekt geschlossen werden kann.`,
      prompt: `Erstelle eine Nachfassnachricht für folgenden Lead:
      Kunde: ${input.leadName}
      Angefragter Service: ${input.serviceQuoted}
      Tage seit letztem Kontakt: ${input.daysSinceLastContact}
      Zusatz-Kontext: ${input.previousInteractionSummary || 'Keine Angabe'}
      `
    });

    return object as FollowUpDraft;
  } catch (error) {
    console.error('Gemini API Error in FollowUpAgent:', error);
    // Fallback falls die API fehlschlägt
    let emailSubject = `Ihre Anfrage zur ${input.serviceQuoted} - Parkettpflege.ch`;
    let emailBody = `Guten Tag ${input.leadName},\n\nvor ${input.daysSinceLastContact} Tagen hatten wir Ihnen Informationen zu Ihrer Anfrage bezüglich "${input.serviceQuoted}" zukommen lassen.\n\nHaben Sie noch Fragen dazu oder benötigen Sie eine detailliertere Offerte? Gerne stehe ich Ihnen für ein kurzes Telefonat zur Verfügung.\n\nFreundliche Grüsse\nIhr Team von Parkettpflege.ch`;
    let whatsappMessage = `Hallo ${input.leadName}, hier ist Parkettpflege.ch. Haben Sie unsere Offerte bezüglich ${input.serviceQuoted} erhalten? Melden Sie sich gerne, falls noch Fragen offen sind! 👋`;

    if (input.daysSinceLastContact > 14) {
       emailSubject = `Dürfen wir Ihr Projekt "${input.serviceQuoted}" schliessen?`;
       emailBody = `Guten Tag ${input.leadName},\n\nda wir schon länger nichts mehr von Ihnen gehört haben, gehen wir davon aus, dass sich Ihr Anliegen zur ${input.serviceQuoted} vorerst erledigt hat.\n\nSollte das Thema wieder aktuell werden, sind wir jederzeit gerne für Sie da.\n\nFreundliche Grüsse\nIhr Team von Parkettpflege.ch`;
       whatsappMessage = `Hallo ${input.leadName}, da wir länger nichts gehört haben, schliessen wir vorerst Ihre Anfrage zur ${input.serviceQuoted}. Bei Bedarf sind wir jederzeit wieder erreichbar. Liebe Grüsse!`;
    }

    return {
      emailSubject,
      emailBody,
      whatsappMessage
    };
  }
}
