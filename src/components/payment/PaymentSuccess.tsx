'use client';

/**
 * Payment Success Component
 * Rastasafari Experience - Confirmation Screen
 *
 * Displays booking confirmation with details and download option
 */

import React, { useCallback } from 'react';

// Booking details interface
export interface BookingDetails {
  bookingReference: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  participants: number;
  tourDate: string;
  totalAmount: number;
  paymentIntentId: string;
  paidAt: Date;
}

interface PaymentSuccessProps {
  booking: BookingDetails;
  onClose?: () => void;
  onNewBooking?: () => void;
}

// Price constant
const PRICE_PER_PERSON = 165;

export function PaymentSuccess({
  booking,
  onClose,
  onNewBooking
}: PaymentSuccessProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  // Generate confirmation PDF content
  const generateConfirmationContent = useCallback(() => {
    return `
================================================================================
                        RASTASAFARI EXPERIENCE
                       BOOKING CONFIRMATION
================================================================================

Booking Reference: ${booking.bookingReference}
Confirmation Date: ${formatTimestamp(booking.paidAt)}

--------------------------------------------------------------------------------
CUSTOMER INFORMATION
--------------------------------------------------------------------------------
Name:           ${booking.customerName}
Email:          ${booking.customerEmail}
Phone:          ${booking.customerPhone || 'Not provided'}

--------------------------------------------------------------------------------
TOUR DETAILS
--------------------------------------------------------------------------------
Experience:     Rastasafari Experience Tour
Tour Date:      ${formatDate(booking.tourDate)}
Participants:   ${booking.participants} ${booking.participants === 1 ? 'person' : 'people'}

--------------------------------------------------------------------------------
PAYMENT DETAILS
--------------------------------------------------------------------------------
Price per Person:   $${PRICE_PER_PERSON}.00 USD
Number of Guests:   ${booking.participants}
                    ---------------
Total Paid:         $${booking.totalAmount.toFixed(2)} USD

Payment ID:     ${booking.paymentIntentId}
Status:         CONFIRMED

--------------------------------------------------------------------------------
IMPORTANT INFORMATION
--------------------------------------------------------------------------------
- Please arrive 15 minutes before your scheduled tour time
- Bring comfortable walking shoes and weather-appropriate clothing
- Don't forget your camera to capture the beautiful scenery
- This confirmation serves as your ticket - please have it ready

For questions or changes, contact us at:
Email: info@rastasafari-experience.com
Phone: +1 (XXX) XXX-XXXX

--------------------------------------------------------------------------------
                    Thank you for booking with us!
                  We look forward to seeing you soon.
================================================================================
    `.trim();
  }, [booking]);

  // Download confirmation as text file
  const handleDownloadConfirmation = useCallback(() => {
    const content = generateConfirmationContent();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `Rastasafari-Confirmation-${booking.bookingReference}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [booking.bookingReference, generateConfirmationContent]);

  // Print confirmation
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="payment-success">
      {/* Success Header */}
      <div className="success-header">
        <div className="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
          </svg>
        </div>
        <h1>Payment Successful!</h1>
        <p>Your Rastasafari Experience has been booked</p>
      </div>

      {/* Booking Reference */}
      <div className="booking-reference">
        <span className="label">Booking Reference</span>
        <span className="reference">{booking.bookingReference}</span>
      </div>

      {/* Confirmation Details */}
      <div className="confirmation-card">
        <h2>Booking Details</h2>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Tour</span>
            <span className="detail-value">Rastasafari Experience</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Date</span>
            <span className="detail-value">{formatDate(booking.tourDate)}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Participants</span>
            <span className="detail-value">
              {booking.participants} {booking.participants === 1 ? 'person' : 'people'}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Total Paid</span>
            <span className="detail-value highlight">${booking.totalAmount.toFixed(2)} USD</span>
          </div>
        </div>

        <div className="divider" />

        <h3>Customer Information</h3>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Name</span>
            <span className="detail-value">{booking.customerName}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Email</span>
            <span className="detail-value">{booking.customerEmail}</span>
          </div>

          {booking.customerPhone && (
            <div className="detail-item">
              <span className="detail-label">Phone</span>
              <span className="detail-value">{booking.customerPhone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Email Notice */}
      <div className="email-notice">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
        <p>A confirmation email has been sent to <strong>{booking.customerEmail}</strong></p>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button onClick={handleDownloadConfirmation} className="btn-download">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
          Download Confirmation
        </button>

        <button onClick={handlePrint} className="btn-print">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 003 3h.27l-.155 1.705A1.875 1.875 0 007.232 22.5h9.536a1.875 1.875 0 001.867-2.045l-.155-1.705h.27a3 3 0 003-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0018 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM16.5 6.205v-2.83A.375.375 0 0016.125 3h-8.25a.375.375 0 00-.375.375v2.83a49.353 49.353 0 019 0zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 01-.374.409H7.232a.375.375 0 01-.374-.409l.526-5.784a.373.373 0 01.333-.337 41.741 41.741 0 018.566 0zm.967-3.97a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H18a.75.75 0 01-.75-.75V10.5z" clipRule="evenodd" />
          </svg>
          Print
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="secondary-actions">
        {onNewBooking && (
          <button onClick={onNewBooking} className="btn-new-booking">
            Book Another Experience
          </button>
        )}

        {onClose && (
          <button onClick={onClose} className="btn-close">
            Close
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <p>Questions about your booking?</p>
        <a href="mailto:info@rastasafari-experience.com">Contact us</a>
      </div>

      <style jsx>{`
        .payment-success {
          max-width: 520px;
          margin: 0 auto;
          padding: 24px;
        }

        .success-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, #16A34A 0%, #22C55E 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: scaleIn 0.5s ease-out;
        }

        .success-icon svg {
          width: 48px;
          height: 48px;
          color: white;
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .success-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #1A1A1A;
        }

        .success-header p {
          margin: 0;
          font-size: 16px;
          color: #6B7280;
        }

        .booking-reference {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          background: linear-gradient(135deg, #2D5016 0%, #3D6B1E 100%);
          border-radius: 12px;
          margin-bottom: 24px;
          color: white;
        }

        .booking-reference .label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.8;
          margin-bottom: 4px;
        }

        .booking-reference .reference {
          font-size: 24px;
          font-weight: 700;
          font-family: 'Monaco', 'Menlo', monospace;
          letter-spacing: 2px;
        }

        .confirmation-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .confirmation-card h2 {
          margin: 0 0 20px 0;
          font-size: 18px;
          font-weight: 600;
          color: #1A1A1A;
        }

        .confirmation-card h3 {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 600;
          color: #1A1A1A;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-label {
          font-size: 13px;
          color: #6B7280;
        }

        .detail-value {
          font-size: 15px;
          font-weight: 500;
          color: #1A1A1A;
        }

        .detail-value.highlight {
          color: #2D5016;
          font-size: 18px;
          font-weight: 700;
        }

        .divider {
          height: 1px;
          background: #E5E7EB;
          margin: 20px 0;
        }

        .email-notice {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #F0FDF4;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .email-notice svg {
          width: 24px;
          height: 24px;
          color: #16A34A;
          flex-shrink: 0;
        }

        .email-notice p {
          margin: 0;
          font-size: 14px;
          color: #166534;
        }

        .actions {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .btn-download,
        .btn-print {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 20px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-download {
          background: linear-gradient(135deg, #2D5016 0%, #3D6B1E 100%);
          color: white;
          border: none;
        }

        .btn-download:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(45, 80, 22, 0.3);
        }

        .btn-download svg,
        .btn-print svg {
          width: 18px;
          height: 18px;
        }

        .btn-print {
          background: #FFFFFF;
          color: #374151;
          border: 2px solid #E5E7EB;
        }

        .btn-print:hover {
          border-color: #9CA3AF;
          background: #F9FAFB;
        }

        .secondary-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .btn-new-booking,
        .btn-close {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-new-booking {
          background: #F3F4F6;
          color: #374151;
        }

        .btn-new-booking:hover {
          background: #E5E7EB;
        }

        .btn-close {
          background: transparent;
          color: #6B7280;
        }

        .btn-close:hover {
          color: #374151;
        }

        .footer {
          text-align: center;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #E5E7EB;
        }

        .footer p {
          margin: 0 0 8px 0;
          font-size: 14px;
          color: #6B7280;
        }

        .footer a {
          color: #2D5016;
          font-weight: 500;
          text-decoration: none;
        }

        .footer a:hover {
          text-decoration: underline;
        }

        @media print {
          .actions,
          .secondary-actions,
          .footer {
            display: none;
          }

          .payment-success {
            padding: 0;
          }

          .success-icon {
            background: #16A34A !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .booking-reference {
            background: #2D5016 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }

        @media (max-width: 480px) {
          .payment-success {
            padding: 16px;
          }

          .details-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .actions {
            flex-direction: column;
          }

          .success-header h1 {
            font-size: 24px;
          }

          .booking-reference .reference {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default PaymentSuccess;
