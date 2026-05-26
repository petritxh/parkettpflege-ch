# Parkett-Pflege.ch – Web-Plattform & CRM System

Willkommen zur technischen und funktionalen Dokumentation der Parkett-Pflege.ch Plattform. Dieses Projekt kombiniert eine moderne, SEO-optimierte öffentliche Website zur Kundengewinnung mit einem massgeschneiderten, intelligenten Backend-CRM zur Verwaltung von Anfragen (Leads), Erstellung von Offerten (mit KI-Unterstützung) und Planung von Aufträgen.

## 🌟 Projektübersicht

Die Plattform besteht aus zwei Hauptbereichen:
1. **Public Website (Frontend):** Hochperformante, auf Conversion ausgerichtete Seiten für Kunden (SEO-Seiten, Fallstudien, Ratgeber).
2. **Admin CRM (Backend):** Ein geschlossenes System für den Betreiber, um das Geschäft zu verwalten – von der ersten Anfrage bis zur Terminplanung im Kalender.

**Technologie-Stack:**
- **Framework:** Next.js (React) mit App Router
- **Styling:** Tailwind CSS + Lucide Icons + Framer Motion (Animationen)
- **KI-Integration:** Vercel AI SDK mit Google Gemini (für Schadensdiagnose und Offertengenerierung)
- **Datenbank:** Aktuell Dateisystem-basiert (`/data` Ordner mit JSON). *Hinweis: Für den produktiven Betrieb auf Serverless-Plattformen wie Vercel muss dies auf eine echte Datenbank (z.B. Firebase/Supabase) migriert werden, da Vercel Read-Only ist.*

---

## 🏗 Seiten-Struktur & Architektur

### Öffentliche Seiten (`app/(public)`)
- `/` – **Startseite:** Modernes Design, vertrauensbildende Elemente, Call-to-Actions zur Offertenanfrage.
- `/services/[slug]` – **Dienstleistungsseiten:** Detaillierte Beschreibung einzelner Services (z.B. "Parkett schleifen", "Parkett ölen").
- `/problems/[slug]` – **Problemseiten:** SEO-Seiten, die gezielt nach Problemen der Kunden suchen (z.B. "Wasserschaden Parkett", "Kratzer entfernen").
- `/locations/[slug]` – **Regionale Seiten:** SEO-Seiten für spezifische Einsatzgebiete (z.B. "Parkett schleifen Zürich").
- `/case-studies` & `/case-studies/[slug]` – **Fallstudien:** Vorher/Nachher-Beispiele zur Vertrauensbildung.
- `/faqs` – **Häufig gestellte Fragen:** Dynamische FAQs, die sich auf Services, Probleme oder Regionen beziehen.
- `/offerte/[id]` – **Geschützte Offerten-Ansicht:** Die personalisierte HTML-Ansicht für den Kunden, gesichert durch einen 4-stelligen PIN-Code.

### Admin CRM (`app/admin`)
Das CRM ist über den Pfad `/admin` erreichbar und dient als zentrale Steuerungszentrale.

- `/admin` – **Dashboard:** KPI-Übersicht (Neuste Leads, Konversionsrate, Umsatz-Pipeline).
- `/admin/leads` – **Leads (Kundenanfragen):** Liste aller eingegangenen Formular-Anfragen.
- `/admin/diagnostics` – **AI-Diagnosen:** Spezifische Ansicht für Leads, bei denen der Kunde Bilder zur KI-Auswertung hochgeladen hat.
- `/admin/offers` – **Offerten-Verwaltung:** Erstellen, Bearbeiten und Versenden von Angeboten.
- `/admin/calendar` – **Auftrags-Kalender:** Grafische/Listen-Ansicht aller geplanten, abgeschlossenen oder stornierten Aufträge.
- `/admin/settings` – **Einstellungen:** Verwaltung von Text-Vorlagen für E-Mails und Offerten.
- **Content & SEO Sektion:** Verwaltung von CMS-Inhalten (Fallstudien, SEO-Seiten, FAQs).
- **System:** Agenten-Logs und Produkt-Verwaltung.

---

## 🔄 Die Kern-Workflows (Flows)

### 1. Lead Generierung & AI Diagnose Flow
1. **Nutzeraktion:** Ein Website-Besucher füllt das Offerten-Formular aus. Optional lädt er ein Foto seines Parkett-Problems hoch.
2. **KI-Analyse (Backend):** Wenn ein Foto vorhanden ist, analysiert das System via Google Gemini Vision den Schaden, schätzt die Schwere ein und empfiehlt intern das nötige Pflege-Paket.
3. **Datenspeicherung:** Der Lead wird im System gespeichert (`data/leads.json`) und taucht sofort unter `/admin/leads` mit dem Label "Neu" auf.

### 2. Offerten-Erstellung Flow (Mit KI-Kalkulator)
1. **Admin Aktion:** Im CRM klickt der Admin beim Lead auf "Offerte erstellen".
2. **KI-Entwurf:** Das System liest die Lead-Daten und die eventuelle KI-Schadensdiagnose aus. Es generiert automatisch einen hochprofessionellen ersten Entwurf für die Offerte (inklusive Intro-Text, passenden Positionen/Preisen, Annahmen und Ausschlüssen).
3. **Bearbeitung:** Der Admin sieht den Entwurf, kann Preise oder Texte im Formular anpassen und die Offerte speichern.
4. **Link-Generierung:** Das System erstellt eine geschützte URL und generiert einen zufälligen 4-stelligen PIN-Code.

### 3. Kunden-Ansicht & Entscheidungs-Flow (Die HTML-Offerte)
1. **Zustellung:** Der Admin versendet den Link und PIN per E-Mail an den Kunden (aktuell simulierte E-Mail / später via Resend API).
2. **Freischaltung:** Der Kunde öffnet den Link `/offerte/[id]`, sieht einen Sperrbildschirm und gibt den PIN ein. Ein sicheres Cookie wird gesetzt.
3. **Ansicht:** Die moderne, responsive Offerte wird angezeigt. Der Kunde sieht alle Details, Preise, Inklusiv-/Exklusivleistungen.
4. **Interaktion:** Unten auf der Seite gibt es eine fixierte Leiste mit drei Optionen:
   - **"Frage stellen":** Öffnet ein Textfeld. Der Status wechselt auf "Rethinking" (Überdenken) und der Admin erhält eine Info-Mail mit der Frage.
   - **"Ablehnen":** Status wechselt auf "Rejected".
   - **"Angebot annehmen":** Der Kunde bucht kostenpflichtig.

### 4. Buchung & Kalender Flow (Erfolg)
1. **Kundenaktion:** Der Kunde klickt auf "Angebot annehmen".
2. **Animation:** Die Seite lädt neu, es regnet Konfetti (`canvas-confetti`) und eine festliche Dankesseite erscheint ("Vielen Dank für Ihre Buchung!").
3. **Backend-Logik:** 
   - Der Offerten-Status wird auf "Angenommen" gesetzt.
   - Eine automatische **Auftragsbestätigungs-Mail** geht an den Kunden raus (Vorlage wird aus den Admin-Settings geladen).
   - Ein **neuer Kalendereintrag** wird automatisch generiert und im `/admin/calendar` am Wunschdatum des Kunden (oder heute) platziert.
4. **Admin-Planung:** Der Betreiber sieht den Termin im CRM-Kalender, kann ihn verschieben, telefonisch mit dem Kunden finalisieren und den Status später auf "Abgeschlossen" ändern.

---

## 🛠 Konfiguration & Anpassbarkeit (Einstellungen)
Unter `/admin/settings` kann der Betreiber flexibel eingreifen:
- **Offerten Intro/Footer:** Standardtexte, die bei der automatischen Generierung neuer Offerten genutzt werden.
- **E-Mail Vorlagen:** 
  - Offerten-Link-Mail (inkl. Platzhalter `{LINK}` und `{PIN}`)
  - Bestätigung nach Rückfragen
  - **Auftragsbestätigung (Nach Annahme):** Die automatisierte Mail, wenn der Kunde final bucht.

---

## ⚠️ Wichtiger Entwickler-Hinweis (Vercel & Datenbank)
Die aktuelle Implementierung nutzt Node.js `fs.writeFile`, um Daten im Ordner `/data/*.json` zu speichern.
Dies funktioniert perfekt in einer lokalen Entwicklungsumgebung oder auf einem VPS/Root-Server.
**Auf Serverless-Plattformen wie Vercel ist das Dateisystem (`process.cwd()`) in der Produktion schreibgeschützt (Read-Only).**
Wenn das System auf Vercel läuft, wird ein Fehler geworfen, sobald versucht wird, eine Offerte zu speichern, den Status zu ändern (z.B. beim Akzeptieren durch den Kunden) oder ein Kalender-Event zu erstellen. 
**Lösungsweg für den produktiven Live-Einsatz:** Die Data-Service-Schicht (`lib/data-service.ts`) muss auf eine externe Datenbank wie Firestore (Firebase), Supabase (PostgreSQL) oder MongoDB umgeschrieben werden.
