import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin, supabase } from '@/lib/supabase';
import { sendBookingConfirmation, sendAdminBookingNotification } from '@/lib/email';

// Use admin client if available
const db = supabaseAdmin || supabase;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * Map database session time to API format
 */
function mapSessionTimeToApi(session: string): string {
  const mapping: Record<string, string> = {
    '9h': '09:00',
    '12h': '12:00',
    '14h30': '14:30',
  };
  return mapping[session] || '09:00';
}

/**
 * POST /api/payment/webhook
 * Handle Stripe webhook events
 */
export async function POST(request: NextRequest) {
  try {
    // Get the raw body
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('Missing stripe-signature header');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    if (!webhookSecret) {
      console.error('Webhook secret is not configured');
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle specific event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;

      case 'payment_intent.canceled':
        await handlePaymentIntentCanceled(event.data.object as Stripe.PaymentIntent);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle successful payment
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id);

  const bookingReference = paymentIntent.metadata.bookingReference;
  const bookingId = paymentIntent.metadata.bookingId;

  // Try to find booking by ID or reference
  let booking;
  if (bookingId) {
    const { data } = await (db as any)
      .from('bookings')
      .select('*, customer:customers(*)')
      .eq('id', bookingId)
      .single();
    booking = data;
  } else if (bookingReference) {
    const { data } = await (db as any)
      .from('bookings')
      .select('*, customer:customers(*)')
      .eq('booking_number', bookingReference)
      .single();
    booking = data;
  }

  if (!booking) {
    console.log('No booking found for payment, metadata:', paymentIntent.metadata);
    return;
  }

  try {
    // Update booking status to confirmed and payment status to paid
    const { error: updateError } = await (db as any)
      .from('bookings')
      .update({
        status: 'confirmed',
        payment_status: 'paid',
        stripe_payment_id: paymentIntent.id,
      })
      .eq('id', booking.id);

    if (updateError) {
      console.error('Failed to update booking:', updateError);
      return;
    }

    console.log(`Booking ${booking.id} confirmed after payment`);

    // Send confirmation emails
    const customer = booking.customer as { full_name: string; email: string } | null;
    if (customer) {
      const [firstName, ...lastNameParts] = customer.full_name.split(' ');
      const lastName = lastNameParts.join(' ');

      const emailData = {
        id: booking.id,
        firstName,
        lastName,
        email: customer.email,
        date: booking.date,
        sessionTime: mapSessionTimeToApi(booking.session),
        participants: booking.adults + booking.children,
        totalAmount: booking.total_amount,
        specialRequests: booking.special_requests || undefined,
      };

      await Promise.all([
        sendBookingConfirmation(emailData),
        sendAdminBookingNotification(emailData),
      ]).catch((emailError) => {
        console.error('Failed to send confirmation emails:', emailError);
      });

      console.log(`Confirmation emails sent for booking ${booking.id}`);
    }
  } catch (error) {
    console.error(`Failed to process payment success for booking:`, error);
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment failed:', paymentIntent.id);

  const bookingId = paymentIntent.metadata.bookingId;
  const bookingReference = paymentIntent.metadata.bookingReference;

  // Try to find booking
  let booking;
  if (bookingId) {
    const { data } = await (db as any)
      .from('bookings')
      .select('id')
      .eq('id', bookingId)
      .single();
    booking = data;
  } else if (bookingReference) {
    const { data } = await (db as any)
      .from('bookings')
      .select('id')
      .eq('booking_number', bookingReference)
      .single();
    booking = data;
  }

  if (!booking) {
    console.log('No booking found for failed payment');
    return;
  }

  try {
    // Keep status as pending but note the failure
    console.log(`Payment failed for booking ${booking.id}: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`);

    // TODO: Send payment failure notification email to customer
  } catch (error) {
    console.error('Failed to handle payment failure:', error);
  }
}

/**
 * Handle refund
 */
async function handleChargeRefunded(charge: Stripe.Charge) {
  console.log('Charge refunded:', charge.id);

  const paymentIntentId = charge.payment_intent as string;

  if (!paymentIntentId) {
    console.log('No payment intent ID in charge, skipping');
    return;
  }

  try {
    // Find booking by payment intent ID
    const { data: booking } = await (db as any)
      .from('bookings')
      .select('id')
      .eq('stripe_payment_id', paymentIntentId)
      .single();

    if (!booking) {
      console.log('No booking found for payment intent:', paymentIntentId);
      return;
    }

    // Update payment status to refunded
    const updateData: Record<string, unknown> = {
      payment_status: 'refunded',
    };

    // If fully refunded, also cancel the booking
    if (charge.refunded) {
      updateData.status = 'cancelled';
    }

    await (db as any)
      .from('bookings')
      .update(updateData)
      .eq('id', booking.id);

    console.log(`Booking ${booking.id} updated with refund information`);

    // TODO: Send refund confirmation email to customer
  } catch (error) {
    console.error('Failed to process refund webhook:', error);
  }
}

/**
 * Handle cancelled payment intent
 */
async function handlePaymentIntentCanceled(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment intent canceled:', paymentIntent.id);

  const bookingId = paymentIntent.metadata.bookingId;
  const bookingReference = paymentIntent.metadata.bookingReference;

  // Try to find booking
  let booking;
  if (bookingId) {
    const { data } = await (db as any)
      .from('bookings')
      .select('id, status')
      .eq('id', bookingId)
      .single();
    booking = data;
  } else if (bookingReference) {
    const { data } = await (db as any)
      .from('bookings')
      .select('id, status')
      .eq('booking_number', bookingReference)
      .single();
    booking = data;
  }

  if (booking && booking.status === 'pending') {
    console.log(`Payment for booking ${booking.id} was canceled`);
    // Optionally: cancel the booking or leave it for retry
  }
}

// Disable body parsing - we need the raw body for signature verification
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
