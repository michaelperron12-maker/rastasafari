'use client';

import React, { HTMLAttributes, forwardRef } from 'react';

// Couleurs Rasta
const RASTA_COLORS = {
  green: '#009B3A',
  gold: '#FED100',
  red: '#E31C23',
} as const;

export type BadgeVariant = 'success' | 'warning' | 'info' | 'danger' | 'neutral' | 'rasta';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  dot?: boolean;
  outlined?: boolean;
}

const variantStyles: Record<
  BadgeVariant,
  { bg: string; color: string; border: string; dotColor: string }
> = {
  success: {
    bg: 'rgba(0, 155, 58, 0.1)',
    color: RASTA_COLORS.green,
    border: RASTA_COLORS.green,
    dotColor: RASTA_COLORS.green,
  },
  warning: {
    bg: 'rgba(254, 209, 0, 0.2)',
    color: '#b8960a',
    border: RASTA_COLORS.gold,
    dotColor: RASTA_COLORS.gold,
  },
  info: {
    bg: 'rgba(59, 130, 246, 0.1)',
    color: '#3b82f6',
    border: '#3b82f6',
    dotColor: '#3b82f6',
  },
  danger: {
    bg: 'rgba(227, 28, 35, 0.1)',
    color: RASTA_COLORS.red,
    border: RASTA_COLORS.red,
    dotColor: RASTA_COLORS.red,
  },
  neutral: {
    bg: '#f3f4f6',
    color: '#6b7280',
    border: '#d1d5db',
    dotColor: '#9ca3af',
  },
  rasta: {
    bg: `linear-gradient(135deg, ${RASTA_COLORS.green}20, ${RASTA_COLORS.gold}20, ${RASTA_COLORS.red}20)`,
    color: RASTA_COLORS.green,
    border: RASTA_COLORS.green,
    dotColor: RASTA_COLORS.green,
  },
};

const sizeStyles: Record<BadgeSize, { padding: string; fontSize: string; height: string }> = {
  sm: {
    padding: '0.125rem 0.5rem',
    fontSize: '0.75rem',
    height: '1.25rem',
  },
  md: {
    padding: '0.25rem 0.75rem',
    fontSize: '0.8125rem',
    height: '1.5rem',
  },
  lg: {
    padding: '0.375rem 1rem',
    fontSize: '0.875rem',
    height: '1.75rem',
  },
};

// Predefined badges for common use cases
export const TopBadge: React.FC<Omit<BadgeProps, 'children'> & { percentage?: number }> = ({
  percentage = 1,
  ...props
}) => (
  <Badge variant="success" icon={<StarIcon />} {...props}>
    Top {percentage}%
  </Badge>
);

export const IncludedBadge: React.FC<Omit<BadgeProps, 'children'>> = (props) => (
  <Badge variant="info" icon={<CheckIcon />} {...props}>
    Inclus
  </Badge>
);

export const NewBadge: React.FC<Omit<BadgeProps, 'children'>> = (props) => (
  <Badge variant="warning" dot {...props}>
    Nouveau
  </Badge>
);

// Simple icons
const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'neutral',
      size = 'md',
      icon,
      dot = false,
      outlined = false,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const variantConfig = variantStyles[variant];
    const sizeConfig = sizeStyles[size];

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.375rem',
      fontWeight: 600,
      borderRadius: '9999px',
      whiteSpace: 'nowrap',
      padding: sizeConfig.padding,
      fontSize: sizeConfig.fontSize,
      minHeight: sizeConfig.height,
      background: outlined ? 'transparent' : variantConfig.bg,
      color: variantConfig.color,
      border: outlined ? `1.5px solid ${variantConfig.border}` : 'none',
      lineHeight: 1,
      ...style,
    };

    const dotStyles: React.CSSProperties = {
      width: '0.5rem',
      height: '0.5rem',
      borderRadius: '50%',
      backgroundColor: variantConfig.dotColor,
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    };

    return (
      <span
        ref={ref}
        className={`rasta-badge rasta-badge--${variant} rasta-badge--${size} ${className}`}
        style={baseStyles}
        {...props}
      >
        {dot && <span style={dotStyles} />}
        {icon && <span className="rasta-badge__icon">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
