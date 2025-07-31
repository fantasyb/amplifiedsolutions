// src/app/admin/clients/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  Building, 
  Phone, 
  ArrowLeft,
  Check,
  Globe,
  FileText
} from 'lucide-react';

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    status: 'prospect' as 'prospect' | 'active' | 'inactive',
    notes: '',
    createPortal: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/clients/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Client created successfully:', result);
        
        // Redirect back to clients list
        router.push('/admin/clients');
      } else {
        const error = await response.json();
        console.error('❌ Error creating client:', error);
        alert('Failed to create client. Please try again.');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/clients"
          className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Clients
        </Link>
        
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add New Client</h1>
          <p className="text-slate-600 mt-1">
            Manually add a client to your database and optionally create their portal
          </p>
        </div>
      </div>
      {/* Form */}
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

          {/* Status and Settings */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Status & Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-2">
                  Initial Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="prospect">Prospect - Potential client</option>
                  <option value="active">Active - Current client</option>
                  <option value="inactive">Inactive - Past client</option>
                </select>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="createPortal"
                  name="createPortal"
                  checked={formData.createPortal}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <div>
                  <label htmlFor="createPortal" className="block text-sm font-medium text-slate-700">
                    Create Client Portal
                  </label>
                  <p className="text-xs text-slate-500 mt-1">
                    Automatically create a portal where the client can access proposals, forms, and resources
                  </p>
                </div>
              </div>
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

          {/* Preview */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Preview</h3>
            <div className="text-sm text-slate-600">
              <p><strong>Name:</strong> {formData.name || 'Not provided'}</p>
              <p><strong>Email:</strong> {formData.email || 'Not provided'}</p>
              {formData.company && <p><strong>Company:</strong> {formData.company}</p>}
              {formData.phone && <p><strong>Phone:</strong> {formData.phone}</p>}
              <p><strong>Status:</strong> {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}</p>
              <p><strong>Portal:</strong> {formData.createPortal ? 'Will be created' : 'Will not be created'}</p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-200">
            <Link
              href="/admin/clients"
              className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </Link>

            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-500">
                {formData.createPortal && '✓ Portal will be created automatically'}
              </div>
              
              <button
                type="submit"
                disabled={loading || !formData.name || !formData.email}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {loading ? 'Creating...' : 'Create Client'}
              </button>
            </div>
          </div>
        </form>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">What happens next?</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-blue-600" />
              <span>Client will be added to your database with the selected status</span>
            </div>
            {formData.createPortal && (
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 mt-0.5 text-blue-600" />
                <span>A unique portal URL will be generated for client access</span>
              </div>
            )}
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 mt-0.5 text-blue-600" />
              <span>You can immediately create proposals and forms for this client</span>
            </div>
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 mt-0.5 text-blue-600" />
              <span>Client will appear in your main clients list and analytics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}