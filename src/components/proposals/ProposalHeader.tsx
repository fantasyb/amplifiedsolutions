// src/components/proposals/ProposalHeader.tsx
import Image from 'next/image';
import { Client } from '@/types/proposal';

interface ProposalHeaderProps {
  client: Client;
  proposalId: string;
  createdAt: Date;
  expiresAt?: Date;
}

export default function ProposalHeader({ client, proposalId, createdAt, expiresAt }: ProposalHeaderProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-green-50/30" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full -translate-y-32 translate-x-32" />
      
      <div className="relative px-8 py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Logo & Company Info */}
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <Image
                src="/AmplifiedSolutions_Logo-V2_Main.png"
                alt="Amplified Solutions"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden lg:block w-px h-12 bg-slate-300" />
            <div className="lg:ml-0">
              <h1 className="text-2xl font-bold text-slate-900 mb-1">
                Service Proposal
              </h1>
              <p className="text-slate-600">
                Proposal #{proposalId.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Client & Date Info */}
          <div className="lg:text-right">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-slate-900 mb-1">
                Prepared for:
              </h2>
              <p className="text-lg font-medium text-blue-600">{client.name}</p>
              {client.company && (
                <p className="text-slate-600">{client.company}</p>
              )}
            </div>
            
            <div className="text-sm text-slate-500 space-y-1">
              <p>Created: {formatDate(createdAt)}</p>
              {expiresAt && (
                <p className="text-amber-600 font-medium">
                  Expires: {formatDate(expiresAt)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-100">
          <p className="text-slate-700 text-lg leading-relaxed">
            Thank you for your interest in our services. We've carefully crafted this proposal 
            to address your specific needs and help accelerate your business growth.
          </p>
        </div>
      </div>
    </div>
  );
}