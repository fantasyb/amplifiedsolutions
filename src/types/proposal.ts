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
  price?: number;
  isCustom?: boolean;
}

export interface Testimonial {
  name: string;
  company: string;
  text: string;
  avatar?: string;
}

export interface PricingItem {
  label: string;
  amount: string; // Flexible string: "$2,000/mo", "$100/listing", "1%"
  description?: string;
}

export interface TermSection {
  title: string;
  content: string;
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
  recurringInterval?: 'month' | 'year';
  paymentType?: 'full' | 'partial' | 'installments';
  downPayment?: number;
  installmentCount?: number;

  // Structured pricing breakdown (for multi-part deals)
  pricingBreakdown?: PricingItem[];

  // Legal terms & conditions
  terms?: TermSection[];

  // Payment link tracking
  paymentLinkId?: string;
  paymentLinkUrl?: string;
}