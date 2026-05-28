# Parkett-Pflege.ch – Vollständige Projekt- & System-Dokumentation

Willkommen zur ultimativen, allumfassenden technischen und strategischen Gesamtdokumentation der Parkett-Pflege.ch Plattform. Dieses Dokument listet **jede einzelne Seite, jeden Beitrag und jede Funktion** im Detail auf und dient als komplettes Nachschlagewerk für das gesamte Projekt.

---

## 1. 🌟 Projektübersicht & Mission

**Parkett-Pflege.ch** ist eine hochmoderne, ganzheitliche **PropTech/Handwerker-Plattform**. Sie vereint eine auf Konversion und SEO getrimmte öffentliche Webseite mit einem massgeschneiderten CRM-Backend für Handwerker.

**Die Kern-Innovation:** Durch den Einsatz von Künstlicher Intelligenz (Google Gemini Vision) automatisiert das System die Schadensdiagnose, schlägt Reparaturmassnahmen vor und erstellt innerhalb von Sekunden fertige Offerten. Kunden können diese in einem hochmodernen, interaktiven HTML-Portal ansehen, kommentieren und verbindlich annehmen, woraufhin das System automatisch E-Mails versendet und Kalendereinträge erstellt.

---

## 2. 🏗 Exakte Seitenhierarchie & Alle Unterseiten

Hier ist die **vollständige, unverkürzte Liste** aller Seiten, die in diesem Projekt existieren.

### 🟢 A. Allgemeine Frontend-Seiten (Public)
* **`/` (Startseite)**
  - Hero-Sektion mit KI-Scan-Eingang
  - Vertrauenssignale (Swiss Parkett Verband, FSC® Zertifiziert, Meisterbetrieb, Bau-Garantie)
  - Leistungs-Teaser (3 ausgewählte Services)
  - Galerie-Vorschau (Vorher/Nachher Slider)
  - Interaktiver Parkett-Ratgeber (direkt eingebunden)
  - Kundenstimmen-Karussell (Bewertungen)
  - FAQ-Akkordeon und Kostenrechner-Sektion.
* **`/vorher-nachher` (Galerie)**
  - Visuelle Beweisführung mit filterbaren Case-Studies (Nach Holzart, Service-Typ etc.).
* **`/kosten` (Kostenrechner)**
  - Ein Schieberegler-Tool für schnelle m²-Schätzungen (z.B. 20m² Parkett schleifen = 700 CHF).
* **`/kontakt`**
  - Klassisches Kontaktformular mit Adressdaten und Maps-Integration.
* **`/shop` & `/shop/[id]`**
  - Komplettes E-Commerce-Gerüst mit Such- und Filterfunktion.
  - Warenkorb-Logik (`CartDrawer`), `CartProvider`.
  - **Eingetragene Produkte:**
    - WOCA Holzbodenseife Natur
    - WOCA Holzbodenseife Weiss
    - WOCA Intensivreiniger
    - WOCA Pflegeöl Natur
    - WOCA Pflegeöl Weiss
    - WOCA Gerbsäure-Fleckenspray
* **`/ratgeber`**
  - Der interaktive Parkett-Ratgeber (Fragebaum) und Übersicht über alle Wissens-Artikel.
* **`/ki-parkettcheck`**
  - Dedizierte Landingpage für den KI-Foto-Scan.
* **`/offerte/[id]` (Interaktives Kunden-Portal für Offerten)**
  - **PIN-Sperrbildschirm:** Schützt die personalisierten Daten.
  - **Offerten-Ansicht:** Zeigt Intro, Positionen, Total, Inklusive/Exklusive.
  - **Interaktions-Bar:** "Frage stellen", "Ablehnen", "Kostenpflichtig buchen".
  - **Erfolgs-Screen:** Konfetti-Animation und automatische Weiterleitung zum Ratgeber (nach 5 Sek.).

### 🔵 B. Dienstleistungs-Seiten (`/dienstleistungen/[slug]`)
Jede dieser Seiten ist eine vollwertige, SEO-optimierte Landingpage, die den spezifischen Service im Detail erklärt.
1. `/dienstleistungen/parkettpflege` (Allgemeine Parkettpflege)
2. `/dienstleistungen/parkettreinigung` (Intensive Parkettreinigung)
3. `/dienstleistungen/parkett-schleifen` (Parkett schleifen & renovieren)
4. `/dienstleistungen/parkett-oelen` (Parkett ölen)
5. `/dienstleistungen/parkett-versiegeln` (Parkett versiegeln / lackieren)
6. `/dienstleistungen/parkett-reparatur` (Lokale Parkettreparatur)

### 🟠 C. Problem- & "Pain-Point" SEO-Seiten (`/probleme/[slug]`)
Diese Seiten fangen exakt die Google-Suchanfragen der Nutzer ab. Jede Seite bietet Soforthilfe-Tipps und leitet den Nutzer zum KI-Scan oder Kontaktformular weiter.
1. `/probleme/kratzer-im-parkett`
2. `/probleme/wasserflecken-parkett`
3. `/probleme/parkettpflege-kosten`
4. `/probleme/parkett-knarrt-beheben`
5. `/probleme/parkettboden-knarrt-beheben`
6. `/probleme/dunkle-wasserflecken-auf-eichenparkett`
7. `/probleme/hundekratzer-aus-parkett-entfernen`
8. `/probleme/parkett-richtig-reinigen-ohne-streifen`
9. `/probleme/brandfleck-auf-parkett-reparieren`
10. `/probleme/parkettfugen-füllen-und-ausbessern`
11. `/probleme/katzenurin-aus-parkett-entfernen`
12. `/probleme/geöltes-parkett-nachölen-anleitung`
13. `/probleme/versiegeltes-parkett-reparieren`
14. `/probleme/dellen-im-parkett-ausbessern`
15. `/probleme/parkettboden-verliert-glanz`
16. `/probleme/sonneneinstrahlung-parkett-ausgeblichen`
17. `/probleme/parkett-quietscht-beim-darüberlaufen`
18. `/probleme/parkettboden-richtig-wischen`
19. `/probleme/parkettboden-im-bad-pflegen`

### 🟣 D. Regionale Standort-SEO-Seiten (`/standorte/[slug]`)
Dynamische Landingpages für spezifische Kantone, um den lokalen Google-Traffic abzugreifen.
1. `/standorte/zuerich`
2. `/standorte/zug`
3. `/standorte/luzern`
4. `/standorte/aargau`
5. `/standorte/winterthur`
6. `/standorte/basel`
7. `/standorte/bern`
8. `/standorte/st-gallen`

### 🔴 E. Admin Bereich (Das CRM-Backend - `/admin/...`)
Ein geschlossenes System zur Verwaltung des Tagesgeschäfts.

* **`/admin` (Dashboard)**
  - Zeigt KPIs wie Neuste Leads, ausstehende Offerten und Konversionsraten.
* **`/admin/leads` (Kundenanfragen)**
  - Tabellarische Liste aller eingegangenen Anfragen. Beinhaltet Status-Pills (Neu, In Bearbeitung).
* **`/admin/diagnostics` (KI-Auswertungen)**
  - Die "Röntgen-Ansicht" der hochgeladenen Bilder. Zeigt die rohe JSON-Analyse der Gemini KI an.
* **`/admin/offers` (Offerten-Management)**
  - Listet alle Entwürfe, versendeten und angenommenen Offerten.
  - **Generator:** Klick auf "Offerte per KI entwerfen" baut in Sekunden einen Entwurf.
  - **Editor:** Bearbeiten von Texten, Hinzufügen von Positionen, Rabatten und Exklusiv-Leistungen.
* **`/admin/calendar` (Auftrags-Kalender)**
  - Übersicht aller geplanten Aufträge. 
  - **Funktion:** Generiert sich *automatisch*, sobald ein Kunde eine Offerte online annimmt.
* **`/admin/settings` (Einstellungen & Automatisierung)**
  - Verwaltung der dynamischen Textvorlagen:
    - Offerten Intro-Template
    - Offerten Footer-Template
    - E-Mail-Vorlage: Link-Versand (mit Platzhaltern `{LINK}`, `{PIN}`)
    - E-Mail-Vorlage: Frage-Bestätigung
    - E-Mail-Vorlage: Auftragsbestätigung (Nach Annahme)

---

## 3. 🔄 Die detaillierten Workflows (Core Flows)

### 1. Der Lead & KI Diagnose Flow
1. Ein Nutzer klickt auf der Webseite auf "Gratis Offerte" (oder lädt im Ratgeber ein Bild hoch).
2. Er füllt ein mehrstufiges Formular aus (Holzart, Fläche, Beschreibung, Wunschdatum, Kontaktdaten).
3. **KI-Analyse (Backend):** Falls ein Foto angehängt ist, analysiert `Google Gemini Vision` den Schaden und schätzt die Schwere ein.
4. Der Lead wird live in Firebase Firestore gespeichert und erscheint unter `/admin/leads` als "Neu".

### 2. Der Offerten-Kalkulator Flow
1. Im CRM klickt der Admin beim Lead auf "Offerte erstellen".
2. **KI-Entwurf:** Das System liest die Lead-Daten und die Bild-Analyse aus. Es generiert einen passenden Intro-Text, fügt sinnvolle Positionen inkl. Preisschätzungen ein und definiert Annahmen (z.B. "Zimmer muss geräumt sein").
3. Der Admin validiert die Daten, klickt auf "Speichern" und generiert damit den Link und einen 4-stelligen PIN-Code für den Kunden.

### 3. Der interaktive Kunden-Flow & Kalender-Sync
1. Der Admin sendet dem Kunden den Link zur Offerte und den PIN.
2. Der Kunde öffnet `/offerte/[id]`, gibt den PIN ein und sieht das moderne Layout.
3. **Fall A (Rückfrage):** Der Kunde klickt "Frage stellen", schreibt Text. Der Status der Offerte wechselt in Firebase auf "Rethinking" (Überdenken). Der Admin sieht das sofort.
4. **Fall B (Ablehnen):** Der Status wechselt auf "Rejected".
5. **Fall C (Annehmen):** 
   - Der Status springt auf "Accepted".
   - Ein festlicher **Konfetti-Regen** erscheint für den Kunden, gefolgt von der Dankesseite und einer automatischen Weiterleitung (nach 5 Sekunden) zum Ratgeber.
   - **Backend-Magie:** Ein neuer Eintrag im `/admin/calendar` wird automatisch am Wunschdatum generiert.

---

## 4. 🧠 Architektur & Hybrid Storage System (Datenbank)

**Technologie-Stack:**
- **Framework:** Next.js 15 (React) mit App Router
- **Styling:** Tailwind CSS + Lucide Icons + Framer Motion
- **KI-Integration:** Vercel AI SDK mit Google Gemini (`gemini-2.5-flash`)

**Das Hybrid Storage System (`lib/data-service.ts`)**
Da Serverless-Plattformen wie Vercel ein "Read-Only" Dateisystem haben, wurde ein intelligenter Hybrid-Ansatz gebaut:
1. **Lokal:** Fehlt die Firebase-Umgebungsvariable, speichert das System alles superschnell in `/data/*.json` Dateien ab.
2. **Produktion (Live):** Sobald `FIREBASE_SERVICE_ACCOUNT_KEY` auf Vercel hinterlegt ist, switcht die App automatisch auf **Google Firebase Firestore**. Die JSON-Logik wird zu 100% in Firestore-Collections (`crm/leads`, `crm/offers`) übersetzt.

---

## 5. 🔍 Erweiterbarkeit der KI-Analyse (JSON)

Die KI (Gemini) ist so konfiguriert, dass sie ein striktes JSON-Objekt (`Structured Output` via Zod) zurückgibt. 

**Aktuelles Schema:**
```json
{
  "damageType": "Kratzer / Wasserschaden / Verfärbung",
  "severity": "Gering / Mittel / Hoch",
  "recommendedTreatment": "Schleifen und Ölen",
  "estimatedTimeHours": 4,
  "confidenceScore": 85
}
```

### Ist das erweiterbar?
**JA, unbegrenzt!** Wir können den Prompt und das Zod-Schema in der API-Route erweitern. 
**Was extrem sinnvoll wäre hinzuzufügen:**
- `woodTypeDetected`: KI erkennt automatisch, ob es sich um Eiche, Ahorn oder Nussbaum handelt.
- `surfaceFinish`: "Versiegelt" oder "Geölt"?
- `roomContext`: Erkennt Möbelstücke und schätzt ab, ob ein Erschwerniszuschlag für das Möbelräumen berechnet werden muss.
- `materialList`: Ein Array wie `["WOCA Intensivreiniger", "WOCA Pflegeöl"]`. Die KI schlägt exakt die Produkte vor, die der Admin dann in der Offerte oder im Shop verknüpfen kann.

---

## 6. 🚀 Was fehlt / Die Zukunfts-Roadmap

Was wir haben ist ein marktreifes, gigantisches System. Was noch hinzugefügt werden sollte, um es zum ultimativen Branchen-Standard zu machen:

### A. Echte E-Mail-API Anbindung (Resend)
- **Status:** Die E-Mail-Texte (Auftragsbestätigung, Link-Versand) werden perfekt im System verwaltet, aber der tatsächliche SMTP/API-Versand fehlt.
- **To-Do:** Integration von `Resend` (oder SendGrid), damit das CRM nach "Angebot annehmen" physisch eine E-Mail an den Kunden sendet.

### B. Authentifizierung für den Admin (`/admin`)
- **Status:** Der Admin-Bereich ist aktuell "offen" und verlässt sich auf die Unkenntnis der URL.
- **To-Do:** Implementierung von **NextAuth.js** (oder Firebase Auth), sodass `/admin` mit Passwort und E-Mail geschützt ist.

### C. Zahlungsanbindung im Shop (Stripe)
- **Status:** Der Shop funktioniert als Frontend-Katalog (Produkte können "in den Warenkorb" gelegt werden oder sind Affiliate-Links).
- **To-Do:** Integration von Stripe Checkout.
- **Geniale Idee:** Ein Upsell-Mechanismus! Nimmt der Kunde eine Offerte an, wird ihm auf der Dankesseite direkt das zur Holzart passende "Pflege-Starter-Set" aus dem Shop mit 10% Rabatt angeboten.

### D. PDF-Generierung für Offerten
- **Status:** Kunden erhalten einen Link zur fantastischen HTML-Offerte.
- **To-Do:** Manche Schweizer Verwaltungen verlangen zwingend PDFs. Wir sollten eine serverseitige PDF-Generierung (z.B. via `react-pdf` oder Puppeteer) einbauen, die auf Klick das HTML-Dokument in ein druckfertiges A4-PDF umwandelt.

### E. WhatsApp Business API
- **Idee:** Die Öffnungsraten von E-Mails sinken. Durch die Twilio/WhatsApp API könnte das CRM den Offerten-Link samt PIN direkt als WhatsApp-Nachricht an das Handy des Kunden senden.

### F. Analytik & A/B Testing
- Einbau von Vercel Analytics oder Google Analytics. 
- Ziel: Herausfinden, bei welchen SEO-Problem-Seiten (`/probleme/wasserflecken-parkett`) die Kunden das Formular am häufigsten absenden.

---

## 7. 📖 SEO Content Engine & Guidelines

Um das rasante Wachstum der Plattform inhaltlich zu steuern und zukünftige KI-Agenten zu briefen, existiert ein strikter **SEO Content Blueprint**. Diese Engine definiert die exakte Hierarchie, Tonalität, den Aufbau von H1-H3 Überschriften und welche interaktiven Module pro Seite (z.B. Kostenrechner oder Diagnose-Quiz) Pflicht sind.

Sie finden die Vorgaben hier:
- 📄 **Übersicht & Dokumentation:** [docs/SEO_CONTENT_ENGINE.md](docs/SEO_CONTENT_ENGINE.md)
- ⚙️ **Rohe Blueprint (JSON):** [config/seo-content-engine.json](config/seo-content-engine.json)

---
*Dokumentation in maximaler Tiefe generiert & laufend gepflegt von Ihrem KI-Entwickler.*



# README-Ergänzung für parkett-pflege.ch

Diesen Abschnitt in die bestehende `README.md` einfügen:

```md
## SEO-Content-Engine & Content-Architektur

Für parkett-pflege.ch gibt es eine eigene SEO-Content-Engine. Sie definiert verbindlich, wie Seiten, Kategorien, Tags, Problemfälle, Blogartikel, Quiz, Infografiken, Vorher-Nachher-Fälle, interne Links, JSON-LD, Bildanforderungen, CTA-Blöcke und Quality Scores aufgebaut werden.

Die vollständige operative Dokumentation befindet sich hier:

- `docs/SEO_CONTENT_ENGINE.md`

Die vollständige maschinenlesbare Konfiguration befindet sich hier:

- `config/seo-content-engine.json`

Wichtig: Der SEOContentAgent erzeugt nicht nur `Slug`, `Title`, `Meta Description` und `H1`, sondern vollständige Seitenkonzepte mit Seitentyp, Kategorie, Tags, Suchintention, Funnel-Stufe, H1/H2/H3-Struktur, Inhaltsmodulen, interaktiven Elementen, FAQs, internen Links, Bildanforderungen, Schema-Markup, CTA-Blöcken und Quality Score.

Ziel ist, parkett-pflege.ch als führende Plattform für Parkettpflege, Parkettreparatur und Parkettrenovation im Raum Zürich aufzubauen.
```