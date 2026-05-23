import type { DateIdea, DateSlot } from './types';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function toIcsDate(dateStr: string): string {
  return dateStr.replace(/-/g, '');
}

function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}@katieslab`;
}

function getTimeBlock(category: DateIdea['category'], duration: DateIdea['duration']): { start: string; end: string } {
  switch (category) {
    case 'dining': return { start: '190000', end: '210000' };
    case 'entertainment': return { start: '193000', end: '220000' };
    case 'outdoor':
      if (duration === 'full-day') return { start: '090000', end: '180000' };
      if (duration === 'half-day') return { start: '130000', end: '180000' };
      return { start: '140000', end: '160000' };
    case 'travel': return { start: '080000', end: '200000' };
    case 'cultural': return { start: '100000', end: '130000' };
    case 'indoor_active': return { start: '140000', end: '170000' };
    case 'relaxed': return { start: '180000', end: '220000' };
    default: return { start: '120000', end: '140000' };
  }
}

export function exportToICS(slots: DateSlot[]): void {
  const filled = slots.filter((s) => s.suggestion !== null);
  if (!filled.length) return;

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'PRODID:-//Katie\'s Date Planner//EN',
  ];

  for (const slot of filled) {
    const s = slot.suggestion!;
    const dateStr = toIcsDate(slot.date);
    const { start, end } = getTimeBlock(s.idea.category, s.idea.duration);
    const title = `📅 ${s.idea.title}`;
    const description = [
      s.venue,
      `Distance: ${s.estimatedDistance}`,
      `Food: ${s.foodSuggestion}`,
      s.why,
    ].join('\\n');

    lines.push(
      'BEGIN:VEVENT',
      `DTSTART:${dateStr}T${start}`,
      `DTEND:${dateStr}T${end}`,
      `SUMMARY:${escapeText(title)}`,
      `DESCRIPTION:${escapeText(description)}`,
      s.venue ? `LOCATION:${escapeText(s.venue)}` : '',
      `UID:${uid()}`,
      'END:VEVENT'
    );
  }

  lines.push('END:VCALENDAR');
  const ics = lines.filter(Boolean).join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'our-dates.ics';
  a.click();
  URL.revokeObjectURL(url);
}

export function pad2(n: number) { return pad(n); }
