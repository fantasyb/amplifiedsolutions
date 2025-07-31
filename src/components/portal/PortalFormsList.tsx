// src/components/portal/PortalFormsList.tsx
'use client';

import Link from 'next/link';
import { ClientPortal } from '@/types/global';
import { 
  MessageSquare, 
  Calendar, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  Send,
  AlertCircle,
  PlayCircle,
  FileText
} from 'lucide-react';

interface PortalFormsListProps {
  questionnaires: any[];
  clientPortal: ClientPortal;
}

export default function PortalFormsList({ questionnaires, clientPortal }: PortalFormsListProps) {
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
        return <PlayCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'expired':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'sent':
        return 'Ready to start';
      case 'in-progress':
        return 'In progress';
      case 'completed':
        return 'Completed';
      case 'expired':
        return 'Expired';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isExpiringSoon = (expiresAt: Date | string) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const daysDiff = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7 && daysDiff > 0;
  };

  const getDaysUntilExpiry = (expiresAt: Date | string) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const daysDiff = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  if (questionnaires.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No forms assigned yet</h3>
        <p className="text-slate-600">
          We'll send you forms here when we need additional information for your project.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Pending</p>
              <p className="text-2xl font-bold text-slate-900">
                {questionnaires.filter(q => q.status === 'sent').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">In Progress</p>
              <p className="text-2xl font-bold text-slate-900">
                {questionnaires.filter(q => q.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Completed</p>
              <p className="text-2xl font-bold text-slate-900">
                {questionnaires.filter(q => q.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">
                {questionnaires.length > 0 ? Math.round((questionnaires.filter(q => q.status === 'completed').length / questionnaires.length) * 100) : 0}%
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Completion Rate</p>
              <p className="text-xs text-slate-500">Overall progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Forms List */}
      <div className="space-y-6">
        {questionnaires.map((questionnaire) => (
          <div
            key={questionnaire.id}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {questionnaire.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(
                      questionnaire.status
                    )}`}
                  >
                    {getStatusIcon(questionnaire.status)}
                    {getStatusMessage(questionnaire.status)}
                  </span>
                  {questionnaire.expiresAt && isExpiringSoon(questionnaire.expiresAt) && questionnaire.status !== 'completed' && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      Due Soon
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-600 mb-2">
                  Template: {questionnaire.templateId.replace('-', ' ').toUpperCase()}
                </div>
              </div>
              
              <div className="text-right">
                {questionnaire.status === 'completed' && questionnaire.completedAt && (
                  <div className="text-sm text-green-600 font-medium">
                    ✅ Completed {formatDate(questionnaire.completedAt)}
                  </div>
                )}
                {questionnaire.expiresAt && questionnaire.status !== 'completed' && (
                  <div className={`text-sm font-medium ${
                    isExpiringSoon(questionnaire.expiresAt) ? 'text-red-600' : 'text-slate-600'
                  }`}>
                    {getDaysUntilExpiry(questionnaire.expiresAt) > 0 
                      ? `${getDaysUntilExpiry(questionnaire.expiresAt)} days left`
                      : 'Expired'
                    }
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Progress</span>
                <span className="text-sm text-slate-600">
                  {questionnaire.status === 'completed' ? '100%' : 
                   questionnaire.status === 'in-progress' ? '~50%' : '0%'}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
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
            </div>

            {/* Dates */}
            <div className="flex items-center gap-6 text-sm text-slate-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Assigned {formatDate(questionnaire.createdAt)}
              </div>
              {questionnaire.expiresAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Due {formatDate(questionnaire.expiresAt)}
                </div>
              )}
              {questionnaire.completedAt && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  Completed {formatDate(questionnaire.completedAt)}
                </div>
              )}
            </div>

            {/* Notes */}
            {questionnaire.notes && (
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-medium text-slate-700 mb-1">Instructions:</h4>
                <p className="text-sm text-slate-600">{questionnaire.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MessageSquare className="w-4 h-4" />
                <span>From Amplified Solutions</span>
              </div>

              <div className="flex items-center gap-3">
                {questionnaire.status === 'completed' ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                    Form Completed
                  </div>
                ) : questionnaire.status === 'expired' ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    Expired
                  </div>
                ) : (
                  <>
                    <Link
                      href={`/questionnaire/${questionnaire.id}`}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      View Form
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <Link
                      href={`/questionnaire/${questionnaire.id}`}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {questionnaire.status === 'in-progress' ? (
                        <>
                          <PlayCircle className="w-4 h-4" />
                          Continue Form
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Start Form
                        </>
                      )}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}