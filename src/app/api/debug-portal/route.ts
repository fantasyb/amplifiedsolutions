// Create this as: src/app/api/debug-portal/route.ts
import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const clientId = url.searchParams.get('clientId');
  
  if (!clientId) {
    return NextResponse.json({ error: 'Client ID required' }, { status: 400 });
  }

  try {
    // Get raw data from Redis
    const rawData = await redis.hgetall(`client_portal:${clientId}`);
    
    return NextResponse.json({ 
      clientId,
      rawRedisData: rawData,
      keysInData: Object.keys(rawData || {}),
      isActiveValue: rawData?.isActive || 'NOT_FOUND',
      isActiveType: rawData?.isActive ? typeof rawData.isActive : 'undefined',
      isActiveComparison: {
        'exists': !!rawData?.isActive,
        'equals_string_true': rawData?.isActive === 'true',
        'equals_boolean_true': rawData?.isActive === true,
        'boolean_conversion': Boolean(rawData?.isActive)
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to debug portal',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}