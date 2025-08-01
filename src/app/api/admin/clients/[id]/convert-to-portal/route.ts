// src/app/api/admin/clients/[id]/convert-to-portal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { generateClientPortalId } from '@/lib/clientPortal';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check admin authentication
    const adminAuth = request.cookies.get('admin-auth');
    const isAdmin = adminAuth?.value === 'true';

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: clientId } = await params;
    console.log('🔄 Converting manual client to portal:', clientId);

    // Get the existing manual client
    const manualClientKey = `manual_client:${clientId}`;
    const clientData = await redis.hgetall(manualClientKey);

    if (!clientData || Object.keys(clientData).length === 0) {
      return NextResponse.json(
        { error: 'Manual client not found' },
        { status: 404 }
      );
    }

    // Check if they already have a portal
    if (clientData.portalId) {
      return NextResponse.json(
        { error: 'Client already has a portal' },
        { status: 409 }
      );
    }

    // Generate new portal ID
    const clientName = String(clientData.name || 'Unknown');
    const clientEmail = String(clientData.email || '');
    
    if (!clientEmail) {
      return NextResponse.json(
        { error: 'Client email is required' },
        { status: 400 }
      );
    }

    const portalId = generateClientPortalId(clientName, clientEmail);

    // Create portal data from existing client data
    const portalData = {
      id: portalId,
      clientEmail: clientEmail,
      clientName: clientName,
      clientCompany: String(clientData.company || ''),
      clientPhone: String(clientData.phone || ''),
      status: String(clientData.status || 'prospect'),
      notes: String(clientData.notes || ''),
      createdAt: String(clientData.createdAt || new Date().toISOString()),
      isActive: 'true'
    };

    // Create the portal record
    const portalKey = `client_portal:${portalId}`;
    await redis.hset(portalKey, portalData);

    // Store email -> portal mapping for lookups
    await redis.set(`client_email:${clientEmail.toLowerCase()}`, portalId);

    // Delete the old manual client record
    await redis.del(manualClientKey);
    await redis.srem('manual_clients', clientId);

    console.log('✅ Successfully converted manual client to portal:', portalId);

    return NextResponse.json({
      success: true,
      message: 'Client converted to portal successfully',
      portal: {
        id: portalId,
        url: `/portal/${portalId}`
      }
    });

  } catch (error) {
    console.error('❌ Error converting client to portal:', error);
    return NextResponse.json(
      { error: 'Failed to convert client to portal' },
      { status: 500 }
    );
  }
}