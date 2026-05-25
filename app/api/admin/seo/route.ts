import { NextResponse } from 'next/server';
import { generateSeoLocation } from '@/lib/agents/seo-content';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { city } = await req.json();
    
    if (!city) {
      return NextResponse.json({ error: 'Stadt wird benötigt' }, { status: 400 });
    }

    // Agent ausführen
    const locationData = await generateSeoLocation(city);

    // Da wir im Prototyp sind, bearbeiten wir die locations.ts Datei direkt.
    // In Produktion würde man die Daten aus einer Datenbank (z.B. Postgres) laden.
    const filePath = path.join(process.cwd(), 'data', 'locations.ts');
    let fileContent = await fs.readFile(filePath, 'utf-8');

    // Das Array endet typischerweise mit `];` am Ende der Datei.
    // Wir ersetzen `];` mit dem neuen Objekt + `];`
    
    const newObjectString = `  ,
  {
    slug: '${locationData.slug}',
    name: '${locationData.name}',
    metaTitle: '${locationData.metaTitle.replace(/'/g, "\\'")}',
    metaDescription: '${locationData.metaDescription.replace(/'/g, "\\'")}',
    h1: '${locationData.h1.replace(/'/g, "\\'")}',
    intro: '${locationData.intro.replace(/'/g, "\\'")}',
    imageUrl: '${locationData.imageUrl}',
    stats: [
      { label: '${locationData.stats[0]?.label || "Anfahrt"}', value: '${locationData.stats[0]?.value || "Kostenlos"}' }
    ]
  }
];`;

    fileContent = fileContent.replace(/\n\];\s*$/, newObjectString);
    
    await fs.writeFile(filePath, fileContent, 'utf-8');

    return NextResponse.json({ success: true, location: locationData });

  } catch (error: any) {
    console.error('Fehler im SEO Agent:', error);
    return NextResponse.json({ error: error.message || 'Fehler bei der Generierung' }, { status: 500 });
  }
}
