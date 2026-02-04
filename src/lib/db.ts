/**
 * Database Operations for Rastasafari
 *
 * This module provides CRUD operations for all database tables using Supabase.
 * All functions use the admin client for server-side operations.
 */

import {
  supabase,
  supabaseAdmin,
  getSupabaseClient,
  handleSupabaseError,
  calculateTotalAmount,
  type Customer,
  type CustomerInsert,
  type Booking,
  type BookingInsert,
  type BookingUpdate,
  type BookingWithCustomer,
  type ContactMessage,
  type ContactMessageInsert,
  type ContactMessageUpdate,
  type Review,
  type ReviewInsert,
  type ReviewUpdate,
  type SessionTime,
  type BookingStatus,
  type PaymentStatus,
  type MessageStatus,
} from './supabase';

// =============================================================================
// Customer Operations
// =============================================================================

/**
 * Create a new customer
 */
export async function createCustomer(data: CustomerInsert): Promise<Customer> {
  const client = getSupabaseClient(true);

  const { data: customer, error } = await (client as any)
    .from('customers')
    .insert(data)
    .select()
    .single();

  if (error) handleSupabaseError(error);
  return customer;
}

/**
 * Get customer by ID
 */
export async function getCustomerById(id: string): Promise<Customer | null> {
  const client = getSupabaseClient(true);

  const { data: customer, error } = await (client as any)
    .from('customers')
    .select()
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') handleSupabaseError(error);
  return customer;
}

/**
 * Get customer by email
 */
export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const client = getSupabaseClient(true);

  const { data: customer, error } = await (client as any)
    .from('customers')
    .select()
    .eq('email', email.toLowerCase())
    .single();

  if (error && error.code !== 'PGRST116') handleSupabaseError(error);
  return customer;
}

/**
 * Get or create customer by email
 */
export async function getOrCreateCustomer(data: CustomerInsert): Promise<Customer> {
  // Check if customer exists
  const existing = await getCustomerByEmail(data.email);
  if (existing) {
    return existing;
  }

  // Create new customer
  return createCustomer({
    ...data,
    email: data.email.toLowerCase(),
  });
}

/**
 * Get all customers with pagination
 */
export async function getCustomers(
  page: number = 1,
  limit: number = 20
): Promise<{ customers: Customer[]; total: number }> {
  const client = getSupabaseClient(true);
  const offset = (page - 1) * limit;

  const { data: customers, error, count } = await (client as any)
    .from('customers')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) handleSupabaseError(error);
  return { customers: customers || [], total: count || 0 };
}

// =============================================================================
// Booking Operations
// =============================================================================

/**
 * Create a new booking
 */
export async function createBooking(data: BookingInsert): Promise<Booking> {
  const client = getSupabaseClient(true);

  const { data: booking, error } = await (client as any)
    .from('bookings')
    .insert({
      ...data,
      // Total amount will be calculated by trigger, but we can also set it here
      total_amount: calculateTotalAmount(data.adults, data.children || 0),
    })
    .select()
    .single();

  if (error) handleSupabaseError(error);
  return booking;
}

/**
 * Get booking by ID
 */
export async function getBookingById(id: string): Promise<Booking | null> {
  const client = getSupabaseClient(true);

  const { data: booking, error } = await (client as any)
    .from('bookings')
    .select()
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') handleSupabaseError(error);
  return booking;
}

/**
 * Get booking by booking number
 */
export async function getBookingByNumber(bookingNumber: string): Promise<Booking | null> {
  const client = getSupabaseClient(true);

  const { data: booking, error } = await (client as any)
    .from('bookings')
    .select()
    .eq('booking_number', bookingNumber.toUpperCase())
    .single();

  if (error && error.code !== 'PGRST116') handleSupabaseError(error);
  return booking;
}

/**
 * Get booking with customer details
 */
export async function getBookingWithCustomer(id: string): Promise<BookingWithCustomer | null> {
  const client = getSupabaseClient(true);

  const { data: booking, error } = await (client as any)
    .from('bookings')
    .select(`
      *,
      customer:customers(*)
    `)
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') handleSupabaseError(error);
  return booking as BookingWithCustomer | null;
}

/**
 * Get booking with customer by booking number
 */
export async function getBookingWithCustomerByNumber(
  bookingNumber: string
): Promise<BookingWithCustomer | null> {
  const client = getSupabaseClient(true);

  const { data: booking, error } = await (client as any)
    .from('bookings')
    .select(`
      *,
      customer:customers(*)
    `)
    .eq('booking_number', bookingNumber.toUpperCase())
    .single();

  if (error && error.code !== 'PGRST116') handleSupabaseError(error);
  return booking as BookingWithCustomer | null;
}

/**
 * Update a booking
 */
export async function updateBooking(id: string, data: BookingUpdate): Promise<Booking> {
  const client = getSupabaseClient(true);

  const { data: booking, error } = await (client as any)
    .from('bookings')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) handleSupabaseError(error);
  return booking;
}

/**
 * Update booking by Stripe session ID
 */
export async function updateBookingByStripeSession(
  stripeSessionId: string,
  data: BookingUpdate
): Promise<Booking> {
  const client = getSupabaseClient(true);

  const { data: booking, error } = await (client as any)
    .from('bookings')
    .update(data)
    .eq('stripe_session_id', stripeSessionId)
    .select()
    .single();

  if (error) handleSupabaseError(error);
  return booking;
}

/**
 * Get all bookings with filters and pagination
 */
export async function getBookings(options: {
  page?: number;
  limit?: number;
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  date?: string;
  customerId?: string;
  startDate?: string;
  endDate?: string;
} = {}): Promise<{ bookings: BookingWithCustomer[]; total: number }> {
  const client = getSupabaseClient(true);
  const { page = 1, limit = 20, status, paymentStatus, date, customerId, startDate, endDate } = options;
  const offset = (page - 1) * limit;

  let query = client
    .from('bookings')
    .select(`
      *,
      customer:customers(*)
    `, { count: 'exact' });

  // Apply filters
  if (status) query = query.eq('status', status);
  if (paymentStatus) query = query.eq('payment_status', paymentStatus);
  if (date) query = query.eq('date', date);
  if (customerId) query = query.eq('customer_id', customerId);
  if (startDate) query = query.gte('date', startDate);
  if (endDate) query = query.lte('date', endDate);

  const { data: bookings, error, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) handleSupabaseError(error);
  return { bookings: (bookings || []) as BookingWithCustomer[], total: count || 0 };
}

/**
 * Get bookings for a specific date and session
 */
export async function getBookingsForSession(
  date: string,
  session: SessionTime
): Promise<Booking[]> {
  const client = getSupabaseClient(true);

  const { data: bookings, error } = await (client as any)
    .from('bookings')
    .select()
    .eq('date', date)
    .eq('session', session)
    .neq('status', 'cancelled');

  if (error) handleSupabaseError(error);
  return bookings || [];
}

/**
 * Get upcoming bookings (confirmed, not yet past)
 */
export async function getUpcomingBookings(limit: number = 10): Promise<BookingWithCustomer[]> {
  const client = getSupabaseClient(true);
  const today = new Date().toISOString().split('T')[0];

  const { data: bookings, error } = await (client as any)
    .from('bookings')
    .select(`
      *,
      customer:customers(*)
    `)
    .eq('status', 'confirmed')
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(limit);

  if (error) handleSupabaseError(error);
  return (bookings || []) as BookingWithCustomer[];
}

/**
 * Cancel a booking
 */
export async function cancelBooking(id: string): Promise<Booking> {
  return updateBooking(id, { status: 'cancelled' });
}

/**
 * Confirm a booking (after payment)
 */
export async function confirmBooking(
  id: string,
  stripePaymentId: string
): Promise<Booking> {
  return updateBooking(id, {
    status: 'confirmed',
    payment_status: 'paid',
    stripe_payment_id: stripePaymentId,
  });
}

// =============================================================================
// Contact Message Operations
// =============================================================================

/**
 * Create a new contact message
 */
export async function createContactMessage(
  data: ContactMessageInsert
): Promise<ContactMessage> {
  // Use public client for contact form submissions (RLS allows inserts)
  const { data: message, error } = await (supabase as any)
    .from('contact_messages')
    .insert({
      ...data,
      email: data.email.toLowerCase(),
    })
    .select()
    .single();

  if (error) handleSupabaseError(error);
  return message;
}

/**
 * Get contact message by ID
 */
export async function getContactMessageById(id: string): Promise<ContactMessage | null> {
  const client = getSupabaseClient(true);

  const { data: message, error } = await (client as any)
    .from('contact_messages')
    .select()
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') handleSupabaseError(error);
  return message;
}

/**
 * Update contact message
 */
export async function updateContactMessage(
  id: string,
  data: ContactMessageUpdate
): Promise<ContactMessage> {
  const client = getSupabaseClient(true);

  const { data: message, error } = await (client as any)
    .from('contact_messages')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) handleSupabaseError(error);
  return message;
}

/**
 * Mark message as read
 */
export async function markMessageAsRead(id: string): Promise<ContactMessage> {
  return updateContactMessage(id, { status: 'read' });
}

/**
 * Mark message as replied
 */
export async function markMessageAsReplied(id: string): Promise<ContactMessage> {
  return updateContactMessage(id, {
    status: 'replied',
    replied_at: new Date().toISOString(),
  });
}

/**
 * Get all contact messages with filters and pagination
 */
export async function getContactMessages(options: {
  page?: number;
  limit?: number;
  status?: MessageStatus;
} = {}): Promise<{ messages: ContactMessage[]; total: number }> {
  const client = getSupabaseClient(true);
  const { page = 1, limit = 20, status } = options;
  const offset = (page - 1) * limit;

  let query = client
    .from('contact_messages')
    .select('*', { count: 'exact' });

  if (status) query = query.eq('status', status);

  const { data: messages, error, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) handleSupabaseError(error);
  return { messages: messages || [], total: count || 0 };
}

/**
 * Get unread message count
 */
export async function getUnreadMessageCount(): Promise<number> {
  const client = getSupabaseClient(true);

  const { count, error } = await (client as any)
    .from('contact_messages')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');

  if (error) handleSupabaseError(error);
  return count || 0;
}

// =============================================================================
// Review Operations
// =============================================================================

/**
 * Create a new review
 */
export async function createReview(data: ReviewInsert): Promise<Review> {
  const client = getSupabaseClient(true);

  const { data: review, error } = await (client as any)
    .from('reviews')
    .insert(data)
    .select()
    .single();

  if (error) handleSupabaseError(error);
  return review;
}

/**
 * Get review by ID
 */
export async function getReviewById(id: string): Promise<Review | null> {
  const client = getSupabaseClient(true);

  const { data: review, error } = await (client as any)
    .from('reviews')
    .select()
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') handleSupabaseError(error);
  return review;
}

/**
 * Update a review
 */
export async function updateReview(id: string, data: ReviewUpdate): Promise<Review> {
  const client = getSupabaseClient(true);

  const { data: review, error } = await (client as any)
    .from('reviews')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) handleSupabaseError(error);
  return review;
}

/**
 * Delete a review
 */
export async function deleteReview(id: string): Promise<void> {
  const client = getSupabaseClient(true);

  const { error } = await (client as any)
    .from('reviews')
    .delete()
    .eq('id', id);

  if (error) handleSupabaseError(error);
}

/**
 * Get featured reviews (public)
 */
export async function getFeaturedReviews(limit: number = 10): Promise<Review[]> {
  // Use public client - RLS allows reading featured reviews
  const { data: reviews, error } = await (supabase as any)
    .from('reviews')
    .select()
    .eq('is_featured', true)
    .order('review_date', { ascending: false })
    .limit(limit);

  if (error) handleSupabaseError(error);
  return reviews || [];
}

/**
 * Get all reviews with filters and pagination
 */
export async function getReviews(options: {
  page?: number;
  limit?: number;
  source?: string;
  minRating?: number;
  isFeatured?: boolean;
} = {}): Promise<{ reviews: Review[]; total: number }> {
  const client = getSupabaseClient(true);
  const { page = 1, limit = 20, source, minRating, isFeatured } = options;
  const offset = (page - 1) * limit;

  let query = client
    .from('reviews')
    .select('*', { count: 'exact' });

  if (source) query = query.eq('source', source);
  if (minRating) query = query.gte('rating', minRating);
  if (isFeatured !== undefined) query = query.eq('is_featured', isFeatured);

  const { data: reviews, error, count } = await query
    .order('review_date', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) handleSupabaseError(error);
  return { reviews: reviews || [], total: count || 0 };
}

/**
 * Toggle review featured status
 */
export async function toggleReviewFeatured(id: string): Promise<Review> {
  const review = await getReviewById(id);
  if (!review) {
    throw new Error('Review not found');
  }

  return updateReview(id, { is_featured: !review.is_featured });
}

/**
 * Get review statistics
 */
export async function getReviewStats(): Promise<{
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Record<number, number>;
}> {
  const client = getSupabaseClient(true);

  const { data: reviews, error } = await (client as any)
    .from('reviews')
    .select('rating');

  if (error) handleSupabaseError(error);

  const ratings = reviews || [];
  const totalReviews = ratings.length;
  const averageRating = totalReviews > 0
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 0;

  const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ratings.forEach(r => {
    ratingDistribution[r.rating] = (ratingDistribution[r.rating] || 0) + 1;
  });

  return {
    totalReviews,
    averageRating: Math.round(averageRating * 10) / 10,
    ratingDistribution,
  };
}

// =============================================================================
// Dashboard Statistics
// =============================================================================

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<{
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  unreadMessages: number;
  averageRating: number;
}> {
  const client = getSupabaseClient(true);

  // Get booking counts
  const [
    { count: totalBookings },
    { count: confirmedBookings },
    { count: pendingBookings },
  ] = await Promise.all([
    client.from('bookings').select('*', { count: 'exact', head: true }),
    client.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'confirmed'),
    client.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);

  // Get total revenue from confirmed bookings
  const { data: revenueData } = await (client as any)
    .from('bookings')
    .select('total_amount')
    .eq('payment_status', 'paid');

  const totalRevenue = revenueData?.reduce((sum, b) => sum + Number(b.total_amount), 0) || 0;

  // Get unread messages
  const unreadMessages = await getUnreadMessageCount();

  // Get average rating
  const { averageRating } = await getReviewStats();

  return {
    totalBookings: totalBookings || 0,
    confirmedBookings: confirmedBookings || 0,
    pendingBookings: pendingBookings || 0,
    totalRevenue,
    unreadMessages,
    averageRating,
  };
}

// =============================================================================
// Booking Availability
// =============================================================================

/**
 * Get availability for a date range
 */
export async function getAvailability(
  startDate: string,
  endDate: string
): Promise<Map<string, Map<SessionTime, number>>> {
  const client = getSupabaseClient(true);
  const MAX_SPOTS = 20;

  const { data: bookings, error } = await (client as any)
    .from('bookings')
    .select('date, session, adults, children')
    .gte('date', startDate)
    .lte('date', endDate)
    .neq('status', 'cancelled');

  if (error) handleSupabaseError(error);

  // Build availability map
  const availability = new Map<string, Map<SessionTime, number>>();

  // Initialize all dates with full availability
  const start = new Date(startDate);
  const end = new Date(endDate);
  const sessions: SessionTime[] = ['9h', '12h', '14h30'];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const sessionMap = new Map<SessionTime, number>();
    sessions.forEach(s => sessionMap.set(s, MAX_SPOTS));
    availability.set(dateStr, sessionMap);
  }

  // Subtract booked spots
  bookings?.forEach(booking => {
    const dateMap = availability.get(booking.date);
    if (dateMap) {
      const currentSpots = dateMap.get(booking.session as SessionTime) || MAX_SPOTS;
      const bookedSpots = booking.adults + booking.children;
      dateMap.set(booking.session as SessionTime, Math.max(0, currentSpots - bookedSpots));
    }
  });

  return availability;
}

// =============================================================================
// Export all types
// =============================================================================

export type {
  Customer,
  CustomerInsert,
  Booking,
  BookingInsert,
  BookingUpdate,
  BookingWithCustomer,
  ContactMessage,
  ContactMessageInsert,
  ContactMessageUpdate,
  Review,
  ReviewInsert,
  ReviewUpdate,
  SessionTime,
  BookingStatus,
  PaymentStatus,
  MessageStatus,
};
