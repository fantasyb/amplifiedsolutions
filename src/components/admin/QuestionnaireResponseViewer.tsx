// src/components/admin/QuestionnaireResponseViewer.tsx
'use client';

import { useState, useEffect } from 'react';
import { Questionnaire, QuestionnaireResponse } from '@/types/questionnaire';
import { getQuestionnaireTemplate } from '@/data/questionnaire-templates';

interface QuestionnaireResponseViewerProps {
  questionnaireId: string;
}

export default function QuestionnaireResponseViewer({ questionnaireId }: QuestionnaireResponseViewerProps) {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestionnaire();
  }, [questionnaireId]);

  const fetchQuestionnaire = async () => {
    try {
      const response = await fetch(`/api/questionnaire/${questionnaireId}`);
      if (response.ok) {
        const data = await response.json();
        setQuestionnaire(data);
      }
    } catch (error) {
      console.error('Error fetching questionnaire:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportResponses = () => {
    if (!questionnaire || !template) return;

    const data = template.questions.map(question => {
      const response = questionnaire.responses?.find(r => r.questionId === question.id);
      const customResponse = questionnaire.responses?.find(r => r.questionId === `${question.id}_custom`);
      
      let answer = response?.answer || 'No response';
      
      if (Array.isArray(answer)) {
        answer = answer.join(', ');
      }
      
      if (customResponse?.answer) {
        answer += ` (Custom: ${customResponse.answer})`;
      }

      return {
        Question: question.title,
        Type: question.type,
        Required: question.required ? 'Yes' : 'No',
        Answer: answer
      };
    });

    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `questionnaire-responses-${questionnaire.client.name.replace(/\s+/g, '-')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="animate-pulse space-y-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-16 bg-gray-200 rounded"></div>
      ))}
    </div>;
  }

  if (!questionnaire) {
    return <div className="text-center text-gray-500">Questionnaire not found</div>;
  }

  const template = getQuestionnaireTemplate(questionnaire.templateId);
  if (!template) {
    return <div className="text-center text-red-500">Template not found</div>;
  }

  const getResponseDisplay = (question: any, response?: QuestionnaireResponse) => {
    if (!response) return <span className="text-gray-400 italic">No response</span>;

    const customResponse = questionnaire.responses?.find(r => 
      r.questionId === `${question.id}_custom` || r.questionId.startsWith(`${question.id}_`) && r.questionId.endsWith('_custom')
    );

    if (question.type === 'checkbox' && Array.isArray(response.answer)) {
      const selectedOptions = question.options?.filter((opt: any) => 
        response.answer.includes(opt.id)
      ).map((opt: any) => opt.text) || [];
      
      let display = selectedOptions.join(', ');
      if (customResponse?.answer) {
        display += ` (Custom: ${customResponse.answer})`;
      }
      return <span className="text-gray-900">{display}</span>;
    }

    if (question.type === 'radio') {
      const selectedOption = question.options?.find((opt: any) => opt.id === response.answer);
      let display = selectedOption?.text || response.answer;
      if (customResponse?.answer) {
        display += ` (Custom: ${customResponse.answer})`;
      }
      return <span className="text-gray-900">{display}</span>;
    }

    return <span className="text-gray-900">{response.answer}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{questionnaire.title}</h2>
          <p className="text-gray-600 mt-1">Completed by {questionnaire.client.name}</p>
          {questionnaire.completedAt && (
            <p className="text-sm text-gray-500 mt-1">
              Submitted on {new Intl.DateTimeFormat('en-US', {
                dateStyle: 'long',
                timeStyle: 'short'
              }).format(new Date(questionnaire.completedAt))}
            </p>
          )}
        </div>
        <button
          onClick={exportResponses}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Export CSV
        </button>
      </div>

      {/* Client Info */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Client Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-600">Name:</span>
            <p className="text-gray-900">{questionnaire.client.name}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">Email:</span>
            <p className="text-gray-900">{questionnaire.client.email}</p>
          </div>
          {questionnaire.client.company && (
            <div>
              <span className="text-sm font-medium text-gray-600">Company:</span>
              <p className="text-gray-900">{questionnaire.client.company}</p>
            </div>
          )}
          {questionnaire.client.phone && (
            <div>
              <span className="text-sm font-medium text-gray-600">Phone:</span>
              <p className="text-gray-900">{questionnaire.client.phone}</p>
            </div>
          )}
        </div>
      </div>

      {/* Responses */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Responses</h3>
        
        {template.questions.map((question, i) => {
          const response = questionnaire.responses?.find(r => r.questionId === question.id);
          
          return (
            <div key={question.id} className="bg-white border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {i + 1}. {question.title}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </h4>
                  {question.description && (
                    <p className="text-gray-600 mt-1">{question.description}</p>
                  )}
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  response ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {response ? 'Answered' : 'No Response'}
                </span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-600 mb-2">Response:</div>
                <div className="text-lg">
                  {getResponseDisplay(question, response)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {questionnaire.responses?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Total Responses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(((questionnaire.responses?.length || 0) / template.questions.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {template.questions.filter(q => q.required).length}
            </div>
            <div className="text-sm text-gray-600">Required Questions</div>
          </div>
        </div>
      </div>
    </div>
  );
}