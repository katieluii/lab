export type Status = 'ideating' | 'building' | 'live' | 'later';

export interface Project {
  id: string;
  wp: string;
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  status: Status;
  priority: number;
  tags: string[];
  accentColor: string;
  accentBg: string;
  accentText: string;
  route?: string;
  liveUrl?: string;
}

export const STATUS_META: Record<Status, { label: string; emoji: string; classes: string }> = {
  ideating: {
    label: 'Ideating',
    emoji: '💡',
    classes: 'bg-amber-100 text-amber-700 border border-amber-200',
  },
  building: {
    label: 'Building',
    emoji: '🚧',
    classes: 'bg-blue-100 text-blue-700 border border-blue-200',
  },
  live: {
    label: 'Live',
    emoji: '✅',
    classes: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  },
  later: {
    label: 'Later',
    emoji: '💤',
    classes: 'bg-zinc-100 text-zinc-500 border border-zinc-200',
  },
};

export const projects: Project[] = [
  {
    id: 'date-planner',
    wp: 'WP1',
    emoji: '📅',
    title: 'AI Date Planner',
    tagline: 'Never plan a date again. Just show up.',
    description:
      'Drop a chaotic list of date ideas. The AI structures them, checks the weather, reads your mood, and populates a drag-and-drop calendar. Export straight to Google Calendar. For couples who have ideas but hate planning.',
    status: 'live',
    priority: 1,
    tags: ['Claude API', 'Drag & Drop', 'Calendar Export', 'Weather API'],
    accentColor: '#f43f5e',
    accentBg: 'bg-rose-50',
    accentText: 'text-rose-600',
    route: '/date-planner',
  },
  {
    id: 'couple-gift',
    wp: 'WP2',
    emoji: '🎁',
    title: 'Couple Gift Exchange',
    tagline: 'Elfster, but for two people + an AI secret keeper.',
    description:
      'LDR couples each add a wishlist. An AI blends both lists into suggestions — so neither person knows which gifts came from the other vs the AI. Secrecy by design. Find items in-app, save to a shared room, reveal on the day.',
    status: 'live',
    priority: 4,
    tags: ['Claude API', 'FastAPI', 'SQLite', 'Real-time'],
    accentColor: '#7c3aed',
    accentBg: 'bg-violet-50',
    accentText: 'text-violet-600',
    route: '/couple-gift',
  },
  {
    id: 'dream-diary',
    wp: 'WP3',
    emoji: '🌙',
    title: 'Dream Diary',
    tagline: 'Your dreams, but make them visual.',
    description:
      'Describe your dream in text. AI extracts key scenes and generates images (or video). Review, refine, save. A date-stamped visual diary of your unconscious mind. Future: the dataset for creative AI and neurotech research.',
    status: 'later',
    priority: 6,
    tags: ['DALL-E 3', 'Claude API', 'Video Gen', 'Local Storage'],
    accentColor: '#4338ca',
    accentBg: 'bg-indigo-50',
    accentText: 'text-indigo-600',
  },
  {
    id: 'asmr',
    wp: 'WP4',
    emoji: '🎧',
    title: 'ASMR Recommender',
    tagline: 'Find the tingles that actually work for you.',
    description:
      'A personalised ASMR discovery tool. Takes a short taste quiz (or reads your YouTube history via extension) and recommends content that actually matches your triggers. Long-term: a platform for premium ASMR creators.',
    status: 'later',
    priority: 5,
    tags: ['YouTube API', 'Claude API', 'Chrome Extension', 'Recommender'],
    accentColor: '#059669',
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-600',
  },
  {
    id: 'classical-music',
    wp: 'WP5',
    emoji: '🎻',
    title: 'Classical Music Discovery',
    tagline: 'Find London concerts that match your taste.',
    description:
      'Tell us what you listen for — period, format, emotional register — and Nota surfaces upcoming London concerts worth your evening. Five questions to go from taste to ticket.',
    status: 'live',
    route: '/nota',
    priority: 2,
    tags: ['Web Scraping', 'React', 'TypeScript'],
    accentColor: '#d97706',
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-700',
  },
  {
    id: 'wine',
    wp: 'WP6',
    emoji: '🍷',
    title: 'Wine Recommender',
    tagline: 'Your taste, mapped to bottles you haven\'t discovered.',
    description:
      'For drinkers who can articulate their palate but want to go beyond their usual bottles. Describe your taste — body, acidity, tannins, character — and get matched to wines you probably haven\'t tried, with producers and vintages worth knowing.',
    status: 'live',
    priority: 3,
    tags: ['Claude API', 'Curated DB', 'Recommender', 'FastAPI'],
    accentColor: '#9f1239',
    accentBg: 'bg-rose-50',
    accentText: 'text-rose-900',
    route: '/wine',
  },
];
