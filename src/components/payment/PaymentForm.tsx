'use client';

/**
 * Payment Form Component
 * Rastasafari Experience - Secure Stripe Payment Form
 *
 * Price: $165 USD per person
 */

import React, { useState, FormEvent } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';

// Price constant
const PRICE_PER_PERSON = 165;

// Card element styling options
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1A1A1A',
      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#9CA3AF',
      },
    },
    invalid: {
      color: '#DC2626',
      iconColor: '#DC2626',
    },
  },
  hidePostalCode: false,
};

// Form data interface
export interface PaymentFormData {
  name: string;
  email: string;
  phone: string;
  participants: number;
  tourDate: string;
}

// Component props
interface PaymentFormProps {
  clientSecret: string;
  bookingReference: string;
  initialData?: Partial<PaymentFormData>;
  onSuccess: (paymentIntentId: string, bookingReference: string) => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
}

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export function PaymentForm({
  clientSecret,
  bookingReference,
  initialData = {},
  onSuccess,
  onError,
  onCancel,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  // Form state
  const [formData, setFormData] = useState<PaymentFormData>({
    name: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    participants: initialData.participants || 1,
    tourDate: initialData.tourDate || '',
  });

  // Payment state
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  // Calculate totals
  const subtotal = formData.participants * PRICE_PER_PERSON;
  const total = subtotal;

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'participants' ? parseInt(value, 10) || 1 : value,
    }));
    setErrorMessage(null);
  };

  // Handle card element changes
  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    setCardComplete(event.complete);
    setCardError(event.error ? event.error.message : null);
    if (event.error) {
      setErrorMessage(event.error.message);
    } else {
      setErrorMessage(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage('Payment system is not ready. Please refresh and try again.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setErrorMessage('Card element not found. Please refresh and try again.');
      return;
    }

    if (!cardComplete) {
      setErrorMessage('Please complete your card information.');
      return;
    }

    // Validate form
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('processing');
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || undefined,
          },
        },
        receipt_email: formData.email,
      });

      if (error) {
        setStatus('error');
        const message = error.message || 'Payment failed. Please try again.';
        setErrorMessage(message);
        onError?.(message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setStatus('success');
        onSuccess(paymentIntent.id, bookingReference);
      } else {
        setStatus('error');
        const message = 'Payment could not be completed. Please try again.';
        setErrorMessage(message);
        onError?.(message);
      }
    } catch (err) {
      setStatus('error');
      const message = 'An unexpected error occurred. Please try again.';
      setErrorMessage(message);
      onError?.(message);
    }
  };

  const isLoading = status === 'processing';
  const isDisabled = isLoading || !stripe || !elements;

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      {/* Order Summary */}
      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Rastasafari Experience</span>
        </div>
        <div className="summary-row">
          <span>${PRICE_PER_PERSON} USD x {formData.participants} participant{formData.participants > 1 ? 's' : ''}</span>
          <span>${subtotal.toFixed(2)} USD</span>
        </div>
        <div className="summary-divider" />
        <div className="summary-row total">
          <span>Total</span>
          <span>${total.toFixed(2)} USD</span>
        </div>
        <p className="booking-ref">Booking Reference: {bookingReference}</p>
      </div>

      {/* Customer Information */}
      <div className="form-section">
        <h3>Customer Information</h3>

        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
            disabled={isLoading}
            autoComplete="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            required
            disabled={isLoading}
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number (Optional)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+1 (555) 123-4567"
            disabled={isLoading}
            autoComplete="tel"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="participants">Participants *</label>
            <select
              id="participants"
              name="participants"
              value={formData.participants}
              onChange={handleInputChange}
              disabled={isLoading}
            >
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? 'person' : 'people'}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tourDate">Tour Date *</label>
            <input
              type="date"
              id="tourDate"
              name="tourDate"
              value={formData.tourDate}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
      </div>

      {/* Card Information */}
      <div className="form-section">
        <h3>Payment Information</h3>

        <div className="form-group">
          <label htmlFor="card-element">Card Details *</label>
          <div className={`card-element-container ${cardError ? 'has-error' : ''} ${cardComplete ? 'is-complete' : ''}`}>
            <CardElement
              id="card-element"
              options={cardElementOptions}
              onChange={handleCardChange}
            />
          </div>
          {cardError && (
            <p className="field-error">{cardError}</p>
          )}
        </div>

        <div className="security-notice">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
          </svg>
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && status === 'error' && (
        <div className="error-message" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Actions */}
      <div className="form-actions">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="btn-cancel"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isDisabled}
          className={`btn-pay ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? (
            <>
              <span className="spinner" />
              Processing...
            </>
          ) : (
            <>Pay ${total.toFixed(2)} USD</>
          )}
        </button>
      </div>

      <style jsx>{`
        .payment-form {
          max-width: 480px;
          margin: 0 auto;
        }

        .order-summary {
          background: linear-gradient(135deg, #2D5016 0%, #3D6B1E 100%);
          color: white;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .order-summary h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          font-size: 14px;
        }

        .summary-row.total {
          font-size: 18px;
          font-weight: 700;
        }

        .summary-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.3);
          margin: 12px 0;
        }

        .booking-ref {
          margin: 16px 0 0 0;
          font-size: 12px;
          opacity: 0.8;
        }

        .form-section {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .form-section h3 {
          margin: 0 0 20px 0;
          font-size: 16px;
          font-weight: 600;
          color: #1A1A1A;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group:last-child {
          margin-bottom: 0;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        input,
        select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #E5E7EB;
          border-radius: 8px;
          font-size: 16px;
          color: #1A1A1A;
          background: #FFFFFF;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        input:hover,
        select:hover {
          border-color: #9CA3AF;
        }

        input:focus,
        select:focus {
          outline: none;
          border-color: #2D5016;
          box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.15);
        }

        input:disabled,
        select:disabled {
          background: #F3F4F6;
          cursor: not-allowed;
        }

        input::placeholder {
          color: #9CA3AF;
        }

        .card-element-container {
          padding: 14px 16px;
          border: 2px solid #E5E7EB;
          border-radius: 8px;
          background: #FFFFFF;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .card-element-container:hover {
          border-color: #9CA3AF;
        }

        .card-element-container:focus-within {
          border-color: #2D5016;
          box-shadow: 0 0 0 3px rgba(45, 80, 22, 0.15);
        }

        .card-element-container.has-error {
          border-color: #DC2626;
        }

        .card-element-container.is-complete {
          border-color: #16A34A;
        }

        .field-error {
          margin: 8px 0 0 0;
          font-size: 14px;
          color: #DC2626;
        }

        .security-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          padding: 12px 16px;
          background: #F0FDF4;
          border-radius: 8px;
          font-size: 13px;
          color: #166534;
        }

        .error-message {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 8px;
          margin-bottom: 24px;
          color: #DC2626;
        }

        .error-message svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .btn-cancel {
          padding: 14px 24px;
          border: 2px solid #E5E7EB;
          border-radius: 8px;
          background: #FFFFFF;
          color: #374151;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-cancel:hover {
          border-color: #9CA3AF;
          background: #F9FAFB;
        }

        .btn-cancel:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-pay {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 32px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #2D5016 0%, #3D6B1E 100%);
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-pay:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(45, 80, 22, 0.3);
        }

        .btn-pay:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-pay.loading {
          background: #6B7280;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid transparent;
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 480px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column-reverse;
          }

          .btn-cancel {
            width: 100%;
          }
        }
      `}</style>
    </form>
  );
}

export default PaymentForm;
