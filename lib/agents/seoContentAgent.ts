import { SEOContentInput, SEOContent } from './types';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

/**
 * SEO Content Agent
 * 
 * Aufgabe: Erstellt Metadaten, H1, FAQs und Schema-Daten für neue Problem- oder Leistungsseiten.
 * 
 * @param input - Themenfokus und Keywords
 * @returns SEOContent (Tags, Struktur, JSON-LD)
 */
export async function runSEOContentAgent(input: SEOContentInput): Promise<SEOContent> {
  const schema = z.object({
    metaTitle: z.string().max(60).describe('SEO Meta Title (max 60 Zeichen).'),
    metaDescription: z.string().max(160).describe('SEO Meta Description (max 160 Zeichen).'),
    h1: z.string().describe('Die Hauptüberschrift (H1) für die Seite.'),
    generatedFaqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).describe('3-5 nützliche FAQs passend zum Thema.'),
    suggestedInternalLinks: z.array(z.object({
      anchorText: z.string(),
      targetUrl: z.string().describe('Relativer Link, z.B. /kosten oder /kontakt')
    })),
    schemaJsonLd: z.record(z.string(), z.any()).describe('Gültiges JSON-LD für eine FAQPage.')
  });

  try {
    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: schema,
      system: `Du bist ein SEO-Experte für eine Schweizer Handwerksfirma (Parkettpflege.ch).
      Erstelle hochkonvertierende SEO-Inhalte für Landingpages.
      Die Sprache ist Schweizer Hochdeutsch (kein 'ß', immer 'ss').
      Achte streng auf die Zeichen-Limits für Title und Description.`,
      prompt: `Erstelle SEO-Inhalte für:
      Thema/Fokus: ${input.topicFocus}
      Primäre Keywords: ${input.primaryKeywords.join(', ')}
      Zielgruppe: ${input.targetAudience}
      `
    });

    return object as SEOContent;
  } catch (error) {
    console.error('Gemini API Error in SEOContentAgent:', error);
    
    // Fallback falls die API fehlschlägt
    const mainKeyword = input.primaryKeywords[0] || input.topicFocus;
    const generatedFaqs = [
      {
        question: `Wie viel kostet ${mainKeyword}?`,
        answer: `Die Kosten für ${mainKeyword} hängen stark von der Fläche und dem Ausgangszustand ab. Kontaktieren Sie uns für eine kostenlose Richtofferte.`
      },
      {
        question: `Wie lange dauert ${mainKeyword}?`,
        answer: `In der Regel dauert ${mainKeyword} bei einem durchschnittlichen Wohnzimmer ca. 1 bis 2 Tage, inklusive Trocknungszeiten.`
      }
    ];

    return {
      metaTitle: `${input.topicFocus} | Professionell in der Schweiz | Parkettpflege.ch`,
      metaDescription: `Suchen Sie Experten für ${mainKeyword}? Wir bieten massgeschneiderte Lösungen für ${input.targetAudience}. Jetzt unverbindlich anfragen!`,
      h1: `${input.topicFocus} vom Profi`,
      generatedFaqs,
      suggestedInternalLinks: [
        { anchorText: "Kostenübersicht", targetUrl: "/kosten" },
        { anchorText: "Kostenlose KI-Diagnose", targetUrl: "/ki-parkettcheck" }
      ],
      schemaJsonLd: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": generatedFaqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    };
  }
}
