// src/app/api/create-payment-link/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe, getBaseUrl } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { 
      proposalId, 
      amount, 
      description, 
      customerEmail,
      isSubscription = false,
      subscriptionInterval = 'month' // 'month' or 'year'
    } = await request.json();

    if (!proposalId || !amount || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let paymentLink;

    if (isSubscription) {
      // Create a product and price for subscription
      const product = await stripe.products.create({
        name: description,
        metadata: {
          proposalId
        }
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
        recurring: {
          interval: subscriptionInterval
        },
        metadata: {
          proposalId
        }
      });

      // Create payment link for subscription
      const paymentLinkParams: any = {
        line_items: [
          {
            price: price.id,
            quantity: 1
          }
        ],
        metadata: {
          proposalId,
          customerEmail: customerEmail || '' // Store email in metadata for reference
        },
        after_completion: {
          type: 'redirect',
          redirect: {
            url: `${getBaseUrl()}/proposal/${proposalId}?success=true`
          }
        }
      };

      // IMPORTANT: For recurring prices (subscriptions), we CANNOT use customer_creation
      // Stripe will automatically collect customer email for subscriptions
      // Do NOT add customer_creation for recurring prices - it will cause an error
      
      // Optional: Enable phone number collection for subscriptions
      paymentLinkParams.phone_number_collection = {
        enabled: false // Set to true if you want to collect phone numbers
      };

      paymentLink = await stripe.paymentLinks.create(paymentLinkParams);

    } else {
      // Create one-time payment link
      const price = await stripe.prices.create({
        unit_amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
        product_data: {
          name: description,
          metadata: {
            proposalId
          }
        },
        metadata: {
          proposalId
        }
      });

      // For one-time payments
      const paymentLinkParams: any = {
        line_items: [
          {
            price: price.id,
            quantity: 1
          }
        ],
        metadata: {
          proposalId,
          customerEmail: customerEmail || '' // Store email in metadata for reference
        },
        after_completion: {
          type: 'redirect',
          redirect: {
            url: `${getBaseUrl()}/proposal/${proposalId}?success=true`
          }
        }
      };

      // Always create customer for one-time payments too
      // This ensures we collect email addresses
      paymentLinkParams.customer_creation = 'always';
      
      // Note: Stripe Payment Links API does NOT support prefilled_email
      // The customer will need to enter their email on the payment page
      // If you need to prefill email, you should use Checkout Sessions instead

      paymentLink = await stripe.paymentLinks.create(paymentLinkParams);
    }

    console.log(`✅ Created payment link for proposal ${proposalId}:`, {
      id: paymentLink.id,
      url: paymentLink.url,
      isSubscription,
      amount,
      customerEmail: customerEmail || 'not provided'
    });

    return NextResponse.json({ 
      url: paymentLink.url,
      id: paymentLink.id 
    });

  } catch (error) {
    console.error('Error creating payment link:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    }
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create payment link' },
      { status: 500 }
    );
  }
}