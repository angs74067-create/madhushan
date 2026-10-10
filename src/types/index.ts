export type PlaceCategory = 'main_attraction' | 'nearby_attraction' | 'cafe' | 'restaurant' | 'hotel';

export interface PlaceItem {
  id: string;
  name: string;
  category: PlaceCategory;
  description: string;
  image?: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceFromCenterKm?: number;
  directionsUrl: string;
  websiteUrl?: string;
  specialityOrHighlights?: string;
  isVerified: boolean;
}

export type DestinationTag =
  | 'Culture & Heritage'
  | 'Beaches'
  | 'Wildlife'
  | 'Nature'
  | 'Hill Country & Mountains'
  | 'Food & Dining'
  | 'Urban & Capital';

export interface Destination {
  id: string;
  name: string;
  subtitle: string;
  district: string;
  province: string;
  coverImage: string;
  overview: string;
  bestTimeToVisit: string;
  tags: DestinationTag[];
  coordinates: {
    lat: number;
    lng: number;
  };
  mainAttractions: PlaceItem[];
  nearbyAttractions: PlaceItem[];
  cafes: PlaceItem[];
  restaurants: PlaceItem[];
  hotels: PlaceItem[];
  culturalNotes?: string;
}

export type ActiveView = 
  | { type: 'home' }
  | { type: 'destination'; destinationId: string }
  | { type: 'guide' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'not_found' };
