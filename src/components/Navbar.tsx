import React, { useState } from 'react';
import { Search, Menu, X, Compass } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: 'home' | 'destinations' | 'guide' | 'about' | 'contact') => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'guide', label: 'Travel Guide' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  const handleNavClick = (id: 'home' | 'destinations' | 'guide' | 'about' | 'contact') => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand wordmark (single text element) */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#184E3F] whitespace-nowrap shrink-0 font-serif-heading hover:opacity-90 transition-opacity text-left"
          >
            <Compass className="w-5 h-5 text-[#E27D48] shrink-0" />
            <span>Discover Sri Lanka</span>
          </button>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#184E3F] ${
                  currentTab === item.id ? 'text-[#184E3F] font-semibold' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action & search trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search destinations and attractions"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/80 transition-colors"
            >
              <Search className="w-4 h-4 text-neutral-500" />
              <span className="hidden sm:inline">Search Guide</span>
              <kbd className="hidden lg:inline-block ml-1 px-1.5 py-0.5 text-[10px] bg-white border border-neutral-200 rounded text-neutral-400">
                /
              </kbd>
            </button>

            {/* Mobile menu toggle button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentTab === item.id
                  ? 'bg-[#184E3F]/10 text-[#184E3F] font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#184E3F] text-white text-sm font-semibold hover:bg-[#0E352A] transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Search All Destinations</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
