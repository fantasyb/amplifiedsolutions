// src/components/portal/PortalDashboard.tsx
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
  ExternalLink
} from 'lucide-react';

interface PortalDashboardProps {
  clientPortal: ClientPortal;
  proposals: any[];
  questionnaires: any[];
}

export default function PortalDashboard({ clientPortal, proposals, questionnaires }: PortalDashboardProps) {
  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };

  const getStats = () => {
    const pendingProposals = proposals.filter(p => p.status === 'pending').length;
    const acceptedProposals = proposals.filter(p => p.status === 'accepted').length;
    const incompleteQuestionnaires = questionnaires.filter(q => q.status !== 'completed').length;
    const completedQuestionnaires = questionnaires.filter(q => q.status === 'completed').length;
    const totalValue = proposals.reduce((sum, p) => sum + (p.status === 'accepted' ? p.cost : 0), 0);
    
    const completionRate = questionnaires.length > 0 
      ? Math.round((completedQuestionnaires / questionnaires.length) * 100) 
      : 0;

    return {
      pendingProposals,
      acceptedProposals,
      incompleteQuestionnaires,
      completedQuestionnaires,
      totalValue,
      completionRate
    };
  };

  const getRecentActivity = () => {
    const activity: Array<{
      type: 'proposal' | 'questionnaire';
      title: string;
      description: string;
      date: Date | string;
      status: string;
      id: string;
    }> = [];
    
    // Add recent proposals
    proposals.slice(0, 3).forEach(proposal => {
      activity.push({
        type: 'proposal',
        title: `Proposal created`,
        description: `${proposal.services.length} services - ${proposal.cost}`,
        date: proposal.createdAt,
        status: proposal.status,
        id: proposal.id
      });
    });

    // Add recent questionnaires
    questionnaires.slice(0, 3).forEach(questionnaire => {
      activity.push({
        type: 'questionnaire',
        title: `Form assigned: ${questionnaire.title}`,
        description: questionnaire.status === 'completed' ? 'Completed' : 'Needs completion',
        date: questionnaire.createdAt,
        status: questionnaire.status,
        id: questionnaire.id
      });
    });

    // Sort by date and take the 5 most recent
    return activity
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
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
      month: 'short',
      day: 'numeric',
    });
  };

  const stats = getStats();
  const recentActivity = getRecentActivity();

  return (
    <div className="p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {getFirstName(clientPortal.clientName)}! 👋
        </h1>
        <p className="text-slate-600 mt-2">
          Here's what's happening with your account at Amplified Solutions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Active Proposals</p>
              <p className="text-2xl font-bold text-slate-900">{stats.pendingProposals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Accepted Projects</p>
              <p className="text-2xl font-bold text-slate-900">{stats.acceptedProposals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Pending Forms</p>
              <p className="text-2xl font-bold text-slate-900">{stats.incompleteQuestionnaires}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Value</p>
              <p className="text-2xl font-bold text-slate-900">{formatCurrency(stats.totalValue)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      {(stats.pendingProposals > 0 || stats.incompleteQuestionnaires > 0) && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Action Items</h2>
          <div className="space-y-3">
            {stats.pendingProposals > 0 && (
              <div className="flex items-center justify-between bg-white rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Review pending proposals</p>
                    <p className="text-sm text-slate-600">{stats.pendingProposals} proposal{stats.pendingProposals !== 1 ? 's' : ''} awaiting your decision</p>
                  </div>
                </div>
                <Link
                  href={`/portal/${clientPortal.id}/proposals`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Review
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {stats.incompleteQuestionnaires > 0 && (
              <div className="flex items-center justify-between bg-white rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Complete pending forms</p>
                    <p className="text-sm text-slate-600">{stats.incompleteQuestionnaires} form{stats.incompleteQuestionnaires !== 1 ? 's' : ''} need your input</p>
                  </div>
                </div>
                <Link
                  href={`/portal/${clientPortal.id}/forms`}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Complete
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.type === 'proposal' ? 'bg-blue-100' : 'bg-orange-100'
                  }`}>
                    {item.type === 'proposal' ? (
                      <FileText className="w-4 h-4 text-blue-600" />
                    ) : (
                      <MessageSquare className="w-4 h-4 text-orange-600" />
                    )}
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
            <p className="text-slate-500">No recent activity</p>
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

      {/* Progress Summary */}
      {questionnaires.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Your Progress</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Form Completion</span>
                <span className="text-sm text-slate-600">{stats.completedQuestionnaires}/{questionnaires.length} completed</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${stats.completionRate}%` }}
                ></div>
              </div>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {stats.completionRate}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}