import fs from 'fs';
import path from 'path';

const getBriefsDir = () => path.join(process.cwd(), 'data', 'seo-content-briefs');

export function getSeoContentBriefs(): any[] {
  try {
    const dir = getBriefsDir();
    if (!fs.existsSync(dir)) return [];
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    return files.map(file => {
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      try {
        return JSON.parse(content);
      } catch (e) {
        console.error(`Error parsing brief ${file}`, e);
        return null;
      }
    }).filter(Boolean);
  } catch (error) {
    console.error('Error reading seo-content-briefs directory:', error);
    return [];
  }
}

export function getBriefBySlug(slug: string): any | null {
  const briefs = getSeoContentBriefs();
  return briefs.find(b => b.slug === slug) || null;
}
