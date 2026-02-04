/**
 * SEO Configuration for Rastasafari Experience Jamaica
 * Complete SEO constants and metadata generation functions
 */

import { Metadata } from 'next';

// =============================================================================
// SEO CONSTANTS
// =============================================================================

export const SEO_CONSTANTS = {
  // Site Information
  siteName: 'Rastasafari Experience Jamaica',
  siteUrl: 'https://rastasafari.com',

  // Default Meta
  defaultTitle: 'Rastasafari Experience Jamaica | #1 Rated ATV & Cultural Tour',
  defaultDescription: 'Experience authentic Rastafari culture with the top-rated outdoor activity in Jamaica. ATV adventure, Ital cuisine, mineral springs. Book now $165 USD.',

  // Keywords
  keywords: [
    'rastasafari experience',
    'jamaica atv tour',
    'rastafari culture',
    'montego bay tours',
    'negril excursions',
    'rastasafari experience jamaica',
    'atv tour jamaica',
    'best things to do montego bay',
    'rastafari cultural experience',
    'jamaica outdoor activities',
    'authentic jamaica experience',
    'jamaican culture tour',
    'mineral springs jamaica',
    'ital food experience',
    'reggae culture tour',
    'adventure tours jamaica',
    'eco tourism jamaica',
    'jamaican heritage tour',
    'off road adventure jamaica',
    'nature tours montego bay',
  ],

  // Business Information
  business: {
    name: 'Rastasafari Experience',
    legalName: 'Rastasafari Experience Jamaica Ltd.',
    type: 'TourProvider',
    phone: '+1-876-XXX-XXXX', // Replace with actual phone
    email: 'info@rastasafari.com',
    address: {
      streetAddress: 'Montego Bay Area',
      addressLocality: 'Montego Bay',
      addressRegion: 'St. James',
      postalCode: '',
      addressCountry: 'JM',
    },
    geo: {
      latitude: 18.4762,
      longitude: -77.8939,
    },
    priceRange: '$$$',
    currency: 'USD',
  },

  // Ratings
  rating: {
    ratingValue: 9.8,
    bestRating: 10,
    worstRating: 1,
    ratingCount: 2142,
  },

  // Tour Information
  tour: {
    name: 'Rastasafari ATV & Cultural Experience',
    description: 'The ultimate Jamaican adventure combining thrilling ATV rides through scenic trails, authentic Rastafari cultural immersion, traditional Ital cuisine, and refreshing mineral spring waters.',
    price: 165,
    priceCurrency: 'USD',
    duration: 'PT4H', // ISO 8601 duration: 4 hours
    availableLanguages: ['en', 'es', 'fr', 'de'],
  },

  // Social Media
  social: {
    twitter: '@rastasafari',
    facebook: 'https://facebook.com/rastasafarijamaica',
    instagram: 'https://instagram.com/rastasafarijamaica',
    youtube: 'https://youtube.com/@rastasafarijamaica',
    tripadvisor: 'https://tripadvisor.com/Attraction_Review-rastasafari-experience',
  },

  // Images
  images: {
    ogImage: '/images/og-image.jpg',
    twitterImage: '/images/twitter-card.jpg',
    logo: '/images/logo.png',
    favicon: '/favicon.ico',
  },
} as const;

// =============================================================================
// PAGE-SPECIFIC METADATA
// =============================================================================

export const PAGE_METADATA = {
  home: {
    title: 'Rastasafari Experience Jamaica | #1 Rated ATV & Cultural Tour',
    description: 'Experience authentic Rastafari culture with the top-rated outdoor activity in Jamaica. ATV adventure, Ital cuisine, mineral springs. Book now $165 USD.',
    keywords: ['rastasafari experience jamaica', 'atv tour jamaica', 'best things to do montego bay'],
  },

  booking: {
    title: 'Book Your Rastasafari Adventure | Instant Confirmation',
    description: 'Book the #1 rated tour in Jamaica. ATV adventure, Rastafari culture, Ital food & mineral springs. $165 USD per person. Free cancellation up to 24h.',
    keywords: ['book jamaica tour', 'rastasafari booking', 'jamaica adventure reservation'],
  },

  about: {
    title: 'About Rastasafari Experience | Authentic Jamaican Culture',
    description: 'Learn about Rastasafari Experience - Jamaica\'s premier cultural and adventure tour. Discover our story, our guides, and our commitment to authentic experiences.',
    keywords: ['about rastasafari', 'jamaican tour company', 'authentic rastafari culture'],
  },

  gallery: {
    title: 'Photo Gallery | Rastasafari Experience Jamaica',
    description: 'View stunning photos from Rastasafari Experience tours. ATV adventures, cultural moments, Ital cuisine, and natural beauty of Jamaica.',
    keywords: ['rastasafari photos', 'jamaica tour pictures', 'atv adventure gallery'],
  },

  reviews: {
    title: 'Guest Reviews | 9.8/10 Rating | Rastasafari Experience',
    description: 'Read 2,142+ verified reviews from Rastasafari Experience guests. Rated 9.8/10 - the highest-rated outdoor activity in Jamaica.',
    keywords: ['rastasafari reviews', 'jamaica tour reviews', 'tripadvisor jamaica'],
  },

  contact: {
    title: 'Contact Us | Rastasafari Experience Jamaica',
    description: 'Get in touch with Rastasafari Experience. Questions about tours, bookings, or special requests? We\'re here to help make your Jamaica adventure unforgettable.',
    keywords: ['contact rastasafari', 'jamaica tour contact', 'booking inquiry'],
  },

  faq: {
    title: 'FAQ | Frequently Asked Questions | Rastasafari Experience',
    description: 'Find answers to common questions about Rastasafari Experience tours. What to bring, pickup locations, dietary requirements, and more.',
    keywords: ['rastasafari faq', 'jamaica tour questions', 'atv tour information'],
  },
} as const;

// =============================================================================
// METADATA GENERATION FUNCTIONS
// =============================================================================

export type PageKey = keyof typeof PAGE_METADATA;

/**
 * Generate complete Next.js Metadata for a specific page
 */
export function generatePageMetadata(
  page: PageKey,
  options?: {
    canonical?: string;
    noIndex?: boolean;
    additionalKeywords?: string[];
  }
): Metadata {
  const pageData = PAGE_METADATA[page];
  const { siteName, siteUrl, images, social, keywords: defaultKeywords } = SEO_CONSTANTS;

  const allKeywords = [
    ...pageData.keywords,
    ...(options?.additionalKeywords || []),
  ];

  const canonical = options?.canonical || `${siteUrl}/${page === 'home' ? '' : page}`;

  return {
    title: pageData.title,
    description: pageData.description,
    keywords: allKeywords,

    metadataBase: new URL(siteUrl),

    alternates: {
      canonical,
      languages: {
        'en-US': canonical,
        'en-GB': `${canonical}?lang=en-gb`,
        'es': `${canonical}?lang=es`,
        'fr': `${canonical}?lang=fr`,
        'de': `${canonical}?lang=de`,
      },
    },

    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonical,
      siteName,
      title: pageData.title,
      description: pageData.description,
      images: [
        {
          url: images.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteName} - ATV & Cultural Tour Jamaica`,
        },
        {
          url: '/images/og-image-square.jpg',
          width: 1200,
          height: 1200,
          alt: `${siteName} - Adventure Awaits`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      site: social.twitter,
      creator: social.twitter,
      title: pageData.title,
      description: pageData.description,
      images: [images.twitterImage],
    },

    robots: options?.noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },

    verification: {
      google: 'your-google-verification-code', // Replace with actual code
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },

    category: 'travel',
  };
}

/**
 * Generate metadata for dynamic pages (e.g., blog posts, tour details)
 */
export function generateDynamicMetadata(options: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  canonical: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}): Metadata {
  const { siteName, siteUrl, images, social } = SEO_CONSTANTS;

  return {
    title: options.title,
    description: options.description,
    keywords: (options.keywords || [...SEO_CONSTANTS.keywords]) as string[],

    metadataBase: new URL(siteUrl),

    alternates: {
      canonical: options.canonical,
    },

    openGraph: {
      type: options.type || 'website',
      locale: 'en_US',
      url: options.canonical,
      siteName,
      title: options.title,
      description: options.description,
      images: [
        {
          url: options.image || images.ogImage,
          width: 1200,
          height: 630,
          alt: options.title,
        },
      ],
      ...(options.type === 'article' && {
        publishedTime: options.publishedTime,
        modifiedTime: options.modifiedTime,
        authors: options.author ? [options.author] : undefined,
      }),
    },

    twitter: {
      card: 'summary_large_image',
      site: social.twitter,
      creator: social.twitter,
      title: options.title,
      description: options.description,
      images: [options.image || images.twitterImage],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate title template for nested pages
 */
export function generateTitleTemplate(suffix?: string): { template: string; default: string } {
  const baseSuffix = suffix || SEO_CONSTANTS.siteName;
  return {
    template: `%s | ${baseSuffix}`,
    default: SEO_CONSTANTS.defaultTitle,
  };
}

/**
 * Get all keywords as a comma-separated string
 */
export function getKeywordsString(additionalKeywords?: string[]): string {
  const allKeywords = [...SEO_CONSTANTS.keywords, ...(additionalKeywords || [])];
  return Array.from(new Set(allKeywords)).join(', ');
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbList(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
