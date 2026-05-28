Bitte erweitere jetzt den SEO-Engine-Admin um einen echten Content-Brief-Workflow.

Ausgangslage:
Die SEO-Engine V5 ist bereits eingebunden. Die Daten kommen aus:

```txt
docs/SEO_CONTENT_ENGINE.md
config/seo-content-engine.json
```

Der Admin-Bereich existiert unter:

```txt
/admin/seo-engine
```

Jetzt möchte ich aus Seitenideen konkrete Content-Briefs erzeugen, prüfen, bearbeiten und später freigeben können.

Bitte baue folgendes:

## 1. Content-Brief-Datenmodell

Erstelle oder erweitere:

```txt
types/seo-engine.ts
lib/seo-content-briefs.ts
data/seo-content-briefs/
```

Ein Content Brief soll enthalten:

```ts
type SeoContentBrief = {
  id: string
  slug: string
  title?: string
  metaDescription?: string
  h1?: string
  contentType: string
  category: string
  subCategory?: string
  tags: string[]
  primaryKeyword?: string
  secondaryKeywords?: string[]
  searchIntent?: string
  targetAudience?: string[]
  funnelStage?: string
  priority?: string
  status:
    | "draft"
    | "planned"
    | "in_progress"
    | "review"
    | "approved"
    | "published"
    | "needs_update"
    | "archived"
  outline: {
    level: "h2" | "h3" | "h4"
    title: string
    purpose?: string
    children?: any[]
  }[]
  contentModules: string[]
  interactiveElement?: {
    type: string
    placement?: string
    purpose?: string
  }
  faq: {
    question: string
    answer?: string
  }[]
  internalLinks: {
    anchorText: string
    targetSlug: string
    reason?: string
  }[]
  imageRequirements: {
    type: string
    description: string
    altText?: string
  }[]
  jsonLdSchemas: string[]
  ctaBlocks: {
    type: string
    headline?: string
    text?: string
    buttonText?: string
  }[]
  qualityScore?: {
    total?: number
    criteria?: Record<string, number>
    notes?: string[]
  }
  notes?: string
  createdAt: string
  updatedAt: string
}
```

## 2. Brief aus Page Idea erzeugen

Auf `/admin/seo-engine/page-ideas` soll bei jeder Seitenidee ein Button erscheinen:

```txt
Brief erstellen
```

Dieser Button soll aus dem Slug und den Regeln der SEO-Engine einen ersten Brief erzeugen.

Ableitungen:

* `/problemfaelle/*` → problem_case_page
* `/leistungen/*` → service_page
* `/kosten/*` → cost_page
* `/ratgeber/*` → guide_page
* `/zuerich/*` → location_page
* `/quiz/*` → quiz_page
* `/tools/*` → tool_page
* `/faelle/*` → case_study
* `/blog/*` → blog_article

## 3. Brief-Detailseite

Erstelle:

```txt
/admin/seo-engine/briefs/[id]
```

Dort anzeigen:

* Slug
* Status
* Kategorie
* Content Type
* Hauptkeyword
* Title
* Meta Description
* H1
* Outline
* Module
* FAQ
* interne Links
* Bilder
* JSON-LD
* CTAs
* Quality Score
* Notizen

Wenn einfache Bearbeitung möglich ist, Felder editierbar machen. Sonst zunächst read-only mit klarer Struktur.

## 4. Quality Score berechnen

Erstelle:

```txt
lib/seo-quality-score.ts
```

Funktion:

```ts
calculateSeoQualityScore(brief, config)
```

Bewerte:

* Suchintention
* Struktur
* Content-Tiefe
* lokale Relevanz
* interne Links
* visuelle Anforderungen
* CTA
* JSON-LD
* Einzigartigkeit
* Trust

Gib zurück:

```ts
{
  total: number
  criteria: Record<string, number>
  warnings: string[]
  recommendations: string[]
}
```

## 5. Brief-Liste

Auf `/admin/seo-engine/briefs` anzeigen:

* alle Briefs
* Status
* Quality Score
* Kategorie
* Content Type
* Suche
* Filter
* Sortierung
* Link zur Detailseite

## 6. Nächste Stufe vorbereiten

Bitte noch keine echten SEO-Texte automatisch veröffentlichen.

Nur Briefs erzeugen, bewerten, prüfen und verwalten.

Akzeptanzkriterien:

* Briefs können aus Page Ideas erzeugt werden
* Briefs sind im Admin sichtbar
* Quality Score wird berechnet
* Brief-Detailseite funktioniert
* keine öffentlichen Seiten werden automatisch veröffentlicht
* Build läuft sauber
