// src/lib/clientPortal.ts
import { redis } from '@/lib/redis';
import { ClientPortal } from '@/types/global';

// Generate unique portal ID for a client
export function generateClientPortalId(clientName: string, clientEmail: string): string {
  const nameSlug = clientName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const emailSlug = clientEmail.split('@')[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${nameSlug}-${emailSlug}-${randomSuffix}`;
}

// Get client portal by portal ID
export async function getClientPortal(portalId: string): Promise<ClientPortal | null> {
  try {
    const portalData = await redis.hgetall(`client_portal:${portalId}`);
    
    if (!portalData || Object.keys(portalData).length === 0) {
      return null;
    }

    return {
      id: String(portalData.id),
      clientEmail: String(portalData.clientEmail),
      clientName: String(portalData.clientName),
      clientCompany: String(portalData.clientCompany || ''),
      createdAt: String(portalData.createdAt),
      // Fix: Handle both boolean and string values properly
      isActive: Boolean(portalData.isActive) && portalData.isActive !== 'false',
    };
  } catch (error) {
    console.error('Error getting client portal:', error);
    return null;
  }
}

// Get client portal by email
export async function getClientPortalByEmail(email: string): Promise<ClientPortal | null> {
  try {
    const portalId = await redis.get(`client_email:${email.toLowerCase()}`) as string | null;
    if (!portalId) {
      return null;
    }
    return await getClientPortal(portalId);
  } catch (error) {
    console.error('Error getting client portal by email:', error);
    return null;
  }
}

// Create a new client portal
export async function createClientPortal(
  clientEmail: string, 
  clientName: string, 
  clientCompany?: string
): Promise<ClientPortal> {
  // Check if client already has a portal
  const existingPortal = await getClientPortalByEmail(clientEmail);
  if (existingPortal) {
    console.log(`♻️ Using existing portal for ${clientEmail}: ${existingPortal.id}`);
    return existingPortal;
  }

  const portalId = generateClientPortalId(clientName, clientEmail);
  
  const portal: ClientPortal = {
    id: portalId,
    clientEmail: clientEmail.toLowerCase(),
    clientName,
    clientCompany,
    createdAt: new Date().toISOString(),
    isActive: true,
  };

  // Store portal data - convert portal object to plain object for Redis
  const portalForRedis = {
    id: portal.id,
    clientEmail: portal.clientEmail,
    clientName: portal.clientName,
    clientCompany: portal.clientCompany || '',
    createdAt: portal.createdAt,
    isActive: portal.isActive.toString(),
  };

  await redis.hset(`client_portal:${portalId}`, portalForRedis);
  
  // Store email -> portal mapping for lookups
  await redis.set(`client_email:${clientEmail.toLowerCase()}`, portalId);

  console.log(`✅ Created client portal: ${portalId} for ${clientEmail}`);
  return portal;
}

// Get proposals for a client portal
export async function getProposalsForClient(clientEmail: string) {
  try {
    const allProposalsJson = await redis.get('proposals');
    
    console.log('Raw proposals data from Redis:', allProposalsJson);
    console.log('Type of proposals data:', typeof allProposalsJson);
    
    // Handle null or empty data
    if (!allProposalsJson || allProposalsJson === null || allProposalsJson === undefined) {
      console.log('No proposals data found');
      return [];
    }
    
    // If it's already an object, use it directly
    if (typeof allProposalsJson === 'object') {
      console.log('Proposals data is already an object:', allProposalsJson);
      if (allProposalsJson && Object.keys(allProposalsJson).length === 0) {
        console.log('Empty proposals object found');
        return [];
      }
      return Object.values(allProposalsJson).filter((proposal: any) => 
        proposal && proposal.client && proposal.client.email && 
        proposal.client.email.toLowerCase() === clientEmail.toLowerCase()
      );
    }
    
    // Now we know it should be a string
    const proposalsString = String(allProposalsJson);
    console.log('Proposals string:', proposalsString);
    console.log('Length of proposals string:', proposalsString.length);
    
    // Handle empty object string
    if (proposalsString === '{}' || proposalsString.trim() === '{}') {
      console.log('Empty proposals object string found');
      return [];
    }
    
    // Handle null/undefined string
    if (proposalsString === 'null' || proposalsString === 'undefined') {
      console.log('Null/undefined proposals string found');
      return [];
    }
    
    // Try to parse JSON safely
    let allProposals;
    try {
      allProposals = JSON.parse(proposalsString);
    } catch (parseError) {
      console.error('Error parsing proposals JSON:', parseError);
      console.error('Raw data that failed to parse:', proposalsString);
      console.error('First 50 characters:', proposalsString.substring(0, 50));
      console.error('Character codes:', proposalsString.split('').slice(0, 10).map(c => c.charCodeAt(0)));
      return [];
    }
    
    // Ensure allProposals is an object
    if (!allProposals || typeof allProposals !== 'object') {
      console.log('Proposals data is not a valid object:', allProposals);
      return [];
    }
    
    const filteredProposals = Object.values(allProposals).filter((proposal: any) => 
      proposal && proposal.client && proposal.client.email && 
      proposal.client.email.toLowerCase() === clientEmail.toLowerCase()
    );
    
    console.log(`Found ${filteredProposals.length} proposals for ${clientEmail}`);
    return filteredProposals;
  } catch (error) {
    console.error('Error getting proposals for client:', error);
    return [];
  }
}

// Get questionnaires for a client portal  
export async function getQuestionnairesForClient(clientEmail: string) {
  try {
    const allQuestionnairesJson = await redis.get('questionnaires');
    
    console.log('Raw questionnaires data from Redis:', allQuestionnairesJson);
    console.log('Type of questionnaires data:', typeof allQuestionnairesJson);
    
    // Handle null or empty data
    if (!allQuestionnairesJson || allQuestionnairesJson === null || allQuestionnairesJson === undefined) {
      console.log('No questionnaires data found');
      return [];
    }
    
    // If it's already an object, use it directly
    if (typeof allQuestionnairesJson === 'object') {
      console.log('Questionnaires data is already an object:', allQuestionnairesJson);
      if (allQuestionnairesJson && Object.keys(allQuestionnairesJson).length === 0) {
        console.log('Empty questionnaires object found');
        return [];
      }
      return Object.values(allQuestionnairesJson).filter((questionnaire: any) => 
        questionnaire && questionnaire.client && questionnaire.client.email &&
        questionnaire.client.email.toLowerCase() === clientEmail.toLowerCase()
      );
    }
    
    // Now we know it should be a string
    const questionnairesString = String(allQuestionnairesJson);
    console.log('Questionnaires string:', questionnairesString);
    console.log('Length of questionnaires string:', questionnairesString.length);
    
    // Handle empty object string
    if (questionnairesString === '{}' || questionnairesString.trim() === '{}') {
      console.log('Empty questionnaires object string found');
      return [];
    }
    
    // Handle null/undefined string
    if (questionnairesString === 'null' || questionnairesString === 'undefined') {
      console.log('Null/undefined questionnaires string found');
      return [];
    }
    
    // Try to parse JSON safely
    let allQuestionnaires;
    try {
      allQuestionnaires = JSON.parse(questionnairesString);
    } catch (parseError) {
      console.error('Error parsing questionnaires JSON:', parseError);
      console.error('Raw data that failed to parse:', questionnairesString);
      console.error('First 50 characters:', questionnairesString.substring(0, 50));
      console.error('Character codes:', questionnairesString.split('').slice(0, 10).map(c => c.charCodeAt(0)));
      return [];
    }
    
    // Ensure allQuestionnaires is an object
    if (!allQuestionnaires || typeof allQuestionnaires !== 'object') {
      console.log('Questionnaires data is not a valid object:', allQuestionnaires);
      return [];
    }
    
    const filteredQuestionnaires = Object.values(allQuestionnaires).filter((questionnaire: any) => 
      questionnaire && questionnaire.client && questionnaire.client.email &&
      questionnaire.client.email.toLowerCase() === clientEmail.toLowerCase()
    );
    
    console.log(`Found ${filteredQuestionnaires.length} questionnaires for ${clientEmail}`);
    return filteredQuestionnaires;
  } catch (error) {
    console.error('Error getting questionnaires for client:', error);
    return [];
  }
}