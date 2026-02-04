# Rastasafari Experience Jamaica

Site web de reservation d'excursions touristiques en Jamaique. Decouvrez des experiences authentiques avec des guides locaux passionnes.

## Stack Technologique

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Langage**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Base de donnees**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentification**: Supabase Auth
- **Paiements**: [Stripe](https://stripe.com/)
- **Email**: SendGrid / Resend
- **Cartes**: Google Maps API
- **Deploiement**: [Vercel](https://vercel.com/)

## Installation

### Prerequis

- Node.js 18.x ou superieur
- npm, yarn ou pnpm
- Compte Supabase
- Compte Stripe
- Cle API Google Maps

### Installation locale

1. Cloner le repository:
```bash
git clone https://github.com/your-username/rastasafari.git
cd rastasafari
```

2. Installer les dependances:
```bash
npm install
```

3. Configurer les variables d'environnement:
```bash
cp .env.example .env.local
```
Puis remplir les valeurs dans `.env.local`

4. Lancer le serveur de developpement:
```bash
npm run dev
```

5. Ouvrir [http://localhost:3000](http://localhost:3000)

## Variables d'environnement requises

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de votre projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cle anonyme Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Cle service role Supabase (serveur uniquement) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Cle publique Stripe |
| `STRIPE_SECRET_KEY` | Cle secrete Stripe (serveur uniquement) |
| `STRIPE_WEBHOOK_SECRET` | Secret webhook Stripe |
| `SENDGRID_API_KEY` | Cle API SendGrid pour les emails |
| `EMAIL_FROM` | Adresse email d'envoi |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Cle API Google Maps |
| `NEXT_PUBLIC_SITE_URL` | URL du site en production |
| `NEXT_PUBLIC_SITE_NAME` | Nom du site |

## Commandes npm

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de developpement |
| `npm run build` | Compile le projet pour la production |
| `npm run start` | Lance le serveur de production |
| `npm run lint` | Analyse le code avec ESLint |

## Deploiement sur Vercel

### Deploiement automatique

1. Connecter votre repository GitHub a Vercel
2. Configurer les variables d'environnement dans les parametres du projet Vercel
3. Chaque push sur `main` declenche un deploiement automatique

### Deploiement manuel

1. Installer Vercel CLI:
```bash
npm i -g vercel
```

2. Se connecter:
```bash
vercel login
```

3. Deployer:
```bash
vercel --prod
```

### Configuration Vercel

Le fichier `vercel.json` est configure pour:
- Framework: Next.js
- Region: `iad1` (US East - Washington D.C.)
- URL de production: `https://rastasafari.vercel.app`

## Structure du projet

```
rastasafari/
├── app/                    # App Router Next.js
│   ├── (marketing)/        # Pages marketing
│   ├── (booking)/          # Pages de reservation
│   ├── api/                # Routes API
│   └── layout.tsx          # Layout principal
├── components/             # Composants React
├── lib/                    # Utilitaires et configurations
├── public/                 # Assets statiques
├── docs/                   # Documentation
└── plan/                   # Plans et specifications
```

## Licence

Tous droits reserves - Rastasafari Experience Jamaica
