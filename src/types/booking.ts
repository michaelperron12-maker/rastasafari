/**
 * @fileoverview Types de réservation pour Rastasafari Experience
 * @description Définit tous les types liés aux réservations de tours
 */

import type { Customer } from './customer';

/**
 * Sessions disponibles pour les tours
 * @description Créneaux horaires proposés pour les excursions
 */
export type Session = '09:00' | '12:00' | '14:30';

/**
 * Statut de la réservation
 * @description État actuel de la réservation dans le système
 */
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

/**
 * Statut du paiement
 * @description État du paiement associé à la réservation
 */
export type PaymentStatus = 'pending' | 'paid' | 'refunded';

/**
 * Points de prise en charge disponibles
 * @description Lieux où les clients peuvent être récupérés
 */
export type PickupLocation = 'montego-bay' | 'negril' | 'grand-palladium' | 'other';

/**
 * Libellés des sessions pour affichage
 */
export const SESSION_LABELS: Record<Session, string> = {
  '09:00': 'Matin - 09:00',
  '12:00': 'Midi - 12:00',
  '14:30': 'Après-midi - 14:30',
};

/**
 * Libellés des statuts de réservation
 */
export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
};

/**
 * Libellés des statuts de paiement
 */
export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: 'En attente',
  paid: 'Payé',
  refunded: 'Remboursé',
};

/**
 * Libellés des points de prise en charge
 */
export const PICKUP_LOCATION_LABELS: Record<PickupLocation, string> = {
  'montego-bay': 'Montego Bay',
  negril: 'Negril',
  'grand-palladium': 'Grand Palladium Resort',
  other: 'Autre (préciser)',
};

/**
 * Interface principale de réservation
 * @description Représente une réservation complète dans le système
 */
export interface Booking {
  /**
   * Identifiant unique de la réservation (UUID)
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;

  /**
   * Numéro de réservation lisible par l'utilisateur
   * @example "RSF-2024-001234"
   */
  bookingNumber: string;

  /**
   * Date du tour
   */
  date: Date;

  /**
   * Créneau horaire sélectionné
   */
  session: Session;

  /**
   * Nombre d'adultes (13 ans et plus)
   * @minimum 1
   */
  adults: number;

  /**
   * Nombre d'enfants (3-12 ans)
   * @minimum 0
   */
  children: number;

  /**
   * Montant total en USD
   * @minimum 0
   */
  totalAmount: number;

  /**
   * Point de prise en charge sélectionné
   */
  pickupLocation: PickupLocation;

  /**
   * Adresse complète de l'hôtel ou du lieu de prise en charge
   * @example "Sandals Montego Bay, Kent Avenue"
   */
  hotelAddress: string;

  /**
   * Statut actuel de la réservation
   */
  status: BookingStatus;

  /**
   * Statut du paiement
   */
  paymentStatus: PaymentStatus;

  /**
   * Informations du client
   */
  customer: Customer;

  /**
   * Notes spéciales ou demandes particulières
   * @optional
   */
  specialRequests?: string;

  /**
   * Date de création de la réservation
   */
  createdAt: Date;

  /**
   * Date de dernière modification
   */
  updatedAt: Date;
}

/**
 * Données pour créer une nouvelle réservation
 * @description Sous-ensemble des champs requis pour initier une réservation
 */
export interface CreateBookingData {
  /**
   * Date du tour souhaitée
   */
  date: Date;

  /**
   * Créneau horaire sélectionné
   */
  session: Session;

  /**
   * Nombre d'adultes
   * @minimum 1
   */
  adults: number;

  /**
   * Nombre d'enfants
   * @minimum 0
   */
  children: number;

  /**
   * Point de prise en charge
   */
  pickupLocation: PickupLocation;

  /**
   * Adresse de l'hôtel
   */
  hotelAddress: string;

  /**
   * Informations du client
   */
  customer: Omit<Customer, 'id' | 'createdAt'>;

  /**
   * Notes spéciales
   * @optional
   */
  specialRequests?: string;
}

/**
 * Données pour mettre à jour une réservation existante
 */
export interface UpdateBookingData {
  /**
   * Nouvelle date du tour
   * @optional
   */
  date?: Date;

  /**
   * Nouveau créneau horaire
   * @optional
   */
  session?: Session;

  /**
   * Nouveau nombre d'adultes
   * @optional
   */
  adults?: number;

  /**
   * Nouveau nombre d'enfants
   * @optional
   */
  children?: number;

  /**
   * Nouveau point de prise en charge
   * @optional
   */
  pickupLocation?: PickupLocation;

  /**
   * Nouvelle adresse d'hôtel
   * @optional
   */
  hotelAddress?: string;

  /**
   * Nouveau statut de réservation
   * @optional
   */
  status?: BookingStatus;

  /**
   * Nouveau statut de paiement
   * @optional
   */
  paymentStatus?: PaymentStatus;

  /**
   * Nouvelles notes spéciales
   * @optional
   */
  specialRequests?: string;
}

/**
 * Filtres pour rechercher des réservations
 */
export interface BookingFilters {
  /**
   * Filtrer par statut
   * @optional
   */
  status?: BookingStatus;

  /**
   * Filtrer par statut de paiement
   * @optional
   */
  paymentStatus?: PaymentStatus;

  /**
   * Filtrer par date de début (incluse)
   * @optional
   */
  dateFrom?: Date;

  /**
   * Filtrer par date de fin (incluse)
   * @optional
   */
  dateTo?: Date;

  /**
   * Filtrer par session
   * @optional
   */
  session?: Session;

  /**
   * Filtrer par point de prise en charge
   * @optional
   */
  pickupLocation?: PickupLocation;

  /**
   * Recherche textuelle (numéro de réservation, nom client, email)
   * @optional
   */
  search?: string;
}

/**
 * Résumé de réservation pour les listes
 */
export interface BookingSummary {
  /**
   * Identifiant unique
   */
  id: string;

  /**
   * Numéro de réservation
   */
  bookingNumber: string;

  /**
   * Date du tour
   */
  date: Date;

  /**
   * Créneau horaire
   */
  session: Session;

  /**
   * Nombre total de participants
   */
  totalParticipants: number;

  /**
   * Montant total
   */
  totalAmount: number;

  /**
   * Nom du client
   */
  customerName: string;

  /**
   * Statut de la réservation
   */
  status: BookingStatus;

  /**
   * Statut du paiement
   */
  paymentStatus: PaymentStatus;
}

/**
 * Disponibilité d'une session pour une date donnée
 */
export interface SessionAvailability {
  /**
   * Session concernée
   */
  session: Session;

  /**
   * Nombre de places disponibles
   */
  availableSpots: number;

  /**
   * Capacité totale de la session
   */
  totalCapacity: number;

  /**
   * Indique si la session est complète
   */
  isFull: boolean;
}

/**
 * Disponibilité pour une date complète
 */
export interface DateAvailability {
  /**
   * Date concernée
   */
  date: Date;

  /**
   * Disponibilité par session
   */
  sessions: SessionAvailability[];

  /**
   * Indique si la date est complètement indisponible
   */
  isFullyBooked: boolean;
}
