import fs from 'fs';
import path from 'path';
import { SeoEngineConfig, SeoProject, SeoCategory, SeoContentType, SeoTagGroup, SeoInteractiveModule } from '@/types/seo-engine';

const getConfigPath = () => path.join(process.cwd(), 'config', 'seo-content-engine.json');

export function getSeoEngineConfig(): any {
  try {
    const filePath = getConfigPath();
    if (!fs.existsSync(filePath)) return {};
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(fileContent);
    return json.seoContentEngine || json;
  } catch (error) {
    console.error('Error reading seo-content-engine.json:', error);
    return {};
  }
}

export function getSeoProject(): SeoProject {
  const config = getSeoEngineConfig();
  // It could be under "project" or "primaryMarket" based on JSON variations
  return {
    name: config.project?.name || config.projectName || 'Parkettpflege.ch',
    domain: config.project?.domain || config.domain || 'https://parkett-pflege.ch',
    version: config.project?.version || '5.0',
    slogan: config.project?.slogan || config.primaryMarket?.mainSlogan || config.brand?.claim || '',
    strategicConcept: config.project?.strategicConcept || config.primaryMarket?.strategicConcept || '',
    primaryMarket: config.project?.primaryMarket || config.primaryMarket?.mainRegion || 'Raum Zürich',
  };
}

export function getSeoCategories(): SeoCategory[] {
  const config = getSeoEngineConfig();
  const cats = config.categories || config.contentArchitecture?.categories;
  if (!cats) return [];
  
  if (Array.isArray(cats)) {
    return cats.map((c: any) => ({
      id: c.id,
      name: c.name,
      basePath: c.basePath,
      description: c.description,
      purpose: c.purpose,
      goal: c.primaryGoal || c.goal,
      contentTypesAllowed: c.contentTypesAllowed || [],
      requiredModules: c.requiredModules || [],
      examplePages: c.examplePages || [],
      subcategories: c.subcategories || c.blogSubcategories || [],
    }));
  }
  
  // If it's an object mapped by ID
  return Object.keys(cats).map(key => {
    const c = cats[key];
    return {
      id: key,
      name: c.name || key,
      basePath: c.basePath,
      description: c.description,
      purpose: c.purpose,
      goal: c.primaryGoal || c.goal,
      contentTypesAllowed: c.contentTypesAllowed || [],
      requiredModules: c.requiredModules || [],
      examplePages: c.examplePages || [],
      subcategories: c.subcategories || c.blogSubcategories || [],
    };
  });
}

export function getSeoCategoryById(id: string): SeoCategory | null {
  const categories = getSeoCategories();
  return categories.find(c => c.id === id) || null;
}

export function getSeoContentTypes(): SeoContentType[] {
  const config = getSeoEngineConfig();
  const types = config.contentTypes;
  if (!types) return [];

  if (Array.isArray(types)) {
    return types;
  }

  return Object.keys(types).map(key => {
    const t = types[key];
    return {
      id: key,
      description: t.description,
      primaryIntent: t.primaryIntent,
      minimumWordCount: t.minimumWordCount,
      recommendedWordCount: t.recommendedWordCount,
      requiredFields: t.requiredFields || [],
      requiredH2Sections: t.requiredH2Sections || [],
      interactiveModulesRecommended: t.interactiveModulesRecommended || [],
      schemaTypes: t.schemaTypes || [],
    };
  });
}

export function getSeoControlledTags(): SeoTagGroup[] {
  const config = getSeoEngineConfig();
  const tagsObj = config.taxonomy?.controlledTags;
  if (!tagsObj) return [];

  return Object.keys(tagsObj).map(key => ({
    id: key,
    name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    tags: tagsObj[key] || [],
  }));
}

export function getSeoInteractiveModules(): SeoInteractiveModule[] {
  const config = getSeoEngineConfig();
  const modules = config.interactiveContentStrategy?.modules;
  if (!modules) return [];

  return Object.keys(modules).map(key => ({
    id: key,
    ...modules[key]
  }));
}

export function getSeoQualityScoreRules(): any {
  const config = getSeoEngineConfig();
  return config.globalSeoRules?.contentQualityRules || config.qualityScore || {};
}

export function getSeoInternalLinkingRules(): any {
  const config = getSeoEngineConfig();
  return config.internalLinks || [];
}

export function getSeoJsonLdRules(): any {
  const config = getSeoEngineConfig();
  return config.jsonLd || config.globalSeoRules?.jsonLd || {};
}

export function getSeoRoadmap(): any[] {
  const config = getSeoEngineConfig();
  return config.roadmap || config.contentRoadmap || [];
}

export function inferCategoryFromSlug(slug: string): string {
  if (slug.startsWith("/problemfaelle")) return "problemfaelle";
  if (slug.startsWith("/leistungen")) return "leistungen";
  if (slug.startsWith("/kosten")) return "kosten";
  if (slug.startsWith("/ratgeber")) return "ratgeber";
  if (slug.startsWith("/zuerich")) return "zuerich";
  if (slug.startsWith("/tools")) return "tools";
  if (slug.startsWith("/quiz")) return "quiz";
  if (slug.startsWith("/faelle")) return "faelle";
  if (slug.startsWith("/blog")) return "blog";
  return "unknown";
}

export function getSeoPageIdeas(): any[] {
  const config = getSeoEngineConfig();
  const ideas: any[] = [];
  const slugs = new Set<string>();

  const addIdea = (idea: any) => {
    if (!idea.slug) return;
    if (!slugs.has(idea.slug)) {
      slugs.add(idea.slug);
      
      if (!idea.category) {
        idea.category = inferCategoryFromSlug(idea.slug);
      }
      
      ideas.push(idea);
    }
  };

  // From categories
  const categories = getSeoCategories();
  categories.forEach(cat => {
    if (cat.examplePages && Array.isArray(cat.examplePages)) {
      cat.examplePages.forEach(page => {
        addIdea({ ...page, category: cat.id });
      });
    }
  });

  // From roadmap or first50Pages etc if they exist
  ['first50Pages', 'first100Pages', 'contentRoadmap', 'roadmap'].forEach(key => {
    if (config[key] && Array.isArray(config[key])) {
      config[key].forEach(addIdea);
    }
  });

  return ideas;
}

export function getSeoProblemPages() {
  return getSeoPageIdeas().filter(p => p.category === 'problemfaelle');
}

export function getSeoServicePages() {
  return getSeoPageIdeas().filter(p => p.category === 'leistungen');
}

export function getSeoCostPages() {
  return getSeoPageIdeas().filter(p => p.category === 'kosten');
}

export function getSeoLocationPages() {
  return getSeoPageIdeas().filter(p => p.category === 'zuerich');
}

export function getSeoBlogPages() {
  return getSeoPageIdeas().filter(p => p.category === 'blog');
}

export function getSeoToolPages() {
  return getSeoPageIdeas().filter(p => ['tools', 'quiz'].includes(p.category));
}
