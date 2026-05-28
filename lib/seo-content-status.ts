import fs from 'fs';
import path from 'path';
import { SeoContentStatus } from '@/types/seo-engine';

const getStatusPath = () => path.join(process.cwd(), 'data', 'seo-content-status.json');

export function getSeoContentStatus(): { pages: SeoContentStatus[] } {
  try {
    const filePath = getStatusPath();
    if (!fs.existsSync(filePath)) return { pages: [] };
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading seo-content-status.json:', error);
    return { pages: [] };
  }
}

export function getStatusBySlug(slug: string): SeoContentStatus | null {
  const data = getSeoContentStatus();
  return data.pages.find(p => p.slug === slug) || null;
}

export function mergePageIdeasWithStatus(pageIdeas: any[]): any[] {
  const statusData = getSeoContentStatus();
  const statusMap = new Map(statusData.pages.map(p => [p.slug, p]));

  return pageIdeas.map(idea => {
    const status = statusMap.get(idea.slug);
    return {
      ...idea,
      status: status?.status || 'planned',
      qualityScore: status?.qualityScore || null,
      notes: status?.notes || '',
      lastReviewedAt: status?.lastReviewedAt || null,
      publishedAt: status?.publishedAt || null,
    };
  });
}
