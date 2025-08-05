// src/app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server';

const FUB_API_KEY = process.env.FUB_API_KEY!;
const FUB_API_URL = 'https://api.followupboss.com/v1/events';

export async function POST(request: NextRequest) {
  try {
    console.log('=== FUB Newsletter API Called ===');
    
    if (!FUB_API_KEY) {
      console.error('FUB_API_KEY environment variable is missing!');
      return NextResponse.json(
        { error: 'Server configuration error - missing API key' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Received newsletter signup data:', body);
    
    const { firstName, lastName, email } = body;

    if (!firstName || !email) {
      console.error('Missing required fields:', { firstName, email });
      return NextResponse.json(
        { error: 'First name and email are required' },
        { status: 400 }
      );
    }

    // Build newsletter signup message
    const signupMessage = `Newsletter subscription from Amplified Solutions website`;
    const signupDescription = `Newsletter signup from amplifiedsolutions.com/newsletter`;

    // Use proper FUB event structure for newsletter signup
    const fubPayload = {
      source: 'Website Newsletter',
      type: 'Newsletter Signup',
      message: signupMessage,
      description: signupDescription,
      person: {
        firstName: firstName.trim(),
        lastName: lastName ? lastName.trim() : '',
        emails: [{ value: email.toLowerCase().trim(), type: 'work' }],
        tags: ['AS email list'], // This is the key part - adds the tag
        assignments: [{
          user: null,
          stage: 'Newsletter Subscriber'
        }]
      }
    };

    console.log('Sending newsletter payload to FUB:', JSON.stringify(fubPayload, null, 2));

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
          error: 'Failed to add subscriber to Follow Up Boss',
          details: `FUB API returned ${response.status}: ${errorText}`
        },
        { status: 500 }
      );
    }

    const result = await response.json();
    console.log('Successfully added newsletter subscriber to FUB:', result);

    return NextResponse.json({ 
      success: true, 
      subscriberId: result.id || 'unknown',
      message: 'Successfully subscribed to newsletter' 
    });
    
  } catch (error) {
    console.error('Newsletter API Route Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}