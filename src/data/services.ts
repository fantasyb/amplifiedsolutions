// src/data/services.ts
import { Service, Testimonial } from '@/types/proposal';

export const availableServices: Record<string, Service> = {
  'as-system': {
    id: 'as-system',
    title: 'The AS System',
    description: 'Our best practice Follow Up Boss setup with complete optimization, smart lists, action plans, and ongoing support.',
    features: [
      'FUB Pixel Installation for maximum data capture',
      'Smart lead routing to the right agents at the right time',
      'Ponds for better lead organization and prioritization',
      'Proven Smart Lists system for systematic follow-up',
      'Simplified stages for progress tracking and lead nurturing',
      '24+ Action Plans with automated email sequences',
      'Automations for stage changes, tags, and inquiries',
      'Live team training session with full Q&A',
      'Resource website with guides and training materials'
    ]
  },
  'real-scout-integration': {
    id: 'real-scout-integration',
    title: 'Real Scout Integration',
    description: 'Complete Real Scout integration with Follow Up Boss, custom smart lists, and comprehensive team training.',
    features: [
      'Full Real Scout integration with Follow Up Boss',
      'Real Scout smart lists for better lead management',
      'Real Scout workflow optimization and automation',
      'Team training on Real Scout best practices',
      'Resource materials and guides'
    ]
  },
  'recruiting-system': {
    id: 'recruiting-system',
    title: 'Follow Up Boss Recruiting System',
    description: 'Your one-stop recruiting solution for streamlined agent acquisition on Follow Up Boss. Turn recruiting from a grind into an exhilarating growth engine.',
    features: [
      'Recruiting-specific pond and smart list for dedicated agent acquisition',
      'Complete recruiting deal board for pipeline monitoring and insights',
      'Plug-and-play email and text templates for proven outreach',
      'Comprehensive training guide and videos for immediate implementation',
      'Set-it-and-forget-it system requiring no ongoing maintenance',
      'Scalable solution that grows with your team size',
      'Immediate ROI from day one of implementation',
      'Administrative task automation and manual tracking elimination'
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