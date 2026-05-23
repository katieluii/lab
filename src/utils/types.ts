export interface DateIdea {
  id: string;
  title: string;
  description: string;
  category: 'outdoor' | 'dining' | 'cultural' | 'indoor_active' | 'relaxed' | 'entertainment' | 'travel';
  duration: '1-2h' | 'half-day' | 'full-day';
  budget: 'low' | 'medium' | 'splurge';
  weatherSensitive: boolean;
  specificVenue: string | null;
  notes: string;
}

export interface GeoLocation {
  city: string;
  country: string;
  lat: number;
  lon: number;
  displayName: string;
}

export interface WeatherDay {
  date: string; // YYYY-MM-DD
  tempMin: number;
  tempMax: number;
  emoji: string;
  description: string;
  isGoodForOutdoor: boolean;
}

export interface DateSuggestion {
  ideaId: string;
  idea: DateIdea;
  venue: string;
  estimatedDistance: string;
  foodSuggestion: string;
  why: string;
  alternatives: DateIdea[];
}

export interface DateSlot {
  date: string; // YYYY-MM-DD
  weather?: WeatherDay;
  suggestion: DateSuggestion | null;
}

export type Mood = 'lazy' | 'normal' | 'adventurous';
export type FoodPref = 'hot' | 'light' | 'treat' | 'surprise';

export interface ApiKeys {
  anthropic: string;
  openweather: string;
}

export const CATEGORY_META: Record<DateIdea['category'], { emoji: string; label: string; color: string }> = {
  outdoor:       { emoji: '🌿', label: 'Outdoor',      color: 'bg-emerald-100 text-emerald-700' },
  dining:        { emoji: '🍽️', label: 'Dining',       color: 'bg-orange-100 text-orange-700' },
  cultural:      { emoji: '🎨', label: 'Cultural',     color: 'bg-violet-100 text-violet-700' },
  indoor_active: { emoji: '🏓', label: 'Active',       color: 'bg-blue-100 text-blue-700' },
  relaxed:       { emoji: '🛋️', label: 'Relaxed',      color: 'bg-amber-100 text-amber-700' },
  entertainment: { emoji: '🎭', label: 'Entertainment', color: 'bg-pink-100 text-pink-700' },
  travel:        { emoji: '✈️', label: 'Travel',       color: 'bg-sky-100 text-sky-700' },
};

export const BUDGET_META: Record<DateIdea['budget'], { label: string; color: string }> = {
  low:    { label: '£',   color: 'text-zinc-400' },
  medium: { label: '££',  color: 'text-zinc-500' },
  splurge:{ label: '£££', color: 'text-rose-400' },
};

export const DURATION_META: Record<DateIdea['duration'], { label: string }> = {
  '1-2h':     { label: '1–2 hrs' },
  'half-day': { label: 'Half day' },
  'full-day': { label: 'Full day' },
};
