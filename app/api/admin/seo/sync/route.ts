import { NextResponse } from 'next/server';
import { saveCMSData, saveFAQ, saveCase } from '@/lib/data-service';

// Static imports to bypass Vercel Serverless File NFT bundling issues
import servicesData from '@/data/services.json';
import problemsData from '@/data/problems.json';
import locationsData from '@/data/locations.json';
import faqsData from '@/data/faqs.json';
import casesData from '@/data/cases.json';

export async function POST(req: Request) {
  try {
    // 1. Sync Services
    await saveCMSData('services', servicesData);
    console.log('Synced services statically to Firestore');

    // 2. Sync Problems
    await saveCMSData('problems', problemsData);
    console.log('Synced problems statically to Firestore');

    // 3. Sync Locations
    await saveCMSData('locations', locationsData);
    console.log('Synced locations statically to Firestore');

    // 4. Sync FAQs
    for (const faq of faqsData) {
      await saveFAQ(faq);
    }
    console.log('Synced FAQs statically to Firestore');

    // 5. Sync Cases
    for (const caseItem of casesData) {
      await saveCase(caseItem);
    }
    console.log('Synced cases statically to Firestore');

    return NextResponse.json({ 
      success: true, 
      message: 'Erfolgreich alle lokalen JSON-Daten statically in die Firestore-Datenbank geladen!' 
    });
  } catch (error: any) {
    console.error('Firestore Statically Sync Error:', error);
    return NextResponse.json({ error: error.message || 'Synchronisationsfehler' }, { status: 500 });
  }
}
