import { NextResponse } from 'next/server';
import { getFAQs, saveFAQ } from '@/lib/data-service';

export async function GET() {
  try {
    const faqs = await getFAQs();
    return NextResponse.json(faqs);
  } catch (error: any) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Create new FAQ object
    const newFaq = {
      id: `faq-${Date.now()}`,
      category: body.category || 'general',
      targetSlug: body.targetSlug || '',
      question: body.question,
      answer: body.answer
    };
    
    await saveFAQ(newFaq);
    
    return NextResponse.json({ success: true, faq: newFaq });
  } catch (error: any) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
