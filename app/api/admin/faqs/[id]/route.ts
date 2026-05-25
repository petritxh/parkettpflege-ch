import { NextResponse } from 'next/server';
import { getFAQs, saveFAQ, deleteFAQ } from '@/lib/data-service';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await req.json();
    const faqs = await getFAQs();
    const existingFaq = faqs.find(f => f.id === resolvedParams.id);
    
    if (!existingFaq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }
    
    const updatedFaq = {
      ...existingFaq,
      category: body.category || existingFaq.category,
      targetSlug: body.targetSlug !== undefined ? body.targetSlug : existingFaq.targetSlug,
      question: body.question || existingFaq.question,
      answer: body.answer || existingFaq.answer
    };
    
    await saveFAQ(updatedFaq);
    
    return NextResponse.json({ success: true, faq: updatedFaq });
  } catch (error: any) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await deleteFAQ(resolvedParams.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
