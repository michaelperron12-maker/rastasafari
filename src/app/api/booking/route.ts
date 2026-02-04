import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, supabase, calculateTotalAmount } from '@/lib/supabase';
import { bookingSchema, formatZodErrors } from '@/lib/validations';
import { sendBookingConfirmation, sendAdminBookingNotification } from '@/lib/email';

// Use admin client if available, otherwise fall back to public client
const db = supabaseAdmin || supabase;

// Constants
const PRICE_PER_PERSON = 165; // $165 USD per person
const MAX_PARTICIPANTS_PER_SESSION = 24;

/**
 * Generate a unique booking number
 * Format: RASTA-YYYY-XXXXX
 */
function generateBookingNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `RASTA-${year}-${random}`;
}

/**
 * Map session time from API format to database format
 */
function mapSessionTime(time: string): '9h' | '12h' | '14h30' {
  const mapping: Record<string, '9h' | '12h' | '14h30'> = {
    '09:00': '9h',
    '12:00': '12h',
    '14:30': '14h30',
  };
  return mapping[time] || '9h';
}

/**
 * POST /api/booking
 * Create a new booking
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = bookingSchema.safeParse(body);

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
    const sessionDb = mapSessionTime(data.sessionTime);
    const totalParticipants = data.adults + (data.children || 0);

    // Check availability for the requested date and session
    const { count: existingCount, error: countError } = await (db as any)
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('date', data.date)
      .eq('session', sessionDb)
      .neq('status', 'cancelled');

    if (countError) {
      console.error('Error checking availability:', countError);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Erreur lors de la vérification des disponibilités.',
          },
        },
        { status: 500 }
      );
    }

    const bookedSpots = existingCount || 0;
    const availableSpots = MAX_PARTICIPANTS_PER_SESSION - bookedSpots;

    if (totalParticipants > availableSpots) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'SESSION_FULL',
            message: `Il ne reste que ${availableSpots} place(s) disponible(s) pour cette session.`,
            details: { availableSpots },
          },
        },
        { status: 409 }
      );
    }

    // Calculate total amount
    const totalAmount = calculateTotalAmount(data.adults, data.children || 0);

    // First, create or find the customer
    const { data: existingCustomerData } = await (db as any)
      .from('customers')
      .select('id')
      .eq('email', data.email)
      .single();

    let customerId: string;

    const existingCustomer = existingCustomerData as any;
    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      const { data: newCustomer, error: customerError } = await (db as any)
        .from('customers')
        .insert({
          full_name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
        })
        .select('id')
        .single();

      if (customerError || !newCustomer) {
        console.error('Error creating customer:', customerError);
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INTERNAL_ERROR',
              message: 'Erreur lors de la création du client.',
            },
          },
          { status: 500 }
        );
      }
      customerId = newCustomer.id;
    }

    // Create the booking
    const bookingNumber = generateBookingNumber();
    const { data: booking, error: bookingError } = await (db as any)
      .from('bookings')
      .insert({
        booking_number: bookingNumber,
        customer_id: customerId,
        date: data.date,
        session: sessionDb,
        adults: data.adults,
        children: data.children || 0,
        total_amount: totalAmount,
        pickup_location: data.pickupLocation || 'montego_bay',
        hotel_address: data.hotelAddress || '',
        special_requests: data.specialRequests || null,
        status: data.paymentIntentId ? 'confirmed' : 'pending',
        payment_status: data.paymentIntentId ? 'paid' : 'pending',
        stripe_payment_id: data.paymentIntentId || null,
      })
      .select('*')
      .single();

    if (bookingError || !booking) {
      console.error('Error creating booking:', bookingError);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Erreur lors de la création de la réservation.',
          },
        },
        { status: 500 }
      );
    }

    // Send confirmation emails (asynchronously)
    const emailData = {
      id: booking.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      date: booking.date,
      sessionTime: data.sessionTime,
      participants: totalParticipants,
      totalAmount: booking.total_amount,
      specialRequests: booking.special_requests || undefined,
    };

    Promise.all([
      sendBookingConfirmation(emailData),
      sendAdminBookingNotification(emailData),
    ]).catch((error) => {
      console.error('Failed to send booking emails:', error);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Réservation créée avec succès',
        data: {
          booking: {
            id: booking.id,
            bookingNumber: booking.booking_number,
            date: booking.date,
            session: booking.session,
            adults: booking.adults,
            children: booking.children,
            totalAmount: booking.total_amount,
            status: booking.status,
            paymentStatus: booking.payment_status,
            createdAt: booking.created_at,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Une erreur est survenue lors de la création de la réservation.',
        },
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/booking
 * Get all bookings (admin only - should be protected in production)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    const email = searchParams.get('email');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

    // Build query
    let query = db
      .from('bookings')
      .select('*, customer:customers(*)', { count: 'exact' });

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }

    if (date) {
      query = query.eq('date', date);
    }

    // If filtering by email, we need to join with customers
    if (email) {
      const { data: customer } = await (db as any)
        .from('customers')
        .select('id')
        .eq('email', email)
        .single();

      if (customer) {
        query = query.eq('customer_id', customer.id);
      } else {
        // No customer found with this email, return empty result
        return NextResponse.json({
          success: true,
          data: {
            items: [],
            pagination: {
              page,
              pageSize,
              totalItems: 0,
              totalPages: 0,
              hasPrevious: false,
              hasNext: false,
            },
          },
        });
      }
    }

    // Apply pagination and ordering
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data: bookings, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('Error fetching bookings:', error);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Erreur lors de la récupération des réservations.',
          },
        },
        { status: 500 }
      );
    }

    const totalItems = count || 0;
    const totalPages = Math.ceil(totalItems / pageSize);

    return NextResponse.json({
      success: true,
      data: {
        items: bookings || [],
        pagination: {
          page,
          pageSize,
          totalItems,
          totalPages,
          hasPrevious: page > 1,
          hasNext: page < totalPages,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Une erreur est survenue lors de la récupération des réservations.',
        },
      },
      { status: 500 }
    );
  }
}
