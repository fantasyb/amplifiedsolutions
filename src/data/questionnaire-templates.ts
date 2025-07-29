// src/data/questionnaire-templates.ts
import { QuestionnaireTemplate } from '@/types/questionnaire';

export const questionnaireTemplates: Record<string, QuestionnaireTemplate> = {
  'isa-setup': {
    id: 'isa-setup',
    name: 'ISA Setup - Pre-Install Client Questionnaire',
    description: 'Necessary information before going LIVE with ISA services',
    questions: [
      {
        id: 'isa-credentials',
        type: 'radio',
        title: 'ISA Credentials',
        description: 'Do you already have a dedicated ISA user seat in Follow Up Boss?',
        required: true,
        options: [
          { id: 'yes-clientcare', text: 'Yes - clientcare@ email already set up' },
          { id: 'yes-other', text: 'Yes - other email setup' },
          { id: 'no-need-setup', text: 'No - need to create ISA seat' }
        ]
      },
      {
        id: 'eligible-lead-sources',
        type: 'checkbox',
        title: 'Eligible Lead Sources',
        description: 'Which lead sources are eligible for ISA outreach?',
        required: true,
        options: [
          { id: 'zbuyer', text: 'ZBuyer' },
          { id: 'ylopo-ppc', text: 'Ylopo PPC' },
          { id: 'luxury-presence', text: 'Luxury Presence' },
          { id: 'all-sources', text: 'All lead sources' },
          { id: 'others', text: 'Others', allowCustom: true }
        ]
      },
      {
        id: 'excluded-lead-sources',
        type: 'checkbox',
        title: 'Lead Source Exclusions',
        description: 'Which lead sources should be excluded from ISA outreach?',
        options: [
          { id: 'zillow-flex', text: 'Zillow Flex' },
          { id: 'soi-sphere', text: 'SOI/Sphere' },
          { id: 'past-clients', text: 'Past Clients' },
          { id: 'closed-leads', text: 'Closed Leads' },
          { id: 'others', text: 'Others', allowCustom: true }
        ]
      },
      {
        id: 'handoff-agents',
        type: 'textarea',
        title: 'Eligible ISA Handoff Agents',
        description: 'List all agent names/emails who are eligible to receive handoffs',
        required: true,
        placeholder: 'Agent Name - email@example.com\nAgent Name 2 - email2@example.com'
      },
      {
        id: 'lead-flow-type',
        type: 'radio',
        title: 'Lead Flow Preference',
        description: 'Should the ISA work from:',
        required: true,
        options: [
          { id: 'new-only', text: 'New Leads only' },
          { id: 'new-pond', text: 'New + Pond leads' },
          { id: 'custom', text: 'Custom setup', allowCustom: true }
        ]
      },
      {
        id: 'handoff-method',
        type: 'checkbox',
        title: 'Preferred Handoff Method',
        description: 'How should agents be notified of handoffs?',
        required: true,
        options: [
          { id: 'email', text: 'Email Notification' },
          { id: 'sms', text: 'SMS/Text' },
          { id: 'fub-notification', text: 'FUB System Notification' }
        ]
      },
      {
        id: 'reassignment-timeframe',
        type: 'radio',
        title: 'Agent Response Timeframe',
        description: 'How long does an agent have to reach out to a lead after handoff before it gets reassigned?',
        required: true,
        options: [
          { id: '30min', text: '30 minutes' },
          { id: '6hrs', text: '6 hours' },
          { id: '24hrs', text: '24 hours' },
          { id: 'custom', text: 'Custom timeframe', allowCustom: true }
        ]
      },
      {
        id: 'unresponsive-reassignment',
        type: 'radio',
        title: 'Unresponsive Lead Reassignment',
        description: 'Should unresponsive leads be reassigned to:',
        required: true,
        options: [
          { id: 'pond', text: 'POND' },
          { id: 'agent', text: 'Different Agent' },
          { id: 'other', text: 'Other', allowCustom: true }
        ]
      },
      {
        id: 'excluded-stages',
        type: 'checkbox',
        title: 'Stages to Exclude',
        description: 'Which stages should be excluded from ISA outreach?',
        options: [
          { id: 'past-clients', text: 'Past Clients' },
          { id: 'closed', text: 'Closed' },
          { id: 'under-contract', text: 'Under Contract' },
          { id: 'others', text: 'Others', allowCustom: true }
        ]
      },
      {
        id: 'zillow-flex-preference',
        type: 'radio',
        title: 'ZillowFlex Handling',
        description: 'How should ZillowFlex leads be handled?',
        options: [
          { id: 'touch', text: 'Touch - Include in ISA outreach' },
          { id: 'no-touch', text: 'No Touch - Exclude from ISA outreach' },
          { id: 'custom', text: 'Custom handling', allowCustom: true }
        ]
      },
      {
        id: 'introduction-script',
        type: 'textarea',
        title: 'Introduction Script',
        description: 'Preferred introduction script for ISA calls (optional)',
        placeholder: 'Hi [Name], this is [ISA Name] from [Company]. I noticed you were looking at homes in [Area]...'
      },
      {
        id: 'action-plans',
        type: 'radio',
        title: 'Action Plan Triggers',
        description: 'Should ISA start Action Plans based on lead status?',
        options: [
          { id: 'yes-automatic', text: 'Yes - Start automatically based on lead status' },
          { id: 'yes-manual', text: 'Yes - Start manually after qualification' },
          { id: 'no', text: 'No - Do not start Action Plans' }
        ]
      },
      {
        id: 'additional-notes',
        type: 'textarea',
        title: 'Additional Notes or Questions',
        description: 'Any additional requirements, questions, or special instructions',
        placeholder: 'Any special requirements, integration notes, or questions...'
      }
    ]
  },

  'as-system-setup': {
    id: 'as-system-setup',
    name: 'AS System Setup Questionnaire',
    description: 'Information needed for Follow Up Boss AS System implementation',
    questions: [
      {
        id: 'fub-admin-access',
        type: 'radio',
        title: 'Follow Up Boss Admin Access',
        description: 'Do you have admin access to provide us with system setup permissions?',
        required: true,
        options: [
          { id: 'yes-admin', text: 'Yes - I have admin access' },
          { id: 'can-get', text: 'Yes - I can get admin access' },
          { id: 'no-admin', text: 'No - Need to coordinate with admin' }
        ]
      },
      {
        id: 'team-size',
        type: 'text',
        title: 'Team Size',
        description: 'How many agents/team members will be using the system?',
        required: true,
        placeholder: 'e.g., 15 agents'
      },
      {
        id: 'lead-sources',
        type: 'checkbox',
        title: 'Current Lead Sources',
        description: 'What lead sources are you currently using?',
        required: true,
        options: [
          { id: 'zillow', text: 'Zillow' },
          { id: 'realtor-com', text: 'Realtor.com' },
          { id: 'ylopo', text: 'Ylopo' },
          { id: 'luxury-presence', text: 'Luxury Presence' },
          { id: 'facebook', text: 'Facebook Ads' },
          { id: 'google', text: 'Google Ads' },
          { id: 'others', text: 'Others', allowCustom: true }
        ]
      },
      {
        id: 'current-challenges',
        type: 'checkbox',
        title: 'Current Follow Up Boss Challenges',
        description: 'What challenges are you facing with your current FUB setup?',
        options: [
          { id: 'lead-routing', text: 'Lead routing issues' },
          { id: 'agent-adoption', text: 'Low agent adoption' },
          { id: 'follow-up', text: 'Inconsistent follow-up' },
          { id: 'reporting', text: 'Poor reporting/visibility' },
          { id: 'automation', text: 'Lack of automation' },
          { id: 'training', text: 'Need better training' },
          { id: 'others', text: 'Others', allowCustom: true }
        ]
      },
      {
        id: 'training-preferences',
        type: 'radio',
        title: 'Training Preferences',
        description: 'What type of training works best for your team?',
        required: true,
        options: [
          { id: 'live-group', text: 'Live group training session' },
          { id: 'recorded', text: 'Recorded training materials' },
          { id: 'both', text: 'Both live and recorded' },
          { id: 'one-on-one', text: 'One-on-one training sessions' }
        ]
      },
      {
        id: 'timeline',
        type: 'radio',
        title: 'Implementation Timeline',
        description: 'What\'s your preferred timeline for implementation?',
        required: true,
        options: [
          { id: 'asap', text: 'ASAP - Urgent' },
          { id: '1-2weeks', text: '1-2 weeks' },
          { id: '3-4weeks', text: '3-4 weeks' },
          { id: 'flexible', text: 'Flexible timing' }
        ]
      },
      {
        id: 'additional-requirements',
        type: 'textarea',
        title: 'Additional Requirements',
        description: 'Any specific requirements, integrations, or special considerations?',
        placeholder: 'Special integrations, custom requirements, etc.'
      }
    ]
  }
};

export function getQuestionnaireTemplate(id: string) {
  return questionnaireTemplates[id] || null;
}

export function getAllTemplates() {
  return Object.values(questionnaireTemplates);
}