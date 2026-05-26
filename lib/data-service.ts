import fs from 'fs/promises';
import path from 'path';
import { Lead, Offer } from './types/crm';

const dataDir = path.join(process.cwd(), 'data');
const leadsFile = path.join(dataDir, 'leads.json');
const offersFile = path.join(dataDir, 'offers.json');

async function ensureDataDir() {
  try {
    await fs.access(dataDir);
  } catch {
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (e) {
      // Ignore in serverless/vercel
      console.warn('Could not create data dir, likely serverless environment');
    }
  }
}

// --- LEADS ---

export async function getLeads(): Promise<Lead[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(leadsFile, 'utf-8');
    return JSON.parse(data) as Lead[];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const leads = await getLeads();
  return leads.find(l => l.id === id) || null;
}

export async function saveLead(lead: Lead): Promise<void> {
  try {
    const leads = await getLeads();
    const index = leads.findIndex(l => l.id === lead.id);
    
    if (index >= 0) {
      leads[index] = lead;
    } else {
      leads.push(lead);
    }
    
    await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Could not save lead in serverless environment:', e);
  }
}

export async function deleteLead(id: string): Promise<void> {
  let leads = await getLeads();
  leads = leads.filter(l => l.id !== id);
  await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2), 'utf-8');
}

// --- OFFERS ---

export async function getOffers(): Promise<Offer[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(offersFile, 'utf-8');
    return JSON.parse(data) as Offer[];
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function getOfferById(id: string): Promise<Offer | null> {
  const offers = await getOffers();
  return offers.find(o => o.id === id) || null;
}

export async function getOffersByLeadId(leadId: string): Promise<Offer[]> {
  const offers = await getOffers();
  return offers.filter(o => o.leadId === leadId);
}

export async function saveOffer(offer: Offer): Promise<void> {
  const offers = await getOffers();
  const index = offers.findIndex(o => o.id === offer.id);
  
  offer.updatedAt = new Date().toISOString();
  
  // PIN automatisch generieren für neue Offerten
  if (!offer.accessPin) {
    offer.accessPin = Math.floor(1000 + Math.random() * 9000).toString();
  }
  
  if (index >= 0) {
    offers[index] = offer;
  } else {
    offers.push(offer);
  }
  
  await fs.writeFile(offersFile, JSON.stringify(offers, null, 2), 'utf-8');
}

export async function deleteOffer(id: string): Promise<void> {
  let offers = await getOffers();
  offers = offers.filter(o => o.id !== id);
  await fs.writeFile(offersFile, JSON.stringify(offers, null, 2), 'utf-8');
}

// --- FAQS ---
const faqsFile = path.join(dataDir, 'faqs.json');

export async function getFAQs(): Promise<any[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(faqsFile, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function getFAQsByTarget(category: string, targetSlug: string): Promise<any[]> {
  const faqs = await getFAQs();
  return faqs.filter(faq => faq.category === category && faq.targetSlug === targetSlug);
}

export async function saveFAQ(faq: any): Promise<void> {
  const faqs = await getFAQs();
  const index = faqs.findIndex(f => f.id === faq.id);
  
  if (index >= 0) {
    faqs[index] = faq;
  } else {
    faqs.push(faq);
  }
  
  await fs.writeFile(faqsFile, JSON.stringify(faqs, null, 2), 'utf-8');
}

export async function deleteFAQ(id: string): Promise<void> {
  let faqs = await getFAQs();
  faqs = faqs.filter(f => f.id !== id);
  await fs.writeFile(faqsFile, JSON.stringify(faqs, null, 2), 'utf-8');
}

// --- CMS DATA (SERVICES, PROBLEMS, LOCATIONS) ---

export async function getCMSData(type: 'services' | 'problems' | 'locations'): Promise<any[]> {
  try {
    const file = path.join(dataDir, `${type}.json`);
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.warn(`Could not read CMS data for ${type}, returning empty array`);
    return [];
  }
}

export async function saveCMSData(type: 'services' | 'problems' | 'locations', data: any[]): Promise<void> {
  const file = path.join(dataDir, `${type}.json`);
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
}

// --- CASE STUDIES ---

const casesFile = path.join(dataDir, 'cases.json');

export async function getCases(): Promise<any[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(casesFile, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export async function saveCase(caseItem: any): Promise<void> {
  const cases = await getCases();
  const index = cases.findIndex(c => c.id === caseItem.id);
  
  if (index >= 0) {
    cases[index] = caseItem;
  } else {
    if (!caseItem.id) caseItem.id = Date.now();
    cases.push(caseItem);
  }
  
  await fs.writeFile(casesFile, JSON.stringify(cases, null, 2), 'utf-8');
}

export async function deleteCase(id: number): Promise<void> {
  let cases = await getCases();
  cases = cases.filter(c => c.id !== id);
  await fs.writeFile(casesFile, JSON.stringify(cases, null, 2), 'utf-8');
}

// --- ADMIN SETTINGS ---

const settingsFile = path.join(dataDir, 'settings.json');

const defaultSettings = {
  offerIntroTemplate: 'Sehr geehrte(r) {KUNDE_NAME},\n\nvielen Dank für Ihre Anfrage. Gerne unterbreiten wir Ihnen folgendes Angebot für Ihr Parkett.',
  offerFooterTemplate: 'Vielen Dank für Ihr Vertrauen in Parkett-Pflege.ch. Bei Fragen stehen wir jederzeit zur Verfügung.',
  emailOfferLinkTemplate: 'Guten Tag {KUNDE_NAME},\n\nIhre Offerte ist nun bereit.\nSie können diese unter folgendem Link aufrufen: {LINK}\n\nIhr persönlicher Zugangs-PIN lautet: {PIN}\n\nFreundliche Grüsse,\nIhr Parkett-Pflege.ch Team',
  emailConfirmationTemplate: 'Guten Tag {KUNDE_NAME},\n\nvielen Dank! Wir haben Ihre Bestätigung zur Offerte {OFFER_ID} erhalten und werden uns in Kürze zwecks Terminvereinbarung bei Ihnen melden.\n\nFreundliche Grüsse,\nIhr Parkett-Pflege.ch Team'
};

export async function getSettings(): Promise<any> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(settingsFile, 'utf-8');
    return { ...defaultSettings, ...JSON.parse(data) };
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return defaultSettings;
    }
    throw error;
  }
}

export async function saveSettings(settings: any): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(settingsFile, JSON.stringify(settings, null, 2), 'utf-8');
}
