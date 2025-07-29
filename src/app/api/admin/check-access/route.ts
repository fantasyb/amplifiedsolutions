// src/app/api/admin/check-access/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const isAuthenticated = request.cookies.get('admin-auth')?.value === 'true';
    
    if (!isAuthenticated) {
      return NextResponse.json({ 
        error: 'Not authenticated',
        accessLevel: 'none' 
      }, { status: 401 });
    }

    // Get the user role from the cookie
    const userRole = request.cookies.get('user-role')?.value;
    
    // Map role to access level
    let accessLevel = 'limited';
    if (userRole === 'admin') {
      accessLevel = 'full';
    } else if (userRole === 'team') {
      accessLevel = 'limited';
    }
    
    return NextResponse.json({ 
      accessLevel,
      role: userRole,
      authenticated: true
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to check access',
      accessLevel: 'none'
    }, { status: 500 });
  }
}