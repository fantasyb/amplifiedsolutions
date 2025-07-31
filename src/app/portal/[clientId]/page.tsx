// src/app/portal/[clientId]/page.tsx
import { notFound } from 'next/navigation';
import { getClientPortal, getProposalsForClient, getQuestionnairesForClient } from '@/lib/clientPortal';
import ClientPortalLayout from '@/components/portal/ClientPortalLayout';
import PortalDashboard from '@/components/portal/PortalDashboard';
import TrackingPixel from '@/components/TrackingPixel';

interface PortalPageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default async function PortalPage({ params }: PortalPageProps) {
  // Await the params since they're now a Promise in Next.js 15
  const { clientId } = await params;

  console.log(`🔍 Loading portal for clientId: ${clientId}`);

  try {
    // Get client portal data using the portal ID
    const clientPortal = await getClientPortal(clientId);
    
    console.log('🔍 Client portal result:', clientPortal);
    
    if (!clientPortal) {
      console.log(`❌ No portal found for ID: ${clientId}`);
      notFound();
    }

    console.log(`✅ Found portal for: ${clientPortal.clientName} (${clientPortal.clientEmail})`);

    // Get proposals and questionnaires using the client's email
    const [proposals, questionnaires] = await Promise.all([
      getProposalsForClient(clientPortal.clientEmail),
      getQuestionnairesForClient(clientPortal.clientEmail)
    ]);

    console.log('Portal data loaded successfully:', {
      clientId,
      clientName: clientPortal.clientName,
      proposalsCount: proposals.length,
      questionnairesCount: questionnaires.length
    });

    return (
      <div>
        <ClientPortalLayout clientPortal={clientPortal}>
          <PortalDashboard 
            clientPortal={clientPortal}
            proposals={proposals}
            questionnaires={questionnaires}
          />
        </ClientPortalLayout>
        <TrackingPixel 
          type="portal" 
          id={clientId} 
          event="open" 
          section="dashboard" 
        />
      </div>
    );
  } catch (error) {
    console.error('❌ Error loading portal data:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      clientId
    });
    
    // Don't call notFound() immediately, let's see what the actual error is
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Portal</h1>
          <p className="text-slate-600 mb-4">There was an error loading the portal for client: {clientId}</p>
          <pre className="bg-red-50 p-4 rounded text-left text-sm text-red-800 max-w-lg">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      </div>
    );
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: PortalPageProps) {
  const { clientId } = await params;
  
  try {
    const clientPortal = await getClientPortal(clientId);
    
    return {
      title: clientPortal ? `${clientPortal.clientName} Portal - Amplified Solutions` : 'Client Portal - Amplified Solutions',
      description: 'Access your personalized client portal with proposals, resources, and training materials.',
    };
  } catch (error) {
    return {
      title: 'Client Portal - Amplified Solutions',
      description: 'Access your personalized client portal.',
    };
  }
}