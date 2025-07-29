// src/app/admin/questionnaires/new/page.tsx
import Link from 'next/link';
import QuestionnaireForm from '@/components/admin/QuestionnaireForm';
import { ArrowLeft } from 'lucide-react';

export default function NewFormPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              href="/admin/questionnaires"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Forms
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Send New Form</h1>
          <p className="text-slate-600 mt-2">Create and send a form to a client</p>
        </div>

        {/* Form Component */}
        <QuestionnaireForm />
      </div>
    </div>
  );
}