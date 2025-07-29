import Link from 'next/link';
import QuestionnaireList from '@/components/admin/QuestionnaireList';
import { Plus } from 'lucide-react';

export default function AdminQuestionnairesPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Client Questionnaires</h1>
            <p className="text-slate-600 mt-1">Manage and track client intake forms</p>
          </div>
          <Link
            href="/admin/questionnaires/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Send New Questionnaire
          </Link>
        </div>

        {/* List Component */}
        <QuestionnaireList />
      </div>
    </div>
  );
}