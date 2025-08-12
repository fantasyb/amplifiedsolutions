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
  'lead-management': {
    id: 'lead-management',
    title: 'Lead Management',
    description: 'Turn Your Follow Up Boss Into a Lead Machine. Complete lead lifecycle management from first contact to conversion.',
    features: [
      'Smart lead routing based on agent availability and expertise',
      'Agent nudging and accountability for consistent follow-up',
      'Active lead redistribution when agents aren\'t responding',
      'Lead reassignment from inactive to active agents',
      'Proper stage management and pond release systems',
      'FUB system analysis and bottleneck identification',
      'Custom configuration and ongoing optimization',
      'Monthly reporting on lead flow and agent performance'
    ]
  },
  'lead-conversion': {
    id: 'lead-conversion',
    title: 'Lead Conversion',
    description: 'Turn Cold Leads Into Live Transfers. Complete ISA calling system with systematic follow-up and full FUB management.',
    features: [
      'Systematic ISA calling with 8-12 touches on every lead',
      'Smart list calling when leads heat up and engage',
      'Thorough lead qualification before live transfers',
      'Qualified live transfers to agents ready to book appointments',
      'Complete Follow Up Boss system management included',
      'Agent nudging and lead reassignment when needed',
      'Proper lead staging and pond release management',
      'Monthly reporting on calls, conversions, and lead flow'
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