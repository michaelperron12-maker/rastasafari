'use client';

import React, { HTMLAttributes, forwardRef, useState } from 'react';

// Couleurs Rasta
const RASTA_COLORS = {
  green: '#009B3A',
  gold: '#FED100',
  red: '#E31C23',
} as const;

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

const variantStyles: Record<
  AlertVariant,
  { bg: string; border: string; text: string; icon: string }
> = {
  success: {
    bg: 'rgba(0, 155, 58, 0.1)',
    border: RASTA_COLORS.green,
    text: '#065f26',
    icon: RASTA_COLORS.green,
  },
  error: {
    bg: 'rgba(227, 28, 35, 0.1)',
    border: RASTA_COLORS.red,
    text: '#991b1b',
    icon: RASTA_COLORS.red,
  },
  warning: {
    bg: 'rgba(254, 209, 0, 0.15)',
    border: RASTA_COLORS.gold,
    text: '#92400e',
    icon: '#d97706',
  },
  info: {
    bg: 'rgba(59, 130, 246, 0.1)',
    border: '#3b82f6',
    text: '#1e40af',
    icon: '#3b82f6',
  },
};

// Default icons for each variant
const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      icon,
      dismissible = false,
      onDismiss,
      action,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const variantConfig = variantStyles[variant];
    const displayIcon = icon !== undefined ? icon : defaultIcons[variant];

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible) return null;

    const containerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      padding: '1rem',
      backgroundColor: variantConfig.bg,
      border: `1px solid ${variantConfig.border}`,
      borderRadius: '0.5rem',
      borderLeftWidth: '4px',
      ...style,
    };

    const iconStyles: React.CSSProperties = {
      flexShrink: 0,
      color: variantConfig.icon,
      marginTop: '0.125rem',
    };

    const contentStyles: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
    };

    const titleStyles: React.CSSProperties = {
      fontSize: '0.9375rem',
      fontWeight: 600,
      color: variantConfig.text,
      marginBottom: children ? '0.25rem' : 0,
    };

    const textStyles: React.CSSProperties = {
      fontSize: '0.875rem',
      color: variantConfig.text,
      opacity: 0.9,
      lineHeight: 1.5,
    };

    const actionsStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginLeft: 'auto',
      flexShrink: 0,
    };

    const dismissButtonStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.25rem',
      border: 'none',
      borderRadius: '0.25rem',
      backgroundColor: 'transparent',
      color: variantConfig.text,
      cursor: 'pointer',
      opacity: 0.7,
      transition: 'opacity 0.2s',
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={`rasta-alert rasta-alert--${variant} ${className}`}
        style={containerStyles}
        {...props}
      >
        {displayIcon && <span style={iconStyles}>{displayIcon}</span>}
        <div style={contentStyles}>
          {title && <div style={titleStyles}>{title}</div>}
          {children && <div style={textStyles}>{children}</div>}
        </div>
        <div style={actionsStyles}>
          {action}
          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              style={dismissButtonStyles}
              aria-label="Fermer"
              className="rasta-alert__dismiss"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

// Convenience components for each variant
export const SuccessAlert: React.FC<Omit<AlertProps, 'variant'>> = (props) => (
  <Alert variant="success" {...props} />
);

export const ErrorAlert: React.FC<Omit<AlertProps, 'variant'>> = (props) => (
  <Alert variant="error" {...props} />
);

export const WarningAlert: React.FC<Omit<AlertProps, 'variant'>> = (props) => (
  <Alert variant="warning" {...props} />
);

export const InfoAlert: React.FC<Omit<AlertProps, 'variant'>> = (props) => (
  <Alert variant="info" {...props} />
);

export default Alert;
