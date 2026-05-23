import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import type { Wine, PaletteProfile, Descriptor } from '../../data/wines';
import { DESCRIPTOR_LABELS, generateWhy } from '../../data/wines';

function wineSearchUrl(wine: Wine): string {
  const q = wine.name.replace(/\s+/g, '+');
  return `https://www.wine-searcher.com/find/${q}`;
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
}

export default function WineCard({ wine, profile, rank }: Props) {
  const [showStory, setShowStory] = useState(false);
  const why = generateWhy(wine, profile);
  const topProducers = wine.producers.slice(0, 3);

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
            <span className="text-xs text-zinc-400 font-medium">{wine.priceRange}</span>
          </div>
        </div>

        {/* Grape + style + buy link */}
        <div className="flex items-center justify-between gap-2 -mt-1 flex-wrap">
          <p className="text-sm text-zinc-500">
            <span className="font-medium text-zinc-700">{wine.grape}</span>
            {' · '}
            <span className="capitalize">{wine.colour}</span>
            {' · '}
            <span className="text-zinc-400">{wine.worldOrigin === 'old' ? 'Old World' : 'New World'}</span>
          </p>
          <a
            href={wineSearchUrl(wine)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border-2 transition-all hover:opacity-80 shrink-0"
            style={{ borderColor: ACCENT, color: ACCENT }}
          >
            Find a bottle <ExternalLink size={10} />
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

        {/* Producers */}
        {topProducers.length > 0 && (
          <div className="pt-3 border-t border-zinc-100">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">Look for</p>
            <div className="space-y-2">
              {topProducers.map((p) => (
                <div key={p.name} className="flex gap-2">
                  <span className="text-xs font-semibold text-zinc-800 shrink-0">{p.name}</span>
                  <span className="text-xs text-zinc-400">— {p.note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vintage note */}
        {wine.vintageNote && (
          <div className="pt-2 border-t border-zinc-100">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">Vintage</p>
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
      </div>
    </div>
  );
}
