import { NextResponse } from 'next/server';
import { getCases, saveCase } from '@/lib/data-service';

export async function GET() {
  try {
    const cases = await getCases();
    return NextResponse.json(cases);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const caseItem = await req.json();
    await saveCase(caseItem);
    return NextResponse.json({ success: true, caseItem });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save case' }, { status: 500 });
  }
}
