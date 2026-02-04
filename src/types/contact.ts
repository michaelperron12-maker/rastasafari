/**
 * @fileoverview Types de contact pour Rastasafari Experience
 * @description Définit tous les types liés aux formulaires de contact et demandes
 */

/**
 * Sujet de la demande de contact
 */
export type ContactSubject =
  | 'booking-inquiry'
  | 'group-booking'
  | 'modification'
  | 'cancellation'
  | 'feedback'
  | 'partnership'
  | 'press'
  | 'other';

/**
 * Statut de la demande de contact
 */
export type ContactStatus = 'new' | 'in-progress' | 'resolved' | 'spam';

/**
 * Priorité de la demande
 */
export type ContactPriority = 'low' | 'normal' | 'high' | 'urgent';

/**
 * Libellés des sujets de contact
 */
export const CONTACT_SUBJECT_LABELS: Record<ContactSubject, string> = {
  'booking-inquiry': 'Question sur une r\u00e9servation',
  'group-booking': 'R\u00e9servation de groupe',
  modification: 'Modification de r\u00e9servation',
  cancellation: 'Annulation',
  feedback: 'Commentaire / Suggestion',
  partnership: 'Partenariat',
  press: 'Presse / M\u00e9dias',
  other: 'Autre',
};

/**
 * Libellés des statuts de contact
 */
export const CONTACT_STATUS_LABELS: Record<ContactStatus, string> = {
  new: 'Nouveau',
  'in-progress': 'En cours',
  resolved: 'R\u00e9solu',
  spam: 'Spam',
};

/**
 * Libellés des priorités
 */
export const CONTACT_PRIORITY_LABELS: Record<ContactPriority, string> = {
  low: 'Basse',
  normal: 'Normale',
  high: '\u00c9lev\u00e9e',
  urgent: 'Urgente',
};

/**
 * Interface principale de demande de contact
 * @description Représente une demande de contact complète
 */
export interface ContactRequest {
  /**
   * Identifiant unique de la demande (UUID)
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;

  /**
   * Numéro de ticket lisible
   * @example "TKT-2024-001234"
   */
  ticketNumber: string;

  /**
   * Prénom du demandeur
   */
  firstName: string;

  /**
   * Nom de famille du demandeur
   */
  lastName: string;

  /**
   * Adresse email
   * @format email
   */
  email: string;

  /**
   * Numéro de téléphone
   * @optional
   */
  phone?: string;

  /**
   * Sujet de la demande
   */
  subject: ContactSubject;

  /**
   * Numéro de réservation concerné
   * @optional
   */
  bookingNumber?: string;

  /**
   * Message du demandeur
   */
  message: string;

  /**
   * Fichiers joints
   * @optional
   */
  attachments?: ContactAttachment[];

  /**
   * Statut de la demande
   * @default "new"
   */
  status: ContactStatus;

  /**
   * Priorité de la demande
   * @default "normal"
   */
  priority: ContactPriority;

  /**
   * Agent assigné
   * @optional
   */
  assignedTo?: string;

  /**
   * Historique des réponses
   * @optional
   */
  responses?: ContactResponse[];

  /**
   * Notes internes
   * @optional
   */
  internalNotes?: string;

  /**
   * Tags pour catégorisation
   * @optional
   */
  tags?: string[];

  /**
   * Adresse IP du demandeur (pour anti-spam)
   * @optional
   */
  ipAddress?: string;

  /**
   * User-agent du navigateur
   * @optional
   */
  userAgent?: string;

  /**
   * Langue préférée pour la réponse
   * @default "en"
   */
  preferredLanguage: string;

  /**
   * Date de création
   */
  createdAt: Date;

  /**
   * Date de dernière mise à jour
   */
  updatedAt: Date;

  /**
   * Date de résolution
   * @optional
   */
  resolvedAt?: Date;
}

/**
 * Fichier joint à une demande de contact
 */
export interface ContactAttachment {
  /**
   * Identifiant du fichier
   */
  id: string;

  /**
   * Nom du fichier original
   */
  fileName: string;

  /**
   * Type MIME
   * @example "image/jpeg"
   */
  mimeType: string;

  /**
   * Taille en octets
   */
  size: number;

  /**
   * URL de téléchargement
   */
  url: string;

  /**
   * Date d'upload
   */
  uploadedAt: Date;
}

/**
 * Réponse à une demande de contact
 */
export interface ContactResponse {
  /**
   * Identifiant de la réponse
   */
  id: string;

  /**
   * Contenu de la réponse
   */
  content: string;

  /**
   * Nom de l'agent
   */
  agentName: string;

  /**
   * Est une réponse interne (non visible par le client)
   * @default false
   */
  isInternal: boolean;

  /**
   * Fichiers joints à la réponse
   * @optional
   */
  attachments?: ContactAttachment[];

  /**
   * Date de la réponse
   */
  createdAt: Date;
}

/**
 * Données pour créer une demande de contact
 */
export interface CreateContactData {
  /**
   * Prénom
   */
  firstName: string;

  /**
   * Nom de famille
   */
  lastName: string;

  /**
   * Email
   * @format email
   */
  email: string;

  /**
   * Téléphone
   * @optional
   */
  phone?: string;

  /**
   * Sujet
   */
  subject: ContactSubject;

  /**
   * Numéro de réservation
   * @optional
   */
  bookingNumber?: string;

  /**
   * Message
   */
  message: string;

  /**
   * Langue préférée
   * @default "en"
   */
  preferredLanguage?: string;

  /**
   * Acceptation du traitement des données
   */
  privacyAccepted: boolean;
}

/**
 * Données pour mettre à jour une demande de contact
 */
export interface UpdateContactData {
  /**
   * Nouveau statut
   * @optional
   */
  status?: ContactStatus;

  /**
   * Nouvelle priorité
   * @optional
   */
  priority?: ContactPriority;

  /**
   * Nouvel agent assigné
   * @optional
   */
  assignedTo?: string;

  /**
   * Nouvelles notes internes
   * @optional
   */
  internalNotes?: string;

  /**
   * Nouveaux tags
   * @optional
   */
  tags?: string[];
}

/**
 * Données pour ajouter une réponse
 */
export interface CreateContactResponseData {
  /**
   * Contenu de la réponse
   */
  content: string;

  /**
   * Nom de l'agent
   */
  agentName: string;

  /**
   * Réponse interne
   * @default false
   */
  isInternal?: boolean;
}

/**
 * Filtres pour rechercher des demandes de contact
 */
export interface ContactFilters {
  /**
   * Filtrer par statut
   * @optional
   */
  status?: ContactStatus;

  /**
   * Filtrer par priorité
   * @optional
   */
  priority?: ContactPriority;

  /**
   * Filtrer par sujet
   * @optional
   */
  subject?: ContactSubject;

  /**
   * Filtrer par agent assigné
   * @optional
   */
  assignedTo?: string;

  /**
   * Non assignées uniquement
   * @optional
   */
  unassignedOnly?: boolean;

  /**
   * Recherche textuelle
   * @optional
   */
  search?: string;

  /**
   * Date de création depuis
   * @optional
   */
  createdFrom?: Date;

  /**
   * Date de création jusqu'à
   * @optional
   */
  createdTo?: Date;

  /**
   * Filtrer par tags
   * @optional
   */
  tags?: string[];
}

/**
 * Résumé de demande pour les listes
 */
export interface ContactSummary {
  /**
   * Identifiant
   */
  id: string;

  /**
   * Numéro de ticket
   */
  ticketNumber: string;

  /**
   * Nom complet du demandeur
   */
  customerName: string;

  /**
   * Email
   */
  email: string;

  /**
   * Sujet
   */
  subject: ContactSubject;

  /**
   * Statut
   */
  status: ContactStatus;

  /**
   * Priorité
   */
  priority: ContactPriority;

  /**
   * Agent assigné
   */
  assignedTo?: string;

  /**
   * Nombre de réponses
   */
  responseCount: number;

  /**
   * Date de création
   */
  createdAt: Date;

  /**
   * Dernière activité
   */
  lastActivityAt: Date;
}

/**
 * Statistiques des demandes de contact
 */
export interface ContactStats {
  /**
   * Total des demandes
   */
  total: number;

  /**
   * Répartition par statut
   */
  byStatus: Record<ContactStatus, number>;

  /**
   * Répartition par priorité
   */
  byPriority: Record<ContactPriority, number>;

  /**
   * Répartition par sujet
   */
  bySubject: Record<ContactSubject, number>;

  /**
   * Temps moyen de première réponse (en heures)
   */
  avgFirstResponseTime: number;

  /**
   * Temps moyen de résolution (en heures)
   */
  avgResolutionTime: number;

  /**
   * Demandes non assignées
   */
  unassignedCount: number;

  /**
   * Nouvelles demandes aujourd'hui
   */
  newToday: number;

  /**
   * Résolues aujourd'hui
   */
  resolvedToday: number;
}

/**
 * Informations de l'entreprise pour la page contact
 */
export interface CompanyContactInfo {
  /**
   * Adresse postale
   */
  address: {
    street: string;
    city: string;
    parish: string;
    country: string;
    postalCode?: string;
  };

  /**
   * Numéro de téléphone principal
   */
  phone: string;

  /**
   * Numéro WhatsApp
   */
  whatsapp: string;

  /**
   * Email principal
   */
  email: string;

  /**
   * Email pour les réservations
   */
  bookingEmail: string;

  /**
   * Heures d'ouverture
   */
  businessHours: {
    weekdays: string;
    weekends: string;
    holidays: string;
  };

  /**
   * Réseaux sociaux
   */
  socialMedia: {
    facebook?: string;
    instagram?: string;
    tripadvisor?: string;
    youtube?: string;
  };

  /**
   * Coordonnées GPS du bureau
   */
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

/**
 * Formulaire de newsletter
 */
export interface NewsletterSubscription {
  /**
   * Adresse email
   * @format email
   */
  email: string;

  /**
   * Prénom
   * @optional
   */
  firstName?: string;

  /**
   * Langue préférée
   * @default "en"
   */
  preferredLanguage: string;

  /**
   * Source de l'inscription
   */
  source: 'website' | 'booking' | 'contact';

  /**
   * Date d'inscription
   */
  subscribedAt: Date;

  /**
   * Actif
   * @default true
   */
  isActive: boolean;
}
