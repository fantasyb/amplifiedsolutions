// src/components/admin/ProposalList.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Proposal } from '@/types/proposal';
import { ExternalLink, Calendar, DollarSign, User, Eye, Plus, Trash2, Archive } from 'lucide-react';

export default function ProposalList() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const response = await fetch('/api/proposals');
      const data = await response.json();
      setProposals(data);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProposal = async (proposalId: string) => {
    if (!confirm('Are you sure you want to delete this proposal? This cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/proposals?id=${proposalId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from local state
        setProposals(prev => prev.filter(p => p.id !== proposalId));
      } else {
        alert('Failed to delete proposal');
      }
    } catch (error) {
      console.error('Error deleting proposal:', error);
      alert('Failed to delete proposal');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {proposals.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            No proposals yet
          </h3>
          <p className="text-slate-600 mb-6">
            Create your first proposal to get started
          </p>
          <Link
            href="/admin/proposals/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create First Proposal
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {proposal.client.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        proposal.status
                      )}`}
                    >
                      {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                    </span>
                  </div>
                  {proposal.client.company && (
                    <p className="text-slate-600 mb-1">{proposal.client.company}</p>
                  )}
                  <p className="text-sm text-slate-500">{proposal.client.email}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">
                    {formatCurrency(proposal.cost)}
                  </div>
                  <div className="text-sm text-slate-500">
                    {proposal.services.length} service{proposal.services.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Created {formatDate(proposal.createdAt)}
                </div>
                {proposal.expiresAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Expires {formatDate(proposal.expiresAt)}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Services:</span>
                  <div className="flex gap-2">
                    {proposal.services.slice(0, 2).map((service) => (
                      <span
                        key={service.id}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                      >
                        {service.title}
                      </span>
                    ))}
                    {proposal.services.length > 2 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                        +{proposal.services.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/proposal/${proposal.id}`}
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  
                  <button
                    onClick={() => deleteProposal(proposal.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}