/**
 * Email utilities for Rastasafari API routes
 *
 * This module provides email sending functions specifically designed for the API routes.
 * It uses Resend as the email provider and includes custom templates for:
 * - Booking confirmations
 * - Booking cancellations
 * - Contact form notifications
 * - Admin notifications
 *
 * For more advanced email functionality, see @/lib/email/index.ts
 */

import { Resend } from 'resend';

// Initialize Resend client (use placeholder during build if no API key)
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_key');
const isEmailConfigured = !!process.env.RESEND_API_KEY;

// Email configuration
const FROM_EMAIL = process.env.EMAIL_FROM
  ? `${process.env.EMAIL_FROM_NAME || 'Rastasafari Experience'} <${process.env.EMAIL_FROM}>`
  : 'Rastasafari <noreply@rastasafari.com>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@rastasafari.com';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://rastasafari.com';

// ============================================
// TYPES
// ============================================

export interface BookingEmailData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  sessionTime: string;
  participants: number;
  totalAmount: number;
  specialRequests?: string;
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// ============================================
// EMAIL TEMPLATES
// ============================================

function getBookingConfirmationHtml(data: BookingEmailData): string {
  const formattedDate = new Date(data.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Map session time to display format
  const sessionDisplay: Record<string, string> = {
    '09:00': '9:00 AM',
    '12:00': '12:00 PM',
    '14:30': '2:30 PM',
  };

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de réservation - Rastasafari</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2D5016 0%, #4A7C23 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Rastasafari Experience</h1>
              <p style="color: #C5E063; margin: 10px 0 0; font-size: 16px;">Your Jamaican Adventure Awaits!</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #2D5016; margin: 0 0 20px; font-size: 24px;">Booking Confirmed!</h2>

              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                Hello <strong>${data.firstName} ${data.lastName}</strong>,
              </p>

              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                We're excited to confirm your reservation for an unforgettable Rastasafari Experience!
              </p>

              <!-- Booking Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; margin: 30px 0;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="color: #2D5016; margin: 0 0 20px; font-size: 18px;">Booking Details</h3>

                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #666; font-size: 14px; border-bottom: 1px solid #e0e0e0;">Booking Reference</td>
                        <td style="color: #333; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e0e0e0;">#${data.id.slice(0, 8).toUpperCase()}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-size: 14px; border-bottom: 1px solid #e0e0e0;">Date</td>
                        <td style="color: #333; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e0e0e0;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-size: 14px; border-bottom: 1px solid #e0e0e0;">Session Time</td>
                        <td style="color: #333; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e0e0e0;">${sessionDisplay[data.sessionTime] || data.sessionTime}</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-size: 14px; border-bottom: 1px solid #e0e0e0;">Participants</td>
                        <td style="color: #333; font-size: 14px; font-weight: bold; border-bottom: 1px solid #e0e0e0;">${data.participants} person(s)</td>
                      </tr>
                      <tr>
                        <td style="color: #666; font-size: 14px;">Total Amount</td>
                        <td style="color: #2D5016; font-size: 18px; font-weight: bold;">$${data.totalAmount.toFixed(2)} USD</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${data.specialRequests ? `
              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <strong style="color: #856404;">Special Requests:</strong>
                <p style="color: #856404; margin: 10px 0 0;">${data.specialRequests}</p>
              </div>
              ` : ''}

              <!-- Important Info -->
              <div style="background-color: #e8f5e9; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h4 style="color: #2D5016; margin: 0 0 15px;">Important Information</h4>
                <ul style="color: #333; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>Please arrive 15 minutes before your session time</li>
                  <li>Wear comfortable clothes and bring water</li>
                  <li>Don't forget your camera to capture the moments!</li>
                  <li>Free cancellation up to 24 hours before your session</li>
                </ul>
              </div>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${APP_URL}/reservation/confirmation/${data.id}"
                       style="background: linear-gradient(135deg, #2D5016 0%, #4A7C23 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                      View My Booking
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 30px;">
                Questions? Contact us at <a href="mailto:info@rastasafari.com" style="color: #2D5016;">info@rastasafari.com</a> or call <strong>876-445-7203</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #2D5016; padding: 30px; text-align: center;">
              <p style="color: #C5E063; margin: 0 0 10px; font-size: 14px;">Rastasafari Experience - The Authentic Jamaican Adventure</p>
              <p style="color: #ffffff; margin: 0; font-size: 12px; opacity: 0.8;">
                &copy; ${new Date().getFullYear()} Rastasafari Experience. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function getBookingCancellationHtml(data: BookingEmailData): string {
  const formattedDate = new Date(data.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const sessionDisplay: Record<string, string> = {
    '09:00': '9:00 AM',
    '12:00': '12:00 PM',
    '14:30': '2:30 PM',
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Cancelled - Rastasafari</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2D5016 0%, #4A7C23 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Rastasafari Experience</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #dc3545; margin: 0 0 20px; font-size: 24px;">Booking Cancelled</h2>

              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                Hello <strong>${data.firstName} ${data.lastName}</strong>,
              </p>

              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                Your booking for <strong>${formattedDate}</strong> at <strong>${sessionDisplay[data.sessionTime] || data.sessionTime}</strong> has been cancelled.
              </p>

              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                If you made a payment, your refund will be processed within 5-10 business days.
              </p>

              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
                <p style="color: #666; margin: 0;">Cancelled Booking Reference</p>
                <p style="color: #333; font-size: 20px; font-weight: bold; margin: 10px 0 0;">#${data.id.slice(0, 8).toUpperCase()}</p>
              </div>

              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                We hope to see you soon for a new Rastasafari adventure!
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${APP_URL}/reservation"
                       style="background: linear-gradient(135deg, #2D5016 0%, #4A7C23 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                      Book Again
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #2D5016; padding: 30px; text-align: center;">
              <p style="color: #ffffff; margin: 0; font-size: 12px; opacity: 0.8;">
                &copy; ${new Date().getFullYear()} Rastasafari Experience. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function getContactNotificationHtml(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message - Rastasafari</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2D5016 0%, #4A7C23 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Message</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <table width="100%" cellpadding="10" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px;">
                <tr>
                  <td style="color: #666; font-size: 14px; width: 120px; vertical-align: top;">Name</td>
                  <td style="color: #333; font-size: 14px; font-weight: bold;">${data.name}</td>
                </tr>
                <tr>
                  <td style="color: #666; font-size: 14px; vertical-align: top;">Email</td>
                  <td style="color: #333; font-size: 14px;"><a href="mailto:${data.email}" style="color: #2D5016;">${data.email}</a></td>
                </tr>
                ${data.phone ? `
                <tr>
                  <td style="color: #666; font-size: 14px; vertical-align: top;">Phone</td>
                  <td style="color: #333; font-size: 14px;">${data.phone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="color: #666; font-size: 14px; vertical-align: top;">Subject</td>
                  <td style="color: #333; font-size: 14px; font-weight: bold;">${data.subject}</td>
                </tr>
              </table>

              <div style="margin-top: 30px;">
                <h3 style="color: #2D5016; margin: 0 0 15px;">Message</h3>
                <div style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
                  <p style="color: #333; font-size: 14px; line-height: 1.8; margin: 0; white-space: pre-wrap;">${data.message}</p>
                </div>
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}"
                       style="background: linear-gradient(135deg, #2D5016 0%, #4A7C23 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">
                      Reply
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px; text-align: center;">
              <p style="color: #666; margin: 0; font-size: 12px;">
                Received on ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })} at ${new Date().toLocaleTimeString('en-US')}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function getContactAutoReplyHtml(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Got Your Message - Rastasafari</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2D5016 0%, #4A7C23 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Rastasafari Experience</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #2D5016; margin: 0 0 20px; font-size: 24px;">Thanks for reaching out!</h2>

              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                Hey <strong>${data.name}</strong>,
              </p>

              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                We've received your message about "<strong>${data.subject}</strong>".
              </p>

              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                Our team will get back to you within 24-48 hours.
              </p>

              <div style="background-color: #e8f5e9; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
                <p style="color: #2D5016; margin: 0; font-size: 14px;">
                  In the meantime, check out our amazing experiences!
                </p>
              </div>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${APP_URL}/experiences"
                       style="background: linear-gradient(135deg, #2D5016 0%, #4A7C23 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                      Explore Our Experiences
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #2D5016; padding: 30px; text-align: center;">
              <p style="color: #C5E063; margin: 0 0 10px; font-size: 14px;">Rastasafari Experience - The Authentic Jamaican Adventure</p>
              <p style="color: #ffffff; margin: 0; font-size: 12px; opacity: 0.8;">
                &copy; ${new Date().getFullYear()} Rastasafari Experience. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// ============================================
// EMAIL SENDING FUNCTIONS
// ============================================

/**
 * Send booking confirmation email to customer
 */
export async function sendBookingConfirmation(data: BookingEmailData): Promise<EmailResult> {
  try {
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Booking Confirmed! #${data.id.slice(0, 8).toUpperCase()} - Rastasafari Experience`,
      html: getBookingConfirmationHtml(data),
    });

    if (error) {
      console.error('Failed to send booking confirmation email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: result?.id };
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send booking cancellation email to customer
 */
export async function sendBookingCancellation(data: BookingEmailData): Promise<EmailResult> {
  try {
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Booking Cancelled #${data.id.slice(0, 8).toUpperCase()} - Rastasafari Experience`,
      html: getBookingCancellationHtml(data),
    });

    if (error) {
      console.error('Failed to send booking cancellation email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: result?.id };
  } catch (error) {
    console.error('Error sending booking cancellation email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send contact form notification to admin
 */
export async function sendContactNotification(data: ContactEmailData): Promise<EmailResult> {
  try {
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: data.email,
      subject: `[Contact] ${data.subject} - from ${data.name}`,
      html: getContactNotificationHtml(data),
    });

    if (error) {
      console.error('Failed to send contact notification email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: result?.id };
  } catch (error) {
    console.error('Error sending contact notification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send auto-reply to contact form submitter
 */
export async function sendContactAutoReply(data: ContactEmailData): Promise<EmailResult> {
  try {
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `We Got Your Message! - Rastasafari Experience`,
      html: getContactAutoReplyHtml(data),
    });

    if (error) {
      console.error('Failed to send contact auto-reply email:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: result?.id };
  } catch (error) {
    console.error('Error sending contact auto-reply email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Send booking notification to admin
 */
export async function sendAdminBookingNotification(data: BookingEmailData): Promise<EmailResult> {
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const sessionDisplay: Record<string, string> = {
    '09:00': '9:00 AM',
    '12:00': '12:00 PM',
    '14:30': '2:30 PM',
  };

  try {
    const { data: result, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Booking #${data.id.slice(0, 8).toUpperCase()} - ${data.participants} participant(s)`,
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Customer:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Session:</strong> ${sessionDisplay[data.sessionTime] || data.sessionTime}</p>
        <p><strong>Participants:</strong> ${data.participants}</p>
        <p><strong>Amount:</strong> $${data.totalAmount.toFixed(2)} USD</p>
        ${data.specialRequests ? `<p><strong>Special Requests:</strong> ${data.specialRequests}</p>` : ''}
        <p><a href="${APP_URL}/admin/bookings/${data.id}">View Booking</a></p>
      `,
    });

    if (error) {
      console.error('Failed to send admin booking notification:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: result?.id };
  } catch (error) {
    console.error('Error sending admin booking notification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
