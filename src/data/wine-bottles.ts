// Curated specific bottles per wine — update quarterly as vintages change.
// Separate from wines.ts so editorial maintenance doesn't touch scoring logic.
// Vivino URLs are search URLs (stable); direct wine-page URLs rot when bottles sell out.

export interface Bottle {
  producer: string;
  wine: string;
  vintage: string;   // 'NV' for non-vintage
  approxPrice: string;
  note: string;
  url: string;
}

// Keyed by wine id from wines.ts
export const BOTTLES: Record<string, Bottle[]> = {

  // ── WHITES — Old World ──────────────────────────────────────────────────────

  chablis: [
    {
      producer: 'William Fèvre',
      wine: 'Chablis Champs Royaux',
      vintage: '2022',
      approxPrice: '~£18',
      note: 'The accessible benchmark; widely stocked, unoaked, pure Kimmeridgian character',
      url: 'https://www.vivino.com/search/wines?q=william+fevre+chablis+champs+royaux',
    },
    {
      producer: 'Louis Michel & Fils',
      wine: 'Chablis Village',
      vintage: '2022',
      approxPrice: '~£19',
      note: 'Classic unoaked village Chablis; reliable and honest at this price',
      url: 'https://www.vivino.com/search/wines?q=louis+michel+chablis+village',
    },
    {
      producer: 'Vincent Dauvissat',
      wine: 'Chablis',
      vintage: '2021',
      approxPrice: '~£40',
      note: 'Old vines, biodynamic, cult status — if you find it, buy it',
      url: 'https://www.vivino.com/search/wines?q=vincent+dauvissat+chablis',
    },
  ],

  meursault: [
    {
      producer: 'Joseph Drouhin',
      wine: 'Meursault',
      vintage: '2021',
      approxPrice: '~£38',
      note: 'The most accessible entry to Meursault; well-distributed and consistent',
      url: 'https://www.vivino.com/search/wines?q=joseph+drouhin+meursault',
    },
    {
      producer: 'Bouchard Père et Fils',
      wine: 'Meursault du Château',
      vintage: '2021',
      approxPrice: '~£40',
      note: 'Estate fruit from the Château de Beaune; elegant and reliable every vintage',
      url: 'https://www.vivino.com/search/wines?q=bouchard+meursault+chateau',
    },
    {
      producer: 'Domaine Roulot',
      wine: 'Meursault',
      vintage: '2020',
      approxPrice: '~£75',
      note: 'The prestige pick; luminous and age-worthy — allocation only at most merchants',
      url: 'https://www.vivino.com/search/wines?q=domaine+roulot+meursault',
    },
  ],

  sancerre: [
    {
      producer: 'Henri Bourgeois',
      wine: 'Sancerre La Bourgeoise',
      vintage: '2022',
      approxPrice: '~£24',
      note: 'The reliable benchmark; available everywhere, consistently good',
      url: 'https://www.vivino.com/search/wines?q=henri+bourgeois+sancerre',
    },
    {
      producer: 'Pascal Jolivet',
      wine: 'Sancerre',
      vintage: '2022',
      approxPrice: '~£22',
      note: 'Clean, modern, widely available — good value for the appellation',
      url: 'https://www.vivino.com/search/wines?q=pascal+jolivet+sancerre',
    },
    {
      producer: 'Domaine Vacheron',
      wine: 'Sancerre',
      vintage: '2021',
      approxPrice: '~£36',
      note: 'Biodynamic; flint and chalk soils produce the most complex Sancerre at this price',
      url: 'https://www.vivino.com/search/wines?q=domaine+vacheron+sancerre',
    },
  ],

  'gruner-veltliner': [
    {
      producer: 'Domäne Wachau',
      wine: 'Grüner Veltliner Federspiel Terrassen',
      vintage: '2022',
      approxPrice: '~£15',
      note: 'The entry point to Wachau GV; 200 growers, consistent quality, excellent value',
      url: 'https://www.vivino.com/search/wines?q=domane+wachau+gruner+veltliner+federspiel',
    },
    {
      producer: 'Rudi Pichler',
      wine: 'Grüner Veltliner Smaragd Wösendorfer',
      vintage: '2021',
      approxPrice: '~£30',
      note: 'No relation to F.X. — equally outstanding at a more approachable price point',
      url: 'https://www.vivino.com/search/wines?q=rudi+pichler+gruner+veltliner+smaragd',
    },
    {
      producer: 'F.X. Pichler',
      wine: 'Grüner Veltliner Smaragd Loibner',
      vintage: '2021',
      approxPrice: '~£48',
      note: 'Perhaps the greatest name in Wachau; intense, structured, needs time',
      url: 'https://www.vivino.com/search/wines?q=fx+pichler+gruner+veltliner+smaragd',
    },
  ],

  vermentino: [
    {
      producer: 'Argiolas',
      wine: 'Costamolino Vermentino di Sardegna',
      vintage: '2023',
      approxPrice: '~£13',
      note: "Sardinia's most celebrated estate; the benchmark Vermentino, widely available",
      url: 'https://www.vivino.com/search/wines?q=argiolas+costamolino+vermentino',
    },
    {
      producer: 'Sella & Mosca',
      wine: 'La Cala Vermentino',
      vintage: '2023',
      approxPrice: '~£11',
      note: 'The everyday option; reliable, food-friendly, good value',
      url: 'https://www.vivino.com/search/wines?q=sella+mosca+vermentino+sardegna',
    },
    {
      producer: 'Cantina di Santadi',
      wine: 'Cala Silente Vermentino',
      vintage: '2023',
      approxPrice: '~£14',
      note: 'From the co-op making the island\'s most serious wines; one step up in complexity',
      url: 'https://www.vivino.com/search/wines?q=santadi+cala+silente+vermentino',
    },
  ],

  viognier: [
    {
      producer: 'E. Guigal',
      wine: 'Condrieu',
      vintage: '2022',
      approxPrice: '~£45',
      note: 'The most recognisable Condrieu; rich, perfumed, textbook Viognier',
      url: 'https://www.vivino.com/search/wines?q=guigal+condrieu',
    },
    {
      producer: 'Yves Cuilleron',
      wine: 'Condrieu Les Chaillets',
      vintage: '2022',
      approxPrice: '~£42',
      note: 'Top quality at a shade less than Guigal; excellent single-vineyard precision',
      url: 'https://www.vivino.com/search/wines?q=cuilleron+condrieu+les+chaillets',
    },
    {
      producer: 'Georges Vernay',
      wine: 'Condrieu Les Terrasses de l\'Empire',
      vintage: '2021',
      approxPrice: '~£55',
      note: 'The producer who saved Viognier from extinction; this cuvée is the benchmark',
      url: 'https://www.vivino.com/search/wines?q=georges+vernay+condrieu',
    },
  ],

  'jura-savagnin': [
    {
      producer: 'Stéphane Tissot',
      wine: 'Arbois Savagnin Ouillé',
      vintage: '2020',
      approxPrice: '~£28',
      note: 'Biodynamic pioneer of the Jura renaissance; the most available ouillé style',
      url: 'https://www.vivino.com/search/wines?q=tissot+arbois+savagnin',
    },
    {
      producer: 'Domaine de la Tournelle',
      wine: 'Savagnin Ouillé Les Corvées',
      vintage: '2020',
      approxPrice: '~£26',
      note: 'Small estate; focused, mineral ouillé Savagnin; the approachable entry',
      url: 'https://www.vivino.com/search/wines?q=tournelle+savagnin+ouille',
    },
    {
      producer: 'Domaine Ganevat',
      wine: 'Côtes du Jura Savagnin',
      vintage: '2019',
      approxPrice: '~£48',
      note: 'Natural wine cult producer; extraordinary complexity, tiny production',
      url: 'https://www.vivino.com/search/wines?q=ganevat+savagnin+jura',
    },
  ],

  albarino: [
    {
      producer: 'Burgáns (Martín Códax)',
      wine: 'Albariño Rías Baixas',
      vintage: '2023',
      approxPrice: '~£13',
      note: 'The accessible benchmark; clean, consistent, available everywhere',
      url: 'https://www.vivino.com/search/wines?q=burgans+albarino',
    },
    {
      producer: 'Fillaboa',
      wine: 'Albariño Rías Baixas',
      vintage: '2023',
      approxPrice: '~£16',
      note: 'Crisp, precise; one step up in complexity at a still very fair price',
      url: 'https://www.vivino.com/search/wines?q=fillaboa+albarino',
    },
    {
      producer: 'Pazo de Señorans',
      wine: 'Albariño Rías Baixas',
      vintage: '2022',
      approxPrice: '~£20',
      note: 'One of the finest estates in the region; saline, textured, built for the table',
      url: 'https://www.vivino.com/search/wines?q=pazo+de+senorans+albarino',
    },
  ],

  'alsace-riesling': [
    {
      producer: 'Trimbach',
      wine: 'Riesling Réserve',
      vintage: '2019',
      approxPrice: '~£19',
      note: 'The entry to the Trimbach range; dry, precise, consistent across every vintage',
      url: 'https://www.vivino.com/search/wines?q=trimbach+riesling+reserve',
    },
    {
      producer: 'Hugel & Fils',
      wine: 'Riesling Jubilee',
      vintage: '2017',
      approxPrice: '~£32',
      note: 'Old vines, old-school style; this is what Alsace Riesling ageing looks like',
      url: 'https://www.vivino.com/search/wines?q=hugel+riesling+jubilee',
    },
    {
      producer: 'Domaine Weinbach',
      wine: 'Riesling Cuvée Théo',
      vintage: '2020',
      approxPrice: '~£36',
      note: 'Biodynamic estate from a former monastery; floral, mineral, complex',
      url: 'https://www.vivino.com/search/wines?q=weinbach+riesling+cuvee+theo',
    },
  ],

  // ── SPARKLING — Old World ───────────────────────────────────────────────────

  'champagne-bdb': [
    {
      producer: 'Pierre Moncuit',
      wine: 'Blanc de Blancs Grand Cru',
      vintage: 'NV',
      approxPrice: '~£45',
      note: 'Small grower from Le Mesnil; Grand Cru quality at far below prestige-house prices',
      url: 'https://www.vivino.com/search/wines?q=pierre+moncuit+blanc+de+blancs',
    },
    {
      producer: 'Billecart-Salmon',
      wine: 'Blanc de Blancs Grand Cru',
      vintage: 'NV',
      approxPrice: '~£58',
      note: 'One of the great Champagne houses; elegant, precise, widely available',
      url: 'https://www.vivino.com/search/wines?q=billecart+salmon+blanc+de+blancs',
    },
    {
      producer: 'Taittinger',
      wine: 'Comtes de Champagne Blanc de Blancs',
      vintage: '2014',
      approxPrice: '~£95',
      note: 'The prestige pick; a benchmark vintage year — electric acidity, creamy texture',
      url: 'https://www.vivino.com/search/wines?q=taittinger+comtes+de+champagne',
    },
  ],

  'prosecco-col-fondo': [
    {
      producer: 'Costadilà',
      wine: '280 slm Col Fondo',
      vintage: 'NV',
      approxPrice: '~£16',
      note: 'The pioneer of the Col Fondo revival; hazy, alive, textured',
      url: 'https://www.vivino.com/search/wines?q=costadila+col+fondo',
    },
    {
      producer: 'Casa Coste Piane',
      wine: 'Prosecco Frizzante Col Fondo',
      vintage: 'NV',
      approxPrice: '~£15',
      note: 'The benchmark Col Fondo; delicate mousse, orchard fruit, clean finish',
      url: 'https://www.vivino.com/search/wines?q=casa+coste+piane+prosecco+col+fondo',
    },
    {
      producer: 'La Farra',
      wine: 'Col Fondo Brut Nature',
      vintage: 'NV',
      approxPrice: '~£13',
      note: 'Clean, bright entry point to the category; good gateway from standard Prosecco',
      url: 'https://www.vivino.com/search/wines?q=la+farra+col+fondo',
    },
  ],

  // ── REDS — Old World ────────────────────────────────────────────────────────

  'gevrey-chambertin': [
    {
      producer: 'Joseph Drouhin',
      wine: 'Gevrey-Chambertin',
      vintage: '2021',
      approxPrice: '~£35',
      note: 'The most available village-level Gevrey; clean, honest Pinot Noir for the price',
      url: 'https://www.vivino.com/search/wines?q=drouhin+gevrey+chambertin',
    },
    {
      producer: 'Rossignol-Trapet',
      wine: 'Gevrey-Chambertin',
      vintage: '2020',
      approxPrice: '~£42',
      note: 'Biodynamic family estate; consistent and fairly priced for the appellation',
      url: 'https://www.vivino.com/search/wines?q=rossignol+trapet+gevrey+chambertin',
    },
    {
      producer: 'Domaine Trapet Père et Fils',
      wine: 'Gevrey-Chambertin',
      vintage: '2020',
      approxPrice: '~£45',
      note: 'Biodynamic pioneer; elegant, terroir-faithful, structured for ageing',
      url: 'https://www.vivino.com/search/wines?q=trapet+gevrey+chambertin',
    },
  ],

  barolo: [
    {
      producer: 'Prunotto',
      wine: 'Barolo',
      vintage: '2019',
      approxPrice: '~£35',
      note: 'The accessible entry; a 2019 is more approachable young than classic vintages',
      url: 'https://www.vivino.com/search/wines?q=prunotto+barolo',
    },
    {
      producer: 'Massolino',
      wine: 'Barolo',
      vintage: '2019',
      approxPrice: '~£42',
      note: 'Family estate; more approachable style without sacrificing Nebbiolo character',
      url: 'https://www.vivino.com/search/wines?q=massolino+barolo',
    },
    {
      producer: 'Vietti',
      wine: 'Barolo Castiglione',
      vintage: '2018',
      approxPrice: '~£48',
      note: 'Outstanding single-vineyard blend; 2018 is a serious, age-worthy vintage',
      url: 'https://www.vivino.com/search/wines?q=vietti+barolo+castiglione',
    },
  ],

  barbera: [
    {
      producer: 'Prunotto',
      wine: 'Barbera d\'Asti',
      vintage: '2022',
      approxPrice: '~£14',
      note: 'Classic everyday Barbera; juicy, food-friendly, no pretension',
      url: 'https://www.vivino.com/search/wines?q=prunotto+barbera+d+asti',
    },
    {
      producer: 'Michele Chiarlo',
      wine: 'Barbera d\'Asti Superiore',
      vintage: '2021',
      approxPrice: '~£16',
      note: 'One step up; a little more concentration and structure, excellent value',
      url: 'https://www.vivino.com/search/wines?q=michele+chiarlo+barbera+asti',
    },
    {
      producer: 'Braida',
      wine: 'Barbera d\'Asti Montebruna',
      vintage: '2021',
      approxPrice: '~£22',
      note: 'The producer who changed Barbera\'s reputation; Montebruna is the serious cuvée',
      url: 'https://www.vivino.com/search/wines?q=braida+barbera+montebruna',
    },
  ],

  rioja: [
    {
      producer: 'CVNE',
      wine: 'Imperial Rioja Reserva',
      vintage: '2017',
      approxPrice: '~£22',
      note: 'One of Spain\'s most reliable wine bargains; vanilla, leather, strawberry',
      url: 'https://www.vivino.com/search/wines?q=cvne+imperial+rioja+reserva',
    },
    {
      producer: 'Bodegas Muga',
      wine: 'Rioja Reserva',
      vintage: '2018',
      approxPrice: '~£22',
      note: 'Family-owned; still gravity-fed; the best Reserva at this price point',
      url: 'https://www.vivino.com/search/wines?q=muga+rioja+reserva',
    },
    {
      producer: 'La Rioja Alta',
      wine: 'Viña Arana Gran Reserva',
      vintage: '2016',
      approxPrice: '~£32',
      note: 'Traditional house; 2016 is a brilliant vintage — earthy, complex, built to last',
      url: 'https://www.vivino.com/search/wines?q=la+rioja+alta+vina+arana',
    },
  ],

  cdr: [
    {
      producer: 'E. Guigal',
      wine: 'Côtes du Rhône Rouge',
      vintage: '2020',
      approxPrice: '~£12',
      note: 'The Rhône giant\'s CDR; sets the benchmark for quality at this price',
      url: 'https://www.vivino.com/search/wines?q=guigal+cotes+du+rhone+rouge',
    },
    {
      producer: 'Domaine de la Janasse',
      wine: 'Côtes du Rhône',
      vintage: '2021',
      approxPrice: '~£15',
      note: 'Punches well above the category; one of the best value wines from the Rhône',
      url: 'https://www.vivino.com/search/wines?q=janasse+cotes+du+rhone',
    },
    {
      producer: 'Château Beaucastel',
      wine: 'Coudoulet de Beaucastel',
      vintage: '2020',
      approxPrice: '~£26',
      note: "Châteauneuf's most famous estate in CDR clothing; exceptional depth at the price",
      url: 'https://www.vivino.com/search/wines?q=coudoulet+de+beaucastel',
    },
  ],

  'beaujolais-morgon': [
    {
      producer: 'Château des Jacques',
      wine: 'Morgon',
      vintage: '2021',
      approxPrice: '~£20',
      note: 'Louis Jadot estate; the most available Morgon at this quality; consistent every year',
      url: 'https://www.vivino.com/search/wines?q=chateau+des+jacques+morgon',
    },
    {
      producer: 'Marcel Lapierre',
      wine: 'Morgon',
      vintage: '2022',
      approxPrice: '~£28',
      note: 'The godfather of natural Beaujolais; the wine that made Morgon serious',
      url: 'https://www.vivino.com/search/wines?q=marcel+lapierre+morgon',
    },
    {
      producer: 'Jean Foillard',
      wine: 'Morgon Côte du Py',
      vintage: '2022',
      approxPrice: '~£30',
      note: 'Lapierre disciple; Côte du Py is the most age-worthy vineyard in Morgon',
      url: 'https://www.vivino.com/search/wines?q=jean+foillard+morgon+cote+du+py',
    },
  ],

  // ── ROSÉ — Old World ────────────────────────────────────────────────────────

  'provence-rose': [
    {
      producer: 'Château Sainte Marguerite',
      wine: 'Symphonie Rosé',
      vintage: '2023',
      approxPrice: '~£16',
      note: 'Excellent quality at a fraction of the icon prices; the smart Provence buy',
      url: 'https://www.vivino.com/search/wines?q=sainte+marguerite+symphonie+rose',
    },
    {
      producer: 'Miraval',
      wine: 'Rosé',
      vintage: '2023',
      approxPrice: '~£20',
      note: 'The Pitt-Jolie estate; consistently excellent, widely stocked, properly dry',
      url: 'https://www.vivino.com/search/wines?q=miraval+rose+provence',
    },
    {
      producer: "Château d'Esclans",
      wine: 'Whispering Angel Rosé',
      vintage: '2023',
      approxPrice: '~£22',
      note: 'The wine that made Provence rosé globally famous; the reference point',
      url: 'https://www.vivino.com/search/wines?q=whispering+angel+rose',
    },
  ],

  // ── WHITES — New World ──────────────────────────────────────────────────────

  'marlborough-sauv-blanc': [
    {
      producer: 'Dog Point',
      wine: 'Sauvignon Blanc',
      vintage: '2023',
      approxPrice: '~£18',
      note: 'Old vines; more restrained than the typical NZ style — closer to Sancerre in spirit',
      url: 'https://www.vivino.com/search/wines?q=dog+point+sauvignon+blanc',
    },
    {
      producer: 'Greywacke',
      wine: 'Sauvignon Blanc',
      vintage: '2023',
      approxPrice: '~£20',
      note: "Founded by Cloudy Bay's former winemaker; widely considered the best in Marlborough now",
      url: 'https://www.vivino.com/search/wines?q=greywacke+sauvignon+blanc',
    },
    {
      producer: 'Cloudy Bay',
      wine: 'Sauvignon Blanc',
      vintage: '2023',
      approxPrice: '~£20',
      note: 'Still the reference point; the wine that put Marlborough on the map',
      url: 'https://www.vivino.com/search/wines?q=cloudy+bay+sauvignon+blanc',
    },
  ],

  // ── REDS — New World ────────────────────────────────────────────────────────

  'mendoza-malbec': [
    {
      producer: 'Clos de los Siete',
      wine: 'Mendoza',
      vintage: '2020',
      approxPrice: '~£18',
      note: 'Michel Rolland project; seven estates blended into one; outstanding everyday Malbec',
      url: 'https://www.vivino.com/search/wines?q=clos+de+los+siete+malbec',
    },
    {
      producer: 'Achaval Ferrer',
      wine: 'Malbec Mendoza',
      vintage: '2021',
      approxPrice: '~£20',
      note: 'Single-vineyard specialist; this is the entry — polished, dark, and satisfying',
      url: 'https://www.vivino.com/search/wines?q=achaval+ferrer+malbec',
    },
    {
      producer: 'Zuccardi',
      wine: 'Serie A Malbec',
      vintage: '2022',
      approxPrice: '~£19',
      note: 'Innovative Valle de Uco producer; one of the most exciting things in Argentina right now',
      url: 'https://www.vivino.com/search/wines?q=zuccardi+serie+a+malbec',
    },
  ],

  'central-otago-pinot': [
    {
      producer: 'Mt Difficulty',
      wine: 'Pinot Noir Bannockburn',
      vintage: '2022',
      approxPrice: '~£28',
      note: 'The accessible entry to serious Central Otago Pinot; consistently excellent',
      url: 'https://www.vivino.com/search/wines?q=mt+difficulty+pinot+noir+bannockburn',
    },
    {
      producer: 'Rippon',
      wine: 'Mature Vine Pinot Noir',
      vintage: '2021',
      approxPrice: '~£42',
      note: 'Biodynamic lakeside estate; wines of rare elegance, worth every pound',
      url: 'https://www.vivino.com/search/wines?q=rippon+mature+vine+pinot+noir',
    },
    {
      producer: 'Felton Road',
      wine: 'Pinot Noir Bannockburn',
      vintage: '2022',
      approxPrice: '~£48',
      note: 'The benchmark of Central Otago; biodynamic, precise, Southern Hemisphere at its best',
      url: 'https://www.vivino.com/search/wines?q=felton+road+pinot+noir+bannockburn',
    },
  ],

  'napa-cabernet': [
    {
      producer: 'Jordan',
      wine: 'Cabernet Sauvignon Alexander Valley',
      vintage: '2019',
      approxPrice: '~£42',
      note: 'More Bordeaux-influenced than most Napa Cabs; elegant, food-friendly, approachable',
      url: 'https://www.vivino.com/search/wines?q=jordan+cabernet+sauvignon+alexander+valley',
    },
    {
      producer: "Stag's Leap Wine Cellars",
      wine: 'Artemis Cabernet Sauvignon',
      vintage: '2020',
      approxPrice: '~£48',
      note: 'Estate wine from the house that beat France in 1976; cassis, cedar, Napa at its finest',
      url: 'https://www.vivino.com/search/wines?q=stags+leap+artemis+cabernet',
    },
    {
      producer: 'Duckhorn Vineyards',
      wine: 'Napa Valley Cabernet Sauvignon',
      vintage: '2020',
      approxPrice: '~£50',
      note: 'Polished and consistent; the benchmark for mid-tier Napa Cab that over-delivers',
      url: 'https://www.vivino.com/search/wines?q=duckhorn+napa+cabernet+sauvignon',
    },
  ],
};
