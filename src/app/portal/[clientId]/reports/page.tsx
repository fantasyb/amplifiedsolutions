// src/app/portal/[clientId]/reports/page.tsx
import { notFound } from 'next/navigation';
import { getClientPortal } from '@/lib/clientPortal';
import ClientPortalLayout from '@/components/portal/ClientPortalLayout';
import PortalReportsList from '@/components/portal/PortalReportsList';
import TrackingPixel from '@/components/TrackingPixel';

interface PortalReportsPageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default async function PortalReportsPage({ params }: PortalReportsPageProps) {
  const { clientId } = await params;
  
  console.log(`🔍 Loading reports page for clientId: ${clientId}`);
  
  try {
    const clientPortal = await getClientPortal(clientId);
    
    console.log('🔍 Client portal for reports:', clientPortal);
    
    if (!clientPortal) {
      console.log(`❌ No portal found for reports page: ${clientId}`);
      notFound();
    }

    // Check if portal is active (but don't block for testing)
    if (!clientPortal.isActive) {
      console.log(`⚠️ Portal ${clientId} is inactive but allowing access`);
    }

    return (
      <>
        <TrackingPixel type="portal" id={clientId} section="reports" />
        <ClientPortalLayout clientPortal={clientPortal}>
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Reports & Analytics</h1>
              <p className="text-slate-600 mt-2">
                Access your performance dashboards, ROI reports, and analytics data.
              </p>
            </div>
            
            <PortalReportsList clientPortal={clientPortal} />
          </div>
        </ClientPortalLayout>
      </>
    );
  } catch (error) {
    console.error('❌ Error loading reports page:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Reports</h1>
          <p className="text-slate-600 mb-4">Client ID: {clientId}</p>
          <pre className="bg-red-50 p-4 rounded text-left text-sm text-red-800">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      </div>
    );
  }
}