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
      // Note: For recurring prices, we cannot use customer_creation with prefilled_email
      // We'll need to handle customer info differently
      const paymentLinkParams: any = {
        line_items: [
          {
            price: price.id,
            quantity: 1
          }
        ],
        metadata: {
          proposalId,
          customerEmail: customerEmail || '' // Store email in metadata instead
        },
        after_completion: {
          type: 'redirect',
          redirect: {
            url: `${getBaseUrl()}/proposal/${proposalId}?success=true`
          }
        }
      };

      // For subscriptions, we can't prefill email, but we can still collect it
      if (customerEmail) {
        // Add phone number collection to get more customer info
        paymentLinkParams.phone_number_collection = {
          enabled: true
        };
      }

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

      // For one-time payments, we can use customer_creation with prefilled email
      const paymentLinkParams: any = {
        line_items: [
          {
            price: price.id,
            quantity: 1
          }
        ],
        metadata: {
          proposalId
        },
        after_completion: {
          type: 'redirect',
          redirect: {
            url: `${getBaseUrl()}/proposal/${proposalId}?success=true`
          }
        }
      };

      // Only add customer_creation for one-time payments
      if (customerEmail) {
        paymentLinkParams.customer_creation = 'always';
        paymentLinkParams.prefilled_email = customerEmail;
      }

      paymentLink = await stripe.paymentLinks.create(paymentLinkParams);
    }

    console.log(`✅ Created payment link for proposal ${proposalId}:`, {
      id: paymentLink.id,
      url: paymentLink.url,
      isSubscription,
      amount
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