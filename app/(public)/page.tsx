import { Metadata } from 'next';
import { homepageContent } from '@/data/homepage-content';

// Import modular homepage components
import HomeHero from '@/components/home/HomeHero';
import HomeTrustBar from '@/components/home/HomeTrustBar';
import HomeProblemSelector from '@/components/home/HomeProblemSelector';
import HomeServices from '@/components/home/HomeServices';
import HomePhotoAnalysis from '@/components/home/HomePhotoAnalysis';
import HomeCostTeaser from '@/components/home/HomeCostTeaser';
import HomeProblemCases from '@/components/home/HomeProblemCases';
import HomeBeforeAfter from '@/components/home/HomeBeforeAfter';
import HomeProcess from '@/components/home/HomeProcess';
import HomeWhyUs from '@/components/home/HomeWhyUs';
import HomeServiceArea from '@/components/home/HomeServiceArea';
import HomeGuides from '@/components/home/HomeGuides';
import HomeFaq from '@/components/home/HomeFaq';
import HomeFinalCta from '@/components/home/HomeFinalCta';

// Import SEO JSON-LD component
import HomeJsonLd from '@/components/seo/HomeJsonLd';

// Next.js static metadata for SEO
export const metadata: Metadata = {
  title: homepageContent.meta.title,
  description: homepageContent.meta.description,
  alternates: {
    canonical: homepageContent.meta.canonical,
  },
  openGraph: {
    title: homepageContent.meta.openGraphTitle,
    description: homepageContent.meta.openGraphDescription,
    url: homepageContent.meta.canonical,
    type: 'website',
    locale: 'de_CH',
    siteName: 'Parkett-Pflege.ch',
  },
};

export default function Homepage() {
  return (
    <>
      {/* Server-side rendered JSON-LD schemas */}
      <HomeJsonLd />

      {/* Structured Homepage Sektionen */}
      <HomeHero />
      <HomeTrustBar />
      <HomeProblemSelector />
      <HomeServices />
      <HomePhotoAnalysis />
      <HomeCostTeaser />
      <HomeProblemCases />
      <HomeBeforeAfter />
      <HomeProcess />
      <HomeWhyUs />
      <HomeServiceArea />
      <HomeGuides />
      <HomeFaq />
      <HomeFinalCta />
    </>
  );
}
