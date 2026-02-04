import { NextRequest, NextResponse } from 'next/server';
import { createPaymentIntent, PRICE_PER_PERSON, formatAmount, calculateAmount } from '@/lib/stripe';
import { paymentIntentSchema } from '@/lib/validations';

/**
 * POST /api/payment/create-intent
 * Create a Stripe Payment Intent
 */
export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Stripe secret key is not configured');
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'SERVICE_UNAVAILABLE',
            message: 'Le système de paiement n\'est pas configuré correctement.',
          },
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Validate request body
    const validationResult = paymentIntentSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation des données échouée',
            fieldErrors: validationResult.error.errors.map((err) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          },
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Build metadata for payment intent
    const metadata = {
      customerEmail: data.email,
      customerName: data.customerName || '',
      customerPhone: data.phone || '',
      participants: data.participants.toString(),
      tourDate: data.date || '',
      ...(data.bookingId && { bookingId: data.bookingId }),
    };

    // Create Payment Intent
    const paymentIntentResponse = await createPaymentIntent(
      data.participants,
      metadata as any
    );

    return NextResponse.json({
      success: true,
      data: {
        clientSecret: paymentIntentResponse.clientSecret,
        paymentIntentId: paymentIntentResponse.paymentIntentId,
        amount: paymentIntentResponse.amount,
        currency: paymentIntentResponse.currency,
        formattedAmount: formatAmount(paymentIntentResponse.amount),
        bookingReference: paymentIntentResponse.bookingReference,
        priceBreakdown: {
          pricePerPerson: PRICE_PER_PERSON,
          participants: data.participants,
          subtotal: data.participants * PRICE_PER_PERSON,
          total: data.participants * PRICE_PER_PERSON,
        },
      },
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);

    // Handle specific error types
    if (error instanceof Error && 'code' in error) {
      const stripeError = error as { code: string; message: string; statusCode?: number };
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'PAYMENT_FAILED',
            message: stripeError.message,
            details: { stripeCode: stripeError.code },
          },
        },
        { status: stripeError.statusCode || 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Une erreur est survenue lors de la création du paiement.',
        },
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/payment/create-intent
 * Get payment intent details (for retrieving status)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentIntentId = searchParams.get('id');

    if (!paymentIntentId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'L\'identifiant du paiement est requis.',
          },
        },
        { status: 400 }
      );
    }

    // Import getPaymentIntent dynamically to avoid circular dependencies
    const { getPaymentIntent } = await import('@/lib/stripe');
    const paymentIntent = await getPaymentIntent(paymentIntentId);

    return NextResponse.json({
      success: true,
      data: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        formattedAmount: formatAmount(paymentIntent.amount),
        metadata: paymentIntent.metadata,
        createdAt: new Date(paymentIntent.created * 1000).toISOString(),
      },
    });
  } catch (error) {
    console.error('Error retrieving payment intent:', error);

    if (error instanceof Error && 'code' in error) {
      const stripeError = error as { code: string; message: string; statusCode?: number };
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'PAYMENT_FAILED',
            message: stripeError.message,
            details: { stripeCode: stripeError.code },
          },
        },
        { status: stripeError.statusCode || 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Une erreur est survenue lors de la récupération du paiement.',
        },
      },
      { status: 500 }
    );
  }
}
