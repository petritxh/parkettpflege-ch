import { getProductsSync } from '@/data/products';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'Shop | WOCA Pflegeprodukte | Parkett-Pflege.ch',
  description: 'Professionelle WOCA Parkettpflege Produkte für Ihren Holzboden. Direkt vom Handwerker empfohlen. Kostenloser Versand ab 100.- CHF.',
};

export default function ShopPage() {
  const products = getProductsSync();
  return <ShopClient initialProducts={products} />;
}
