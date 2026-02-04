'use client';

import React, { HTMLAttributes, forwardRef } from 'react';

// Couleurs Rasta
const RASTA_COLORS = {
  green: '#009B3A',
  gold: '#FED100',
  red: '#E31C23',
} as const;

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'default' | 'rasta' | 'dots';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  color?: string;
  label?: string;
}

const sizeStyles: Record<SpinnerSize, { size: number; borderWidth: number }> = {
  xs: { size: 12, borderWidth: 2 },
  sm: { size: 16, borderWidth: 2 },
  md: { size: 24, borderWidth: 3 },
  lg: { size: 36, borderWidth: 4 },
  xl: { size: 48, borderWidth: 4 },
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      variant = 'default',
      color = RASTA_COLORS.green,
      label = 'Chargement...',
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeStyles[size];

    // Generate unique ID for keyframes
    const spinnerId = `spinner-${Math.random().toString(36).substr(2, 9)}`;

    if (variant === 'rasta') {
      return (
        <div
          ref={ref}
          className={`rasta-spinner rasta-spinner--rasta rasta-spinner--${size} ${className}`}
          role="status"
          aria-label={label}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...style,
          }}
          {...props}
        >
          <style>{`
            @keyframes spin-${spinnerId} {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <svg
            width={sizeConfig.size}
            height={sizeConfig.size}
            viewBox="0 0 50 50"
            style={{
              animation: `spin-${spinnerId} 1s linear infinite`,
            }}
          >
            {/* Green arc */}
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke={RASTA_COLORS.green}
              strokeWidth={sizeConfig.borderWidth + 1}
              strokeDasharray="31.4 62.8"
              strokeLinecap="round"
            />
            {/* Gold arc */}
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke={RASTA_COLORS.gold}
              strokeWidth={sizeConfig.borderWidth + 1}
              strokeDasharray="31.4 62.8"
              strokeDashoffset="-31.4"
              strokeLinecap="round"
            />
            {/* Red arc */}
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke={RASTA_COLORS.red}
              strokeWidth={sizeConfig.borderWidth + 1}
              strokeDasharray="31.4 62.8"
              strokeDashoffset="-62.8"
              strokeLinecap="round"
            />
          </svg>
          <span className="sr-only" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
            {label}
          </span>
        </div>
      );
    }

    if (variant === 'dots') {
      const dotSize = sizeConfig.size / 4;
      return (
        <div
          ref={ref}
          className={`rasta-spinner rasta-spinner--dots rasta-spinner--${size} ${className}`}
          role="status"
          aria-label={label}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: dotSize / 2,
            ...style,
          }}
          {...props}
        >
          <style>{`
            @keyframes bounce-${spinnerId} {
              0%, 80%, 100% {
                transform: scale(0);
                opacity: 0.5;
              }
              40% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: '50%',
                backgroundColor: color,
                animation: `bounce-${spinnerId} 1.4s ease-in-out infinite`,
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
          <span className="sr-only" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
            {label}
          </span>
        </div>
      );
    }

    // Default spinner
    return (
      <div
        ref={ref}
        className={`rasta-spinner rasta-spinner--default rasta-spinner--${size} ${className}`}
        role="status"
        aria-label={label}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
        {...props}
      >
        <style>{`
          @keyframes spin-${spinnerId} {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div
          style={{
            width: sizeConfig.size,
            height: sizeConfig.size,
            border: `${sizeConfig.borderWidth}px solid rgba(0, 155, 58, 0.2)`,
            borderTopColor: color,
            borderRadius: '50%',
            animation: `spin-${spinnerId} 0.75s linear infinite`,
          }}
        />
        <span className="sr-only" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
          {label}
        </span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

// Full page loading spinner
export interface LoadingOverlayProps extends SpinnerProps {
  text?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  text = 'Chargement en cours...',
  size = 'lg',
  variant = 'rasta',
  ...props
}) => {
  const overlayStyles: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(4px)',
    zIndex: 9999,
  };

  const textStyles: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: 500,
    color: RASTA_COLORS.green,
  };

  return (
    <div style={overlayStyles}>
      <Spinner size={size} variant={variant} {...props} />
      {text && <p style={textStyles}>{text}</p>}
    </div>
  );
};

export default Spinner;
