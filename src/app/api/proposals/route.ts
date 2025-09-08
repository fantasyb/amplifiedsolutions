// src/app/api/proposals/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { availableServices } from '@/data/services';
import { getProposals, createProposal, deleteProposal } from '@/data/proposals';
import { Proposal, Service } from '@/types/proposal';
import { stripe, getBaseUrl } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  console.log('🚀 API: Starting proposal creation...');
  
  try {
    const data = await request.json();
    console.log('📋 API: Received data for client:', data.clientName);
    console.log('💰 API: Payment data:', {
      paymentType: data.paymentType,
      isRecurring: data.isRecurring,
      downPayment: data.downPayment,
      installmentCount: data.installmentCount
    });
    
    // Generate unique ID
    const proposalId = generateProposalId(data.clientName);
    console.log('🆔 API: Generated proposal ID:', proposalId);
    
    // Calculate expiry date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + data.expiresIn);
    
    // Get selected predefined services
    const selectedServices = data.selectedServices
      .map((serviceId: string) => availableServices[serviceId])
      .filter(Boolean);
    
    // Combine predefined and custom services
    const customServices = data.customServices || [];
    const allServices = [...selectedServices, ...customServices];
    
    console.log('🛠️ API: Total services:', allServices.length);
    console.log('🛠️ API: Predefined services:', selectedServices.length);
    console.log('🛠️ API: Custom services:', customServices.length);
    
    // Calculate total cost if custom services are included
    let totalCost = data.cost;
    if (customServices.length > 0) {
      // Option 1: Use the provided total cost from the form
      // This is what we're doing - trusting the form's calculation
      
      // Option 2: Recalculate from services (uncomment if you want server-side validation)
      // totalCost = selectedServices.reduce((sum: number, s: Service) => sum + (s.price || 0), 0) +
      //             customServices.reduce((sum: number, s: Service) => sum + (s.price || 0), 0);
      
      console.log('💵 API: Total cost with custom services:', totalCost);
    }
    
    // Create Stripe checkout session based on payment type
    console.log('💳 API: About to create Stripe session with ID:', proposalId);
    
    const stripeCheckoutUrl = await createStripeCheckoutSession({
      proposalId: proposalId,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      cost: totalCost,
      paymentType: data.paymentType,
      downPayment: data.downPayment,
      installmentCount: data.installmentCount,
      isRecurring: data.isRecurring,
      services: allServices,
    });
    
    console.log('✅ API: Stripe session created, URL received');
    
    // Create proposal object with all services
    const proposalData = {
      client: {
        name: data.clientName,
        email: data.clientEmail,
        company: data.clientCompany || undefined,
        phone: data.clientPhone || undefined,
      },
      services: allServices, // Store all services (predefined + custom)
      cost: totalCost,
      notes: data.notes || undefined,
      stripeCheckoutUrl,
      expiresAt,
      isRecurring: data.isRecurring || false,
      paymentType: data.paymentType || 'full',
      downPayment: data.downPayment,
      installmentCount: data.installmentCount,
    };
    
    console.log('💾 API: About to save proposal with ID:', proposalId);
    console.log('💾 API: Proposal includes:', {
      totalServices: proposalData.services.length,
      customServices: proposalData.services.filter((s: Service) => s.isCustom).length,
      isRecurring: proposalData.isRecurring,
      paymentType: proposalData.paymentType,
      totalCost: proposalData.cost
    });
    
    // Create and save proposal
    const proposal = await createProposal(proposalData, proposalId);
    
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
  isRecurring?: boolean;
  services: Service[];
}) {
  const { proposalId, clientName, clientEmail, cost, paymentType, downPayment, installmentCount, isRecurring, services } = params;
  
  const baseUrl = getBaseUrl();
  
  console.log(`💳 Creating Stripe session for proposal: ${proposalId}`);
  
  // Create detailed service descriptions
  const serviceDescriptions = services.map(s => {
    const customTag = s.isCustom ? ' (Custom)' : '';
    const priceTag = s.price ? ` - $${s.price}` : '';
    return `${s.title}${customTag}${priceTag}`;
  });
  
  const serviceDescriptionShort = serviceDescriptions.join(', ');
  const serviceDescriptionLong = serviceDescriptions.join('\n• ');
  
  // Count custom vs standard services
  const customServiceCount = services.filter(s => s.isCustom).length;
  const standardServiceCount = services.filter(s => !s.isCustom).length;
  
  try {
    let sessionData: any = {
      customer_email: clientEmail,
      success_url: `${baseUrl}/proposal/${proposalId}?success=true`,
      cancel_url: `${baseUrl}/proposal/${proposalId}?canceled=true`,
      metadata: {
        proposalId: proposalId,
        clientName,
        paymentType,
        isRecurring: isRecurring ? 'true' : 'false',
        hasCustomServices: customServiceCount > 0 ? 'true' : 'false',
        customServiceCount: customServiceCount.toString(),
        standardServiceCount: standardServiceCount.toString(),
      },
    };

    if (paymentType === 'full') {
      if (isRecurring) {
        // Create recurring subscription for full payment
        const product = await stripe.products.create({
          name: `${clientName} - Monthly Service Package`,
          description: `Recurring monthly service package including:\n• ${serviceDescriptionLong}`,
        });
        
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: cost * 100,
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
            proposalId: proposalId,
            isRecurring: 'true',
            serviceCount: services.length.toString(),
          },
        };
      } else {
        // One-time full payment
        sessionData.line_items = [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Amplified Solutions - ${clientName}`,
              description: `Service Package (${services.length} services):\n• ${serviceDescriptionLong}`,
            },
            unit_amount: cost * 100,
          },
          quantity: 1,
        }];
        sessionData.mode = 'payment';
      }
      
    } else if (paymentType === 'partial') {
      // Down payment only (one-time)
      const downPaymentPercentage = Math.round((downPayment! / cost) * 100);
      
      sessionData.line_items = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Down Payment - ${clientName}`,
            description: `Initial payment (${downPaymentPercentage}% of total $${cost})\nFor services:\n• ${serviceDescriptionLong}`,
          },
          unit_amount: downPayment! * 100,
        },
        quantity: 1,
      }];
      sessionData.mode = 'payment';
      sessionData.metadata.remainingBalance = (cost - downPayment!).toString();
      
    } else if (paymentType === 'installments') {
      // Subscription for installments
      const installmentAmount = Math.round(cost / installmentCount!);
      
      const product = await stripe.products.create({
        name: `${clientName} - Service Package (${installmentCount} Installments)`,
        description: `${installmentCount} monthly payments for:\n• ${serviceDescriptionLong}`,
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
          proposalId: proposalId,
          installmentCount: installmentCount!.toString(),
          totalPayments: installmentCount!.toString(),
          isRecurring: isRecurring ? 'true' : 'false',
          currentPayment: '1',
        },
      };
      
      // Add trial period if you want to delay first payment
      // sessionData.subscription_data.trial_period_days = 7;
    }

    const session = await stripe.checkout.sessions.create(sessionData);
    
    console.log(`✅ Created Stripe session ${session.id} for proposal ${proposalId}`);
    console.log(`📋 Session details:`, {
      mode: sessionData.mode,
      paymentType,
      amount: paymentType === 'partial' ? downPayment : cost,
      serviceCount: services.length,
      customServices: customServiceCount,
    });
    
    return session.url!;
    
  } catch (error) {
    console.error('❌ Stripe error:', error);
    // Fallback to a test URL if Stripe fails (for development)
    return `https://checkout.stripe.com/c/pay/test_fallback_${proposalId}`;
  }
}

export async function GET() {
  try {
    // Return all proposals for admin view
    const allProposals = Object.values(await getProposals()).map(proposal => ({
      ...proposal,
      // Don't expose sensitive data in list view
      stripeCheckoutUrl: undefined,
      // Add summary info for custom services
      customServiceCount: proposal.services?.filter((s: Service) => s.isCustom).length || 0,
      standardServiceCount: proposal.services?.filter((s: Service) => !s.isCustom).length || 0,
    }));
    
    console.log(`📊 API: Returning ${allProposals.length} proposals`);
    
    return NextResponse.json(allProposals);
  } catch (error) {
    console.error('❌ API: Error fetching proposals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch proposals' },
      { status: 500 }
    );
  }
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
  
  const timestamp = Date.now().toString(36);
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  
  return `${nameSlug}-${timestamp}-${randomSuffix}`;
}