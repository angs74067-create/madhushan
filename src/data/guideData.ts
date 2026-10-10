export interface ThemeSpotlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  destinationId: string;
  image: string;
  highlights: string[];
}

export interface TravelTip {
  title: string;
  summary: string;
  details: string;
}

export const FEATURED_BEACHES: ThemeSpotlight[] = [
  {
    id: 'mirissa-bay',
    title: 'Mirissa Bay & Coconut Tree Hill',
    subtitle: 'Southern Province',
    description: 'Golden sand crescents, calm turquoise swimming waters, and the iconic palm-studded red headland jutting into the Indian Ocean.',
    destinationId: 'mirissa',
    image: '/src/assets/images/mirissa_beach_coast_1791641508083.jpg',
    highlights: ['Blue whale watching', 'Sunset at Coconut Tree Hill', 'Beachfront seafood grills'],
  },
  {
    id: 'unawatuna-beach',
    title: 'Unawatuna & Jungle Beach',
    subtitle: 'Galle District',
    description: 'A protected horseshoe bay with gentle waters ideal for swimming and snorkeling, framed by Rumassala jungle headland.',
    destinationId: 'galle',
    image: '/src/assets/images/galle_fort_lighthouse_1791641521561.jpg',
    highlights: ['Safe year-round swimming', 'Reef snorkeling at Jungle Beach', '5 mins from Galle Fort'],
  },
  {
    id: 'nilaveli-pigeon-island',
    title: 'Nilaveli & Pigeon Island',
    subtitle: 'Trincomalee Coast',
    description: 'Endless powdery white sands and crystal calm waters on the northeast coast, serving as gateway to live coral marine parks.',
    destinationId: 'trincomalee',
    image: '/src/assets/images/trincomalee_coast_1791643474112.jpg',
    highlights: ['Live coral reef snorkeling', 'Blacktip reef sharks', 'Deep blue water vistas'],
  },
  {
    id: 'arugam-bay-point',
    title: 'Arugam Bay Surf Coast',
    subtitle: 'Eastern Province',
    description: 'Internationally acclaimed right-hand point breaks with laid-back beach cafés, yoga shalas, and lagoons visited by wild elephants.',
    destinationId: 'arugam-bay',
    image: '/src/assets/images/arugam_bay_surf_1791643485717.jpg',
    highlights: ['World-class right-hand surf', 'Whiskey Point sunrise', 'Bohemian beach vibe'],
  },
];

export const HERITAGE_SITES: ThemeSpotlight[] = [
  {
    id: 'sigiriya-citadel',
    title: 'Sigiriya Rock Citadel',
    subtitle: 'UNESCO World Heritage',
    description: '5th-century royal palace and fortress perched 200m atop a sheer volcanic monolith with preserved frescoes and water gardens.',
    destinationId: 'sigiriya',
    image: '/src/assets/images/hero_sri_lanka_1791641478939.jpg',
    highlights: ['Ancient summit palace', 'World-famous cloud maiden frescoes', 'Symmetrical hydraulic gardens'],
  },
  {
    id: 'galle-dutch-ramparts',
    title: 'Galle Fort Ramparts',
    subtitle: 'UNESCO World Heritage',
    description: 'The best-preserved European fortified city in South Asia, enclosing historic churches, Dutch villas, and ocean bastions.',
    destinationId: 'galle',
    image: '/src/assets/images/galle_fort_lighthouse_1791641521561.jpg',
    highlights: ['Historic 1939 lighthouse', 'Flag Rock ocean bastion', 'Cobblestone streets'],
  },
  {
    id: 'anuradhapura-stupa',
    title: 'Ruwanwelisaya & Sri Maha Bodhi',
    subtitle: 'Ancient Kingdom (4th c. BCE)',
    description: 'The ancient spiritual heart of Sri Lankan Buddhism, home to the oldest documented human-planted tree and colossal stupas.',
    destinationId: 'anuradhapura',
    image: '/src/assets/images/anuradhapura_stupa_1791643463001.jpg',
    highlights: ['Jaya Sri Maha Bodhi tree', '103m Ruwanwelisaya dome', 'Elephant stone frieze'],
  },
  {
    id: 'polonnaruwa-galvihara',
    title: 'Gal Vihara Rock Sculptures',
    subtitle: 'Medieval Capital (11th-13th c.)',
    description: 'Sublime masterwork Buddha figures carved directly out of a single granite outcrop during the reign of King Parakramabahu I.',
    destinationId: 'polonnaruwa',
    image: '/src/assets/images/hero_sri_lanka_1791641478939.jpg',
    highlights: ['14m reclining Buddha in Parinirvana', 'Parakrama Samudra reservoir', 'Vatadage circular shrine'],
  },
];

export const NATURE_WILDLIFE: ThemeSpotlight[] = [
  {
    id: 'yala-safari-zone',
    title: 'Yala National Park Safari',
    subtitle: 'Southern Wilderness',
    description: 'Unrivaled leopard density on earth along with sloth bears, herds of wild Asian elephants, and coastal lagoons.',
    destinationId: 'yala',
    image: '/src/assets/images/yala_leopard_wild_1791643497430.jpg',
    highlights: ['Sri Lankan leopard tracking', 'Wild elephant herds', 'Over 215 bird species'],
  },
  {
    id: 'horton-plains-cloudforest',
    title: 'Horton Plains & World’s End',
    subtitle: 'Central Highlands',
    description: 'High-elevation cloud forest plateau featuring the dramatic 870-metre sheer precipice of World’s End and Baker’s Falls.',
    destinationId: 'nuwara-eliya',
    image: '/src/assets/images/ella_train_bridge_1791641493539.jpg',
    highlights: ['870m cliff drop', 'Endemic highland flora', 'Baker’s Falls cascade'],
  },
  {
    id: 'mirissa-marine-life',
    title: 'Whale Watching Sanctuary',
    subtitle: 'Indian Ocean Shelf',
    description: 'One of the world’s most accessible deep-water migration corridors for giant blue whales, sperm whales, and spinner dolphins.',
    destinationId: 'mirissa',
    image: '/src/assets/images/mirissa_beach_coast_1791641508083.jpg',
    highlights: ['Blue whale encounters', 'Catamaran morning cruises', 'Playful dolphin pods'],
  },
];

export const HILL_COUNTRY_WATERFALLS: ThemeSpotlight[] = [
  {
    id: 'ella-nine-arch',
    title: 'Nine Arch Bridge & Ella Gap',
    subtitle: 'Uva Province Highlands',
    description: 'The world-famous stone viaduct bridge curving through misty green tea valleys where vintage passenger trains pass.',
    destinationId: 'ella',
    image: '/src/assets/images/ella_train_bridge_1791641493539.jpg',
    highlights: ['Vintage blue train crossings', 'Little Adam’s Peak hike', 'Cool mountain breezes'],
  },
  {
    id: 'nuwara-eliya-estates',
    title: 'High-Grown Ceylon Tea Estates',
    subtitle: 'Nuwara Eliya Highlands',
    description: 'Endless carpets of tea bushes at 1,800m altitude producing the champagne of Ceylon teas, bordered by cascading waterfalls.',
    destinationId: 'nuwara-eliya',
    image: '/src/assets/images/nuwara_eliya_tea_1791643450421.jpg',
    highlights: ['Orthodox tea factory tours', 'Ramboda Falls', 'Lake Gregory promenades'],
  },
];

export const CUISINE_EXPERIENCES = [
  {
    title: 'Authentic Clay Pot Rice & Curry',
    description: 'Fragrant red and samba rice served with 4 to 6 aromatic curries (dhal, spiced jackfruit, beetroot, brinjal moju) and freshly grated coconut pol sambol.',
    signatureLocations: ['Upali’s by Nawaloka (Colombo)', 'Octagon (Sigiriya)', 'Local village homes'],
  },
  {
    title: 'Legendary Lagoon Crab & Seafood',
    description: 'Sri Lanka’s freshwater lagoon crabs are globally coveted for sweet meat and immense size, prepared with black pepper, garlic chili, or Jaffna curry powder.',
    signatureLocations: ['Ministry of Crab (Colombo)', 'Jetwing Jaffna', 'Crab & Prawn (Trincomalee)'],
  },
  {
    title: 'Crispy Hoppers & Street Kottu Roti',
    description: 'Crisp bowl-shaped fermented rice-flour pancakes with soft steamed centers (Appa) and sizzling chopped roti stir-fried on metal hotplates with fresh spices (Kottu).',
    signatureLocations: ['Hoppa (Galle Fort)', 'Dewmini Roti Shop (Mirissa)', 'Pettah street stalls'],
  },
  {
    title: 'Ceylon High-Grown Tea Rituals',
    description: 'Pure single-origin black tea cultivated in Nuwara Eliya and Dimbula, prepared fresh in porcelain pots or infused with wild cinnamon and lemongrass.',
    signatureLocations: ['The Grand Hotel (Nuwara Eliya)', 'Ceylon Tea Museum (Kandy)', 'Amangalla Veranda (Galle)'],
  },
];

export const TRAVEL_TIPS: TravelTip[] = [
  {
    title: 'Dual Monsoon Weather Pattern',
    summary: 'Sri Lanka offers sunny beach weather somewhere on the island year-round.',
    details: 'The southwest monsoon brings rain to the south and west coasts (Colombo, Galle, Mirissa) from May to September, making this the prime sunny season for the east coast (Trincomalee, Arugam Bay). Conversely, from December to April, the south and west coasts enjoy calm waters and blue skies.',
  },
  {
    title: 'Scenic Train Journeys',
    summary: 'The Kandy to Ella train ride is recognized among the most beautiful rail journeys in the world.',
    details: 'The vintage blue train winds past misty pine forests, cascading waterfalls, and manicured tea plantations. Reserved observation cars and 1st/2nd class seats open for booking 30 days ahead on the official Sri Lanka Railways portal.',
  },
  {
    title: 'Sacred Site Etiquette',
    summary: 'Respectful attire is mandatory at all Buddhist and Hindu temples across Sri Lanka.',
    details: 'Cover your shoulders and knees (carry a light sarong or scarf). Remove shoes and headwear before entering temple gates. Never pose with your back turned directly to a Buddha statue, and refrain from photographing people without permission during worship.',
  },
  {
    title: 'Currency & Connectivity',
    summary: 'The local currency is the Sri Lankan Rupee (LKR). Local eSIMs / SIM cards are readily available.',
    details: 'ATMs are widely accessible in all major towns. While credit cards are accepted in hotels and restaurants, cash is essential for tuk-tuks, local village fruit stalls, and tips. Tourist SIM packages with high-speed 4G data can be purchased at Bandaranaike International Airport arrival hall.',
  },
];
