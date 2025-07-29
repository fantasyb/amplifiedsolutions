// src/components/admin/TemplateList.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QuestionnaireTemplate } from '@/types/questionnaire';
import { FileText, Edit3, Trash2, Copy, Users, Lock, Plus } from 'lucide-react';

interface TemplateWithMetadata extends QuestionnaireTemplate {
  isBuiltIn?: boolean;
}

export default function TemplateList() {
  const [templates, setTemplates] = useState<TemplateWithMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const duplicateTemplate = async (template: TemplateWithMetadata) => {
    const duplicatedTemplate = {
      ...template,
      id: `${template.id}-copy-${Date.now()}`,
      name: `${template.name} (Copy)`,
      isBuiltIn: false
    };

    // Remove the isBuiltIn property from the template before sending
    const { isBuiltIn, ...templateData } = duplicatedTemplate;

    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateData),
      });

      if (response.ok) {
        fetchTemplates(); // Refresh list
        alert('Template duplicated successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to duplicate template');
      }
    } catch (error) {
      console.error('Error duplicating template:', error);
      alert('Failed to duplicate template');
    }
  };

  const deleteTemplate = async (templateId: string, isBuiltIn?: boolean) => {
    if (isBuiltIn) {
      alert('Cannot delete built-in templates');
      return;
    }

    if (!confirm('Are you sure you want to delete this template? This cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/templates?id=${templateId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTemplates(prev => prev.filter(t => t.id !== templateId));
        alert('Template deleted successfully!');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete template');
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      alert('Failed to delete template');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {templates.map((template) => (
        <div
          key={template.id}
          className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  template.isBuiltIn ? 'bg-orange-100' : 'bg-blue-100'
                }`}>
                  {template.isBuiltIn ? (
                    <Lock className={`w-5 h-5 ${template.isBuiltIn ? 'text-orange-600' : 'text-blue-600'}`} />
                  ) : (
                    <FileText className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-slate-900">{template.name}</h3>
                    {template.isBuiltIn && (
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                        Built-in
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">ID: {template.id}</p>
                </div>
              </div>
              <p className="text-slate-600 mb-3">{template.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {template.questions.length} questions
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {template.questions.filter(q => q.required).length} required
                </div>
              </div>
            </div>
          </div>

          {/* Question Preview */}
          <div className="bg-slate-50 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-slate-900 mb-3">Questions Preview:</h4>
            <div className="space-y-2">
              {template.questions.slice(0, 3).map((question, index) => (
                <div key={question.id} className="flex items-center text-sm">
                  <span className="text-slate-500 mr-2 w-6">{index + 1}.</span>
                  <span className="text-slate-700 flex-1">{question.title}</span>
                  <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded">
                    {question.type}
                  </span>
                  {question.required && (
                    <span className="text-red-500 ml-2 text-xs">Required</span>
                  )}
                </div>
              ))}
              {template.questions.length > 3 && (
                <div className="text-sm text-slate-500 ml-8">
                  ... and {template.questions.length - 3} more questions
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">
              {template.isBuiltIn ? 'System template' : 'Custom template'}
            </div>
            
            <div className="flex items-center gap-3">
              {!template.isBuiltIn && (
                <Link
                  href={`/admin/templates/${template.id}/edit`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </Link>
              )}
              
              <button
                onClick={() => duplicateTemplate(template)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Copy className="w-4 h-4" />
                Duplicate
              </button>
              
              <button
                onClick={() => deleteTemplate(template.id, template.isBuiltIn)}
                disabled={template.isBuiltIn}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {templates.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No templates yet</h3>
          <p className="text-slate-600 mb-6">Create your first form template to get started</p>
          <Link
            href="/admin/templates/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create First Template
          </Link>
        </div>
      )}
    </div>
  );
}