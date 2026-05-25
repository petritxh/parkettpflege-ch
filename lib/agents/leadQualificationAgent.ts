import { LeadInput, LeadQualificationResult } from './types';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

/**
 * Lead Qualification Agent
 * 
 * Aufgabe: Analysiert Formular-Eingaben und (falls vorhanden) AI-Diagnosen,
 * um die Priorität und den Lead-Score zu berechnen.
 * 
 * @param input - Lead Daten vom Kontaktformular oder AI-Advisor
 * @returns LeadQualificationResult (Priorität, Score, Preisrahmen)
 */
export async function runLeadQualificationAgent(input: LeadInput): Promise<LeadQualificationResult> {
  const schema = z.object({
    score: z.number().min(0).max(100).describe('Score von 0 bis 100, der den Wert und die Wahrscheinlichkeit eines Abschlusses angibt (z.B. hohe Dringlichkeit oder B2B = hoher Score).'),
    priority: z.enum(['high', 'medium', 'low']).describe('Dringlichkeit basierend auf dem Schaden oder der Beschreibung.'),
    estimatedPriceRange: z.object({
      min: z.number().describe('Mindestpreis in CHF (grobe Schätzung)'),
      max: z.number().describe('Maximalpreis in CHF (grobe Schätzung)')
    }).describe('Eine sehr grobe, interne Schätzung des Budgets für diesen Auftrag. Niemals als bindend betrachten.'),
    recommendedAction: z.string().describe('Kurze Empfehlung, z.B. "Sofort anrufen" oder "Standard-Offerte senden".'),
    internalSummary: z.string().describe('Eine sehr kurze (1-2 Sätze) Zusammenfassung für den Vertriebler/Handwerker.')
  });

  try {
    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: schema,
      system: `Du bist ein erfahrener Parkettleger und qualifizierst neue Kundenanfragen (Leads).
      Deine Aufgabe ist es, die Anfrage zu analysieren, die Dringlichkeit einzuschätzen und einen Lead-Score zu vergeben.
      - Wasserschäden, Schimmel oder tiefe Kratzer haben hohe Dringlichkeit (high).
      - Gewerbliche Anfragen (Büro, Laden) sind sehr lukrativ -> hoher Score.
      - Reine Beratungsfragen haben niedrige Dringlichkeit (low).
      Bewerte objektiv und liefere eine präzise Schätzung in Schweizer Franken (CHF).
      GUARDRAIL: Die Preisschätzung ist strikt intern. Gib niemals harte Garantien ab.`,
      prompt: `Analysiere den folgenden Lead:
      Name: ${input.name}
      Email: ${input.email}
      Service: ${input.serviceOfInterest}
      Nachricht: ${input.message}
      Bilder vorhanden: ${input.hasImage ? 'Ja' : 'Nein'}
      
      ${input.aiAdvisorResult ? `
      Vorherige KI-Diagnose:
      Holzart: ${input.aiAdvisorResult.woodType}
      Schaden: ${input.aiAdvisorResult.damageType}
      Schweregrad: ${input.aiAdvisorResult.severity}
      ` : ''}
      `
    });

    return object as LeadQualificationResult;
  } catch (error) {
    console.error('Gemini API Error in LeadQualificationAgent:', error);
    // Fallback falls die API fehlschlägt
    return {
      score: 50,
      priority: 'medium',
      estimatedPriceRange: { min: 500, max: 1500 },
      recommendedAction: 'Manuelle Prüfung erforderlich (API Error)',
      internalSummary: `Fallback-Zusammenfassung: Fehler bei der KI-Analyse. Bitte manuell bewerten. Lead: ${input.name}`
    };
  }
}
