'use client';

import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import {
  GOOGLE_MAPS_API_KEY,
  GOOGLE_MAPS_MAP_ID,
  ROARING_RIVER,
  TROPICAL_MAP_STYLE,
  DEFAULT_MAP_OPTIONS,
} from '@/lib/maps';

// ============================================
// TYPES
// ============================================

interface LocationMapProps {
  /** Custom CSS class name */
  className?: string;
  /** Map container height */
  height?: string;
  /** Initial zoom level */
  zoom?: number;
  /** Show info window on load */
  showInfoWindowOnLoad?: boolean;
  /** Custom marker icon URL */
  markerIcon?: string;
  /** Enable custom tropical styling */
  useCustomStyle?: boolean;
}

// ============================================
// CONSTANTS
// ============================================

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: ROARING_RIVER.lat,
  lng: ROARING_RIVER.lng,
};

// Custom green marker for destination
const GREEN_MARKER_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" viewBox="0 0 40 48">
    <defs>
      <linearGradient id="markerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#22c55e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#16a34a;stop-opacity:1" />
      </linearGradient>
    </defs>
    <path fill="url(#markerGradient)" stroke="#15803d" stroke-width="2" d="M20 0 C31.046 0 40 8.954 40 20 C40 35 20 48 20 48 C20 48 0 35 0 20 C0 8.954 8.954 0 20 0Z"/>
    <circle cx="20" cy="18" r="8" fill="white"/>
    <circle cx="20" cy="18" r="4" fill="#16a34a"/>
  </svg>
`;

// ============================================
// COMPONENT
// ============================================

/**
 * LocationMap Component
 *
 * Displays an interactive Google Map centered on Roaring River, Jamaica
 * with a marker showing the exact location of Rastasafari Experience.
 *
 * Features:
 * - Custom tropical map styling
 * - Green destination marker
 * - Info window with address details
 * - Responsive design
 * - Fallback iframe for missing API key
 */
export default function LocationMap({
  className = '',
  height = '400px',
  zoom = 14,
  showInfoWindowOnLoad = true,
  markerIcon,
  useCustomStyle = true,
}: LocationMapProps) {
  const [showInfoWindow, setShowInfoWindow] = useState(showInfoWindowOnLoad);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    ...(GOOGLE_MAPS_MAP_ID && { mapIds: [GOOGLE_MAPS_MAP_ID] }),
  });

  // Store map reference
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Handle marker click
  const handleMarkerClick = useCallback(() => {
    setShowInfoWindow(true);
  }, []);

  // Handle info window close
  const handleInfoWindowClose = useCallback(() => {
    setShowInfoWindow(false);
  }, []);

  // Get custom marker icon
  const getMarkerIcon = useCallback((): google.maps.Icon | google.maps.Symbol | undefined => {
    if (markerIcon) {
      return {
        url: markerIcon,
        scaledSize: new google.maps.Size(40, 48),
        anchor: new google.maps.Point(20, 48),
      };
    }

    // Use custom green marker SVG
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(GREEN_MARKER_SVG)}`,
      scaledSize: new google.maps.Size(40, 48),
      anchor: new google.maps.Point(20, 48),
    };
  }, [markerIcon]);

  // Loading state
  if (!isLoaded && !loadError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  // Error state or no API key - show iframe fallback
  if (loadError || !GOOGLE_MAPS_API_KEY) {
    return (
      <div className={`rounded-lg overflow-hidden ${className}`} style={{ height }}>
        <IframeFallback height={height} zoom={zoom} />
      </div>
    );
  }

  // Map options with optional custom styling
  const mapOptions: google.maps.MapOptions = {
    ...DEFAULT_MAP_OPTIONS,
    ...(useCustomStyle && !GOOGLE_MAPS_MAP_ID && { styles: TROPICAL_MAP_STYLE }),
    ...(GOOGLE_MAPS_MAP_ID && { mapId: GOOGLE_MAPS_MAP_ID }),
  };

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${className}`} style={{ height }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onMapLoad}
        options={mapOptions}
      >
        {/* Main destination marker */}
        <Marker
          position={center}
          onClick={handleMarkerClick}
          icon={isLoaded ? getMarkerIcon() : undefined}
          animation={google.maps.Animation.DROP}
          title={ROARING_RIVER.name}
        />

        {/* Info Window */}
        {showInfoWindow && (
          <InfoWindow
            position={center}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-lg text-green-700 mb-1">
                {ROARING_RIVER.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {ROARING_RIVER.address}
              </p>
              <p className="text-gray-500 text-xs">
                {ROARING_RIVER.description}
              </p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${ROARING_RIVER.lat},${ROARING_RIVER.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm text-green-600 hover:text-green-800 font-medium"
              >
                Get Directions &rarr;
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

// ============================================
// IFRAME FALLBACK
// ============================================

interface IframeFallbackProps {
  height: string;
  zoom: number;
}

/**
 * Fallback iframe map when Google Maps API is not available
 */
function IframeFallback({ height, zoom }: IframeFallbackProps) {
  const { lat, lng, name, address } = ROARING_RIVER;

  // Use OpenStreetMap as fallback (no API key required)
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05},${lat - 0.03},${lng + 0.05},${lat + 0.03}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="relative" style={{ height }}>
      <iframe
        src={osmUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map showing ${name}`}
      />
      {/* Overlay with location info */}
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 p-3 border-t">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-green-700">{name}</h3>
            <p className="text-gray-600 text-sm">{address}</p>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Directions
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================
// EXPORTS
// ============================================

export { LocationMap, IframeFallback };
