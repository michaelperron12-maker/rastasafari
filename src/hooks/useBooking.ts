'use client';

import { useState, useCallback, useMemo } from 'react';

// Types
export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  isMainContact?: boolean;
}

export interface BookingSession {
  id: string;
  time: string;
  label: string;
  available: boolean;
  spotsLeft: number;
}

export interface PickupLocation {
  id: string;
  name: string;
  address: string;
  additionalCost?: number;
}

export interface BookingState {
  date: Date | null;
  session: BookingSession | null;
  participants: Participant[];
  pickup: PickupLocation | null;
  specialRequests: string;
  agreedToTerms: boolean;
}

export interface BookingValidation {
  isValid: boolean;
  errors: {
    date?: string;
    session?: string;
    participants?: string;
    pickup?: string;
    terms?: string;
  };
}

// Constants
const PRICE_PER_PERSON = 165;
const MIN_PARTICIPANTS = 1;
const MAX_PARTICIPANTS = 12;

// Generate unique ID
const generateId = (): string => {
  return `participant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Initial state
const initialState: BookingState = {
  date: null,
  session: null,
  participants: [],
  pickup: null,
  specialRequests: '',
  agreedToTerms: false,
};

/**
 * useBooking - Hook personnalisé pour gérer l'état de réservation Rastasafari
 *
 * Fonctionnalités:
 * - Gestion de la date et session sélectionnées
 * - Gestion des participants (ajout/suppression)
 * - Calcul automatique du total ($165 x participants)
 * - Validation complète du formulaire
 */
export function useBooking(initialBooking?: Partial<BookingState>) {
  const [booking, setBooking] = useState<BookingState>({
    ...initialState,
    ...initialBooking,
  });

  // Sélectionner une date
  const setDate = useCallback((date: Date | null) => {
    setBooking((prev) => ({
      ...prev,
      date,
      // Reset session when date changes
      session: null,
    }));
  }, []);

  // Sélectionner une session
  const setSession = useCallback((session: BookingSession | null) => {
    setBooking((prev) => ({
      ...prev,
      session,
    }));
  }, []);

  // Ajouter un participant
  const addParticipant = useCallback((participant: Omit<Participant, 'id'>) => {
    setBooking((prev) => {
      if (prev.participants.length >= MAX_PARTICIPANTS) {
        console.warn(`Maximum ${MAX_PARTICIPANTS} participants allowed`);
        return prev;
      }

      const newParticipant: Participant = {
        ...participant,
        id: generateId(),
        isMainContact: prev.participants.length === 0 ? true : participant.isMainContact,
      };

      return {
        ...prev,
        participants: [...prev.participants, newParticipant],
      };
    });
  }, []);

  // Supprimer un participant
  const removeParticipant = useCallback((participantId: string) => {
    setBooking((prev) => {
      const filtered = prev.participants.filter((p) => p.id !== participantId);

      // If we removed the main contact, make the first remaining participant the main contact
      if (filtered.length > 0 && !filtered.some((p) => p.isMainContact)) {
        filtered[0].isMainContact = true;
      }

      return {
        ...prev,
        participants: filtered,
      };
    });
  }, []);

  // Mettre à jour un participant
  const updateParticipant = useCallback((participantId: string, updates: Partial<Participant>) => {
    setBooking((prev) => ({
      ...prev,
      participants: prev.participants.map((p) =>
        p.id === participantId ? { ...p, ...updates } : p
      ),
    }));
  }, []);

  // Définir le contact principal
  const setMainContact = useCallback((participantId: string) => {
    setBooking((prev) => ({
      ...prev,
      participants: prev.participants.map((p) => ({
        ...p,
        isMainContact: p.id === participantId,
      })),
    }));
  }, []);

  // Sélectionner le lieu de pickup
  const setPickup = useCallback((pickup: PickupLocation | null) => {
    setBooking((prev) => ({
      ...prev,
      pickup,
    }));
  }, []);

  // Mettre à jour les demandes spéciales
  const setSpecialRequests = useCallback((specialRequests: string) => {
    setBooking((prev) => ({
      ...prev,
      specialRequests,
    }));
  }, []);

  // Accepter les conditions
  const setAgreedToTerms = useCallback((agreedToTerms: boolean) => {
    setBooking((prev) => ({
      ...prev,
      agreedToTerms,
    }));
  }, []);

  // Réinitialiser la réservation
  const resetBooking = useCallback(() => {
    setBooking(initialState);
  }, []);

  // Calcul du total
  const totals = useMemo(() => {
    const participantCount = booking.participants.length;
    const subtotal = participantCount * PRICE_PER_PERSON;
    const pickupCost = booking.pickup?.additionalCost || 0;
    const total = subtotal + pickupCost;

    return {
      participantCount,
      pricePerPerson: PRICE_PER_PERSON,
      subtotal,
      pickupCost,
      total,
      formattedSubtotal: `$${subtotal.toFixed(2)}`,
      formattedPickupCost: `$${pickupCost.toFixed(2)}`,
      formattedTotal: `$${total.toFixed(2)}`,
    };
  }, [booking.participants.length, booking.pickup?.additionalCost]);

  // Validation
  const validation = useMemo((): BookingValidation => {
    const errors: BookingValidation['errors'] = {};

    // Validate date
    if (!booking.date) {
      errors.date = 'Veuillez sélectionner une date';
    } else if (booking.date < new Date(new Date().setHours(0, 0, 0, 0))) {
      errors.date = 'La date sélectionnée est passée';
    }

    // Validate session
    if (!booking.session) {
      errors.session = 'Veuillez sélectionner une session';
    } else if (!booking.session.available) {
      errors.session = 'Cette session n\'est plus disponible';
    }

    // Validate participants
    if (booking.participants.length < MIN_PARTICIPANTS) {
      errors.participants = `Minimum ${MIN_PARTICIPANTS} participant requis`;
    } else if (booking.participants.length > MAX_PARTICIPANTS) {
      errors.participants = `Maximum ${MAX_PARTICIPANTS} participants autorisés`;
    } else {
      // Check if all participants have required fields
      const hasInvalidParticipant = booking.participants.some(
        (p) => !p.firstName?.trim() || !p.lastName?.trim()
      );
      if (hasInvalidParticipant) {
        errors.participants = 'Tous les participants doivent avoir un nom et prénom';
      }

      // Check if main contact has email
      const mainContact = booking.participants.find((p) => p.isMainContact);
      if (mainContact && !mainContact.email?.trim()) {
        errors.participants = 'Le contact principal doit avoir un email';
      }
    }

    // Validate pickup
    if (!booking.pickup) {
      errors.pickup = 'Veuillez sélectionner un lieu de pickup';
    }

    // Validate terms
    if (!booking.agreedToTerms) {
      errors.terms = 'Vous devez accepter les conditions générales';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }, [booking]);

  // Check if session has enough spots
  const hasEnoughSpots = useMemo(() => {
    if (!booking.session) return true;
    return booking.session.spotsLeft >= booking.participants.length;
  }, [booking.session, booking.participants.length]);

  // Get main contact
  const mainContact = useMemo(() => {
    return booking.participants.find((p) => p.isMainContact) || null;
  }, [booking.participants]);

  return {
    // State
    booking,

    // Actions
    setDate,
    setSession,
    addParticipant,
    removeParticipant,
    updateParticipant,
    setMainContact,
    setPickup,
    setSpecialRequests,
    setAgreedToTerms,
    resetBooking,

    // Computed
    totals,
    validation,
    hasEnoughSpots,
    mainContact,

    // Constants
    PRICE_PER_PERSON,
    MIN_PARTICIPANTS,
    MAX_PARTICIPANTS,
  };
}

export type UseBookingReturn = ReturnType<typeof useBooking>;
