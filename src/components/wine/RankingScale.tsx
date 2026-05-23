const ACCENT = '#9f1239';

interface Props {
  label: string;
  sub?: string;
  value: number | null;
  onChange: (v: number) => void;
  leftLabel: string;
  rightLabel: string;
  stepLabels: [string, string, string, string, string];
}

export default function RankingScale({ label, sub, value, onChange, leftLabel, rightLabel, stepLabels }: Props) {
  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-semibold text-zinc-800">{label}</p>
        {sub && <p className="text-xs text-zinc-400 mt-0.5">{sub}</p>}
      </div>

      {/* Scale */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-400 w-16 shrink-0 text-right leading-tight">{leftLabel}</span>

        <div className="flex flex-1 gap-1">
          {([1, 2, 3, 4, 5] as const).map((i) => {
            const isSelected = value === i;
            const isFilled = value !== null && i < value;
            return (
              <button
                key={i}
                onClick={() => onChange(i)}
                className="flex-1 h-9 rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-all focus:outline-none"
                style={
                  isSelected
                    ? { borderColor: ACCENT, backgroundColor: ACCENT, color: 'white' }
                    : isFilled
                    ? { borderColor: ACCENT, backgroundColor: `${ACCENT}22`, color: ACCENT }
                    : { borderColor: '#e4e4e7', backgroundColor: 'white', color: '#a1a1aa' }
                }
              >
                {i}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-zinc-400 w-16 shrink-0 leading-tight">{rightLabel}</span>
      </div>

      {/* Selected label */}
      <p
        className="text-center text-xs font-medium transition-all"
        style={{ color: value !== null ? ACCENT : '#d4d4d8', minHeight: '1rem' }}
      >
        {value !== null ? stepLabels[value - 1] : ''}
      </p>
    </div>
  );
}
