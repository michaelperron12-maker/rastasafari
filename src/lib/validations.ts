import { z } from 'zod';

// ============================================
// BOOKING VALIDATIONS
// ============================================

/**
 * Pickup location options
 */
export const pickupLocationEnum = z.enum([
  'montego_bay',
  'negril',
  'ocho_rios',
  'falmouth',
  'runaway_bay',
  'other',
]);

export type PickupLocation = z.infer<typeof pickupLocationEnum>;

/**
 * Session time options
 */
export const sessionTimeEnum = z.enum(['09:00', '12:00', '14:30']);

export type SessionTime = z.infer<typeof sessionTimeEnum>;

/**
 * Booking status options
 */
export const bookingStatusEnum = z.enum(['pending', 'confirmed', 'cancelled']);

export type BookingStatus = z.infer<typeof bookingStatusEnum>;

/**
 * Payment status options
 */
export const paymentStatusEnum = z.enum(['pending', 'paid', 'refunded']);

export type PaymentStatus = z.infer<typeof paymentStatusEnum>;

/**
 * Schema for creating a new booking
 */
export const bookingSchema = z.object({
  // Informations personnelles
  firstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  lastName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  email: z
    .string()
    .email('Adresse email invalide'),
  phone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Numéro de téléphone invalide')
    .min(10, 'Numéro de téléphone trop court'),

  // Détails de la réservation
  date: z
    .string()
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, 'La date doit être dans le futur'),
  sessionTime: sessionTimeEnum,

  // Participants (compatible avec le schéma Supabase)
  adults: z
    .number()
    .int('Le nombre d\'adultes doit être un entier')
    .min(1, 'Au moins 1 adulte requis')
    .max(24, 'Maximum 24 participants par session'),
  children: z
    .number()
    .int('Le nombre d\'enfants doit être un entier')
    .min(0, 'Le nombre d\'enfants ne peut pas être négatif')
    .max(23, 'Maximum 23 enfants par session')
    .optional()
    .default(0),

  // Pickup information
  pickupLocation: pickupLocationEnum.optional().default('montego_bay'),
  hotelAddress: z
    .string()
    .max(500, 'L\'adresse ne peut pas dépasser 500 caractères')
    .optional()
    .default(''),

  // Options
  specialRequests: z
    .string()
    .max(500, 'Les demandes spéciales ne peuvent pas dépasser 500 caractères')
    .optional(),

  // Paiement
  paymentIntentId: z
    .string()
    .optional(),
}).refine(
  (data) => (data.adults + (data.children || 0)) <= 24,
  {
    message: 'Le nombre total de participants ne peut pas dépasser 24',
    path: ['adults'],
  }
);

/**
 * Schema for updating an existing booking
 */
export const bookingUpdateSchema = z.object({
  // Informations personnelles (optionnel pour update)
  firstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères')
    .optional(),
  lastName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .optional(),
  email: z
    .string()
    .email('Adresse email invalide')
    .optional(),
  phone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Numéro de téléphone invalide')
    .min(10, 'Numéro de téléphone trop court')
    .optional(),

  // Détails de la réservation
  date: z
    .string()
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, 'La date doit être dans le futur')
    .optional(),
  sessionTime: sessionTimeEnum.optional(),

  // Participants
  adults: z
    .number()
    .int('Le nombre d\'adultes doit être un entier')
    .min(1, 'Au moins 1 adulte requis')
    .max(24, 'Maximum 24 participants par session')
    .optional(),
  children: z
    .number()
    .int('Le nombre d\'enfants doit être un entier')
    .min(0, 'Le nombre d\'enfants ne peut pas être négatif')
    .max(23, 'Maximum 23 enfants par session')
    .optional(),

  // Pickup information
  pickupLocation: pickupLocationEnum.optional(),
  hotelAddress: z
    .string()
    .max(500, 'L\'adresse ne peut pas dépasser 500 caractères')
    .optional(),

  // Options
  specialRequests: z
    .string()
    .max(500, 'Les demandes spéciales ne peuvent pas dépasser 500 caractères')
    .optional(),

  // Status
  status: bookingStatusEnum.optional(),
  paymentStatus: paymentStatusEnum.optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type BookingUpdateInput = z.infer<typeof bookingUpdateSchema>;

// ============================================
// CONTACT VALIDATIONS
// ============================================

/**
 * Schema for contact form submission
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  email: z
    .string()
    .email('Adresse email invalide'),
  phone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]*$/, 'Numéro de téléphone invalide')
    .optional(),
  subject: z
    .string()
    .min(5, 'Le sujet doit contenir au moins 5 caractères')
    .max(200, 'Le sujet ne peut pas dépasser 200 caractères'),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères'),
});

export type ContactInput = z.infer<typeof contactSchema>;

// ============================================
// PAYMENT VALIDATIONS
// ============================================

/**
 * Schema for creating a payment intent
 */
export const paymentIntentSchema = z.object({
  // Booking reference (optional - can create payment before booking)
  bookingId: z.string().optional(),

  // Participants
  participants: z
    .number()
    .int('Le nombre de participants doit être un entier')
    .min(1, 'Au moins 1 participant requis')
    .max(24, 'Maximum 24 participants'),

  // Customer info
  email: z
    .string()
    .email('Adresse email invalide'),
  customerName: z
    .string()
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .optional(),
  phone: z
    .string()
    .regex(/^[\d\s\-\+\(\)]*$/, 'Numéro de téléphone invalide')
    .optional(),

  // Tour details
  date: z
    .string()
    .optional(),

  // Additional metadata
  metadata: z
    .record(z.string())
    .optional(),
});

export type PaymentIntentInput = z.infer<typeof paymentIntentSchema>;

// ============================================
// AVAILABILITY VALIDATIONS
// ============================================

/**
 * Schema for availability query
 */
export const availabilityQuerySchema = z.object({
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Date invalide'),
  participants: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 1, 'Nombre de participants invalide')
    .optional(),
});

export type AvailabilityQuery = z.infer<typeof availabilityQuerySchema>;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Format Zod validation errors into a simple object
 */
export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    errors[path] = err.message;
  });
  return errors;
}

/**
 * Validate UUID format
 */
export function validateBookingId(id: string): boolean {
  // UUID format validation (any version)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
}

/**
 * Validate booking number format
 */
export function validateBookingNumber(bookingNumber: string): boolean {
  // Format: RASTA-YYYY-XXXXX
  const bookingNumberRegex = /^RASTA-\d{4}-[A-Z0-9]{5}$/i;
  return bookingNumberRegex.test(bookingNumber);
}

/**
 * Sanitize string input (basic XSS prevention)
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format (international)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,20}$/;
  return phoneRegex.test(phone);
}
