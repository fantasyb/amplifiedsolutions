import { notFound } from 'next/navigation';
import { getProposal } from '@/data/proposals';
import ProposalContainer from '@/components/proposals/ProposalContainer';

interface ProposalPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    success?: string;
    canceled?: string;
  }>;
}

export default async function ProposalPage({ params, searchParams }: ProposalPageProps) {
  const { id } = await params;
  const { success, canceled } = await searchParams;
  
  console.log(`🔍 ProposalPage: Looking for proposal ${id}`);
  
  const proposal = getProposal(id);

  if (!proposal) {
    console.log(`❌ ProposalPage: Proposal ${id} not found`);
    notFound();
  }

  console.log(`✅ ProposalPage: Found proposal ${id}`);
  
  return (
    <div>
      {/* Success Banner */}
      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8 mx-4 sm:mx-6 lg:mx-8 mt-8 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-green-800">Payment Successful!</h3>
              <p className="text-green-700 mt-1">
                Thank you! Your payment has been processed successfully. We'll be in touch soon to get started on your project.
              </p>
              <div className="mt-3 text-sm text-green-600">
                <p>• You'll receive an email receipt shortly</p>
                <p>• Our team will contact you within 24 hours</p>
                <p>• Save this page for your records</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Canceled Banner */}
      {canceled && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 mx-4 sm:mx-6 lg:mx-8 mt-8 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">!</span>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-yellow-800">Payment Canceled</h3>
              <p className="text-yellow-700 mt-1">
                No worries! You can complete your payment anytime by clicking the "Accept Proposal" button below.
              </p>
            </div>
          </div>
        </div>
      )}

      <ProposalContainer proposal={proposal} />
    </div>
  );
}

export async function generateMetadata({ params }: ProposalPageProps) {
  const { id } = await params;
  const proposal = getProposal(id);

  if (!proposal) {
    return {
      title: 'Proposal Not Found | Amplified Solutions',
    };
  }

  return {
    title: `Proposal for ${proposal.client.name} | Amplified Solutions`,
    description: `Custom service proposal for ${proposal.client.name} - ${proposal.services.length} services for ${proposal.cost}`,
  };
}