// src/app/api/questionnaires/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { QuestionnaireClient, Questionnaire } from '@/types/questionnaire';
import { getQuestionnaireTemplate } from '@/data/questionnaire-templates';
import { redis } from '@/lib/redis';
import { nanoid } from 'nanoid';

export async function GET() {
  try {
    console.log('📋 API: Fetching all questionnaires');
    
    // Get all questionnaire IDs
    const questionnaireIds = await redis.smembers('questionnaire:ids');
    
    if (!questionnaireIds.length) {
      console.log('✅ API: No questionnaires found');
      return NextResponse.json([]);
    }

    // Get all questionnaires
    const questionnaires = await Promise.all(
      questionnaireIds.map(async (id) => {
        const questionnaire = await redis.get(`questionnaire:${id}`);
        return questionnaire;
      })
    );

    // Filter out any null results and sort by creation date
    const validQuestionnaires = questionnaires
      .filter(Boolean)
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    console.log(`✅ API: Returning ${validQuestionnaires.length} questionnaires`);
    return NextResponse.json(validQuestionnaires);
  } catch (error) {
    console.error('❌ API: Error fetching questionnaires:', error);
    return NextResponse.json({ error: 'Failed to fetch questionnaires' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  console.log('🚀 API: Starting questionnaire creation...');
  
  try {
    const data = await request.json();
    const { templateId, client }: { templateId: string; client: QuestionnaireClient } = data;
    
    console.log('📋 API: Received data for client:', client.name);

    const template = getQuestionnaireTemplate(templateId);
    if (!template) {
      console.log('❌ API: Template not found:', templateId);
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    console.log('🛠️ API: Using template:', template.name);

    // Generate unique ID
    const questionnaireId = generateQuestionnaireId(client.name);
    console.log('🆔 API: Generated questionnaire ID:', questionnaireId);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

    const questionnaire: Questionnaire = {
      id: questionnaireId,
      templateId,
      client,
      title: template.name,
      status: 'sent',
      createdAt: now,
      sentAt: now,
      expiresAt,
      responses: [],
      notes: data.notes
    };

    console.log('💾 API: About to save questionnaire with ID:', questionnaireId);

    // Save to Redis
    await redis.set(`questionnaire:${questionnaireId}`, questionnaire);
    await redis.sadd('questionnaire:ids', questionnaireId);

    console.log('🎉 API: Questionnaire created successfully with ID:', questionnaire.id);

    // TODO: Send email notification to client
    // await sendQuestionnaireEmail(client.email, questionnaire.id, template.name);

    return NextResponse.json({ 
      success: true, 
      questionnaireId: questionnaire.id,
      url: `/questionnaire/${questionnaire.id}`
    }, { status: 201 });

  } catch (error) {
    console.error('❌ API: Error creating questionnaire:', error);
    return NextResponse.json({ error: 'Failed to create questionnaire' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const questionnaireId = searchParams.get('id');
    
    if (!questionnaireId) {
      return NextResponse.json({ error: 'Questionnaire ID required' }, { status: 400 });
    }
    
    console.log(`🗑️ API: Deleting questionnaire ${questionnaireId}`);
    
    const deleted = await redis.del(`questionnaire:${questionnaireId}`);
    await redis.srem('questionnaire:ids', questionnaireId);
    
    if (deleted === 0) {
      return NextResponse.json({ error: 'Questionnaire not found' }, { status: 404 });
    }
    
    console.log(`✅ API: Deleted questionnaire ${questionnaireId}`);
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('❌ API: Error deleting questionnaire:', error);
    return NextResponse.json({ error: 'Failed to delete questionnaire' }, { status: 500 });
  }
}

function generateQuestionnaireId(clientName: string): string {
  const nameSlug = clientName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const randomSuffix = nanoid(8);
  return `q-${nameSlug}-${randomSuffix}`;
}