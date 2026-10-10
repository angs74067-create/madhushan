import React, { useState, useEffect } from 'react';
import { DESTINATIONS } from './data/destinations';
import { Destination } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomeView } from './views/HomeView';
import { DestinationDetailView } from './views/DestinationDetailView';
import { TravelGuideView } from './views/TravelGuideView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { NotFoundView } from './views/NotFoundView';

type AppRoute =
  | { type: 'home' }
  | { type: 'destinations' }
  | { type: 'destination'; id: string; placeId?: string }
  | { type: 'guide' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: '404' };

export default function App() {
  const [route, setRoute] = useState<AppRoute>({ type: 'home' });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');

  // Parse location hash
  const parseHash = (): AppRoute => {
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!hash || hash === 'home') {
      return { type: 'home' };
    }
    if (hash === 'destinations') {
      return { type: 'destinations' };
    }
    if (hash === 'guide') {
      return { type: 'guide' };
    }
    if (hash === 'about') {
      return { type: 'about' };
    }
    if (hash === 'contact') {
      return { type: 'contact' };
    }
    if (hash.startsWith('destination/')) {
      const parts = hash.split('/');
      const destId = parts[1];
      const placeId = parts[2];
      const exists = DESTINATIONS.some((d) => d.id === destId);
      if (exists) {
        return { type: 'destination', id: destId, placeId };
      }
      return { type: '404' };
    }
    return { type: '404' };
  };

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // Initial parse
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard shortcut '/' to trigger search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (newHash: string) => {
    window.location.hash = newHash;
  };

  const handleSelectDestination = (destId: string, placeId?: string) => {
    if (placeId) {
      navigateTo(`destination/${destId}/${placeId}`);
    } else {
      navigateTo(`destination/${destId}`);
    }
  };

  const handleNavTab = (tab: 'home' | 'destinations' | 'guide' | 'about' | 'contact') => {
    if (tab === 'destinations') {
      if (route.type === 'home') {
        const elem = document.getElementById('destinations-grid');
        elem?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigateTo('destinations');
        setTimeout(() => {
          document.getElementById('destinations-grid')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigateTo(tab);
    }
  };

  const handleOpenSearchWithQuery = (query: string) => {
    setSearchInitialQuery(query);
    setIsSearchOpen(true);
  };

  // Find active destination object if on destination route
  const currentDestination: Destination | undefined =
    route.type === 'destination' ? DESTINATIONS.find((d) => d.id === route.id) : undefined;

  const currentTab =
    route.type === 'destination' || route.type === 'destinations'
      ? 'destinations'
      : route.type === 'guide'
      ? 'guide'
      : route.type === 'about'
      ? 'about'
      : route.type === 'contact'
      ? 'contact'
      : 'home';

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#1D2924]">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavTab}
        onOpenSearch={() => {
          setSearchInitialQuery('');
          setIsSearchOpen(true);
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {route.type === 'home' || route.type === 'destinations' ? (
          <HomeView
            onSelectDestination={handleSelectDestination}
            onOpenSearchWithQuery={handleOpenSearchWithQuery}
            onNavigateTab={handleNavTab}
          />
        ) : route.type === 'destination' && currentDestination ? (
          <DestinationDetailView
            destination={currentDestination}
            onBack={() => navigateTo('destinations')}
            onSelectDestination={handleSelectDestination}
            targetPlaceId={route.placeId}
          />
        ) : route.type === 'guide' ? (
          <TravelGuideView onSelectDestination={handleSelectDestination} />
        ) : route.type === 'about' ? (
          <AboutView />
        ) : route.type === 'contact' ? (
          <ContactView />
        ) : (
          <NotFoundView onGoHome={() => navigateTo('home')} />
        )}
      </div>

      {/* Footer */}
      <Footer
        onNavigateToDestination={handleSelectDestination}
        onNavigateTab={handleNavTab}
      />

      {/* Global Interactive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchInitialQuery}
        onNavigateToDestination={handleSelectDestination}
      />
    </div>
  );
}
