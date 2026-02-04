'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useLocale } from '@/components/LanguageSwitcher';
import { translations } from '@/lib/i18n';

// Real Rastasafari images
const IMAGES = {
  hero: '/images/rastasafari/hero-atv.jpg',
  banner: '/images/rastasafari/banner.jpg',
  atvJungle: '/images/rastasafari/atv-jungle.jpg',
  atvGroup: '/images/rastasafari/atv-group.jpg',
  village: '/images/rastasafari/village-rasta.jpg',
  river: '/images/rastasafari/river.jpg',
  nature: '/images/rastasafari/nature.jpg',
  safari: '/images/rastasafari/safari-tour.jpg',
  experience1: '/images/rastasafari/experience-1.jpg',
  experience2: '/images/rastasafari/experience-2.jpg',
  gallery: [
    '/images/rastasafari/gallery-1.jpg',
    '/images/rastasafari/gallery-2.jpg',
    '/images/rastasafari/gallery-3.jpg',
    '/images/rastasafari/gallery-4.jpg',
    '/images/rastasafari/gallery-5.jpg',
  ]
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

// ATV Icon Component (4x4 Quad) - Clear recognizable design
const ATVIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    {/* 4 Big Wheels */}
    <circle cx="20" cy="70" r="15" fill="currentColor" opacity="0.9"/>
    <circle cx="20" cy="70" r="8" fill="#222"/>
    <circle cx="80" cy="70" r="15" fill="currentColor" opacity="0.9"/>
    <circle cx="80" cy="70" r="8" fill="#222"/>
    {/* ATV Body/Frame */}
    <rect x="15" y="45" width="70" height="20" rx="5" fill="currentColor"/>
    {/* Seat */}
    <ellipse cx="50" cy="40" rx="15" ry="8" fill="currentColor"/>
    {/* Handlebars */}
    <rect x="25" y="25" width="8" height="20" rx="2" fill="currentColor"/>
    <rect x="67" y="25" width="8" height="20" rx="2" fill="currentColor"/>
    <rect x="20" y="20" width="18" height="6" rx="2" fill="currentColor"/>
    <rect x="62" y="20" width="18" height="6" rx="2" fill="currentColor"/>
    {/* Front Guard */}
    <path d="M30 50 L50 35 L70 50" stroke="currentColor" strokeWidth="4" fill="none"/>
  </svg>
);

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-6 h-6 ${star <= rating ? 'text-rasta-gold' : 'text-gray-400'} drop-shadow-lg`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function HomePage() {
  const { locale } = useLocale();
  const t = translations[locale];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % IMAGES.gallery.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = locale === 'en'
    ? [
        { icon: 'atv', title: 'ATV Polaris 900', desc: 'Premium all-terrain vehicles' },
        { icon: '🌿', title: 'Organic Ital Meal', desc: 'Traditional Rastafari cuisine' },
        { icon: '🏊', title: 'Mineral Spring', desc: 'Swim in pure natural waters' },
        { icon: '🎭', title: 'Rasta Culture', desc: 'Authentic cultural immersion' },
      ]
    : [
        { icon: 'atv', title: 'VTT Polaris 900', desc: 'Vehicules tout-terrain premium' },
        { icon: '🌿', title: 'Repas Ital Bio', desc: 'Cuisine traditionnelle Rastafari' },
        { icon: '🏊', title: 'Source Minerale', desc: 'Baignade en eaux naturelles pures' },
        { icon: '🎭', title: 'Culture Rasta', desc: 'Immersion culturelle authentique' },
      ];

  const testimonials = [
    { name: 'Sarah T.', location: 'Toronto, Canada', text: locale === 'en' ? 'Incredible experience! The guides are authentic and passionate.' : 'Experience incroyable ! Les guides sont authentiques et passionnes.', rating: 5 },
    { name: 'Marcus J.', location: 'Atlanta, USA', text: locale === 'en' ? 'The highlight of our trip to Jamaica. A must-do!' : 'Le moment fort de notre voyage en Jamaique. A faire absolument !', rating: 5 },
    { name: 'Emma L.', location: 'Paris, France', text: locale === 'en' ? 'An unforgettable adventure. The Ital food was delicious!' : 'Une aventure inoubliable. La nourriture Ital etait delicieuse !', rating: 5 },
  ];

  return (
    <main className="min-h-screen bg-black overflow-hidden">
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(254, 209, 0, 0.5); }
          50% { box-shadow: 0 0 40px rgba(254, 209, 0, 0.8), 0 0 60px rgba(254, 209, 0, 0.4); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 1s ease-out forwards; }
        .animate-zoom-in { animation: zoom-in 1.2s ease-out forwards; }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
        .rasta-gradient {
          background: linear-gradient(135deg, #E31C23 0%, #FED100 50%, #009B3A 100%);
        }
        .rasta-text {
          background: linear-gradient(90deg, #009B3A, #FED100, #E31C23);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* ========== HERO SECTION - Full Screen ========== */}
      <section className="relative h-screen w-full">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <Image
            src={IMAGES.hero}
            alt="Rastasafari ATV Experience Jamaica"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
        </div>

        {/* Rasta Stripe Top */}
        <div className="absolute top-0 left-0 right-0 h-2 rasta-gradient z-20" />

        {/* Hero Content */}
        <div className={`relative z-10 h-full flex flex-col items-center justify-center px-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* TripAdvisor Badge */}
          <div className="animate-slide-up mb-6" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✓</span>
              </div>
              <span className="font-bold text-gray-900">Top 1% TripAdvisor</span>
              <div className="w-px h-6 bg-gray-300" />
              <span className="text-green-600 font-semibold">Travelers' Choice 2025</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="animate-zoom-in text-center mb-6" style={{ animationDelay: '0.4s' }}>
            <span className="block text-6xl md:text-8xl lg:text-9xl font-black rasta-text tracking-tight">
              Rastasafari
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl font-bold text-white mt-2 drop-shadow-2xl">
              Experience
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-slide-up text-xl md:text-3xl text-white/90 mb-8 font-light tracking-wide text-center" style={{ animationDelay: '0.6s' }}>
            The #1 Rated Outdoor Activity in Jamaica
          </p>

          {/* Rating */}
          <div className="animate-slide-up flex items-center gap-4 mb-10" style={{ animationDelay: '0.8s' }}>
            <StarRating rating={5} />
            <span className="text-2xl font-bold text-white">9.8/10</span>
            <span className="text-white/70">|</span>
            <span className="text-white/80"><AnimatedCounter end={2142} suffix="+" /> reviews</span>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-up" style={{ animationDelay: '1s' }}>
            <Link
              href="/reservation"
              className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-rasta-green via-rasta-green to-green-600 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-500 animate-pulse-glow"
            >
              <span>Book Now</span>
              <span className="bg-white/20 px-4 py-2 rounded-full group-hover:bg-white/30 transition-colors">
                $165 USD
              </span>
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-8 h-14 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
              <div className="w-2 h-4 bg-white/80 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES BANNER ========== */}
      <section className="relative py-8 rasta-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white">
                {feature.icon === 'atv' ? (
                  <ATVIcon className="w-10 h-10 text-white" />
                ) : (
                  <span className="text-4xl">{feature.icon}</span>
                )}
                <div>
                  <p className="font-bold text-lg">{feature.title}</p>
                  <p className="text-sm text-white/80">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== GALLERY SECTION ========== */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Live the <span className="rasta-text">Adventure</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover the magical moments that await you
            </p>
          </div>

          {/* Main Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Large Image */}
            <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-3xl">
              <Image
                src={IMAGES.atvJungle}
                alt="ATV in the Jamaican jungle"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold">ATV Adventure</h3>
                <p className="text-white/80">Traverse the tropical jungle</p>
              </div>
            </div>

            {/* Smaller Images */}
            <div className="relative group overflow-hidden rounded-3xl aspect-square">
              <Image
                src={IMAGES.village}
                alt="Rastafari Village"
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="relative group overflow-hidden rounded-3xl aspect-square">
              <Image
                src={IMAGES.river}
                alt="Mineral Spring"
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="relative group overflow-hidden rounded-3xl aspect-square">
              <Image
                src={IMAGES.experience1}
                alt="Rastasafari Experience"
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="relative group overflow-hidden rounded-3xl aspect-square">
              <Image
                src={IMAGES.experience2}
                alt="Rastafari Culture"
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== EXPERIENCE DETAILS ========== */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <Image
                  src={IMAGES.atvGroup}
                  alt="Groupe ATV Rastasafari"
                  width={700}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-2xl p-6 animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rasta-gradient rounded-full flex items-center justify-center">
                    <span className="text-3xl">⏱️</span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">3h30</p>
                    <p className="text-gray-500">of adventure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                A <span className="rasta-text">Unique</span> Experience
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Dive into an authentic adventure in the heart of the Jamaican mountains.
                Our experience combines the thrill of off-road driving with
                a deep immersion into Rastafari culture.
              </p>

              {/* Sessions */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
                  <span className="text-2xl">🕐</span> Available Sessions
                </h3>
                <div className="flex flex-wrap gap-4">
                  {['9:00 AM', '12:00 PM', '2:30 PM'].map((time) => (
                    <span key={time} className="bg-rasta-green/20 border border-rasta-green px-6 py-3 rounded-full font-semibold hover:bg-rasta-green/40 transition-colors cursor-pointer">
                      {time}
                    </span>
                  ))}
                </div>
              </div>

              {/* Inclusions Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Hotel transport included',
                  'Premium Polaris 900',
                  'Full Ital meal',
                  'Expert bilingual guide',
                  'Safety equipment',
                  'Souvenir photos',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-rasta-green rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              They Lived the <span className="rasta-text">Experience</span>
            </h2>
            <p className="text-xl text-gray-400">
              Over 2,142 five-star reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-rasta-gold/50 transition-all duration-500 hover:transform hover:scale-105"
              >
                <StarRating rating={t.rating} />
                <p className="text-white/80 text-lg mt-6 mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rasta-gradient rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-gray-400 text-sm">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={IMAGES.nature}
            alt="Jamaican Nature"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Rasta Stripes Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-1/3 bg-rasta-red" />
          <div className="h-1/3 bg-rasta-gold" />
          <div className="h-1/3 bg-rasta-green" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Ready for the <span className="rasta-text">Adventure</span>?
          </h2>

          {/* Price Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 max-w-md mx-auto mb-10 border border-white/20 shadow-2xl">
            <p className="text-rasta-gold text-lg mb-2">Starting at</p>
            <div className="text-7xl font-black text-white mb-2">$165</div>
            <p className="text-gray-300 mb-8">USD per person - All inclusive</p>

            <Link
              href="/reservation"
              className="block w-full bg-gradient-to-r from-rasta-green to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-xl py-5 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Book Now
            </Link>

            <p className="mt-6 text-gray-400 text-sm">
              Instant confirmation - Free cancellation 24h
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-wrap justify-center gap-8 text-white/80">
            <a href="tel:+18764457203" className="flex items-center gap-2 hover:text-rasta-gold transition-colors">
              <span className="text-2xl">📞</span>
              <span>+1 (876) 445-7203</span>
            </a>
            <a href="https://instagram.com/rastasafariexperience" className="flex items-center gap-2 hover:text-rasta-gold transition-colors">
              <span className="text-2xl">📸</span>
              <span>@rastasafariexperience</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
