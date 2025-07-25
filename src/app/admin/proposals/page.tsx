// src/app/admin/proposals/page.tsx
import Link from 'next/link';
import ProposalList from '@/components/admin/ProposalList';
import { FileText, Plus } from 'lucide-react';

export default function ProposalsAdminPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">
              Proposals
            </h1>
          </div>
          <p className="text-lg text-slate-600">
            Manage and track all your client proposals
          </p>
        </div>

        <Link
          href="/admin/proposals/new"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          New Proposal
        </Link>
      </div>

      <ProposalList />
    </div>
  );
}