'use client';

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { Spinner } from './Spinner';

// Couleurs Rasta
const RASTA_COLORS = {
  green: '#009B3A',
  gold: '#FED100',
  red: '#E31C23',
} as const;

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    background-color: ${RASTA_COLORS.green};
    color: white;
    border: 2px solid ${RASTA_COLORS.green};
    &:hover:not(:disabled) {
      background-color: #007d2e;
      border-color: #007d2e;
    }
    &:active:not(:disabled) {
      background-color: #006625;
    }
  `,
  secondary: `
    background-color: ${RASTA_COLORS.gold};
    color: #1a1a1a;
    border: 2px solid ${RASTA_COLORS.gold};
    &:hover:not(:disabled) {
      background-color: #e5bc00;
      border-color: #e5bc00;
    }
    &:active:not(:disabled) {
      background-color: #cca700;
    }
  `,
  outline: `
    background-color: transparent;
    color: ${RASTA_COLORS.green};
    border: 2px solid ${RASTA_COLORS.green};
    &:hover:not(:disabled) {
      background-color: ${RASTA_COLORS.green};
      color: white;
    }
    &:active:not(:disabled) {
      background-color: #007d2e;
    }
  `,
  danger: `
    background-color: ${RASTA_COLORS.red};
    color: white;
    border: 2px solid ${RASTA_COLORS.red};
    &:hover:not(:disabled) {
      background-color: #c41820;
      border-color: #c41820;
    }
    &:active:not(:disabled) {
      background-color: #a5141b;
    }
  `,
  ghost: `
    background-color: transparent;
    color: ${RASTA_COLORS.green};
    border: 2px solid transparent;
    &:hover:not(:disabled) {
      background-color: rgba(0, 155, 58, 0.1);
    }
    &:active:not(:disabled) {
      background-color: rgba(0, 155, 58, 0.2);
    }
  `,
};

// Touch-friendly sizes (minimum 44px for accessibility on mobile)
const sizeStyles: Record<ButtonSize, { padding: string; fontSize: string; height: string; minWidth: string }> = {
  sm: {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    height: '2.75rem', // 44px minimum for touch
    minWidth: '2.75rem',
  },
  md: {
    padding: '0.75rem 1.25rem',
    fontSize: '1rem',
    height: '3rem', // 48px
    minWidth: '3rem',
  },
  lg: {
    padding: '1rem 1.75rem',
    fontSize: '1.125rem',
    height: '3.5rem', // 56px
    minWidth: '3.5rem',
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    const sizeConfig = sizeStyles[size];

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontWeight: 600,
      borderRadius: '0.5rem',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.6 : 1,
      transition: 'all 0.2s ease-in-out',
      outline: 'none',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      width: fullWidth ? '100%' : 'auto',
      padding: sizeConfig.padding,
      fontSize: sizeConfig.fontSize,
      minHeight: sizeConfig.height,
      minWidth: sizeConfig.minWidth,
      // Touch target optimization
      touchAction: 'manipulation',
      WebkitTapHighlightColor: 'transparent',
      ...style,
    };

    // Apply variant-specific styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: RASTA_COLORS.green,
            color: 'white',
            border: `2px solid ${RASTA_COLORS.green}`,
          };
        case 'secondary':
          return {
            backgroundColor: RASTA_COLORS.gold,
            color: '#1a1a1a',
            border: `2px solid ${RASTA_COLORS.gold}`,
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            color: RASTA_COLORS.green,
            border: `2px solid ${RASTA_COLORS.green}`,
          };
        case 'danger':
          return {
            backgroundColor: RASTA_COLORS.red,
            color: 'white',
            border: `2px solid ${RASTA_COLORS.red}`,
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: RASTA_COLORS.green,
            border: '2px solid transparent',
          };
        default:
          return {};
      }
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`rasta-button rasta-button--${variant} rasta-button--${size} ${className}`}
        style={{ ...baseStyles, ...getVariantStyles() }}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner size={size === 'sm' ? 'xs' : 'sm'} color="currentColor" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="rasta-button__icon--left">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="rasta-button__icon--right">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
