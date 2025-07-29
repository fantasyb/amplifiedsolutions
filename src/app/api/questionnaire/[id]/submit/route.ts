// src/app/api/questionnaire/[id]/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { QuestionnaireResponse } from '@/types/questionnaire';
import { redis } from '@/lib/redis';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(`🚀 API: Submitting questionnaire ${params.id}`);
  
  try {
    const body = await request.json();
    const { responses }: { responses: QuestionnaireResponse[] } = body;

    console.log(`📋 API: Processing ${responses.length} responses for questionnaire ${params.id}`);

    const questionnaire = await redis.get(`questionnaire:${params.id}`);
    
    if (!questionnaire) {
      console.log(`❌ API: Questionnaire not found: ${params.id}`);
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 });
    }

    const questionnaireData = questionnaire as any;

    // Check if expired
    if (questionnaireData.expiresAt && new Date() > new Date(questionnaireData.expiresAt)) {
      console.log(`❌ API: Questionnaire expired: ${params.id}`);
      return NextResponse.json({ error: 'Questionnaire has expired' }, { status: 410 });
    }

    // Update questionnaire with responses
    const updatedQuestionnaire = {
      ...questionnaireData,
      status: 'completed',
      completedAt: new Date(),
      responses
    };

    await redis.set(`questionnaire:${params.id}`, updatedQuestionnaire);

    console.log(`🎉 API: Questionnaire ${params.id} completed by ${questionnaireData.client.name}`);

    // TODO: Send notification to admin about completion
    // await sendCompletionNotification(updatedQuestionnaire);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ API: Error submitting questionnaire:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}