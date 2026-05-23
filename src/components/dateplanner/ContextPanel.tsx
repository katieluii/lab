import type { FoodPref, Mood } from '../../utils/types';

interface Props {
  mood: Mood;
  setMood: (m: Mood) => void;
  foodPref: FoodPref;
  setFoodPref: (f: FoodPref) => void;
}

const MOODS: { value: Mood; emoji: string; label: string; sub: string }[] = [
  { value: 'lazy',         emoji: '😴', label: 'Lazy day',     sub: 'low effort please' },
  { value: 'normal',       emoji: '⚡', label: 'Normal',       sub: 'up for anything' },
  { value: 'adventurous',  emoji: '🔥', label: 'Adventurous',  sub: 'let\'s go big' },
];

const FOODS: { value: FoodPref; emoji: string; label: string }[] = [
  { value: 'hot',      emoji: '🍲', label: 'Hot & hearty' },
  { value: 'light',    emoji: '🥗', label: 'Light' },
  { value: 'treat',    emoji: '🧁', label: 'Treat yourself' },
  { value: 'surprise', emoji: '🎲', label: 'Surprise me' },
];

export default function ContextPanel({ mood, setMood, foodPref, setFoodPref }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2.5">
          Energy level
        </p>
        <div className="grid grid-cols-3 gap-2">
          {MOODS.map((m) => (
            <button
              key={m.value}
              onClick={() => setMood(m.value)}
              className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 transition-all ${
                mood === m.value
                  ? 'border-rose-400 bg-rose-50 text-rose-700'
                  : 'border-zinc-200 bg-white text-zinc-500 hover:border-rose-200'
              }`}
            >
              <span className="text-xl">{m.emoji}</span>
              <span className="text-xs font-semibold">{m.label}</span>
              <span className="text-[10px] text-zinc-400 text-center leading-tight">{m.sub}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2.5">
          Food vibes today
        </p>
        <div className="grid grid-cols-2 gap-2">
          {FOODS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFoodPref(f.value)}
              className={`flex items-center gap-2 py-2.5 px-3 rounded-xl border-2 transition-all text-left ${
                foodPref === f.value
                  ? 'border-rose-400 bg-rose-50 text-rose-700'
                  : 'border-zinc-200 bg-white text-zinc-500 hover:border-rose-200'
              }`}
            >
              <span className="text-lg">{f.emoji}</span>
              <span className="text-xs font-semibold">{f.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
