import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getFilePath = () => path.join(process.cwd(), 'data', 'products.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(getFilePath(), 'utf8');
    return NextResponse.json(JSON.parse(fileContents));
  } catch (error) {
    return NextResponse.json({ error: 'Fehler beim Laden' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const products = await req.json();
    fs.writeFileSync(getFilePath(), JSON.stringify(products, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Fehler beim Speichern' }, { status: 500 });
  }
}
