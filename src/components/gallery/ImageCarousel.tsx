'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/data/gallery-images';

interface ImageCarouselProps {
  images: GalleryImage[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  aspectRatio?: 'video' | 'wide' | 'square';
  onImageClick?: (image: GalleryImage) => void;
}

/**
 * ImageCarousel Component
 *
 * Horizontal carousel with autoplay and touch/swipe support.
 * Features:
 * - Autoplay with configurable interval
 * - Dot indicators
 * - Arrow navigation
 * - Touch/swipe support on mobile
 * - Pause on hover
 */
export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoplay = false,
  autoplayInterval = 5000,
  showDots = true,
  showArrows = true,
  className = '',
  aspectRatio = 'video',
  onImageClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const aspectRatioClasses = {
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    square: 'aspect-square',
  };

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning]);

  // Go to next slide
  const goToNext = useCallback(() => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    goToSlide(nextIndex);
  }, [currentIndex, images.length, goToSlide]);

  // Go to previous slide
  const goToPrevious = useCallback(() => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  }, [currentIndex, images.length, goToSlide]);

  // Autoplay functionality
  useEffect((): (() => void) | void => {
    if (!autoplay || isHovered || images.length <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, isHovered, goToNext, images.length]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselRef.current?.contains(document.activeElement)) return;

      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      ref={carouselRef}
      className={`relative w-full overflow-hidden rounded-xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
      role="region"
      aria-label="Image carousel"
      aria-roledescription="carousel"
    >
      {/* Slides Container */}
      <div className={`relative w-full ${aspectRatioClasses[aspectRatio]}`}>
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`
              absolute inset-0 transition-all duration-500 ease-out
              ${index === currentIndex
                ? 'opacity-100 z-10 scale-100'
                : 'opacity-0 z-0 scale-105'
              }
            `}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              className={`
                object-cover cursor-pointer
                transition-transform duration-700
                ${isHovered && index === currentIndex ? 'scale-105' : 'scale-100'}
              `}
              priority={index === 0}
              onClick={() => onImageClick?.(image)}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Image Info */}
            <div className={`
              absolute bottom-0 left-0 right-0 p-6 md:p-8
              transform transition-all duration-500
              ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}>
              {image.title && (
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                  {image.title}
                </h3>
              )}
              {image.description && (
                <p className="text-white/80 text-sm md:text-base max-w-xl">
                  {image.description}
                </p>
              )}
              {/* Category Badge */}
              <span className="
                inline-block mt-3 px-3 py-1
                bg-gradient-to-r from-red-600 via-yellow-500 to-green-600
                text-white text-xs font-semibold uppercase tracking-wider
                rounded-full
              ">
                {image.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Arrow Navigation */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={`
              absolute left-4 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 md:w-12 md:h-12 rounded-full
              bg-white/20 hover:bg-white/30 backdrop-blur-sm
              flex items-center justify-center
              transition-all duration-300
              ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
              group
            `}
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className={`
              absolute right-4 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 md:w-12 md:h-12 rounded-full
              bg-white/20 hover:bg-white/30 backdrop-blur-sm
              flex items-center justify-center
              transition-all duration-300
              ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
              group
            `}
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {showDots && images.length > 1 && (
        <div className="
          absolute bottom-4 left-1/2 -translate-x-1/2 z-20
          flex items-center gap-2
        ">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                transition-all duration-300 rounded-full
                ${index === currentIndex
                  ? 'w-8 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Autoplay Progress Bar */}
      {autoplay && !isHovered && images.length > 1 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
            style={{
              animation: `progress ${autoplayInterval}ms linear infinite`,
            }}
          />
        </div>
      )}

      {/* CSS for progress animation */}
      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;
