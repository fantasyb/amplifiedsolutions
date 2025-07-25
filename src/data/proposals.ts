// src/data/proposals.ts
import { Proposal } from '@/types/proposal';
import { availableServices } from './services';
import fs from 'fs';
import path from 'path';

// Initial/hardcoded proposals
const initialProposals: Record<string, Proposal> = {
  'devin-resendez': {
    id: 'devin-resendez',
    client: {
      name: 'Devin Resendez',
      email: 'devin@example.com',
      company: 'Resendez Real Estate'
    },
    services: [
      availableServices['account-management'],
      availableServices['account-engineers'],
      availableServices['leads-manager'],
      availableServices['account-manager']
    ],
    cost: 1500,
    notes: 'Thank you. This does not include features or functionality services. I cannot wait this long to see you hit your business goals.',
    stripeCheckoutUrl: 'https://checkout.stripe.com/c/pay/test_session_123',
    createdAt: new Date('2025-01-15'),
    expiresAt: new Date('2025-02-15'),
    status: 'pending'
  }
};

// File path for storing proposals
const proposalsFilePath = path.join(process.cwd(), 'proposals.json');

// Load proposals from file or use initial data
function loadProposals(): Record<string, Proposal> {
  try {
    if (fs.existsSync(proposalsFilePath)) {
      const fileData = fs.readFileSync(proposalsFilePath, 'utf8');
      const savedProposals = JSON.parse(fileData);
      
      // Convert date strings back to Date objects
      Object.values(savedProposals).forEach((proposal: any) => {
        proposal.createdAt = new Date(proposal.createdAt);
        if (proposal.expiresAt) {
          proposal.expiresAt = new Date(proposal.expiresAt);
        }
      });
      
      return { ...initialProposals, ...savedProposals };
    }
  } catch (error) {
    console.error('Error loading proposals:', error);
  }
  
  return initialProposals;
}

// Save proposals to file
function saveProposals(proposalsData: Record<string, Proposal>) {
  try {
    fs.writeFileSync(proposalsFilePath, JSON.stringify(proposalsData, null, 2));
    console.log('✅ Proposals saved to file');
  } catch (error) {
    console.error('❌ Error saving proposals:', error);
  }
}

// Export the proposals object - but reload each time for fresh data
let proposalsCache: Record<string, Proposal> | null = null;

export function getProposals(): Record<string, Proposal> {
  // Always reload from file to get latest data
  return loadProposals();
}

export function getProposal(id: string): Proposal | null {
  console.log(`🔍 Looking for proposal: ${id}`);
  const allProposals = getProposals();
  const proposal = allProposals[id];
  
  if (proposal) {
    console.log(`✅ Found proposal: ${id}`);
  } else {
    console.log(`❌ Proposal not found: ${id}`);
    console.log('Available proposals:', Object.keys(allProposals));
  }
  
  return proposal || null;
}

// Updated function to save proposals
export function createProposal(proposalData: Omit<Proposal, 'id' | 'createdAt' | 'status'>, providedId?: string): Proposal {
  // Use provided ID or generate new one
  const id = providedId || generateProposalId(proposalData.client.name);
  const proposal: Proposal = {
    ...proposalData,
    id,
    createdAt: new Date(),
    status: 'pending'
  };
  
  console.log(`📝 Creating proposal: ${id}`);
  
  // Load current proposals, add new one, save back
  const currentProposals = getProposals();
  currentProposals[id] = proposal;
  saveProposals(currentProposals);
  
  return proposal;
}

export function updateProposalStatus(id: string, status: 'pending' | 'accepted' | 'rejected' | 'expired'): boolean {
  console.log(`🔄 Updating proposal ${id} to ${status}`);
  
  const allProposals = getProposals();
  if (allProposals[id]) {
    allProposals[id].status = status;
    saveProposals(allProposals);
    console.log(`✅ Updated proposal ${id} status to ${status}`);
    return true;
  }
  
  console.log(`❌ Could not find proposal ${id} to update`);
  return false;
}

function generateProposalId(clientName: string): string {
  const nameSlug = clientName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${nameSlug}-${randomSuffix}`;
}

// Legacy export for compatibility
export const proposals = getProposals();