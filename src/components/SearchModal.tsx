import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { PlaceItem, Destination } from '../types';
import { Search, X, MapPin, Compass, Navigation, Utensils, Coffee, Hotel, Landmark, Waves } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDestination: (destinationId: string, placeId?: string) => void;
  initialQuery?: string;
}

type FilterCategory = 'All' | 'Beaches' | 'History & Culture' | 'Wildlife' | 'Food & Dining' | 'Mountains & Waterfalls' | 'Nature';

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateToDestination,
  initialQuery = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen, initialQuery]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search logic across destinations and all places
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1. Matched destinations
    const matchedDestinations = DESTINATIONS.filter((d) => {
      const matchesText =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.district.toLowerCase().includes(q) ||
        d.subtitle.toLowerCase().includes(q) ||
        d.overview.toLowerCase().includes(q);

      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Beaches' && d.tags.includes('Beaches')) ||
        (activeFilter === 'History & Culture' && d.tags.includes('Culture & Heritage')) ||
        (activeFilter === 'Wildlife' && d.tags.includes('Wildlife')) ||
        (activeFilter === 'Food & Dining' && d.tags.includes('Food & Dining')) ||
        (activeFilter === 'Mountains & Waterfalls' && d.tags.includes('Hill Country & Mountains')) ||
        (activeFilter === 'Nature' && (d.tags.includes('Nature') || d.tags.includes('Hill Country & Mountains')));

      return matchesText && matchesFilter;
    });

    // 2. Matched individual places (attractions, dining, stays)
    const matchedPlaces: { place: PlaceItem; destination: Destination }[] = [];

    DESTINATIONS.forEach((d) => {
      const allPlaces = [
        ...d.mainAttractions,
        ...d.nearbyAttractions,
        ...d.cafes,
        ...d.restaurants,
        ...d.hotels,
      ];

      allPlaces.forEach((p) => {
        const matchesText =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          (p.specialityOrHighlights && p.specialityOrHighlights.toLowerCase().includes(q));

        let matchesFilter = true;
        if (activeFilter === 'Beaches') {
          matchesFilter =
            p.name.toLowerCase().includes('beach') ||
            p.description.toLowerCase().includes('beach') ||
            d.tags.includes('Beaches');
        } else if (activeFilter === 'History & Culture') {
          matchesFilter =
            p.name.toLowerCase().includes('temple') ||
            p.name.toLowerCase().includes('fort') ||
            p.name.toLowerCase().includes('stupa') ||
            p.name.toLowerCase().includes('museum') ||
            d.tags.includes('Culture & Heritage');
        } else if (activeFilter === 'Wildlife') {
          matchesFilter =
            p.name.toLowerCase().includes('park') ||
            p.name.toLowerCase().includes('safari') ||
            p.name.toLowerCase().includes('whale') ||
            p.name.toLowerCase().includes('wildlife');
        } else if (activeFilter === 'Food & Dining') {
          matchesFilter = p.category === 'restaurant' || p.category === 'cafe';
        } else if (activeFilter === 'Mountains & Waterfalls') {
          matchesFilter =
            p.name.toLowerCase().includes('peak') ||
            p.name.toLowerCase().includes('rock') ||
            p.name.toLowerCase().includes('waterfall') ||
            p.name.toLowerCase().includes('bridge') ||
            p.name.toLowerCase().includes('tea');
        }

        if (matchesText && matchesFilter) {
          matchedPlaces.push({ place: p, destination: d });
        }
      });
    });

    return {
      destinations: matchedDestinations,
      places: matchedPlaces.slice(0, 20), // top 20 place results
    };
  }, [query, activeFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-12 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-neutral-200 px-4 py-3.5 sm:px-6">
          <Search className="h-5 w-5 text-neutral-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, beaches, temples, cafes, hotels..."
            className="w-full bg-transparent text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-600 mr-2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <span className="text-xs font-medium">ESC</span>
          </button>
        </div>

        {/* Filter Pills / Tabs */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 overflow-x-auto border-b border-neutral-100 bg-neutral-50/70 text-xs">
          <span className="text-neutral-400 font-medium whitespace-nowrap shrink-0 mr-1">Filter:</span>
          {(['All', 'Beaches', 'History & Culture', 'Wildlife', 'Food & Dining', 'Mountains & Waterfalls'] as FilterCategory[]).map(
            (category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  activeFilter === category
                    ? 'bg-[#184E3F] text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Destination Results */}
          {searchResults.destinations.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                <span>Destinations ({searchResults.destinations.length})</span>
                <span>Click to view guide</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {searchResults.destinations.map((dest) => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => {
                      onNavigateToDestination(dest.id);
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl text-left border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                      <img
                        src={dest.coverImage}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-neutral-900 group-hover:text-[#184E3F]">
                        {dest.name}
                      </div>
                      <div className="text-xs text-neutral-500 truncate">
                        {dest.subtitle} · {dest.district}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Place Results */}
          {searchResults.places.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                Places & Attractions ({searchResults.places.length})
              </div>
              <div className="space-y-2">
                {searchResults.places.map(({ place, destination }) => (
                  <div
                    key={place.id}
                    onClick={() => {
                      onNavigateToDestination(destination.id, place.id);
                      onClose();
                    }}
                    className="flex items-start justify-between gap-3 p-3 rounded-xl border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-neutral-100 text-neutral-600 mt-0.5 shrink-0">
                        {place.category === 'main_attraction' || place.category === 'nearby_attraction' ? (
                          <Landmark className="w-4 h-4 text-[#184E3F]" />
                        ) : place.category === 'cafe' ? (
                          <Coffee className="w-4 h-4 text-[#D97706]" />
                        ) : place.category === 'restaurant' ? (
                          <Utensils className="w-4 h-4 text-[#DC2626]" />
                        ) : (
                          <Hotel className="w-4 h-4 text-[#4F46E5]" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-neutral-900 group-hover:text-[#184E3F]">
                          {place.name}
                        </div>
                        <div className="text-xs text-neutral-500 flex items-center gap-1.5 mt-0.5">
                          <span className="font-medium text-neutral-700">{destination.name}</span>
                          <span aria-hidden="true">·</span>
                          <span className="capitalize">{place.category.replace('_', ' ')}</span>
                          {place.distanceFromCenterKm !== undefined && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{place.distanceFromCenterKm} km from centre</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-neutral-600 mt-1 line-clamp-1">
                          {place.description}
                        </p>
                      </div>
                    </div>

                    <a
                      href={place.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 text-neutral-400 hover:text-[#184E3F] hover:bg-white rounded-lg shrink-0"
                      title="Open in Google Maps"
                    >
                      <Navigation className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results message */}
          {searchResults.destinations.length === 0 && searchResults.places.length === 0 && (
            <div className="text-center py-12">
              <Compass className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <div className="text-base font-semibold text-neutral-800">No matching places found</div>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1">
                Try searching for Sigiriya, Galle Fort, Blue Whales, Nine Arch Bridge, Ministry of Crab, or Kandy.
              </p>
            </div>
          )}
        </div>

        {/* Modal footer shortcut tips */}
        <div className="px-6 py-3 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <span>Showing verified tourist spots across all 13 Sri Lankan regions</span>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-medium text-[#184E3F] hover:underline"
          >
            Close Search
          </button>
        </div>
      </div>
    </div>
  );
};
