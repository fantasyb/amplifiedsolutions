'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QuestionnaireTemplate, Question } from '@/types/questionnaire';
import { getQuestionnaireTemplate } from '@/data/questionnaire-templates';
import TemplateEditor from '@/components/admin/TemplateEditor';

export default function EditTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState<QuestionnaireTemplate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const templateData = getQuestionnaireTemplate(params.id as string);
    setTemplate(templateData);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Template Not Found</h1>
          <p className="text-slate-600">The template you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-slate-900">Edit Template</h1>
          <p className="text-slate-600 mt-2">Modify your questionnaire template</p>
        </div>

        <TemplateEditor template={template} />
      </div>
    </div>
  );
}