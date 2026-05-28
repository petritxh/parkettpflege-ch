export type SeoEngineConfig = any; // Will refine over time based on the JSON

export type SeoProject = {
  name?: string;
  domain?: string;
  version?: string;
  slogan?: string;
  strategicConcept?: string;
  primaryMarket?: string;
};

export type SeoCategory = {
  id?: string;
  name?: string;
  basePath?: string;
  purpose?: string;
  goal?: string;
  description?: string;
  contentTypesAllowed?: string[];
  requiredModules?: string[];
  examplePages?: Array<{ slug: string; primaryKeyword: string; intent: string; priority: string }>;
  subcategories?: any[];
};

export type SeoContentType = {
  id?: string;
  description?: string;
  primaryIntent?: string;
  minimumWordCount?: number;
  recommendedWordCount?: string;
  requiredFields?: string[];
  requiredH2Sections?: string[];
  interactiveModulesRecommended?: string[];
  schemaTypes?: string[];
};

export type SeoQualityScore = {
  minimumToPublish?: number;
  criteria?: Record<string, number | {
    weight?: number;
    description?: string;
  }>;
};

export type SeoContentStatusValue =
  | "planned"
  | "in_progress"
  | "review"
  | "approved"
  | "published"
  | "needs_update"
  | "archived";

export type SeoContentStatus = {
  slug: string;
  status: SeoContentStatusValue;
  qualityScore?: number | null;
  notes?: string;
  assignedTo?: string;
  lastReviewedAt?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
};

export type SeoTagGroup = {
  id: string;
  name: string;
  tags: string[];
};

export type SeoInteractiveModule = {
  id: string;
  name?: string;
  purpose?: string;
  bestFor?: string[];
  questions?: any[];
  resultTypes?: any[];
};
