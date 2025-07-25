// src/app/admin/layout.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Plus, FileText, Home } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <Image
              src="/AmplifiedSolutions_Logo-V2_Main.png"
              alt="Amplified Solutions"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-semibold text-slate-800">
              Proposal Admin
            </h1>
          </div>
          
          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Home className="w-4 h-4" />
              Main Site
            </Link>
            <Link
              href="/admin/proposals"
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <FileText className="w-4 h-4" />
              All Proposals
            </Link>
            <Link
              href="/admin/proposals/new"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Proposal
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}