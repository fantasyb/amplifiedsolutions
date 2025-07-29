// src/components/admin/QuestionnaireForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllTemplates } from '@/data/questionnaire-templates';
import { QuestionnaireClient } from '@/types/questionnaire';

export default function QuestionnaireForm() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [client, setClient] = useState<QuestionnaireClient>({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [createdQuestionnaire, setCreatedQuestionnaire] = useState<any>(null);

  const templates = getAllTemplates();

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (client.name && client.email) {
      setStep(2);
    }
  };

  const handleSendQuestionnaire = async () => {
    if (!selectedTemplate) return;

    setLoading(true);
    try {
      const response = await fetch('/api/questionnaires', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          client: client
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setCreatedQuestionnaire(result);
        setStep(3); // Go to success step instead of redirecting
      } else {
        console.error('Failed to create questionnaire');
        alert('Failed to create questionnaire. Please try again.');
      }
    } catch (error) {
      console.error('Error creating questionnaire:', error);
      alert('Error creating questionnaire. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyUrlToClipboard = async () => {
    if (!createdQuestionnaire) return;
    
    const url = `${window.location.origin}/questionnaire/${createdQuestionnaire.questionnaireId}`;
    try {
      await navigator.clipboard.writeText(url);
      alert('Questionnaire URL copied to clipboard!');
    } catch (err) {
      prompt('Copy this URL to send to your client:', url);
    }
  };

  // Success step - show after questionnaire is created
  if (step === 3 && createdQuestionnaire) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questionnaire Created Successfully!</h2>
          <p className="text-gray-600 mb-6">
            The questionnaire for <strong>{client.name}</strong> has been created. 
            Since email is not set up yet, you'll need to manually share the URL with your client.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Client Questionnaire URL:</p>
            <code className="text-sm bg-white px-3 py-2 rounded border block">
              {window.location.origin}/questionnaire/{createdQuestionnaire.questionnaireId}
            </code>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={copyUrlToClipboard}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Copy URL to Clipboard
            </button>
            
            <a
              href={`/questionnaire/${createdQuestionnaire.questionnaireId}`}
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
            >
              Preview Questionnaire
            </a>
            
            <button
              onClick={() => router.push('/admin/questionnaires')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Questionnaires
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Next Steps:</h3>
            <ul className="text-sm text-blue-800 text-left space-y-1">
              <li>• Copy the URL above and send it to {client.name} via email</li>
              <li>• The questionnaire will expire in 30 days</li>
              <li>• You'll be able to view responses once the client completes it</li>
              <li>• Consider setting up email automation for future questionnaires</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <span className="ml-2 font-medium">Client Info</span>
          </div>
          <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <span className="ml-2 font-medium">Select Template</span>
          </div>
          <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-green-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
            <span className="ml-2 font-medium">Share with Client</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-8">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Client Information</h2>
            <form onSubmit={handleClientSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={client.name}
                    onChange={(e) => setClient(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter client's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={client.email}
                    onChange={(e) => setClient(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="client@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={client.company}
                    onChange={(e) => setClient(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Client's company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={client.phone}
                    onChange={(e) => setClient(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Continue to Template Selection
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Select Questionnaire Template</h2>
              <button
                onClick={() => setStep(1)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Edit Client Info
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          checked={selectedTemplate === template.id}
                          onChange={() => setSelectedTemplate(template.id)}
                          className="mr-3 text-blue-600 focus:ring-blue-500"
                        />
                        <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                      </div>
                      <p className="text-gray-600 mt-2 ml-6">{template.description}</p>
                      <div className="mt-3 ml-6">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {template.questions.length} questions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedTemplate && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Preview: Questions in this template</h3>
                <div className="space-y-2">
                  {templates.find(t => t.id === selectedTemplate)?.questions.slice(0, 5).map((question, index) => (
                    <div key={question.id} className="flex items-center text-sm">
                      <span className="text-gray-500 mr-2">{index + 1}.</span>
                      <span className="text-gray-700">{question.title}</span>
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </div>
                  ))}
                  {templates.find(t => t.id === selectedTemplate)?.questions.length! > 5 && (
                    <div className="text-sm text-gray-500 ml-4">
                      ... and {templates.find(t => t.id === selectedTemplate)?.questions.length! - 5} more questions
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSendQuestionnaire}
                disabled={!selectedTemplate || loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Questionnaire'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}