/**
 * Google Maps Configuration and Utilities
 * Rastasafari Experience - Roaring River, Jamaica
 */

// ============================================
// CONFIGURATION
// ============================================

/**
 * Google Maps API Key
 * Set this in your environment variables: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
 */
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

/**
 * Map ID for custom styling (optional)
 * Create a Map ID in Google Cloud Console for custom styles
 */
export const GOOGLE_MAPS_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || '';

// ============================================
// COORDINATES
// ============================================

/**
 * Main destination: Roaring River, Westmoreland, Jamaica
 */
export const ROARING_RIVER = {
  lat: 18.2371,
  lng: -78.1589,
  name: 'Roaring River',
  address: 'Roaring River, Petersfield, Westmoreland, Jamaica',
  description: 'Rastasafari Experience - Authentic Jamaican Adventure',
} as const;

/**
 * Pickup zones with their centers and radii
 */
export const PICKUP_ZONES = {
  monteGoBay: {
    center: { lat: 18.4762, lng: -77.8939 },
    radius: 15000, // 15km radius
    name: 'Montego Bay',
    description: 'Hotels, resorts and Sangster International Airport area',
    color: '#3B82F6', // Blue
    supplement: 0, // Base price, no supplement
  },
  negril: {
    center: { lat: 18.2680, lng: -78.3466 },
    radius: 12000, // 12km radius
    name: 'Negril',
    description: 'Seven Mile Beach and West End area',
    color: '#3B82F6', // Blue
    supplement: 0, // Included in base price
  },
  grandPalladium: {
    center: { lat: 18.3408, lng: -78.1203 },
    radius: 8000, // 8km radius
    name: 'Grand Palladium / Lucea',
    description: 'Grand Palladium Jamaica Resort & Spa and Lucea area',
    color: '#3B82F6', // Blue
    supplement: 0, // Included in base price
  },
} as const;

/**
 * All pickup locations as an array for easy iteration
 */
export const ALL_PICKUP_LOCATIONS = Object.values(PICKUP_ZONES);

// ============================================
// MAP STYLING
// ============================================

/**
 * Custom map style for a tropical/natural feel
 * Subtle green and blue tones
 */
export const TROPICAL_MAP_STYLE: google.maps.MapTypeStyle[] = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#a3ccff' }],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [{ color: '#c8e6c9' }],
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'geometry',
    stylers: [{ color: '#a5d6a7' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#81c784' }],
  },
  {
    featureType: 'poi.attraction',
    elementType: 'geometry',
    stylers: [{ visibility: 'simplified' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#ffcc80' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#ffe0b2' }],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#c9c9c9' }],
  },
];

/**
 * Default map options
 */
export const DEFAULT_MAP_OPTIONS: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  gestureHandling: 'cooperative',
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 Latitude of point 1
 * @param lng1 Longitude of point 1
 * @param lat2 Latitude of point 2
 * @param lng2 Longitude of point 2
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calculate distance from Roaring River to a given location
 * @param lat Latitude
 * @param lng Longitude
 * @returns Distance in kilometers
 */
export function distanceFromRoaringRiver(lat: number, lng: number): number {
  return calculateDistance(ROARING_RIVER.lat, ROARING_RIVER.lng, lat, lng);
}

/**
 * Check if a location is within a pickup zone
 * @param lat Latitude of location
 * @param lng Longitude of location
 * @returns The pickup zone if within one, null otherwise
 */
export function getPickupZone(
  lat: number,
  lng: number
): (typeof PICKUP_ZONES)[keyof typeof PICKUP_ZONES] | null {
  for (const zone of Object.values(PICKUP_ZONES)) {
    const distance = calculateDistance(
      zone.center.lat,
      zone.center.lng,
      lat,
      lng
    );
    const radiusKm = zone.radius / 1000;

    if (distance <= radiusKm) {
      return zone;
    }
  }
  return null;
}

/**
 * Calculate transport supplement based on pickup location
 * @param lat Latitude of pickup
 * @param lng Longitude of pickup
 * @returns Supplement amount in USD
 */
export function calculateTransportSupplement(lat: number, lng: number): number {
  const zone = getPickupZone(lat, lng);

  if (zone) {
    return zone.supplement;
  }

  // If outside standard zones, calculate based on distance
  const distance = distanceFromRoaringRiver(lat, lng);

  // Base supplement for locations outside standard zones
  // $1 per km over 50km
  if (distance > 50) {
    return Math.round((distance - 50) * 1);
  }

  return 0;
}

/**
 * Get Google Maps directions URL
 * @param fromLat Origin latitude (optional, uses user's location if not provided)
 * @param fromLng Origin longitude (optional)
 * @returns Google Maps directions URL
 */
export function getDirectionsUrl(fromLat?: number, fromLng?: number): string {
  const destination = `${ROARING_RIVER.lat},${ROARING_RIVER.lng}`;

  if (fromLat !== undefined && fromLng !== undefined) {
    const origin = `${fromLat},${fromLng}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
  }

  // Without origin, Google Maps will prompt for user's location
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
}

/**
 * Get Google Maps embed URL for iframe fallback
 * @param zoom Zoom level (default 14)
 * @returns Embed URL
 */
export function getMapEmbedUrl(zoom: number = 14): string {
  const { lat, lng, name } = ROARING_RIVER;
  return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(name)}&center=${lat},${lng}&zoom=${zoom}`;
}

/**
 * Get static map URL for non-interactive display
 * @param width Image width
 * @param height Image height
 * @param zoom Zoom level
 * @returns Static map URL
 */
export function getStaticMapUrl(
  width: number = 600,
  height: number = 400,
  zoom: number = 14
): string {
  const { lat, lng } = ROARING_RIVER;
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&markers=color:green%7C${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
}

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PickupZone {
  center: Coordinates;
  radius: number;
  name: string;
  description: string;
  color: string;
  supplement: number;
}

export interface MapMarker {
  position: Coordinates;
  title: string;
  icon?: string;
  infoContent?: string;
}
