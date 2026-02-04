'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Gallery images for the carousel - using real Rastasafari images
const galleryImages = [
  {
    src: '/images/rastasafari/hero-atv.jpg',
    alt: 'ATV Polaris Side-by-Side in Jamaican countryside',
  },
  {
    src: '/images/rastasafari/atv-jungle.jpg',
    alt: 'ATV adventure through the jungle',
  },
  {
    src: '/images/rastasafari/atv-group.jpg',
    alt: 'Group ATV experience',
  },
  {
    src: '/images/rastasafari/river.jpg',
    alt: 'River crossing and mineral spring',
  },
  {
    src: '/images/rastasafari/village-rasta.jpg',
    alt: 'Rastafari village visit',
  },
  {
    src: '/images/rastasafari/nature.jpg',
    alt: 'Tropical fruit tasting in nature',
  },
];

// Included items list
const includedItems = [
  {
    icon: '🚐',
    title: 'Round-trip Hotel Transport',
    description: 'Pickup and return to your hotel included',
  },
  {
    icon: '🏎️',
    title: 'Polaris Side-by-Side 900 ATV',
    description: 'Professional quality all-terrain vehicle',
  },
  {
    icon: '🍹',
    title: 'Welcome Drinks + Water',
    description: 'Refreshments on arrival and water during the tour',
  },
  {
    icon: '🍽️',
    title: 'Homemade Ital Lunch',
    description: 'Traditional Rastafari meal prepared on site',
  },
  {
    icon: '👨‍🏫',
    title: 'Certified Guides',
    description: 'Expert local guides certified for your safety',
  },
  {
    icon: '💦',
    title: 'Mineral Spring Swimming',
    description: 'Relax in natural healing waters',
  },
  {
    icon: '🌿',
    title: 'Ganja Field Visit',
    description: 'Discover Jamaican cannabis culture',
  },
  {
    icon: '🍊',
    title: 'Fruit Tasting',
    description: 'Fresh tropical fruits picked locally',
  },
];

// Pickup points
const pickupPoints = [
  { location: 'Montego Bay', included: true, note: 'Included' },
  { location: 'Negril', included: true, note: 'Included' },
  { location: 'Grand Palladium', included: true, note: 'Included' },
  { location: 'Other areas', included: false, note: 'Additional fee applies' },
];

// Session times
const sessions = ['9:00 AM', '12:00 PM', '2:30 PM'];

export default function ExperiencesPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#009B3A] via-[#FED100] to-[#E31C23]">
      {/* Page Header */}
      <section className="bg-black/50 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#FED100] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-[#FED100] font-semibold">Our Experiences</li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Our <span className="text-[#FED100]">Experiences</span>
          </h1>
        </div>
      </section>

      {/* Main Experience */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
            {/* Photo Gallery Carousel */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
              <div className="relative w-full h-full">
                <Image
                  src={galleryImages[currentImageIndex].src}
                  alt={galleryImages[currentImageIndex].alt}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Navigation arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-[#FED100] scale-125'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Experience Content */}
            <div className="p-6 md:p-10">
              {/* Title and Main Info */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Rastasafari Cultural <span className="text-[#FED100]">ATV</span>
                  </h2>
                  <p className="text-gray-300 text-lg">
                    The highest-rated authentic cultural experience in all of Jamaica
                  </p>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-r from-[#009B3A] to-[#006B28] rounded-xl p-6 text-center min-w-[200px]">
                  <p className="text-green-200 text-sm uppercase tracking-wide">Starting at</p>
                  <p className="text-4xl font-bold text-white">$165</p>
                  <p className="text-green-200">USD / person</p>
                </div>
              </div>

              {/* Key Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="bg-white/10 rounded-xl p-5 text-center">
                  <div className="text-3xl mb-2">⏱️</div>
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p className="text-white text-xl font-semibold">3.5 - 4 hours</p>
                </div>
                <div className="bg-white/10 rounded-xl p-5 text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <p className="text-gray-400 text-sm">Max Capacity</p>
                  <p className="text-white text-xl font-semibold">24 people</p>
                </div>
                <div className="bg-white/10 rounded-xl p-5 text-center">
                  <div className="text-3xl mb-2">🕐</div>
                  <p className="text-gray-400 text-sm">Sessions</p>
                  <div className="flex justify-center gap-2 mt-1 flex-wrap">
                    {sessions.map((time) => (
                      <span key={time} className="bg-[#FED100]/20 text-[#FED100] px-3 py-1 rounded-full text-sm font-medium">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* What's INCLUDED */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="bg-[#009B3A] text-white px-3 py-1 rounded-lg mr-3 text-sm">INCLUDED</span>
                  What&apos;s included in your experience
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {includedItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-5 transition-all"
                    >
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pickup Points */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Pickup Locations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {pickupPoints.map((point, index) => (
                    <div
                      key={index}
                      className={`rounded-xl p-5 border-2 ${
                        point.included
                          ? 'bg-[#009B3A]/10 border-[#009B3A]/30'
                          : 'bg-[#FED100]/10 border-[#FED100]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">{point.location}</span>
                        {point.included ? (
                          <span className="text-[#009B3A] text-xl">✅</span>
                        ) : (
                          <span className="text-[#FED100] text-xl">💰</span>
                        )}
                      </div>
                      <p className={point.included ? 'text-[#009B3A] text-sm' : 'text-[#FED100] text-sm'}>
                        {point.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Cancellation Policy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#009B3A]/10 border-2 border-[#009B3A]/30 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[#009B3A] text-2xl">✅</span>
                      <span className="text-white font-semibold text-lg">More than 24h before</span>
                    </div>
                    <p className="text-[#009B3A]">Full refund</p>
                    <p className="text-gray-400 text-sm mt-2">
                      Cancel up to 24 hours before the experience starts for a full refund.
                    </p>
                  </div>
                  <div className="bg-[#E31C23]/10 border-2 border-[#E31C23]/30 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[#E31C23] text-2xl">❌</span>
                      <span className="text-white font-semibold text-lg">Less than 24h before</span>
                    </div>
                    <p className="text-[#E31C23]">No refund</p>
                    <p className="text-gray-400 text-sm mt-2">
                      Cancellations made less than 24 hours before are non-refundable.
                    </p>
                  </div>
                </div>
              </div>

              {/* Book Now Button */}
              <div className="text-center">
                <Link
                  href="/reservation"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#E31C23] via-[#FED100] to-[#009B3A] hover:from-[#C41920] hover:via-[#E5BC00] hover:to-[#007B2E] text-white font-bold text-xl px-10 py-5 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <span>Book Now</span>
                  <span className="bg-white/20 px-4 py-1 rounded-lg">$165 USD</span>
                </Link>
                <p className="text-gray-400 mt-4 text-sm">
                  Secure payment - Instant confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Testimonials Section */}
      <section className="py-12 bg-black/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#FED100] text-lg font-semibold mb-2">
            #1 on TripAdvisor
          </p>
          <p className="text-white text-2xl md:text-3xl font-bold mb-4">
            The highest-rated outdoor activity in all of Jamaica
          </p>
          <div className="flex items-center justify-center gap-1 text-[#FED100] text-2xl">
            {'★★★★★'}
          </div>
          <p className="text-gray-300 mt-2">Over 2,000 five-star reviews</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Experience <span className="text-[#FED100]">Gallery</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              '/images/rastasafari/gallery-1.jpg',
              '/images/rastasafari/gallery-2.jpg',
              '/images/rastasafari/gallery-3.jpg',
              '/images/rastasafari/gallery-4.jpg',
              '/images/rastasafari/gallery-5.jpg',
            ].map((src, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
