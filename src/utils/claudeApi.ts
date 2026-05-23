import type { DateIdea, DateSlot, DateSuggestion, GeoLocation } from './types';

const PROXY_URL = 'https://restless-thunder-b1c3.katieluikakiu.workers.dev';

async function callClaude(
  userMessage: string,
  system: string,
  apiKey: string,
  model = 'claude-haiku-4-5-20251001',
  maxTokens = 4096
): Promise<string> {
  const body = { model, max_tokens: maxTokens, system, messages: [{ role: 'user', content: userMessage }] };

  const res = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey, ...body }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(err.error?.message ?? `Claude API error ${res.status}`);
  }
  const data = await res.json() as { content: Array<{ text: string }> };
  return data.content[0].text;
}

function extractJSON(text: string): unknown {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/) ?? text.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
  if (match) return JSON.parse(match[1] ?? match[0]);
  return JSON.parse(text.trim());
}

export async function parseIdeas(rawText: string, apiKey: string): Promise<DateIdea[]> {
  const system = `You are a helpful assistant that parses date ideas into structured JSON.
Return ONLY a JSON array — no markdown, no explanation, no preamble.
Each item must have exactly these fields:
- id: string (e.g. "idea_1", "idea_2", ...)
- title: string (2–5 words, descriptive)
- description: string (1 sentence)
- category: one of [outdoor, dining, cultural, indoor_active, relaxed, entertainment, travel]
- duration: one of [1-2h, half-day, full-day]
- budget: one of [low, medium, splurge]
- weatherSensitive: boolean (true if it requires dry/warm weather)
- specificVenue: string or null (exact place name if mentioned)
- notes: string (any special considerations, empty string if none)`;

  const prompt = `Parse these date ideas into a JSON array:\n\n${rawText}`;
  const text = await callClaude(prompt, system, apiKey);
  return extractJSON(text) as DateIdea[];
}

export async function generatePlan(
  ideas: DateIdea[],
  slots: DateSlot[],
  location: GeoLocation,
  apiKey: string
): Promise<DateSuggestion[]> {
  const energyLabels: Record<string, string> = { lazy: 'low energy / lazy day', normal: 'normal energy', adventurous: 'adventurous / high energy' };
  const foodLabels: Record<string, string> = { hot: 'hot/hearty food', light: 'light food', treat: 'a food treat / dessert place', surprise: 'no food preference' };

  const slotLines = slots.map((s) => {
    const stickers = s.stickers ?? [];
    const energyTag = stickers.find(st => st.type === 'energy')?.tag ?? 'normal';
    const foodTag = stickers.find(st => st.type === 'food')?.tag ?? 'surprise';
    const vibeStickers = stickers.filter(st => st.type === 'vibe');

    const weatherPart = s.weather
      ? `${s.weather.emoji} ${s.weather.tempMin}–${s.weather.tempMax}°C, ${s.weather.description}, ${s.weather.isGoodForOutdoor ? 'good for outdoor' : 'NOT ideal for outdoor'}`
      : 'no forecast';
    const vibePart = vibeStickers.length ? vibeStickers.map(v => `${v.emoji} ${v.label}`).join(', ') : 'no vibe preference';

    return `- ${s.date}: weather=${weatherPart} | energy=${energyLabels[energyTag] ?? energyTag} | food=${foodLabels[foodTag] ?? foodTag} | vibe hints=${vibePart}`;
  });

  const system = `You are a romantic date planner. Return ONLY a JSON array — no markdown, no explanation.
Each item must have exactly these fields:
- ideaId: string (must match one of the provided idea IDs)
- venue: string (specific place / neighbourhood in ${location.city})
- estimatedDistance: string (rough travel time/distance from ${location.city} centre, e.g. "20 min by tube", "45 min drive")
- foodSuggestion: string (1 specific restaurant, café, or food idea near the venue — it must be geographically close to the venue)
- why: string (1–2 sentences explaining why this works for this specific date's weather, energy, and vibe)
- alternatives: array of 2 idea IDs from the provided list (different from the main pick)

Rules:
- Pick a different idea for each date slot — no repeats
- Prefer outdoor ideas when weather is good, indoor when it's poor
- Match the per-date energy level and food preference listed below
- Prioritise vibe hints if provided (e.g. if vibe hint is "Dinner date", prefer a dining idea)
- Food suggestion must be near the venue (same neighbourhood or a short walk away)
- Always include estimated distance from ${location.city} centre
- alternatives must be valid idea IDs from the list`;

  const prompt = `Location: ${location.displayName}

Per-date preferences and weather:
${slotLines.join('\n')}

Available date ideas:
${JSON.stringify(ideas, null, 2)}

Date slots to plan (${slots.length} total):
${slots.map((s) => s.date).join(', ')}

Return a JSON array with one entry per date slot, in the same order as the date slots above.`;

  const text = await callClaude(prompt, system, apiKey, 'claude-sonnet-4-6', 4096);
  const raw = extractJSON(text) as Array<{
    ideaId: string;
    venue: string;
    estimatedDistance: string;
    foodSuggestion: string;
    why: string;
    alternatives: string[];
  }>;

  return raw.map((r, i) => {
    const idea = ideas.find((idea) => idea.id === r.ideaId) ?? ideas[i % ideas.length];
    const altIdeas = (r.alternatives ?? [])
      .map((id) => ideas.find((idea) => idea.id === id))
      .filter((a): a is DateIdea => a !== undefined);
    return {
      ideaId: idea.id,
      idea,
      venue: r.venue,
      estimatedDistance: r.estimatedDistance,
      foodSuggestion: r.foodSuggestion,
      why: r.why,
      alternatives: altIdeas,
    };
  });
}
