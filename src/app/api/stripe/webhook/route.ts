import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { updateProposalStatus } from '@/data/proposals';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  
  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }
  
  try {
    console.log(`Received event: ${event.type}`);
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const proposalId = session.metadata?.proposalId;
        
        console.log(`💳 Checkout completed for proposal: ${proposalId}`);
        console.log(`Session metadata:`, session.metadata);
        
        if (proposalId) {
          const updated = await updateProposalStatus(proposalId, 'accepted');
          if (updated) {
            console.log(`✅ Proposal ${proposalId} marked as accepted`);
          }
        } else {
          console.log(`❌ No proposalId in session metadata`);
        }
        break;
      
      case 'customer.subscription.created':
        const subscription = event.data.object;
        const subscriptionProposalId = subscription.metadata?.proposalId;
        
        console.log(`🔄 Subscription created for proposal: ${subscriptionProposalId}`);
        
        if (subscriptionProposalId) {
          const updated = await updateProposalStatus(subscriptionProposalId, 'accepted');
          if (updated) {
            console.log(`✅ Proposal ${subscriptionProposalId} marked as accepted`);
          }
        }
        break;
      
      // New events for payment links
      case 'payment_link.created':
        console.log(`🔗 Payment link created:`, event.data.object.id);
        break;
      
      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        const invoiceProposalId = invoice.metadata?.proposalId;
        
        console.log(`💰 Invoice paid for proposal: ${invoiceProposalId}`);
        
        if (invoiceProposalId) {
          const updated = await updateProposalStatus(invoiceProposalId, 'accepted');
          if (updated) {
            console.log(`✅ Proposal ${invoiceProposalId} marked as accepted via invoice`);
          }
        }
        break;
      
      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        console.log(`❌ Invoice payment failed:`, failedInvoice.id);
        // You might want to notify the customer or update proposal status
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}