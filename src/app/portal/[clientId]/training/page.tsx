// src/app/portal/[clientId]/training/page.tsx
import { notFound } from 'next/navigation';
import { getClientPortal } from '@/lib/clientPortal';
import ClientPortalLayout from '@/components/portal/ClientPortalLayout';
import PortalTrainingCenter from '@/components/portal/PortalTrainingCenter';
import TrackingPixel from '@/components/TrackingPixel';

interface PortalTrainingPageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default async function PortalTrainingPage({ params }: PortalTrainingPageProps) {
  const { clientId } = await params;
  
  const clientPortal = await getClientPortal(clientId);
  
  if (!clientPortal || !clientPortal.isActive) {
    notFound();
  }

  return (
    <>
      <TrackingPixel type="portal" id={clientId} section="training" />
      <ClientPortalLayout clientPortal={clientPortal}>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Training Center</h1>
            <p className="text-slate-600 mt-2">
              Access training videos, courses, and educational resources to maximize your results.
            </p>
          </div>
          
          <PortalTrainingCenter clientPortal={clientPortal} />
        </div>
      </ClientPortalLayout>
    </>
  );
}