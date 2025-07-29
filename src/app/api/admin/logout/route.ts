// src/app/api/admin/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });
    
    // Clear the admin auth cookie
    response.cookies.set('admin-auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
    });
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}