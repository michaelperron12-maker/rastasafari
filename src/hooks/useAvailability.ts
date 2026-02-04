'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

// Types
export interface TimeSlot {
  id: string;
  time: string;
  label: string;
  available: boolean;
  spotsLeft: number;
  totalSpots: number;
}

export interface DayAvailability {
  date: string; // ISO format YYYY-MM-DD
  isAvailable: boolean;
  slots: TimeSlot[];
  reason?: 'full' | 'closed' | 'past' | 'weather';
}

export interface AvailabilityState {
  data: DayAvailability | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: Date | null;
}

interface CacheEntry {
  data: DayAvailability;
  timestamp: number;
}

// Configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Format date to YYYY-MM-DD
const formatDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * useAvailability - Hook pour récupérer les disponibilités par date
 *
 * Fonctionnalités:
 * - Fetch des disponibilités pour une date donnée
 * - Cache des résultats (5 minutes)
 * - Gestion des états loading/error
 * - Rafraîchissement manuel
 */
export function useAvailability() {
  const [state, setState] = useState<AvailabilityState>({
    data: null,
    isLoading: false,
    error: null,
    lastFetched: null,
  });

  // Cache ref to persist between renders
  const cacheRef = useRef<Map<string, CacheEntry>>(new Map());

  // AbortController for cancelling requests
  const abortControllerRef = useRef<AbortController | null>(null);

  // Check if cache entry is valid
  const isCacheValid = useCallback((dateKey: string): boolean => {
    const entry = cacheRef.current.get(dateKey);
    if (!entry) return false;
    return Date.now() - entry.timestamp < CACHE_DURATION;
  }, []);

  // Get from cache
  const getFromCache = useCallback((dateKey: string): DayAvailability | null => {
    if (!isCacheValid(dateKey)) return null;
    return cacheRef.current.get(dateKey)?.data || null;
  }, [isCacheValid]);

  // Set to cache
  const setToCache = useCallback((dateKey: string, data: DayAvailability) => {
    cacheRef.current.set(dateKey, {
      data,
      timestamp: Date.now(),
    });
  }, []);

  // Clear cache for a specific date
  const clearCache = useCallback((date?: Date) => {
    if (date) {
      cacheRef.current.delete(formatDateKey(date));
    } else {
      cacheRef.current.clear();
    }
  }, []);

  // Fetch availability for a specific date
  const fetchAvailability = useCallback(async (date: Date, forceRefresh = false): Promise<DayAvailability | null> => {
    const dateKey = formatDateKey(date);

    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cached = getFromCache(dateKey);
      if (cached) {
        setState((prev) => ({
          ...prev,
          data: cached,
          isLoading: false,
          error: null,
          lastFetched: new Date(),
        }));
        return cached;
      }
    }

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetch(`${API_BASE_URL}/availability?date=${dateKey}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data: DayAvailability = await response.json();

      // Update cache
      setToCache(dateKey, data);

      setState({
        data,
        isLoading: false,
        error: null,
        lastFetched: new Date(),
      });

      return data;
    } catch (error) {
      // Ignore abort errors
      if (error instanceof Error && error.name === 'AbortError') {
        return null;
      }

      const errorMessage = error instanceof Error
        ? error.message
        : 'Erreur lors de la récupération des disponibilités';

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      return null;
    }
  }, [getFromCache, setToCache]);

  // Fetch availability for multiple dates (for calendar view)
  const fetchMonthAvailability = useCallback(async (year: number, month: number): Promise<Map<string, DayAvailability>> => {
    const results = new Map<string, DayAvailability>();

    // Get first and last day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetch(
        `${API_BASE_URL}/availability/month?year=${year}&month=${month + 1}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data: DayAvailability[] = await response.json();

      // Cache each day's availability
      data.forEach((dayData) => {
        setToCache(dayData.date, dayData);
        results.set(dayData.date, dayData);
      });

      setState((prev) => ({
        ...prev,
        isLoading: false,
        lastFetched: new Date(),
      }));

      return results;
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Erreur lors de la récupération des disponibilités du mois';

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      return results;
    }
  }, [setToCache]);

  // Check if a specific slot is available
  const isSlotAvailable = useCallback((date: Date, slotId: string): boolean => {
    const dateKey = formatDateKey(date);
    const cached = cacheRef.current.get(dateKey);
    if (!cached) return false;

    const slot = cached.data.slots.find((s) => s.id === slotId);
    return slot?.available ?? false;
  }, []);

  // Get available slots count for a date
  const getAvailableSlotsCount = useCallback((date: Date): number => {
    const dateKey = formatDateKey(date);
    const cached = cacheRef.current.get(dateKey);
    if (!cached) return 0;

    return cached.data.slots.filter((s) => s.available).length;
  }, []);

  // Cleanup on unmount
  useEffect((): (() => void) | void => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    // State
    ...state,

    // Actions
    fetchAvailability,
    fetchMonthAvailability,
    clearCache,

    // Utilities
    isSlotAvailable,
    getAvailableSlotsCount,
    isCacheValid,

    // Helpers
    formatDateKey,
  };
}

export type UseAvailabilityReturn = ReturnType<typeof useAvailability>;
