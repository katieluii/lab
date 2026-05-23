import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import type { DateIdea } from '../../utils/types';
import { CATEGORY_META, BUDGET_META, DURATION_META } from '../../utils/types';
import { parseIdeas } from '../../utils/claudeApi';

interface Props {
  ideas: DateIdea[];
  onParsed: (ideas: DateIdea[]) => void;
  anthropicKey: string;
}

const PLACEHOLDER = `go hiking at Box Hill
that new sushi place near Liverpool Street
Tate Modern (or any gallery honestly)
pottery class, saw it on Instagram
picnic in Regent's Park when the weather's nice
Christmas markets in winter
board game night with pizza
sunset walk along the Thames
axe throwing?? if we're feeling brave
karaoke
spa day treat
see a play - something funny`;

export default function IdeaDump({ ideas, onParsed, anthropicKey }: Props) {
  const [raw, setRaw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<DateIdea['category'] | 'all'>('all');

  async function handleParse() {
    if (!raw.trim()) return;
    setLoading(true);
    setError('');
    try {
      const parsed = await parseIdeas(raw, anthropicKey);
      onParsed(parsed);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.toLowerCase().includes('failed to fetch') || msg.toLowerCase().includes('networkerror')) {
        setError('Cannot reach Anthropic API. Possible causes: (1) API key is wrong — re-enter it in Settings, (2) a browser extension (ad blocker, privacy shield) is blocking the request — try disabling it or using Incognito mode, (3) transient network issue — try again.');
      } else {
        setError(msg || 'Something went wrong. Check your API key in Settings.');
      }
    } finally {
      setLoading(false);
    }
  }

  const categories = ['all', ...Array.from(new Set(ideas.map((i) => i.category)))] as const;
  const filtered = filter === 'all' ? ideas : ideas.filter((i) => i.category === filter);

  return (
    <div className="space-y-4">
      {ideas.length === 0 ? (
        <>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={PLACEHOLDER}
            rows={10}
            className="w-full text-sm px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none font-sans text-zinc-700 placeholder:text-zinc-300 leading-relaxed"
          />
          {error && <p className="text-xs text-rose-500 bg-rose-50 px-3 py-2 rounded-lg">{error}</p>}
          <button
            onClick={handleParse}
            disabled={loading || !raw.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 text-white font-semibold text-sm hover:bg-rose-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Sparkles size={15} />
            {loading ? 'Structuring your ideas...' : 'Structure these →'}
          </button>
        </>
      ) : (
        <>
          {/* Category filter chips */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const meta = cat === 'all' ? null : CATEGORY_META[cat as DateIdea['category']];
              const count = cat === 'all' ? ideas.length : ideas.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as DateIdea['category'] | 'all')}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all border ${
                    filter === cat
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'bg-white text-zinc-500 border-zinc-200 hover:border-rose-300'
                  }`}
                >
                  {meta ? `${meta.emoji} ${meta.label}` : 'All'} ({count})
                </button>
              );
            })}
            <button
              onClick={() => { onParsed([]); setRaw(''); }}
              className="text-xs px-3 py-1.5 rounded-full font-medium text-zinc-400 hover:text-zinc-700 border border-zinc-100 hover:border-zinc-300 transition-all ml-auto"
            >
              ↩ Reset
            </button>
          </div>

          {/* Idea cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
            {filtered.map((idea) => {
              const cat = CATEGORY_META[idea.category];
              const budget = BUDGET_META[idea.budget];
              const dur = DURATION_META[idea.duration];
              return (
                <div
                  key={idea.id}
                  className="bg-white rounded-xl border border-zinc-200 px-3 py-2.5 flex gap-2.5 items-start"
                >
                  <span className="text-lg mt-0.5">{cat.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-800 leading-tight truncate">
                      {idea.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${cat.color}`}>
                        {cat.label}
                      </span>
                      <span className="text-[10px] text-zinc-400">{dur.label}</span>
                      <span className={`text-[10px] font-bold ${budget.color}`}>{budget.label}</span>
                      {idea.weatherSensitive && (
                        <span className="text-[10px] text-sky-500">☀️ weather</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-zinc-400">
            {ideas.length} ideas ready · drag them onto date slots after generating your plan
          </p>
        </>
      )}
    </div>
  );
}
