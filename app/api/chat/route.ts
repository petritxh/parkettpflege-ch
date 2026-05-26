// @ts-nocheck
import { streamText, tool } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { getCMSData } from '@/lib/data-service';
import fs from 'fs';
import path from 'path';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, data } = await req.json();

    // If an image was provided via custom data in useChat
    const initialMessages = messages;
    
    // Inject image into the last user message if provided in data
    if (data && data.imageUrl) {
      const lastMessage = initialMessages[initialMessages.length - 1];
      if (lastMessage && lastMessage.role === 'user') {
        // Convert to multimodal format expected by Vercel AI SDK
        // If it's a base64 Data URL, we extract the MIME type and the raw base64 data to create a Buffer
        if (typeof data.imageUrl === 'string' && data.imageUrl.startsWith('data:')) {
          const match = data.imageUrl.match(/^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/);
          if (match) {
            const mimeType = match[1];
            const base64Data = match[2];
            const buffer = Buffer.from(base64Data, 'base64');
            
            lastMessage.content = [
              { type: 'text', text: lastMessage.content || 'Hier ist ein Foto meines Parketts.' },
              { type: 'image', image: buffer, mimeType: mimeType }
            ];
          }
        } else {
          lastMessage.content = [
            { type: 'text', text: lastMessage.content || 'Hier ist ein Foto meines Parketts.' },
            { type: 'image', image: new URL(data.imageUrl) }
          ];
        }
      }
    }

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      system: `Du bist der "Parkett-Meister", der offizielle KI-Assistent von Parkett-Pflege.ch. 
Du hilfst Schweizer Kunden bei Problemen mit ihrem Parkettboden.
Du bist höflich, hochprofessionell und verkaufsorientiert.
Dein Ziel ist es, Kunden zu beraten, Fotos ihrer Schäden zu analysieren und sie dazu zu bringen, eine Offerte anzufordern.
Wenn der Kunde eine Offerte will oder du ihn überzeugt hast, frage nach Name, E-Mail und Telefonnummer und nutze das Tool 'createLead', um die Offerte im System einzutragen!
Wenn du spezifische Infos zu Services oder Preisen brauchst, nutze 'searchWebsiteData'.
Wenn der Kunde ein Bild mitschickt, nutze 'analyzePhoto' um es professionell auszuwerten.`,
      messages: initialMessages,
      tools: {
        searchWebsiteData: tool({
          description: 'Durchsuche die Webseite nach Dienstleistungen, Preisen und häufigen Problemen.',
          parameters: z.object({
            topic: z.string().describe('Das Thema nach dem gesucht werden soll (z.B. "Schleifen", "Wasserschaden").')
          }),
          // @ts-ignore
          execute: async ({ topic }) => {
            // Mocking a search over CMS data
            const services = await getCMSData('services');
            const problems = await getCMSData('problems');
            
            const relevantServices = services.filter((s:any) => s.title.toLowerCase().includes(topic.toLowerCase()) || s.shortDescription.toLowerCase().includes(topic.toLowerCase()));
            const relevantProblems = problems.filter((p:any) => p.title.toLowerCase().includes(topic.toLowerCase()));
            
            return {
              services: relevantServices.map((s:any) => ({ title: s.title, description: s.shortDescription })),
              problems: relevantProblems.map((p:any) => ({ title: p.title }))
            };
          },
        }),
        analyzePhoto: tool({
          description: 'Analysiert das vom Kunden gesendete Foto eines Parkettschadens.',
          parameters: z.object({
            observation: z.string().describe('Was siehst du auf dem Bild? Bitte detailliert beschreiben.')
          }),
          // @ts-ignore
          execute: async ({ observation }) => {
            // Da das Bild bereits an das Model gesendet wird, dient dieses Tool dazu, 
            // dass das Model seine "Beobachtungen" strukturiert in den Chat-Verlauf schreibt.
            return {
              diagnosis: "Schaden analysiert",
              recommendation: "Basierend auf dem Bild scheint eine partielle Reparatur oder ein kompletter Abschliff nötig zu sein.",
              internalNote: observation
            };
          },
        }),
        createLead: tool({
          description: 'Legt einen neuen Lead/Offerten-Anfrage im CRM System an.',
          parameters: z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            phone: z.string(),
            message: z.string().describe('Zusammenfassung des Kundenproblems oder Wunsch'),
            service: z.string().describe('Der empfohlene oder gewünschte Service')
          }),
          // @ts-ignore
          execute: async (leadData) => {
            const dataDir = path.join(process.cwd(), 'data');
            const leadsFile = path.join(dataDir, 'leads.json');
            
            let leads = [];
            if (fs.existsSync(leadsFile)) {
              leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
            }
            
            const newLead = {
              id: 'chat-lead-' + Math.random().toString(36).substr(2, 9),
              timestamp: new Date().toISOString(),
              status: 'Neu',
              funnelSource: 'KI-Chatbot',
              customer: {
                firstName: leadData.firstName,
                lastName: leadData.lastName,
                email: leadData.email,
                phone: leadData.phone
              },
              serviceInfo: {
                service: leadData.service,
                message: leadData.message,
                preferredDate: 'So schnell wie möglich'
              },
              leadScore: 80,
              priority: 'Hoch'
            };
            
            leads.unshift(newLead);
            fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
            
            return { success: true, message: 'Lead erfolgreich im CRM gespeichert. Du kannst dem Kunden nun bestätigen, dass wir uns umgehend melden.' };
          },
        })
      }
    });

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(
        'Konfigurationsfehler: Der GOOGLE_GENERATIVE_AI_API_KEY fehlt in den Vercel-Umgebungsvariablen. Bitte füge diesen im Vercel-Dashboard unter Settings -> Environment Variables hinzu, um den Chatbot zu aktivieren.',
        { status: 200 }
      );
    }

    return result.toDataStreamResponse();

  } catch (error: any) {
    console.error('Chat API Error:', error);
    
    // Return a mock response if Google API fails due to quota
    if (error.message?.includes('Quota') || error.message?.includes('429')) {
       return new Response(
         'Es tut mir leid, aber mein KI-Gehirn (Google Gemini) macht gerade eine kleine Pause wegen zu vieler Anfragen. Bitte versuche es in ein paar Minuten noch einmal, oder nutze unser Kontaktformular!',
         { status: 503 }
       );
    }

    if (error.message?.includes('API key') || error.message?.includes('credentials')) {
       return new Response(
         'Konfigurationsfehler: Der GOOGLE_GENERATIVE_AI_API_KEY ist ungültig oder nicht konfiguriert. Bitte überprüfe deine Umgebungsvariablen in Vercel.',
         { status: 200 }
       );
    }

    return new Response('Interner Server Fehler: ' + error.message, { status: 500 });
  }
}
