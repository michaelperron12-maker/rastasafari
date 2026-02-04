// i18n Configuration for Rastasafari Experience
// Supports English and French

export { translations, getTranslation, defaultLocale, locales } from './translations';
export type { Locale, TranslationKey } from './translations';

import { translations, Locale } from './translations';

/**
 * Hook-style function to get all translations for a locale
 */
export function useTranslations(locale: Locale) {
  return translations[locale];
}

/**
 * Get the opposite locale (for language switcher)
 */
export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'fr' : 'en';
}

/**
 * Get locale display name
 */
export function getLocaleDisplayName(locale: Locale): string {
  const names: Record<Locale, string> = {
    en: 'English',
    fr: 'Français',
  };
  return names[locale];
}

/**
 * Get locale flag emoji
 */
export function getLocaleFlag(locale: Locale): string {
  const flags: Record<Locale, string> = {
    en: '🇬🇧',
    fr: '🇫🇷',
  };
  return flags[locale];
}

/**
 * Detect browser locale
 */
export function detectBrowserLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'fr' ? 'fr' : 'en';
}

/**
 * Format price based on locale
 */
export function formatPrice(amount: number, locale: Locale): string {
  if (locale === 'fr') {
    return `${amount} $ USD`;
  }
  return `$${amount} USD`;
}

/**
 * Format date based on locale
 */
export function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format session time based on locale
 */
export function formatSessionTime(session: '9h' | '12h' | '14h30', locale: Locale): string {
  const times: Record<string, Record<Locale, string>> = {
    '9h': { en: '9:00 AM', fr: '9h00' },
    '12h': { en: '12:00 PM', fr: '12h00' },
    '14h30': { en: '2:30 PM', fr: '14h30' },
  };
  return times[session][locale];
}
