export type LeadPriority = 'Hoch' | 'Mittel' | 'Niedrig';

// Neuer Workflow: Neu → Qualifiziert → Besichtigung geplant → Offerte gesendet → Nachfassen → Gewonnen → Verloren
export type LeadStatus = 'Neu' | 'Qualifiziert' | 'Besichtigung geplant' | 'Offerte gesendet' | 'Nachfassen' | 'Gewonnen' | 'Verloren';

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ObjectDetails {
  address?: string;
  areaSqM?: number;
  woodType?: string;
  surface?: string;
  problem?: string;
  images?: string[]; // Array von URLs oder Base64
}

export interface ServiceInfo {
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export interface AiDiagnosis {
  suspectedDamage?: string;
  suspectedWoodType?: string;
  suspectedSurface?: string;
  severity?: string;
  urgency?: string;
  diyPossible?: boolean;
  recommendedService?: string; // z.B. "Parkett Renovation"
  priceRange?: {
    min: number;
    max: number;
  };
  leadScore?: number;
  customerExplanation?: string;
  internalSummary?: string;
  imageUrl?: string;
}

export interface LeadNote {
  id: string;
  content: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  timestamp: string;
  status: LeadStatus;
  customer: CustomerData;
  objectDetails: ObjectDetails;
  serviceInfo: ServiceInfo;
  leadScore: number;
  priority: LeadPriority;
  aiDiagnosis?: AiDiagnosis;
  notes?: LeadNote[];
  funnelSource?: string; // Quelle: Google, Ads, SEO, Direkt, Partner
  recommendedPackage?: string; // z.B. "Parkett Intensiv"
}

export type OfferStatus = 'Entwurf' | 'Gesendet' | 'Angenommen' | 'Abgelehnt';

export interface OfferLineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

export interface Offer {
  id: string;
  leadId: string;
  status: OfferStatus;
  createdAt: string;
  updatedAt: string;
  customer: CustomerData;
  title: string;
  introText: string;
  lineItems: OfferLineItem[];
  assumptions: string[];
  exclusions: string[];
  totalAmount: number;
  isFixedPrice: boolean;
  validUntil: string;
}

export interface FAQ {
  id: string;
  category: 'service' | 'problem' | 'location' | 'general';
  targetSlug: string;
  question: string;
  answer: string;
}
