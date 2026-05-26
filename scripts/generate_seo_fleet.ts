import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

// Native env loader
const envLocalPath = path.join(process.cwd(), '.env.local');
const envPath = path.join(process.cwd(), '.env');
const loadEnv = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    const envContent = fs.readFileSync(filePath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join('=').trim();
      }
    });
  }
};
loadEnv(envLocalPath);
loadEnv(envPath);

// Make sure GOOGLE_GENERATIVE_AI_API_KEY is mapped from GEMINI_API_KEY if needed
if (process.env.GEMINI_API_KEY && !process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  process.env.GOOGLE_GENERATIVE_AI_API_KEY = process.env.GEMINI_API_KEY;
}

// SEO Long-Tail & Problem Keywords for the Swiss Market
const keywords = [
  "Parkettboden knarrt beheben",
  "Dunkle Wasserflecken auf Eichenparkett",
  "Hundekratzer aus Parkett entfernen",
  "Parkett richtig reinigen ohne Streifen",
  "Brandfleck auf Parkett reparieren",
  "Parkettfugen füllen und ausbessern",
  "Katzenurin aus Parkett entfernen",
  "Geöltes Parkett nachölen Anleitung",
  "Versiegeltes Parkett reparieren",
  "Dellen im Parkett ausbessern",
  "Parkettboden verliert Glanz",
  "Sonneneinstrahlung Parkett ausgeblichen",
  "Parkett quietscht beim Darüberlaufen",
  "Rotweinfleck auf Parkett entfernen",
  "Parkett auf Fussbodenheizung Risse",
  "Parkettkleber Reste entfernen",
  "Bohrlöcher im Parkett füllen",
  "Wachs auf Parkett entfernen",
  "Parkettboden im Bad pflegen",
  "Schwarze Streifen von Schuhen auf Parkett",
  "Parkett schleifen wie oft möglich",
  "Parkettboden wölbt sich auf",
  "Schimmel auf Parkettboden",
  "Parkettboden richtig wischen",
  "Haarrisse im Parkett reparieren",
  "Stumpfes Parkett wieder zum Glänzen bringen",
  "Bürostuhl Kratzer im Parkett",
  "Fettfleck auf geöltem Parkett",
  "Parkettboden riecht muffig",
  "Parkett reparieren statt austauschen"
];

const PROBLEMS_FILE = path.join(process.cwd(), 'data', 'problems.json');
const FAQS_FILE = path.join(process.cwd(), 'data', 'faqs.json');

const seoArticleSchema = z.object({
  h1: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  intro: z.string(),
  solutionText: z.string(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string()
  }))
});

async function main() {
  console.log(`🚀 Starte SEO Content Engine für ${keywords.length} Artikel...`);

  let problemsData = [];
  let faqsData = [];
  
  if (fs.existsSync(PROBLEMS_FILE)) {
    problemsData = JSON.parse(fs.readFileSync(PROBLEMS_FILE, 'utf-8'));
  }
  if (fs.existsSync(FAQS_FILE)) {
    faqsData = JSON.parse(fs.readFileSync(FAQS_FILE, 'utf-8'));
  }

  for (const keyword of keywords) {
    const slug = keyword.toLowerCase().replace(/[^a-z0-9äöü]+/g, '-').replace(/(^-|-$)/g, '');
    
    if (problemsData.some((p: any) => p.slug === slug)) {
      console.log(`⏩ Überspringe "${keyword}" (existiert bereits)`);
      continue;
    }

    console.log(`\n⏳ Generiere Artikel für: "${keyword}"...`);
    
    let success = false;
    let attempts = 5;
    let object: any = null;

    while (attempts > 0 && !success) {
      try {
        const result = await generateObject({
          model: google('gemini-2.5-flash'), // Use modern available model
          schema: seoArticleSchema,
          maxRetries: 0,
          prompt: `Du bist ein absoluter SEO-Spezialist und Meister im Schweizer Parkettleger-Handwerk mit über 20 Jahren Erfahrung.
Dein Ziel ist es, den ultimativen, hilfreichsten und tiefgreifendsten Ratgeber-Artikel zum Thema "${keyword}" zu schreiben.

Vorgaben:
1. metaTitle: Max 60 Zeichen. Keyword ganz vorne.
2. metaDescription: 130-150 Zeichen. Klarer Mehrwert und Call-To-Action (z.B. "Jetzt Tipps vom Profi lesen").
3. h1: Die Hauptüberschrift (kreativ, fesselnd und enthält das Keyword).
4. intro: Max 3 Sätze Zusammenfassung, die den Leser sofort hookt.
5. solutionText: 
   - Das ist der Hauptteil im PERFEKTEN Markdown Format. Er muss extrem detailliert und interessant sein.
   - Nutze exakt 4x H2 (##) und 3x H3 (###).
   - Länge: sehr tiefgreifendes Fachwissen (mind. 600-800 Wörter).
   - Erkläre die chemischen/physikalischen Ursachen, Schritt-für-Schritt DIY-Lösungen, Experten-Hacks und wann man zwingend einen Profi rufen muss.
   - Nutze Aufzählungen, fette Wörter und Zitate/Warnhinweise (z.B. "> Achtung: ...").
   - WICHTIG: Erwähne im Text natürlich die Begriffe "Parkett ölen", "Parkett schleifen", "Parkett versiegeln" und "Parkett Reparatur", damit diese von unserem SEO-Linker später erkannt und verlinkt werden können.
6. faqs: Erstelle exakt 3 häufige, sehr spezifische Fragen und ausführliche Antworten zu diesem Thema.
`,
        });

        object = result.object;
        success = true;
      } catch (error: any) {
        attempts--;
        const isQuotaOrDemand = error.message?.includes('quota') || 
                               error.message?.includes('429') || 
                               error.message?.includes('demand') || 
                               error.message?.includes('503') ||
                               error.message?.includes('UNAVAILABLE') ||
                               error.message?.includes('RESOURCE_EXHAUSTED');
        
        console.error(`⚠️ Fehler bei "${keyword}" (Versuche übrig: ${attempts}):`, error.message || error);
        
        if (attempts > 0 && isQuotaOrDemand) {
          // Parse retry delay from error message if possible
          let waitTimeMs = 65000; // Default to 65 seconds to clear standard 1-minute quota windows
          const match = error.message?.match(/Please retry in ([\d\.]+)s/);
          if (match && match[1]) {
            const seconds = parseFloat(match[1]);
            waitTimeMs = Math.ceil(seconds + 5) * 1000;
          }
          console.log(`⏳ Rate-Limit oder Überlastung erkannt. Warte ${Math.round(waitTimeMs / 1000)} Sekunden vor dem nächsten Versuch...`);
          await new Promise(r => setTimeout(r, waitTimeMs));
        } else if (attempts === 0) {
          console.error(`❌ Artikel für "${keyword}" konnte nach 5 Versuchen nicht generiert werden.`);
        } else {
          // Other error, sleep 5 seconds and retry
          console.log(`⏳ Unerwarteter Fehler. Warte 5 Sekunden vor dem nächsten Versuch...`);
          await new Promise(r => setTimeout(r, 5000));
        }
      }
    }

    if (success && object) {
      // Generate AI Image via Pollinations
      const cleanPrompt = keyword.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 30);
      const filename = `seo_${Date.now()}_${cleanPrompt}.jpg`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      
      const aiPrompt = `beautiful clean elegant modern hardwood parquet floor, ${keyword}, ultra realistic, professional interior design architecture photography, high resolution, 8k, warm lighting, cozy elegant atmosphere`;
      const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(aiPrompt)}?width=1200&height=800&nologo=true&seed=${Math.floor(Math.random() * 100000)}`;
      
      let finalImageUrl = "https://images.unsplash.com/photo-1581850518616-bcb8077a2336?q=80&w=1200&auto=format&fit=crop";
      try {
        const imgRes = await fetch(imgUrl);
        const buffer = await imgRes.arrayBuffer();
        fs.writeFileSync(path.join(uploadDir, filename), Buffer.from(buffer));
        finalImageUrl = `/uploads/${filename}`;
        console.log(`📸 Bild erfolgreich generiert: ${filename}`);
      } catch (e) {
        console.error("⚠️ Bildgenerierung fehlgeschlagen, nutze Fallback.", e);
      }

      const newProblem = {
        id: slug,
        slug: slug,
        h1: object.h1,
        metaTitle: object.metaTitle,
        metaDescription: object.metaDescription,
        focusKeyword: keyword,
        intro: object.intro,
        imageUrl: finalImageUrl,
        solutionText: object.solutionText,
        relatedServices: ["parkett-schleifen", "parkett-oelen", "parkett-reparatur"]
      };

      problemsData.push(newProblem);

      object.faqs.forEach((faq: any) => {
        faqsData.push({
          id: `faq-${slug}-${Math.random().toString(36).substr(2, 9)}`,
          question: faq.question,
          answer: faq.answer,
          targetType: "problem",
          targetSlug: slug
        });
      });

      fs.writeFileSync(PROBLEMS_FILE, JSON.stringify(problemsData, null, 2));
      fs.writeFileSync(FAQS_FILE, JSON.stringify(faqsData, null, 2));

      console.log(`✅ Erfolgreich generiert und gespeichert: ${slug}`);
      
      // Sleep for 30 seconds to prevent hitting RPM/quota limit
      await new Promise(r => setTimeout(r, 30000));
    }
  }

  console.log(`\n🎉 Alle Artikel wurden verarbeitet!`);
}

main();

