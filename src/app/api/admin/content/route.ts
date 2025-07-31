// src/app/api/admin/content/route.ts
import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

// Helper function to safely parse Redis data
function safeParse(data: any): any[] {
  if (!data) return [];
  
  // If it's already an array, return it
  if (Array.isArray(data)) return data;
  
  // If it's an object, return empty array (shouldn't happen for content)
  if (typeof data === 'object') return [];
  
  // If it's a string, try to parse it
  if (typeof data === 'string') {
    if (data === '[]' || data === '') return [];
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error parsing JSON:', error, 'Data:', data);
      return [];
    }
  }
  
  return [];
}

export async function GET() {
  try {
    // Get all content from Redis
    const [reports, resources, training, links] = await Promise.all([
      redis.get('content:reports'),
      redis.get('content:resources'), 
      redis.get('content:training'),
      redis.get('content:links')
    ]);

    console.log('Raw Redis data:', { reports, resources, training, links });

    const content = {
      reports: safeParse(reports),
      resources: safeParse(resources),
      training: safeParse(training),
      links: safeParse(links)
    };

    console.log('Parsed content:', content);

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const item = await request.json();
    
    // Validate required fields
    if (!item.title || !item.category) {
      return NextResponse.json({ error: 'Title and category are required' }, { status: 400 });
    }

    // Add metadata
    const newItem = {
      ...item,
      id: item.id || Date.now().toString(),
      createdAt: new Date().toISOString(),
      clientIds: item.clientIds || [] // Which clients can see this content
    };

    // Get existing content for this category
    const existingData = await redis.get(`content:${item.category}`);
    const contentArray = safeParse(existingData);
    
    // Add new item
    contentArray.push(newItem);
    
    // Save back to Redis as JSON string
    await redis.set(`content:${item.category}`, JSON.stringify(contentArray));

    console.log(`✅ Added ${item.category} content: ${item.title}`);
    
    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error adding content:', error);
    return NextResponse.json({ error: 'Failed to add content' }, { status: 500 });
  }
}