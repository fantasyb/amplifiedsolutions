import { NextRequest, NextResponse } from 'next/server';

const FUB_API_KEY = process.env.FUB_API_KEY!;
const FUB_API_URL = 'https://api.followupboss.com/v1/events';

export async function POST(request: NextRequest) {
  try {
    console.log('=== FUB Modal Webhook API Called ===');
    
    if (!FUB_API_KEY) {
      console.error('FUB_API_KEY environment variable is missing!');
      return NextResponse.json(
        { error: 'Server configuration error - missing API key' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Received modal form data:', body);
    
    const { firstName, lastName, email, company, phone } = body;

    if (!firstName || !lastName || !email) {
      console.error('Missing required fields:', { firstName, lastName, email });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Use proper FUB event structure
    const fubPayload = {
      source: 'Website Contact Modal',
      type: 'General Inquiry',  // Changed from 'Lead' to proper event type
      message: company ? `Company: ${company}` : 'Lead inquiry from website modal',
      description: `Lead submitted contact form through website modal${company ? ` for company: ${company}` : ''}`,
      person: {
        firstName,
        lastName,
        emails: [{ value: email, type: 'work' }],
        ...(phone && { phones: [{ value: phone, type: 'work' }] }),
        assignments: [{
          user: null,
          stage: 'New Lead'
        }]
      }
    };

    console.log('Sending modal payload to FUB:', JSON.stringify(fubPayload, null, 2));

    // Create Basic Auth header
    const credentials = Buffer.from(`${FUB_API_KEY}:`).toString('base64');

    const response = await fetch(FUB_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fubPayload),
    });

    console.log('FUB Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FUB API Error Response:', errorText);
      console.error('FUB API Error Status:', response.status);
      
      return NextResponse.json(
        { 
          error: 'Failed to create lead in Follow Up Boss',
          details: `FUB API returned ${response.status}: ${errorText}`
        },
        { status: 500 }
      );
    }

    const result = await response.json();
    console.log('Successfully created FUB lead from modal:', result);

    return NextResponse.json({ 
      success: true, 
      leadId: result.id || 'unknown',
      message: 'Lead created successfully from modal' 
    });
    
  } catch (error) {
    console.error('Modal API Route Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
