import React, { useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { DestinationCard } from '../components/DestinationCard';
import {
  FEATURED_BEACHES,
  HERITAGE_SITES,
  NATURE_WILDLIFE,
  HILL_COUNTRY_WATERFALLS,
  CUISINE_EXPERIENCES,
  TRAVEL_TIPS,
} from '../data/guideData';
import {
  Search,
  Compass,
  ArrowRight,
  Waves,
  Landmark,
  Trees,
  Mountain,
  Utensils,
  Lightbulb,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

interface HomeViewProps {
  onSelectDestination: (destinationId: string) => void;
  onOpenSearchWithQuery: (query: string) => void;
  onNavigateTab: (tab: 'home' | 'destinations' | 'guide' | 'about' | 'contact') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectDestination,
  onOpenSearchWithQuery,
  onNavigateTab,
}) => {
  const [heroSearchInput, setHeroSearchInput] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      onOpenSearchWithQuery(heroSearchInput.trim());
    } else {
      const destSection = document.getElementById('destinations-grid');
      destSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredDestinations = DESTINATIONS.filter((d) => {
    if (selectedTag === 'All') return true;
    if (selectedTag === 'Beaches') return d.tags.includes('Beaches');
    if (selectedTag === 'Culture & Heritage') return d.tags.includes('Culture & Heritage');
    if (selectedTag === 'Hill Country') return d.tags.includes('Hill Country & Mountains');
    if (selectedTag === 'Wildlife & Nature') return d.tags.includes('Wildlife') || d.tags.includes('Nature');
    if (selectedTag === 'Food & Dining') return d.tags.includes('Food & Dining');
    return true;
  });

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-neutral-900 text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_sri_lanka_1791641478939.jpg"
            alt="Sigiriya Rock Fortress at sunrise in Sri Lanka"
            className="w-full h-full object-cover scale-102"
          />
          {/* Subtle multi-stop gradient scrim for 4.5:1 text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-white/95">
            <Sparkles className="w-3.5 h-3.5 text-[#E27D48]" />
            <span>Discover Sri Lanka · Independent Island Guide</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif-heading max-w-3xl mx-auto leading-tight text-balance">
            Discover the Beauty of Sri Lanka
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            Explore breathtaking landscapes, ancient kingdoms, golden beaches, wildlife, local food, and unforgettable places across the island.
          </p>

          {/* Destination Search Box */}
          <form
            onSubmit={handleHeroSearchSubmit}
            className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row items-stretch gap-2.5 p-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/40"
          >
            <div className="relative flex-1 flex items-center pl-3">
              <Search className="w-5 h-5 text-neutral-400 shrink-0 mr-2" />
              <input
                type="text"
                value={heroSearchInput}
                onChange={(e) => setHeroSearchInput(e.target.value)}
                placeholder="Where do you want to explore?"
                className="w-full bg-transparent text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#184E3F] text-white text-xs sm:text-sm font-semibold hover:bg-[#0E352A] transition-colors whitespace-nowrap shadow-xs flex items-center justify-center gap-2"
            >
              <span>Explore Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Island Highlights Ribbon */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E27D48]" />
              <span>13 Curated Destinations</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>UNESCO Heritage Citadels</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Whale & Leopard Safaris</span>
            </span>
          </div>
        </div>
      </section>

      {/* Popular Destinations Grid (All 13 Destinations) */}
      <section id="destinations-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-[#184E3F] uppercase tracking-wider">
              Island Discovery
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif-heading mt-1">
              Popular Destinations in Sri Lanka
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
              All 13 iconic regions featuring verified attractions, nearby day trips, cafés, dining spots, and stays.
            </p>
          </div>

          {/* Interactive Tag Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {['All', 'Culture & Heritage', 'Beaches', 'Hill Country', 'Wildlife & Nature', 'Food & Dining'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedTag === tag
                    ? 'bg-[#184E3F] text-white shadow-xs'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 13 Destinations Grid: 3-4 cards per row desktop, 1-2 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onSelect={onSelectDestination}
            />
          ))}
        </div>
      </section>

      {/* Featured Attractions Spotlight */}
      <section className="bg-neutral-50/80 py-16 border-y border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-[#184E3F] uppercase tracking-wider">
              Iconic Wonders
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif-heading mt-1">
              Featured Attractions
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Signature monuments that define the soul, heritage, and geography of Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nine Arch Bridge */}
            <div
              onClick={() => onSelectDestination('ella')}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-neutral-200/80 shadow-xs hover:shadow-lg transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src="/src/assets/images/ella_train_bridge_1791641493539.jpg"
                  alt="Nine Arch Bridge Ella"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 text-white text-[11px] backdrop-blur-xs font-medium">
                  Ella · Badulla
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#184E3F] font-serif-heading">
                  Nine Arch Bridge & Tea Trails
                </h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  Historic 1921 British viaduct bridge framed by wild jungle gorges and passing vintage trains.
                </p>
                <div className="mt-3 text-xs font-semibold text-[#184E3F] flex items-center gap-1">
                  <span>Explore Ella Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Sigiriya Lion Rock */}
            <div
              onClick={() => onSelectDestination('sigiriya')}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-neutral-200/80 shadow-xs hover:shadow-lg transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src="/src/assets/images/hero_sri_lanka_1791641478939.jpg"
                  alt="Sigiriya Rock Fortress"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 text-white text-[11px] backdrop-blur-xs font-medium">
                  Sigiriya · Matale
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#184E3F] font-serif-heading">
                  Sigiriya Lion Rock Citadel
                </h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  5th-century UNESCO World Heritage sky palace adorned with classic cloud maiden frescoes.
                </p>
                <div className="mt-3 text-xs font-semibold text-[#184E3F] flex items-center gap-1">
                  <span>Explore Sigiriya Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Galle Fort Lighthouse */}
            <div
              onClick={() => onSelectDestination('galle')}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-neutral-200/80 shadow-xs hover:shadow-lg transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src="/src/assets/images/galle_fort_lighthouse_1791641521561.jpg"
                  alt="Galle Fort Lighthouse"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 text-white text-[11px] backdrop-blur-xs font-medium">
                  Galle Fort · Southern Coast
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#184E3F] font-serif-heading">
                  Galle Fort Lighthouse & Bastions
                </h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  The historic 1939 beacon guarding Point Utrecht Bastion overlooking the Indian Ocean.
                </p>
                <div className="mt-3 text-xs font-semibold text-[#184E3F] flex items-center gap-1">
                  <span>Explore Galle Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Beaches in Sri Lanka */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] uppercase tracking-wider">
              <Waves className="w-4 h-4" />
              <span>Coastal Escapes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif-heading mt-1">
              Best Beaches in Sri Lanka
            </h2>
          </div>
          <button
            onClick={() => onNavigateTab('guide')}
            className="text-xs font-semibold text-[#184E3F] hover:underline flex items-center gap-1"
          >
            <span>Beach seasons guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_BEACHES.map((beach) => (
            <div
              key={beach.id}
              onClick={() => onSelectDestination(beach.destinationId)}
              className="group cursor-pointer rounded-xl bg-white border border-neutral-200 p-4 transition-all hover:border-neutral-300 hover:shadow-md"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 mb-3 relative">
                <img
                  src={beach.image}
                  alt={beach.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#184E3F] font-serif-heading">
                {beach.title}
              </h3>
              <p className="text-xs text-[#0284C7] font-medium mb-1.5">{beach.subtitle}</p>
              <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                {beach.description}
              </p>
              <ul className="mt-3 pt-2.5 border-t border-neutral-100 space-y-1 text-[11px] text-neutral-500">
                {beach.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#0284C7]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Ancient Heritage Sites */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#184E3F] uppercase tracking-wider">
            <Landmark className="w-4 h-4" />
            <span>Living History</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif-heading mt-1">
            Ancient Heritage Sites
          </h2>
          <p className="text-sm text-neutral-600 mt-1 max-w-xl">
            Sri Lanka is home to 8 UNESCO World Heritage Sites spanning over 2,500 years of recorded history.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HERITAGE_SITES.map((site) => (
            <div
              key={site.id}
              onClick={() => onSelectDestination(site.destinationId)}
              className="group cursor-pointer rounded-xl bg-white border border-neutral-200 p-4 transition-all hover:border-neutral-300 hover:shadow-md"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 mb-3 relative">
                <img
                  src={site.image}
                  alt={site.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#184E3F] font-serif-heading">
                {site.title}
              </h3>
              <p className="text-xs text-[#184E3F] font-medium mb-1.5">{site.subtitle}</p>
              <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                {site.description}
              </p>
              <ul className="mt-3 pt-2.5 border-t border-neutral-100 space-y-1 text-[11px] text-neutral-500">
                {site.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#184E3F]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Nature, Wildlife & Hill Country (2-Column Feature) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Nature and Wildlife */}
          <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              <Trees className="w-4 h-4" />
              <span>Wildlife Sanctuaries</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif-heading mb-2">
              Nature and Wildlife
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mb-6">
              From the highest density of leopards in Yala to the migration of blue whales off Mirissa and coral reefs in Trincomalee.
            </p>

            <div className="space-y-4">
              {NATURE_WILDLIFE.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectDestination(item.destinationId)}
                  className="p-3.5 rounded-xl border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50/60 cursor-pointer transition-all flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 font-serif-heading">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-0.5">{item.subtitle}</p>
                  </div>
                  <span className="text-xs font-medium text-[#184E3F] whitespace-nowrap flex items-center gap-1">
                    <span>View Sights</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hill Country and Waterfalls */}
          <div className="rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#184E3F] uppercase tracking-wider mb-2">
              <Mountain className="w-4 h-4" />
              <span>Highland Treks</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif-heading mb-2">
              Hill Country & Waterfalls
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mb-6">
              Misty mountain passes, rolling tea plantations, cool highland climates, and majestic waterfalls in Ella and Nuwara Eliya.
            </p>

            <div className="space-y-4">
              {HILL_COUNTRY_WATERFALLS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectDestination(item.destinationId)}
                  className="p-3.5 rounded-xl border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50/60 cursor-pointer transition-all flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 font-serif-heading">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-500 mt-0.5">{item.subtitle}</p>
                  </div>
                  <span className="text-xs font-medium text-[#184E3F] whitespace-nowrap flex items-center gap-1">
                    <span>View Sights</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sri Lankan Food and Culture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#DC2626] uppercase tracking-wider">
            <Utensils className="w-4 h-4" />
            <span>Flavours of the Island</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 font-serif-heading mt-1">
            Sri Lankan Food & Culinary Culture
          </h2>
          <p className="text-sm text-neutral-600 mt-1 max-w-xl">
            A rich tapestry of indigenous spices, coconut milk gravies, fresh seafood, and Dutch and South Indian influences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CUISINE_EXPERIENCES.map((food, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white border border-neutral-200/90 p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-neutral-900 font-serif-heading mb-2">
                  {food.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {food.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] text-neutral-500">
                <span className="font-semibold text-neutral-700">Recommended in: </span>
                <span>{food.signatureLocations.join(' · ')}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Essential Travel Tips Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-neutral-900 text-white p-8 sm:p-10 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#E27D48] uppercase tracking-wider mb-1">
                <Lightbulb className="w-4 h-4" />
                <span>Travel Smarter</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading">
                Essential Sri Lanka Travel Tips
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('guide')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-colors flex items-center gap-1.5 w-fit"
            >
              <span>Read Full Travel Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAVEL_TIPS.map((tip, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-base font-bold text-white font-serif-heading">
                  {tip.title}
                </h3>
                <p className="text-xs font-semibold text-[#E27D48]">
                  {tip.summary}
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {tip.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
