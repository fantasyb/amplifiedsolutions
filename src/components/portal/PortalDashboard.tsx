// src/components/portal/PortalDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ClientPortal } from '@/types/global';
import { 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Calendar,
  DollarSign,
  TrendingUp,
  BarChart3,
  PlayCircle,
  BookOpen,
  ExternalLink,
  Video,
  Upload,
  LinkIcon
} from 'lucide-react';

interface PortalDashboardProps {
  clientPortal: ClientPortal;
  proposals: any[];
  questionnaires: any[];
}

interface ActivityItem {
  id: string;
  type: 'content_added' | 'content_updated' | 'system_update' | 'announcement';
  title: string;
  description: string;
  category: 'reports' | 'resources' | 'training' | 'links';
  date: string;
  contentId?: string;
}

export default function PortalDashboard({ clientPortal, proposals, questionnaires }: PortalDashboardProps) {
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [contentStats, setContentStats] = useState({
    reports: 0,
    resources: 0,
    training: 0,
    links: 0
  });
  const [loading, setLoading] = useState(true);

  // Load recent activity and content stats
  useEffect(() => {
    loadPortalData();
  }, [clientPortal.id]);

  const loadPortalData = async () => {
    try {
      // Load recent activity
      const activityResponse = await fetch(`/api/portal/activity?clientId=${clientPortal.id}&limit=5`);
      if (activityResponse.ok) {
        const { activities } = await activityResponse.json();
        setRecentActivity(activities);
      }

      // Load content for stats
      const contentResponse = await fetch(`/api/portal/content?clientId=${clientPortal.id}`);
      if (contentResponse.ok) {
        const content = await contentResponse.json();
        setContentStats({
          reports: content.reports?.length || 0,
          resources: content.resources?.length || 0,
          training: content.training?.length || 0,
          links: content.links?.length || 0
        });
      }
    } catch (error) {
      console.error('Error loading portal data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (category: string) => {
    switch (category) {
      case 'reports':
        return <BarChart3 className="w-4 h-4 text-blue-600" />;
      case 'resources':
        return <BookOpen className="w-4 h-4 text-green-600" />;
      case 'training':
        return <PlayCircle className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  const getActivityBgColor = (category: string) => {
    switch (category) {
      case 'reports':
        return 'bg-blue-100';
      case 'resources':
        return 'bg-green-100';
      case 'training':
        return 'bg-purple-100';
      default:
        return 'bg-slate-100';
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const totalContent = contentStats.reports + contentStats.resources + contentStats.training + contentStats.links;

  return (
    <div className="p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back! 👋
        </h1>
        <p className="text-slate-600 mt-2">
          Access your resources, training materials, and tools from Amplified Solutions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Reports Available</p>
              <p className="text-2xl font-bold text-slate-900">{contentStats.reports}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Resources</p>
              <p className="text-2xl font-bold text-slate-900">{contentStats.resources}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Training Modules</p>
              <p className="text-2xl font-bold text-slate-900">{contentStats.training}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Quick Links</p>
              <p className="text-2xl font-bold text-slate-900">{contentStats.links}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">Recent Updates</h2>
            <span className="text-sm text-slate-500">From Amplified Solutions</span>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          ) : recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getActivityBgColor(item.category)}`}>
                    {getActivityIcon(item.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{item.title}</p>
                    <p className="text-sm text-slate-600 truncate">{item.description}</p>
                  </div>
                  <div className="text-sm text-slate-500">
                    {formatDate(item.date)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-500">No recent updates</p>
              <p className="text-sm text-slate-400">New content will appear here when added</p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`/portal/${clientPortal.id}/reports`}
              className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-slate-900">Reports</span>
            </Link>

            <Link
              href={`/portal/${clientPortal.id}/training`}
              className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <PlayCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-slate-900">Training</span>
            </Link>

            <Link
              href={`/portal/${clientPortal.id}/resources`}
              className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <BookOpen className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-slate-900">Resources</span>
            </Link>

            <Link
              href={`/portal/${clientPortal.id}/links`}
              className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-slate-900">Quick Links</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Summary */}
      {totalContent > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Your Resource Library</h2>
              <p className="text-slate-600">
                {totalContent} resources available across all categories
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{totalContent}</div>
              <div className="text-sm text-slate-600">Total Resources</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}