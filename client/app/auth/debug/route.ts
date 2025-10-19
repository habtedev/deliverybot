import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const runtime = 'edge';

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (process.env.NODE_ENV === 'production') return NextResponse.json({ error: 'not available in production' }, { status: 403 });

  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/(?:^|;)\s*auth_token=([^;]+)/);
  const token = match ? decodeURIComponent(match[1]) : null;

  const secret = process.env.JWT_SECRET;
  if (!secret) return NextResponse.json({ jwtPresent: false, message: 'JWT_SECRET missing in Edge' });

  if (!token) return NextResponse.json({ jwtPresent: true, tokenPresent: false });

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(secret));
    return NextResponse.json({ tokenPresent: true, verified: true, payload: verified.payload });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ tokenPresent: true, verified: false, error: msg });
  }
}
