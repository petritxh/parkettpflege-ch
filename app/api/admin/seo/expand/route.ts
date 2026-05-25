import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const { title, currentContent } = await req.json();

    const { object } = await generateObject({
      model: google('gemini-2.5-pro'),
      schema: z.object({
        expandedMarkdown: z.string().describe("The expanded markdown content including the old content and new highly optimized SEO sections. Do NOT wrap in ```markdown.")
      }),
      prompt: `
      Du bist ein SEO-Experte.
      Der Nutzer hat eine Landingpage zum Thema: "${title}".
      
      Hier ist der bisherige Inhalt im Markdown-Format:
      ---
      ${currentContent}
      ---
      
      Aufgabe: 
      Erweitere diesen Text sinnvoll um 1-2 ausführliche neue Abschnitte mit H2 und H3 Überschriften. 
      Der Content muss massiv aufwerten und detaillierte fachliche Informationen enthalten, ohne medizinische Garantien zu geben.
      Integriere die neuen Abschnitte organisch in den bisherigen Text oder hänge sie unten an (bevor FAQs kommen).
      Gib den GESAMTEN Markdown-Text (inkl. dem alten) zurück. Behalte die bestehende Formatierung bei.
      `
    });

    return NextResponse.json({ expandedContent: object.expandedMarkdown });
  } catch (error: any) {
    console.error('AI Expand Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
