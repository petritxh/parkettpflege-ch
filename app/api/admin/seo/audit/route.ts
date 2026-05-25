import { NextResponse } from 'next/server';
import { getCMSData, getFAQs } from '@/lib/data-service';

function calculateScore(titleLength: number, descLength: number, wordCount: number, hasHeadings: boolean, faqCount: number) {
  let score = 0;
  // Title (20%)
  if (titleLength >= 40 && titleLength <= 65) score += 20;
  else if (titleLength > 0) score += 10;
  
  // Desc (20%)
  if (descLength >= 130 && descLength <= 160) score += 20;
  else if (descLength > 0) score += 10;
  
  // Words (30%)
  if (wordCount > 500) score += 30;
  else if (wordCount > 250) score += 15;
  else if (wordCount > 50) score += 5;
  
  // Headings (10%)
  if (hasHeadings) score += 10;
  
  // FAQs (20%)
  if (faqCount > 0) score += 20;
  
  return score;
}

export async function GET() {
  try {
    const services = await getCMSData('services');
    const problems = await getCMSData('problems');
    const locations = await getCMSData('locations');
    const faqs = await getFAQs();

    const auditResults: any[] = [];

    const processItem = (item: any, type: string, category: string, pathPrefix: string) => {
      const content = item.contentMarkdown || item.solutionText || '';
      const words = content.trim() ? content.trim().split(/\s+/).length : 0;
      const titleLen = item.metaTitle ? item.metaTitle.length : 0;
      const descLen = item.metaDescription ? item.metaDescription.length : 0;
      const hasHeadings = /#{2,3}\s/.test(content);
      const itemFaqs = faqs.filter(f => f.category === category && f.targetSlug === item.slug);
      
      const score = calculateScore(titleLen, descLen, words, hasHeadings, itemFaqs.length);

      auditResults.push({
        type,
        category,
        slug: item.slug,
        title: item.h1 || item.name,
        url: `${pathPrefix}/${item.slug}`,
        metaTitleLength: titleLen,
        metaDescLength: descLen,
        wordCount: words,
        hasHeadings,
        faqCount: itemFaqs.length,
        score
      });
    };

    services.forEach(s => processItem(s, 'Dienstleistung', 'service', ''));
    problems.forEach(p => processItem(p, 'Problem', 'problem', '/probleme'));
    locations.forEach(l => processItem(l, 'Standort', 'location', '/standorte'));

    // Sort by score ascending so worst are on top
    auditResults.sort((a, b) => a.score - b.score);

    return NextResponse.json(auditResults);
  } catch (error: any) {
    console.error('SEO Audit Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
