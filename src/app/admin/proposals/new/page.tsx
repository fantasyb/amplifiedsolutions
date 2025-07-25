// src/app/admin/proposals/new/page.tsx
import ProposalForm from '@/components/admin/ProposalForm';
import { Plus } from 'lucide-react';

export default function NewProposalPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Plus className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Create New Proposal
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Fill out the form below to generate a beautiful, professional proposal 
          for your client. All fields marked with * are required.
        </p>
      </div>

      <ProposalForm />
    </div>
  );
}