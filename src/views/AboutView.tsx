import React from 'react';
import { Compass, ShieldCheck, MapPin, CheckCircle, Heart, Globe } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-[#184E3F] uppercase tracking-wider">
          Independent Editorial Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 font-serif-heading">
          About Discover Sri Lanka
        </h1>
        <p className="text-lg text-neutral-600 font-medium">
          Explore the Island. Discover the Extraordinary.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-8 space-y-6 shadow-xs leading-relaxed text-neutral-700 text-sm">
        <p>
          <strong>Discover Sri Lanka</strong> is an independent travel discovery platform created to provide accurate, reliable, and beautifully organized travel insights for both international voyagers and local explorers.
        </p>
        <p>
          Sri Lanka is an extraordinary island: within a single morning you can travel from misty tea plantations perched at 1,800 metres in Nuwara Eliya down to golden palm-fringed surf bays in Mirissa or into ancient 2,000-year-old Buddhist kingdoms like Anuradhapura and Sigiriya.
        </p>
        <p>
          Too many travel sites overwhelm users with sponsored clutter, outdated listings, or exaggerated ratings. Our philosophy is different: we focus on pristine destination photography, verified geographical coordinates, direct Google Maps directions links, and verified local recommendations for attractions, dining, and accommodations across all 13 major regions of the island.
        </p>
      </div>

      {/* Trust & Independence Notice */}
      <div className="rounded-2xl bg-amber-50/80 border border-amber-200/90 p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm font-serif-heading">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
          <span>Independent Publication Statement</span>
        </div>
        <p className="text-xs text-amber-950/80 leading-relaxed">
          Please note that <em>Discover Sri Lanka</em> is an independent, non-governmental travel information resource. We do not claim to represent or act as the Sri Lanka Tourism Development Authority (SLTDA) or any government entity. We verify coordinates, business locations, and historical background using official cultural heritage documentation and direct mapping queries.
        </p>
      </div>

      {/* Editorial Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="p-5 rounded-xl bg-white border border-neutral-200 space-y-2">
          <CheckCircle className="w-5 h-5 text-[#184E3F]" />
          <h3 className="text-sm font-bold text-neutral-900 font-serif-heading">
            Verified Locations
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Every attraction, café, and hotel provides verified coordinates with direct one-click Google Maps navigation.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-neutral-200 space-y-2">
          <Globe className="w-5 h-5 text-[#0284C7]" />
          <h3 className="text-sm font-bold text-neutral-900 font-serif-heading">
            Official Links First
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Where available, we link directly to official temple foundations, museum archives, and hotel websites without intermediaries.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-neutral-200 space-y-2">
          <Heart className="w-5 h-5 text-rose-600" />
          <h3 className="text-sm font-bold text-neutral-900 font-serif-heading">
            Responsible Tourism
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            We advocate respectful temple etiquette, animal welfare during wildlife safaris, and support for local family-run eateries.
          </p>
        </div>
      </div>
    </div>
  );
};
