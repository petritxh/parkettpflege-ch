import productsData from './products.json';

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

// Hilfsfunktion, um Produkte zu laden
export function getProductsSync(): Product[] {
  return productsData as Product[];
}

export function getRecommendedProducts(woodType: string, damageType: string): Product[] {
  const products = getProductsSync();
  return products.filter(product => {
    const matchesWood = product.suitableFor.woodTypes.includes('alle') || product.suitableFor.woodTypes.includes(woodType);
    const matchesDamage = product.suitableFor.damageTypes.includes('alle') || product.suitableFor.damageTypes.includes(damageType);
    
    return matchesWood && matchesDamage;
  });
}
