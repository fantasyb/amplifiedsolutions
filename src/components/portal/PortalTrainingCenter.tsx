// src/components/portal/PortalTrainingCenter.tsx
'use client';

import { useState, useEffect } from 'react';
import { ClientPortal } from '@/types/global';
import { 
  PlayCircle, 
  Clock, 
  CheckCircle, 
  ExternalLink,
  Search,
  Filter,
  Star,
  Download,
  Calendar,
  User,
  Award,
  Video,
  FileText,
  Link as LinkIcon,
  Mail
} from 'lucide-react';

interface TrainingItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'link' | 'file' | 'video';
  category: string;
  clientIds: string[];
  createdAt: string;
  featured?: boolean;
  completed?: boolean;
}

interface PortalTrainingCenterProps {
  clientPortal: ClientPortal;
}

export default function PortalTrainingCenter({ clientPortal }: PortalTrainingCenterProps) {
  const [trainings, setTrainings] = useState<TrainingItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainings();
  }, [clientPortal]);

  const fetchTrainings = async () => {
    try {
      const response = await fetch(`/api/portal/content?clientId=${clientPortal.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Portal content data:', data);
        
        // Extract just the training array from the response
        const trainingData = data.training || [];
        console.log('Training data:', trainingData);
        setTrainings(trainingData);
      } else {
        console.error('Failed to fetch training materials');
        setTrainings([]);
      }
    } catch (error) {
      console.error('Error fetching training materials:', error);
      setTrainings([]);
    } finally {
      setLoading(false);
    }
  };

  // Ensure trainings is an array before using map
  const safeTrainings = Array.isArray(trainings) ? trainings : [];
  const categories = ['all', ...Array.from(new Set(safeTrainings.map(t => t.category || 'General')))];

  const filteredTrainings = safeTrainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchTerm.toLowerCase());
    const trainingCategory = training.category || 'General';
    const matchesCategory = selectedCategory === 'all' || trainingCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIcon = (training: TrainingItem) => {
    if (training.type === 'video') return Video;
    if (training.type === 'file') return FileText;
    return LinkIcon;
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'text-purple-600 bg-purple-100';
      case 'file':
        return 'text-blue-600 bg-blue-100';
      case 'link':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'video':
        return 'Video';
      case 'file':
        return 'Document';
      case 'link':
        return 'External Link';
      default:
        return 'Content';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleTrainingClick = (training: TrainingItem) => {
    if (training.type === 'file') {
      // For files, open in new tab for viewing or download
      window.open(training.url, '_blank');
    } else {
      // For videos and links, open in new tab
      window.open(training.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Group trainings by category
  const trainingsByCategory = filteredTrainings.reduce((acc, training) => {
    const category = training.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(training);
    return acc;
  }, {} as Record<string, TrainingItem[]>);

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
              <PlayCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Materials</p>
              <p className="text-2xl font-bold text-slate-900">{safeTrainings.length}</p>
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
                {safeTrainings.filter(t => t.type === 'video').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Documents</p>
              <p className="text-2xl font-bold text-slate-900">
                {safeTrainings.filter(t => t.type === 'file').length}
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
                {safeTrainings.filter(t => t.type === 'link').length}
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
                placeholder="Search training materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
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
        </div>
      </div>

      {/* Training Materials organized by category */}
      {Object.entries(trainingsByCategory).length > 0 ? (
        Object.entries(trainingsByCategory).map(([category, categoryTrainings]) => (
          <div key={category} className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-6">{category}</h2>
            <div className="grid gap-6">
              {categoryTrainings.map((training) => {
                const IconComponent = getIcon(training);
                const iconColors = getIconColor(training.type);
                
                return (
                  <div
                    key={training.id}
                    className="border border-slate-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColors}`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-slate-900 text-lg">{training.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                training.type === 'video' ? 'bg-purple-100 text-purple-700' :
                                training.type === 'file' ? 'bg-blue-100 text-blue-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {getTypeLabel(training.type)}
                              </span>
                            </div>
                            
                            <p className="text-slate-600 mb-4">{training.description}</p>
                            
                            <div className="flex items-center gap-6 text-sm text-slate-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Added {formatDate(training.createdAt)}
                              </div>
                              {training.type === 'link' && (
                                <div className="flex items-center gap-1 truncate">
                                  <ExternalLink className="w-4 h-4" />
                                  <span className="truncate max-w-48">{training.url}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 ml-4">
                          <button
                            onClick={() => handleTrainingClick(training)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              training.type === 'video' 
                                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                : training.type === 'file'
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                          >
                            {training.type === 'video' ? (
                              <>
                                <PlayCircle className="w-4 h-4" />
                                Watch
                              </>
                            ) : training.type === 'file' ? (
                              <>
                                <FileText className="w-4 h-4" />
                                View
                              </>
                            ) : (
                              <>
                                <ExternalLink className="w-4 h-4" />
                                Visit
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
          </div>
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlayCircle className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {searchTerm || selectedCategory !== 'all' ? 'No training materials found' : 'No training materials available'}
          </h3>
          <p className="text-slate-600">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search terms or category filter.'
              : 'Your account manager will add training videos and materials here to help you succeed.'
            }
          </p>
        </div>
      )}

      {/* Getting Started Guide */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Getting Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">1</span>
              </div>
              <h3 className="font-semibold text-slate-900">Foundation</h3>
            </div>
            <p className="text-sm text-slate-600">Start with basic concepts and fundamental strategies</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-sm">2</span>
              </div>
              <h3 className="font-semibold text-slate-900">Implementation</h3>
            </div>
            <p className="text-sm text-slate-600">Apply what you've learned with hands-on exercises</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">3</span>
              </div>
              <h3 className="font-semibold text-slate-900">Optimization</h3>
            </div>
            <p className="text-sm text-slate-600">Refine your approach and maximize results</p>
          </div>
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
            Questions about training materials or need help with something? We're here to help.
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