import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/signin', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  if (publicRoutes.includes(pathname)) {
    const token = request.cookies.get('token')?.value;
    const role = request.cookies.get('role')?.value;

    if (token && role) {
      const homePath = role === 'User' ? '/userhome' : '/facilityhome';
      return NextResponse.redirect(new URL(homePath, request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  if (!token || !role) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname.startsWith('/userhome') && role !== 'User') {
    return NextResponse.redirect(new URL('/facilityhome', request.url));
  }

  if (pathname.startsWith('/facilityhome') && role !== 'Facility') {
    return NextResponse.redirect(new URL('/userhome', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 