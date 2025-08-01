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
  User,
  Video,
  Link as LinkIcon,
  Mail
} from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'link' | 'file' | 'video';
  category: string;
  clientIds: string[];
  createdAt: string;
}

interface PortalResourcesCenterProps {
  clientPortal: ClientPortal;
}

export default function PortalResourcesCenter({ clientPortal }: PortalResourcesCenterProps) {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, [clientPortal]);

  const fetchResources = async () => {
    try {
      const response = await fetch(`/api/portal/content?clientId=${clientPortal.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Portal content data:', data);
        
        // Extract just the resources array from the response
        const resourcesData = data.resources || [];
        console.log('Resources data:', resourcesData);
        setResources(resourcesData);
      } else {
        console.error('Failed to fetch resources');
        setResources([]);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  // Ensure resources is an array before using map
  const safeResources = Array.isArray(resources) ? resources : [];
  const types = ['all', ...Array.from(new Set(safeResources.map(r => r.type)))];

  const filteredResources = safeResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'file':
        return FileText;
      case 'video':
        return Video;
      case 'link':
        return LinkIcon;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'file':
        return 'text-blue-600 bg-blue-100';
      case 'video':
        return 'text-purple-600 bg-purple-100';
      case 'link':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getFileExtension = (url: string) => {
    const extension = url.split('.').pop()?.toUpperCase();
    return extension || 'FILE';
  };

  const handleView = (resource: ResourceItem) => {
    if (resource.url) {
      // Open file in new tab for viewing
      window.open(resource.url, '_blank');
    }
  };

  const handleDownload = (resource: ResourceItem) => {
    if (resource.url) {
      if (resource.type === 'link') {
        // Open external links in new tab
        window.open(resource.url, '_blank');
      } else if (resource.type === 'file') {
        // For uploaded files, create download link
        const link = document.createElement('a');
        link.href = resource.url;
        link.download = resource.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (resource.type === 'video') {
        // Open video links in new tab
        window.open(resource.url, '_blank');
      }
    }
  };

  const isViewable = (resource: ResourceItem) => {
    if (resource.type === 'link' || resource.type === 'video') return false;
    
    // Check if file is viewable in browser
    const extension = resource.url.split('.').pop()?.toLowerCase();
    const viewableTypes = ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'svg', 'txt', 'html', 'htm'];
    return viewableTypes.includes(extension || '');
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
              <p className="text-2xl font-bold text-slate-900">{safeResources.length}</p>
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
                {safeResources.filter(r => r.type === 'file').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Videos</p>
              <p className="text-2xl font-bold text-slate-900">
                {safeResources.filter(r => r.type === 'video').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <LinkIcon className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">External Links</p>
              <p className="text-2xl font-bold text-slate-900">
                {safeResources.filter(r => r.type === 'link').length}
              </p>
            </div>
          </div>
        </div>
      </div>

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
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid gap-4">
          {filteredResources.map((resource) => {
            const IconComponent = getTypeIcon(resource.type);
            const iconColors = getTypeColor(resource.type);
            
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
                      <h3 className="font-semibold text-slate-900 text-lg mb-2">{resource.title}</h3>
                      <p className="text-slate-600 mb-3">{resource.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <IconComponent className="w-4 h-4" />
                          {resource.type === 'file' ? getFileExtension(resource.url) : resource.type.toUpperCase()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(resource.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      resource.type === 'file' ? 'bg-blue-100 text-blue-700' :
                      resource.type === 'video' ? 'bg-purple-100 text-purple-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      {/* View Button - for viewable files */}
                      {isViewable(resource) && (
                        <button
                          onClick={() => handleView(resource)}
                          className="flex items-center gap-2 px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      )}
                      
                      {/* Download/Open Button */}
                      <button
                        onClick={() => handleDownload(resource)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          resource.type === 'file' 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {resource.type === 'file' ? (
                          <>
                            <Download className="w-4 h-4" />
                            Download
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-4 h-4" />
                            {resource.type === 'video' ? 'Watch' : 'Visit'}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {searchTerm || selectedType !== 'all' ? 'No resources found' : 'No resources available'}
          </h3>
          <p className="text-slate-600">
            {searchTerm || selectedType !== 'all' 
              ? 'Try adjusting your search terms or filters.'
              : 'Your account manager will add resources here for you to access.'
            }
          </p>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Need Help?</h2>
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Contact Support</h3>
          <p className="text-slate-600 mb-4">
            Can't find a resource or having trouble accessing files? We're here to help.
          </p>
          <a 
            href="mailto:support@amplifiedsolutions.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
}