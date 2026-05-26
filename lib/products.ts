import fs from 'fs';
import path from 'path';
import { Product } from '@/data/products';

export function getProductsSync(): Product[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Product[];
  } catch (error) {
    console.error('Failed to read products.json', error);
    return [];
  }
}

export function getRecommendedProducts(woodType: string, damageType: string): Product[] {
  const products = getProductsSync();
  return products.filter(product => {
    const matchesWood = product.suitableFor.woodTypes.includes('alle') || product.suitableFor.woodTypes.includes(woodType);
    const matchesDamage = product.suitableFor.damageTypes.includes('alle') || product.suitableFor.damageTypes.includes(damageType);
    
    return matchesWood && matchesDamage;
  });
}
