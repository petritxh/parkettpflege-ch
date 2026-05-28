# SEO-Content-Engine V5 für parkett-pflege.ch

**Projekt:** parkett-pflege.ch  
**Version:** 5.0  
**Zielgebiet:** Raum Zürich  
**Status:** operative Master-Dokumentation für Content, SEO, Agenten, Seitenarchitektur, Taxonomie, interne Verlinkung, lokale Sichtbarkeit, interaktive Module und Qualitätskontrolle.  
**Claim:** Parkett erhalten. Werte bewahren.  
**Leitidee:** Parkett retten statt ersetzen.  

---

## 0. Nicht verhandelbare Grundregel

Die Marke und Domain heisst konsequent: **parkett-pflege.ch**.

Falsch sind:

- Parkettpflege.ch
- parkettpflege.ch
- Parkett Pflege.ch
- Parkettpflege

Korrekt ist:

- parkett-pflege.ch
- Parkett-Pflege, wenn es als sichtbarer Markenname im Logo oder Text verwendet wird

Diese Schreibweise gilt für README, Dokumentation, JSON-Konfiguration, Metadaten, Schema, interne Links, Bildnamen, Alt-Texte, Formulartexte, E-Mail-Vorlagen, Google-Business-Profile-Texte und alle generierten Seiten.

---

## 1. Ziel dieser Datei

Diese Datei ist nicht nur eine SEO-Notiz. Sie ist das Betriebshandbuch für die gesamte Content-Produktion von parkett-pflege.ch.

Sie beantwortet:

- Welche Kategorien existieren?
- Welche Seitentypen existieren?
- Welche Tags dürfen verwendet werden?
- Wie werden Problemfälle aufgebaut?
- Wie werden Leistungsseiten aufgebaut?
- Wie werden Kostenseiten aufgebaut?
- Wie werden lokale Zürich-Seiten aufgebaut?
- Wie werden Blogartikel aufgebaut?
- Wie werden Quiz, Spiele, Infografiken und Rechner eingesetzt?
- Welche H1/H2/H3-Struktur ist Pflicht?
- Welche internen Links sind Pflicht?
- Welche JSON-LD Schemas sind pro Seitentyp erlaubt?
- Welche Bild- und Alt-Text-Regeln gelten?
- Welche CTAs müssen gesetzt werden?
- Wie wird Qualität bewertet?
- Wann darf eine Seite veröffentlicht werden?
- Wie wird der SEOContentAgent gesteuert?
- Welche ersten 100 Seiten sollen entstehen?

Das Ziel ist nicht mehr Content. Das Ziel ist besserer Content als alle lokalen Anbieter, Preisportale, allgemeine Handwerkerseiten und generische Ratgeberseiten im Raum Zürich.

---

## 2. Rolle des SEOContentAgent

Der SEOContentAgent ist kein reiner Textgenerator. Er ist ein Seitenarchitekt, Redaktionsplaner, SEO-Stratege und Qualitätsprüfer.

Er darf niemals nur Slug, Title, Meta Description, H1 und Fliesstext erzeugen. Jede Seite wird als vollständiges Seitenprodukt geplant.

### 2.1 Pflichtausgabe pro Seite

- `contentType`
- `category`
- `subCategory`
- `tags`
- `primaryKeyword`
- `secondaryKeywords`
- `semanticKeywords`
- `searchIntent`
- `funnelStage`
- `targetAudience`
- `slug`
- `canonicalUrl`
- `title`
- `metaDescription`
- `h1`
- `h2H3H4Outline`
- `contentModules`
- `interactiveElement`
- `faq`
- `internalLinks`
- `externalSourceNeeds`
- `imageRequirements`
- `infographicRequirements`
- `jsonLdSchemas`
- `ctaBlocks`
- `localSeoSignals`
- `trustSignals`
- `qualityScore`
- `reviewChecklist`
- `publishingPriority`
- `updateFrequency`
- `ownerNotes`

### 2.2 Verbotene Kurzformen

- Seite nur mit H1 und Fliesstext
- Kategorien ohne Pflichtmodule
- Tags ohne kontrollierte Taxonomie
- Problemfälle ohne Diagnose-Matrix
- Leistungsseiten ohne Kostenabschnitt
- lokale Seiten ohne lokalen Mehrwert
- Blogartikel ohne interne Linkstrategie
- FAQ ohne sichtbare Fragen auf der Seite
- JSON-LD ohne Bezug zum sichtbaren Inhalt
- Bilder ohne Alt-Text-Briefing
- Quiz ohne Ergebnislogik
- Infografiken ohne HTML-Erklärung
- CTAs nur am Seitenende

---

## 3. Positionierung

parkett-pflege.ch positioniert sich als spezialisierter Anbieter für Parkettpflege, Parkettreparatur und Parkettrenovation im Raum Zürich.

### 3.1 Kernversprechen

Bestehendes Parkett wird nicht vorschnell ersetzt, sondern fachlich geprüft, gepflegt, repariert, aufgefrischt oder renoviert. Kunden erhalten eine realistische Einschätzung, was möglich ist, was sinnvoll ist und was es ungefähr kostet.

### 3.2 Hauptnutzen

- Werterhalt statt unnötiger Austausch
- klare Einschätzung per Fotoanalyse
- transparente Preisspannen
- verständliche Erklärung für Laien
- lokaler Fokus Raum Zürich
- sichtbare Ergebnisse durch Vorher-Nachher-Beispiele
- schnelle Entscheidungshilfe über Quiz und Rechner
- fachliche Orientierung bei Schäden, Pflegefehlern und Renovationen

### 3.3 Tonalität

Die Sprache ist fachlich, ruhig, präzise, hochwertig, lokal, ehrlich und lösungsorientiert. Sie spricht Eigentümer, Verwaltungen, Mieter, Vermieter und Gewerbekunden an, ohne künstlich kompliziert zu wirken.

Nicht verwenden: aggressive Superlative, billige Rabatt-Sprache, Keyword-Stuffing, übertriebene KI-Versprechen, Pseudo-Luxus-Floskeln, generische Handwerkertexte.

---

## 4. Informationsarchitektur

```txt
/
├── leistungen/
├── problemfaelle/
├── kosten/
├── ratgeber/
├── holzarten/
├── zuerich/
├── tools/
├── quiz/
├── faelle/
├── blog/
├── fotoanalyse/
├── kontakt/
├── ueber-uns/
```

### 4.1 Navigationslogik

| Bereich | Aufgabe | Nutzerfrage | Conversion |
|---|---|---|---|
| Leistungen | Geldseiten | Welche Leistung brauche ich? | Offerte / Fotoanalyse |
| Problemfälle | Schadensdiagnose | Was ist mit meinem Parkett los? | Fotoanalyse / Reparatur |
| Kosten | Preisentscheidung | Was kostet das ungefähr? | Kostenrechner / Anfrage |
| Ratgeber | Wissen & Vertrauen | Wie pflege ich Parkett richtig? | Beratung / passende Leistung |
| Holzarten | Fachautorität | Was gilt für mein Holz? | Pflegeempfehlung |
| Zürich | lokale Sichtbarkeit | Wer hilft in meiner Nähe? | lokale Anfrage |
| Tools | Interaktion | Was brauche ich konkret? | Lead-Qualifizierung |
| Fälle | Beweis | Hat das schon funktioniert? | ähnlichen Fall anfragen |
| Blog | laufende Themen | Was tun in meiner Situation? | interne Weiterleitung |

---

## 5. Kategorien und Pflichtlogik

### 5.1 Kategorie: Leistungen

**Pfad:** `/leistungen`

**Zweck:** Kommerzielle Seiten für konkrete Dienstleistungen. Diese Seiten müssen direkt Anfragen erzeugen.

**Pflichtmodule:**

- Hero
- Kurzantwort
- Problemübersicht
- geeignet / nicht geeignet
- Ablauf
- Dauer
- Kosten
- Materialien
- Vorher-Nachher
- lokaler Abschnitt
- FAQ
- CTA
- JSON-LD

**Priorisierte Seiten:**

- `/leistungen/parkett-schleifen-zuerich` — Parkett schleifen Zürich
- `/leistungen/parkett-oelen-zuerich` — Parkett ölen Zürich
- `/leistungen/parkett-reinigen-zuerich` — Parkett reinigen Zürich
- `/leistungen/parkett-reparieren-zuerich` — Parkett reparieren Zürich
- `/leistungen/parkett-versiegeln-zuerich` — Parkett versiegeln Zürich
- `/leistungen/parkett-auffrischen-zuerich` — Parkett auffrischen Zürich
- `/leistungen/parkett-polieren-zuerich` — Parkett polieren Zürich
- `/leistungen/parkett-tiefenreinigung-zuerich` — Parkett Tiefenreinigung Zürich
- `/leistungen/parkett-spot-repair-zuerich` — Parkett Spot Repair Zürich
- `/leistungen/parkett-teilflaechenbehandlung-zuerich` — Parkett Teilflächenbehandlung Zürich
- `/leistungen/parkett-nachoelen-zuerich` — Parkett nachölen Zürich
- `/leistungen/parkett-pflege-immobilienverwaltung-zuerich` — Parkettpflege Immobilienverwaltung Zürich

### 5.2 Kategorie: Problemfälle

**Pfad:** `/problemfaelle`

**Zweck:** Schadensseiten für Nutzer, die ein Problem haben, aber die passende Leistung noch nicht kennen.

**Pflichtmodule:**

- Kurzantwort
- Symptome
- Ursachen
- Schweregrad-Matrix
- Erste Hilfe
- Do & Don’t
- Lösungsmatrix
- Kostenrahmen
- Profi-Hinweis
- Fotoanalyse
- FAQ
- interne Links

**Priorisierte Seiten:**

- `/problemfaelle/wasserflecken-parkett` — Wasserflecken Parkett entfernen
- `/problemfaelle/hundekratzer-parkett` — Hundekratzer Parkett reparieren
- `/problemfaelle/schwarze-flecken-parkett` — Schwarze Flecken Parkett
- `/problemfaelle/parkett-grau-und-stumpf` — Parkett grau und stumpf
- `/problemfaelle/parkett-quillt-auf` — Parkett quillt auf
- `/problemfaelle/parkett-nach-falscher-reinigung` — Parkett falsch gereinigt
- `/problemfaelle/tiefe-kratzer-parkett` — Tiefe Kratzer Parkett
- `/problemfaelle/laufstrassen-parkett` — Laufstrassen Parkett entfernen
- `/problemfaelle/rotweinfleck-parkett` — Rotweinfleck Parkett entfernen
- `/problemfaelle/brandfleck-parkett` — Brandfleck Parkett reparieren
- `/problemfaelle/moebelspuren-parkett` — Möbelspuren Parkett entfernen
- `/problemfaelle/parkett-klebrig` — Parkett klebrig nach Reinigung
- `/problemfaelle/fugen-im-parkett-offen` — Fugen im Parkett offen
- `/problemfaelle/parkett-vergilbt` — Parkett vergilbt
- `/problemfaelle/parkett-unter-teppich-verfaerbt` — Parkett unter Teppich verfärbt
- `/problemfaelle/blumentopf-wasserfleck-parkett` — Blumentopf Wasserfleck Parkett
- `/problemfaelle/urin-fleck-parkett` — Urin Fleck Parkett entfernen
- `/problemfaelle/parkett-lack-abgenutzt` — Parkett Lack abgenutzt
- `/problemfaelle/parkett-oel-ausgelaugt` — Geöltes Parkett ausgelaugt
- `/problemfaelle/parkett-nach-mieterwechsel` — Parkett nach Mieterwechsel

### 5.3 Kategorie: Kosten & Preise

**Pfad:** `/kosten`

**Zweck:** Kaufnahe Seiten für Nutzer mit Preisfokus.

**Pflichtmodule:**

- Preisspanne
- Kostenfaktoren
- Beispielrechnungen
- Preisrechner
- Sparpotenzial
- Risiken
- Disclaimer
- CTA

**Priorisierte Seiten:**

- `/kosten/parkett-schleifen-kosten` — Parkett schleifen Kosten
- `/kosten/parkett-oelen-kosten` — Parkett ölen Kosten
- `/kosten/parkett-reparatur-kosten` — Parkett Reparatur Kosten
- `/kosten/parkett-reinigung-kosten` — Parkett Reinigung Kosten
- `/kosten/parkett-versiegeln-kosten` — Parkett versiegeln Kosten
- `/kosten/parkett-auffrischen-kosten` — Parkett auffrischen Kosten
- `/kosten/wasserfleck-parkett-reparatur-kosten` — Wasserfleck Parkett Reparatur Kosten
- `/kosten/hundekratzer-parkett-reparatur-kosten` — Hundekratzer Parkett Reparatur Kosten
- `/kosten/parkettpflege-wohnung-kosten` — Parkettpflege Wohnung Kosten
- `/kosten/parkettpflege-haus-kosten` — Parkettpflege Haus Kosten

### 5.4 Kategorie: Ratgeber

**Pfad:** `/ratgeber`

**Zweck:** Evergreen-Wissen, das Autorität und Vertrauen aufbaut.

**Pflichtmodule:**

- Kurz erklärt
- Anleitung
- Vergleich
- Fehler
- Checkliste
- Profi-Tipp
- interne Links
- FAQ

**Priorisierte Seiten:**

- `/ratgeber/geoeltes-parkett-richtig-pflegen` — Geöltes Parkett richtig pflegen
- `/ratgeber/lackiertes-parkett-pflegen` — Lackiertes Parkett pflegen
- `/ratgeber/parkett-oelen-oder-versiegeln` — Parkett ölen oder versiegeln
- `/ratgeber/parkett-schleifen-oder-reinigen` — Parkett schleifen oder reinigen
- `/ratgeber/dampfreiniger-auf-parkett` — Dampfreiniger auf Parkett
- `/ratgeber/parkett-nass-wischen` — Parkett nass wischen
- `/ratgeber/parkettpflege-im-winter` — Parkettpflege im Winter
- `/ratgeber/parkettpflege-nach-heizperiode` — Parkettpflege nach Heizperiode
- `/ratgeber/parkettpflege-bei-haustieren` — Parkettpflege bei Haustieren
- `/ratgeber/parkettpflege-bei-kindern` — Parkettpflege bei Kindern
- `/ratgeber/parkett-vor-wohnungsuebergabe` — Parkett vor Wohnungsübergabe
- `/ratgeber/parkett-gepflegt-verkauf-immobilie` — Parkettpflege vor Immobilienverkauf

### 5.5 Kategorie: Region Zürich

**Pfad:** `/zuerich`

**Zweck:** Lokale Sichtbarkeit und lokale Anfragen.

**Pflichtmodule:**

- lokaler Hero
- Ortsbezug
- typische lokale Probleme
- Leistungen vor Ort
- Ablauf
- Kosten
- lokale Beispiele
- FAQ
- CTA

**Priorisierte Seiten:**

- `/zuerich/parkettpflege-zuerich` — Parkettpflege Zürich
- `/zuerich/parkettpflege-winterthur` — Parkettpflege Winterthur
- `/zuerich/parkettpflege-uster` — Parkettpflege Uster
- `/zuerich/parkettpflege-duebendorf` — Parkettpflege Dübendorf
- `/zuerich/parkettpflege-schlieren` — Parkettpflege Schlieren
- `/zuerich/parkettpflege-dietikon` — Parkettpflege Dietikon
- `/zuerich/parkettpflege-horgen` — Parkettpflege Horgen
- `/zuerich/parkettpflege-meilen` — Parkettpflege Meilen
- `/zuerich/parkettpflege-kuesnacht` — Parkettpflege Küsnacht
- `/zuerich/parkettpflege-zollikon` — Parkettpflege Zollikon
- `/zuerich/parkettpflege-adliswil` — Parkettpflege Adliswil
- `/zuerich/parkettpflege-thalwil` — Parkettpflege Thalwil

### 5.6 Kategorie: Tools & Quiz

**Pfad:** `/tools und /quiz`

**Zweck:** Interaktive Elemente zur Lead-Qualifizierung.

**Pflichtmodule:**

- Tool-Erklärung
- Inputs
- Logik
- Ergebnisse
- Empfehlung
- CTA
- Schema

**Priorisierte Seiten:**

- `/tools/fotoanalyse-parkett` — Parkett Fotoanalyse
- `/tools/parkett-kostenrechner` — Parkett Kostenrechner
- `/quiz/muss-mein-parkett-geschliffen-werden` — Muss mein Parkett geschliffen werden
- `/quiz/welche-parkettpflege-brauche-ich` — Welche Parkettpflege brauche ich
- `/quiz/ist-mein-parkett-geoelt-oder-lackiert` — Ist mein Parkett geölt oder lackiert
- `/tools/parkett-schaden-check` — Parkett Schaden Check
- `/tools/parkett-pflegeplan-generator` — Parkett Pflegeplan Generator

### 5.7 Kategorie: Vorher-Nachher-Fälle

**Pfad:** `/faelle`

**Zweck:** Beweise durch echte Projektberichte.

**Pflichtmodule:**

- Ausgangslage
- Problem
- Analyse
- Methode
- Dauer
- Kostenrahmen
- Vorher/Nachher
- Ergebnis
- ähnliche Fälle
- CTA

**Priorisierte Seiten:**

- `/faelle/wasserfleck-parkett-zuerich-seefeld` — Wasserfleck Parkett Zürich-Seefeld
- `/faelle/hundekratzer-parkett-zuerich-wiedikon` — Hundekratzer Parkett Zürich-Wiedikon
- `/faelle/laufstrasse-parkett-zuerich-enge` — Laufstrasse Parkett Zürich-Enge
- `/faelle/graues-parkett-zuerich-altstetten` — Graues Parkett Zürich-Altstetten
- `/faelle/parkett-mieterwechsel-zuerich-oerlikon` — Parkett Mieterwechsel Zürich-Oerlikon

### 5.8 Kategorie: Blog

**Pfad:** `/blog`

**Zweck:** laufende problemorientierte Inhalte, saisonale Artikel, Pflegefehler und Verwaltungs-Themen.

**Pflichtmodule:**

- Suchintention
- Kategorie
- visuelles Element
- interne Links
- CTA
- FAQ falls sinnvoll

---

## 6. Kontrollierte Taxonomie

### 6.1 Schadens-Tags

```txt
kratzer
tiefe-kratzer
hundekratzer
katzenkratzer
wasserfleck
wasserschaden
schwarze-flecken
weisse-flecken
grauschleier
laufstrassen
sonnenverfaerbung
brandfleck
rotweinfleck
kaffeefleck
fettfleck
moebelspuren
druckstellen
aufgequollen
fugen-offen
risse
abplatzungen
stumpf
klebrig
pflegefehler
dampfreiniger-schaden
reinigungsmittel-schaden
blumentopf-fleck
urin-fleck
schimmelverdacht
lack-abgenutzt
oel-ausgelaugt
vergilbt
unregelmaessige-farbe
```

### 6.2 Behandlungs-Tags

```txt
reinigen
tiefenreinigung
grundreinigung
oelen
nachoelen
schleifen
versiegeln
lackieren
polieren
reparieren
ausbessern
auffrischen
spot-repair
teilflaechenbehandlung
abschliff
pflegeoel
hartwachs-oel
mattlack
wasserlack
farbanpassung
element-tausch
fugen-fuellen
finish-erneuern
```

### 6.3 Oberflächen-Tags

```txt
geoelt
naturgeoelt
lackiert
versiegelt
matt
seidenglanz
glanz
gebuerstet
geraechert
gebeizt
rohholz-optik
hartwachsoel
uv-geoelt
uv-lackiert
renovierungsbeduerftig
```

### 6.4 Holzart-Tags

```txt
eiche
buche
nussbaum
ahorn
esche
kirschbaum
fischgrat
stabparkett
massivparkett
fertigparkett
landhausdielen
mosaikparkett
industrieparkett
riemenparkett
mehrschichtparkett
parkettdielen
altbauparkett
```

### 6.5 Zielgruppen-Tags

```txt
privatkunden
eigentumswohnung
einfamilienhaus
mieter
vermieter
immobilienverwaltung
architekten
innenausbau
gewerbe
restaurant
buero
praxis
hotel
verkaufsvorbereitung
umzug
mieterwechsel
bauleitung
facility-management
```

### 6.6 Format-Tags

```txt
ratgeber
checkliste
quiz
infografik
kostenrechner
vorher-nachher
fallstudie
faq
vergleich
how-to
diagnose
tool
spiel
entscheidungshilfe
download
template
lokale-seite
```

### 6.7 Standort-Tags

```txt
zuerich
winterthur
uster
duebendorf
schlieren
dietikon
horgen
meilen
kuesnacht
zollikon
adliswil
thalwil
wallisellen
opfikon
kloten
regensdorf
buelach
waedenswil
richterswil
staefa
maennedorf
rueschlikon
kilchberg
erlenbach
herrliberg
volketswil
illnau-effretikon
pfaeffikon-zh
wetzikon
hinwil
rapperswil-jona
baden
aarau
zug
seefeld
enge
wiedikon
oerlikon
altstetten
hottingen
riesbach
wollishofen
wipkingen
höngg
affoltern
albisrieden
schwamendingen
unterstrass
oberstrass
sihlfeld
hirslanden
fluntern
altstadt
kreis-4
kreis-5
```

### 6.8 Tag-Regeln

- Jede Seite erhält 3 bis 8 Tags.
- Tags stammen aus der kontrollierten Taxonomie.
- Neue Tags benötigen redaktionelle Freigabe.
- Leere Tagseiten bleiben noindex.
- Tagseiten werden nur indexiert, wenn sie eigene Einleitung, interne Links und echte redaktionelle Auswahl haben.
- Tags dienen Filterung, Clustering und interner Verlinkung.
- Tags ersetzen keine Kategorien.
- Tags dürfen keine Duplicate-Content-Landschaft erzeugen.

---

## 7. Seitentypen
### 7.1 `service_page` — Leistungsseite

- Mindestumfang: 1200 Wörter
- Empfohlen: 1600 bis 2600 Wörter
- Pflicht-H2:
  - Für welche Probleme ist diese Leistung geeignet?
  - Wann ist sie nicht geeignet?
  - So läuft die Ausführung ab
  - Was kostet diese Leistung?
  - Wie lange dauert es?
  - Vorher-Nachher-Beispiele
  - Häufige Fragen
  - Fotoanalyse oder Offerte anfragen
- Schema:
  - Service
  - LocalBusiness
  - FAQPage
  - BreadcrumbList

### 7.2 `problem_case_page` — Problemfall-Seite

- Mindestumfang: 1400 Wörter
- Empfohlen: 1800 bis 3400 Wörter
- Pflicht-H2:
  - Kurzantwort
  - Woran erkennt man das Problem?
  - Mögliche Ursachen
  - Schweregrad einschätzen
  - Was sofort tun?
  - Was vermeiden?
  - Welche Behandlung hilft?
  - Kosten und Aufwand
  - Wann ein Profi nötig ist
  - Fotoanalyse
  - FAQ
- Schema:
  - Article
  - FAQPage
  - BreadcrumbList
  - HowTo optional

### 7.3 `cost_page` — Kostenseite

- Mindestumfang: 1200 Wörter
- Empfohlen: 1500 bis 2800 Wörter
- Pflicht-H2:
  - Kurzüberblick
  - Preistabelle
  - Kostenfaktoren
  - Beispielrechnungen
  - Wann wird es teurer?
  - Wann sparen?
  - Kostenrechner
  - FAQ
- Schema:
  - Service
  - FAQPage
  - WebApplication optional
  - BreadcrumbList

### 7.4 `guide_page` — Ratgeberseite

- Mindestumfang: 1200 Wörter
- Empfohlen: 1500 bis 3000 Wörter
- Pflicht-H2:
  - Kurz erklärt
  - Für wen relevant?
  - Anleitung
  - Typische Fehler
  - Vergleich
  - Profi-Tipp
  - Passende Leistungen
  - FAQ
- Schema:
  - Article
  - FAQPage
  - HowTo optional
  - BreadcrumbList

### 7.5 `location_page` — Lokale Seite

- Mindestumfang: 1000 Wörter
- Empfohlen: 1300 bis 2400 Wörter
- Pflicht-H2:
  - Parkettpflege in [Ort]
  - Leistungen in [Ort]
  - typische Probleme
  - Ablauf
  - Kosten
  - lokale Beispiele
  - FAQ
- Schema:
  - LocalBusiness
  - Service
  - FAQPage
  - BreadcrumbList

### 7.6 `quiz_page` — Quiz-Seite

- Mindestumfang: 700 Wörter
- Empfohlen: 900 bis 1800 plus Quiz Wörter
- Pflicht-H2:
  - Worum geht es?
  - Für wen geeignet?
  - Quiz starten
  - Auswertung verstehen
  - Nächste Schritte
  - FAQ
- Schema:
  - WebApplication
  - Article
  - FAQPage
  - BreadcrumbList

### 7.7 `infographic_page` — Infografik-Seite

- Mindestumfang: 800 Wörter
- Empfohlen: 1000 bis 2000 Wörter
- Pflicht-H2:
  - Kernaussagen
  - Infografik
  - Details erklärt
  - Entscheidungshilfe
  - FAQ
- Schema:
  - Article
  - ImageObject
  - FAQPage
  - BreadcrumbList

### 7.8 `case_study` — Fallstudie

- Mindestumfang: 800 Wörter
- Empfohlen: 1000 bis 2000 Wörter
- Pflicht-H2:
  - Ausgangslage
  - Problem
  - Analyse
  - Vorgehen
  - Ergebnis
  - Dauer und Kostenrahmen
  - Ähnliche Fälle
  - Anfrage
- Schema:
  - Article
  - ImageObject
  - LocalBusiness
  - BreadcrumbList

---

## 8. H1/H2/H3/H4-Regeln

### 8.1 H1

- genau eine H1 pro Seite
- enthält das Hauptthema
- enthält Hauptkeyword oder nahe Variante
- klingt natürlich
- kein Keyword-Stuffing
- nicht identisch mit mehreren anderen Seiten

### 8.2 H2

- H2 bilden echte Hauptabschnitte.
- Jede lange Seite braucht mindestens 6 bis 10 H2.
- H2 sollen Nutzerfragen, Problemstufen, Lösungen, Kosten und Entscheidungslogik abbilden.
- Keine generischen H2 wie Einleitung, Allgemeines oder Fazit ohne Nutzen.

### 8.3 H3

- H3 differenzieren Schadensarten, Oberflächen, Methoden, Kostenfaktoren und Schritte.
- H3 werden genutzt, wenn ein H2 mehr als eine Facette hat.
- H3 helfen, lange Seiten scanbar zu machen.

### 8.4 Template-Beispiele

#### Beispiel: Parkett schleifen Zürich

```txt
H1: Parkett schleifen Zürich
H2: Wann lohnt sich das Abschleifen von Parkett?
H2: Welche Schäden lassen sich durch Schleifen beheben?
H2: Wann reicht Reinigung statt Schleifen?
H2: So läuft das Parkettschleifen ab
H2: Was kostet Parkett schleifen in Zürich?
H2: Wie lange dauert das Schleifen?
H2: Staubarm schleifen: Was realistisch ist
H2: Vorher-Nachher-Beispiele
H2: FAQ
H2: Foto senden
```

#### Beispiel: Wasserflecken im Parkett

```txt
H1: Wasserflecken im Parkett
H2: Kurzantwort
H2: Welche Art von Wasserfleck haben Sie?
H2: Was sofort tun?
H2: Was nicht tun?
H2: Wann reicht Reinigung?
H2: Wann muss geschliffen werden?
H2: Kosten
H2: Vorher-Nachher
H2: Fotoanalyse
H2: FAQ
```

#### Beispiel: Geöltes Parkett pflegen

```txt
H1: Geöltes Parkett pflegen
H2: Kurz erklärt
H2: Wie oft pflegen?
H2: Alltagsreinigung
H2: Wann nachölen?
H2: Typische Fehler
H2: Flecken und graue Stellen
H2: Pflegeplan
H2: FAQ
```

---

## 9. Problemfall-Engine

Problemfall-Seiten sind zentrale Lead-Magneten. Sie holen Nutzer ab, bevor diese die richtige Leistung kennen.

### 9.1 Pflichtfragen jeder Problemseite
- Was ist das Problem?
- Wie erkennt man es?
- Wie schlimm ist es?
- Welche Ursachen sind wahrscheinlich?
- Was sollte man sofort tun?
- Was sollte man vermeiden?
- Welche Lösungen gibt es?
- Welche Lösung passt zu welchem Schweregrad?
- Was kostet es ungefähr?
- Wann muss ein Profi prüfen?
- Kann der Schaden vollständig verschwinden?
- Wann reicht Reinigung?
- Wann ist Schleifen nötig?
- Welche Bilder soll der Nutzer für die Fotoanalyse senden?

### 9.2 Schweregrad-Matrix

| Stufe | Merkmale | mögliche Lösung | CTA |
|---|---|---|---|
| Leicht | matt, oberflächlich, nicht fühlbar, kleine Fläche | Reinigung, Pflege, Nachölen | Foto hochladen |
| Mittel | fühlbar, sichtbare Verfärbung, einzelne Dielen | lokale Reparatur, Teilflächenbehandlung | Reparatur prüfen |
| Stark | tief, schwarz, aufgequollen, mehrere Dielen | Fachprüfung, Schleifen, Austausch | Sofort prüfen lassen |

### 9.3 Lösungsmatrix

| Methode | geeignet für | nicht geeignet für | Ergebnis | Risiko |
|---|---|---|---|---|
| Reinigung | oberflächliche Verschmutzung | tiefe Schäden | frischer Look | begrenzte Wirkung bei tiefen Flecken |
| Nachölen | matte geölte Flächen | lackierte Flächen | Schutz und Sättigung | falsches Öl kann Flecken erzeugen |
| Spot Repair | einzelne Kratzer oder Flecken | grossflächige Schäden | gezielte Verbesserung | Farbunterschied möglich |
| Schleifen | tiefe Schäden, alte Oberfläche | sehr dünne Nutzschicht | starke Erneuerung | höherer Aufwand |
| Austausch | irreparable Dielen | leichte Flächenprobleme | strukturelle Lösung | Farbangleichung nötig |

---

## 10. Interaktive Module
### 10.1 Schadens-Quiz

- Schweregrad einschätzen
- Empfehlung erzeugen
- Fotoanalyse vorbereiten
- Problemfallseiten stärken

### 10.2 Kostenrechner

- Fläche erfassen
- Zustand erfassen
- Behandlung wählen
- Preisspanne ausgeben
- Anfrage qualifizieren

### 10.3 Pflegefehler-Spiel

- Nutzer aktivieren
- Fehler erklären
- Blog und Ratgeber aufwerten
- Lead nach Fehlerfall erzeugen

### 10.4 Vorher-Nachher-Slider

- Beweise liefern
- Vertrauen schaffen
- Projektfälle zeigen
- Conversion erhöhen

### 10.5 Infografik

- komplexe Entscheidungen vereinfachen
- Teilen ermöglichen
- Bildsuche unterstützen
- Ratgeber aufwerten

### 10.6 Entscheidungsbaum

- Reinigung vs. Reparatur vs. Schleifen erklären
- Unsicherheit reduzieren
- CTA personalisieren

### 10.7 Oberflächen-Test

- geölt/lackiert erkennen
- richtige Pflege empfehlen
- Fehlbehandlung vermeiden

---

## 11. Blog-Engine

Der Blog ist kein Newsbereich. Er ist ein strategischer Content-Hub für Problemfälle, Pflegefehler, saisonale Themen, Verwaltungen und Entscheidungshilfen.

### 11.1 Blog-Kategorien
- Problemfälle im Alltag
- Pflegefehler
- Saisonale Parkettpflege
- Immobilienverwaltung & Mieterwechsel
- Vorher-Nachher
- Kosten & Planung
- Material & Oberfläche
- Haustiere & Kinder
- DIY-Grenzen
- Zürich-Projekte

### 11.2 Blog-Regeln
- Jeder Artikel hat eine Suchintention.
- Jeder Artikel verlinkt auf mindestens eine Leistung.
- Jeder Artikel verlinkt auf mindestens eine Problemfall- oder Ratgeberseite.
- Jeder Artikel enthält einen CTA.
- Jeder Artikel erhält ein visuelles Element.
- Starke Blogartikel können später zu Evergreen-Seiten ausgebaut werden.

---

## 12. Interne Linkstrategie
### Cluster: Wasserflecken

- `/problemfaelle/wasserflecken-parkett`
- `/problemfaelle/parkett-quillt-auf`
- `/kosten/wasserfleck-parkett-reparatur-kosten`
- `/leistungen/parkett-reparieren-zuerich`
- `/leistungen/parkett-schleifen-zuerich`
- `/tools/fotoanalyse-parkett`
- `/faelle/wasserfleck-parkett-zuerich-seefeld`

### Cluster: Hundekratzer

- `/problemfaelle/hundekratzer-parkett`
- `/kosten/parkett-reparatur-kosten`
- `/leistungen/parkett-reparieren-zuerich`
- `/leistungen/parkett-schleifen-zuerich`
- `/ratgeber/parkettpflege-bei-haustieren`
- `/tools/fotoanalyse-parkett`
- `/faelle/hundekratzer-parkett-zuerich-wiedikon`

### Cluster: Grauer Boden

- `/problemfaelle/parkett-grau-und-stumpf`
- `/leistungen/parkett-reinigen-zuerich`
- `/leistungen/parkett-oelen-zuerich`
- `/ratgeber/geoeltes-parkett-richtig-pflegen`
- `/kosten/parkett-reinigung-kosten`
- `/tools/parkett-kostenrechner`

### Cluster: Parkett schleifen

- `/leistungen/parkett-schleifen-zuerich`
- `/kosten/parkett-schleifen-kosten`
- `/ratgeber/parkett-schleifen-oder-reinigen`
- `/ratgeber/parkett-oelen-oder-versiegeln`
- `/problemfaelle/tiefe-kratzer-parkett`
- `/problemfaelle/wasserflecken-parkett`

---

## 13. JSON-LD Strategie

| Seitentyp | Schema | Bedingungen |
|---|---|---|
| `service_page` | Service, LocalBusiness, FAQPage, BreadcrumbList | nur verwenden, wenn Inhalt sichtbar und passend ist |
| `problem_case_page` | Article, FAQPage, BreadcrumbList, optional HowTo | nur verwenden, wenn Inhalt sichtbar und passend ist |
| `cost_page` | Service, FAQPage, BreadcrumbList, WebApplication falls Rechner | nur verwenden, wenn Inhalt sichtbar und passend ist |
| `guide_page` | Article, FAQPage, optional HowTo, BreadcrumbList | nur verwenden, wenn Inhalt sichtbar und passend ist |
| `location_page` | LocalBusiness, Service, FAQPage, BreadcrumbList | nur verwenden, wenn Inhalt sichtbar und passend ist |
| `quiz_page` | WebApplication, Article, FAQPage, BreadcrumbList | nur verwenden, wenn Inhalt sichtbar und passend ist |
| `infographic_page` | Article, ImageObject, FAQPage, BreadcrumbList | nur verwenden, wenn Inhalt sichtbar und passend ist |
| `case_study` | Article, ImageObject, LocalBusiness, BreadcrumbList | nur verwenden, wenn Inhalt sichtbar und passend ist |

---

## 14. Bildstrategie

### 14.1 Bildtypen
- Hero-Bilder
- Problem-Bilder
- Vorher-Nachher-Bilder
- Detailaufnahmen
- Werkzeugbilder
- Prozessbilder
- Infografiken
- lokale Projektbilder
- Quiz-Visuals

### 14.2 Dateinamen gut
- wasserfleck-parkett-zuerich-seefeld-vorher.jpg
- wasserfleck-parkett-zuerich-seefeld-nachher.jpg
- hundekratzer-eiche-parkett-reparatur-zuerich.jpg
- parkett-schleifen-zuerich-eiche.jpg

### 14.3 Alt-Text-Regeln
- beschreiben, was sichtbar ist
- Problem und Material nennen
- Ort nur nennen, wenn wahr
- kein Keyword-Stuffing
- keine generischen Alt-Texte

---

## 15. CTA-System

| Seitentyp | Primär-CTA | Sekundär-CTA |
|---|---|---|
| Problemfall | Schaden per Foto einschätzen lassen | passende Leistung ansehen |
| Leistung | Offerte anfragen | Kosten berechnen |
| Kosten | Kosten in 60 Sekunden berechnen | Fotoanalyse starten |
| Ratgeber | Foto senden, wenn unsicher | passende Leistung ansehen |
| Standort | Parkettpflege in [Ort] anfragen | Rückruf vereinbaren |
| Fallstudie | Ähnlichen Schaden einschätzen lassen | Vorher-Nachher ansehen |
| Quiz | Auswertung erhalten | Empfehlung per Foto prüfen |

---

## 16. Quality Score

Seiten unter 85 Punkten werden nicht veröffentlicht.

| Kriterium | Punkte | Prüfung |
|---|---:|---|
| Suchintention getroffen | 15 | Beantwortet die Seite exakt die Nutzerfrage? |
| Fachliche Tiefe | 15 | Geht die Seite über oberflächliche Aussagen hinaus? |
| Strukturqualität | 10 | Sind H1/H2/H3, Tabellen, FAQ und Module sauber? |
| Lokale Relevanz | 10 | Gibt es echten Zürich-/Ortsbezug, falls relevant? |
| Conversion-Stärke | 10 | Führen CTAs sinnvoll weiter? |
| Einzigartigkeit | 10 | Hat die Seite echten Mehrwert? |
| Visueller Mehrwert | 10 | Sind Bilder, Slider, Quiz oder Infografik geplant? |
| Interne Verlinkung | 10 | Sind relevante Clusterseiten verbunden? |
| Trust & Expertise | 10 | Wirkt die Seite glaubwürdig, ehrlich und fachlich? |

---

## 17. Erste 100 Seiten

1. `/leistungen/parkett-schleifen-zuerich` — Parkett schleifen Zürich — Intent: `transactional_local` — Priorität: `very_high`
2. `/leistungen/parkett-oelen-zuerich` — Parkett ölen Zürich — Intent: `transactional_local` — Priorität: `very_high`
3. `/leistungen/parkett-reinigen-zuerich` — Parkett reinigen Zürich — Intent: `transactional_local` — Priorität: `very_high`
4. `/leistungen/parkett-reparieren-zuerich` — Parkett reparieren Zürich — Intent: `transactional_local` — Priorität: `very_high`
5. `/leistungen/parkett-versiegeln-zuerich` — Parkett versiegeln Zürich — Intent: `transactional_local` — Priorität: `high`
6. `/leistungen/parkett-auffrischen-zuerich` — Parkett auffrischen Zürich — Intent: `commercial_local` — Priorität: `high`
7. `/leistungen/parkett-polieren-zuerich` — Parkett polieren Zürich — Intent: `commercial_local` — Priorität: `medium`
8. `/leistungen/parkett-tiefenreinigung-zuerich` — Parkett Tiefenreinigung Zürich — Intent: `commercial_local` — Priorität: `high`
9. `/leistungen/parkett-spot-repair-zuerich` — Parkett Spot Repair Zürich — Intent: `commercial_local` — Priorität: `high`
10. `/leistungen/parkett-teilflaechenbehandlung-zuerich` — Parkett Teilflächenbehandlung Zürich — Intent: `commercial_local` — Priorität: `high`
11. `/leistungen/parkett-nachoelen-zuerich` — Parkett nachölen Zürich — Intent: `commercial_local` — Priorität: `high`
12. `/leistungen/parkett-pflege-immobilienverwaltung-zuerich` — Parkettpflege Immobilienverwaltung Zürich — Intent: `commercial_local` — Priorität: `very_high`
13. `/problemfaelle/wasserflecken-parkett` — Wasserflecken Parkett entfernen — Intent: `problem_solution` — Priorität: `very_high`
14. `/problemfaelle/hundekratzer-parkett` — Hundekratzer Parkett reparieren — Intent: `problem_solution` — Priorität: `very_high`
15. `/problemfaelle/schwarze-flecken-parkett` — Schwarze Flecken Parkett — Intent: `problem_solution` — Priorität: `very_high`
16. `/problemfaelle/parkett-grau-und-stumpf` — Parkett grau und stumpf — Intent: `problem_solution` — Priorität: `very_high`
17. `/problemfaelle/parkett-quillt-auf` — Parkett quillt auf — Intent: `urgent_problem` — Priorität: `very_high`
18. `/problemfaelle/parkett-nach-falscher-reinigung` — Parkett falsch gereinigt — Intent: `problem_solution` — Priorität: `high`
19. `/problemfaelle/tiefe-kratzer-parkett` — Tiefe Kratzer Parkett — Intent: `problem_solution` — Priorität: `very_high`
20. `/problemfaelle/laufstrassen-parkett` — Laufstrassen Parkett entfernen — Intent: `problem_solution` — Priorität: `high`
21. `/problemfaelle/rotweinfleck-parkett` — Rotweinfleck Parkett entfernen — Intent: `problem_solution` — Priorität: `medium`
22. `/problemfaelle/brandfleck-parkett` — Brandfleck Parkett reparieren — Intent: `problem_solution` — Priorität: `medium`
23. `/problemfaelle/moebelspuren-parkett` — Möbelspuren Parkett entfernen — Intent: `problem_solution` — Priorität: `medium`
24. `/problemfaelle/parkett-klebrig` — Parkett klebrig nach Reinigung — Intent: `problem_solution` — Priorität: `high`
25. `/problemfaelle/fugen-im-parkett-offen` — Fugen im Parkett offen — Intent: `problem_solution` — Priorität: `medium`
26. `/problemfaelle/parkett-vergilbt` — Parkett vergilbt — Intent: `informational_commercial` — Priorität: `medium`
27. `/problemfaelle/parkett-unter-teppich-verfaerbt` — Parkett unter Teppich verfärbt — Intent: `problem_solution` — Priorität: `medium`
28. `/problemfaelle/blumentopf-wasserfleck-parkett` — Blumentopf Wasserfleck Parkett — Intent: `problem_solution` — Priorität: `high`
29. `/problemfaelle/urin-fleck-parkett` — Urin Fleck Parkett entfernen — Intent: `problem_solution` — Priorität: `medium`
30. `/problemfaelle/parkett-lack-abgenutzt` — Parkett Lack abgenutzt — Intent: `commercial` — Priorität: `high`
31. `/problemfaelle/parkett-oel-ausgelaugt` — Geöltes Parkett ausgelaugt — Intent: `commercial` — Priorität: `high`
32. `/problemfaelle/parkett-nach-mieterwechsel` — Parkett nach Mieterwechsel — Intent: `commercial_local` — Priorität: `very_high`
33. `/kosten/parkett-schleifen-kosten` — Parkett schleifen Kosten — Intent: `commercial` — Priorität: `very_high`
34. `/kosten/parkett-oelen-kosten` — Parkett ölen Kosten — Intent: `commercial` — Priorität: `high`
35. `/kosten/parkett-reparatur-kosten` — Parkett Reparatur Kosten — Intent: `commercial` — Priorität: `very_high`
36. `/kosten/parkett-reinigung-kosten` — Parkett Reinigung Kosten — Intent: `commercial` — Priorität: `high`
37. `/kosten/parkett-versiegeln-kosten` — Parkett versiegeln Kosten — Intent: `commercial` — Priorität: `high`
38. `/kosten/parkett-auffrischen-kosten` — Parkett auffrischen Kosten — Intent: `commercial` — Priorität: `high`
39. `/kosten/wasserfleck-parkett-reparatur-kosten` — Wasserfleck Parkett Reparatur Kosten — Intent: `commercial` — Priorität: `high`
40. `/kosten/hundekratzer-parkett-reparatur-kosten` — Hundekratzer Parkett Reparatur Kosten — Intent: `commercial` — Priorität: `high`
41. `/kosten/parkettpflege-wohnung-kosten` — Parkettpflege Wohnung Kosten — Intent: `commercial` — Priorität: `medium`
42. `/kosten/parkettpflege-haus-kosten` — Parkettpflege Haus Kosten — Intent: `commercial` — Priorität: `medium`
43. `/ratgeber/geoeltes-parkett-richtig-pflegen` — Geöltes Parkett richtig pflegen — Intent: `informational` — Priorität: `high`
44. `/ratgeber/lackiertes-parkett-pflegen` — Lackiertes Parkett pflegen — Intent: `informational` — Priorität: `high`
45. `/ratgeber/parkett-oelen-oder-versiegeln` — Parkett ölen oder versiegeln — Intent: `comparison` — Priorität: `very_high`
46. `/ratgeber/parkett-schleifen-oder-reinigen` — Parkett schleifen oder reinigen — Intent: `comparison` — Priorität: `very_high`
47. `/ratgeber/dampfreiniger-auf-parkett` — Dampfreiniger auf Parkett — Intent: `informational` — Priorität: `high`
48. `/ratgeber/parkett-nass-wischen` — Parkett nass wischen — Intent: `informational` — Priorität: `high`
49. `/ratgeber/parkettpflege-im-winter` — Parkettpflege im Winter — Intent: `informational` — Priorität: `medium`
50. `/ratgeber/parkettpflege-nach-heizperiode` — Parkettpflege nach Heizperiode — Intent: `informational` — Priorität: `medium`
51. `/ratgeber/parkettpflege-bei-haustieren` — Parkettpflege bei Haustieren — Intent: `informational_commercial` — Priorität: `high`
52. `/ratgeber/parkettpflege-bei-kindern` — Parkettpflege bei Kindern — Intent: `informational` — Priorität: `medium`
53. `/ratgeber/parkett-vor-wohnungsuebergabe` — Parkett vor Wohnungsübergabe — Intent: `commercial` — Priorität: `very_high`
54. `/ratgeber/parkett-gepflegt-verkauf-immobilie` — Parkettpflege vor Immobilienverkauf — Intent: `commercial` — Priorität: `high`
55. `/tools/fotoanalyse-parkett` — Parkett Fotoanalyse — Intent: `lead_generation` — Priorität: `very_high`
56. `/tools/parkett-kostenrechner` — Parkett Kostenrechner — Intent: `commercial_tool` — Priorität: `very_high`
57. `/quiz/muss-mein-parkett-geschliffen-werden` — Muss mein Parkett geschliffen werden — Intent: `diagnostic` — Priorität: `very_high`
58. `/quiz/welche-parkettpflege-brauche-ich` — Welche Parkettpflege brauche ich — Intent: `diagnostic` — Priorität: `high`
59. `/quiz/ist-mein-parkett-geoelt-oder-lackiert` — Ist mein Parkett geölt oder lackiert — Intent: `diagnostic` — Priorität: `high`
60. `/tools/parkett-schaden-check` — Parkett Schaden Check — Intent: `diagnostic` — Priorität: `high`
61. `/tools/parkett-pflegeplan-generator` — Parkett Pflegeplan Generator — Intent: `engagement` — Priorität: `medium`
62. `/zuerich/parkettpflege-zuerich` — Parkettpflege Zürich — Intent: `local_transactional` — Priorität: `high`
63. `/zuerich/parkettpflege-winterthur` — Parkettpflege Winterthur — Intent: `local_transactional` — Priorität: `high`
64. `/zuerich/parkettpflege-uster` — Parkettpflege Uster — Intent: `local_transactional` — Priorität: `high`
65. `/zuerich/parkettpflege-duebendorf` — Parkettpflege Dübendorf — Intent: `local_transactional` — Priorität: `high`
66. `/zuerich/parkettpflege-schlieren` — Parkettpflege Schlieren — Intent: `local_transactional` — Priorität: `high`
67. `/zuerich/parkettpflege-dietikon` — Parkettpflege Dietikon — Intent: `local_transactional` — Priorität: `high`
68. `/zuerich/parkettpflege-horgen` — Parkettpflege Horgen — Intent: `local_transactional` — Priorität: `high`
69. `/zuerich/parkettpflege-meilen` — Parkettpflege Meilen — Intent: `local_transactional` — Priorität: `high`
70. `/zuerich/parkettpflege-kuesnacht` — Parkettpflege Küsnacht — Intent: `local_transactional` — Priorität: `high`
71. `/zuerich/parkettpflege-zollikon` — Parkettpflege Zollikon — Intent: `local_transactional` — Priorität: `high`
72. `/zuerich/parkettpflege-adliswil` — Parkettpflege Adliswil — Intent: `local_transactional` — Priorität: `high`
73. `/zuerich/parkettpflege-thalwil` — Parkettpflege Thalwil — Intent: `local_transactional` — Priorität: `high`
74. `/zuerich/parkettpflege-wallisellen` — Parkettpflege Wallisellen — Intent: `local_transactional` — Priorität: `high`
75. `/zuerich/parkettpflege-opfikon` — Parkettpflege Opfikon — Intent: `local_transactional` — Priorität: `high`
76. `/zuerich/parkettpflege-kloten` — Parkettpflege Kloten — Intent: `local_transactional` — Priorität: `high`
77. `/zuerich/parkettpflege-regensdorf` — Parkettpflege Regensdorf — Intent: `local_transactional` — Priorität: `high`
78. `/zuerich/parkettpflege-buelach` — Parkettpflege Bülach — Intent: `local_transactional` — Priorität: `high`
79. `/zuerich/parkettpflege-waedenswil` — Parkettpflege Wädenswil — Intent: `local_transactional` — Priorität: `high`
80. `/zuerich/parkettpflege-richterswil` — Parkettpflege Richterswil — Intent: `local_transactional` — Priorität: `high`
81. `/zuerich/parkettpflege-staefa` — Parkettpflege Stäfa — Intent: `local_transactional` — Priorität: `high`
82. `/zuerich/parkettpflege-maennedorf` — Parkettpflege Männedorf — Intent: `local_transactional` — Priorität: `high`
83. `/zuerich/parkettpflege-rueschlikon` — Parkettpflege Rüschlikon — Intent: `local_transactional` — Priorität: `high`
84. `/zuerich/parkettpflege-kilchberg` — Parkettpflege Kilchberg — Intent: `local_transactional` — Priorität: `high`
85. `/zuerich/parkettpflege-erlenbach` — Parkettpflege Erlenbach — Intent: `local_transactional` — Priorität: `high`
86. `/zuerich/parkettpflege-herrliberg` — Parkettpflege Herrliberg — Intent: `local_transactional` — Priorität: `high`
87. `/faelle/wasserfleck-parkett-zuerich-seefeld` — Wasserfleck Parkett Zürich-Seefeld — Intent: `proof_commercial` — Priorität: `high`
88. `/faelle/hundekratzer-parkett-zuerich-wiedikon` — Hundekratzer Parkett Zürich-Wiedikon — Intent: `proof_commercial` — Priorität: `high`
89. `/faelle/laufstrasse-parkett-zuerich-enge` — Laufstrasse Parkett Zürich-Enge — Intent: `proof_commercial` — Priorität: `medium`
90. `/faelle/graues-parkett-zuerich-altstetten` — Graues Parkett Zürich-Altstetten — Intent: `proof_commercial` — Priorität: `medium`
91. `/faelle/parkett-mieterwechsel-zuerich-oerlikon` — Parkett Mieterwechsel Zürich-Oerlikon — Intent: `proof_commercial` — Priorität: `high`

---

## 18. 90-Tage-Roadmap
### Phase 1: Fundament
- SEO_CONTENT_ENGINE.md V5 finalisieren
- seo-content-engine.json V5 finalisieren
- Kategorien im Projekt anlegen
- Tag-System als kontrollierte Taxonomie anlegen
- Seitentypen und Templates definieren
- Breadcrumbs vorbereiten
- Sitemap-Struktur vorbereiten

### Phase 2: Geldseiten
- Parkett schleifen Zürich
- Parkett ölen Zürich
- Parkett reinigen Zürich
- Parkett reparieren Zürich
- Parkett versiegeln Zürich
- Parkettpflege Zürich

### Phase 3: Problemfälle
- Wasserflecken
- Hundekratzer
- schwarze Flecken
- grauer Boden
- aufgequollenes Parkett
- falsche Reinigung
- tiefe Kratzer
- Laufstrassen

### Phase 4: Tools
- Fotoanalyse
- Kostenrechner
- Schadens-Quiz
- Oberflächen-Test
- Pflegefehler-Spiel
- Vorher-Nachher-System

### Phase 5: Lokale Dominanz
- Zürich-Hauptseite
- Winterthur
- Uster
- Dübendorf
- Horgen
- Meilen
- Küsnacht
- Zollikon
- Thalwil
- Adliswil

### Phase 6: Skalierung
- monatlich 4 Problemartikel
- monatlich 2 Ratgeber
- monatlich 2 Fallstudien
- quartalsweise 1 Infografik
- monatliche Search-Console-Auswertung

---

## 19. Schlussregel

Jede neue Seite auf parkett-pflege.ch muss gegen diese Datei geprüft werden. Eine Seite ohne klare Suchintention, ohne H2/H3-Struktur, ohne Mehrwert, ohne interne Links, ohne CTA, ohne Bildanforderungen und ohne Quality Score wird nicht veröffentlicht.

Das Ziel ist nicht, möglichst viele Seiten zu erzeugen. Das Ziel ist, die beste thematische und lokale Parkettpflege-Ressource im Raum Zürich aufzubauen.