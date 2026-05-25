import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export async function generateSeoLocation(city: string) {
  const prompt = `
Du bist ein SEO-Experte und Texter für "Parkettpflege.ch", einen Schweizer Fachbetrieb für Parkettschleifen und Ölen.
Wir erstellen eine neue Landingpage für den Standort "${city}".
Erstelle dafür die passenden strukturierten SEO-Inhalte auf Schweizerdeutsch (kein "ß", etc.).
`;

  const { object } = await generateObject({
    model: google('gemini-3.5-flash'),
    schema: z.object({
      slug: z.string().describe('URL-friendly slug (z.B. "uster" oder "st-gallen")'),
      name: z.string().describe('Der Name der Stadt / Region'),
      metaTitle: z.string().describe('SEO Title Tag (max 60 Zeichen), z.B. "Parkett schleifen in Uster | Staubfrei"'),
      metaDescription: z.string().describe('SEO Meta Description (max 160 Zeichen)'),
      h1: z.string().describe('Hauptüberschrift (H1) für die Seite'),
      intro: z.string().describe('Einleitender Text (2-3 Sätze), der den Bezug zu Parkettpflege und der Region herstellt.'),
      imageUrl: z.string().describe('Immer diese Platzhalter-URL verwenden: https://lh3.googleusercontent.com/aida-public/AB6AXuDpu93OtXlPyxw3Fh8XWXP1eiKLfPGJzH5teHgLuKEiZXmrZSGLW-Zf--BKj2c1SGG0cTw1bVAUoEuxJq99uOwlEMNCxltT8xpWJ3b545ACcGEHH94IcFZiT_MlZE4yrHr-Shf7kC-aFN5H2JKU-OfZq1NYdtr7HtpmOpyewHaiUZVYrZD-YC9dEBzkkxnO__jrSZEuAi8Jf2BmuhyoQ6Fdue3u5I6TKtLbok4LWAcb66F-omZgTyn5UzsFFufhqcIuIMw0wcuG9H8'),
      stats: z.array(
        z.object({
          label: z.string().describe('Kurzer Label, z.B. "Anfahrt" oder "Einsatzgebiet"'),
          value: z.string().describe('Der Wert, z.B. "Kostenlos" oder die Region'),
        })
      ).describe('Ein Array mit 1 Statistik für diese Region'),
    }),
    prompt,
  });

  return object;
}
