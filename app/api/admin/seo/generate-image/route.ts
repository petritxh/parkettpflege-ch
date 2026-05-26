import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt wird benötigt' }, { status: 400 });
    }

    // Build a professional interior prompt for parquet floors
    const professionalPrompt = `beautiful clean elegant modern hardwood parquet floor, ${prompt}, ultra realistic, professional interior design architecture photography, high resolution, 8k, warm lighting, cozy elegant atmosphere`;
    
    // Pollinations AI endpoint
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(professionalPrompt)}?width=1200&height=800&nologo=true&seed=${Math.floor(Math.random() * 100000)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Bildgenerierung fehlgeschlagen');

    const buffer = Buffer.from(await res.arrayBuffer());

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique file name
    const timestamp = Date.now();
    const cleanPrompt = prompt.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 30);
    const filename = `ai_${timestamp}_${cleanPrompt}.jpg`;
    const filePath = path.join(uploadDir, filename);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      imageUrl: `/uploads/${filename}` 
    });

  } catch (error: any) {
    console.error('Image generation error:', error);
    return NextResponse.json({ error: error.message || 'Fehler bei der Bildgenerierung' }, { status: 500 });
  }
}
