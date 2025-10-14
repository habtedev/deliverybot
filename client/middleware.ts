import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const PROTECTED_PATHS = ["/admin", "/customer"];

export function middleware(request: NextRequest) {
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
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/customer/:path*"]
};
