import { useMemo, useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import type { DateSlot, DateIdea, WeatherDay } from '../../utils/types';
import { CATEGORY_META } from '../../utils/types';
import SuggestionCard from './SuggestionCard';

interface Props {
  slots: DateSlot[];
  allIdeas: DateIdea[];
  onAssign: (date: string, idea: DateIdea) => void;
  onSwapIdea: (date: string, idea: DateIdea) => void;
  onClear: (date: string) => void;
  onMoveSlot: (fromDate: string, toDate: string) => void;
}

function getWeekMonday(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  const dow = d.getDay(); // 0=Sun
  const diff = dow === 0 ? -6 : 1 - dow;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

function getWeekDays(monday: string): string[] {
  const days: string[] = [];
  const d = new Date(monday + 'T12:00:00');
  for (let i = 0; i < 7; i++) {
    days.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return days; // Mon → Sun
}

function formatWeekLabel(monday: string): string {
  const d = new Date(monday + 'T12:00:00');
  return `Week of ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}`;
}

function DraggableChip({ idea }: { idea: DateIdea }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `idea-${idea.id}`,
    data: { type: 'idea', idea },
  });
  const cat = CATEGORY_META[idea.category];
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-zinc-200 hover:border-rose-300 hover:shadow-sm transition-all select-none ${
        isDragging ? 'opacity-30' : ''
      }`}
    >
      <span className="text-base">{cat.emoji}</span>
      <span className="text-xs font-medium text-zinc-700 whitespace-nowrap">{idea.title}</span>
    </div>
  );
}

function DroppableCell({
  slot,
  allIdeas,
  onSwapIdea,
  onClear,
}: {
  slot: DateSlot;
  allIdeas: DateIdea[];
  onSwapIdea: (date: string, idea: DateIdea) => void;
  onClear: (date: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `drop-${slot.date}` });

  return (
    <div ref={setNodeRef} className={`rounded-2xl transition-all ${isOver ? 'ring-2 ring-rose-400 ring-offset-2' : ''}`}>
      {slot.suggestion ? (
        <SuggestionCard
          slot={slot}
          allIdeas={allIdeas}
          onSwap={onSwapIdea}
          onClear={onClear}
        />
      ) : (
        <div
          className={`rounded-2xl border-2 border-dashed min-h-[80px] flex flex-col items-center justify-center gap-1 p-4 transition-all ${
            isOver
              ? 'border-rose-400 bg-rose-50'
              : 'border-zinc-200 bg-zinc-50/50 hover:border-rose-200'
          }`}
        >
          <span className="text-xl">{isOver ? '📅' : '+'}</span>
          <p className="text-xs text-zinc-400">
            {isOver ? 'Drop here!' : 'Drop an idea here'}
          </p>
          <p className="text-[10px] text-zinc-300 text-center">
            {new Date(slot.date + 'T12:00:00').toLocaleDateString('en-GB', {
              weekday: 'short', day: 'numeric', month: 'short',
            })}
            {slot.weather && ` · ${slot.weather.emoji} ${slot.weather.tempMax}°C`}
          </p>
        </div>
      )}
    </div>
  );
}

export default function PlanView({ slots, allIdeas, onAssign, onSwapIdea, onClear, onMoveSlot }: Props) {
  const [activeItem, setActiveItem] = useState<{ emoji: string; title: string } | null>(null);

  const assignedIds = new Set(
    slots.filter((s) => s.suggestion !== null).map((s) => s.suggestion!.ideaId)
  );
  const unassigned = allIdeas.filter((idea) => !assignedIds.has(idea.id));

  const weeks = useMemo(() => {
    const mondays = new Set(slots.map((s) => getWeekMonday(s.date)));
    return Array.from(mondays)
      .sort()
      .map((monday) => ({ monday, days: getWeekDays(monday) }));
  }, [slots]);

  const slotDates = new Set(slots.map((s) => s.date));
  const DAY_HEADERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  function handleDragStart(event: { active: { id: string | number; data: { current?: { idea?: DateIdea } } } }) {
    const activeId = String(event.active.id);
    const ideaData = event.active.data.current?.idea;
    if (ideaData) {
      const cat = CATEGORY_META[ideaData.category];
      setActiveItem({ emoji: cat.emoji, title: ideaData.title });
    } else if (activeId.startsWith('slot-')) {
      const date = activeId.replace('slot-', '');
      const slot = slots.find((s) => s.date === date);
      if (slot?.suggestion) {
        const cat = CATEGORY_META[slot.suggestion.idea.category];
        setActiveItem({ emoji: cat.emoji, title: slot.suggestion.idea.title });
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveItem(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId.startsWith('idea-') && overId.startsWith('drop-')) {
      const ideaId = activeId.replace('idea-', '');
      const date = overId.replace('drop-', '');
      const idea = allIdeas.find((i) => i.id === ideaId);
      if (idea) onAssign(date, idea);
      return;
    }

    if (activeId.startsWith('slot-') && overId.startsWith('drop-')) {
      const fromDate = activeId.replace('slot-', '');
      const toDate = overId.replace('drop-', '');
      if (fromDate !== toDate) onMoveSlot(fromDate, toDate);
      return;
    }
  }

  return (
    <DndContext onDragStart={handleDragStart as Parameters<typeof DndContext>[0]['onDragStart']} onDragEnd={handleDragEnd}>
      {/* Unassigned ideas strip */}
      {unassigned.length > 0 && (
        <div className="mb-6 p-4 bg-zinc-50 rounded-2xl border border-zinc-200">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2.5">
            Not assigned yet — drag onto a date slot ↓
          </p>
          <div className="flex flex-wrap gap-2">
            {unassigned.map((idea) => (
              <DraggableChip key={idea.id} idea={idea} />
            ))}
          </div>
        </div>
      )}

      {/* Weekly calendar sections */}
      <div className="space-y-8">
        {weeks.map(({ monday, days }) => {
          const weekSlots = slots.filter((s) => days.includes(s.date));
          return (
            <div key={monday}>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                {formatWeekLabel(monday)}
              </p>

              {/* Mini 7-day header bar */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {DAY_HEADERS.map((label, i) => (
                  <div key={i} className="text-center text-[10px] text-zinc-400 font-medium">
                    {label}
                  </div>
                ))}
                {days.map((date) => {
                  const isCouple = slotDates.has(date);
                  const dayNum = new Date(date + 'T12:00:00').getDate();
                  const slot = slots.find((s) => s.date === date);
                  const w = slot?.weather as WeatherDay | undefined;
                  return (
                    <div
                      key={date}
                      className={`text-center py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isCouple
                          ? 'bg-rose-100 text-rose-600 ring-1 ring-rose-200'
                          : 'text-zinc-300'
                      }`}
                      title={w ? `${w.emoji} ${w.tempMin}–${w.tempMax}°C` : ''}
                    >
                      {isCouple && w ? w.emoji : dayNum}
                    </div>
                  );
                })}
              </div>

              {/* Suggestion cards for this week */}
              {weekSlots.length > 0 && (
                <div className={`grid gap-4 ${weekSlots.length === 1 ? 'grid-cols-1 max-w-sm' : 'grid-cols-1 sm:grid-cols-2'}`}>
                  {weekSlots.map((slot) => (
                    <DroppableCell
                      key={slot.date}
                      slot={slot}
                      allIdeas={allIdeas}
                      onSwapIdea={onSwapIdea}
                      onClear={onClear}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Drag overlay */}
      <DragOverlay>
        {activeItem && (
          <div className="bg-white shadow-xl rounded-xl border-2 border-rose-300 px-3 py-2 flex items-center gap-2 text-sm font-semibold text-zinc-700 pointer-events-none">
            <span>{activeItem.emoji}</span>
            <span>{activeItem.title}</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
