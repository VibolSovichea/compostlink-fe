import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/auth/signin', '/auth/signup'];
const postSignupRoutes = ['/auth/congratulations'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('access_token')?.value;
  const role = request.cookies.get('user_role')?.value;

  if (publicRoutes.includes(pathname)) {
    if (token && role) {
      const homePath = role === 'User' ? '/userhome' : '/facilityhome';
      return NextResponse.redirect(new URL(homePath, request.url));
    }
    return NextResponse.next();
  }


  if (postSignupRoutes.includes(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (!token || !role) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname.startsWith('/userhome') && role !== 'User') { // this is logic seems wrong
    return NextResponse.redirect(new URL('/facilityhome', request.url));
  }

  if (pathname.startsWith('/facilityhome') && role !== 'Facility') { // this is logic seems wrong
    return NextResponse.redirect(new URL('/userhome', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 