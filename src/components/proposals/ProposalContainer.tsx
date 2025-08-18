// src/components/proposals/ProposalContainer.tsx
'use client';

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
  // Destructure with defaults to handle missing properties
  const { 
    isRecurring = false, 
    paymentType, 
    downPayment, 
    installmentCount
  } = proposal;

  // Create a description for the payment
  const paymentDescription = `${proposal.client.name} - Services Agreement`;

  // Determine subscription interval based on isRecurring
  const getSubscriptionInterval = (): 'month' | 'year' => {
    // You can customize this logic based on your business needs
    // For now, defaulting to monthly subscriptions
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
        />

        {/* Accept Button - Updated to use payment links */}
        <AcceptButton 
          proposalId={proposal.id}
          amount={proposal.cost}
          description={paymentDescription}
          clientEmail={proposal.client.email}
          isSubscription={isRecurring}
          subscriptionInterval={getSubscriptionInterval()}
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