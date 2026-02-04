import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, supabase } from '@/lib/supabase';

// Use admin client if available, otherwise fall back to public client
const db = supabaseAdmin || supabase;

// Constants
const SESSION_TIMES = ['9h', '12h', '14h30'] as const;
const MAX_PARTICIPANTS_PER_SESSION = 24;

type SessionTime = (typeof SESSION_TIMES)[number];

interface SessionAvailability {
  time: string;
  timeDisplay: string;
  label: string;
  available: boolean;
  spotsRemaining: number;
  totalCapacity: number;
  bookedCount: number;
}

interface DayAvailability {
  date: string;
  dayOfWeek: string;
  isAvailable: boolean;
  sessions: SessionAvailability[];
}

/**
 * Map database session time to display format
 */
function getSessionDisplay(session: SessionTime): { time: string; display: string; label: string } {
  const mapping: Record<SessionTime, { time: string; display: string; label: string }> = {
    '9h': { time: '09:00', display: '9:00 AM', label: 'Matin (9h00)' },
    '12h': { time: '12:00', display: '12:00 PM', label: 'Midi (12h00)' },
    '14h30': { time: '14:30', display: '2:30 PM', label: 'Après-midi (14h30)' },
  };
  return mapping[session];
}

/**
 * GET /api/availability
 * Check availability for a specific date or date range
 *
 * Query params:
 * - date: Single date (YYYY-MM-DD)
 * - startDate: Start of range (YYYY-MM-DD)
 * - endDate: End of range (YYYY-MM-DD)
 * - participants: Number of participants to check for (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const singleDate = searchParams.get('date');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const participantsParam = searchParams.get('participants');

    const requestedParticipants = participantsParam
      ? parseInt(participantsParam, 10)
      : 1;

    // Validate participants
    if (isNaN(requestedParticipants) || requestedParticipants < 1) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'Le nombre de participants doit être un entier positif.',
          },
        },
        { status: 400 }
      );
    }

    if (requestedParticipants > MAX_PARTICIPANTS_PER_SESSION) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: `Le nombre maximum de participants par session est de ${MAX_PARTICIPANTS_PER_SESSION}.`,
          },
        },
        { status: 400 }
      );
    }

    // Handle single date query
    if (singleDate) {
      const dateObj = new Date(singleDate);

      if (isNaN(dateObj.getTime())) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'BAD_REQUEST',
              message: 'Le format de date doit être YYYY-MM-DD.',
            },
          },
          { status: 400 }
        );
      }

      // Check if date is in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dateObj < today) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'BAD_REQUEST',
              message: 'Impossible de vérifier la disponibilité pour une date passée.',
            },
          },
          { status: 400 }
        );
      }

      const availability = await getDateAvailability(singleDate, requestedParticipants);

      return NextResponse.json({
        success: true,
        data: availability,
      });
    }

    // Handle date range query
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'BAD_REQUEST',
              message: 'Le format des dates doit être YYYY-MM-DD.',
            },
          },
          { status: 400 }
        );
      }

      if (startDateObj > endDateObj) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'BAD_REQUEST',
              message: 'La date de début doit être antérieure à la date de fin.',
            },
          },
          { status: 400 }
        );
      }

      // Limit range to 31 days
      const daysDiff = Math.ceil(
        (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff > 31) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'BAD_REQUEST',
              message: 'La plage de dates ne peut pas dépasser 31 jours.',
            },
          },
          { status: 400 }
        );
      }

      const availabilities: DayAvailability[] = [];
      const currentDate = new Date(startDateObj);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      while (currentDate <= endDateObj) {
        // Skip past dates
        if (currentDate >= today) {
          const dateString = currentDate.toISOString().split('T')[0] as string as string;
          const availability = await getDateAvailability(dateString, requestedParticipants);
          availabilities.push(availability);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return NextResponse.json({
        success: true,
        data: {
          periodStart: startDate,
          periodEnd: endDate,
          requestedParticipants,
          availability: availabilities,
        },
      });
    }

    // No valid date parameters provided - return next 7 days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const availabilities: DayAvailability[] = [];
    const currentDate = new Date(today);

    while (currentDate < nextWeek) {
      const dateString = currentDate.toISOString().split('T')[0] as string;
      const availability = await getDateAvailability(dateString, requestedParticipants);
      availabilities.push(availability);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return NextResponse.json({
      success: true,
      data: {
        periodStart: today.toISOString().split('T')[0],
        periodEnd: nextWeek.toISOString().split('T')[0],
        requestedParticipants,
        availability: availabilities,
      },
    });
  } catch (error) {
    console.error('Error checking availability:', error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Une erreur est survenue lors de la vérification des disponibilités.',
        },
      },
      { status: 500 }
    );
  }
}

/**
 * Get availability for a specific date
 */
async function getDateAvailability(
  dateString: string,
  requestedParticipants: number
): Promise<DayAvailability> {
  const date = new Date(dateString);

  // Get day of week in French
  const dayOfWeek = date.toLocaleDateString('fr-FR', { weekday: 'long' });

  // Get all bookings for this date
  const { data: bookings, error } = await (db as any)
    .from('bookings')
    .select('session, adults, children')
    .eq('date', dateString)
    .neq('status', 'cancelled');

  if (error) {
    console.error('Error fetching bookings for date:', error);
    throw error;
  }

  // Calculate availability for each session
  const sessions: SessionAvailability[] = SESSION_TIMES.map((session) => {
    const sessionInfo = getSessionDisplay(session);

    // Count participants for this session
    const sessionBookings = (bookings || []).filter((b: any) => b.session === session);
    const bookedCount = sessionBookings.reduce(
      (sum: number, b: any) => sum + (b.adults || 0) + (b.children || 0),
      0
    );
    const spotsRemaining = MAX_PARTICIPANTS_PER_SESSION - bookedCount;

    // Check if requested participants can fit
    const available = spotsRemaining >= requestedParticipants;

    return {
      time: sessionInfo.time,
      timeDisplay: sessionInfo.display,
      label: sessionInfo.label,
      available,
      spotsRemaining: Math.max(0, spotsRemaining),
      totalCapacity: MAX_PARTICIPANTS_PER_SESSION,
      bookedCount,
    };
  });

  // Check if any session is available
  const isAvailable = sessions.some((s) => s.available);

  return {
    date: dateString,
    dayOfWeek,
    isAvailable,
    sessions,
  };
}
