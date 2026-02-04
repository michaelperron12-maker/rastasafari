/**
 * @fileoverview Types d'API pour Rastasafari Experience
 * @description Définit tous les types liés aux réponses et requêtes API
 */

import type { Booking, BookingSummary, BookingFilters, DateAvailability } from './booking';
import type { Customer, CustomerSummary, CustomerFilters, CustomerStats } from './customer';
import type { Review, ReviewSummary, ReviewFilters, ReviewStats, FeaturedReview } from './review';
import type { ContactRequest, ContactSummary, ContactFilters, ContactStats } from './contact';
import type { Transaction, TransactionSummary, TransactionFilters, PaymentStats, PriceCalculation, PromoCodeValidation } from './payment';

/**
 * Codes d'erreur API
 */
export type ApiErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'PAYMENT_FAILED'
  | 'BOOKING_UNAVAILABLE'
  | 'SESSION_FULL'
  | 'INVALID_PROMO_CODE';

/**
 * Libellés des codes d'erreur
 */
export const API_ERROR_LABELS: Record<ApiErrorCode, string> = {
  BAD_REQUEST: 'Requ\u00eate invalide',
  UNAUTHORIZED: 'Non autoris\u00e9',
  FORBIDDEN: 'Acc\u00e8s refus\u00e9',
  NOT_FOUND: 'Ressource non trouv\u00e9e',
  CONFLICT: 'Conflit de donn\u00e9es',
  VALIDATION_ERROR: 'Erreur de validation',
  RATE_LIMITED: 'Trop de requ\u00eates',
  INTERNAL_ERROR: 'Erreur interne du serveur',
  SERVICE_UNAVAILABLE: 'Service temporairement indisponible',
  PAYMENT_FAILED: '\u00c9chec du paiement',
  BOOKING_UNAVAILABLE: 'R\u00e9servation non disponible',
  SESSION_FULL: 'Session compl\u00e8te',
  INVALID_PROMO_CODE: 'Code promotionnel invalide',
};

/**
 * Réponse API générique de succès
 * @template T Type des données retournées
 */
export interface ApiResponse<T> {
  /**
   * Indique le succès de l'opération
   */
  success: true;

  /**
   * Données de la réponse
   */
  data: T;

  /**
   * Message optionnel
   * @optional
   */
  message?: string;

  /**
   * Métadonnées additionnelles
   * @optional
   */
  meta?: ApiResponseMeta;
}

/**
 * Réponse API d'erreur
 */
export interface ApiErrorResponse {
  /**
   * Indique l'échec de l'opération
   */
  success: false;

  /**
   * Code d'erreur
   */
  error: {
    /**
     * Code d'erreur standardisé
     */
    code: ApiErrorCode;

    /**
     * Message d'erreur lisible
     */
    message: string;

    /**
     * Détails supplémentaires
     * @optional
     */
    details?: Record<string, unknown>;

    /**
     * Erreurs de validation par champ
     * @optional
     */
    fieldErrors?: ValidationFieldError[];

    /**
     * Identifiant de trace pour le support
     * @optional
     */
    traceId?: string;
  };
}

/**
 * Erreur de validation par champ
 */
export interface ValidationFieldError {
  /**
   * Nom du champ
   */
  field: string;

  /**
   * Message d'erreur
   */
  message: string;

  /**
   * Code d'erreur de validation
   * @optional
   */
  code?: string;
}

/**
 * Métadonnées de réponse API
 */
export interface ApiResponseMeta {
  /**
   * Horodatage de la réponse
   */
  timestamp: string;

  /**
   * Version de l'API
   */
  apiVersion: string;

  /**
   * Identifiant de requête
   */
  requestId: string;
}

/**
 * Réponse paginée
 * @template T Type des éléments de la liste
 */
export interface PaginatedResponse<T> {
  /**
   * Liste des éléments
   */
  items: T[];

  /**
   * Informations de pagination
   */
  pagination: PaginationInfo;
}

/**
 * Informations de pagination
 */
export interface PaginationInfo {
  /**
   * Page actuelle (commence à 1)
   */
  page: number;

  /**
   * Nombre d'éléments par page
   */
  pageSize: number;

  /**
   * Nombre total d'éléments
   */
  totalItems: number;

  /**
   * Nombre total de pages
   */
  totalPages: number;

  /**
   * A une page précédente
   */
  hasPrevious: boolean;

  /**
   * A une page suivante
   */
  hasNext: boolean;
}

/**
 * Paramètres de pagination pour les requêtes
 */
export interface PaginationParams {
  /**
   * Numéro de page (commence à 1)
   * @default 1
   */
  page?: number;

  /**
   * Nombre d'éléments par page
   * @default 20
   * @maximum 100
   */
  pageSize?: number;
}

/**
 * Paramètres de tri
 */
export interface SortParams {
  /**
   * Champ de tri
   */
  sortBy?: string;

  /**
   * Direction du tri
   * @default "desc"
   */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Type union pour toute réponse API
 */
export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;

// ============================================================================
// RÉPONSES API SPÉCIFIQUES
// ============================================================================

/**
 * Réponse de création de réservation
 */
export interface CreateBookingResponse {
  /**
   * Réservation créée
   */
  booking: Booking;

  /**
   * URL de paiement (si paiement en ligne)
   * @optional
   */
  paymentUrl?: string;

  /**
   * Session de paiement Stripe
   * @optional
   */
  stripeSessionId?: string;
}

/**
 * Réponse de liste de réservations
 */
export type BookingListResponse = PaginatedResponse<BookingSummary>;

/**
 * Réponse de disponibilité
 */
export interface AvailabilityResponse {
  /**
   * Disponibilités par date
   */
  availability: DateAvailability[];

  /**
   * Date de début de la période
   */
  periodStart: string;

  /**
   * Date de fin de la période
   */
  periodEnd: string;
}

/**
 * Réponse de liste de clients
 */
export type CustomerListResponse = PaginatedResponse<CustomerSummary>;

/**
 * Réponse de statistiques clients
 */
export type CustomerStatsResponse = CustomerStats;

/**
 * Réponse de liste d'avis
 */
export type ReviewListResponse = PaginatedResponse<ReviewSummary>;

/**
 * Réponse d'avis mis en avant
 */
export interface FeaturedReviewsResponse {
  /**
   * Avis mis en avant
   */
  reviews: FeaturedReview[];

  /**
   * Statistiques globales
   */
  stats: {
    /**
     * Note moyenne
     */
    averageRating: number;

    /**
     * Nombre total d'avis
     */
    totalReviews: number;
  };
}

/**
 * Réponse de statistiques d'avis
 */
export type ReviewStatsResponse = ReviewStats;

/**
 * Réponse de liste de demandes de contact
 */
export type ContactListResponse = PaginatedResponse<ContactSummary>;

/**
 * Réponse de statistiques de contact
 */
export type ContactStatsResponse = ContactStats;

/**
 * Réponse de liste de transactions
 */
export type TransactionListResponse = PaginatedResponse<TransactionSummary>;

/**
 * Réponse d'initiation de paiement
 */
export interface InitiatePaymentResponse {
  /**
   * Transaction créée
   */
  transaction: Transaction;

  /**
   * Client secret Stripe (pour paiement carte)
   * @optional
   */
  clientSecret?: string;

  /**
   * URL de paiement PayPal
   * @optional
   */
  paypalApprovalUrl?: string;

  /**
   * Expire à
   * @optional
   */
  expiresAt?: string;
}

/**
 * Réponse de confirmation de paiement
 */
export interface ConfirmPaymentResponse {
  /**
   * Transaction mise à jour
   */
  transaction: Transaction;

  /**
   * Réservation mise à jour
   */
  booking: Booking;

  /**
   * URL de confirmation/reçu
   * @optional
   */
  receiptUrl?: string;
}

/**
 * Réponse de remboursement
 */
export interface RefundResponse {
  /**
   * Transaction de remboursement
   */
  refundTransaction: Transaction;

  /**
   * Transaction originale mise à jour
   */
  originalTransaction: Transaction;

  /**
   * Réservation mise à jour
   */
  booking: Booking;
}

/**
 * Réponse de calcul de prix
 */
export type PriceCalculationResponse = PriceCalculation;

/**
 * Réponse de validation de code promo
 */
export type PromoCodeValidationResponse = PromoCodeValidation;

/**
 * Réponse de statistiques de paiement
 */
export type PaymentStatsResponse = PaymentStats;

/**
 * Réponse du tableau de bord
 */
export interface DashboardResponse {
  /**
   * Statistiques de réservation
   */
  bookings: {
    /**
     * Total des réservations
     */
    total: number;

    /**
     * En attente
     */
    pending: number;

    /**
     * Confirmées
     */
    confirmed: number;

    /**
     * Aujourd'hui
     */
    today: number;

    /**
     * Cette semaine
     */
    thisWeek: number;
  };

  /**
   * Statistiques financières
   */
  revenue: {
    /**
     * Revenus ce mois
     */
    thisMonth: number;

    /**
     * Revenus mois précédent
     */
    lastMonth: number;

    /**
     * Évolution (%)
     */
    growth: number;
  };

  /**
   * Statistiques clients
   */
  customers: {
    /**
     * Total
     */
    total: number;

    /**
     * Nouveaux ce mois
     */
    newThisMonth: number;
  };

  /**
   * Statistiques avis
   */
  reviews: {
    /**
     * Note moyenne
     */
    averageRating: number;

    /**
     * Total des avis
     */
    total: number;

    /**
     * En attente de modération
     */
    pending: number;
  };

  /**
   * Prochaines réservations
   */
  upcomingBookings: BookingSummary[];

  /**
   * Demandes de contact récentes
   */
  recentContacts: ContactSummary[];
}

/**
 * Réponse de santé de l'API
 */
export interface HealthCheckResponse {
  /**
   * Statut général
   */
  status: 'healthy' | 'degraded' | 'unhealthy';

  /**
   * Version de l'API
   */
  version: string;

  /**
   * Environnement
   */
  environment: 'development' | 'staging' | 'production';

  /**
   * Horodatage
   */
  timestamp: string;

  /**
   * Statut des services
   */
  services: {
    /**
     * Base de données
     */
    database: ServiceHealth;

    /**
     * Cache
     */
    cache: ServiceHealth;

    /**
     * Stripe
     */
    stripe: ServiceHealth;

    /**
     * Email
     */
    email: ServiceHealth;
  };
}

/**
 * Santé d'un service
 */
export interface ServiceHealth {
  /**
   * Statut
   */
  status: 'up' | 'down' | 'degraded';

  /**
   * Latence en ms
   * @optional
   */
  latency?: number;

  /**
   * Message
   * @optional
   */
  message?: string;
}

// ============================================================================
// REQUÊTES API
// ============================================================================

/**
 * Requête de liste de réservations
 */
export interface BookingListRequest extends PaginationParams, SortParams {
  /**
   * Filtres
   * @optional
   */
  filters?: BookingFilters;
}

/**
 * Requête de liste de clients
 */
export interface CustomerListRequest extends PaginationParams, SortParams {
  /**
   * Filtres
   * @optional
   */
  filters?: CustomerFilters;
}

/**
 * Requête de liste d'avis
 */
export interface ReviewListRequest extends PaginationParams, SortParams {
  /**
   * Filtres
   * @optional
   */
  filters?: ReviewFilters;
}

/**
 * Requête de liste de contacts
 */
export interface ContactListRequest extends PaginationParams, SortParams {
  /**
   * Filtres
   * @optional
   */
  filters?: ContactFilters;
}

/**
 * Requête de liste de transactions
 */
export interface TransactionListRequest extends PaginationParams, SortParams {
  /**
   * Filtres
   * @optional
   */
  filters?: TransactionFilters;
}

/**
 * Requête de disponibilité
 */
export interface AvailabilityRequest {
  /**
   * Date de début (format YYYY-MM-DD)
   */
  startDate: string;

  /**
   * Date de fin (format YYYY-MM-DD)
   */
  endDate: string;

  /**
   * Nombre de personnes (pour vérifier la capacité)
   * @optional
   */
  participants?: number;
}

/**
 * Requête de calcul de prix
 */
export interface PriceCalculationRequest {
  /**
   * Date du tour
   */
  date: string;

  /**
   * Nombre d'adultes
   */
  adults: number;

  /**
   * Nombre d'enfants
   */
  children: number;

  /**
   * Code promo
   * @optional
   */
  promoCode?: string;
}

/**
 * Type helper pour extraire les données d'une réponse API
 */
export type ExtractApiData<T> = T extends ApiResponse<infer U> ? U : never;

/**
 * Type helper pour créer un type de requête avec filtres
 */
export type WithFilters<F> = PaginationParams & SortParams & { filters?: F };
