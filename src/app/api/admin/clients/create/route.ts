// src/app/api/admin/clients/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const adminAuth = request.cookies.get('admin-auth');
    const isAdmin = adminAuth?.value === 'true';

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { name, email, company, phone, status, notes, createPortal } = data;

    console.log('👤 Creating client:', email);

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if client already exists in EITHER system
    const existingManualKeys = await redis.keys(`manual_client:*`);
    const existingPortalKeys = await redis.keys(`client_portal:*`);
    
    // Check manual clients
    for (const key of existingManualKeys) {
      const client = await redis.hgetall(key);
      if (client && client.email && String(client.email).toLowerCase() === email.toLowerCase()) {
        return NextResponse.json(
          { error: 'Client with this email already exists' },
          { status: 409 }
        );
      }
    }
    
    // Check portal clients
    for (const key of existingPortalKeys) {
      const portal = await redis.hgetall(key);
      if (portal && portal.clientEmail && String(portal.clientEmail).toLowerCase() === email.toLowerCase()) {
        return NextResponse.json(
          { error: 'Client with this email already exists as a portal client' },
          { status: 409 }
        );
      }
    }

    const now = new Date().toISOString();
    const clientStatus = status || 'prospect';

    // Decide whether to create portal based on business logic
    const shouldCreatePortal = createPortal || clientStatus === 'active';

    if (shouldCreatePortal) {
      // Create as portal client (single record)
      const portalId = `portal-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      
      const portalData = {
        id: portalId,
        clientEmail: email.toLowerCase().trim(),
        clientName: name.trim(),
        clientCompany: company?.trim() || '',
        clientPhone: phone?.trim() || '',
        status: clientStatus,
        notes: notes?.trim() || '',
        createdAt: now,
        isActive: 'true'
      };

      // Save as portal client
      const portalKey = `client_portal:${portalId}`;
      await redis.hset(portalKey, portalData);

      console.log('✅ Portal client created successfully:', portalId);

      return NextResponse.json({
        success: true,
        client: {
          id: portalId,
          name: portalData.clientName,
          email: portalData.clientEmail,
          company: portalData.clientCompany,
          phone: portalData.clientPhone,
          status: portalData.status,
          createdAt: portalData.createdAt,
          portalId: portalId,
          portalActive: true
        },
        portal: {
          id: portalId,
          url: `/portal/${portalId}`
        }
      }, { status: 201 });

    } else {
      // Create as manual client only (no portal)
      const clientId = `manual-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      
      const clientData = {
        id: clientId,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        company: company?.trim() || '',
        phone: phone?.trim() || '',
        status: clientStatus,
        notes: notes?.trim() || '',
        createdAt: now,
        lastActivity: now,
        source: 'manual',
        portalId: '',
        portalActive: 'false'
      };

      // Save as manual client
      const clientKey = `manual_client:${clientId}`;
      await redis.hset(clientKey, clientData);

      // Add to manual clients set for easy querying
      await redis.sadd('manual_clients', clientId);

      console.log('✅ Manual client created successfully:', clientId);

      return NextResponse.json({
        success: true,
        client: {
          id: clientId,
          name: clientData.name,
          email: clientData.email,
          company: clientData.company,
          phone: clientData.phone,
          status: clientData.status,
          createdAt: clientData.createdAt,
          portalId: '',
          portalActive: false
        },
        portal: null
      }, { status: 201 });
    }

  } catch (error) {
    console.error('❌ Error creating client:', error);
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    );
  }
}