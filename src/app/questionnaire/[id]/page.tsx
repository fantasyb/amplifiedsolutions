// src/app/questionnaire/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Questionnaire, Question, QuestionnaireResponse } from '@/types/questionnaire';
import { getQuestionnaireTemplate } from '@/data/questionnaire-templates';
import TrackingPixel from '@/components/TrackingPixel';

export default function ClientQuestionnairePage() {
  const params = useParams();
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchQuestionnaire();
  }, [params.id]);

  const fetchQuestionnaire = async () => {
    try {
      const response = await fetch(`/api/questionnaire/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setQuestionnaire(data);
        
        // Initialize responses with existing data if any
        if (data.responses) {
          const existingResponses: Record<string, string | string[]> = {};
          data.responses.forEach((resp: QuestionnaireResponse) => {
            existingResponses[resp.questionId] = resp.answer;
          });
          setResponses(existingResponses);
        }
      } else if (response.status === 404) {
        // Handle expired or invalid questionnaire
      }
    } catch (error) {
      console.error('Error fetching questionnaire:', error);
    } finally {
      setLoading(false);
    }
  };

  const template = questionnaire ? getQuestionnaireTemplate(questionnaire.templateId) : null;
  const questions = template?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleResponse = (questionId: string, answer: string | string[]) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const isCurrentQuestionAnswered = () => {
    if (!currentQuestion) return false;
    const answer = responses[currentQuestion.id];
    
    if (currentQuestion.required) {
      if (currentQuestion.type === 'checkbox') {
        return Array.isArray(answer) && answer.length > 0;
      }
      return answer && answer.toString().trim() !== '';
    }
    return true; // Optional questions are always "answered"
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const formattedResponses: QuestionnaireResponse[] = Object.entries(responses).map(([questionId, answer]) => ({
        questionId,
        answer
      }));

      const response = await fetch(`/api/questionnaire/${params.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses: formattedResponses }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!questionnaire || !template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Questionnaire Not Found</h1>
          <p className="text-gray-600">This questionnaire may have expired or been removed.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-gray-600 mb-6">
            Your questionnaire has been submitted successfully. We'll review your responses and get back to you soon.
          </p>
          <div className="text-sm text-gray-500">
            Submitted for: {questionnaire.client.name}
          </div>
        </div>
      </div>
    );
  }

  const renderQuestion = (question: Question) => {
    const answer = responses[question.id];

    switch (question.type) {
      case 'text':
      case 'email':
        return (
          <input
            type={question.type}
            value={(answer as string) || ''}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        );

      case 'textarea':
        return (
          <textarea
            value={(answer as string) || ''}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg resize-none"
          />
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div key={option.id}>
                <label className="flex items-start cursor-pointer group">
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={answer === option.id}
                    onChange={(e) => handleResponse(question.id, e.target.value)}
                    className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <span className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                      {option.text}
                    </span>
                  </div>
                </label>
                {option.allowCustom && answer === option.id && (
                  <div className="mt-2 ml-6">
                    <input
                      type="text"
                      placeholder="Please specify..."
                      value={(responses[`${question.id}_custom`] as string) || ''}
                      onChange={(e) => handleResponse(`${question.id}_custom`, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <div key={option.id}>
                <label className="flex items-start cursor-pointer group">
                  <input
                    type="checkbox"
                    value={option.id}
                    checked={Array.isArray(answer) && answer.includes(option.id)}
                    onChange={(e) => {
                      const currentAnswers = Array.isArray(answer) ? answer : [];
                      if (e.target.checked) {
                        handleResponse(question.id, [...currentAnswers, option.id]);
                      } else {
                        handleResponse(question.id, currentAnswers.filter(a => a !== option.id));
                      }
                    }}
                    className="mt-1 mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <span className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                      {option.text}
                    </span>
                  </div>
                </label>
                {option.allowCustom && Array.isArray(answer) && answer.includes(option.id) && (
                  <div className="mt-2 ml-6">
                    <input
                      type="text"
                      placeholder="Please specify..."
                      value={(responses[`${question.id}_${option.id}_custom`] as string) || ''}
                      onChange={(e) => handleResponse(`${question.id}_${option.id}_custom`, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'select':
        return (
          <select
            value={(answer as string) || ''}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          >
            <option value="">Select an option...</option>
            {question.options?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.text}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tracking Pixel - Invisible tracking for analytics */}
      <TrackingPixel type="questionnaire" id={params.id as string} />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{template.name}</h1>
              <p className="text-sm text-gray-600">For: {questionnaire.client.name}</p>
            </div>
            <div className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {currentQuestion && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentQuestion.title}
                  {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
                </h2>
                {currentQuestion.description && (
                  <p className="text-gray-600 text-lg">{currentQuestion.description}</p>
                )}
              </div>

              <div className="py-4">
                {renderQuestion(currentQuestion)}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-8 border-t">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <div className="flex space-x-4">
                  {currentQuestionIndex === questions.length - 1 ? (
                    <button
                      onClick={handleSubmit}
                      disabled={!isCurrentQuestionAnswered() || submitting}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Questionnaire'
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      disabled={!isCurrentQuestionAnswered()}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Question Overview Sidebar */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Question Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {questions.map((q, index) => {
              const isAnswered = responses[q.id] !== undefined && responses[q.id] !== '' && 
                               (q.type !== 'checkbox' || (Array.isArray(responses[q.id]) && (responses[q.id] as string[]).length > 0));
              const isCurrent = index === currentQuestionIndex;
              
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`p-3 text-left rounded-lg text-sm transition-colors ${
                    isCurrent
                      ? 'bg-blue-100 border-2 border-blue-500 text-blue-900'
                      : isAnswered
                      ? 'bg-green-50 border border-green-200 text-green-800 hover:bg-green-100'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{index + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <div className="truncate">{q.title}</div>
                      {q.required && <span className="text-red-500 text-xs">Required</span>}
                    </div>
                    {isAnswered && (
                      <svg className="w-4 h-4 text-green-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}