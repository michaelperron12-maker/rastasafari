/**
 * @fileoverview Types d'avis pour Rastasafari Experience
 * @description Définit tous les types liés aux avis et témoignages clients
 */

/**
 * Note d'évaluation (1 à 5 étoiles)
 */
export type Rating = 1 | 2 | 3 | 4 | 5;

/**
 * Statut de modération d'un avis
 */
export type ReviewStatus = 'pending' | 'approved' | 'rejected';

/**
 * Source de l'avis
 * @description Plateforme d'origine de l'avis
 */
export type ReviewSource = 'website' | 'tripadvisor' | 'google' | 'facebook' | 'imported';

/**
 * Catégorie de l'avis
 * @description Aspect de l'expérience évalué
 */
export type ReviewCategory =
  | 'overall'
  | 'guide'
  | 'transport'
  | 'food'
  | 'value'
  | 'safety';

/**
 * Libellés des statuts de modération
 */
export const REVIEW_STATUS_LABELS: Record<ReviewStatus, string> = {
  pending: 'En attente de mod\u00e9ration',
  approved: 'Approuv\u00e9',
  rejected: 'Rejet\u00e9',
};

/**
 * Libellés des sources d'avis
 */
export const REVIEW_SOURCE_LABELS: Record<ReviewSource, string> = {
  website: 'Site web',
  tripadvisor: 'TripAdvisor',
  google: 'Google',
  facebook: 'Facebook',
  imported: 'Import\u00e9',
};

/**
 * Libellés des catégories d'avis
 */
export const REVIEW_CATEGORY_LABELS: Record<ReviewCategory, string> = {
  overall: 'Exp\u00e9rience globale',
  guide: 'Guide touristique',
  transport: 'Transport',
  food: 'Nourriture / Rafra\u00eechissements',
  value: 'Rapport qualit\u00e9-prix',
  safety: 'S\u00e9curit\u00e9',
};

/**
 * Interface principale d'un avis
 * @description Représente un avis client complet
 */
export interface Review {
  /**
   * Identifiant unique de l'avis (UUID)
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;

  /**
   * Identifiant de la réservation associée
   * @optional - peut être null pour les avis importés
   */
  bookingId?: string;

  /**
   * Identifiant du client
   * @optional - peut être null pour les avis importés
   */
  customerId?: string;

  /**
   * Nom de l'auteur de l'avis
   * @example "Jean D."
   */
  authorName: string;

  /**
   * Pays de l'auteur (code ISO)
   * @optional
   * @example "FR"
   */
  authorCountry?: string;

  /**
   * URL de l'avatar de l'auteur
   * @optional
   */
  authorAvatar?: string;

  /**
   * Note globale (1-5)
   */
  rating: Rating;

  /**
   * Notes détaillées par catégorie
   * @optional
   */
  categoryRatings?: Partial<Record<ReviewCategory, Rating>>;

  /**
   * Titre de l'avis
   * @example "Une expérience inoubliable !"
   */
  title: string;

  /**
   * Contenu détaillé de l'avis
   */
  content: string;

  /**
   * Points positifs mentionnés
   * @optional
   */
  pros?: string[];

  /**
   * Points négatifs mentionnés
   * @optional
   */
  cons?: string[];

  /**
   * Photos jointes à l'avis
   * @optional
   */
  photos?: ReviewPhoto[];

  /**
   * Date de l'expérience
   */
  experienceDate: Date;

  /**
   * Type de groupe (famille, couple, amis, solo)
   * @optional
   */
  groupType?: GroupType;

  /**
   * Source de l'avis
   */
  source: ReviewSource;

  /**
   * URL externe de l'avis (si importé)
   * @optional
   */
  externalUrl?: string;

  /**
   * Statut de modération
   */
  status: ReviewStatus;

  /**
   * Raison du rejet (si rejeté)
   * @optional
   */
  rejectionReason?: string;

  /**
   * Réponse de l'équipe Rastasafari
   * @optional
   */
  response?: ReviewResponse;

  /**
   * Nombre de "utile" reçus
   * @default 0
   */
  helpfulCount: number;

  /**
   * Mis en avant sur le site
   * @default false
   */
  isFeatured: boolean;

  /**
   * Vérifié (lié à une vraie réservation)
   */
  isVerified: boolean;

  /**
   * Date de création
   */
  createdAt: Date;

  /**
   * Date de dernière modification
   */
  updatedAt: Date;
}

/**
 * Type de groupe pour l'avis
 */
export type GroupType = 'family' | 'couple' | 'friends' | 'solo' | 'business';

/**
 * Libellés des types de groupe
 */
export const GROUP_TYPE_LABELS: Record<GroupType, string> = {
  family: 'En famille',
  couple: 'En couple',
  friends: 'Entre amis',
  solo: 'Seul(e)',
  business: 'Voyage d\'affaires',
};

/**
 * Photo jointe à un avis
 */
export interface ReviewPhoto {
  /**
   * Identifiant de la photo
   */
  id: string;

  /**
   * URL de la photo originale
   */
  url: string;

  /**
   * URL de la miniature
   */
  thumbnailUrl: string;

  /**
   * Légende de la photo
   * @optional
   */
  caption?: string;

  /**
   * Date de prise de vue
   * @optional
   */
  takenAt?: Date;
}

/**
 * Réponse de l'équipe à un avis
 */
export interface ReviewResponse {
  /**
   * Contenu de la réponse
   */
  content: string;

  /**
   * Nom du répondant
   * @example "L'équipe Rastasafari"
   */
  respondentName: string;

  /**
   * Date de la réponse
   */
  respondedAt: Date;
}

/**
 * Données pour créer un nouvel avis
 */
export interface CreateReviewData {
  /**
   * Identifiant de la réservation
   * @optional
   */
  bookingId?: string;

  /**
   * Nom de l'auteur
   */
  authorName: string;

  /**
   * Pays de l'auteur
   * @optional
   */
  authorCountry?: string;

  /**
   * Note globale
   */
  rating: Rating;

  /**
   * Notes par catégorie
   * @optional
   */
  categoryRatings?: Partial<Record<ReviewCategory, Rating>>;

  /**
   * Titre de l'avis
   */
  title: string;

  /**
   * Contenu de l'avis
   */
  content: string;

  /**
   * Points positifs
   * @optional
   */
  pros?: string[];

  /**
   * Points négatifs
   * @optional
   */
  cons?: string[];

  /**
   * Date de l'expérience
   */
  experienceDate: Date;

  /**
   * Type de groupe
   * @optional
   */
  groupType?: GroupType;

  /**
   * Source de l'avis
   * @default "website"
   */
  source?: ReviewSource;
}

/**
 * Données pour mettre à jour un avis
 */
export interface UpdateReviewData {
  /**
   * Nouveau statut de modération
   * @optional
   */
  status?: ReviewStatus;

  /**
   * Raison du rejet
   * @optional
   */
  rejectionReason?: string;

  /**
   * Réponse de l'équipe
   * @optional
   */
  response?: Omit<ReviewResponse, 'respondedAt'>;

  /**
   * Mettre en avant
   * @optional
   */
  isFeatured?: boolean;
}

/**
 * Filtres pour rechercher des avis
 */
export interface ReviewFilters {
  /**
   * Filtrer par statut de modération
   * @optional
   */
  status?: ReviewStatus;

  /**
   * Filtrer par note minimale
   * @optional
   */
  minRating?: Rating;

  /**
   * Filtrer par note maximale
   * @optional
   */
  maxRating?: Rating;

  /**
   * Filtrer par source
   * @optional
   */
  source?: ReviewSource;

  /**
   * Filtrer les avis mis en avant
   * @optional
   */
  isFeatured?: boolean;

  /**
   * Filtrer les avis vérifiés
   * @optional
   */
  isVerified?: boolean;

  /**
   * Filtrer par type de groupe
   * @optional
   */
  groupType?: GroupType;

  /**
   * Date d'expérience depuis
   * @optional
   */
  experienceDateFrom?: Date;

  /**
   * Date d'expérience jusqu'à
   * @optional
   */
  experienceDateTo?: Date;

  /**
   * Recherche textuelle
   * @optional
   */
  search?: string;

  /**
   * Avec photos uniquement
   * @optional
   */
  hasPhotos?: boolean;

  /**
   * Avec réponse uniquement
   * @optional
   */
  hasResponse?: boolean;
}

/**
 * Résumé d'avis pour les listes
 */
export interface ReviewSummary {
  /**
   * Identifiant
   */
  id: string;

  /**
   * Nom de l'auteur
   */
  authorName: string;

  /**
   * Note
   */
  rating: Rating;

  /**
   * Titre
   */
  title: string;

  /**
   * Extrait du contenu (premiers 150 caractères)
   */
  excerpt: string;

  /**
   * Date de l'expérience
   */
  experienceDate: Date;

  /**
   * Source
   */
  source: ReviewSource;

  /**
   * Statut
   */
  status: ReviewStatus;

  /**
   * Nombre de photos
   */
  photoCount: number;

  /**
   * A une réponse
   */
  hasResponse: boolean;

  /**
   * Est mis en avant
   */
  isFeatured: boolean;
}

/**
 * Statistiques des avis
 */
export interface ReviewStats {
  /**
   * Nombre total d'avis approuvés
   */
  totalReviews: number;

  /**
   * Note moyenne
   */
  averageRating: number;

  /**
   * Répartition par note
   */
  ratingDistribution: Record<Rating, number>;

  /**
   * Notes moyennes par catégorie
   */
  categoryAverages: Partial<Record<ReviewCategory, number>>;

  /**
   * Répartition par source
   */
  sourceDistribution: Record<ReviewSource, number>;

  /**
   * Nombre d'avis en attente de modération
   */
  pendingCount: number;

  /**
   * Pourcentage de recommandation (4-5 étoiles)
   */
  recommendationRate: number;

  /**
   * Avis ce mois-ci
   */
  thisMonthCount: number;
}

/**
 * Avis affiché sur la page d'accueil
 */
export interface FeaturedReview {
  /**
   * Identifiant
   */
  id: string;

  /**
   * Nom de l'auteur
   */
  authorName: string;

  /**
   * Pays de l'auteur
   */
  authorCountry?: string;

  /**
   * Avatar de l'auteur
   */
  authorAvatar?: string;

  /**
   * Note
   */
  rating: Rating;

  /**
   * Contenu (peut être tronqué)
   */
  content: string;

  /**
   * Type de groupe
   */
  groupType?: GroupType;

  /**
   * Date de l'expérience
   */
  experienceDate: Date;
}
