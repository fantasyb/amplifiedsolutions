// src/app/api/templates/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { QuestionnaireTemplate } from '@/types/questionnaire';
import { getAllTemplates } from '@/data/questionnaire-templates';

export async function GET() {
  try {
    // Get custom templates from database
    const customTemplateIds = await redis.smembers('template:ids');
    const customTemplates = await Promise.all(
      customTemplateIds.map(async (id) => {
        const template = await redis.get(`template:${id}`);
        return template;
      })
    );

    // Get built-in templates from static file
    const builtInTemplates = getAllTemplates();

    // Combine both
    const allTemplates = [
      ...builtInTemplates.map(t => ({ ...t, isBuiltIn: true })),
      ...customTemplates.filter(Boolean).map((t: any) => ({ ...t, isBuiltIn: false }))
    ];

    return NextResponse.json(allTemplates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const template: QuestionnaireTemplate = await request.json();
    
    // Validate template
    if (!template.id || !template.name || !template.questions.length) {
      return NextResponse.json({ error: 'Invalid template data' }, { status: 400 });
    }

    // Save to Redis
    await redis.set(`template:${template.id}`, template);
    await redis.sadd('template:ids', template.id);

    console.log(`✅ Created template ${template.id}: ${template.name}`);
    
    return NextResponse.json({ success: true, template }, { status: 201 });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const template: QuestionnaireTemplate = await request.json();
    
    // Check if it's a built-in template (can't edit those)
    const builtInTemplates = getAllTemplates();
    const isBuiltIn = builtInTemplates.some(t => t.id === template.id);
    
    if (isBuiltIn) {
      return NextResponse.json({ error: 'Cannot edit built-in templates' }, { status: 400 });
    }

    // Update in Redis
    await redis.set(`template:${template.id}`, template);
    
    console.log(`✅ Updated template ${template.id}: ${template.name}`);
    
    return NextResponse.json({ success: true, template });
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json({ error: 'Failed to update template' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const templateId = searchParams.get('id');
    
    if (!templateId) {
      return NextResponse.json({ error: 'Template ID required' }, { status: 400 });
    }

    // Check if it's a built-in template (can't delete those)
    const builtInTemplates = getAllTemplates();
    const isBuiltIn = builtInTemplates.some(t => t.id === templateId);
    
    if (isBuiltIn) {
      return NextResponse.json({ error: 'Cannot delete built-in templates' }, { status: 400 });
    }

    // Delete from Redis
    await redis.del(`template:${templateId}`);
    await redis.srem('template:ids', templateId);
    
    console.log(`🗑️ Deleted template ${templateId}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json({ error: 'Failed to delete template' }, { status: 500 });
  }
}