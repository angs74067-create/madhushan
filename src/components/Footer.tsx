import React from 'react';
import { Compass, ShieldCheck, Phone, Mail, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateToDestination: (destinationId: string) => void;
  onNavigateTab: (tab: 'home' | 'destinations' | 'guide' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToDestination, onNavigateTab }) => {
  return (
    <footer className="bg-[#111A17] text-neutral-300 border-t border-neutral-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Purpose Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-serif-heading text-xl font-bold">
              <Compass className="w-5 h-5 text-[#E27D48]" />
              <span>Discover Sri Lanka</span>
            </div>
            <p className="text-xs text-[#E27D48] font-medium tracking-wide">
              Explore the Island. Discover the Extraordinary.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              An independent, curated travel guide dedicated to helping local and international travellers explore Sri Lanka’s ancient kingdoms, hill country tea estates, pristine coastlines, and wildlife sanctuaries.
            </p>
            {/* Independent guide notice */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-800/60 border border-neutral-700/60 text-xs text-neutral-300 max-w-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Independent Travel Resource · Not affiliated with the Sri Lanka Tourism Development Authority (SLTDA). All recommendations and coordinates verified for travelers.
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Explore Guide
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigateTab('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('destinations')}
                  className="hover:text-white transition-colors"
                >
                  All 13 Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('guide')}
                  className="hover:text-white transition-colors"
                >
                  Travel Guide & Tips
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('about')}
                  className="hover:text-white transition-colors"
                >
                  About Our Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Regions Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Top Regions
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigateToDestination('sigiriya')}
                  className="hover:text-white transition-colors"
                >
                  Sigiriya Lion Rock
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToDestination('ella')}
                  className="hover:text-white transition-colors"
                >
                  Ella Mountain Pass
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToDestination('galle')}
                  className="hover:text-white transition-colors"
                >
                  Galle Dutch Fort
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToDestination('mirissa')}
                  className="hover:text-white transition-colors"
                >
                  Mirissa Whale Coast
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToDestination('jaffna')}
                  className="hover:text-white transition-colors"
                >
                  Jaffna Northern Culture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToDestination('yala')}
                  className="hover:text-white transition-colors"
                >
                  Yala Wildlife Safari
                </button>
              </li>
            </ul>
          </div>

          {/* Practical Sri Lanka Emergency Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Emergency & Helplines
            </h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <div className="font-semibold text-white">Tourist Police Hotline</div>
                <div className="text-emerald-400 font-mono text-sm mt-0.5">1912</div>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <div className="font-semibold text-white">Emergency Services / Police</div>
                <div className="text-emerald-400 font-mono text-sm mt-0.5">119 / 110</div>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <div className="font-semibold text-white">Suwa Seriya Ambulance</div>
                <div className="text-emerald-400 font-mono text-sm mt-0.5">1990 (Toll Free)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Discover Sri Lanka. Independent Tourism Discovery Guide.
          </div>
          <div className="flex items-center gap-4">
            <span>Verified coordinates</span>
            <span aria-hidden="true">·</span>
            <span>Google Maps enabled</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for Sri Lanka
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
