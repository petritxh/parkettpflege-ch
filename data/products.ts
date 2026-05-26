export type ProductCategory = 'Reinigung' | 'Pflege' | 'Reparatur' | 'Zubehör' | 'Maschinen';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  imageUrl: string;
  price: number; // in CHF
  isAffiliate: boolean;
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
    name: 'WOCA Holzbodenseife Natur',
    category: 'Reinigung',
    shortDescription: 'Sanfte Reinigung und Pflege für geölte Holzböden.',
    description: 'Die WOCA Holzbodenseife reinigt den Boden schonend und schützt ihn gleichzeitig vor dem Austrocknen. Durch die rückfettenden Eigenschaften erhält das Holz bei jeder Reinigung einen schützenden Film. Ideal für die regelmässige Unterhaltsreinigung in der Schweiz.',
    imageUrl: 'https://images.unsplash.com/photo-1581850518616-bcb8077a2336?w=600&h=600&fit=crop', 
    price: 24.90,
    isAffiliate: false,
    tags: ['pH-neutral', 'Alltagspflege', 'Rückfettend'],
    suitableFor: {
      woodTypes: ['alle', 'eiche', 'buche_ahorn', 'nussbaum'],
      damageTypes: ['alle', 'keine', 'fein', 'laufstrassen'],
    }
  },
  {
    id: 'intensivreiniger',
    name: 'Intensivreiniger Tiefenwirkung',
    category: 'Reinigung',
    shortDescription: 'Tiefenreinigung zur Vorbereitung für Pflegeöle.',
    description: 'Löst hartnäckigen Schmutz und alte Seifenreste. Ideal vor dem Neu-Ölen oder bei leichten bis mittleren Laufstrassen. Wichtig: Trocknet das Holz aus, anschliessende Ölung zwingend erforderlich!',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=600&fit=crop',
    price: 28.50,
    isAffiliate: false,
    tags: ['Tiefenreinigung', 'Vorbehandlung'],
    suitableFor: {
      woodTypes: ['alle'],
      damageTypes: ['fein', 'laufstrassen', 'wasser'],
    }
  },
  {
    id: 'pflegeoel-natur',
    name: 'Pflegeöl Natur / Farblos Premium',
    category: 'Pflege',
    shortDescription: 'Frischt matte und leicht verkratzte Böden auf.',
    description: 'Unterstützt die natürliche Holzfarbe und schliesst feine Kratzer. Der Boden wirkt nach der Anwendung wieder frisch und ist besser vor Schmutz und Feuchtigkeit geschützt.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=600&fit=crop',
    price: 45.00,
    isAffiliate: false,
    tags: ['Werterhalt', 'Auffrischung'],
    suitableFor: {
      woodTypes: ['eiche', 'nussbaum', 'andere'],
      damageTypes: ['fein', 'laufstrassen'],
    }
  },
  {
    id: 'karcher-fc7',
    name: 'Kärcher FC 7 Cordless Premium',
    category: 'Maschinen',
    shortDescription: 'Der perfekte Hartbodenreiniger für grosse Parkettflächen.',
    description: 'Beseitigt alle Arten von trockenem und feuchtem Alltagsschmutz in nur einem Schritt. Ideal für empfindliche Parkettböden dank der geringen Restfeuchte. (Verkauf via Partner)',
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&h=600&fit=crop',
    price: 449.00,
    isAffiliate: true,
    affiliateLink: 'https://www.kaercher.com/ch/home-garden/hartbodenreiniger/fc-7-cordless-premium-10557600.html',
    tags: ['Maschine', 'Effizienz', 'Bestseller'],
    suitableFor: {
      woodTypes: ['alle'],
      damageTypes: ['keine', 'fein'],
    }
  },
  {
    id: 'gerbsaeure-spray',
    name: 'Gerbsäure-Fleckenspray',
    category: 'Reparatur',
    shortDescription: 'Hilft bei der Entfernung von dunklen Wasserflecken.',
    description: 'Ein spezielles Spray zur Neutralisierung von dunklen Reaktionsflecken (oft durch Wasser oder Metall auf Eiche verursacht). Unterstützt die Entfernung ohne aggressives Schleifen.',
    imageUrl: 'https://images.unsplash.com/photo-1581850518616-bcb8077a2336?w=600&h=600&fit=crop',
    price: 19.90,
    isAffiliate: false,
    tags: ['Fleckenentfernung', 'Problemlöser'],
    suitableFor: {
      woodTypes: ['eiche'],
      damageTypes: ['wasser'],
    }
  },
  {
    id: 'reparatur-wachs',
    name: 'Hartwachs-Reparaturset Profi',
    category: 'Reparatur',
    shortDescription: 'Zum Auffüllen von kleinen bis mittleren Kratzern.',
    description: 'Set aus verschiedenen Farbtönen, die erhitzt und in Kratzer oder kleine Dellen getropft werden können. Härtet aus und schützt vor eindringendem Wasser.',
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&h=600&fit=crop',
    price: 39.90,
    isAffiliate: false,
    tags: ['DIY', 'Kratzer kaschieren'],
    suitableFor: {
      woodTypes: ['alle'],
      damageTypes: ['tief'],
    }
  }
];

export function getRecommendedProducts(woodType: string, damageType: string): Product[] {
  return products.filter(product => {
    const matchesWood = product.suitableFor.woodTypes.includes('alle') || product.suitableFor.woodTypes.includes(woodType);
    const matchesDamage = product.suitableFor.damageTypes.includes('alle') || product.suitableFor.damageTypes.includes(damageType);
    
    return matchesWood && matchesDamage;
  });
}
