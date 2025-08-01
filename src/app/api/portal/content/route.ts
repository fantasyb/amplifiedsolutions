// src/app/api/portal/content/route.ts
import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

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

    // Get all content from Redis
    const [reports, resources, training, links] = await Promise.all([
      redis.get('content:reports'),
      redis.get('content:resources'), 
      redis.get('content:training'),
      redis.get('content:links')
    ]);

    // Parse and filter content based on client access
    const filterContentForClient = (content: any[], clientId: string | null) => {
      if (!clientId) return content; // Return all if no specific client
      
      return content.filter(item => {
        // If no clientIds specified, it's available to all clients
        if (!item.clientIds || item.clientIds.length === 0) {
          return true;
        }
        // Otherwise, check if this client has access
        return item.clientIds.includes(clientId);
      });
    };

    const allReports = safeParse(reports);
    const allResources = safeParse(resources);
    const allTraining = safeParse(training);
    const allLinks = safeParse(links);

    const filteredContent = {
      reports: filterContentForClient(allReports, clientId),
      resources: filterContentForClient(allResources, clientId),
      training: filterContentForClient(allTraining, clientId),
      links: filterContentForClient(allLinks, clientId)
    };

    return NextResponse.json(filteredContent);
  } catch (error) {
    console.error('Error fetching portal content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}