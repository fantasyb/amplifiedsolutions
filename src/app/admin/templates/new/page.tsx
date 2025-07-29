'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionnaireTemplate, Question } from '@/types/questionnaire';
import TemplateEditor from '@/components/admin/TemplateEditor';

export default function NewTemplatePage() {
  const router = useRouter();
  
  // Create a blank template
  const blankTemplate: QuestionnaireTemplate = {
    id: '',
    name: 'New Template',
    description: 'A new questionnaire template',
    questions: [
      {
        id: 'question-1',
        type: 'text',
        title: 'Sample Question',
        description: 'This is a sample question - you can edit or delete it',
        required: true
      }
    ]
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800 font-medium mb-4"
          >
            ← Back to Templates
          </button>
          <h1 className="text-3xl font-bold text-slate-900">Create New Template</h1>
          <p className="text-slate-600 mt-2">Build a custom questionnaire template</p>
        </div>

        <TemplateEditor template={blankTemplate} isNew={true} />
      </div>
    </div>
  );
}
