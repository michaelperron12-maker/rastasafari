'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

// Types
export interface MobileMenuState {
  isOpen: boolean;
}

export interface UseMobileMenuOptions {
  closeOnResize?: boolean;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  breakpoint?: number;
  onOpen?: () => void;
  onClose?: () => void;
}

const DEFAULT_OPTIONS: UseMobileMenuOptions = {
  closeOnResize: true,
  closeOnEscape: true,
  closeOnClickOutside: true,
  breakpoint: 768, // md breakpoint
};

/**
 * useMobileMenu - Hook pour gérer le menu mobile
 *
 * Fonctionnalités:
 * - Toggle menu ouvert/fermé
 * - Fermeture automatique au clic extérieur
 * - Fermeture automatique au redimensionnement (breakpoint)
 * - Fermeture avec touche Escape
 * - Gestion du scroll body
 */
export function useMobileMenu(options: UseMobileMenuOptions = {}) {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const [isOpen, setIsOpen] = useState(false);

  // Ref for the menu element (to detect outside clicks)
  const menuRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Open menu
  const open = useCallback(() => {
    setIsOpen(true);
    mergedOptions.onOpen?.();

    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
  }, [mergedOptions]);

  // Close menu
  const close = useCallback(() => {
    setIsOpen(false);
    mergedOptions.onClose?.();

    // Restore body scroll
    document.body.style.overflow = '';
  }, [mergedOptions]);

  // Toggle menu
  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  // Set menu ref (to be attached to menu element)
  const setMenuRef = useCallback((element: HTMLElement | null) => {
    menuRef.current = element;
  }, []);

  // Set trigger ref (to be attached to menu button)
  const setTriggerRef = useCallback((element: HTMLElement | null) => {
    triggerRef.current = element;
  }, []);

  // Handle click outside
  useEffect((): (() => void) | void => {
    if (!isOpen || !mergedOptions.closeOnClickOutside) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Don't close if clicking on the menu or trigger
      if (menuRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;

      close();
    };

    // Add delay to prevent immediate close on open
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, mergedOptions.closeOnClickOutside, close]);

  // Handle resize
  useEffect((): (() => void) | void => {
    if (!isOpen || !mergedOptions.closeOnResize) return;

    const handleResize = () => {
      if (window.innerWidth >= (mergedOptions.breakpoint || 768)) {
        close();
      }
    };

    window.addEventListener('resize', handleResize);

    // Check immediately in case window is already large
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, mergedOptions.closeOnResize, mergedOptions.breakpoint, close]);

  // Handle Escape key
  useEffect((): (() => void) | void => {
    if (!isOpen || !mergedOptions.closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        // Focus back on trigger button
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, mergedOptions.closeOnEscape, close]);

  // Cleanup on unmount
  useEffect((): (() => void) | void => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Trap focus within menu when open (accessibility)
  useEffect((): (() => void) | void => {
    if (!isOpen || !menuRef.current) return;

    const menu = menuRef.current;
    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element when menu opens
    firstElement.focus();

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  // Get props for menu trigger button
  const getTriggerProps = useCallback(() => ({
    onClick: toggle,
    'aria-expanded': isOpen,
    'aria-controls': 'mobile-menu',
    'aria-label': isOpen ? 'Fermer le menu' : 'Ouvrir le menu',
    ref: setTriggerRef,
  }), [isOpen, toggle, setTriggerRef]);

  // Get props for menu container
  const getMenuProps = useCallback(() => ({
    id: 'mobile-menu',
    'aria-hidden': !isOpen,
    role: 'navigation',
    'aria-label': 'Menu principal',
    ref: setMenuRef,
  }), [isOpen, setMenuRef]);

  return {
    // State
    isOpen,

    // Actions
    open,
    close,
    toggle,

    // Refs
    menuRef,
    triggerRef,
    setMenuRef,
    setTriggerRef,

    // Prop getters (for easy component binding)
    getTriggerProps,
    getMenuProps,
  };
}

export type UseMobileMenuReturn = ReturnType<typeof useMobileMenu>;
