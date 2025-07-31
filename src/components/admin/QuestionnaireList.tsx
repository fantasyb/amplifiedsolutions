'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Questionnaire } from '@/types/questionnaire';
import { 
  ExternalLink, Calendar, FileText, User, Eye, Trash2, Copy, 
  Filter, SortAsc, SortDesc, CheckCircle, Clock, Send, XCircle, Plus,
  TrendingUp
} from 'lucide-react';

interface QuestionnaireWithAnalytics extends Questionnaire {
  viewCount?: number;
  lastViewed?: string;
}

export default function QuestionnaireList() {
  const [questionnaires, setQuestionnaires] = useState<QuestionnaireWithAnalytics[]>([]);
  const [analytics, setAnalytics] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'client' | 'views'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch questionnaires and analytics in parallel
      const [questionnairesRes, analyticsRes] = await Promise.all([
        fetch('/api/questionnaires'),
        fetch('/api/admin/analytics')
      ]);
      
      const questionnairesData = await questionnairesRes.json();
      const analyticsData = analyticsRes.ok ? await analyticsRes.json() : { questionnaires: [] };
      
      // Merge analytics data with questionnaires
      const questionnairesWithAnalytics = questionnairesData.map((questionnaire: Questionnaire) => {
        const analytics = analyticsData.questionnaires?.find((a: any) => a.id === questionnaire.id);
        return {
          ...questionnaire,
          viewCount: analytics?.open_count ? parseInt(analytics.open_count) : 0,
          lastViewed: analytics?.latest_timestamp || null,
        };
      });
      
      setQuestionnaires(questionnairesWithAnalytics);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this questionnaire? This cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/questionnaires?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setQuestionnaires(prev => prev.filter(q => q.id !== id));
      } else {
        alert('Failed to delete questionnaire');
      }
    } catch (error) {
      console.error('Error deleting questionnaire:', error);
      alert('Failed to delete questionnaire');
    }
  };

  const copyUrlToClipboard = async (id: string) => {
    const url = `${window.location.origin}/questionnaire/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      alert('Questionnaire URL copied to clipboard!');
    } catch (err) {
      prompt('Copy this URL:', url);
    }
  };

  // Filter and sort questionnaires
  const filteredAndSortedQuestionnaires = questionnaires
    .filter(questionnaire => {
      if (statusFilter === 'all') return true;
      return questionnaire.status === statusFilter;
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
        case 'client':
          comparison = a.client.name.localeCompare(b.client.name);
          break;
        case 'views':
          comparison = (a.viewCount || 0) - (b.viewCount || 0);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Send className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'expired':
        return <XCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusCounts = () => {
    return {
      all: questionnaires.length,
      sent: questionnaires.filter(q => q.status === 'sent').length,
      'in-progress': questionnaires.filter(q => q.status === 'in-progress').length,
      completed: questionnaires.filter(q => q.status === 'completed').length,
      expired: questionnaires.filter(q => q.status === 'expired').length,
    };
  };

  const getEngagementStats = () => {
    const totalViews = questionnaires.reduce((sum, q) => sum + (q.viewCount || 0), 0);
    const viewedQuestionnaires = questionnaires.filter(q => (q.viewCount || 0) > 0).length;
    const completedCount = questionnaires.filter(q => q.status === 'completed').length;
    const engagementRate = questionnaires.length > 0 ? Math.round((viewedQuestionnaires / questionnaires.length) * 100) : 0;
    const completionRate = questionnaires.length > 0 ? Math.round((completedCount / questionnaires.length) * 100) : 0;
    
    return { totalViews, viewedQuestionnaires, engagementRate, completionRate };
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Forms Viewed</p>
              <p className="text-2xl font-bold text-slate-900">{engagementStats.viewedQuestionnaires}/{questionnaires.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 font-bold text-sm">{engagementStats.engagementRate}%</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Engagement Rate</p>
              <p className="text-xs text-slate-500">Forms opened by clients</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">{engagementStats.completionRate}%</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Completion Rate</p>
              <p className="text-xs text-slate-500">Forms fully completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { key: 'all', label: 'All', count: statusCounts.all },
            { key: 'sent', label: 'Sent', count: statusCounts.sent },
            { key: 'in-progress', label: 'In Progress', count: statusCounts['in-progress'] },
            { key: 'completed', label: 'Completed', count: statusCounts.completed },
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
            onChange={(e) => setSortBy(e.target.value as 'date' | 'status' | 'client' | 'views')}
            className="px-3 py-1 border border-slate-300 rounded-lg text-sm"
          >
            <option value="date">Date Created</option>
            <option value="status">Status</option>
            <option value="client">Client Name</option>
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

      {filteredAndSortedQuestionnaires.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {statusFilter === 'all' ? 'No questionnaires yet' : `No ${statusFilter.replace('-', ' ')} questionnaires`}
          </h3>
          <p className="text-slate-600 mb-6">
            {statusFilter === 'all' 
              ? 'Create your first questionnaire to get started'
              : `No questionnaires with status "${statusFilter.replace('-', ' ')}" found`
            }
          </p>
          {statusFilter === 'all' && (
            <Link
              href="/admin/questionnaires/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create First Questionnaire
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredAndSortedQuestionnaires.map((questionnaire) => (
            <div
              key={questionnaire.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {questionnaire.client.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(
                        questionnaire.status
                      )}`}
                    >
                      {getStatusIcon(questionnaire.status)}
                      {questionnaire.status.charAt(0).toUpperCase() + questionnaire.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                  {questionnaire.client.company && (
                    <p className="text-slate-600 mb-1">{questionnaire.client.company}</p>
                  )}
                  <p className="text-sm text-slate-500">{questionnaire.client.email}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-slate-900">
                    {questionnaire.title}
                  </div>
                  <div className="text-sm text-slate-500">
                    Template: {questionnaire.templateId.toUpperCase().replace('-', ' ')}
                  </div>
                </div>
              </div>

              {/* Analytics Row */}
              <div className="bg-slate-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-slate-900">{questionnaire.viewCount || 0}</span>
                      <span className="text-slate-600">views</span>
                    </div>
                    
                    {questionnaire.lastViewed ? (
                      <div className="flex items-center gap-1 text-sm text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>Last viewed {formatDateTime(questionnaire.lastViewed)}</span>
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500">
                        📧 Not viewed yet
                      </div>
                    )}
                  </div>
                  
                  {questionnaire.viewCount && questionnaire.viewCount > 0 && (
                    <div className="flex items-center gap-2">
                      {questionnaire.status === 'completed' ? (
                        <div className="text-xs text-green-600 font-medium">
                          ✅ Completed
                        </div>
                      ) : questionnaire.status === 'in-progress' ? (
                        <div className="text-xs text-yellow-600 font-medium">
                          🟡 In Progress
                        </div>
                      ) : (
                        <div className="text-xs text-blue-600 font-medium">
                          👁️ Client engaged
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Created {formatDate(questionnaire.createdAt)}
                </div>
                {questionnaire.expiresAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Expires {formatDate(questionnaire.expiresAt)}
                  </div>
                )}
                {questionnaire.completedAt && (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Completed {formatDate(questionnaire.completedAt)}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Progress:</span>
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        questionnaire.status === 'completed' 
                          ? 'bg-green-600 w-full' 
                          : questionnaire.status === 'in-progress'
                          ? 'bg-yellow-600 w-1/2'
                          : 'bg-slate-400 w-0'
                      }`}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-500">
                    {questionnaire.status === 'completed' ? '100%' : 
                     questionnaire.status === 'in-progress' ? '~50%' : '0%'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/questionnaire/${questionnaire.id}`}
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={() => copyUrlToClipboard(questionnaire.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Copy URL
                  </button>

                  {questionnaire.status === 'completed' && (
                    <Link
                      href={`/admin/questionnaires/${questionnaire.id}/responses`}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Responses
                    </Link>
                  )}
                  
                  <button
                    onClick={() => handleDelete(questionnaire.id)}
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