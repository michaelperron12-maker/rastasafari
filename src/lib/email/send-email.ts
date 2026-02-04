/**
 * Email sending service for Rastasafari Experience
 * Supports both SendGrid and Resend as email providers
 */

import { generateBookingConfirmationHTML } from './templates/booking-confirmation';
import { generateBookingReminderHTML } from './templates/booking-reminder';
import { generateContactReceivedHTML } from './templates/contact-received';

// Types
export interface EmailConfig {
  provider: 'sendgrid' | 'resend';
  apiKey: string;
  fromEmail: string;
  fromName: string;
  replyTo?: string;
}

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
  attachments?: Array<{
    filename: string;
    content: string;
    contentType?: string;
  }>;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Default configuration - should be overridden with environment variables
const defaultConfig: EmailConfig = {
  provider: (process.env.EMAIL_PROVIDER as 'sendgrid' | 'resend') || 'resend',
  apiKey: process.env.EMAIL_API_KEY || '',
  fromEmail: process.env.EMAIL_FROM || 'bookings@rastasafari.com',
  fromName: process.env.EMAIL_FROM_NAME || 'Rastasafari Experience',
  replyTo: process.env.EMAIL_REPLY_TO || 'info@rastasafari.com',
};

/**
 * Send email using SendGrid API
 */
async function sendWithSendGrid(
  params: SendEmailParams,
  config: EmailConfig
): Promise<EmailResult> {
  const url = 'https://api.sendgrid.com/v3/mail/send';

  const toAddresses = Array.isArray(params.to) ? params.to : [params.to];

  const payload = {
    personalizations: [
      {
        to: toAddresses.map((email) => ({ email })),
        ...(params.cc && { cc: params.cc.map((email) => ({ email })) }),
        ...(params.bcc && { bcc: params.bcc.map((email) => ({ email })) }),
      },
    ],
    from: {
      email: config.fromEmail,
      name: config.fromName,
    },
    reply_to: {
      email: params.replyTo || config.replyTo || config.fromEmail,
    },
    subject: params.subject,
    content: [
      ...(params.text ? [{ type: 'text/plain', value: params.text }] : []),
      { type: 'text/html', value: params.html },
    ],
    ...(params.attachments && {
      attachments: params.attachments.map((att) => ({
        filename: att.filename,
        content: att.content,
        type: att.contentType || 'application/octet-stream',
        disposition: 'attachment',
      })),
    }),
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const messageId = response.headers.get('X-Message-Id') || undefined;
      return { success: true, messageId };
    }

    const errorData = await response.json().catch(() => ({}));
    return {
      success: false,
      error: `SendGrid error: ${response.status} - ${JSON.stringify(errorData)}`,
    };
  } catch (error) {
    return {
      success: false,
      error: `SendGrid request failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Send email using Resend API
 */
async function sendWithResend(
  params: SendEmailParams,
  config: EmailConfig
): Promise<EmailResult> {
  const url = 'https://api.resend.com/emails';

  const toAddresses = Array.isArray(params.to) ? params.to : [params.to];

  const payload = {
    from: `${config.fromName} <${config.fromEmail}>`,
    to: toAddresses,
    subject: params.subject,
    html: params.html,
    ...(params.text && { text: params.text }),
    ...(params.replyTo && { reply_to: params.replyTo }),
    ...((params.replyTo || config.replyTo) && {
      reply_to: params.replyTo || config.replyTo,
    }),
    ...(params.cc && { cc: params.cc }),
    ...(params.bcc && { bcc: params.bcc }),
    ...(params.attachments && {
      attachments: params.attachments.map((att) => ({
        filename: att.filename,
        content: att.content,
      })),
    }),
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok && data.id) {
      return { success: true, messageId: data.id };
    }

    return {
      success: false,
      error: `Resend error: ${data.message || JSON.stringify(data)}`,
    };
  } catch (error) {
    return {
      success: false,
      error: `Resend request failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Main email sending function
 * Automatically selects the configured provider
 */
export async function sendEmail(
  params: SendEmailParams,
  config?: Partial<EmailConfig>
): Promise<EmailResult> {
  const finalConfig: EmailConfig = { ...defaultConfig, ...config };

  // Validate configuration
  if (!finalConfig.apiKey) {
    return {
      success: false,
      error: 'Email API key not configured. Set EMAIL_API_KEY environment variable.',
    };
  }

  if (!finalConfig.fromEmail) {
    return {
      success: false,
      error: 'From email not configured. Set EMAIL_FROM environment variable.',
    };
  }

  // Send based on provider
  switch (finalConfig.provider) {
    case 'sendgrid':
      return sendWithSendGrid(params, finalConfig);
    case 'resend':
      return sendWithResend(params, finalConfig);
    default:
      return {
        success: false,
        error: `Unknown email provider: ${finalConfig.provider}`,
      };
  }
}

// ==========================================
// Convenience functions for specific emails
// ==========================================

export interface BookingConfirmationData {
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  session: string;
  participants: number;
  pickupPoint: string;
  pickupAddress: string;
  pricePerPerson?: number;
  totalPaid: number;
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmation(
  data: BookingConfirmationData,
  config?: Partial<EmailConfig>
): Promise<EmailResult> {
  const html = generateBookingConfirmationHTML({
    ...data,
    pricePerPerson: data.pricePerPerson || 165,
  });

  return sendEmail(
    {
      to: data.customerEmail,
      subject: `Booking Confirmed! #${data.bookingNumber} - Rastasafari Experience`,
      html,
      text: `
Your booking is confirmed!

Booking Number: ${data.bookingNumber}
Date: ${data.date}
Session: ${data.session}
Participants: ${data.participants}
Pickup: ${data.pickupPoint}
Address: ${data.pickupAddress}
Total Paid: $${data.totalPaid}

Questions? Call us at 876-445-7203

One Love,
Rastasafari Experience
      `.trim(),
    },
    config
  );
}

export interface BookingReminderData {
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  session: string;
  participants: number;
  pickupPoint: string;
  pickupAddress: string;
  pickupTime: string;
  weather?: {
    condition: string;
    temperature: string;
    humidity: string;
    icon: string;
  };
}

/**
 * Send booking reminder email (24h before)
 */
export async function sendBookingReminder(
  data: BookingReminderData,
  config?: Partial<EmailConfig>
): Promise<EmailResult> {
  const html = generateBookingReminderHTML(data);

  return sendEmail(
    {
      to: data.customerEmail,
      subject: `Reminder: Your Adventure is Tomorrow! - Rastasafari Experience`,
      html,
      text: `
Reminder: Your adventure is tomorrow!

Hey ${data.customerName},

This is a friendly reminder that your Rastasafari Experience is TOMORROW!

Booking: ${data.bookingNumber}
Date: ${data.date}
Session: ${data.session}
Pickup Time: ${data.pickupTime}
Pickup Point: ${data.pickupPoint}
Address: ${data.pickupAddress}

Don't forget to bring:
- Swimwear
- Sunscreen
- Water shoes
- Towel
- Camera
- Cash for tips/souvenirs

Questions? Call us at 876-445-7203

See you tomorrow!
Rastasafari Experience
      `.trim(),
    },
    config
  );
}

export interface ContactReceivedData {
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  ticketNumber?: string;
  estimatedResponseTime?: string;
}

/**
 * Send contact form received confirmation
 */
export async function sendContactReceived(
  data: ContactReceivedData,
  config?: Partial<EmailConfig>
): Promise<EmailResult> {
  const html = generateContactReceivedHTML(data);

  return sendEmail(
    {
      to: data.customerEmail,
      subject: `We Got Your Message! - Rastasafari Experience`,
      html,
      text: `
We received your message!

Hey ${data.customerName},

Thank you for reaching out to Rastasafari Experience. We've received your message and will get back to you within ${data.estimatedResponseTime || '24-48 hours'}.

${data.ticketNumber ? `Reference Number: ${data.ticketNumber}` : ''}

Your Message:
Subject: ${data.subject}
---
${data.message}
---

Need urgent help? Call us at 876-445-7203

One Love,
Rastasafari Experience
      `.trim(),
    },
    config
  );
}

/**
 * Send internal notification when contact form is submitted
 */
export async function sendContactNotification(
  data: ContactReceivedData,
  notifyEmail: string,
  config?: Partial<EmailConfig>
): Promise<EmailResult> {
  return sendEmail(
    {
      to: notifyEmail,
      subject: `New Contact Form: ${data.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        ${data.ticketNumber ? `<p><strong>Ticket:</strong> ${data.ticketNumber}</p>` : ''}
        <p><strong>From:</strong> ${data.customerName} (${data.customerEmail})</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${data.message}</p>
      `,
      text: `
New Contact Form Submission
${data.ticketNumber ? `Ticket: ${data.ticketNumber}` : ''}
From: ${data.customerName} (${data.customerEmail})
Subject: ${data.subject}

Message:
${data.message}
      `.trim(),
      replyTo: data.customerEmail,
    },
    config
  );
}

export default sendEmail;
