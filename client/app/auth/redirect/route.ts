// deliverybot/client/app/auth/redirect/route.ts
import { NextResponse } from 'next/server';

function base64UrlDecode(input: string) {
  // Pad and replace URL-safe chars
  input = input.replace(/-/g, '+').replace(/_/g, '/');
  while (input.length % 4) input += '=';
  try {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(input, 'base64').toString('utf8');
    }
  } catch {}
  // Fallback for environments without Buffer
  try {
    return decodeURIComponent(atob(input).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch {
    return '';
  }
}

function deriveMaxAgeFromJwt(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return undefined;
    const payload = parts[1];
    const json = base64UrlDecode(payload);
    const obj = JSON.parse(json);
    const iat = typeof obj.iat === 'number' ? obj.iat : undefined;
    const exp = typeof obj.exp === 'number' ? obj.exp : undefined;
    if (exp && iat) return Math.max(0, exp - (iat || 0));
    if (exp) return Math.max(0, exp - Math.floor(Date.now() / 1000));
    return undefined;
  } catch {
    return undefined;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const nextPath = (url.searchParams.get('next') || 'customer').replace(/^\//, '');

  console.log('[auth.redirect] incoming params:', url.searchParams.toString());
  if (!token) {
    // No token — redirect to unauthorized view
    return NextResponse.redirect(new URL('/unauthorized', url));
  }

  // Derive cookie lifetime from token if possible, otherwise default to 2 hours
  const derived = deriveMaxAgeFromJwt(token);
  const maxAge = typeof derived === 'number' && derived > 0 ? derived : 60 * 60 * 2;

  const res = NextResponse.redirect(new URL(`/${nextPath}`, url));
  // Set HttpOnly cookie on the FRONTEND domain (this route runs on the frontend)
  res.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    // Use 'none' in production so cross-site webviews (Telegram) can send cookies.
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge,
  });
  console.log('[auth.redirect] set auth_token cookie (httpOnly, secure=%s, sameSite=%s, maxAge=%d)', process.env.NODE_ENV === 'production', process.env.NODE_ENV === 'production' ? 'none' : 'lax', maxAge);

  return res;
}

export const runtime = 'edge';
