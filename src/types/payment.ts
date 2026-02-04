/**
 * @fileoverview Types de paiement pour Rastasafari Experience
 * @description Définit tous les types liés aux transactions et paiements
 */

// ============================================
// STRIPE INTEGRATION TYPES
// ============================================

/**
 * Prix fixe par personne (USD)
 */
export const PRICE_PER_PERSON = 165;

/**
 * Devise par défaut
 */
export const DEFAULT_CURRENCY = 'USD' as const;

/**
 * Nombre maximum de participants
 */
export const MAX_PARTICIPANTS = 20;

/**
 * Nombre minimum de participants
 */
export const MIN_PARTICIPANTS = 1;

/**
 * Statut du flux de paiement Stripe
 */
export type StripePaymentFlowStatus =
  | 'idle'
  | 'creating_intent'
  | 'ready'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'cancelled';

/**
 * Statut du PaymentIntent Stripe (API)
 */
export type StripePaymentIntentStatus =
  | 'requires_payment_method'
  | 'requires_confirmation'
  | 'requires_action'
  | 'processing'
  | 'requires_capture'
  | 'canceled'
  | 'succeeded';

/**
 * Requête de création de PaymentIntent
 */
export interface CreatePaymentIntentRequest {
  participants: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  tourDate: string;
}

/**
 * Réponse de création de PaymentIntent
 */
export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  bookingReference: string;
}

/**
 * Requête de confirmation de paiement
 */
export interface ConfirmPaymentRequest {
  paymentIntentId: string;
}

/**
 * Réponse de confirmation de paiement
 */
export interface ConfirmPaymentResponse {
  success: boolean;
  status: StripePaymentIntentStatus;
  bookingReference: string | null;
  message?: string;
}

/**
 * Confirmation de réservation après paiement
 */
export interface BookingConfirmation {
  bookingReference: string;
  paymentIntentId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  participants: number;
  tourDate: string;
  totalAmount: number;
  paidAt: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
}

/**
 * Erreur de paiement Stripe
 */
export interface StripePaymentError {
  code: string;
  message: string;
  type: 'card_error' | 'validation_error' | 'api_error' | 'unknown';
  param?: string;
}

/**
 * Types d'événements webhook Stripe
 */
export type StripeWebhookEventType =
  | 'payment_intent.succeeded'
  | 'payment_intent.payment_failed'
  | 'payment_intent.canceled'
  | 'charge.succeeded'
  | 'charge.failed'
  | 'charge.refunded';

/**
 * Payload d'un événement webhook Stripe
 */
export interface StripeWebhookPayload {
  id: string;
  type: StripeWebhookEventType;
  data: {
    object: {
      id: string;
      amount: number;
      currency: string;
      status: StripePaymentIntentStatus;
      metadata: Record<string, string>;
      receipt_email?: string;
    };
  };
  created: number;
}

/**
 * Erreurs de validation du formulaire
 */
export interface PaymentFormValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  participants?: string;
  tourDate?: string;
  card?: string;
}

/**
 * Calcule le montant total
 */
export function calculateTotalAmount(participants: number): number {
  return participants * PRICE_PER_PERSON;
}

/**
 * Formate un montant en devise
 */
export function formatCurrencyAmount(amount: number, currency: string = DEFAULT_CURRENCY): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Valide le nombre de participants
 */
export function isValidParticipantCount(count: number): boolean {
  return count >= MIN_PARTICIPANTS && count <= MAX_PARTICIPANTS && Number.isInteger(count);
}

// ============================================
// EXISTING TYPES
// ============================================

/**
 * Méthode de paiement disponible
 */
export type PaymentMethod = 'card' | 'paypal' | 'bank-transfer' | 'cash-on-site';

/**
 * Statut d'une transaction
 */
export type TransactionStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partially-refunded';

/**
 * Type de transaction
 */
export type TransactionType = 'payment' | 'refund' | 'partial-refund' | 'chargeback';

/**
 * Devise supportée
 */
export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'JMD';

/**
 * Fournisseur de paiement
 */
export type PaymentProvider = 'stripe' | 'paypal' | 'manual';

/**
 * Libellés des méthodes de paiement
 */
export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  card: 'Carte bancaire',
  paypal: 'PayPal',
  'bank-transfer': 'Virement bancaire',
  'cash-on-site': 'Paiement sur place',
};

/**
 * Libellés des statuts de transaction
 */
export const TRANSACTION_STATUS_LABELS: Record<TransactionStatus, string> = {
  pending: 'En attente',
  processing: 'En cours',
  completed: 'Compl\u00e9t\u00e9',
  failed: '\u00c9chou\u00e9',
  cancelled: 'Annul\u00e9',
  refunded: 'Rembours\u00e9',
  'partially-refunded': 'Partiellement rembours\u00e9',
};

/**
 * Libellés des types de transaction
 */
export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  payment: 'Paiement',
  refund: 'Remboursement',
  'partial-refund': 'Remboursement partiel',
  chargeback: 'Contestation',
};

/**
 * Symboles des devises
 */
export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '\u20ac',
  GBP: '\u00a3',
  CAD: 'CA$',
  JMD: 'J$',
};

/**
 * Interface principale d'une transaction
 * @description Représente une transaction de paiement complète
 */
export interface Transaction {
  /**
   * Identifiant unique de la transaction (UUID)
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;

  /**
   * Numéro de transaction lisible
   * @example "TXN-2024-001234"
   */
  transactionNumber: string;

  /**
   * Identifiant de la réservation associée
   */
  bookingId: string;

  /**
   * Numéro de réservation associé
   */
  bookingNumber: string;

  /**
   * Identifiant du client
   */
  customerId: string;

  /**
   * Type de transaction
   */
  type: TransactionType;

  /**
   * Montant de la transaction
   */
  amount: number;

  /**
   * Devise
   */
  currency: Currency;

  /**
   * Taux de change appliqué (si conversion)
   * @optional
   */
  exchangeRate?: number;

  /**
   * Montant en devise de base (USD)
   */
  amountInBaseCurrency: number;

  /**
   * Méthode de paiement utilisée
   */
  paymentMethod: PaymentMethod;

  /**
   * Fournisseur de paiement
   */
  provider: PaymentProvider;

  /**
   * Identifiant de la transaction chez le fournisseur
   * @optional
   */
  providerTransactionId?: string;

  /**
   * Statut de la transaction
   */
  status: TransactionStatus;

  /**
   * Message d'erreur (si échec)
   * @optional
   */
  errorMessage?: string;

  /**
   * Code d'erreur (si échec)
   * @optional
   */
  errorCode?: string;

  /**
   * Détails de la carte (masqués)
   * @optional
   */
  cardDetails?: CardDetails;

  /**
   * Détails PayPal
   * @optional
   */
  paypalDetails?: PayPalDetails;

  /**
   * Adresse de facturation
   * @optional
   */
  billingAddress?: BillingAddress;

  /**
   * Frais de traitement
   * @optional
   */
  processingFees?: number;

  /**
   * Montant net (après frais)
   */
  netAmount: number;

  /**
   * Transaction liée (pour les remboursements)
   * @optional
   */
  relatedTransactionId?: string;

  /**
   * Notes internes
   * @optional
   */
  internalNotes?: string;

  /**
   * Métadonnées supplémentaires
   * @optional
   */
  metadata?: Record<string, unknown>;

  /**
   * Adresse IP du client
   * @optional
   */
  ipAddress?: string;

  /**
   * Date de création
   */
  createdAt: Date;

  /**
   * Date de mise à jour
   */
  updatedAt: Date;

  /**
   * Date de complétion
   * @optional
   */
  completedAt?: Date;
}

/**
 * Détails de carte bancaire (masqués)
 */
export interface CardDetails {
  /**
   * Marque de la carte
   * @example "visa"
   */
  brand: 'visa' | 'mastercard' | 'amex' | 'discover' | 'other';

  /**
   * Quatre derniers chiffres
   * @example "4242"
   */
  last4: string;

  /**
   * Mois d'expiration
   * @example 12
   */
  expMonth: number;

  /**
   * Année d'expiration
   * @example 2025
   */
  expYear: number;

  /**
   * Pays d'émission (code ISO)
   * @optional
   */
  country?: string;

  /**
   * Type de financement
   * @optional
   */
  funding?: 'credit' | 'debit' | 'prepaid' | 'unknown';
}

/**
 * Détails PayPal
 */
export interface PayPalDetails {
  /**
   * Email du compte PayPal
   */
  payerEmail: string;

  /**
   * Identifiant du payeur PayPal
   */
  payerId: string;

  /**
   * Nom du payeur
   * @optional
   */
  payerName?: string;
}

/**
 * Adresse de facturation
 */
export interface BillingAddress {
  /**
   * Ligne d'adresse 1
   */
  line1: string;

  /**
   * Ligne d'adresse 2
   * @optional
   */
  line2?: string;

  /**
   * Ville
   */
  city: string;

  /**
   * État / Province
   * @optional
   */
  state?: string;

  /**
   * Code postal
   * @optional
   */
  postalCode?: string;

  /**
   * Pays (code ISO)
   */
  country: string;
}

/**
 * Données pour initier un paiement
 */
export interface CreatePaymentData {
  /**
   * Identifiant de la réservation
   */
  bookingId: string;

  /**
   * Montant à payer
   */
  amount: number;

  /**
   * Devise
   * @default "USD"
   */
  currency?: Currency;

  /**
   * Méthode de paiement
   */
  paymentMethod: PaymentMethod;

  /**
   * Adresse de facturation
   * @optional
   */
  billingAddress?: BillingAddress;

  /**
   * Token de paiement Stripe
   * @optional
   */
  stripePaymentMethodId?: string;

  /**
   * URL de retour après paiement PayPal
   * @optional
   */
  returnUrl?: string;

  /**
   * URL d'annulation PayPal
   * @optional
   */
  cancelUrl?: string;
}

/**
 * Données pour effectuer un remboursement
 */
export interface CreateRefundData {
  /**
   * Identifiant de la transaction originale
   */
  transactionId: string;

  /**
   * Montant à rembourser (null = remboursement total)
   * @optional
   */
  amount?: number;

  /**
   * Raison du remboursement
   */
  reason: RefundReason;

  /**
   * Notes internes
   * @optional
   */
  internalNotes?: string;
}

/**
 * Raison de remboursement
 */
export type RefundReason =
  | 'customer-request'
  | 'tour-cancelled'
  | 'weather'
  | 'overbooking'
  | 'service-issue'
  | 'duplicate'
  | 'other';

/**
 * Libellés des raisons de remboursement
 */
export const REFUND_REASON_LABELS: Record<RefundReason, string> = {
  'customer-request': 'Demande du client',
  'tour-cancelled': 'Tour annul\u00e9',
  weather: 'Conditions m\u00e9t\u00e9orologiques',
  overbooking: 'Surr\u00e9servation',
  'service-issue': 'Probl\u00e8me de service',
  duplicate: 'Paiement en double',
  other: 'Autre raison',
};

/**
 * Filtres pour rechercher des transactions
 */
export interface TransactionFilters {
  /**
   * Filtrer par type
   * @optional
   */
  type?: TransactionType;

  /**
   * Filtrer par statut
   * @optional
   */
  status?: TransactionStatus;

  /**
   * Filtrer par méthode de paiement
   * @optional
   */
  paymentMethod?: PaymentMethod;

  /**
   * Filtrer par fournisseur
   * @optional
   */
  provider?: PaymentProvider;

  /**
   * Montant minimum
   * @optional
   */
  minAmount?: number;

  /**
   * Montant maximum
   * @optional
   */
  maxAmount?: number;

  /**
   * Date de début
   * @optional
   */
  dateFrom?: Date;

  /**
   * Date de fin
   * @optional
   */
  dateTo?: Date;

  /**
   * Recherche textuelle
   * @optional
   */
  search?: string;

  /**
   * Filtrer par réservation
   * @optional
   */
  bookingId?: string;

  /**
   * Filtrer par client
   * @optional
   */
  customerId?: string;
}

/**
 * Résumé de transaction pour les listes
 */
export interface TransactionSummary {
  /**
   * Identifiant
   */
  id: string;

  /**
   * Numéro de transaction
   */
  transactionNumber: string;

  /**
   * Type
   */
  type: TransactionType;

  /**
   * Montant
   */
  amount: number;

  /**
   * Devise
   */
  currency: Currency;

  /**
   * Méthode de paiement
   */
  paymentMethod: PaymentMethod;

  /**
   * Statut
   */
  status: TransactionStatus;

  /**
   * Numéro de réservation
   */
  bookingNumber: string;

  /**
   * Nom du client
   */
  customerName: string;

  /**
   * Date
   */
  createdAt: Date;
}

/**
 * Statistiques de paiement
 */
export interface PaymentStats {
  /**
   * Revenus totaux (USD)
   */
  totalRevenue: number;

  /**
   * Revenus ce mois
   */
  revenueThisMonth: number;

  /**
   * Revenus mois précédent
   */
  revenuePreviousMonth: number;

  /**
   * Évolution en pourcentage
   */
  revenueGrowth: number;

  /**
   * Nombre de transactions
   */
  transactionCount: number;

  /**
   * Panier moyen
   */
  averageOrderValue: number;

  /**
   * Taux de conversion
   */
  conversionRate: number;

  /**
   * Répartition par méthode de paiement
   */
  byPaymentMethod: Record<PaymentMethod, number>;

  /**
   * Répartition par devise
   */
  byCurrency: Record<Currency, number>;

  /**
   * Remboursements totaux
   */
  totalRefunds: number;

  /**
   * Taux de remboursement
   */
  refundRate: number;

  /**
   * Frais de traitement totaux
   */
  totalProcessingFees: number;

  /**
   * Revenus par jour (30 derniers jours)
   */
  dailyRevenue: Array<{
    date: string;
    amount: number;
  }>;
}

/**
 * Configuration des prix
 */
export interface PricingConfig {
  /**
   * Prix adulte (USD)
   */
  adultPrice: number;

  /**
   * Prix enfant (USD)
   */
  childPrice: number;

  /**
   * Âge minimum pour le tarif enfant
   */
  childMinAge: number;

  /**
   * Âge maximum pour le tarif enfant
   */
  childMaxAge: number;

  /**
   * Réduction groupe (%)
   * @optional
   */
  groupDiscount?: {
    minParticipants: number;
    discountPercent: number;
  };

  /**
   * Supplément haute saison (%)
   * @optional
   */
  highSeasonSurcharge?: number;

  /**
   * Dates de haute saison
   * @optional
   */
  highSeasonDates?: Array<{
    start: string;
    end: string;
  }>;
}

/**
 * Calcul de prix pour une réservation
 */
export interface PriceCalculation {
  /**
   * Prix unitaire adulte
   */
  adultUnitPrice: number;

  /**
   * Prix unitaire enfant
   */
  childUnitPrice: number;

  /**
   * Sous-total adultes
   */
  adultsSubtotal: number;

  /**
   * Sous-total enfants
   */
  childrenSubtotal: number;

  /**
   * Sous-total avant réductions
   */
  subtotal: number;

  /**
   * Réduction appliquée
   * @optional
   */
  discount?: {
    type: 'group' | 'promo' | 'other';
    description: string;
    amount: number;
  };

  /**
   * Supplément haute saison
   * @optional
   */
  highSeasonSurcharge?: number;

  /**
   * Total final
   */
  total: number;

  /**
   * Devise
   */
  currency: Currency;
}

/**
 * Code promotionnel
 */
export interface PromoCode {
  /**
   * Identifiant
   */
  id: string;

  /**
   * Code
   * @example "SUMMER20"
   */
  code: string;

  /**
   * Description
   */
  description: string;

  /**
   * Type de réduction
   */
  discountType: 'percentage' | 'fixed';

  /**
   * Valeur de la réduction
   */
  discountValue: number;

  /**
   * Montant minimum de commande
   * @optional
   */
  minOrderAmount?: number;

  /**
   * Nombre maximum d'utilisations
   * @optional
   */
  maxUses?: number;

  /**
   * Nombre d'utilisations actuelles
   */
  currentUses: number;

  /**
   * Date de début de validité
   */
  validFrom: Date;

  /**
   * Date de fin de validité
   */
  validTo: Date;

  /**
   * Actif
   */
  isActive: boolean;

  /**
   * Date de création
   */
  createdAt: Date;
}

/**
 * Validation d'un code promo
 */
export interface PromoCodeValidation {
  /**
   * Code valide
   */
  isValid: boolean;

  /**
   * Code promo (si valide)
   * @optional
   */
  promoCode?: PromoCode;

  /**
   * Message d'erreur (si invalide)
   * @optional
   */
  errorMessage?: string;

  /**
   * Montant de la réduction calculé
   * @optional
   */
  discountAmount?: number;
}
