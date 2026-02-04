'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Locale, translations } from '@/lib/i18n'

interface NavigationItem {
  name: string
  href: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navigation: NavigationItem[]
  locale: Locale
  setLocale: (locale: Locale) => void
  t: typeof translations.en | typeof translations.fr
}

export default function MobileMenu({
  isOpen,
  onClose,
  navigation,
  locale,
  setLocale,
  t,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Focus trap
  useEffect((): (() => void) | void => {
    if (isOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement

      const handleTab = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            event.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            event.preventDefault()
          }
        }
      }

      document.addEventListener('keydown', handleTab)
      firstElement?.focus()

      return () => document.removeEventListener('keydown', handleTab)
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={locale === 'en' ? 'Navigation menu' : 'Menu de navigation'}
      >
        {/* Rasta decorative stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 gradient-rasta" />

        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-light-gray">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 min-h-[44px]"
          >
            <div className="w-10 h-10 rounded-full bg-rasta-black flex items-center justify-center border-2 border-rasta-gold">
              <span className="text-white font-heading font-bold text-lg">R</span>
            </div>
            <div>
              <span className="font-heading font-bold text-rasta-black block leading-tight">
                Rastasafari
              </span>
              <span className="text-xs text-rasta-green font-medium tracking-wider uppercase">
                Experience Jamaica
              </span>
            </div>
          </Link>

          {/* Close button - Touch friendly (min 44px) */}
          <button
            type="button"
            onClick={onClose}
            className="p-3 rounded-lg text-medium-gray hover:text-rasta-red hover:bg-light-gray transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={locale === 'en' ? 'Close menu' : 'Fermer le menu'}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Language Switcher in Mobile Menu */}
        <div className="px-4 pt-4">
          <div className="flex items-center justify-center rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <button
              onClick={() => setLocale('en')}
              className={`flex-1 px-4 py-3 text-sm font-semibold transition-all min-h-[44px] ${
                locale === 'en'
                  ? 'bg-rasta-green text-white'
                  : 'text-dark-gray hover:bg-gray-100'
              }`}
              aria-label="Switch to English"
              aria-pressed={locale === 'en'}
            >
              EN - English
            </button>
            <div className="w-px h-8 bg-gray-200" />
            <button
              onClick={() => setLocale('fr')}
              className={`flex-1 px-4 py-3 text-sm font-semibold transition-all min-h-[44px] ${
                locale === 'fr'
                  ? 'bg-rasta-green text-white'
                  : 'text-dark-gray hover:bg-gray-100'
              }`}
              aria-label="Passer en francais"
              aria-pressed={locale === 'fr'}
            >
              FR - Francais
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-1">
            {navigation.map((item, index) => (
              <li
                key={item.name}
                style={{
                  animationDelay: isOpen ? `${index * 50}ms` : '0ms',
                }}
                className={`${isOpen ? 'animate-slide-up' : ''}`}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl font-heading font-medium text-dark-gray hover:bg-rasta-green/10 hover:text-rasta-green transition-all duration-200 group min-h-[48px] text-base"
                >
                  <span className="w-2 h-2 rounded-full bg-rasta-gold group-hover:bg-rasta-green transition-colors duration-200" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-light-gray bg-off-white safe-area-bottom">
          <Link
            href="/reservation"
            onClick={onClose}
            className="btn-primary w-full justify-center text-center min-h-[48px] text-base"
          >
            {t.nav.booking}
          </Link>

          {/* Quick Contact */}
          <div className="mt-4 text-center">
            <a
              href="tel:+18764457203"
              className="inline-flex items-center gap-2 text-base text-medium-gray hover:text-rasta-green transition-colors duration-200 min-h-[44px] px-4"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              876-445-7203
            </a>
          </div>

          {/* Social Media - Touch friendly */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              href="https://instagram.com/rastasafariexperience"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-light-gray text-medium-gray hover:bg-rasta-red hover:text-white transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://tiktok.com/@rastasafari.exper"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-light-gray text-medium-gray hover:bg-rasta-black hover:text-white transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
            </a>
            <a
              href="https://wa.me/18764457203"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-light-gray text-medium-gray hover:bg-green-500 hover:text-white transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
