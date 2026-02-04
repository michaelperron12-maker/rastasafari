'use client';

import { useState, useEffect } from 'react';
import { Locale, getLocaleDisplayName, getLocaleFlag, getAlternateLocale, detectBrowserLocale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  variant?: 'dropdown' | 'toggle' | 'flags';
  className?: string;
}

export function LanguageSwitcher({
  locale,
  onLocaleChange,
  variant = 'toggle',
  className = ''
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const alternateLocale = getAlternateLocale(locale);

  // Toggle variant - simple button
  if (variant === 'toggle') {
    return (
      <button
        onClick={() => onLocaleChange(alternateLocale)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors ${className}`}
        aria-label={`Switch to ${getLocaleDisplayName(alternateLocale)}`}
      >
        <span className="text-lg">{getLocaleFlag(alternateLocale)}</span>
        <span className="text-sm font-medium">{getLocaleDisplayName(alternateLocale)}</span>
      </button>
    );
  }

  // Flags variant - just flags side by side
  if (variant === 'flags') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <button
          onClick={() => onLocaleChange('en')}
          className={`p-2 rounded-lg transition-all ${
            locale === 'en'
              ? 'bg-rasta-green/20 ring-2 ring-rasta-green'
              : 'hover:bg-white/10'
          }`}
          aria-label="English"
          aria-pressed={locale === 'en'}
        >
          <span className="text-2xl">🇬🇧</span>
        </button>
        <button
          onClick={() => onLocaleChange('fr')}
          className={`p-2 rounded-lg transition-all ${
            locale === 'fr'
              ? 'bg-rasta-green/20 ring-2 ring-rasta-green'
              : 'hover:bg-white/10'
          }`}
          aria-label="Français"
          aria-pressed={locale === 'fr'}
        >
          <span className="text-2xl">🇫🇷</span>
        </button>
      </div>
    );
  }

  // Dropdown variant
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg">{getLocaleFlag(locale)}</span>
        <span className="text-sm font-medium">{getLocaleDisplayName(locale)}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-40 bg-gray-900 rounded-lg shadow-xl border border-white/10 overflow-hidden z-50">
            <button
              onClick={() => {
                onLocaleChange('en');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors ${
                locale === 'en' ? 'bg-rasta-green/20' : ''
              }`}
            >
              <span className="text-xl">🇬🇧</span>
              <span>English</span>
              {locale === 'en' && (
                <svg className="w-4 h-4 ml-auto text-rasta-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <button
              onClick={() => {
                onLocaleChange('fr');
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors ${
                locale === 'fr' ? 'bg-rasta-green/20' : ''
              }`}
            >
              <span className="text-xl">🇫🇷</span>
              <span>Français</span>
              {locale === 'fr' && (
                <svg className="w-4 h-4 ml-auto text-rasta-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Hook for managing locale state with localStorage persistence
export function useLocale() {
  const [locale, setLocale] = useState<Locale>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check localStorage first, then browser preference
    const savedLocale = localStorage.getItem('rastasafari-locale') as Locale | null;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'fr')) {
      setLocale(savedLocale);
    } else {
      setLocale(detectBrowserLocale());
    }
    setIsLoaded(true);
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('rastasafari-locale', newLocale);
    // Update HTML lang attribute
    document.documentElement.lang = newLocale;
  };

  return { locale, setLocale: changeLocale, isLoaded };
}

export default LanguageSwitcher;
