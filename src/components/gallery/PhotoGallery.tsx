'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { GalleryImage, ImageCategory, getAllCategories } from '@/data/gallery-images';
import { PhotoCard } from './PhotoCard';

interface PhotoGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  showFilter?: boolean;
  className?: string;
}

/**
 * PhotoGallery Component
 *
 * Responsive photo grid with lightbox functionality.
 * Features:
 * - Responsive grid layout
 * - Category filtering
 * - Lightbox with navigation
 * - Keyboard navigation (arrows, escape)
 * - Image counter
 */
export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  images,
  columns = 3,
  showFilter = true,
  className = '',
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<ImageCategory | 'All'>('All');
  const [isLightboxClosing, setIsLightboxClosing] = useState(false);

  const categories = getAllCategories();

  // Filter images by category
  const filteredImages = activeCategory === 'All'
    ? images
    : images.filter((img) => img.category === activeCategory);

  // Open lightbox
  const openLightbox = (image: GalleryImage) => {
    const index = filteredImages.findIndex((img) => img.id === image.id);
    setSelectedIndex(index);
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox with animation
  const closeLightbox = useCallback(() => {
    setIsLightboxClosing(true);
    setTimeout(() => {
      setSelectedImage(null);
      setIsLightboxClosing(false);
      document.body.style.overflow = 'auto';
    }, 200);
  }, []);

  // Navigate to previous image
  const goToPrevious = useCallback(() => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    } else {
      // Loop to last image
      const newIndex = filteredImages.length - 1;
      setSelectedIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    }
  }, [selectedIndex, filteredImages]);

  // Navigate to next image
  const goToNext = useCallback(() => {
    if (selectedIndex < filteredImages.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    } else {
      // Loop to first image
      setSelectedIndex(0);
      setSelectedImage(filteredImages[0]);
    }
  }, [selectedIndex, filteredImages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
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
  }, [selectedImage, closeLightbox, goToPrevious, goToNext]);

  // Grid column classes
  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Category Filter */}
      {showFilter && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveCategory('All')}
            className={`
              px-5 py-2 rounded-full font-medium text-sm
              transition-all duration-300 ease-out
              ${activeCategory === 'All'
                ? 'bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-5 py-2 rounded-full font-medium text-sm
                transition-all duration-300 ease-out
                ${activeCategory === category
                  ? 'bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Photo Grid */}
      <div className={`grid ${gridClasses[columns]} gap-4 md:gap-6`}>
        {filteredImages.map((image) => (
          <PhotoCard
            key={image.id}
            image={image}
            onClick={openLightbox}
            showTitle
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No images found in this category.</p>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div
          className={`
            fixed inset-0 z-50 flex items-center justify-center
            bg-black/95 backdrop-blur-sm
            transition-opacity duration-200
            ${isLightboxClosing ? 'opacity-0' : 'opacity-100'}
          `}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="
              absolute top-4 right-4 z-10
              w-12 h-12 rounded-full
              bg-white/10 hover:bg-white/20
              flex items-center justify-center
              transition-all duration-200
              group
            "
            aria-label="Close lightbox"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image Counter */}
          <div className="
            absolute top-4 left-4
            px-4 py-2 rounded-full
            bg-white/10 backdrop-blur-sm
            text-white font-medium
          ">
            {selectedIndex + 1} / {filteredImages.length}
          </div>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="
              absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10
              w-12 h-12 md:w-14 md:h-14 rounded-full
              bg-white/10 hover:bg-white/20
              flex items-center justify-center
              transition-all duration-200
              group
            "
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="
              absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10
              w-12 h-12 md:w-14 md:h-14 rounded-full
              bg-white/10 hover:bg-white/20
              flex items-center justify-center
              transition-all duration-200
              group
            "
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Main Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4 md:mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Image Info */}
          <div className="
            absolute bottom-4 left-4 right-4
            text-center
          ">
            {selectedImage.title && (
              <h3 className="text-white text-xl font-bold mb-1">
                {selectedImage.title}
              </h3>
            )}
            {selectedImage.description && (
              <p className="text-white/70 text-sm max-w-xl mx-auto">
                {selectedImage.description}
              </p>
            )}
          </div>

          {/* Keyboard Hint */}
          <div className="
            absolute bottom-4 right-4
            hidden md:flex items-center gap-2
            text-white/50 text-xs
          ">
            <kbd className="px-2 py-1 bg-white/10 rounded">ESC</kbd>
            <span>to close</span>
            <kbd className="px-2 py-1 bg-white/10 rounded ml-2">←</kbd>
            <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd>
            <span>to navigate</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
