'use client';

import React, { forwardRef, SelectHTMLAttributes, useState } from 'react';

// Couleurs Rasta
const RASTA_COLORS = {
  green: '#009B3A',
  gold: '#FED100',
  red: '#E31C23',
} as const;

export type SelectState = 'default' | 'error' | 'success';
export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  state?: SelectState;
  selectSize?: SelectSize;
  placeholder?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
}

const sizeStyles: Record<SelectSize, { height: string; fontSize: string; padding: string }> = {
  sm: {
    height: '2rem',
    fontSize: '0.875rem',
    padding: '0.375rem 0.75rem',
  },
  md: {
    height: '2.5rem',
    fontSize: '1rem',
    padding: '0.5rem 1rem',
  },
  lg: {
    height: '3rem',
    fontSize: '1.125rem',
    padding: '0.75rem 1.25rem',
  },
};

const stateColors: Record<SelectState, { border: string; focus: string; text: string }> = {
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

// Chevron Down SVG
const ChevronDownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      helperText,
      errorMessage,
      successMessage,
      state = 'default',
      selectSize = 'md',
      placeholder,
      fullWidth = false,
      leftIcon,
      disabled,
      className = '',
      style,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const sizeConfig = sizeStyles[selectSize];
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

    const selectWrapperStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    };

    const selectStyles: React.CSSProperties = {
      width: '100%',
      height: sizeConfig.height,
      fontSize: sizeConfig.fontSize,
      padding: sizeConfig.padding,
      paddingLeft: leftIcon ? '2.5rem' : sizeConfig.padding,
      paddingRight: '2.5rem', // Space for chevron
      border: `2px solid ${isFocused ? colorConfig.focus : colorConfig.border}`,
      borderRadius: '0.5rem',
      backgroundColor: disabled ? '#f3f4f6' : 'white',
      color: disabled ? '#9ca3af' : '#1a1a1a',
      outline: 'none',
      transition: 'all 0.2s ease-in-out',
      cursor: disabled ? 'not-allowed' : 'pointer',
      appearance: 'none',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
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

    const chevronStyles: React.CSSProperties = {
      ...iconStyles,
      right: '0.75rem',
    };

    const helperTextStyles: React.CSSProperties = {
      fontSize: '0.75rem',
      color: colorConfig.text,
    };

    const displayMessage = errorMessage || successMessage || helperText;

    return (
      <div className={`rasta-select-container ${className}`} style={containerStyles}>
        {label && (
          <label htmlFor={selectId} style={labelStyles}>
            {label}
          </label>
        )}
        <div style={selectWrapperStyles}>
          {leftIcon && <span style={leftIconStyles}>{leftIcon}</span>}
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={`rasta-select rasta-select--${state} rasta-select--${selectSize}`}
            style={selectStyles}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <span style={chevronStyles}>
            <ChevronDownIcon />
          </span>
        </div>
        {displayMessage && <span style={helperTextStyles}>{displayMessage}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
