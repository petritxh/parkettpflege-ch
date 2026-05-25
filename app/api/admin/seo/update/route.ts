import { NextResponse } from 'next/server';
import { getCMSData, saveCMSData } from '@/lib/data-service';

export async function POST(req: Request) {
  try {
    const { category, slug, updates } = await req.json();
    
    // category comes in as 'service', 'problem', or 'location'
    let dataCategory: 'services' | 'problems' | 'locations';
    if (category === 'service') dataCategory = 'services';
    else if (category === 'problem') dataCategory = 'problems';
    else if (category === 'location') dataCategory = 'locations';
    else return NextResponse.json({ error: 'Invalid category' }, { status: 400 });

    const items = await getCMSData(dataCategory);
    const index = items.findIndex((i: any) => i.slug === slug);

    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Merge updates
    items[index] = { ...items[index], ...updates };

    await saveCMSData(dataCategory, items);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('CMS Update Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
