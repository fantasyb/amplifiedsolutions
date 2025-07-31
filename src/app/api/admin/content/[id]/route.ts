// src/app/api/admin/content/[id]/route.ts
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    console.log(`🗑️ Attempting to delete content item: ${id}`);
    
    // Find and remove the item from all categories
    const categories = ['reports', 'resources', 'training', 'links'];
    
    for (const category of categories) {
      const contentData = await redis.get(`content:${category}`);
      const contentArray = safeParse(contentData);
      
      console.log(`📋 Checking ${category}: ${contentArray.length} items`);
      
      const itemIndex = contentArray.findIndex((item: any) => item.id === id);
      
      if (itemIndex !== -1) {
        console.log(`✅ Found item in ${category} at index ${itemIndex}`);
        
        // Remove the item
        const removedItem = contentArray.splice(itemIndex, 1)[0];
        
        // Save back to Redis
        await redis.set(`content:${category}`, JSON.stringify(contentArray));
        
        console.log(`✅ Deleted ${category} content: ${removedItem.title} (${id})`);
        
        return NextResponse.json({ 
          success: true, 
          message: `Deleted "${removedItem.title}" from ${category}`,
          item: removedItem
        });
      }
    }
    
    console.log(`❌ Content item not found: ${id}`);
    return NextResponse.json({ error: 'Content not found' }, { status: 404 });
  } catch (error) {
    console.error('❌ Error deleting content:', error);
    return NextResponse.json({ 
      error: 'Failed to delete content',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}