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
      paymentLink = await stripe.paymentLinks.create({
        line_items: [
          {
            price: price.id,
            quantity: 1
          }
        ],
        metadata: {
          proposalId,
          ...(customerEmail && { customerEmail })
        },
        after_completion: {
          type: 'redirect',
          redirect: {
            url: `${getBaseUrl()}/proposal/${proposalId}?success=true`
          }
        },
        customer_creation: 'always'
      });

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

      paymentLink = await stripe.paymentLinks.create({
        line_items: [
          {
            price: price.id,
            quantity: 1
          }
        ],
        metadata: {
          proposalId,
          ...(customerEmail && { customerEmail })
        },
        after_completion: {
          type: 'redirect',
          redirect: {
            url: `${getBaseUrl()}/proposal/${proposalId}?success=true`
          }
        },
        customer_creation: 'always'
      });
    }

    // Store the payment link URL in your database if needed
    // await updateProposal(proposalId, { paymentLinkId: paymentLink.id });

    return NextResponse.json({ 
      url: paymentLink.url,
      id: paymentLink.id 
    });

  } catch (error) {
    console.error('Error creating payment link:', error);
    return NextResponse.json(
      { error: 'Failed to create payment link' },
      { status: 500 }
    );
  }
}