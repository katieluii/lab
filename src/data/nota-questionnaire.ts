import type { Period, Format, Mood } from './nota-concerts';

export interface TasteProfile {
  periods: Partial<Record<Period, number>>;
  formats: Partial<Record<Format, number>>;
  moods: Partial<Record<Mood, number>>;
}

export interface QuestionOption {
  id: string;
  label: string;
  emoji: string;
  description?: string;
  tags: { periods?: Period[]; formats?: Format[]; moods?: Mood[]; };
}

export interface Question {
  id: string;
  question: string;
  subtext?: string;
  multiSelect: boolean;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: 'A piece of music made you stop what you were doing. Which moment fits?',
    subtext: 'Pick as many as feel true',
    multiSelect: true,
    options: [
      { id: 'q1-film', label: 'A film score swelling at the perfect moment', emoji: '🎬', tags: { moods: ['dramatic'], periods: ['romantic', 'late-romantic'] } },
      { id: 'q1-solo', label: 'A solo instrument, quietly devastating', emoji: '🎹', tags: { moods: ['melancholic'], formats: ['solo-piano', 'song-recital'] } },
      { id: 'q1-orchestra', label: 'A full orchestra going absolutely full throttle', emoji: '🎺', tags: { moods: ['dramatic', 'energetic'], formats: ['symphony', 'piano-concerto'] } },
      { id: 'q1-voices', label: 'Voices harmonising in a way that gave you chills', emoji: '🎶', tags: { moods: ['dramatic', 'peaceful'], formats: ['choral', 'opera'] } },
      { id: 'q1-rhythmic', label: 'Something hypnotic — repeating, building, impossible to ignore', emoji: '🌀', tags: { moods: ['experimental', 'peaceful'], periods: ['contemporary', 'impressionist'] } },
      { id: 'q1-intricate', label: 'Intricate counterpoint — layers weaving together perfectly', emoji: '🧩', tags: { moods: ['playful', 'peaceful'], periods: ['baroque'] } },
    ],
  },
  {
    id: 'q2',
    question: "It's a free evening. What sounds right?",
    subtext: 'One answer only',
    multiSelect: false,
    options: [
      { id: 'q2-intimate', label: 'Something intimate — just a pianist in a small hall', emoji: '🕯️', description: 'Close to the music, nothing between you and the performer', tags: { formats: ['solo-piano', 'song-recital'], moods: ['melancholic', 'peaceful'] } },
      { id: 'q2-big', label: 'Something huge — full orchestra, big hall, big feelings', emoji: '🏛️', description: 'The kind of concert you feel in your chest', tags: { formats: ['symphony', 'piano-concerto'], moods: ['dramatic', 'energetic'] } },
      { id: 'q2-chamber', label: 'A small group — string quartet or chamber ensemble', emoji: '🎻', description: 'Intimate but complex — music where you can hear every line', tags: { formats: ['string-quartet', 'chamber'] } },
      { id: 'q2-voice', label: 'A singer — opera, lieder, something deeply human', emoji: '🎤', description: 'The human voice as instrument', tags: { formats: ['opera', 'choral', 'song-recital'] } },
    ],
  },
  {
    id: 'q3',
    question: 'Which composers draw you in?',
    subtext: 'Select all that apply — this shapes the recommendation by era',
    multiSelect: true,
    options: [
      { id: 'q3-bach', label: 'Bach / Handel / Vivaldi', emoji: '⚜️', description: 'Baroque (1600s–1750s)', tags: { periods: ['baroque'] } },
      { id: 'q3-mozart', label: 'Mozart / Haydn / early Beethoven', emoji: '🎀', description: 'Classical (1750–1820)', tags: { periods: ['classical'] } },
      { id: 'q3-romantic', label: 'Chopin / Brahms / Tchaikovsky', emoji: '🌹', description: 'Romantic (1820–1900)', tags: { periods: ['romantic'] } },
      { id: 'q3-late', label: 'Mahler / Strauss / Sibelius / Elgar', emoji: '🌄', description: 'Late Romantic (1880–1920)', tags: { periods: ['late-romantic'] } },
      { id: 'q3-impressionist', label: 'Debussy / Ravel', emoji: '🌊', description: 'Impressionist', tags: { periods: ['impressionist'] } },
      { id: 'q3-modern', label: 'Bartók / Shostakovich / Prokofiev', emoji: '⚡', description: '20th Century Modern', tags: { periods: ['modern'] } },
      { id: 'q3-contemporary', label: 'Philip Glass / Arvo Pärt / living composers', emoji: '🔮', description: 'Contemporary', tags: { periods: ['contemporary'] } },
    ],
  },
  {
    id: 'q4',
    question: 'How are you feeling tonight?',
    subtext: 'What do you want music to do for you?',
    multiSelect: false,
    options: [
      { id: 'q4-wreck', label: 'I want to feel deeply. Wreck me.', emoji: '💔', tags: { moods: ['melancholic', 'dramatic'] } },
      { id: 'q4-electric', label: 'Something that makes me feel electric and alive', emoji: '⚡', tags: { moods: ['energetic', 'dramatic'] } },
      { id: 'q4-calm', label: 'I need to decompress. Something calming.', emoji: '🌿', tags: { moods: ['peaceful'] } },
      { id: 'q4-joyful', label: 'Something joyful and light — I want to smile', emoji: '☀️', tags: { moods: ['playful'] } },
      { id: 'q4-curious', label: "Something I've never heard before. Surprise me.", emoji: '🔭', tags: { moods: ['experimental'] } },
    ],
  },
  {
    id: 'q5',
    question: 'How adventurous are you feeling?',
    subtext: 'Your answer gives us the clearest signal.',
    multiSelect: false,
    options: [
      { id: 'q5-familiar', label: 'Core repertoire — the works I know and return to', emoji: '🏠', tags: { periods: ['romantic', 'classical', 'baroque'] } },
      { id: 'q5-mix', label: 'A mix — something familiar plus something new', emoji: '🗺️', tags: { periods: ['romantic', 'late-romantic', 'impressionist'] } },
      { id: 'q5-edge', label: 'Take me to the edge — contemporary or experimental', emoji: '🚀', tags: { periods: ['modern', 'contemporary'], moods: ['experimental'] } },
    ],
  },
];
