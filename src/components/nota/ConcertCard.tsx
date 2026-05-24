import type { Concert } from '../../data/nota-concerts';

const VENUE_COLOR: Record<string, string> = {
  'Wigmore Hall': '#6B2D3E',
  'Barbican': '#2D4A6B',
  'Southbank Centre': '#2D6B4A',
  'Royal Festival Hall': '#2D6B4A',
  "LSO St Luke's": '#5A2D6B',
  'Royal Albert Hall': '#6B4A2D',
};

export function ConcertCard({ concert, rank }: { concert: Concert; rank?: number }) {
  const color = VENUE_COLOR[concert.venue] ?? '#6B2D3E';
  const dateObj = new Date(concert.date + 'T00:00:00');
  const dateStr = dateObj.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long' });

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="h-1.5" style={{ backgroundColor: color }} />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            {rank !== undefined && rank <= 2 && (
              <p className="text-xs font-medium mb-1" style={{ color: '#C9A84C' }}>
                {rank === 0 ? '★ Best match' : '★ Great match'}
              </p>
            )}
            <h3 className="font-playfair text-lg font-semibold leading-tight text-zinc-900">
              {concert.title}
            </h3>
            {concert.subtitle && (
              <p className="text-sm text-zinc-500 mt-0.5">{concert.subtitle}</p>
            )}
          </div>
          <span
            className="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0"
            style={{ backgroundColor: `${color}18`, color }}
          >
            {concert.venue}
          </span>
        </div>

        <div className="flex gap-4 text-sm text-zinc-500">
          <span>📅 {dateStr}</span>
          <span>🕢 {concert.time}</span>
        </div>

        {concert.programme.length > 0 && (
          <div>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1.5">Programme</p>
            <ul className="space-y-1">
              {concert.programme.slice(0, 3).map((item, i) => (
                <li key={i} className="text-sm text-zinc-800">
                  <span className="font-medium">{item.composer}</span>
                  {item.work && <span className="text-zinc-500"> — {item.work}</span>}
                </li>
              ))}
              {concert.programme.length > 3 && (
                <li className="text-xs text-zinc-400">+{concert.programme.length - 3} more</li>
              )}
            </ul>
          </div>
        )}

        {concert.performers.length > 0 && (
          <p className="text-sm text-zinc-500 leading-snug">
            {concert.performers.slice(0, 3).join(' · ')}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-sm font-medium text-zinc-800">{concert.price}</span>
          <a
            href={concert.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-xl text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: color }}
          >
            Tickets →
          </a>
        </div>
      </div>
    </div>
  );
}
