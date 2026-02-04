import React from 'react';
import type { Review } from '../../data/reviews';

interface ReviewCardProps {
  review: Review;
  compact?: boolean;
}

// Icône étoile remplie
const StarFilledIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Icône étoile vide
const StarEmptyIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Logo des sources
const SourceLogo: React.FC<{ source: Review['source'] }> = ({ source }) => {
  const logos = {
    TripAdvisor: (
      <div className="flex items-center gap-1 text-[#00aa6c]">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="6.5" cy="12" r="4" />
          <circle cx="17.5" cy="12" r="4" />
          <circle cx="6.5" cy="12" r="2" fill="white" />
          <circle cx="17.5" cy="12" r="2" fill="white" />
          <circle cx="6.5" cy="12" r="1" />
          <circle cx="17.5" cy="12" r="1" />
          <path d="M12 6 L6 10 M12 6 L18 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <ellipse cx="12" cy="5" rx="1.5" ry="1" />
        </svg>
        <span className="text-xs font-medium">TripAdvisor</span>
      </div>
    ),
    Viator: (
      <div className="flex items-center gap-1 text-[#3b5998]">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M8 10 L11 14 L16 9" stroke="white" strokeWidth="2" fill="none" />
        </svg>
        <span className="text-xs font-medium">Viator</span>
      </div>
    ),
    Google: (
      <div className="flex items-center gap-1 text-[#4285f4]">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        <span className="text-xs font-medium">Google</span>
      </div>
    ),
  };

  return logos[source] || null;
};

// Composant d'étoiles
const StarRating: React.FC<{ rating: number; maxRating?: number }> = ({
  rating,
  maxRating = 5
}) => {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: maxRating }, (_, i) => (
        i < rating ? (
          <StarFilledIcon key={i} className="w-4 h-4 text-yellow-400" />
        ) : (
          <StarEmptyIcon key={i} className="w-4 h-4 text-gray-300" />
        )
      ))}
    </div>
  );
};

// Avatar avec initiales ou photo
const Avatar: React.FC<{
  name: string;
  initials: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ name, initials, imageUrl, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  };

  // Couleurs de fond basées sur les initiales pour la variété
  const colors = [
    'bg-green-600',
    'bg-yellow-600',
    'bg-red-600',
    'bg-emerald-600',
    'bg-amber-600',
    'bg-lime-600',
  ];
  const colorIndex = initials.charCodeAt(0) % colors.length;

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-green-200`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} ${colors[colorIndex]} rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-green-200`}
      title={name}
    >
      {initials}
    </div>
  );
};

// Badge vérifié
const VerifiedBadge: React.FC = () => (
  <div className="flex items-center gap-1 text-green-600 text-xs">
    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
    <span>Avis vérifié</span>
  </div>
);

const ReviewCard: React.FC<ReviewCardProps> = ({ review, compact = false }) => {
  const {
    reviewerName,
    reviewerInitials,
    reviewerAvatar,
    reviewerCountry,
    visitDate,
    rating,
    title,
    comment,
    source,
    verified,
    helpful,
  } = review;

  if (compact) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-green-100">
        <div className="flex items-start gap-3">
          <Avatar
            name={reviewerName}
            initials={reviewerInitials}
            imageUrl={reviewerAvatar}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-gray-900 truncate">{reviewerName}</span>
              <StarRating rating={rating} />
            </div>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{comment}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200">
      {/* Header avec avatar et infos */}
      <header className="flex items-start gap-4 mb-4">
        <Avatar
          name={reviewerName}
          initials={reviewerInitials}
          imageUrl={reviewerAvatar}
          size="md"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900">{reviewerName}</h3>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500 text-sm">{reviewerCountry}</span>
          </div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <StarRating rating={rating} />
            <span className="text-gray-400 text-sm">{visitDate}</span>
          </div>
        </div>
      </header>

      {/* Titre de l'avis */}
      <h4 className="font-semibold text-lg text-gray-900 mb-2 leading-tight">
        "{title}"
      </h4>

      {/* Commentaire */}
      <p className="text-gray-600 leading-relaxed mb-4">
        {comment}
      </p>

      {/* Footer avec source et badge vérifié */}
      <footer className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <SourceLogo source={source} />
          {verified && <VerifiedBadge />}
        </div>
        {helpful && helpful > 0 && (
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span>{helpful} personnes ont trouve cet avis utile</span>
          </div>
        )}
      </footer>
    </article>
  );
};

export default ReviewCard;
