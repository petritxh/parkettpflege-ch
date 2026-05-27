import fs from 'fs/promises';
import path from 'path';
import * as admin from 'firebase-admin';
import { Lead, Offer } from './types/crm';

// --- HYBRID STORAGE SYSTEM ---
// If Firebase is configured (production), it uses Firestore to bypass Vercel read-only filesystem errors.
// If Firebase is missing (local dev), it falls back to local JSON files in /data.

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
const useFirebase = !!serviceAccountKey;

if (useFirebase && !admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountKey as string))
    });
  } catch (e) {
    console.error('Failed to initialize Firebase Admin', e);
  }
}

const db = useFirebase ? admin.firestore() : null;
const dataDir = path.join(process.cwd(), 'data');

async function ensureDataDir() {
  if (useFirebase) return;
  try {
    await fs.access(dataDir);
  } catch {
    try {
      await fs.mkdir(dataDir, { recursive: true });
    } catch (e) {
      console.warn('Could not create data dir, likely serverless environment');
    }
  }
}

async function getLocalData<T>(filename: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(path.join(dataDir, filename), 'utf-8');
    return JSON.parse(data) as T;
  } catch (error: any) {
    return fallback;
  }
}

async function saveLocalData(filename: string, data: any): Promise<void> {
  await ensureDataDir();
  try {
    await fs.writeFile(path.join(dataDir, filename), JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Could not save data locally:', e);
    throw e;
  }
}

async function getData<T>(collectionName: string, docId: string, filename: string, fallback: T): Promise<T> {
  if (useFirebase && db) {
    try {
      const doc = await db.collection(collectionName).doc(docId).get();
      if (doc.exists) {
        return doc.data()?.data as T;
      }
      return fallback;
    } catch (e) {
      console.error(`Firestore Error getting ${collectionName}/${docId}:`, e);
      return fallback;
    }
  }
  return getLocalData<T>(filename, fallback);
}

async function saveData(collectionName: string, docId: string, filename: string, data: any): Promise<void> {
  if (useFirebase && db) {
    try {
      await db.collection(collectionName).doc(docId).set({ data });
      return;
    } catch (e) {
      console.error(`Firestore Error setting ${collectionName}/${docId}:`, e);
      throw e;
    }
  }
  return saveLocalData(filename, data);
}

// --- LEADS ---

export async function getLeads(): Promise<Lead[]> {
  return getData<Lead[]>('crm', 'leads', 'leads.json', []);
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const leads = await getLeads();
  return leads.find(l => l.id === id) || null;
}

export async function saveLead(lead: Lead): Promise<void> {
  const leads = await getLeads();
  const index = leads.findIndex(l => l.id === lead.id);
  if (index >= 0) leads[index] = lead;
  else leads.push(lead);
  await saveData('crm', 'leads', 'leads.json', leads);
}

export async function deleteLead(id: string): Promise<void> {
  let leads = await getLeads();
  leads = leads.filter(l => l.id !== id);
  await saveData('crm', 'leads', 'leads.json', leads);
}

// --- OFFERS ---

export async function getOffers(): Promise<Offer[]> {
  return getData<Offer[]>('crm', 'offers', 'offers.json', []);
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
  if (!offer.accessPin) {
    offer.accessPin = Math.floor(1000 + Math.random() * 9000).toString();
  }
  
  if (index >= 0) offers[index] = offer;
  else offers.push(offer);
  
  await saveData('crm', 'offers', 'offers.json', offers);
}

export async function deleteOffer(id: string): Promise<void> {
  let offers = await getOffers();
  offers = offers.filter(o => o.id !== id);
  await saveData('crm', 'offers', 'offers.json', offers);
}

// --- EVENTS ---

export async function getEvents(): Promise<any[]> {
  return getData<any[]>('crm', 'events', 'events.json', []);
}

export async function saveEvent(event: any): Promise<void> {
  const events = await getEvents();
  const index = events.findIndex(e => e.id === event.id);
  if (index >= 0) events[index] = event;
  else events.push(event);
  await saveData('crm', 'events', 'events.json', events);
}

export async function deleteEvent(id: string): Promise<void> {
  let events = await getEvents();
  events = events.filter(e => e.id !== id);
  await saveData('crm', 'events', 'events.json', events);
}

// --- FAQS ---

export async function getFAQs(): Promise<any[]> {
  return getData<any[]>('crm', 'faqs', 'faqs.json', []);
}

export async function getFAQsByTarget(category: string, targetSlug: string): Promise<any[]> {
  const faqs = await getFAQs();
  return faqs.filter(faq => faq.category === category && faq.targetSlug === targetSlug);
}

export async function saveFAQ(faq: any): Promise<void> {
  const faqs = await getFAQs();
  const index = faqs.findIndex(f => f.id === faq.id);
  if (index >= 0) faqs[index] = faq;
  else faqs.push(faq);
  await saveData('crm', 'faqs', 'faqs.json', faqs);
}

export async function deleteFAQ(id: string): Promise<void> {
  let faqs = await getFAQs();
  faqs = faqs.filter(f => f.id !== id);
  await saveData('crm', 'faqs', 'faqs.json', faqs);
}

// --- CMS DATA (SERVICES, PROBLEMS, LOCATIONS) ---

export async function getCMSData(type: 'services' | 'problems' | 'locations'): Promise<any[]> {
  return getData<any[]>('cms', type, `${type}.json`, []);
}

export async function saveCMSData(type: 'services' | 'problems' | 'locations', data: any[]): Promise<void> {
  await saveData('cms', type, `${type}.json`, data);
}

// --- CASE STUDIES ---

export async function getCases(): Promise<any[]> {
  return getData<any[]>('cms', 'cases', 'cases.json', []);
}

export async function saveCase(caseItem: any): Promise<void> {
  const cases = await getCases();
  const index = cases.findIndex(c => c.id === caseItem.id);
  if (index >= 0) cases[index] = caseItem;
  else {
    if (!caseItem.id) caseItem.id = Date.now();
    cases.push(caseItem);
  }
  await saveData('cms', 'cases', 'cases.json', cases);
}

export async function deleteCase(id: number): Promise<void> {
  let cases = await getCases();
  cases = cases.filter(c => c.id !== id);
  await saveData('cms', 'cases', 'cases.json', cases);
}

// --- ADMIN SETTINGS ---

const defaultSettings = {
  offerIntroTemplate: 'Sehr geehrte(r) {KUNDE_NAME},\n\nvielen Dank für Ihre Anfrage. Gerne unterbreiten wir Ihnen folgendes Angebot für Ihr Parkett.',
  offerFooterTemplate: 'Vielen Dank für Ihr Vertrauen in Parkett-Pflege.ch. Bei Fragen stehen wir jederzeit zur Verfügung.',
  emailOfferLinkTemplate: 'Guten Tag {KUNDE_NAME},\n\nIhre Offerte ist nun bereit.\nSie können diese unter folgendem Link aufrufen: {LINK}\n\nIhr persönlicher Zugangs-PIN lautet: {PIN}\n\nFreundliche Grüsse,\nIhr Parkett-Pflege.ch Team',
  emailConfirmationTemplate: 'Guten Tag {KUNDE_NAME},\n\nvielen Dank! Wir haben Ihre Bestätigung zur Offerte {OFFER_ID} erhalten und werden uns in Kürze zwecks Terminvereinbarung bei Ihnen melden.\n\nFreundliche Grüsse,\nIhr Parkett-Pflege.ch Team',
  emailOrderConfirmationTemplate: 'Guten Tag {KUNDE_NAME},\n\nvielen Dank für Ihre Auftragserteilung zur Offerte {OFFER_ID}. Wir freuen uns auf die Ausführung! Wir werden uns in Kürze bei Ihnen melden.\n\nFreundliche Grüsse,\nIhr Parkett-Pflege.ch Team'
};

export async function getSettings(): Promise<any> {
  const settings = await getData<any>('crm', 'settings', 'settings.json', {});
  return { ...defaultSettings, ...settings };
}

export async function saveSettings(settings: any): Promise<void> {
  await saveData('crm', 'settings', 'settings.json', settings);
}
