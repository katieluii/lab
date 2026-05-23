import type { DateSlot } from './types';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function toIcsDate(dateStr: string): string {
  // dateStr: YYYY-MM-DD → 20260524
  return dateStr.replace(/-/g, '');
}

function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}@katieslab`;
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
    const title = `📅 ${s.idea.title}`;
    const description = [
      s.venue,
      `Distance: ${s.estimatedDistance}`,
      `Food: ${s.foodSuggestion}`,
      s.why,
    ].join('\\n');

    lines.push(
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${dateStr}`,
      `DTEND;VALUE=DATE:${dateStr}`,
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
