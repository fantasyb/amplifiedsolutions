// src/app/portal/[clientId]/links/page.tsx
import { notFound } from 'next/navigation';
import { getClientPortal } from '@/lib/clientPortal';
import ClientPortalLayout from '@/components/portal/ClientPortalLayout';
import PortalQuickLinks from '@/components/portal/PortalQuickLinks';
import TrackingPixel from '@/components/TrackingPixel';

interface PortalLinksPageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default async function PortalLinksPage({ params }: PortalLinksPageProps) {
  const { clientId } = await params;
  
  const clientPortal = await getClientPortal(clientId);
  
  if (!clientPortal || !clientPortal.isActive) {
    notFound();
  }

  return (
    <>
      <TrackingPixel type="portal" id={clientId} section="links" />
      <ClientPortalLayout clientPortal={clientPortal}>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Quick Links</h1>
            <p className="text-slate-600 mt-2">
              Fast access to all your tools, systems, and important resources.
            </p>
          </div>
          
          <PortalQuickLinks clientPortal={clientPortal} />
        </div>
      </ClientPortalLayout>
    </>
  );
}