// src/app/api/pixel/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type'); // 'proposal', 'questionnaire', or 'portal'
    const id = searchParams.get('id');
    const event = searchParams.get('event') || 'open'; // 'open', 'view', 'scroll', etc.
    const section = searchParams.get('section'); // For portal sections like 'dashboard', 'reports'
    
    if (!type || !id) {
      console.log('❌ Pixel: Missing parameters', { type, id });
      return createPixelResponse();
    }

    // Get client info from headers
    const userAgent = request.headers.get('user-agent') || '';
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const referer = request.headers.get('referer') || '';

    // Skip tracking for admin users only
    const adminAuth = request.cookies.get('admin-auth');
    const isAdmin = adminAuth?.value === 'true';

    if (isAdmin) {
      console.log('🚫 Skipping admin user tracking');
      return createPixelResponse();
    }

    console.log('✅ Tracking non-admin user');
    
    // Create tracking data
    const trackingData = {
      type,
      id,
      event,
      section: section || undefined, // Add section for portal tracking
      timestamp: new Date().toISOString(),
      ip,
      userAgent,
      referer,
    };

    console.log('📊 Pixel Tracking Event:', trackingData);

    try {
      // Save tracking event to Redis
      const trackingKey = `tracking:${type}:${id}`;
      const eventKey = section 
        ? `${trackingKey}:${section}:${event}:${Date.now()}`
        : `${trackingKey}:${event}:${Date.now()}`;
      
      // Store the tracking event
      await redis.hset(eventKey, trackingData);
      
      // Also update a counter and latest event for the item
      const counterKey = section ? `${event}_${section}_count` : `${event}_count`;
      await redis.hincrby(trackingKey, counterKey, 1);
      await redis.hset(trackingKey, {
        latest_event: section ? `${event}_${section}` : event,
        latest_timestamp: trackingData.timestamp,
        latest_ip: ip,
      });

      // Update the main proposal/questionnaire/portal with tracking info
      if (type === 'proposal') {
        const proposalKey = `proposal:${id}`;
        const proposalExists = await redis.exists(proposalKey);
        
        if (proposalExists) {
          await redis.hset(proposalKey, {
            last_viewed: trackingData.timestamp,
            view_count: await redis.hincrby(`tracking:proposal:${id}`, 'open_count', 0) || 1,
          });
          console.log('✅ Updated proposal tracking for:', id);
        }
      } else if (type === 'questionnaire') {
        const questionnaireKey = `questionnaire:${id}`;
        const questionnaireExists = await redis.exists(questionnaireKey);
        
        if (questionnaireExists) {
          await redis.hset(questionnaireKey, {
            last_viewed: trackingData.timestamp,
            view_count: await redis.hincrby(`tracking:questionnaire:${id}`, 'open_count', 0) || 1,
          });
          console.log('✅ Updated questionnaire tracking for:', id);
        }
      } else if (type === 'portal') {
        // Track portal section visits
        const portalKey = `client_portal:${id}`;
        const portalExists = await redis.exists(portalKey);
        
        if (portalExists) {
          const sectionKey = section ? `${section}_last_viewed` : 'portal_last_viewed';
          const countKey = section ? `${section}_view_count` : 'portal_view_count';
          
          await redis.hset(portalKey, {
            [sectionKey]: trackingData.timestamp,
          });
          
          await redis.hincrby(portalKey, countKey, 1);
          
          console.log(`✅ Updated portal tracking for: ${id}${section ? ` (${section})` : ''}`);
        }
      }

      // Set expiry for tracking data (90 days)
      await redis.expire(eventKey, 60 * 60 * 24 * 90);
      await redis.expire(trackingKey, 60 * 60 * 24 * 90);

    } catch (redisError) {
      console.error('❌ Redis tracking error:', redisError);
      // Continue to return pixel even if tracking fails
    }

    return createPixelResponse();
    
  } catch (error) {
    console.error('❌ Pixel tracking error:', error);
    return createPixelResponse();
  }
}

function createPixelResponse() {
  // Return a 1x1 transparent pixel
  const pixel = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    'base64'
  );

  return new NextResponse(pixel, {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Content-Length': pixel.length.toString(),
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*',
    },
  });
}