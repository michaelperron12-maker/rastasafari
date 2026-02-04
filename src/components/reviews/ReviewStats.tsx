import React from 'react';
import { reviewStats, getRatingPercentages } from '../../data/reviews';

interface ReviewStatsProps {
  showDetailed?: boolean;
}

// Barre de progression pour chaque note
const RatingBar: React.FC<{
  stars: number;
  count: number;
  percentage: number;
  animate?: boolean;
}> = ({ stars, count, percentage, animate = true }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Label étoiles */}
      <div className="flex items-center gap-1 w-16 shrink-0">
        <span className="text-sm font-medium text-gray-700">{stars}</span>
        <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>

      {/* Barre de progression */}
      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${
            stars === 5 ? 'bg-green-500' :
            stars === 4 ? 'bg-lime-500' :
            stars === 3 ? 'bg-yellow-500' :
            stars === 2 ? 'bg-orange-500' :
            'bg-red-500'
          } ${animate ? 'transition-all duration-1000 ease-out' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Pourcentage et nombre */}
      <div className="w-20 text-right shrink-0">
        <span className="text-sm font-medium text-gray-900">{percentage}%</span>
        <span className="text-xs text-gray-500 ml-1">({count.toLocaleString()})</span>
      </div>
    </div>
  );
};

// Badge TripAdvisor
const TripAdvisorBadge: React.FC = () => (
  <div className="flex items-center gap-2 bg-gradient-to-r from-[#00aa6c] to-[#00875a] text-white px-4 py-2 rounded-full shadow-lg">
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="6.5" cy="12" r="4" />
      <circle cx="17.5" cy="12" r="4" />
      <circle cx="6.5" cy="12" r="2" fill="white" />
      <circle cx="17.5" cy="12" r="2" fill="white" />
      <circle cx="6.5" cy="12" r="1" fill="currentColor" />
      <circle cx="17.5" cy="12" r="1" fill="currentColor" />
      <path d="M12 6 L6 10 M12 6 L18 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse cx="12" cy="5" rx="1.5" ry="1" />
    </svg>
    <span className="font-semibold text-sm">{reviewStats.badge}</span>
  </div>
);

// Score circulaire animé
const CircularScore: React.FC<{ score: number; maxScore?: number }> = ({
  score,
  maxScore = 10
}) => {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 45; // rayon de 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Cercle de fond */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        {/* Cercle de progression */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#scoreGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1500 ease-out"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
        </defs>
      </svg>
      {/* Score au centre */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-green-600">{score}</span>
        <span className="text-sm text-gray-500">/{maxScore}</span>
      </div>
    </div>
  );
};

const ReviewStats: React.FC<ReviewStatsProps> = ({ showDetailed = true }) => {
  const percentages = getRatingPercentages();
  const { averageRating, totalReviews, ratingDistribution, rankingText } = reviewStats;

  return (
    <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl p-8 shadow-xl border border-green-100">
      {/* Header avec score principal */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        {/* Score circulaire */}
        <CircularScore score={averageRating} />

        {/* Infos principales */}
        <div className="text-center md:text-left flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Note exceptionnelle
          </h3>
          <p className="text-gray-600 mb-4">
            Basee sur <span className="font-semibold text-green-600">{totalReviews.toLocaleString()}+</span> avis verifies
          </p>
          <TripAdvisorBadge />
          <p className="text-sm text-gray-500 mt-3 italic">
            {rankingText}
          </p>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-green-600">98%</div>
            <div className="text-xs text-gray-500 mt-1">Recommandent</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-yellow-600">5.0</div>
            <div className="text-xs text-gray-500 mt-1">Note Viator</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-blue-600">4.9</div>
            <div className="text-xs text-gray-500 mt-1">Note Google</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-red-500">
              <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <div className="text-xs text-gray-500 mt-1">Coup de coeur</div>
          </div>
        </div>
      </div>

      {/* Distribution détaillée */}
      {showDetailed && (
        <div className="border-t border-green-200 pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Distribution des notes
          </h4>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars) => (
              <RatingBar
                key={stars}
                stars={stars}
                count={ratingDistribution[stars as keyof typeof ratingDistribution]}
                percentage={percentages[stars as keyof typeof percentages]}
              />
            ))}
          </div>
        </div>
      )}

      {/* Logos des plateformes */}
      <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-green-200">
        <span className="text-sm text-gray-500">Avis collectes sur:</span>
        <div className="flex items-center gap-6">
          {/* TripAdvisor */}
          <div className="flex items-center gap-1 text-[#00aa6c]">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="6.5" cy="12" r="4" />
              <circle cx="17.5" cy="12" r="4" />
              <circle cx="6.5" cy="12" r="2" fill="white" />
              <circle cx="17.5" cy="12" r="2" fill="white" />
              <circle cx="6.5" cy="12" r="1" />
              <circle cx="17.5" cy="12" r="1" />
            </svg>
          </div>
          {/* Viator */}
          <div className="flex items-center gap-1 text-[#3b5998]">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="6" width="18" height="12" rx="2" />
              <path d="M8 10 L11 14 L16 9" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>
          {/* Google */}
          <div className="flex items-center gap-1">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStats;
