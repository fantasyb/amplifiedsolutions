import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Two password levels
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'amplified2025'; // Full access
    const TEAM_PASSWORD = process.env.TEAM_PASSWORD || 'team2025'; // Limited access
    
    let userRole = '';
    
    if (password === ADMIN_PASSWORD) {
      userRole = 'admin'; // Full access to everything
    } else if (password === TEAM_PASSWORD) {
      userRole = 'team'; // Limited to forms and templates only
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, role: userRole });
    
    // Set HTTP-only cookies
    response.cookies.set('admin-auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    response.cookies.set('user-role', userRole, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}