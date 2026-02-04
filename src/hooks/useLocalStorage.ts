'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

// Types
export interface UseLocalStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: Error) => void;
  syncTabs?: boolean;
}

/**
 * useLocalStorage - Hook pour la persistance localStorage
 *
 * Fonctionnalités:
 * - Persistance automatique des données
 * - Hydratation côté client (SSR-safe)
 * - Synchronisation entre onglets
 * - Sérialisation/désérialisation personnalisable
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
) {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    onError,
    syncTabs = true,
  } = options;

  // Track if we've hydrated from localStorage
  const [isHydrated, setIsHydrated] = useState(false);

  // Store initial value ref to avoid stale closures
  const initialValueRef = useRef(initialValue);

  // Initialize state with initial value (will be updated after hydration)
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Read from localStorage
  const readFromStorage = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValueRef.current;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValueRef.current;
      }
      return deserializer(item);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      onError?.(err);
      console.warn(`Error reading localStorage key "${key}":`, err);
      return initialValueRef.current;
    }
  }, [key, deserializer, onError]);

  // Write to localStorage
  const writeToStorage = useCallback((value: T): boolean => {
    if (typeof window === 'undefined') {
      return false;
    }

    try {
      const serialized = serializer(value);
      window.localStorage.setItem(key, serialized);

      // Dispatch custom event for same-tab synchronization
      window.dispatchEvent(new StorageEvent('storage', {
        key,
        newValue: serialized,
        storageArea: localStorage,
      }));

      return true;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      onError?.(err);
      console.warn(`Error writing localStorage key "${key}":`, err);
      return false;
    }
  }, [key, serializer, onError]);

  // Set value (updates both state and localStorage)
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const newValue = value instanceof Function ? value(prev) : value;
      writeToStorage(newValue);
      return newValue;
    });
  }, [writeToStorage]);

  // Remove from localStorage
  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValueRef.current);

      // Dispatch storage event
      window.dispatchEvent(new StorageEvent('storage', {
        key,
        newValue: null,
        storageArea: localStorage,
      }));
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      onError?.(err);
      console.warn(`Error removing localStorage key "${key}":`, err);
    }
  }, [key, onError]);

  // Hydrate from localStorage on mount
  useEffect((): (() => void) | void => {
    const value = readFromStorage();
    setStoredValue(value);
    setIsHydrated(true);
  }, [readFromStorage]);

  // Sync with other tabs/windows
  useEffect((): (() => void) | void => {
    if (!syncTabs || typeof window === 'undefined') return;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== key || event.storageArea !== localStorage) return;

      try {
        if (event.newValue === null) {
          setStoredValue(initialValueRef.current);
        } else {
          setStoredValue(deserializer(event.newValue));
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        onError?.(err);
        console.warn(`Error syncing localStorage key "${key}":`, err);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, deserializer, syncTabs, onError]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    isHydrated,
  };
}

/**
 * useBookingStorage - Hook spécialisé pour persister les données de réservation
 */
export interface StoredBooking {
  date: string | null;
  sessionId: string | null;
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
  }>;
  pickupId: string | null;
  specialRequests: string;
  lastUpdated: string;
}

const BOOKING_STORAGE_KEY = 'rastasafari_booking';
const BOOKING_EXPIRY_HOURS = 24;

export function useBookingStorage() {
  const { value, setValue, removeValue, isHydrated } = useLocalStorage<StoredBooking | null>(
    BOOKING_STORAGE_KEY,
    null
  );

  // Check if stored booking is expired
  const isExpired = useCallback((booking: StoredBooking): boolean => {
    if (!booking.lastUpdated) return true;
    const lastUpdated = new Date(booking.lastUpdated);
    const now = new Date();
    const hoursDiff = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
    return hoursDiff > BOOKING_EXPIRY_HOURS;
  }, []);

  // Save booking
  const saveBooking = useCallback((booking: Omit<StoredBooking, 'lastUpdated'>) => {
    setValue({
      ...booking,
      lastUpdated: new Date().toISOString(),
    });
  }, [setValue]);

  // Get booking (returns null if expired)
  const getBooking = useCallback((): StoredBooking | null => {
    if (!value) return null;
    if (isExpired(value)) {
      removeValue();
      return null;
    }
    return value;
  }, [value, isExpired, removeValue]);

  // Clear booking
  const clearBooking = useCallback(() => {
    removeValue();
  }, [removeValue]);

  return {
    booking: isHydrated ? getBooking() : null,
    saveBooking,
    clearBooking,
    isHydrated,
  };
}

/**
 * useCartStorage - Hook spécialisé pour persister le panier
 */
export interface CartItem {
  id: string;
  type: 'booking' | 'merchandise' | 'addon';
  name: string;
  price: number;
  quantity: number;
  metadata?: Record<string, unknown>;
}

export interface StoredCart {
  items: CartItem[];
  lastUpdated: string;
}

const CART_STORAGE_KEY = 'rastasafari_cart';
const CART_EXPIRY_HOURS = 72;

export function useCartStorage() {
  const { value, setValue, removeValue, isHydrated } = useLocalStorage<StoredCart | null>(
    CART_STORAGE_KEY,
    null
  );

  // Check if stored cart is expired
  const isExpired = useCallback((cart: StoredCart): boolean => {
    if (!cart.lastUpdated) return true;
    const lastUpdated = new Date(cart.lastUpdated);
    const now = new Date();
    const hoursDiff = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);
    return hoursDiff > CART_EXPIRY_HOURS;
  }, []);

  // Get current cart
  const getCart = useCallback((): StoredCart => {
    if (!value || isExpired(value)) {
      return { items: [], lastUpdated: new Date().toISOString() };
    }
    return value;
  }, [value, isExpired]);

  // Add item to cart
  const addItem = useCallback((item: Omit<CartItem, 'id'>) => {
    const cart = getCart();
    const newItem: CartItem = {
      ...item,
      id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    setValue({
      items: [...cart.items, newItem],
      lastUpdated: new Date().toISOString(),
    });

    return newItem.id;
  }, [getCart, setValue]);

  // Update item quantity
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    const cart = getCart();

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      setValue({
        items: cart.items.filter((item) => item.id !== itemId),
        lastUpdated: new Date().toISOString(),
      });
    } else {
      setValue({
        items: cart.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        ),
        lastUpdated: new Date().toISOString(),
      });
    }
  }, [getCart, setValue]);

  // Remove item from cart
  const removeItem = useCallback((itemId: string) => {
    const cart = getCart();
    setValue({
      items: cart.items.filter((item) => item.id !== itemId),
      lastUpdated: new Date().toISOString(),
    });
  }, [getCart, setValue]);

  // Clear cart
  const clearCart = useCallback(() => {
    removeValue();
  }, [removeValue]);

  // Calculate cart totals
  const cartTotals = useCallback(() => {
    const cart = getCart();
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      itemCount,
      subtotal,
      formattedSubtotal: `$${subtotal.toFixed(2)}`,
    };
  }, [getCart]);

  return {
    cart: isHydrated ? getCart() : { items: [], lastUpdated: '' },
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totals: cartTotals(),
    isHydrated,
  };
}

export type UseLocalStorageReturn<T> = ReturnType<typeof useLocalStorage<T>>;
