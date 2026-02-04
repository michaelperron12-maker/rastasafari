# Plan Complet - Rastasafari Experience Jamaica
## Site Web Transactionnel

**Version:** 1.0
**Date:** 3 février 2026
**Projet:** Plateforme de réservation d'expériences touristiques en Jamaïque

---

# Table des Matières

1. [Architecture du Site](#1-architecture-du-site)
2. [Fonctionnalités Clés](#2-fonctionnalités-clés)
3. [Intégrations API](#3-intégrations-api)
4. [Design et Branding](#4-design-et-branding)
5. [SEO et Marketing](#5-seo-et-marketing)
6. [Stack Technologique](#6-stack-technologique)
7. [Phases de Développement](#7-phases-de-développement)
8. [Budget Estimatif](#8-budget-estimatif)
9. [Annexes](#9-annexes)

---

# 1. Architecture du Site

## 1.1 Pages Principales

### Page d'Accueil (/)
- Hero section avec vidéo/slider immersif des expériences jamaïcaines
- Barre de recherche rapide (date, type d'expérience, nombre de personnes)
- Section "Expériences Populaires" (carrousel)
- Témoignages clients (intégration TripAdvisor)
- Section "Pourquoi Rastasafari" (valeurs, authenticité)
- Widget météo en temps réel
- Appel à l'action (CTA) pour réservation
- Newsletter signup

### Page Expériences (/experiences)
- Filtres avancés (catégorie, prix, durée, localisation)
- Grille/Liste des expériences avec cards
- Pagination ou infinite scroll
- Carte interactive Google Maps
- Tri (prix, popularité, durée)

### Page Détail Expérience (/experiences/[slug])
- Galerie photos/vidéos
- Description complète
- Informations pratiques (durée, inclus, à apporter)
- Calendrier de disponibilité
- Sélection date/heure/participants
- Prix dynamique
- Avis et notes
- Expériences similaires
- Bouton "Réserver maintenant"

### Page Réservation (/booking)
- Étape 1: Récapitulatif de la sélection
- Étape 2: Informations personnelles
- Étape 3: Options supplémentaires (transport, repas)
- Étape 4: Paiement sécurisé
- Étape 5: Confirmation

### Page À Propos (/about)
- Histoire de Rastasafari
- Notre équipe / Nos guides
- Notre philosophie (tourisme responsable)
- Certifications et partenaires
- Galerie photos de l'équipe

### Page Contact (/contact)
- Formulaire de contact
- Informations de contact (téléphone, email, WhatsApp)
- Google Maps avec localisation
- FAQ rapide
- Heures d'ouverture
- Liens réseaux sociaux

### Blog (/blog)
- Articles sur la Jamaïque
- Conseils de voyage
- Culture rastafari
- Catégories et tags
- Recherche d'articles
- Partage social

### Pages Légales
- Conditions générales (/terms)
- Politique de confidentialité (/privacy)
- Politique d'annulation (/cancellation-policy)

### Espace Client (/account)
- Tableau de bord
- Mes réservations
- Historique
- Profil et préférences
- Wishlist

## 1.2 Structure de Navigation

```
HEADER (fixe)
├── Logo Rastasafari (lien accueil)
├── Navigation principale
│   ├── Expériences (mega menu avec catégories)
│   │   ├── Tours culturels
│   │   ├── Aventures nature
│   │   ├── Expériences culinaires
│   │   ├── Musique & Art
│   │   └── Toutes les expériences
│   ├── À Propos
│   ├── Blog
│   └── Contact
├── Sélecteur de langue (EN/FR/ES)
├── Recherche (icône)
└── Compte / Panier
    ├── Connexion
    ├── Inscription
    └── Mon compte (si connecté)

FOOTER
├── Colonnes info
│   ├── À propos (liens rapides)
│   ├── Expériences (catégories)
│   ├── Support (FAQ, Contact)
│   └── Légal (CGV, Confidentialité)
├── Newsletter signup
├── Réseaux sociaux
├── Certifications/badges sécurité
└── Copyright
```

## 1.3 Wireframes Conceptuels

### Wireframe - Page d'Accueil
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Logo | Nav | Lang | Search | Account               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │              HERO VIDEO/SLIDER                      │   │
│  │         "Vivez la Jamaïque Authentique"             │   │
│  │                                                     │   │
│  │    [Date] [Type] [Personnes] [RECHERCHER]          │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─────────── EXPÉRIENCES POPULAIRES ───────────            │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐             │
│  │ Img │  │ Img │  │ Img │  │ Img │  │ Img │             │
│  │Titre│  │Titre│  │Titre│  │Titre│  │Titre│             │
│  │Prix │  │Prix │  │Prix │  │Prix │  │Prix │             │
│  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘             │
│                    < ● ● ● >                               │
│                                                             │
│  ─────────── POURQUOI RASTASAFARI ───────────              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │  Icône   │  │  Icône   │  │  Icône   │                 │
│  │Authentiq │  │ Guides   │  │ Tourisme │                 │
│  │  ité     │  │ Locaux   │  │Responsabl│                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                             │
│  ─────────────── TÉMOIGNAGES ────────────────              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ★★★★★  "Meilleure expérience de ma vie!"          │   │
│  │  - Marie, France        [TripAdvisor Logo]          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─────────────── MÉTÉO LOCALE ───────────────              │
│  ┌───────────────────────────────────────┐                 │
│  │ ☀️ Kingston: 28°C | Montego Bay: 30°C │                 │
│  └───────────────────────────────────────┘                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  FOOTER: Links | Newsletter | Social | Legal                │
└─────────────────────────────────────────────────────────────┘
```

### Wireframe - Page Expérience Détail
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                     │
├─────────────────────────────────────────────────────────────┤
│  Breadcrumb: Accueil > Expériences > Culture > Bob Marley   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  │
│  │                         │  │                         │  │
│  │    GALERIE PRINCIPALE   │  │    CARTE RÉSERVATION    │  │
│  │                         │  │  ┌─────────────────┐    │  │
│  │   [img] [img] [img]     │  │  │  À partir de    │    │  │
│  │                         │  │  │  $89 / personne │    │  │
│  └─────────────────────────┘  │  ├─────────────────┤    │  │
│                                │  │  Date: [____]   │    │  │
│  Titre de l'expérience         │  │  Heure: [____]  │    │  │
│  ★★★★★ (127 avis)              │  │  Pers: [- 2 +]  │    │  │
│  Durée: 4h | Difficulté: Facile│  ├─────────────────┤    │  │
│                                │  │  Total: $178    │    │  │
│  ─── Description ───           │  │  [RÉSERVER]     │    │  │
│  Lorem ipsum dolor sit amet... │  └─────────────────┘    │  │
│                                │                         │  │
│  ─── Ce qui est inclus ───     │  ┌─────────────────┐    │  │
│  ✓ Transport                   │  │ Garantie        │    │  │
│  ✓ Guide local                 │  │ Annulation 24h  │    │  │
│  ✓ Déjeuner                    │  └─────────────────┘    │  │
│                                └─────────────────────────┘  │
│  ─── Calendrier disponibilité ───                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  < Février 2026 >                                   │   │
│  │  L  M  M  J  V  S  D                                │   │
│  │  ●  ●  ●  ●  ●  ●  ●   (● = disponible)            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─── Avis clients ───                                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ★★★★★ "Incroyable!" - Jean, 15 jan 2026            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ─── Expériences similaires ───                            │
│  ┌─────┐  ┌─────┐  ┌─────┐                                │
│  │     │  │     │  │     │                                │
│  └─────┘  └─────┘  └─────┘                                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Wireframe - Processus de Réservation
```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (simplifié - sans nav complète)                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Étapes: [1.Récap] → [2.Infos] → [3.Options] → [4.Paiement]│
│           ●────────○────────○────────○                      │
│                                                             │
│  ┌────────────────────────┐  ┌────────────────────────────┐│
│  │                        │  │                            ││
│  │  FORMULAIRE ÉTAPE      │  │  RÉCAPITULATIF             ││
│  │                        │  │                            ││
│  │  Prénom: [_________]   │  │  Bob Marley Museum Tour    ││
│  │  Nom: [_________]      │  │  Date: 15 Fév 2026         ││
│  │  Email: [_________]    │  │  Heure: 10:00              ││
│  │  Tél: [_________]      │  │  2 adultes × $89 = $178    ││
│  │  Pays: [_________]     │  │  ─────────────────────     ││
│  │                        │  │  Sous-total: $178          ││
│  │  □ Newsletter          │  │  Frais service: $5         ││
│  │  □ CGV acceptées       │  │  ─────────────────────     ││
│  │                        │  │  TOTAL: $183 USD           ││
│  │  [PRÉCÉDENT] [SUIVANT] │  │                            ││
│  │                        │  │  🔒 Paiement sécurisé      ││
│  └────────────────────────┘  └────────────────────────────┘│
│                                                             │
│  Besoin d'aide? [Chat] [WhatsApp] [Téléphone]              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  FOOTER (simplifié)                                         │
└─────────────────────────────────────────────────────────────┘
```

---

# 2. Fonctionnalités Clés

## 2.1 Système de Réservation en Ligne

### Calendrier de Disponibilité
- Affichage mensuel avec jours disponibles/complets/fermés
- Créneaux horaires multiples par jour
- Gestion des capacités (max participants par créneau)
- Blocage automatique quand complet
- Synchronisation temps réel

### Processus de Réservation (5 étapes)

**Étape 1 - Sélection**
- Choix de la date via calendrier interactif
- Sélection du créneau horaire
- Nombre de participants (adultes, enfants)
- Calcul automatique du prix

**Étape 2 - Informations Client**
- Formulaire: nom, prénom, email, téléphone
- Pays de résidence
- Besoins spéciaux (allergies, mobilité réduite)
- Création de compte optionnelle

**Étape 3 - Options Supplémentaires**
- Transport hôtel (avec adresse pickup)
- Repas spéciaux (végétarien, vegan, halal)
- Assurance annulation
- Souvenirs/photos professionnelles

**Étape 4 - Paiement**
- Récapitulatif complet
- Choix mode de paiement
- Formulaire carte ou redirection PayPal
- Code promo
- Acceptation CGV

**Étape 5 - Confirmation**
- Message de succès
- Numéro de réservation
- Récapitulatif envoyé par email
- Options: ajouter au calendrier, partager

### Gestion des Disponibilités (Backend Admin)
- Dashboard calendrier global
- Configuration capacités par expérience
- Blocage de dates (maintenance, jours fériés)
- Gestion des guides assignés
- Overbooking contrôlé (liste d'attente)

## 2.2 Système de Paiement Sécurisé

### Stripe (Principal)
- Paiement par carte (Visa, Mastercard, Amex)
- Apple Pay / Google Pay
- Paiement en plusieurs fois (Klarna)
- Gestion des remboursements
- Webhooks pour confirmation
- 3D Secure 2.0

### PayPal (Alternatif)
- Paiement compte PayPal
- Pay Later options
- Protection acheteur
- Checkout express

### Sécurité
- Conformité PCI DSS
- Tokenisation des cartes
- Chiffrement SSL/TLS
- Détection fraude

### Devises
- USD (principale)
- EUR, GBP, CAD (conversion automatique)
- Affichage prix dans devise locale

## 2.3 Confirmations et Notifications

### Email (SendGrid/Mailgun)
- Confirmation de réservation (immédiate)
- Rappel J-7 avec météo et conseils
- Rappel J-1 avec point de rendez-vous
- Demande d'avis post-expérience (J+1)
- Templates HTML responsive

### SMS (Twilio)
- Confirmation courte avec code
- Rappel J-1
- Changements de dernière minute
- Support opt-in/opt-out

### WhatsApp Business API
- Confirmation interactive
- Support client
- Partage de localisation guide
- Envoi photos après expérience

## 2.4 Fonctionnalités Utilisateur

### Compte Client
- Inscription (email ou social login)
- Profil avec préférences
- Historique des réservations
- Wishlist d'expériences
- Points fidélité
- Parrainage

### Recherche et Filtres
- Recherche textuelle
- Filtres: catégorie, prix, durée, difficulté
- Tri: popularité, prix, notes
- Sauvegarde des recherches

### Avis et Notes
- Système 5 étoiles
- Avis textuels avec modération
- Photos uploadées par clients
- Réponses du propriétaire
- Agrégation TripAdvisor

## 2.5 Fonctionnalités Admin

### Dashboard
- Vue d'ensemble des réservations
- Chiffre d'affaires temps réel
- Graphiques et statistiques
- Alertes et notifications

### Gestion des Expériences
- CRUD complet
- Upload médias
- Pricing dynamique
- Promotions et codes promo

### Gestion des Réservations
- Liste avec filtres
- Modification/annulation
- Check-in/check-out
- Notes internes

### Gestion des Clients
- Base de données clients
- Historique par client
- Segmentation
- Export données

---

# 3. Intégrations API

## 3.1 API de Réservation

### Option Recommandée: Rezdy
**Pourquoi Rezdy:**
- Spécialisé tours et activités
- API REST complète
- Widget de réservation embedable
- Channel manager (Viator, GetYourGuide)
- À partir de $49/mois

```javascript
// Exemple intégration Rezdy
const RezdyAPI = {
  baseURL: 'https://api.rezdy.com/v1',

  // Récupérer les disponibilités
  getAvailability: async (productCode, startDate, endDate) => {
    return fetch(`${baseURL}/availability?productCode=${productCode}&startTime=${startDate}&endTime=${endDate}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
  },

  // Créer une réservation
  createBooking: async (bookingData) => {
    return fetch(`${baseURL}/bookings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });
  }
};
```

### Alternatives

**FareHarbor**
- Leader du marché US
- Intégration OTA automatique
- Support technique excellent
- Commission-based (pas d'abonnement)

**Checkfront**
- Solution tout-en-un
- Personnalisation avancée
- À partir de $49/mois
- API bien documentée

**Bokun (by TripAdvisor)**
- Intégration native Viator
- Channel manager puissant
- Freemium disponible

## 3.2 API de Paiement

### Stripe Integration
```javascript
// stripe-config.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Créer une session de paiement
export async function createCheckoutSession(booking) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: booking.experienceName,
          images: [booking.imageUrl],
        },
        unit_amount: booking.priceInCents,
      },
      quantity: booking.participants,
    }],
    mode: 'payment',
    success_url: `${DOMAIN}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${DOMAIN}/booking/cancel`,
    metadata: {
      bookingId: booking.id,
      experienceId: booking.experienceId,
    }
  });

  return session;
}

// Webhook pour confirmation
export async function handleStripeWebhook(event) {
  switch (event.type) {
    case 'checkout.session.completed':
      await confirmBooking(event.data.object.metadata.bookingId);
      break;
    case 'payment_intent.payment_failed':
      await handlePaymentFailure(event.data.object);
      break;
  }
}
```

### PayPal Integration
```javascript
// paypal-config.js
import paypal from '@paypal/checkout-server-sdk';

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

export async function createPayPalOrder(booking) {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: booking.totalPrice.toString()
      },
      description: booking.experienceName
    }]
  });

  const response = await client.execute(request);
  return response.result;
}
```

## 3.3 API d'Avis

### TripAdvisor Content API
```javascript
// tripadvisor-integration.js
const TRIPADVISOR_KEY = process.env.TRIPADVISOR_API_KEY;

export async function getLocationReviews(locationId) {
  const response = await fetch(
    `https://api.tripadvisor.com/api/partner/2.0/location/${locationId}/reviews?key=${TRIPADVISOR_KEY}`
  );
  return response.json();
}

export async function getLocationDetails(locationId) {
  const response = await fetch(
    `https://api.tripadvisor.com/api/partner/2.0/location/${locationId}?key=${TRIPADVISOR_KEY}`
  );
  return response.json();
}
```

### Google Places API (Reviews)
```javascript
// google-reviews.js
export async function getGoogleReviews(placeId) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_API_KEY}`
  );
  const data = await response.json();
  return data.result;
}
```

## 3.4 API Météo

### OpenWeatherMap (Recommandé)
```javascript
// weather-api.js
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Coordonnées des principales villes jamaïcaines
const LOCATIONS = {
  kingston: { lat: 18.0179, lon: -76.8099 },
  montegoBay: { lat: 18.4762, lon: -77.8939 },
  ochoRios: { lat: 18.4074, lon: -77.1025 },
  negril: { lat: 18.2683, lon: -78.3496 }
};

export async function getCurrentWeather(location) {
  const { lat, lon } = LOCATIONS[location];
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
  );
  return response.json();
}

export async function getWeatherForecast(location, days = 5) {
  const { lat, lon } = LOCATIONS[location];
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=${days * 8}&appid=${WEATHER_API_KEY}`
  );
  return response.json();
}
```

## 3.5 Google Maps

### Places et Directions
```javascript
// google-maps-config.js
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  version: 'weekly',
  libraries: ['places', 'directions']
});

// Composant React pour la carte
export function ExperienceMap({ experiences }) {
  useEffect(() => {
    loader.load().then((google) => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 18.1096, lng: -77.2975 }, // Centre Jamaïque
        zoom: 9,
        styles: customMapStyles // Style personnalisé
      });

      experiences.forEach(exp => {
        new google.maps.Marker({
          position: { lat: exp.lat, lng: exp.lng },
          map,
          title: exp.name,
          icon: customMarkerIcon
        });
      });
    });
  }, [experiences]);

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
}
```

## 3.6 Autres Intégrations

### SendGrid (Emails)
```javascript
// email-service.js
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendBookingConfirmation(booking, customer) {
  const msg = {
    to: customer.email,
    from: 'bookings@rastasafari.com',
    templateId: 'd-booking-confirmation-template',
    dynamicTemplateData: {
      customerName: customer.firstName,
      bookingRef: booking.reference,
      experienceName: booking.experience.name,
      date: formatDate(booking.date),
      time: booking.time,
      participants: booking.participants,
      totalPrice: formatCurrency(booking.total),
      meetingPoint: booking.experience.meetingPoint
    }
  };

  await sgMail.send(msg);
}
```

### Twilio (SMS)
```javascript
// sms-service.js
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendBookingReminder(booking, customer) {
  await client.messages.create({
    body: `Rappel Rastasafari: Votre expérience "${booking.experienceName}" est demain à ${booking.time}. RDV: ${booking.meetingPoint}. Code: ${booking.reference}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: customer.phone
  });
}
```

### Google Analytics 4
```javascript
// analytics.js
export function trackBookingStarted(experience) {
  gtag('event', 'begin_checkout', {
    currency: 'USD',
    value: experience.price,
    items: [{
      item_id: experience.id,
      item_name: experience.name,
      item_category: experience.category,
      price: experience.price
    }]
  });
}

export function trackBookingCompleted(booking) {
  gtag('event', 'purchase', {
    transaction_id: booking.reference,
    value: booking.total,
    currency: 'USD',
    items: booking.items
  });
}
```

---

# 4. Design et Branding

## 4.1 Palette de Couleurs

### Couleurs Principales (Thème Rasta/Jamaïcain)
```css
:root {
  /* Couleurs Rasta */
  --rasta-red: #E31C23;      /* Rouge - Sang des martyrs */
  --rasta-gold: #FED100;     /* Or/Jaune - Richesse de l'Afrique */
  --rasta-green: #009B3A;    /* Vert - Végétation, espoir */
  --rasta-black: #1A1A1A;    /* Noir - Peuple africain */

  /* Couleurs d'Accent */
  --ocean-blue: #0077B6;     /* Bleu caraïbes */
  --sunset-orange: #F77F00;  /* Orange coucher de soleil */
  --palm-green: #2D6A4F;     /* Vert palmier */

  /* Neutres */
  --white: #FFFFFF;
  --off-white: #F8F9FA;
  --light-gray: #E9ECEF;
  --medium-gray: #6C757D;
  --dark-gray: #343A40;
  --black: #212529;

  /* Fonctionnels */
  --success: #28A745;
  --warning: #FFC107;
  --error: #DC3545;
  --info: #17A2B8;
}
```

### Utilisation des Couleurs
| Élément | Couleur | Code |
|---------|---------|------|
| Boutons principaux | Vert Rasta | #009B3A |
| Boutons secondaires | Or/Jaune | #FED100 |
| Accents/Hover | Rouge Rasta | #E31C23 |
| Texte principal | Noir | #212529 |
| Texte secondaire | Gris moyen | #6C757D |
| Fond de page | Blanc cassé | #F8F9FA |
| Cards | Blanc | #FFFFFF |
| Footer | Noir Rasta | #1A1A1A |

### Dégradés
```css
/* Dégradé Hero */
.hero-gradient {
  background: linear-gradient(135deg, #009B3A 0%, #FED100 50%, #E31C23 100%);
}

/* Dégradé Overlay (sur images) */
.image-overlay {
  background: linear-gradient(to bottom,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.7) 100%
  );
}

/* Dégradé Bouton */
.btn-gradient {
  background: linear-gradient(90deg, #009B3A 0%, #2D6A4F 100%);
}
```

## 4.2 Typographie

### Polices Recommandées

**Titres: Montserrat**
- Moderne, lisible, caractère fort
- Weights: 600 (Semi-Bold), 700 (Bold)
- Alternative: Poppins

**Corps de texte: Open Sans**
- Excellente lisibilité écran
- Weights: 400 (Regular), 600 (Semi-Bold)
- Alternative: Lato

**Accent (optionnel): Satisfy**
- Pour éléments décoratifs
- Style script/manuscrit
- Utilisation limitée (slogans, citations)

```css
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Open+Sans:wght@400;600&family=Satisfy&display=swap');

/* Hiérarchie typographique */
:root {
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Open Sans', sans-serif;
  --font-accent: 'Satisfy', cursive;
}

h1 {
  font-family: var(--font-heading);
  font-size: 3rem;      /* 48px */
  font-weight: 800;
  line-height: 1.2;
}

h2 {
  font-family: var(--font-heading);
  font-size: 2.25rem;   /* 36px */
  font-weight: 700;
  line-height: 1.3;
}

h3 {
  font-family: var(--font-heading);
  font-size: 1.5rem;    /* 24px */
  font-weight: 600;
  line-height: 1.4;
}

body {
  font-family: var(--font-body);
  font-size: 1rem;      /* 16px */
  font-weight: 400;
  line-height: 1.6;
}

.accent-text {
  font-family: var(--font-accent);
  font-size: 1.5rem;
}
```

## 4.3 Style Visuel

### Principes de Design
1. **Immersif** - Photos plein écran, vidéos d'ambiance
2. **Chaleureux** - Couleurs vives, visuels ensoleillés
3. **Authentique** - Photos réelles, pas de stock générique
4. **Accessible** - Contrastes suffisants, taille de texte adaptée
5. **Mobile-first** - Design responsive prioritaire

### Éléments UI

**Boutons**
```css
.btn-primary {
  background-color: var(--rasta-green);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 155, 58, 0.25);
}

.btn-primary:hover {
  background-color: #007A2E;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 155, 58, 0.35);
}

.btn-secondary {
  background-color: var(--rasta-gold);
  color: var(--black);
  /* ... mêmes propriétés */
}
```

**Cards (Expériences)**
```css
.experience-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.experience-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.experience-card__image {
  aspect-ratio: 16/10;
  object-fit: cover;
}

.experience-card__badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--rasta-gold);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
```

**Formulaires**
```css
.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid var(--light-gray);
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--rasta-green);
  box-shadow: 0 0 0 3px rgba(0, 155, 58, 0.1);
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: var(--dark-gray);
}
```

### Iconographie
- Style: Outlined / Linear
- Bibliothèque recommandée: Lucide Icons ou Heroicons
- Taille standard: 24px
- Couleur: Hérite du texte ou vert rasta pour accent

### Photographie
- Style: Lumineux, saturé naturellement
- Sujets: Personnes locales, paysages, culture
- Éviter: Photos stock génériques, filtres excessifs
- Format: WebP pour performance, JPEG fallback

---

# 5. SEO et Marketing

## 5.1 Stratégie de Mots-Clés

### Mots-Clés Principaux (High Volume)
| Mot-clé | Volume mensuel | Difficulté | Intent |
|---------|----------------|------------|--------|
| jamaica tours | 12,000 | Haute | Transactionnel |
| things to do in jamaica | 33,000 | Haute | Informationnel |
| jamaica excursions | 6,600 | Moyenne | Transactionnel |
| bob marley tour jamaica | 2,900 | Moyenne | Transactionnel |
| jamaica adventure tours | 1,900 | Moyenne | Transactionnel |

### Mots-Clés Longue Traîne (Conversion élevée)
| Mot-clé | Volume | Difficulté |
|---------|--------|------------|
| authentic jamaica experience | 720 | Basse |
| rastafari village tour jamaica | 390 | Basse |
| blue mountain coffee tour | 880 | Moyenne |
| dunn's river falls tour from montego bay | 1,300 | Moyenne |
| private tour guide jamaica | 590 | Basse |
| jamaica cultural tours | 480 | Basse |
| reggae music tour jamaica | 320 | Basse |

### Structure SEO par Page

**Page Accueil**
- Title: "Rastasafari Experience Jamaica | Authentic Tours & Cultural Experiences"
- Meta: "Discover the real Jamaica with Rastasafari. Book authentic cultural tours, adventure experiences, and reggae heritage trips. Local guides, unforgettable memories."
- H1: "Experience Authentic Jamaica"

**Pages Catégories**
- /experiences/cultural-tours
  - Title: "Cultural Tours Jamaica | Rastafari Villages & Local Experiences"
- /experiences/adventure
  - Title: "Jamaica Adventure Tours | Waterfalls, Mountains & Nature"
- /experiences/food-tours
  - Title: "Jamaica Food Tours | Authentic Jerk, Rum Tasting & Cooking Classes"

**Pages Expériences (exemple)**
- /experiences/bob-marley-museum-tour
  - Title: "Bob Marley Museum Tour Kingston | Reggae Legend Experience"
  - H1: "Bob Marley Museum Tour"
  - Schema: TouristAttraction, Product

## 5.2 SEO Technique

### Structure URL
```
https://rastasafari.com/                          # Accueil
https://rastasafari.com/experiences/              # Liste expériences
https://rastasafari.com/experiences/cultural/     # Catégorie
https://rastasafari.com/experiences/bob-marley-tour  # Expérience
https://rastasafari.com/blog/                     # Blog
https://rastasafari.com/blog/best-jamaican-food   # Article
```

### Schema Markup (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Bob Marley Museum Tour",
  "description": "Visit the legendary Bob Marley Museum in Kingston...",
  "image": "https://rastasafari.com/images/bob-marley-tour.jpg",
  "touristType": "Cultural Tourism",
  "offers": {
    "@type": "Offer",
    "price": "89",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "provider": {
    "@type": "TourOrganization",
    "name": "Rastasafari Experience Jamaica",
    "url": "https://rastasafari.com"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  }
}
```

### Performance SEO
- Core Web Vitals optimisés (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Images WebP avec lazy loading
- Preload fonts critiques
- Cache CDN (Cloudflare/Vercel Edge)

## 5.3 Intégration Réseaux Sociaux

### Plateformes Prioritaires
1. **Instagram** - Photos/Reels expériences (audience principale)
2. **Facebook** - Communauté, avis, événements
3. **TikTok** - Vidéos courtes, viralité
4. **YouTube** - Vidéos longues, vlogs clients
5. **Pinterest** - Inspiration voyage

### Fonctionnalités Site
- Boutons partage sur chaque expérience
- Feed Instagram intégré sur accueil
- Login social (Facebook, Google)
- Pixels tracking (Meta, TikTok)
- Open Graph tags optimisés

```html
<!-- Open Graph -->
<meta property="og:title" content="Bob Marley Museum Tour | Rastasafari" />
<meta property="og:description" content="Walk in the footsteps of the reggae legend..." />
<meta property="og:image" content="https://rastasafari.com/og/bob-marley-tour.jpg" />
<meta property="og:url" content="https://rastasafari.com/experiences/bob-marley-tour" />
<meta property="og:type" content="product" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@rastasafari" />
```

## 5.4 Stratégie de Contenu Blog

### Catégories
1. **Guides de Voyage** - Pratique, conseils
2. **Culture Jamaïcaine** - Rastafari, musique, histoire
3. **Gastronomie** - Recettes, restaurants, spécialités
4. **Nature & Aventure** - Randonnées, plages, faune
5. **Événements** - Festivals, concerts, actualités

### Calendrier Éditorial (Exemple mensuel)
| Semaine | Article | Mots-clés cibles |
|---------|---------|------------------|
| 1 | "10 Must-Try Jamaican Dishes" | jamaican food, jerk chicken |
| 2 | "Complete Guide to Blue Mountains" | blue mountain jamaica, hiking |
| 3 | "History of Rastafari Movement" | rastafari culture, reggae history |
| 4 | "Best Beaches Near Montego Bay" | montego bay beaches, jamaica beach |

### KPIs Blog
- 8 articles/mois minimum
- Objectif: 10,000 visiteurs organiques/mois (Y1)
- Conversion blog vers réservation: 2%

---

# 6. Stack Technologique

## 6.1 Architecture Globale

```
┌─────────────────────────────────────────────────────────────────┐
│                         UTILISATEURS                            │
│                    (Web / Mobile / Tablet)                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CDN (Cloudflare/Vercel)                    │
│              Cache, DDoS Protection, Edge Functions             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 14+)                       │
│        React, TypeScript, Tailwind CSS, Framer Motion           │
│                     Vercel Hosting (Edge)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       API LAYER (REST/GraphQL)                  │
│                    Next.js API Routes / tRPC                    │
└─────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   DATABASE      │  │  EXTERNAL APIs  │  │   SERVICES      │
│   (PostgreSQL)  │  │  Stripe, PayPal │  │  SendGrid       │
│   Supabase /    │  │  Rezdy          │  │  Twilio         │
│   PlanetScale   │  │  Google Maps    │  │  Cloudinary     │
└─────────────────┘  │  OpenWeather    │  └─────────────────┘
                     │  TripAdvisor    │
                     └─────────────────┘
```

## 6.2 Frontend

### Framework: Next.js 14+ (App Router)
**Justification:**
- SSR/SSG pour SEO optimal
- React Server Components
- Image optimization native
- API routes intégrées
- Déploiement Vercel optimisé
- Communauté active, documentation excellente

### Stack Frontend Détaillé
```json
{
  "framework": "next@14.x",
  "language": "typescript@5.x",
  "styling": {
    "primary": "tailwindcss@3.x",
    "components": "shadcn/ui",
    "animations": "framer-motion@10.x"
  },
  "state": {
    "client": "zustand@4.x",
    "server": "tanstack-query@5.x"
  },
  "forms": {
    "validation": "zod@3.x",
    "handling": "react-hook-form@7.x"
  },
  "ui-components": {
    "calendar": "react-day-picker",
    "maps": "@react-google-maps/api",
    "carousel": "embla-carousel-react",
    "toast": "sonner"
  }
}
```

### Structure des Dossiers
```
/app
  /(marketing)
    /page.tsx                 # Accueil
    /about/page.tsx
    /contact/page.tsx
    /blog/[slug]/page.tsx
  /(booking)
    /experiences/page.tsx
    /experiences/[slug]/page.tsx
    /booking/page.tsx
    /booking/success/page.tsx
  /(account)
    /account/page.tsx
    /account/bookings/page.tsx
  /api
    /webhooks/stripe/route.ts
    /bookings/route.ts
/components
  /ui                         # Composants génériques (shadcn)
  /marketing                  # Hero, testimonials, etc.
  /booking                    # Calendar, forms, etc.
  /layout                     # Header, Footer, Nav
/lib
  /api                        # Clients API externes
  /utils                      # Helpers
  /hooks                      # Custom hooks
/styles
  /globals.css
```

## 6.3 Backend / API

### Option A: Next.js API Routes (Recommandé pour MVP)
- Intégré au frontend
- Serverless (Vercel)
- Simplicité de déploiement
- Suffisant pour les besoins initiaux

### Option B: Backend Séparé (Pour scale)
- **Framework:** Node.js avec Fastify ou Hono
- **ORM:** Prisma ou Drizzle
- **Validation:** Zod
- **Auth:** NextAuth.js / Clerk

### Structure API
```typescript
// /app/api/experiences/route.ts
import { db } from '@/lib/db';
import { experienceSchema } from '@/lib/schemas';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const experiences = await db.experience.findMany({
    where: category ? { category } : undefined,
    include: { reviews: true }
  });

  return Response.json(experiences);
}

export async function POST(request: Request) {
  const body = await request.json();
  const validated = experienceSchema.parse(body);

  const experience = await db.experience.create({
    data: validated
  });

  return Response.json(experience, { status: 201 });
}
```

## 6.4 Base de Données

### Recommandation: Supabase (PostgreSQL)
**Avantages:**
- PostgreSQL managé
- Auth intégré
- Storage pour médias
- Realtime subscriptions
- Row Level Security
- Generous free tier
- Dashboard admin

### Alternative: PlanetScale (MySQL)
- Serverless MySQL
- Branching (comme Git)
- Scaling automatique

### Schéma Principal
```sql
-- Expériences
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  category VARCHAR(100),
  duration_minutes INTEGER,
  price_adult DECIMAL(10,2),
  price_child DECIMAL(10,2),
  max_participants INTEGER,
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  meeting_point TEXT,
  what_included TEXT[],
  what_to_bring TEXT[],
  difficulty VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Disponibilités
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID REFERENCES experiences(id),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  spots_available INTEGER NOT NULL,
  spots_booked INTEGER DEFAULT 0,
  price_override DECIMAL(10,2),
  is_blocked BOOLEAN DEFAULT false,
  UNIQUE(experience_id, date, start_time)
);

-- Réservations
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference VARCHAR(20) UNIQUE NOT NULL,
  experience_id UUID REFERENCES experiences(id),
  availability_id UUID REFERENCES availability(id),
  customer_id UUID REFERENCES customers(id),
  adults INTEGER NOT NULL,
  children INTEGER DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_intent_id VARCHAR(255),
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Clients
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(50),
  country VARCHAR(100),
  language VARCHAR(10) DEFAULT 'en',
  marketing_consent BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Avis
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id UUID REFERENCES experiences(id),
  booking_id UUID REFERENCES bookings(id),
  customer_id UUID REFERENCES customers(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 6.5 Services Tiers

| Service | Usage | Coût estimé |
|---------|-------|-------------|
| **Vercel** | Hébergement frontend | $20/mois (Pro) |
| **Supabase** | Base de données | $25/mois (Pro) |
| **Stripe** | Paiements | 2.9% + $0.30/transaction |
| **Cloudinary** | Médias (images/vidéos) | $99/mois |
| **SendGrid** | Emails transactionnels | $19.95/mois |
| **Twilio** | SMS | ~$0.05/SMS |
| **Cloudflare** | CDN/Sécurité | Gratuit (base) |
| **Rezdy** | Système réservation | $49/mois |

### Coût Mensuel Estimé (après lancement)
- Infrastructure: ~$150-200/mois
- Services: ~$150-200/mois
- **Total: ~$300-400/mois** (hors commissions paiement)

## 6.6 Hébergement et Déploiement

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Environnements
- **Development:** localhost:3000
- **Staging:** staging.rastasafari.com
- **Production:** www.rastasafari.com

---

# 7. Phases de Développement

## 7.1 Phase 1: MVP (8-10 semaines)

### Objectif
Site fonctionnel avec réservation et paiement de base.

### Semaines 1-2: Setup & Foundation
- [ ] Configuration projet Next.js + TypeScript
- [ ] Setup Supabase (DB + Auth)
- [ ] Configuration Tailwind + shadcn/ui
- [ ] Création composants de base (Header, Footer, Layout)
- [ ] Setup Git, CI/CD, environnements
- [ ] Configuration domaine et SSL

### Semaines 3-4: Pages Marketing
- [ ] Page d'accueil (Hero, sections, CTA)
- [ ] Page À Propos
- [ ] Page Contact (formulaire + carte)
- [ ] Design responsive mobile
- [ ] SEO de base (meta, sitemap)

### Semaines 5-6: Catalogue Expériences
- [ ] Page liste des expériences
- [ ] Système de filtres et recherche
- [ ] Page détail expérience
- [ ] Galerie photos
- [ ] Intégration Google Maps

### Semaines 7-8: Système de Réservation
- [ ] Calendrier de disponibilités
- [ ] Formulaire de réservation multi-étapes
- [ ] Intégration Stripe Checkout
- [ ] Page confirmation
- [ ] Emails de confirmation (SendGrid)

### Semaines 9-10: Finitions & Launch
- [ ] Tests complets (unitaires, E2E)
- [ ] Optimisation performance
- [ ] Corrections bugs
- [ ] Migration données (expériences)
- [ ] Formation client (admin)
- [ ] **GO LIVE**

### Livrables MVP
- Site web responsive
- 5-10 expériences publiées
- Réservation + paiement Stripe fonctionnel
- Emails automatiques
- Analytics de base

## 7.2 Phase 2: Fonctionnalités Avancées (6-8 semaines)

### Semaines 11-13: Compte Client
- [ ] Inscription / Connexion (email + social)
- [ ] Dashboard client
- [ ] Historique réservations
- [ ] Modification/annulation réservation
- [ ] Wishlist

### Semaines 14-15: Système d'Avis
- [ ] Formulaire d'avis post-expérience
- [ ] Affichage avis sur pages expériences
- [ ] Modération admin
- [ ] Intégration TripAdvisor widgets
- [ ] Email demande d'avis automatique

### Semaines 16-17: Blog & Contenu
- [ ] Section blog (liste + détail)
- [ ] CMS pour articles (Notion ou Sanity)
- [ ] Catégories et tags
- [ ] Recherche articles
- [ ] Partage social

### Semaine 18: Notifications Avancées
- [ ] SMS de rappel (Twilio)
- [ ] WhatsApp Business
- [ ] Notifications push (optionnel)

### Livrables Phase 2
- Espace client complet
- Système d'avis fonctionnel
- Blog avec 10+ articles
- Multi-canal notifications

## 7.3 Phase 3: Optimisation & Scale (4-6 semaines)

### Semaines 19-20: Performance & SEO
- [ ] Audit Lighthouse (objectif: 90+)
- [ ] Optimisation images (WebP, lazy load)
- [ ] Core Web Vitals
- [ ] Schema markup complet
- [ ] Stratégie backlinks

### Semaines 21-22: Fonctionnalités Business
- [ ] Dashboard admin avancé
- [ ] Rapports et analytics
- [ ] Gestion des promotions/codes promo
- [ ] Programme fidélité (basique)
- [ ] Multi-devises

### Semaines 23-24: Intégrations & Automatisation
- [ ] Channel manager (Viator, GetYourGuide)
- [ ] CRM basique
- [ ] Automatisation marketing (drip emails)
- [ ] Chatbot support (Intercom/Crisp)

### Livrables Phase 3
- Performance optimisée
- Admin dashboard complet
- Distribution multi-canal
- Automatisations marketing

## 7.4 Roadmap Future (Post-Launch)

### Trimestre 2
- Application mobile (React Native)
- Multi-langue (ES, DE, FR)
- Guides dashboard
- Gift cards / Vouchers

### Trimestre 3
- Marketplace (autres opérateurs)
- API partenaires
- Packages/combinaisons
- AR/VR previews

### Trimestre 4
- Yield management (prix dynamiques)
- AI recommendations
- Loyalty program avancé
- B2B portal (agences)

---

# 8. Budget Estimatif

## 8.1 Développement

| Phase | Durée | Coût estimé |
|-------|-------|-------------|
| Phase 1 (MVP) | 8-10 sem | $15,000 - $25,000 |
| Phase 2 (Avancé) | 6-8 sem | $10,000 - $18,000 |
| Phase 3 (Optimisation) | 4-6 sem | $8,000 - $12,000 |
| **TOTAL** | 18-24 sem | **$33,000 - $55,000** |

*Note: Estimations basées sur un développeur senior freelance ou petite agence.*

## 8.2 Coûts Récurrents (Mensuel)

| Poste | Coût/mois |
|-------|-----------|
| Hébergement (Vercel Pro) | $20 |
| Base de données (Supabase Pro) | $25 |
| Emails (SendGrid) | $20 |
| SMS (Twilio) | $50 |
| Médias (Cloudinary) | $99 |
| Domaine + DNS | $2 |
| **Sous-total Infrastructure** | **$216** |
| Outils marketing (optionnel) | $100-300 |
| **TOTAL** | **$300-500/mois** |

## 8.3 ROI Estimé

### Hypothèses
- Prix moyen: $100/personne
- Commission plateforme: 15%
- Marge brute: $85/personne
- Visiteurs/mois (Y1): 5,000
- Taux conversion: 2%
- Réservations/mois: 100
- Panier moyen: 2 personnes

### Projection Année 1
- Réservations mensuelles: 100 x 2 = 200 personnes
- Revenu mensuel: 200 x $100 = **$20,000**
- Revenu annuel: **$240,000**
- Coûts tech annuels: ~$5,000
- **ROI développement: 6-8 mois**

---

# 9. Annexes

## 9.1 Checklist de Lancement

### Pré-lancement (J-14)
- [ ] Tests cross-browser (Chrome, Safari, Firefox, Edge)
- [ ] Tests mobile (iOS Safari, Android Chrome)
- [ ] Tests de charge (50+ utilisateurs simultanés)
- [ ] Vérification tous les liens
- [ ] Test parcours réservation complet
- [ ] Test emails (spam check)
- [ ] Backup automatique configuré
- [ ] Monitoring configuré (Sentry, Analytics)
- [ ] SSL vérifié
- [ ] Sitemap soumis à Google

### Lancement (J-Day)
- [ ] DNS propagé
- [ ] Cache CDN warmup
- [ ] Test paiement réel ($1)
- [ ] Annonce réseaux sociaux
- [ ] Email base existante
- [ ] Google Business Profile mis à jour

### Post-lancement (J+7)
- [ ] Monitoring erreurs
- [ ] Analyse premiers feedbacks
- [ ] Ajustements UX si nécessaire
- [ ] Suivi conversions

## 9.2 Ressources Recommandées

### Design
- **Figma** - Design et prototypage
- **Unsplash/Pexels** - Photos libres (complément)
- **Lottie** - Animations légères

### Développement
- **Vercel Documentation** - https://vercel.com/docs
- **Next.js Learn** - https://nextjs.org/learn
- **Supabase Docs** - https://supabase.com/docs
- **Stripe Docs** - https://stripe.com/docs

### SEO & Marketing
- **Ahrefs** - Recherche mots-clés
- **Google Search Console** - Monitoring
- **Hotjar** - Heatmaps comportement

## 9.3 Contacts Utiles

### APIs et Services
- Stripe Support: support@stripe.com
- Supabase: support@supabase.io
- Rezdy: support@rezdy.com

### Certifications Tourisme Jamaïque
- Jamaica Tourist Board: www.visitjamaica.com
- TPDCO (Tourism Product Development): www.tpdco.org

---

## Document Préparé Par

**Rastasafari Experience Jamaica**
Plan de développement web
Version 1.0 - Février 2026

---

*Ce document est confidentiel et destiné uniquement à l'usage interne du projet Rastasafari Experience Jamaica.*
