// src/app/portal/[clientId]/forms/page.tsx
import { notFound } from 'next/navigation';
import { getClientPortal, getQuestionnairesForClient } from '@/lib/clientPortal';
import ClientPortalLayout from '@/components/portal/ClientPortalLayout';
import PortalFormsList from '@/components/portal/PortalFormsList';
import TrackingPixel from '@/components/TrackingPixel';

interface PortalFormsPageProps {
  params: Promise<{
    clientId: string;
  }>;
}

export default async function PortalFormsPage({ params }: PortalFormsPageProps) {
  const { clientId } = await params;
  
  const clientPortal = await getClientPortal(clientId);
  
  if (!clientPortal || !clientPortal.isActive) {
    notFound();
  }

  const questionnaires = await getQuestionnairesForClient(clientPortal.clientEmail);

  return (
    <>
      <TrackingPixel type="portal" id={clientId} section="forms" />
      <ClientPortalLayout clientPortal={clientPortal}>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Your Forms</h1>
            <p className="text-slate-600 mt-2">
              Complete questionnaires and forms to help us better serve your needs.
            </p>
          </div>
          
          <PortalFormsList questionnaires={questionnaires} clientPortal={clientPortal} />
        </div>
      </ClientPortalLayout>
    </>
  );
}