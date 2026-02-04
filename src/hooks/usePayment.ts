'use client';

/**
 * usePayment Hook
 * Rastasafari Experience - Custom Payment Management Hook
 *
 * Manages payment state, payment intent creation, and payment flow
 * Price: $165 USD per person
 */

import { useState, useCallback, useEffect, useRef } from 'react';

// Price constants
export const PRICE_PER_PERSON = 165;
export const CURRENCY = 'USD';

// Payment status types
export type PaymentStatus =
  | 'idle'
  | 'creating_intent'
  | 'ready'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'cancelled';

// Customer data interface
export interface CustomerData {
  name: string;
  email: string;
  phone?: string;
  participants: number;
  tourDate: string;
}

// Payment intent data
export interface PaymentIntentData {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  bookingReference: string;
}

// Booking confirmation data
export interface BookingConfirmation {
  bookingReference: string;
  paymentIntentId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  participants: number;
  tourDate: string;
  totalAmount: number;
  paidAt: Date;
}

// Hook state interface
export interface PaymentState {
  status: PaymentStatus;
  error: string | null;
  paymentIntent: PaymentIntentData | null;
  confirmation: BookingConfirmation | null;
  isLoading: boolean;
}

// Hook return interface
export interface UsePaymentReturn extends PaymentState {
  // Actions
  createPaymentIntent: (customer: CustomerData) => Promise<PaymentIntentData | null>;
  confirmPaymentSuccess: (paymentIntentId: string, bookingReference: string) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  cancel: () => void;

  // Computed values
  calculateTotal: (participants: number) => number;
  formatPrice: (amount: number) => string;

  // Compatibility with existing code
  isIdle: boolean;
  isProcessing: boolean;
  isSuccess: boolean;
  isError: boolean;
  displayError: string | null;
  clientSecret: string | null;
}

// Initial state
const initialState: PaymentState = {
  status: 'idle',
  error: null,
  paymentIntent: null,
  confirmation: null,
  isLoading: false,
};

/**
 * Custom hook for managing Stripe payment flow
 */
export function usePayment(
  apiEndpoint: string = '/api/payment/create-intent'
): UsePaymentReturn {
  const [state, setState] = useState<PaymentState>(initialState);

  // Temporary storage for customer data (between intent creation and confirmation)
  const [pendingCustomer, setPendingCustomer] = useState<CustomerData | null>(null);

  // Prevent double submissions
  const processingRef = useRef(false);

  /**
   * Calculate total amount for given number of participants
   */
  const calculateTotal = useCallback((participants: number): number => {
    return participants * PRICE_PER_PERSON;
  }, []);

  /**
   * Format price for display
   */
  const formatPrice = useCallback((amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: CURRENCY,
    }).format(amount);
  }, []);

  /**
   * Get formatted error message for display
   */
  const getDisplayError = useCallback((): string | null => {
    if (!state.error) return null;

    // Map Stripe error codes to user-friendly messages
    const errorMappings: Record<string, string> = {
      'card_declined': 'Your card was declined. Please try a different card.',
      'expired_card': 'Your card has expired. Please use a different card.',
      'incorrect_cvc': 'The security code is incorrect.',
      'processing_error': 'An error occurred while processing. Please try again.',
      'insufficient_funds': 'Insufficient funds on the card.',
      'invalid_participants': 'Number of participants must be between 1 and 20.',
    };

    // Check if error matches any known code
    for (const [code, message] of Object.entries(errorMappings)) {
      if (state.error.toLowerCase().includes(code)) {
        return message;
      }
    }

    return state.error;
  }, [state.error]);

  /**
   * Create a new payment intent
   */
  const createPaymentIntent = useCallback(async (
    customer: CustomerData
  ): Promise<PaymentIntentData | null> => {
    // Prevent double submissions
    if (processingRef.current) {
      console.warn('Payment intent creation already in progress');
      return null;
    }

    // Validate input
    if (!customer.name?.trim()) {
      setState(prev => ({ ...prev, error: 'Customer name is required', status: 'failed' }));
      return null;
    }

    if (!customer.email?.trim() || !customer.email.includes('@')) {
      setState(prev => ({ ...prev, error: 'Valid email is required', status: 'failed' }));
      return null;
    }

    if (customer.participants < 1 || customer.participants > 20) {
      setState(prev => ({ ...prev, error: 'Participants must be between 1 and 20', status: 'failed' }));
      return null;
    }

    if (!customer.tourDate) {
      setState(prev => ({ ...prev, error: 'Tour date is required', status: 'failed' }));
      return null;
    }

    processingRef.current = true;
    setState(prev => ({
      ...prev,
      status: 'creating_intent',
      isLoading: true,
      error: null,
    }));

    // Store customer data for later use
    setPendingCustomer(customer);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participants: customer.participants,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          tourDate: customer.tourDate,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create payment intent');
      }

      const data: PaymentIntentData = await response.json();

      setState(prev => ({
        ...prev,
        status: 'ready',
        isLoading: false,
        paymentIntent: data,
        error: null,
      }));

      processingRef.current = false;
      return data;
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'An unexpected error occurred';

      setState(prev => ({
        ...prev,
        status: 'failed',
        isLoading: false,
        error: message,
      }));

      processingRef.current = false;
      return null;
    }
  }, [apiEndpoint]);

  /**
   * Handle successful payment confirmation
   */
  const confirmPaymentSuccess = useCallback((
    paymentIntentId: string,
    bookingReference: string
  ) => {
    if (!pendingCustomer) {
      setState(prev => ({
        ...prev,
        status: 'failed',
        error: 'Missing customer data for confirmation',
      }));
      return;
    }

    const confirmation: BookingConfirmation = {
      bookingReference,
      paymentIntentId,
      customerName: pendingCustomer.name,
      customerEmail: pendingCustomer.email,
      customerPhone: pendingCustomer.phone,
      participants: pendingCustomer.participants,
      tourDate: pendingCustomer.tourDate,
      totalAmount: calculateTotal(pendingCustomer.participants),
      paidAt: new Date(),
    };

    setState(prev => ({
      ...prev,
      status: 'succeeded',
      isLoading: false,
      confirmation,
      error: null,
    }));

    // Clear pending customer data
    setPendingCustomer(null);
    processingRef.current = false;
  }, [pendingCustomer, calculateTotal]);

  /**
   * Set error message
   */
  const setError = useCallback((error: string | null) => {
    setState(prev => ({
      ...prev,
      error,
      status: error ? 'failed' : prev.status,
      isLoading: false,
    }));
    processingRef.current = false;
  }, []);

  /**
   * Reset the payment state
   */
  const reset = useCallback(() => {
    setState(initialState);
    setPendingCustomer(null);
    processingRef.current = false;
  }, []);

  /**
   * Cancel the current payment
   */
  const cancel = useCallback(() => {
    setState(prev => ({
      ...prev,
      status: 'cancelled',
      isLoading: false,
    }));
    setPendingCustomer(null);
    processingRef.current = false;
  }, []);

  // Cleanup on unmount
  useEffect((): (() => void) | void => {
    return () => {
      processingRef.current = false;
    };
  }, []);

  return {
    // State
    status: state.status,
    error: state.error,
    paymentIntent: state.paymentIntent,
    confirmation: state.confirmation,
    isLoading: state.isLoading,

    // Actions
    createPaymentIntent,
    confirmPaymentSuccess,
    setError,
    reset,
    cancel,

    // Computed
    calculateTotal,
    formatPrice,

    // Compatibility properties
    isIdle: state.status === 'idle',
    isProcessing: state.status === 'processing' || state.status === 'creating_intent',
    isSuccess: state.status === 'succeeded',
    isError: state.status === 'failed',
    displayError: getDisplayError(),
    clientSecret: state.paymentIntent?.clientSecret || null,
  };
}

/**
 * Hook for payment form validation
 */
export function usePaymentValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((
    field: string,
    value: string | number
  ): string | null => {
    switch (field) {
      case 'name':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'Full name is required';
        }
        if (typeof value === 'string' && value.trim().length < 2) {
          return 'Name must be at least 2 characters';
        }
        return null;

      case 'email':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'Email is required';
        }
        if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return null;

      case 'phone':
        // Phone is optional, but if provided, validate format
        if (value && typeof value === 'string' && value.trim()) {
          const phoneRegex = /^[\d\s\-+()]{10,}$/;
          if (!phoneRegex.test(value)) {
            return 'Please enter a valid phone number';
          }
        }
        return null;

      case 'participants':
        const num = typeof value === 'number' ? value : parseInt(value as string, 10);
        if (isNaN(num) || num < 1) {
          return 'At least 1 participant is required';
        }
        if (num > 20) {
          return 'Maximum 20 participants allowed';
        }
        return null;

      case 'tourDate':
        if (!value) {
          return 'Tour date is required';
        }
        const selectedDate = new Date(value as string);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          return 'Tour date cannot be in the past';
        }
        return null;

      default:
        return null;
    }
  }, []);

  const validate = useCallback((
    field: string,
    value: string | number
  ): boolean => {
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error || '',
    }));
    return error === null;
  }, [validateField]);

  const validateAll = useCallback((data: CustomerData): boolean => {
    const newErrors: Record<string, string> = {};

    const nameError = validateField('name', data.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateField('email', data.email);
    if (emailError) newErrors.email = emailError;

    if (data.phone) {
      const phoneError = validateField('phone', data.phone);
      if (phoneError) newErrors.phone = phoneError;
    }

    const participantsError = validateField('participants', data.participants);
    if (participantsError) newErrors.participants = participantsError;

    const tourDateError = validateField('tourDate', data.tourDate);
    if (tourDateError) newErrors.tourDate = tourDateError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateField]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    errors,
    validate,
    validateAll,
    clearErrors,
    clearError,
  };
}


export default usePayment;
