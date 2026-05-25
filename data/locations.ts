import locationsData from './locations.json';

export interface LocationContent {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  imageUrl: string;
  stats: { label: string; value: string }[];
  contentMarkdown?: string;
}

export const locations = locationsData as unknown as LocationContent[];

export function getLocationBySlug(slug: string): LocationContent | null {
  return locations.find(l => l.slug === slug) || null;
}
