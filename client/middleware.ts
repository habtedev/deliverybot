import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_PATHS = ["/admin", "/customer"];

function buildAuthCookie(token: string) {
  const isProd = process.env.NODE_ENV === "production";
  const parts = [
    `auth_token=${encodeURIComponent(token)}`,
    `Path=/`,
    `Max-Age=${60 * 60}`,
    `SameSite=Lax`,
    `HttpOnly`,
  ];
  if (isProd) parts.push("Secure");
  return parts.join("; ");
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET missing in Edge environment");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  const tokenFromUrl = searchParams.get("token");
  if (tokenFromUrl) {
    try {
      const { payload } = await jwtVerify(tokenFromUrl, new TextEncoder().encode(secret));
      const role = (payload as any).role;

      if (pathname.startsWith("/admin") && role !== "admin")
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      if (pathname.startsWith("/customer") && role !== "customer" && role !== "admin")
        return NextResponse.redirect(new URL("/unauthorized", request.url));

      const redirectUrl = new URL(request.url);
      redirectUrl.searchParams.delete("token");

      const res = NextResponse.redirect(redirectUrl);
      res.headers.set("Set-Cookie", buildAuthCookie(tokenFromUrl));
      return res;
    } catch (err) {
      console.error("JWT invalid:", err);
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // check cookie or authorization header
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/(?:^|;)\s*auth_token=([^;]+)/);
  const token = match ? decodeURIComponent(match[1]) : null;

  if (!token) {
    const auth = request.headers.get("authorization") || "";
    if (auth.toLowerCase().startsWith("bearer ")) {
      try {
        const { payload } = await jwtVerify(auth.slice(7).trim(), new TextEncoder().encode(secret));
        const role = (payload as any).role;
        if (pathname.startsWith("/admin") && role !== "admin") return NextResponse.redirect(new URL("/unauthorized", request.url));
        if (pathname.startsWith("/customer") && role !== "customer" && role !== "admin") return NextResponse.redirect(new URL("/unauthorized", request.url));
        return NextResponse.next();
      } catch (err) {
        console.error("Bearer token invalid:", err);
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    const role = (payload as any).role;
    if (pathname.startsWith("/admin") && role !== "admin") return NextResponse.redirect(new URL("/unauthorized", request.url));
    if (pathname.startsWith("/customer") && role !== "customer" && role !== "admin") return NextResponse.redirect(new URL("/unauthorized", request.url));
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*"],
};
