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
  stripeCheckoutUrl: string;
  createdAt: Date;
  expiresAt?: Date;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
}