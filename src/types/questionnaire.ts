// src/types/questionnaire.ts

export interface QuestionnaireClient {
  name: string;
  email: string;
  company?: string;
  phone?: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  allowCustom?: boolean; // For "Others - ___________" options
}

export interface Question {
  id: string;
  type: 'text' | 'email' | 'checkbox' | 'radio' | 'textarea' | 'select';
  title: string;
  description?: string;
  required?: boolean;
  options?: QuestionOption[]; // For checkbox, radio, select
  placeholder?: string;
}

export interface QuestionnaireTemplate {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

export interface QuestionnaireResponse {
  questionId: string;
  answer: string | string[]; // string for text/radio, array for checkboxes
}

export interface Questionnaire {
  id: string;
  templateId: string;
  client: QuestionnaireClient;
  title: string;
  status: 'sent' | 'in-progress' | 'completed' | 'expired';
  createdAt: Date;
  sentAt?: Date;
  completedAt?: Date;
  expiresAt?: Date;
  responses?: QuestionnaireResponse[];
  notes?: string;
}