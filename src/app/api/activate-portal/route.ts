// Create this as: src/app/api/activate-portal/route.ts
import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(request: Request) {
  try {
    const { clientId } = await request.json();
    
    if (!clientId) {
      return NextResponse.json({ error: 'Client ID required' }, { status: 400 });
    }

    // Update the portal to be active (using string as your existing code expects)
    await redis.hset(`client_portal:${clientId}`, { isActive: 'true' });

    return NextResponse.json({ 
      success: true, 
      message: `Portal ${clientId} activated successfully`
    });
  } catch (error) {
    console.error('Error activating portal:', error);
    return NextResponse.json({ 
      error: 'Failed to activate portal' 
    }, { status: 500 });
  }
}

// Also add GET method for easy browser access
export async function GET(request: Request) {
  const url = new URL(request.url);
  const clientId = url.searchParams.get('clientId');
  
  if (!clientId) {
    return NextResponse.json({ error: 'Client ID required as query parameter' }, { status: 400 });
  }

  try {
    await redis.hset(`client_portal:${clientId}`, { isActive: 'true' });
    return NextResponse.json({ 
      success: true, 
      message: `Portal ${clientId} activated successfully`
    });
  } catch (error) {
    console.error('Error activating portal:', error);
    return NextResponse.json({ 
      error: 'Failed to activate portal' 
    }, { status: 500 });
  }
}