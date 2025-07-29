// src/components/admin/TemplateEditor.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionnaireTemplate, Question } from '@/types/questionnaire';
import { Plus, Trash2, GripVertical, Save, Copy } from 'lucide-react';

interface TemplateEditorProps {
  template: QuestionnaireTemplate;
  isNew?: boolean;
}

export default function TemplateEditor({ template, isNew = false }: TemplateEditorProps) {
  const router = useRouter();
  const [editedTemplate, setEditedTemplate] = useState<QuestionnaireTemplate>(template);
  const [saving, setSaving] = useState(false);

  const updateTemplateInfo = (field: keyof QuestionnaireTemplate, value: string) => {
    setEditedTemplate(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      type: 'text',
      title: 'New Question',
      description: '',
      required: false
    };

    setEditedTemplate(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    setEditedTemplate(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const deleteQuestion = (index: number) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    
    setEditedTemplate(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const duplicateQuestion = (index: number) => {
    const questionToDuplicate = editedTemplate.questions[index];
    const duplicatedQuestion: Question = {
      ...questionToDuplicate,
      id: `question-${Date.now()}`,
      title: `${questionToDuplicate.title} (Copy)`
    };

    setEditedTemplate(prev => ({
      ...prev,
      questions: [
        ...prev.questions.slice(0, index + 1),
        duplicatedQuestion,
        ...prev.questions.slice(index + 1)
      ]
    }));
  };

  const moveQuestion = (fromIndex: number, toIndex: number) => {
    setEditedTemplate(prev => {
      const questions = [...prev.questions];
      const [movedQuestion] = questions.splice(fromIndex, 1);
      questions.splice(toIndex, 0, movedQuestion);
      return { ...prev, questions };
    });
  };

  const handleSave = async () => {
    // Validation
    if (!editedTemplate.name.trim()) {
      alert('Please enter a template name');
      return;
    }
    
    if (!editedTemplate.id.trim()) {
      alert('Please enter a template ID');
      return;
    }

    if (editedTemplate.questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/templates', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedTemplate),
      });

      if (response.ok) {
        alert(`Template ${isNew ? 'created' : 'saved'} successfully!`);
        router.push('/admin/templates');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save template');
      }
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template');
    } finally {
      setSaving(false);
    }
  };

  const addQuestionOptions = (questionIndex: number) => {
    const question = editedTemplate.questions[questionIndex];
    const newOptions = [
      { id: 'option-1', text: 'Option 1' },
      { id: 'option-2', text: 'Option 2' }
    ];
    
    updateQuestion(questionIndex, 'options', newOptions);
  };

  const updateQuestionOption = (questionIndex: number, optionIndex: number, field: string, value: string) => {
    const question = editedTemplate.questions[questionIndex];
    const updatedOptions = question.options?.map((opt, i) => 
      i === optionIndex ? { ...opt, [field]: value } : opt
    ) || [];
    
    updateQuestion(questionIndex, 'options', updatedOptions);
  };

  const addQuestionOption = (questionIndex: number) => {
    const question = editedTemplate.questions[questionIndex];
    const newOption = { 
      id: `option-${Date.now()}`, 
      text: `Option ${(question.options?.length || 0) + 1}` 
    };
    
    updateQuestion(questionIndex, 'options', [...(question.options || []), newOption]);
  };

  const deleteQuestionOption = (questionIndex: number, optionIndex: number) => {
    const question = editedTemplate.questions[questionIndex];
    const updatedOptions = question.options?.filter((_, i) => i !== optionIndex) || [];
    updateQuestion(questionIndex, 'options', updatedOptions);
  };

  return (
    <div className="space-y-8">
      {/* Template Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-semibold mb-6">Template Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Template Name *
            </label>
            <input
              type="text"
              value={editedTemplate.name}
              onChange={(e) => updateTemplateInfo('name', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Client Onboarding Form"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Template ID * <span className="text-xs text-slate-500">(lowercase, no spaces)</span>
            </label>
            <input
              type="text"
              value={editedTemplate.id}
              onChange={(e) => updateTemplateInfo('id', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., client-onboarding"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>
          <textarea
            value={editedTemplate.description}
            onChange={(e) => updateTemplateInfo('description', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe what this template is used for..."
          />
        </div>
      </div>

      {/* Questions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Questions ({editedTemplate.questions.length})</h2>
          <button
            onClick={addQuestion}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </div>

        <div className="space-y-6">
          {editedTemplate.questions.map((question, index) => (
            <div key={question.id} className="border border-slate-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-2 text-slate-400 pt-2">
                  <GripVertical className="w-4 h-4 cursor-move" />
                  <span className="text-sm font-medium">{index + 1}</span>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Question Title *
                      </label>
                      <input
                        type="text"
                        value={question.title}
                        onChange={(e) => updateQuestion(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your question..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Question Type
                      </label>
                      <select
                        value={question.type}
                        onChange={(e) => updateQuestion(index, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="text">Text Input</option>
                        <option value="email">Email Input</option>
                        <option value="textarea">Long Text (Textarea)</option>
                        <option value="radio">Multiple Choice (Radio)</option>
                        <option value="checkbox">Checkboxes</option>
                        <option value="select">Dropdown Select</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={question.description || ''}
                      onChange={(e) => updateQuestion(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Additional context or instructions for this question..."
                    />
                  </div>

                  {/* Options for radio, checkbox, select */}
                  {(question.type === 'radio' || question.type === 'checkbox' || question.type === 'select') && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-slate-700">
                          Answer Options
                        </label>
                        <button
                          onClick={() => addQuestionOption(index)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          + Add Option
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        {question.options?.map((option, optionIndex) => (
                          <div key={option.id} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={option.text}
                              onChange={(e) => updateQuestionOption(index, optionIndex, 'text', e.target.value)}
                              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                            <button
                              onClick={() => deleteQuestionOption(index, optionIndex)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )) || (
                          <button
                            onClick={() => addQuestionOptions(index)}
                            className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-slate-400 hover:text-slate-600"
                          >
                            Click to add answer options
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Placeholder for text inputs */}
                  {(question.type === 'text' || question.type === 'email' || question.type === 'textarea') && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Placeholder Text (Optional)
                      </label>
                      <input
                        type="text"
                        value={question.placeholder || ''}
                        onChange={(e) => updateQuestion(index, 'placeholder', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Hint text that appears in the input field..."
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={question.required || false}
                        onChange={(e) => updateQuestion(index, 'required', e.target.checked)}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      Required Question
                    </label>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => duplicateQuestion(index)}
                    className="text-green-600 hover:text-green-800 p-2"
                    title="Duplicate Question"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteQuestion(index)}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Delete Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {editedTemplate.questions.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-slate-300 rounded-lg">
            <p className="text-slate-500 mb-4">No questions yet</p>
            <button
              onClick={addQuestion}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Your First Question
            </button>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => router.push('/admin/templates')}
          className="px-6 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {isNew ? 'Creating...' : 'Saving...'}
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {isNew ? 'Create Template' : 'Save Template'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}