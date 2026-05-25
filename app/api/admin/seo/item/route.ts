import { NextResponse } from 'next/server';
import { getCMSData } from '@/lib/data-service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');

  if (!category || !slug) {
    return NextResponse.json({ error: 'Missing category or slug' }, { status: 400 });
  }

  try {
    let dataCategory: 'services' | 'problems' | 'locations';
    if (category === 'service') dataCategory = 'services';
    else if (category === 'problem') dataCategory = 'problems';
    else if (category === 'location') dataCategory = 'locations';
    else return NextResponse.json({ error: 'Invalid category' }, { status: 400 });

    const items = await getCMSData(dataCategory);
    const item = items.find((i: any) => i.slug === slug);

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error: any) {
    console.error('Fetch Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
