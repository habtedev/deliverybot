// deliverybot/client/app/auth/redirect/route.ts
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

type JwtPayload = {
  name?: string;
  phone?: string;
  role?: string;
  iat?: number;
  exp?: number;
};

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
  let nextPath = (url.searchParams.get('next') || 'customer').replace(/^\//, '');

  console.log('[auth.redirect] incoming params:', url.searchParams.toString());
  // Debug: token length and masked excerpt
  console.log('[auth.redirect] token present? %s, length: %d', !!token, token ? token.length : 0);
  if (token) {
    const safe = token.length > 20 ? `${token.slice(0,8)}...${token.slice(-8)}` : token;
    console.log('[auth.redirect] token excerpt:', safe);
  }

  if (!token) {
    // No token — redirect to unauthorized view
    console.warn('[auth.redirect] no token in query');
    return NextResponse.redirect(new URL('/unauthorized', url));
  }

  const secret = process.env.JWT_SECRET;
  // Non-sensitive debug: log presence and length of secret (do NOT log the value)
  console.log('[auth.redirect] JWT_SECRET present? %s, len=%d', !!secret, secret ? secret.length : 0);
  if (!secret) {
    console.error('[auth.redirect] JWT_SECRET missing in Edge environment');
    // Fail closed to avoid setting cookies without verification
    return new NextResponse('Server misconfiguration', { status: 500 });
  }

  // Verify token signature and expiry before setting cookie
  function isJwtPayload(obj: unknown): obj is JwtPayload {
    if (typeof obj !== 'object' || obj === null) return false;
    const o = obj as Record<string, unknown>;
    return 'role' in o || 'name' in o;
  }

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(secret));
    const payload = verified.payload as unknown;
    if (!isJwtPayload(payload)) {
      console.warn('[auth.redirect] token payload unexpected shape');
      return NextResponse.redirect(new URL('/unauthorized', url));
    }
    console.log('[auth.redirect] token verified; payload:', JSON.stringify(payload));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn('[auth.redirect] token verification failed:', msg);
    return NextResponse.redirect(new URL('/unauthorized', url));
  }

  // Accept only explicit known roles/paths to avoid accidental redirects
  const ALLOWED = new Set(['customer', 'admin']);
  if (!ALLOWED.has(nextPath)) {
    console.warn('[auth.redirect] unexpected next param, defaulting to customer:', nextPath);
    nextPath = 'customer';
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
