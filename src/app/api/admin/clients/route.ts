// src/app/api/admin/clients/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const adminAuth = request.cookies.get('admin-auth');
    const isAdmin = adminAuth?.value === 'true';

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('📋 Fetching all client data...');

    // Get all client portal keys from Redis
    const keys = await redis.keys('client_portal:*');
    
    const clients = [];
    
    for (const key of keys) {
      const portalData = await redis.hgetall(key);
      if (portalData && Object.keys(portalData).length > 0) {
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
                p && p.client?.email?.toLowerCase() === String(portalData.clientEmail).toLowerCase()
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
                q && q.client?.email?.toLowerCase() === String(portalData.clientEmail).toLowerCase()
              );
            }
          }
        } catch (error) {
          console.log('Error parsing proposals/questionnaires data:', error);
          // Keep proposals and questionnaires as empty arrays
        }

        const acceptedProposals = proposals.filter((p: any) => p?.status === 'accepted');
        const completedForms = questionnaires.filter((q: any) => q?.status === 'completed');
        const totalValue = acceptedProposals.reduce((sum: number, p: any) => sum + (p?.cost || 0), 0);

        // Simple: Use stored status if it exists, otherwise calculate
        const storedStatus = portalData.status;
        const calculatedStatus = acceptedProposals.length > 0 ? 'active' : proposals.length > 0 ? 'prospect' : 'inactive';
        const clientStatus = storedStatus || calculatedStatus;

        clients.push({
          id: String(portalData.id),
          name: String(portalData.clientName),
          email: String(portalData.clientEmail),
          company: String(portalData.clientCompany || ''),
          phone: '', // Not stored in portal data currently
          createdAt: String(portalData.createdAt),
          lastActivity: String(portalData.createdAt), // Use createdAt as fallback
          portalId: String(portalData.id),
          portalActive: Boolean(portalData.isActive) && portalData.isActive !== 'false',
          status: clientStatus,
          proposalCount: proposals.length,
          questionnaireCount: questionnaires.length,
          acceptedProposals: acceptedProposals.length,
          completedForms: completedForms.length,
          totalValue: totalValue,
          totalPortalViews: 0, // Could be tracked separately
          lastPortalAccess: null // Could be tracked separately
        });
      }
    }

    // Also get manual clients
    const manualKeys = await redis.keys('manual_client:*');
    
    for (const key of manualKeys) {
      const clientData = await redis.hgetall(key);
      if (clientData && Object.keys(clientData).length > 0) {
        // Get additional client stats for manual clients too
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

        // For manual clients, use the stored status if it exists, otherwise calculate
        const storedStatus = clientData.status;
        const calculatedStatus = acceptedProposals.length > 0 ? 'active' : proposals.length > 0 ? 'prospect' : 'inactive';
        const clientStatus = storedStatus || calculatedStatus;

        clients.push({
          id: String(clientData.id),
          name: String(clientData.name),
          email: String(clientData.email),
          company: String(clientData.company || ''),
          phone: String(clientData.phone || ''),
          createdAt: String(clientData.createdAt),
          lastActivity: String(clientData.lastActivity || clientData.createdAt),
          portalId: String(clientData.portalId || ''),
          portalActive: Boolean(clientData.portalActive) && clientData.portalActive !== 'false',
          status: clientStatus,
          proposalCount: proposals.length,
          questionnaireCount: questionnaires.length,
          acceptedProposals: acceptedProposals.length,
          completedForms: completedForms.length,
          totalValue: totalValue,
          totalPortalViews: 0,
          lastPortalAccess: null
        });
      }
    }

    // Remove duplicates based on email (in case client exists in both portal and manual)
    const uniqueClients = clients.filter((client, index, self) => 
      index === self.findIndex(c => c.email.toLowerCase() === client.email.toLowerCase())
    );

    // Sort by creation date (newest first)
    uniqueClients.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    console.log(`✅ Found ${uniqueClients.length} unique clients from ${clients.length} total records`);
    
    return NextResponse.json(uniqueClients);

  } catch (error) {
    console.error('❌ Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}