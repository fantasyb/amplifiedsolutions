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
          status: acceptedProposals.length > 0 ? 'active' : proposals.length > 0 ? 'prospect' : 'inactive',
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

    // Sort by creation date (newest first)
    clients.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    console.log(`✅ Found ${clients.length} real clients from portals`);
    
    return NextResponse.json(clients);

  } catch (error) {
    console.error('❌ Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}