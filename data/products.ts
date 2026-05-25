export type ProductCategory = 'Reinigung' | 'Pflege' | 'Reparatur' | 'Zubehör';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  imageUrl: string;
  affiliateLink?: string;
  tags: string[]; // e.g., 'ph-neutral', 'lösemittelfrei'
  suitableFor: {
    woodTypes: string[]; // 'eiche', 'buche_ahorn', 'nussbaum', 'alle'
    damageTypes: string[]; // 'keine', 'fein', 'wasser', 'laufstrassen', 'alle'
  };
}

export const products: Product[] = [
  {
    id: 'holzbodenseife-neutral',
    name: 'pH-Neutrale Holzbodenseife',
    category: 'Reinigung',
    shortDescription: 'Sanfte Reinigung für alle geölten Holzoberflächen.',
    description: 'Eine milde, speziell entwickelte Seife, die den Boden reinigt, ohne die schützende Ölschicht anzugreifen. Hinterlässt einen feinen, pflegenden Film.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIrJs8BLeEeepjntbFA420wiHaTe7Xd14SEOSZnejBedGBQa_8eVy1QsvP-wIbE7WDE5_9lrOpa0Cf6qiFV98LZDBOyxB_F0zXU6-pqMpoaksVcsfiJULNi1vnFqd5ceW-DxijaxfuVbtOAchai80dsH5ANulOMqcr1LCJXtshJMRuAplCAo7Xo6FM_XF2zSpgxIQZEyOevY37e49jijR43rjhbpLU1KpAeZr2WMySKPuuJ2Gku6DUegb1yzgzZjMZ874yTxnOySg', // Placeholder, we can replace it later
    tags: ['pH-neutral', 'Alltagspflege', 'Rückfettend'],
    suitableFor: {
      woodTypes: ['alle', 'eiche', 'buche_ahorn', 'nussbaum'],
      damageTypes: ['alle', 'keine', 'fein', 'laufstrassen'],
    }
  },
  {
    id: 'intensivreiniger',
    name: 'Holz-Intensivreiniger',
    category: 'Reinigung',
    shortDescription: 'Tiefenreinigung zur Vorbereitung für Pflegeöle.',
    description: 'Löst hartnäckigen Schmutz und alte Seifenreste. Ideal vor dem Neu-Ölen oder bei leichten bis mittleren Laufstrassen. Wichtig: Trocknet das Holz aus, anschliessende Ölung zwingend erforderlich!',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADmDYLUFPdXz5Q4GDKThgWBBNR0gAwhs-BIDAz_OpiQonRVmzE-yxVa9WHEppwUsdg6IiImsD-W1X1jTwxGun3m9dvr5cZrpx0S2VxpZNHak_LnNaOXJmo2fzIjBkb2ms6eoDc1wabrcQ3Vi_3CpuoqKKlQDPWNUGwoLqOVW3ghIc__AECOsJEpNK8HGtGvEAztpD494bkpLEFnI0RKQhBMoajcvpVnRa_aHnUR_pe9L1mCoNOKnbDcixLaDbUhBPN9yX4IN1sbuA',
    tags: ['Tiefenreinigung', 'Vorbehandlung'],
    suitableFor: {
      woodTypes: ['alle'],
      damageTypes: ['fein', 'laufstrassen', 'wasser'],
    }
  },
  {
    id: 'pflegeoel-natur',
    name: 'Pflegeöl Natur / Farblos',
    category: 'Pflege',
    shortDescription: 'Frischt matte und leicht verkratzte Böden auf.',
    description: 'Unterstützt die natürliche Holzfarbe und schliesst feine Kratzer. Der Boden wirkt nach der Anwendung wieder frisch und ist besser vor Schmutz und Feuchtigkeit geschützt.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpu93OtXlPyxw3Fh8XWXP1eiKLfPGJzH5teHgLuKEiZXmrZSGLW-Zf--BKj2c1SGG0cTw1bVAUoEuxJq99uOwlEMNCxltT8xpWJ3b545ACcGEHH94IcFZiT_MlZE4yrHr-Shf7kC-aFN5H2JKU-OfZq1NYdtr7HtpmOpyewHaiUZVYrZD-YC9dEBzkkxnO__jrSZEuAi8Jf2BmuhyoQ6Fdue3u5I6TKtLbok4LWAcb66F-omZgTyn5UzsFFufhqcIuIMw0wcuG9H8',
    tags: ['Werterhalt', 'Auffrischung'],
    suitableFor: {
      woodTypes: ['eiche', 'nussbaum', 'andere'], // Buche/Ahorn oft weiss geölt
      damageTypes: ['fein', 'laufstrassen'],
    }
  },
  {
    id: 'pflegeoel-weiss',
    name: 'Pflegeöl Weiss',
    category: 'Pflege',
    shortDescription: 'Speziell für helles Holz wie Ahorn, Buche oder weiss geölte Eiche.',
    description: 'Bewahrt den hellen Charakter des Holzes und schützt vor Vergilbung. Frischt die matte Oberfläche auf und sättigt die Holzporen.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_8z7OdosizGELh8t3yvY3GH6nGpoTcAlL2KaA7KVyG7SmN2Do0yo8JaIipQBoCRu78DJYL-Ooxq_Gn_CmemHHA_1_7u4ERu8ECtq2uIfqCCPbI4Jq4LPgzSCXjNIqH88RY2xlOx992nDLYrc1rcP6UwTuaqu8nQowGrpl1L3DHuu5kZmelZ6CqVqDtH5Ychz4MBSv3ljbeKfVAj7Ks8x54gmSAJD7SmnY3Ig29GG3S4VwwUnjyu99HMdkO7KgNbmWW7wz9Rvq2tg',
    tags: ['UV-Schutz', 'Helles Holz'],
    suitableFor: {
      woodTypes: ['buche_ahorn'],
      damageTypes: ['fein', 'laufstrassen'],
    }
  },
  {
    id: 'gerbsaeure-spray',
    name: 'Gerbsäure-Fleckenspray',
    category: 'Reparatur',
    shortDescription: 'Hilft bei der Entfernung von dunklen Wasserflecken.',
    description: 'Ein spezielles Spray zur Neutralisierung von dunklen Reaktionsflecken (oft durch Wasser oder Metall auf Eiche verursacht). Unterstützt die Entfernung ohne aggressives Schleifen.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIrJs8BLeEeepjntbFA420wiHaTe7Xd14SEOSZnejBedGBQa_8eVy1QsvP-wIbE7WDE5_9lrOpa0Cf6qiFV98LZDBOyxB_F0zXU6-pqMpoaksVcsfiJULNi1vnFqd5ceW-DxijaxfuVbtOAchai80dsH5ANulOMqcr1LCJXtshJMRuAplCAo7Xo6FM_XF2zSpgxIQZEyOevY37e49jijR43rjhbpLU1KpAeZr2WMySKPuuJ2Gku6DUegb1yzgzZjMZ874yTxnOySg',
    tags: ['Fleckenentfernung', 'Problemlöser'],
    suitableFor: {
      woodTypes: ['eiche'], // Funktioniert primär bei gerbsäurehaltigen Hölzern
      damageTypes: ['wasser'],
    }
  },
  {
    id: 'reparatur-wachs',
    name: 'Hartwachs-Reparaturset',
    category: 'Reparatur',
    shortDescription: 'Zum Auffüllen von kleinen bis mittleren Kratzern.',
    description: 'Set aus verschiedenen Farbtönen, die erhitzt und in Kratzer oder kleine Dellen getropft werden können. Härtet aus und schützt vor eindringendem Wasser.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADmDYLUFPdXz5Q4GDKThgWBBNR0gAwhs-BIDAz_OpiQonRVmzE-yxVa9WHEppwUsdg6IiImsD-W1X1jTwxGun3m9dvr5cZrpx0S2VxpZNHak_LnNaOXJmo2fzIjBkb2ms6eoDc1wabrcQ3Vi_3CpuoqKKlQDPWNUGwoLqOVW3ghIc__AECOsJEpNK8HGtGvEAztpD494bkpLEFnI0RKQhBMoajcvpVnRa_aHnUR_pe9L1mCoNOKnbDcixLaDbUhBPN9yX4IN1sbuA',
    tags: ['DIY', 'Kratzer kaschieren'],
    suitableFor: {
      woodTypes: ['alle'],
      damageTypes: ['tief'],
    }
  }
];

/**
 * Filtert die Produkte basierend auf den Antworten aus dem Ratgeber.
 */
export function getRecommendedProducts(woodType: string, damageType: string): Product[] {
  return products.filter(product => {
    const matchesWood = product.suitableFor.woodTypes.includes('alle') || product.suitableFor.woodTypes.includes(woodType);
    const matchesDamage = product.suitableFor.damageTypes.includes('alle') || product.suitableFor.damageTypes.includes(damageType);
    
    return matchesWood && matchesDamage;
  });
}
