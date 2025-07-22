import { NextRequest, NextResponse } from 'next/server';

const FUB_API_KEY = process.env.FUB_API_KEY!;
const CALENDLY_WEBHOOK_SECRET = process.env.CALENDLY_WEBHOOK_SECRET!;
const FUB_API_URL = 'https://api.followupboss.com/v1/events';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Calendly webhook payload structure
    const { event, payload } = body;
    
    // Log the webhook for debugging
    console.log('Calendly webhook received:', { event, payload });
    
    if (event === 'invitee.created') {
      const invitee = payload.invitee;
      const eventType = payload.event_type;
      
      // Extract name and split into first/last
      const fullName = invitee.name || '';
      const [firstName, ...lastNameParts] = fullName.split(' ');
      const lastName = lastNameParts.join(' ') || '';
      
      // Get email from invitee
      const email = invitee.email;
      
      // Try to get phone from questions_and_answers if available
      let phone = '';
      if (invitee.questions_and_answers) {
        const phoneQuestion = invitee.questions_and_answers.find(
          (qa: any) => qa.question.toLowerCase().includes('phone')
        );
        if (phoneQuestion) {
          phone = phoneQuestion.answer;
        }
      }

      const fubPayload = {
        type: 'Lead',
        source: 'Calendly Appointment',
        person: {
          firstName,
          lastName,
          emails: [{ value: email, type: 'work' }],
          ...(phone && { phones: [{ value: phone, type: 'work' }] }),
          assignments: [{
            user: null,
            stage: 'Appointment Scheduled'
          }]
        },
        note: `Source: Calendly Appointment Scheduled\nEvent Type: ${eventType?.name || 'Strategy Call'}\nScheduled Time: ${payload.event?.start_time || 'Unknown'}`,
      };

      console.log('Sending to FUB:', fubPayload);

      const response = await fetch(FUB_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${FUB_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fubPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('FUB API Error:', response.status, errorText);
        throw new Error(`FUB API error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Successfully created FUB lead from Calendly:', result);
    }

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Calendly Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}