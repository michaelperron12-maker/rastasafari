'use client';

import { SEO_CONSTANTS } from '@/lib/seo';

/**
 * JSON-LD Structured Data Component
 * Implements Schema.org markup for:
 * - TourProvider (Organization)
 * - TouristAttraction (Tour/Product)
 * - LocalBusiness
 * - AggregateRating
 */

// =============================================================================
// SCHEMA DATA GENERATORS
// =============================================================================

/**
 * TourProvider / Organization Schema
 * Establishes the business as a tour provider
 */
function getTourProviderSchema() {
  const { business, social, siteUrl, siteName, rating } = SEO_CONSTANTS;

  return {
    '@context': 'https://schema.org',
    '@type': ['TourProvider', 'TravelAgency', 'Organization'],
    '@id': `${siteUrl}/#organization`,
    name: business.name,
    legalName: business.legalName,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/logo.png`,
      width: 400,
      height: 100,
    },
    image: [
      `${siteUrl}/images/og-image.jpg`,
      `${siteUrl}/images/tour-1.jpg`,
      `${siteUrl}/images/tour-2.jpg`,
    ],
    description: SEO_CONSTANTS.defaultDescription,
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    priceRange: business.priceRange,
    currenciesAccepted: business.currency,
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'PayPal'],
    areaServed: [
      {
        '@type': 'Country',
        name: 'Jamaica',
      },
      {
        '@type': 'City',
        name: 'Montego Bay',
      },
      {
        '@type': 'City',
        name: 'Negril',
      },
      {
        '@type': 'City',
        name: 'Ocho Rios',
      },
    ],
    sameAs: [
      social.facebook,
      social.instagram,
      social.youtube,
      social.tripadvisor,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue,
      bestRating: rating.bestRating,
      worstRating: rating.worstRating,
      ratingCount: rating.ratingCount,
      reviewCount: rating.ratingCount,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Rastasafari Tours & Experiences',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'ATV Adventures',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Cultural Tours',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Food Experiences',
        },
      ],
    },
  };
}

/**
 * TouristAttraction Schema
 * Describes the main tour as an attraction
 */
function getTouristAttractionSchema() {
  const { siteUrl, tour, business, rating } = SEO_CONSTANTS;

  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${siteUrl}/#touristattraction`,
    name: tour.name,
    description: tour.description,
    url: siteUrl,
    image: [
      `${siteUrl}/images/atv-adventure.jpg`,
      `${siteUrl}/images/cultural-experience.jpg`,
      `${siteUrl}/images/mineral-springs.jpg`,
      `${siteUrl}/images/ital-cuisine.jpg`,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      addressCountry: business.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    isAccessibleForFree: false,
    publicAccess: true,
    touristType: [
      'Adventure Seekers',
      'Culture Enthusiasts',
      'Nature Lovers',
      'Families',
      'Couples',
      'Solo Travelers',
    ],
    availableLanguage: tour.availableLanguages.map((lang) => ({
      '@type': 'Language',
      name: lang === 'en' ? 'English' : lang === 'es' ? 'Spanish' : lang === 'fr' ? 'French' : 'German',
      alternateName: lang,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue,
      bestRating: rating.bestRating,
      worstRating: rating.worstRating,
      ratingCount: rating.ratingCount,
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'ATV Vehicles',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Cultural Guide',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Ital Food Included',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Mineral Springs Access',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Hotel Pickup',
        value: true,
      },
    ],
  };
}

/**
 * Product/Tour Schema
 * Detailed tour offering with pricing
 */
function getTourProductSchema() {
  const { siteUrl, tour, business, rating } = SEO_CONSTANTS;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${siteUrl}/#product`,
    name: tour.name,
    description: tour.description,
    image: `${siteUrl}/images/og-image.jpg`,
    brand: {
      '@type': 'Brand',
      name: business.name,
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/reservation`,
      priceCurrency: tour.priceCurrency,
      price: tour.price,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
      seller: {
        '@type': 'Organization',
        name: business.name,
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: 0,
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'JM',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue,
      bestRating: rating.bestRating,
      worstRating: rating.worstRating,
      ratingCount: rating.ratingCount,
      reviewCount: rating.ratingCount,
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 10,
          bestRating: 10,
        },
        author: {
          '@type': 'Person',
          name: 'Sarah M.',
        },
        reviewBody: 'Absolutely incredible experience! The ATV ride was thrilling, the Rastafari village was enlightening, and the Ital food was delicious. Best tour in Jamaica!',
        datePublished: '2024-12-15',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 10,
          bestRating: 10,
        },
        author: {
          '@type': 'Person',
          name: 'John D.',
        },
        reviewBody: 'Worth every penny! Our guide was amazing and the mineral springs were so refreshing. Highly recommend this to anyone visiting Jamaica.',
        datePublished: '2024-12-10',
      },
    ],
  };
}

/**
 * LocalBusiness Schema
 * Business listing information
 */
function getLocalBusinessSchema() {
  const { siteUrl, business, rating, social } = SEO_CONSTANTS;

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: business.name,
    description: SEO_CONSTANTS.defaultDescription,
    url: siteUrl,
    telephone: business.phone,
    email: business.email,
    priceRange: business.priceRange,
    image: `${siteUrl}/images/logo.png`,
    logo: `${siteUrl}/images/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    hasMap: `https://maps.google.com/?q=${business.geo.latitude},${business.geo.longitude}`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue,
      bestRating: rating.bestRating,
      worstRating: rating.worstRating,
      ratingCount: rating.ratingCount,
    },
    sameAs: [
      social.facebook,
      social.instagram,
      social.youtube,
      social.tripadvisor,
    ],
  };
}

/**
 * WebSite Schema
 * Site-wide search and information
 */
function getWebSiteSchema() {
  const { siteUrl, siteName } = SEO_CONSTANTS;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    description: SEO_CONSTANTS.defaultDescription,
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/reservation`,
        },
        result: {
          '@type': 'Reservation',
          name: 'Rastasafari Tour Booking',
        },
      },
    ],
    inLanguage: 'en-US',
  };
}

/**
 * FAQ Schema
 * Common questions and answers for rich snippets
 */
function getFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does the Rastasafari Experience cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Rastasafari Experience costs $165 USD per person. This includes ATV adventure, Rastafari cultural experience, Ital cuisine, mineral springs visit, and round-trip hotel transportation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long is the Rastasafari Experience tour?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The complete Rastasafari Experience is approximately 4 hours, including pickup and drop-off at your hotel in Montego Bay or Negril.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer hotel pickup?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We provide complimentary pickup and drop-off from hotels in Montego Bay, Negril, and surrounding areas. Pickup times are flexible and arranged when you book.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is included in the tour?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The tour includes: ATV adventure through scenic trails, authentic Rastafari village visit, traditional Ital lunch, natural mineral springs swim, professional guide, and round-trip hotel transportation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the Rastasafari Experience suitable for beginners?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! No prior ATV experience is required. Our professional guides provide full training before the ride, and we adjust the pace to suit all skill levels.',
        },
      },
    ],
  };
}

/**
 * BreadcrumbList Schema Generator
 * For page-specific breadcrumbs
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
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

// =============================================================================
// MAIN COMPONENT
// =============================================================================

interface JsonLdProps {
  /** Include FAQ schema (for FAQ page) */
  includeFAQ?: boolean;
  /** Custom breadcrumb items */
  breadcrumbs?: Array<{ name: string; url: string }>;
  /** Additional custom schema objects */
  additionalSchemas?: object[];
}

/**
 * JsonLd Component
 * Renders all structured data as script tags in the document head
 */
export function JsonLd({ includeFAQ = false, breadcrumbs, additionalSchemas = [] }: JsonLdProps) {
  // Collect all schemas
  const schemas = [
    getTourProviderSchema(),
    getTouristAttractionSchema(),
    getTourProductSchema(),
    getLocalBusinessSchema(),
    getWebSiteSchema(),
  ];

  // Add FAQ if needed
  if (includeFAQ) {
    schemas.push(getFAQSchema() as any);
  }

  // Add breadcrumbs if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(getBreadcrumbSchema(breadcrumbs) as any);
  }

  // Add any custom schemas
  schemas.push(...(additionalSchemas as any));

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
        />
      ))}
    </>
  );
}

// =============================================================================
// INDIVIDUAL SCHEMA EXPORTS (for page-specific use)
// =============================================================================

export {
  getTourProviderSchema,
  getTouristAttractionSchema,
  getTourProductSchema,
  getLocalBusinessSchema,
  getWebSiteSchema,
  getFAQSchema,
};

export default JsonLd;
