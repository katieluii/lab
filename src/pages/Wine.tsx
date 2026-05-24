import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type {
  Colour, Descriptor, FruitType, PaletteProfile, Wine as WineEntry, WineFeedback, WineArchetype,
} from '../data/wines';
import {
  WINES, DESCRIPTOR_LABELS, FRUIT_LABELS, QUESTIONNAIRE_DESCRIPTORS,
  recommend, recommendWithFeedback,
  confidenceScore, detectArchetype, fillProfileWithArchetype, detectGaps,
} from '../data/wines';
import WineCard from '../components/wine/WineCard';
import RankingScale from '../components/wine/RankingScale';
import { inferPaletteFromKnownWines } from '../services/claude-wine';

// ─── Step config ──────────────────────────────────────────────────────────────

type QuizStep = 'colour' | 'origin' | 'fruit' | 'palate-1' | 'palate-2' | 'notes' | 'occasion';
const ALL_STEPS: QuizStep[] = ['colour', 'origin', 'fruit', 'palate-1', 'palate-2', 'notes', 'occasion'];

const COLOUR_OPTIONS: { value: Colour; label: string; emoji: string; note: string }[] = [
  { value: 'white',     label: 'White',     emoji: '🥂', note: 'Crisp or rich, all styles' },
  { value: 'red',       label: 'Red',       emoji: '🍷', note: 'Light & silky to bold & tannic' },
  { value: 'rosé',      label: 'Rosé',      emoji: '🌸', note: 'Dry and structured, not sweet' },
  { value: 'sparkling', label: 'Sparkling', emoji: '✨', note: 'Champagne, Cava, Pét-nat...' },
];

const ALL_FRUIT_TYPES: FruitType[] = [
  'red-fruit', 'dark-fruit', 'citrus', 'stone-fruit', 'tropical', 'dried-fruit',
];

const ALL_DESCRIPTORS: Descriptor[] = QUESTIONNAIRE_DESCRIPTORS;

const OCCASION_OPTIONS = [
  { value: 'solo',    emoji: '🛋️', label: 'Sipping solo',      sub: 'Unwinding after a long day' },
  { value: 'food',    emoji: '🍽️', label: 'Food pairing',       sub: "There's a meal involved" },
  { value: 'impress', emoji: '✨', label: 'Impressing someone', sub: "I need to look like I know wine" },
  { value: 'explore', emoji: '🧭', label: 'Exploring',          sub: "Something I've never tried before" },
];

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

// ─── localStorage helpers ─────────────────────────────────────────────────────

const LS = {
  PROFILE:  'winerec_profile',
  FEEDBACK: 'winerec_feedback',
  NOTES:    'winerec_notes',
  SAVED_AT: 'winerec_saved_at',
  RATING:   'winerec_overall_rating',
} as const;

function lsGet<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; }
  catch { return fallback; }
}

function lsSet(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

function lsClear(...keys: string[]) {
  keys.forEach((k) => { try { localStorage.removeItem(k); } catch {} });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function emptyProfile(): PaletteProfile {
  return {
    colours: [], worldOrigin: null, fruitTypes: [], fruitIDK: false,
    body: null, sweetness: null, acidity: null, tannins: null,
    descriptors: [], occasion: null,
  };
}

function formattedSavedDate(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  const diff = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (diff === 0) return 'today';
  if (diff === 1) return 'yesterday';
  if (diff < 7)  return `${diff} days ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="rounded-full transition-all duration-300"
          style={{ width: i === current ? 20 : 8, height: 8, backgroundColor: i <= current ? '#9f1239' : '#e4e4e7' }}
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
  // ── State ──
  const [profile, setProfileRaw] = useState<PaletteProfile>(() => lsGet(LS.PROFILE, emptyProfile()));
  const [stepIdx, setStepIdx]   = useState(0);
  const [done, setDone]         = useState(false);
  const [recs, setRecs]         = useState<WineEntry[]>([]);
  const [feedback, setFeedbackRaw] = useState<WineFeedback>(() => lsGet(LS.FEEDBACK, {}));
  const [notes, setNotesRaw]    = useState<Record<string, string>>(() => lsGet(LS.NOTES, {}));
  const [refined, setRefined]   = useState(false);
  const [overallRating, setOverallRating] = useState<number | null>(() => lsGet(LS.RATING, null));

  // archetype + confidence + gap (computed at quiz completion)
  const [archetype, setArchetype]   = useState<WineArchetype | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [gap, setGap]               = useState<string | null>(null);

  // persistence: returning-user banner
  const savedAt = useRef<string | null>(localStorage.getItem(LS.SAVED_AT));
  const hasSaved = useRef(Boolean(localStorage.getItem(LS.PROFILE)));
  const [showReturnBanner, setShowReturnBanner] = useState(hasSaved.current);

  // Claude API: "know some wines" path
  const [showInferPanel, setShowInferPanel] = useState(false);
  const [inferInput, setInferInput]         = useState('');
  const [inferLoading, setInferLoading]     = useState(false);
  const [inferError, setInferError]         = useState<string | null>(null);

  // ── Persist profile + feedback to localStorage ──
  function setProfile(updater: PaletteProfile | ((p: PaletteProfile) => PaletteProfile)) {
    setProfileRaw((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      lsSet(LS.PROFILE, next);
      lsSet(LS.SAVED_AT, new Date().toISOString());
      return next;
    });
  }

  function setFeedback(updater: WineFeedback | ((f: WineFeedback) => WineFeedback)) {
    setFeedbackRaw((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      lsSet(LS.FEEDBACK, next);
      return next;
    });
  }

  function handleNote(wineId: string, text: string) {
    setNotesRaw((prev) => {
      const next = { ...prev };
      if (text) next[wineId] = text; else delete next[wineId];
      lsSet(LS.NOTES, next);
      return next;
    });
  }

  // Keep savedAt ref in sync when profile changes
  useEffect(() => { savedAt.current = localStorage.getItem(LS.SAVED_AT); }, [profile]);

  // ── Derived ──
  const step     = ALL_STEPS[stepIdx];
  const isLast   = stepIdx === ALL_STEPS.length - 1;
  const onlyNoRed = profile.colours.length > 0 && profile.colours.every((c) => c !== 'red');

  function canNext() {
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
      ...p, fruitIDK: false,
      fruitTypes: p.fruitTypes.includes(f) ? p.fruitTypes.filter((x) => x !== f) : [...p.fruitTypes, f],
    }));
  }

  function toggleDescriptor(d: Descriptor) {
    setProfile((p) => ({
      ...p,
      descriptors: p.descriptors.includes(d) ? p.descriptors.filter((x) => x !== d) : [...p.descriptors, d],
    }));
  }

  // ── Core: run recommendation with archetype fill + confidence ──
  function runRecommend(p: PaletteProfile) {
    const arch  = detectArchetype(p);
    const filled = fillProfileWithArchetype(p, arch);
    const conf   = confidenceScore(p);
    const count  = conf < 0.35 ? 7 : 5;
    const results = recommend(WINES, filled, count);
    const gapMsg  = detectGaps(p, WINES);
    setArchetype(arch);
    setConfidence(conf);
    setGap(gapMsg);
    setRecs(results);
  }

  function handleNext() {
    if (isLast) {
      runRecommend(profile);
      setDone(true);
      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 50);
    } else {
      setStepIdx((i) => i + 1);
    }
  }

  function handleBack() { setStepIdx((i) => Math.max(0, i - 1)); }

  function handleFeedback(wineId: string, sentiment: 'liked' | 'disliked') {
    setFeedback((prev) => {
      const next = { ...prev };
      if (next[wineId] === sentiment) delete next[wineId]; else next[wineId] = sentiment;
      return next;
    });
    setRefined(false);
  }

  function handleRefine() {
    const arch   = detectArchetype(profile);
    const filled = fillProfileWithArchetype(profile, arch);
    setRecs(recommendWithFeedback(WINES, filled, feedback));
    setRefined(true);
    setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  function handleOverallRating(rating: number) {
    setOverallRating(rating);
    lsSet(LS.RATING, rating);
  }

  function handleRetake() {
    const fresh = emptyProfile();
    setProfileRaw(fresh);
    lsClear(LS.PROFILE, LS.FEEDBACK, LS.NOTES, LS.SAVED_AT);
    setFeedbackRaw({});
    setNotesRaw({});
    setStepIdx(0);
    setDone(false);
    setRecs([]);
    setRefined(false);
    setArchetype(null);
    setConfidence(null);
    setGap(null);
    setShowReturnBanner(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Returning-user: load saved profile directly into results ──
  function handleContinueSaved() {
    setShowReturnBanner(false);
    runRecommend(profile);
    setDone(true);
    setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  // ── Stage 4: Claude API inference ──
  async function handleInfer() {
    const names = inferInput.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);
    if (names.length === 0) return;
    setInferLoading(true);
    setInferError(null);
    try {
      const inferred = await inferPaletteFromKnownWines(names);
      const merged: PaletteProfile = { ...emptyProfile(), ...inferred };
      setProfile(merged);
      runRecommend(merged);
      setDone(true);
      setShowInferPanel(false);
      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 50);
    } catch (e) {
      setInferError(e instanceof Error && e.message.includes('API_KEY')
        ? 'API key not configured — add VITE_ANTHROPIC_API_KEY to your .env file.'
        : "Couldn't read those wines — try the quiz instead.");
    } finally {
      setInferLoading(false);
    }
  }

  // ── Style helpers ──
  const chip = (selected: boolean) =>
    selected
      ? 'border-2 font-semibold transition-all'
      : 'border-2 font-medium transition-all border-zinc-200 text-zinc-600 hover:border-zinc-300';

  const chipStyle = (selected: boolean) =>
    selected ? { borderColor: '#9f1239', backgroundColor: '#fdf2f5', color: '#9f1239' } : {};

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

      <main className="max-w-2xl mx-auto px-6 py-12 space-y-6">
        {/* Hero */}
        <div>
          <h1 className="text-4xl font-bold text-zinc-900 mb-2 leading-tight">
            Your taste, mapped to bottles<br />
            <span style={{ color: '#9f1239' }}>you haven't discovered yet.</span>
          </h1>
          <p className="text-zinc-500">
            Tell us how you like your wine — body, acidity, tannins, character — and we'll surface bottles that match, with producers and vintages worth knowing.
          </p>

          {/* Stage 4: Claude API shortcut */}
          {!done && (
            <div className="mt-4">
              <button
                onClick={() => setShowInferPanel((s) => !s)}
                className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                style={{ color: '#9f1239' }}
              >
                <Sparkles size={14} />
                Already know some wines you like? Tell us instead →
              </button>

              {showInferPanel && (
                <div className="mt-3 bg-white rounded-2xl ring-1 ring-zinc-200 p-5 space-y-3">
                  <p className="text-sm text-zinc-600">
                    List wines you enjoy (one per line, or comma-separated). We'll infer your palate from them.
                  </p>
                  <textarea
                    value={inferInput}
                    onChange={(e) => setInferInput(e.target.value)}
                    placeholder={"e.g.\nChablis\nBarolo\nMarlborough Sauvignon Blanc"}
                    rows={4}
                    className="w-full text-sm border border-zinc-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-rose-200"
                  />
                  {inferError && (
                    <p className="text-xs text-rose-600">{inferError}</p>
                  )}
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => { setShowInferPanel(false); setInferError(null); }}
                      className="text-xs font-medium px-4 py-2 rounded-lg border border-zinc-200 text-zinc-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleInfer}
                      disabled={inferLoading || !inferInput.trim()}
                      className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg text-white disabled:opacity-50 transition-all"
                      style={{ backgroundColor: '#9f1239' }}
                    >
                      {inferLoading ? <><Loader2 size={12} className="animate-spin" /> Asking the sommelier...</> : 'Find my wines'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stage 5: Returning-user banner */}
        {showReturnBanner && !done && stepIdx === 0 && (
          <div className="bg-white rounded-xl ring-1 ring-zinc-200 px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-zinc-900 text-sm">Welcome back 🍷</p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Your palate profile was saved {formattedSavedDate(savedAt.current)}.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={handleContinueSaved}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
                style={{ backgroundColor: '#9f1239' }}
              >
                Continue
              </button>
              <button
                onClick={() => { handleRetake(); }}
                className="text-xs font-medium px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:border-zinc-300"
              >
                Fresh start
              </button>
            </div>
          </div>
        )}

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
                    { value: 'old' as const,  emoji: '🏰', label: 'Old World',       sub: 'France, Italy, Spain, Austria — more restrained, earthy, mineral. The winemaker steps back.' },
                    { value: 'new' as const,  emoji: '🌏', label: 'New World',       sub: 'Americas, Australia, NZ — riper fruit, fuller body, often more oak. The sunshine shows.' },
                    { value: 'any' as const,  emoji: '🌐', label: "I'm open / not sure", sub: "Show me the best match regardless of origin." },
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
                    const fl  = FRUIT_LABELS[f];
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

            {/* ── STEP 4: Palate I ── */}
            {step === 'palate-1' && (
              <div>
                <StepHead n={4} title="Tell us about your palate" sub="These are the first things a sommelier assesses. Trust your gut." />
                <div className="space-y-8">
                  <RankingScale label="Sweetness" sub="Most table wines are dry — this is about whether you want bone dry or a hint of sweetness" value={profile.sweetness} onChange={(v) => set('sweetness', v)} leftLabel="Bone dry" rightLabel="Sweet" stepLabels={SWEETNESS_LABELS} />
                  <div className="border-t border-zinc-100" />
                  <RankingScale label="Body" sub="How much weight the wine has in your mouth — like comparing skimmed milk to cream" value={profile.body} onChange={(v) => set('body', v)} leftLabel="Light" rightLabel="Full" stepLabels={BODY_LABELS} />
                </div>
              </div>
            )}

            {/* ── STEP 5: Palate II ── */}
            {step === 'palate-2' && (
              <div>
                <StepHead n={5} title="Acidity and tannins" sub="The two most distinctive sensations that divide wine drinkers" />
                <div className="space-y-8">
                  <RankingScale label="Acidity" sub="That mouthwatering, almost sharp freshness — think lemon juice vs. still water" value={profile.acidity} onChange={(v) => set('acidity', v)} leftLabel="Very soft" rightLabel="Electric" stepLabels={ACIDITY_LABELS} />
                  {!onlyNoRed && (
                    <>
                      <div className="border-t border-zinc-100" />
                      <RankingScale label="Tannins (reds)" sub="The drying, sandpaper-like sensation on your gums — only in red wine" value={profile.tannins} onChange={(v) => set('tannins', v)} leftLabel="Silky" rightLabel="Grippy" stepLabels={TANNIN_LABELS} />
                      <p className="text-xs text-zinc-400 -mt-2 italic">Only relevant for reds — skip if you mostly drink white</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* ── STEP 6: Flavour notes ── */}
            {step === 'notes' && (
              <div>
                <StepHead n={6} title="Any flavour notes that appeal?" sub="Beyond fruit — the secondary and tertiary aromas that make wine interesting" />
                <div className="flex flex-wrap gap-2">
                  {ALL_DESCRIPTORS.map((d) => {
                    const sel = profile.descriptors.includes(d);
                    return (
                      <button key={d} onClick={() => toggleDescriptor(d)} className={`px-4 py-2.5 rounded-full text-sm ${chip(sel)}`} style={chipStyle(sel)}>
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
                      <button key={opt.value} onClick={() => set('occasion', sel ? null : opt.value)} className={`flex flex-col gap-1.5 px-4 py-4 rounded-xl text-left ${chip(sel)}`} style={chipStyle(sel)}>
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
              <button onClick={handleBack} disabled={stepIdx === 0} className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 disabled:opacity-0 transition-all">
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
            {/* Results header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900">Your recommendations</h2>
                {archetype && (
                  <p className="text-sm mt-1">
                    <span className="text-zinc-400">You're </span>
                    <span className="font-semibold" style={{ color: '#9f1239' }}>
                      {archetype.emoji} {archetype.name}
                    </span>
                    <span className="text-zinc-400"> — {archetype.tagline}</span>
                  </p>
                )}
              </div>
              <button onClick={handleRetake} className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors px-3 py-2 rounded-lg border border-zinc-200 hover:border-zinc-300">
                <RotateCcw size={13} /> Retake
              </button>
            </div>

            {/* Stage 2: Confidence banner */}
            {confidence !== null && confidence < 0.35 && (
              <div className="mb-4 rounded-xl px-4 py-3 text-sm border" style={{ backgroundColor: '#fffbeb', borderColor: '#fcd34d', color: '#92400e' }}>
                <span className="font-semibold">Wide net</span> — we had limited signal, so here's a broader range. Rate individual wines to help us refine.
              </div>
            )}
            {confidence !== null && confidence >= 0.7 && (
              <div className="mb-4 rounded-xl px-4 py-3 text-sm border" style={{ backgroundColor: '#f0fdf4', borderColor: '#86efac', color: '#166534' }}>
                <span className="font-semibold">Strong match</span> — tuned to {Math.round(confidence * 9)} palate signals.
              </div>
            )}

            {/* Stage 3: Gap detection */}
            {gap && (
              <div className="mb-4 rounded-xl px-4 py-3 text-sm border border-zinc-200 bg-zinc-50 text-zinc-600">
                {gap}
              </div>
            )}

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
                  note={notes[wine.id]}
                  onNote={(text) => handleNote(wine.id, text)}
                />
              ))}
            </div>

            {/* Refine button */}
            {Object.keys(feedback).length > 0 && (
              <div className="text-center mt-2">
                {refined ? (
                  <p className="text-sm font-medium" style={{ color: '#9f1239' }}>✓ Refined to match your feedback</p>
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
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-zinc-200/60 p-6 text-center mt-4">
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
