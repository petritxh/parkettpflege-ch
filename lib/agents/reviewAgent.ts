import { ReviewInput, ReviewRequest } from './types';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

/**
 * Review Agent
 * 
 * Aufgabe: Erstellt eine Anfrage-Mail für eine Google-Bewertung nach Projektabschluss.
 * GUARDRAIL: Darf keine Bewertungen erfinden oder auf Google posten!
 * 
 * @param input - Kunden- und Projektdaten
 * @returns ReviewRequest (E-Mail und Entwurf für Kunden)
 */
export async function runReviewAgent(input: ReviewInput): Promise<ReviewRequest> {
  const schema = z.object({
    emailSubject: z.string().describe('Ein freundlicher Betreff, der zur Bewertung einlädt.'),
    emailBody: z.string().describe('E-Mail-Text, der sich bedankt und um eine Bewertung bittet.'),
    instructionsForGoogle: z.string().describe('Kurze Anleitung, wie der Kunde die Bewertung abgeben kann (z.B. Link klicken).'),
    suggestedTestimonial: z.string().describe('Eine vorgeschlagene Bewertung, die der Kunde kopieren kann. Muss realistisch und authentisch klingen, basierend auf den Highlights.')
  });

  try {
    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: schema,
      system: `Du bist ein Kundenbetreuer für eine Schweizer Handwerksfirma (Parkettpflege.ch).
      Erstelle eine E-Mail, die Kunden höflich um eine Google-Bewertung bittet.
      Formuliere als zusätzliche Hilfe EINEN Entwurf für die Bewertung, den der Kunde einfach kopieren kann.
      Die Sprache ist Schweizer Hochdeutsch (immer 'ss' statt 'ß').`,
      prompt: `Erstelle eine Bewertungs-Anfrage für folgendes Projekt:
      Kunde: ${input.customerName}
      Service: ${input.servicePerformed}
      Highlights des Projekts: ${input.projectSuccessHighlights.join(', ')}
      `
    });

    return object as ReviewRequest;
  } catch (error) {
    console.error('Gemini API Error in ReviewAgent:', error);
    
    // Fallback falls die API fehlschlägt
    const highlightsString = input.projectSuccessHighlights.join(' und ');

    return {
      emailSubject: `Wie zufrieden waren Sie mit unserer Arbeit, ${input.customerName}?`,
      emailBody: `Guten Tag ${input.customerName},\n\nwir hoffen, Sie haben viel Freude an Ihrem neu aufbereiteten Parkett. Es war uns eine Freude, das Projekt (${input.servicePerformed}) für Sie umzusetzen.\n\nUm anderen Kunden bei ihrer Entscheidung zu helfen, würden wir uns riesig über eine kurze Google-Bewertung freuen. Es dauert nur eine Minute!\n\nHerzliche Grüsse\nIhr Team von Parkettpflege.ch`,
      instructionsForGoogle: `Link klicken -> Sterne vergeben -> Text einfügen -> Speichern.`,
      suggestedTestimonial: `Das Team von Parkettpflege.ch hat bei uns hervorragende Arbeit geleistet. Besonders beeindruckt hat mich ${highlightsString}. Das Ergebnis der ${input.servicePerformed} ist perfekt. Absolut empfehlenswert!`
    };
  }
}
