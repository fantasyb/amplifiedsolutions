// src/app/proposal/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proposal | Amplified Solutions',
  description: 'Your customized service proposal from Amplified Solutions',
};

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {children}
    </div>
  );
}