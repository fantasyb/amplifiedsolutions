// src/app/api/questionnaire/[id]/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { QuestionnaireResponse } from '@/types/questionnaire';
import { redis } from '@/lib/redis';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    console.log(`🚀 API: Submitting questionnaire ${id}`);
    
    const body = await request.json();
    const { responses }: { responses: QuestionnaireResponse[] } = body;

    console.log(`📋 API: Processing ${responses.length} responses for questionnaire ${id}`);

    const questionnaire = await redis.get(`questionnaire:${id}`);
    
    if (!questionnaire) {
      console.log(`❌ API: Questionnaire not found: ${id}`);
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 });
    }

    const questionnaireData = questionnaire as any;

    // Check if expired
    if (questionnaireData.expiresAt && new Date() > new Date(questionnaireData.expiresAt)) {
      console.log(`❌ API: Questionnaire expired: ${id}`);
      return NextResponse.json({ error: 'Questionnaire has expired' }, { status: 410 });
    }

    // Update questionnaire with responses
    const updatedQuestionnaire = {
      ...questionnaireData,
      status: 'completed',
      completedAt: new Date(),
      responses
    };

    await redis.set(`questionnaire:${id}`, updatedQuestionnaire);

    console.log(`🎉 API: Questionnaire ${id} completed by ${questionnaireData.client.name}`);

    // TODO: Send notification to admin about completion
    // await sendCompletionNotification(updatedQuestionnaire);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ API: Error submitting questionnaire:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}