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
  Award
} from 'lucide-react';

interface PortalTrainingCenterProps {
  clientPortal: ClientPortal;
}

export default function PortalTrainingCenter({ clientPortal }: PortalTrainingCenterProps) {
  const [videos, setVideos] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch client-specific training content from API
    // For now, we'll use mock data
    const mockVideos = [
      {
        id: 'lead-gen-basics',
        title: 'Lead Generation Fundamentals',
        description: 'Master the basics of generating high-quality leads for your business',
        duration: '15:30',
        category: 'Lead Generation',
        difficulty: 'Beginner',
        completed: true,
        thumbnail: '/api/placeholder/400/225',
        videoUrl: 'https://www.youtube.com/watch?v=example1',
        instructor: 'Joey Ahern',
        uploadDate: '2024-01-15',
        views: 1250
      },
      {
        id: 'crm-setup',
        title: 'CRM Setup & Configuration',
        description: 'Step-by-step guide to setting up your CRM for maximum efficiency',
        duration: '22:45',
        category: 'CRM Management',
        difficulty: 'Intermediate',
        completed: false,
        thumbnail: '/api/placeholder/400/225',
        videoUrl: 'https://www.youtube.com/watch?v=example2',
        instructor: 'Lee Johnson',
        uploadDate: '2024-01-10',
        views: 890
      },
      {
        id: 'conversion-optimization',
        title: 'Conversion Rate Optimization',
        description: 'Advanced techniques to improve your conversion rates and ROI',
        duration: '28:15',
        category: 'Optimization',
        difficulty: 'Advanced',
        completed: false,
        thumbnail: '/api/placeholder/400/225',
        videoUrl: 'https://www.youtube.com/watch?v=example3',
        instructor: 'Kris Lindahl',
        uploadDate: '2024-01-08',
        views: 2100
      },
      {
        id: 'email-marketing',
        title: 'Email Marketing Mastery',
        description: 'Create compelling email campaigns that convert prospects into clients',
        duration: '19:20',
        category: 'Email Marketing',
        difficulty: 'Intermediate',
        completed: true,
        thumbnail: '/api/placeholder/400/225',
        videoUrl: 'https://www.youtube.com/watch?v=example4',
        instructor: 'Cynthia Howe',
        uploadDate: '2024-01-05',
        views: 1650
      },
      {
        id: 'social-media-leads',
        title: 'Social Media Lead Generation',
        description: 'Leverage social platforms to generate consistent, quality leads',
        duration: '25:10',
        category: 'Lead Generation',
        difficulty: 'Beginner',
        completed: false,
        thumbnail: '/api/placeholder/400/225',
        videoUrl: 'https://www.youtube.com/watch?v=example5',
        instructor: 'Rosario Martinez',
        uploadDate: '2024-01-01',
        views: 950
      },
      {
        id: 'analytics-reporting',
        title: 'Analytics & Reporting Deep Dive',
        description: 'Understand your data and make informed business decisions',
        duration: '35:45',
        category: 'Analytics',
        difficulty: 'Advanced',
        completed: false,
        thumbnail: '/api/placeholder/400/225',
        videoUrl: 'https://www.youtube.com/watch?v=example6',
        instructor: 'Joey Ahern',
        uploadDate: '2023-12-28',
        views: 1850
      }
    ];

    setVideos(mockVideos);
    setLoading(false);
  }, [clientPortal]);

  const categories = ['all', ...Array.from(new Set(videos.map(v => v.category)))];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getProgress = () => {
    const completedCount = videos.filter(v => v.completed).length;
    return videos.length > 0 ? Math.round((completedCount / videos.length) * 100) : 0;
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
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Videos</p>
              <p className="text-2xl font-bold text-slate-900">{videos.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Completed</p>
              <p className="text-2xl font-bold text-slate-900">
                {videos.filter(v => v.completed).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Total Duration</p>
              <p className="text-2xl font-bold text-slate-900">
                {Math.floor(videos.reduce((acc, v) => {
                  const [minutes, seconds] = v.duration.split(':').map(Number);
                  return acc + minutes + (seconds / 60);
                }, 0))}m
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Progress</p>
              <p className="text-2xl font-bold text-slate-900">{getProgress()}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Your Learning Progress</h2>
          <span className="text-sm text-slate-600">
            {videos.filter(v => v.completed).length} of {videos.length} completed
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div 
            className="bg-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${getProgress()}%` }}
          ></div>
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
                placeholder="Search training videos..."
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

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Video Thumbnail */}
            <div className="relative">
              <div className="aspect-video bg-slate-200 flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-slate-400" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
              {video.completed && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-slate-900 leading-tight">{video.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(video.difficulty)}`}>
                  {video.difficulty}
                </span>
              </div>
              
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{video.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {video.instructor}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(video.uploadDate)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  {video.views.toLocaleString()} views
                </div>
                
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <PlayCircle className="w-4 h-4" />
                  Watch
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlayCircle className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No videos found</h3>
          <p className="text-slate-600">
            Try adjusting your search terms or category filter.
          </p>
        </div>
      )}

      {/* Recommended Learning Path */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recommended Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">1</span>
              </div>
              <h3 className="font-semibold text-slate-900">Foundation</h3>
            </div>
            <p className="text-sm text-slate-600">Start with lead generation basics and CRM setup</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-sm">2</span>
              </div>
              <h3 className="font-semibold text-slate-900">Growth</h3>
            </div>
            <p className="text-sm text-slate-600">Learn email marketing and social media strategies</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">3</span>
              </div>
              <h3 className="font-semibold text-slate-900">Optimization</h3>
            </div>
            <p className="text-sm text-slate-600">Master conversion optimization and analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
}