'use client';

import React, { useState, useCallback, useRef, useMemo } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Circle,
  InfoWindow,
} from '@react-google-maps/api';
import {
  GOOGLE_MAPS_API_KEY,
  GOOGLE_MAPS_MAP_ID,
  ROARING_RIVER,
  PICKUP_ZONES,
  TROPICAL_MAP_STYLE,
  DEFAULT_MAP_OPTIONS,
} from '@/lib/maps';

// ============================================
// TYPES
// ============================================

interface PickupLocationsProps {
  /** Custom CSS class name */
  className?: string;
  /** Map container height */
  height?: string;
  /** Show legend */
  showLegend?: boolean;
  /** Enable custom tropical styling */
  useCustomStyle?: boolean;
  /** Callback when a zone is selected */
  onZoneSelect?: (zoneName: string | null) => void;
}

interface ZoneInfo {
  key: string;
  name: string;
  description: string;
  color: string;
  center: { lat: number; lng: number };
  radius: number;
}

// ============================================
// CONSTANTS
// ============================================

const containerStyle = {
  width: '100%',
  height: '100%',
};

// Center the map to show all zones - roughly between Negril and Montego Bay
const mapCenter = {
  lat: 18.35,
  lng: -78.05,
};

// Custom green marker for destination
const GREEN_MARKER_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" viewBox="0 0 40 48">
    <defs>
      <linearGradient id="destGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#22c55e;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#16a34a;stop-opacity:1" />
      </linearGradient>
    </defs>
    <path fill="url(#destGradient)" stroke="#15803d" stroke-width="2" d="M20 0 C31.046 0 40 8.954 40 20 C40 35 20 48 20 48 C20 48 0 35 0 20 C0 8.954 8.954 0 20 0Z"/>
    <circle cx="20" cy="18" r="8" fill="white"/>
    <text x="20" y="22" text-anchor="middle" fill="#16a34a" font-size="12" font-weight="bold">R</text>
  </svg>
`;

// Zone marker (small circle)
const createZoneMarkerSvg = (color: string, label: string) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="14" fill="${color}" stroke="white" stroke-width="2"/>
    <text x="16" y="21" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${label}</text>
  </svg>
`;

// ============================================
// COMPONENT
// ============================================

/**
 * PickupLocations Component
 *
 * Displays an interactive Google Map showing:
 * - Roaring River destination (green marker)
 * - Pickup zones as blue circles (Montego Bay, Negril, Grand Palladium)
 * - Legend explaining the zones
 *
 * Features:
 * - Interactive zone circles with hover effects
 * - Click to show zone details
 * - Responsive legend
 * - Fallback for missing API key
 */
export default function PickupLocations({
  className = '',
  height = '500px',
  showLegend = true,
  useCustomStyle = true,
  onZoneSelect,
}: PickupLocationsProps) {
  const [selectedZone, setSelectedZone] = useState<ZoneInfo | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    ...(GOOGLE_MAPS_MAP_ID && { mapIds: [GOOGLE_MAPS_MAP_ID] }),
  });

  // Memoize zones data
  const zones = useMemo<ZoneInfo[]>(() => [
    {
      key: 'monteGoBay',
      name: PICKUP_ZONES.monteGoBay.name,
      description: PICKUP_ZONES.monteGoBay.description,
      color: PICKUP_ZONES.monteGoBay.color,
      center: PICKUP_ZONES.monteGoBay.center,
      radius: PICKUP_ZONES.monteGoBay.radius,
    },
    {
      key: 'negril',
      name: PICKUP_ZONES.negril.name,
      description: PICKUP_ZONES.negril.description,
      color: PICKUP_ZONES.negril.color,
      center: PICKUP_ZONES.negril.center,
      radius: PICKUP_ZONES.negril.radius,
    },
    {
      key: 'grandPalladium',
      name: PICKUP_ZONES.grandPalladium.name,
      description: PICKUP_ZONES.grandPalladium.description,
      color: PICKUP_ZONES.grandPalladium.color,
      center: PICKUP_ZONES.grandPalladium.center,
      radius: PICKUP_ZONES.grandPalladium.radius,
    },
  ], []);

  // Store map reference
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    // Fit bounds to show all zones
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: ROARING_RIVER.lat, lng: ROARING_RIVER.lng });
    zones.forEach((zone) => {
      bounds.extend(zone.center);
    });
    map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
  }, [zones]);

  // Handle zone click
  const handleZoneClick = useCallback((zone: ZoneInfo) => {
    setSelectedZone(zone);
    onZoneSelect?.(zone.name);
  }, [onZoneSelect]);

  // Handle info window close
  const handleInfoWindowClose = useCallback(() => {
    setSelectedZone(null);
    onZoneSelect?.(null);
  }, [onZoneSelect]);

  // Get destination marker icon
  const getDestinationIcon = useCallback((): google.maps.Icon => ({
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(GREEN_MARKER_SVG)}`,
    scaledSize: new google.maps.Size(40, 48),
    anchor: new google.maps.Point(20, 48),
  }), []);

  // Get zone center marker icon
  const getZoneCenterIcon = useCallback((zone: ZoneInfo): google.maps.Icon => {
    const label = zone.name.charAt(0);
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(createZoneMarkerSvg(zone.color, label))}`,
      scaledSize: new google.maps.Size(32, 32),
      anchor: new google.maps.Point(16, 16),
    };
  }, []);

  // Circle options based on hover state
  const getCircleOptions = useCallback((zone: ZoneInfo): google.maps.CircleOptions => ({
    strokeColor: zone.color,
    strokeOpacity: hoveredZone === zone.key ? 1 : 0.8,
    strokeWeight: hoveredZone === zone.key ? 3 : 2,
    fillColor: zone.color,
    fillOpacity: hoveredZone === zone.key ? 0.35 : 0.2,
    clickable: true,
    zIndex: hoveredZone === zone.key ? 10 : 1,
  }), [hoveredZone]);

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

  // Error state or no API key - show static fallback
  if (loadError || !GOOGLE_MAPS_API_KEY) {
    return (
      <div className={`rounded-lg overflow-hidden ${className}`}>
        <StaticFallback height={height} showLegend={showLegend} />
      </div>
    );
  }

  // Map options
  const mapOptions: google.maps.MapOptions = {
    ...DEFAULT_MAP_OPTIONS,
    ...(useCustomStyle && !GOOGLE_MAPS_MAP_ID && { styles: TROPICAL_MAP_STYLE }),
    ...(GOOGLE_MAPS_MAP_ID && { mapId: GOOGLE_MAPS_MAP_ID }),
  };

  return (
    <div className={`${className}`}>
      <div className="rounded-lg overflow-hidden shadow-lg" style={{ height }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={10}
          onLoad={onMapLoad}
          options={mapOptions}
        >
          {/* Pickup zone circles */}
          {zones.map((zone) => (
            <React.Fragment key={zone.key}>
              <Circle
                center={zone.center}
                radius={zone.radius}
                options={getCircleOptions(zone)}
                onClick={() => handleZoneClick(zone)}
                onMouseOver={() => setHoveredZone(zone.key)}
                onMouseOut={() => setHoveredZone(null)}
              />
              {/* Zone center marker */}
              <Marker
                position={zone.center}
                icon={getZoneCenterIcon(zone)}
                onClick={() => handleZoneClick(zone)}
                title={zone.name}
              />
            </React.Fragment>
          ))}

          {/* Roaring River destination marker */}
          <Marker
            position={{ lat: ROARING_RIVER.lat, lng: ROARING_RIVER.lng }}
            icon={getDestinationIcon()}
            animation={google.maps.Animation.DROP}
            title={ROARING_RIVER.name}
            zIndex={100}
          />

          {/* Info Window for selected zone */}
          {selectedZone && (
            <InfoWindow
              position={selectedZone.center}
              onCloseClick={handleInfoWindowClose}
            >
              <div className="p-2 max-w-xs">
                <h3 className="font-bold text-lg text-blue-700 mb-1">
                  {selectedZone.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {selectedZone.description}
                </p>
                <p className="text-green-600 text-sm font-medium">
                  Free pickup included!
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      {/* Legend */}
      {showLegend && <Legend zones={zones} />}
    </div>
  );
}

// ============================================
// LEGEND COMPONENT
// ============================================

interface LegendProps {
  zones: ZoneInfo[];
}

function Legend({ zones }: LegendProps) {
  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow border border-gray-200">
      <h4 className="font-bold text-gray-800 mb-3">Pickup Zones</h4>
      <div className="space-y-3">
        {/* Destination */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">R</span>
          </div>
          <div>
            <p className="font-medium text-gray-800">{ROARING_RIVER.name}</p>
            <p className="text-sm text-gray-500">Destination</p>
          </div>
        </div>

        {/* Pickup zones */}
        {zones.map((zone) => (
          <div key={zone.key} className="flex items-start gap-3">
            <div
              className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center"
              style={{
                backgroundColor: `${zone.color}33`,
                borderColor: zone.color,
              }}
            >
              <span
                className="text-xs font-bold"
                style={{ color: zone.color }}
              >
                {zone.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800">{zone.name}</p>
              <p className="text-sm text-gray-500">{zone.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-sm text-green-600 font-medium">
          Free pickup/drop-off included for all marked zones
        </p>
      </div>
    </div>
  );
}

// ============================================
// STATIC FALLBACK
// ============================================

interface StaticFallbackProps {
  height: string;
  showLegend: boolean;
}

function StaticFallback({ height, showLegend }: StaticFallbackProps) {
  const zones = [
    {
      key: 'monteGoBay',
      name: PICKUP_ZONES.monteGoBay.name,
      description: PICKUP_ZONES.monteGoBay.description,
      color: PICKUP_ZONES.monteGoBay.color,
    },
    {
      key: 'negril',
      name: PICKUP_ZONES.negril.name,
      description: PICKUP_ZONES.negril.description,
      color: PICKUP_ZONES.negril.color,
    },
    {
      key: 'grandPalladium',
      name: PICKUP_ZONES.grandPalladium.name,
      description: PICKUP_ZONES.grandPalladium.description,
      color: PICKUP_ZONES.grandPalladium.color,
    },
  ];

  // Use OpenStreetMap as fallback
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-78.6,18.1,-77.6,18.6&layer=mapnik&marker=${ROARING_RIVER.lat},${ROARING_RIVER.lng}`;

  return (
    <div>
      <div className="relative rounded-lg overflow-hidden shadow-lg" style={{ height }}>
        <iframe
          src={osmUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Pickup locations map"
        />
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Note:</span> Interactive map requires Google Maps API key.
            Contact us for exact pickup zone boundaries.
          </p>
        </div>
      </div>

      {showLegend && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow border border-gray-200">
          <h4 className="font-bold text-gray-800 mb-3">Pickup Zones</h4>
          <div className="space-y-3">
            {/* Destination */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">R</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">{ROARING_RIVER.name}</p>
                <p className="text-sm text-gray-500">Destination</p>
              </div>
            </div>

            {/* Zones */}
            {zones.map((zone) => (
              <div key={zone.key} className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full border-2"
                  style={{
                    backgroundColor: `${zone.color}33`,
                    borderColor: zone.color,
                  }}
                />
                <div>
                  <p className="font-medium text-gray-800">{zone.name}</p>
                  <p className="text-sm text-gray-500">{zone.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-sm text-green-600 font-medium">
              Free pickup/drop-off included for all marked zones
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// EXPORTS
// ============================================

export { PickupLocations, Legend };
