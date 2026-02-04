import { MetadataRoute } from 'next';
import { SEO_CONSTANTS } from '@/lib/seo';

/**
 * Dynamic Sitemap Generation for Rastasafari Experience Jamaica
 *
 * This file generates the sitemap.xml automatically using Next.js App Router.
 * The sitemap helps search engines discover and index all pages.
 *
 * Reference: https://nextjs.org/docs/app/api-reference/file-conventions/sitemap
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONSTANTS.siteUrl;
  const currentDate = new Date().toISOString();

  // Define all static pages with their SEO properties
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Reservation page - high priority (conversion page)
    {
      url: `${baseUrl}/reservation`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    // Experiences/Tours page
    {
      url: `${baseUrl}/experiences`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // About page
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Gallery page
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Reviews page
    {
      url: `${baseUrl}/reviews`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // FAQ page
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Contact page
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Privacy Policy
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Terms of Service
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Location-specific landing pages (for local SEO)
  const locationPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/tours/montego-bay`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tours/negril`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tours/ocho-rios`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tours/falmouth`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Activity-specific landing pages (for keyword targeting)
  const activityPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/activities/atv-tour`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/activities/cultural-experience`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/activities/ital-food`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/activities/mineral-springs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Language alternates (if multilingual support exists)
  const languagePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/es`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/fr`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/de`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Combine all pages
  return [
    ...staticPages,
    ...locationPages,
    ...activityPages,
    ...languagePages,
  ];
}

/**
 * Alternative export for sitemap index (for large sites)
 * Uncomment if you need to split sitemap into multiple files
 */
// export async function generateSitemaps() {
//   return [
//     { id: 'main' },
//     { id: 'locations' },
//     { id: 'activities' },
//     { id: 'blog' },
//   ];
// }
