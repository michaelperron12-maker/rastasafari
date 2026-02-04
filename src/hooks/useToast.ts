'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

// Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastOptions {
  title: string;
  message?: string;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface UseToastOptions {
  maxToasts?: number;
  defaultDuration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

// Constants
const DEFAULT_DURATION = 5000; // 5 seconds
const MAX_TOASTS = 5;

// Generate unique ID
const generateId = (): string => {
  return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * useToast - Hook pour les notifications toast
 *
 * Fonctionnalités:
 * - Types: success, error, warning, info
 * - Auto-dismiss configurable
 * - Actions personnalisées
 * - Limite du nombre de toasts affichés
 */
export function useToast(options: UseToastOptions = {}) {
  const {
    maxToasts = MAX_TOASTS,
    defaultDuration = DEFAULT_DURATION,
    position = 'top-right',
  } = options;

  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Clear timeout for a specific toast
  const clearToastTimeout = useCallback((id: string) => {
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
  }, []);

  // Dismiss a toast
  const dismiss = useCallback((id: string) => {
    clearToastTimeout(id);
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, [clearToastTimeout]);

  // Dismiss all toasts
  const dismissAll = useCallback(() => {
    timeoutsRef.current.forEach((_, id) => clearToastTimeout(id));
    setToasts([]);
  }, [clearToastTimeout]);

  // Add a toast
  const addToast = useCallback((type: ToastType, toastOptions: ToastOptions): string => {
    const id = generateId();
    const duration = toastOptions.duration ?? defaultDuration;

    const newToast: Toast = {
      id,
      type,
      title: toastOptions.title,
      message: toastOptions.message,
      duration,
      dismissible: toastOptions.dismissible ?? true,
      action: toastOptions.action,
    };

    setToasts((prev) => {
      // Remove oldest toasts if we're at max capacity
      const updated = [...prev, newToast];
      if (updated.length > maxToasts) {
        const toRemove = updated.slice(0, updated.length - maxToasts);
        toRemove.forEach((t) => clearToastTimeout(t.id));
        return updated.slice(-maxToasts);
      }
      return updated;
    });

    // Set auto-dismiss timeout if duration > 0
    if (duration > 0) {
      const timeout = setTimeout(() => {
        dismiss(id);
      }, duration);
      timeoutsRef.current.set(id, timeout);
    }

    return id;
  }, [defaultDuration, maxToasts, dismiss, clearToastTimeout]);

  // Convenience methods for different toast types
  const success = useCallback((options: ToastOptions | string) => {
    const opts = typeof options === 'string' ? { title: options } : options;
    return addToast('success', opts);
  }, [addToast]);

  const error = useCallback((options: ToastOptions | string) => {
    const opts = typeof options === 'string' ? { title: options } : options;
    // Errors stay longer by default
    return addToast('error', { duration: defaultDuration * 1.5, ...opts });
  }, [addToast, defaultDuration]);

  const warning = useCallback((options: ToastOptions | string) => {
    const opts = typeof options === 'string' ? { title: options } : options;
    return addToast('warning', opts);
  }, [addToast]);

  const info = useCallback((options: ToastOptions | string) => {
    const opts = typeof options === 'string' ? { title: options } : options;
    return addToast('info', opts);
  }, [addToast]);

  // Promise-based toast (for async operations)
  const promise = useCallback(async <T,>(
    promiseFn: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: Error) => string);
    }
  ): Promise<T> => {
    const loadingId = addToast('info', {
      title: messages.loading,
      duration: 0, // Don't auto-dismiss
      dismissible: false,
    });

    try {
      const result = await promiseFn;
      dismiss(loadingId);

      const successMessage = typeof messages.success === 'function'
        ? messages.success(result)
        : messages.success;
      success(successMessage);

      return result;
    } catch (err) {
      dismiss(loadingId);

      const errorMessage = typeof messages.error === 'function'
        ? messages.error(err as Error)
        : messages.error;
      error(errorMessage);

      throw err;
    }
  }, [addToast, dismiss, success, error]);

  // Pause auto-dismiss (e.g., on hover)
  const pause = useCallback((id: string) => {
    clearToastTimeout(id);
  }, [clearToastTimeout]);

  // Resume auto-dismiss
  const resume = useCallback((id: string, remainingTime?: number) => {
    const toast = toasts.find((t) => t.id === id);
    if (!toast || !toast.duration || toast.duration <= 0) return;

    const duration = remainingTime ?? toast.duration;
    const timeout = setTimeout(() => {
      dismiss(id);
    }, duration);
    timeoutsRef.current.set(id, timeout);
  }, [toasts, dismiss]);

  // Update a toast
  const update = useCallback((id: string, updates: Partial<Omit<Toast, 'id'>>) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, ...updates } : toast
      )
    );
  }, []);

  // Cleanup on unmount
  useEffect((): (() => void) | void => {
    return () => {
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current.clear();
    };
  }, []);

  // Get icon for toast type
  const getToastIcon = useCallback((type: ToastType): string => {
    const icons: Record<ToastType, string> = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };
    return icons[type];
  }, []);

  // Get color classes for toast type
  const getToastColors = useCallback((type: ToastType) => {
    const colors: Record<ToastType, { bg: string; text: string; icon: string }> = {
      success: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'text-green-800 dark:text-green-200',
        icon: 'text-green-500',
      },
      error: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-800 dark:text-red-200',
        icon: 'text-red-500',
      },
      warning: {
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        text: 'text-yellow-800 dark:text-yellow-200',
        icon: 'text-yellow-500',
      },
      info: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-800 dark:text-blue-200',
        icon: 'text-blue-500',
      },
    };
    return colors[type];
  }, []);

  return {
    // State
    toasts,
    position,

    // Actions
    success,
    error,
    warning,
    info,
    promise,
    dismiss,
    dismissAll,
    pause,
    resume,
    update,

    // Utilities
    getToastIcon,
    getToastColors,
  };
}

export type UseToastReturn = ReturnType<typeof useToast>;
