import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CONCERTS } from '../data/nota-concerts';
import type { Concert, Period, Mood } from '../data/nota-concerts';
import { QUESTIONS } from '../data/nota-questionnaire';
import type { QuestionOption, TasteProfile } from '../data/nota-questionnaire';
import { buildProfile, rankConcerts, topTasteLabels } from '../utils/nota-matching';
import { ConcertCard } from '../components/nota/ConcertCard';
import { Questionnaire } from '../components/nota/Questionnaire';

type View = 'home' | 'quiz' | 'results' | 'explore';
type SortMode = 'match' | 'date';

const BURGUNDY = '#6B2D3E';

export default function Nota() {
  const [view, setView] = useState<View>('home');
  const [profile, setProfile] = useState<TasteProfile | null>(null);

  function handleQuizComplete(selected: QuestionOption[]) {
    setProfile(buildProfile(selected));
    setView('results');
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <header className="sticky top-0 z-10 bg-[#FAF7F0]/90 backdrop-blur-sm border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-zinc-400 hover:text-zinc-700 transition-colors text-sm">
              ← Lab
            </Link>
            <button
              onClick={() => setView('home')}
              className="font-playfair text-lg font-semibold text-zinc-900 hover:opacity-70 transition-opacity cursor-pointer"
            >
              Nota
            </button>
          </div>
          {view !== 'quiz' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('explore')}
                className={`text-sm px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  view === 'explore' ? 'font-medium text-[#6B2D3E] bg-[#6B2D3E]/10' : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                Browse
              </button>
              <button
                onClick={() => setView('quiz')}
                className="text-sm font-medium px-4 py-1.5 rounded-xl text-white cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: BURGUNDY }}
              >
                Find my match
              </button>
            </div>
          )}
        </div>
      </header>

      {view === 'home' && <HomeView onStart={() => setView('quiz')} onExplore={() => setView('explore')} />}
      {view === 'quiz' && <Questionnaire onComplete={handleQuizComplete} />}
      {view === 'results' && profile && (
        <ResultsView profile={profile} onRetake={() => setView('quiz')} onExplore={() => setView('explore')} />
      )}
      {view === 'explore' && <ExploreView onStartQuiz={() => setView('quiz')} />}
    </div>
  );
}

function HomeView({ onStart, onExplore }: { onStart: () => void; onExplore: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      <span className="inline-block text-xs font-medium tracking-widest uppercase px-4 py-1.5 rounded-full border mb-6"
        style={{ color: '#C9A84C', borderColor: '#C9A84C66' }}>
        London · Classical Music
      </span>
      <h1 className="font-playfair text-5xl md:text-6xl font-bold text-zinc-900 mb-5 leading-[1.1]">
        Find concerts that<br />
        <span className="italic" style={{ color: BURGUNDY }}>move you.</span>
      </h1>
      <p className="text-lg text-zinc-500 max-w-xl mx-auto mb-10 leading-relaxed">
        Classical music can feel overwhelming. Answer five quick questions and we'll match you
        with upcoming London concerts that fit your taste.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
        <button onClick={onStart}
          className="font-medium px-8 py-4 rounded-2xl text-white text-base cursor-pointer hover:opacity-90 transition-opacity"
          style={{ backgroundColor: BURGUNDY }}>
          Take the 5-question quiz →
        </button>
        <button onClick={onExplore}
          className="border-2 font-medium px-8 py-4 rounded-2xl text-base cursor-pointer bg-white transition-colors hover:border-[#6B2D3E]"
          style={{ color: BURGUNDY, borderColor: '#6B2D3E55' }}>
          Browse all concerts
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
        {[
          { step: '01', emoji: '🎵', title: 'Tell us what moves you', desc: 'Five quick questions about the music moments that stuck with you.' },
          { step: '02', emoji: '🎯', title: 'We match your taste', desc: 'We rank upcoming London concerts by how well they fit your preferences.' },
          { step: '03', emoji: '🎟️', title: 'Book your seat', desc: 'Straight to the venue — Wigmore Hall, Barbican, Southbank, and more.' },
        ].map(({ step, emoji, title, desc }) => (
          <div key={step} className="bg-white rounded-2xl p-6 border border-zinc-100 text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{emoji}</span>
              <span className="text-xs font-bold tracking-widest" style={{ color: '#C9A84C' }}>{step}</span>
            </div>
            <h3 className="font-playfair font-semibold text-base text-zinc-900 mb-1.5">{title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 mb-3">Venues covered</p>
      <div className="flex flex-wrap justify-center gap-2">
        {['Wigmore Hall', 'Barbican', 'Southbank Centre', 'Royal Festival Hall'].map(v => (
          <span key={v} className="text-sm text-zinc-500 bg-white border border-zinc-100 px-3 py-1.5 rounded-full">{v}</span>
        ))}
      </div>
    </div>
  );
}

function ResultsView({ profile, onRetake, onExplore }: { profile: TasteProfile; onRetake: () => void; onExplore: () => void }) {
  const [sort, setSort] = useState<SortMode>('match');
  const tasteLabels = topTasteLabels(profile);

  const concerts = useMemo(() => {
    if (sort === 'match') return rankConcerts(CONCERTS, profile);
    return [...CONCERTS].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  }, [sort, profile]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <p className="text-xs font-medium tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>Your taste profile</p>
        <h2 className="font-playfair text-3xl font-semibold text-zinc-900 mb-3">Your concert matches</h2>
        {tasteLabels.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-3">
            {tasteLabels.map(label => (
              <span key={label} className="text-sm px-3 py-1 rounded-full font-medium" style={{ backgroundColor: '#6B2D3E18', color: BURGUNDY }}>{label}</span>
            ))}
          </div>
        )}
        <p className="text-sm text-zinc-400">{concerts.length} upcoming concerts</p>
      </div>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex gap-2">
          {(['match', 'date'] as SortMode[]).map(s => (
            <button key={s} onClick={() => setSort(s)}
              className={`text-sm font-medium px-4 py-2 rounded-xl transition-colors cursor-pointer ${
                sort === s ? 'text-white' : 'bg-white border border-zinc-100 text-zinc-500 hover:border-zinc-300'
              }`}
              style={sort === s ? { backgroundColor: BURGUNDY } : {}}>
              {s === 'match' ? '★ Best match' : '📅 By date'}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <button onClick={onExplore} className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer">Browse all →</button>
          <button onClick={onRetake} className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer">Retake quiz</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {concerts.map((c, i) => <ConcertCard key={c.id} concert={c} rank={sort === 'match' ? i : undefined} />)}
      </div>
    </div>
  );
}

type FilterPeriod = Period | 'all';
type FilterMood = Mood | 'all';

const PERIOD_OPTIONS: { value: FilterPeriod; label: string }[] = [
  { value: 'all', label: 'All periods' },
  { value: 'baroque', label: 'Baroque' },
  { value: 'classical', label: 'Classical' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'late-romantic', label: 'Late Romantic' },
  { value: 'impressionist', label: 'Impressionist' },
  { value: 'modern', label: 'Modern' },
  { value: 'contemporary', label: 'Contemporary' },
];

const MOOD_OPTIONS: { value: FilterMood; label: string; emoji: string }[] = [
  { value: 'all', label: 'Any mood', emoji: '✨' },
  { value: 'dramatic', label: 'Dramatic', emoji: '🎭' },
  { value: 'melancholic', label: 'Melancholic', emoji: '💔' },
  { value: 'energetic', label: 'Energetic', emoji: '⚡' },
  { value: 'peaceful', label: 'Peaceful', emoji: '🌿' },
  { value: 'playful', label: 'Playful', emoji: '☀️' },
  { value: 'experimental', label: 'Experimental', emoji: '🔮' },
];

function ExploreView({ onStartQuiz }: { onStartQuiz: () => void }) {
  const [period, setPeriod] = useState<FilterPeriod>('all');
  const [mood, setMood] = useState<FilterMood>('all');

  const filtered = useMemo(() => {
    return CONCERTS.filter(c => {
      if (period !== 'all' && !c.periods.includes(period as Period)) return false;
      if (mood !== 'all' && !c.moods.includes(mood as Mood)) return false;
      return true;
    }).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  }, [period, mood]);

  const chipClass = (active: boolean) =>
    `text-sm px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
      active ? 'text-white' : 'bg-[#FAF7F0] text-zinc-500 hover:bg-zinc-100'
    }`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h2 className="font-playfair text-3xl font-semibold text-zinc-900 mb-1">All upcoming concerts</h2>
          <p className="text-zinc-400 text-sm">Wigmore Hall · London · {CONCERTS.length} events</p>
        </div>
        <button onClick={onStartQuiz}
          className="text-sm font-medium px-5 py-2.5 rounded-xl text-white cursor-pointer hover:opacity-90 transition-opacity"
          style={{ backgroundColor: BURGUNDY }}>
          ✦ Take the quiz instead
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 p-5 mb-8 space-y-4">
        <div>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">Period</p>
          <div className="flex flex-wrap gap-2">
            {PERIOD_OPTIONS.map(opt => (
              <button key={opt.value} onClick={() => setPeriod(opt.value)}
                className={chipClass(period === opt.value)}
                style={period === opt.value ? { backgroundColor: BURGUNDY } : {}}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-2">Mood</p>
          <div className="flex flex-wrap gap-2">
            {MOOD_OPTIONS.map(opt => (
              <button key={opt.value} onClick={() => setMood(opt.value)}
                className={chipClass(mood === opt.value)}
                style={mood === opt.value ? { backgroundColor: BURGUNDY } : {}}>
                {opt.emoji} {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">🎻</p>
          <p className="font-playfair text-xl text-zinc-800 mb-1">No concerts match these filters</p>
          <p className="text-zinc-400 text-sm">Try adjusting the period or mood</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-zinc-400 mb-4">{filtered.length} concert{filtered.length !== 1 ? 's' : ''}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(c => <ConcertCard key={c.id} concert={c} />)}
          </div>
        </>
      )}
    </div>
  );
}
