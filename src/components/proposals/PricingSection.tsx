// src/components/proposals/PricingSection.tsx
import { DollarSign } from 'lucide-react';
import { PricingItem } from '@/types/proposal';

interface PricingSectionProps {
  cost: number;
  notes?: string;
  isRecurring?: boolean;
  recurringPeriod?: string;
  pricingBreakdown?: PricingItem[];
}

export default function PricingSection({ cost, notes, isRecurring = false, recurringPeriod = 'monthly', pricingBreakdown }: PricingSectionProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getPeriodText = () => {
    if (!isRecurring) return 'One-time investment';

    switch (recurringPeriod?.toLowerCase()) {
      case 'monthly': return 'per month';
      case 'quarterly': return 'per quarter';
      case 'annually': return 'per year';
      case 'weekly': return 'per week';
      default: return `per ${recurringPeriod}`;
    }
  };

  const hasBreakdown = pricingBreakdown && pricingBreakdown.length > 0;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-y-48 translate-x-48" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-green-500/10 to-transparent rounded-full translate-y-36 -translate-x-36" />

      <div className="relative p-8 lg:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Investment</h2>
          <p className="text-slate-300 text-lg">
            {isRecurring ? 'Ongoing partnership for continuous growth' : 'A comprehensive solution tailored to your success'}
          </p>
        </div>

        {hasBreakdown ? (
          /* Multi-line pricing breakdown */
          <div className="max-w-2xl mx-auto mb-10 space-y-4">
            {pricingBreakdown.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/[0.08] transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-white text-lg">{item.label}</p>
                  {item.description && (
                    <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                  )}
                </div>
                <div className="flex-shrink-0 ml-6">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    {item.amount}
                  </span>
                </div>
              </div>
            ))}

            {isRecurring && (
              <p className="text-slate-400 text-sm text-center mt-4">
                30-days notice to cancel
              </p>
            )}
          </div>
        ) : (
          /* Standard single-price display */
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mb-6 shadow-2xl">
              <DollarSign className="w-12 h-12 text-white" />
            </div>

            <div className="mb-4">
              <span className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                {formatCurrency(cost)}
              </span>
            </div>

            <p className="text-slate-300 text-lg">
              {getPeriodText()}
            </p>

            {isRecurring && (
              <p className="text-slate-400 text-sm mt-2">
                30-days notice to cancel
              </p>
            )}
          </div>
        )}

        {/* Notes - Only show if provided */}
        {notes && (
          <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Important Notes
            </h4>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
