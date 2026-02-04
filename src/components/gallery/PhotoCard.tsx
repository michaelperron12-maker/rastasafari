'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/data/gallery-images';

interface PhotoCardProps {
  image: GalleryImage;
  onClick?: (image: GalleryImage) => void;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  showTitle?: boolean;
}

/**
 * PhotoCard Component
 *
 * Displays a photo card with hover effects and zoom icon overlay.
 * Used in the photo gallery grid.
 */
export const PhotoCard: React.FC<PhotoCardProps> = ({
  image,
  onClick,
  className = '',
  aspectRatio = 'video',
  showTitle = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  };

  const handleClick = () => {
    if (onClick) {
      onClick(image);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg cursor-pointer
        group transition-all duration-300 ease-out
        hover:shadow-xl hover:shadow-black/20
        ${aspectRatioClasses[aspectRatio]}
        ${className}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`View ${image.alt}`}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`
            object-cover transition-all duration-500 ease-out
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
          onLoad={() => setIsLoaded(true)}
        />

        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
        )}
      </div>

      {/* Hover Overlay */}
      <div
        className={`
          absolute inset-0 bg-black/0 group-hover:bg-black/40
          transition-all duration-300 ease-out
          flex items-center justify-center
        `}
      >
        {/* Zoom Icon */}
        <div
          className={`
            w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm
            flex items-center justify-center
            transform transition-all duration-300 ease-out
            ${isHovered ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
            shadow-lg
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
      </div>

      {/* Category Badge */}
      <div
        className={`
          absolute top-3 left-3 px-3 py-1
          bg-gradient-to-r from-green-600 to-yellow-500
          text-white text-xs font-semibold uppercase tracking-wider
          rounded-full shadow-md
          transform transition-all duration-300
          ${isHovered ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}
        `}
      >
        {image.category}
      </div>

      {/* Title Overlay (optional) */}
      {showTitle && image.title && (
        <div
          className={`
            absolute bottom-0 left-0 right-0 p-4
            bg-gradient-to-t from-black/80 via-black/40 to-transparent
            transform transition-all duration-300
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
          `}
        >
          <h3 className="text-white font-bold text-lg">{image.title}</h3>
          {image.description && (
            <p className="text-white/80 text-sm mt-1 line-clamp-2">
              {image.description}
            </p>
          )}
        </div>
      )}

      {/* Rastafari-themed border on hover */}
      <div
        className={`
          absolute inset-0 rounded-lg pointer-events-none
          transition-all duration-300
          ${isHovered
            ? 'ring-4 ring-inset ring-gradient-to-r from-red-500 via-yellow-500 to-green-500'
            : 'ring-0'
          }
        `}
        style={{
          boxShadow: isHovered
            ? 'inset 0 0 0 3px #DC2626, inset 0 0 0 6px #EAB308, inset 0 0 0 9px #16A34A'
            : 'none'
        }}
      />
    </div>
  );
};

export default PhotoCard;
