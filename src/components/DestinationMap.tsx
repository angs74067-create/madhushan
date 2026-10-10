import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { PlaceItem } from '../types';
import { Navigation, ExternalLink, MapPin } from 'lucide-react';

interface DestinationMapProps {
  center: { lat: number; lng: number };
  destinationName: string;
  places: PlaceItem[];
  selectedPlaceId?: string | null;
  onSelectPlace?: (place: PlaceItem) => void;
}

export const DestinationMap: React.FC<DestinationMapProps> = ({
  center,
  destinationName,
  places,
  selectedPlaceId,
  onSelectPlace,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map if not already created
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [center.lat, center.lng],
        zoom: 13,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([center.lat, center.lng], 13);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Center Destination Marker
    const centerIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="background:#184E3F; color:white; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.25); border:2px solid white;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 34],
      popupAnchor: [0, -34],
    });

    const centerMarker = L.marker([center.lat, center.lng], { icon: centerIcon }).addTo(map);
    centerMarker.bindPopup(`
      <div style="font-family: var(--font-sans); padding: 4px;">
        <div style="font-weight: 700; font-size: 14px; color: #184E3F; margin-bottom: 2px;">${destinationName} Town Centre</div>
        <div style="font-size: 12px; color: #64748B;">Central reference point for approximate travel distances</div>
      </div>
    `);

    // Add Place Markers
    const bounds = L.latLngBounds([[center.lat, center.lng]]);

    places.forEach((place) => {
      let pinColor = '#184E3F';
      if (place.category === 'nearby_attraction') pinColor = '#0284C7';
      if (place.category === 'cafe') pinColor = '#D97706';
      if (place.category === 'restaurant') pinColor = '#DC2626';
      if (place.category === 'hotel') pinColor = '#4F46E5';

      const customIcon = L.divIcon({
        className: 'custom-place-icon',
        html: `
          <div style="background:${pinColor}; color:white; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 8px rgba(0,0,0,0.2); border:2px solid #FFFFFF; font-size:11px; font-weight:bold;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28],
      });

      const marker = L.marker([place.coordinates.lat, place.coordinates.lng], { icon: customIcon }).addTo(map);

      const categoryLabel =
        place.category === 'main_attraction'
          ? 'Main Attraction'
          : place.category === 'nearby_attraction'
          ? 'Nearby Attraction'
          : place.category === 'cafe'
          ? 'Café & Coffee'
          : place.category === 'restaurant'
          ? 'Restaurant'
          : 'Hotel & Stay';

      const popupHtml = `
        <div style="font-family: var(--font-sans); min-width: 200px; padding: 2px;">
          <div style="display:inline-block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: ${pinColor}; margin-bottom: 2px;">
            ${categoryLabel}
          </div>
          <div style="font-weight: 700; font-size: 14px; color: #0F172A; margin-bottom: 4px;">
            ${place.name}
          </div>
          <div style="font-size: 11px; color: #64748B; margin-bottom: 6px; line-height: 1.3;">
            ${place.address}
          </div>
          ${
            place.distanceFromCenterKm !== undefined
              ? `<div style="font-size: 11px; font-weight: 500; color: #334155; margin-bottom: 8px;">Approx. ${place.distanceFromCenterKm} km from centre</div>`
              : ''
          }
          <div style="border-top: 1px solid #E2E8F0; padding-top: 8px; margin-top: 4px; display: flex; gap: 8px;">
            <a href="${place.directionsUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 11px; font-weight: 600; color: #184E3F; text-decoration: none; display: flex; align-items: center; gap: 4px;">
              Directions on Google Maps &rarr;
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { className: 'custom-map-popup' });
      marker.on('click', () => {
        if (onSelectPlace) onSelectPlace(place);
      });

      markersRef.current[place.id] = marker;
      bounds.extend([place.coordinates.lat, place.coordinates.lng]);
    });

    if (places.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }

    return () => {
      // Keep map instance or cleanup if needed
    };
  }, [center.lat, center.lng, places, destinationName]);

  // Handle selected place highlight & pan
  useEffect(() => {
    if (selectedPlaceId && markersRef.current[selectedPlaceId] && mapInstanceRef.current) {
      const marker = markersRef.current[selectedPlaceId];
      mapInstanceRef.current.panTo(marker.getLatLng(), { animate: true, duration: 0.5 });
      marker.openPopup();
    }
  }, [selectedPlaceId]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-200/80 bg-white shadow-xs">
      {/* Map Header info bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-neutral-200/70 bg-neutral-50/70 text-xs text-neutral-600">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#184E3F]" />
          <span className="font-semibold text-neutral-800">Interactive Location Map</span>
          <span aria-hidden="true">·</span>
          <span>OpenStreetMap & Direct Google Maps Navigation</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#184E3F]" />
            <span>Main Sights</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
            <span>Nearby</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
            <span>Cafés</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
            <span>Dining</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]" />
            <span>Hotels</span>
          </span>
        </div>
      </div>

      {/* Leaflet Container */}
      <div className="relative h-[380px] sm:h-[440px] w-full">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Map Footer Note */}
      <div className="px-5 py-2.5 bg-white border-t border-neutral-200/70 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-500">
        <span>Click any marker to view location details and instant Google Maps directions.</span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinationName + ' Sri Lanka')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-[#184E3F] hover:underline"
        >
          <span>View entire {destinationName} on Google Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
