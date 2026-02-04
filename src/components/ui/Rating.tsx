'use client';

import React, { HTMLAttributes, forwardRef } from 'react';

// Couleurs Rasta
const RASTA_COLORS = {
  green: '#009B3A',
  gold: '#FED100',
  red: '#E31C23',
} as const;

export type RatingSize = 'sm' | 'md' | 'lg';
export type RatingScale = 5 | 10;

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  maxValue?: RatingScale;
  size?: RatingSize;
  showValue?: boolean;
  showReviews?: boolean;
  reviewCount?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
  color?: string;
}

const sizeStyles: Record<RatingSize, { star: number; fontSize: string; gap: string }> = {
  sm: {
    star: 14,
    fontSize: '0.75rem',
    gap: '0.125rem',
  },
  md: {
    star: 18,
    fontSize: '0.875rem',
    gap: '0.25rem',
  },
  lg: {
    star: 24,
    fontSize: '1rem',
    gap: '0.375rem',
  },
};

// Star SVG component
const StarIcon: React.FC<{
  filled: number; // 0 = empty, 0.5 = half, 1 = full
  size: number;
  color: string;
  emptyColor?: string;
}> = ({ filled, size, color, emptyColor = '#d1d5db' }) => {
  const id = `star-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {filled > 0 && filled < 1 && (
        <defs>
          <linearGradient id={id}>
            <stop offset={`${filled * 100}%`} stopColor={color} />
            <stop offset={`${filled * 100}%`} stopColor={emptyColor} />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={
          filled === 1
            ? color
            : filled === 0
              ? emptyColor
              : `url(#${id})`
        }
      />
    </svg>
  );
};

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value,
      maxValue = 5,
      size = 'md',
      showValue = true,
      showReviews = false,
      reviewCount = 0,
      interactive = false,
      onChange,
      color = RASTA_COLORS.gold,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeStyles[size];
    // Normalize value to 5-star scale if maxValue is 10
    const normalizedValue = maxValue === 10 ? value / 2 : value;
    const displayValue = Math.min(Math.max(value, 0), maxValue);

    const containerStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      ...style,
    };

    const starsContainerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: sizeConfig.gap,
    };

    const valueStyles: React.CSSProperties = {
      fontSize: sizeConfig.fontSize,
      fontWeight: 600,
      color: '#1a1a1a',
    };

    const reviewsStyles: React.CSSProperties = {
      fontSize: sizeConfig.fontSize,
      color: '#6b7280',
    };

    const handleStarClick = (starIndex: number) => {
      if (interactive && onChange) {
        const newValue = maxValue === 10 ? (starIndex + 1) * 2 : starIndex + 1;
        onChange(newValue);
      }
    };

    const handleStarHover = (starIndex: number) => {
      // Could add hover state if needed
    };

    // Generate stars (always 5 stars displayed)
    const stars = Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      let filled = 0;

      if (normalizedValue >= starValue) {
        filled = 1;
      } else if (normalizedValue >= starValue - 0.5) {
        filled = 0.5;
      }

      return (
        <span
          key={index}
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => handleStarHover(index)}
          style={{
            cursor: interactive ? 'pointer' : 'default',
            display: 'inline-flex',
          }}
        >
          <StarIcon
            filled={filled}
            size={sizeConfig.star}
            color={color}
          />
        </span>
      );
    });

    // Format review count
    const formatReviewCount = (count: number): string => {
      if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
      }
      if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`;
      }
      return count.toString();
    };

    return (
      <div
        ref={ref}
        className={`rasta-rating rasta-rating--${size} ${className}`}
        style={containerStyles}
        role="img"
        aria-label={`Note: ${displayValue} sur ${maxValue}`}
        {...props}
      >
        <div style={starsContainerStyles}>{stars}</div>
        {showValue && (
          <span style={valueStyles}>
            {displayValue.toFixed(1)}{maxValue === 10 && '/10'}
          </span>
        )}
        {showReviews && reviewCount > 0 && (
          <span style={reviewsStyles}>({formatReviewCount(reviewCount)} avis)</span>
        )}
      </div>
    );
  }
);

Rating.displayName = 'Rating';

// Convenience component for displaying rating with reviews
export const RatingWithReviews: React.FC<Omit<RatingProps, 'showReviews'>> = (props) => (
  <Rating showReviews {...props} />
);

export default Rating;
