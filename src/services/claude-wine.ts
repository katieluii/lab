import type { PaletteProfile } from '../data/wines';

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';

const SYSTEM_PROMPT = `You are a wine expert. Given wines a user likes, infer their palate preferences.
Return ONLY valid JSON — no markdown, no explanation, just the JSON object — with these fields:
{
  "colours": array of zero or more: "white", "red", "rosé", "sparkling",
  "worldOrigin": "old" or "new" or "any",
  "acidity": integer 1-5 or null (1=very soft, 5=electric),
  "sweetness": integer 1-5 or null (1=bone dry, 5=very sweet),
  "body": integer 1-5 or null (1=light, 5=full),
  "tannins": integer 1-5 or null (1=none/silky, 5=grippy/bold),
  "fruitTypes": array of zero or more: "red-fruit", "dark-fruit", "citrus", "stone-fruit", "tropical", "dried-fruit",
  "descriptors": array of zero or more: "mineral", "saline", "oaky", "buttery", "earthy", "floral", "herbal", "spicy", "funky"
}
Use null when you cannot confidently infer a dimension. Err toward null rather than guessing.`;

export async function inferPaletteFromKnownWines(
  wineNames: string[],
): Promise<Partial<PaletteProfile>> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;
  if (!apiKey || apiKey === 'your_api_key_here') throw new Error('VITE_ANTHROPIC_API_KEY not configured');

  const res = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-ipc': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: `Wines I enjoy: ${wineNames.map((n) => n.trim()).filter(Boolean).join(', ')}` },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
    throw new Error(err.error?.message ?? `API error ${res.status}`);
  }

  const data = await res.json() as { content: Array<{ type: string; text: string }> };
  const raw = data.content[0].text.trim();
  const json = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  return JSON.parse(json) as Partial<PaletteProfile>;
}
