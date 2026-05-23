import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { Sticker } from '../../utils/types';

export const STICKER_TEMPLATES: Sticker[] = [
  { id: 'vibe_outdoor',       type: 'vibe',   tag: 'outdoor',       emoji: '🌿', label: 'Outdoor' },
  { id: 'vibe_dining',        type: 'vibe',   tag: 'dining',        emoji: '🍽️', label: 'Dinner date' },
  { id: 'vibe_relaxed',       type: 'vibe',   tag: 'relaxed',       emoji: '🛋️', label: 'Netflix & chill' },
  { id: 'vibe_entertainment', type: 'vibe',   tag: 'entertainment', emoji: '🎭', label: 'Concert night' },
  { id: 'vibe_cultural',      type: 'vibe',   tag: 'cultural',      emoji: '🎨', label: 'Museum day' },
  { id: 'vibe_travel',        type: 'vibe',   tag: 'travel',        emoji: '✈️', label: 'Day trip' },
  { id: 'vibe_indoor_active', type: 'vibe',   tag: 'indoor_active', emoji: '🏓', label: 'Active & sporty' },
  { id: 'energy_lazy',        type: 'energy', tag: 'lazy',          emoji: '😴', label: 'Lazy day' },
  { id: 'energy_normal',      type: 'energy', tag: 'normal',        emoji: '⚡', label: 'Normal energy' },
  { id: 'energy_adventurous', type: 'energy', tag: 'adventurous',   emoji: '🔥', label: 'Adventurous' },
  { id: 'food_hot',           type: 'food',   tag: 'hot',           emoji: '🍲', label: 'Hot & hearty' },
  { id: 'food_light',         type: 'food',   tag: 'light',         emoji: '🥗', label: 'Light bites' },
  { id: 'food_treat',         type: 'food',   tag: 'treat',         emoji: '🧁', label: 'Treat yourself' },
  { id: 'food_surprise',      type: 'food',   tag: 'surprise',      emoji: '🎲', label: 'Surprise me' },
];

const VIBE_STICKERS = STICKER_TEMPLATES.filter(s => s.type === 'vibe');
const ENERGY_STICKERS = STICKER_TEMPLATES.filter(s => s.type === 'energy');
const FOOD_STICKERS = STICKER_TEMPLATES.filter(s => s.type === 'food');

const STICKER_COLORS = {
  vibe:   { pill: 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100', badge: 'bg-violet-100 border-violet-200 text-violet-700', label: 'text-violet-500' },
  energy: { pill: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100',   badge: 'bg-amber-100 border-amber-200 text-amber-700',   label: 'text-amber-500' },
  food:   { pill: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100', badge: 'bg-emerald-100 border-emerald-200 text-emerald-700', label: 'text-emerald-500' },
};

function DraggableSticker({ sticker, dimmed }: { sticker: Sticker; dimmed?: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: sticker.id,
    data: { sticker },
  });
  const colors = STICKER_COLORS[sticker.type];

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border cursor-grab active:cursor-grabbing select-none transition-all text-xs font-medium ${colors.pill} ${
        isDragging || dimmed ? 'opacity-30' : 'opacity-100'
      }`}
    >
      <span>{sticker.emoji}</span>
      <span>{sticker.label}</span>
    </div>
  );
}

function DroppableDateZone({
  date,
  stickers,
  onRemove,
}: {
  date: string;
  stickers: Sticker[];
  onRemove: (sticker: Sticker) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `sticker-drop-${date}`,
    data: { date },
  });

  const label = new Date(date + 'T12:00:00').toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short',
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[130px] max-w-[200px] rounded-2xl border-2 border-dashed p-3 min-h-[100px] transition-all ${
        isOver ? 'border-rose-400 bg-rose-50 shadow-sm' : 'border-zinc-200 bg-white'
      }`}
    >
      <p className="text-[11px] font-bold text-zinc-500 mb-2 truncate">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {stickers.length === 0 ? (
          <p className="text-[10px] text-zinc-300 italic mt-1">drag stickers here</p>
        ) : (
          stickers.map((s) => {
            const colors = STICKER_COLORS[s.type];
            return (
              <button
                key={`${s.type}-${String(s.tag)}`}
                onClick={() => onRemove(s)}
                title="Click to remove"
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium transition-all hover:opacity-60 ${colors.badge}`}
              >
                {s.emoji} {s.label} ×
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

interface Props {
  selectedDates: string[];
  stickersByDate: Record<string, Sticker[]>;
  onUpdateDate: (date: string, stickers: Sticker[]) => void;
}

export default function StickerBoard({ selectedDates, stickersByDate, onUpdateDate }: Props) {
  const [activeSticker, setActiveSticker] = useState<Sticker | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveSticker((event.active.data.current as { sticker: Sticker }).sticker ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveSticker(null);
    const { active, over } = event;
    if (!over) return;

    const sticker = (active.data.current as { sticker: Sticker }).sticker;
    const date = (over.data.current as { date: string }).date;
    if (!sticker || !date) return;

    const current = stickersByDate[date] ?? [];
    let updated: Sticker[];

    if (sticker.type === 'vibe') {
      const exists = current.some(s => s.type === 'vibe' && s.tag === sticker.tag);
      updated = exists
        ? current.filter(s => !(s.type === 'vibe' && s.tag === sticker.tag))
        : [...current, sticker];
    } else {
      // energy or food: replace existing of same type
      updated = [...current.filter(s => s.type !== sticker.type), sticker];
    }

    onUpdateDate(date, updated);
  }

  function handleRemove(date: string, sticker: Sticker) {
    const current = stickersByDate[date] ?? [];
    onUpdateDate(date, current.filter(s => !(s.type === sticker.type && s.tag === sticker.tag)));
  }

  if (!selectedDates.length) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-zinc-200 p-6 text-center text-zinc-400 text-sm">
        Pick your dates above first
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="space-y-4">
        {/* Sticker tray */}
        <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200 space-y-2.5">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
            Sticker tray — drag onto dates ↓
          </p>

          <div className="flex items-start gap-2 flex-wrap">
            <span className={`text-[9px] font-bold uppercase tracking-wider w-10 pt-2 shrink-0 ${STICKER_COLORS.vibe.label}`}>vibe</span>
            <div className="flex flex-wrap gap-1.5">
              {VIBE_STICKERS.map(s => <DraggableSticker key={s.id} sticker={s} />)}
            </div>
          </div>

          <div className="flex items-start gap-2 flex-wrap">
            <span className={`text-[9px] font-bold uppercase tracking-wider w-10 pt-2 shrink-0 ${STICKER_COLORS.energy.label}`}>energy</span>
            <div className="flex flex-wrap gap-1.5">
              {ENERGY_STICKERS.map(s => <DraggableSticker key={s.id} sticker={s} />)}
            </div>
          </div>

          <div className="flex items-start gap-2 flex-wrap">
            <span className={`text-[9px] font-bold uppercase tracking-wider w-10 pt-2 shrink-0 ${STICKER_COLORS.food.label}`}>food</span>
            <div className="flex flex-wrap gap-1.5">
              {FOOD_STICKERS.map(s => <DraggableSticker key={s.id} sticker={s} />)}
            </div>
          </div>
        </div>

        {/* Date drop zones */}
        <div className="flex gap-3 flex-wrap">
          {selectedDates.map(date => (
            <DroppableDateZone
              key={date}
              date={date}
              stickers={stickersByDate[date] ?? []}
              onRemove={(sticker) => handleRemove(date, sticker)}
            />
          ))}
        </div>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeSticker && (
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-medium shadow-lg pointer-events-none ${STICKER_COLORS[activeSticker.type].pill}`}>
            <span>{activeSticker.emoji}</span>
            <span>{activeSticker.label}</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
