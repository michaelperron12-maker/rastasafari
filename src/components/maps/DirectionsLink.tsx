'use client';

import React, { useState, useCallback } from 'react';
import { getDirectionsUrl, ROARING_RIVER } from '@/lib/maps';

// ============================================
// TYPES
// ============================================

interface DirectionsLinkProps {
  /** Custom CSS class name for the button */
  className?: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Custom button text */
  text?: string;
  /** Show navigation icon */
  showIcon?: boolean;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Use user's current location as origin */
  useCurrentLocation?: boolean;
  /** Custom origin coordinates */
  fromCoordinates?: { lat: number; lng: number };
  /** Full width button */
  fullWidth?: boolean;
  /** Callback when directions are opened */
  onOpen?: () => void;
}

// ============================================
// STYLES
// ============================================

const baseStyles =
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

const variantStyles = {
  primary:
    'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-md hover:shadow-lg',
  secondary:
    'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400 shadow-md hover:shadow-lg',
  outline:
    'border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
  ghost:
    'text-green-600 hover:bg-green-50 focus:ring-green-500',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
};

// ============================================
// ICONS
// ============================================

function NavigationIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function ExternalLinkIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// ============================================
// COMPONENT
// ============================================

/**
 * DirectionsLink Component
 *
 * A button that opens Google Maps with directions to Roaring River.
 * Works on both mobile and desktop devices.
 *
 * Features:
 * - Opens Google Maps in a new tab
 * - Optional geolocation to use current position as origin
 * - Multiple style variants
 * - Responsive sizing
 * - Loading state for geolocation
 */
export default function DirectionsLink({
  className = '',
  variant = 'primary',
  size = 'md',
  text = 'Get Directions',
  showIcon = true,
  iconPosition = 'left',
  useCurrentLocation = false,
  fromCoordinates,
  fullWidth = false,
  onOpen,
}: DirectionsLinkProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle click with optional geolocation
  const handleClick = useCallback(async () => {
    setError(null);

    // If custom coordinates provided, use them
    if (fromCoordinates) {
      const url = getDirectionsUrl(fromCoordinates.lat, fromCoordinates.lng);
      window.open(url, '_blank', 'noopener,noreferrer');
      onOpen?.();
      return;
    }

    // If useCurrentLocation is enabled, try to get user's location
    if (useCurrentLocation && 'geolocation' in navigator) {
      setIsLoading(true);

      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 60000, // 1 minute cache
            });
          }
        );

        const url = getDirectionsUrl(
          position.coords.latitude,
          position.coords.longitude
        );
        window.open(url, '_blank', 'noopener,noreferrer');
        onOpen?.();
      } catch (geoError) {
        // Fallback to directions without origin
        console.warn('Geolocation failed, opening without origin:', geoError);
        const url = getDirectionsUrl();
        window.open(url, '_blank', 'noopener,noreferrer');
        onOpen?.();
      } finally {
        setIsLoading(false);
      }
    } else {
      // Open directions without specific origin
      const url = getDirectionsUrl();
      window.open(url, '_blank', 'noopener,noreferrer');
      onOpen?.();
    }
  }, [fromCoordinates, useCurrentLocation, onOpen]);

  // Combine styles
  const buttonStyles = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  // Icon size based on button size
  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={buttonStyles}
      aria-label={`Get directions to ${ROARING_RIVER.name}`}
    >
      {isLoading ? (
        <LoadingSpinner className={iconSize} />
      ) : (
        <>
          {showIcon && iconPosition === 'left' && (
            <NavigationIcon className={iconSize} />
          )}
          <span>{text}</span>
          {showIcon && iconPosition === 'right' && (
            <ExternalLinkIcon className={iconSize} />
          )}
        </>
      )}
    </button>
  );
}

// ============================================
// ADDITIONAL VARIANTS
// ============================================

/**
 * DirectionsCard Component
 *
 * A card-style directions component with more context
 */
interface DirectionsCardProps {
  className?: string;
  showAddress?: boolean;
}

export function DirectionsCard({
  className = '',
  showAddress = true,
}: DirectionsCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 ${className}`}
    >
      <div className="flex items-start gap-4">
        {/* Map icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
          <NavigationIcon className="w-6 h-6 text-green-600" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">
            {ROARING_RIVER.name}
          </h3>
          {showAddress && (
            <p className="text-gray-600 text-sm mt-1">{ROARING_RIVER.address}</p>
          )}

          {/* Coordinates */}
          <p className="text-gray-400 text-xs mt-2 font-mono">
            {ROARING_RIVER.lat.toFixed(4)}°N, {Math.abs(ROARING_RIVER.lng).toFixed(4)}°W
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <DirectionsLink
          variant="primary"
          size="md"
          text="Open in Google Maps"
          iconPosition="right"
          fullWidth
        />
        <DirectionsLink
          variant="outline"
          size="md"
          text="Use My Location"
          useCurrentLocation
          iconPosition="left"
          fullWidth
        />
      </div>
    </div>
  );
}

/**
 * DirectionsFloatingButton Component
 *
 * A floating action button for mobile devices
 */
interface DirectionsFloatingButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  className?: string;
}

export function DirectionsFloatingButton({
  position = 'bottom-right',
  className = '',
}: DirectionsFloatingButtonProps) {
  const positionStyles = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
  };

  return (
    <div className={`fixed ${positionStyles[position]} z-50 ${className}`}>
      <DirectionsLink
        variant="primary"
        size="lg"
        text="Directions"
        showIcon
        iconPosition="left"
        useCurrentLocation
        className="shadow-xl"
      />
    </div>
  );
}

/**
 * DirectionsInlineLink Component
 *
 * A simple text link for inline use
 */
interface DirectionsInlineLinkProps {
  className?: string;
  text?: string;
}

export function DirectionsInlineLink({
  className = '',
  text = 'Get directions',
}: DirectionsInlineLinkProps) {
  const url = getDirectionsUrl();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-green-600 hover:text-green-800 underline underline-offset-2 inline-flex items-center gap-1 ${className}`}
    >
      {text}
      <ExternalLinkIcon className="w-4 h-4" />
    </a>
  );
}

// ============================================
// EXPORTS
// ============================================

export {
  DirectionsLink,
  NavigationIcon,
  ExternalLinkIcon,
};
