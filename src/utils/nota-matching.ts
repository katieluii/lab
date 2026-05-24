import type { Concert, Period, Format, Mood } from '../data/nota-concerts';
import type { TasteProfile, QuestionOption } from '../data/nota-questionnaire';

export function buildProfile(selected: QuestionOption[]): TasteProfile {
  const profile: TasteProfile = { periods: {}, formats: {}, moods: {} };
  for (const opt of selected) {
    for (const p of opt.tags.periods ?? []) profile.periods[p] = (profile.periods[p] ?? 0) + 1;
    for (const f of opt.tags.formats ?? []) profile.formats[f] = (profile.formats[f] ?? 0) + 1;
    for (const m of opt.tags.moods ?? []) profile.moods[m] = (profile.moods[m] ?? 0) + 1;
  }
  return profile;
}

export function scoreConcert(concert: Concert, profile: TasteProfile): number {
  let score = 0;
  for (const p of concert.periods) score += (profile.periods[p] ?? 0) * 2;
  for (const f of concert.formats) score += (profile.formats[f] ?? 0) * 3;
  for (const m of concert.moods) score += (profile.moods[m] ?? 0) * 2;
  return score;
}

export function rankConcerts(concerts: Concert[], profile: TasteProfile): Concert[] {
  return [...concerts].sort((a, b) => scoreConcert(b, profile) - scoreConcert(a, profile));
}

export function topTasteLabels(profile: TasteProfile): string[] {
  const PERIOD_LABELS: Partial<Record<Period, string>> = {
    baroque: 'Baroque', classical: 'Classical period', romantic: 'Romantic',
    'late-romantic': 'Late Romantic', impressionist: 'Impressionist',
    modern: '20th Century Modern', contemporary: 'Contemporary',
  };
  const FORMAT_LABELS: Partial<Record<Format, string>> = {
    'solo-piano': 'Solo piano', 'piano-concerto': 'Piano concerto',
    'string-quartet': 'String quartet', chamber: 'Chamber music',
    symphony: 'Orchestral', opera: 'Opera', choral: 'Choral',
    'song-recital': 'Lieder & art song', 'early-music': 'Early music',
  };
  const MOOD_LABELS: Partial<Record<Mood, string>> = {
    dramatic: 'Dramatic', melancholic: 'Melancholic', energetic: 'Energetic',
    peaceful: 'Peaceful', playful: 'Playful', experimental: 'Experimental',
  };
  const labels: string[] = [];
  const top = (obj: Record<string, number>) => Object.entries(obj).sort(([,a],[,b]) => b-a)[0];
  const tp = top(profile.periods as Record<string,number>);
  const tf = top(profile.formats as Record<string,number>);
  const tm = top(profile.moods as Record<string,number>);
  if (tp) labels.push(PERIOD_LABELS[tp[0] as Period] ?? tp[0]);
  if (tf) labels.push(FORMAT_LABELS[tf[0] as Format] ?? tf[0]);
  if (tm) labels.push(MOOD_LABELS[tm[0] as Mood] ?? tm[0]);
  return labels;
}
