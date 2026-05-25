import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import type { Wine, PaletteProfile, Descriptor } from '../../data/wines';
import { DESCRIPTOR_LABELS, generateWhy } from '../../data/wines';
import { BOTTLES } from '../../data/wine-bottles';
import { PRODUCERS } from '../../data/wine-producers';

function stripDiacritics(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

function vivinoSearchUrl(wine: Wine): string {
  return `https://www.vivino.com/search/wines?q=${encodeURIComponent(stripDiacritics(wine.name))}`;
}

function producerVivinoUrl(producerName: string, wine: Wine): string {
  return `https://www.vivino.com/search/wines?q=${encodeURIComponent(stripDiacritics(producerName + ' ' + wine.name))}`;
}

const ACCENT = '#9f1239';

const COLOUR_EMOJI: Record<Wine['colour'], string> = {
  white: '🥂', red: '🍷', rosé: '🌸', sparkling: '✨',
};

const LEVEL_DOTS = { none: 0, low: 1, medium: 2, high: 3 } as const;

function Meter({ level, label }: { level: number; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] text-zinc-400 w-14 shrink-0">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <span key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: i <= level ? ACCENT : '#e4e4e7' }} />
        ))}
      </div>
    </div>
  );
}

interface Props {
  wine: Wine;
  profile: PaletteProfile;
  rank: number;
  feedbackGiven?: 'liked' | 'disliked';
  onLike?: () => void;
  onDislike?: () => void;
  note?: string;
  onNote?: (text: string) => void;
}

export default function WineCard({ wine, profile, rank, feedbackGiven, onLike, onDislike, note, onNote }: Props) {
  const [showStory, setShowStory] = useState(false);
  const [showNoteBox, setShowNoteBox] = useState(false);
  const [draftNote, setDraftNote] = useState(note ?? '');
  const why = generateWhy(wine, profile);
  const bottles = BOTTLES[wine.id] ?? [];
  const producers = PRODUCERS[wine.id] ?? [];

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-zinc-200/60 overflow-hidden">
      {/* Accent band */}
      <div className="h-1.5 w-full" style={{ backgroundColor: ACCENT }} />

      <div className="p-6 space-y-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{COLOUR_EMOJI[wine.colour]}</span>
            <div>
              <h3 className="font-bold text-zinc-900 leading-snug">{wine.name}</h3>
              <p className="text-xs text-zinc-400 mt-0.5">{wine.region} · {wine.country}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: ACCENT }}>
              #{rank}
            </span>
          </div>
        </div>

        {/* Grape + style + search link */}
        <div className="flex items-center justify-between gap-2 -mt-1 flex-wrap">
          <p className="text-sm text-zinc-500">
            <span className="font-medium text-zinc-700">{wine.grape}</span>
            {' · '}
            <span className="capitalize">{wine.colour}</span>
            {' · '}
            <span className="text-zinc-400">{wine.worldOrigin === 'old' ? 'Old World' : 'New World'}</span>
          </p>
          <a
            href={vivinoSearchUrl(wine)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border-2 transition-all hover:opacity-80 shrink-0"
            style={{ borderColor: ACCENT, color: ACCENT }}
          >
            All on Vivino <ExternalLink size={10} />
          </a>
        </div>

        {/* Why text */}
        <p className="text-sm text-zinc-600 leading-relaxed italic border-l-2 pl-3" style={{ borderColor: ACCENT }}>
          {why}
        </p>

        {/* Palate meters */}
        <div className="space-y-1.5">
          <Meter level={wine.body === 'light' ? 1 : wine.body === 'medium' ? 2 : 3} label="Body" />
          <Meter level={LEVEL_DOTS[wine.acidity]} label="Acidity" />
          {wine.colour === 'red' && (
            <Meter level={LEVEL_DOTS[wine.tannins as keyof typeof LEVEL_DOTS]} label="Tannins" />
          )}
        </div>

        {/* Descriptor chips */}
        <div className="flex flex-wrap gap-1.5">
          {wine.descriptors.map((d: Descriptor) => {
            const isMatch = profile.descriptors.includes(d);
            return (
              <span
                key={d}
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={
                  isMatch
                    ? { backgroundColor: '#fdf2f5', color: ACCENT, outline: `1px solid ${ACCENT}44` }
                    : { backgroundColor: '#f4f4f5', color: '#71717a' }
                }
              >
                {DESCRIPTOR_LABELS[d]}
              </span>
            );
          })}
        </div>

        {/* Bottles / producers */}
        {(bottles.length > 0 || producers.length > 0) && (
          <div className="pt-3 border-t border-zinc-100">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Producers to seek out</p>
            <div className="space-y-3">
              {bottles.length > 0
                ? bottles.map((b) => (
                    <div key={b.producer + b.vintage} className="flex items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className="text-xs font-semibold text-zinc-800">{b.producer}</span>
                          <span className="text-xs text-zinc-500">{b.wine}</span>
                          <span className="text-xs text-zinc-400">{b.vintage}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5 leading-snug">{b.note}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-zinc-700">{b.approxPrice}</span>
                        <a href={b.url} target="_blank" rel="noopener noreferrer"
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg border-2 transition-all hover:opacity-80 whitespace-nowrap"
                          style={{ borderColor: ACCENT, color: ACCENT }}>
                          Vivino ↗
                        </a>
                      </div>
                    </div>
                  ))
                : producers.map((p) => (
                    <div key={p.name} className="flex items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-semibold text-zinc-800">{p.name}</span>
                        <p className="text-xs text-zinc-400 mt-0.5 leading-snug">{p.note}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-zinc-700">{p.approxPrice}</span>
                        <a href={producerVivinoUrl(p.name, wine)} target="_blank" rel="noopener noreferrer"
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg border-2 transition-all hover:opacity-80 whitespace-nowrap"
                          style={{ borderColor: ACCENT, color: ACCENT }}>
                          Vivino ↗
                        </a>
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>
        )}

        {/* Vintage note */}
        {wine.vintageNote && (
          <div className="pt-2 border-t border-zinc-100">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">Vintage guide</p>
            <p className="text-xs text-zinc-500 leading-relaxed">{wine.vintageNote}</p>
          </div>
        )}

        {/* Story snippet */}
        {wine.storySnippet && (
          <div className="pt-2 border-t border-zinc-100">
            <button
              onClick={() => setShowStory((s) => !s)}
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{ color: ACCENT }}
            >
              {showStory ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {showStory ? 'Hide' : 'Did you know?'}
            </button>
            {showStory && (
              <p className="text-xs text-zinc-500 leading-relaxed mt-2">{wine.storySnippet}</p>
            )}
          </div>
        )}

        {/* Per-wine feedback */}
        {(onLike || onDislike) && (
          <div className="pt-3 border-t border-zinc-100 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-zinc-400 mr-1">Was this a match?</span>
              <button
                onClick={onLike}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border-2 font-medium transition-all active:scale-95"
                style={
                  feedbackGiven === 'liked'
                    ? { backgroundColor: ACCENT, borderColor: ACCENT, color: '#fff' }
                    : { borderColor: '#e4e4e7', color: '#71717a' }
                }
              >
                👍 Yes
              </button>
              <button
                onClick={onDislike}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border-2 font-medium transition-all active:scale-95"
                style={
                  feedbackGiven === 'disliked'
                    ? { backgroundColor: '#e4e4e7', borderColor: '#a1a1aa', color: '#3f3f46' }
                    : { borderColor: '#e4e4e7', color: '#71717a' }
                }
              >
                👎 Not quite
              </button>
            </div>

            {/* Optional text note */}
            {!showNoteBox ? (
              <button
                onClick={() => setShowNoteBox(true)}
                className="text-xs transition-colors flex items-center gap-1"
                style={{ color: note ? ACCENT : '#a1a1aa' }}
              >
                {note ? `📝 "${note.length > 50 ? note.slice(0, 50) + '…' : note}"` : '+ Add a note (optional)'}
              </button>
            ) : (
              <div className="space-y-2">
                <textarea
                  autoFocus
                  value={draftNote}
                  onChange={(e) => setDraftNote(e.target.value)}
                  placeholder="What did you like or not like? Any detail helps — tannins too grippy, acidity spot on, reminded you of something..."
                  rows={3}
                  className="w-full text-xs border border-zinc-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 text-zinc-700 placeholder-zinc-300 leading-relaxed"
                  style={{ '--tw-ring-color': `${ACCENT}44` } as React.CSSProperties}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { onNote?.(draftNote.trim()); setShowNoteBox(false); }}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all active:scale-95"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Save note
                  </button>
                  <button
                    onClick={() => { setDraftNote(note ?? ''); setShowNoteBox(false); }}
                    className="text-xs px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-500 hover:border-zinc-300 transition-all"
                  >
                    Cancel
                  </button>
                  {draftNote.trim() && (
                    <button
                      onClick={() => { setDraftNote(''); onNote?.(''); setShowNoteBox(false); }}
                      className="text-xs px-2 py-1.5 text-zinc-400 hover:text-zinc-600 transition-colors ml-auto"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
