// src/app/portal/[clientId]/proposals/page.tsx
import { notFound } from 'next/navigation';
import { getClientPortal, getProposalsForClient } from '@/lib/clientPortal';
import ClientPortalLayout from '@/components/portal/ClientPortalLayout';
import PortalProposalsList from '@/components/portal/PortalProposalsList';
import TrackingPixel from '@/components/TrackingPixel';

interface PortalProposalsPageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default async function PortalProposalsPage({ params }: PortalProposalsPageProps) {
  const { clientId } = await params;
  
  console.log(`🔍 Loading proposals page for clientId: ${clientId}`);
  
  try {
    const clientPortal = await getClientPortal(clientId);
    
    console.log('🔍 Client portal for proposals:', clientPortal);
    
    if (!clientPortal) {
      console.log(`❌ No portal found for proposals page: ${clientId}`);
      notFound();
    }

    // Check if portal is active (but don't block for testing)
    if (!clientPortal.isActive) {
      console.log(`⚠️ Portal ${clientId} is inactive but allowing access`);
    }

    const proposals = await getProposalsForClient(clientPortal.clientEmail);
    
    console.log(`📋 Found ${proposals.length} proposals for ${clientPortal.clientEmail}`);

    return (
      <>
        <TrackingPixel type="portal" id={clientId} section="proposals" />
        <ClientPortalLayout clientPortal={clientPortal}>
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Your Proposals</h1>
              <p className="text-slate-600 mt-2">
                Review and manage your service proposals from Amplified Solutions.
              </p>
            </div>
            
            <PortalProposalsList proposals={proposals} clientPortal={clientPortal} />
          </div>
        </ClientPortalLayout>
      </>
    );
  } catch (error) {
    console.error('❌ Error loading proposals page:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Proposals</h1>
          <p className="text-slate-600 mb-4">Client ID: {clientId}</p>
          <pre className="bg-red-50 p-4 rounded text-left text-sm text-red-800">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      </div>
    );
  }
}