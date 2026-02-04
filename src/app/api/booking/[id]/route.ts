import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, supabase } from '@/lib/supabase';
import { bookingUpdateSchema } from '@/lib/validations';
import { sendBookingCancellation, sendBookingConfirmation } from '@/lib/email';

// Use admin client if available, otherwise fall back to public client
const db = supabaseAdmin || supabase;

// Constants
const CANCELLATION_HOURS_LIMIT = 24; // Free cancellation up to 24 hours before
const MAX_PARTICIPANTS_PER_SESSION = 24;
const PRICE_PER_PERSON = 165;

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
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
 * Map session time from database format to API format
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
 * Validate UUID format
 */
function isValidUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

/**
 * GET /api/booking/[id]
 * Get a specific booking by ID or booking number
 */
export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // Query by ID or booking number
    let query = db
      .from('bookings')
      .select('*, customer:customers(*)');

    if (isValidUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('booking_number', id.toUpperCase());
    }

    const { data, error } = await query.single();
    const booking = data as any;

    if (error || !booking) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Aucune réservation trouvée avec cet identifiant.',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: booking.id,
        bookingNumber: booking.booking_number,
        date: booking.date,
        session: mapSessionTimeToApi(booking.session),
        adults: booking.adults,
        children: booking.children,
        totalAmount: booking.total_amount,
        pickupLocation: booking.pickup_location,
        hotelAddress: booking.hotel_address,
        specialRequests: booking.special_requests,
        status: booking.status,
        paymentStatus: booking.payment_status,
        customer: booking.customer,
        createdAt: booking.created_at,
        updatedAt: booking.updated_at,
      },
    });
  } catch (error) {
    console.error('Error fetching booking:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Une erreur est survenue lors de la récupération de la réservation.',
        },
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/booking/[id]
 * Update a booking
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate request body
    const validationResult = bookingUpdateSchema.safeParse(body);

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

    // Find existing booking
    let query = db.from('bookings').select('*');

    if (isValidUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('booking_number', id.toUpperCase());
    }

    const { data: existingBookingData, error: fetchError } = await query.single();
    const existingBooking = existingBookingData as any;

    if (fetchError || !existingBooking) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Aucune réservation trouvée avec cet identifiant.',
          },
        },
        { status: 404 }
      );
    }

    // Check if booking can be modified
    if (existingBooking.status === 'cancelled') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'Cette réservation a été annulée et ne peut plus être modifiée.',
          },
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // If changing date/session/participants, check availability
    if (data.date || data.sessionTime || data.adults !== undefined || data.children !== undefined) {
      const targetDate = data.date || existingBooking.date;
      const targetSession = data.sessionTime ? mapSessionTime(data.sessionTime) : existingBooking.session;
      const targetAdults = data.adults ?? existingBooking.adults;
      const targetChildren = data.children ?? existingBooking.children;
      const totalParticipants = targetAdults + targetChildren;

      const { count: existingCount } = await db
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('date', targetDate)
        .eq('session', targetSession)
        .neq('status', 'cancelled')
        .neq('id', existingBooking.id);

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
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {};

    if (data.date) updateData.date = data.date;
    if (data.sessionTime) updateData.session = mapSessionTime(data.sessionTime);
    if (data.adults !== undefined) updateData.adults = data.adults;
    if (data.children !== undefined) updateData.children = data.children;
    if (data.pickupLocation) updateData.pickup_location = data.pickupLocation;
    if (data.hotelAddress) updateData.hotel_address = data.hotelAddress;
    if (data.specialRequests !== undefined) updateData.special_requests = data.specialRequests;
    if (data.status) updateData.status = data.status;
    if (data.paymentStatus) updateData.payment_status = data.paymentStatus;

    // Recalculate total if participants changed
    if (data.adults !== undefined || data.children !== undefined) {
      const adults = data.adults ?? existingBooking.adults;
      const children = data.children ?? existingBooking.children;
      updateData.total_amount = (adults + children) * PRICE_PER_PERSON;
    }

    // Update the booking
    const { data: updatedBookingData, error: updateError } = await (db as any)
      .from('bookings')
      .update(updateData)
      .eq('id', existingBooking.id)
      .select('*, customer:customers(*)')
      .single();
    const updatedBooking = updatedBookingData as any;

    if (updateError || !updatedBooking) {
      console.error('Error updating booking:', updateError);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Erreur lors de la mise à jour de la réservation.',
          },
        },
        { status: 500 }
      );
    }

    // If status changed to confirmed, send confirmation email
    if (data.status === 'confirmed' && existingBooking.status !== 'confirmed') {
      const customer = updatedBooking.customer as { full_name: string; email: string } | null;
      if (customer) {
        const [firstName, ...lastNameParts] = customer.full_name.split(' ');
        const lastName = lastNameParts.join(' ');

        const emailData = {
          id: updatedBooking.id,
          firstName,
          lastName,
          email: customer.email,
          date: updatedBooking.date,
          sessionTime: mapSessionTimeToApi(updatedBooking.session),
          participants: updatedBooking.adults + updatedBooking.children,
          totalAmount: updatedBooking.total_amount,
          specialRequests: updatedBooking.special_requests || undefined,
        };

        sendBookingConfirmation(emailData).catch((error) => {
          console.error('Failed to send confirmation email:', error);
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Réservation mise à jour avec succès',
      data: {
        id: updatedBooking.id,
        bookingNumber: updatedBooking.booking_number,
        date: updatedBooking.date,
        session: mapSessionTimeToApi(updatedBooking.session),
        adults: updatedBooking.adults,
        children: updatedBooking.children,
        totalAmount: updatedBooking.total_amount,
        status: updatedBooking.status,
        paymentStatus: updatedBooking.payment_status,
        updatedAt: updatedBooking.updated_at,
      },
    });
  } catch (error) {
    console.error('Error updating booking:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Une erreur est survenue lors de la mise à jour de la réservation.',
        },
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/booking/[id]
 * Cancel a booking (with 24h policy)
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // Find existing booking
    let query = db.from('bookings').select('*, customer:customers(*)');

    if (isValidUUID(id)) {
      query = query.eq('id', id);
    } else {
      query = query.eq('booking_number', id.toUpperCase());
    }

    const { data: bookingData, error: fetchError } = await query.single();
    const booking = bookingData as any;

    if (fetchError || !booking) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Aucune réservation trouvée avec cet identifiant.',
          },
        },
        { status: 404 }
      );
    }

    // Check if booking is already cancelled
    if (booking.status === 'cancelled') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'Cette réservation a déjà été annulée.',
          },
        },
        { status: 400 }
      );
    }

    // Check 24-hour cancellation policy
    const sessionTimeMap: Record<string, { hours: number; minutes: number }> = {
      '9h': { hours: 9, minutes: 0 },
      '12h': { hours: 12, minutes: 0 },
      '14h30': { hours: 14, minutes: 30 },
    };

    const bookingDate = new Date(booking.date);
    const sessionTime = sessionTimeMap[booking.session] || { hours: 9, minutes: 0 };
    bookingDate.setHours(sessionTime.hours, sessionTime.minutes, 0, 0);

    const now = new Date();
    const hoursUntilBooking = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    let refundEligible = true;
    let refundMessage = 'Remboursement complet';

    if (hoursUntilBooking < CANCELLATION_HOURS_LIMIT) {
      refundEligible = false;
      refundMessage = `Annulation tardive (moins de ${CANCELLATION_HOURS_LIMIT}h avant la session). Aucun remboursement ne sera effectué selon notre politique d'annulation.`;
    }

    // Update booking status to cancelled
    const { data: cancelledBookingData, error: updateError } = await (db as any)
      .from('bookings')
      .update({
        status: 'cancelled',
      })
      .eq('id', booking.id)
      .select('*')
      .single();
    const cancelledBooking = cancelledBookingData as any;

    if (updateError || !cancelledBooking) {
      console.error('Error cancelling booking:', updateError);
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Erreur lors de l\'annulation de la réservation.',
          },
        },
        { status: 500 }
      );
    }

    // Send cancellation email
    const customer = booking.customer as { full_name: string; email: string } | null;
    if (customer) {
      const [firstName, ...lastNameParts] = customer.full_name.split(' ');
      const lastName = lastNameParts.join(' ');

      const emailData = {
        id: cancelledBooking.id,
        firstName,
        lastName,
        email: customer.email,
        date: cancelledBooking.date,
        sessionTime: mapSessionTimeToApi(cancelledBooking.session),
        participants: cancelledBooking.adults + cancelledBooking.children,
        totalAmount: cancelledBooking.total_amount,
      };

      sendBookingCancellation(emailData).catch((error) => {
        console.error('Failed to send cancellation email:', error);
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Réservation annulée avec succès',
      data: {
        id: cancelledBooking.id,
        bookingNumber: cancelledBooking.booking_number,
        status: cancelledBooking.status,
        refundEligible,
        refundMessage,
      },
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Une erreur est survenue lors de l\'annulation de la réservation.',
        },
      },
      { status: 500 }
    );
  }
}
