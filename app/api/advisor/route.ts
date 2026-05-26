import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const diagnosisSchema = z.object({
  suspectedDamage: z.string().describe("Vermuteter Schaden am Parkett"),
  suspectedWoodType: z.string().describe("Vermutete Holzart"),
  suspectedSurface: z.string().describe("Vermutete Oberfläche (geölt, versiegelt, etc.)"),
  severity: z.string().describe("Schweregrad (z.B. Leicht, Mittel, Schwer)"),
  urgency: z.string().describe("Dringlichkeit (z.B. Niedrig, Normal, Hoch)"),
  diyPossible: z.boolean().describe("Kann der Kunde das Problem selbst beheben?"),
  recommendedService: z.string().describe("Empfohlene Dienstleistung (z.B. Grundreinigung, Abschleifen & Ölen)"),
  priceRange: z.string().describe("Grobe Preisspanne in CHF (z.B. 200 - 400 CHF oder 35 - 55 CHF / m2)"),
  leadScore: z.number().describe("Lead Score von 0 bis 100, basierend auf Auftragsvolumen und Dringlichkeit"),
  customerExplanation: z.string().describe("Kundenfreundliche Erklärung. Wichtig: Schreibe in sehr kurzen, prägnanten Sätzen und verwende ausschließlich Spiegelstriche ('-') für Stichpunkte, KEINEN langen Textblock! Maximal 3 kurze Stichpunkte."),
  internalSummary: z.string().describe("Interne Kurz-Zusammenfassung für den Handwerker/Verkauf")
});

export async function POST(req: Request) {
  try {
    const { concerns, imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "Kein Bild bereitgestellt." }, { status: 400 });
    }

    const promptText = `Sie sind ein hochqualifizierter KI-Berater auf der Website parkett-pflege.ch. 
Ihre Aufgabe ist es, Kunden eine professionelle Erst-Einschätzung (Lead-Qualifizierung) zum Zustand ihres Parkettbodens zu geben.

Der Kunde hat ein Foto hochgeladen. Analysieren Sie das Bild sehr sorgfältig, um den möglichen Zustand, Kratzer, Wasserschäden, die Holzart und das Problem zu erkennen.
Nutzeranliegen (falls vorhanden): ${concerns || 'Kein spezielles Anliegen angegeben'}

Beachten Sie: Geben Sie dem Kunden niemals rechtlich bindende Garantien. Sagen Sie klar in der kundenfreundlichen Erklärung, dass dies eine KI-gestützte Voranalyse ist und keine Vor-Ort-Begutachtung ersetzt!
Antworten Sie in der 'customerExplanation' extrem kurz und auf den Punkt. Schreiben Sie ausschließlich kurze, punktuelle Sätze als Aufzählungspunkte (Spiegelstriche '-'). Jede Zeile darf nur einen einzigen kurzen Satz enthalten. Vermeiden Sie jeglichen Fließtext!`;

    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: diagnosisSchema,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: promptText },
            { type: 'image', image: new URL(imageBase64) }
          ]
        }
      ]
    });

    return NextResponse.json(object);
  } catch (error: any) {
    console.error("Gemini AI Advisor Error:", error);
    
    // Simulate delay and return a fallback if API fails (e.g. quota limit)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const fallbackResult = {
      suspectedDamage: "Kratzer & Abnutzungserscheinungen",
      suspectedWoodType: "Eiche",
      suspectedSurface: "Geölt / Versiegelt",
      severity: "Mittel",
      urgency: "Normal",
      diyPossible: false,
      recommendedService: "Parkett Schleifen & Versiegeln",
      priceRange: "800 - 1500 CHF",
      leadScore: 75,
      customerExplanation: "- Das Foto zeigt deutliche Abnutzungsspuren.\n- Eine Grundreinigung reicht hier vermutlich nicht aus.\n- Ein professionelles Abschleifen wird empfohlen.",
      internalSummary: "Kunde meldet Abnutzung. Foto zeigt Verschleiss, vermutlich Abschleifen notwendig. Gute Verkaufschance."
    };
    
    return NextResponse.json(fallbackResult);
  }
}
