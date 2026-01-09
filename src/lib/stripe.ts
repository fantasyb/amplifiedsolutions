// ============================================
// 1. UPDATE: src/lib/stripe.ts
// ============================================
import Stripe from 'stripe';

// Server-side Stripe instance (using default API version)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Client-side Stripe configuration
export const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

// Auto-detect base URL based on environment
export const getBaseUrl = () => {
  // Always use production URL in production environment
  if (process.env.NODE_ENV === 'production') {
    return 'https://www.amplifiedsolutions.com';
  }

  // For Vercel preview deployments (non-production)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Development
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
};
