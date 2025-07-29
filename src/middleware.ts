import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect /admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    const adminAuth = request.cookies.get('admin-auth');
    
    if (!adminAuth || adminAuth.value !== 'true') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};