import { getProductsSync } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const products = getProductsSync();
  const product = products.find(p => p.id === resolvedParams.id);
  
  if (!product) return { title: 'Produkt nicht gefunden' };
  
  return {
    title: `${product.name} | WOCA Shop | Parkett-Pflege.ch`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const products = getProductsSync();
  const product = products.find(p => p.id === resolvedParams.id);
  
  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
