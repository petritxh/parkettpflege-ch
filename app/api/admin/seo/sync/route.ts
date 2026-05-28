import { NextResponse } from 'next/server';
import { saveCMSData, getFAQs, saveFAQ, getCases, saveCase } from '@/lib/data-service';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const dataDir = path.join(process.cwd(), 'data');

    // 1. Services
    const servicesPath = path.join(dataDir, 'services.json');
    const servicesData = JSON.parse(await fs.readFile(servicesPath, 'utf-8'));
    await saveCMSData('services', servicesData);
    console.log('Synced services to Firestore');

    // 2. Problems
    const problemsPath = path.join(dataDir, 'problems.json');
    const problemsData = JSON.parse(await fs.readFile(problemsPath, 'utf-8'));
    await saveCMSData('problems', problemsData);
    console.log('Synced problems to Firestore');

    // 3. Locations
    const locationsPath = path.join(dataDir, 'locations.json');
    const locationsData = JSON.parse(await fs.readFile(locationsPath, 'utf-8'));
    await saveCMSData('locations', locationsData);
    console.log('Synced locations to Firestore');

    // 4. FAQs
    const faqsPath = path.join(dataDir, 'faqs.json');
    const faqsData = JSON.parse(await fs.readFile(faqsPath, 'utf-8'));
    // Overwrite the whole FAQs collection in Firestore
    for (const faq of faqsData) {
      await saveFAQ(faq);
    }
    console.log('Synced FAQs to Firestore');

    // 5. Cases
    const casesPath = path.join(dataDir, 'cases.json');
    const casesData = JSON.parse(await fs.readFile(casesPath, 'utf-8'));
    for (const caseItem of casesData) {
      await saveCase(caseItem);
    }
    console.log('Synced cases to Firestore');

    return NextResponse.json({ 
      success: true, 
      message: 'Erfolgreich alle lokalen JSON-Daten in die Firestore-Datenbank importiert!' 
    });
  } catch (error: any) {
    console.error('Firestore Sync Error:', error);
    return NextResponse.json({ error: error.message || 'Synchronisationsfehler' }, { status: 500 });
  }
}
