import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, Download, KeyRound, Loader2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ApiKeys, DateIdea, DateSlot, GeoLocation, Sticker, WeatherDay } from '../utils/types';
import { generatePlan } from '../utils/claudeApi';
import { fetchForecast } from '../utils/weatherApi';
import { exportToICS } from '../utils/icsExport';
import ApiKeySetup from '../components/dateplanner/ApiKeySetup';
import IdeaDump from '../components/dateplanner/IdeaDump';
import LocationPicker from '../components/dateplanner/LocationPicker';
import StickerBoard from '../components/dateplanner/StickerBoard';
import DateSlotPicker from '../components/dateplanner/DateSlotPicker';
import PlanView from '../components/dateplanner/PlanView';

const STORAGE_KEY = 'dateplanner-apikeys';

function loadKeys(): ApiKeys {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ApiKeys;
  } catch { /* ignore */ }
  return { anthropic: '', openweather: '' };
}

function saveKeys(keys: ApiKeys) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
}

export default function DatePlanner() {
  const [apiKeys, setApiKeys] = useState<ApiKeys>(loadKeys);
  const [showKeySetup, setShowKeySetup] = useState(false);

  const [ideas, setIdeas] = useState<DateIdea[]>([]);
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [weather, setWeather] = useState<WeatherDay[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [stickersByDate, setStickersByDate] = useState<Record<string, Sticker[]>>({});
  const [slots, setSlots] = useState<DateSlot[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [planReady, setPlanReady] = useState(false);

  const keysSet = !!(apiKeys.anthropic && apiKeys.openweather);

  useEffect(() => {
    if (!keysSet) setShowKeySetup(true);
  }, [keysSet]);

  const handleKeysSave = useCallback((keys: ApiKeys) => {
    setApiKeys(keys);
    saveKeys(keys);
  }, []);

  async function handleLocationSelect(loc: GeoLocation) {
    setLocation(loc);
    if (!apiKeys.openweather) return;
    try {
      const forecast = await fetchForecast(loc.lat, loc.lon, apiKeys.openweather);
      setWeather(forecast);
    } catch {
      setWeather([]);
    }
  }

  async function handleGeneratePlan() {
    if (!ideas.length || !selectedDates.length) return;
    setError('');
    setIsGenerating(true);
    setPlanReady(false);

    const initialSlots: DateSlot[] = selectedDates.map((date) => ({
      date,
      weather: weather.find((w) => w.date === date),
      suggestion: null,
      stickers: stickersByDate[date] ?? [],
    }));

    try {
      const suggestions = await generatePlan(
        ideas,
        initialSlots,
        location ?? { city: 'your city', country: '', lat: 0, lon: 0, displayName: 'your location' },
        apiKeys.anthropic
      );
      const filled: DateSlot[] = initialSlots.map((slot, i) => ({
        ...slot,
        suggestion: suggestions[i] ?? null,
      }));
      setSlots(filled);
      setPlanReady(true);
      setTimeout(() => {
        document.getElementById('plan-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not generate plan. Check your API key.');
    } finally {
      setIsGenerating(false);
    }
  }

  function handleAssign(date: string, idea: DateIdea) {
    setSlots((prev) =>
      prev.map((s) => {
        if (s.date !== date) return s;
        return {
          ...s,
          suggestion: {
            ideaId: idea.id,
            idea,
            venue: '',
            estimatedDistance: '',
            foodSuggestion: '',
            why: 'Manually assigned.',
            alternatives: ideas.filter((i) => i.id !== idea.id).slice(0, 2),
          },
        };
      })
    );
  }

  function handleSwapIdea(date: string, idea: DateIdea) {
    setSlots((prev) =>
      prev.map((s) => {
        if (s.date !== date || !s.suggestion) return s;
        return {
          ...s,
          suggestion: {
            ...s.suggestion,
            ideaId: idea.id,
            idea,
            why: `Swapped to: ${idea.title}`,
            alternatives: s.suggestion.alternatives.filter((a) => a.id !== idea.id),
          },
        };
      })
    );
  }

  function handleClear(date: string) {
    setSlots((prev) =>
      prev.map((s) => (s.date === date ? { ...s, suggestion: null } : s))
    );
  }

  function handleMoveSlot(fromDate: string, toDate: string) {
    setSlots((prev) => {
      const fromSlot = prev.find((s) => s.date === fromDate);
      const toSlot = prev.find((s) => s.date === toDate);
      if (!fromSlot) return prev;
      return prev.map((s) => {
        if (s.date === fromDate) return { ...s, suggestion: toSlot?.suggestion ?? null };
        if (s.date === toDate) return { ...s, suggestion: fromSlot.suggestion };
        return s;
      });
    });
  }

  const canGenerate = ideas.length > 0 && selectedDates.length > 0 && keysSet;

  return (
    <div className="min-h-screen bg-[#fff8f8]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-rose-100/80">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-zinc-400 hover:text-zinc-700 transition-colors flex items-center gap-1 text-sm"
            >
              <ArrowLeft size={14} /> Lab
            </Link>
            <span className="text-zinc-200">/</span>
            <div className="flex items-center gap-1.5">
              <span className="text-lg">📅</span>
              <span className="font-bold text-zinc-900 tracking-tight">Date Planner</span>
            </div>
          </div>
          <button
            onClick={() => setShowKeySetup(true)}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
              keysSet
                ? 'text-zinc-400 border-zinc-200 hover:border-zinc-300'
                : 'text-rose-600 border-rose-300 bg-rose-50 hover:bg-rose-100'
            }`}
          >
            <KeyRound size={11} />
            {keysSet ? 'Keys set' : 'Add API keys'}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        {/* Hero */}
        <div>
          <h1 className="text-4xl font-bold text-zinc-900 mb-2">
            Never plan a date again.<br />
            <span className="text-rose-500">Just show up.</span>
          </h1>
          <p className="text-zinc-500">
            Dump all your date ideas below — as messy as you like. AI structures them,
            checks the weather, and plans your calendar.
          </p>
        </div>

        {/* Step 1: Idea dump */}
        <section>
          <SectionHeader number="1" title="Your date ideas" subtitle="Copy-paste a list, bullet points, stream of consciousness — anything goes" />
          <IdeaDump
            ideas={ideas}
            onParsed={setIdeas}
            anthropicKey={apiKeys.anthropic}
          />
        </section>

        {/* Step 2: Location */}
        <section>
          <SectionHeader number="2" title="Set the scene" subtitle="Where are you based? We'll check the weather and find spots near you" />
          <div className="flex items-start gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold text-zinc-500 mb-2">Your location</p>
              <LocationPicker
                location={location}
                onSelect={handleLocationSelect}
                owmKey={apiKeys.openweather}
              />
            </div>
            {location && weather.length > 0 && (
              <div className="bg-sky-50 rounded-xl px-4 py-2.5 border border-sky-100">
                <p className="text-xs font-semibold text-sky-600 mb-1">Next 5-day forecast</p>
                <div className="flex gap-3">
                  {weather.slice(0, 5).map((w) => (
                    <div key={w.date} className="text-center">
                      <div className="text-lg">{w.emoji}</div>
                      <div className="text-[10px] text-sky-700 font-medium">
                        {new Date(w.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'short' })}
                      </div>
                      <div className="text-[10px] text-sky-600">{w.tempMax}°</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Step 3: Date slot picker + sticker board */}
        <section>
          <SectionHeader number="3" title="Pick your dates & sticker them" subtitle="Select your free days, then drag stickers to set the vibe for each one" />
          <div className="space-y-5">
            <DateSlotPicker selected={selectedDates} onChange={setSelectedDates} />
            <StickerBoard
              selectedDates={selectedDates}
              stickersByDate={stickersByDate}
              onUpdateDate={(date, stickers) =>
                setStickersByDate((prev) => ({ ...prev, [date]: stickers }))
              }
            />
          </div>
        </section>

        {/* Generate CTA */}
        <div className="flex flex-col items-center gap-3 py-4">
          {error && (
            <div className="w-full bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-sm text-rose-600">
              {error}
            </div>
          )}
          <button
            onClick={handleGeneratePlan}
            disabled={!canGenerate || isGenerating}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-rose-500 text-white font-bold text-base hover:bg-rose-600 active:scale-95 transition-all shadow-lg shadow-rose-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isGenerating ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Planning your dates...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Plan our dates ✨
              </>
            )}
          </button>
          {!keysSet && (
            <p className="text-xs text-zinc-400">Add your API keys to get started</p>
          )}
          {keysSet && !ideas.length && (
            <p className="text-xs text-zinc-400">Add and structure your date ideas first</p>
          )}
          {keysSet && ideas.length > 0 && !selectedDates.length && (
            <p className="text-xs text-zinc-400">Pick at least one date slot above</p>
          )}
        </div>

        {/* Plan view */}
        {planReady && slots.length > 0 && (
          <section id="plan-section" className="pt-4">
            <div className="flex items-center justify-between mb-6">
              <SectionHeader number="4" title="Your date plan" subtitle="Drag ideas to rearrange · swap alternatives · export when happy" />
            </div>

            <PlanView
              slots={slots}
              allIdeas={ideas}
              onAssign={handleAssign}
              onSwapIdea={handleSwapIdea}
              onClear={handleClear}
              onMoveSlot={handleMoveSlot}
            />

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => exportToICS(slots)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 text-white font-semibold text-sm hover:bg-zinc-700 transition-colors shadow"
              >
                <Download size={16} />
                Export to calendar (.ics)
              </button>
            </div>
          </section>
        )}
      </main>

      {showKeySetup && (
        <ApiKeySetup
          keys={apiKeys}
          onSave={handleKeysSave}
          onClose={() => setShowKeySetup(false)}
        />
      )}
    </div>
  );
}

function SectionHeader({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 text-xs font-bold flex items-center justify-center">
          {number}
        </span>
        <h2 className="font-bold text-zinc-900">{title}</h2>
      </div>
      <p className="text-sm text-zinc-400 ml-7">{subtitle}</p>
    </div>
  );
}
