/**
 * Maps Components Index
 * Export all map-related components for easy importing
 *
 * Usage:
 * import { LocationMap, PickupLocations, DirectionsLink } from '@/components/maps';
 */

// Main location map component
export { default as LocationMap, IframeFallback } from './LocationMap';

// Pickup zones map component
export { default as PickupLocations, Legend } from './PickupLocations';

// Directions button/link components
export {
  default as DirectionsLink,
  DirectionsCard,
  DirectionsFloatingButton,
  DirectionsInlineLink,
  NavigationIcon,
  ExternalLinkIcon,
} from './DirectionsLink';

// Re-export map utilities from lib
export {
  // Configuration
  GOOGLE_MAPS_API_KEY,
  GOOGLE_MAPS_MAP_ID,

  // Coordinates
  ROARING_RIVER,
  PICKUP_ZONES,
  ALL_PICKUP_LOCATIONS,

  // Styling
  TROPICAL_MAP_STYLE,
  DEFAULT_MAP_OPTIONS,

  // Utility functions
  calculateDistance,
  distanceFromRoaringRiver,
  getPickupZone,
  calculateTransportSupplement,
  getDirectionsUrl,
  getMapEmbedUrl,
  getStaticMapUrl,

  // Types
  type Coordinates,
  type PickupZone,
  type MapMarker,
} from '@/lib/maps';
