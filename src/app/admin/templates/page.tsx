import Link from 'next/link';
import TemplateList from '@/components/admin/TemplateList';
import { Plus } from 'lucide-react';

export default function AdminTemplatesPage() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Questionnaire Templates</h1>
            <p className="text-slate-600 mt-1">Create and edit questionnaire templates</p>
          </div>
          <Link
            href="/admin/templates/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            New Template
          </Link>
        </div>

        {/* Template List Component */}
        <TemplateList />
      </div>
    </div>
  );
}