import rawConcerts from './nota-concerts.json';

export type Period = 'baroque' | 'classical' | 'romantic' | 'late-romantic' | 'impressionist' | 'modern' | 'contemporary';
export type Format = 'solo-piano' | 'piano-concerto' | 'string-quartet' | 'chamber' | 'symphony' | 'opera' | 'choral' | 'song-recital' | 'early-music' | 'violin-concerto' | 'cello-concerto';
export type Mood = 'dramatic' | 'melancholic' | 'energetic' | 'peaceful' | 'playful' | 'experimental';

export interface ProgrammeItem { composer: string; work: string; }

export interface Concert {
  id: string;
  title: string;
  subtitle: string;
  venue: string;
  date: string;
  time: string;
  performers: string[];
  programme: ProgrammeItem[];
  periods: Period[];
  formats: Format[];
  moods: Mood[];
  ticketUrl: string;
  price: string;
  highlight?: string;
}

export const CONCERTS: Concert[] = rawConcerts as unknown as Concert[];
