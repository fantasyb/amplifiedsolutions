// src/components/portal/PortalQuickLinks.tsx
'use client';

import { useState, useEffect } from 'react';
import { ClientPortal } from '@/types/global';
import { 
  ExternalLink, 
  Search,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  BarChart3,
  Settings,
  Users,
  Globe,
  Database,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Star,
  Clock,
  Eye,
  Link as LinkIcon,
  Video,
  FileText
} from 'lucide-react';

interface QuickLinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'link' | 'file' | 'video';
  category: string;
  clientIds: string[];
  createdAt: string;
  featured?: boolean;
}

interface PortalQuickLinksProps {
  clientPortal: ClientPortal;
}

export default function PortalQuickLinks({ clientPortal }: PortalQuickLinksProps) {
  const [links, setLinks] = useState<QuickLinkItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuickLinks();
  }, [clientPortal]);

  const fetchQuickLinks = async () => {
    try {
      const response = await fetch(`/api/portal/content?clientId=${clientPortal.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Portal content data:', data);
        
        // Extract just the links array from the response
        const linksData = data.links || [];
        console.log('Quick Links data:', linksData);
        setLinks(linksData);
      } else {
        console.error('Failed to fetch quick links');
        setLinks([]);
      }
    } catch (error) {
      console.error('Error fetching quick links:', error);
      setLinks([]);
    } finally {
      setLoading(false);
    }
  };

  // Ensure links is an array before using map/filter
  const safeLinks = Array.isArray(links) ? links : [];

  // Get unique categories from links
  const categories = ['all', ...Array.from(new Set(safeLinks.map(l => l.category || 'General')))];

  const filteredLinks = safeLinks.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.description.toLowerCase().includes(searchTerm.toLowerCase());
    const linkCategory = link.category || 'General';
    const matchesCategory = selectedCategory === 'all' || linkCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIcon = (link: QuickLinkItem) => {
    // Try to determine icon based on title/description keywords
    const title = link.title.toLowerCase();
    const desc = link.description.toLowerCase();
    
    if (title.includes('crm') || title.includes('sales') || desc.includes('leads')) return Users;
    if (title.includes('analytics') || title.includes('report') || desc.includes('metrics')) return BarChart3;
    if (title.includes('email') || title.includes('mail')) return Mail;
    if (title.includes('calendar') || title.includes('schedule') || title.includes('booking')) return Calendar;
    if (title.includes('social') || title.includes('media')) return MessageCircle;
    if (title.includes('support') || title.includes('help')) return Shield;
    if (title.includes('automation') || title.includes('workflow')) return Zap;
    if (title.includes('roi') || title.includes('calculator') || desc.includes('calculate')) return TrendingUp;
    if (link.type === 'video') return Video;
    if (link.type === 'file') return FileText;
    
    return LinkIcon; // Default icon
  };

  const getIconColor = (index: number) => {
    const colors = [
      'text-blue-600 bg-blue-100',
      'text-green-600 bg-green-100',
      'text-purple-600 bg-purple-100',
      'text-orange-600 bg-orange-100',
      'text-pink-600 bg-pink-100',
      'text-indigo-600 bg-indigo-100',
      'text-red-600 bg-red-100',
      'text-slate-600 bg-slate-100',
      'text-yellow-600 bg-yellow-100'
    ];
    return colors[index % colors.length];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleLinkClick = (link: QuickLinkItem) => {
    // Open link in new tab
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  // Group links by category for better organization
  const linksByCategory = filteredLinks.reduce((acc, link) => {
    const category = link.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(link);
    return acc;
  }, {} as Record<string, QuickLinkItem[]>);

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
              <ExternalLink className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Links</p>
              <p className="text-2xl font-bold text-slate-900">{safeLinks.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">External Links</p>
              <p className="text-2xl font-bold text-slate-900">
                {safeLinks.filter(l => l.type === 'link').length}
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
              <p className="text-sm font-medium text-slate-600">Video Links</p>
              <p className="text-2xl font-bold text-slate-900">
                {safeLinks.filter(l => l.type === 'video').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">File Links</p>
              <p className="text-2xl font-bold text-slate-900">
                {safeLinks.filter(l => l.type === 'file').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search links..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
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
        </div>
      </div>

      {/* Links organized by category */}
      {Object.entries(linksByCategory).length > 0 ? (
        Object.entries(linksByCategory).map(([category, categoryLinks]) => (
          <div key={category} className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">{category}</h2>
            <div className="grid gap-4">
              {categoryLinks.map((link, index) => {
                const IconComponent = getIcon(link);
                const iconColors = getIconColor(index);
                
                return (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColors}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {link.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            link.type === 'link' ? 'bg-green-100 text-green-700' :
                            link.type === 'video' ? 'bg-purple-100 text-purple-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {link.type === 'link' ? 'External' : link.type.charAt(0).toUpperCase() + link.type.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{link.description}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>Added: {formatDate(link.createdAt)}</span>
                          <span className="truncate max-w-64">{link.url}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 ml-4">
                      <button
                        onClick={() => handleLinkClick(link)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {link.type === 'video' ? 'Watch' : link.type === 'file' ? 'Open' : 'Visit'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {searchTerm || selectedCategory !== 'all' ? 'No links found' : 'No quick links available'}
          </h3>
          <p className="text-slate-600">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search terms or category filter.'
              : 'Your account manager will add useful links and tools here for quick access.'
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
            Having trouble accessing a tool or need a new link added? We're here to help.
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