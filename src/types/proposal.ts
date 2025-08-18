// src/types/proposal.ts
export interface Client {
  name: string;
  company?: string;
  email: string;
  phone?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  price?: number; // Add price field for individual services if needed
}

export interface Testimonial {
  name: string;
  company: string;
  text: string;
  avatar?: string;
}

export interface Proposal {
  id: string;
  client: Client;
  services: Service[];
  cost: number;
  notes?: string;
  createdAt: Date;
  expiresAt?: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  
  // Payment configuration
  isRecurring?: boolean;
  recurringInterval?: 'month' | 'year'; // Added for subscription interval
  paymentType?: 'full' | 'partial' | 'installments';
  downPayment?: number;
  installmentCount?: number;
  
  // Payment link tracking (instead of stripeCheckoutUrl)
  paymentLinkId?: string; // Store Stripe payment link ID if you want to track it
  paymentLinkUrl?: string; // Optionally cache the URL, though you'll generate it on-demand
}