// src/components/proposals/ProposalContainer.tsx
import { Proposal } from '@/types/proposal';
import ProposalHeader from './ProposalHeader';
import ServiceBreakdown from './ServiceBreakdown';
import PricingSection from './PricingSection';
import TestimonialCards from './TestimonialCards';
import AcceptButton from './AcceptButton';

interface ProposalContainerProps {
  proposal: Proposal;
}

export default function ProposalContainer({ proposal }: ProposalContainerProps) {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <ProposalHeader
          client={proposal.client}
          proposalId={proposal.id}
          createdAt={proposal.createdAt}
          expiresAt={proposal.expiresAt}
        />

        {/* Services */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 lg:p-12">
          <ServiceBreakdown services={proposal.services} />
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 lg:p-12">
          <TestimonialCards />
        </div>

        {/* Pricing */}
        <PricingSection cost={proposal.cost} notes={proposal.notes} />

        {/* Accept Button */}
        <AcceptButton 
          stripeCheckoutUrl={proposal.stripeCheckoutUrl} 
          cost={proposal.cost}
        />

        {/* Footer */}
        <div className="text-center py-8 text-slate-500 text-sm">
          <p>© 2025 Amplified Solutions. All rights reserved.</p>
          <p className="mt-2">
            This proposal is valid until {proposal.expiresAt?.toLocaleDateString() || 'further notice'}.
          </p>
        </div>
      </div>
    </div>
  );
}