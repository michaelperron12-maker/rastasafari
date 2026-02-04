/**
 * Supabase Client Configuration for Rastasafari
 *
 * This module provides the Supabase client instance and TypeScript types
 * for the Rastasafari booking and management system.
 */

import { createClient } from '@supabase/supabase-js';

// =============================================================================
// Environment Variables
// =============================================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validation (only warn in development, don't throw during build)
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  if (!isBuildTime) {
    console.warn(
      'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }
}

// =============================================================================
// TypeScript Types & Enums
// =============================================================================

/** Available tour session times */
export type SessionTime = '9h' | '12h' | '14h30';

/** Booking status */
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

/** Payment status */
export type PaymentStatus = 'pending' | 'paid' | 'refunded';

/** Contact message status */
export type MessageStatus = 'new' | 'read' | 'replied';

/** Review source platform */
export type ReviewSource = 'tripadvisor' | 'viator' | 'google' | 'facebook' | 'direct';

/** Pickup location options */
export type PickupLocation =
  | 'montego_bay'
  | 'negril'
  | 'ocho_rios'
  | 'falmouth'
  | 'runaway_bay'
  | 'other';

// =============================================================================
// Database Row Types
// =============================================================================

export interface Customer {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  booking_number: string;
  customer_id: string;
  date: string;
  session: SessionTime;
  adults: number;
  children: number;
  total_amount: number;
  pickup_location: PickupLocation;
  hotel_address: string;
  special_requests: string | null;
  status: BookingStatus;
  payment_status: PaymentStatus;
  stripe_payment_id: string | null;
  stripe_session_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: MessageStatus;
  replied_at: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  review_date: string;
  source: ReviewSource;
  source_url: string | null;
  is_featured: boolean;
  created_at: string;
}

// =============================================================================
// Insert Types (for creating new records)
// =============================================================================

export interface CustomerInsert {
  full_name: string;
  email: string;
  phone?: string | null;
}

export interface BookingInsert {
  customer_id: string;
  date: string;
  session: SessionTime;
  adults: number;
  children?: number;
  pickup_location: PickupLocation;
  hotel_address: string;
  special_requests?: string | null;
  stripe_session_id?: string | null;
}

export interface ContactMessageInsert {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}

export interface ReviewInsert {
  author: string;
  rating: number;
  comment: string;
  review_date: string;
  source: ReviewSource;
  source_url?: string | null;
  is_featured?: boolean;
}

// =============================================================================
// Update Types (for updating existing records)
// =============================================================================

export interface BookingUpdate {
  date?: string;
  session?: SessionTime;
  adults?: number;
  children?: number;
  pickup_location?: PickupLocation;
  hotel_address?: string;
  special_requests?: string | null;
  status?: BookingStatus;
  payment_status?: PaymentStatus;
  stripe_payment_id?: string | null;
}

export interface ContactMessageUpdate {
  status?: MessageStatus;
  replied_at?: string | null;
}

export interface ReviewUpdate {
  rating?: number;
  comment?: string;
  is_featured?: boolean;
}

// =============================================================================
// Booking with Customer (joined query result)
// =============================================================================

export interface BookingWithCustomer extends Booking {
  customer: Customer;
}

// =============================================================================
// Database Schema Type (for Supabase client)
// =============================================================================

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: Customer;
        Insert: CustomerInsert & { id?: string; created_at?: string };
        Update: Partial<CustomerInsert>;
      };
      bookings: {
        Row: Booking;
        Insert: BookingInsert & {
          id?: string;
          booking_number?: string;
          total_amount?: number;
          status?: BookingStatus;
          payment_status?: PaymentStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: BookingUpdate & { updated_at?: string };
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: ContactMessageInsert & {
          id?: string;
          status?: MessageStatus;
          created_at?: string;
        };
        Update: ContactMessageUpdate;
      };
      reviews: {
        Row: Review;
        Insert: ReviewInsert & { id?: string; created_at?: string };
        Update: ReviewUpdate;
      };
    };
    Views: Record<string, never>;
    Functions: {
      generate_booking_number: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
    Enums: {
      session_time: SessionTime;
      booking_status: BookingStatus;
      payment_status: PaymentStatus;
      message_status: MessageStatus;
      review_source: ReviewSource;
      pickup_location: PickupLocation;
    };
  };
}

// =============================================================================
// Supabase Clients
// =============================================================================

/**
 * Public Supabase client for client-side operations
 * Uses anonymous key with Row Level Security
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

/**
 * Admin Supabase client for server-side operations
 * Uses service role key - bypasses Row Level Security
 * Only use in server-side code (API routes, server components)
 */
export const supabaseAdmin = supabaseServiceKey
  ? createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

/**
 * Get the appropriate Supabase client based on context
 * @param useAdmin - Whether to use the admin client (server-side only)
 */
export function getSupabaseClient(useAdmin: boolean = false) {
  if (useAdmin) {
    if (!supabaseAdmin) {
      throw new Error('Admin client not available. SUPABASE_SERVICE_ROLE_KEY is not set.');
    }
    return supabaseAdmin;
  }
  return supabase;
}

// =============================================================================
// Utility Functions
// =============================================================================

/** Price per person in USD */
export const PRICE_PER_PERSON = 165;

/**
 * Calculate total amount for a booking
 * @param adults - Number of adults
 * @param children - Number of children (same price as adults)
 */
export function calculateTotalAmount(adults: number, children: number = 0): number {
  return (adults + children) * PRICE_PER_PERSON;
}

/**
 * Format booking number for display
 * @param bookingNumber - Raw booking number (e.g., RASTA-2024-001)
 */
export function formatBookingNumber(bookingNumber: string): string {
  return bookingNumber.toUpperCase();
}

/**
 * Parse session time to human-readable format
 * @param session - Session time enum value
 */
export function formatSessionTime(session: SessionTime): string {
  const sessionMap: Record<SessionTime, string> = {
    '9h': '9:00 AM',
    '12h': '12:00 PM',
    '14h30': '2:30 PM',
  };
  return sessionMap[session];
}

/**
 * Format pickup location for display
 * @param location - Pickup location enum value
 */
export function formatPickupLocation(location: PickupLocation): string {
  const locationMap: Record<PickupLocation, string> = {
    montego_bay: 'Montego Bay',
    negril: 'Negril',
    ocho_rios: 'Ocho Rios',
    falmouth: 'Falmouth',
    runaway_bay: 'Runaway Bay',
    other: 'Other Location',
  };
  return locationMap[location];
}

/**
 * Get status badge color class
 * @param status - Booking or payment status
 */
export function getStatusColor(status: BookingStatus | PaymentStatus | MessageStatus): string {
  const colorMap: Record<string, string> = {
    // Booking status
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    // Payment status
    paid: 'bg-green-100 text-green-800',
    refunded: 'bg-gray-100 text-gray-800',
    // Message status
    new: 'bg-blue-100 text-blue-800',
    read: 'bg-gray-100 text-gray-800',
    replied: 'bg-green-100 text-green-800',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Format date for display
 * @param dateString - ISO date string
 * @param locale - Locale for formatting (default: en-US)
 */
export function formatDate(dateString: string, locale: string = 'en-US'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format currency for display
 * @param amount - Amount in USD
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Check if a date is available for booking
 * (Placeholder - implement actual availability logic)
 * @param date - Date to check
 * @param session - Session time
 */
export async function checkAvailability(
  date: string,
  session: SessionTime
): Promise<{ available: boolean; spotsRemaining: number }> {
  const MAX_SPOTS_PER_SESSION = 20;

  const { count, error } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('date', date)
    .eq('session', session)
    .neq('status', 'cancelled');

  if (error) {
    console.error('Error checking availability:', error);
    return { available: false, spotsRemaining: 0 };
  }

  const bookedSpots = count || 0;
  const spotsRemaining = MAX_SPOTS_PER_SESSION - bookedSpots;

  return {
    available: spotsRemaining > 0,
    spotsRemaining: Math.max(0, spotsRemaining),
  };
}

// =============================================================================
// Error Handling
// =============================================================================

export class SupabaseError extends Error {
  code: string;
  details: string | null;
  hint: string | null;

  constructor(
    message: string,
    code: string = 'UNKNOWN',
    details: string | null = null,
    hint: string | null = null
  ) {
    super(message);
    this.name = 'SupabaseError';
    this.code = code;
    this.details = details;
    this.hint = hint;
  }
}

/**
 * Handle Supabase errors and throw a standardized error
 */
export function handleSupabaseError(error: unknown): never {
  if (error && typeof error === 'object' && 'code' in error) {
    const supabaseError = error as { code: string; message: string; details?: string; hint?: string };
    throw new SupabaseError(
      supabaseError.message,
      supabaseError.code,
      supabaseError.details || null,
      supabaseError.hint || null
    );
  }
  throw new SupabaseError('An unexpected error occurred');
}

export default supabase;
