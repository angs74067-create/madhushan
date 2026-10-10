import React, { useState, useMemo } from 'react';
import { Destination, PlaceItem } from '../types';
import { DestinationMap } from '../components/DestinationMap';
import { PlaceCard } from '../components/PlaceCard';
import {
  ArrowLeft,
  MapPin,
  ExternalLink,
  Compass,
  Calendar,
  ShieldCheck,
  Landmark,
  Coffee,
  Utensils,
  Hotel,
  Share2,
  Check
} from 'lucide-react';

interface DestinationDetailViewProps {
  destination: Destination;
  onBack: () => void;
  onSelectDestination: (id: string) => void;
  targetPlaceId?: string;
}

export const DestinationDetailView: React.FC<DestinationDetailViewProps> = ({
  destination,
  onBack,
  onSelectDestination,
  targetPlaceId,
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | 'main' | 'nearby' | 'cafes' | 'restaurants' | 'hotels'>('all');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(targetPlaceId || null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Combine all places for the interactive map
  const allPlaces = useMemo(() => {
    return [
      ...destination.mainAttractions,
      ...destination.nearbyAttractions,
      ...destination.cafes,
      ...destination.restaurants,
      ...destination.hotels,
    ];
  }, [destination]);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePlaceSelect = (place: PlaceItem) => {
    setSelectedPlaceId(place.id);
    const element = document.getElementById(`place-${place.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA]">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-white border-b border-neutral-200/80 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-[#184E3F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Destinations</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Guide</span>
                </>
              )}
            </button>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination.name + ' Sri Lanka')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#184E3F] text-white text-xs font-semibold hover:bg-[#0E352A] transition-colors"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-neutral-900">
        <div className="relative h-[340px] sm:h-[420px] lg:h-[480px] w-full">
          <img
            src={destination.coverImage}
            alt={destination.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
              e.currentTarget.parentElement?.classList.add('bg-gradient-to-r', 'from-[#184E3F]', 'to-[#0E352A]');
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-12 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-medium text-[#E27D48] tracking-wider uppercase mb-2">
              <MapPin className="w-4 h-4 text-[#E27D48]" />
              <span>{destination.district}</span>
              <span aria-hidden="true">·</span>
              <span>{destination.province}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-serif-heading mb-3">
              {destination.name}
            </h1>

            <p className="text-base sm:text-lg text-white/90 font-medium max-w-3xl leading-relaxed">
              {destination.subtitle}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/80">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#E27D48]" />
                <span>Best time: {destination.bestTimeToVisit}</span>
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="font-mono text-[11px] text-white/70">
                GPS: {destination.coordinates.lat.toFixed(4)}° N, {destination.coordinates.lng.toFixed(4)}° E
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Overview & Quick Info Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 font-serif-heading">
              About {destination.name}
            </h2>
            <p className="text-base text-neutral-700 leading-relaxed">
              {destination.overview}
            </p>
            {destination.culturalNotes && (
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Local Cultural Note: </span>
                  {destination.culturalNotes}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/80 p-6 space-y-4 shadow-xs h-fit">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              At a Glance
            </h3>
            <div className="space-y-3 text-xs text-neutral-600">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <span className="text-neutral-500">District</span>
                <span className="font-semibold text-neutral-900">{destination.district}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <span className="text-neutral-500">Province</span>
                <span className="font-semibold text-neutral-900">{destination.province}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <span className="text-neutral-500">Center Coordinates</span>
                <span className="font-mono text-neutral-800">
                  {destination.coordinates.lat}, {destination.coordinates.lng}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <span className="text-neutral-500">Catalogued Sights</span>
                <span className="font-semibold text-neutral-900">
                  {allPlaces.length} verified locations
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${destination.coordinates.lat},${destination.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-neutral-100 text-[#184E3F] text-xs font-semibold hover:bg-neutral-200/80 transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>Get Directions from Your Location</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Leaflet & OSM Map Section */}
        <section className="mb-14">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 font-serif-heading">
                Interactive Destination Map
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Pinned locations for attractions, dining, and accommodations in {destination.name}.
              </p>
            </div>
            <div className="text-xs text-neutral-500">
              Centered on {destination.name} Centre
            </div>
          </div>

          <DestinationMap
            center={destination.coordinates}
            destinationName={destination.name}
            places={allPlaces}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={(place) => setSelectedPlaceId(place.id)}
          />
        </section>

        {/* Category Navigation Filter Tabs */}
        <div className="mb-8 border-b border-neutral-200 pb-3 flex items-center justify-between overflow-x-auto gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveCategoryTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                activeCategoryTab === 'all'
                  ? 'bg-[#184E3F] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
              }`}
            >
              All Places ({allPlaces.length})
            </button>
            <button
              onClick={() => setActiveCategoryTab('main')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                activeCategoryTab === 'main'
                  ? 'bg-[#184E3F] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
              }`}
            >
              Main Attractions ({destination.mainAttractions.length})
            </button>
            <button
              onClick={() => setActiveCategoryTab('nearby')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                activeCategoryTab === 'nearby'
                  ? 'bg-[#184E3F] text-white shadow-xs'
                  : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
              }`}
            >
              Nearby Attractions ({destination.nearbyAttractions.length})
            </button>
            {destination.cafes.length > 0 && (
              <button
                onClick={() => setActiveCategoryTab('cafes')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  activeCategoryTab === 'cafes'
                    ? 'bg-[#184E3F] text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                Cafés ({destination.cafes.length})
              </button>
            )}
            {destination.restaurants.length > 0 && (
              <button
                onClick={() => setActiveCategoryTab('restaurants')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  activeCategoryTab === 'restaurants'
                    ? 'bg-[#184E3F] text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                Restaurants ({destination.restaurants.length})
              </button>
            )}
            {destination.hotels.length > 0 && (
              <button
                onClick={() => setActiveCategoryTab('hotels')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  activeCategoryTab === 'hotels'
                    ? 'bg-[#184E3F] text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                Hotels & Stays ({destination.hotels.length})
              </button>
            )}
          </div>
        </div>

        {/* Structured Sections */}
        <div className="space-y-12">
          {/* A. Main Attractions */}
          {(activeCategoryTab === 'all' || activeCategoryTab === 'main') &&
            destination.mainAttractions.length > 0 && (
              <section id="section-main-attractions">
                <div className="flex items-center gap-2 mb-4">
                  <Landmark className="w-5 h-5 text-[#184E3F]" />
                  <h3 className="text-xl font-bold text-neutral-900 font-serif-heading">
                    Main Attractions
                  </h3>
                  <span className="text-xs text-neutral-500">
                    ({destination.mainAttractions.length} essential sights)
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {destination.mainAttractions.map((place) => (
                    <div id={`place-${place.id}`} key={place.id}>
                      <PlaceCard
                        place={place}
                        onFocusMap={() => handlePlaceSelect(place)}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

          {/* B. Nearby Attractions */}
          {(activeCategoryTab === 'all' || activeCategoryTab === 'nearby') &&
            destination.nearbyAttractions.length > 0 && (
              <section id="section-nearby-attractions">
                <div className="flex items-center gap-2 mb-4">
                  <Compass className="w-5 h-5 text-[#0284C7]" />
                  <h3 className="text-xl font-bold text-neutral-900 font-serif-heading">
                    Nearby Attractions & Excursions
                  </h3>
                  <span className="text-xs text-neutral-500">
                    (Approximate travel distance from centre)
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {destination.nearbyAttractions.map((place) => (
                    <div id={`place-${place.id}`} key={place.id}>
                      <PlaceCard
                        place={place}
                        onFocusMap={() => handlePlaceSelect(place)}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

          {/* C. Cafés and Coffee Shops */}
          {(activeCategoryTab === 'all' || activeCategoryTab === 'cafes') &&
            destination.cafes.length > 0 && (
              <section id="section-cafes">
                <div className="flex items-center gap-2 mb-4">
                  <Coffee className="w-5 h-5 text-[#D97706]" />
                  <h3 className="text-xl font-bold text-neutral-900 font-serif-heading">
                    Cafés & Coffee Shops
                  </h3>
                  <span className="text-xs text-neutral-500">
                    ({destination.cafes.length} places to relax)
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {destination.cafes.map((place) => (
                    <div id={`place-${place.id}`} key={place.id}>
                      <PlaceCard
                        place={place}
                        onFocusMap={() => handlePlaceSelect(place)}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

          {/* D. Restaurants & Dining */}
          {(activeCategoryTab === 'all' || activeCategoryTab === 'restaurants') &&
            destination.restaurants.length > 0 && (
              <section id="section-restaurants">
                <div className="flex items-center gap-2 mb-4">
                  <Utensils className="w-5 h-5 text-[#DC2626]" />
                  <h3 className="text-xl font-bold text-neutral-900 font-serif-heading">
                    Restaurants & Food Experiences
                  </h3>
                  <span className="text-xs text-neutral-500">
                    (Sri Lankan cuisine & regional dining)
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {destination.restaurants.map((place) => (
                    <div id={`place-${place.id}`} key={place.id}>
                      <PlaceCard
                        place={place}
                        onFocusMap={() => handlePlaceSelect(place)}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

          {/* E. Hotels & Accommodation */}
          {(activeCategoryTab === 'all' || activeCategoryTab === 'hotels') &&
            destination.hotels.length > 0 && (
              <section id="section-hotels">
                <div className="flex items-center gap-2 mb-4">
                  <Hotel className="w-5 h-5 text-[#4F46E5]" />
                  <h3 className="text-xl font-bold text-neutral-900 font-serif-heading">
                    Hotels & Accommodation
                  </h3>
                  <span className="text-xs text-neutral-500">
                    ({destination.hotels.length} verified stays)
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {destination.hotels.map((place) => (
                    <div id={`place-${place.id}`} key={place.id}>
                      <PlaceCard
                        place={place}
                        onFocusMap={() => handlePlaceSelect(place)}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
        </div>
      </main>
    </div>
  );
};
