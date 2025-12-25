import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin' || pathname === '/admin/') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get('adminToken')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('adminToken');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

