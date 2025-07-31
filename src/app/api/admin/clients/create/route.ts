// src/app/api/admin/clients/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
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
    const { name, email, company, phone, status, notes, createPortal } = data;

    console.log('👤 Creating manual client:', email);

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if client already exists
    const existingClientKey = await redis.keys(`manual_client:*${email.toLowerCase()}*`);
    if (existingClientKey.length > 0) {
      return NextResponse.json(
        { error: 'Client with this email already exists' },
        { status: 409 }
      );
    }

    // Generate unique client ID
    const clientId = `manual-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const now = new Date().toISOString();

    // Create client data
    const clientData = {
      id: clientId,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      company: company?.trim() || '',
      phone: phone?.trim() || '',
      status: status || 'prospect',
      notes: notes?.trim() || '',
      createdAt: now,
      lastActivity: now,
      source: 'manual',
      portalId: '',
      portalActive: 'false'
    };

    // Create portal if requested
    let portal = null;
    if (createPortal) {
      try {
        console.log('🌐 Creating portal for client:', email);
        portal = await createClientPortal(
          clientData.email,
          clientData.name,
          clientData.company || undefined
        );
        
        clientData.portalId = portal.id;
        clientData.portalActive = 'true';
        
        console.log('✅ Portal created:', portal.id);
      } catch (portalError) {
        console.error('❌ Error creating portal:', portalError);
        // Continue without portal - don't fail the entire client creation
      }
    }

    // Save client to Redis
    const clientKey = `manual_client:${clientId}`;
    await redis.hset(clientKey, clientData);

    // Add to manual clients set for easy querying
    await redis.sadd('manual_clients', clientId);

    console.log('✅ Manual client created successfully:', clientId);

    // Return success response
    const response = {
      success: true,
      client: {
        id: clientId,
        name: clientData.name,
        email: clientData.email,
        company: clientData.company,
        phone: clientData.phone,
        status: clientData.status,
        createdAt: clientData.createdAt,
        portalId: clientData.portalId,
        portalActive: clientData.portalActive === 'true'
      },
      portal: portal ? {
        id: portal.id,
        url: `/portal/${portal.id}`
      } : null
    };

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('❌ Error creating manual client:', error);
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    );
  }
}