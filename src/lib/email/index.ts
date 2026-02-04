/**
 * Email module for Rastasafari Experience
 *
 * This module provides email templates and sending functionality
 * for booking confirmations, reminders, and contact form responses.
 *
 * @example
 * ```typescript
 * import {
 *   sendBookingConfirmation,
 *   sendBookingReminder,
 *   sendContactReceived
 * } from '@/lib/email';
 *
 * // Send booking confirmation
 * await sendBookingConfirmation({
 *   bookingNumber: 'RSE-2024-001234',
 *   customerName: 'John Smith',
 *   customerEmail: 'john@example.com',
 *   date: 'Saturday, January 15, 2024',
 *   session: 'Morning Tour (8:00 AM)',
 *   participants: 2,
 *   pickupPoint: 'Montego Bay Hotel Zone',
 *   pickupAddress: '123 Hotel Boulevard, Montego Bay',
 *   totalPaid: 330,
 * });
 * ```
 */

// Core email sending function
export {
  sendEmail,
  type EmailConfig,
  type SendEmailParams,
  type EmailResult,
} from './send-email';

// Convenience functions for specific email types
export {
  sendBookingConfirmation,
  sendBookingReminder,
  sendContactReceived,
  sendContactNotification,
  type BookingConfirmationData,
  type BookingReminderData,
  type ContactReceivedData,
} from './send-email';

// Email templates (React components)
export {
  BookingConfirmationEmail,
  generateBookingConfirmationHTML,
} from './templates/booking-confirmation';

export {
  BookingReminderEmail,
  generateBookingReminderHTML,
} from './templates/booking-reminder';

export {
  ContactReceivedEmail,
  generateContactReceivedHTML,
} from './templates/contact-received';

// Re-export default
export { default } from './send-email';

/**
 * Email configuration environment variables:
 *
 * EMAIL_PROVIDER      - 'sendgrid' or 'resend' (default: 'resend')
 * EMAIL_API_KEY       - API key for the chosen provider
 * EMAIL_FROM          - Sender email address (default: 'bookings@rastasafari.com')
 * EMAIL_FROM_NAME     - Sender display name (default: 'Rastasafari Experience')
 * EMAIL_REPLY_TO      - Reply-to email address (default: 'info@rastasafari.com')
 *
 * @example .env
 * ```
 * EMAIL_PROVIDER=resend
 * EMAIL_API_KEY=re_xxxxxxxxxxxxx
 * EMAIL_FROM=bookings@rastasafari.com
 * EMAIL_FROM_NAME=Rastasafari Experience
 * EMAIL_REPLY_TO=info@rastasafari.com
 * ```
 */
