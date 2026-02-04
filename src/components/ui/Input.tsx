'use client';

import React, { forwardRef, InputHTMLAttributes, useState } from 'react';

// Couleurs Rasta
const RASTA_COLORS = {
  green: '#009B3A',
  gold: '#FED100',
  red: '#E31C23',
} as const;

export type InputState = 'default' | 'error' | 'success';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  state?: InputState;
  inputSize?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

// Touch-friendly sizes (minimum 44px for accessibility on mobile)
const sizeStyles: Record<InputSize, { height: string; fontSize: string; padding: string }> = {
  sm: {
    height: '2.75rem', // 44px minimum for touch
    fontSize: '1rem', // 16px minimum to prevent zoom on iOS
    padding: '0.5rem 0.75rem',
  },
  md: {
    height: '3rem', // 48px
    fontSize: '1rem', // 16px minimum to prevent zoom on iOS
    padding: '0.75rem 1rem',
  },
  lg: {
    height: '3.5rem', // 56px
    fontSize: '1.125rem',
    padding: '1rem 1.25rem',
  },
};

const stateColors: Record<InputState, { border: string; focus: string; text: string }> = {
  default: {
    border: '#d1d5db',
    focus: RASTA_COLORS.green,
    text: '#6b7280',
  },
  error: {
    border: RASTA_COLORS.red,
    focus: RASTA_COLORS.red,
    text: RASTA_COLORS.red,
  },
  success: {
    border: RASTA_COLORS.green,
    focus: RASTA_COLORS.green,
    text: RASTA_COLORS.green,
  },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      successMessage,
      state = 'default',
      inputSize = 'md',
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className = '',
      style,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const sizeConfig = sizeStyles[inputSize];
    const colorConfig = stateColors[state];

    const containerStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.375rem',
      width: fullWidth ? '100%' : 'auto',
    };

    const labelStyles: React.CSSProperties = {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#374151',
    };

    const inputWrapperStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    };

    const inputStyles: React.CSSProperties = {
      width: '100%',
      height: sizeConfig.height,
      fontSize: sizeConfig.fontSize,
      padding: sizeConfig.padding,
      paddingLeft: leftIcon ? '2.5rem' : sizeConfig.padding,
      paddingRight: rightIcon ? '2.5rem' : sizeConfig.padding,
      border: `2px solid ${isFocused ? colorConfig.focus : colorConfig.border}`,
      borderRadius: '0.5rem',
      backgroundColor: disabled ? '#f3f4f6' : 'white',
      color: disabled ? '#9ca3af' : '#1a1a1a',
      outline: 'none',
      transition: 'all 0.2s ease-in-out',
      cursor: disabled ? 'not-allowed' : 'text',
      ...style,
    };

    const iconStyles: React.CSSProperties = {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9ca3af',
      pointerEvents: 'none',
    };

    const leftIconStyles: React.CSSProperties = {
      ...iconStyles,
      left: '0.75rem',
    };

    const rightIconStyles: React.CSSProperties = {
      ...iconStyles,
      right: '0.75rem',
    };

    const helperTextStyles: React.CSSProperties = {
      fontSize: '0.75rem',
      color: colorConfig.text,
    };

    const displayMessage = errorMessage || successMessage || helperText;

    return (
      <div className={`rasta-input-container ${className}`} style={containerStyles}>
        {label && (
          <label htmlFor={inputId} style={labelStyles}>
            {label}
          </label>
        )}
        <div style={inputWrapperStyles}>
          {leftIcon && <span style={leftIconStyles}>{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={`rasta-input rasta-input--${state} rasta-input--${inputSize}`}
            style={inputStyles}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
          {rightIcon && <span style={rightIconStyles}>{rightIcon}</span>}
        </div>
        {displayMessage && <span style={helperTextStyles}>{displayMessage}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
