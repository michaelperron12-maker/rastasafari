import React, { useState } from 'react';
import ReviewCard from './ReviewCard';
import ReviewStats from './ReviewStats';
import { reviews, reviewStats, getFeaturedReviews, getReviewsBySource } from '../../data/reviews';
import type { Review } from '../../data/reviews';

type FilterSource = 'all' | 'TripAdvisor' | 'Viator' | 'Google';

interface ReviewSectionProps {
  showAll?: boolean;
  maxReviews?: number;
  showWidget?: boolean;
}

// Filtre de source
const SourceFilter: React.FC<{
  active: FilterSource;
  onChange: (source: FilterSource) => void;
}> = ({ active, onChange }) => {
  const sources: { value: FilterSource; label: string; color: string }[] = [
    { value: 'all', label: 'Tous les avis', color: 'bg-gray-600' },
    { value: 'TripAdvisor', label: 'TripAdvisor', color: 'bg-[#00aa6c]' },
    { value: 'Viator', label: 'Viator', color: 'bg-[#3b5998]' },
    { value: 'Google', label: 'Google', color: 'bg-[#4285f4]' },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {sources.map(({ value, label, color }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            active === value
              ? `${color} text-white shadow-lg scale-105`
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

// Widget TripAdvisor intégré (iframe)
const TripAdvisorWidget: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
      <svg className="w-6 h-6 text-[#00aa6c]" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="6.5" cy="12" r="4" />
        <circle cx="17.5" cy="12" r="4" />
        <circle cx="6.5" cy="12" r="2" fill="white" />
        <circle cx="17.5" cy="12" r="2" fill="white" />
        <circle cx="6.5" cy="12" r="1" />
        <circle cx="17.5" cy="12" r="1" />
        <path d="M12 6 L6 10 M12 6 L18 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <ellipse cx="12" cy="5" rx="1.5" ry="1" />
      </svg>
      Evaluez-nous sur TripAdvisor
    </h3>

    {/* Widget placeholder - Remplacer par le vrai widget TripAdvisor */}
    <div className="bg-gradient-to-br from-[#00aa6c]/10 to-[#00875a]/10 rounded-xl p-6 text-center">
      <p className="text-gray-600 mb-4">
        Partagez votre experience Rastasafari avec le monde!
      </p>

      {/* Lien vers TripAdvisor - A personnaliser avec l'URL réelle */}
      <a
        href="https://www.tripadvisor.com/Attraction_Review-g147311-d12345678-Reviews-Rastasafari_Experience-Montego_Bay_Saint_James_Parish_Jamaica.html"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#00aa6c] hover:bg-[#00875a] text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl"
      >
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Ecrire un avis
      </a>

      {/* Code pour intégrer le vrai widget TripAdvisor */}
      {/*
        Pour intégrer le widget officiel TripAdvisor:
        1. Aller sur https://www.tripadvisor.com/Widgets
        2. Sélectionner votre établissement
        3. Copier le code d'intégration
        4. Remplacer ce bloc par:

        <div
          id="TA_selfserveprop123"
          className="TA_selfserveprop"
        >
          <script src="https://www.jscache.com/wc/..." async></script>
        </div>
      */}
    </div>

    <p className="text-xs text-gray-400 mt-4 text-center">
      Votre avis aide d'autres voyageurs a decouvrir la vraie Jamaique
    </p>
  </div>
);

// Bouton "Voir plus"
const LoadMoreButton: React.FC<{
  onClick: () => void;
  remainingCount: number;
}> = ({ onClick, remainingCount }) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-2 mx-auto px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
  >
    <span>Voir {remainingCount} avis de plus</span>
    <svg
      className="w-5 h-5 transform group-hover:translate-y-1 transition-transform"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </button>
);

const ReviewSection: React.FC<ReviewSectionProps> = ({
  showAll = false,
  maxReviews = 6,
  showWidget = true
}) => {
  const [filter, setFilter] = useState<FilterSource>('all');
  const [displayCount, setDisplayCount] = useState(maxReviews);

  // Filtrer les avis selon la source
  const getFilteredReviews = (): Review[] => {
    if (filter === 'all') {
      return showAll ? reviews : getFeaturedReviews();
    }
    return getReviewsBySource(filter);
  };

  const filteredReviews = getFilteredReviews();
  const displayedReviews = filteredReviews.slice(0, displayCount);
  const hasMore = displayCount < filteredReviews.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + 6, filteredReviews.length));
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header de section */}
        <header className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            Temoignages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Ce que disent nos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500">
              visiteurs
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plus de {reviewStats.totalReviews.toLocaleString()} voyageurs ont vecu l'experience Rastasafari.
            Decouvrez leurs temoignages authentiques.
          </p>
        </header>

        {/* Stats globales */}
        <div className="mb-12">
          <ReviewStats showDetailed={true} />
        </div>

        {/* Filtres */}
        <div className="mb-8">
          <SourceFilter active={filter} onChange={setFilter} />
        </div>

        {/* Grille d'avis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Bouton voir plus */}
        {hasMore && (
          <div className="mb-12">
            <LoadMoreButton
              onClick={handleLoadMore}
              remainingCount={filteredReviews.length - displayCount}
            />
          </div>
        )}

        {/* Widget TripAdvisor */}
        {showWidget && (
          <div className="max-w-lg mx-auto">
            <TripAdvisorWidget />
          </div>
        )}

        {/* Call to action */}
        <div className="mt-16 text-center bg-gradient-to-r from-green-600 via-yellow-500 to-red-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Pret a vivre votre propre aventure?
          </h3>
          <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">
            Rejoignez les milliers de visiteurs qui ont decouvert la vraie Jamaique avec Rastasafari.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/reservation"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Now
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              Poser une question
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
