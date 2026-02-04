'use client';

/**
 * Stripe Provider Component
 * Rastasafari Experience - Payment Integration
 *
 * Wraps children with Stripe Elements provider for secure payment forms
 */

import React, { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions, Appearance } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Rastasafari theme colors
const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#2D5016', // Rastasafari green
    colorBackground: '#FFFFFF',
    colorText: '#1A1A1A',
    colorDanger: '#DC2626',
    colorSuccess: '#16A34A',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    fontSizeBase: '16px',
    spacingUnit: '4px',
    borderRadius: '8px',
    focusBoxShadow: '0 0 0 3px rgba(45, 80, 22, 0.25)',
    focusOutline: 'none',
  },
  rules: {
    '.Input': {
      border: '2px solid #E5E7EB',
      boxShadow: 'none',
      padding: '12px 16px',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    },
    '.Input:hover': {
      border: '2px solid #9CA3AF',
    },
    '.Input:focus': {
      border: '2px solid #2D5016',
      boxShadow: '0 0 0 3px rgba(45, 80, 22, 0.15)',
    },
    '.Input--invalid': {
      border: '2px solid #DC2626',
    },
    '.Label': {
      fontWeight: '500',
      marginBottom: '8px',
      color: '#374151',
    },
    '.Error': {
      color: '#DC2626',
      fontSize: '14px',
      marginTop: '8px',
    },
    '.Tab': {
      border: '2px solid #E5E7EB',
      borderRadius: '8px',
      padding: '12px 16px',
      backgroundColor: '#FFFFFF',
    },
    '.Tab:hover': {
      border: '2px solid #9CA3AF',
    },
    '.Tab--selected': {
      border: '2px solid #2D5016',
      backgroundColor: 'rgba(45, 80, 22, 0.05)',
    },
  },
};

interface StripeProviderProps {
  children: ReactNode;
  clientSecret?: string;
  options?: Partial<StripeElementsOptions>;
}

/**
 * StripeProvider Component
 * Wraps payment form components with Stripe Elements context
 */
export function StripeProvider({
  children,
  clientSecret,
  options = {}
}: StripeProviderProps) {
  // If no client secret, render children without Elements wrapper
  // This allows the component to be used before payment intent is created
  if (!clientSecret) {
    return <>{children}</>;
  }

  const elementsOptions = {
    clientSecret,
    appearance,
    loader: 'auto' as const,
    ...options,
  };

  return (
    <Elements stripe={stripePromise} options={elementsOptions as any}>
      {children}
    </Elements>
  );
}

/**
 * StripeElementsWrapper Component
 * A simpler wrapper without client secret requirement
 * Used for card-only payment flows
 */
export function StripeElementsWrapper({
  children,
  options = {}
}: {
  children: ReactNode;
  options?: Partial<StripeElementsOptions>;
}) {
  const elementsOptions = {
    appearance,
    ...options,
  } as any;

  return (
    <Elements stripe={stripePromise} options={elementsOptions as any}>
      {children}
    </Elements>
  );
}

/**
 * Hook to access Stripe promise for custom implementations
 */
export function useStripePromise() {
  return stripePromise;
}

export default StripeProvider;
