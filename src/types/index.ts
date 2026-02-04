/**
 * @fileoverview Point d'entrée des types pour Rastasafari Experience
 * @description Exporte tous les types depuis un seul module
 */

// ============================================================================
// TYPES DE RÉSERVATION
// ============================================================================
export type {
  Session,
  BookingStatus,
  PaymentStatus,
  PickupLocation,
  Booking,
  CreateBookingData,
  UpdateBookingData,
  BookingFilters,
  BookingSummary,
  SessionAvailability,
  DateAvailability,
} from './booking';

export {
  SESSION_LABELS,
  BOOKING_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  PICKUP_LOCATION_LABELS,
} from './booking';

// ============================================================================
// TYPES DE CLIENT
// ============================================================================
export type {
  Language,
  AcquisitionSource,
  Customer,
  CreateCustomerData,
  UpdateCustomerData,
  CustomerFilters,
  CustomerSummary,
  CustomerStats,
  CustomerContactInfo,
} from './customer';

export {
  LANGUAGE_LABELS,
  ACQUISITION_SOURCE_LABELS,
} from './customer';

// ============================================================================
// TYPES D'AVIS
// ============================================================================
export type {
  Rating,
  ReviewStatus,
  ReviewSource,
  ReviewCategory,
  GroupType,
  Review,
  ReviewPhoto,
  ReviewResponse,
  CreateReviewData,
  UpdateReviewData,
  ReviewFilters,
  ReviewSummary,
  ReviewStats,
  FeaturedReview,
} from './review';

export {
  REVIEW_STATUS_LABELS,
  REVIEW_SOURCE_LABELS,
  REVIEW_CATEGORY_LABELS,
  GROUP_TYPE_LABELS,
} from './review';

// ============================================================================
// TYPES DE CONTACT
// ============================================================================
export type {
  ContactSubject,
  ContactStatus,
  ContactPriority,
  ContactRequest,
  ContactAttachment,
  ContactResponse,
  CreateContactData,
  UpdateContactData,
  CreateContactResponseData,
  ContactFilters,
  ContactSummary,
  ContactStats,
  CompanyContactInfo,
  NewsletterSubscription,
} from './contact';

export {
  CONTACT_SUBJECT_LABELS,
  CONTACT_STATUS_LABELS,
  CONTACT_PRIORITY_LABELS,
} from './contact';

// ============================================================================
// TYPES DE PAIEMENT
// ============================================================================
export type {
  PaymentMethod,
  TransactionStatus,
  TransactionType,
  Currency,
  PaymentProvider,
  RefundReason,
  Transaction,
  CardDetails,
  PayPalDetails,
  BillingAddress,
  CreatePaymentData,
  CreateRefundData,
  TransactionFilters,
  TransactionSummary,
  PaymentStats,
  PricingConfig,
  PriceCalculation,
  PromoCode,
  PromoCodeValidation,
} from './payment';

export {
  PAYMENT_METHOD_LABELS,
  TRANSACTION_STATUS_LABELS,
  TRANSACTION_TYPE_LABELS,
  CURRENCY_SYMBOLS,
  REFUND_REASON_LABELS,
} from './payment';

// ============================================================================
// TYPES API
// ============================================================================
export type {
  ApiErrorCode,
  ApiResponse,
  ApiErrorResponse,
  ValidationFieldError,
  ApiResponseMeta,
  PaginatedResponse,
  PaginationInfo,
  PaginationParams,
  SortParams,
  ApiResult,
  // Réponses spécifiques
  CreateBookingResponse,
  BookingListResponse,
  AvailabilityResponse,
  CustomerListResponse,
  CustomerStatsResponse,
  ReviewListResponse,
  FeaturedReviewsResponse,
  ReviewStatsResponse,
  ContactListResponse,
  ContactStatsResponse,
  TransactionListResponse,
  InitiatePaymentResponse,
  ConfirmPaymentResponse,
  RefundResponse,
  PriceCalculationResponse,
  PromoCodeValidationResponse,
  PaymentStatsResponse,
  DashboardResponse,
  HealthCheckResponse,
  ServiceHealth,
  // Requêtes
  BookingListRequest,
  CustomerListRequest,
  ReviewListRequest,
  ContactListRequest,
  TransactionListRequest,
  AvailabilityRequest,
  PriceCalculationRequest,
  // Helpers
  ExtractApiData,
  WithFilters,
} from './api';

export { API_ERROR_LABELS } from './api';
