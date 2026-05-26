import { GoogleGenAI, Type, Schema } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    suspectedDamage: { type: Type.STRING, description: "Vermuteter Schaden am Parkett" },
    suspectedWoodType: { type: Type.STRING, description: "Vermutete Holzart" },
    suspectedSurface: { type: Type.STRING, description: "Vermutete Oberfläche (geölt, versiegelt, etc.)" },
    severity: { type: Type.STRING, description: "Schweregrad (z.B. Leicht, Mittel, Schwer)" },
    urgency: { type: Type.STRING, description: "Dringlichkeit (z.B. Niedrig, Normal, Hoch)" },
    diyPossible: { type: Type.BOOLEAN, description: "Kann der Kunde das Problem selbst beheben?" },
    recommendedService: { type: Type.STRING, description: "Empfohlene Dienstleistung (z.B. Grundreinigung, Abschleifen & Ölen)" },
    priceRange: { type: Type.STRING, description: "Grobe Preisspanne in CHF (z.B. 200 - 400 CHF oder 35 - 55 CHF / m2)" },
    leadScore: { type: Type.INTEGER, description: "Lead Score von 0 bis 100, basierend auf Auftragsvolumen und Dringlichkeit" },
    customerExplanation: { type: Type.STRING, description: "Kundenfreundliche Erklärung. Wichtig: Schreibe in sehr kurzen, prägnanten Sätzen und verwende ausschließlich Spiegelstriche ('-') für Stichpunkte, KEINEN langen Textblock! Maximal 3 kurze Stichpunkte." },
    internalSummary: { type: Type.STRING, description: "Interne Kurz-Zusammenfassung für den Handwerker/Verkauf" }
  },
  required: [
    "suspectedDamage",
    "suspectedWoodType",
    "suspectedSurface",
    "severity",
    "urgency",
    "diyPossible",
    "recommendedService",
    "priceRange",
    "leadScore",
    "customerExplanation",
    "internalSummary"
  ]
};

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Konfigurationsfehler: Der GEMINI_API_KEY fehlt in den Vercel-Umgebungsvariablen. Bitte füge ihn in den Vercel-Projekteinstellungen hinzu." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const { concerns, imageBase64 } = await req.json();

    let prompt = `Sie sind ein hochqualifizierter KI-Berater auf der Website parkett-pflege.ch. 
Ihre Aufgabe ist es, Kunden eine professionelle Erst-Einschätzung (Lead-Qualifizierung) zum Zustand ihres Parkettbodens zu geben.

Der Kunde hat ein Foto hochgeladen. Analysieren Sie das Bild sehr sorgfältig, um den möglichen Zustand, Kratzer, Wasserschäden, die Holzart und das Problem zu erkennen.
Nutzeranliegen (falls vorhanden): ${concerns || 'Kein spezielles Anliegen angegeben'}

Geben Sie eine strukturierte JSON-Antwort zurück. 
Beachten Sie: Geben Sie dem Kunden niemals rechtlich bindende Garantien. Sagen Sie klar in der kundenfreundlichen Erklärung, dass dies eine KI-gestützte Voranalyse ist und keine Vor-Ort-Begutachtung ersetzt!
Antworten Sie in der 'customerExplanation' extrem kurz und auf den Punkt. Schreiben Sie ausschließlich kurze, punktuelle Sätze als Aufzählungspunkte (Spiegelstriche '-'). Jede Zeile darf nur einen einzigen kurzen Satz enthalten. Vermeiden Sie jeglichen Fließtext!`;

    const contents: any[] = [prompt];

    if (imageBase64) {
      const base64Data = imageBase64.split(',')[1];
      const mimeType = imageBase64.split(';')[0].split(':')[1];
      
      contents.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      });
      
      prompt += "\n\nAnalysieren Sie das angehängte Bild genau.";
      contents[0] = prompt; 
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const resultData = JSON.parse(response.text || "{}");

    return NextResponse.json(resultData);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || "Fehler bei der Analyse" }, { status: 500 });
  }
}
