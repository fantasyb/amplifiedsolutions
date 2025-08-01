// src/app/admin/clients/[id]/edit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Building, 
  Phone, 
  ArrowLeft,
  Check,
  Globe,
  FileText,
  Trash2,
  AlertTriangle,
  Edit
} from 'lucide-react';

interface ClientData {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  status: 'prospect' | 'active' | 'inactive' | 'churned';
  notes?: string;
  portalId?: string;
  portalActive?: boolean;
  createdAt: string;
  lastActivity?: string;
  proposalCount: number;
  questionnaireCount: number;
  acceptedProposals: number;
  completedForms: number;
  totalPortalViews?: number;
  lastPortalAccess?: string;
  totalValue: number;
}

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [client, setClient] = useState<ClientData | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    status: 'prospect' as 'prospect' | 'active' | 'inactive' | 'churned',
    notes: ''
  });

  useEffect(() => {
    fetchClient();
  }, [clientId]);

  const fetchClient = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}`);
      if (response.ok) {
        const clientData = await response.json();
        setClient(clientData);
        setFormData({
          name: clientData.name || '',
          email: clientData.email || '',
          company: clientData.company || '',
          phone: clientData.phone || '',
          status: (clientData as any).storedStatus || clientData.status || 'prospect',
          notes: clientData.notes || ''
        });
      } else {
        console.error('Client not found');
        router.push('/admin/clients');
      }
    } catch (error) {
      console.error('Error fetching client:', error);
      router.push('/admin/clients');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/clients/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('✅ Client updated successfully');
        router.push('/admin/clients');
      } else {
        const error = await response.json();
        console.error('❌ Error updating client:', error);
        alert('Failed to update client. Please try again.');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('✅ Client deleted successfully');
        router.push('/admin/clients');
      } else {
        const error = await response.json();
        console.error('❌ Error deleting client:', error);
        alert('Failed to delete client. Please try again.');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Client Not Found</h2>
          <p className="text-slate-600 mb-6">The client you're looking for doesn't exist.</p>
          <Link
            href="/admin/clients"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Clients
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/clients"
            className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Clients
          </Link>
          
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Edit Client</h1>
            <p className="text-slate-600 mt-1">
              Update client information and settings
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
        >
          <Trash2 className="w-4 h-4" />
          Delete Client
        </button>
      </div>

      {/* Client Overview */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{client.name}</h2>
              <p className="text-slate-600">{client.email}</p>
              {client.company && (
                <p className="text-sm text-slate-500">{client.company}</p>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(client.status)}`}>
              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
            </span>
            <p className="text-sm text-slate-500 mt-2">
              Client since {formatDate(client.createdAt)}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 bg-white rounded-lg">
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
          <div className="bg-blue-100 rounded-lg p-3 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="text-sm font-medium text-blue-900">Portal Active</span>
                  {client.totalPortalViews !== undefined && (
                    <div className="text-xs text-blue-700">
                      {client.totalPortalViews} total views
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
                <Globe className="w-3 h-3" />
                View Portal
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Edit Form */}
      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                  Company (Optional)
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Phone (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CRM Status Management */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-6">CRM Status Management</h2>
            
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-slate-900">Current CRM Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(client.status)}`}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    This is the status that appears on your client list and in filters
                  </p>
                </div>
                
                {(client as any).calculatedStatus && (client as any).calculatedStatus !== client.status && (
                  <div className="text-right">
                    <div className="text-xs text-slate-500 mb-1">Auto-calculated would be:</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor((client as any).calculatedStatus)}`}>
                      {(client as any).calculatedStatus?.charAt(0).toUpperCase() + (client as any).calculatedStatus?.slice(1)}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="text-xs text-slate-600">
                <strong>Proposal Status:</strong> {client.acceptedProposals > 0 ? `${client.acceptedProposals} accepted` : client.proposalCount > 0 ? `${client.proposalCount} pending` : 'No proposals'}
              </div>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-2">
                Set CRM Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="prospect">Prospect - Potential client, early stage</option>
                <option value="active">Active - Current working client</option>
                <option value="inactive">Inactive - Past client, may return</option>
                <option value="churned">Churned - Lost client, unlikely to return</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">
                This status will be used for filtering and organizing your client list. Choose based on your current relationship with the client.
              </p>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any additional notes about this client..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-200">
            <Link
              href="/admin/clients"
              className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving || !formData.name || !formData.email}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Delete Client</h3>
                <p className="text-sm text-slate-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-6">
              Are you sure you want to delete <strong>{client.name}</strong>? This will permanently remove:
            </p>
            
            <ul className="text-sm text-slate-600 mb-6 space-y-1">
              <li>• Client information and contact details</li>
              <li>• All associated proposals ({client.proposalCount})</li>
              <li>• All forms and questionnaires ({client.questionnaireCount})</li>
              {client.portalId && <li>• Client portal access</li>}
              <li>• All activity history and analytics</li>
            </ul>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}