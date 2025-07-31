// src/components/portal/PortalProposalsList.tsx
'use client';

import Link from 'next/link';
import { ClientPortal } from '@/types/global';
import { 
  FileText, 
  Calendar, 
  DollarSign, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  XCircle,
  AlertCircle,
  User,
  CreditCard
} from 'lucide-react';

interface PortalProposalsListProps {
  proposals: any[];
  clientPortal: ClientPortal;
}

export default function PortalProposalsList({ proposals, clientPortal }: PortalProposalsListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'expired':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'expired':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isExpiringSoon = (expiresAt: Date | string) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const daysDiff = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7 && daysDiff > 0;
  };

  if (proposals.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No proposals yet</h3>
        <p className="text-slate-600">
          We'll send you proposals here when we have new opportunities for you.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Pending Review</p>
              <p className="text-2xl font-bold text-slate-900">
                {proposals.filter(p => p.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Accepted</p>
              <p className="text-2xl font-bold text-slate-900">
                {proposals.filter(p => p.status === 'accepted').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Value</p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(proposals.reduce((sum, p) => sum + (p.status === 'accepted' ? p.cost : 0), 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-6">
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Service Proposal
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(
                      proposal.status
                    )}`}
                  >
                    {getStatusIcon(proposal.status)}
                    {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                  </span>
                  {proposal.expiresAt && isExpiringSoon(proposal.expiresAt) && proposal.status === 'pending' && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      Expires Soon
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-600 mb-2">
                  {proposal.services.length} service{proposal.services.length !== 1 ? 's' : ''} included
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900">
                  {formatCurrency(proposal.cost)}
                </div>
                <div className="text-sm text-slate-500">
                  Total investment
                </div>
              </div>
            </div>

            {/* Services Preview */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-slate-700 mb-2">Services Included:</h4>
              <div className="flex flex-wrap gap-2">
                {proposal.services.slice(0, 3).map((service: any) => (
                  <span
                    key={service.id}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                  >
                    {service.title}
                  </span>
                ))}
                {proposal.services.length > 3 && (
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm">
                    +{proposal.services.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-6 text-sm text-slate-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Created {formatDate(proposal.createdAt)}
              </div>
              {proposal.expiresAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {proposal.status === 'pending' ? 'Expires' : 'Expired'} {formatDate(proposal.expiresAt)}
                </div>
              )}
            </div>

            {/* Notes */}
            {proposal.notes && (
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-medium text-slate-700 mb-1">Notes:</h4>
                <p className="text-sm text-slate-600">{proposal.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <User className="w-4 h-4" />
                <span>From Amplified Solutions</span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/proposal/${proposal.id}`}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  View Details
                  <ExternalLink className="w-3 h-3" />
                </Link>

                {proposal.status === 'pending' && (
                  <Link
                    href={proposal.stripeCheckoutUrl}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <CreditCard className="w-4 h-4" />
                    Accept & Pay
                  </Link>
                )}

                {proposal.status === 'accepted' && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                    Accepted
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}