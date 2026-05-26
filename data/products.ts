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
  tags: string[];
  suitableFor: {
    woodTypes: string[];
    damageTypes: string[];
  };
}
