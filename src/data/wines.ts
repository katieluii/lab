export type Colour = 'white' | 'red' | 'rosé' | 'sparkling';
export type Acidity = 'low' | 'medium' | 'high';
export type TanninLevel = 'none' | 'low' | 'medium' | 'high';
export type Body = 'light' | 'medium' | 'full';
export type WorldOrigin = 'old' | 'new';
export type FruitType = 'red-fruit' | 'dark-fruit' | 'citrus' | 'stone-fruit' | 'tropical' | 'dried-fruit';
export type Descriptor =
  | 'mineral'
  | 'saline'
  | 'oaky'
  | 'buttery'
  | 'earthy'
  | 'floral'
  | 'herbal'
  | 'spicy'
  | 'funky';

export interface Producer {
  name: string;
  note: string;
}

export interface Wine {
  id: string;
  name: string;
  region: string;
  country: string;
  grape: string;
  colour: Colour;
  body: Body;
  sweetness: number;   // 1 (bone dry) → 5 (very sweet)
  acidity: Acidity;
  tannins: TanninLevel;
  fruitTypes: FruitType[];
  descriptors: Descriptor[];
  worldOrigin: WorldOrigin;
  priceRange: string;
  why: string;
  producers: Producer[];
  vintageNote?: string;
  storySnippet?: string;
}

// --- Profile ---

export interface PaletteProfile {
  colours: Colour[];
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
  mineral:  'Mineral & stony',
  saline:   'Saline & briny',
  oaky:     'Oaky & toasty',
  buttery:  'Buttery & creamy',
  earthy:   'Earthy & mushroomy',
  floral:   'Floral & perfumed',
  herbal:   'Herbal & green',
  spicy:    'Spicy & peppery',
  funky:    'Funky & natural',
};

export const FRUIT_LABELS: Record<FruitType, { label: string; emoji: string; examples: string }> = {
  'red-fruit':   { label: 'Red fruits',   emoji: '🍓', examples: 'strawberry, raspberry, cherry' },
  'dark-fruit':  { label: 'Dark fruits',  emoji: '🫐', examples: 'blackcurrant, plum, blackberry' },
  'citrus':      { label: 'Citrus',       emoji: '🍋', examples: 'lemon, lime, grapefruit' },
  'stone-fruit': { label: 'Stone fruits', emoji: '🍑', examples: 'peach, apricot, nectarine' },
  'tropical':    { label: 'Tropical',     emoji: '🥭', examples: 'mango, pineapple, passion fruit' },
  'dried-fruit': { label: 'Dried fruits', emoji: '🍇', examples: 'fig, raisin, dates' },
};

// Map categorical values to 1–5 scale for scoring
const ACIDITY_SCALE: Record<Acidity, number> = { low: 1.5, medium: 3, high: 4.5 };
const TANNIN_SCALE: Record<TanninLevel, number> = { none: 1, low: 2, medium: 3, high: 4.5 };
const BODY_SCALE: Record<Body, number> = { light: 1.5, medium: 3, full: 4.5 };

// --- Wine DB ---

export const WINES: Wine[] = [
  // WHITES — Old World
  {
    id: 'chablis',
    name: 'Chablis',
    region: 'Burgundy',
    country: 'France',
    grape: 'Chardonnay',
    colour: 'white',
    body: 'light',
    sweetness: 1,
    acidity: 'high',
    tannins: 'none',
    fruitTypes: ['citrus'],
    descriptors: ['mineral', 'saline'],
    worldOrigin: 'old',
    priceRange: '£15–30',
    why: 'Pure, stony Chardonnay from limestone soils — no oak, just bright lemon, wet slate, and a saline finish that lingers.',
    producers: [
      { name: 'Domaine Raveneau', note: 'The benchmark — tiny production, extraordinary minerality' },
      { name: 'William Fèvre', note: 'Reliable and widely available; outstanding Premier Crus' },
      { name: 'Vincent Dauvissat', note: 'Family domaine, old vines, biodynamic; cult status' },
      { name: 'Louis Michel & Fils', note: 'Classic unoaked style; great value entry point' },
    ],
    vintageNote: '2022 and 2019 are excellent drinking right now. 2017 is a standout for mineral purity.',
    storySnippet: "Chablis sits in its own sub-region of Burgundy, closer to Champagne than Beaune. The famous Kimmeridgian limestone — full of tiny fossilised oyster shells — gives the wine its distinctive saline, flinty character. It's the same reason locals say Chablis \"tastes like the sea.\"",
  },
  {
    id: 'meursault',
    name: 'Meursault',
    region: 'Côte de Beaune, Burgundy',
    country: 'France',
    grape: 'Chardonnay',
    colour: 'white',
    body: 'medium',
    sweetness: 1,
    acidity: 'medium',
    tannins: 'none',
    fruitTypes: ['stone-fruit', 'citrus'],
    descriptors: ['mineral', 'buttery', 'oaky', 'floral'],
    worldOrigin: 'old',
    priceRange: '£35–70',
    why: "Burgundy's most celebrated village white — rich and textured with hazelnut butter and white peach, grounded by fine minerality.",
    producers: [
      { name: 'Domaine des Comtes Lafon', note: "Widely regarded as Meursault's greatest producer" },
      { name: 'Domaine Roulot', note: 'Precise and luminous; wines that age beautifully for decades' },
      { name: 'Domaine Leflaive', note: 'Biodynamic estate famed for purity and finesse' },
      { name: 'Domaine Coche-Dury', note: 'Mythical status — one of Burgundy\'s most sought-after names' },
    ],
    vintageNote: '2019 and 2020 are outstanding. 2022 shows brilliant richness. Avoid very young bottles — give them 3–5 years.',
    storySnippet: "Meursault has been producing world-class Chardonnay since the Middle Ages, when the Cistercian monks of Cîteaux managed the vineyards. The name likely comes from the Latin \"Muris Saltus\" — leap of the mouse — a reference to an old aqueduct.",
  },
  {
    id: 'sancerre',
    name: 'Sancerre',
    region: 'Loire Valley',
    country: 'France',
    grape: 'Sauvignon Blanc',
    colour: 'white',
    body: 'light',
    sweetness: 1,
    acidity: 'high',
    tannins: 'none',
    fruitTypes: ['citrus', 'tropical'],
    descriptors: ['mineral', 'saline', 'herbal'],
    worldOrigin: 'old',
    priceRange: '£20–40',
    why: 'Loire Sauvignon Blanc at its most elegant — crystalline acidity, gooseberry and grapefruit, with a flinty smokiness on the finish.',
    producers: [
      { name: 'Henri Bourgeois', note: 'Reliable benchmark; widely available; consistent quality' },
      { name: 'Domaine Vacheron', note: 'Biodynamic; Flint and chalk soils produce stunning complexity' },
      { name: 'Pascal Jolivet', note: 'Modern, clean style; excellent value across the range' },
      { name: 'François Cotat', note: 'Tiny production from Chavignol; intense, mineral, age-defying style — sought after by collectors' },
    ],
    vintageNote: '2020 and 2022 are particularly fine. Drink within 3–4 years for freshness.',
    storySnippet: "Sancerre became fashionable in the 1970s when Parisian restaurants started serving it as the go-to \"smart\" house white. It's still the most ordered wine by name in France's top brasseries — a sign of quality, but also of good marketing. The best Sancerres come from the hamlet of Chavignol, famous for its tiny Crottin de Chavignol goat's cheese — the pairing of the two is one of the great food-wine matches.",
  },
  {
    id: 'gruner-veltliner',
    name: 'Grüner Veltliner Smaragd',
    region: 'Wachau',
    country: 'Austria',
    grape: 'Grüner Veltliner',
    colour: 'white',
    body: 'medium',
    sweetness: 1,
    acidity: 'high',
    tannins: 'none',
    fruitTypes: ['citrus', 'stone-fruit'],
    descriptors: ['mineral', 'herbal', 'spicy'],
    worldOrigin: 'old',
    priceRange: '£18–40',
    why: "Austria's great white — white pepper, green herbs, and bright citrus cut through by thrilling acidity. The sommelier's secret weapon.",
    producers: [
      { name: 'F.X. Pichler', note: 'Perhaps the greatest name in Wachau — intense, age-worthy Smaragds' },
      { name: 'Emmerich Knoll', note: 'Old-school, traditional — wines that outlive us all' },
      { name: 'Rudi Pichler', note: 'No relation to F.X. — but equally outstanding and more approachable in price' },
      { name: 'Domäne Wachau (Freie Weingärtner)', note: 'Cooperative of 200 growers; consistent quality at fair prices' },
    ],
    vintageNote: '2017, 2019, and 2021 are excellent. Smaragd (the top tier) needs 5+ years to show its best.',
    storySnippet: "The Wachau uses its own ripeness classifications: Steinfeder (lightest), Federspiel (medium), and Smaragd (richest) — named after the emerald-green lizard that sunbathes on the steep terraced vineyards. The slopes here are so extreme that all work must be done by hand.",
  },
  {
    id: 'vermentino',
    name: 'Vermentino di Sardegna',
    region: 'Sardinia',
    country: 'Italy',
    grape: 'Vermentino',
    colour: 'white',
    body: 'light',
    sweetness: 1,
    acidity: 'high',
    tannins: 'none',
    fruitTypes: ['citrus', 'stone-fruit'],
    descriptors: ['mineral', 'saline', 'floral'],
    worldOrigin: 'old',
    priceRange: '£12–22',
    why: 'Sun-drenched coastal white — almonds, white flowers, and sea salt. Crisp as a Mediterranean breeze off the Tyrrhenian.',
    producers: [
      { name: 'Argiolas', note: "Sardinia's most celebrated estate; Costamolino is their flagship Vermentino" },
      { name: 'Sella & Mosca', note: 'Large, reliable producer; great value and widely distributed' },
      { name: 'Cantina di Santadi', note: 'Cooperative making some of the island\'s best wines, including excellent Vermentino' },
    ],
    vintageNote: "Drink young — within 2 years of harvest. Vermentino doesn't benefit from ageing; you want that freshness.",
    storySnippet: "Vermentino probably arrived in Sardinia from Spain (via Liguria) centuries ago. The Sardinians took it and made it their own — the coastal terroir, sea breezes, and granite soils give it a saline, almost oyster-shell quality you don't find anywhere else.",
  },
  {
    id: 'viognier',
    name: 'Condrieu',
    region: 'Northern Rhône',
    country: 'France',
    grape: 'Viognier',
    colour: 'white',
    body: 'full',
    sweetness: 2,
    acidity: 'low',
    tannins: 'none',
    fruitTypes: ['stone-fruit', 'tropical'],
    descriptors: ['floral', 'buttery'],
    worldOrigin: 'old',
    priceRange: '£30–65',
    why: 'Extravagant and perfumed — white peach, apricot blossom, and violet on a rich, almost oily texture. Low acid, all pleasure.',
    producers: [
      { name: 'E. Guigal', note: 'The most famous name in the Rhône; Condrieu La Doriane is legendary' },
      { name: 'Georges Vernay', note: 'The producer who saved Viognier from extinction in the 1960s' },
      { name: 'François Villard', note: 'Modern, precise style; several single-vineyard cuvées' },
      { name: 'Yves Cuilleron', note: 'Top quality across multiple cuvées; excellent value in the range' },
    ],
    vintageNote: 'Drink within 3–4 years. Condrieu fades quickly — the floral perfume is the point, and it dissipates with age.',
    storySnippet: "In the 1960s, Viognier was on the verge of extinction — fewer than 14 hectares remained planted in Condrieu. Georges Vernay almost single-handedly saved the grape by refusing to pull up his old vines when Viognier was commercially worthless. Today the appellation has expanded to 170+ hectares.",
  },
  {
    id: 'jura-savagnin',
    name: 'Jura Savagnin (Ouillé)',
    region: 'Jura',
    country: 'France',
    grape: 'Savagnin',
    colour: 'white',
    body: 'medium',
    sweetness: 1,
    acidity: 'high',
    tannins: 'none',
    fruitTypes: ['citrus'],
    descriptors: ['mineral', 'funky', 'earthy'],
    worldOrigin: 'old',
    priceRange: '£20–40',
    why: "For the adventurous — Jura's native grape, made without oxidation. Tart and nutty with a distinct savouriness. Absolutely compelling.",
    producers: [
      { name: "Domaine Ganevat", note: 'Cult natural wine producer; extraordinary complexity from tiny plots' },
      { name: 'Stéphane Tissot', note: 'Biodynamic; pioneer of the modern Jura renaissance' },
      { name: 'Domaine de la Tournelle', note: 'Small estate; beautiful examples of ouillé Savagnin' },
    ],
    vintageNote: '2019 and 2020 are excellent years for Jura whites. These age well — 5–10 years is ideal.',
    storySnippet: "Savagnin Ouillé is the \"fresh\" version of the grape — made without the oxidative ageing that creates the famous Vin Jaune (yellow wine). Vin Jaune ages under a film of yeast called voile for at least 6 years and 3 months before bottling, producing a sherry-like wine of extraordinary complexity. The ouillé style is its more accessible sibling.",
  },
  // SPARKLING — Old World
  {
    id: 'champagne-bdb',
    name: 'Champagne Blanc de Blancs',
    region: 'Champagne',
    country: 'France',
    grape: 'Chardonnay',
    colour: 'sparkling',
    body: 'light',
    sweetness: 1,
    acidity: 'high',
    tannins: 'none',
    fruitTypes: ['citrus', 'stone-fruit'],
    descriptors: ['mineral', 'saline', 'oaky'],
    worldOrigin: 'old',
    priceRange: '£40–90',
    why: '100% Chardonnay from Grand Cru chalk — electric acidity, seashell and lemon curd, with a creamy mousse and biscuity depth from lees ageing.',
    producers: [
      { name: 'Salon', note: 'Only produces Blanc de Blancs in exceptional years; arguably the greatest Champagne house' },
      { name: 'Taittinger Comtes de Champagne', note: 'Luxurious, creamy, and widely available at prestige level' },
      { name: 'Pierre Moncuit', note: 'Small grower-producer from Le Mesnil; outstanding value' },
      { name: 'Billecart-Salmon Blanc de Blancs', note: 'Grand Cru quality; elegant and precise' },
    ],
    vintageNote: '2012, 2013, and 2015 are all exceptional vintage years currently on the market. The 2008 is considered one of the greatest Champagne vintages of the century — if you find it, buy it.',
    storySnippet: "Dom Pérignon did not invent Champagne — and the famous quote attributed to him (\"Come quickly, I am tasting stars!\") was invented in the late 19th century as a marketing device. The first documented method for producing sparkling wine was written by English scientist Christopher Merrett in 1662 — six years before Pérignon even arrived at his Abbey. The riddling process (rotating bottles to collect sediment) was developed by the Widow Clicquot in the early 19th century. Early Champagne bottles exploded so frequently that cellar workers wore iron masks for protection.",
  },
  {
    id: 'prosecco-col-fondo',
    name: 'Col Fondo Prosecco',
    region: 'Veneto / Treviso',
    country: 'Italy',
    grape: 'Glera',
    colour: 'sparkling',
    body: 'light',
    sweetness: 2,
    acidity: 'high',
    tannins: 'none',
    fruitTypes: ['stone-fruit', 'citrus'],
    descriptors: ['funky', 'mineral'],
    worldOrigin: 'old',
    priceRange: '£12–20',
    why: 'Unfiltered, refermented in bottle — hazy, textured, and alive. Apple, pear, and a gentle yeasty funk. Natural wine lovers take note.',
    producers: [
      { name: 'Costadilà', note: 'Pioneer of Col Fondo revival; wild and alive' },
      { name: 'Casa Coste Piane', note: 'Benchmark Col Fondo; delicate bubbles and orchard fruit' },
      { name: 'La Farra', note: 'Clean, bright style; great entry point to the category' },
    ],
    vintageNote: "Drink within 1–2 years. Col Fondo is meant to be fresh — it's not a wine to cellar.",
    storySnippet: "Col Fondo (\"with the sediment\") is the traditional method of making Prosecco — refermented in bottle and left unfiltered, producing a cloudy, living wine. For decades it was eclipsed by the cleaner Charmat-method Prosecco. The natural wine movement brought it back, and now it's one of the most exciting things happening in the Veneto.",
  },
  // REDS — Old World
  {
    id: 'burgundy-pinot',
    name: 'Gevrey-Chambertin',
    region: 'Côte de Nuits, Burgundy',
    country: 'France',
    grape: 'Pinot Noir',
    colour: 'red',
    body: 'light',
    sweetness: 1,
    acidity: 'high',
    tannins: 'low',
    fruitTypes: ['red-fruit'],
    descriptors: ['earthy', 'mineral', 'floral'],
    worldOrigin: 'old',
    priceRange: '£30–80',
    why: 'The benchmark for elegance in red wine — translucent ruby, rose petals, forest floor, and silky-soft tannins. The Côte de Nuits at its finest.',
    producers: [
      { name: 'Armand Rousseau', note: 'The undisputed king of Gevrey — wines of extraordinary depth and longevity' },
      { name: 'Rossignol-Trapet', note: 'Biodynamic; consistent and fairly priced for the appellation' },
      { name: 'Domaine Trapet Père et Fils', note: 'Biodynamic pioneers; elegant, terroir-faithful wines' },
      { name: 'Denis Mortet', note: 'Rich, modern style; concentrated and expressive' },
    ],
    vintageNote: '2019, 2020, and 2022 are all drinking beautifully. 2015 is an exceptional year if you find older bottles.',
    storySnippet: "Gevrey-Chambertin was Napoleon's favourite wine — he reportedly took barrels of it on campaign and drank it nightly. His loyalty to the village elevated its reputation across Europe. The most prestigious vineyard, Le Chambertin, has been producing wine since the 13th century.",
  },
  {
    id: 'barolo',
    name: 'Barolo',
    region: 'Piedmont',
    country: 'Italy',
    grape: 'Nebbiolo',
    colour: 'red',
    body: 'full',
    sweetness: 1,
    acidity: 'high',
    tannins: 'high',
    fruitTypes: ['red-fruit', 'dark-fruit', 'dried-fruit'],
    descriptors: ['earthy', 'floral', 'mineral'],
    worldOrigin: 'old',
    priceRange: '£40–100',
    why: 'The king of Italian reds — structured and profound. Tar, dried roses, and dark fruit with tannins that command respect and reward patience.',
    producers: [
      { name: 'Giacomo Conterno', note: 'The greatest traditionalist; Monfortino is arguably Italy\'s greatest wine' },
      { name: 'Bruno Giacosa', note: 'Legendary; his red-label Barolos from great sites are reference points' },
      { name: 'Vietti', note: 'Excellent single-vineyard wines; modern-traditional bridge style' },
      { name: 'Massolino', note: 'Family estate; approachable style without sacrificing quality' },
      { name: 'Gaja', note: 'Changed Italian wine forever; controversial but undeniable quality' },
    ],
    vintageNote: '2016 and 2010 are considered amongst the greatest Barolo vintages in a generation. 2019 is an excellent, more immediately approachable year. Barolo needs minimum 5 years, ideally 10+.',
    storySnippet: "In the 1980s, a group of young winemakers known as the \"Barolo Boys\" staged a revolution against the traditional style — long macerations, large old oak barrels, wines requiring decades before they were drinkable. They introduced French barriques and shorter macerations, producing Barolo you could drink young. Elio Altare, one of the ringleaders, took a chainsaw to his family's old botti (casks). His father disowned him. The \"Barolo Wars\" between traditionalists and modernists became so culturally significant it spawned a 2014 documentary film. Neither side fully won — today's greatest Barolos draw from both traditions.",
  },
  {
    id: 'barbera',
    name: "Barbera d'Asti",
    region: 'Piedmont',
    country: 'Italy',
    grape: 'Barbera',
    colour: 'red',
    body: 'medium',
    sweetness: 1,
    acidity: 'high',
    tannins: 'low',
    fruitTypes: ['red-fruit', 'dark-fruit'],
    descriptors: ['earthy'],
    worldOrigin: 'old',
    priceRange: '£12–25',
    why: "Italy's everyday red that punches well above its station — deep colour, bright cherry, and piercing acidity with barely any tannin grip. Ridiculously drinkable.",
    producers: [
      { name: 'Braida di Giacomo Bologna', note: "The producer who transformed Barbera's reputation; Bricco dell'Uccellone is iconic" },
      { name: 'Prunotto', note: 'Classic Asti style; reliable and food-friendly' },
      { name: 'Michele Chiarlo', note: 'Excellent single-vineyard Barbera; consistently impressive' },
    ],
    vintageNote: "Best drunk young (2–5 years). Unlike Barolo, Barbera's pleasure is in its immediate, juicy fruit.",
    storySnippet: "Barbera was long considered Piedmont's workhorse grape — made cheaply, drunk young, not taken seriously. Then in the 1980s Giacomo Bologna of Braida put it in new French oak barrels, aged it seriously, and charged serious money. The wine world was shocked. Bricco dell'Uccellone became the first Barbera to be treated as a grand wine.",
  },
  {
    id: 'rioja',
    name: 'Rioja Reserva',
    region: 'Rioja',
    country: 'Spain',
    grape: 'Tempranillo',
    colour: 'red',
    body: 'medium',
    sweetness: 2,
    acidity: 'medium',
    tannins: 'medium',
    fruitTypes: ['red-fruit', 'dark-fruit'],
    descriptors: ['oaky', 'earthy'],
    worldOrigin: 'old',
    priceRange: '£15–35',
    why: "Spain's answer to aged Bordeaux — American oak, vanilla, strawberry jam, and leather. Medium-bodied, smooth, and deeply satisfying.",
    producers: [
      { name: 'La Rioja Alta', note: 'Traditional house; 890 Reserva is a benchmark at its price point' },
      { name: 'CVNE (Cune)', note: 'Imperial Reserva is one of Spain\'s most reliable wine bargains' },
      { name: 'Bodegas Muga', note: 'Family-owned; still gravity-fed and egg-white fined; outstanding quality' },
      { name: 'Marqués de Murrieta', note: 'One of the oldest bodegas; Castillo Ygay is a legend' },
    ],
    vintageNote: '2016, 2017, and 2018 are all excellent years for Rioja. Reserva requires minimum 1 year in oak and 2 in bottle — they\'re always drinking ready on release.',
    storySnippet: "Rioja's love affair with American oak came about partly by accident. In the late 19th century, phylloxera devastated French vineyards, and a wave of Bordeaux négociants moved south to Rioja to source wine. They brought their barriques — but over time, Rioja winemakers preferred the cheaper, more available American oak, and an iconic style was born.",
  },
  {
    id: 'cdr',
    name: 'Côtes du Rhône',
    region: 'Southern Rhône',
    country: 'France',
    grape: 'Grenache, Syrah, Mourvèdre',
    colour: 'red',
    body: 'medium',
    sweetness: 2,
    acidity: 'medium',
    tannins: 'medium',
    fruitTypes: ['dark-fruit', 'red-fruit'],
    descriptors: ['earthy', 'herbal', 'spicy'],
    worldOrigin: 'old',
    priceRange: '£10–20',
    why: 'The everyday Rhône — a Grenache-led blend of garrigue herbs, black olive, and sun-dried fruit. Earthy, warming, and utterly reliable.',
    producers: [
      { name: 'E. Guigal', note: 'The giant of the Rhône; their CDR is a benchmark for quality at the price' },
      { name: 'Domaine du Vieux Télégraphe', note: 'Top Châteauneuf producer; their CDR punches far above its category' },
      { name: 'Château Beaucastel', note: "Châteauneuf's most famous estate; their Coudoulet de Beaucastel is exceptional CDR" },
      { name: "Domaine de la Janasse", note: 'Excellent quality across all tiers; very reliable' },
    ],
    vintageNote: '2019 and 2020 are excellent. Drink within 3–5 years for most CDRs — they\'re not built for the cellar.',
    storySnippet: "The Côtes du Rhône appellation covers a vast area of the Southern Rhône valley. At its best — from producers like Château Rayas or Beaucastel — it's indistinguishable from Châteauneuf-du-Pape. At its worst, it's supermarket plonk. The name on the label matters enormously here.",
  },
  // ROSÉ — Old World
  {
    id: 'provence-rose',
    name: 'Provence Rosé',
    region: 'Provence',
    country: 'France',
    grape: 'Grenache, Cinsault, Syrah',
    colour: 'rosé',
    body: 'light',
    sweetness: 1,
    acidity: 'medium',
    tannins: 'low',
    fruitTypes: ['red-fruit', 'stone-fruit'],
    descriptors: ['mineral', 'floral'],
    worldOrigin: 'old',
    priceRange: '£15–28',
    why: 'The real deal — dry, pale, and structured. Strawberry, white peach, and Provençal herbs. Made for the table, not the poolside.',
    producers: [
      { name: 'Château d\'Esclans (Whispering Angel)', note: 'The wine that made Provence rosé globally famous' },
      { name: 'Domaine Ott', note: 'Iconic tall bottle; one of the great historic Provence estates' },
      { name: 'Château Sainte Marguerite', note: 'Excellent quality at a more accessible price than the icons' },
      { name: 'Miraval', note: 'The Pitt-Jolie estate; consistently excellent quality' },
    ],
    vintageNote: 'Drink the most recent vintage available — freshness is everything with Provence rosé.',
    storySnippet: "Provence is the oldest wine region in France — the Greeks planted vines here in 600 BC, long before Bordeaux existed. For most of history, the region made heavy reds. The pale, bone-dry rosé style only became the dominant style in the 20th century — and exploded globally after the success of Whispering Angel from 2006 onwards.",
  },
  // WHITES — New World
  {
    id: 'marlborough-sauv-blanc',
    name: 'Marlborough Sauvignon Blanc',
    region: 'Marlborough',
    country: 'New Zealand',
    grape: 'Sauvignon Blanc',
    colour: 'white',
    body: 'light',
    sweetness: 1,
    acidity: 'high',
    tannins: 'none',
    fruitTypes: ['citrus', 'tropical'],
    descriptors: ['herbal', 'mineral'],
    worldOrigin: 'new',
    priceRange: '£12–22',
    why: "Impossibly vibrant — passion fruit, kaffir lime, and freshly cut grass. New Zealand's Sauvignon Blanc is like Sancerre turned up to eleven.",
    producers: [
      { name: 'Cloudy Bay', note: 'The wine that put Marlborough on the map; still excellent' },
      { name: 'Greywacke', note: "Founded by Cloudy Bay's former winemaker; possibly better than the original now" },
      { name: 'Dog Point', note: 'Benchmark quality from old vines; also makes an excellent oaked version' },
      { name: 'Villa Maria', note: 'NZ\'s largest quality-focused estate; reliable across all price points' },
    ],
    vintageNote: 'Drink within 1–2 years. Marlborough Sauvignon Blanc is all about freshness — resist ageing it.',
    storySnippet: "Marlborough barely existed as a wine region until 1973, when Montana (now Brancott Estate) planted the first Sauvignon Blanc vines in the Wairau Valley. The first vintage was 1980. By the late 1980s, Cloudy Bay had taken London by storm. In under 20 years, a sheep-farming region became one of the world's most iconic wine appellations.",
  },
  // REDS — New World
  {
    id: 'mendoza-malbec',
    name: 'Mendoza Malbec',
    region: 'Mendoza',
    country: 'Argentina',
    grape: 'Malbec',
    colour: 'red',
    body: 'medium',
    sweetness: 2,
    acidity: 'medium',
    tannins: 'medium',
    fruitTypes: ['dark-fruit', 'red-fruit'],
    descriptors: ['floral', 'spicy'],
    worldOrigin: 'new',
    priceRange: '£12–30',
    why: "Argentina's signature red — plush dark plum, violet, and cocoa with smooth, integrated tannins. Approachable immediately, complex with age.",
    producers: [
      { name: 'Catena Zapata', note: "Argentina's greatest producer; Adrianna Vineyard wines are world-class" },
      { name: 'Achaval Ferrer', note: 'Single-vineyard specialist; Finca Bella Vista is benchmark Malbec' },
      { name: 'Zuccardi Valle de Uco', note: 'Innovative; some of Argentina\'s most exciting recent releases' },
      { name: 'Clos de los Siete', note: 'Michel Rolland project; 7 producers sharing one vast estate — great value' },
    ],
    vintageNote: '2016, 2018, and 2019 are all outstanding Mendoza vintages. High-altitude Malbec (Luján de Cuyo, Uco Valley) ages better than valley-floor wines.',
    storySnippet: "Malbec is a French grape — it was once widely planted in Bordeaux and still stars in Cahors. But in France it struggled with frost and rot. Argentine emigrés brought it to Mendoza in the mid-19th century, and in the dry, high-altitude climate it thrived. Today Argentina produces more Malbec than France ever did.",
  },
  {
    id: 'napa-cabernet',
    name: 'Napa Valley Cabernet Sauvignon',
    region: 'Napa Valley',
    country: 'USA',
    grape: 'Cabernet Sauvignon',
    colour: 'red',
    body: 'full',
    sweetness: 2,
    acidity: 'medium',
    tannins: 'high',
    fruitTypes: ['dark-fruit'],
    descriptors: ['oaky', 'earthy'],
    worldOrigin: 'new',
    priceRange: '£30–100',
    why: 'Opulent Napa at its finest — cassis, cedar, graphite, and vanilla from American and French oak. Power and polish in equal measure.',
    producers: [
      { name: 'Stag\'s Leap Wine Cellars', note: 'Beat the French in the 1976 Judgement of Paris — made Napa famous overnight' },
      { name: 'Jordan', note: 'Elegant, more Bordeaux-influenced style; consistent and food-friendly' },
      { name: 'Ridge Monte Bello', note: 'Technically Santa Cruz Mountains; arguably California\'s greatest Cabernet' },
      { name: 'Opus One', note: 'Mondavi and Rothschild joint venture; iconic prestige wine' },
    ],
    vintageNote: '2013, 2016, and 2018 are exceptional Napa vintages. Serious Napa Cab needs 7–10 years minimum.',
    storySnippet: "The 1976 Judgement of Paris changed everything. In a blind tasting organised by British wine merchant Steven Spurrier, California wines beat French wines in both red and white categories — with American judges scoring highest. The French judges asked for their scoresheets back. Stag's Leap Wine Cellars 1973 Cabernet beat Mouton Rothschild and Haut-Brion. The wine world has never been the same.",
  },
];

// --- Scoring ---

function scaleScore(userPref: number | null, wineVal: number, weight = 1): number {
  if (userPref === null) return 0;
  const dist = Math.abs(userPref - wineVal);
  let raw: number;
  if (dist <= 0.5) raw = 6;       // near-perfect match
  else if (dist <= 1) raw = 3;    // close
  else if (dist <= 2) raw = 0;    // acceptable / neutral
  else if (dist <= 3) raw = -5;   // clear mismatch
  else raw = -10;                  // strong mismatch — this wine is wrong for you
  return raw * weight;
}

function candidatePool(colours: Colour[]): Wine[] {
  if (colours.length === 0) return WINES;
  return WINES.filter((w) => colours.includes(w.colour));
}

function scoreWine(wine: Wine, profile: PaletteProfile): number {
  let score = 0;

  // Old vs New World
  if (profile.worldOrigin && profile.worldOrigin !== 'any') {
    score += wine.worldOrigin === profile.worldOrigin ? 4 : -5;
  }

  // Fruit types
  if (!profile.fruitIDK && profile.fruitTypes.length > 0) {
    const matched = profile.fruitTypes.filter((f) => wine.fruitTypes.includes(f)).length;
    const mismatched = profile.fruitTypes.filter((f) => !wine.fruitTypes.includes(f)).length;
    score += matched * 2.5 - mismatched * 0.5;
  }

  // Palate — ranked scales (1–5), mapped to wine categorical values
  score += scaleScore(profile.body, BODY_SCALE[wine.body], 1.0);
  score += scaleScore(profile.sweetness, wine.sweetness, 1.2);
  score += scaleScore(profile.acidity, ACIDITY_SCALE[wine.acidity], 1.5); // acidity is most decisive
  score += scaleScore(profile.tannins, TANNIN_SCALE[wine.tannins], 1.3);

  // Descriptors
  for (const d of profile.descriptors) {
    if (wine.descriptors.includes(d)) score += 2;
  }

  return score;
}

export function recommend(profile: PaletteProfile, count = 5): Wine[] {
  return candidatePool(profile.colours)
    .map((wine) => ({ wine, score: scoreWine(wine, profile) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.wine);
}

// --- Feedback-aware recommendation ---

export type WineFeedback = Record<string, 'liked' | 'disliked'>;

function feedbackBias(wine: Wine, feedback: WineFeedback): number {
  let bias = 0;
  for (const [wineId, sentiment] of Object.entries(feedback)) {
    const ref = WINES.find((w) => w.id === wineId);
    if (!ref || ref.id === wine.id) continue;
    const delta = sentiment === 'liked' ? 1 : -1;
    if (ref.colour === wine.colour)      bias += 2 * delta;
    if (ref.worldOrigin === wine.worldOrigin) bias += delta;
    if (ref.body === wine.body)          bias += 1.5 * delta;
    if (ref.acidity === wine.acidity)    bias += 1.5 * delta;
    if (ref.tannins === wine.tannins)    bias += delta;
    bias += ref.descriptors.filter((d) => wine.descriptors.includes(d)).length * delta;
    bias += ref.fruitTypes.filter((f) => wine.fruitTypes.includes(f)).length * 0.5 * delta;
  }
  return bias;
}

export function recommendWithFeedback(
  profile: PaletteProfile,
  feedback: WineFeedback,
  count = 5,
): Wine[] {
  const dislikedIds = new Set(
    Object.entries(feedback).filter(([, v]) => v === 'disliked').map(([k]) => k),
  );
  return candidatePool(profile.colours)
    .filter((wine) => !dislikedIds.has(wine.id))
    .map((wine) => ({ wine, score: scoreWine(wine, profile) + feedbackBias(wine, feedback) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.wine);
}

export function generateWhy(wine: Wine, profile: PaletteProfile): string {
  const parts: string[] = [];

  // Fruit match
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

  // Acidity
  if (profile.acidity !== null) {
    if (profile.acidity >= 4 && wine.acidity === 'high') {
      parts.push("The acidity is electric — the kind that makes your mouth water.");
    } else if (profile.acidity <= 2 && wine.acidity === 'low') {
      parts.push("Soft and round, with none of that sharp acidity.");
    }
  }

  // Tannins
  if (profile.tannins !== null) {
    if (profile.tannins >= 4 && wine.tannins === 'high') {
      parts.push("Big, grippy tannins — exactly what you asked for.");
    } else if (profile.tannins <= 2 && (wine.tannins === 'none' || wine.tannins === 'low')) {
      parts.push("Silky smooth — tannins barely register.");
    }
  }

  // Descriptors
  const matchedDesc = profile.descriptors.filter((d) => wine.descriptors.includes(d));
  if (matchedDesc.length > 0) {
    const labels = matchedDesc.map((d) => DESCRIPTOR_LABELS[d].toLowerCase());
    parts.push(`You wanted ${labels.join(', ')} — check.`);
  }

  return parts.length > 0 ? parts.join(' ') : wine.why;
}
