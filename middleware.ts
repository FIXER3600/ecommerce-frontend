import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; 

  const { pathname } = req.nextUrl;

  const publicPaths = ["/auth/signin", "/auth/signup"];

  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  if (!token && !isPublic) {
    const signinUrl = new URL("/auth/signin", req.url);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", 
  ],
};
