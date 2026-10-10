import React from 'react';
import { PlaceItem } from '../types';
import { Navigation, Globe, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

interface PlaceCardProps {
  place: PlaceItem;
  onFocusMap?: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onFocusMap }) => {
  const getCategoryMeta = () => {
    switch (place.category) {
      case 'main_attraction':
        return { label: 'Main Attraction', color: 'text-[#184E3F]' };
      case 'nearby_attraction':
        return { label: 'Nearby Attraction', color: 'text-[#0284C7]' };
      case 'cafe':
        return { label: 'Café & Coffee', color: 'text-[#D97706]' };
      case 'restaurant':
        return { label: 'Restaurant & Dining', color: 'text-[#DC2626]' };
      case 'hotel':
        return { label: 'Hotel & Stay', color: 'text-[#4F46E5]' };
    }
  };

  const meta = getCategoryMeta();

  return (
    <article className="group flex flex-col justify-between bg-white rounded-xl border border-neutral-200/90 p-5 transition-all duration-200 hover:shadow-md hover:border-neutral-300">
      <div>
        {/* Top category & verification indicator */}
        <div className="flex items-center justify-between gap-2 mb-2 text-xs">
          <div className="flex items-center gap-1.5 font-medium">
            <span className={meta.color}>{meta.label}</span>
            {place.distanceFromCenterKm !== undefined && (
              <>
                <span className="text-neutral-300" aria-hidden="true">·</span>
                <span className="text-neutral-500 font-normal">
                  {place.distanceFromCenterKm} km from centre
                </span>
              </>
            )}
          </div>
          {place.isVerified ? (
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700" title="Verified business location">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Verified</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-700" title="Location subject to seasonal verification">
              <AlertCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Verification pending</span>
            </span>
          )}
        </div>

        {/* Place Title */}
        <h4 className="text-base font-semibold text-neutral-900 group-hover:text-[#184E3F] transition-colors leading-snug">
          {place.name}
        </h4>

        {/* Address */}
        <div className="flex items-start gap-1.5 mt-1 text-xs text-neutral-500 leading-normal">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-400 mt-0.5" />
          <span>{place.address}</span>
        </div>

        {/* Description */}
        <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
          {place.description}
        </p>

        {/* Speciality or highlights */}
        {place.specialityOrHighlights && (
          <div className="mt-3 pt-3 border-t border-neutral-100 text-xs text-neutral-600">
            <span className="font-medium text-neutral-800">Highlights: </span>
            <span>{place.specialityOrHighlights}</span>
          </div>
        )}
      </div>

      {/* Action links */}
      <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <a
            href={place.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-[#184E3F] hover:text-[#0E352A] transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Google Maps</span>
          </a>

          {place.websiteUrl && (
            <a
              href={place.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Official Website</span>
            </a>
          )}
        </div>

        {onFocusMap && (
          <button
            type="button"
            onClick={onFocusMap}
            className="text-[11px] font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            Locate on map &rarr;
          </button>
        )}
      </div>
    </article>
  );
};
