import React, { useState } from 'react';
import { TRAVEL_TIPS } from '../data/guideData';
import {
  Calendar,
  Compass,
  Train,
  ShieldCheck,
  CreditCard,
  PhoneCall,
  Sun,
  CloudRain,
  ExternalLink,
  MapPin,
  HelpCircle
} from 'lucide-react';

interface TravelGuideViewProps {
  onSelectDestination: (destinationId: string) => void;
}

export const TravelGuideView: React.FC<TravelGuideViewProps> = ({ onSelectDestination }) => {
  const [selectedSeason, setSelectedSeason] = useState<'nov_apr' | 'may_oct'>('nov_apr');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold text-[#184E3F] uppercase tracking-wider">
          Practical Traveler Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 font-serif-heading">
          Essential Travel Guide to Sri Lanka
        </h1>
        <p className="text-base text-neutral-600 leading-relaxed">
          Everything you need to know before landing: visa regulations, dual monsoon seasons, scenic train reservations, cultural etiquette, and currency.
        </p>
      </div>

      {/* 1. Dual Monsoon Interactive Weather Tool */}
      <section className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0284C7] uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>Weather & Monsoons</span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 font-serif-heading">
              When to Visit Which Coast
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Sri Lanka is a year-round destination because the two monsoon cycles alternate opposite sides of the island.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl shrink-0 text-xs">
            <button
              onClick={() => setSelectedSeason('nov_apr')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedSeason === 'nov_apr'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              November – April
            </button>
            <button
              onClick={() => setSelectedSeason('may_oct')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedSeason === 'may_oct'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              May – October
            </button>
          </div>
        </div>

        {selectedSeason === 'nov_apr' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                <Sun className="w-4 h-4 text-amber-600" />
                <span>Prime Region: South, West Coast & Central Hills</span>
              </div>
              <p className="text-xs text-amber-950/80 leading-relaxed">
                Calm turquoise seas, dry sunny days, and peak whale watching season. Ideal for beach relaxing, surfing, and hiking in the mountains.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                {['Galle', 'Mirissa', 'Colombo', 'Ella', 'Kandy', 'Nuwara Eliya'].map((name) => (
                  <span key={name} className="px-2.5 py-1 rounded-md bg-white/80 border border-amber-300 text-amber-900 font-medium">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3 text-neutral-600">
              <div className="flex items-center gap-2 text-neutral-800 font-semibold text-sm">
                <CloudRain className="w-4 h-4 text-blue-500" />
                <span>Northeast Coast Season</span>
              </div>
              <p className="text-xs leading-relaxed">
                The Northeast Maha monsoon affects Trincomalee and Jaffna with occasional heavy showers and rougher coastal waters.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-semibold text-sm">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Prime Region: East Coast & Cultural Triangle</span>
              </div>
              <p className="text-xs text-blue-950/80 leading-relaxed">
                Clear sunny skies, calm waters, pristine diving, and world-class surfing waves on the east coast. Anuradhapura, Polonnaruwa, and Sigiriya are warm and dry.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                {['Trincomalee', 'Arugam Bay', 'Sigiriya', 'Anuradhapura', 'Polonnaruwa', 'Jaffna'].map((name) => (
                  <span key={name} className="px-2.5 py-1 rounded-md bg-white/80 border border-blue-300 text-blue-900 font-medium">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3 text-neutral-600">
              <div className="flex items-center gap-2 text-neutral-800 font-semibold text-sm">
                <CloudRain className="w-4 h-4 text-blue-500" />
                <span>Southwest Coast Season</span>
              </div>
              <p className="text-xs leading-relaxed">
                The Yala monsoon brings tropical downpours and stronger ocean currents to southern and western shores (Mirissa, Galle, Colombo).
              </p>
            </div>
          </div>
        )}
      </section>

      {/* 2. Scenic Train Travel */}
      <section className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#184E3F] uppercase tracking-wider">
          <Train className="w-4 h-4" />
          <span>Scenic Rail Network</span>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 font-serif-heading">
          The Kandy to Ella Scenic Train Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <h3 className="text-sm font-bold text-neutral-900 font-serif-heading mb-1.5">
              Advance Bookings
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Reserved 1st Class observation car and 2nd class reserved seats open exactly 30 days prior to departure through Sri Lanka Railways e-ticketing portal.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <h3 className="text-sm font-bold text-neutral-900 font-serif-heading mb-1.5">
              Which Side to Sit On?
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              From Kandy to Nuwara Eliya (Nanu Oya), sit on the right side. From Nuwara Eliya to Ella, switch to the left side for the best tea estate and waterfall views.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
            <h3 className="text-sm font-bold text-neutral-900 font-serif-heading mb-1.5">
              Unreserved Tickets
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Unreserved 2nd and 3rd class tickets are sold at stations on the day of travel. They do not sell out but can become quite crowded during peak holiday seasons.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Cultural Etiquette & Dress Code */}
      <section className="bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Cultural Norms</span>
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 font-serif-heading">
          Respectful Travel & Sacred Site Etiquette
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-3 text-xs text-neutral-600 leading-relaxed">
            <h3 className="text-sm font-bold text-neutral-900 font-serif-heading">
              Temple & Sacred Precincts
            </h3>
            <p>
              • Always cover shoulders and knees when visiting Buddhist and Hindu temples (Dalada Maligawa, Sigiriya grounds, Anuradhapura, Nallur Kovil).
            </p>
            <p>
              • Remove shoes, socks (optional if stones are hot), and hats at the outer temple perimeter gate.
            </p>
            <p>
              • In Hindu Kovils (such as Nallur in Jaffna), men are customarily asked to remove their shirts before entering the inner sanctum.
            </p>
          </div>

          <div className="space-y-3 text-xs text-neutral-600 leading-relaxed">
            <h3 className="text-sm font-bold text-neutral-900 font-serif-heading">
              Buddha Statues & Wildlife Welfare
            </h3>
            <p>
              • Never pose with your back turned directly against a Buddha statue for photos; this is regarded as deeply disrespectful.
            </p>
            <p>
              • Avoid touching or climbing on ancient stupas, moonstones, or carved guard stones.
            </p>
            <p>
              • Avoid unethical elephant rides or unlicensed safari operators that chase leopards or harass wild animals in Yala.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Practical Logistics Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-3">
          <CreditCard className="w-5 h-5 text-[#184E3F]" />
          <h3 className="text-base font-bold text-neutral-900 font-serif-heading">
            Currency & Cards
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Official currency: Sri Lankan Rupee (LKR). ATMs in major banks (Commercial Bank, Sampath Bank, HNB) dispense LKR reliably. Visa and Mastercard are accepted at hotels and restaurants; carry small cash denominations for tuk-tuks and roadside king coconuts.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-3">
          <PhoneCall className="w-5 h-5 text-[#0284C7]" />
          <h3 className="text-base font-bold text-neutral-900 font-serif-heading">
            SIM Cards & Data
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Dialog and Mobitel offer tourist SIM / eSIM counters in the Bandaranaike International Airport (CMB) arrival hall. Packages typically cost $5–$15 USD for 20GB–50GB of reliable 4G coverage across central and coastal Sri Lanka.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-3">
          <HelpCircle className="w-5 h-5 text-[#DC2626]" />
          <h3 className="text-base font-bold text-neutral-900 font-serif-heading">
            Emergency Contacts
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            • Tourist Police: 1912<br />
            • Police Emergency: 119<br />
            • Suwa Seriya Free Ambulance: 1990<br />
            • Fire & Rescue: 110
          </p>
        </div>
      </section>
    </div>
  );
};
