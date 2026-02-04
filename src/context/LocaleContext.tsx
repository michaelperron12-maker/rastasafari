'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Locale, translations } from '@/lib/i18n';
import { useLocale } from '@/components/LanguageSwitcher';

type Translations = typeof translations.en | typeof translations.fr;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: any;
  isLoaded: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { locale, setLocale, isLoaded } = useLocale();
  const t = translations[locale];

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, isLoaded }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LocaleProvider');
  }
  return context;
}

// Shorthand hook for just getting translations
export function useT() {
  const { t } = useTranslation();
  return t;
}

export default LocaleContext;
