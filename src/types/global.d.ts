// src/types/global.d.ts
declare global {
  interface Window {
    fbq: any;
    gtag: any;
    widgetTracker: any;
    dataLayer: any[];
  }
}

export interface ClientPortal {
  id: string;
  clientEmail: string;
  clientName: string;
  clientCompany?: string;
  createdAt: string;
  isActive: boolean;
}

// Add this for the client management
export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  createdAt: string;
  lastActivity?: string;
  portalId?: string;
  portalActive?: boolean;
  proposalCount: number;
  questionnaireCount: number;
  acceptedProposals: number;
  completedForms: number;
  totalPortalViews?: number;
  lastPortalAccess?: string;
  totalValue: number;
  status: 'active' | 'inactive' | 'prospect' | 'churned';
}

export {};