export interface Package {
  id: string;
  name: string;
  targetAudience: string;
  purpose: string;
  description: string;
  features: string[];
  basePriceMin: number;
  basePriceMax: number;
  recommendedFor: {
    damageLevel: ('Kein' | 'Leicht' | 'Mittel' | 'Schwer' | 'Extrem')[];
    surfaceTypes: string[];
  };
}

export const servicePackages: Package[] = [
  {
    id: 'parkett-check',
    name: 'Parkett Check',
    targetAudience: 'Unsichere Kunden',
    purpose: 'Foto + KI + kurze Ersteinschätzung',
    description: 'Eine schnelle, professionelle Einschätzung Ihres Bodens. Ideal, wenn Sie nicht sicher sind, ob eine Reinigung reicht oder geschliffen werden muss.',
    features: [
      'Digitale Foto-Analyse',
      'KI-gestützte Ersteinschätzung',
      'Kostenschätzung',
      'Handlungsempfehlung'
    ],
    basePriceMin: 0,
    basePriceMax: 0,
    recommendedFor: {
      damageLevel: ['Kein', 'Leicht'],
      surfaceTypes: ['Geölt', 'Versiegelt', 'Unbekannt']
    }
  },
  {
    id: 'parkett-refresh',
    name: 'Parkett Refresh',
    targetAudience: 'Matte, stumpfe Böden',
    purpose: 'Reinigen, pflegen, auffrischen',
    description: 'Für Böden, die ihren Glanz verloren haben, aber keine tiefen Kratzer aufweisen. Eine intensive Reinigung und neue Pflege-Schicht.',
    features: [
      'Professionelle Intensivreinigung',
      'Entfernung von hartnäckigem Schmutz',
      'Auftragen einer neuen Pflege-Schicht',
      'Staubfrei und schnell'
    ],
    basePriceMin: 8,
    basePriceMax: 15,
    recommendedFor: {
      damageLevel: ['Leicht'],
      surfaceTypes: ['Geölt', 'Versiegelt']
    }
  },
  {
    id: 'parkett-intensiv',
    name: 'Parkett Intensiv',
    targetAudience: 'Böden mit starker Nutzung',
    purpose: 'Grundreinigung, Ölen, Schutz',
    description: 'Ideal für stark frequentierte Bereiche oder wenn das Parkett lange nicht geölt wurde. Schützt das Holz tiefenwirksam.',
    features: [
      'Maschinelle Grundreinigung',
      'Porentiefe Schmutzentfernung',
      'Sattes Einpolieren von hochwertigem Pflegeöl',
      'Maximale Schutzwirkung'
    ],
    basePriceMin: 15,
    basePriceMax: 25,
    recommendedFor: {
      damageLevel: ['Mittel'],
      surfaceTypes: ['Geölt']
    }
  },
  {
    id: 'parkett-renovation',
    name: 'Parkett Renovation',
    targetAudience: 'Stark beschädigtes Parkett',
    purpose: 'Schleifen, versiegeln, reparieren',
    description: 'Die Komplett-Sanierung. Der Boden wird bis auf das rohe Holz abgeschliffen, Kratzer werden entfernt, und anschliessend wird neu geölt oder versiegelt.',
    features: [
      'Staubfreies Abschleifen der Nutzschicht',
      'Reparatur von Rissen und Löchern',
      'Neuer Oberflächenaufbau (Öl oder Lack)',
      'Sieht aus wie neu'
    ],
    basePriceMin: 35,
    basePriceMax: 55,
    recommendedFor: {
      damageLevel: ['Schwer', 'Extrem'],
      surfaceTypes: ['Geölt', 'Versiegelt', 'Unbekannt']
    }
  },
  {
    id: 'verwaltungs-paket',
    name: 'Verwaltungs-Paket',
    targetAudience: 'Immobilienverwaltungen',
    purpose: 'Schnelle Diagnose bei Mieterwechsel',
    description: 'Speziell für Verwaltungen konzipiert: Effiziente Schadensbeurteilung bei Wohnungsübergaben inkl. Kostenvoranschlag.',
    features: [
      'Priorisierte Vor-Ort-Besichtigung',
      'Klare Unterscheidung zw. normaler Abnutzung & Mieterschaden',
      'Schnelle Offertstellung für Versicherungen',
      'Termingerechte Ausführung vor Neueinzug'
    ],
    basePriceMin: 0,
    basePriceMax: 0,
    recommendedFor: {
      damageLevel: ['Leicht', 'Mittel', 'Schwer', 'Extrem'],
      surfaceTypes: ['Geölt', 'Versiegelt', 'Unbekannt']
    }
  }
];
