# Parkettpflege.ch - Architektur & SEO-Maschine

Dieses Projekt ist eine hochmoderne, auf Next.js 15 basierende Web-Applikation, die als stark automatisierte **Lead-Generierungs-, CRM- und SEO-Maschine** für Parkettpflege-Dienstleistungen in der Schweiz fungiert.

Das Projekt hat den MVP-Status weit hinter sich gelassen. Es ist nun eine datenbankgestützte Plattform mit integriertem Admin-CMS, ausgeklügelten KI-Funktionen (inkl. Multimodal-Fotoanalyse) und einem tief integrierten SEO-Fundament.

---

## 🎯 1. Der Business-Funnel (Die Vision)

Das System ist darauf ausgelegt, aus kalten Besuchern hochqualifizierte Leads und schliesslich zahlende Kunden zu machen. Der programmierte Funnel sieht wie folgt aus:

1. **Google / Ads / Social** → Nutzer sucht nach Parkett-Problemen (z.B. "Kratzer entfernen").
2. **Landingpage Problemseite / Dienstleistung** → Suchmaschinenoptimierte Seiten (SEO) fangen den Nutzer ab.
3. **Vorher-Nachher-Beweis** → Dynamische Fallstudien (Case Studies) bauen Vertrauen auf.
4. **KI-Parkettcheck mit Foto / Chatbot** → Ein intelligentes Chat-Widget oder Modul erlaubt es dem Kunden, ein Foto seines Bodens hochzuladen.
5. **Preisrange + Empfehlung** → Die KI analysiert das Bild und gibt sofort eine realistische Einschätzung.
6. **Kontaktformular** → Der Nutzer hinterlässt seine Kontaktdaten für den empfohlenen Service.
7. **Lead im CRM** → Daten landen strukturiert im Admin-Dashboard (`/admin/leads`).
8. **Automatische Bestätigung** → (Geplant: SMS/E-Mail Follow-ups via API).
9. **Admin-Nachfassung & KI-Offerte** → Der Admin prüft den Lead und kann per Knopfdruck eine KI-basierte Offerte (`/admin/offers`) generieren.
10. **Auftrag / Partnervermittlung** → Abschluss des Geschäfts.

---

## 🏗 2. Frontend-Architektur & SEO-Engine

Das gesamte Frontend ist darauf getrimmt, für Google als extrem wertvolle Ressource zu erscheinen. Jeder Inhaltstyp folgt strengen SEO-Faktoren:

### A. Seiten-Struktur (Themen-Silos)
1. **Dienstleistungen (`/[service]`):** Kernseiten (z.B. Parkett ölen). Hohes Suchvolumen, starke Conversion-Optimierung.
2. **Probleme & Ratgeber (`/probleme/[problem]`):** Long-Tail-Keywords. Fangen Informationssucher ein und leiten sie zur Buchung weiter. Beinhaltet dynamische Inhaltsverzeichnisse (TOC) und Markdown-Renderings.
3. **Standorte (`/standorte/[location]`):** Lokales SEO (Local SEO). Spezifische Landingpages für jede Schweizer Stadt (z.B. "Parkett schleifen Zürich"). 

### B. SEO-Pflichtfelder pro Seite (Admin-überwacht)
Jede dynamische Seite muss folgende Faktoren erfüllen:
- **Meta Title:** 40-60 Zeichen, Keyword-Fokus.
- **Meta Description:** 130-160 Zeichen, Call-to-Action.
- **H1 / H2 / H3 Hierarchie:** Eindeutige und saubere semantische Gliederung.
- **Content Tiefe:** Automatisierter Word-Count Check im CMS.
- **JSON-LD Schema:** Strukturierte Daten für Google (z.B. integrierte FAQs für Rich Snippets).

### C. Dynamische Auto-Verlinkung (`lib/seo-linker.ts`)
Das System verfügt über einen automatischen SEO-Linker. Dieser durchsucht Markdown-Texte im Backend nach Fokus-Keywords anderer Seiten (z.B. "versiegeln") und wandelt diese automatisch in interne HTML-Links um. Dies stärkt den Topic Cluster massiv.

---

## 🤖 3. Künstliche Intelligenz (AI-Integration)

Wir setzen das **Vercel AI SDK** in Kombination mit **Google Gemini 1.5 Flash** ein, um komplexe Business-Logik zu automatisieren.

### Der Globale KI-Chatbot (`/api/chat`)
- Auf der gesamten Webseite läuft ein schwebender Chatbot (Glassmorphism-UI).
- Er besitzt eine spezifische Persona ("Parkett-Guru").
- **Tool Calling:** Der Bot kann autonom Werkzeuge nutzen:
  - `searchWebsiteData`: Er durchsucht das JSON-CMS nach Preisen und Services, wenn Kunden Fragen stellen.
  - `analyzePhoto`: Kunden können im Chat ein Bild hochladen. Der Bot nutzt die multimodalen Fähigkeiten von Gemini, analysiert den Schaden und gibt Empfehlungen.
  - `createLead`: Sobald der Kunde überzeugt ist, verlangt der Bot Kontaktdaten und speist diese vollautomatisch als neuen Lead ins CRM ein.

---

## 🏢 4. Admin-Dashboard & CRM (`/admin`)

Das Admin-Portal ist das Herzstück des Betriebs. Es dient nicht nur der Content-Pflege, sondern auch der Lead-Qualifizierung.

- **SEO-Dashboard (`/admin/seo`):** Listet alle Seiten auf, prüft in Echtzeit die SEO-Stärke (Ampelsystem) und erlaubt das direkte Bearbeiten von Texten.
- **KI-Content-Expander:** Im SEO-Editor kann per Knopfdruck bestehender Content gezielt und suchmaschinenoptimiert von der KI erweitert werden (z.B. "Füge einen Absatz über Vorteile hinzu").
- **Lead-Management (`/admin/leads`):** Übersicht aller Kundenanfragen. Jeder Lead hat eine eigene Akte.
- **KI-Diagnosen & Scanner (`/admin/diagnostics`):** 
  - Analytics-Übersicht (Top-Schäden, Ø Lead Score).
  - Listet alle von Kunden hochgeladenen Fotos samt KI-Schadensbewertung auf.
  - **Manueller Scanner:** Admins können selbst Fotos (z.B. aus WhatsApp) hochladen. Die KI analysiert den Schaden, errechnet einen Preisrahmen und bewertet, ob der Kunde es per "DIY" selbst reparieren kann oder ein Profi nötig ist.
- **Offerten-Generator (`/admin/offers`):** Wandelt qualifizierte Leads per KI in strukturierte HTML-Angebote um, die als PDF gedruckt oder per Link verschickt werden können.

---

## 🛠 5. Technischer Stack & Datenhaltung

- **Framework:** Next.js 15.5 (App Router) für Server-Side Rendering (SSR) & Statische Generierung (SSG).
- **Styling:** Tailwind CSS v4 für Utility-First Design.
- **Icons:** `lucide-react`.
- **Datenbank:** JSON-basierte Flat-Files (`data/*.json`). Dies dient aktuell als extrem schnelle, versionskontrollierte (Git) Datenbank. Sämtliche Lese- und Schreibzugriffe werden durch `lib/data-service.ts` abstrahiert, sodass später jederzeit auf PostgreSQL/Prisma gewechselt werden kann.
- **Markdown:** `react-markdown` für Blog- und Ratgeber-Texte.

---

## 💻 6. Entwickler-Befehle

**Abhängigkeiten installieren:**
\`\`\`bash
npm install
\`\`\`

**Entwicklung starten:**
\`\`\`bash
npm run dev
\`\`\`
*(Das System läuft dann unter `http://localhost:3000`)*

**Produktions-Build (SSG-Seiten werden hier vorgerendert!):**
\`\`\`bash
npm run build
npm start
\`\`\`

**Umgebungsvariablen:**
Eine `.env.local` Datei ist zwingend erforderlich:
\`\`\`env
GOOGLE_GENERATIVE_AI_API_KEY=dein_gemini_api_key
\`\`\`
