// src/components/proposals/ProposalContainer.tsx
'use client';

import { Proposal } from '@/types/proposal';
import ProposalHeader from './ProposalHeader';
import ServiceBreakdown from './ServiceBreakdown';
import PricingSection from './PricingSection';
import TermsSection from './TermsSection';
import TestimonialCards from './TestimonialCards';
import AcceptButton from './AcceptButton';

interface ProposalContainerProps {
  proposal: Proposal;
}

export default function ProposalContainer({ proposal }: ProposalContainerProps) {
  const {
    isRecurring = false,
    paymentType,
    downPayment,
    installmentCount
  } = proposal;

  const getCostAsNumber = (): number => {
    const cost = proposal.cost;
    if (typeof cost === 'number') return cost;
    const costString = String(cost);
    const cleanedCost = costString.replace(/[^0-9.-]+/g, '');
    return parseFloat(cleanedCost) || 0;
  };

  const numericCost = getCostAsNumber();
  const paymentDescription = `${proposal.client.name} - Services Agreement`;

  const getSubscriptionInterval = (): 'month' | 'year' => {
    return 'month';
  };

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

        {/* Testimonials - uncomment if you have them */}
        {/* <TestimonialCards /> */}

        {/* Pricing */}
        <PricingSection
          cost={proposal.cost}
          notes={proposal.notes}
          isRecurring={isRecurring}
          recurringPeriod="monthly"
          pricingBreakdown={proposal.pricingBreakdown}
        />

        {/* Terms & Conditions */}
        {proposal.terms && proposal.terms.length > 0 && (
          <TermsSection terms={proposal.terms} />
        )}

        {/* Accept Button */}
        <AcceptButton
          proposalId={proposal.id}
          amount={numericCost}
          description={paymentDescription}
          clientEmail={proposal.client.email}
          isSubscription={isRecurring}
          subscriptionInterval={getSubscriptionInterval()}
        />

        {/* Footer */}
        <div className="text-center py-8 text-slate-500 text-sm">
          <p>&copy; 2025 Amplified Solutions. All rights reserved.</p>
          <p className="mt-2">
            This proposal is valid until {proposal.expiresAt?.toLocaleDateString() || 'further notice'}.
          </p>
        </div>
      </div>
    </div>
  );
}
