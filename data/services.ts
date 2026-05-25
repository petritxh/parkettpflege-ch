import servicesData from './services.json';

export interface ServiceContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  imageUrl: string;
  details: { title: string; description: string }[];
  contentMarkdown?: string;
  benefits?: { title: string; description: string }[];
  processSteps?: { step: number | string; title: string; description: string }[];
  faqs?: { question: string; answer: string }[]; // legacy
}

export const services = servicesData as unknown as ServiceContent[];

export function getServiceBySlug(slug: string): ServiceContent | null {
  return services.find(s => s.slug === slug) || null;
}
