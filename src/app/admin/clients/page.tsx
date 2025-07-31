
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  ExternalLink, 
  Calendar, 
  FileText, 
  MessageSquare,
  TrendingUp,
  Eye,
  Plus,
  Search,
  Filter,
  Globe,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ClientData {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  createdAt: string;
  lastActivity?: string;
  portalId?: string;
  portalActive?: boolean;
  proposalCount: number;
  questionnaireCount: number;
  acceptedProposals: number;
  completedForms: number;
  totalPortalViews?: number;
  lastPortalAccess?: string;
  totalValue: number;
  status: 'active' | 'inactive' | 'prospect' | 'churned';
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'activity' | 'value' | 'date'>('activity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/clients');
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const createManualClient = () => {
    // Navigate to manual client creation
    window.location.href = '/admin/clients/new';
  };

  const filteredAndSortedClients = clients
    .filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'activity':
          const aActivity = a.lastActivity ? new Date(a.lastActivity).getTime() : 0;
          const bActivity = b.lastActivity ? new Date(b.lastActivity).getTime() : 0;
          comparison = aActivity - bActivity;
          break;
        case 'value':
          comparison = a.totalValue - b.totalValue;
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'prospect':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'churned':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'inactive':
        return <Clock className="w-4 h-4" />;
      case 'prospect':
        return <Eye className="w-4 h-4" />;
      case 'churned':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getOverviewStats = () => {
    return {
      totalClients: clients.length,
      activeClients: clients.filter(c => c.status === 'active').length,
      totalRevenue: clients.reduce((sum, c) => sum + c.totalValue, 0),
      totalPortalViews: clients.reduce((sum, c) => sum + (c.totalPortalViews || 0), 0),
      averageValue: clients.length > 0 ? clients.reduce((sum, c) => sum + c.totalValue, 0) / clients.length : 0,
      withPortals: clients.filter(c => c.portalId).length
    };
  };

  const stats = getOverviewStats();
  const statusCounts = {
    all: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    inactive: clients.filter(c => c.status === 'inactive').length,
    prospect: clients.filter(c => c.status === 'prospect').length,
    churned: clients.filter(c => c.status === 'churned').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Client Management</h1>
          <p className="text-slate-600 mt-1">
            Manage your clients, portals, and engagement analytics
          </p>
        </div>
        
        <Link
          href="/admin/clients/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Client
        </Link>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Clients</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalClients}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Active</p>
              <p className="text-2xl font-bold text-slate-900">{stats.activeClients}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Active Portals</p>
              <p className="text-2xl font-bold text-slate-900">{stats.withPortals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Portal Views</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalPortalViews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 font-bold text-sm">
                {formatCurrency(stats.averageValue).replace('$', '$').slice(0, 4)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Avg Value</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(stats.averageValue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { key: 'all', label: 'All Clients', count: statusCounts.all },
            { key: 'active', label: 'Active', count: statusCounts.active },
            { key: 'prospect', label: 'Prospects', count: statusCounts.prospect },
            { key: 'inactive', label: 'Inactive', count: statusCounts.inactive },
            { key: 'churned', label: 'Churned', count: statusCounts.churned },
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

        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search clients by name, email, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Sort by:</span>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'activity' | 'value' | 'date')}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="activity">Last Activity</option>
              <option value="name">Name</option>
              <option value="value">Total Value</option>
              <option value="date">Date Added</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="flex items-center gap-1 px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50"
            >
              {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
            </button>
          </div>
        </div>
      </div>

      {/* Client List */}
      {filteredAndSortedClients.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {statusFilter === 'all' ? 'No clients yet' : `No ${statusFilter} clients`}
          </h3>
          <p className="text-slate-600 mb-6">
            {statusFilter === 'all' 
              ? 'Add your first client to get started'
              : `No clients with status "${statusFilter}" found`
            }
          </p>
          <Link
            href="/admin/clients/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add First Client
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredAndSortedClients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {client.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(
                        client.status
                      )}`}
                    >
                      {getStatusIcon(client.status)}
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </div>
                  {client.company && (
                    <p className="text-slate-600 mb-1">{client.company}</p>
                  )}
                  <p className="text-sm text-slate-500">{client.email}</p>
                  {client.phone && (
                    <p className="text-sm text-slate-500">{client.phone}</p>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">
                    {formatCurrency(client.totalValue)}
                  </div>
                  <div className="text-sm text-slate-500">
                    Total Value
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-slate-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">{client.proposalCount}</div>
                  <div className="text-xs text-slate-600">Proposals</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">{client.acceptedProposals}</div>
                  <div className="text-xs text-slate-600">Accepted</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">{client.questionnaireCount}</div>
                  <div className="text-xs text-slate-600">Forms</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">{client.completedForms}</div>
                  <div className="text-xs text-slate-600">Completed</div>
                </div>
              </div>

              {/* Portal Info */}
              {client.portalId && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <div>
                        <span className="text-sm font-medium text-blue-900">Portal Active</span>
                        {client.totalPortalViews && (
                          <div className="text-xs text-blue-700">
                            {client.totalPortalViews} views
                            {client.lastPortalAccess && (
                              <span> • Last access: {formatDate(client.lastPortalAccess)}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <a
                      href={`/portal/${client.portalId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      View Portal
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="flex items-center gap-6 text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Added {formatDate(client.createdAt)}
                </div>
                {client.lastActivity && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Last activity {formatDate(client.lastActivity)}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="w-4 h-4" />
                  <span>Client since {formatDate(client.createdAt)}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/proposals/new?client=${encodeURIComponent(client.email)}`}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    New Proposal
                  </Link>

                  <Link
                    href={`/admin/questionnaires/new?client=${encodeURIComponent(client.email)}`}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    New Form
                  </Link>

                  {!client.portalId && (
                    <button
                      onClick={async () => {
                        try {
                          console.log('Creating portal for', client.email);
                          
                          // Call the portal creation API
                          const response = await fetch('/api/admin/portals/create', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              clientEmail: client.email,
                              clientName: client.name,
                              clientCompany: client.company
                            }),
                          });

                          if (response.ok) {
                            const result = await response.json();
                            console.log('✅ Portal created:', result);
                            
                            // Refresh the clients list to show the new portal
                            fetchClients();
                            
                            alert(`Portal created! URL: ${window.location.origin}/portal/${result.portal.id}`);
                          } else {
                            const error = await response.json();
                            console.error('❌ Error creating portal:', error);
                            alert('Failed to create portal. Please try again.');
                          }
                        } catch (error) {
                          console.error('❌ Network error:', error);
                          alert('Network error. Please try again.');
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      Create Portal
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}