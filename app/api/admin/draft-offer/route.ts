import { NextRequest, NextResponse } from "next/server";
import { getLeadById, saveOffer } from "@/lib/data-service";
import { logger } from "@/lib/logger";
import crypto from "crypto";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const responseSchema = z.object({
  title: z.string().describe("Professioneller Offertentitel"),
  introText: z.string().describe("Freundlicher, professioneller Einleitungstext auf Schweizer Hochdeutsch"),
  lineItems: z.array(z.object({
    description: z.string().describe("Beschreibung der Leistung (z.B. Parkett schleifen und ölen)"),
    quantity: z.number().describe("Menge"),
    unit: z.string().describe("Einheit (z.B. m2, pauschal, Std.)"),
    unitPrice: z.number().describe("Einzelpreis in CHF"),
    totalPrice: z.number().describe("Gesamtpreis für diese Position in CHF")
  })),
  assumptions: z.array(z.string()).describe("Liste von Annahmen (z.B. Zimmer müssen leergeräumt sein)"),
  exclusions: z.array(z.string()).describe("Liste von Ausschlüssen (z.B. Leistenmontage nicht inbegriffen)"),
  totalAmount: z.number().describe("Gesamtsumme in CHF"),
  isFixedPrice: z.boolean().describe("Ist es ein Festpreis oder eine Schätzung?")
});

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

    logger.log('OfferDraftAgent', `Starte Offertengenerierung für ${lead.customer.firstName} ${lead.customer.lastName}`, 'running');

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
Geben Sie keine absoluten rechtlichen Garantien, es ist ein Entwurf.`;

    const { object: resultData } = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: responseSchema,
      prompt: prompt
    });

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

    logger.log('OfferDraftAgent', `Offerte für ${lead.customer.firstName} ${lead.customer.lastName} erfolgreich generiert`, 'success', `Total: CHF ${offer.totalAmount.toFixed(2)}`);

    return NextResponse.json({ success: true, offerId: offer.id, offer });
  } catch (error: any) {
    logger.log('OfferDraftAgent', `Fehler bei Offertengenerierung`, 'error', error instanceof Error ? error.message : 'Unknown error');
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || "Fehler bei der Offerten-Erstellung" }, { status: 500 });
  }
}
