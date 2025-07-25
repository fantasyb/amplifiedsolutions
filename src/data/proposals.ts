// src/data/proposals.ts
import { Proposal } from '@/types/proposal';
import { availableServices } from './services';

// Try to import Upstash Redis, fallback to local storage for development
let redis: any = null;
try {
  if (typeof window === 'undefined') {
    const { Redis } = require('@upstash/redis');
    redis = new Redis({
      url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
} catch (error) {
  console.log('Upstash Redis not available, using local storage for development');
}

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

// Local fallback for development
let localProposals: Record<string, Proposal> = { ...initialProposals };

export async function getProposals(): Promise<Record<string, Proposal>> {
  if (redis) {
    // Production: use Upstash Redis
    try {
      const stored = await redis.get('proposals');
      let parsedProposals = {};
      
      // Handle different data formats
      if (stored) {
        if (typeof stored === 'string') {
          parsedProposals = JSON.parse(stored);
        } else if (typeof stored === 'object') {
          parsedProposals = stored;
        }
      }
      
      // Convert date strings back to Date objects
      Object.values(parsedProposals).forEach((proposal: any) => {
        if (proposal && typeof proposal === 'object') {
          if (proposal.createdAt) proposal.createdAt = new Date(proposal.createdAt);
          if (proposal.expiresAt) proposal.expiresAt = new Date(proposal.expiresAt);
        }
      });
      
      return { ...initialProposals, ...parsedProposals };
    } catch (error) {
      console.error('Error loading from Redis:', error);
      return initialProposals;
    }
  } else {
    // Development: use local storage
    return localProposals;
  }
}

export async function getProposal(id: string): Promise<Proposal | null> {
  console.log(`🔍 Looking for proposal: ${id}`);
  const allProposals = await getProposals();
  const proposal = allProposals[id];
  
  if (proposal) {
    console.log(`✅ Found proposal: ${id}`);
  } else {
    console.log(`❌ Proposal not found: ${id}`);
    console.log('Available proposals:', Object.keys(allProposals));
  }
  
  return proposal || null;
}

export async function createProposal(proposalData: Omit<Proposal, 'id' | 'createdAt' | 'status'>, providedId?: string): Promise<Proposal> {
  const id = providedId || generateProposalId(proposalData.client.name);
  const proposal: Proposal = {
    ...proposalData,
    id,
    createdAt: new Date(),
    status: 'pending'
  };
  
  console.log(`📝 Creating proposal: ${id}`);
  
  if (redis) {
    // Production: save to Upstash Redis
    try {
      const currentProposals = await getProposals();
      currentProposals[id] = proposal;
      
      // Ensure we're storing as JSON string
      const dataToStore = JSON.stringify(currentProposals);
      await redis.set('proposals', dataToStore);
      console.log('✅ Proposals saved to Redis');
    } catch (error) {
      console.error('❌ Error saving to Redis:', error);
    }
  } else {
    // Development: save to local storage
    localProposals[id] = proposal;
    console.log('✅ Proposals saved locally');
  }
  
  return proposal;
}

export async function updateProposalStatus(id: string, status: 'pending' | 'accepted' | 'rejected' | 'expired'): Promise<boolean> {
  console.log(`🔄 Updating proposal ${id} to ${status}`);
  
  if (redis) {
    // Production: update in Upstash Redis
    try {
      const allProposals = await getProposals();
      if (allProposals[id]) {
        allProposals[id].status = status;
        const dataToStore = JSON.stringify(allProposals);
        await redis.set('proposals', dataToStore);
        console.log(`✅ Updated proposal ${id} status to ${status}`);
        return true;
      }
    } catch (error) {
      console.error('❌ Error updating in Redis:', error);
    }
  } else {
    // Development: update locally
    if (localProposals[id]) {
      localProposals[id].status = status;
      console.log(`✅ Updated proposal ${id} status to ${status}`);
      return true;
    }
  }
  
  console.log(`❌ Could not find proposal ${id} to update`);
  return false;
}

export async function deleteProposal(id: string): Promise<boolean> {
  console.log(`🗑️ Deleting proposal: ${id}`);
  
  if (redis) {
    // Production: delete from Upstash Redis
    try {
      const allProposals = await getProposals();
      if (allProposals[id]) {
        delete allProposals[id];
        const dataToStore = JSON.stringify(allProposals);
        await redis.set('proposals', dataToStore);
        console.log(`✅ Deleted proposal ${id}`);
        return true;
      }
    } catch (error) {
      console.error('❌ Error deleting from Redis:', error);
    }
  } else {
    // Development: delete locally
    if (localProposals[id]) {
      delete localProposals[id];
      console.log(`✅ Deleted proposal ${id}`);
      return true;
    }
  }
  
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