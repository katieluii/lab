import { useDraggable } from '@dnd-kit/core';
import { RefreshCw, Utensils, MapPin, Navigation } from 'lucide-react';
import type { DateSlot, DateSuggestion, DateIdea } from '../../utils/types';
import { CATEGORY_META } from '../../utils/types';

interface Props {
  slot: DateSlot;
  allIdeas: DateIdea[];
  onSwap: (date: string, idea: DateIdea) => void;
  onClear: (date: string) => void;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
}

function AltChip({ idea, onClick }: { idea: DateIdea; onClick: () => void }) {
  const cat = CATEGORY_META[idea.category];
  return (
    <button
      onClick={onClick}
      className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 hover:bg-rose-100 hover:text-rose-700 transition-colors font-medium"
    >
      {cat.emoji} {idea.title}
    </button>
  );
}

export default function SuggestionCard({ slot, allIdeas, onSwap, onClear }: Props) {
  const s = slot.suggestion as DateSuggestion;
  const cat = CATEGORY_META[s.idea.category];

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `slot-${slot.date}`,
    data: { type: 'slot', date: slot.date, idea: s.idea },
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)`, zIndex: 50 }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-2xl border-2 border-rose-100 shadow-sm overflow-hidden transition-all ${
        isDragging ? 'opacity-50 shadow-xl scale-105' : ''
      }`}
    >
      {/* Drag handle header */}
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-between px-4 py-3 bg-rose-50 cursor-grab active:cursor-grabbing border-b border-rose-100"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-widest">
            ⋮⋮ {formatDate(slot.date)}
          </span>
        </div>
        {slot.weather && (
          <span className="text-xs text-zinc-500 font-medium flex items-center gap-1">
            {slot.weather.emoji} {slot.weather.tempMin}–{slot.weather.tempMax}°C
          </span>
        )}
      </div>

      <div className="p-4 space-y-3">
        {/* Main idea */}
        <div className="flex items-start gap-3">
          <span className="text-2xl">{cat.emoji}</span>
          <div>
            <p className="font-bold text-zinc-900 leading-tight">{s.idea.title}</p>
            {s.venue && (
              <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1">
                <MapPin size={10} /> {s.venue}
              </p>
            )}
            {s.estimatedDistance && (
              <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                <Navigation size={10} /> {s.estimatedDistance}
              </p>
            )}
          </div>
        </div>

        {/* Food suggestion */}
        {s.foodSuggestion && (
          <div className="flex items-start gap-2 bg-amber-50 rounded-lg px-3 py-2">
            <Utensils size={12} className="text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800">{s.foodSuggestion}</p>
          </div>
        )}

        {/* Why */}
        <p className="text-xs text-zinc-500 italic leading-relaxed">{s.why}</p>

        {/* Alternatives */}
        {s.alternatives.length > 0 && (
          <div>
            <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <RefreshCw size={9} /> Alternatives
            </p>
            <div className="flex flex-wrap gap-1.5">
              {s.alternatives.map((alt) => (
                <AltChip key={alt.id} idea={alt} onClick={() => onSwap(slot.date, alt)} />
              ))}
              {allIdeas
                .filter((i) => i.id !== s.ideaId && !s.alternatives.find((a) => a.id === i.id))
                .slice(0, 2)
                .map((alt) => (
                  <AltChip key={alt.id} idea={alt} onClick={() => onSwap(slot.date, alt)} />
                ))}
            </div>
          </div>
        )}

        {/* Clear */}
        <button
          onClick={() => onClear(slot.date)}
          className="text-[10px] text-zinc-300 hover:text-zinc-500 transition-colors underline"
        >
          Remove from this slot
        </button>
      </div>
    </div>
  );
}
