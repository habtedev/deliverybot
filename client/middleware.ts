import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_PATHS = ["/admin", "/customer"];

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url);
  // Only protect /admin and /customer
  if (!PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  try {
    // Use jose for Edge-compatible verification
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*"]
};
