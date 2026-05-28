Du arbeitest im bestehenden Next.js-Projekt für `parkett-pflege.ch`.

Wichtigste Projektregel:
Die Marke und Domain heissen immer exakt `parkett-pflege.ch`. Verwende niemals `parkettpflege.ch`, ausser wenn du bewusst eine alte falsche Schreibweise korrigierst.

## Projektziel

`parkett-pflege.ch` soll zur stärksten Website und SEO-Plattform für Parkettpflege, Parkettreparatur und Parkettrenovation im Raum Zürich werden.

Die Website soll nicht nur eine schöne Landingpage sein, sondern ein skalierbares System für:

* lokale SEO-Seiten
* Leistungsseiten
* Problemfall-Seiten
* Kosten-Seiten
* Ratgeber
* Blogartikel
* Vorher-Nachher-Fälle
* Quiz
* Spiele
* Infografiken
* Fotoanalyse
* Kostenrechner
* interne Linkcluster
* JSON-LD Schema
* Quality Score
* Admin-Verwaltung

## Vorhandene zentrale Dateien

Diese Dateien sind die verbindliche Grundlage:

```txt
docs/SEO_CONTENT_ENGINE.md
config/seo-content-engine.json
```

Beide Dateien laufen parallel:

```txt
docs/SEO_CONTENT_ENGINE.md
= menschlich lesbare Strategie, Regeln, SEO-Handbuch und operative Dokumentation

config/seo-content-engine.json
= maschinenlesbare Konfiguration für Admin, Agenten, Content-Briefs und spätere Automatisierung
```

Keine dieser Dateien darf gekürzt oder inhaltlich vereinfacht werden, ausser ich fordere es ausdrücklich.

## Grundsatz für alle Arbeiten

Arbeite nicht oberflächlich und nicht minimalistisch. Wenn ein Bereich geplant, modelliert oder implementiert wird, soll er stabil, erweiterbar, nachvollziehbar und produktionsnah sein.

Keine Kurzlösungen, keine Platzhalter ohne klare Markierung, keine stillen Annahmen.

Wenn du eine Struktur anlegst, dann so, dass sie später wachsen kann.

## SEOContentAgent-Prinzip

Der SEOContentAgent ist kein reiner Textgenerator. Er ist ein Seitenarchitekt.

Er soll niemals nur diese Felder erzeugen:

```txt
Slug
Title
Meta Description
H1
Text
FAQ
```

Er muss vollständige Seitenkonzepte erzeugen:

```txt
contentType
category
subCategory
tags
primaryKeyword
secondaryKeywords
searchIntent
targetAudience
funnelStage
slug
canonicalUrl
title
metaDescription
h1
h2H3Outline
contentModules
interactiveElement
faq
internalLinks
imageRequirements
infographicRequirements
jsonLdSchemas
ctaBlocks
localSeoSignals
trustSignals
qualityScore
reviewChecklist
publishingPriority
updateFrequency
status
notes
```

## Qualitätsschwelle

Keine SEO-Seite soll veröffentlicht werden, wenn sie nicht mindestens diese Anforderungen erfüllt:

* klare Suchintention
* korrekter Seitentyp
* passende Kategorie
* kontrollierte Tags
* eine H1
* sinnvolle H2/H3-Struktur
* konkrete Problemlösung
* interne Links
* passender CTA
* Bildanforderungen
* JSON-LD-Strategie
* Quality Score
* fachliche Prüfung
* keine generischen Texte
* keine Doorway-Seiten
* keine duplizierten Ortsseiten ohne echten lokalen Mehrwert

## Admin-Ziel

Ich möchte die SEO-Engine im Admin sehen, verfolgen und später bearbeiten können.

Der Admin soll nicht nur eine JSON-Datei anzeigen. Er soll eine echte Steuerzentrale werden für:

* Überblick
* Kategorien
* Content Types
* Tags
* Problemfälle
* Leistungsseiten
* Kosten-Seiten
* Zürich-Seiten
* Blog
* Quiz
* Spiele
* Infografiken
* Vorher-Nachher-Fälle
* interne Links
* JSON-LD
* Quality Score
* Roadmap
* Seitenideen
* Content-Briefs
* Status
* Notizen
* Review
* Veröffentlichung

## Wichtige Architekturregel

Nicht sofort automatisch alle SEO-Seiten öffentlich generieren.

Zuerst bauen:

```txt
Planung → Admin → Status → Briefs → Review → Freigabe → Veröffentlichung
```

Öffentliche SEO-Seiten dürfen erst später aus freigegebenen Content-Briefs entstehen.

## Umsetzung in Next.js

Arbeite sauber mit:

* TypeScript
* App Router
* Server Components, wo sinnvoll
* Client Components nur für interaktive Admin-Funktionen
* klarer Ordnerstruktur
* wiederverwendbaren Komponenten
* robusten Loadern
* Fallbacks, wenn JSON-Felder fehlen
* lesbaren Typen
* möglichst wenig doppelter Logik

## Erwartete Ordnerstruktur

Falls noch nicht vorhanden, bereite diese Struktur vor:

```txt
docs/
  SEO_CONTENT_ENGINE.md
  AGENT_INSTRUCTIONS.md

config/
  seo-content-engine.json

types/
  seo-engine.ts

lib/
  seo-engine.ts
  seo-content-status.ts
  seo-content-briefs.ts
  seo-quality-score.ts
  seo-jsonld-rules.ts
  seo-internal-linking.ts

data/
  seo-content-status.json
  seo-content-briefs/

app/
  admin/
    seo-engine/
      page.tsx
      overview/
      categories/
      content-types/
      tags/
      problemfaelle/
      leistungen/
      kosten/
      ratgeber/
      zuerich/
      blog/
      interactive/
      internal-links/
      json-ld/
      quality-score/
      roadmap/
      page-ideas/
      briefs/
      docs/

components/
  admin/
    seo-engine/
      SeoEngineShell.tsx
      SeoEngineNav.tsx
      SeoEngineOverviewCards.tsx
      SeoCategoryTable.tsx
      SeoContentTypeTable.tsx
      SeoTagExplorer.tsx
      SeoProblemCaseExplorer.tsx
      SeoInteractiveModuleExplorer.tsx
      SeoInternalLinkExplorer.tsx
      SeoJsonLdExplorer.tsx
      SeoQualityScoreDashboard.tsx
      SeoRoadmapTable.tsx
      SeoPageIdeasTable.tsx
      SeoDocsViewer.tsx
      SeoBriefPreview.tsx
      SeoStatusBadge.tsx
      SeoFilterBar.tsx
```

## Build-Regel

Nach grösseren Änderungen immer prüfen:

```bash
npm run build
```

Falls das Projekt noch keinen stabilen Build hat:

```bash
npm run lint
npm run typecheck
```

oder vorhandene Scripts aus `package.json` verwenden.

## Arbeitsweise

Arbeite schrittweise:

1. vorhandene Projektstruktur prüfen
2. Dateien lesen
3. Datentypen definieren
4. Loader bauen
5. Admin-Grundstruktur bauen
6. Übersichtsseite bauen
7. Detailseiten bauen
8. Status-System vorbereiten
9. Build prüfen
10. Ergebnis mit geänderten Dateien zusammenfassen

Vor jeder grösseren strukturellen Änderung kurz prüfen, ob bestehende Komponenten, Styles oder Admin-Strukturen bereits existieren und wiederverwendet werden können.

Nichts löschen, was nicht eindeutig veraltet oder falsch ist. Bei Unsicherheit erst kommentieren oder separat neue Struktur anlegen.
