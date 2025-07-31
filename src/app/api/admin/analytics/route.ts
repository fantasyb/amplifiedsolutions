// src/app/api/admin/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication using request.cookies instead of cookies()
    const adminAuth = request.cookies.get('admin-auth');
    const isAuthenticated = adminAuth?.value === 'true';
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'proposal' or 'questionnaire'
    const id = searchParams.get('id');

    if (id && type) {
      // Get analytics for specific item
      const trackingKey = `tracking:${type}:${id}`;
      const trackingData = await redis.hgetall(trackingKey);
      
      // Get all tracking events for this item
      const eventKeys = await redis.keys(`${trackingKey}:*`);
      const events = [];
      
      for (const eventKey of eventKeys) {
        try {
          const eventData = await redis.hgetall(eventKey);
          if (eventData && typeof eventData === 'object' && Object.keys(eventData).length > 0) {
            events.push(eventData);
          }
        } catch (err) {
          console.warn(`Failed to get event data for key: ${eventKey}`, err);
        }
      }

      // Sort events safely
      const sortedEvents = events.sort((a, b) => {
        try {
          let timestampA = 0;
          let timestampB = 0;
          
          if (a && a.timestamp) {
            const dateA = new Date(a.timestamp.toString());
            timestampA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
          }
          
          if (b && b.timestamp) {
            const dateB = new Date(b.timestamp.toString());
            timestampB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();
          }
          
          return timestampB - timestampA;
        } catch (err) {
          console.warn('Error sorting events by timestamp:', err);
          return 0;
        }
      });

      return NextResponse.json({
        summary: trackingData || {},
        events: sortedEvents,
      });
    } else {
      // Get overview analytics
      const proposalKeys = await redis.keys('tracking:proposal:*');
      const questionnaireKeys = await redis.keys('tracking:questionnaire:*');
      
      const proposalAnalytics = [];
      const questionnaireAnalytics = [];

      // Get proposal tracking data
      for (const key of proposalKeys) {
        if (!key.includes(':open:') && !key.includes(':scroll:')) { // Skip event-specific keys
          try {
            const data = await redis.hgetall(key);
            const id = key.replace('tracking:proposal:', '');
            if (data && typeof data === 'object' && Object.keys(data).length > 0) {
              proposalAnalytics.push({ 
                id, 
                ...data,
                open_count: data.open_count || '0',
                latest_timestamp: data.latest_timestamp || null
              });
            }
          } catch (err) {
            console.warn(`Failed to get proposal data for key: ${key}`, err);
          }
        }
      }

      // Get questionnaire tracking data  
      for (const key of questionnaireKeys) {
        if (!key.includes(':open:') && !key.includes(':scroll:')) { // Skip event-specific keys
          try {
            const data = await redis.hgetall(key);
            const id = key.replace('tracking:questionnaire:', '');
            if (data && typeof data === 'object' && Object.keys(data).length > 0) {
              questionnaireAnalytics.push({ 
                id, 
                ...data,
                open_count: data.open_count || '0',
                latest_timestamp: data.latest_timestamp || null
              });
            }
          } catch (err) {
            console.warn(`Failed to get questionnaire data for key: ${key}`, err);
          }
        }
      }

      // Calculate totals safely
      let totalProposalViews = 0;
      let totalQuestionnaireViews = 0;

      for (const p of proposalAnalytics) {
        try {
          const count = p.open_count ? parseInt(p.open_count.toString()) : 0;
          if (!isNaN(count)) {
            totalProposalViews += count;
          }
        } catch (err) {
          console.warn('Error parsing proposal open_count:', p.open_count);
        }
      }

      for (const q of questionnaireAnalytics) {
        try {
          const count = q.open_count ? parseInt(q.open_count.toString()) : 0;
          if (!isNaN(count)) {
            totalQuestionnaireViews += count;
          }
        } catch (err) {
          console.warn('Error parsing questionnaire open_count:', q.open_count);
        }
      }

      return NextResponse.json({
        proposals: proposalAnalytics,
        questionnaires: questionnaireAnalytics,
        totals: {
          proposalsTracked: proposalAnalytics.length,
          questionnairesTracked: questionnaireAnalytics.length,
          totalViews: totalProposalViews + totalQuestionnaireViews,
        },
      });
    }
  } catch (error) {
    console.error('❌ Analytics API error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch analytics',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}