'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MobileMenu from './MobileMenu'
import { LanguageSwitcher, useLocale } from './LanguageSwitcher'
import { translations, Locale } from '@/lib/i18n'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { locale, setLocale, isLoaded } = useLocale()

  // Get translations based on current locale
  const t = translations[locale]

  // Navigation items with translations
  const navigation = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.experiences, href: '/experiences' },
    { name: t.nav.booking, href: '/reservation' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.contact, href: '/contact' },
    { name: t.nav.faq, href: '/faq' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fermer le menu mobile lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Empecher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
            : 'bg-transparent py-4'
        }`}
      >
        {/* Bande decorative rasta en haut */}
        <div className="absolute top-0 left-0 right-0 h-1 gradient-rasta" />

        <div className="container-custom">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Rastasafari Experience Jamaica - Home"
            >
              {/* Placeholder Logo */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-rasta-black flex items-center justify-center border-2 border-rasta-gold group-hover:border-rasta-green transition-colors duration-300">
                <div className="absolute inset-0 opacity-20 gradient-rasta" />
                <span className="relative text-white font-heading font-bold text-xl">
                  R
                </span>
              </div>
              <div className="hidden sm:block">
                <span
                  className={`font-heading font-bold text-lg leading-tight block ${
                    isScrolled ? 'text-rasta-black' : 'text-white drop-shadow-lg'
                  }`}
                >
                  Rastasafari
                </span>
                <span
                  className={`text-xs font-medium tracking-wider uppercase ${
                    isScrolled ? 'text-rasta-green' : 'text-rasta-gold drop-shadow'
                  }`}
                >
                  Experience Jamaica
                </span>
              </div>
            </Link>

            {/* Navigation Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${
                    isScrolled
                      ? 'text-dark-gray hover:text-rasta-green'
                      : 'text-white hover:text-rasta-gold drop-shadow'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language Switcher - EN | FR toggle */}
              <div className={`flex items-center rounded-lg overflow-hidden border ${
                isScrolled
                  ? 'border-gray-200 bg-white'
                  : 'border-white/30 bg-white/10'
              }`}>
                <button
                  onClick={() => setLocale('en')}
                  className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    locale === 'en'
                      ? 'bg-rasta-green text-white'
                      : isScrolled
                        ? 'text-dark-gray hover:bg-gray-100'
                        : 'text-white hover:bg-white/20'
                  }`}
                  aria-label="Switch to English"
                  aria-pressed={locale === 'en'}
                >
                  EN
                </button>
                <div className={`w-px h-6 ${isScrolled ? 'bg-gray-200' : 'bg-white/30'}`} />
                <button
                  onClick={() => setLocale('fr')}
                  className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
                    locale === 'fr'
                      ? 'bg-rasta-green text-white'
                      : isScrolled
                        ? 'text-dark-gray hover:bg-gray-100'
                        : 'text-white hover:bg-white/20'
                  }`}
                  aria-label="Passer en francais"
                  aria-pressed={locale === 'fr'}
                >
                  FR
                </button>
              </div>

              {/* Book Now Button - Desktop */}
              <Link
                href="/reservation"
                className="hidden md:inline-flex btn-primary min-h-[44px] px-4 sm:px-6"
              >
                {t.nav.booking}
              </Link>

              {/* Mobile Menu Button - Touch friendly (min 44px) */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className={`lg:hidden p-3 rounded-lg transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  isScrolled
                    ? 'text-dark-gray hover:bg-light-gray'
                    : 'text-white hover:bg-white/20'
                }`}
                aria-label={locale === 'en' ? 'Open menu' : 'Ouvrir le menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Menu Mobile */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
        locale={locale}
        setLocale={setLocale}
        t={t}
      />
    </>
  )
}
