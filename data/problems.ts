import problemsData from './problems.json';

export interface ProblemContent {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  imageUrl: string;
  solutionTitle: string;
  solutionText: string;
  recommendedServiceUrl: string;
  recommendedServiceText: string;
  contentMarkdown?: string;
  benefits?: { title: string; description: string }[];
  processSteps?: { step: number | string; title: string; description: string }[];
  relatedServices?: string[];
  faqs?: { question: string; answer: string }[]; // legacy
}

export const problems = problemsData as unknown as ProblemContent[];

export function getProblemBySlug(slug: string): ProblemContent | null {
  return problems.find(p => p.slug === slug) || null;
}
