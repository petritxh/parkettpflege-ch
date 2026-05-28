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
  // Slug is e.g. "parkettpflege-duebendorf" or "parkettpflege-zuerich"
  const mKey = slug.replace('parkettpflege-', '');
  const name = municipalityCapitalization[mKey] || mKey.charAt(0).toUpperCase() + mKey.slice(1);

  const locations = await getCMSData('locations');
  const rawLocation = locations.find(l => l.slug === 'zuerich');
  if (!rawLocation) return null;

  // Dynamically replace "Zürich" with municipality name, while avoiding breaking URLs
  const localize = (text: string) => {
    if (!text) return text;
    // Replace "Kanton Zürich" or "Zürich" but NOT "parkett-pflege.ch"
    return enforceBrandSpelling(
      text
        .replace(/grossraum Zürich/gi, `Grossraum ${name}`)
        .replace(/kanton Zürich/gi, `Kanton ${name}`)
        .replace(/kanton zürich/gi, `Kanton ${name}`)
        .replace(/Stadt und Region Zürich/gi, `Stadt und Region ${name}`)
        .replace(/(?<!(parkett-pflege\.ch\/|parkett-pflege\.ch\s+in\s+))Zürich/g, name)
    );
  };

  return {
    slug,
    name,
    focusKeyword: localize(rawLocation.focusKeyword),
    h1: localize(rawLocation.h1),
    metaTitle: localize(rawLocation.metaTitle),
    metaDescription: localize(rawLocation.metaDescription),
    intro: localize(rawLocation.intro),
    imageUrl: rawLocation.imageUrl,
    stats: rawLocation.stats.map((s: any) => ({
      label: s.label,
      value: localize(s.value)
    })),
    contentMarkdown: localize(rawLocation.contentMarkdown)
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
