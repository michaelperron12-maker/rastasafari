/**
 * Gallery Components for Rastasafari Experience
 *
 * Export all gallery-related components for easy importing
 */

export { PhotoGallery } from './PhotoGallery';
export { ImageCarousel } from './ImageCarousel';
export { PhotoCard } from './PhotoCard';

// Re-export types and data
export type { GalleryImage, ImageCategory } from '@/data/gallery-images';
export {
  galleryImages,
  getImagesByCategory,
  getAllCategories,
  getImageById,
} from '@/data/gallery-images';
