// src/app/api/admin/portals/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClientPortal } from '@/lib/clientPortal';

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const adminAuth = request.cookies.get('admin-auth');
    const isAdmin = adminAuth?.value === 'true';

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { clientEmail, clientName, clientCompany } = data;

    console.log('🌐 Creating portal for:', clientEmail);

    // Validate required fields
    if (!clientEmail || !clientName) {
      return NextResponse.json(
        { error: 'Client email and name are required' },
        { status: 400 }
      );
    }

    // Create the portal
    const portal = await createClientPortal(
      clientEmail,
      clientName,
      clientCompany
    );

    console.log('✅ Portal created successfully:', portal.id);

    return NextResponse.json({
      success: true,
      portal: {
        id: portal.id,
        url: `/portal/${portal.id}`,
        clientEmail: portal.clientEmail,
        clientName: portal.clientName,
        isActive: portal.isActive
      }
    });

  } catch (error) {
    console.error('❌ Error creating portal:', error);
    return NextResponse.json(
      { error: 'Failed to create portal' },
      { status: 500 }
    );
  }
}