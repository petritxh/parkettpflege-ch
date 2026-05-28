import { getCMSData, getCases } from './data-service';
import { getRecommendedProducts } from './products';

// Brand spelling check helper
export function enforceBrandSpelling(text: string): string {
  if (!text) return text;
  // Replaces bad variations like parkettpflege.ch or Parkettpflege.ch with parkett-pflege.ch or Parkett-Pflege.ch
  // Also keeps standard casing intact
  return text
    .replace(/parkettpflege\.ch/gi, 'parkett-pflege.ch')
    .replace(/Parkettpflege/g, 'Parkett-Pflege')
    .replace(/parkettpflege/g, 'parkett-pflege');
}

// 1. SERVICES MAPPING
const serviceMapping: { [key: string]: string } = {
  'parkett-schleifen': 'parkett-schleifen',
  'parkett-schleifen-zuerich': 'parkett-schleifen',
  'parkett-oelen': 'parkett-oelen',
  'parkett-oelen-zuerich': 'parkett-oelen',
  'parkett-nachoelen-zuerich': 'parkett-oelen',
  'parkettreinigung': 'parkettreinigung',
  'parkett-reinigen-zuerich': 'parkettreinigung',
  'parkett-tiefenreinigung-zuerich': 'parkettreinigung',
  'parkett-reparieren-zuerich': 'parkett-reparatur',
  'parkett-reparatur': 'parkett-reparatur',
  'parkett-spot-repair-zuerich': 'parkett-reparatur',
  'parkett-teilflaechenbehandlung-zuerich': 'parkett-reparatur',
  'parkett-versiegeln-zuerich': 'parkett-versiegeln',
  'parkett-versiegeln': 'parkett-versiegeln',
  'parkettpflege': 'parkettpflege',
  'parkett-auffrischen-zuerich': 'parkettpflege',
  'parkett-polieren-zuerich': 'parkettpflege',
  'parkett-pflege-immobilienverwaltung-zuerich': 'parkettpflege'
};

export async function getServicePageData(slug: string) {
  const baseSlug = serviceMapping[slug] || slug;
  const services = await getCMSData('services');
  const service = services.find(s => s.slug === baseSlug);
  if (!service) return null;

  // Enforce brand spelling
  return {
    ...service,
    h1: enforceBrandSpelling(service.h1),
    intro: enforceBrandSpelling(service.intro),
    metaTitle: enforceBrandSpelling(service.metaTitle),
    metaDescription: enforceBrandSpelling(service.metaDescription),
    contentMarkdown: enforceBrandSpelling(service.contentMarkdown || '')
  };
}

// 2. PROBLEMS MAPPING
const problemMapping: { [key: string]: string } = {
  'wasserflecken-parkett': 'wasserflecken-parkett',
  'hundekratzer-parkett': 'hundekratzer-aus-parkett-entfernen',
  'schwarze-flecken-parkett': 'dunkle-wasserflecken-auf-eichenparkett',
  'parkett-grau-und-stumpf': 'parkettboden-verliert-glanz',
  'parkett-quillt-auf': 'wasserflecken-parkett',
  'parkett-nach-falscher-reinigung': 'parkett-richtig-reinigen-ohne-streifen',
  'tiefe-kratzer-parkett': 'kratzer-im-parkett',
  'laufstrassen-parkett': 'parkettboden-verliert-glanz',
  'rotweinfleck-parkett': 'wasserflecken-parkett',
  'brandfleck-parkett': 'brandfleck-auf-parkett-reparieren',
  'moebelspuren-parkett': 'dellen-im-parkett-ausbessern',
  'parkett-klebrig': 'parkett-richtig-reinigen-ohne-streifen',
  'fugen-im-parkett-offen': 'parkettfugen-füllen-und-ausbessern',
  'parkett-vergilbt': 'sonneneinstrahlung-parkett-ausgeblichen',
  'parkett-unter-teppich-verfaerbt': 'sonneneinstrahlung-parkett-ausgeblichen',
  'blumentopf-wasserfleck-parkett': 'dunkle-wasserflecken-auf-eichenparkett',
  'urin-fleck-parkett': 'katzenurin-aus-parkett-entfernen',
  'parkett-lack-abgenutzt': 'versiegeltes-parkett-reparieren',
  'parkett-oel-ausgelaugt': 'geöltes-parkett-nachölen-anleitung',
  'parkett-nach-mieterwechsel': 'parkettpflege-kosten'
};

export async function getProblemPageData(slug: string) {
  const baseSlug = problemMapping[slug] || slug;
  const problems = await getCMSData('problems');
  const problem = problems.find(p => p.slug === baseSlug);
  if (!problem) return null;

  return {
    ...problem,
    h1: enforceBrandSpelling(problem.h1),
    intro: enforceBrandSpelling(problem.intro),
    metaTitle: enforceBrandSpelling(problem.metaTitle),
    metaDescription: enforceBrandSpelling(problem.metaDescription),
    contentMarkdown: enforceBrandSpelling(problem.contentMarkdown || '')
  };
}

// 3. COSTS MAPPING
const costMapping: { [key: string]: string } = {
  'parkett-schleifen-kosten': 'parkett-schleifen',
  'parkett-oelen-kosten': 'parkett-oelen',
  'parkett-reparatur-kosten': 'parkett-reparatur',
  'parkett-reinigung-kosten': 'parkettreinigung',
  'parkett-versiegeln-kosten': 'parkett-versiegeln',
  'parkett-auffrischen-kosten': 'parkettpflege',
  'wasserfleck-parkett-reparatur-kosten': 'parkett-reparatur',
  'hundekratzer-parkett-reparatur-kosten': 'parkett-reparatur',
  'parkettpflege-wohnung-kosten': 'parkettpflege',
  'parkettpflege-haus-kosten': 'parkettpflege'
};

const priceRanges: { [key: string]: { min: number; max: number; unit: string; factors: string[] } } = {
  'parkett-schleifen': {
    min: 35,
    max: 55,
    unit: 'm²',
    factors: ['Holzart & Härtegrad', 'Tiefe der Kratzer & Dellen', 'Anzahl der Schleifgänge (grob bis fein)', 'Gewünschte Endbehandlung (Öl/Versiegelung)']
  },
  'parkett-oelen': {
    min: 15,
    max: 25,
    unit: 'm²',
    factors: ['Holzart & Saugfähigkeit', 'Anzahl der Ölschichten', 'Eingesetztes Pflegeöl (natur/weiss)', 'Vorbereitungsaufwand']
  },
  'parkett-reparatur': {
    min: 150,
    max: 450,
    unit: 'Stelle',
    factors: ['Art des Schadens (Riss, Delle, Fleck)', 'Tiefe & Ausdehnung', 'Oberflächenart (geölt/lackiert)', 'Materialaufwand (Wachse, Retusche)']
  },
  'parkettreinigung': {
    min: 10,
    max: 18,
    unit: 'm²',
    factors: ['Verschmutzungsgrad', 'Alte Seifen- & Pflegeschichten', 'Erreichbarkeit der Flächen', 'Nachbehandlungspflicht']
  },
  'parkett-versiegeln': {
    min: 20,
    max: 35,
    unit: 'm²',
    factors: ['Lackart (1K oder 2K Wasserlack)', 'Glanzgrad (matt, seidenmatt, glänzend)', 'Anzahl der Lackschichten', 'Trocknungszeiten']
  },
  'parkettpflege': {
    min: 8,
    max: 15,
    unit: 'm²',
    factors: ['Bodenart (geölt, versiegelt)', 'Regelmässigkeit der Pflege', 'Möblierungsgrad', 'Pflegeprodukt (Refresher, Polish)']
  }
};

export async function getCostPageData(slug: string) {
  const baseSlug = costMapping[slug];
  if (!baseSlug) return null;

  const services = await getCMSData('services');
  const service = services.find(s => s.slug === baseSlug);
  if (!service) return null;

  const prices = priceRanges[baseSlug] || { min: 20, max: 40, unit: 'm²', factors: ['Flächengrösse', 'Zustand des Parketts'] };

  return {
    slug,
    baseSlug,
    serviceTitle: service.h1,
    metaTitle: enforceBrandSpelling(`Kosten für ${service.h1} | Preistabelle & Rechner`),
    metaDescription: enforceBrandSpelling(`Erfahren Sie alle Details zu den Kosten für ${service.h1}. Transparente Preise von CHF ${prices.min} bis ${prices.max} pro ${prices.unit} und Rechenbeispiele.`),
    prices,
    service,
    factors: prices.factors
  };
}

// 4. RATGEBER MAPPING
const ratgeberMapping: { [key: string]: string } = {
  'geoeltes-parkett-richtig-pflegen': 'geöltes-parkett-nachölen-anleitung',
  'lackiertes-parkett-pflegen': 'versiegeltes-parkett-reparieren',
  'parkett-oelen-oder-versiegeln': 'parkett-richtig-reinigen-ohne-streifen',
  'parkett-schleifen-oder-reinigen': 'parkettboden-verliert-glanz',
  'dampfreiniger-auf-parkett': 'parkett-richtig-reinigen-ohne-streifen',
  'parkett-nass-wischen': 'parkettboden-richtig-wischen',
  'parkettpflege-im-winter': 'parkettboden-im-bad-pflegen',
  'parkettpflege-nach-heizperiode': 'parkettfugen-füllen-und-ausbessern',
  'parkettpflege-bei-haustieren': 'hundekratzer-aus-parkett-entfernen',
  'parkettpflege-bei-kindern': 'dellen-im-parkett-ausbessern',
  'parkett-vor-wohnungsuebergabe': 'parkettpflege-kosten',
  'parkett-gepflegt-verkauf-immobilie': 'parkettpflege-kosten'
};

export async function getRatgeberPageData(slug: string) {
  const baseSlug = ratgeberMapping[slug];
  if (!baseSlug) return null;

  const problems = await getCMSData('problems');
  const problem = problems.find(p => p.slug === baseSlug);
  if (!problem) return null;

  // Fetch recommended WOCA products based on slug
  let damageType = 'keine';
  if (slug.includes('kratzer') || slug.includes('tier')) damageType = 'fein';
  else if (slug.includes('wasser') || slug.includes('heizperiod')) damageType = 'wasser';
  else if (slug.includes('winter') || slug.includes('reinigung') || slug.includes('wischen')) damageType = 'laufstrassen';

  const products = getRecommendedProducts('alle', damageType);

  return {
    slug,
    baseSlug,
    h1: enforceBrandSpelling(problem.h1),
    metaTitle: enforceBrandSpelling(`Ratgeber: ${problem.metaTitle}`),
    metaDescription: enforceBrandSpelling(problem.metaDescription),
    intro: enforceBrandSpelling(problem.intro),
    contentMarkdown: enforceBrandSpelling(problem.contentMarkdown || ''),
    faqs: problem.faqs,
    benefits: problem.benefits,
    processSteps: problem.processSteps,
    products
  };
}

// 5. REGIONAL ZÜRICH MUNICIPAL MAPPING
const municipalityCapitalization: { [key: string]: string } = {
  'zuerich': 'Zürich',
  'winterthur': 'Winterthur',
  'uster': 'Uster',
  'duebendorf': 'Dübendorf',
  'schlieren': 'Schlieren',
  'dietikon': 'Dietikon',
  'horgen': 'Horgen',
  'meilen': 'Meilen',
  'kuesnacht': 'Küsnacht',
  'zollikon': 'Zollikon',
  'adliswil': 'Adliswil',
  'thalwil': 'Thalwil'
};

export async function getRegionalPageData(slug: string) {
  // Determine municipality name
  let mKey = 'zuerich';
  let isSpecialService = false;
  let serviceName = '';
  
  if (slug.includes('winterthur')) mKey = 'winterthur';
  else if (slug.includes('uster')) mKey = 'uster';
  else if (slug.includes('duebendorf')) mKey = 'duebendorf';
  else if (slug.includes('schlieren')) mKey = 'schlieren';
  else if (slug.includes('dietikon')) mKey = 'dietikon';
  else if (slug.includes('horgen')) mKey = 'horgen';
  else if (slug.includes('meilen')) mKey = 'meilen';
  else if (slug.includes('kuesnacht')) mKey = 'kuesnacht';
  else if (slug.includes('zollikon')) mKey = 'zollikon';
  else if (slug.includes('adliswil')) mKey = 'adliswil';
  else if (slug.includes('thalwil')) mKey = 'thalwil';
  
  const name = municipalityCapitalization[mKey] || 'Zürich';

  if (slug.includes('schleifen')) {
    isSpecialService = true;
    serviceName = 'schleifen';
  } else if (slug.includes('reparieren')) {
    isSpecialService = true;
    serviceName = 'reparieren';
  }

  const locations = await getCMSData('locations');
  const rawLocation = locations.find(l => l.slug === 'zuerich');
  if (!rawLocation) return null;

  // Dynamically replace "Zürich" with municipality name, while avoiding breaking URLs
  const localize = (text: string) => {
    if (!text) return text;
    return enforceBrandSpelling(
      text
        .replace(/grossraum Zürich/gi, `Grossraum ${name}`)
        .replace(/kanton Zürich/gi, `Kanton ${name}`)
        .replace(/kanton zürich/gi, `Kanton ${name}`)
        .replace(/Stadt und Region Zürich/gi, `Stadt und Region ${name}`)
        .replace(/(?<!(parkett-pflege\.ch\/|parkett-pflege\.ch\s+in\s+))Zürich/g, name)
    );
  };

  let h1 = localize(rawLocation.h1);
  let metaTitle = localize(rawLocation.metaTitle);
  let metaDescription = localize(rawLocation.metaDescription);
  let intro = localize(rawLocation.intro);
  let contentMarkdown = localize(rawLocation.contentMarkdown);

  if (isSpecialService && mKey === 'zuerich') {
    if (serviceName === 'schleifen') {
      h1 = 'Parkett schleifen in Zürich';
      metaTitle = 'Parkett schleifen Zürich | Staubfrei & Fachmännisch';
      metaDescription = 'Parkett schleifen in Zürich: Staubfreier Abschliff, fachgerechte Versiegelung oder Ölung. Erhalten Sie eine kostenlose Ersteinschätzung per Foto!';
      intro = 'Ein abgenutzter, zerkratzter oder stumpfer Parkettboden im Raum Zürich benötigt oft keinen teuren Austausch. Mit unserem staubfreien Schleifverfahren bringen wir Ihr Parkett wieder zum Strahlen.';
      contentMarkdown = `## Professioneller Abschliff für Ihr Parkett in Zürich

Ist die Nutzschicht Ihres Bodens abgenutzt, sind Kratzer zu tief oder Flecken unansehnlich geworden? Ein fachmännischer Abschliff erweckt Ihr Parkett zu neuem Leben. Als erfahrener Fachbetrieb im Raum Zürich bieten wir Ihnen ein absolut **staubfreies Schleifverfahren**, das Schmutzbelastung auf ein Minimum reduziert.

### Wann ist ein kompletter Abschliff sinnvoll?

Ein Abschliff ist die gründlichste Form der Parkettrenovierung. Sie wird notwendig bei:
- Tiefen, fühlbaren Kratzern und Dellen im Holz
- Starken Laufstrassen und sichtbarer Abnutzung der Lack- oder Ölschicht
- Tief ins Holz eingedrungenen Wasser- oder Haustierflecken
- Dem Wunsch nach einem Farbwechsel oder einer völlig neuen Oberflächenbehandlung

### Staubfreies Schleifen für maximalen Komfort in Zürich

Dank modernster Schleifmaschinen mit Hochleistungsabsaugung bleibt Ihr Wohnraum nahezu staubfrei. Wir führen den Schliff in mehreren feinen Durchgängen durch, tragen nur so viel Holz ab wie unbedingt nötig, und bauen die Schutzschicht anschliessend wahlweise mit hochwertigen Naturölen oder robusten Wasserlacken neu auf.

### Was kostet Parkett schleifen in Zürich?

Die Kosten für das Schleifen inklusive neuer Oberflächenbehandlung liegen in der Regel zwischen **CHF 35.– und CHF 55.– pro Quadratmeter**. Der genaue Aufwand richtet sich nach dem Zustand des Holzes, der Holzart und der gewünschten Versiegelungs- oder Ölungsmethode. Senden Sie uns einfach Fotos Ihres Bodens über unsere [Fotoanalyse](/tools/fotoanalyse-parkett) – wir geben Ihnen direkt eine erste unverbindliche Einschätzung.`;
    } else if (serviceName === 'reparieren') {
      h1 = 'Parkett reparieren in Zürich';
      metaTitle = 'Parkett reparieren Zürich | Lokales Spot-Repair';
      metaDescription = 'Parkett reparieren in Zürich: Lokale Ausbesserung von Kratzern, Flecken oder Druckstellen (Spot-Repair). Schnell, sauber und kostengünstig.';
      intro = 'Kratzer, Dellen oder kleine Flecken im Parkett lassen sich im Raum Zürich oft ohne grossen Aufwand lokal beheben. Wir reparieren gezielt betroffene Stellen, statt den ganzen Boden zu schleifen.';
      contentMarkdown = `## Gezielte Parkettreparatur in Zürich

Ein Missgeschick ist schnell passiert: Ein heruntergefallenes Bügeleisen hinterlässt eine tiefe Delle, ein umgekippter Blumentopf sorgt für dunkle Ränder oder Hundekrallen zeichnen Spuren im Eingangsbereich. In den allermeisten Fällen muss das Parkett deswegen nicht komplett geschliffen oder gar ausgetauscht werden. Mit unserer **lokalen Parkettreparatur (Spot-Repair)** beheben wir den Makel gezielt und schonend.

### Unsere Reparatur-Leistungen im Raum Zürich

- **Auskitten von tiefen Dellen und Rissen:** Mit farblich exakt abgestimmten Hartwachsen und Retuschierfarben machen wir Beschädigungen nahezu unsichtbar.
- **Behandlung von Flecken:** Lokales Bleichen von Wasser- oder Gerbsäureflecken und anschliessendes Nachölen der Stelle.
- **Dielentausch:** Ist eine einzelne Parkettdiele irreparabel beschädigt, schneiden wir diese präzise heraus und ersetzen sie durch ein neues Originalteil.
- **Oberflächenangleichung:** Anschleifen und Versiegeln bzw. Ölen von Teilflächen zur optischen Wiederherstellung.

### Wann ist Spot-Repair möglich?

Eine lokale Reparatur ist besonders erfolgreich bei natürlich geölten Böden, da sich diese nahtlos nachbehandeln lassen. Aber auch bei lackierten Oberflächen können wir feine Kratzer oder kleine Fehlstellen mit speziellen UV-härtenden Materialien versiegeln, um das Holz vor Feuchtigkeitseintritt zu schützen.

### Kosten der Parkettreparatur

Eine professionelle lokale Ausbesserung liegt meist zwischen **CHF 150.– und CHF 450.– pro Schadensstelle**, je nach Aufwand und Materialbedarf. Das ist nur ein Bruchteil eines kompletten Abschliffs. Gerne prüfen wir Ihr Schadensbild vorab: Nutzen Sie einfach unsere kostenfreie [Fotoanalyse](/tools/fotoanalyse-parkett) und laden Sie 1–2 Bilder des Schadens hoch.`;
    }
  }

  return {
    slug,
    name,
    focusKeyword: localize(rawLocation.focusKeyword),
    h1,
    metaTitle,
    metaDescription,
    intro,
    imageUrl: rawLocation.imageUrl,
    stats: rawLocation.stats.map((s: any) => ({
      label: s.label,
      value: localize(s.value)
    })),
    contentMarkdown
  };
}

// 6. CASES (FÄLLE) MAPPING
const caseMapping: { [key: string]: number } = {
  'wasserfleck-parkett-zuerich-seefeld': 1,
  'hundekratzer-parkett-zuerich-wiedikon': 2,
  'laufstrasse-parkett-zuerich-enge': 3,
  'graues-parkett-zuerich-altstetten': 4,
  'parkett-mieterwechsel-zuerich-oerlikon': 3 // fallback to 3
};

export async function getCasePageData(slug: string) {
  const caseId = caseMapping[slug] || 1;
  const casesList = await getCases();
  const foundCase = casesList.find(c => c.id === caseId);
  if (!foundCase) return null;

  return {
    ...foundCase,
    slug,
    title: enforceBrandSpelling(foundCase.title),
    problem: enforceBrandSpelling(foundCase.problem),
    description: enforceBrandSpelling(foundCase.description),
    metaTitle: enforceBrandSpelling(`Projektbericht: ${foundCase.title} | Parkett-Pflege.ch`),
    metaDescription: enforceBrandSpelling(`Erfolgreiche Parkettsanierung: ${foundCase.problem} bei einem Parkett aus ${foundCase.woodType}. Vorher/Nachher Bilder und Details.`)
  };
}
