/**
 * @fileoverview Types de client pour Rastasafari Experience
 * @description Définit tous les types liés aux informations clients
 */

/**
 * Préférence de langue du client
 */
export type Language = 'fr' | 'en' | 'es' | 'de';

/**
 * Source d'acquisition du client
 * @description Comment le client a découvert Rastasafari Experience
 */
export type AcquisitionSource =
  | 'google'
  | 'tripadvisor'
  | 'facebook'
  | 'instagram'
  | 'referral'
  | 'hotel'
  | 'other';

/**
 * Libellés des langues
 */
export const LANGUAGE_LABELS: Record<Language, string> = {
  fr: 'Fran\u00e7ais',
  en: 'English',
  es: 'Espa\u00f1ol',
  de: 'Deutsch',
};

/**
 * Libellés des sources d'acquisition
 */
export const ACQUISITION_SOURCE_LABELS: Record<AcquisitionSource, string> = {
  google: 'Recherche Google',
  tripadvisor: 'TripAdvisor',
  facebook: 'Facebook',
  instagram: 'Instagram',
  referral: 'Recommandation',
  hotel: 'H\u00f4tel / Concierge',
  other: 'Autre',
};

/**
 * Interface principale du client
 * @description Représente un client dans le système
 */
export interface Customer {
  /**
   * Identifiant unique du client (UUID)
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;

  /**
   * Prénom du client
   * @example "Jean"
   */
  firstName: string;

  /**
   * Nom de famille du client
   * @example "Dupont"
   */
  lastName: string;

  /**
   * Adresse email du client
   * @format email
   * @example "jean.dupont@example.com"
   */
  email: string;

  /**
   * Numéro de téléphone avec indicatif pays
   * @example "+33612345678"
   */
  phone: string;

  /**
   * Pays de résidence (code ISO 3166-1 alpha-2)
   * @example "FR"
   */
  country: string;

  /**
   * Langue préférée pour les communications
   * @default "en"
   */
  preferredLanguage: Language;

  /**
   * Source d'acquisition
   * @optional
   */
  acquisitionSource?: AcquisitionSource;

  /**
   * Acceptation des conditions générales
   */
  termsAccepted: boolean;

  /**
   * Acceptation des communications marketing
   * @default false
   */
  marketingOptIn: boolean;

  /**
   * Date de création du profil client
   */
  createdAt: Date;

  /**
   * Nombre total de réservations effectuées
   * @optional
   */
  totalBookings?: number;

  /**
   * Montant total dépensé en USD
   * @optional
   */
  totalSpent?: number;

  /**
   * Dernière date de réservation
   * @optional
   */
  lastBookingDate?: Date;

  /**
   * Notes internes sur le client
   * @optional
   */
  internalNotes?: string;
}

/**
 * Données pour créer un nouveau client
 */
export interface CreateCustomerData {
  /**
   * Prénom du client
   */
  firstName: string;

  /**
   * Nom de famille du client
   */
  lastName: string;

  /**
   * Adresse email
   * @format email
   */
  email: string;

  /**
   * Numéro de téléphone
   */
  phone: string;

  /**
   * Pays de résidence (code ISO)
   */
  country: string;

  /**
   * Langue préférée
   * @default "en"
   */
  preferredLanguage?: Language;

  /**
   * Source d'acquisition
   * @optional
   */
  acquisitionSource?: AcquisitionSource;

  /**
   * Acceptation des conditions générales
   */
  termsAccepted: boolean;

  /**
   * Acceptation des communications marketing
   * @default false
   */
  marketingOptIn?: boolean;
}

/**
 * Données pour mettre à jour un client existant
 */
export interface UpdateCustomerData {
  /**
   * Nouveau prénom
   * @optional
   */
  firstName?: string;

  /**
   * Nouveau nom de famille
   * @optional
   */
  lastName?: string;

  /**
   * Nouvelle adresse email
   * @optional
   */
  email?: string;

  /**
   * Nouveau numéro de téléphone
   * @optional
   */
  phone?: string;

  /**
   * Nouveau pays de résidence
   * @optional
   */
  country?: string;

  /**
   * Nouvelle langue préférée
   * @optional
   */
  preferredLanguage?: Language;

  /**
   * Nouvelle source d'acquisition
   * @optional
   */
  acquisitionSource?: AcquisitionSource;

  /**
   * Nouvelle acceptation marketing
   * @optional
   */
  marketingOptIn?: boolean;

  /**
   * Nouvelles notes internes
   * @optional
   */
  internalNotes?: string;
}

/**
 * Filtres pour rechercher des clients
 */
export interface CustomerFilters {
  /**
   * Recherche textuelle (nom, email, téléphone)
   * @optional
   */
  search?: string;

  /**
   * Filtrer par pays
   * @optional
   */
  country?: string;

  /**
   * Filtrer par langue préférée
   * @optional
   */
  preferredLanguage?: Language;

  /**
   * Filtrer par source d'acquisition
   * @optional
   */
  acquisitionSource?: AcquisitionSource;

  /**
   * Filtrer par acceptation marketing
   * @optional
   */
  marketingOptIn?: boolean;

  /**
   * Clients ayant réservé depuis cette date
   * @optional
   */
  lastBookingSince?: Date;

  /**
   * Clients n'ayant pas réservé depuis cette date
   * @optional
   */
  inactiveSince?: Date;
}

/**
 * Résumé client pour les listes
 */
export interface CustomerSummary {
  /**
   * Identifiant unique
   */
  id: string;

  /**
   * Nom complet
   */
  fullName: string;

  /**
   * Adresse email
   */
  email: string;

  /**
   * Pays de résidence
   */
  country: string;

  /**
   * Nombre total de réservations
   */
  totalBookings: number;

  /**
   * Montant total dépensé
   */
  totalSpent: number;

  /**
   * Dernière activité
   */
  lastActivity: Date | null;
}

/**
 * Statistiques client pour le tableau de bord
 */
export interface CustomerStats {
  /**
   * Nombre total de clients
   */
  totalCustomers: number;

  /**
   * Nouveaux clients ce mois
   */
  newThisMonth: number;

  /**
   * Clients ayant opté pour le marketing
   */
  marketingOptIns: number;

  /**
   * Répartition par pays
   */
  countryDistribution: Record<string, number>;

  /**
   * Répartition par source d'acquisition
   */
  acquisitionDistribution: Record<AcquisitionSource, number>;

  /**
   * Répartition par langue
   */
  languageDistribution: Record<Language, number>;
}

/**
 * Données de contact pour affichage
 */
export interface CustomerContactInfo {
  /**
   * Nom complet formaté
   */
  fullName: string;

  /**
   * Email
   */
  email: string;

  /**
   * Téléphone formaté
   */
  phone: string;

  /**
   * Pays avec drapeau emoji
   */
  countryDisplay: string;
}
