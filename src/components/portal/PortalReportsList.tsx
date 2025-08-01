// src/components/portal/PortalReportsList.tsx
'use client';

import { useState, useEffect } from 'react';
import { ClientPortal } from '@/types/global';
import { 
  BarChart3, 
  ExternalLink, 
  Calendar, 
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Activity,
  Eye,
  Lock,
  FileText,
  Video,
  Link,
  Mail
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'link' | 'file' | 'video';
  category: string;
  clientIds: string[];
  createdAt: string;
}

interface PortalReportsListProps {
  clientPortal: ClientPortal;
}

export default function PortalReportsList({ clientPortal }: PortalReportsListProps) {
  const [reports, setReports] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, [clientPortal]);

  const fetchReports = async () => {
    try {
      const response = await fetch(`/api/portal/content?clientId=${clientPortal.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Portal content data:', data);
        
        // Extract just the reports array from the response
        const reportsData = data.reports || [];
        console.log('Reports data:', reportsData);
        setReports(reportsData);
      } else {
        console.error('Failed to fetch reports');
        setReports([]);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // Ensure reports is an array before using filter/map
  const safeReports = Array.isArray(reports) ? reports : [];

  const getIcon = (type: string) => {
    switch (type) {
      case 'file': return FileText;
      case 'video': return Video;
      case 'link': return Link;
      default: return BarChart3;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'file': return 'text-blue-600 bg-blue-100';
      case 'video': return 'text-purple-600 bg-purple-100';
      case 'link': return 'text-green-600 bg-green-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (safeReports.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No Reports Available</h3>
        <p className="text-slate-600">
          Your reports and analytics dashboards will appear here once they're added by your account manager.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Available Reports</p>
              <p className="text-2xl font-bold text-slate-900">{safeReports.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Interactive Reports</p>
              <p className="text-2xl font-bold text-slate-900">
                {safeReports.filter(r => r.type === 'link').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Downloaded Reports</p>
              <p className="text-2xl font-bold text-slate-900">
                {safeReports.filter(r => r.type === 'file').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Your Reports & Analytics</h2>
        
        <div className="grid gap-4">
          {safeReports.map((report) => {
            const IconComponent = getIcon(report.type);
            const iconColors = getIconColor(report.type);
            
            return (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColors}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">{report.title}</h3>
                    <p className="text-sm text-slate-600 mb-2">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Added: {formatDate(report.createdAt)}</span>
                      <span className={`px-2 py-1 rounded-full ${
                        report.type === 'link' 
                          ? 'bg-green-100 text-green-700' 
                          : report.type === 'file'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {report.type === 'link' ? 'Interactive' : report.type === 'file' ? 'Download' : 'Video'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={report.url}
                    target={report.type === 'link' ? '_blank' : '_self'}
                    rel={report.type === 'link' ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      report.type === 'file' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {report.type === 'file' ? (
                      <>
                        <FileText className="w-4 h-4" />
                        Download
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        View Report
                        <ExternalLink className="w-3 h-3" />
                      </>
                    )}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Need Help?</h2>
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Contact Support</h3>
          <p className="text-slate-600 mb-4">
            Need help understanding your reports or have questions? We're here to help.
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