'use client'

import Link from 'next/link'
import { useLocale } from './LanguageSwitcher'
import { translations, Locale } from '@/lib/i18n'

export default function Footer() {
  const { locale } = useLocale()
  const t = translations[locale]
  const currentYear = new Date().getFullYear()

  // Quick links with translations
  const quickLinks = [
    { name: t.nav.home, href: '/' },
    { name: t.nav.experiences, href: '/experiences' },
    { name: t.nav.booking, href: '/reservation' },
    { name: t.nav.about, href: '/about' },
    { name: t.nav.contact, href: '/contact' },
    { name: t.nav.faq, href: '/faq' },
  ]

  // Experience links (these could be added to translations if needed)
  const experienceLinks = locale === 'en'
    ? [
        { name: 'Cultural Tours', href: '/experiences/cultural' },
        { name: 'Nature Adventures', href: '/experiences/adventure' },
        { name: 'Food Experiences', href: '/experiences/food' },
        { name: 'Music & Art', href: '/experiences/music-art' },
      ]
    : [
        { name: 'Tours culturels', href: '/experiences/cultural' },
        { name: 'Aventures nature', href: '/experiences/adventure' },
        { name: 'Experiences culinaires', href: '/experiences/food' },
        { name: 'Musique & Art', href: '/experiences/music-art' },
      ]

  // Legal links
  const legalLinks = locale === 'en'
    ? [
        { name: 'Terms & Conditions', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cancellation Policy', href: '/cancellation-policy' },
      ]
    : [
        { name: 'Conditions generales', href: '/terms' },
        { name: 'Politique de confidentialite', href: '/privacy' },
        { name: "Politique d'annulation", href: '/cancellation-policy' },
      ]

  return (
    <footer className="bg-rasta-black text-white">
      {/* Rasta decorative stripe */}
      <div className="h-2 gradient-rasta" />

      {/* Main content */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Logo and description */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 min-h-[44px]">
              <div className="w-12 h-12 rounded-full bg-rasta-gold/20 flex items-center justify-center border-2 border-rasta-gold">
                <span className="text-rasta-gold font-heading font-bold text-xl">
                  R
                </span>
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-white block leading-tight">
                  Rastasafari
                </span>
                <span className="text-xs text-rasta-gold font-medium tracking-wider uppercase">
                  Experience Jamaica
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              {t.footer.description}
            </p>

            {/* Social Media - Touch friendly (min 44px) */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/rastasafariexperience"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-rasta-red hover:text-white transition-all duration-300"
                aria-label={locale === 'en' ? 'Follow us on Instagram @rastasafariexperience' : 'Suivez-nous sur Instagram @rastasafariexperience'}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@rastasafari.exper"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-rasta-black transition-all duration-300"
                aria-label={locale === 'en' ? 'Follow us on TikTok @rastasafari.exper' : 'Suivez-nous sur TikTok @rastasafari.exper'}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/rastasafariexperience"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                aria-label={locale === 'en' ? 'Follow us on Facebook' : 'Suivez-nous sur Facebook'}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@rastasafariexperience"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                aria-label={locale === 'en' ? 'Follow us on YouTube' : 'Suivez-nous sur YouTube'}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rasta-green" />
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-rasta-gold transition-colors duration-200 text-base py-1 inline-block min-h-[44px] flex items-center"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Experiences */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rasta-gold" />
              {locale === 'en' ? 'Our Experiences' : 'Nos experiences'}
            </h3>
            <ul className="space-y-2">
              {experienceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-rasta-gold transition-colors duration-200 text-base py-1 inline-block min-h-[44px] flex items-center"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rasta-red" />
              {t.footer.contact}
            </h3>
            <div className="space-y-3">
              {/* Phone */}
              <a
                href="tel:+18764457203"
                className="flex items-center gap-3 text-gray-400 hover:text-rasta-green transition-colors duration-200 group min-h-[44px]"
              >
                <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-rasta-green group-hover:text-white transition-all duration-300">
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
                </span>
                <span className="text-base">876-445-7203</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/18764457203"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-green-500 transition-colors duration-200 group min-h-[44px]"
              >
                <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                <span className="text-base">WhatsApp</span>
              </a>

              {/* Email */}
              <a
                href="mailto:info@rastasafari.com"
                className="flex items-center gap-3 text-gray-400 hover:text-rasta-gold transition-colors duration-200 group min-h-[44px]"
              >
                <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-rasta-gold group-hover:text-rasta-black transition-all duration-300">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <span className="text-base">info@rastasafari.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-base text-center md:text-left">
              {t.footer.copyright.replace('2024', currentYear.toString())}
            </p>

            {/* Legal links */}
            <ul className="flex flex-wrap items-center justify-center gap-4 text-base">
              {legalLinks.map((link, index) => (
                <li key={link.name} className="flex items-center">
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors duration-200 py-1 min-h-[44px] flex items-center"
                  >
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="ml-4 text-gray-700">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Jamaica message */}
          <p className="text-center mt-4 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1">
              Made with
              <svg
                className="w-4 h-4 text-rasta-red"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              in Jamaica
              <span className="ml-1">&#127471;&#127474;</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
