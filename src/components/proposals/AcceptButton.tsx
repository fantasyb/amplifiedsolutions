// src/components/proposals/AcceptButton.tsx
'use client';

import { useState } from 'react';
import { ArrowRight, CreditCard, Shield, Clock } from 'lucide-react';

interface AcceptButtonProps {
  proposalId: string;
  amount: number;
  description: string;
  clientEmail?: string;
  isSubscription?: boolean;
  subscriptionInterval?: 'month' | 'year';
}

export default function AcceptButton({ 
  proposalId, 
  amount, 
  description, 
  clientEmail,
  isSubscription = false,
  subscriptionInterval = 'month'
}: AcceptButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAccept = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the API to create a payment link
      const response = await fetch('/api/create-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          proposalId,
          amount,
          description,
          customerEmail: clientEmail,
          isSubscription,
          subscriptionInterval
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment link');
      }

      const { url } = await response.json();
      
      // Add any tracking/analytics here
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'begin_checkout', {
          value: amount,
          currency: 'USD',
          items: [{
            item_id: proposalId,
            item_name: description,
            price: amount,
            quantity: 1
          }]
        });
      }
      
      // Redirect to the payment link
      window.location.href = url;
    } catch (err) {
      console.error('Error creating payment link:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getButtonText = () => {
    if (isLoading) return 'Creating payment link...';
    if (isSubscription) {
      const interval = subscriptionInterval === 'month' ? 'Monthly' : 'Yearly';
      return `Accept Proposal & Pay ${formatCurrency(amount)}/${interval}`;
    }
    return `Accept Proposal & Pay ${formatCurrency(amount)}`;
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32" />

      <div className="relative p-8 lg:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Accept this proposal and we'll begin transforming your business immediately. 
            Secure payment processing through Stripe.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="text-center">
            <Shield className="w-8 h-8 text-blue-200 mx-auto mb-2" />
            <div className="text-sm font-medium mb-1">Secure Payment</div>
            <div className="text-xs text-blue-200">256-bit SSL encryption</div>
          </div>
          <div className="text-center">
            <Clock className="w-8 h-8 text-blue-200 mx-auto mb-2" />
            <div className="text-sm font-medium mb-1">Quick Setup</div>
            <div className="text-xs text-blue-200">Implementation starts immediately</div>
          </div>
          <div className="text-center">
            <CreditCard className="w-8 h-8 text-blue-200 mx-auto mb-2" />
            <div className="text-sm font-medium mb-1">Easy Payment</div>
            <div className="text-xs text-blue-200">All major cards accepted</div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-center">
            <p className="text-red-100">{error}</p>
            <button 
              onClick={() => setError(null)}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Main CTA Button */}
        <div className="text-center">
          <button
            onClick={handleAccept}
            disabled={isLoading}
            className="group relative inline-flex items-center gap-3 px-12 py-5 bg-white text-blue-700 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span>{getButtonText()}</span>
            <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${isLoading ? 'animate-pulse' : 'group-hover:translate-x-1'}`} />
            
            {/* Button shine effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12" />
          </button>
          
          <p className="text-blue-100 text-sm mt-4 max-w-md mx-auto">
            {isSubscription 
              ? `By clicking above, you agree to our terms of service and authorize recurring ${subscriptionInterval}ly charges.`
              : 'By clicking above, you agree to our terms of service and will be redirected to our secure payment processor.'
            }
          </p>
        </div>

        {/* Emergency Contact */}
        <div className="mt-10 text-center border-t border-blue-500/30 pt-8">
          <p className="text-blue-100 text-sm mb-2">
            Questions about this proposal?
          </p>
          <a 
            href="mailto:joey@amplifiedsolutions.com" 
            className="text-white font-medium hover:text-blue-200 transition-colors"
          >
            Contact us directly at joey@amplifiedsolutions.com
          </a>
        </div>
      </div>
    </div>
  );
}