import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    
    // Check against env variable or default
    const validPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (password === validPassword) {
      // Set an HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Falsches Passwort' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Interner Server Fehler' }, { status: 500 });
  }
}
