import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'Keine Datei hochgeladen' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique file name
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9\.\-_]/g, '_');
    const filename = `${timestamp}_${cleanFileName}`;
    const filePath = path.join(uploadDir, filename);

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true, 
      imageUrl: `/uploads/${filename}` 
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Fehler beim Hochladen' }, { status: 500 });
  }
}
