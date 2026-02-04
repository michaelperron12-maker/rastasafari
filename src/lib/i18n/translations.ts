// Translations for Rastasafari Experience - English & French

export type Locale = 'en' | 'fr';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      experiences: 'Experiences',
      booking: 'Book Now',
      about: 'About Us',
      contact: 'Contact',
      faq: 'FAQ',
    },

    // Hero Section
    hero: {
      title: 'Rastasafari Experience',
      subtitle: 'The #1 Rated Outdoor Activity in Jamaica',
      badge: 'Top 1% on TripAdvisor',
      cta: 'Book Your Adventure',
      price: '$165 USD per person',
      rating: 'Based on 2,142+ reviews',
    },

    // Experience Details
    experience: {
      title: 'The Experience',
      duration: 'Duration',
      durationValue: '3.5-4 hours',
      maxGroup: 'Max Group Size',
      maxGroupValue: '24 people',
      sessions: 'Available Sessions',
      sessionsValue: '9:00 AM, 12:00 PM, 2:30 PM',
      price: 'Price',
      priceValue: '$165 USD per person',
    },

    // What's Included
    included: {
      title: "What's Included",
      transport: 'Round-trip hotel transportation',
      atv: 'ATV Polaris Side-by-Side 900',
      drinks: 'Welcome drinks & water',
      meal: 'Homemade Ital lunch',
      guides: 'Certified guides',
      swimming: 'Mineral spring swimming',
      ganja: 'Ganja field visit',
      fruits: 'Fresh fruit tasting',
    },

    // Pickup Locations
    pickup: {
      title: 'Pickup Locations',
      included: 'Included',
      supplement: '+$30 supplement',
      montegoBay: 'Montego Bay',
      negril: 'Negril',
      grandPalladium: 'Grand Palladium',
      other: 'Other locations',
      hotelAddress: 'Hotel Address',
      hotelPlaceholder: 'Enter your hotel name and address',
    },

    // Booking Flow
    booking: {
      title: 'Book Your Adventure',
      step1: 'Select Date',
      step2: 'Participants',
      step3: 'Pickup Location',
      step4: 'Your Information',
      step5: 'Payment',
      selectDate: 'Select a date',
      selectSession: 'Select a session',
      adults: 'Adults',
      children: 'Children (4-12 years)',
      childrenNote: 'Children under 4 are free',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone / WhatsApp',
      specialRequests: 'Special Requests',
      specialPlaceholder: 'Dietary restrictions, accessibility needs, etc.',
      continue: 'Continue',
      back: 'Back',
      payNow: 'Pay Now',
      total: 'Total',
      perPerson: 'per person',
    },

    // Payment
    payment: {
      title: 'Secure Payment',
      cardNumber: 'Card Number',
      expiry: 'Expiry Date',
      cvc: 'CVC',
      payWith: 'Pay with',
      processing: 'Processing...',
      success: 'Payment Successful!',
      confirmationNumber: 'Confirmation Number',
      emailSent: 'A confirmation email has been sent to',
      downloadConfirmation: 'Download Confirmation',
      print: 'Print',
      bookAnother: 'Book Another Experience',
    },

    // Cancellation Policy
    cancellation: {
      title: 'Cancellation Policy',
      free: 'Free cancellation up to 24 hours before',
      noRefund: 'No refund within 24 hours',
      weather: 'Weather cancellations: reschedule or full refund',
    },

    // About Page
    about: {
      title: 'About Us',
      story: 'Our Story',
      storyText: 'Located in the heart of Roaring River, Westmoreland Parish, our village of 500 residents welcomes you to experience authentic Rastafari culture.',
      culture: 'Rastafari Culture',
      cultureText: 'Learn about the history, beliefs, and ceremonies that have made this way of life recognized and embraced worldwide.',
      team: 'Our Team',
      teamText: 'Our certified local guides and traditional cooks share their knowledge and passion with every visitor.',
      recognition: 'Recognition',
      recognitionText: 'Ranked in the Top 1% of attractions worldwide on TripAdvisor with over 2,142 reviews.',
    },

    // Contact Page
    contact: {
      title: 'Contact Us',
      getInTouch: 'Get in Touch',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      email: 'Email',
      address: 'Address',
      addressValue: 'Roaring River, Westmoreland Parish, Jamaica',
      sendMessage: 'Send a Message',
      subject: 'Subject',
      subjectOptions: {
        general: 'General Question',
        booking: 'Booking Inquiry',
        group: 'Private Group',
        partnership: 'Partnership',
      },
      message: 'Message',
      send: 'Send Message',
      messageSent: 'Message sent successfully!',
    },

    // FAQ
    faq: {
      title: 'Frequently Asked Questions',
      categories: {
        booking: 'Booking',
        experience: 'The Experience',
        logistics: 'Logistics',
        food: 'Food & Dining',
      },
      questions: {
        howToBook: 'How do I book?',
        howToBookAnswer: 'You can book online through our website or call us at 876-445-7203.',
        price: 'What is the price?',
        priceAnswer: '$165 USD per person, all-inclusive.',
        cancellation: 'What is the cancellation policy?',
        cancellationAnswer: 'Free cancellation more than 24 hours before. No refund within 24 hours.',
        payment: 'What payment methods do you accept?',
        paymentAnswer: 'We accept credit cards (Stripe) and PayPal.',
        duration: 'How long is the experience?',
        durationAnswer: '3.5-4 hours (4-5 hours including transportation).',
        minAge: 'What is the minimum age?',
        minAgeAnswer: '4 years old. Children under 4 are free.',
        driving: 'Do I need to know how to drive?',
        drivingAnswer: 'No, our guides drive the ATVs.',
        whatToBring: 'What should I bring?',
        whatToBringAnswer: 'Comfortable clothes, swimsuit, sunscreen, and a sense of adventure!',
        food: 'What type of food is served?',
        foodAnswer: 'Traditional Ital cuisine - organic vegetarian/vegan meals.',
        allergies: 'Can you accommodate allergies?',
        allergiesAnswer: 'Yes, please notify us in advance of any dietary restrictions.',
      },
    },

    // Reviews
    reviews: {
      title: 'What Our Guests Say',
      rating: 'rating',
      reviews: 'reviews',
      basedOn: 'Based on',
      verifiedReview: 'Verified Review',
      sources: {
        tripadvisor: 'TripAdvisor',
        viator: 'Viator',
        google: 'Google',
      },
    },

    // Footer
    footer: {
      description: 'Experience authentic Rastafari culture in the heart of Jamaica.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      followUs: 'Follow Us',
      copyright: '© 2024 Rastasafari Experience. All rights reserved.',
    },

    // Common
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      tryAgain: 'Try Again',
      close: 'Close',
      yes: 'Yes',
      no: 'No',
      available: 'Available',
      soldOut: 'Sold Out',
      limited: 'Limited spots',
      included: 'Included',
      learnMore: 'Learn More',
      viewAll: 'View All',
      getDirections: 'Get Directions',
    },
  },

  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      experiences: 'Expériences',
      booking: 'Réserver',
      about: 'À Propos',
      contact: 'Contact',
      faq: 'FAQ',
    },

    // Hero Section
    hero: {
      title: 'Rastasafari Experience',
      subtitle: "L'activité #1 en Jamaïque",
      badge: 'Top 1% sur TripAdvisor',
      cta: 'Réserver Votre Aventure',
      price: '165 $ USD par personne',
      rating: 'Basé sur plus de 2 142 avis',
    },

    // Experience Details
    experience: {
      title: "L'Expérience",
      duration: 'Durée',
      durationValue: '3h30-4h',
      maxGroup: 'Groupe Maximum',
      maxGroupValue: '24 personnes',
      sessions: 'Sessions Disponibles',
      sessionsValue: '9h00, 12h00, 14h30',
      price: 'Prix',
      priceValue: '165 $ USD par personne',
    },

    // What's Included
    included: {
      title: 'Ce Qui Est Inclus',
      transport: 'Transport aller-retour depuis votre hôtel',
      atv: 'VTT Polaris Side-by-Side 900',
      drinks: 'Boissons de bienvenue et eau',
      meal: 'Déjeuner Ital fait maison',
      guides: 'Guides certifiés',
      swimming: 'Baignade en source minérale',
      ganja: 'Visite du champ de ganja',
      fruits: 'Dégustation de fruits frais',
    },

    // Pickup Locations
    pickup: {
      title: 'Points de Ramassage',
      included: 'Inclus',
      supplement: 'Supplément +30 $',
      montegoBay: 'Montego Bay',
      negril: 'Negril',
      grandPalladium: 'Grand Palladium',
      other: 'Autres zones',
      hotelAddress: 'Adresse de l\'hôtel',
      hotelPlaceholder: 'Entrez le nom et l\'adresse de votre hôtel',
    },

    // Booking Flow
    booking: {
      title: 'Réserver Votre Aventure',
      step1: 'Choisir la Date',
      step2: 'Participants',
      step3: 'Point de Ramassage',
      step4: 'Vos Informations',
      step5: 'Paiement',
      selectDate: 'Sélectionnez une date',
      selectSession: 'Sélectionnez une session',
      adults: 'Adultes',
      children: 'Enfants (4-12 ans)',
      childrenNote: 'Les enfants de moins de 4 ans sont gratuits',
      fullName: 'Nom Complet',
      email: 'Adresse Email',
      phone: 'Téléphone / WhatsApp',
      specialRequests: 'Demandes Spéciales',
      specialPlaceholder: 'Restrictions alimentaires, besoins d\'accessibilité, etc.',
      continue: 'Continuer',
      back: 'Retour',
      payNow: 'Payer Maintenant',
      total: 'Total',
      perPerson: 'par personne',
    },

    // Payment
    payment: {
      title: 'Paiement Sécurisé',
      cardNumber: 'Numéro de Carte',
      expiry: 'Date d\'Expiration',
      cvc: 'CVC',
      payWith: 'Payer avec',
      processing: 'Traitement en cours...',
      success: 'Paiement Réussi !',
      confirmationNumber: 'Numéro de Confirmation',
      emailSent: 'Un email de confirmation a été envoyé à',
      downloadConfirmation: 'Télécharger la Confirmation',
      print: 'Imprimer',
      bookAnother: 'Réserver une Autre Expérience',
    },

    // Cancellation Policy
    cancellation: {
      title: 'Politique d\'Annulation',
      free: 'Annulation gratuite jusqu\'à 24h avant',
      noRefund: 'Pas de remboursement dans les 24h',
      weather: 'Annulation météo : report ou remboursement complet',
    },

    // About Page
    about: {
      title: 'À Propos',
      story: 'Notre Histoire',
      storyText: 'Situé au cœur de Roaring River, dans la paroisse de Westmoreland, notre village de 500 habitants vous accueille pour vivre la culture Rastafari authentique.',
      culture: 'Culture Rastafari',
      cultureText: 'Découvrez l\'histoire, les croyances et les cérémonies qui ont fait de ce mode de vie un phénomène reconnu et adopté dans le monde entier.',
      team: 'Notre Équipe',
      teamText: 'Nos guides locaux certifiés et nos cuisiniers traditionnels partagent leurs connaissances et leur passion avec chaque visiteur.',
      recognition: 'Reconnaissance',
      recognitionText: 'Classé dans le Top 1% des attractions mondiales sur TripAdvisor avec plus de 2 142 avis.',
    },

    // Contact Page
    contact: {
      title: 'Contactez-Nous',
      getInTouch: 'Nous Contacter',
      phone: 'Téléphone',
      whatsapp: 'WhatsApp',
      email: 'Email',
      address: 'Adresse',
      addressValue: 'Roaring River, Westmoreland Parish, Jamaïque',
      sendMessage: 'Envoyer un Message',
      subject: 'Sujet',
      subjectOptions: {
        general: 'Question Générale',
        booking: 'Demande de Réservation',
        group: 'Groupe Privé',
        partnership: 'Partenariat',
      },
      message: 'Message',
      send: 'Envoyer',
      messageSent: 'Message envoyé avec succès !',
    },

    // FAQ
    faq: {
      title: 'Questions Fréquentes',
      categories: {
        booking: 'Réservation',
        experience: 'L\'Expérience',
        logistics: 'Logistique',
        food: 'Nourriture',
      },
      questions: {
        howToBook: 'Comment réserver ?',
        howToBookAnswer: 'Vous pouvez réserver en ligne sur notre site ou nous appeler au 876-445-7203.',
        price: 'Quel est le prix ?',
        priceAnswer: '165 $ USD par personne, tout inclus.',
        cancellation: 'Quelle est la politique d\'annulation ?',
        cancellationAnswer: 'Annulation gratuite plus de 24h avant. Pas de remboursement dans les 24h.',
        payment: 'Quels modes de paiement acceptez-vous ?',
        paymentAnswer: 'Nous acceptons les cartes de crédit (Stripe) et PayPal.',
        duration: 'Combien de temps dure l\'expérience ?',
        durationAnswer: '3h30-4h (4-5h avec le transport).',
        minAge: 'Quel est l\'âge minimum ?',
        minAgeAnswer: '4 ans. Les enfants de moins de 4 ans sont gratuits.',
        driving: 'Faut-il savoir conduire ?',
        drivingAnswer: 'Non, nos guides conduisent les VTT.',
        whatToBring: 'Que dois-je apporter ?',
        whatToBringAnswer: 'Vêtements confortables, maillot de bain, crème solaire et un esprit d\'aventure !',
        food: 'Quel type de nourriture est servi ?',
        foodAnswer: 'Cuisine Ital traditionnelle - repas bio végétarien/végan.',
        allergies: 'Pouvez-vous accommoder les allergies ?',
        allergiesAnswer: 'Oui, veuillez nous informer à l\'avance de toute restriction alimentaire.',
      },
    },

    // Reviews
    reviews: {
      title: 'Ce Que Disent Nos Clients',
      rating: 'note',
      reviews: 'avis',
      basedOn: 'Basé sur',
      verifiedReview: 'Avis Vérifié',
      sources: {
        tripadvisor: 'TripAdvisor',
        viator: 'Viator',
        google: 'Google',
      },
    },

    // Footer
    footer: {
      description: 'Vivez la culture Rastafari authentique au cœur de la Jamaïque.',
      quickLinks: 'Liens Rapides',
      contact: 'Contact',
      followUs: 'Suivez-Nous',
      copyright: '© 2024 Rastasafari Experience. Tous droits réservés.',
    },

    // Common
    common: {
      loading: 'Chargement...',
      error: 'Une erreur s\'est produite',
      tryAgain: 'Réessayer',
      close: 'Fermer',
      yes: 'Oui',
      no: 'Non',
      available: 'Disponible',
      soldOut: 'Complet',
      limited: 'Places limitées',
      included: 'Inclus',
      learnMore: 'En Savoir Plus',
      viewAll: 'Voir Tout',
      getDirections: 'Obtenir l\'Itinéraire',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof value === 'string' ? value : key;
}

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'fr'];
