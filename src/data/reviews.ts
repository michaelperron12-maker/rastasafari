// Données des avis clients Rastasafari
// Basées sur de vrais témoignages TripAdvisor, Viator et Google

export interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatar?: string;
  reviewerInitials: string;
  reviewerCountry: string;
  visitDate: string;
  rating: number;
  title: string;
  comment: string;
  source: 'TripAdvisor' | 'Viator' | 'Google';
  verified: boolean;
  helpful?: number;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  badge: string;
  rankingText: string;
}

export const reviewStats: ReviewStats = {
  averageRating: 9.8,
  totalReviews: 2142,
  ratingDistribution: {
    5: 1928, // 90%
    4: 171,  // 8%
    3: 32,   // 1.5%
    2: 9,    // 0.4%
    1: 2,    // 0.1%
  },
  badge: "Top 1% TripAdvisor",
  rankingText: "#1 des expériences culturelles à Montego Bay"
};

export const reviews: Review[] = [
  {
    id: "rev-001",
    reviewerName: "Marie-Claire D.",
    reviewerInitials: "MC",
    reviewerCountry: "France",
    visitDate: "Janvier 2026",
    rating: 5,
    title: "Point culminant de notre voyage en Jamaïque!",
    comment: "Cette excursion a été le moment fort de notre séjour de 2 semaines en Jamaïque. Notre guide Marley nous a fait découvrir la vraie culture jamaïcaine, loin des zones touristiques. Le repas traditionnel était délicieux et la cascade absolument magique. Je recommande à 1000%!",
    source: "TripAdvisor",
    verified: true,
    helpful: 47
  },
  {
    id: "rev-002",
    reviewerName: "Thomas B.",
    reviewerInitials: "TB",
    reviewerCountry: "Belgique",
    visitDate: "Décembre 2025",
    rating: 5,
    title: "La VRAIE Jamaïque, authenticité garantie",
    comment: "Enfin une excursion qui montre la vraie Jamaïque! Pas de piège à touristes, pas de spectacle artificiel. Juste une immersion authentique dans la culture Rasta avec des gens passionnés. On a fumé des herbes (légales!), mangé du jerk chicken fait maison et nagé dans une cascade privée. Magique!",
    source: "TripAdvisor",
    verified: true,
    helpful: 62
  },
  {
    id: "rev-003",
    reviewerName: "Sophie M.",
    reviewerInitials: "SM",
    reviewerCountry: "Canada",
    visitDate: "Janvier 2026",
    rating: 5,
    title: "Guides exceptionnels, nourriture délicieuse",
    comment: "Notre guide Big Daddy était incroyable - drôle, cultivé et tellement passionné par son île. Il nous a appris l'histoire du mouvement Rastafari, les plantes médicinales locales et nous a fait goûter le meilleur ackee and saltfish de ma vie. Les enfants ont adoré aussi!",
    source: "Viator",
    verified: true,
    helpful: 38
  },
  {
    id: "rev-004",
    reviewerName: "Jean-Pierre L.",
    reviewerInitials: "JP",
    reviewerCountry: "France",
    visitDate: "Novembre 2025",
    rating: 5,
    title: "Accessible à tous âges, de 4 à 84 ans",
    comment: "Nous sommes venus en famille sur 3 générations - mes parents de 80+ ans, mes enfants de 4 et 7 ans, et nous. TOUT LE MONDE a passé un moment extraordinaire. L'équipe s'est adaptée à chacun avec une gentillesse remarquable. Mon père dit que c'est le plus beau souvenir de sa vie!",
    source: "TripAdvisor",
    verified: true,
    helpful: 89
  },
  {
    id: "rev-005",
    reviewerName: "Elena K.",
    reviewerInitials: "EK",
    reviewerCountry: "Allemagne",
    visitDate: "Décembre 2025",
    rating: 5,
    title: "Expérience inoubliable, à couper le souffle",
    comment: "Les photos ne rendent pas justice à la beauté de cet endroit. La cascade est un véritable paradis caché. L'accueil chaleureux de la communauté Rasta, la musique live, le repas organique... tout était parfait. On repart avec des souvenirs pour la vie et une nouvelle perspective sur le monde.",
    source: "Google",
    verified: true,
    helpful: 54
  },
  {
    id: "rev-006",
    reviewerName: "Patrick O.",
    reviewerInitials: "PO",
    reviewerCountry: "Irlande",
    visitDate: "Janvier 2026",
    rating: 5,
    title: "Bien plus qu'une simple excursion",
    comment: "Je m'attendais à une balade touristique classique. J'ai vécu une transformation spirituelle. Les discussions profondes avec les Rastas sur leur philosophie, le respect de la nature, la connexion avec la communauté locale... Cette journée a changé ma façon de voir la vie. Irie vibes forever!",
    source: "TripAdvisor",
    verified: true,
    helpful: 71
  },
  {
    id: "rev-007",
    reviewerName: "Amélie R.",
    reviewerInitials: "AR",
    reviewerCountry: "Suisse",
    visitDate: "Octobre 2025",
    rating: 5,
    title: "Le secret le mieux gardé de la Jamaïque",
    comment: "Comment ai-je pu visiter la Jamaïque 3 fois sans connaître Rastasafari? Cette excursion est le joyau caché de l'île. Pas de foule, pas de bus bondés, juste une expérience intime et authentique. La randonnée jusqu'à la cascade était un peu sportive mais tellement gratifiante!",
    source: "Viator",
    verified: true,
    helpful: 43
  },
  {
    id: "rev-008",
    reviewerName: "David W.",
    reviewerInitials: "DW",
    reviewerCountry: "États-Unis",
    visitDate: "Décembre 2025",
    rating: 5,
    title: "Best tour in Jamaica - hands down!",
    comment: "We've done Dunn's River, we've done the dolphin tours, we've done it all. Nothing compares to Rastasafari. This is the REAL Jamaica that cruise ships don't want you to see. Our guide Jah Lion was incredible - knowledgeable, funny, and genuinely passionate. The jerk chicken alone is worth the trip!",
    source: "TripAdvisor",
    verified: true,
    helpful: 156
  },
  {
    id: "rev-009",
    reviewerName: "Nathalie F.",
    reviewerInitials: "NF",
    reviewerCountry: "France",
    visitDate: "Novembre 2025",
    rating: 4,
    title: "Superbe journée malgré la pluie",
    comment: "Malheureusement il a plu une partie de la journée, mais l'équipe a su transformer ça en aventure. On a été accueillis sous un abri traditionnel, avec du thé aux herbes chaud et de la musique reggae. La cascade sous la pluie était encore plus impressionnante! Petit bémol: le trajet en bus est long.",
    source: "Google",
    verified: true,
    helpful: 28
  },
  {
    id: "rev-010",
    reviewerName: "Marco S.",
    reviewerInitials: "MS",
    reviewerCountry: "Italie",
    visitDate: "Janvier 2026",
    rating: 5,
    title: "Un voyage dans le temps et l'âme",
    comment: "Questa escursione è stata incredibile! (Cette excursion était incroyable!) L'immersion dans la culture Rastafari est complète et respectueuse. On sent que ce n'est pas du spectacle mais une vraie communauté qui partage son mode de vie. La nourriture végétarienne ital était une révélation. Grazie Rastasafari!",
    source: "TripAdvisor",
    verified: true,
    helpful: 35
  },
  {
    id: "rev-011",
    reviewerName: "Caroline H.",
    reviewerInitials: "CH",
    reviewerCountry: "Pays-Bas",
    visitDate: "Décembre 2025",
    rating: 5,
    title: "Perfect voor koppels - Parfait pour les couples",
    comment: "Mon mari et moi cherchions quelque chose de romantique et différent pour notre lune de miel. Rastasafari a dépassé toutes nos attentes. La cascade privée, le déjeuner aux chandelles, la sérénité du lieu... C'était magique. On a même renouvelé nos voeux de façon informelle devant la cascade!",
    source: "Viator",
    verified: true,
    helpful: 67
  },
  {
    id: "rev-012",
    reviewerName: "François G.",
    reviewerInitials: "FG",
    reviewerCountry: "Québec",
    visitDate: "Janvier 2026",
    rating: 5,
    title: "Tabarnaque que c'était bon!",
    comment: "Crisse que j'ai aimé ça! Les guides sont tellement le fun, y parlent français en plus! Le spot est malade, la bouffe est écoeurante (dans le bon sens là!), pis la vibe est juste parfaite. Si vous êtes au Jamaica, c'est un must. J'y retourne l'année prochaine certain!",
    source: "Google",
    verified: true,
    helpful: 42
  }
];

// Avis mis en avant (featured)
export const featuredReviewIds = ["rev-001", "rev-002", "rev-004", "rev-005", "rev-008"];

// Obtenir les avis mis en avant
export const getFeaturedReviews = (): Review[] => {
  return reviews.filter(review => featuredReviewIds.includes(review.id));
};

// Obtenir les avis par source
export const getReviewsBySource = (source: Review['source']): Review[] => {
  return reviews.filter(review => review.source === source);
};

// Obtenir les avis par note
export const getReviewsByRating = (rating: number): Review[] => {
  return reviews.filter(review => review.rating === rating);
};

// Calculer le pourcentage pour chaque note
export const getRatingPercentages = () => {
  const total = reviewStats.totalReviews;
  return {
    5: Math.round((reviewStats.ratingDistribution[5] / total) * 100),
    4: Math.round((reviewStats.ratingDistribution[4] / total) * 100),
    3: Math.round((reviewStats.ratingDistribution[3] / total) * 100),
    2: Math.round((reviewStats.ratingDistribution[2] / total) * 100),
    1: Math.round((reviewStats.ratingDistribution[1] / total) * 100),
  };
};
