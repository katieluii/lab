// wines-core.ts — shared types, labels, scoring engine, archetypes
// No wine data lives here — import wine arrays from regional files.

export type Colour = 'white' | 'red' | 'rosé' | 'sparkling';
export type Style = 'still' | 'sparkling' | 'fortified' | 'dessert' | 'orange' | 'pét-nat';
export type Acidity = 'low' | 'medium' | 'high';
export type TanninLevel = 'none' | 'low' | 'medium' | 'high';
export type Body = 'light' | 'medium' | 'full';
export type WorldOrigin = 'old' | 'new';
export type FruitType = 'red-fruit' | 'dark-fruit' | 'citrus' | 'stone-fruit' | 'tropical' | 'dried-fruit';

export type Descriptor =
  // Mineral / geological
  | 'mineral' | 'saline' | 'chalky' | 'flinty' | 'petrol' | 'graphite' | 'slate'
  // Oak / lees / texture
  | 'oaky' | 'buttery' | 'creamy' | 'vanilla' | 'toasty'
  // Earthy / savory / complex
  | 'earthy' | 'funky' | 'smoky' | 'mushroomy' | 'truffle' | 'leather' | 'tobacco'
  // Floral / aromatic
  | 'floral' | 'violet' | 'honeyed'
  // Herbal / green
  | 'herbal' | 'eucalyptus'
  // Spice / dark
  | 'spicy' | 'pepper' | 'licorice'
  // Oxidative / nutty
  | 'nutty' | 'oxidative'
  // Rich / savory extras
  | 'chocolate' | 'olive';

export interface Wine {
  id: string;
  name: string;
  region: string;
  subRegion?: string;
  country: string;
  grape: string;
  colour: Colour;
  style?: Style;
  body: Body;
  sweetness: number;   // 1 (bone dry) → 5 (very sweet)
  acidity: Acidity;
  tannins: TanninLevel;
  fruitTypes: FruitType[];
  descriptors: Descriptor[];
  worldOrigin: WorldOrigin;
  priceRange?: string;
  why?: string;
  vintageNote?: string;
  storySnippet?: string;
}

// --- Profile ---

export interface PaletteProfile {
  colours: Colour[];
  likesSparkling: boolean | null;  // null = no preference; false = exclude all sparkling
  worldOrigin: WorldOrigin | 'any' | null;
  fruitTypes: FruitType[];
  fruitIDK: boolean;
  body: number | null;       // 1–5
  sweetness: number | null;  // 1–5
  acidity: number | null;    // 1–5
  tannins: number | null;    // 1–5
  descriptors: Descriptor[];
  occasion: string | null;
}

// --- Labels ---

export const DESCRIPTOR_LABELS: Record<Descriptor, string> = {
  mineral:    'Mineral & stony',
  saline:     'Saline & briny',
  chalky:     'Chalky & powdery',
  flinty:     'Flinty & gunflint',
  petrol:     'Petrol & kerosene',
  graphite:   'Graphite & pencil shaving',
  slate:      'Slate & schist',
  oaky:       'Oaky & toasty',
  buttery:    'Buttery & creamy',
  creamy:     'Creamy & lees-rich',
  vanilla:    'Vanilla & coconut',
  toasty:     'Toasty & brioche',
  earthy:     'Earthy & forest floor',
  funky:      'Funky & natural',
  smoky:      'Smoky & charcoal',
  mushroomy:  'Mushroom & undergrowth',
  truffle:    'Truffle & umami',
  leather:    'Leather & game',
  tobacco:    'Tobacco & cedar',
  floral:     'Floral & perfumed',
  violet:     'Violet & rose petal',
  honeyed:    'Honeyed & waxy',
  herbal:     'Herbal & green',
  eucalyptus: 'Eucalyptus & menthol',
  spicy:      'Spicy & peppery',
  pepper:     'Black pepper & clove',
  licorice:   'Licorice & anise',
  nutty:      'Nutty & walnut',
  oxidative:  'Oxidative & sherry-like',
  chocolate:  'Chocolate & mocha',
  olive:      'Olive & savory',
};

export const FRUIT_LABELS: Record<FruitType, { label: string; emoji: string; examples: string }> = {
  'red-fruit':   { label: 'Red fruits',   emoji: '🍓', examples: 'strawberry, raspberry, cherry' },
  'dark-fruit':  { label: 'Dark fruits',  emoji: '🫐', examples: 'blackcurrant, plum, blackberry' },
  'citrus':      { label: 'Citrus',       emoji: '🍋', examples: 'lemon, lime, grapefruit' },
  'stone-fruit': { label: 'Stone fruits', emoji: '🍑', examples: 'peach, apricot, nectarine' },
  'tropical':    { label: 'Tropical',     emoji: '🥭', examples: 'mango, pineapple, passion fruit' },
  'dried-fruit': { label: 'Dried fruits', emoji: '🍇', examples: 'fig, raisin, dates' },
};

// Descriptors surfaced to users in the questionnaire (curated subset)
export const QUESTIONNAIRE_DESCRIPTORS: Descriptor[] = [
  'mineral', 'saline', 'oaky', 'buttery', 'earthy', 'floral', 'herbal', 'spicy', 'funky',
  'graphite', 'tobacco', 'violet', 'honeyed', 'smoky', 'truffle', 'pepper', 'nutty', 'oxidative',
];

// Map categorical values to 1–5 scale for scoring
export const ACIDITY_SCALE: Record<Acidity, number> = { low: 1.5, medium: 3, high: 4.5 };
export const TANNIN_SCALE: Record<TanninLevel, number> = { none: 1, low: 2, medium: 3, high: 4.5 };
export const BODY_SCALE: Record<Body, number> = { light: 1.5, medium: 3, full: 4.5 };

// --- Scoring ---

function scaleScore(userPref: number | null, wineVal: number, weight = 1): number {
  if (userPref === null) return 0;
  const dist = Math.abs(userPref - wineVal);
  let raw: number;
  if (dist <= 0.5) raw = 6;
  else if (dist <= 1) raw = 3;
  else if (dist <= 2) raw = 0;
  else if (dist <= 3) raw = -5;
  else raw = -10;
  return raw * weight;
}

function candidatePool(wines: Wine[], profile: PaletteProfile): Wine[] {
  let pool = profile.colours.length === 0 ? wines : wines.filter((w) => profile.colours.includes(w.colour));
  if (profile.likesSparkling === false) pool = pool.filter((w) => w.colour !== 'sparkling' && w.style !== 'sparkling' && w.style !== 'pét-nat');
  return pool;
}

function scoreWine(wine: Wine, profile: PaletteProfile): number {
  let score = 0;

  if (profile.worldOrigin && profile.worldOrigin !== 'any') {
    score += wine.worldOrigin === profile.worldOrigin ? 4 : -5;
  }

  if (!profile.fruitIDK && profile.fruitTypes.length > 0) {
    const matched = profile.fruitTypes.filter((f) => wine.fruitTypes.includes(f)).length;
    const mismatched = profile.fruitTypes.filter((f) => !wine.fruitTypes.includes(f)).length;
    score += matched * 2.5 - mismatched * 0.5;
  }

  score += scaleScore(profile.body, BODY_SCALE[wine.body], 1.0);
  score += scaleScore(profile.sweetness, wine.sweetness, 1.2);
  score += scaleScore(profile.acidity, ACIDITY_SCALE[wine.acidity], 1.5);
  score += scaleScore(profile.tannins, TANNIN_SCALE[wine.tannins], 1.3);

  for (const d of profile.descriptors) {
    if (wine.descriptors.includes(d)) score += 2;
  }

  return score;
}

export function recommend(wines: Wine[], profile: PaletteProfile, count = 5): Wine[] {
  return candidatePool(wines, profile)
    .map((wine) => ({ wine, score: scoreWine(wine, profile) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.wine);
}

// --- Feedback-aware recommendation ---

export type WineFeedback = Record<string, 'liked' | 'disliked'>;

function feedbackBias(wine: Wine, allWines: Wine[], feedback: WineFeedback): number {
  let bias = 0;
  for (const [wineId, sentiment] of Object.entries(feedback)) {
    const ref = allWines.find((w) => w.id === wineId);
    if (!ref || ref.id === wine.id) continue;
    const delta = sentiment === 'liked' ? 1 : -1;
    if (ref.colour === wine.colour)          bias += 2 * delta;
    if (ref.worldOrigin === wine.worldOrigin) bias += delta;
    if (ref.body === wine.body)              bias += 1.5 * delta;
    if (ref.acidity === wine.acidity)        bias += 1.5 * delta;
    if (ref.tannins === wine.tannins)        bias += delta;
    bias += ref.descriptors.filter((d) => wine.descriptors.includes(d)).length * delta;
    bias += ref.fruitTypes.filter((f) => wine.fruitTypes.includes(f)).length * 0.5 * delta;
  }
  return bias;
}

export function recommendWithFeedback(
  wines: Wine[],
  profile: PaletteProfile,
  feedback: WineFeedback,
  count = 5,
): Wine[] {
  const dislikedIds = new Set(
    Object.entries(feedback).filter(([, v]) => v === 'disliked').map(([k]) => k),
  );
  return candidatePool(wines, profile)
    .filter((wine) => !dislikedIds.has(wine.id))
    .map((wine) => ({ wine, score: scoreWine(wine, profile) + feedbackBias(wine, wines, feedback) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.wine);
}

export function generateWhy(wine: Wine, profile: PaletteProfile): string {
  const parts: string[] = [];

  if (!profile.fruitIDK && profile.fruitTypes.length > 0) {
    const matched = profile.fruitTypes.filter((f) => wine.fruitTypes.includes(f));
    if (matched.length > 0) {
      const labels = matched.map((f) => FRUIT_LABELS[f].label.toLowerCase());
      const joined = labels.length === 1
        ? labels[0]
        : `${labels.slice(0, -1).join(', ')} and ${labels[labels.length - 1]}`;
      parts.push(`You love ${joined} — this delivers.`);
    }
  }

  if (profile.acidity !== null) {
    if (profile.acidity >= 4 && wine.acidity === 'high') {
      parts.push('The acidity is electric — the kind that makes your mouth water.');
    } else if (profile.acidity <= 2 && wine.acidity === 'low') {
      parts.push('Soft and round, with none of that sharp acidity.');
    }
  }

  if (profile.tannins !== null) {
    if (profile.tannins >= 4 && wine.tannins === 'high') {
      parts.push('Big, grippy tannins — exactly what you asked for.');
    } else if (profile.tannins <= 2 && (wine.tannins === 'none' || wine.tannins === 'low')) {
      parts.push('Silky smooth — tannins barely register.');
    }
  }

  const matchedDesc = profile.descriptors.filter((d) => wine.descriptors.includes(d));
  if (matchedDesc.length > 0) {
    const labels = matchedDesc.map((d) => DESCRIPTOR_LABELS[d].toLowerCase());
    parts.push(`You wanted ${labels.join(', ')} — check.`);
  }

  return parts.length > 0 ? parts.join(' ') : (wine.why ?? '');
}

// --- Confidence ---

export function confidenceScore(profile: PaletteProfile): number {
  let score = 0;
  if (profile.acidity !== null)   score += 2;
  if (profile.sweetness !== null) score += 1.5;
  if (profile.tannins !== null)   score += 1.5;
  if (profile.body !== null)      score += 1;
  if (!profile.fruitIDK && profile.fruitTypes.length > 0) score += 1;
  if (profile.descriptors.length > 0) score += 0.5;
  if (profile.colours.length > 0)     score += 1;
  if (profile.worldOrigin && profile.worldOrigin !== 'any') score += 0.5;
  return Math.min(score / 9, 1);
}

// --- Archetypes ---

export interface WineArchetype {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  defaults: {
    acidity?: number;
    sweetness?: number;
    body?: number;
    tannins?: number;
    descriptors?: Descriptor[];
    fruitTypes?: FruitType[];
  };
}

export const ARCHETYPES: WineArchetype[] = [
  {
    id: 'mineral-seeker',
    name: 'The Mineral Lover',
    emoji: '💎',
    tagline: 'Crisp, stony, electric acidity',
    defaults: { acidity: 4, body: 2, sweetness: 1, descriptors: ['mineral', 'saline', 'flinty'] },
  },
  {
    id: 'fruit-forward',
    name: 'The Fruit Lover',
    emoji: '🍑',
    tagline: 'Ripe, round, expressive',
    defaults: { acidity: 2, body: 3, sweetness: 2, fruitTypes: ['stone-fruit', 'tropical'] },
  },
  {
    id: 'earthy-complex',
    name: 'The Terroir Hound',
    emoji: '🌍',
    tagline: 'Savoury, earthy, Old World soul',
    defaults: { acidity: 3, body: 3, sweetness: 1, descriptors: ['earthy', 'herbal', 'mineral', 'truffle'] },
  },
  {
    id: 'tannin-hunter',
    name: 'The Bold Red Seeker',
    emoji: '🪨',
    tagline: 'Structure, grip, dark fruit',
    defaults: { acidity: 3, body: 4, sweetness: 1, tannins: 4, fruitTypes: ['dark-fruit'], descriptors: ['graphite', 'tobacco'] },
  },
  {
    id: 'light-elegant',
    name: 'The Elegance Chaser',
    emoji: '🌸',
    tagline: 'Delicate, floral, silky',
    defaults: { acidity: 3, body: 2, sweetness: 1, tannins: 2, descriptors: ['floral', 'violet'] },
  },
  {
    id: 'fun-approachable',
    name: 'The Easy Drinker',
    emoji: '🎉',
    tagline: 'Fresh, fruity, no fuss',
    defaults: { acidity: 2, body: 2, sweetness: 2, tannins: 2, fruitTypes: ['red-fruit', 'stone-fruit'] },
  },
];

export function detectArchetype(profile: PaletteProfile): WineArchetype {
  let best = ARCHETYPES[0];
  let bestScore = -Infinity;

  for (const arch of ARCHETYPES) {
    let score = 0;
    const d = arch.defaults;
    if (d.acidity   !== undefined && profile.acidity   !== null) score -= Math.abs(profile.acidity   - d.acidity);
    if (d.sweetness !== undefined && profile.sweetness !== null) score -= Math.abs(profile.sweetness - d.sweetness);
    if (d.body      !== undefined && profile.body      !== null) score -= Math.abs(profile.body      - d.body);
    if (d.tannins   !== undefined && profile.tannins   !== null) score -= Math.abs(profile.tannins   - d.tannins);
    if (d.descriptors) {
      score += d.descriptors.filter((x) => profile.descriptors.includes(x)).length * 2;
    }
    if (d.fruitTypes) {
      score += d.fruitTypes.filter((x) => profile.fruitTypes.includes(x)).length * 2;
    }
    if (score > bestScore) { bestScore = score; best = arch; }
  }
  return best;
}

export function fillProfileWithArchetype(profile: PaletteProfile, arch: WineArchetype): PaletteProfile {
  const d = arch.defaults;
  return {
    ...profile,
    acidity:   profile.acidity   ?? d.acidity   ?? null,
    sweetness: profile.sweetness ?? d.sweetness ?? null,
    body:      profile.body      ?? d.body      ?? null,
    tannins:   profile.tannins   ?? d.tannins   ?? null,
    descriptors: profile.descriptors.length > 0
      ? profile.descriptors
      : (d.descriptors ?? []),
    fruitTypes: (!profile.fruitIDK && profile.fruitTypes.length > 0)
      ? profile.fruitTypes
      : (d.fruitTypes ?? profile.fruitTypes),
  };
}

export function detectGaps(profile: PaletteProfile, wines: Wine[]): string | null {
  if (profile.colours.length === 0) return null;
  const pool = wines.filter((w) => profile.colours.includes(w.colour));
  if (pool.length < 6) {
    return `Only ${pool.length} wines match your colour preference — consider opening it up for more variety.`;
  }
  return null;
}
