// src/app/admin/proposals/page.tsx
import Link from 'next/link';
import ProposalList from '@/components/admin/ProposalList';
import { Plus } from 'lucide-react';

export default function AdminProposalsPage() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Proposals</h1>
            <p className="text-slate-600 mt-1">Manage and track all your client proposals</p>
          </div>
          <Link
            href="/admin/proposals/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            New Proposal
          </Link>
        </div>

        {/* Proposal List Component */}
        <ProposalList />
      </div>
    </div>
  );
}