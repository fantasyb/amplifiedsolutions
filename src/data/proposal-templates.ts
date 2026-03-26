// src/data/proposal-templates.ts
import { PricingItem, TermSection, Service } from '@/types/proposal';

export interface ProposalTemplate {
  id: string;
  name: string;
  description: string;
  services: Service[];
  pricingBreakdown: PricingItem[];
  terms: TermSection[];
  cost: number;
  isRecurring: boolean;
  notes?: string;
}

// Third-party costs term - used in templates that involve external APIs/tools
export const thirdPartyCostsTerm: TermSection = {
  title: 'Third-Party Services & Costs',
  content: `Client is responsible for all third-party service subscriptions, API access fees, and tool costs required to operate the systems built under this agreement. This includes but is not limited to data providers (e.g., Spokeo, PropStream), phone/dialer platforms, CRM subscriptions, and any other external services integrated into the workflow.

Provider will recommend, configure, and integrate these services on Client's behalf, but all accounts shall be owned by and billed directly to Client. Provider does not mark up, resell, or absorb any third-party costs.

Client is responsible for maintaining active subscriptions to all required third-party services. Lapsed or canceled third-party accounts may result in degraded or non-functional automations, which is not the responsibility of Provider.`,
};

// Standard service agreement terms - reusable across proposals
export const standardTerms: TermSection[] = [
  {
    title: 'Intellectual Property & Ownership',
    content: `All automations, workflows, AI systems, integrations, custom code, templates, data pipelines, and processes developed or deployed by Amplified Solutions Consulting LLC ("Provider") in connection with this agreement are and shall remain the sole intellectual property of Provider. These systems represent proprietary methodologies, trade secrets, and competitive advantages of Provider.

Client acknowledges that the services provided under this agreement are powered by Provider's proprietary technology stack and that no ownership interest in the underlying systems, code, or processes is transferred to Client at any time.`,
  },
  {
    title: 'License Grant',
    content: `Provider grants Client a non-exclusive, non-transferable, revocable license to use and benefit from the deployed systems solely for Client's internal business operations and only for the duration of the active service agreement.

This license does not convey ownership of any systems, code, automations, or processes. Client may not sublicense, resell, distribute, reverse-engineer, or provide access to Provider's systems to any third party.`,
  },
  {
    title: 'Confidentiality & Non-Disclosure',
    content: `Provider agrees to maintain strict confidentiality of Client's proprietary business information, client data, transaction details, and the specific system configurations developed for Client's operations. Provider will not disclose Client's confidential information to any third party without prior written consent.

Provider will not share or replicate the specific configurations, custom workflows, or data models built for Client with any competing brokerage or real estate team.

Client acknowledges that Provider operates a technology consulting business and may use similar general methodologies, AI techniques, automation frameworks, and best practices with other clients in unrelated markets or non-competing contexts. The confidentiality obligations herein protect Client's specific data and configurations, not Provider's general expertise and methodology.`,
  },
  {
    title: 'Termination',
    content: `Either party may terminate this agreement with 30 days' written notice.

Upon termination:
- All Provider-owned automations, systems, integrations, and workflows will be deactivated and removed within 30 days
- Client's license to use Provider's systems terminates immediately upon the effective termination date
- Client's proprietary data will be exported and delivered to Client, or destroyed at Client's written request, within 15 business days
- Any outstanding invoices for services rendered, per-listing fees, and earned commissions remain due and payable`,
  },
  {
    title: 'Buyout Option',
    content: `Upon termination or at any time during the agreement, Client may request to purchase a perpetual license to the deployed systems, automations, and workflows.

The buyout fee shall be mutually negotiated and agreed upon in writing, based on the scope, complexity, development cost, and replacement value of the systems at the time of the request.

Provider is under no obligation to accept a buyout offer and retains the right to decline any buyout request. Until a buyout agreement is executed and payment received in full, all intellectual property remains the exclusive property of Provider.`,
  },
  {
    title: 'Limitation of Liability',
    content: `Provider's total aggregate liability under this agreement shall not exceed the total fees actually paid by Client in the preceding 12-month period.

Provider shall not be liable for indirect, incidental, consequential, special, or punitive damages, including but not limited to lost profits, lost revenue, or loss of business opportunities, regardless of whether such damages were foreseeable.

Provider does not guarantee specific lead volumes, conversion rates, or revenue outcomes. Results depend on market conditions, Client's team performance, and other factors outside Provider's control.`,
  },
];

// Pre-built proposal templates
export const proposalTemplates: ProposalTemplate[] = [
  {
    id: 'fractional-cto-expired',
    name: 'Fractional CTO - Expired Listings',
    description: 'AI automations + consulting for expired listing operations with base retainer, per-listing fee, and commission',
    cost: 2000,
    isRecurring: true,
    notes: 'All variable fees (per-listing and commission) are invoiced separately on a monthly basis. The base retainer covers the Stripe subscription. Commission is calculated on net commission at closing and invoiced within 30 days of close.',
    services: [
      {
        id: 'fractional-cto',
        title: 'Fractional CTO Services',
        description: 'Strategic AI leadership, technology consulting, and hands-on automation development for your real estate operations. Amplified Solutions serves as your dedicated technology partner, providing ongoing guidance and implementation.',
        features: [
          'AI strategy development and technology roadmap',
          'Ongoing consulting and strategic technology guidance',
          'Direct access to Amplified Solutions for technical decisions',
          'Regular strategy sessions and performance reviews',
          'Technology vendor evaluation and recommendations',
        ],
        highlighted: true,
        isCustom: true,
      },
      {
        id: 'ai-automations',
        title: 'AI Automations & Systems',
        description: 'Custom-built AI automations, workflows, and integrations designed to streamline your expired listing operations and maximize conversion rates.',
        features: [
          'Custom AI automation development and deployment',
          'Expired listing identification and outreach automation',
          'CRM workflow optimization and lead routing',
          'Automated follow-up sequences and nurture campaigns',
          'Data pipeline development and analytics dashboards',
          'Ongoing system maintenance, updates, and optimization',
        ],
        isCustom: true,
      },
      {
        id: 'expired-listing-acquisition',
        title: 'Expired Listing Acquisition',
        description: 'Performance-based expired listing generation system. Amplified Solutions develops and operates the technology that identifies, targets, and delivers expired listing opportunities directly to your pipeline.',
        features: [
          'Proprietary expired listing identification system',
          'Automated outreach and lead capture workflows',
          'Lead qualification and delivery to your team',
          'Performance tracking and reporting',
          'Continuous optimization of acquisition channels',
        ],
        isCustom: true,
      },
    ],
    pricingBreakdown: [
      {
        label: 'Monthly Base Retainer',
        amount: '$2,000/mo',
        description: 'Fractional CTO services, AI automations, consulting, and ongoing system management',
      },
      {
        label: 'Per Expired Listing Acquired',
        amount: '$100/listing',
        description: 'Charged for each expired listing delivered to your pipeline',
      },
      {
        label: 'Commission on Closed Expired Listings',
        amount: '1% of Net Commission',
        description: 'Due within 30 days of closing on any expired listing that results in a closed transaction',
      },
    ],
    terms: [
      ...standardTerms.slice(0, 4), // IP, License, NDA, Termination
      standardTerms[4], // Buyout
      thirdPartyCostsTerm, // Third-party services
      {
        title: 'Payment Terms',
        content: `- The base monthly retainer of $2,000 is due on the 1st of each month and will be processed automatically via the accepted payment method
- Per-listing fees of $100 per expired listing acquired are invoiced monthly in arrears based on delivery reports
- Commission of 1% of net commission on expired listings that close is invoiced within 30 days of closing, with supporting transaction documentation
- All invoices are due within 15 days of receipt
- Late payments exceeding 15 days will incur a 1.5% monthly interest charge
- Payments outstanding beyond 30 days may result in temporary suspension of services until the account is brought current`,
      },
      standardTerms[5], // Limitation of Liability
    ],
  },
  {
    id: 'fractional-cto-general',
    name: 'Fractional CTO - General',
    description: 'AI automations + consulting with flat monthly retainer only',
    cost: 2000,
    isRecurring: true,
    notes: '',
    services: [
      {
        id: 'fractional-cto',
        title: 'Fractional CTO Services',
        description: 'Strategic AI leadership, technology consulting, and hands-on automation development for your business operations. Amplified Solutions serves as your dedicated technology partner.',
        features: [
          'AI strategy development and technology roadmap',
          'Ongoing consulting and strategic technology guidance',
          'Direct access to Amplified Solutions for technical decisions',
          'Regular strategy sessions and performance reviews',
          'Technology vendor evaluation and recommendations',
        ],
        highlighted: true,
        isCustom: true,
      },
      {
        id: 'ai-automations',
        title: 'AI Automations & Systems',
        description: 'Custom-built AI automations, workflows, and integrations designed to streamline your operations and maximize efficiency.',
        features: [
          'Custom AI automation development and deployment',
          'CRM workflow optimization and lead routing',
          'Automated follow-up sequences and nurture campaigns',
          'Data pipeline development and analytics dashboards',
          'Ongoing system maintenance, updates, and optimization',
        ],
        isCustom: true,
      },
    ],
    pricingBreakdown: [
      {
        label: 'Monthly Retainer',
        amount: '$2,000/mo',
        description: 'Fractional CTO services, AI automations, consulting, and ongoing system management',
      },
    ],
    terms: [
      ...standardTerms.slice(0, 4),
      standardTerms[4],
      {
        title: 'Payment Terms',
        content: `- The monthly retainer of $2,000 is due on the 1st of each month and will be processed automatically via the accepted payment method
- All invoices are due within 15 days of receipt
- Late payments exceeding 15 days will incur a 1.5% monthly interest charge
- Payments outstanding beyond 30 days may result in temporary suspension of services until the account is brought current`,
      },
      standardTerms[5],
    ],
  },
];
