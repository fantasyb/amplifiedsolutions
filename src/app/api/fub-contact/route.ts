import { NextRequest, NextResponse } from 'next/server';

const FUB_API_KEY = process.env.FUB_API_KEY!;
const FUB_API_URL = 'https://api.followupboss.com/v1/events';

export async function POST(request: NextRequest) {
  try {
    console.log('=== FUB Contact Page API Called ===');
    
    if (!FUB_API_KEY) {
      console.error('FUB_API_KEY environment variable is missing!');
      return NextResponse.json(
        { error: 'Server configuration error - missing API key' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Received contact form data:', body);
    
    const { firstName, lastName, email, company, phone, interestedIn, message } = body;

    if (!firstName || !lastName || !email || !company || !interestedIn) {
      console.error('Missing required fields:', { firstName, lastName, email, company, interestedIn });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine event type based on interest
    let eventType = 'General Inquiry';
    let leadStage = 'New Lead';
    
    if (interestedIn === 'Becoming a Client') {
      eventType = 'General Inquiry';
      leadStage = 'Hot Lead';
    } else if (interestedIn === 'Partnership Opportunities') {
      eventType = 'General Inquiry';
      leadStage = 'New Lead';
    }

    // Build comprehensive message and description
    let inquiryMessage = `${interestedIn}`;
    if (company) inquiryMessage += ` - Company: ${company}`;
    if (message && message.trim()) inquiryMessage += ` - Message: ${message}`;

    let inquiryDescription = `Contact form submission from website`;
    inquiryDescription += `\nCompany: ${company}`;
    inquiryDescription += `\nInterested In: ${interestedIn}`;
    if (message && message.trim()) {
      inquiryDescription += `\nMessage: ${message}`;
    }

    // Use proper FUB event structure
    const fubPayload = {
      source: 'Website Contact Page',
      type: eventType,
      message: inquiryMessage,
      description: inquiryDescription,
      person: {
        firstName,
        lastName,
        emails: [{ value: email, type: 'work' }],
        ...(phone && { phones: [{ value: phone, type: 'work' }] }),
        assignments: [{
          user: null,
          stage: leadStage
        }]
      }
    };

    console.log('Sending contact page payload to FUB:', JSON.stringify(fubPayload, null, 2));

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
    console.log('Successfully created FUB lead from contact page:', result);

    return NextResponse.json({ 
      success: true, 
      leadId: result.id || 'unknown',
      message: 'Lead created successfully from contact page' 
    });
    
  } catch (error) {
    console.error('Contact Page API Route Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}