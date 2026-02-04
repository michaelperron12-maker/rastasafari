'use client';

import React, { HTMLAttributes, forwardRef } from 'react';

// Couleurs Rasta
const RASTA_COLORS = {
  green: '#009B3A',
  gold: '#FED100',
  red: '#E31C23',
} as const;

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'rasta';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right' | 'between';
}

const paddingStyles = {
  none: '0',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
};

const variantStyles: Record<CardVariant, React.CSSProperties> = {
  default: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  },
  elevated: {
    backgroundColor: 'white',
    border: 'none',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  outlined: {
    backgroundColor: 'white',
    border: `2px solid ${RASTA_COLORS.green}`,
    boxShadow: 'none',
  },
  rasta: {
    backgroundColor: 'white',
    border: 'none',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderTop: `4px solid ${RASTA_COLORS.green}`,
  },
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      hoverable = false,
      padding = 'none',
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const baseStyles: React.CSSProperties = {
      borderRadius: '0.75rem',
      overflow: 'hidden',
      transition: 'all 0.2s ease-in-out',
      padding: paddingStyles[padding],
      ...variantStyles[variant],
      ...style,
    };

    const hoverStyles = hoverable
      ? {
          cursor: 'pointer',
        }
      : {};

    return (
      <div
        ref={ref}
        className={`rasta-card rasta-card--${variant} ${hoverable ? 'rasta-card--hoverable' : ''} ${className}`}
        style={{ ...baseStyles, ...hoverStyles }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, children, className = '', style, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: '1rem 1.25rem',
      borderBottom: '1px solid #e5e7eb',
      ...style,
    };

    const titleStyles: React.CSSProperties = {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#1a1a1a',
      margin: 0,
    };

    const subtitleStyles: React.CSSProperties = {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginTop: '0.25rem',
    };

    return (
      <div ref={ref} className={`rasta-card__header ${className}`} style={baseStyles} {...props}>
        {children || (
          <>
            <div className="rasta-card__header-content">
              {title && <h3 style={titleStyles}>{title}</h3>}
              {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
            </div>
            {action && <div className="rasta-card__header-action">{action}</div>}
          </>
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ padding = 'md', children, className = '', style, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      padding: paddingStyles[padding],
      ...style,
    };

    return (
      <div ref={ref} className={`rasta-card__body ${className}`} style={baseStyles} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ align = 'right', children, className = '', style, ...props }, ref) => {
    const alignStyles: Record<string, string> = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
      between: 'space-between',
    };

    const baseStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: alignStyles[align],
      gap: '0.75rem',
      padding: '1rem 1.25rem',
      borderTop: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb',
      ...style,
    };

    return (
      <div ref={ref} className={`rasta-card__footer ${className}`} style={baseStyles} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;
