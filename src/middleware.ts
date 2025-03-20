import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/auth/signin", "/auth/signup"];
const postSignupRoutes = ["/auth/congratulations"];
const facilityRoutes = ["/location/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("user_role")?.value;

  if (publicRoutes.includes(pathname)) {
    if (token && role) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  }

  if (postSignupRoutes.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.match(/^\/wastedonation\/\d+/)) {
    if (role !== "Facility") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (facilityRoutes.includes(pathname)) {
    if (role !== "Facility") {
      return NextResponse.redirect(new URL("/location", request.url));
    }
  }

  if (!token || !role) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
