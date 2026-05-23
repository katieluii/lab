import { useMemo } from 'react';

interface Props {
  selected: string[];
  onChange: (dates: string[]) => void;
}

function isoDate(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function formatDay(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

export default function DateSlotPicker({ selected, onChange }: Props) {
  const months = useMemo(() => {
    const today = new Date();
    const result = [];
    for (let i = 0; i < 2; i++) {
      const y = today.getFullYear();
      const m = (today.getMonth() + i) % 12;
      const year = m < today.getMonth() ? y + 1 : y;
      const firstDay = new Date(year, m, 1).getDay();
      const daysInMonth = new Date(year, m + 1, 0).getDate();
      result.push({ year, month: m, firstDay, daysInMonth });
    }
    return result;
  }, []);

  const todayStr = new Date().toISOString().slice(0, 10);

  function toggle(dateStr: string) {
    if (selected.includes(dateStr)) {
      onChange(selected.filter((d) => d !== dateStr));
    } else {
      onChange([...selected, dateStr].sort());
    }
  }

  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dayLabels = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  return (
    <div className="space-y-4">
      {months.map(({ year, month, firstDay, daysInMonth }) => {
        const startOffset = firstDay; // 0 = Sunday
        const cells: (string | null)[] = Array(startOffset).fill(null);
        for (let d = 1; d <= daysInMonth; d++) cells.push(isoDate(year, month, d));

        return (
          <div key={`${year}-${month}`}>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">
              {monthNames[month]} {year}
            </p>
            <div className="grid grid-cols-7 gap-1">
              {dayLabels.map((d) => (
                <div key={d} className="text-center text-[10px] text-zinc-400 font-medium pb-1">{d}</div>
              ))}
              {cells.map((dateStr, i) => {
                if (!dateStr) return <div key={`e-${i}`} />;
                const isPast = dateStr < todayStr;
                const isSelected = selected.includes(dateStr);
                return (
                  <button
                    key={dateStr}
                    onClick={() => !isPast && toggle(dateStr)}
                    disabled={isPast}
                    className={`aspect-square rounded-lg text-xs font-medium transition-all ${
                      isPast
                        ? 'text-zinc-300 cursor-not-allowed'
                        : isSelected
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'text-zinc-600 hover:bg-rose-50 hover:text-rose-600'
                    }`}
                  >
                    {new Date(dateStr + 'T12:00:00').getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {selected.length > 0 && (
        <div className="pt-2 border-t border-zinc-100">
          <p className="text-xs font-semibold text-zinc-500 mb-2">
            {selected.length} date{selected.length > 1 ? 's' : ''} selected:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {selected.map((d) => (
              <span
                key={d}
                className="text-xs bg-rose-100 text-rose-600 px-2.5 py-1 rounded-full font-medium flex items-center gap-1"
              >
                {formatDay(d)}
                <button onClick={() => toggle(d)} className="hover:text-rose-800 ml-0.5">×</button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
