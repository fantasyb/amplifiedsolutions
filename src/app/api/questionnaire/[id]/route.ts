// src/app/api/questionnaire/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    console.log(`📋 API: Fetching questionnaire ${id}`);
    
    const questionnaire = await redis.get(`questionnaire:${id}`);
    
    if (!questionnaire) {
      console.log(`❌ API: Questionnaire not found: ${id}`);
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 });
    }

    const questionnaireData = questionnaire as any;

    // Check if expired
    if (questionnaireData.expiresAt && new Date() > new Date(questionnaireData.expiresAt)) {
      questionnaireData.status = 'expired';
      await redis.set(`questionnaire:${id}`, questionnaireData);
    }

    console.log(`✅ API: Returning questionnaire ${id} for ${questionnaireData.client.name}`);
    return NextResponse.json(questionnaireData);
  } catch (error) {
    console.error('❌ API: Error fetching questionnaire:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}