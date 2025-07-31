// src/app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Proposal } from '@/types/proposal';
import { Questionnaire } from '@/types/questionnaire';
import { 
  FileText, MessageSquare, Plus, DollarSign, CheckCircle, Eye, BookOpen, Link as LinkIcon, Video, Users
} from 'lucide-react';

export default function AdminDashboard() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [proposalsRes, questionnairesRes] = await Promise.all([
        fetch('/api/proposals'),
        fetch('/api/questionnaires')
      ]);
      
      const proposalsData = await proposalsRes.json();
      const questionnairesData = await questionnairesRes.json();
      
      setProposals(proposalsData);
      setQuestionnaires(questionnairesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalProposals: proposals.length,
    acceptedProposals: proposals.filter(p => p.status === 'accepted').length,
    totalRevenue: proposals.filter(p => p.status === 'accepted').reduce((sum, p) => sum + p.cost, 0),
    totalForms: questionnaires.length,
    completedForms: questionnaires.filter(q => q.status === 'completed').length,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600 mt-2">Overview of your proposals, forms, and content management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Proposals</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalProposals}</p>
              <p className="text-sm text-green-600 mt-1">{stats.acceptedProposals} accepted</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Revenue</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-sm text-slate-500 mt-1">from accepted proposals</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Forms</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalForms}</p>
              <p className="text-sm text-purple-600 mt-1">{stats.completedForms} completed</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Completion Rate</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {stats.totalForms > 0 ? Math.round((stats.completedForms / stats.totalForms) * 100) : 0}%
              </p>
              <p className="text-sm text-slate-500 mt-1">form responses</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Content Management */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Content Management</h2>
        <p className="text-slate-600 mb-6">Manage reports, resources, training materials, and links for client portals</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/content"
            className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all border border-slate-200"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Reports</h3>
              <p className="text-sm text-slate-600">Analytics & dashboards</p>
            </div>
          </Link>

          <Link
            href="/admin/content"
            className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all border border-slate-200"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Resources</h3>
              <p className="text-sm text-slate-600">Files & documents</p>
            </div>
          </Link>

          <Link
            href="/admin/content"
            className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all border border-slate-200"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Training</h3>
              <p className="text-sm text-slate-600">Videos & guides</p>
            </div>
          </Link>

          <Link
            href="/admin/content"
            className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all border border-slate-200"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Quick Links</h3>
              <p className="text-sm text-slate-600">External resources</p>
            </div>
          </Link>
        </div>

        <div className="mt-4 flex justify-center">
          <Link
            href="/admin/content"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <BookOpen className="w-5 h-5" />
            Manage All Content
          </Link>
        </div>
      </div>

      {/* Existing Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Proposals */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Recent Proposals</h2>
            <Link
              href="/admin/proposals/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              New Proposal
            </Link>
          </div>
          
          <div className="space-y-4">
            {proposals.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>No proposals yet</p>
              </div>
            ) : (
              proposals.slice(0, 5).map((proposal) => (
                <div key={proposal.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{proposal.client.name}</p>
                    <p className="text-sm text-slate-500">{formatCurrency(proposal.cost)} • {proposal.status}</p>
                  </div>
                  <Link
                    href={`/proposal/${proposal.id}`}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 p-2"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              ))
            )}
            
            {proposals.length > 0 && (
              <Link
                href="/admin/proposals"
                className="block text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2"
              >
                View All Proposals ({proposals.length}) →
              </Link>
            )}
          </div>
        </div>

        {/* Recent Forms */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Recent Forms</h2>
            <Link
              href="/admin/questionnaires/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              New Form
            </Link>
          </div>
          
          <div className="space-y-4">
            {questionnaires.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>No forms yet</p>
              </div>
            ) : (
              questionnaires.slice(0, 5).map((questionnaire) => (
                <div key={questionnaire.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{questionnaire.client.name}</p>
                    <p className="text-sm text-slate-500 capitalize">{questionnaire.status.replace('-', ' ')}</p>
                  </div>
                  <Link
                    href={`/questionnaire/${questionnaire.id}`}
                    target="_blank"
                    className="text-purple-600 hover:text-purple-800 p-2"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              ))
            )}
            
            {questionnaires.length > 0 && (
              <Link
                href="/admin/questionnaires"
                className="block text-center text-purple-600 hover:text-purple-800 text-sm font-medium py-2"
              >
                View All Forms ({questionnaires.length}) →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}