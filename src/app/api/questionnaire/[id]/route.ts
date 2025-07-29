// src/app/api/questionnaire/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`📋 API: Fetching questionnaire ${params.id}`);
    
    const questionnaire = await redis.get(`questionnaire:${params.id}`);
    
    if (!questionnaire) {
      console.log(`❌ API: Questionnaire not found: ${params.id}`);
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 });
    }

    const questionnaireData = questionnaire as any;

    // Check if expired
    if (questionnaireData.expiresAt && new Date() > new Date(questionnaireData.expiresAt)) {
      questionnaireData.status = 'expired';
      await redis.set(`questionnaire:${params.id}`, questionnaireData);
    }

    console.log(`✅ API: Returning questionnaire ${params.id} for ${questionnaireData.client.name}`);
    return NextResponse.json(questionnaireData);
  } catch (error) {
    console.error('❌ API: Error fetching questionnaire:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}