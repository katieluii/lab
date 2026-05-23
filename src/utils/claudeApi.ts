import type { DateIdea, DateSlot, DateSuggestion, GeoLocation, Mood, FoodPref } from './types';

const API_URL = 'https://api.anthropic.com/v1/messages';

async function callClaude(
  userMessage: string,
  system: string,
  apiKey: string,
  model = 'claude-haiku-4-5-20251001',
  maxTokens = 4096
): Promise<string> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userMessage }],
    }),
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
  mood: Mood,
  foodPref: FoodPref,
  apiKey: string
): Promise<DateSuggestion[]> {
  const moodLabel = { lazy: 'low energy / lazy day', normal: 'normal energy', adventurous: 'adventurous / high energy' }[mood];
  const foodLabel = { hot: 'hot/hearty food', light: 'light food', treat: 'a food treat / dessert place', surprise: 'no food preference' }[foodPref];

  const weatherLines = slots.map((s) => {
    if (!s.weather) return `${s.date}: no forecast available`;
    const { emoji, tempMin, tempMax, description, isGoodForOutdoor } = s.weather;
    return `${s.date}: ${emoji} ${tempMin}–${tempMax}°C, ${description}, ${isGoodForOutdoor ? 'good for outdoor' : 'NOT ideal for outdoor'}`;
  });

  const system = `You are a romantic date planner. Return ONLY a JSON array — no markdown, no explanation.
Each item must have exactly these fields:
- ideaId: string (must match one of the provided idea IDs)
- venue: string (specific place / neighbourhood in ${location.city})
- estimatedDistance: string (rough travel time/distance from ${location.city} centre, e.g. "20 min by tube", "45 min drive")
- foodSuggestion: string (1 specific restaurant, café, or food idea near the venue)
- why: string (1–2 sentences explaining why this works for this specific date and weather)
- alternatives: array of 2 idea IDs from the provided list (different from the main pick)

Rules:
- Pick a different idea for each date slot — no repeats
- Prefer outdoor ideas when weather is good, indoor when it's poor
- Match the mood (${moodLabel}) and food preference (${foodLabel})
- Always include estimated distance from ${location.city} centre
- alternatives must be valid idea IDs from the list`;

  const prompt = `Location: ${location.displayName}
Mood: ${moodLabel}
Food preference: ${foodLabel}

Weather forecast:
${weatherLines.join('\n')}

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
