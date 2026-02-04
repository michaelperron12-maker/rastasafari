/**
 * Stripe Configuration and Payment Functions
 * Rastasafari Experience - Payment Integration
 *
 * Price: $165 USD per person
 * Currency: USD
 */

import Stripe from 'stripe';

// Server-side Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

// Price constants
export const PRICE_PER_PERSON = 165; // USD
export const CURRENCY = 'usd';

// Payment intent metadata interface
export interface PaymentMetadata {
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  participants: number;
  tourDate: string;
  bookingReference: string;
}

// Payment intent response interface
export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  bookingReference: string;
}

// Error types
export class StripePaymentError extends Error {
  code: string;
  statusCode: number;

  constructor(message: string, code: string = 'payment_error', statusCode: number = 400) {
    super(message);
    this.name = 'StripePaymentError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

/**
 * Generate a unique booking reference
 * Format: RSE-YYYYMMDD-XXXXX (RSE = Rastasafari Experience)
 */
export function generateBookingReference(): string {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `RSE-${dateStr}-${randomStr}`;
}

/**
 * Calculate total amount in cents
 */
export function calculateAmount(participants: number): number {
  return participants * PRICE_PER_PERSON * 100; // Convert to cents
}

/**
 * Format amount for display
 */
export function formatAmount(amountInCents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amountInCents / 100);
}

/**
 * Create a Payment Intent
 * This is called server-side to initialize the payment
 */
export async function createPaymentIntent(
  participants: number,
  metadata: Omit<PaymentMetadata, 'bookingReference'>
): Promise<PaymentIntentResponse> {
  try {
    // Validate participants
    if (participants < 1 || participants > 20) {
      throw new StripePaymentError(
        'Number of participants must be between 1 and 20',
        'invalid_participants',
        400
      );
    }

    const amount = calculateAmount(participants);
    const bookingReference = generateBookingReference();

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: CURRENCY,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        ...metadata,
        participants: participants.toString(),
        bookingReference,
        productName: 'Rastasafari Experience Tour',
        pricePerPerson: PRICE_PER_PERSON.toString(),
      },
      receipt_email: metadata.customerEmail,
      description: `Rastasafari Experience - ${participants} participant(s) - ${metadata.tourDate}`,
    });

    if (!paymentIntent.client_secret) {
      throw new StripePaymentError(
        'Failed to create payment intent: No client secret returned',
        'client_secret_missing',
        500
      );
    }

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount,
      currency: CURRENCY,
      bookingReference,
    };
  } catch (error) {
    if (error instanceof StripePaymentError) {
      throw error;
    }

    if (error instanceof Stripe.errors.StripeError) {
      throw new StripePaymentError(
        error.message,
        error.code || 'stripe_error',
        error.statusCode || 500
      );
    }

    throw new StripePaymentError(
      'An unexpected error occurred while creating the payment',
      'unknown_error',
      500
    );
  }
}

/**
 * Confirm Payment Intent (server-side verification)
 * This is used to verify the payment status after client-side confirmation
 */
export async function confirmPayment(
  paymentIntentId: string
): Promise<{
  success: boolean;
  status: string;
  bookingReference: string | null;
  metadata: Stripe.Metadata | null;
}> {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const isSuccessful = paymentIntent.status === 'succeeded';

    return {
      success: isSuccessful,
      status: paymentIntent.status,
      bookingReference: paymentIntent.metadata?.bookingReference || null,
      metadata: paymentIntent.metadata || null,
    };
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      throw new StripePaymentError(
        error.message,
        error.code || 'stripe_error',
        error.statusCode || 500
      );
    }

    throw new StripePaymentError(
      'Failed to confirm payment status',
      'confirmation_error',
      500
    );
  }
}

/**
 * Retrieve Payment Intent details
 */
export async function getPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      throw new StripePaymentError(
        error.message,
        error.code || 'stripe_error',
        error.statusCode || 500
      );
    }

    throw new StripePaymentError(
      'Failed to retrieve payment details',
      'retrieval_error',
      500
    );
  }
}

/**
 * Handle Stripe webhook events
 * Used for processing payment confirmations and other events
 */
export async function handleWebhookEvent(
  payload: string | Buffer,
  signature: string
): Promise<Stripe.Event> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new StripePaymentError(
      'Webhook secret is not configured',
      'webhook_config_error',
      500
    );
  }

  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
      throw new StripePaymentError(
        'Invalid webhook signature',
        'webhook_signature_error',
        400
      );
    }

    throw new StripePaymentError(
      'Failed to process webhook',
      'webhook_error',
      500
    );
  }
}

/**
 * Cancel a Payment Intent
 */
export async function cancelPaymentIntent(
  paymentIntentId: string,
  reason?: string
): Promise<Stripe.PaymentIntent> {
  try {
    return await stripe.paymentIntents.cancel(paymentIntentId, {
      cancellation_reason: 'requested_by_customer',
    });
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      throw new StripePaymentError(
        error.message,
        error.code || 'stripe_error',
        error.statusCode || 500
      );
    }

    throw new StripePaymentError(
      'Failed to cancel payment',
      'cancellation_error',
      500
    );
  }
}

export default stripe;
