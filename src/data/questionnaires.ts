// src/data/questionnaires.ts
import { redis } from '@/lib/redis';
import { Questionnaire, QuestionnaireClient } from '@/types/questionnaire';

// Get all questionnaires
export async function getQuestionnaires(): Promise<Record<string, Questionnaire>> {
  try {
    const questionnaireIds = await redis.smembers('questionnaire:ids');
    
    if (!questionnaireIds.length) {
      return {};
    }

    const questionnaires = await Promise.all(
      questionnaireIds.map(async (id) => {
        const questionnaire = await redis.get(`questionnaire:${id}`);
        return questionnaire ? { [id]: questionnaire } : null;
      })
    );

    return questionnaires
      .filter(Boolean)
      .reduce((acc, curr) => ({ ...acc, ...curr }), {}) as Record<string, Questionnaire>;
  } catch (error) {
    console.error('Error fetching questionnaires:', error);
    return {};
  }
}

// Get single questionnaire
export async function getQuestionnaire(id: string): Promise<Questionnaire | null> {
  try {
    const questionnaire = await redis.get(`questionnaire:${id}`) as Questionnaire;
    
    if (!questionnaire) {
      return null;
    }

    // Check if expired
    if (questionnaire.expiresAt && new Date() > new Date(questionnaire.expiresAt)) {
      questionnaire.status = 'expired';
      await redis.set(`questionnaire:${id}`, questionnaire);
    }

    return questionnaire;
  } catch (error) {
    console.error('Error fetching questionnaire:', error);
    return null;
  }
}

// Create questionnaire
export async function createQuestionnaire(
  data: {
    templateId: string;
    client: QuestionnaireClient;
    title: string;
    notes?: string;
  },
  customId?: string
): Promise<Questionnaire> {
  try {
    const questionnaireId = customId || generateQuestionnaireId(data.client.name);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

    const questionnaire: Questionnaire = {
      id: questionnaireId,
      templateId: data.templateId,
      client: data.client,
      title: data.title,
      status: 'sent',
      createdAt: now,
      sentAt: now,
      expiresAt,
      responses: [],
      notes: data.notes
    };

    // Save to Redis
    await redis.set(`questionnaire:${questionnaireId}`, questionnaire);
    await redis.sadd('questionnaire:ids', questionnaireId);

    console.log(`✅ Created questionnaire ${questionnaireId} for ${data.client.name}`);
    
    return questionnaire;
  } catch (error) {
    console.error('Error creating questionnaire:', error);
    throw error;
  }
}

// Update questionnaire
export async function updateQuestionnaire(id: string, updates: Partial<Questionnaire>): Promise<Questionnaire | null> {
  try {
    const existing = await getQuestionnaire(id);
    if (!existing) {
      return null;
    }

    const updated = { ...existing, ...updates };
    await redis.set(`questionnaire:${id}`, updated);

    console.log(`✅ Updated questionnaire ${id}`);
    return updated;
  } catch (error) {
    console.error('Error updating questionnaire:', error);
    throw error;
  }
}

// Delete questionnaire
export async function deleteQuestionnaire(id: string): Promise<boolean> {
  try {
    const deleted = await redis.del(`questionnaire:${id}`);
    await redis.srem('questionnaire:ids', id);
    
    console.log(`🗑️ Deleted questionnaire ${id}`);
    return deleted > 0;
  } catch (error) {
    console.error('Error deleting questionnaire:', error);
    return false;
  }
}

function generateQuestionnaireId(clientName: string): string {
  const nameSlug = clientName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${nameSlug}-${randomSuffix}`;
}