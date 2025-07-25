// src/app/api/proposals/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { availableServices } from '@/data/services';
import { getProposals, createProposal, deleteProposal } from '@/data/proposals';
import { Proposal } from '@/types/proposal';
import { stripe, getBaseUrl } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  console.log('🚀 API: Starting proposal creation...');
  
  try {
    const data = await request.json();
    console.log('📋 API: Received data for client:', data.clientName);
    
    // Generate unique ID
    const proposalId = generateProposalId(data.clientName);
    console.log('🆔 API: Generated proposal ID:', proposalId);
    
    // Calculate expiry date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + data.expiresIn);
    
    // Get selected services
    const selectedServices = data.selectedServices
      .map((serviceId: string) => availableServices[serviceId])
      .filter(Boolean);
    
    console.log('🛠️ API: Selected services:', selectedServices.length);
    
    // Create Stripe checkout session based on payment type
    console.log('💳 API: About to create Stripe session with ID:', proposalId);
    
    const stripeCheckoutUrl = await createStripeCheckoutSession({
      proposalId: proposalId, // Make sure we're passing the right ID
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      cost: data.cost,
      paymentType: data.paymentType,
      downPayment: data.downPayment,
      installmentCount: data.installmentCount,
      services: selectedServices,
    });
    
    console.log('✅ API: Stripe session created, URL received');
    
    // Create proposal object
    const proposalData = {
      client: {
        name: data.clientName,
        email: data.clientEmail,
        company: data.clientCompany || undefined,
        phone: data.clientPhone || undefined,
      },
      services: selectedServices,
      cost: data.cost,
      notes: data.notes || undefined,
      stripeCheckoutUrl,
      expiresAt,
    };
    
    console.log('💾 API: About to save proposal with ID:', proposalId);
    
    // Create and save proposal
    const proposal = await createProposal(proposalData, proposalId); // Add await here
    
    console.log('🎉 API: Proposal created successfully with ID:', proposal.id);
    
    return NextResponse.json({ 
      success: true, 
      proposalId: proposal.id,
      url: `/proposal/${proposal.id}`
    });
    
  } catch (error) {
    console.error('❌ API: Error creating proposal:', error);
    return NextResponse.json(
      { error: 'Failed to create proposal' },
      { status: 500 }
    );
  }
}

async function createStripeCheckoutSession(params: {
  proposalId: string;
  clientName: string;
  clientEmail: string;
  cost: number;
  paymentType: string;
  downPayment?: number;
  installmentCount?: number;
  services: any[];
}) {
  const { proposalId, clientName, clientEmail, cost, paymentType, downPayment, installmentCount, services } = params;
  
  const baseUrl = getBaseUrl();
  
  console.log(`💳 Creating Stripe session for proposal: ${proposalId}`);
  
  try {
    let sessionData: any = {
      customer_email: clientEmail,
      success_url: `${baseUrl}/proposal/${proposalId}?success=true`,
      cancel_url: `${baseUrl}/proposal/${proposalId}?canceled=true`,
      metadata: {
        proposalId: proposalId, // ⭐ This is the key fix!
        clientName,
        paymentType,
      },
    };

    if (paymentType === 'full') {
      // Full payment
      sessionData.line_items = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Amplified Solutions - ${clientName}`,
            description: `Services: ${services.map(s => s.title).join(', ')}`,
          },
          unit_amount: cost * 100, // Stripe expects cents
        },
        quantity: 1,
      }];
      sessionData.mode = 'payment';
      
    } else if (paymentType === 'partial') {
      // Down payment only
      sessionData.line_items = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Down Payment - ${clientName}`,
            description: `Initial payment for services (${Math.round((downPayment! / cost) * 100)}% of total)`,
          },
          unit_amount: downPayment! * 100,
        },
        quantity: 1,
      }];
      sessionData.mode = 'payment';
      
    } else if (paymentType === 'installments') {
      // Subscription for installments
      const installmentAmount = Math.round(cost / installmentCount!);
      
      // Create a product and price for the installment
      const product = await stripe.products.create({
        name: `${clientName} - Service Package`,
        description: `${installmentCount} monthly payments for services`,
      });
      
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: installmentAmount * 100,
        currency: 'usd',
        recurring: {
          interval: 'month',
        },
      });
      
      sessionData.line_items = [{
        price: price.id,
        quantity: 1,
      }];
      sessionData.mode = 'subscription';
      sessionData.subscription_data = {
        metadata: {
          proposalId: proposalId, // ⭐ Also add here for subscriptions
          installmentCount: installmentCount!.toString(),
          totalPayments: installmentCount!.toString(),
        },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionData);
    
    console.log(`✅ Created Stripe session ${session.id} for proposal ${proposalId}`);
    console.log(`📋 Session metadata:`, session.metadata);
    
    return session.url!;
    
  } catch (error) {
    console.error('❌ Stripe error:', error);
    // Fallback to a test URL if Stripe fails
    return `https://checkout.stripe.com/c/pay/test_fallback_${proposalId}`;
  }
}

export async function GET() {
  // Return all proposals for admin view
  const allProposals = Object.values(await getProposals()).map(proposal => ({
    ...proposal,
    // Don't expose sensitive data in list view
    stripeCheckoutUrl: undefined,
  }));
  
  return NextResponse.json(allProposals);
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const proposalId = searchParams.get('id');
    
    if (!proposalId) {
      return NextResponse.json({ error: 'Proposal ID required' }, { status: 400 });
    }
    
    console.log(`🗑️ API: Deleting proposal ${proposalId}`);
    
    const deleted = await deleteProposal(proposalId);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }
    
    console.log(`✅ API: Deleted proposal ${proposalId}`);
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('❌ API: Error deleting proposal:', error);
    return NextResponse.json(
      { error: 'Failed to delete proposal' },
      { status: 500 }
    );
  }
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