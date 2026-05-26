import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

export async function POST(req: Request) {
  try {
    const { title, sectionPrompt } = await req.json();

    if (!title || !sectionPrompt) {
      return NextResponse.json({ error: 'Titel und Abschnitts-Prompt werden benötigt' }, { status: 400 });
    }

    logger.log('SEOContentAgent', `Generiere SEO Text-Abschnitt: ${title}`, 'running');

    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      maxRetries: 0,
      schema: z.object({
        sectionMarkdown: z.string().describe("Der generierte Markdown-Abschnitt. Muss mit einer H2-Überschrift (##) oder H3-Überschrift (###) beginnen. Reichhaltige Details, professionelles Schweizer Parkettleger-Wissen. Do NOT wrap in ```markdown.")
      }),
      prompt: `
      Du bist ein Meister im Schweizer Parkettleger-Handwerk mit über 20 Jahren Erfahrung und ein SEO-Copywriting-Experte.
      Der Artikel-Haupttitel lautet: "${title}".
      
      Aufgabe: 
      Schreibe einen neuen, detaillierten und packenden Abschnitt für diesen Artikel im PERFEKTEN Markdown-Format.
      Der genaue Schreibauftrag lautet: "${sectionPrompt}".
      
      Vorgaben:
      1. Der Abschnitt MUSS mit einer passenden H2 (##) oder H3 (###) Überschrift beginnen.
      2. Schreibe tiefgehendes Fachwissen (mind. 200-300 Wörter).
      3. Verwende fette Schlüsselbegriffe, Aufzählungszeichen oder Zitate, wo es sinnvoll ist.
      4. Halte den Tonfall professionell, hilfsbereit und verkaufsorientiert (Schweizer Kontext).
      `
    });

    logger.log('SEOContentAgent', `SEO Text-Abschnitt generiert: ${title}`, 'success');

    return NextResponse.json({ sectionContent: object.sectionMarkdown });
  } catch (error: any) {
    logger.log('SEOContentAgent', `Fehler bei SEO Text-Generierung`, 'error', error instanceof Error ? error.message : 'Unknown error');
    console.error('AI Write Section Error:', error);
    return NextResponse.json({ error: error.message || 'Fehler beim Schreiben des Abschnitts' }, { status: 500 });
  }
}
