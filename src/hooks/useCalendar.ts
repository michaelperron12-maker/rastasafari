'use client';

import { useState, useCallback, useMemo } from 'react';

// Types
export interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  disabledReason?: 'past' | 'full' | 'closed' | 'unavailable';
}

export interface CalendarState {
  currentMonth: Date;
  selectedDate: Date | null;
}

export interface DisabledDates {
  past?: boolean;
  full?: string[]; // ISO date strings
  closed?: string[]; // ISO date strings
  unavailable?: string[]; // ISO date strings
  weekdays?: number[]; // 0 = Sunday, 6 = Saturday
  beforeDate?: Date;
  afterDate?: Date;
}

// Helpers
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

const formatDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const startOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const endOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

const getMonthName = (date: Date, locale = 'fr-FR'): string => {
  return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
};

/**
 * useCalendar - Hook pour la navigation et sélection de dates
 *
 * Fonctionnalités:
 * - Navigation par mois (précédent/suivant)
 * - Sélection de date
 * - Gestion des dates désactivées (passées, complètes, fermées)
 * - Génération des jours du calendrier
 */
export function useCalendar(initialDate?: Date, disabledDates: DisabledDates = { past: true }) {
  const [state, setState] = useState<CalendarState>({
    currentMonth: startOfMonth(initialDate || new Date()),
    selectedDate: null,
  });

  const today = useMemo(() => new Date(), []);

  // Check if a date is disabled
  const isDateDisabled = useCallback((date: Date): { disabled: boolean; reason?: CalendarDay['disabledReason'] } => {
    const dateKey = formatDateKey(date);

    // Check if in the past
    if (disabledDates.past) {
      const todayStart = new Date(today);
      todayStart.setHours(0, 0, 0, 0);
      if (date < todayStart) {
        return { disabled: true, reason: 'past' };
      }
    }

    // Check before/after date limits
    if (disabledDates.beforeDate && date < disabledDates.beforeDate) {
      return { disabled: true, reason: 'unavailable' };
    }
    if (disabledDates.afterDate && date > disabledDates.afterDate) {
      return { disabled: true, reason: 'unavailable' };
    }

    // Check disabled weekdays
    if (disabledDates.weekdays?.includes(date.getDay())) {
      return { disabled: true, reason: 'closed' };
    }

    // Check if full
    if (disabledDates.full?.includes(dateKey)) {
      return { disabled: true, reason: 'full' };
    }

    // Check if closed
    if (disabledDates.closed?.includes(dateKey)) {
      return { disabled: true, reason: 'closed' };
    }

    // Check if unavailable
    if (disabledDates.unavailable?.includes(dateKey)) {
      return { disabled: true, reason: 'unavailable' };
    }

    return { disabled: false };
  }, [disabledDates, today]);

  // Generate calendar days for the current month
  const calendarDays = useMemo((): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const monthStart = startOfMonth(state.currentMonth);
    const monthEnd = endOfMonth(state.currentMonth);

    // Get the first day to display (might be from previous month)
    const startDate = new Date(monthStart);
    const dayOfWeek = startDate.getDay();
    // Adjust for Monday start (0 = Monday in our case)
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startDate.setDate(startDate.getDate() - daysToSubtract);

    // Generate 6 weeks (42 days) to ensure consistent calendar height
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const { disabled, reason } = isDateDisabled(date);

      days.push({
        date: new Date(date),
        dayOfMonth: date.getDate(),
        isCurrentMonth: isSameMonth(date, state.currentMonth),
        isToday: isSameDay(date, today),
        isSelected: state.selectedDate ? isSameDay(date, state.selectedDate) : false,
        isDisabled: disabled,
        disabledReason: reason,
      });
    }

    return days;
  }, [state.currentMonth, state.selectedDate, today, isDateDisabled]);

  // Navigate to previous month
  const previousMonth = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentMonth: addMonths(prev.currentMonth, -1),
    }));
  }, []);

  // Navigate to next month
  const nextMonth = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentMonth: addMonths(prev.currentMonth, 1),
    }));
  }, []);

  // Go to a specific month
  const goToMonth = useCallback((date: Date) => {
    setState((prev) => ({
      ...prev,
      currentMonth: startOfMonth(date),
    }));
  }, []);

  // Go to today
  const goToToday = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentMonth: startOfMonth(new Date()),
    }));
  }, []);

  // Select a date
  const selectDate = useCallback((date: Date | null) => {
    if (date) {
      const { disabled } = isDateDisabled(date);
      if (disabled) {
        console.warn('Cannot select disabled date');
        return;
      }
    }

    setState((prev) => ({
      ...prev,
      selectedDate: date,
      // Navigate to the selected date's month if different
      currentMonth: date ? startOfMonth(date) : prev.currentMonth,
    }));
  }, [isDateDisabled]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedDate: null,
    }));
  }, []);

  // Check if can navigate to previous month
  const canGoPrevious = useMemo(() => {
    if (!disabledDates.beforeDate) return true;
    const prevMonth = addMonths(state.currentMonth, -1);
    return endOfMonth(prevMonth) >= disabledDates.beforeDate;
  }, [state.currentMonth, disabledDates.beforeDate]);

  // Check if can navigate to next month
  const canGoNext = useMemo(() => {
    if (!disabledDates.afterDate) return true;
    const nextMonthStart = addMonths(state.currentMonth, 1);
    return nextMonthStart <= disabledDates.afterDate;
  }, [state.currentMonth, disabledDates.afterDate]);

  // Get month label
  const monthLabel = useMemo(() => {
    return getMonthName(state.currentMonth);
  }, [state.currentMonth]);

  // Get weekday headers
  const weekdayHeaders = useMemo(() => {
    return ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  }, []);

  // Get weeks array for rendering
  const weeks = useMemo(() => {
    const result: CalendarDay[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      result.push(calendarDays.slice(i, i + 7));
    }
    return result;
  }, [calendarDays]);

  return {
    // State
    currentMonth: state.currentMonth,
    selectedDate: state.selectedDate,

    // Computed
    calendarDays,
    weeks,
    monthLabel,
    weekdayHeaders,
    canGoPrevious,
    canGoNext,

    // Actions
    previousMonth,
    nextMonth,
    goToMonth,
    goToToday,
    selectDate,
    clearSelection,

    // Utilities
    isDateDisabled,
    formatDateKey,
  };
}

export type UseCalendarReturn = ReturnType<typeof useCalendar>;
