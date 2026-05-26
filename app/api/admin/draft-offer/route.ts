import { GoogleGenAI, Type, Schema } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { getLeadById, saveOffer } from "@/lib/data-service";
import crypto from "crypto";

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Professioneller Offertentitel" },
    introText: { type: Type.STRING, description: "Freundlicher, professioneller Einleitungstext auf Schweizer Hochdeutsch" },
    lineItems: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          description: { type: Type.STRING, description: "Beschreibung der Leistung (z.B. Parkett schleifen und ölen)" },
          quantity: { type: Type.NUMBER, description: "Menge" },
          unit: { type: Type.STRING, description: "Einheit (z.B. m2, pauschal, Std.)" },
          unitPrice: { type: Type.NUMBER, description: "Einzelpreis in CHF" },
          totalPrice: { type: Type.NUMBER, description: "Gesamtpreis für diese Position in CHF" }
        },
        required: ["description", "quantity", "unit", "unitPrice", "totalPrice"]
      }
    },
    assumptions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Liste von Annahmen (z.B. Zimmer müssen leergeräumt sein)"
    },
    exclusions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Liste von Ausschlüssen (z.B. Leistenmontage nicht inbegriffen)"
    },
    totalAmount: { type: Type.NUMBER, description: "Gesamtsumme in CHF" },
    isFixedPrice: { type: Type.BOOLEAN, description: "Ist es ein Festpreis oder eine Schätzung?" }
  },
  required: ["title", "introText", "lineItems", "assumptions", "exclusions", "totalAmount", "isFixedPrice"]
};

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }

    const { leadId } = await req.json();
    if (!leadId) {
      return NextResponse.json({ error: "leadId is required" }, { status: 400 });
    }

    const lead = await getLeadById(leadId);
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Sie sind ein professioneller Kalkulator für Parkett-Pflege.ch. 
Bitte erstellen Sie einen professionellen Offerten-Entwurf auf Basis der folgenden Lead-Daten und AI-Diagnose (falls vorhanden).
Sprache: Schweizer Hochdeutsch.
Tonalität: Premium, kompetent, höflich.

Lead-Daten:
Name: ${lead.customer.firstName} ${lead.customer.lastName}
Service: ${lead.serviceInfo.service}
Nachricht: ${lead.serviceInfo.message}

AI-Diagnose:
Schaden: ${lead.aiDiagnosis?.suspectedDamage || '-'}
Empfehlung: ${lead.aiDiagnosis?.recommendedService || '-'}
Preisrahmen: ${lead.aiDiagnosis?.priceRange || '-'}
Interne Info: ${lead.aiDiagnosis?.internalSummary || '-'}

Erstellen Sie sinnvolle Annahmen (assumptions) wie "Räume sind leergeräumt", und Ausschlüsse (exclusions). 
Geben Sie keine absoluten rechtlichen Garantien, es ist ein Entwurf. 
Die Ausgabe muss strikt dem JSON Schema entsprechen.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const resultData = JSON.parse(response.text || "{}");

    // Offerte zusammensetzen und speichern
    const offer = {
      id: crypto.randomUUID(),
      leadId: lead.id,
      status: "Entwurf" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customer: lead.customer,
      title: resultData.title || "Offerte für Parkettarbeiten",
      introText: resultData.introText || "",
      lineItems: (resultData.lineItems || []).map((item: any) => ({
        ...item,
        id: crypto.randomUUID()
      })),
      assumptions: resultData.assumptions || [],
      exclusions: resultData.exclusions || [],
      totalAmount: resultData.totalAmount || 0,
      isFixedPrice: resultData.isFixedPrice || false,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 Tage gültig
    };

    await saveOffer(offer);

    return NextResponse.json({ success: true, offerId: offer.id, offer });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || "Fehler bei der Offerten-Erstellung" }, { status: 500 });
  }
}
