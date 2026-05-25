// ==========================================
// 1. Lead Qualification Agent Types
// ==========================================

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  serviceOfInterest: string;
  message: string;
  preferredDate?: string;
  hasImage: boolean;
  aiAdvisorResult?: {
    woodType: string;
    damageType: string;
    severity: string;
  };
}

export interface LeadQualificationResult {
  /** 0-100 score indicating lead value and likelihood to convert */
  score: number;
  /** 'high' | 'medium' | 'low' based on urgency/damage */
  priority: 'high' | 'medium' | 'low';
  /** Rough estimation, NO binding offer! */
  estimatedPriceRange: {
    min: number;
    max: number;
  };
  recommendedAction: string;
  /** Internal context for sales/craftsman */
  internalSummary: string;
}

// ==========================================
// 2. Offer Draft Agent Types
// ==========================================

export interface OfferDraftInput {
  lead: LeadInput;
  qualification: LeadQualificationResult;
  customerDetails: {
    firstName: string;
    lastName: string;
    address?: string;
  };
}

export interface OfferDraft {
  /** The drafted email/document text. MUST be clearly marked as DRAFT. */
  draftText: string;
  /** What are we assuming? (e.g. "Room is empty", "No stairs") */
  assumptions: string[];
  /** Questions we need the customer to answer before a final binding offer */
  openQuestions: string[];
  estimatedPriceRange: {
    min: number;
    max: number;
  };
  isFinal: boolean; // GUARDRAIL: Must always be false when AI generated
}

// ==========================================
// 3. Follow-Up Agent Types
// ==========================================

export interface FollowUpInput {
  leadName: string;
  daysSinceLastContact: number;
  serviceQuoted: string;
  previousInteractionSummary?: string;
}

export interface FollowUpDraft {
  emailSubject: string;
  emailBody: string;
  whatsappMessage: string;
}

// ==========================================
// 4. SEO Content Agent Types
// ==========================================

export interface SEOContentInput {
  topicFocus: string;
  primaryKeywords: string[];
  targetAudience: string;
}

export interface SEOContent {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  generatedFaqs: {
    question: string;
    answer: string;
  }[];
  suggestedInternalLinks: {
    anchorText: string;
    targetUrl: string;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schemaJsonLd: any; // e.g. FAQPage or Service schema
}

// ==========================================
// 5. Case Study Agent Types
// ==========================================

export interface CaseStudyInput {
  woodType: string;
  servicePerformed: string;
  problemDescription: string;
  solutionDescription: string;
  durationDays: number;
  hasBeforeAfterImages: boolean;
}

export interface CaseStudy {
  title: string;
  seoDescription: string;
  storyText: string;
  socialCaptions: {
    platform: 'instagram' | 'linkedin' | 'facebook';
    text: string;
  }[];
}

// ==========================================
// 6. Review Agent Types
// ==========================================

export interface ReviewInput {
  customerName: string;
  servicePerformed: string;
  projectSuccessHighlights: string[];
}

export interface ReviewRequest {
  emailSubject: string;
  emailBody: string;
  instructionsForGoogle: string;
  /** A suggested text the user CAN copy/paste if they are lazy. NEVER post this automatically! */
  suggestedTestimonial: string;
}
