// src/app/api/portal/activity/route.ts
import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

interface ActivityItem {
  id: string;
  type: 'content_added' | 'content_updated' | 'system_update' | 'announcement';
  title: string;
  description: string;
  category: 'reports' | 'resources' | 'training';
  date: string;
  contentId?: string;
}

// Helper function to safely parse Redis data
function safeParse(data: any): any[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') {
    if (data === '[]' || data === '') return [];
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }
  return [];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Get content excluding quick links (they're not really "activity")
    const [reports, resources, training] = await Promise.all([
      redis.get('content:reports'),
      redis.get('content:resources'), 
      redis.get('content:training')
    ]);

    const allContent: any[] = [
      ...safeParse(reports).map(item => ({ ...item, category: 'reports' })),
      ...safeParse(resources).map(item => ({ ...item, category: 'resources' })),
      ...safeParse(training).map(item => ({ ...item, category: 'training' }))
    ];

    // Filter content for specific client if provided
    const filteredContent = clientId 
      ? allContent.filter(item => 
          !item.clientIds || 
          item.clientIds.length === 0 || 
          item.clientIds.includes(clientId)
        )
      : allContent;

    // Convert content to activity items
    const activities: ActivityItem[] = filteredContent
      .map(item => ({
        id: `activity_${item.id}`,
        type: 'content_added' as const,
        title: getActivityTitle(item.category, item.type),
        description: item.title,
        category: item.category,
        date: item.createdAt,
        contentId: item.id
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    return NextResponse.json({ activities });
  } catch (error) {
    console.error('Error fetching portal activity:', error);
    return NextResponse.json({ error: 'Failed to fetch activity' }, { status: 500 });
  }
}

function getActivityTitle(category: string, type: string): string {
  const categoryNames = {
    reports: 'New Report',
    resources: 'New Resource',
    training: 'New Training'
  };

  const typeDescriptions = {
    link: 'Available',
    file: 'Document',
    video: 'Video'
  };

  return `${categoryNames[category as keyof typeof categoryNames]} ${typeDescriptions[type as keyof typeof typeDescriptions] || ''} Added`.trim();
}