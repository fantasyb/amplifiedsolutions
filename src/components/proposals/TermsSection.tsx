// src/components/proposals/TermsSection.tsx
import { TermSection } from '@/types/proposal';
import { Shield } from 'lucide-react';

interface TermsSectionProps {
  terms: TermSection[];
}

export default function TermsSection({ terms }: TermsSectionProps) {
  if (!terms || terms.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="px-8 pt-8 lg:px-12 lg:pt-12 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 bg-slate-900 rounded-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Terms & Conditions</h2>
            <p className="text-slate-500 text-sm mt-1">
              Amplified Solutions Consulting LLC
            </p>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="px-8 py-8 lg:px-12 lg:py-10 space-y-8">
        {terms.map((term, index) => (
          <div key={index} className="group">
            <div className="flex gap-4">
              {/* Section number */}
              <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-sm font-bold text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                {index + 1}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {term.title}
                </h3>
                <div className="text-slate-600 leading-relaxed whitespace-pre-line text-[15px]">
                  {term.content}
                </div>
              </div>
            </div>

            {/* Divider between sections */}
            {index < terms.length - 1 && (
              <div className="mt-8 border-b border-slate-100" />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-8 py-6 lg:px-12 bg-slate-50 rounded-b-2xl border-t border-slate-100">
        <p className="text-xs text-slate-500 leading-relaxed">
          By accepting this proposal, both parties agree to the terms and conditions outlined above.
          This agreement is governed by the laws of the state in which Amplified Solutions Consulting LLC operates.
          Any disputes shall be resolved through good-faith negotiation before pursuing other remedies.
        </p>
      </div>
    </div>
  );
}
