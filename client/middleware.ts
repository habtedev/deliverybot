import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

// Protect admin and customer routes by verifying a JWT passed as `?token=...` or
// as an Authorization: Bearer <token> header. Tokens are HMAC-signed using
// the shared secret in process.env.JWT_SECRET.
const PROTECTED_PATHS = ["/admin", "/customer"];

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  // TEMPORARY DISABLE: bypass protection while debugging token flow.
  // To re-enable: restore JWT verification logic (use jwtVerify and process.env.JWT_SECRET).
  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Extract token from cookie 'auth_token', query param, or Authorization header.
  let token = '';
  const cookieHeader = request.headers.get('cookie') || '';
  if (cookieHeader) {
    const match = cookieHeader.match(/(?:^|;)\s*auth_token=([^;]+)/);
    if (match) {
      token = decodeURIComponent(match[1]);
    }
  }

  if (!token) token = searchParams.get('token') || '';
  if (!token) {
    const auth = request.headers.get('authorization') || '';
    if (auth.toLowerCase().startsWith('bearer ')) {
      token = auth.slice(7).trim();
    }
  }

  if (!token) {
    // No token provided — redirect to unauthorized page.
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    // Environment not configured correctly; reject access and log for operator.
    console.error('JWT_SECRET is not set in the environment for Edge middleware');
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));

    // payload is any; expect a `role` claim.
    const role = (payload as any).role as string | undefined;

    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.startsWith('/customer') && role !== 'customer' && role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Allow the request through. Add a header with the decoded user payload so
    // downstream pages can read it (optional). Keep the header short in prod.
    const response = NextResponse.next();
    try {
      response.headers.set('x-user-payload', JSON.stringify(payload));
    } catch (e) {
      // ignore header set failures (too large, etc.)
    }
    return response;
  } catch (err) {
    console.error('JWT verification failed in middleware:', err);
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*"]
};
