import type { Metadata, Viewport } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SEO_CONSTANTS, generateTitleTemplate } from '@/lib/seo'
import { JsonLd } from '@/components/SEO/JsonLd'

// =============================================================================
// FONTS
// =============================================================================

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// =============================================================================
// VIEWPORT CONFIGURATION
// =============================================================================

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#009B3A' },
    { media: '(prefers-color-scheme: dark)', color: '#006400' },
  ],
  colorScheme: 'light dark',
}

// =============================================================================
// METADATA CONFIGURATION
// =============================================================================

export const metadata: Metadata = {
  // Base metadata
  metadataBase: new URL(SEO_CONSTANTS.siteUrl),

  // Title configuration
  title: {
    default: SEO_CONSTANTS.defaultTitle,
    template: `%s | ${SEO_CONSTANTS.siteName}`,
  },

  // Description
  description: SEO_CONSTANTS.defaultDescription,

  // Keywords - optimized for target searches
  keywords: [
    // Primary keywords
    'rastasafari experience',
    'jamaica atv tour',
    'rastafari culture',
    'montego bay tours',
    'negril excursions',
    // Long-tail keywords
    'rastasafari experience jamaica',
    'atv tour jamaica',
    'best things to do montego bay',
    'rastafari cultural experience',
    // Additional relevant keywords
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
    'jamaica excursions from cruise ship',
    'top rated jamaica tours',
    '#1 outdoor activity jamaica',
  ],

  // Authors
  authors: [
    { name: 'Rastasafari Experience Jamaica', url: SEO_CONSTANTS.siteUrl },
  ],

  // Creator & Publisher
  creator: 'Rastasafari Experience Jamaica',
  publisher: 'Rastasafari Experience Jamaica',

  // Category
  category: 'travel',

  // Format detection
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons & Favicons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#009B3A',
      },
    ],
  },

  // Manifest
  manifest: '/site.webmanifest',

  // OpenGraph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES', 'fr_FR', 'de_DE'],
    url: SEO_CONSTANTS.siteUrl,
    siteName: SEO_CONSTANTS.siteName,
    title: SEO_CONSTANTS.defaultTitle,
    description: SEO_CONSTANTS.defaultDescription,
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rastasafari Experience Jamaica - #1 Rated ATV & Cultural Tour',
        type: 'image/jpeg',
      },
      {
        url: '/images/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'Rastasafari Experience Jamaica - Adventure Awaits',
        type: 'image/jpeg',
      },
      {
        url: '/images/og-image-wide.jpg',
        width: 1920,
        height: 1080,
        alt: 'Rastasafari Experience Jamaica - Explore Authentic Jamaica',
        type: 'image/jpeg',
      },
    ],
    countryName: 'Jamaica',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: SEO_CONSTANTS.social.twitter,
    creator: SEO_CONSTANTS.social.twitter,
    title: SEO_CONSTANTS.defaultTitle,
    description: SEO_CONSTANTS.defaultDescription,
    images: {
      url: '/images/twitter-card.jpg',
      alt: 'Rastasafari Experience Jamaica - The Ultimate Jamaican Adventure',
    },
  },

  // Verification
  verification: {
    google: 'your-google-site-verification-code', // Replace with actual
    other: {
      'msvalidate.01': 'your-bing-verification-code', // Replace with actual
      'facebook-domain-verification': 'your-facebook-verification-code', // Replace with actual
    },
  },

  // Alternates (canonical & language versions)
  alternates: {
    canonical: SEO_CONSTANTS.siteUrl,
    languages: {
      'en-US': `${SEO_CONSTANTS.siteUrl}/en`,
      'en-GB': `${SEO_CONSTANTS.siteUrl}/en-gb`,
      'es': `${SEO_CONSTANTS.siteUrl}/es`,
      'fr': `${SEO_CONSTANTS.siteUrl}/fr`,
      'de': `${SEO_CONSTANTS.siteUrl}/de`,
      'x-default': SEO_CONSTANTS.siteUrl,
    },
    types: {
      'application/rss+xml': `${SEO_CONSTANTS.siteUrl}/feed.xml`,
    },
  },

  // App-specific
  applicationName: 'Rastasafari Experience',
  referrer: 'origin-when-cross-origin',
  generator: 'Next.js',

  // Additional meta tags
  other: {
    'geo.region': 'JM-08', // St. James Parish
    'geo.placename': 'Montego Bay',
    'geo.position': '18.4762;-77.8939',
    'ICBM': '18.4762, -77.8939',
    'rating': 'general',
    'revisit-after': '7 days',
    'distribution': 'global',
    'coverage': 'worldwide',
    'price': '165 USD',
    'product:price:amount': '165',
    'product:price:currency': 'USD',
  },
}

// =============================================================================
// ROOT LAYOUT COMPONENT
// =============================================================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        {/* Preconnect to important origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Structured Data (JSON-LD) */}
        <JsonLd />

        {/* Additional SEO meta tags */}
        <meta name="msapplication-TileColor" content="#009B3A" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="font-body bg-off-white text-dark-gray antialiased">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-green-700 focus:text-white focus:rounded-md"
        >
          Skip to main content
        </a>

        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>

        {/* Noscript fallback */}
        <noscript>
          <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fff3cd', color: '#856404' }}>
            For the best experience on Rastasafari Experience Jamaica, please enable JavaScript in your browser.
          </div>
        </noscript>
      </body>
    </html>
  )
}
