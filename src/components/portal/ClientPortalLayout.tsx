// src/components/portal/ClientPortalLayout.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClientPortal } from '@/types/global';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  PlayCircle, 
  BookOpen, 
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

interface ClientPortalLayoutProps {
  children: React.ReactNode;
  clientPortal: ClientPortal;
}

export default function ClientPortalLayout({ children, clientPortal }: ClientPortalLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: `/portal/${clientPortal.id}`, icon: LayoutDashboard },
    //{ name: 'Proposals', href: `/portal/${clientPortal.id}/proposals`, icon: FileText },
    //{ name: 'Forms', href: `/portal/${clientPortal.id}/forms`, icon: MessageSquare },
    { name: 'Reports', href: `/portal/${clientPortal.id}/reports`, icon: BarChart3 },
    { name: 'Training', href: `/portal/${clientPortal.id}/training`, icon: PlayCircle },
    { name: 'Resources', href: `/portal/${clientPortal.id}/resources`, icon: BookOpen },
    { name: 'Quick Links', href: `/portal/${clientPortal.id}/links`, icon: ExternalLink },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 relative">
          <div className="flex items-center justify-center flex-1">
            <img 
              src="/AmplifiedSolutions_Logo-V2_Main.png" 
              alt="Amplified Solutions" 
              className="h-8 w-auto"
            />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-slate-600 absolute top-4 right-4"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Client Info */}
        <div className="px-6 py-5 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="text-base font-semibold text-slate-900">{clientPortal.clientName}</div>
          {clientPortal.clientCompany && (
            <div className="text-sm text-slate-600 mt-1">{clientPortal.clientCompany}</div>
          )}
          <div className="text-sm text-blue-600 mt-1">{clientPortal.clientEmail}</div>
        </div>

        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-slate-200 p-4 bg-slate-50">
          <div className="text-xs text-slate-500 text-center font-medium">
            Powered by <span className="font-semibold text-slate-700">Amplified Solutions</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-slate-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-600 hover:text-slate-900"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center justify-center">
            <img 
              src="/AmplifiedSolutions_Logo-V2_Main.png" 
              alt="Amplified Solutions" 
              className="h-7 w-auto"
            />
          </div>
          <div className="w-6"></div>
        </div>

        {/* Page content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}