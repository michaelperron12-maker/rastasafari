/**
 * Gallery Images Data for Rastasafari Experience
 *
 * Categories: ATV, Food, Nature, Culture, People
 * Replace placeholder URLs with actual images
 */

export type ImageCategory = 'ATV' | 'Food' | 'Nature' | 'Culture' | 'People';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: ImageCategory;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}

export const galleryImages: GalleryImage[] = [
  // ATV Adventures
  {
    id: 'atv-1',
    src: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/jamaica/image-4-a6cf56d15056a36_a6cf5897-5056-a36a-075c387a1308d3be.jpg',
    alt: 'ATV adventure through Jamaican mountains',
    category: 'ATV',
    title: 'Mountain Trail Adventure',
    description: 'Explore the rugged terrain of Jamaica on our powerful ATVs',
    width: 1200,
    height: 800,
  },
  {
    id: 'atv-2',
    src: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/jamaica/image-5-a6eea95c5056a36_a6eeab3b-5056-a36a-0716b0de4cc129b9.jpg',
    alt: 'Group ATV tour in the jungle',
    category: 'ATV',
    title: 'Jungle Expedition',
    description: 'Experience the thrill of riding through lush tropical forests',
    width: 1200,
    height: 800,
  },
  {
    id: 'atv-3',
    src: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/jamaica/image-4-a6cf56d15056a36_a6cf5897-5056-a36a-075c387a1308d3be.jpg',
    alt: 'ATV riders crossing a river',
    category: 'ATV',
    title: 'River Crossing',
    description: 'Navigate through crystal-clear Jamaican rivers',
    width: 1200,
    height: 800,
  },

  // Food & Cuisine
  {
    id: 'food-1',
    src: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/jamaica/image-5-a6eea95c5056a36_a6eeab3b-5056-a36a-0716b0de4cc129b9.jpg',
    alt: 'Traditional Jamaican jerk chicken',
    category: 'Food',
    title: 'Authentic Jerk Chicken',
    description: 'Taste the famous Jamaican jerk seasoning',
    width: 1200,
    height: 800,
  },
  {
    id: 'food-2',
    src: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/jamaica/image-4-a6cf56d15056a36_a6cf5897-5056-a36a-075c387a1308d3be.jpg',
    alt: 'Fresh tropical fruits display',
    category: 'Food',
    title: 'Tropical Fruits',
    description: 'Fresh mangoes, papayas, and exotic fruits',
    width: 1200,
    height: 800,
  },

  // Nature
  {
    id: 'nature-1',
    src: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/jamaica/image-5-a6eea95c5056a36_a6eeab3b-5056-a36a-0716b0de4cc129b9.jpg',
    alt: 'Lush Jamaican rainforest',
    category: 'Nature',
    title: 'Tropical Rainforest',
    description: 'Discover the biodiversity of Jamaica\'s forests',
    width: 1200,
    height: 800,
  },
  {
    id: 'nature-2',
    src: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/jamaica/image-4-a6cf56d15056a36_a6cf5897-5056-a36a-075c387a1308d3be.jpg',
    alt: 'Beautiful waterfall in the mountains',
    category: 'Nature',
    title: 'Hidden Waterfall',
    description: 'Secret waterfalls tucked away in the mountains',
    width: 1200,
    height: 800,
  },
  {
    id: 'nature-3',
    src: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/jamaica/image-5-a6eea95c5056a36_a6eeab3b-5056-a36a-0716b0de4cc129b9.jpg',
    alt: 'Sunset over the Caribbean sea',
    category: 'Nature',
    title: 'Caribbean Sunset',
    description: 'Breathtaking sunsets over the crystal waters',
    width: 1200,
    height: 800,
  },

  // Culture
  {
    id: 'culture-1',
    src: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/jamaica/image-4-a6cf56d15056a36_a6cf5897-5056-a36a-075c387a1308d3be.jpg',
    alt: 'Rastafarian art and crafts',
    category: 'Culture',
    title: 'Rasta Art',
    description: 'Vibrant colors of Rastafarian culture',
    width: 1200,
    height: 800,
  },
  {
    id: 'culture-2',
    src: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/jamaica/image-5-a6eea95c5056a36_a6eeab3b-5056-a36a-0716b0de4cc129b9.jpg',
    alt: 'Traditional Jamaican music performance',
    category: 'Culture',
    title: 'Reggae Vibes',
    description: 'Feel the rhythm of authentic Jamaican music',
    width: 1200,
    height: 800,
  },

  // People
  {
    id: 'people-1',
    src: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/jamaica/image-4-a6cf56d15056a36_a6cf5897-5056-a36a-075c387a1308d3be.jpg',
    alt: 'Friendly local guide smiling',
    category: 'People',
    title: 'Meet Our Guides',
    description: 'Our experienced and friendly local guides',
    width: 1200,
    height: 800,
  },
  {
    id: 'people-2',
    src: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/jamaica/image-5-a6eea95c5056a36_a6eeab3b-5056-a36a-0716b0de4cc129b9.jpg',
    alt: 'Happy tourists enjoying the experience',
    category: 'People',
    title: 'Happy Adventurers',
    description: 'Creating unforgettable memories',
    width: 1200,
    height: 800,
  },
];

// Helper function to filter images by category
export const getImagesByCategory = (category: ImageCategory): GalleryImage[] => {
  return galleryImages.filter((image) => image.category === category);
};

// Helper function to get all unique categories
export const getAllCategories = (): ImageCategory[] => {
  return ['ATV', 'Food', 'Nature', 'Culture', 'People'];
};

// Helper function to get image by ID
export const getImageById = (id: string): GalleryImage | undefined => {
  return galleryImages.find((image) => image.id === id);
};
