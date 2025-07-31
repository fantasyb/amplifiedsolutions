// src/components/admin/ProposalList.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Proposal } from '@/types/proposal';
import { ExternalLink, Calendar, DollarSign, User, Eye, Plus, Trash2, Archive, Filter, SortAsc, SortDesc, TrendingUp, Clock } from 'lucide-react';

interface ProposalWithAnalytics extends Proposal {
  viewCount?: number;
  lastViewed?: string;
}

export default function ProposalList() {
  const [proposals, setProposals] = useState<ProposalWithAnalytics[]>([]);
  const [analytics, setAnalytics] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'amount' | 'views'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch proposals and analytics in parallel
      const [proposalsRes, analyticsRes] = await Promise.all([
        fetch('/api/proposals'),
        fetch('/api/admin/analytics')
      ]);
      
      const proposalsData = await proposalsRes.json();
      const analyticsData = analyticsRes.ok ? await analyticsRes.json() : { proposals: [] };
      
      // Merge analytics data with proposals
      const proposalsWithAnalytics = proposalsData.map((proposal: Proposal) => {
        const analytics = analyticsData.proposals?.find((a: any) => a.id === proposal.id);
        return {
          ...proposal,
          viewCount: analytics?.open_count ? parseInt(analytics.open_count) : 0,
          lastViewed: analytics?.latest_timestamp || null,
        };
      });
      
      setProposals(proposalsWithAnalytics);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  // Filter and sort proposals
  const filteredAndSortedProposals = proposals
    .filter(proposal => {
      if (statusFilter === 'all') return true;
      return proposal.status === statusFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'amount':
          comparison = a.cost - b.cost;
          break;
        case 'views':
          comparison = (a.viewCount || 0) - (b.viewCount || 0);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

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

  const getStatusCounts = () => {
    return {
      all: proposals.length,
      pending: proposals.filter(p => p.status === 'pending').length,
      accepted: proposals.filter(p => p.status === 'accepted').length,
      rejected: proposals.filter(p => p.status === 'rejected').length,
      expired: proposals.filter(p => p.status === 'expired').length,
    };
  };

  const getEngagementStats = () => {
    const totalViews = proposals.reduce((sum, p) => sum + (p.viewCount || 0), 0);
    const viewedProposals = proposals.filter(p => (p.viewCount || 0) > 0).length;
    const engagementRate = proposals.length > 0 ? Math.round((viewedProposals / proposals.length) * 100) : 0;
    
    return { totalViews, viewedProposals, engagementRate };
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
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statusCounts = getStatusCounts();
  const engagementStats = getEngagementStats();

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Views</p>
              <p className="text-2xl font-bold text-slate-900">{engagementStats.totalViews}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Proposals Viewed</p>
              <p className="text-2xl font-bold text-slate-900">{engagementStats.viewedProposals}/{proposals.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">{engagementStats.engagementRate}%</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Engagement Rate</p>
              <p className="text-xs text-slate-500">Proposals opened by clients</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { key: 'all', label: 'All', count: statusCounts.all },
            { key: 'pending', label: 'Pending', count: statusCounts.pending },
            { key: 'accepted', label: 'Accepted', count: statusCounts.accepted },
            { key: 'rejected', label: 'Rejected', count: statusCounts.rejected },
            { key: 'expired', label: 'Expired', count: statusCounts.expired },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                statusFilter === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                statusFilter === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Sort by:</span>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'status' | 'amount' | 'views')}
            className="px-3 py-1 border border-slate-300 rounded-lg text-sm"
          >
            <option value="date">Date Created</option>
            <option value="status">Status</option>
            <option value="amount">Amount</option>
            <option value="views">View Count</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-1 px-3 py-1 border border-slate-300 rounded-lg text-sm hover:bg-slate-50"
          >
            {sortOrder === 'asc' ? (
              <SortAsc className="w-4 h-4" />
            ) : (
              <SortDesc className="w-4 h-4" />
            )}
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>

      {filteredAndSortedProposals.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {statusFilter === 'all' ? 'No proposals yet' : `No ${statusFilter} proposals`}
          </h3>
          <p className="text-slate-600 mb-6">
            {statusFilter === 'all' 
              ? 'Create your first proposal to get started'
              : `No proposals with status "${statusFilter}" found`
            }
          </p>
          {statusFilter === 'all' && (
            <Link
              href="/admin/proposals/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create First Proposal
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredAndSortedProposals.map((proposal) => (
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
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
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

              {/* Analytics Row */}
              <div className="bg-slate-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-slate-900">{proposal.viewCount || 0}</span>
                      <span className="text-slate-600">views</span>
                    </div>
                    
                    {proposal.lastViewed ? (
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>Last viewed {formatDateTime(proposal.lastViewed)}</span>
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500">
                        📬 Not viewed yet
                      </div>
                    )}
                  </div>
                  
                  {proposal.viewCount && proposal.viewCount > 0 && (
                    <div className="text-xs text-green-600 font-medium">
                      ✅ Client engaged
                    </div>
                  )}
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