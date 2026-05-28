'use client';

import { homepageContent } from '@/data/homepage-content';

export default function HomeJsonLd() {
  const brandUrl = homepageContent.meta.canonical;
  const brandName = "parkett-pflege.ch";
  
  // 1. WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: brandName,
    url: brandUrl
  };

  // 2. LocalBusiness Schema (with secure baseline data)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: brandName,
    url: brandUrl,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRCeQlyl_ZrejbSyV0FunoFKwjkjKCeGvMY0CVKnU_4UOB-wMPEUFxPaEpuoEiEPlWTqsHRBHt7RBIBjGD_V9XVd4aaNOhqW5kra7KEBuMWuKXU0Z93pk65SyPuGBA6koofeZTFytJWKy-XVBRKOQhaNR1AaiRM03RDkyrXRExayAqviHQUWUtMh6bKKjZ_v37zZ8R9kqqSpWXjLJjqVOHcVYyASFJLbqlMprHcV1j-0N1QFmNPc9znpBaYlzZEESAebodotlZOmU',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Zürich und Umgebung'
    },
    priceRange: '$$',
    knowsAbout: [
      'Parkettpflege',
      'Parkettreparatur',
      'Parkettrenovation',
      'Parkett reinigen',
      'Parkett ölen',
      'Parkett schleifen'
    ]
  };

  // 3. FAQPage Schema (under visible FAQ items)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageContent.faq.items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  // 4. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Startseite',
        item: brandUrl
      }
    ]
  };

  const fullSchema = [websiteSchema, localBusinessSchema, faqSchema, breadcrumbSchema];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(fullSchema) }}
    />
  );
}
