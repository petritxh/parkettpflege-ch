import { CaseStudyInput, CaseStudy } from './types';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

/**
 * Case Study Agent
 * 
 * Aufgabe: Erstellt Vorher/Nachher Use-Cases für das Marketing und SEO.
 * 
 * @param input - Projekt-Daten, Leistungen
 * @returns CaseStudy (Texte für Web und Social Media)
 */
export async function runCaseStudyAgent(input: CaseStudyInput): Promise<CaseStudy> {
  const schema = z.object({
    title: z.string().describe('Ein packender Titel für die Fallstudie.'),
    seoDescription: z.string().max(160).describe('Kurze SEO Beschreibung (Meta-Description).'),
    storyText: z.string().describe('Der Text für die Webseite, strukturiert mit Markdown (Herausforderung, Lösung, Ergebnis).'),
    socialCaptions: z.array(z.object({
      platform: z.enum(['instagram', 'linkedin', 'facebook']),
      text: z.string().describe('Der Text für den Social Media Post inkl. Hashtags und Emojis.')
    }))
  });

  try {
    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: schema,
      system: `Du bist ein Social-Media- und Content-Marketing-Experte für eine Schweizer Handwerksfirma (Parkettpflege.ch).
      Erstelle ansprechende Fallstudien aus abgeschlossenen Projekten.
      Nutze Schweizer Hochdeutsch (immer 'ss' statt 'ß').
      Passe den Tonfall an die Plattform an (Instagram = visuell/emojis, LinkedIn = professionell/Werterhalt).`,
      prompt: `Erstelle eine Fallstudie für folgendes Projekt:
      Holzart: ${input.woodType}
      Service: ${input.servicePerformed}
      Problem: ${input.problemDescription}
      Lösung: ${input.solutionDescription}
      Dauer: ${input.durationDays} Tage
      Vorher/Nachher-Bilder: ${input.hasBeforeAfterImages ? 'Ja, vorhanden.' : 'Nein.'}
      `
    });

    return object as CaseStudy;
  } catch (error) {
    console.error('Gemini API Error in CaseStudyAgent:', error);
    
    // Fallback falls die API fehlschlägt
    const title = `Erfolgreiche ${input.servicePerformed} bei ${input.woodType}-Parkett`;
    const storyText = `
### Die Herausforderung
Der Kunde meldete sich mit folgendem Problem: ${input.problemDescription}. Das ${input.woodType}-Parkett hatte dadurch stark an Ausstrahlung verloren.

### Unsere Lösung
Innerhalb von ${input.durationDays} Tagen haben wir das Problem behoben: ${input.solutionDescription}. 
Dank unserer professionellen Technik konnte der Raum direkt im Anschluss wieder genutzt werden.
    `.trim();

    return {
      title,
      seoDescription: `Vorher-Nachher Beispiel: Wie wir ${input.problemDescription} bei einem ${input.woodType}-Boden durch ${input.servicePerformed} erfolgreich gelöst haben.`,
      storyText,
      socialCaptions: [
        {
          platform: 'instagram',
          text: `✨ Vorher vs. Nachher ✨\nWir lieben es, alten Böden neues Leben einzuhauchen! Hier haben wir ein ${input.woodType} Parkett gerettet.\nProblem: ${input.problemDescription}\nLösung: ${input.servicePerformed}\n\nLass uns wissen, was du denkst! 👇\n#Parkett #Parkettpflege #Handwerk #Schweiz #VorherNachher`
        }
      ]
    };
  }
}
