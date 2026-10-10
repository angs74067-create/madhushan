import React from 'react';
import { Destination } from '../types';
import { ArrowRight, MapPin, Compass } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destinationId: string) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(destination.id)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-neutral-200/80 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-neutral-300 cursor-pointer"
    >
      <div>
        {/* Card Image Container with 4:3 Aspect Ratio */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
          <img
            src={destination.coverImage}
            alt={`${destination.name}, ${destination.subtitle}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={(e) => {
              // Graceful fallback to styled neutral gradient container if image cannot be rendered
              (e.currentTarget as HTMLElement).style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.classList.add('bg-gradient-to-br', 'from-[#184E3F]', 'to-[#0E352A]');
              }
            }}
          />

          {/* Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

          {/* District & Tag metadata overlay at bottom of image */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs pointer-events-none">
            <span className="flex items-center gap-1 font-medium text-white/90 drop-shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#E27D48]" />
              <span>{destination.district}</span>
            </span>
            <span className="text-white/80 text-[11px] font-normal">
              {destination.province}
            </span>
          </div>
        </div>

        {/* Content body */}
        <div className="p-5">
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <h3 className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-[#184E3F] transition-colors font-serif-heading">
              {destination.name}
            </h3>
          </div>

          <p className="text-xs font-semibold text-[#184E3F] mb-2 uppercase tracking-wide">
            {destination.subtitle}
          </p>

          <p className="line-clamp-2 text-sm text-neutral-600 leading-relaxed">
            {destination.overview}
          </p>

          {/* Quick Stats / Points count */}
          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-3 text-xs text-neutral-500">
            <span>{destination.mainAttractions.length + destination.nearbyAttractions.length} Attractions</span>
            <span aria-hidden="true">·</span>
            <span>{destination.restaurants.length + destination.cafes.length} Dining</span>
            <span aria-hidden="true">·</span>
            <span>{destination.hotels.length} Stays</span>
          </div>
        </div>
      </div>

      {/* Card Footer with explicit Explore button */}
      <div className="px-5 pb-5 pt-1">
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100/80">
          <span className="text-xs font-semibold text-[#184E3F] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1.5">
            <span>Explore Destination</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <span className="text-[11px] text-neutral-400 group-hover:text-neutral-600">
            View Guide
          </span>
        </div>
      </div>
    </article>
  );
};
