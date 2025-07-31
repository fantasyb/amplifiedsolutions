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
  Eye
} from 'lucide-react';

interface PortalQuickLinksProps {
  clientPortal: ClientPortal;
}

interface QuickLink {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  icon: any;
  color: string;
  featured: boolean;
  loginRequired: boolean;
  loginHint?: string;
  lastUsed?: string;
  usageCount: number;
}

export default function PortalQuickLinks({ clientPortal }: PortalQuickLinksProps) {
  const [links, setLinks] = useState<QuickLink[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch client-specific quick links from API
    // For now, we'll use mock data
    const mockLinks: QuickLink[] = [
      {
        id: 'crm-dashboard',
        title: 'CRM Dashboard',
        description: 'Access your CRM system to manage leads and contacts',
        url: 'https://crm.amplifiedsolutions.com/dashboard',
        category: 'CRM & Sales',
        icon: Users,
        color: 'blue',
        featured: true,
        loginRequired: true,
        loginHint: 'Use your CRM credentials',
        lastUsed: '2024-01-15',
        usageCount: 42
      },
      {
        id: 'analytics-platform',
        title: 'Analytics Platform',
        description: 'View detailed performance metrics and campaign analytics',
        url: 'https://analytics.amplifiedsolutions.com/client-dashboard',
        category: 'Analytics',
        icon: BarChart3,
        color: 'green',
        featured: true,
        loginRequired: false,
        lastUsed: '2024-01-14',
        usageCount: 28
      },
      {
        id: 'lead-management',
        title: 'Lead Management System',
        description: 'Track and nurture your leads through the sales pipeline',
        url: 'https://leads.amplifiedsolutions.com/pipeline',
        category: 'CRM & Sales',
        icon: Target,
        color: 'purple',
        featured: false,
        loginRequired: true,
        loginHint: 'Same as CRM login',
        lastUsed: '2024-01-13',
        usageCount: 35
      },
      {
        id: 'email-campaigns',
        title: 'Email Campaign Manager',
        description: 'Create, send, and track email marketing campaigns',
        url: 'https://email.amplifiedsolutions.com/campaigns',
        category: 'Marketing',
        icon: Mail,
        color: 'orange',
        featured: false,
        loginRequired: true,
        loginHint: 'Check your email for login details',
        lastUsed: '2024-01-12',
        usageCount: 19
      },
      {
        id: 'social-scheduler',
        title: 'Social Media Scheduler',
        description: 'Schedule and manage your social media posts',
        url: 'https://social.amplifiedsolutions.com/scheduler',
        category: 'Marketing',
        icon: MessageCircle,
        color: 'pink',
        featured: false,
        loginRequired: true,
        loginHint: 'Use your social media credentials',
        lastUsed: '2024-01-10',
        usageCount: 15
      },
      {
        id: 'calendar-booking',
        title: 'Appointment Booking',
        description: 'Schedule meetings and consultations with prospects',
        url: 'https://calendar.amplifiedsolutions.com/booking',
        category: 'Scheduling',
        icon: Calendar,
        color: 'indigo',
        featured: true,
        loginRequired: false,
        lastUsed: '2024-01-11',
        usageCount: 23
      },
      {
        id: 'roi-calculator',
        title: 'ROI Calculator',
        description: 'Calculate return on investment for your campaigns',
        url: 'https://tools.amplifiedsolutions.com/roi-calculator',
        category: 'Tools',
        icon: TrendingUp,
        color: 'green',
        featured: false,
        loginRequired: false,
        lastUsed: '2024-01-09',
        usageCount: 8
      },
      {
        id: 'support-portal',
        title: 'Support Portal',
        description: 'Get help and submit support tickets',
        url: 'https://support.amplifiedsolutions.com/portal',
        category: 'Support',
        icon: Shield,
        color: 'red',
        featured: false,
        loginRequired: false,
        lastUsed: '2024-01-08',
        usageCount: 12
      },
      {
        id: 'knowledge-base',
        title: 'Knowledge Base',
        description: 'Browse articles and guides for common questions',
        url: 'https://help.amplifiedsolutions.com/kb',
        category: 'Support',
        icon: Globe,
        color: 'slate',
        featured: false,
        loginRequired: false,
        lastUsed: '2024-01-07',
        usageCount: 6
      },
      {
        id: 'automation-tools',
        title: 'Marketing Automation',
        description: 'Set up automated workflows and triggers',
        url: 'https://automation.amplifiedsolutions.com/workflows',
        category: 'Marketing',
        icon: Zap,
        color: 'yellow',
        featured: false,
        loginRequired: true,
        loginHint: 'Use your marketing platform login',
        lastUsed: '2024-01-06',
        usageCount: 17
      }
    ];

    setLinks(mockLinks);
    setLoading(false);
  }, [clientPortal]);

  const categories = ['all', ...Array.from(new Set(links.map(l => l.category)))];

  const filteredLinks = links.filter(link => {
    const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || link.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      orange: 'text-orange-600 bg-orange-100',
      pink: 'text-pink-600 bg-pink-100',
      indigo: 'text-indigo-600 bg-indigo-100',
      red: 'text-red-600 bg-red-100',
      slate: 'text-slate-600 bg-slate-100',
      yellow: 'text-yellow-600 bg-yellow-100'
    };
    return colors[color as keyof typeof colors] || 'text-slate-600 bg-slate-100';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const handleLinkClick = (link: QuickLink) => {
    // In a real app, this would track usage
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  const mostUsedLinks = links.sort((a, b) => b.usageCount - a.usageCount).slice(0, 4);
  const featuredLinks = links.filter(l => l.featured);
  const recentLinks = links.filter(l => l.lastUsed).sort((a, b) => 
    new Date(b.lastUsed!).getTime() - new Date(a.lastUsed!).getTime()
  ).slice(0, 6);

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
              <p className="text-2xl font-bold text-slate-900">{links.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Featured</p>
              <p className="text-2xl font-bold text-slate-900">{featuredLinks.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Usage</p>
              <p className="text-2xl font-bold text-slate-900">
                {links.reduce((sum, l) => sum + l.usageCount, 0)}
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
              <p className="text-sm font-medium text-slate-600">Last Used</p>
              <p className="text-lg font-bold text-slate-900">
                {recentLinks.length > 0 ? formatDate(recentLinks[0].lastUsed!) : 'None'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Links */}
      {featuredLinks.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Featured Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredLinks.map((link) => {
              const IconComponent = link.icon;
              const iconColors = getIconColor(link.color);
              
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColors}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {link.title}
                        </h3>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{link.description}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{link.usageCount} uses</span>
                        {link.lastUsed && <span>Last: {formatDate(link.lastUsed)}</span>}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Most Used Links */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Most Used</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mostUsedLinks.map((link) => {
            const IconComponent = link.icon;
            const iconColors = getIconColor(link.color);
            
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link)}
                className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:shadow-md transition-all text-left group"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconColors}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                      {link.title}
                    </h3>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
                  </div>
                  <p className="text-xs text-slate-500">{link.usageCount} uses</p>
                </div>
              </button>
            );
          })}
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

      {/* All Links by Category */}
      {categories.filter(cat => cat !== 'all').map(category => {
        const categoryLinks = filteredLinks.filter(l => l.category === category);
        
        if (categoryLinks.length === 0) return null;
        
        return (
          <div key={category} className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">{category}</h2>
            <div className="grid gap-4">
              {categoryLinks.map((link) => {
                const IconComponent = link.icon;
                const iconColors = getIconColor(link.color);
                
                return (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColors}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-1">{link.title}</h3>
                        <p className="text-sm text-slate-600 mb-2">{link.description}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>{link.usageCount} uses</span>
                          {link.lastUsed && <span>Last used: {formatDate(link.lastUsed)}</span>}
                          {link.loginRequired && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded">
                              Login Required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {link.loginRequired && link.loginHint && (
                        <div className="text-xs text-slate-500 max-w-32">
                          {link.loginHint}
                        </div>
                      )}
                      
                      <button
                        onClick={() => handleLinkClick(link)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* No Results */}
      {filteredLinks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No links found</h3>
          <p className="text-slate-600">
            Try adjusting your search terms or category filter.
          </p>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <Phone className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Contact Support</h3>
              <p className="text-sm text-slate-600 mb-2">
                Having trouble accessing a tool? Our support team can help.
              </p>
              <a 
                href="tel:+1-555-123-4567" 
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Call (555) 123-4567 →
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <Mail className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Request New Link</h3>
              <p className="text-sm text-slate-600 mb-2">
                Need access to a tool not listed here? Let us know.
              </p>
              <a 
                href="mailto:support@amplifiedsolutions.com" 
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Email Support →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}