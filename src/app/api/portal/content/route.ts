// src/app/api/portal/content/route.ts
import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

// Helper function to safely parse Redis data
function safeParse(data: any): any[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === 'object') return [];
  if (typeof data === 'string') {
    if (data === '[]' || data === '') return [];
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return [];
    }
  }
  return [];
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const clientId = url.searchParams.get('clientId');

    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    // Get content for the specified category
    const contentData = await redis.get(`content:${category}`);
    const allContent = safeParse(contentData);

    console.log(`📋 Found ${allContent.length} ${category} items total`);

    // Filter content that is available to all clients or specifically assigned to this client
    const availableContent = allContent.filter((item: any) => {
      // If no clientIds specified, available to all clients
      if (!item.clientIds || item.clientIds.length === 0) {
        return true;
      }
      
      // If clientId provided, check if this client has access
      if (clientId && item.clientIds.includes(clientId)) {
        return true;
      }
      
      return false;
    });

    console.log(`📋 Found ${availableContent.length} ${category} items for client ${clientId || 'all'}`);

    return NextResponse.json(availableContent);
  } catch (error) {
    console.error('Error fetching portal content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}