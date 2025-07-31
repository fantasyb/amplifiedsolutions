// src/components/portal/PortalResourcesCenter.tsx
'use client';

import { useState, useEffect } from 'react';
import { ClientPortal } from '@/types/global';
import { 
  FileText, 
  Download, 
  ExternalLink,
  Search,
  Filter,
  Calendar,
  File,
  Image,
  FileSpreadsheet,
  Archive,
  Star,
  Eye,
  Clock,
  User
} from 'lucide-react';

interface PortalResourcesCenterProps {
  clientPortal: ClientPortal;
}

export default function PortalResourcesCenter({ clientPortal }: PortalResourcesCenterProps) {
  const [resources, setResources] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch client-specific resources from API
    // For now, we'll use mock data
    const mockResources = [
      {
        id: 'lead-gen-checklist',
        title: 'Lead Generation Checklist',
        description: 'Complete checklist for setting up your lead generation campaigns',
        category: 'Templates',
        type: 'PDF',
        size: '2.1 MB',
        downloadUrl: '/downloads/lead-gen-checklist.pdf',
        externalUrl: null,
        uploadDate: '2024-01-15',
        downloads: 250,
        featured: true,
        icon: FileText,
        color: 'blue'
      },
      {
        id: 'crm-setup-guide',
        title: 'CRM Setup Guide',
        description: 'Step-by-step guide for configuring your CRM system effectively',
        category: 'Guides',
        type: 'PDF',
        size: '5.8 MB',
        downloadUrl: '/downloads/crm-setup-guide.pdf',
        externalUrl: null,
        uploadDate: '2024-01-10',
        downloads: 189,
        featured: true,
        icon: FileText,
        color: 'green'
      },
      {
        id: 'email-templates',
        title: 'Email Marketing Templates',
        description: 'Ready-to-use email templates for different stages of your funnel',
        category: 'Templates',
        type: 'DOCX',
        size: '1.5 MB',
        downloadUrl: '/downloads/email-templates.docx',
        externalUrl: null,
        uploadDate: '2024-01-08',
        downloads: 342,
        featured: false,
        icon: File,
        color: 'purple'
      },
      {
        id: 'roi-calculator',
        title: 'ROI Calculator Spreadsheet',
        description: 'Calculate the return on investment for your marketing campaigns',
        category: 'Tools',
        type: 'XLSX',
        size: '890 KB',
        downloadUrl: '/downloads/roi-calculator.xlsx',
        externalUrl: null,
        uploadDate: '2024-01-05',
        downloads: 156,
        featured: false,
        icon: FileSpreadsheet,
        color: 'orange'
      },
      {
        id: 'brand-guidelines',
        title: 'Brand Guidelines & Assets',
        description: 'Logo files, color palettes, and brand usage guidelines',
        category: 'Assets',
        type: 'ZIP',
        size: '12.3 MB',
        downloadUrl: '/downloads/brand-assets.zip',
        externalUrl: null,
        uploadDate: '2024-01-01',
        downloads: 78,
        featured: false,
        icon: Archive,
        color: 'indigo'
      },
      {
        id: 'google-docs-workflow',
        title: 'Workflow Documentation',
        description: 'Detailed workflow processes and standard operating procedures',
        category: 'Documentation',
        type: 'Google Docs',
        size: null,
        downloadUrl: null,
        externalUrl: 'https://docs.google.com/document/d/example-workflow',
        uploadDate: '2023-12-28',
        downloads: 0,
        featured: false,
        icon: FileText,
        color: 'blue'
      }
    ];

    setResources(mockResources);
    setLoading(false);
  }, [clientPortal]);

  const categories = ['all', ...Array.from(new Set(resources.map(r => r.category)))];
  const types = ['all', ...Array.from(new Set(resources.map(r => r.type)))];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return FileText;
      case 'DOCX':
        return File;
      case 'XLSX':
        return FileSpreadsheet;
      case 'ZIP':
        return Archive;
      case 'Google Docs':
        return FileText;
      default:
        return FileText;
    }
  };

  const getTypeColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      orange: 'text-orange-600 bg-orange-100',
      indigo: 'text-indigo-600 bg-indigo-100'
    };
    return colors[color as keyof typeof colors] || 'text-slate-600 bg-slate-100';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatFileSize = (size: string | null) => {
    return size || 'Online';
  };

  const handleDownload = (resource: any) => {
    if (resource.downloadUrl) {
      // In a real app, this would track the download
      window.open(resource.downloadUrl, '_blank');
    } else if (resource.externalUrl) {
      window.open(resource.externalUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Resources</p>
              <p className="text-2xl font-bold text-slate-900">{resources.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Downloads</p>
              <p className="text-2xl font-bold text-slate-900">
                {resources.reduce((sum, r) => sum + r.downloads, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Featured</p>
              <p className="text-2xl font-bold text-slate-900">
                {resources.filter(r => r.featured).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Last Updated</p>
              <p className="text-lg font-bold text-slate-900">
                {formatDate(Math.max(...resources.map(r => new Date(r.uploadDate).getTime())).toString())}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Resources */}
      {resources.filter(r => r.featured).length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.filter(r => r.featured).map((resource) => {
              const IconComponent = getTypeIcon(resource.type);
              const iconColors = getTypeColor(resource.color);
              
              return (
                <div
                  key={resource.id}
                  className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColors}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 mb-1">{resource.title}</h3>
                      <p className="text-sm text-slate-600 mb-2">{resource.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{resource.type}</span>
                        <span>{formatFileSize(resource.size)}</span>
                        <span>{resource.downloads} downloads</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(resource)}
                      className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      {resource.downloadUrl ? <Download className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                      {resource.downloadUrl ? 'Download' : 'Open'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid gap-4">
        {filteredResources.map((resource) => {
          const IconComponent = getTypeIcon(resource.type);
          const iconColors = getTypeColor(resource.color);
          
          return (
            <div
              key={resource.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColors}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-900 text-lg">{resource.title}</h3>
                      {resource.featured && (
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <p className="text-slate-600 mb-3">{resource.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <File className="w-4 h-4" />
                        {resource.type}
                      </div>
                      {resource.size && (
                        <div className="flex items-center gap-1">
                          <Archive className="w-4 h-4" />
                          {resource.size}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(resource.uploadDate)}
                      </div>
                      {resource.downloads > 0 && (
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {resource.downloads} downloads
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    resource.category === 'Templates' ? 'bg-blue-100 text-blue-700' :
                    resource.category === 'Guides' ? 'bg-green-100 text-green-700' :
                    resource.category === 'Tools' ? 'bg-orange-100 text-orange-700' :
                    resource.category === 'Assets' ? 'bg-purple-100 text-purple-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {resource.category}
                  </span>
                  
                  <button
                    onClick={() => handleDownload(resource)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {resource.downloadUrl ? (
                      <>
                        <Download className="w-4 h-4" />
                        Download
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4" />
                        Open
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No resources found</h3>
          <p className="text-slate-600">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  );
}