// src/app/api/admin/clients/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

// GET - Fetch single client
export async function GET(
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
    console.log('📋 Fetching client:', clientId);

    let clientData = null;
    let clientKey = '';

    // Try to find client in manual clients first
    const manualClientKey = `manual_client:${clientId}`;
    const manualClientData = await redis.hgetall(manualClientKey);
    
    if (manualClientData && Object.keys(manualClientData).length > 0) {
      clientKey = manualClientKey;
      clientData = manualClientData;
    } else {
      // Try to find in portal clients
      const portalClientKey = `client_portal:${clientId}`;
      const portalClientData = await redis.hgetall(portalClientKey);
      
      if (portalClientData && Object.keys(portalClientData).length > 0) {
        clientKey = portalClientKey;
        // Convert portal data to client format
        clientData = {
          id: String(portalClientData.id),
          name: String(portalClientData.clientName),
          email: String(portalClientData.clientEmail),
          company: String(portalClientData.clientCompany || ''),
          phone: '', // Not stored in portal data
          status: String(portalClientData.status || ''), // Get stored status from portal data
          notes: '',
          createdAt: String(portalClientData.createdAt),
          lastActivity: String(portalClientData.createdAt),
          source: 'portal',
          portalId: String(portalClientData.id),
          portalActive: String(portalClientData.isActive || 'true')
        };
      }
    }

    if (!clientData) {
      console.log('❌ Client not found:', clientId);
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    // Get additional client stats (proposals, questionnaires, etc.)
    let proposals: any[] = [];
    let questionnaires: any[] = [];
    
    try {
      const proposalsData = await redis.get('proposals');
      const questionnairesData = await redis.get('questionnaires');
      
      // Safely parse proposals
      if (proposalsData && proposalsData !== 'null') {
        let allProposals;
        if (typeof proposalsData === 'string') {
          allProposals = JSON.parse(proposalsData);
        } else {
          allProposals = proposalsData;
        }
        
        if (allProposals && typeof allProposals === 'object') {
          proposals = Object.values(allProposals).filter((p: any) => 
            p && p.client?.email?.toLowerCase() === String(clientData.email).toLowerCase()
          );
        }
      }
      
      // Safely parse questionnaires
      if (questionnairesData && questionnairesData !== 'null') {
        let allQuestionnaires;
        if (typeof questionnairesData === 'string') {
          allQuestionnaires = JSON.parse(questionnairesData);
        } else {
          allQuestionnaires = questionnairesData;
        }
        
        if (allQuestionnaires && typeof allQuestionnaires === 'object') {
          questionnaires = Object.values(allQuestionnaires).filter((q: any) => 
            q && q.client?.email?.toLowerCase() === String(clientData.email).toLowerCase()
          );
        }
      }
    } catch (error) {
      console.log('Error parsing proposals/questionnaires data:', error);
    }

    const acceptedProposals = proposals.filter((p: any) => p?.status === 'accepted');
    const completedForms = questionnaires.filter((q: any) => q?.status === 'completed');
    const totalValue = acceptedProposals.reduce((sum: number, p: any) => sum + (p?.cost || 0), 0);

    // Simple status logic - use stored status or calculate
    const calculatedStatus = acceptedProposals.length > 0 ? 'active' : proposals.length > 0 ? 'prospect' : 'inactive';
    const storedStatus = String(clientData.status || '');
    const displayStatus = storedStatus || calculatedStatus;

    // Format client response
    const client = {
      id: String(clientData.id),
      name: String(clientData.name),
      email: String(clientData.email),
      company: String(clientData.company || ''),
      phone: String(clientData.phone || ''),
      status: displayStatus, // This is what shows in the header and main list
      storedStatus: storedStatus, // This is what should populate the form
      notes: String(clientData.notes || ''),
      createdAt: String(clientData.createdAt),
      lastActivity: String(clientData.lastActivity || clientData.createdAt),
      portalId: String(clientData.portalId || ''),
      portalActive: Boolean(clientData.portalActive) && clientData.portalActive !== 'false',
      proposalCount: proposals.length,
      questionnaireCount: questionnaires.length,
      acceptedProposals: acceptedProposals.length,
      completedForms: completedForms.length,
      totalValue: totalValue,
      totalPortalViews: 0, // Could be tracked separately
      lastPortalAccess: null // Could be tracked separately
    };

    console.log('✅ Client found:', client.email);
    return NextResponse.json(client);

  } catch (error) {
    console.error('❌ Error fetching client:', error);
    return NextResponse.json(
      { error: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}

// PUT - Update client
export async function PUT(
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
    const updateData = await request.json();
    const { name, email, company, phone, status, notes } = updateData;

    console.log('📝 Updating client:', clientId);

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Find existing client
    let clientKey = '';
    let existingClient = null;

    // Check manual clients first
    const manualClientKey = `manual_client:${clientId}`;
    const manualClientData = await redis.hgetall(manualClientKey);
    
    if (manualClientData && Object.keys(manualClientData).length > 0) {
      clientKey = manualClientKey;
      existingClient = manualClientData;
    } else {
      // Check portal clients
      const portalClientKey = `client_portal:${clientId}`;
      const portalClientData = await redis.hgetall(portalClientKey);
      
      if (portalClientData && Object.keys(portalClientData).length > 0) {
        clientKey = portalClientKey;
        existingClient = portalClientData;
      }
    }

    if (!existingClient) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const now = new Date().toISOString();
    const updatedData: Record<string, string> = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      company: company?.trim() || '',
      phone: phone?.trim() || '',
      status: status || 'prospect',
      notes: notes?.trim() || '',
      lastActivity: now
    };

    // For portal clients, use different field names
    if (clientKey.startsWith('client_portal:')) {
      const portalUpdateData: Record<string, string> = {
        clientName: updatedData.name,
        clientEmail: updatedData.email,
        clientCompany: updatedData.company,
        status: updatedData.status, // Add status directly to portal data
        // Keep existing portal-specific fields
        id: String(existingClient.id),
        createdAt: String(existingClient.createdAt),
        isActive: String(existingClient.isActive || 'true')
      };
      
      await redis.hset(clientKey, portalUpdateData);
    } else {
      // For manual clients, preserve existing fields and update
      const finalUpdateData = {
        ...existingClient,
        ...updatedData
      };
      
      await redis.hset(clientKey, finalUpdateData);
    }

    console.log('✅ Client updated successfully:', clientId);

    return NextResponse.json({
      success: true,
      message: 'Client updated successfully'
    });

  } catch (error) {
    console.error('❌ Error updating client:', error);
    return NextResponse.json(
      { error: 'Failed to update client' },
      { status: 500 }
    );
  }
}

// DELETE - Delete client
export async function DELETE(
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
    console.log('🗑️ Deleting client:', clientId);

    // Find and delete from manual clients
    const manualClientKey = `manual_client:${clientId}`;
    const manualClientExists = await redis.exists(manualClientKey);
    
    if (manualClientExists) {
      await redis.del(manualClientKey);
      await redis.srem('manual_clients', clientId);
      console.log('✅ Manual client deleted:', clientId);
    } else {
      // Try to delete from portal clients
      const portalClientKey = `client_portal:${clientId}`;
      const portalClientExists = await redis.exists(portalClientKey);
      
      if (portalClientExists) {
        await redis.del(portalClientKey);
        console.log('✅ Portal client deleted:', clientId);
      } else {
        return NextResponse.json(
          { error: 'Client not found' },
          { status: 404 }
        );
      }
    }

    // TODO: Also clean up associated proposals, questionnaires, etc.
    // This would require more complex logic to find and remove related data

    return NextResponse.json({
      success: true,
      message: 'Client deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting client:', error);
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    );
  }
}