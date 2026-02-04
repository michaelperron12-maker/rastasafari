'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import { useLocale } from '@/components/LanguageSwitcher';
import { translations, Locale } from '@/lib/i18n';
import './contact.css';

interface FAQItem {
  question: string;
  answer: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

// FAQ items by locale
const getFaqItems = (locale: Locale): FAQItem[] => {
  if (locale === 'fr') {
    return [
      {
        question: 'Comment reserver ?',
        answer:
          'Vous pouvez reserver en ligne directement via notre formulaire de reservation, par telephone au 876-445-7203, ou via WhatsApp. Un acompte de 25% est requis pour confirmer votre reservation.',
      },
      {
        question: "Quelle est la politique d'annulation ?",
        answer:
          "Annulation gratuite jusqu'a 48 heures avant l'experience. Entre 24-48 heures, 50% du montant est retenu. Moins de 24 heures, le montant total est non remboursable. En cas de mauvais temps, nous reprogrammons sans frais.",
      },
      {
        question: 'Que dois-je apporter ?',
        answer:
          "Nous recommandons d'apporter : maillot de bain, serviette, creme solaire biodegradable, chaussures d'eau ou sandales securisees, appareil photo etanche (optionnel), et un esprit d'aventure !",
      },
      {
        question: "Quel est l'age minimum ?",
        answer:
          "L'age minimum varie selon l'experience. Pour la randonnee et la source minerale, tous les ages sont bienvenus. Pour les activites de rafting, l'age minimum est de 6 ans. Les enfants doivent etre accompagnes d'un adulte.",
      },
    ];
  }
  return [
    {
      question: 'How do I book?',
      answer:
        'You can book online directly through our booking form, by phone at 876-445-7203, or via WhatsApp. A 25% deposit is required to confirm your reservation.',
    },
    {
      question: 'What is the cancellation policy?',
      answer:
        'Free cancellation up to 48 hours before the experience. Between 24-48 hours, 50% of the amount is retained. Less than 24 hours, the full amount is non-refundable. In case of bad weather, we reschedule at no cost.',
    },
    {
      question: 'What should I bring?',
      answer:
        'We recommend bringing: swimsuit, towel, biodegradable sunscreen, water shoes or secure sandals, waterproof camera (optional), and a spirit of adventure!',
    },
    {
      question: 'What is the minimum age?',
      answer:
        'The minimum age varies by experience. For hiking and mineral spring, all ages are welcome. For rafting activities, the minimum age is 6 years. Children must be accompanied by an adult.',
    },
  ];
};

// Subject options by locale
const getSubjectOptions = (locale: Locale) => {
  if (locale === 'fr') {
    return [
      { value: '', label: 'Selectionnez un sujet' },
      { value: 'general', label: 'Question generale' },
      { value: 'reservation', label: 'Reservation' },
      { value: 'private-group', label: 'Groupe prive' },
      { value: 'partnership', label: 'Partenariat' },
    ];
  }
  return [
    { value: '', label: 'Select a subject' },
    { value: 'general', label: 'General inquiry' },
    { value: 'reservation', label: 'Booking' },
    { value: 'private-group', label: 'Private group' },
    { value: 'partnership', label: 'Partnership' },
  ];
};

export default function ContactPage() {
  const { locale } = useLocale();
  const t = translations[locale];
  const faqItems = getFaqItems(locale);
  const subjectOptions = getSubjectOptions(locale);

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Localized error messages
  const getErrorMessages = () => {
    if (locale === 'fr') {
      return {
        fullNameRequired: 'Le nom complet est requis',
        fullNameMin: 'Le nom doit contenir au moins 2 caracteres',
        emailRequired: "L'email est requis",
        emailInvalid: 'Veuillez entrer une adresse email valide',
        phoneInvalid: 'Veuillez entrer un numero de telephone valide',
        subjectRequired: 'Veuillez selectionner un sujet',
        messageRequired: 'Le message est requis',
        messageMin: 'Le message doit contenir au moins 10 caracteres',
      };
    }
    return {
      fullNameRequired: 'Full name is required',
      fullNameMin: 'Name must be at least 2 characters',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      phoneInvalid: 'Please enter a valid phone number',
      subjectRequired: 'Please select a subject',
      messageRequired: 'Message is required',
      messageMin: 'Message must be at least 10 characters',
    };
  };

  const errorMessages = getErrorMessages();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true;
    const phoneRegex = /^[\d\s\-+()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = errorMessages.fullNameRequired;
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = errorMessages.fullNameMin;
    }

    if (!formData.email.trim()) {
      newErrors.email = errorMessages.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = errorMessages.emailInvalid;
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = errorMessages.phoneInvalid;
    }

    if (!formData.subject) {
      newErrors.subject = errorMessages.subjectRequired;
    }

    if (!formData.message.trim()) {
      newErrors.message = errorMessages.messageRequired;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = errorMessages.messageMin;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-overlay" />
        <Image
          src="/images/rastasafari/banner.jpg"
          alt="Contact Rastasafari Experience"
          fill
          className="object-cover"
          style={{ zIndex: -1 }}
          priority
        />
        <div className="contact-hero-content">
          <h1>{t.contact.title}</h1>
          <p>
            {locale === 'en'
              ? 'Have a question? Need to book? Our team is here to help you plan your authentic Jamaican experience.'
              : 'Une question ? Besoin de reserver ? Notre equipe est la pour vous aider a planifier votre experience jamaicaine authentique.'}
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="contact-main">
        <div className="contact-container">
          {/* Contact Information */}
          <div className="contact-info-section">
            <h2>{t.contact.getInTouch}</h2>

            <div className="contact-info-cards">
              {/* Phone */}
              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-card-content">
                  <h3>{t.contact.phone}</h3>
                  <a href="tel:+18764457203" className="contact-link">
                    +1 (876) 445-7203
                  </a>
                  <p className="contact-note">
                    {locale === 'en' ? 'Available 7 days/week, 8am - 6pm' : 'Disponible 7j/7, 8h - 18h'}
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="contact-card">
                <div className="contact-card-icon whatsapp">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="contact-card-content">
                  <h3>{t.contact.whatsapp}</h3>
                  <a
                    href={`https://wa.me/18764457203?text=${encodeURIComponent(locale === 'en' ? 'Hello, I would like information about Rastasafari Experience' : 'Bonjour, je souhaite avoir des informations sur Rastasafari Experience')}`}
                    className="contact-link whatsapp-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +1 (876) 445-7203
                  </a>
                  <p className="contact-note">
                    {locale === 'en' ? 'Quick response guaranteed' : 'Reponse rapide garantie'}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-card-content">
                  <h3>{t.contact.email}</h3>
                  <a href="mailto:info@rastasafariexperience.com" className="contact-link">
                    info@rastasafariexperience.com
                  </a>
                  <p className="contact-note">
                    {locale === 'en' ? 'Response within 24 hours' : 'Reponse sous 24h'}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-card-content">
                  <h3>{t.contact.address}</h3>
                  <address className="contact-address">
                    {t.contact.addressValue}
                  </address>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="social-media-section">
              <h3>{t.footer.followUs}</h3>
              <div className="social-links">
                <a
                  href="https://instagram.com/rastasafariexperience"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link instagram"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>@rastasafariexperience</span>
                </a>
                <a
                  href="https://tiktok.com/@rastasafari.exper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link tiktok"
                  aria-label="TikTok"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <span>@rastasafari.exper</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>{t.contact.sendMessage}</h2>
            <p className="form-intro">
              {locale === 'en'
                ? 'Fill out the form below and our team will get back to you as soon as possible.'
                : 'Remplissez le formulaire ci-dessous et notre equipe vous repondra dans les plus brefs delais.'}
            </p>

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {submitStatus === 'success' && (
                <div className="form-alert form-alert-success">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>
                    {locale === 'en'
                      ? 'Thank you! Your message has been sent successfully. We will respond as soon as possible.'
                      : 'Merci ! Votre message a ete envoye avec succes. Nous vous repondrons dans les plus brefs delais.'}
                  </span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-alert form-alert-error">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span>
                    {locale === 'en'
                      ? 'An error occurred. Please try again or contact us directly by phone.'
                      : "Une erreur s'est produite. Veuillez reessayer ou nous contacter directement par telephone."}
                  </span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  {locale === 'en' ? 'Full Name' : 'Nom complet'} <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`form-input ${errors.fullName ? 'form-input-error' : ''}`}
                  placeholder={locale === 'en' ? 'Your full name' : 'Votre nom complet'}
                  disabled={isSubmitting}
                />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  {locale === 'en' ? 'Email' : 'Email'} <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                  placeholder={locale === 'en' ? 'your@email.com' : 'votre@email.com'}
                  disabled={isSubmitting}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  {locale === 'en' ? 'Phone' : 'Telephone'}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                  placeholder="+1 (876) 445-7203"
                  disabled={isSubmitting}
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  {locale === 'en' ? 'Subject' : 'Sujet'} <span className="required">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`form-select ${errors.subject ? 'form-input-error' : ''}`}
                  disabled={isSubmitting}
                >
                  {subjectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.subject && <span className="form-error">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  {locale === 'en' ? 'Message' : 'Message'} <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-textarea ${errors.message ? 'form-input-error' : ''}`}
                  placeholder={locale === 'en' ? 'How can we help you?' : 'Comment pouvons-nous vous aider ?'}
                  rows={5}
                  disabled={isSubmitting}
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="2" x2="12" y2="6" />
                      <line x1="12" y1="18" x2="12" y2="22" />
                      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                      <line x1="2" y1="12" x2="6" y2="12" />
                      <line x1="18" y1="12" x2="22" y2="12" />
                      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                    </svg>
                    {locale === 'en' ? 'Sending...' : 'Envoi en cours...'}
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    {locale === 'en' ? 'Send Message' : 'Envoyer le message'}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="map-section">
        <h2>{locale === 'en' ? 'Our Location' : 'Notre Localisation'}</h2>
        <p className="map-description">
          {locale === 'en'
            ? 'Find us at Roaring River, a hidden natural gem in Westmoreland Parish, Jamaica.'
            : 'Retrouvez-nous a Roaring River, un joyau naturel cache dans la paroisse de Westmoreland, Jamaique.'}
        </p>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15177.458762456978!2d-78.13834037304687!3d18.263889800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ed954e5ca6f9e9b%3A0x5f30f06b5c8c8a8a!2sRoaring%20River%2C%20Jamaica!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Rastasafari Experience Jamaica - Roaring River Location"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <h2>{t.faq.title}</h2>
          <p className="faq-intro">
            {locale === 'en'
              ? 'Quickly find answers to your most common questions.'
              : 'Trouvez rapidement les reponses a vos questions les plus courantes.'}
          </p>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${openFAQ === index ? 'faq-item-open' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openFAQ === index}
                >
                  <span>{item.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="faq-icon"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
