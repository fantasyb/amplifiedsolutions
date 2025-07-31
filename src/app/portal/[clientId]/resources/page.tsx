// src/app/portal/[clientId]/resources/page.tsx
import { notFound } from 'next/navigation';
import { getClientPortal } from '@/lib/clientPortal';
import ClientPortalLayout from '@/components/portal/ClientPortalLayout';
import PortalResourcesCenter from '@/components/portal/PortalResourcesCenter';
import TrackingPixel from '@/components/TrackingPixel';

interface PortalResourcesPageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default async function PortalResourcesPage({ params }: PortalResourcesPageProps) {
  const { clientId } = await params;
  
  const clientPortal = await getClientPortal(clientId);
  
  if (!clientPortal || !clientPortal.isActive) {
    notFound();
  }

  return (
    <>
      <TrackingPixel type="portal" id={clientId} section="resources" />
      <ClientPortalLayout clientPortal={clientPortal}>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Resources & Documents</h1>
            <p className="text-slate-600 mt-2">
              Download guides, templates, and reference materials to support your success.
            </p>
          </div>
          
          <PortalResourcesCenter clientPortal={clientPortal} />
        </div>
      </ClientPortalLayout>
    </>
  );
}