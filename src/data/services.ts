// src/data/services.ts
import { Service, Testimonial } from '@/types/proposal';

export const availableServices: Record<string, Service> = {
  'account-management': {
    id: 'account-management',
    title: 'Account Management Overview',
    description: 'Comprehensive account oversight and strategic guidance for your real estate business growth and optimization.',
    features: [
      'Dedicated account manager as your single point of contact',
      'Regular performance reviews and optimization recommendations',
      'Strategic planning sessions to align with your business goals',
      'Priority support and escalation management'
    ]
  },
  'account-engineers': {
    id: 'account-engineers',
    title: 'Account Engineers',
    description: 'Technical implementation and ongoing optimization of your lead generation and management systems.',
    features: [
      'CRM integration and custom workflow development',
      'Lead routing optimization for maximum conversion',
      'Advanced reporting and analytics setup',
      'Marketing automation and drip campaign development',
      'A/B testing implementation for continuous improvement',
      'Technical troubleshooting and system maintenance'
    ],
    highlighted: true
  },
  'leads-manager': {
    id: 'leads-manager',
    title: 'Leads Manager',
    description: 'Dedicated lead management and nurturing to maximize your conversion potential.',
    features: [
      'Lead qualification and scoring implementation',
      'Database segmentation for targeted campaigns',
      'Lead nurturing sequences and follow-up automation',
      'Conversion tracking and performance analytics',
      'Lead source optimization and ROI analysis'
    ]
  },
  'account-manager': {
    id: 'account-manager',
    title: 'Account Manager',
    description: 'Strategic oversight and relationship management for sustainable business growth.',
    features: [
      'Monthly strategy sessions and performance reviews',
      'Goal setting and KPI tracking',
      'Market analysis and competitive positioning',
      'Growth opportunity identification',
      'Cross-team coordination and project management',
      'Quarterly business reviews and planning sessions'
    ]
  }
};

export const testimonials: Testimonial[] = [
  {
    name: 'Rachel Van Cleave',
    company: 'Real Estate Professional',
    text: 'Had a call with Lee during a difficult time, and he was exactly what I needed. He helped me understand my CRM better.',
    avatar: '/testimonials/rachel.jpg'
  },
  {
    name: 'Tess Ferguson',
    company: 'Real Estate Professional', 
    text: 'Amazing experience! They helped us streamline our lead management process and our conversion rates improved dramatically.',
    avatar: '/testimonials/tess.jpg'
  }
];