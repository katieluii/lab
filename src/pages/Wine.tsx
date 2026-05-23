import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Colour, Descriptor, FruitType, PaletteProfile, Wine as WineEntry, WineFeedback } from '../data/wines';
import { DESCRIPTOR_LABELS, FRUIT_LABELS, recommend, recommendWithFeedback } from '../data/wines';
import WineCard from '../components/wine/WineCard';
import RankingScale from '../components/wine/RankingScale';

// ─── Step config ──────────────────────────────────────────────────────────────

type QuizStep = 'colour' | 'origin' | 'fruit' | 'palate-1' | 'palate-2' | 'notes' | 'occasion';

const ALL_STEPS: QuizStep[] = ['colour', 'origin', 'fruit', 'palate-1', 'palate-2', 'notes', 'occasion'];

const COLOUR_OPTIONS: { value: Colour; label: string; emoji: string; note: string }[] = [
  { value: 'white',    label: 'White',     emoji: '🥂', note: 'Crisp or rich, all styles' },
  { value: 'red',      label: 'Red',       emoji: '🍷', note: 'Light & silky to bold & tannic' },
  { value: 'rosé',     label: 'Rosé',      emoji: '🌸', note: 'Dry and structured, not sweet' },
  { value: 'sparkling',label: 'Sparkling', emoji: '✨', note: 'Champagne, Cava, Pét-nat...' },
];

const ALL_FRUIT_TYPES: FruitType[] = [
  'red-fruit', 'dark-fruit', 'citrus', 'stone-fruit', 'tropical', 'dried-fruit',
];

const ALL_DESCRIPTORS: Descriptor[] = [
  'mineral', 'saline', 'oaky', 'buttery', 'earthy', 'floral', 'herbal', 'spicy', 'funky',
];

const OCCASION_OPTIONS = [
  { value: 'solo',    emoji: '🛋️', label: 'Sipping solo',      sub: 'Unwinding after a long day' },
  { value: 'food',    emoji: '🍽️', label: 'Food pairing',       sub: "There's a meal involved" },
  { value: 'impress', emoji: '✨', label: 'Impressing someone', sub: "I need to look like I know wine" },
  { value: 'explore', emoji: '🧭', label: 'Exploring',          sub: "Something I've never tried before" },
];

// WSET-inspired scale labels
const SWEETNESS_LABELS: [string, string, string, string, string] = [
  'Bone dry', 'Dry', 'A touch off-dry', 'Noticeably sweet', 'Sweet',
];
const BODY_LABELS: [string, string, string, string, string] = [
  'Light & delicate', 'Light-medium', 'Medium', 'Medium-full', 'Bold & rich',
];
const ACIDITY_LABELS: [string, string, string, string, string] = [
  'Very soft & round', 'Soft', 'Medium', 'Bright & lively', 'Electric & sharp',
];
const TANNIN_LABELS: [string, string, string, string, string] = [
  'Silky smooth', 'Soft', 'Medium', 'Chewy', 'Grippy & bold',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === current ? 20 : 8,
            height: 8,
            backgroundColor: i <= current ? '#9f1239' : '#e4e4e7',
          }}
        />
      ))}
    </div>
  );
}

function StepHead({ n, title, sub }: { n: number; title: string; sub: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-mono text-zinc-400 mb-1">Step {n} of {ALL_STEPS.length}</p>
      <h2 className="text-xl font-bold text-zinc-900 leading-snug">{title}</h2>
      <p className="text-sm text-zinc-400 mt-1">{sub}</p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function WineRecommender() {
  const emptyProfile = (): PaletteProfile => ({
    colours: [],
    worldOrigin: null,
    fruitTypes: [],
    fruitIDK: false,
    body: null,
    sweetness: null,
    acidity: null,
    tannins: null,
    descriptors: [],
    occasion: null,
  });

  const [profile, setProfile] = useState<PaletteProfile>(emptyProfile());
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [recs, setRecs] = useState<WineEntry[]>([]);
  const [feedback, setFeedback] = useState<WineFeedback>({});
  const [refined, setRefined] = useState(false);
  const [overallRating, setOverallRating] = useState<number | null>(() => {
    const saved = localStorage.getItem('winerec_overall_rating');
    return saved ? Number(saved) : null;
  });

  const step = ALL_STEPS[stepIdx];
  const isLast = stepIdx === ALL_STEPS.length - 1;

  // Skip tannins scale if only non-red colours chosen
  const onlyNoRed =
    profile.colours.length > 0 && profile.colours.every((c) => c !== 'red');

  function canNext() {
    // Require at least one palate answer on those steps
    if (step === 'palate-1') return profile.sweetness !== null || profile.body !== null;
    if (step === 'palate-2') return profile.acidity !== null;
    return true;
  }

  function set<K extends keyof PaletteProfile>(key: K, val: PaletteProfile[K]) {
    setProfile((p) => ({ ...p, [key]: val }));
  }

  function toggleColour(c: Colour) {
    setProfile((p) => ({
      ...p,
      colours: p.colours.includes(c) ? p.colours.filter((x) => x !== c) : [...p.colours, c],
    }));
  }

  function toggleFruit(f: FruitType) {
    setProfile((p) => ({
      ...p,
      fruitIDK: false,
      fruitTypes: p.fruitTypes.includes(f) ? p.fruitTypes.filter((x) => x !== f) : [...p.fruitTypes, f],
    }));
  }

  function toggleDescriptor(d: Descriptor) {
    setProfile((p) => ({
      ...p,
      descriptors: p.descriptors.includes(d) ? p.descriptors.filter((x) => x !== d) : [...p.descriptors, d],
    }));
  }

  function handleNext() {
    if (isLast) {
      setRecs(recommend(profile));
      setDone(true);
      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 50);
    } else {
      setStepIdx((i) => i + 1);
    }
  }

  function handleBack() {
    setStepIdx((i) => Math.max(0, i - 1));
  }

  function handleFeedback(wineId: string, sentiment: 'liked' | 'disliked') {
    setFeedback((prev) => {
      const next = { ...prev };
      if (next[wineId] === sentiment) {
        delete next[wineId];
      } else {
        next[wineId] = sentiment;
      }
      return next;
    });
    setRefined(false);
  }

  function handleRefine() {
    setRecs(recommendWithFeedback(profile, feedback));
    setRefined(true);
    setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  function handleOverallRating(rating: number) {
    setOverallRating(rating);
    localStorage.setItem('winerec_overall_rating', String(rating));
  }

  function handleRetake() {
    setProfile(emptyProfile());
    setStepIdx(0);
    setDone(false);
    setRecs([]);
    setFeedback({});
    setRefined(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Chip style helper
  const chip = (selected: boolean) =>
    selected
      ? 'border-2 font-semibold transition-all'
      : 'border-2 font-medium transition-all border-zinc-200 text-zinc-600 hover:border-zinc-300';

  const chipStyle = (selected: boolean) =>
    selected
      ? { borderColor: '#9f1239', backgroundColor: '#fdf2f5', color: '#9f1239' }
      : {};

  return (
    <div className="min-h-screen bg-[#fdf8f3]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-zinc-200/60">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link to="/" className="text-zinc-400 hover:text-zinc-700 transition-colors flex items-center gap-1 text-sm">
            <ArrowLeft size={14} /> Lab
          </Link>
          <span className="text-zinc-200">/</span>
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🍷</span>
            <span className="font-bold text-zinc-900 tracking-tight">Wine Recommender</span>
          </div>
          <span className="ml-auto text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: '#fdf2f5', color: '#9f1239' }}>
            WP6
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12 space-y-10">
        {/* Hero */}
        <div>
          <h1 className="text-4xl font-bold text-zinc-900 mb-2 leading-tight">
            Find wines you'll love.<br />
            <span style={{ color: '#9f1239' }}>Tell us what you like. We'll do the rest.</span>
          </h1>
          <p className="text-zinc-500">
            Answer a few short questions about what you enjoy, and we'll match you to wines you're likely to love.
          </p>
        </div>

        {/* Quiz */}
        {!done && (
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-zinc-200/60 p-8">
            <div className="flex items-center justify-between mb-8">
              <ProgressDots total={ALL_STEPS.length} current={stepIdx} />
              <span className="text-xs text-zinc-400 font-mono">{stepIdx + 1} / {ALL_STEPS.length}</span>
            </div>

            {/* ── STEP 1: Colour ── */}
            {step === 'colour' && (
              <div>
                <StepHead n={1} title="What are you in the mood for?" sub="Pick one or more — or leave blank and we'll open the field" />
                <div className="grid grid-cols-2 gap-3">
                  {COLOUR_OPTIONS.map((opt) => {
                    const sel = profile.colours.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => toggleColour(opt.value)}
                        className={`flex items-start gap-3 px-4 py-4 rounded-xl text-left ${chip(sel)}`}
                        style={chipStyle(sel)}
                      >
                        <span className="text-2xl mt-0.5">{opt.emoji}</span>
                        <div>
                          <p className="font-semibold text-sm">{opt.label}</p>
                          <p className="text-xs text-zinc-400 mt-0.5">{opt.note}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── STEP 2: Old World / New World ── */}
            {step === 'origin' && (
              <div>
                <StepHead n={2} title="Old World or New World?" sub="This shapes the whole style of the wine — terroir vs. sunshine" />
                <div className="space-y-3">
                  {[
                    {
                      value: 'old' as const,
                      emoji: '🏰',
                      label: 'Old World',
                      sub: 'France, Italy, Spain, Austria — more restrained, earthy, mineral. The winemaker steps back.',
                    },
                    {
                      value: 'new' as const,
                      emoji: '🌏',
                      label: 'New World',
                      sub: 'Americas, Australia, NZ — riper fruit, fuller body, often more oak. The sunshine shows.',
                    },
                    {
                      value: 'any' as const,
                      emoji: '🌐',
                      label: "I'm open / not sure",
                      sub: "Show me the best match regardless of origin.",
                    },
                  ].map((opt) => {
                    const sel = profile.worldOrigin === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => set('worldOrigin', opt.value)}
                        className={`w-full flex items-start gap-4 px-5 py-4 rounded-xl text-left ${chip(sel)}`}
                        style={chipStyle(sel)}
                      >
                        <span className="text-2xl mt-0.5">{opt.emoji}</span>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: sel ? '#9f1239' : '#18181b' }}>{opt.label}</p>
                          <p className="text-xs text-zinc-400 mt-0.5">{opt.sub}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── STEP 3: Fruit types ── */}
            {step === 'fruit' && (
              <div>
                <StepHead n={3} title="What fruits do you enjoy tasting?" sub="Think about what you like in general — juice, jam, dessert, anything" />
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  {ALL_FRUIT_TYPES.map((f) => {
                    const sel = profile.fruitTypes.includes(f);
                    const fl = FRUIT_LABELS[f];
                    return (
                      <button
                        key={f}
                        onClick={() => toggleFruit(f)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left ${chip(sel)}`}
                        style={chipStyle(sel)}
                      >
                        <span className="text-xl">{fl.emoji}</span>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: sel ? '#9f1239' : '#18181b' }}>{fl.label}</p>
                          <p className="text-xs text-zinc-400">{fl.examples}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setProfile((p) => ({ ...p, fruitTypes: [], fruitIDK: !p.fruitIDK }))}
                  className={`w-full px-4 py-3 rounded-xl text-sm text-center ${chip(profile.fruitIDK)}`}
                  style={profile.fruitIDK ? chipStyle(true) : {}}
                >
                  🤷 Not sure / I don't really notice fruit in wine (IDK)
                </button>
              </div>
            )}

            {/* ── STEP 4: Palate I — Sweetness + Body ── */}
            {step === 'palate-1' && (
              <div>
                <StepHead
                  n={4}
                  title="Tell us about your palate"
                  sub="These are the first things a sommelier assesses. Trust your gut."
                />
                <div className="space-y-8">
                  <RankingScale
                    label="Sweetness"
                    sub="Most table wines are dry — this is about whether you want bone dry or a hint of sweetness"
                    value={profile.sweetness}
                    onChange={(v) => set('sweetness', v)}
                    leftLabel="Bone dry"
                    rightLabel="Sweet"
                    stepLabels={SWEETNESS_LABELS}
                  />
                  <div className="border-t border-zinc-100" />
                  <RankingScale
                    label="Body"
                    sub="How much weight the wine has in your mouth — like comparing skimmed milk to cream"
                    value={profile.body}
                    onChange={(v) => set('body', v)}
                    leftLabel="Light"
                    rightLabel="Full"
                    stepLabels={BODY_LABELS}
                  />
                </div>
              </div>
            )}

            {/* ── STEP 5: Palate II — Acidity + Tannins ── */}
            {step === 'palate-2' && (
              <div>
                <StepHead
                  n={5}
                  title="Acidity and tannins"
                  sub="The two most distinctive sensations that divide wine drinkers"
                />
                <div className="space-y-8">
                  <RankingScale
                    label="Acidity"
                    sub="That mouthwatering, almost sharp freshness — think lemon juice vs. still water"
                    value={profile.acidity}
                    onChange={(v) => set('acidity', v)}
                    leftLabel="Very soft"
                    rightLabel="Electric"
                    stepLabels={ACIDITY_LABELS}
                  />
                  {!onlyNoRed && (
                    <>
                      <div className="border-t border-zinc-100" />
                      <RankingScale
                        label="Tannins (reds)"
                        sub="The drying, sandpaper-like sensation on your gums — only in red wine"
                        value={profile.tannins}
                        onChange={(v) => set('tannins', v)}
                        leftLabel="Silky"
                        rightLabel="Grippy"
                        stepLabels={TANNIN_LABELS}
                      />
                      <p className="text-xs text-zinc-400 -mt-2 italic">Only relevant for reds — skip if you mostly drink white</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* ── STEP 6: Flavour notes ── */}
            {step === 'notes' && (
              <div>
                <StepHead
                  n={6}
                  title="Any flavour notes that appeal?"
                  sub="Beyond fruit — the secondary and tertiary aromas that make wine interesting"
                />
                <div className="flex flex-wrap gap-2">
                  {ALL_DESCRIPTORS.map((d) => {
                    const sel = profile.descriptors.includes(d);
                    return (
                      <button
                        key={d}
                        onClick={() => toggleDescriptor(d)}
                        className={`px-4 py-2.5 rounded-full text-sm ${chip(sel)}`}
                        style={chipStyle(sel)}
                      >
                        {DESCRIPTOR_LABELS[d]}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-zinc-400 mt-4 italic">Optional — skip if none of these resonate</p>
              </div>
            )}

            {/* ── STEP 7: Occasion ── */}
            {step === 'occasion' && (
              <div>
                <StepHead n={7} title="What's tonight about?" sub="Optional — helps us tune the vibe" />
                <div className="grid grid-cols-2 gap-3">
                  {OCCASION_OPTIONS.map((opt) => {
                    const sel = profile.occasion === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => set('occasion', sel ? null : opt.value)}
                        className={`flex flex-col gap-1.5 px-4 py-4 rounded-xl text-left ${chip(sel)}`}
                        style={chipStyle(sel)}
                      >
                        <span className="text-2xl">{opt.emoji}</span>
                        <p className="font-semibold text-sm" style={{ color: sel ? '#9f1239' : '#18181b' }}>{opt.label}</p>
                        <p className="text-xs text-zinc-400">{opt.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-100">
              <button
                onClick={handleBack}
                disabled={stepIdx === 0}
                className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 disabled:opacity-0 transition-all"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canNext()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                style={{ backgroundColor: '#9f1239' }}
              >
                {isLast ? 'Find my wines' : 'Next'}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {done && (
          <section id="results">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900">Your recommendations</h2>
                <p className="text-sm text-zinc-400 mt-1">Matched to your palate · curated selection</p>
              </div>
              <button
                onClick={handleRetake}
                className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors px-3 py-2 rounded-lg border border-zinc-200 hover:border-zinc-300"
              >
                <RotateCcw size={13} /> Retake
              </button>
            </div>

            <div className="space-y-4">
              {recs.map((wine, i) => (
                <WineCard
                  key={wine.id}
                  wine={wine}
                  profile={profile}
                  rank={i + 1}
                  feedbackGiven={feedback[wine.id]}
                  onLike={() => handleFeedback(wine.id, 'liked')}
                  onDislike={() => handleFeedback(wine.id, 'disliked')}
                />
              ))}
            </div>

            {/* Refine button */}
            {Object.keys(feedback).length > 0 && (
              <div className="text-center mt-2">
                {refined ? (
                  <p className="text-sm font-medium" style={{ color: '#9f1239' }}>
                    ✓ Refined to match your feedback
                  </p>
                ) : (
                  <button
                    onClick={handleRefine}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95"
                    style={{ backgroundColor: '#9f1239' }}
                  >
                    ✨ Refine my picks
                  </button>
                )}
              </div>
            )}

            {/* Overall satisfaction */}
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-zinc-200/60 p-6 text-center">
              <p className="font-semibold text-zinc-900 mb-1">How did we do?</p>
              <p className="text-sm text-zinc-400 mb-4">Rate the overall recommendations</p>
              <div className="flex justify-center gap-3">
                {([
                  { rating: 1, emoji: '😞' },
                  { rating: 2, emoji: '😕' },
                  { rating: 3, emoji: '😐' },
                  { rating: 4, emoji: '😊' },
                  { rating: 5, emoji: '🤩' },
                ] as const).map(({ rating, emoji }) => (
                  <button
                    key={rating}
                    onClick={() => handleOverallRating(rating)}
                    className="text-2xl p-2 rounded-xl transition-all hover:scale-110 active:scale-95"
                    style={overallRating === rating ? { outline: '2px solid #9f1239', outlineOffset: 2 } : {}}
                    title={String(rating)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {overallRating !== null && (
                <p className="text-sm text-zinc-500 mt-3">
                  {overallRating >= 4
                    ? 'Glad we could help! 🍷'
                    : overallRating === 3
                    ? 'Thanks — thumbs on individual wines help us refine.'
                    : 'Sorry to hear it. Try rating individual wines so we can adjust.'}
                </p>
              )}
            </div>

            <p className="text-xs text-zinc-400 text-center mt-2 leading-relaxed">
              Curated by hand · prices approximate · ask your local merchant for current stock
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
