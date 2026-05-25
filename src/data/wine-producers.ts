// Producer recommendations per wine — 3 producers per wine.
// Separate from wines.ts so editorial maintenance doesn't touch scoring logic.
// Keyed by wine id from wines.ts

export interface Producer {
  name: string;
  note: string;
  approxPrice: string;
}

// Keyed by wine id from wines.ts
export const PRODUCERS: Record<string, Producer[]> = {

// ── FRANCE ──

  'aloxe-corton': [
    { name: 'Domaine Tollot-Beaut', note: 'Classic Aloxe-Corton specialist; structured, traditional reds with excellent ageing potential.', approxPrice: '£30–55' },
    { name: 'Domaine Louis Latour', note: 'Négociant benchmark for the appellation, especially strong at Premier and Grand Cru level.', approxPrice: '£28–80' },
    { name: 'Domaine Chandon de Briailles', note: 'Biodynamic estate making refined, elegant Aloxe-Corton with purity and precision.', approxPrice: '£35–70' },
  ],

  'alsace-gewurztraminer': [
    { name: 'Domaine Weinbach', note: 'Reference producer for Alsace; their Gewurztraminer is opulent, perfumed, and perfectly balanced.', approxPrice: '£25–60' },
    { name: 'Trimbach', note: 'Drier, more restrained style — their Gewurztraminer Sélection de Grains Nobles is legendary.', approxPrice: '£18–45' },
    { name: 'Hugel & Fils', note: 'Classic Alsace house with consistent quality; the Jubilee Gewurztraminer is a reliable choice.', approxPrice: '£20–50' },
  ],

  'alsace-gewurztraminer-vt': [
    { name: 'Domaine Zind-Humbrecht', note: 'Produces benchmark Vendanges Tardives; richly aromatic, luscious but never cloying.', approxPrice: '£45–90' },
    { name: 'Domaine Weinbach', note: 'Their VT Gewurztraminer shows remarkable concentration and floral complexity with balancing acidity.', approxPrice: '£50–100' },
    { name: 'Marcel Deiss', note: 'Biodynamic estate with terroir-driven VT wines of great originality and depth.', approxPrice: '£40–85' },
  ],

  'alsace-muscat': [
    { name: 'Domaine Ostertag', note: 'Fine, dry Muscat with citrus freshness; one of Alsace\'s most precise expressions of the grape.', approxPrice: '£18–35' },
    { name: 'Domaine Schoffit', note: 'Focuses on low yields for intense, floral Muscat d\'Alsace with genuine delicacy.', approxPrice: '£16–32' },
    { name: 'Hugel & Fils', note: 'Reliable, approachable Alsace Muscat with classic grapey character and dry finish.', approxPrice: '£15–28' },
  ],

  'alsace-pinot-blanc': [
    { name: 'Trimbach', note: 'Clean, crisp Pinot Blanc with appealing orchard fruit; among the most consistent in Alsace.', approxPrice: '£14–22' },
    { name: 'Domaine Weinbach', note: 'Elegant and textured Pinot Blanc with subtle richness from old vines.', approxPrice: '£18–30' },
    { name: 'Albert Mann', note: 'Biodynamic estate producing Pinot Blanc of genuine character and food-friendly freshness.', approxPrice: '£15–25' },
  ],

  'alsace-pinot-gris': [
    { name: 'Domaine Zind-Humbrecht', note: 'Masterful across all levels from village to Grand Cru; smoky, spicy, and complex.', approxPrice: '£22–65' },
    { name: 'Trimbach', note: 'Their Réserve Personnelle is a benchmark dry style; focused, mineral, and age-worthy.', approxPrice: '£20–40' },
    { name: 'Domaine Weinbach', note: 'Clos des Capucins Pinot Gris is rich and unctuous yet maintains elegance and length.', approxPrice: '£25–55' },
  ],

  'alsace-pinot-noir': [
    { name: 'Domaine Ostertag', note: 'Fine-boned, Burgundy-influenced style; their Fronholz Pinot Noir is Alsace\'s most elegant red.', approxPrice: '£28–50' },
    { name: 'Domaine Trapet', note: 'Biodynamic estate producing Alsace Pinot Noir with surprising depth and Burgundian character.', approxPrice: '£25–45' },
    { name: 'Albert Mann', note: 'Vibrant, fruit-forward Pinot Noir with good structure; among the most reliable in the region.', approxPrice: '£22–40' },
  ],

  'alsace-riesling': [
    { name: 'Trimbach', note: 'Their Clos Ste Hune is arguably France\'s greatest dry Riesling; precise and immortal.', approxPrice: '£20–300' },
    { name: 'Domaine Zind-Humbrecht', note: 'Terroir-obsessed estate; Riesling Clos Windsbuhl demonstrates Alsace Riesling at its peak.', approxPrice: '£25–75' },
    { name: 'Domaine Weinbach', note: 'Consistently brilliant Riesling from the Clos des Capucins; floral, mineral, and electrifying.', approxPrice: '£22–65' },
  ],

  'alsace-riesling-grand-cru': [
    { name: 'Domaine Zind-Humbrecht', note: 'Riesling Brand and Hengst Grand Cru are defining wines; spectacular concentration and finesse.', approxPrice: '£45–120' },
    { name: 'Trimbach', note: 'Their Clos Ste Hune from Rosacker Grand Cru sets the global benchmark for dry Riesling.', approxPrice: '£80–300' },
    { name: 'Marcel Deiss', note: 'Field blends from individual Grand Cru sites; complex, evolving, and utterly unique.', approxPrice: '£40–90' },
  ],

  'alsace-sgn': [
    { name: 'Domaine Zind-Humbrecht', note: 'Makes some of the world\'s greatest botrytised whites; Pinot Gris SGN is astonishing.', approxPrice: '£80–200' },
    { name: 'Domaine Weinbach', note: 'Their SGN Quintessence du Tri is liquid gold — extraordinary concentration and decades of life.', approxPrice: '£90–250' },
    { name: 'Hugel & Fils', note: 'The Hugel SGN is only made in exceptional vintages; collector-level quality when it appears.', approxPrice: '£75–180' },
  ],

  'bandol-rose': [
    { name: 'Domaine Tempier', note: 'The benchmark Bandol rosé; structured, complex, and age-worthy far beyond typical rosé.', approxPrice: '£28–45' },
    { name: 'Château Pibarnon', note: 'Elegant and pale, with mineral precision and a long, savoury finish on the palate.', approxPrice: '£25–40' },
    { name: 'Domaine de la Bégude', note: 'Brilliant, structured rosé from high-altitude Bandol vineyards; outstanding concentration.', approxPrice: '£22–38' },
  ],

  'bandol-rouge': [
    { name: 'Domaine Tempier', note: 'The soul of Bandol rouge; Mourvèdre-dominant wines of incredible depth and 20-year potential.', approxPrice: '£35–80' },
    { name: 'Château Pibarnon', note: 'Perhaps Bandol\'s finest estate; wines are savage, mineral, and profoundly age-worthy.', approxPrice: '£40–90' },
    { name: 'Domaine de Terrebrune', note: 'Organic estate with volcanic soils giving Bandol rouge of distinctive mineral intensity.', approxPrice: '£28–55' },
  ],

  'banyuls': [
    { name: 'Domaine du Mas Blanc', note: 'Historic estate that defined the appellation; complex, oxidative Banyuls of great depth.', approxPrice: '£20–45' },
    { name: 'Domaine de la Rectorie', note: 'Outstanding Banyuls in both rancio and fresh styles; the Parcé family are regional icons.', approxPrice: '£22–50' },
    { name: 'Cellier des Templiers', note: 'Large cooperative producing consistently good Banyuls at approachable prices.', approxPrice: '£15–30' },
  ],

  'barsac': [
    { name: 'Château Climens', note: 'Barsac\'s greatest estate; pure Sémillon of electric freshness and extraordinary concentration.', approxPrice: '£45–120' },
    { name: 'Château Coutet', note: 'One of Barsac\'s two first growths; elegant, citrus-driven style with fine botrytis character.', approxPrice: '£35–90' },
    { name: 'Château Doisy-Daëne', note: 'Denis Dubourdieu\'s estate; fresh and precise Barsac with wonderful aromatic definition.', approxPrice: '£28–65' },
  ],

  'beaujolais-morgon': [
    { name: 'Jean Foillard', note: 'A natural wine pioneer; his Morgon Côte du Py is the definitive expression of the cru.', approxPrice: '£22–38' },
    { name: 'Marcel Lapierre', note: 'Legendary estate credited with starting the natural wine movement in Morgon; profound and pure.', approxPrice: '£25–45' },
    { name: 'Guy Breton', note: 'Low-intervention Morgon with earthy, mineral character and surprising ageing potential.', approxPrice: '£20–35' },
  ],

  'beaune-premier-cru': [
    { name: 'Domaine des Croix', note: 'Modern-styled estate making some of the finest Beaune Premiers Crus; precise and energetic.', approxPrice: '£35–65' },
    { name: 'Joseph Drouhin', note: 'Négociant with extensive Beaune holdings; consistently reliable across multiple Premier Cru sites.', approxPrice: '£30–70' },
    { name: 'Domaine Chanson', note: 'Historic Beaune-based estate; the Clos des Fèves monopole is their standout Premier Cru.', approxPrice: '£32–60' },
  ],

  'bergerac-rouge': [
    { name: 'Château Tour des Gendres', note: 'Benchmark Bergerac estate; organic farming and excellent Merlot-dominant blends.', approxPrice: '£12–22' },
    { name: 'Château les Miaudoux', note: 'Biodynamic estate producing elegant Bergerac rouge of genuine character and freshness.', approxPrice: '£12–20' },
    { name: 'Château Moulin Caresse', note: 'Consistent quality; their Mille et une Nuits is an outstanding prestige cuvée.', approxPrice: '£14–28' },
  ],

  'bonnes-mares': [
    { name: 'Domaine Georges Roumier', note: 'The benchmark for Bonnes-Mares; powerful yet refined, with profound complexity and longevity.', approxPrice: '£350–800' },
    { name: 'Domaine Comte Georges de Vogüé', note: 'Historic estate with large holdings; their Bonnes-Mares is one of Burgundy\'s greatest reds.', approxPrice: '£250–600' },
    { name: 'Domaine Dujac', note: 'Elegant, perfumed style; whole-bunch approach gives their Bonnes-Mares remarkable delicacy.', approxPrice: '£200–500' },
  ],

  'bourgueil': [
    { name: 'Domaine de la Butte', note: 'Jacky Blot\'s estate; precise, terroir-focused Cabernet Franc from exceptional sandy-clay soils.', approxPrice: '£18–35' },
    { name: 'Pierre-Jacques Druet', note: 'The most Bordeaux-like Bourgueil; structured wines from gravelly soils with genuine ageing potential.', approxPrice: '£20–40' },
    { name: 'Domaine Yannick Amirault', note: 'Consistently reliable; their Les Quarterons is an excellent entry point to quality Bourgueil.', approxPrice: '£16–30' },
  ],

  'bouzeron': [
    { name: 'Domaine A & P de Villaine', note: 'Aubert de Villaine\'s estate; the definitive Bouzeron, showcasing Aligoté at its finest.', approxPrice: '£22–35' },
    { name: 'Domaine Chanzy', note: 'Reliable Bouzeron producer capturing the grape\'s characteristic freshness and mineral quality.', approxPrice: '£16–25' },
    { name: 'Domaine Michel Briday', note: 'Small estate in Rully making focused, mineral Bouzeron at very fair prices.', approxPrice: '£14–22' },
  ],

  'brouilly': [
    { name: 'Château Thivin', note: 'The leading Brouilly estate; their Côte de Brouilly rivals many top Burgundies in character.', approxPrice: '£18–30' },
    { name: 'Domaine des Terres Dorées', note: 'Jean-Paul Brun\'s fresh, unoaked Brouilly showcases Gamay\'s natural charm perfectly.', approxPrice: '£16–25' },
    { name: 'Domaine Lafarge Vial', note: 'Burgundy pedigree applied to Beaujolais; precise, mineral Brouilly from excellent terroir.', approxPrice: '£18–28' },
  ],

  'cahors': [
    { name: 'Château Lagrézette', note: 'Modern, ambitious Malbec from Cahors; their Pigeonnier is one of France\'s most impressive reds.', approxPrice: '£20–80' },
    { name: 'Clos Triguedina', note: 'Traditional Cahors estate; their Prince Probus Malbec is a dense, age-worthy benchmark.', approxPrice: '£18–45' },
    { name: 'Domaine du Cèdre', note: 'Organic estate making both modern and traditional Cahors; excellent value across the range.', approxPrice: '£15–35' },
  ],

  'cassis-blanc': [
    { name: 'Clos Sainte-Magdeleine', note: 'The finest Cassis blanc producer; Clairette and Marsanne blends with saline, herbal precision.', approxPrice: '£22–35' },
    { name: 'Domaine du Bagnol', note: 'Elegant white Cassis with Mediterranean freshness and characteristic white peach character.', approxPrice: '£18–28' },
    { name: 'Château de Fontcreuse', note: 'Reliable estate making food-friendly Cassis blanc with clean, crisp Provence character.', approxPrice: '£16–26' },
  ],

  'cdr': [
    { name: 'Château de Beaucastel', note: 'Their CDR Coudoulet is the appellation benchmark; exceptional quality at this price level.', approxPrice: '£18–28' },
    { name: 'Château Rayas', note: 'Even the Château de Fonsalette (their CDR) is extraordinary; tiny production and great demand.', approxPrice: '£40–90' },
    { name: 'Domaine de la Mordorée', note: 'Excellent across the CDR range; La Reine des Bois CDR is superb value for quality.', approxPrice: '£14–22' },
  ],

  'cdr-villages': [
    { name: 'Domaine Gramenon', note: 'Natural wine icon; their CDR Villages La Mémé is an outstanding Grenache of rare purity.', approxPrice: '£18–35' },
    { name: 'Château d\'Aqueria', note: 'Reliable, well-made CDR Villages from Tavel; consistent quality at accessible prices.', approxPrice: '£12–20' },
    { name: 'Domaine Ferme Saint-Martin', note: 'Organic estate in Beaumes-de-Venise; structured, garrigue-scented CDR Villages.', approxPrice: '£14–22' },
  ],

  'chablis': [
    { name: 'Domaine Raveneau', note: 'The benchmark — intense minerality, laser-precise acidity, and extraordinary ageing potential.', approxPrice: '£45–120' },
    { name: 'Vincent Dauvissat', note: 'Family estate making some of the most sought-after Chablis; profound and age-worthy.', approxPrice: '£40–100' },
    { name: 'William Fèvre', note: 'Reliable across all tiers; the Premier and Grand Cru range is consistently excellent.', approxPrice: '£20–60' },
  ],

  'chablis-grand-cru': [
    { name: 'Domaine Raveneau', note: 'Their Blanchot and Les Clos are among Burgundy\'s greatest whites; profoundly complex and long-lived.', approxPrice: '£120–280' },
    { name: 'Vincent Dauvissat', note: 'Les Preuses and Les Clos from Dauvissat are collectors\' wines of extraordinary mineral intensity.', approxPrice: '£100–250' },
    { name: 'Louis Michel & Fils', note: 'Unoaked, pure Chablis Grand Cru of great clarity; Les Clos is especially fine.', approxPrice: '£55–120' },
  ],

  'chablis-premier-cru': [
    { name: 'Domaine Raveneau', note: 'Their Montée de Tonnerre and Chapelot are Premier Crus of Grand Cru quality and longevity.', approxPrice: '£60–150' },
    { name: 'Vincent Dauvissat', note: 'Vaillons and La Forest are exceptional; restrained, mineral, and beautifully precise.', approxPrice: '£55–130' },
    { name: 'Domaine Billaud-Simon', note: 'Excellent Premier Cru range; Montée de Tonnerre is their standout for mineral purity.', approxPrice: '£28–55' },
  ],

  'chambertin-grand-cru': [
    { name: 'Domaine Armand Rousseau', note: 'The definitive Chambertin; silky, complex, and unforgettably long — the summit of Burgundy.', approxPrice: '£500–2000' },
    { name: 'Domaine Leroy', note: 'Biodynamic approach yields Chambertin of extraordinary concentration and spiritual intensity.', approxPrice: '£600–2500' },
    { name: 'Domaine Trapet Père & Fils', note: 'Biodynamic estate with significant Chambertin holdings; elegant, terroir-driven and profound.', approxPrice: '£200–500' },
  ],

  'chambolle-musigny': [
    { name: 'Domaine Georges Roumier', note: 'The defining producer; their village wine already shows the silky elegance Chambolle is famous for.', approxPrice: '£80–200' },
    { name: 'Domaine Comte Georges de Vogüé', note: 'Historic estate; even their village Chambolle is refined, floral, and impeccably balanced.', approxPrice: '£70–180' },
    { name: 'Domaine Ghislaine Barthod', note: 'Outstanding village and Premier Cru wines; precise, fragrant, and beautifully pure.', approxPrice: '£60–150' },
  ],

  'champagne-bdb': [
    { name: 'Salon', note: 'Single-vineyard, single-vintage, single-grape Blanc de Blancs; only released in exceptional years.', approxPrice: '£280–600' },
    { name: 'Billecart-Salmon Blanc de Blancs', note: 'Exquisitely precise Chardonnay Champagne; fresh, mineral, and strikingly elegant.', approxPrice: '£55–90' },
    { name: 'Taittinger Comtes de Champagne', note: 'Grand Cru Chardonnay Blanc de Blancs of great finesse; one of Champagne\'s finest prestige cuvées.', approxPrice: '£80–160' },
  ],

  'champagne-blanc-de-noirs': [
    { name: 'Egly-Ouriet', note: 'Grower benchmark for Blanc de Noirs; Pinot Noir-dominant wines of extraordinary weight and depth.', approxPrice: '£65–120' },
    { name: 'Bollinger Vieilles Vignes Françaises', note: 'Iconic ungrafted Pinot Noir Blanc de Noirs; one of Champagne\'s most collectible wines.', approxPrice: '£400–800' },
    { name: 'Bereche et Fils Reflet d\'Antan', note: 'Serious grower BdN with beautiful texture, dark fruit depth, and impressive complexity.', approxPrice: '£55–95' },
  ],

  'champagne-extra-brut': [
    { name: 'Jacques Selosse', note: 'Anselme Selosse revolutionised grower Champagne; his wines are vinous, complex, and utterly distinctive.', approxPrice: '£150–400' },
    { name: 'Agrapart et Fils', note: 'Excellent extra-brut style from grand cru Avize; mineral, pure, and impeccably precise.', approxPrice: '£55–120' },
    { name: 'Larmandier-Bernier', note: 'Biodynamic estate; zero dosage wines of remarkable freshness and Côte des Blancs minerality.', approxPrice: '£45–110' },
  ],

  'champagne-grower': [
    { name: 'Egly-Ouriet', note: 'One of the finest growers; old-vine Ambonnay Pinot Noir gives wines of power and precision.', approxPrice: '£55–150' },
    { name: 'Pierre Peters', note: 'Grand cru Mesnil-sur-Oger Chardonnay specialist; Cuvée de Réserve is a Blanc de Blancs benchmark.', approxPrice: '£40–90' },
    { name: 'Ulysse Collin', note: 'New-generation grower with tiny production; elegant, mineral wines from Côte des Bar.', approxPrice: '£60–140' },
  ],

  'champagne-nv': [
    { name: 'Billecart-Salmon Brut Réserve', note: 'The finest all-round NV; consistently elegant, delicate, and food-friendly.', approxPrice: '£40–55' },
    { name: 'Pol Roger White Foil', note: 'Classic, disciplined NV Champagne with appealing freshness and impeccable balance.', approxPrice: '£38–50' },
    { name: 'Krug Grande Cuvée', note: 'A multi-vintage masterpiece; complex, nutty, and incomparably rich for a non-vintage.', approxPrice: '£150–200' },
  ],

  'champagne-prestige': [
    { name: 'Dom Pérignon', note: 'Iconic prestige cuvée; the P2 and P3 releases show extraordinary evolution with age.', approxPrice: '£140–400' },
    { name: 'Krug Grande Cuvée', note: 'Technically a multi-vintage but prestige in quality; complex, toasty, and endlessly layered.', approxPrice: '£150–200' },
    { name: 'Louis Roederer Cristal', note: 'Benchmark prestige since 1876; precise, elegant, and exceptionally age-worthy.', approxPrice: '£180–350' },
  ],

  'champagne-rose': [
    { name: 'Billecart-Salmon Rosé NV', note: 'The most elegant rosé Champagne on the market; fresh red fruit and remarkable delicacy.', approxPrice: '£55–75' },
    { name: 'Louis Roederer Rosé', note: 'Structured, serious rosé Champagne with pinot depth and fine persistent bubbles.', approxPrice: '£45–65' },
    { name: 'Ruinart Rosé', note: 'The oldest Champagne house; their Rosé is bright, fruity, and consistently approachable.', approxPrice: '£55–70' },
  ],

  'champagne-vintage': [
    { name: 'Pol Roger', note: 'Benchmark vintage Champagne; the 2015 and 2013 are stunning examples of discipline and elegance.', approxPrice: '£55–90' },
    { name: 'Bollinger Grande Année', note: 'Rich, Pinot-driven vintage with extraordinary depth; a classic that demands cellaring.', approxPrice: '£70–120' },
    { name: 'Charles Heidsieck Blanc des Millénaires', note: 'Blanc de Blancs vintage of great purity; arguably Charles Heidsieck\'s finest wine.', approxPrice: '£80–150' },
  ],

  'chassagne-montrachet-blanc': [
    { name: 'Domaine Ramonet', note: 'The benchmark Chassagne white estate; Ruchottes and Morgeot are profound and age-worthy.', approxPrice: '£60–200' },
    { name: 'Domaine Marc Morey', note: 'Reliable Premier Cru specialist; their Virondots and Morgeot are consistently fine.', approxPrice: '£40–80' },
    { name: 'Domaine Blain-Gagnard', note: 'Elegant, precise Chassagne blancs with excellent Premier Cru offerings at fair prices.', approxPrice: '£38–90' },
  ],

  'chassagne-montrachet-rouge': [
    { name: 'Domaine Ramonet', note: 'Their Chassagne rouge is an underrated gem; structured, mineral Pinot Noir of real depth.', approxPrice: '£45–90' },
    { name: 'Domaine Jean-Noël Gagnard', note: 'Elegant, fruit-forward Chassagne rouge from biodynamically farmed vineyards.', approxPrice: '£35–65' },
    { name: 'Domaine Fernand & Laurent Pillot', note: 'Classic style Chassagne rouge with good concentration and earthy Burgundian character.', approxPrice: '£30–55' },
  ],

  'chateauneuf-du-pape-blanc': [
    { name: 'Château Rayas', note: 'A white wine of extraordinary complexity; 100% Clairette of unparalleled richness and longevity.', approxPrice: '£200–500' },
    { name: 'Château Beaucastel', note: 'Roussanne-dominant blend of great structure; their Vieilles Vignes is a benchmark white CdP.', approxPrice: '£70–180' },
    { name: 'Domaine de la Janasse', note: 'Outstanding white CdP from Grenache Blanc and Clairette; generous, complex, and age-worthy.', approxPrice: '£35–70' },
  ],

  'chateauneuf-du-pape-rouge': [
    { name: 'Château Rayas', note: 'The most famous CdP: 100% old-vine Grenache of ethereal elegance and extraordinary longevity.', approxPrice: '£250–800' },
    { name: 'Château Beaucastel', note: 'Mourvèdre-dominant blend of great authority; the Hommage à Jacques Perrin is legendary.', approxPrice: '£55–350' },
    { name: 'Domaine du Vieux Télégraphe', note: 'Benchmark CdP from the famous La Crau plateau; classic, garrigue-driven and built to age.', approxPrice: '£45–90' },
  ],

  'chinon': [
    { name: 'Charles Joguet', note: 'The reference Chinon estate; their Clos de la Dioterie is one of the Loire\'s greatest reds.', approxPrice: '£22–65' },
    { name: 'Bernard Baudry', note: 'Organic farming and site-specific cuvées; Les Grézeaux is their outstanding entry-level Chinon.', approxPrice: '£18–45' },
    { name: 'Domaine de la Noblaie', note: 'Biodynamic estate producing Chinon with mineral precision and true Cabernet Franc elegance.', approxPrice: '£18–38' },
  ],

  'clos-de-la-roche': [
    { name: 'Domaine Dujac', note: 'Their Clos de la Roche is one of Burgundy\'s most sought-after wines; perfumed and complex.', approxPrice: '£300–700' },
    { name: 'Domaine Armand Rousseau', note: 'One of the largest holdings; a powerful, structured Clos de la Roche built for long ageing.', approxPrice: '£250–600' },
    { name: 'Domaine Ponsot', note: 'Owns much of the Grand Cru; their Clos de la Roche Vieilles Vignes is a Burgundy classic.', approxPrice: '£200–500' },
  ],

  'clos-de-vougeot': [
    { name: 'Domaine Leroy', note: 'Biodynamic farming; their Clos de Vougeot has extraordinary depth and decades of potential.', approxPrice: '£500–1500' },
    { name: 'Domaine Méo-Camuzet', note: 'Among the finest expressions; powerful, structured wine from prime central terroir.', approxPrice: '£150–350' },
    { name: 'Château de la Tour', note: 'The only château within the walls of Clos de Vougeot; their Vieilles Vignes is outstanding.', approxPrice: '£90–200' },
  ],

  'collioure': [
    { name: 'Domaine de la Rectorie', note: 'The leading Collioure estate; terraced schist vineyards yield structured, mineral reds.', approxPrice: '£20–40' },
    { name: 'Domaine du Mas Blanc', note: 'Historic pioneer of Collioure; complex, age-worthy reds from old Mourvèdre and Grenache.', approxPrice: '£22–45' },
    { name: 'Domaine Coume del Mas', note: 'Biodynamic estate with exceptional terroir; Quadratur is their flagship concentrated Collioure.', approxPrice: '£18–35' },
  ],

  'cornas': [
    { name: 'Thierry Allemand', note: 'The modern benchmark; tiny production of Chaillots and Reynard that are utterly compelling.', approxPrice: '£90–200' },
    { name: 'Auguste Clape', note: 'The historic reference; structured, traditional Cornas that demands patience but rewards enormously.', approxPrice: '£70–150' },
    { name: 'Vincent Paris', note: 'Consistently excellent Cornas from young producer; Granit 30 and Granit 60 are superb value.', approxPrice: '£28–55' },
  ],

  'corton-charlemagne': [
    { name: 'Domaine Coche-Dury', note: 'The most coveted Corton-Charlemagne; impossible to find but of legendary quality and precision.', approxPrice: '£600–2000' },
    { name: 'Bonneau du Martray', note: 'The largest single owner; classic, structured Corton-Charlemagne with great ageing potential.', approxPrice: '£120–280' },
    { name: 'Louis Latour', note: 'Reliable négociant with extensive Corton-Charlemagne; consistent and age-worthy at its level.', approxPrice: '£80–180' },
  ],

  'corton-grand-cru': [
    { name: 'Domaine Leroy', note: 'Biodynamic approach yields a Corton of extraordinary power and finesse; built for decades.', approxPrice: '£400–1200' },
    { name: 'Domaine Tollot-Beaut', note: 'Excellent Corton from Les Bressandes; structured, traditional style with real depth.', approxPrice: '£70–150' },
    { name: 'Domaine Chandon de Briailles', note: 'Elegant, biodynamic Corton Blanc and Rouge; the Blanc is especially fine and underrated.', approxPrice: '£60–140' },
  ],

  'cote-rotie': [
    { name: 'Domaine Guigal', note: 'La Mouline, La Landonne, and La Turque are Côte-Rôtie icons; even the Brune et Blonde is superb.', approxPrice: '£55–1000' },
    { name: 'Domaine Jamet', note: 'The understated benchmark; old-vine Syrah from exceptional Côte Brune terroir of breathtaking quality.', approxPrice: '£80–180' },
    { name: 'René Rostaing', note: 'Côte Blonde specialist; elegant, aromatic Côte-Rôtie with floral Viognier lift.', approxPrice: '£55–130' },
  ],

  'coteaux-du-layon': [
    { name: 'Domaine des Baumard', note: 'The most consistent Layon producer; Clos de Sainte-Catherine is a Loire sweet wine classic.', approxPrice: '£20–45' },
    { name: 'Domaine Philippe Delesvaux', note: 'Biodynamic estate; extraordinary Layon from schist soils with great concentration and energy.', approxPrice: '£22–50' },
    { name: 'Château Pierre-Bise', note: 'Claude Papin\'s Layons are superb; fine acidity makes them remarkably long-lived.', approxPrice: '£18–40' },
  ],

  'cotes-du-roussillon-villages': [
    { name: 'Domaine Gauby', note: 'Biodynamic pioneer; their Vieilles Vignes is one of France\'s most exciting grenache-based reds.', approxPrice: '£30–65' },
    { name: 'Domaine Le Soula', note: 'High-altitude organic estate; exceptional both red and white with rare freshness for the region.', approxPrice: '£25–55' },
    { name: 'Mas Amiel', note: 'Long-established estate; the Vintage Maury-style and CDR Villages reds are superb value.', approxPrice: '£18–35' },
  ],

  'cremant-alsace': [
    { name: 'Domaine Ostertag', note: 'Fine, delicate Crémant d\'Alsace from Pinot Blanc; one of the appellation\'s most elegant sparklers.', approxPrice: '£18–28' },
    { name: 'Dopff au Moulin', note: 'A Crémant pioneer; their Cuvée Julien is reliable, fresh, and consistently enjoyable.', approxPrice: '£15–22' },
    { name: 'Albert Mann', note: 'Biodynamic farming gives their Crémant d\'Alsace unusual purity and finesse.', approxPrice: '£16–24' },
  ],

  'cremant-de-loire': [
    { name: 'Domaine Langlois-Chateau', note: 'Leading Crémant de Loire producer; precise, elegant sparkling with fine mousse and great freshness.', approxPrice: '£15–25' },
    { name: 'Domaine Bouvet-Ladubay', note: 'Classic Saumur sparkling house; Trésor Blanc is their standout aged Crémant.', approxPrice: '£14–30' },
    { name: 'Domaine des Baumard', note: 'Fine Crémant de Loire from a trusted Loire estate; reliable quality year after year.', approxPrice: '£16–26' },
  ],

  'crozes-hermitage-blanc': [
    { name: 'Domaine Yann Chave', note: 'Outstanding white Crozes from Marsanne and Roussanne; age-worthy and impressively structured.', approxPrice: '£20–35' },
    { name: 'Domaine Alain Graillot', note: 'The benchmark Crozes estate across both colours; white is honeyed and complex with age.', approxPrice: '£22–38' },
    { name: 'Cave de Tain', note: 'Large cooperative producing excellent value Crozes Blanc; their Nobles Rives is consistently fine.', approxPrice: '£14–22' },
  ],

  'crozes-hermitage-rouge': [
    { name: 'Domaine Alain Graillot', note: 'The definitive Crozes rouge; structured Syrah with Northern Rhône olive and pepper character.', approxPrice: '£22–40' },
    { name: 'Domaine Yann Chave', note: 'Small producer making serious, terroir-driven Crozes rouge; Le Rouvre is their top cuvée.', approxPrice: '£20–38' },
    { name: 'Emmanuel Darnaud', note: 'Excellent artisan Crozes with genuine Northern Rhône typicity and impressive concentration.', approxPrice: '£18–32' },
  ],

  'echézeaux': [
    { name: 'Domaine de la Romanée-Conti', note: 'Even the DRC Echézeaux is extraordinary; a gateway to the greatest domaine in Burgundy.', approxPrice: '£600–1500' },
    { name: 'Domaine Méo-Camuzet', note: 'Exceptional Echézeaux from the top section; a consistent star from this fine Vosne estate.', approxPrice: '£150–350' },
    { name: 'Domaine Mugneret-Gibourg', note: 'One of Burgundy\'s rising stars; their Echézeaux is precise, aromatic, and remarkably pure.', approxPrice: '£120–280' },
  ],

  'entre-deux-mers': [
    { name: 'Château Bonnet', note: 'André Lurton\'s flagship dry white; the definition of crisp, refreshing Entre-Deux-Mers at its best.', approxPrice: '£10–16' },
    { name: 'Château Thieuley', note: 'Consistent, well-made E2M with Sauvignon Blanc freshness and a creamy Sémillon texture.', approxPrice: '£10–15' },
    { name: 'Château Marjosse', note: 'Pierre Lurton\'s estate; elegant dry white with citrus clarity and great food-matching versatility.', approxPrice: '£12–18' },
  ],

  'faugeres': [
    { name: 'Château des Estanilles', note: 'Pioneer of the appellation; their Clos du Fou is a structured, garrigue-scented Languedoc classic.', approxPrice: '£18–35' },
    { name: 'Domaine Léon Barral', note: 'Natural wine icon; biodynamic schist-grown Faugères of extraordinary depth and complexity.', approxPrice: '£25–50' },
    { name: 'Domaine Jean-Michel Alquier', note: 'One of Faugères\' most consistent producers; Les Bastides is their benchmark full-bodied cuvée.', approxPrice: '£18–35' },
  ],

  'fixin': [
    { name: 'Domaine Berthaut-Gerbet', note: 'Outstanding small estate making Fixin of genuine Burgundian depth; top value in the Côte de Nuits.', approxPrice: '£22–40' },
    { name: 'Domaine Joliet', note: 'Historic Fixin estate; their Clos de la Perrière monopole is the appellation benchmark.', approxPrice: '£25–45' },
    { name: 'Domaine Pierre Gelin', note: 'Classic, well-structured Fixin with good ageing potential; Clos du Chapitre is especially fine.', approxPrice: '£22–38' },
  ],

  'fleurie': [
    { name: 'Domaine de la Madone', note: 'Classic Fleurie estate; floral, silky Gamay that exemplifies the cru\'s feminine character.', approxPrice: '£18–28' },
    { name: 'Domaine Jean-Louis Dutraive', note: 'Natural wine producer making vibrant, textured Fleurie from exceptional old-vine parcels.', approxPrice: '£22–38' },
    { name: 'Clos de la Roilette', note: 'Impressive Fleurie from organically farmed parcels; concentrated and unusually age-worthy.', approxPrice: '£20–32' },
  ],

  'fronsac': [
    { name: 'Château de Carles', note: 'One of Fronsac\'s leading estates; rich, Merlot-dominant with Right Bank complexity at fair prices.', approxPrice: '£18–35' },
    { name: 'Château Moulin Haut-Laroque', note: 'Consistently outstanding; their organic Fronsac routinely rivals wines twice the price.', approxPrice: '£16–30' },
    { name: 'Château Villars', note: 'Well-structured, reliable Fronsac from biodynamically farmed clay-limestone terroir.', approxPrice: '£14–25' },
  ],

  'gaillac': [
    { name: 'Domaine Plageoles', note: 'Custodian of Gaillac\'s indigenous grape varieties; Mauzac Vert and Ondenc are utterly unique.', approxPrice: '£16–35' },
    { name: 'Domaine d\'Escausses', note: 'Excellent traditional Gaillac estate with both dry whites and structured Syrah-based reds.', approxPrice: '£14–25' },
    { name: 'Château Larroque', note: 'Reliable, well-made Gaillac across the range; their perlé white is a charming summer wine.', approxPrice: '£12–22' },
  ],

  'gevrey-chambertin': [
    { name: 'Domaine Armand Rousseau', note: 'The undisputed master of Gevrey; even the village wine is extraordinarily precise and elegant.', approxPrice: '£80–180' },
    { name: 'Domaine Denis Mortet', note: 'Dense, opulent style; their village Gevrey is one of the most generous in the appellation.', approxPrice: '£55–120' },
    { name: 'Domaine Bruno Clair', note: 'Excellent across all levels; precise, site-expressive Gevrey-Chambertin of real character.', approxPrice: '£45–100' },
  ],

  'gigondas': [
    { name: 'Domaine Santa Duc', note: 'Benchmark Gigondas; their Aux Grandes Pickardines is structured, concentrated, and age-worthy.', approxPrice: '£22–45' },
    { name: 'Domaine des Pallières', note: 'Organically farmed; elegant, complex Gigondas from schist and limestone soils.', approxPrice: '£25–50' },
    { name: 'Château Raspail-Ay', note: 'Classic, traditional Gigondas built for long ageing; profound Grenache with real depth.', approxPrice: '£20–38' },
  ],

  'givry': [
    { name: 'Domaine François Lumpp', note: 'One of Givry\'s finest estates; precise, Burgundy-quality reds at far more accessible prices.', approxPrice: '£20–38' },
    { name: 'Domaine Joblot', note: 'Exceptional Givry producer; their Clos de la Servoisine is a benchmark for the appellation.', approxPrice: '£22–40' },
    { name: 'Domaine Ragot', note: 'Reliable, honest Givry at good value; the La Grande Berge Premier Cru is especially enjoyable.', approxPrice: '£18–30' },
  ],

  'graves-blanc': [
    { name: 'Domaine de Chevalier', note: 'Benchmark white Graves; Sauvignon Blanc and Sémillon aged in oak with extraordinary longevity.', approxPrice: '£45–90' },
    { name: 'Château Smith Haut Lafitte', note: 'Superb modern-style white Graves with citrus precision and creamy oak integration.', approxPrice: '£55–100' },
    { name: 'Château Carbonnieux', note: 'Reliable, elegant white Graves; excellent balance of Sauvignon freshness and Sémillon richness.', approxPrice: '£25–45' },
  ],

  'haut-medoc': [
    { name: 'Château Sociando-Mallet', note: 'Consistently Cru Classé quality at Haut-Médoc prices; structured, age-worthy, and excellent.', approxPrice: '£25–45' },
    { name: 'Château La Lagune', note: 'The southernmost Cru Classé in the Médoc; elegant, early-drinking style at accessible prices.', approxPrice: '£30–50' },
    { name: 'Château Cantemerle', note: 'One of the best-value Crus Classés; refined, supple claret with consistent quality.', approxPrice: '£22–38' },
  ],

  'hermitage-blanc': [
    { name: 'M. Chapoutier', note: 'Their l\'Ermite and Le Méal single-vineyard whites are among the Rhône\'s greatest; profound Marsanne.', approxPrice: '£80–500' },
    { name: 'Jean-Louis Chave', note: 'The benchmark Hermitage Blanc; a rare, age-worthy Marsanne of breathtaking complexity.', approxPrice: '£120–350' },
    { name: 'Paul Jaboulet Aîné', note: 'Their Chevalier de Sterimberg is a reliable, well-made white Hermitage from a historic négociant.', approxPrice: '£35–65' },
  ],

  'hermitage-rouge': [
    { name: 'Jean-Louis Chave', note: 'The definitive Hermitage rouge; powerful, complex Syrah that needs 20+ years to reveal itself.', approxPrice: '£180–500' },
    { name: 'M. Chapoutier', note: 'Le Pavillon and l\'Ermite are exceptional; biodynamic farming gives extraordinary precision.', approxPrice: '£120–600' },
    { name: 'Paul Jaboulet Aîné', note: 'La Chapelle is a Northern Rhône icon; exceptional in great vintages and built for the long haul.', approxPrice: '£60–300' },
  ],

  'irouléguy': [
    { name: 'Domaine Arretxea', note: 'The finest Irouléguy estate; biodynamic Tannat and Cabernet Franc of rare mineral precision.', approxPrice: '£22–45' },
    { name: 'Domaine Ilarria', note: 'Organic farming in the Pyrenean foothills; structured, age-worthy Irouléguy reds.', approxPrice: '£18–35' },
    { name: 'Cave d\'Irouléguy', note: 'The cooperative that defines the appellation; reliable and well-made at accessible prices.', approxPrice: '£14–25' },
  ],

  'julienas': [
    { name: 'Domaine de la Seigneurie de Juliénas', note: 'Reliable, well-structured Juliénas with characteristic earthy depth and mineral character.', approxPrice: '£15–25' },
    { name: 'Château de Juliénas', note: 'Historic estate; classic, food-friendly Juliénas with spice and red fruit character.', approxPrice: '£16–26' },
    { name: 'Domaine des Chers', note: 'Small organic producer; vibrant, precise Juliénas with excellent freshness and definition.', approxPrice: '£16–28' },
  ],

  'jura-poulsard': [
    { name: 'Domaine de la Pinte', note: 'Biodynamic estate making delicate, pale Poulsard of remarkable finesse and freshness.', approxPrice: '£18–32' },
    { name: 'Domaine Overnoy-Houillon', note: 'Natural wine icon Pierre Overnoy\'s estate; Poulsard of extraordinary depth and character.', approxPrice: '£35–75' },
    { name: 'Domaine de l\'Octavin', note: 'Young, talented Jura producer making vibrant, low-intervention Poulsard of genuine appeal.', approxPrice: '£22–40' },
  ],

  'jura-savagnin': [
    { name: 'Domaine André et Mireille Tissot', note: 'One of Jura\'s most innovative estates; their ouillé Savagnin is a brilliant modern interpretation.', approxPrice: '£22–45' },
    { name: 'Domaine Ganevat', note: 'Biodynamic pioneer; Savagnin wines of extraordinary complexity and cellar-worthiness.', approxPrice: '£35–90' },
    { name: 'Château Chalon Domaine Macle', note: 'The finest Vin Jaune from Jura\'s greatest commune; profound oxidative complexity.', approxPrice: '£45–100' },
  ],

  'jura-trousseau': [
    { name: 'Domaine Ganevat', note: 'Masterly Trousseau of depth and purity; their single-parcel wines are collectors\' items.', approxPrice: '£35–80' },
    { name: 'Domaine de la Tournelle', note: 'Impressive Trousseau from organically farmed Arbois vineyards; spicy, mineral, and food-friendly.', approxPrice: '£22–40' },
    { name: 'Domaine Overnoy-Houillon', note: 'Pure, expressive Trousseau with the characteristic Jura earthiness and herbal complexity.', approxPrice: '£30–65' },
  ],

  'jurancon-moelleux': [
    { name: 'Domaine Cauhapé', note: 'The Jurançon benchmark; their Quintessence du Petit Manseng is a world-class sweet wine.', approxPrice: '£25–80' },
    { name: 'Clos Uroulat', note: 'Henri Ramonteu\'s estate; concentrated, complex Moelleux with remarkable acidity and longevity.', approxPrice: '£22–60' },
    { name: 'Domaine Bellegarde', note: 'Elegant, floral Jurançon Moelleux with perfect balance of sweetness and refreshing acidity.', approxPrice: '£20–45' },
  ],

  'jurancon-sec': [
    { name: 'Domaine Cauhapé', note: 'Their Sec is a brilliant dry style; Petit Manseng with exotic citrus and mineral freshness.', approxPrice: '£18–30' },
    { name: 'Clos Thou', note: 'Excellent Jurançon Sec with characteristic spice, tropical fruit, and brisk Pyrenean acidity.', approxPrice: '£16–28' },
    { name: 'Domaine Bellegarde', note: 'Clean, precise Jurançon Sec; a great aperitif wine with lovely grapefruit and fennel notes.', approxPrice: '£15–26' },
  ],

  'la-clape': [
    { name: 'Château Pech Redon', note: 'Pioneer of the appellation; both red and white from this coastal massif are impressive.', approxPrice: '£16–30' },
    { name: 'Château Rouquette-sur-Mer', note: 'Excellent terroir-driven La Clape; their Cuvée Amarante is saline, complex, and distinctive.', approxPrice: '£18–35' },
    { name: 'Domaine de l\'Hospitalet', note: 'Gérard Bertrand\'s flagship La Clape estate; reliable quality at multiple price points.', approxPrice: '£18–45' },
  ],

  'lalande-de-pomerol': [
    { name: 'Château Belles-Graves', note: 'One of the finest Lalande estates; rich, Merlot-dominant wines with genuine Right Bank depth.', approxPrice: '£20–35' },
    { name: 'Château de Viaud', note: 'Elegant, classic Lalande-de-Pomerol with plush fruit and silky tannins; excellent value.', approxPrice: '£18–30' },
    { name: 'Château Les Cruzelles', note: 'Denis Durantou\'s estate; benchmark Lalande with Pomerol-like precision and concentration.', approxPrice: '£22–40' },
  ],

  'le-montrachet': [
    { name: 'Domaine de la Romanée-Conti', note: 'The most coveted Montrachet; electrifying acidity, infinite complexity, and immortal ageing potential.', approxPrice: '£2000–8000' },
    { name: 'Domaine Leflaive', note: 'Biodynamic estate with superb Montrachet holdings; profound, mineral Chardonnay of the highest order.', approxPrice: '£800–2500' },
    { name: 'Domaine Ramonet', note: 'Their Montrachet is rare but extraordinary; one of the appellation\'s most complex and long-lived wines.', approxPrice: '£700–2000' },
  ],

  'lirac': [
    { name: 'Domaine de la Mordorée', note: 'Lirac specialist making some of the Southern Rhône\'s most complex and age-worthy wines.', approxPrice: '£18–35' },
    { name: 'Château d\'Aqueria', note: 'The most consistent Lirac producer; reliable reds and a crisp, mineral rosé at fair prices.', approxPrice: '£14–22' },
    { name: 'Domaine Maby', note: 'Fine, structured Lirac rouge from old Grenache; excellent value in the Southern Rhône.', approxPrice: '£16–28' },
  ],

  'listrac-medoc': [
    { name: 'Château Fourcas Hosten', note: 'The leading Listrac estate; structured, Cabernet-dominated claret built for medium-term ageing.', approxPrice: '£18–30' },
    { name: 'Château Clarke', note: 'Edmond de Rothschild\'s Listrac estate; reliable, well-made Médoc at accessible prices.', approxPrice: '£18–28' },
    { name: 'Château Fourcas Dupré', note: 'Classic, tannic Listrac style with the typicity of this often-overlooked Médoc appellation.', approxPrice: '£16–26' },
  ],

  'macon-villages': [
    { name: 'Domaine de la Bongran', note: 'Jean Thévenet\'s estate; rich, unconventional Mâcon with a distinctive late-harvest character.', approxPrice: '£18–35' },
    { name: 'Domaine Leflaive', note: 'Their Mâcon-Verzé is outstanding; Burgundy pedigree evident in the precision and minerality.', approxPrice: '£22–35' },
    { name: 'Verget', note: 'Jean-Marie Guffens\'s négociant; consistently excellent Mâcon at various price points.', approxPrice: '£14–25' },
  ],

  'macvin-du-jura': [
    { name: 'Domaine André et Mireille Tissot', note: 'Outstanding Macvin; mistelle of great complexity with dried fruit, walnut, and spice character.', approxPrice: '£22–40' },
    { name: 'Domaine Rolet', note: 'Classic, reliable Macvin du Jura from one of the region\'s most consistent producers.', approxPrice: '£18–32' },
    { name: 'Domaine Ganevat', note: 'Fine, complex Macvin from biodynamic farming; a rare digestif of real character and depth.', approxPrice: '£25–45' },
  ],

  'madiran': [
    { name: 'Domaine Berthoumieu', note: 'Excellent Madiran from Tannat with the structured tannins that define this Pyrenean appellation.', approxPrice: '£16–30' },
    { name: 'Château Montus', note: 'Alain Brumont\'s flagship; their Prestige is one of SW France\'s greatest and most age-worthy reds.', approxPrice: '£25–60' },
    { name: 'Domaine Barréjat', note: 'Traditional, robust Madiran; their old-vine Tannat shows why the grape needs decades to soften.', approxPrice: '£14–25' },
  ],

  'marcillac': [
    { name: 'Domaine du Cros', note: 'The benchmark Marcillac estate; rustic, iron-rich Fer Servadou from red sandstone soils.', approxPrice: '£14–22' },
    { name: 'Domaine Laurens', note: 'Reliable Marcillac producer; vivid, peppery red with characteristic mineral character.', approxPrice: '£12–20' },
    { name: 'Cave de Vallon', note: 'Local cooperative producing excellent, honest Marcillac; the best-value entry to the appellation.', approxPrice: '£10–16' },
  ],

  'margaux': [
    { name: 'Château Margaux', note: 'The most elegant of the First Growths; fragrant, silky, and incomparably refined in great vintages.', approxPrice: '£300–1200' },
    { name: 'Château Palmer', note: 'Often rivals Margaux in quality; their Third Growth is one of the Médoc\'s most beloved wines.', approxPrice: '£120–400' },
    { name: 'Château Rauzan-Ségla', note: 'Outstanding Second Growth; a benchmark for modern Margaux with elegance and consistency.', approxPrice: '£55–130' },
  ],

  'marsannay': [
    { name: 'Domaine Bruno Clair', note: 'The finest Marsannay producer; their Les Longeroies rosé is a Côte de Nuits classic.', approxPrice: '£22–45' },
    { name: 'Domaine Sylvain Pataille', note: 'Rising star; single-parcel Marsannay reds of exceptional purity and Burgundian character.', approxPrice: '£25–50' },
    { name: 'Domaine Fougeray de Beauclair', note: 'Reliable, well-priced Marsannay with genuine depth; one of the northern Côte\'s best values.', approxPrice: '£20–35' },
  ],

  'maury-sec': [
    { name: 'Mas Amiel', note: 'The leading Maury estate; their dry Grenache Noir is serious, concentrated, and age-worthy.', approxPrice: '£18–38' },
    { name: 'Domaine de la Coume du Roy', note: 'Excellent organic Maury Sec with Mediterranean herbs, dark fruit, and mineral depth.', approxPrice: '£16–30' },
    { name: 'Domaine des Schistes', note: 'Fine Maury Sec from schist terroir; structured, complex, and compelling.', approxPrice: '£15–28' },
  ],

  'menetou-salon': [
    { name: 'Henri Pellé', note: 'The reference Menetou-Salon estate; their Morogues is a brilliant alternative to Sancerre.', approxPrice: '£18–32' },
    { name: 'Domaine de Châtenoy', note: 'Excellent biodynamic Menetou-Salon; clean, mineral Sauvignon Blanc with real character.', approxPrice: '£16–28' },
    { name: 'Domaine Roger Champault', note: 'Classic, consistent Menetou-Salon with Loire Sauvignon Blanc freshness at accessible prices.', approxPrice: '£15–25' },
  ],

  'mercurey': [
    { name: 'Domaine A & P de Villaine', note: 'Aubert de Villaine\'s Bouzeron estate also produces outstanding Mercurey; elegant and precise.', approxPrice: '£28–50' },
    { name: 'Château de Chamirey', note: 'Large Mercurey estate; reliable, well-structured reds from excellent Côte Chalonnaise terroir.', approxPrice: '£20–35' },
    { name: 'Domaine Faiveley', note: 'Major négociant with important Mercurey holdings; Clos des Myglands is their best cuvée.', approxPrice: '£22–40' },
  ],

  'meursault': [
    { name: 'Domaine Coche-Dury', note: 'The most sought-after Meursault on earth; impossible to find and of legendary, incomparable quality.', approxPrice: '£200–800' },
    { name: 'Domaine Lafon', note: 'Outstanding across all Meursault levels; their Charmes and Perrières are definitive Premier Crus.', approxPrice: '£80–300' },
    { name: 'Pierre Morey', note: 'Former Leflaive winemaker; elegant, textured Meursault with great finesse and precision.', approxPrice: '£45–100' },
  ],

  'meursault-perrieres': [
    { name: 'Domaine Coche-Dury', note: 'The undisputed pinnacle; mineral, electric, and utterly profound — virtually unobtainable.', approxPrice: '£800–2500' },
    { name: 'Domaine Lafon', note: 'Their Les Perrières is one of Meursault\'s greatest Premier Crus; profound and built for decades.', approxPrice: '£200–500' },
    { name: 'Domaine Roulot', note: 'Exceptional Perrières from Guy Roulot\'s renowned estate; precision, depth, and great longevity.', approxPrice: '£150–400' },
  ],

  'minervois-la-liviniere': [
    { name: 'Château Clos Centeilles', note: 'Biodynamic pioneer of the cru; complex, garrigue-scented reds of real depth and character.', approxPrice: '£18–35' },
    { name: 'Domaine la Tour Boisée', note: 'Consistently excellent La Livinière; their Marie-Claude is a rich, structured benchmark.', approxPrice: '£16–30' },
    { name: 'Château Sainte Eulalie', note: 'Impressive La Livinière from limestone soils; La Cantilène is their outstanding top cuvée.', approxPrice: '£18–32' },
  ],

  'monbazillac': [
    { name: 'Château Tirecul La Gravière', note: 'The greatest Monbazillac estate; their Cuvée Madame is a world-class botrytised wine.', approxPrice: '£30–90' },
    { name: 'Château Belingard', note: 'Reliable, well-priced Monbazillac; accessible sweet wine with good botrytis character.', approxPrice: '£12–25' },
    { name: 'Château la Borderie', note: 'Classic, rich Monbazillac from a traditional estate; excellent value for the sweetness level.', approxPrice: '£14–28' },
  ],

  'montagny': [
    { name: 'Cave des Vignerons de Buxy', note: 'Excellent cooperative making the finest Montagny at very fair prices; Premier Cru is especially good.', approxPrice: '£14–22' },
    { name: 'Louis Latour', note: 'Reliable négociant Montagny; consistent, food-friendly Chardonnay from Côte Chalonnaise.', approxPrice: '£16–25' },
    { name: 'Domaine Laurent Cognard', note: 'Small, quality-focused estate; elegant Montagny with mineral precision at accessible prices.', approxPrice: '£15–24' },
  ],

  'montlouis-sur-loire': [
    { name: 'Domaine François Chidaine', note: 'The benchmark Montlouis producer; biodynamic farming yields Chenin Blanc of extraordinary purity.', approxPrice: '£18–55' },
    { name: 'Jacky Blot (Domaine de la Taille aux Loups)', note: 'Outstanding range of dry, demi-sec, and moelleux; his Triple Zéro is a sparkling benchmark.', approxPrice: '£18–60' },
    { name: 'Domaine Deletang', note: 'Fine, traditional Montlouis; their Les Batisses demi-sec is classic and food-friendly.', approxPrice: '£15–30' },
  ],

  'morey-saint-denis': [
    { name: 'Domaine Dujac', note: 'Founded in Morey; their village, Premier, and Grand Cru wines are benchmark expressions.', approxPrice: '£80–400' },
    { name: 'Domaine Ponsot', note: 'Historic Morey estate; their Clos des Monts Luisants (white!) is one of Burgundy\'s most unusual wines.', approxPrice: '£60–350' },
    { name: 'Domaine Hubert Lignier', note: 'One of Morey\'s most consistent estates; elegant, precise Pinot Noir at multiple price points.', approxPrice: '£45–180' },
  ],

  'moulin-a-vent': [
    { name: 'Château des Jacques', note: 'Louis Jadot-owned estate making structured, Burgundy-influenced Moulin-à-Vent for ageing.', approxPrice: '£20–38' },
    { name: 'Domaine Paul Janin', note: 'Classic, traditional Moulin-à-Vent from old vines; among the most age-worthy in the cru.', approxPrice: '£18–32' },
    { name: 'Château Moulin-à-Vent', note: 'The estate at the heart of the cru; their La Rochelle is a dense, structured benchmark.', approxPrice: '£22–40' },
  ],

  'moulis': [
    { name: 'Château Chasse-Spleen', note: 'The finest Moulis estate; consistently excellent claret at a fraction of the Cru Classé price.', approxPrice: '£22–40' },
    { name: 'Château Maucaillou', note: 'Well-structured, reliable Moulis; excellent value with consistent quality across vintages.', approxPrice: '£18–30' },
    { name: 'Château Poujeaux', note: 'Classic Moulis style; firm tannins and cassis fruit with genuine ageing potential.', approxPrice: '£20–35' },
  ],

  'muscadet-clisson': [
    { name: 'Château de Chasseloir', note: 'Excellent Clisson from granitic terroir; concentrated, textured Muscadet built for long ageing.', approxPrice: '£16–28' },
    { name: 'Domaine de l\'Ecu', note: 'Biodynamic pioneer; their Clisson is a benchmark for ambitious, terroir-driven Muscadet.', approxPrice: '£18–32' },
    { name: 'Domaine Luneau-Papin', note: 'Outstanding Clisson sur Lie; Clos des Allées is a dense, age-worthy expression of the cru.', approxPrice: '£16–28' },
  ],

  'muscadet-sevre-et-maine': [
    { name: 'Domaine de l\'Ecu', note: 'Biodynamic estate making the finest, most mineral Muscadet; their Expression de Gneiss is extraordinary.', approxPrice: '£14–25' },
    { name: 'Domaine Luneau-Papin', note: 'Consistently excellent sur lie Muscadet; Pierre de la Grange is their benchmark mineral cuvée.', approxPrice: '£12–22' },
    { name: 'Domaine Jo Landron', note: 'Elegant, precise Muscadet from biodynamically farmed vineyards; exceptional freshness and purity.', approxPrice: '£12–20' },
  ],

  'musigny-grand-cru': [
    { name: 'Domaine Comte Georges de Vogüé', note: 'The largest Musigny owner; one of Burgundy\'s greatest wines — fragrant, silky, and immortal.', approxPrice: '£600–2000' },
    { name: 'Domaine Georges Roumier', note: 'Tiny Musigny production; their wine is among Burgundy\'s most prized and rarely seen.', approxPrice: '£1000–3000' },
    { name: 'Domaine Leroy', note: 'Biodynamic Musigny of extraordinary concentration and a spiritual intensity unique to this domaine.', approxPrice: '£2000–8000' },
  ],

  'nuits-saint-georges': [
    { name: 'Domaine Henri Gouges', note: 'The historic benchmark for NSG; their Les Saint-Georges and Les Vaucrains are definitive.', approxPrice: '£45–120' },
    { name: 'Domaine Méo-Camuzet', note: 'Superb NSG across multiple Premier Crus; Aux Murgers and Les Boudots are outstanding.', approxPrice: '£80–200' },
    { name: 'Domaine de l\'Arlot', note: 'Fine, elegant NSG from biodynamic farming; Clos de l\'Arlot and Clos des Forêts are gems.', approxPrice: '£45–100' },
  ],

  'pauillac': [
    { name: 'Château Latour', note: 'The most powerful of the First Growths; profound, structured Cabernet Sauvignon for 50+ years.', approxPrice: '£400–1800' },
    { name: 'Château Mouton Rothschild', note: 'First Growth with artistic flair; opulent, aromatic Pauillac of extraordinary complexity.', approxPrice: '£350–1500' },
    { name: 'Château Pichon Lalande', note: 'The finest Second Growth in Pauillac; elegant, almost feminine wine of great consistency.', approxPrice: '£80–250' },
  ],

  'pessac-leognan-blanc': [
    { name: 'Château Haut-Brion Blanc', note: 'One of the world\'s greatest white wines; tiny production of Sauvignon-Sémillon of incomparable complexity.', approxPrice: '£400–1500' },
    { name: 'Domaine de Chevalier', note: 'Benchmark Pessac blanc; age-worthy, precise, and often rivals wines at five times the price.', approxPrice: '£45–100' },
    { name: 'Château Smith Haut Lafitte', note: 'Modern, precise Pessac blanc with excellent Sauvignon freshness and oak-derived complexity.', approxPrice: '£55–100' },
  ],

  'pessac-leognan-rouge': [
    { name: 'Château Haut-Brion', note: 'The only First Growth outside the Médoc; earthy, complex, uniquely profound Cabernet-Merlot.', approxPrice: '£300–1200' },
    { name: 'Château La Mission Haut-Brion', note: 'The finest Pessac red after Haut-Brion itself; powerful, structured, and exceptionally long-lived.', approxPrice: '£150–600' },
    { name: 'Château Pape Clément', note: 'Consistent, well-made Pessac rouge; reliable quality at the top of the Pessac hierarchy.', approxPrice: '£55–130' },
  ],

  'pic-saint-loup': [
    { name: 'Domaine de l\'Hortus', note: 'Jean Orliac\'s estate; their Grande Cuvée is one of Languedoc\'s most age-worthy reds.', approxPrice: '£20–38' },
    { name: 'Château de Cazeneuve', note: 'Excellent terroir-driven Pic Saint-Loup; concentrated, complex Syrah and Grenache blend.', approxPrice: '£18–32' },
    { name: 'Mas Bruguière', note: 'Small, artisan estate; l\'Arbouse is a fine, structured Pic Saint-Loup at excellent value.', approxPrice: '£16–30' },
  ],

  'picpoul-de-pinet': [
    { name: 'Domaine Félines Jourdan', note: 'The reference Picpoul producer; vibrant, saline, and unmistakably Mediterranean in character.', approxPrice: '£10–16' },
    { name: 'Château Plo des Guzels', note: 'Crisp, mineral Picpoul de Pinet from the Thau lagoon; ideal with shellfish.', approxPrice: '£10–15' },
    { name: 'Domaine Morin-Langaran', note: 'Reliable, well-made Picpoul with good citrus definition and characteristic briny freshness.', approxPrice: '£10–16' },
  ],

  'pomerol': [
    { name: 'Pétrus', note: 'The world\'s most famous Merlot; near-100% old-vine from the fabled clay plateau — priceless.', approxPrice: '£2000–8000' },
    { name: 'Château Le Pin', note: 'Tiny production; ultra-concentrated, hedonistic Merlot that commands extraordinary prices.', approxPrice: '£1500–5000' },
    { name: 'Château Trotanoy', note: 'One of Pomerol\'s finest; iron-rich clay terroir yields profound, age-worthy Merlot.', approxPrice: '£120–350' },
  ],

  'pommard': [
    { name: 'Domaine de Courcel', note: 'The benchmark Pommard estate; Grand Clos des Épenots is one of the appellation\'s finest wines.', approxPrice: '£55–130' },
    { name: 'Domaine Comte Armand', note: 'Biodynamic estate; their Clos des Épeneaux monopole is Pommard at its most profound.', approxPrice: '£80–180' },
    { name: 'Domaine du Pavillon (Albert Bichot)', note: 'Excellent Pommard Premier Cru across multiple sites; reliably excellent quality.', approxPrice: '£45–90' },
  ],

  'pouilly-fuisse': [
    { name: 'Domaine Guffens-Heynen', note: 'Jean-Marie Guffens\'s estate; perhaps Pouilly-Fuissé\'s greatest and most concentrated Chardonnay.', approxPrice: '£45–120' },
    { name: 'Château Fuissé', note: 'Historic reference estate; their Tête de Cru is a benchmark for the appellation.', approxPrice: '£30–65' },
    { name: 'Domaine Valette', note: 'Traditional, late-picked style; Tradition and Clos de Monsieur Noly are impressively age-worthy.', approxPrice: '£28–60' },
  ],

  'pouilly-fume': [
    { name: 'Didier Dagueneau', note: 'Revolutionary producer; Silex and Pur Sang are among the world\'s greatest Sauvignon Blancs.', approxPrice: '£55–200' },
    { name: 'Henri Bourgeois', note: 'Consistent, high-quality Pouilly-Fumé across the range; Jadis is their outstanding top cuvée.', approxPrice: '£18–45' },
    { name: 'Domaine de Saint-Just', note: 'Fine, mineral Pouilly-Fumé from flint soils; pure Sauvignon character with great freshness.', approxPrice: '£18–32' },
  ],

  'provence-rose': [
    { name: 'Domaine Ott (Château Romassan)', note: 'The original prestige Provence rosé; elegant, pale, and unmistakably sophisticated.', approxPrice: '£30–55' },
    { name: 'Château d\'Esclans (Whispering Angel)', note: 'The wine that defined the Provence rosé boom; consistent, pale, and widely available.', approxPrice: '£18–28' },
    { name: 'Château Minuty', note: 'Award-winning Provence rosé; their Rosé et Or is one of the appellation\'s finest prestige releases.', approxPrice: '£22–60' },
  ],

  'puligny-montrachet': [
    { name: 'Domaine Leflaive', note: 'The definitive Puligny estate; biodynamic farming yields some of the world\'s greatest white Burgundies.', approxPrice: '£90–600' },
    { name: 'Domaine Etienne Sauzet', note: 'Outstanding Puligny across all Premier Crus; Combettes and Perrières are regularly excellent.', approxPrice: '£80–250' },
    { name: 'Domaine Carillon', note: 'Reliable, well-priced Puligny village and Premier Cru from a historic family estate.', approxPrice: '£50–150' },
  ],

  'quarts-de-chaume': [
    { name: 'Château Pierre-Bise', note: 'Claude Papin\'s estate; exceptional Quarts de Chaume with electric acidity and decades of potential.', approxPrice: '£35–80' },
    { name: 'Domaine des Baumard', note: 'The most consistent Quarts de Chaume producer; their Réserve is a Loire sweet wine classic.', approxPrice: '£40–90' },
    { name: 'Château Bellerive', note: 'Fine, complex Quarts de Chaume Grand Cru from biodynamically farmed Chenin Blanc.', approxPrice: '£30–70' },
  ],

  'quincy': [
    { name: 'Domaine Mardon', note: 'The benchmark Quincy producer; precise, mineral Sauvignon Blanc from gravelly alluvial soils.', approxPrice: '£14–22' },
    { name: 'Domaine Jaquinot', note: 'Consistent, well-made Quincy; a great-value alternative to Sancerre with pure varietal character.', approxPrice: '£14–22' },
    { name: 'Domaine de Villargeau', note: 'Fine, aromatic Quincy from organically farmed vineyards; grapefruit and flinty minerality.', approxPrice: '£14–22' },
  ],

  'rasteau-rouge': [
    { name: 'Domaine des Escaravailles', note: 'The finest Rasteau estate; old-vine Grenache of extraordinary depth and garrigue character.', approxPrice: '£18–35' },
    { name: 'Domaine Rabasse Charavin', note: 'Reliable, well-structured Rasteau rouge from organic farming; great value for the quality level.', approxPrice: '£16–28' },
    { name: 'Château Signac', note: 'Consistent, structured Rasteau from limestone terroir; their Combe d\'Enfer is especially fine.', approxPrice: '£16–28' },
  ],

  'roussette-de-savoie': [
    { name: 'Domaine Dupasquier', note: 'Reference Roussette producer; mineral, age-worthy Altesse of rare precision from Jongieux.', approxPrice: '£16–28' },
    { name: 'Louis Magnin', note: 'Outstanding Roussette from Arbin; structured, complex Altesse with real depth and finesse.', approxPrice: '£18–32' },
    { name: 'Domaine André et Michel Quenard', note: 'Consistent Roussette from Chignin; vibrant, floral, and food-friendly with mineral freshness.', approxPrice: '£14–24' },
  ],

  'rully-blanc': [
    { name: 'Domaine Jacqueson', note: 'Outstanding Rully blanc from organically farmed vineyards; elegant and precise at fair prices.', approxPrice: '£18–35' },
    { name: 'Domaine de Villaine', note: 'Excellent white Rully from the team behind Romanée-Conti; impeccable quality and value.', approxPrice: '£20–35' },
    { name: 'Domaine du Prieuré', note: 'Reliable, mineral Rully blanc at accessible prices; good Premier Cru offerings too.', approxPrice: '£16–28' },
  ],

  'saint-aubin': [
    { name: 'Domaine Hubert Lamy', note: 'Outstanding Saint-Aubin producer; their single-parcel whites rival far more expensive Côte de Beaune.', approxPrice: '£30–65' },
    { name: 'Marc Colin', note: 'Fine, mineral Saint-Aubin blanc and rouge; En Remilly is their standout Premier Cru site.', approxPrice: '£28–55' },
    { name: 'Domaine Larue', note: 'Consistent, well-priced Saint-Aubin across multiple Premier Crus; excellent Burgundy value.', approxPrice: '£22–45' },
  ],

  'saint-chinian': [
    { name: 'Domaine Canet-Valette', note: 'Benchmark estate; their Une et Mille Nuits is one of Languedoc\'s most complex and profound reds.', approxPrice: '£20–45' },
    { name: 'Domaine Borie la Vitarèle', note: 'Biodynamic estate with exceptional terroir; Les Crès is their flagship structured Saint-Chinian.', approxPrice: '£18–35' },
    { name: 'Mas Champart', note: 'Outstanding Saint-Chinian from schist soils; Clos de la Simonette is dense and age-worthy.', approxPrice: '£18–35' },
  ],

  'saint-emilion': [
    { name: 'Château Ausone', note: 'Premier Grand Cru Classé A; a tiny but legendary estate producing profound, long-lived Merlot.', approxPrice: '£400–2000' },
    { name: 'Château Cheval Blanc', note: 'Premier Grand Cru Classé A; unique Cabernet Franc dominant blend of extraordinary elegance.', approxPrice: '£350–1800' },
    { name: 'Château Pavie', note: 'Premier Grand Cru Classé A; powerful, controversial style with great concentration and longevity.', approxPrice: '£120–500' },
  ],

  'saint-estephe': [
    { name: 'Château Cos d\'Estournel', note: 'The finest Saint-Estèphe; structured, age-worthy claret with distinctive Oriental label and flavours.', approxPrice: '£90–350' },
    { name: 'Château Montrose', note: 'Powerful, tannic Saint-Estèphe built for very long ageing; a great traditional Médoc estate.', approxPrice: '£70–200' },
    { name: 'Château Calon-Ségur', note: 'Classically structured Saint-Estèphe with the famous heart on the label; reliable and age-worthy.', approxPrice: '£55–130' },
  ],

  'saint-joseph-blanc': [
    { name: 'Jean-Louis Chave', note: 'Their St-Joseph Blanc is one of the Northern Rhône\'s finest whites; pure Marsanne of great purity.', approxPrice: '£55–100' },
    { name: 'Pierre Gonon', note: 'Outstanding natural white St-Joseph; their Marsanne is rich, textured, and impressively long-lived.', approxPrice: '£35–65' },
    { name: 'Domaine André Perret', note: 'Top-quality St-Joseph Blanc from Roussanne and Marsanne; Coteau de Chéry is their standout.', approxPrice: '£28–55' },
  ],

  'saint-joseph-rouge': [
    { name: 'Pierre Gonon', note: 'The natural wine benchmark for Saint-Joseph; old-vine Syrah of remarkable purity and mineral precision.', approxPrice: '£35–70' },
    { name: 'Jean-Louis Chave', note: 'Their Saint-Joseph rouge is a byword for Northern Rhône quality; concentrated and age-worthy.', approxPrice: '£50–100' },
    { name: 'Domaine Louis Chèze', note: 'Excellent Saint-Joseph rouge from granite terroir; Ro-Rée and Prestige de Caroline are both fine.', approxPrice: '£22–40' },
  ],

  'saint-julien': [
    { name: 'Château Léoville-Las Cases', note: 'The finest Saint-Julien and arguably a First Growth in all but name; structured and age-worthy.', approxPrice: '£100–400' },
    { name: 'Château Ducru-Beaucaillou', note: 'One of the Médoc\'s most elegant wines; pure, mineral Saint-Julien of extraordinary finesse.', approxPrice: '£90–280' },
    { name: 'Château Talbot', note: 'Reliable Fourth Growth; consistently excellent Saint-Julien at more accessible prices.', approxPrice: '£45–90' },
  ],

  'saint-nicolas-de-bourgueil': [
    { name: 'Domaine de la Cotelleraie', note: 'Outstanding SNDB producer; tuffeau-rooted Cabernet Franc of genuine mineral precision.', approxPrice: '£16–30' },
    { name: 'Frédéric Mabileau', note: 'Biodynamic estate making exceptional Saint-Nicolas; Les Rouillères is their finest cuvée.', approxPrice: '£18–32' },
    { name: 'Domaine Taluau', note: 'Classic SNDB from sandy-gravel soils; vibrant, fresh Cabernet Franc at very fair prices.', approxPrice: '£14–25' },
  ],

  'saint-peray': [
    { name: 'Domaine Clape', note: 'Auguste Clape also makes outstanding Saint-Péray; one of the finest expressions of still Marsanne.', approxPrice: '£35–65' },
    { name: 'Domaine Alain Voge', note: 'Outstanding Saint-Péray in still and sparkling form; Fleur de Crussol still is a benchmark.', approxPrice: '£25–50' },
    { name: 'Domaine Lionnet', note: 'Excellent Saint-Péray from granitic soils; their Pur Granit is structured and age-worthy.', approxPrice: '£22–40' },
  ],

  'saint-veran': [
    { name: 'Domaine des Deux Roches', note: 'Consistent, well-priced Saint-Véran; one of the most reliable producers in the appellation.', approxPrice: '£16–25' },
    { name: 'Verget', note: 'Jean-Marie Guffens\'s négociant produces excellent Saint-Véran at various quality levels.', approxPrice: '£16–28' },
    { name: 'Domaine Corsin', note: 'Fine, mineral Saint-Véran from limestone soils; excellent alternative to basic Pouilly-Fuissé.', approxPrice: '£15–24' },
  ],

  'sancerre': [
    { name: 'Henri Bourgeois', note: 'Outstanding across the Sancerre range; their En Grands Champs and La Bourgeoise are exceptional.', approxPrice: '£20–65' },
    { name: 'Domaine Vacheron', note: 'Biodynamic Sancerre of great purity; their single-vineyard Les Romains is a mineral benchmark.', approxPrice: '£25–65' },
    { name: 'Domaine Henri Natter', note: 'Consistent, reliable Sancerre at accessible prices; their François de la Grange is very fine.', approxPrice: '£20–35' },
  ],

  'sancerre-rouge': [
    { name: 'Domaine Vacheron', note: 'The benchmark red Sancerre; biodynamic Pinot Noir of remarkable depth and Burgundian character.', approxPrice: '£28–60' },
    { name: 'Henri Bourgeois', note: 'Fine red Sancerre from excellent vineyard sites; more structured than most Loire Pinot.', approxPrice: '£25–50' },
    { name: 'Domaine Lucien Crochet', note: 'Elegant, floral red Sancerre; their Prestige rouge is consistently impressive.', approxPrice: '£25–45' },
  ],

  'santenay': [
    { name: 'Domaine du Château de Santenay', note: 'Large, reliable Santenay estate; good Premier Crus at fair prices for the Côte de Beaune.', approxPrice: '£18–35' },
    { name: 'Domaine Mestre', note: 'Classic Santenay rouge with firm tannins and mineral precision; excellent value in Burgundy.', approxPrice: '£20–38' },
    { name: 'Lucien Muzard', note: 'Consistent, well-made Santenay from organically farmed vineyards; Clos Rousseau is fine.', approxPrice: '£18–32' },
  ],

  'saumur-blanc': [
    { name: 'Domaine du Collier', note: 'Antoine Foucault\'s estate; one of the Loire\'s greatest whites — mineral, austere, and long-lived.', approxPrice: '£25–55' },
    { name: 'Château de Villeneuve', note: 'Outstanding Saumur Blanc from tuffeau and clay; their Grand Clos is a benchmark.', approxPrice: '£18–35' },
    { name: 'Domaine Guiberteau', note: 'Exceptional Saumur Blanc; their Les Arboises is a mineral masterpiece from old Chenin Blanc.', approxPrice: '£20–45' },
  ],

  'saumur-champigny': [
    { name: 'Domaine des Roches Neuves', note: 'Outstanding Saumur-Champigny; their L\'Insolite and Marginale are among Loire\'s greatest reds.', approxPrice: '£22–60' },
    { name: 'Domaine Guiberteau', note: 'Exceptional quality from tuffeau terroir; their Brézé Saumur-Champigny is remarkably age-worthy.', approxPrice: '£22–50' },
    { name: 'Château Yvonne', note: 'Natural wine pioneer; vibrant, mineral Saumur-Champigny of genuine depth and elegance.', approxPrice: '£18–35' },
  ],

  'sauternes': [
    { name: 'Château d\'Yquem', note: 'The greatest dessert wine on earth; a Premier Cru Supérieur of incomparable complexity and immortality.', approxPrice: '£200–1500' },
    { name: 'Château Rieussec', note: 'Consistently outstanding First Growth; luscious, complex Sauternes with excellent ageing potential.', approxPrice: '£45–150' },
    { name: 'Château Guiraud', note: 'Organic First Growth; rich, complex Sauternes with botrytis honey and citrus peel character.', approxPrice: '£40–120' },
  ],

  'savennieres': [
    { name: 'Domaine des Baumard', note: 'Clos du Papillon is their benchmark; the finest dry Savennières with mineral precision and longevity.', approxPrice: '£22–45' },
    { name: 'Nicolas Joly', note: 'Biodynamic pioneer; Coulée de Serrant is one of France\'s most distinctive and controversial whites.', approxPrice: '£45–120' },
    { name: 'Domaine du Closel', note: 'Excellent Savennières from volcanic and schist soils; La Jalousie is their standout Premier Cru.', approxPrice: '£20–40' },
  ],

  'savigny-les-beaune': [
    { name: 'Domaine Simon Bize', note: 'Outstanding Savigny estate; single-parcel wines of real elegance and genuine Burgundian depth.', approxPrice: '£28–55' },
    { name: 'Domaine Chandon de Briailles', note: 'Biodynamic estate; their Savigny aux Fourneaux and Lavières are consistently excellent.', approxPrice: '£25–50' },
    { name: 'Domaine Tollot-Beaut', note: 'Reliable, well-priced Savigny with good Premier Cru offerings; Champ-Chevrey is especially fine.', approxPrice: '£22–42' },
  ],

  'savoie-chignin-bergeron': [
    { name: 'Domaine Louis Magnin', note: 'The reference Chignin-Bergeron; old-vine Roussanne of extraordinary complexity and mineral depth.', approxPrice: '£22–40' },
    { name: 'Domaine André et Michel Quenard', note: 'Excellent Chignin-Bergeron from the family who helped define the style; textured and long.', approxPrice: '£18–32' },
    { name: 'Domaine Gilles Berlioz', note: 'Outstanding Roussanne from steep Chignin slopes; their Bagatelle is their finest expression.', approxPrice: '£20–38' },
  ],

  'savoie-jacquere': [
    { name: 'Domaine Belluard', note: 'Master of Savoie whites; their Jacquère has a precision and energy that elevates the variety.', approxPrice: '£14–22' },
    { name: 'Domaine André et Michel Quenard', note: 'Reliable, consistent Jacquère with characteristic Alpine freshness; excellent everyday drinking.', approxPrice: '£12–18' },
    { name: 'Domaine de Rouzan', note: 'Fine Apremont Jacquère with good citrus definition and mineral character from limestone soils.', approxPrice: '£12–18' },
  ],

  'savoie-mondeuse': [
    { name: 'Domaine Louis Magnin', note: 'The finest Mondeuse producer; their old-vine Arbin is a concentrated, age-worthy masterpiece.', approxPrice: '£20–40' },
    { name: 'Domaine Belluard', note: 'Exceptional Mondeuse from volcanic soils; structured, spicy, and among the region\'s finest reds.', approxPrice: '£22–40' },
    { name: 'Michel Grisard', note: 'Biodynamic farming; elegant, perfumed Mondeuse that shows the grape\'s true potential.', approxPrice: '£18–32' },
  ],

  'tavel-rose': [
    { name: 'Château d\'Aqueria', note: 'The benchmark Tavel; full-bodied, structured rosé with Grenache depth and garrigue character.', approxPrice: '£14–22' },
    { name: 'Domaine de la Mordorée', note: 'Outstanding Tavel from organic farming; their La Reine des Bois is complex and food-worthy.', approxPrice: '£18–28' },
    { name: 'Domaine Maby', note: 'Consistent, generous Tavel; among the most reliable producers in this Rhône rosé appellation.', approxPrice: '£14–22' },
  ],

  'terrasses-du-larzac': [
    { name: 'Mas Jullien', note: 'Olivier Jullien\'s iconic estate; their Autour de Jonquières is one of Languedoc\'s greatest reds.', approxPrice: '£28–55' },
    { name: 'Domaine de Montcalmès', note: 'Frederic Pourtalier\'s estate; benchmark Terrasses du Larzac with impressive concentration.', approxPrice: '£25–45' },
    { name: 'Château la Peyrade', note: 'Excellent high-altitude Terrasses with cooling influence; elegant, mineral, and age-worthy.', approxPrice: '£18–32' },
  ],

  'vacqueyras': [
    { name: 'Domaine le Sang des Cailloux', note: 'The Vacqueyras benchmark; Serge Férigoule\'s organic wines are complex and deeply characterful.', approxPrice: '£20–38' },
    { name: 'Domaine des Amouriers', note: 'Outstanding Vacqueyras from old Grenache; their Signature is consistently among the best in the AC.', approxPrice: '£18–32' },
    { name: 'Château des Tours', note: 'Emmanuel Reynaud\'s estate; classic, terroir-driven Vacqueyras from a Châteauneuf pedigree producer.', approxPrice: '£22–40' },
  ],

  'vin-jaune': [
    { name: 'Domaine Macle', note: 'The definitive Vin Jaune from Château-Chalon; walnut, curry, and immortal oxidative complexity.', approxPrice: '£45–100' },
    { name: 'Domaine Ganevat', note: 'Biodynamic Vin Jaune of extraordinary concentration and depth; rarely available outside France.', approxPrice: '£55–120' },
    { name: 'Domaine André et Mireille Tissot', note: 'Excellent Vin Jaune from Arbois; precise and complex with characteristic Jura oxidative character.', approxPrice: '£40–80' },
  ],

  'viognier': [
    { name: 'Domaine Georges Vernay', note: 'Condrieu pioneer; their Coteau de Vernon is one of the world\'s greatest Viogniers.', approxPrice: '£55–150' },
    { name: 'Domaine Yves Cuilleron', note: 'Outstanding across all Condrieu cuvées; La Petite Côte is an excellent entry-level Viognier.', approxPrice: '£35–90' },
    { name: 'Pierre Gaillard', note: 'Fine Condrieu from granitic soils; floral, rich, and elegant with superb aromatic intensity.', approxPrice: '£35–75' },
  ],

  'vire-clesse': [
    { name: 'Domaine de la Bongran', note: 'Jean Thévenet\'s estate; rich, full-bodied Viré-Clessé with sometimes botrytised character.', approxPrice: '£18–35' },
    { name: 'André Bonhomme', note: 'Classic Viré-Clessé from well-farmed old vines; textured, mineral Mâconnais Chardonnay.', approxPrice: '£16–28' },
    { name: 'Domaine de Roally', note: 'Excellent Viré-Clessé from Henri Goyard; traditional winemaking giving wines of real character.', approxPrice: '£16–28' },
  ],

  'volnay': [
    { name: 'Domaine de la Pousse d\'Or', note: 'Top Volnay specialist; their Caillerets and En Caillerets monopole are defining wines of the AC.', approxPrice: '£55–150' },
    { name: 'Domaine Marquis d\'Angerville', note: 'Historic estate; their Clos des Ducs monopole is Volnay at its most aristocratic and elegant.', approxPrice: '£80–250' },
    { name: 'Domaine Michel Lafarge', note: 'Biodynamic estate; classic, fragrant Volnay from one of the appellation\'s oldest families.', approxPrice: '£55–130' },
  ],

  'vosne-romanee': [
    { name: 'Domaine de la Romanée-Conti', note: 'The pinnacle of Burgundy; even their Vosne village wine is extraordinary in quality and price.', approxPrice: '£300–1500' },
    { name: 'Domaine Méo-Camuzet', note: 'Outstanding Vosne across multiple Premier Crus; Aux Brûlées is their most coveted site.', approxPrice: '£100–350' },
    { name: 'Domaine Sylvain Cathiard', note: 'Small, perfectionist estate; their Vosne village and premier crus are among Burgundy\'s finest.', approxPrice: '£120–400' },
  ],

  'vouvray-demi-sec': [
    { name: 'Domaine Huet', note: 'The definitive Vouvray estate; their demi-sec Le Haut-Lieu is a perfect example of balance.', approxPrice: '£22–45' },
    { name: 'Domaine François Pinon', note: 'Natural, biodynamic Vouvray demi-sec; genuine freshness balances the residual sweetness.', approxPrice: '£18–35' },
    { name: 'Domaine de la Taille aux Loups', note: 'Jacky Blot\'s outstanding demi-sec with precise acidity keeping the sweetness in check.', approxPrice: '£18–38' },
  ],

  'vouvray-sec': [
    { name: 'Domaine Huet', note: 'Their Le Mont sec is a benchmark; austere, mineral Chenin Blanc demanding patience and rewarding it.', approxPrice: '£22–45' },
    { name: 'Philippe Foreau (Clos Naudin)', note: 'Exceptional dry Vouvray with mineral precision and extraordinary ageing potential.', approxPrice: '£22–45' },
    { name: 'Domaine des Aubuisières', note: 'Bernard Fouquet\'s estate; reliable, well-made Vouvray sec at accessible prices.', approxPrice: '£16–28' },
  ],

// ── ITALY ──

  'barolo-serralunga': [
    { name: 'Giacomo Conterno', note: 'The benchmark for traditional Serralunga Barolo; Monfortino is one of the world\'s greatest wines.', approxPrice: '£80–500' },
    { name: 'Giovanni Rosso', note: 'Outstanding Serralunga specialist; their Cerretta is a precise, site-faithful expression.', approxPrice: '£35–90' },
    { name: 'Cappellano', note: 'Ultra-traditional, unfined, unfiltered Barolo of remarkable purity and terroir expression.', approxPrice: '£80–200' },
  ],

  'barolo-la-morra': [
    { name: 'Elio Altare', note: 'Pioneer of modern Barolo; their La Morra wines are silky, perfumed, and approachable early.', approxPrice: '£55–130' },
    { name: 'Roberto Voerzio', note: 'Tiny yields, immaculate winemaking; among La Morra\'s most sought-after and expensive Barolos.', approxPrice: '£100–400' },
    { name: 'Renato Ratti', note: 'Historic estate founded by the man who mapped the Barolo crus; reliable benchmark quality.', approxPrice: '£35–65' },
  ],

  'barolo-castiglione': [
    { name: 'Paolo Scavino', note: 'Modern style with great precision; their Bricco Ambrogio from Castiglione is consistently excellent.', approxPrice: '£45–100' },
    { name: 'Vietti', note: 'Traditional estate with exceptional vineyard holdings; Castiglione is their approachable flagship.', approxPrice: '£35–80' },
    { name: 'Brovia', note: 'Family estate with deep roots in Castiglione; traditional, tannic wines built for long ageing.', approxPrice: '£40–85' },
  ],

  'barbaresco-barbaresco': [
    { name: 'Gaja', note: 'The name that put Barbaresco on the world map; powerful, concentrated, and immensely age-worthy.', approxPrice: '£120–500' },
    { name: 'Produttori del Barbaresco', note: 'The cooperative that defines Barbaresco value; single-vineyard Riservas offer extraordinary QPR.', approxPrice: '£25–60' },
    { name: 'Bruno Giacosa', note: 'Legendary traditional producer; the red-label Riserva is among Italy\'s most collectible wines.', approxPrice: '£80–300' },
  ],

  'barbaresco-neive': [
    { name: 'Bruno Giacosa', note: 'Their Santo Stefano di Neive is a benchmark; structured, complex, and exceptionally age-worthy.', approxPrice: '£80–300' },
    { name: 'Ca\' del Baio', note: 'Family estate in Neive specialising in single-vineyard Barbarescos of great finesse and precision.', approxPrice: '£30–60' },
    { name: 'Castello di Neive', note: 'Historic estate with fine Neive Barbarescos; Santo Stefano is their most celebrated cru.', approxPrice: '£30–55' },
  ],

  'barbera-dasti': [
    { name: 'Braida', note: 'The estate that transformed Barbera d\'Asti; Bricco dell\'Uccellone was the first barrique-aged Barbera.', approxPrice: '£20–50' },
    { name: 'Michele Chiarlo', note: 'Outstanding Barbera d\'Asti Superiore; Nizza La Court is their flagship, rich and structured.', approxPrice: '£18–45' },
    { name: 'Prunotto', note: 'Reliable Barbera d\'Asti from a classic Piedmontese house; their Fiulot is excellent value.', approxPrice: '£16–30' },
  ],

  'barbera-dalba': [
    { name: 'Giacomo Conterno', note: 'Their Francia Barbera d\'Alba is made with Barolo-level seriousness — rich, complex, age-worthy.', approxPrice: '£45–90' },
    { name: 'Elio Altare', note: 'Silky, modern-style Barbera d\'Alba with impeccable balance and ripe fruit.', approxPrice: '£25–45' },
    { name: 'Vietti', note: 'Consistently excellent Barbera d\'Alba; the Tre Vigne offers great everyday drinking.', approxPrice: '£18–35' },
  ],

  'dolcetto-dalba': [
    { name: 'Bruno Giacosa', note: 'Benchmark Dolcetto d\'Alba; structured and bitter-cherry-driven with excellent ageing potential.', approxPrice: '£20–35' },
    { name: 'Elio Altare', note: 'Silky, modern Dolcetto with bright fruit and perfect tannin integration.', approxPrice: '£20–32' },
    { name: 'Pecchenino', note: 'One of Dogliani\'s best producers; their San Luigi Dolcetto is a fine example of the variety.', approxPrice: '£18–28' },
  ],

  'gavi': [
    { name: 'La Scolca', note: 'The historic benchmark for Gavi; their Black Label is a reference for the appellation.', approxPrice: '£18–35' },
    { name: 'Broglia', note: 'Fine Gavi producer with estate-grown Cortese; the La Meirana is crisp and mineral.', approxPrice: '£16–28' },
    { name: 'Villa Sparina', note: 'Top-quality Gavi di Gavi with impressive depth; one of the most consistent producers.', approxPrice: '£18–32' },
  ],

  'roero-arneis': [
    { name: 'Bruno Giacosa', note: 'Their Arneis is the Roero benchmark — delicate, floral, and beautifully precise.', approxPrice: '£18–30' },
    { name: 'Vietti', note: 'Reliable Arneis from Castiglione Falletto; aromatic, crisp, and consistently well-made.', approxPrice: '£16–28' },
    { name: 'Matteo Correggia', note: 'Roero specialist making outstanding Arneis with real depth and aromatic complexity.', approxPrice: '£18–30' },
  ],

  'moscato-dasti': [
    { name: 'Saracco', note: 'The reference producer for Moscato d\'Asti; delicate, low-alcohol, and impeccably fresh.', approxPrice: '£14–22' },
    { name: 'La Spinetta', note: 'Widely available and consistently excellent; their Bricco Quaglia is a superb example.', approxPrice: '£16–25' },
    { name: 'Vietti', note: 'Fine Moscato d\'Asti with typical Piedmontese precision; perfectly balanced sweetness and acidity.', approxPrice: '£14–22' },
  ],

  'timorasso-derthona': [
    { name: 'Walter Massa', note: 'The man who rescued Timorasso from extinction; his Derthona is the benchmark for the variety.', approxPrice: '£25–55' },
    { name: 'La Colombera', note: 'Outstanding Timorasso with mineral precision and excellent ageing potential.', approxPrice: '£22–45' },
    { name: 'Vigneti Massa', note: 'Walter Massa\'s estate continues to set the standard; Il Montino is their most complex cuvée.', approxPrice: '£28–60' },
  ],

  'chianti-classico': [
    { name: 'Antinori (Pèppoli)', note: 'From one of Tuscany\'s great families; accessible, well-made Chianti Classico for everyday drinking.', approxPrice: '£18–30' },
    { name: 'Isole e Olena', note: 'Benchmark estate in the central Classico zone; precise, elegant Sangiovese with real depth.', approxPrice: '£20–35' },
    { name: 'Riecine', note: 'Boutique estate in Gaiole making refined, old-vine Chianti Classico of impressive quality.', approxPrice: '£22–38' },
  ],

  'chianti-classico-riserva': [
    { name: 'Castello di Ama', note: 'Benchmark Riserva from Gaiole; their San Lorenzo is a Classico icon of elegance and precision.', approxPrice: '£35–70' },
    { name: 'Fèlsina', note: 'Historic estate in Castelnuovo Berardenga; Rancia Riserva is among the appellation\'s finest.', approxPrice: '£30–60' },
    { name: 'Fontodi', note: 'Panzano powerhouse; their Riserva is structured, complex, and consistently excellent.', approxPrice: '£35–65' },
  ],

  'chianti-classico-gran-selezione': [
    { name: 'Castello di Brolio (Barone Ricasoli)', note: 'The estate that created Chianti Classico; their Colledilà Gran Selezione is exceptional.', approxPrice: '£55–100' },
    { name: 'Fontodi', note: 'Their Vigna del Sorbo Gran Selezione is a Panzano landmark; structured, age-worthy, magnificent.', approxPrice: '£60–120' },
    { name: 'Castello di Ama', note: 'L\'Apparita is their flagship; profound single-vineyard Gran Selezione of international standing.', approxPrice: '£80–200' },
  ],

  'chianti-classico-gaiole': [
    { name: 'Badia a Coltibuono', note: 'Historic abbey estate in Gaiole; elegant, terroir-driven Sangiovese with herbal complexity.', approxPrice: '£20–45' },
    { name: 'Castello di Ama', note: 'Defines Gaiole\'s cooler, more structured style; their wines demand and reward patience.', approxPrice: '£35–120' },
    { name: 'Riecine', note: 'Biodynamic estate in Gaiole making some of the most elegant and mineral Chianti Classico.', approxPrice: '£22–55' },
  ],

  'chianti-classico-panzano': [
    { name: 'Fontodi', note: 'The undisputed Panzano benchmark; Vigna del Sorbo is a world-class Sangiovese from the golden amphitheatre.', approxPrice: '£35–120' },
    { name: 'Montevertine', note: 'Iconic Panzano estate; Le Pergole Torte is a legendary 100% Sangiovese outside DOC rules.', approxPrice: '£50–150' },
    { name: 'Il Molino di Grace', note: 'Reliable, well-structured Panzano Chianti Classico with good concentration and freshness.', approxPrice: '£20–40' },
  ],

  'brunello-di-montalcino': [
    { name: 'Biondi Santi', note: 'The founding estate of Brunello; their Riserva is one of Italy\'s most collectible wines.', approxPrice: '£120–800' },
    { name: 'Poggio di Sotto', note: 'Benchmark traditional Brunello of extraordinary finesse; patience required, reward guaranteed.', approxPrice: '£80–300' },
    { name: 'Canalicchio di Sopra', note: 'Outstanding traditional producer in the northern zone; elegant, long-lived Brunellos of great purity.', approxPrice: '£55–120' },
  ],

  'rosso-di-montalcino': [
    { name: 'Poggio di Sotto', note: 'Their Rosso is a rare treat — essence of Montalcino at a more accessible price.', approxPrice: '£30–55' },
    { name: 'Col d\'Orcia', note: 'Consistently excellent Rosso from a large, reliable Montalcino estate; great everyday value.', approxPrice: '£20–35' },
    { name: 'Altesino', note: 'Fine Rosso di Montalcino with good structure; excellent entry-point to the estate\'s style.', approxPrice: '£20–32' },
  ],

  'vino-nobile-montepulciano': [
    { name: 'Avignonesi', note: 'The most celebrated estate in Montepulciano; their Vino Nobile is elegant and age-worthy.', approxPrice: '£25–55' },
    { name: 'Poliziano', note: 'Top producer in the appellation; Asinone Riserva is their flagship and a consistent high-scorer.', approxPrice: '£22–50' },
    { name: 'Boscarelli', note: 'Boutique estate with biodynamic farming; refined, complex Vino Nobile with great terroir expression.', approxPrice: '£25–55' },
  ],

  'bolgheri-sassicaia': [
    { name: 'Tenuta San Guido', note: 'Sassicaia IS the appellation — this is the original Super Tuscan Cabernet, still the gold standard.', approxPrice: '£150–400' },
    { name: 'Ornellaia', note: 'Outstanding Bolgheri estate; Masseto (Merlot) and Ornellaia itself rival the best in the world.', approxPrice: '£120–500' },
    { name: 'Grattamacco', note: 'Smaller Bolgheri estate making fine, restrained Cabernet-led blends with excellent ageing potential.', approxPrice: '£45–90' },
  ],

  'bolgheri-rosso': [
    { name: 'Le Macchiole', note: 'Outstanding boutique estate; Bolgheri Rosso is their accessible entry-point to excellent Super Tuscan style.', approxPrice: '£25–50' },
    { name: 'Michele Satta', note: 'Reliable, well-made Bolgheri Rosso from one of the appellation\'s pioneering independent estates.', approxPrice: '£20–35' },
    { name: 'Podere Sapaio', note: 'Boutique Bolgheri estate making concentrated, modern-style reds of impressive quality.', approxPrice: '£28–55' },
  ],

  'morellino-di-scansano': [
    { name: 'Erik Banti', note: 'Pioneer of Morellino; their Ciabatta is the benchmark for the appellation\'s best expression.', approxPrice: '£16–30' },
    { name: 'Moris Farms', note: 'Top Morellino producer; Avvoltore is their flagship, a powerful blend of Sangiovese and Cabernet.', approxPrice: '£18–45' },
    { name: 'Poggio Argentiera', note: 'Outstanding biodynamic estate; Capatosta Riserva is among the finest Morellino available.', approxPrice: '£20–40' },
  ],

  'vernaccia-san-gimignano': [
    { name: 'Teruzzi', note: 'The estate that modernised Vernaccia; their Terre di Tufo is crisp, mineral, and widely available.', approxPrice: '£14–25' },
    { name: 'Montenidoli', note: 'Biodynamic estate making some of San Gimignano\'s most complex and age-worthy Vernaccia.', approxPrice: '£16–30' },
    { name: 'Il Colombaio di Santa Chiara', note: 'Fine, precise Vernaccia from organically farmed vineyards; consistently excellent QPR.', approxPrice: '£14–22' },
  ],

  'amarone-della-valpolicella': [
    { name: 'Allegrini', note: 'Benchmark modern Amarone producer; powerful, concentrated, and accessible earlier than traditionalists.', approxPrice: '£55–130' },
    { name: 'Dal Forno Romano', note: 'Cult producer making intensely concentrated, extracted Amarone requiring decades of ageing.', approxPrice: '£200–600' },
    { name: 'Tommasi', note: 'Reliable family estate with excellent Amarone at accessible prices; consistently well-made.', approxPrice: '£35–80' },
  ],

  'valpolicella-ripasso': [
    { name: 'Allegrini', note: 'Their Palazzo della Torre is a benchmark Ripasso — rich, complex, and great value for quality.', approxPrice: '£18–35' },
    { name: 'Zenato', note: 'Consistently excellent Ripasso with plush fruit and impressive structure at accessible prices.', approxPrice: '£16–30' },
    { name: 'Tommasi', note: 'Reliable Ripasso from a top family estate; the Rafael Valpolicella Ripasso is a fine example.', approxPrice: '£18–32' },
  ],

  'valpolicella-classico': [
    { name: 'Allegrini', note: 'Their Classico is benchmark everyday Valpolicella — bright, cherry-scented, and food-friendly.', approxPrice: '£14–22' },
    { name: 'Masi', note: 'Historic Valpolicella producer; Bonacosta Classico is reliable and widely available.', approxPrice: '£12–20' },
    { name: 'Brigaldara', note: 'Boutique Classico estate with biodynamic farming; excellent terroir-driven Valpolicella.', approxPrice: '£16–28' },
  ],

  'soave-classico': [
    { name: 'Pieropan', note: 'The defining estate for Soave Classico; their La Rocca and Calvarino are benchmark single-vineyard wines.', approxPrice: '£18–45' },
    { name: 'Gini', note: 'Outstanding family estate; La Froscà is a profound Soave Classico with volcanic mineral character.', approxPrice: '£20–40' },
    { name: 'Inama', note: 'Fine Soave Classico with good concentration; their Vigneto du Lot is a consistent high-performer.', approxPrice: '£18–35' },
  ],

  'lugana': [
    { name: 'Ca\' dei Frati', note: 'The benchmark Lugana producer; their I Frati is a textbook example of the variety\'s citrus-mineral character.', approxPrice: '£16–28' },
    { name: 'Zenato', note: 'Excellent, widely available Lugana; the Sergio Zenato Riserva is their flagship and worth seeking.', approxPrice: '£18–35' },
    { name: 'Cà Maiol', note: 'Reliable Lugana specialist on the southern shore of Lake Garda; crisp, aromatic, and well-priced.', approxPrice: '£14–24' },
  ],

  'prosecco-valdobbiadene': [
    { name: 'Bisol', note: 'One of Valdobbiadene\'s most respected houses; their Cartizze is a benchmark for the appellation\'s finest.', approxPrice: '£18–45' },
    { name: 'Ruggeri', note: 'Outstanding Prosecco Superiore with consistent quality; Giustino B. is their flagship single-vineyard.', approxPrice: '£16–35' },
    { name: 'Nino Franco', note: 'Rustico is widely available and reliable; Primo Franco is their prestige cuvée.', approxPrice: '£14–35' },
  ],

  'recioto-della-valpolicella': [
    { name: 'Dal Forno Romano', note: 'Intensely concentrated, rare Recioto; a landmark sweet wine of extraordinary complexity.', approxPrice: '£120–300' },
    { name: 'Allegrini', note: 'Outstanding Recioto with bright acidity balancing the sweetness; plush cherry and chocolate.', approxPrice: '£30–60' },
    { name: 'Quintarelli', note: 'Legendary traditional producer; their Recioto is among Italy\'s greatest sweet wines.', approxPrice: '£80–200' },
  ],

  'franciacorta-blanc-de-blancs': [
    { name: 'Ca\' del Bosco', note: 'The prestige Franciacorta house; their Blanc de Blancs is precise, creamy, and complex.', approxPrice: '£30–70' },
    { name: 'Berlucchi', note: 'Pioneering Franciacorta estate; their Blanc de Blancs offers excellent quality at accessible prices.', approxPrice: '£22–45' },
    { name: 'Bellavista', note: 'Premium Franciacorta producer; their Pas Operé is an outstanding non-dosage expression.', approxPrice: '£30–65' },
  ],

  'valtellina-superiore': [
    { name: 'Nino Negri', note: 'The most recognised Valtellina producer; 5 Stelle Sfursat is their flagship mountain Nebbiolo.', approxPrice: '£20–55' },
    { name: 'Ar.Pe.Pe.', note: 'Traditional family estate making age-worthy, mineral Nebbiolo from the Sassella and Grumello crus.', approxPrice: '£30–70' },
    { name: 'Rainoldi', note: 'Fine Valtellina Superiore from multiple crus; elegant, restrained mountain Nebbiolo at fair prices.', approxPrice: '£22–45' },
  ],

  'alto-adige-gewurztraminer': [
    { name: 'Tramin (Cantina Tramin)', note: 'The benchmark cooperative for Alto Adige Gewürztraminer; Nussbaumer is their flagship single-vineyard.', approxPrice: '£18–45' },
    { name: 'Elena Walch', note: 'Outstanding family producer; their Gewürztraminer is perfumed, precise, and beautifully balanced.', approxPrice: '£18–35' },
    { name: 'Tiefenbrunner', note: 'Reliable Alto Adige producer; Feldmarschall is their prestige white, with excellent Gewürztraminer.', approxPrice: '£16–32' },
  ],

  'alto-adige-pinot-grigio': [
    { name: 'St. Michael-Eppan', note: 'Top cooperative wine; their Sanct Valentin Pinot Grigio is a benchmark for the variety in the region.', approxPrice: '£18–40' },
    { name: 'Elena Walch', note: 'Outstanding Pinot Grigio with real weight and mineral character; far above the generic Italian norm.', approxPrice: '£18–35' },
    { name: 'Colterenzio', note: 'Fine cooperative wine with excellent Pinot Grigio Cornell; precise, fresh, and food-friendly.', approxPrice: '£16–30' },
  ],

  'alto-adige-pinot-nero': [
    { name: 'Franz Haas', note: 'Outstanding Alto Adige Pinot Nero with Burgundian precision; Manna is their flagship white, Pinot Noir the star red.', approxPrice: '£28–60' },
    { name: 'Gottardi', note: 'Fine Pinot Nero from Mazon, a village renowned for the variety; elegant, perfumed, mountain-fresh.', approxPrice: '£25–50' },
    { name: 'Erste & Neue', note: 'Reliable cooperative wine; their Pinot Nero Puntay is a consistently well-made mountain expression.', approxPrice: '£20–40' },
  ],

  'trentino-teroldego': [
    { name: 'Foradori', note: 'The definitive Teroldego producer; Granato is one of Italy\'s great red wines — intense, mineral, age-worthy.', approxPrice: '£35–80' },
    { name: 'Mezzacorona', note: 'Large, reliable co-op producing accessible Teroldego Rotaliano; widely available and good value.', approxPrice: '£12–22' },
    { name: 'Dorigati', note: 'Traditional family estate making structured, age-worthy Teroldego; their Methius Riserva is outstanding.', approxPrice: '£20–40' },
  ],

  'collio-friulano': [
    { name: 'Schiopetto', note: 'The producer who modernised Friulano; their wines are precise, mineral, and benchmark for the variety.', approxPrice: '£20–40' },
    { name: 'Livio Felluga', note: 'Historic Collio estate with outstanding Friulano; Terre Alte is their prestige blended white.', approxPrice: '£22–50' },
    { name: 'Primosic', note: 'Fine biodynamic estate in Oslavia; their Friulano is textured, complex, and terroir-expressive.', approxPrice: '£20–38' },
  ],

  'friuli-ribolla-gialla': [
    { name: 'Radikon', note: 'Radical natural producer who popularised long-macerated Ribolla Gialla; complex, oxidative, unique.', approxPrice: '£35–80' },
    { name: 'Gravner', note: 'Legendary pioneer of amphora-aged Ribolla; their skin-contact wines are among Italy\'s most distinctive.', approxPrice: '£80–200' },
    { name: 'Damijan Podversic', note: 'Outstanding natural producer; skin-contact Ribolla of real depth and complexity.', approxPrice: '£30–65' },
  ],

  'friuli-orange-wine': [
    { name: 'Gravner', note: 'The godfather of Italian orange wine; Breg and Ribolla amphora wines are world-renowned masterpieces.', approxPrice: '£80–200' },
    { name: 'Radikon', note: 'Pioneering natural producer in Oslavia; their skin-contact whites are defining examples of the genre.', approxPrice: '£35–80' },
    { name: 'La Castellada', note: 'Traditional family estate making complex, mineral orange wines of exceptional purity.', approxPrice: '£30–65' },
  ],

  'lambrusco-di-sorbara': [
    { name: 'Cleto Chiarli', note: 'Historic Lambrusco house; their Vigneto Enrico Cialdini is the benchmark Sorbara, delicate and mineral.', approxPrice: '£12–22' },
    { name: 'Cavicchioli', note: 'Reliable Lambrusco di Sorbara; fresh, bright, and ideal for charcuterie and antipasti.', approxPrice: '£10–18' },
    { name: 'Paltrinieri', note: 'Outstanding small producer making some of Sorbara\'s finest wines; Leclisse is their top cuvée.', approxPrice: '£14–25' },
  ],

  'sangiovese-di-romagna': [
    { name: 'Drei Doná', note: 'Top Romagna estate; Il Tornese Riserva shows Sangiovese can achieve real depth and complexity here.', approxPrice: '£18–40' },
    { name: 'Fattoria Zerbina', note: 'Leading Romagna producer; their Pietramora Riserva is a structured, complex Sangiovese of note.', approxPrice: '£18–38' },
    { name: 'San Patrignano', note: 'Large, quality-focused winery run by a rehabilitation community; consistently reliable Romagna Sangiovese.', approxPrice: '£14–25' },
  ],

  'verdicchio-dei-castelli-di-jesi': [
    { name: 'Garofoli', note: 'The historic Verdicchio benchmark; Podium is their top wine — structured, mineral, and age-worthy.', approxPrice: '£16–35' },
    { name: 'Sartarelli', note: 'Outstanding single-vineyard Verdicchio; Balciana is one of the Marche\'s greatest white wines.', approxPrice: '£18–45' },
    { name: 'Umani Ronchi', note: 'Reliable large producer with excellent Verdicchio; Casal di Serra is a consistently well-made example.', approxPrice: '£14–25' },
  ],

  'montepulciano-dabruzzo': [
    { name: 'Emidio Pepe', note: 'Legendary traditional producer; their unfiltered Montepulciano d\'Abruzzo ages for decades.', approxPrice: '£45–150' },
    { name: 'Illuminati', note: 'Top Abruzzo estate; Zanna Riserva is a structured, complex expression at fair prices.', approxPrice: '£18–40' },
    { name: 'Masciarelli', note: 'Outstanding modern producer; Villa Gemma Riserva is their flagship — powerful and age-worthy.', approxPrice: '£20–55' },
  ],

  'sagrantino-di-montefalco': [
    { name: 'Caprai', note: 'The producer who put Sagrantino on the world map; their 25 Anni is a landmark Umbrian red.', approxPrice: '£45–120' },
    { name: 'Antano Milziade', note: 'Traditional small estate making structured, age-worthy Sagrantino with real terroir character.', approxPrice: '£30–65' },
    { name: 'Lungarotti', note: 'Major Umbrian producer with solid Sagrantino; accessible and reliable as a first encounter with the variety.', approxPrice: '£22–45' },
  ],

  'orvieto-classico': [
    { name: 'Barberani', note: 'The finest estate in Orvieto Classico; Calcaia botrytised wine is remarkable, dry whites also excellent.', approxPrice: '£14–35' },
    { name: 'Palazzone', note: 'Small, quality-focused estate with mineral, textured Orvieto Classico Superiore.', approxPrice: '£16–28' },
    { name: 'Antinori (Campogrande)', note: 'Large, reliable producer; their Campogrande is widely available and consistent Orvieto.', approxPrice: '£12–20' },
  ],

  'taurasi': [
    { name: 'Mastroberardino', note: 'The historic estate that preserved Aglianico in Campania; their Radici is the Taurasi benchmark.', approxPrice: '£35–80' },
    { name: 'Feudi di San Gregorio', note: 'Outstanding modern Campanian producer; Piano di Montevergine Riserva is a world-class Taurasi.', approxPrice: '£35–80' },
    { name: 'Caggiano', note: 'Traditional small estate making fine, structured Taurasi; Macchia dei Goti is their top wine.', approxPrice: '£30–60' },
  ],

  'greco-di-tufo': [
    { name: 'Feudi di San Gregorio', note: 'Leading Campanian producer; their Greco di Tufo Cutizzi is a mineral, volcanic benchmark.', approxPrice: '£18–35' },
    { name: 'Mastroberardino', note: 'Historic estate with excellent Greco di Tufo; Novaserra is their top single-vineyard expression.', approxPrice: '£18–35' },
    { name: 'Benito Ferrara', note: 'Boutique estate making some of the most concentrated and complex Greco di Tufo available.', approxPrice: '£20–38' },
  ],

  'fiano-di-avellino': [
    { name: 'Feudi di San Gregorio', note: 'Outstanding Fiano di Avellino from a leading Campanian estate; Pietracalda is their top cuvée.', approxPrice: '£18–40' },
    { name: 'Mastroberardino', note: 'Historic estate with fine Fiano di Avellino; Radici is their top expression — complex and age-worthy.', approxPrice: '£18–38' },
    { name: 'Villa Diamante', note: 'Small estate making exceptional Fiano from the Vigna della Congregazione cru.', approxPrice: '£20–40' },
  ],

  'aglianico-del-vulture': [
    { name: 'Paternoster', note: 'Historic benchmark producer for Vulture Aglianico; Don Anselmo is their flagship — powerful and structured.', approxPrice: '£30–65' },
    { name: 'Elena Fucci', note: 'Boutique estate making outstanding Titolo Aglianico del Vulture; intense, focused, and world-class.', approxPrice: '£35–75' },
    { name: 'Grifalco', note: 'Excellent Vulture estate with fine Aglianico at accessible prices; Damaschino is a reliable entry-level.', approxPrice: '£18–35' },
  ],

  'primitivo-di-manduria': [
    { name: 'Gianfranco Fino', note: 'The estate that transformed Primitivo\'s image; Es is a massale selection of extraordinary concentration.', approxPrice: '£35–80' },
    { name: 'Felline', note: 'Outstanding Primitivo di Manduria from organically farmed old vines; Anarkos is their top wine.', approxPrice: '£20–40' },
    { name: 'Pervini (Archidamo)', note: 'Reliable, widely available Primitivo di Manduria; good value expression of the variety.', approxPrice: '£14–25' },
  ],

  'negroamaro-salice-salentino': [
    { name: 'Leone de Castris', note: 'Historic Salice Salentino estate; Five Roses (a rosé) was Italy\'s first commercial rosé; reds excellent.', approxPrice: '£14–28' },
    { name: 'Cosimo Taurino', note: 'Highly regarded Puglia estate; their Notarpanaro and Patriglione are serious, age-worthy Negroamaro.', approxPrice: '£14–30' },
    { name: 'Candido', note: 'Reliable large producer; Cappello di Prete Riserva is their best Salice Salentino — structured and fairly priced.', approxPrice: '£12–22' },
  ],

  'etna-rosso': [
    { name: 'Cornelissen', note: 'The most celebrated Etna natural producer; Magma is a volcanic benchmark of rare intensity.', approxPrice: '£80–300' },
    { name: 'Benanti', note: 'The pioneer of the Etna revival; Serra della Contessa is their flagship Nerello Mascalese.', approxPrice: '£30–70' },
    { name: 'Terre Nere', note: 'Outstanding estate with multiple single-contrada wines; benchmark modern approach to Etna Rosso.', approxPrice: '£35–100' },
  ],

  'etna-bianco': [
    { name: 'Benanti', note: 'Pioneer of the Etna revival; their Pietramarina Superiore is the benchmark Carricante white.', approxPrice: '£30–65' },
    { name: 'Terre Nere', note: 'Fine Etna Bianco from old Carricante vines; precise, volcanic mineral character at fair prices.', approxPrice: '£28–55' },
    { name: 'Cornelissen', note: 'Radical natural producer; Munjebel Bianco is a distinctive, terroir-expressive Etna white.', approxPrice: '£35–80' },
  ],

  'nero-davola': [
    { name: 'COS', note: 'Benchmark natural producer in Ragusa; their Nero d\'Avola is biodynamic, vibrant, and complex.', approxPrice: '£20–40' },
    { name: 'Donnafugata', note: 'Top Sicilian estate with consistently excellent Nero d\'Avola; Mille e Una Notte is their flagship.', approxPrice: '£18–80' },
    { name: 'Planeta', note: 'Reliable, widely available Sicilian producer; Santa Cecilia is their serious Nero d\'Avola offering.', approxPrice: '£20–45' },
  ],

  'marsala-superiore': [
    { name: 'Marco De Bartoli', note: 'The man who saved Marsala\'s reputation; Vecchio Samperi is a non-fortified benchmark of extraordinary complexity.', approxPrice: '£30–80' },
    { name: 'Florio', note: 'Historic Marsala house with century-old barrels; their Targa Riserva is a reliable benchmark.', approxPrice: '£20–45' },
    { name: 'Pellegrino', note: 'Large, reliable Marsala producer with good Superiore range; consistent quality at accessible prices.', approxPrice: '£16–35' },
  ],

  'cannonau-di-sardegna': [
    { name: 'Argiolas', note: 'The most prestigious Sardinian estate; Turriga is their flagship — a structured, age-worthy Cannonau blend.', approxPrice: '£20–80' },
    { name: 'Sella & Mosca', note: 'Large, reliable Sardinian producer; their Cannonau di Sardegna Riserva is widely available and consistent.', approxPrice: '£14–25' },
    { name: 'Cantina di Dorgali', note: 'Fine co-op in the Nuoro heartland; their Cannonau is structured, rustic, and authentic.', approxPrice: '£14–22' },
  ],

  'vermentino-di-gallura': [
    { name: 'Cantina Gallura', note: 'Leading co-op for Vermentino di Gallura; Canayli is their flagship — rich, mineral, and age-worthy.', approxPrice: '£16–30' },
    { name: 'Capichera', note: 'Boutique estate making some of Sardinia\'s finest whites; their Vermentino is complex and textured.', approxPrice: '£22–45' },
    { name: 'Surrau', note: 'Modern Gallura estate with excellent Vermentino; Sciala is their top single-vineyard expression.', approxPrice: '£18–35' },
  ],

  'carignano-del-sulcis': [
    { name: 'Cantina di Santadi', note: 'The benchmark for Sulcis; Terre Brune is one of Sardinia\'s greatest reds — old-vine Carignano of extraordinary depth.', approxPrice: '£25–60' },
    { name: 'Mesa', note: 'Fine modern Sulcis producer; Buio is a reliable, well-made Carignano at accessible prices.', approxPrice: '£18–35' },
    { name: 'Agricola Punica', note: 'Joint venture of Sassicaia\'s owners and Santadi; Barrua is a landmark Carignano-led blend.', approxPrice: '£35–70' },
  ],

// ── SPAIN ──

  'rioja-alta-crianza': [
    { name: 'La Rioja Alta S.A.', note: 'Benchmark Alta producer; their Viña Arana Crianza is a textbook, elegant Tempranillo.', approxPrice: '£18–35' },
    { name: 'Muga', note: 'Traditional family estate with consistently excellent Crianza; fragrant, balanced, and well-priced.', approxPrice: '£16–28' },
    { name: 'CVNE', note: 'Historic estate with good Crianza across all tiers; Viña Real is their reliable everyday option.', approxPrice: '£14–25' },
  ],

  'rioja-alta-reserva': [
    { name: 'La Rioja Alta S.A.', note: 'The 904 Gran Reserva is their icon but the Reserva is arguably better value — classic and reliable.', approxPrice: '£28–55' },
    { name: 'Muga', note: 'Excellent Reserva with classic American oak influence; elegant, restrained, and very consistent.', approxPrice: '£22–40' },
    { name: 'Marqués de Murrieta', note: 'Historic Rioja house with excellent Reserva; their Castillo Ygay is a legendary aged bottling.', approxPrice: '£25–80' },
  ],

  'rioja-alta-gran-reserva': [
    { name: 'La Rioja Alta S.A.', note: '904 and 890 Gran Reservas are benchmarks for classical Rioja; extraordinary ageing potential.', approxPrice: '£45–120' },
    { name: 'Marqués de Riscal', note: 'Historic Rioja estate; their Gran Reserva is a classic, traditional expression of the style.', approxPrice: '£35–80' },
    { name: 'López de Heredia', note: 'Ultra-traditional producer; Viña Tondonia Gran Reserva is among Rioja\'s most distinctive wines.', approxPrice: '£45–120' },
  ],

  'rioja-alavesa': [
    { name: 'Roda', note: 'Modern Alavesa benchmark; structured, concentrated wines with impressive complexity and age-worthiness.', approxPrice: '£30–80' },
    { name: 'Artadi', note: 'Outstanding Alavesa producer making terroir-driven, Burgundy-influenced Tempranillo of great finesse.', approxPrice: '£28–80' },
    { name: 'Remelluri', note: 'Fine organic estate in Labastida; their Reserva is a complex, mineral expression of Alavesa.', approxPrice: '£22–45' },
  ],

  'rioja-baja-garnacha': [
    { name: 'Palacios Remondo', note: 'Álvaro Palacios\'s Rioja Baja estate; La Montesa showcases Garnacha\'s wild, spicy character.', approxPrice: '£18–35' },
    { name: 'Valdemar', note: 'Reliable Rioja Baja producer; good Garnacha with ripe fruit and fair pricing.', approxPrice: '£14–25' },
    { name: 'El Coto', note: 'Large, reliable Rioja producer with accessible Garnacha at everyday prices.', approxPrice: '£12–20' },
  ],

  'rioja-blanco-viura': [
    { name: 'López de Heredia', note: 'The most famous white Rioja in the world; Viña Tondonia Blanco ages for decades with extraordinary complexity.', approxPrice: '£30–120' },
    { name: 'Marqués de Murrieta', note: 'Their Capellanía Reserva Blanco is a structured, oaked Viura of real interest.', approxPrice: '£22–45' },
    { name: 'Muga', note: 'Fine white Rioja with texture and freshness; underrated and worth seeking for fans of oak-aged whites.', approxPrice: '£18–30' },
  ],

  'ribera-del-duero-crianza': [
    { name: 'Pesquera', note: 'The estate that put Ribera del Duero on the map; their Crianza is structured, reliable, and classic.', approxPrice: '£22–40' },
    { name: 'Protos', note: 'Historic co-op with excellent Crianza; widely available and consistently well-made.', approxPrice: '£16–28' },
    { name: 'Pago de los Capellanes', note: 'Fine Ribera estate; their Crianza offers excellent QPR with good structure and fruit.', approxPrice: '£18–32' },
  ],

  'ribera-del-duero-reserva': [
    { name: 'Vega Sicilia', note: 'The pinnacle of Ribera del Duero; Único is Spain\'s most iconic wine, requiring decades to open.', approxPrice: '£200–600' },
    { name: 'Pesquera', note: 'Their Reserva is the benchmark at accessible prices; structured, age-worthy Tempranillo.', approxPrice: '£35–65' },
    { name: 'Emilio Moro', note: 'Outstanding single-vineyard wines; Finca Resalso and Malleolus are reliable, quality-focused expressions.', approxPrice: '£25–80' },
  ],

  'priorat-garnacha': [
    { name: 'Álvaro Palacios', note: 'The man who transformed Priorat\'s image; L\'Ermita is Spain\'s greatest wine — old-vine Garnacha on llicorella.', approxPrice: '£400–1500' },
    { name: 'Clos Mogador', note: 'René Barbier\'s historic estate; one of Priorat\'s founding wines with superb depth and complexity.', approxPrice: '£80–200' },
    { name: 'Mas Doix', note: 'Fine Priorat estate with old-vine Garnacha; their Salanques is an outstanding entry into the appellation.', approxPrice: '£30–80' },
  ],

  'montsant': [
    { name: 'Venus la Universal', note: 'Sara Pérez\'s estate; Dido is their accessible Montsant — concentrated, mineral, exceptional value.', approxPrice: '£18–35' },
    { name: 'Acústic Celler', note: 'Fine natural producer in Montsant; Auditori is a structured, terroir-driven Garnacha-Cariñena blend.', approxPrice: '£18–35' },
    { name: 'Celler de Capçanes', note: 'Outstanding co-op with top cuvées; Mas Donis is their reliable entry-level, Mas Collet the step-up.', approxPrice: '£14–35' },
  ],

  'rias-baixas-val-do-salnes': [
    { name: 'Do Ferreiro', note: 'Benchmark Val do Salnés estate; their Cepas Vellas is one of Galicia\'s most complex Albariños.', approxPrice: '£25–60' },
    { name: 'Pazo de Señorans', note: 'Outstanding Albariño with crisp acidity and Atlantic freshness; their Selección de Añada ages beautifully.', approxPrice: '£20–45' },
    { name: 'Burgáns (Martín Códax)', note: 'Reliable, widely available Albariño; consistent quality at everyday prices.', approxPrice: '£14–22' },
  ],

  'rias-baixas-ribeira-sacra': [
    { name: 'Guímaro', note: 'Outstanding Ribeira Sacra Mencía from terraced schist vineyards; their Pena do Lobo is a benchmark.', approxPrice: '£20–45' },
    { name: 'Dominio do Bibei', note: 'Fine natural producer in Bibei; Lapola is their top Mencía, elegant and mineral.', approxPrice: '£25–55' },
    { name: 'Rectoral de Amandi', note: 'Reliable Amandi estate with good Mencía at accessible prices; fragrant and food-friendly.', approxPrice: '£16–28' },
  ],

  'bierzo-mencia': [
    { name: 'Álvaro Palacios', note: 'Palacios Descendientes; Villa de Corullón is a landmark Mencía of Burgundian precision on schist.', approxPrice: '£35–150' },
    { name: 'Raúl Pérez', note: 'Cult producer across Bierzo; Sketch and Castro Ventosa are intensely mineral, natural-leaning Mencía.', approxPrice: '£30–100' },
    { name: 'Dominio de Tares', note: 'Reliable Bierzo estate with excellent Mencía; Baltos is their accessible everyday expression.', approxPrice: '£14–28' },
  ],

  'rueda-verdejo': [
    { name: 'Belondrade y Lurton', note: 'The most serious Rueda estate; their barrel-fermented Belondrade is a benchmark for the variety.', approxPrice: '£30–60' },
    { name: 'Naia', note: 'Outstanding Rueda Verdejo with great freshness and mineral character; excellent everyday value.', approxPrice: '£14–22' },
    { name: 'Marqués de Riscal (Rueda)', note: 'Historic producer in Rueda; their Rueda Verdejo is widely available and reliably well-made.', approxPrice: '£12–20' },
  ],

  'toro-tinta-de-toro': [
    { name: 'Numanthia', note: 'The estate that put Toro on the international map; Termanthia is Spain\'s most powerful, age-worthy Tempranillo.', approxPrice: '£80–300' },
    { name: 'Pintia (Vega Sicilia)', note: 'Vega Sicilia\'s Toro estate; massive, concentrated Tempranillo requiring long cellaring.', approxPrice: '£45–90' },
    { name: 'Bodegas Covitoro', note: 'Good value Toro from a reliable co-op; structured and rustic with the variety\'s characteristic power.', approxPrice: '£12–22' },
  ],

  'penedes-cava': [
    { name: 'Gramona', note: 'The finest independent Cava house; their Enoteca and III Lustros are world-class sparkling wines.', approxPrice: '£25–120' },
    { name: 'Recaredo', note: 'Outstanding natural Cava producer; Terrers and Intens Rosat are benchmark expressions of terroir.', approxPrice: '£22–80' },
    { name: 'Codorníu', note: 'Historic Cava house; their Anna de Codorníu and Non Plus Ultra are reliable and widely available.', approxPrice: '£12–35' },
  ],

  'grenache-aragon-campo-de-borja': [
    { name: 'Borsao', note: 'Outstanding co-op in Campo de Borja; Tres Picos is a world-class Garnacha at extraordinary value.', approxPrice: '£12–25' },
    { name: 'Alto Moncayo', note: 'Fine Garnacha from old bush vines; their Aquilón and Veraton are outstanding expressions of the appellation.', approxPrice: '£18–60' },
    { name: 'Magallón', note: 'Reliable co-op producing affordable Garnacha; ideal for everyday drinking and discovering the variety.', approxPrice: '£10–18' },
  ],

  'jumilla-monastrell': [
    { name: 'Juan Gil', note: 'The benchmark for modern Jumilla; their Monastrell at different price points all offer excellent value.', approxPrice: '£12–45' },
    { name: 'Casa Castillo', note: 'Outstanding Jumilla estate making Monastrell of real depth; Pie Franco is a pre-phylloxera masterpiece.', approxPrice: '£18–80' },
    { name: 'El Nido', note: 'Joint venture between Juan Gil and UK importer; Clio and El Nido are concentrated, world-class Monastrell.', approxPrice: '£35–100' },
  ],

  'sherry-fino': [
    { name: 'González Byass (Tio Pepe)', note: 'The most recognised Fino in the world; fresh, almond-scented, and always reliable.', approxPrice: '£12–22' },
    { name: 'Lustau', note: 'Outstanding Almacenista range; their Fino Puerto Fino is elegant, complex, and fairly priced.', approxPrice: '£14–25' },
    { name: 'Valdespino (Inocente)', note: 'Single-vineyard, barrel-fermented Fino of extraordinary complexity; among the world\'s greatest Sherries.', approxPrice: '£18–35' },
  ],

  'sherry-manzanilla': [
    { name: 'Hidalgo (La Gitana)', note: 'The benchmark everyday Manzanilla; widely available, delicate, and impeccably fresh.', approxPrice: '£12–22' },
    { name: 'Barbadillo', note: 'Largest Sanlúcar producer with consistent Manzanilla; their Pastora Pasada is a step up in complexity.', approxPrice: '£12–30' },
    { name: 'Equipo Navazos', note: 'The finest collector Sherries available; their numbered En Rama releases are extraordinary.', approxPrice: '£20–80' },
  ],

  'sherry-amontillado': [
    { name: 'González Byass (Del Duque)', note: 'Extraordinary VORS Amontillado of immense concentration and complexity; a benchmark of the style.', approxPrice: '£30–80' },
    { name: 'Valdespino (Coliseo)', note: 'Old, complex Amontillado from a single vineyard; among the most celebrated in the region.', approxPrice: '£45–120' },
    { name: 'Lustau (Los Arcos)', note: 'Excellent Amontillado at accessible prices; dry, nutty, and complex — great introduction to the style.', approxPrice: '£16–30' },
  ],

  'sherry-oloroso': [
    { name: 'González Byass (Matusalem)', note: 'Rich, complex Oloroso Dulce of extraordinary depth; one of Spain\'s greatest dessert wines.', approxPrice: '£30–70' },
    { name: 'Lustau (Don Nuño)', note: 'Outstanding dry Oloroso with walnut, fig, and tobacco character; consistently excellent.', approxPrice: '£16–30' },
    { name: 'Barbadillo (VORS Oloroso)', note: 'Old Oloroso of great age and concentration; rancio, roasted nut, and extraordinary persistence.', approxPrice: '£35–80' },
  ],

  'sherry-palo-cortado': [
    { name: 'Hidalgo (Jerez Cortado)', note: 'Outstanding Palo Cortado VORS; combines Fino\'s elegance with Oloroso\'s richness perfectly.', approxPrice: '£35–80' },
    { name: 'González Byass (Apostoles)', note: 'Classic Palo Cortado VORS Muy Viejo; complex, silky, and extraordinary value for its age.', approxPrice: '£30–70' },
    { name: 'Equipo Navazos', note: 'Collector-grade Palo Cortado releases; La Bota numbered series are among Sherry\'s most sought-after wines.', approxPrice: '£40–120' },
  ],

  'sherry-pedro-ximenez': [
    { name: 'Toro Albalá', note: 'The finest PX in Montilla-Moriles; their Don PX Gran Reserva 1971 is a legendary wine.', approxPrice: '£20–150' },
    { name: 'González Byass (Noé)', note: 'VORS PX of extraordinary concentration; raisined, fig-dense, and almost syrup-like in richness.', approxPrice: '£30–70' },
    { name: 'Lustau (San Emilio)', note: 'Reliable PX at accessible prices; thick, sweet, and excellent with vanilla ice cream.', approxPrice: '£14–25' },
  ],

  // ── PORTUGAL ──

  'douro-red': [
    { name: 'Quinta do Crasto', note: 'Outstanding Douro estate making structured, age-worthy reds from old indigenous vines.', approxPrice: '£18–80' },
    { name: 'Niepoort', note: 'Innovative Douro producer; Charme and Batuta are defining expressions of modern Douro reds.', approxPrice: '£25–100' },
    { name: 'Quinta do Vale Meão', note: 'The original Barca Velha vineyard; their table wine is among Portugal\'s finest.', approxPrice: '£40–100' },
  ],

  'douro-white': [
    { name: 'Niepoort (Redoma Branco)', note: 'Outstanding white Douro from Rabigato and Viosinho; complex, textured, and age-worthy.', approxPrice: '£22–45' },
    { name: 'Quinta do Crasto', note: 'Fine white Douro from high-altitude vineyards; fresh, mineral, and increasingly recognised.', approxPrice: '£18–35' },
    { name: 'Ramos Pinto', note: 'Reliable Douro white from a major port house; good introduction to indigenous white varieties.', approxPrice: '£14–25' },
  ],

  'port-vintage': [
    { name: 'Quinta do Noval (Nacional)', note: 'Pre-phylloxera vines; Nacional is the rarest and most expensive vintage Port in the world.', approxPrice: '£400–2000' },
    { name: 'Fonseca', note: 'Consistently outstanding vintage Port; their declared vintages are benchmarks for the style.', approxPrice: '£55–200' },
    { name: 'Graham\'s', note: 'Major Symington house with excellent vintage Port; Stone Terraces is their single-quinta offering.', approxPrice: '£45–200' },
  ],

  'port-lbv': [
    { name: 'Ramos Pinto', note: 'Excellent unfiltered LBV with real vintage character; Quinta do Bom Retiro is their flagship.', approxPrice: '£18–30' },
    { name: 'Niepoort', note: 'Outstanding unfiltered LBV with complexity approaching vintage Port; superb QPR.', approxPrice: '£20–35' },
    { name: 'Quinta do Crasto', note: 'Fine LBV from a top Douro estate; structured, age-worthy, and fairly priced.', approxPrice: '£18–30' },
  ],

  'port-tawny-10yr': [
    { name: 'Graham\'s', note: 'Consistent, well-made 10 Year Tawny from a major Symington house; nutty, dried-fruit character.', approxPrice: '£22–35' },
    { name: 'Ramos Pinto', note: 'Excellent Quinta Aveleda 10 Year Tawny; elegant and complex with fine walnut-orange peel notes.', approxPrice: '£22–35' },
    { name: 'Niepoort', note: 'Outstanding 10 Year Tawny at fair prices; among the most complex examples in their age category.', approxPrice: '£25–40' },
  ],

  'port-colheita': [
    { name: 'Niepoort', note: 'The benchmark for vintage-dated Tawny (Colheita); exceptional complexity and extraordinary ageing.', approxPrice: '£35–120' },
    { name: 'Ramos Pinto', note: 'Fine Colheita from a quality-focused producer; their older releases offer outstanding value.', approxPrice: '£30–100' },
    { name: 'Barros', note: 'Specialist Colheita producer with some of the oldest dated releases in the Douro.', approxPrice: '£30–150' },
  ],

  'port-white': [
    { name: 'Niepoort', note: 'Outstanding white Port — their Bianco is a complex, nutty alternative to Tawny.', approxPrice: '£18–35' },
    { name: 'Quinta do Crasto', note: 'Reliable white Port at accessible prices; excellent served chilled with tonic water.', approxPrice: '£16–28' },
    { name: 'Graham\'s', note: 'Their White Port is widely available and well-made; fine for the classic G&T Port serve.', approxPrice: '£18–30' },
  ],

  'vinho-verde-alvarinho': [
    { name: 'Quinta de Soalheiro', note: 'The benchmark Alvarinho estate in Monção; intensely aromatic, mineral, and age-worthy.', approxPrice: '£20–45' },
    { name: 'Anselmo Mendes', note: 'Outstanding winemaker with multiple single-vineyard Alvarinho wines of great precision.', approxPrice: '£18–40' },
    { name: 'Aphros', note: 'Biodynamic Vinho Verde estate; their Alvarinho is complex and terroir-expressive.', approxPrice: '£20–38' },
  ],

  'vinho-verde-loureiro': [
    { name: 'Quinta da Aveleda', note: 'Large, reliable Vinho Verde estate with good Loureiro; fresh, floral, and affordable.', approxPrice: '£12–20' },
    { name: 'Aphros', note: 'Fine biodynamic Loureiro from organically farmed Lima Valley vineyards.', approxPrice: '£18–30' },
    { name: 'Minho Estates (Regueiro)', note: 'Good value Loureiro with typical floral, citrus character; excellent everyday Portuguese white.', approxPrice: '£12–20' },
  ],

  'alentejo-red': [
    { name: 'Esporão', note: 'The benchmark Alentejo estate; Reserva is their reliable flagship — rich, structured, and widely available.', approxPrice: '£18–50' },
    { name: 'Herdade do Mouchão', note: 'Historic estate with old Alicante Bouschet vines; their wines are among Portugal\'s most distinctive.', approxPrice: '£25–80' },
    { name: 'Dona Maria (Júlio Bastos)', note: 'Outstanding smaller Alentejo producer; their Grand Reserve is a structured, age-worthy blend.', approxPrice: '£20–45' },
  ],

  'alentejo-antao-vaz': [
    { name: 'Esporão', note: 'Their Antão Vaz is a reliable benchmark; round, aromatic, and well-suited to the variety\'s character.', approxPrice: '£14–22' },
    { name: 'Herdade das Servas', note: 'Fine organic Alentejo estate; excellent Antão Vaz with good texture and refreshing acidity.', approxPrice: '£14–22' },
    { name: 'José de Sousa', note: 'Historic Reguengos estate with excellent whites from clay amphora; Antão Vaz at its most complex.', approxPrice: '£18–35' },
  ],

  'dao-touriga-nacional': [
    { name: 'Quinta dos Roques', note: 'Benchmark Dão estate making outstanding Touriga Nacional; their Reserva is a consistently top performer.', approxPrice: '£22–50' },
    { name: 'Niepoort (Dão)', note: 'Outstanding natural Dão; their Robustus and Nat Cool offer different expressions of the region.', approxPrice: '£18–45' },
    { name: 'Quinta de Pellada', note: 'Small, precise estate in Dão making elegant, mineral wines; Primus is their flagship.', approxPrice: '£20–45' },
  ],

  'dao-encruzado': [
    { name: 'Quinta dos Roques', note: 'Outstanding Encruzado from a top Dão estate; their Encruzado is one of Portugal\'s finest whites.', approxPrice: '£22–45' },
    { name: 'Casa da Passarella', note: 'Excellent Encruzado with real depth and mineral character; worth seeking for fans of structured whites.', approxPrice: '£20–40' },
    { name: 'Quinta de Cabriz', note: 'Reliable Dão estate; good value Encruzado with typical aromatic freshness at accessible prices.', approxPrice: '£16–28' },
  ],

  'madeira-sercial': [
    { name: 'Blandy\'s', note: 'Major Madeira house with excellent Sercial; 10 Year and Colheita bottlings are benchmark dry expressions.', approxPrice: '£18–80' },
    { name: 'Barbeito', note: 'Boutique Madeira producer with outstanding Sercial cask selections; exceptional minerality and acidity.', approxPrice: '£22–100' },
    { name: 'Henriques & Henriques', note: 'Reliable, well-priced Sercial with characteristic dry, saline, nutty character.', approxPrice: '£18–55' },
  ],

  'madeira-bual': [
    { name: 'Blandy\'s', note: 'Their Bual is a benchmark for the medium-rich style; 10 Year and older colheitas are excellent.', approxPrice: '£22–100' },
    { name: 'D\'Oliveiras', note: 'Historic lodge with outstanding old Bual colheitas; extraordinary aged complexity at fair prices.', approxPrice: '£25–150' },
    { name: 'Cossart Gordon', note: 'Historic Bual producer; their Good Company is a reliable entry to the medium-rich Madeira style.', approxPrice: '£18–50' },
  ],

  'madeira-malmsey': [
    { name: 'Blandy\'s', note: 'Their Malmsey is perhaps the best-known Madeira globally; 5 Year is excellent, older bottlings magnificent.', approxPrice: '£18–100' },
    { name: 'Pereira d\'Oliveira', note: 'Old, respected lodge with outstanding Malmsey colheitas going back many decades.', approxPrice: '£25–200' },
    { name: 'Justino\'s', note: 'Major Madeira producer with accessible, reliable Malmsey at good prices; ideal introduction.', approxPrice: '£16–45' },
  ],

  'bairrada-baga': [
    { name: 'Filipa Pato', note: 'Outstanding producer making terroir-expressive, natural-leaning Baga; Nossa Calcário is exceptional.', approxPrice: '£20–50' },
    { name: 'Luís Pato', note: 'The godfather of modern Bairrada; his Baga wines from single vineyards are age-worthy benchmarks.', approxPrice: '£18–55' },
    { name: 'Sidónio de Sousa', note: 'Traditional producer with fine old-vine Baga; structured, tannic wines requiring cellaring.', approxPrice: '£18–40' },
  ],

  'moscatel-de-setubal': [
    { name: 'José Maria da Fonseca', note: 'The benchmark Moscatel de Setúbal producer; their aged expressions (20yr, 30yr) are extraordinary.', approxPrice: '£18–80' },
    { name: 'Bacalhôa', note: 'Good Moscatel de Setúbal at accessible prices; reliable, fragrant, and consistently well-made.', approxPrice: '£16–35' },
    { name: 'Horácio Simões', note: 'Small producer making outstanding traditional Moscatel; richer and more complex than large commercial versions.', approxPrice: '£20–50' },
  ],

// ── GERMANY ──

  'mosel-bernkasteler-doctor': [
    { name: 'Weingut Dr. Thanisch', note: 'Historic estate with direct claim to the Doctor vineyard name; pristine, laser-precise Riesling.', approxPrice: '£35–120' },
    { name: 'Wegeler Bernkastel', note: 'Respected Mosel producer with excellent Doctor holdings; elegant, slate-driven Rieslings.', approxPrice: '£30–100' },
    { name: 'Joh. Jos. Prüm', note: 'One of Mosel\'s most celebrated estates; their Bernkastel wines are benchmarks of the appellation.', approxPrice: '£45–150' },
  ],

  'mosel-piesporter-goldtropfchen': [
    { name: 'Reinhold Haart', note: 'The reference producer for Piesporter Goldtröpfchen; incredibly pure, mineral wines of great finesse.', approxPrice: '£25–80' },
    { name: 'Joh. Jos. Prüm', note: 'Fine Piesporter from one of Mosel\'s greatest estates; outstanding precision and ageing potential.', approxPrice: '£40–120' },
    { name: 'St. Urbanshof', note: 'Excellent modern Mosel producer; their Piesporter Goldtröpfchen is consistently well-made.', approxPrice: '£22–55' },
  ],

  'mosel-wehlenner-sonnenuhr': [
    { name: 'Joh. Jos. Prüm', note: 'The dominant estate in Wehlener Sonnenuhr; their GK and Auslesen are among Mosel\'s greatest wines.', approxPrice: '£45–300' },
    { name: 'Markus Molitor', note: 'Outstanding Wehlener Sonnenuhr wines across all Prädikat levels; intense, mineral, age-worthy.', approxPrice: '£30–120' },
    { name: 'Dr. Loosen', note: 'Reliable and widely available; good Wehlener Sonnenuhr at approachable prices for the style.', approxPrice: '£22–80' },
  ],

  'mosel-kabinett': [
    { name: 'Joh. Jos. Prüm', note: 'The standard for Mosel Kabinett; their Wehlener Sonnenuhr Kabinett is one of the world\'s great food wines.', approxPrice: '£30–60' },
    { name: 'Egon Müller', note: 'Exceptional Scharzhofberger Kabinett; benchmark, pure, and hauntingly complex — allocated and sought-after.', approxPrice: '£50–150' },
    { name: 'Dr. Loosen', note: 'Reliable, accessible Kabinett from multiple top sites; great introduction to the style.', approxPrice: '£18–35' },
  ],

  'mosel-trockenbeerenauslese': [
    { name: 'Egon Müller', note: 'Their Scharzhofberger TBA is arguably the world\'s greatest sweet wine; astronomically priced and rare.', approxPrice: '£2000+' },
    { name: 'Joh. Jos. Prüm', note: 'Outstanding TBA from Wehlener Sonnenuhr; intense, honeyed, and built to age for a century.', approxPrice: '£500–2000' },
    { name: 'Dr. Loosen', note: 'More accessible TBA from top sites; still exceptional in character if more available than the legends.', approxPrice: '£300–800' },
  ],

  'mosel-saar-riesling': [
    { name: 'Egon Müller', note: 'The Saar\'s undisputed master; Scharzhofberger is the pinnacle of Saar Riesling in all its forms.', approxPrice: '£45–2000' },
    { name: 'Van Volxem', note: 'Outstanding modern Saar producer; their Saar Riesling is a precise, mineral benchmark at fair prices.', approxPrice: '£20–80' },
    { name: 'Zilliken', note: 'Historic Saar estate with excellent Saarburger Rausch; traditional, age-worthy Riesling of great finesse.', approxPrice: '£25–120' },
  ],

  'rheingau-johannisberg': [
    { name: 'Schloss Johannisberg', note: 'The historic estate that created the Spätlese style; benchmark Riesling from the famous Rüdesheim site.', approxPrice: '£25–120' },
    { name: 'Georg Breuer', note: 'Top Rheingau estate with fine Johannisberg Riesling; their Nonnenberg GG is outstanding.', approxPrice: '£25–80' },
    { name: 'Weil', note: 'Leading Rheingau producer with excellent Johannisberg wines across all Prädikat levels.', approxPrice: '£22–100' },
  ],

  'rheingau-riesling-trocken': [
    { name: 'Robert Weil', note: 'The Rheingau\'s leading estate; their Kiedrich Gräfenberg Trocken GG is exceptional.', approxPrice: '£30–120' },
    { name: 'Georg Breuer', note: 'Outstanding dry Rheingau Riesling from top vineyards; Berg Schlossberg is their prestige single-site.', approxPrice: '£25–90' },
    { name: 'Leitz', note: 'Reliable, widely available dry Rheingau Riesling; Dragonstone is their accessible everyday expression.', approxPrice: '£16–55' },
  ],

  'pfalz-riesling-trocken': [
    { name: 'Bürklin-Wolf', note: 'Top Pfalz estate with biodynamic farming; their GGs from Forster Kirchenstück are outstanding.', approxPrice: '£28–100' },
    { name: 'Bassermann-Jordan', note: 'Historic Mittelhaardt estate; dry Rieslings with impressive depth and food-friendliness.', approxPrice: '£22–80' },
    { name: 'Müller-Catoir', note: 'Outstanding Pfalz producer making pure, mineral dry Rieslings with excellent aromatic precision.', approxPrice: '£22–70' },
  ],

  'pfalz-spatburgunder': [
    { name: 'Friedrich Becker', note: 'The finest Spätburgunder producer in Germany; their Kammerberg is a Burgundy-rival of great complexity.', approxPrice: '£35–120' },
    { name: 'Knipser', note: 'Outstanding Pfalz Spätburgunder with Burgundy-influenced winemaking; their Spätburgunder R is excellent.', approxPrice: '£25–70' },
    { name: 'Bernhart', note: 'Small southern Pfalz estate making outstanding Spätburgunder from limestone soils.', approxPrice: '£28–65' },
  ],

  'rheinhessen-riesling': [
    { name: 'Keller', note: 'Germany\'s most celebrated Rheinhessen producer; G-Max is their legendary GG — among Germany\'s greatest.', approxPrice: '£80–500' },
    { name: 'Wittmann', note: 'Outstanding biodynamic producer in Westhofen; their GGs are benchmark German Rieslings.', approxPrice: '£30–120' },
    { name: 'Gunderloch', note: 'Historic Nackenheim estate; Jean-Baptiste Riesling is their reliable everyday wine, Nackenheimer GGs exceptional.', approxPrice: '£18–120' },
  ],

  // ── AUSTRIA ──

  'wachau-gruner-smaragd': [
    { name: 'F.X. Pichler', note: 'The Wachau\'s most celebrated producer; Kellerberg and Loibenberg Smaragds are world-class whites.', approxPrice: '£45–200' },
    { name: 'Prager', note: 'Outstanding Wachau estate; Achleiten Smaragd is one of the finest Grüner Veltliners in existence.', approxPrice: '£35–120' },
    { name: 'Knoll', note: 'Traditional, age-worthy Wachau Smaragd from one of the region\'s most respected families.', approxPrice: '£30–100' },
  ],

  'wachau-riesling-smaragd': [
    { name: 'F.X. Pichler', note: 'Their Dürnsteiner Kellerberg Riesling Smaragd is a benchmark; complex, mineral, extraordinary.', approxPrice: '£50–200' },
    { name: 'Rudi Pichler', note: 'Outstanding Wachau Riesling from the same village; precise, mineral, slightly more accessible.', approxPrice: '£35–100' },
    { name: 'Domäne Wachau', note: 'The large co-op producing reliable, quality Riesling Smaragd; excellent value for the style.', approxPrice: '£20–50' },
  ],

  'kamptal-gruner-veltliner': [
    { name: 'Bründlmayer', note: 'The leading Kamptal estate; their Lamm GV is a world-class wine of extraordinary depth.', approxPrice: '£28–80' },
    { name: 'Schloss Gobelsburg', note: 'Historic estate with fine Kamptal GV; Lamm and Grub single-sites are consistently excellent.', approxPrice: '£22–65' },
    { name: 'Hirsch', note: 'Outstanding natural Kamptal producer; Heiligenstein and Grub are benchmark single-vineyard GVs.', approxPrice: '£22–60' },
  ],

  'kremstal-riesling': [
    { name: 'Nigl', note: 'Kremstal\'s finest producer; their Rieslings from Senftenberger Piri are elegant and age-worthy benchmarks.', approxPrice: '£22–60' },
    { name: 'Salomon', note: 'Outstanding Kremstal estate with fine Riesling; Undhof Kögl is their top single-vineyard expression.', approxPrice: '£20–50' },
    { name: 'Stadt Krems', note: 'Reliable urban winery making consistent Kremstal Riesling at accessible prices.', approxPrice: '£16–30' },
  ],

  'burgenland-blaufrankisch': [
    { name: 'Ernst Triebaumer', note: 'Pioneer of serious Blaufränkisch; their Mariental is a benchmark for the variety in Burgenland.', approxPrice: '£25–60' },
    { name: 'Moric', note: 'Outstanding natural Blaufränkisch from Roland Velich; benchmark terroir-focused wines.', approxPrice: '£22–80' },
    { name: 'Hans Igler', note: 'Traditional Mittelburgenland producer making structured, age-worthy Blaufränkisch.', approxPrice: '£20–45' },
  ],

  'burgenland-zweigelt': [
    { name: 'Gesellmann', note: 'Outstanding Burgenland producer; Bela Rex is a premium Zweigelt-based blend of great depth.', approxPrice: '£18–45' },
    { name: 'Umathum', note: 'Fine organic estate in Frauenkirchen; Zweigelt with excellent concentration and terroir expression.', approxPrice: '£18–40' },
    { name: 'Paul Achs', note: 'Reliable, well-made Zweigelt from one of Burgenland\'s consistent producers.', approxPrice: '£16–30' },
  ],

  'rust-ausbruch': [
    { name: 'Feiler-Artinger', note: 'The benchmark Ruster Ausbruch producer; Pinot Cuvée is extraordinary — honeyed, complex, age-worthy.', approxPrice: '£40–120' },
    { name: 'Heidi Schröck', note: 'Outstanding natural Ausbruch producer; one of Rust\'s most compelling and distinctive sweet wines.', approxPrice: '£40–100' },
    { name: 'Wenzel', note: 'Traditional Rust estate with good Ausbruch; reliable and well-priced for the style\'s complexity.', approxPrice: '£35–90' },
  ],

  'viennese-gruner': [
    { name: 'Mayer am Pfarrplatz', note: 'The most famous Vienna Heurige; their Nussberg Grüner Veltliner is a benchmark city wine.', approxPrice: '£16–30' },
    { name: 'Zahel', note: 'Fine Viennese Grüner with good concentration; excellent introduction to wines grown within a capital city.', approxPrice: '£16–28' },
    { name: 'Wieninger', note: 'Outstanding Vienna estate; their Grand Select GV is a serious, age-worthy urban Grüner.', approxPrice: '£18–40' },
  ],

  // ── GREECE ──

  'assyrtiko-santorini': [
    { name: 'Hatzidakis', note: 'Benchmark Santorini producer; their Assyrtiko is mineral, volcanic, and age-worthy — among Greece\'s finest.', approxPrice: '£25–60' },
    { name: 'Domaine Sigalas', note: 'Outstanding Santorini estate with excellent Assyrtiko; their Kavalieros is from centenarian vines.', approxPrice: '£22–55' },
    { name: 'Estate Argyros', note: 'Fine Santorini producer; their Assyrtiko Estate is reliable, their Cuvée Monsignori is exceptional.', approxPrice: '£20–60' },
  ],

  'santorini-vinsanto': [
    { name: 'Estate Argyros', note: 'Outstanding Vinsanto with extraordinary concentration; 30-year-aged barrels produce incomparable complexity.', approxPrice: '£50–200' },
    { name: 'Domaine Sigalas', note: 'Fine Vinsanto with good balance of sweetness and acidity; excellent aged examples available.', approxPrice: '£40–120' },
    { name: 'Hatzidakis', note: 'Benchmark Vinsanto with raisin, fig, and volcanic mineral character; excellent ageing potential.', approxPrice: '£45–150' },
  ],

  'xinomavro-naoussa': [
    { name: 'Kir-Yianni', note: 'Outstanding Naoussa estate; Ramnista is a traditional, age-worthy benchmark for the variety.', approxPrice: '£18–45' },
    { name: 'Thymiopoulos', note: 'Modern Xinomavro pioneer; Earth & Sky is a fresh, approachable entry; top cuvées are exceptional.', approxPrice: '£16–55' },
    { name: 'Domaine Karydas', note: 'Small traditional estate making structured, age-worthy Xinomavro of great character.', approxPrice: '£20–40' },
  ],

  'moschofilero-mantinia': [
    { name: 'Tselepos', note: 'The reference producer for Moschofilero; their Driopi Classic is delicate, aromatic, and reliable.', approxPrice: '£16–28' },
    { name: 'Spiropoulos', note: 'Fine high-altitude Moschofilero from the Mantinia plateau; crisp, floral, and food-friendly.', approxPrice: '£14–25' },
    { name: 'Boutari', note: 'Reliable, widely available Moschofilero; good introduction to Greece\'s most aromatic white variety.', approxPrice: '£12–22' },
  ],

  'muscat-samos': [
    { name: 'Samos Co-operative', note: 'The appellation\'s defining producer; their Anthemis and Nectar are benchmark aged Muscat expressions.', approxPrice: '£14–40' },
    { name: 'Samos Grand Cru', note: 'Their top tier offering; concentrated, honeyed, and outstanding value for the quality on offer.', approxPrice: '£18–40' },
    { name: 'Samos Vin Doux Naturel', note: 'Classic Samos style; sweet, fragrant, and widely available at excellent prices.', approxPrice: '£12–22' },
  ],

  // ── HUNGARY ──

  'tokaji-aszu-5puttonyos': [
    { name: 'Royal Tokaji', note: 'The estate that revived Tokaji\'s reputation; Mézes Mály and Nyulászó are outstanding single-vineyard aszús.', approxPrice: '£35–150' },
    { name: 'Disznókő', note: 'Outstanding Tokaji estate with consistent 5 Puttonyos; complex, concentrated, and age-worthy.', approxPrice: '£35–100' },
    { name: 'Château Dereszla', note: 'Fine Tokaji producer at accessible prices; good 5 Puttonyos for exploring the style.', approxPrice: '£25–60' },
  ],

  'tokaji-furmint-dry': [
    { name: 'Oremus', note: 'Outstanding dry Furmint from a major Vega Sicilia-owned estate; Mandolás is their benchmark.', approxPrice: '£18–35' },
    { name: 'Demeter Zoltán', note: 'Natural, small-estate dry Furmint of great mineral complexity; among Hungary\'s finest whites.', approxPrice: '£20–45' },
    { name: 'Sauska', note: 'Modern Tokaj estate with excellent dry Furmint; Tokaj Furmint is their reliable, well-made expression.', approxPrice: '£18–35' },
  ],

  'egri-bikaver': [
    { name: 'Tűzkő', note: 'One of the finest Eger producers; their Egri Bikavér Superior is a structured, complex blend.', approxPrice: '£16–30' },
    { name: 'St. Andrea', note: 'Outstanding Eger estate; their Merengő Egri Bikavér is among the best expressions of the blend.', approxPrice: '£18–38' },
    { name: 'Thummerer', note: 'Reliable Eger producer with good Bikavér at fair prices; consistent quality year on year.', approxPrice: '£14–25' },
  ],

  // ── GEORGIA ──

  'rkatsiteli-qvevri': [
    { name: 'Pheasant\'s Tears', note: 'The most celebrated natural Georgian producer; benchmark amber Rkatsiteli from old qvevri.', approxPrice: '£20–45' },
    { name: 'Iago\'s Wine', note: 'Iago Bitarishvili\'s tiny natural estate; his Chinuri and Rkatsiteli are defining Georgian amber wines.', approxPrice: '£18–40' },
    { name: 'Teliani Valley', note: 'Reliable larger Georgian producer with good qvevri-made Rkatsiteli at accessible prices.', approxPrice: '£14–25' },
  ],

  'saperavi-georgia': [
    { name: 'Pheasant\'s Tears', note: 'Outstanding natural Saperavi with intense dark fruit and earthy complexity.', approxPrice: '£22–50' },
    { name: 'Château Mukhrani', note: 'Historic Georgian estate with impressive Saperavi; modern winemaking, traditional varieties.', approxPrice: '£16–35' },
    { name: 'Tbilvino', note: 'Reliable, widely available Georgian producer; Saperavi at good prices for everyday drinking.', approxPrice: '£12–22' },
  ],

  // ── ENGLAND ──

  'english-sparkling-blanc-de-blancs': [
    { name: 'Gusbourne', note: 'Outstanding Kent producer; their Blanc de Blancs is one of England\'s finest sparkling wines.', approxPrice: '£35–55' },
    { name: 'Bride Valley', note: 'Fine Dorset estate with outstanding Blanc de Blancs; precise, mineral, and elegant.', approxPrice: '£35–50' },
    { name: 'Harrow & Hope', note: 'Excellent Marlow estate with consistent Blanc de Blancs; great value among English sparkling wines.', approxPrice: '£30–45' },
  ],

  'english-sparkling-vintage': [
    { name: 'Nyetimber', note: 'The pioneering English sparkling estate; their Classic Cuvée and Blanc de Blancs are national benchmarks.', approxPrice: '£28–80' },
    { name: 'Chapel Down', note: 'One of England\'s largest producers; Kit\'s Coty is their prestige single-vineyard expression.', approxPrice: '£25–80' },
    { name: 'Camel Valley', note: 'Cornwall\'s finest sparkling wine estate; their Brut and Blanc de Blancs are consistently excellent.', approxPrice: '£28–50' },
  ],

  'english-bacchus': [
    { name: 'Stopham', note: 'Outstanding Sussex Bacchus producer; their wine is crisp, gooseberry-laden, and beautifully made.', approxPrice: '£18–28' },
    { name: 'Davenport', note: 'Fine biodynamic English estate; their Horsmonden Dry White blends Bacchus with fine result.', approxPrice: '£16–25' },
    { name: 'Jenkyn Place', note: 'Reliable Hampshire estate with good Bacchus; elderflower, citrus, and grassy freshness.', approxPrice: '£18–28' },
  ],

  // ── SWITZERLAND ──

  'valais-chasselas': [
    { name: 'Marie-Thérèse Chappaz', note: 'Outstanding biodynamic Valais producer; their Fendant is among Switzerland\'s finest Chasselas.', approxPrice: '£22–45' },
    { name: 'Didier Joris', note: 'Fine Valais Chasselas with real minerality; traditional winemaking, excellent local reputation.', approxPrice: '£18–35' },
    { name: 'Provins', note: 'The large Valais co-op with reliable, well-made Chasselas at accessible prices.', approxPrice: '£14–25' },
  ],

  'valais-cornalin': [
    { name: 'Marie-Thérèse Chappaz', note: 'The finest Cornalin producer in Switzerland; deep, complex, and extraordinary for this alpine variety.', approxPrice: '£30–65' },
    { name: 'Jean-René Germanier', note: 'Outstanding Valais estate with good Cornalin; their Balavaud is a benchmark local wine.', approxPrice: '£22–45' },
    { name: 'Simon Maye', note: 'Traditional Valais producer with fine, authentic Cornalin; rustic, wild, and distinctive.', approxPrice: '£22–40' },
  ],

  // ── SLOVENIA ──

  'brda-rebula': [
    { name: 'Movia', note: 'The most famous Brda producer; their Rebula includes both skin-contact and traditional whites of note.', approxPrice: '£22–55' },
    { name: 'Marjan Simčič', note: 'Outstanding Brda estate with excellent Rebula; their Opoka cuvée is a world-class Slovenian white.', approxPrice: '£22–50' },
    { name: 'Klinec', note: 'Fine natural producer in Brda making mineral, complex Rebula from organically farmed vines.', approxPrice: '£20–40' },
  ],

// ── USA ──

  'napa-rutherford-cabernet': [
    { name: 'Beaulieu Vineyard (Georges de Latour)', note: 'Historic Rutherford estate; the Private Reserve is a Napa icon built on "Rutherford Dust" terroir.', approxPrice: '£80–200' },
    { name: 'Caymus Vineyards', note: 'Benchmark Napa Cabernet from a Rutherford specialist; plush, consistent, and widely admired.', approxPrice: '£60–120' },
    { name: 'Staglin Family', note: 'Outstanding small estate in Rutherford; their Estate Cabernet is structured, complex, and age-worthy.', approxPrice: '£100–250' },
  ],

  'napa-oakville-cabernet': [
    { name: 'Opus One', note: 'The famous Mondavi/Rothschild joint venture; the definitive Oakville Cabernet blend, consistently excellent.', approxPrice: '£200–400' },
    { name: 'Harlan Estate', note: 'Napa\'s most sought-after cult wine; extraordinary concentration and complexity from Oakville hillside vines.', approxPrice: '£600–2000' },
    { name: 'Dalla Valle', note: 'Outstanding boutique Oakville estate; Maya and Estate Cabernet are benchmarks for the district.', approxPrice: '£150–400' },
  ],

  'napa-stags-leap-cabernet': [
    { name: 'Stag\'s Leap Wine Cellars', note: 'Famous from the 1976 Paris Tasting; Cask 23 remains a benchmark for the district\'s elegant style.', approxPrice: '£80–250' },
    { name: 'Shafer', note: 'Outstanding Stags Leap Cabernet; Hillside Select is one of Napa\'s most consistent and celebrated wines.', approxPrice: '£120–300' },
    { name: 'Pine Ridge', note: 'Reliable Stags Leap Cabernet from a respected estate; Epitome is their flagship, Estate a reliable step-down.', approxPrice: '£45–150' },
  ],

  'napa-howell-mountain': [
    { name: 'Dunn Vineyards', note: 'The definitive Howell Mountain producer; powerful, tannic Cabernet requiring 15+ years of cellaring.', approxPrice: '£80–200' },
    { name: 'La Jota', note: 'Excellent mountain Cabernet with great depth; their Anniversary Release is outstanding.', approxPrice: '£60–150' },
    { name: 'Black Sears', note: 'Small estate making concentrated, intense Howell Mountain Cabernet from volcanic soils.', approxPrice: '£70–150' },
  ],

  'napa-chardonnay': [
    { name: 'Kongsgaard', note: 'Cult Napa Chardonnay producer; their Rule and Estate wines are among California\'s finest whites.', approxPrice: '£80–200' },
    { name: 'Peter Michael (Ma Belle-Fille)', note: 'French-influenced Napa Chardonnay of exceptional quality; complex, mineral, outstanding.', approxPrice: '£80–180' },
    { name: 'Stony Hill', note: 'Historic unoaked Napa Chardonnay estate; their wines age beautifully and challenge the Burgundy greats.', approxPrice: '£45–90' },
  ],

  'sonoma-pinot-russian-river': [
    { name: 'Williams Selyem', note: 'The estate that made Russian River Pinot famous; their single-vineyard wines are benchmarks.', approxPrice: '£55–150' },
    { name: 'Rochioli', note: 'Founding estate of the Russian River Pinot movement; West Block is their most coveted wine.', approxPrice: '£55–200' },
    { name: 'Kosta Browne', note: 'Cult Russian River producer; concentrated, hedonistic Pinot Noir with devoted following.', approxPrice: '£60–120' },
  ],

  'sonoma-coast-pinot': [
    { name: 'Littorai', note: 'Outstanding biodynamic Sonoma Coast Pinot; Ted Lemon\'s wines are benchmark expressions of cool-climate finesse.', approxPrice: '£55–120' },
    { name: 'Flowers', note: 'Pioneer of the true Sonoma Coast; sea-facing vineyard Pinots with extraordinary mineral intensity.', approxPrice: '£45–100' },
    { name: 'Ceritas', note: 'Small-batch Sonoma Coast Pinot from high-elevation sites; elegant, site-specific, and critically acclaimed.', approxPrice: '£50–100' },
  ],

  'sonoma-chardonnay-rr': [
    { name: 'Rochioli', note: 'The Russian River Chardonnay benchmark; their estate Chardonnay shows the valley\'s finest expression.', approxPrice: '£55–120' },
    { name: 'Williams Selyem', note: 'Outstanding RR Chardonnay alongside their famous Pinot; precise, mineral, and age-worthy.', approxPrice: '£45–100' },
    { name: 'Lynmar Estate', note: 'Fine Russian River Chardonnay from biodynamic farming; Quail Hill is their flagship single-vineyard.', approxPrice: '£35–70' },
  ],

  'sonoma-alexander-valley-cab': [
    { name: 'Jordan', note: 'The classic Alexander Valley Cabernet; elegant, Bordeaux-influenced, and consistently reliable.', approxPrice: '£35–70' },
    { name: 'Silver Oak', note: 'Benchmark American-oak-aged Alexander Valley Cabernet with devoted following; rich and approachable.', approxPrice: '£55–100' },
    { name: 'Stonestreet', note: 'Outstanding mountain Cabernet from the Alexander Valley; Estate is their flagship, serious and structured.', approxPrice: '£40–90' },
  ],

  'sonoma-zinfandel-dry-creek': [
    { name: 'Ridge Vineyards (Lytton Springs)', note: 'The benchmark Dry Creek Zinfandel; Lytton Springs is California\'s most celebrated old-vine expression.', approxPrice: '£35–70' },
    { name: 'Rafanelli', note: 'Historic Dry Creek estate making structured, age-worthy Zinfandel; mailing list only, hard to find.', approxPrice: '£30–55' },
    { name: 'Quivira', note: 'Biodynamic Dry Creek estate with excellent Zinfandel; Wine Creek Ranch is their flagship expression.', approxPrice: '£25–45' },
  ],

  'willamette-pinot-dundee-hills': [
    { name: 'Eyrie Vineyards', note: 'The pioneering Oregon Pinot estate; South Block Reserve from 1975 vines is a national landmark.', approxPrice: '£35–100' },
    { name: 'Domaine Drouhin Oregon', note: 'Burgundy\'s Drouhin family in Oregon; their Pinot Noir is benchmark Old World-meets-New World.', approxPrice: '£35–80' },
    { name: 'Adelsheim', note: 'Founding Willamette estate with excellent Dundee Hills Pinot; Quarter Mile Lane is their top single site.', approxPrice: '£30–70' },
  ],

  'willamette-pinot-eola-amity': [
    { name: 'Bethel Heights', note: 'Outstanding Eola-Amity estate; their Pinots show the district\'s characteristic mineral coolness.', approxPrice: '£28–65' },
    { name: 'Gran Moraine (A to Z)', note: 'Fine Yamhill-Carlton label with outstanding Eola-Amity Pinot; complex and well-structured.', approxPrice: '£30–60' },
    { name: 'Cristom', note: 'Biodynamic Eola-Amity estate with excellent named single-vineyard Pinots of real character.', approxPrice: '£35–80' },
  ],

  'willamette-pinot-gris': [
    { name: 'King Estate', note: 'Oregon\'s largest Pinot Gris specialist; their Signature series is the reliable benchmark.', approxPrice: '£18–35' },
    { name: 'Chehalem', note: 'Consistent Willamette Pinot Gris producer; their INOX unoaked is particularly crisp and fresh.', approxPrice: '£18–30' },
    { name: 'A to Z Wineworks', note: 'Reliable, affordable Oregon Pinot Gris; good everyday example of the state\'s signature white.', approxPrice: '£14–22' },
  ],

  'walla-walla-cabernet': [
    { name: 'Leonetti', note: 'The founding Walla Walla Cabernet estate; their Reserve is a Washington icon of great depth.', approxPrice: '£80–200' },
    { name: 'L\'Ecole No. 41', note: 'Reliable, excellent Walla Walla Cabernet from a consistent producer; Perigee is their flagship blend.', approxPrice: '£35–80' },
    { name: 'Pepper Bridge', note: 'Outstanding estate Cabernet from biodynamically farmed vineyards; structured and age-worthy.', approxPrice: '£45–90' },
  ],

  'columbia-valley-syrah': [
    { name: 'Andrew Will', note: 'Pioneering Washington Syrah from Chris Camarda; Two Blondes vineyard is their outstanding single-site.', approxPrice: '£35–80' },
    { name: 'K Vintners', note: 'Charles Smith\'s boutique label; The Creator and Motor City Kitty are benchmark cool-climate Syrahs.', approxPrice: '£35–90' },
    { name: 'Cayuse', note: 'Biodynamic Walla Walla estate; En Chamberlin and God Only Knows are cult Washington Syrahs.', approxPrice: '£55–150' },
  ],

  'santa-barbara-pinot': [
    { name: 'Sine Qua Non', note: 'Cult Santa Barbara producer; rare, expensive, and extraordinary Pinot Noir of global renown.', approxPrice: '£200–600' },
    { name: 'Sta. Rita Hills (Sanford)', note: 'Pioneer of Sta. Rita Hills Pinot; their Sanford & Benedict is a landmark California Pinot.', approxPrice: '£40–100' },
    { name: 'Sea Smoke', note: 'Outstanding Sta. Rita Hills estate; Southing is their top Pinot — concentrated, mineral, complex.', approxPrice: '£55–120' },
  ],

  'paso-robles-zinfandel': [
    { name: 'Turley', note: 'California\'s most celebrated Zinfandel specialist; their Dusi Vineyard Paso Zin is a benchmark.', approxPrice: '£35–80' },
    { name: 'Peachy Canyon', note: 'Reliable Paso Zinfandel at accessible prices; their Old Schoolhouse is a consistent favourite.', approxPrice: '£20–35' },
    { name: 'Epoch Estate', note: 'Outstanding modern Paso producer; their Zinfandel shows the district\'s warm richness with precision.', approxPrice: '£28–55' },
  ],

  // ── NEW ZEALAND ──

  'marlborough-sauvignon-wairau': [
    { name: 'Cloudy Bay', note: 'The wine that put Marlborough Sauvignon on the world map; still reliable and broadly available.', approxPrice: '£18–28' },
    { name: 'Seresin', note: 'Biodynamic Marlborough estate with excellent Sauvignon; their Rachel shows real texture and complexity.', approxPrice: '£18–32' },
    { name: 'Brancott Estate', note: 'Reliable, widely available Marlborough Sauvignon at good value prices.', approxPrice: '£12–20' },
  ],

  'marlborough-sauvignon-awatere': [
    { name: 'Vavasour', note: 'Pioneer of the Awatere Valley; their Sauvignon is more mineral and herbaceous than mainstream Marlborough.', approxPrice: '£16–28' },
    { name: 'Spy Valley', note: 'Outstanding Marlborough producer with good Awatere Sauvignon; Envoy is their prestige single-site.', approxPrice: '£18–35' },
    { name: 'Villa Maria (Cellar Selection)', note: 'Reliable large producer with good Awatere Sauvignon; consistent quality at accessible prices.', approxPrice: '£14–22' },
  ],

  'marlborough-pinot-noir': [
    { name: 'Seresin', note: 'Outstanding biodynamic Marlborough Pinot Noir; Momo is everyday, Leah and Sun & Moon are exceptional.', approxPrice: '£20–65' },
    { name: 'Dog Point', note: 'Fine Marlborough Pinot from an estate spun off from Cloudy Bay; serious and age-worthy.', approxPrice: '£25–45' },
    { name: 'Fromm', note: 'Swiss-owned Marlborough estate making outstanding Pinot Noir from low-yielding old vines.', approxPrice: '£28–60' },
  ],

  'central-otago-pinot': [
    { name: 'Felton Road', note: 'The benchmark Central Otago Pinot estate; Calvert and Cornish Point are world-class expressions.', approxPrice: '£35–90' },
    { name: 'Rippon', note: 'Historic estate on the shores of Lake Wānaka; their old-vine Mature Vine Pinot is extraordinary.', approxPrice: '£35–80' },
    { name: 'Mt Difficulty', note: 'Reliable, well-made Central Otago Pinot with good typicity; Target Gully is their single-vineyard standout.', approxPrice: '£22–55' },
  ],

  'central-otago-pinot-bannockburn': [
    { name: 'Felton Road (Block 5)', note: 'The most celebrated single-vineyard Bannockburn Pinot; Block 5 is a national treasure.', approxPrice: '£55–120' },
    { name: 'Carrick', note: 'Outstanding Bannockburn estate with biodynamic farming; their single-vineyard Pinots are exceptional.', approxPrice: '£30–70' },
    { name: 'Domain Road', note: 'Fine Bannockburn estate making structured, mineral Pinot Noir with excellent concentration.', approxPrice: '£28–55' },
  ],

  'central-otago-riesling': [
    { name: 'Felton Road', note: 'Their Dry Riesling from Bannockburn is a stunning expression — linear, mineral, age-worthy.', approxPrice: '£25–50' },
    { name: 'Rippon', note: 'Fine Riesling from ancient glacial soils on Lake Wānaka; crisp, mineral, beautifully balanced.', approxPrice: '£22–45' },
    { name: 'Two Paddocks', note: 'Sam Neill\'s estate; their Riesling is one of Central Otago\'s most consistent and elegant examples.', approxPrice: '£20–38' },
  ],

  'hawkes-bay-cabernet': [
    { name: 'Te Mata (Coleraine)', note: 'New Zealand\'s most celebrated red wine; Coleraine is a Bordeaux blend of world-class stature.', approxPrice: '£55–130' },
    { name: 'Ngatarawa (Glazebrook)', note: 'Fine Hawke\'s Bay Cabernet blend from an established estate; structured and age-worthy.', approxPrice: '£25–50' },
    { name: 'Trinity Hill (Homage)', note: 'Outstanding Hawke\'s Bay Cabernet Franc dominant blend; intense, mineral, and complex.', approxPrice: '£35–70' },
  ],

  'martinborough-pinot': [
    { name: 'Ata Rangi', note: 'The pioneer of Martinborough Pinot Noir; their Estate wine is a NZ classic of great consistency.', approxPrice: '£35–80' },
    { name: 'Dry River', note: 'Tiny, sought-after Martinborough estate making wines of extraordinary precision and ageing potential.', approxPrice: '£40–100' },
    { name: 'Palliser Estate', note: 'Reliable Martinborough Pinot at accessible prices; good typicity with earthy, red-fruit character.', approxPrice: '£22–40' },
  ],

  // ── AUSTRALIA ──

  'barossa-shiraz-old-vine': [
    { name: 'Penfolds (Grange)', note: 'Australia\'s most iconic wine; Grange is a multi-vineyard Shiraz of extraordinary complexity and longevity.', approxPrice: '£600–2000' },
    { name: 'Torbreck (RunRig)', note: 'Outstanding old-vine Barossa Shiraz with remarkable depth; RunRig contains Viognier for added perfume.', approxPrice: '£100–300' },
    { name: 'John Duval (Plexus)', note: 'Former Penfolds chief winemaker\'s own label; serious, concentrated old-vine Barossa Shiraz.', approxPrice: '£35–100' },
  ],

  'barossa-grenache': [
    { name: 'Langmeil (Freedom 1843)', note: 'From the world\'s oldest Grenache vines; concentrated, silky, and historically significant.', approxPrice: '£30–80' },
    { name: 'Cirillo (1850 Old Vine)', note: 'Extraordinary pre-phylloxera Grenache from the oldest known vines; intense, complex, benchmark.', approxPrice: '£45–120' },
    { name: 'Hentley Farm', note: 'Outstanding Barossa Grenache from multiple single-block bottlings; The Beast is their top wine.', approxPrice: '£25–70' },
  ],

  'eden-valley-riesling': [
    { name: 'Henschke (Julius)', note: 'The Eden Valley Riesling benchmark; Julius is tightly wound, mineral, and extraordinary with age.', approxPrice: '£25–55' },
    { name: 'Pewsey Vale', note: 'Outstanding Eden Valley Riesling from a high-altitude estate; The Contour is their top expression.', approxPrice: '£20–45' },
    { name: 'Mountadam', note: 'Fine, high-altitude Eden Valley Riesling with great freshness and mineral complexity.', approxPrice: '£18–35' },
  ],

  'clare-valley-riesling': [
    { name: 'Grosset (Polish Hill)', note: 'Australia\'s most celebrated Riesling; Polish Hill is a world-class wine of extraordinary precision.', approxPrice: '£30–70' },
    { name: 'Jim Barry (The Florita)', note: 'Outstanding Clare Valley Riesling from the famous Florita vineyard; intense, mineral, age-worthy.', approxPrice: '£25–55' },
    { name: 'Knappstein', note: 'Reliable, well-made Clare Valley Riesling at accessible prices; crisp, lime-driven, and food-friendly.', approxPrice: '£16–28' },
  ],

  'mclaren-vale-shiraz': [
    { name: 'Clarendon Hills (Astralis)', note: 'One of Australia\'s greatest wines; old-vine McLaren Vale Shiraz of extraordinary power and elegance.', approxPrice: '£120–400' },
    { name: 'd\'Arenberg (The Dead Arm)', note: 'Iconic McLaren Vale Shiraz from Chester Osborn\'s eccentric estate; rich, complex, highly decorated.', approxPrice: '£35–90' },
    { name: 'SC Pannell', note: 'Outstanding McLaren Vale producer making elegant, terroir-driven Shiraz with less extraction than peers.', approxPrice: '£22–55' },
  ],

  'mclaren-vale-gsm': [
    { name: 'Yangarra', note: 'Outstanding biodynamic McLaren Vale estate; their Rhône-inspired GSM blends are benchmark expressions.', approxPrice: '£20–55' },
    { name: 'SC Pannell', note: 'Fine McLaren Vale GSM with Grenache-forward style; elegant, lower-alcohol, and food-friendly.', approxPrice: '£20–45' },
    { name: 'Oliver\'s Taranga', note: 'Historic family estate with excellent GSM; Grenache-dominant blends of real character and value.', approxPrice: '£18–35' },
  ],

  'coonawarra-cabernet': [
    { name: 'Wynns (John Riddoch)', note: 'The benchmark Coonawarra Cabernet; John Riddoch is from the estate\'s oldest vines — powerful and age-worthy.', approxPrice: '£35–90' },
    { name: 'Katnook Estate', note: 'Fine Coonawarra Cabernet from a well-regarded estate; Odyssey is their top wine — structured and complex.', approxPrice: '£25–70' },
    { name: 'Balnaves', note: 'Outstanding small Coonawarra estate; The Tally is their exceptional single-block Cabernet.', approxPrice: '£30–80' },
  ],

  'yarra-valley-pinot': [
    { name: 'Coldstream Hills', note: 'Founded by wine critic James Halliday; their Reserve Pinot is a Yarra benchmark of consistent quality.', approxPrice: '£22–55' },
    { name: 'Mac Forbes', note: 'Outstanding natural Yarra Valley Pinot producer; single-village bottlings of great precision.', approxPrice: '£25–65' },
    { name: 'Yering Station', note: 'Reliable Yarra Valley estate with good Pinot Noir across multiple price tiers.', approxPrice: '£18–50' },
  ],

  'yarra-valley-chardonnay': [
    { name: 'Oakridge (864)', note: 'The Yarra Valley Chardonnay benchmark; 864 is a single-site wine of Burgundian precision.', approxPrice: '£35–80' },
    { name: 'Hoddles Creek', note: 'Outstanding organic Yarra Chardonnay with excellent freshness and mineral character.', approxPrice: '£22–45' },
    { name: 'Coldstream Hills', note: 'Reliable, well-made Yarra Chardonnay; Reserve shows good complexity and is fairly priced.', approxPrice: '£22–45' },
  ],

  'hunter-valley-semillon': [
    { name: 'Tyrrell\'s (Vat 1)', note: 'The Hunter Valley Semillon icon; Vat 1 is one of Australia\'s greatest and most age-worthy whites.', approxPrice: '£25–100' },
    { name: 'Brokenwood (ILR Reserve)', note: 'Outstanding Hunter Semillon requiring patience; ILR Reserve transforms magnificently with 10+ years.', approxPrice: '£22–60' },
    { name: 'McWilliam\'s (Lovedale)', note: 'Historic estate with excellent single-vineyard Hunter Semillon; outstanding aged releases.', approxPrice: '£20–55' },
  ],

  'great-southern-riesling': [
    { name: 'Frankland Estate', note: 'The pioneering Great Southern estate; their single-vineyard Rieslings are among Australia\'s finest.', approxPrice: '£20–45' },
    { name: 'Poacher\'s Ridge', note: 'Outstanding Great Southern Riesling from the Mount Barker subregion; mineral, precise, and well-priced.', approxPrice: '£18–35' },
    { name: 'Forest Hill', note: 'Consistent Great Southern Riesling with good terroir expression; reliable across all vintages.', approxPrice: '£18–32' },
  ],

  // ── SOUTH AFRICA ──

  'stellenbosch-cabernet': [
    { name: 'Kanonkop (Paul Sauer)', note: 'South Africa\'s most celebrated Cabernet blend; Paul Sauer is a national icon of extraordinary quality.', approxPrice: '£35–90' },
    { name: 'Rust en Vrede', note: 'Outstanding Stellenbosch estate with single-vineyard Cabernet; Estate is their flagship red.', approxPrice: '£30–70' },
    { name: 'Vergelegen', note: 'Historic estate with fine Cabernet; V is their prestige wine, GVB an excellent blend.', approxPrice: '£30–80' },
  ],

  'stellenbosch-pinotage': [
    { name: 'Kanonkop', note: 'The benchmark Pinotage producer; their Estate Pinotage is the variety\'s gold standard.', approxPrice: '£25–60' },
    { name: 'L\'Avenir', note: 'Outstanding Stellenbosch Pinotage with good typicity; consistently well-made and fairly priced.', approxPrice: '£18–40' },
    { name: 'Simonsig', note: 'Reliable, widely available Pinotage; Redhill is their top expression, excellent value.', approxPrice: '£16–35' },
  ],

  'stellenbosch-bordeaux-blend': [
    { name: 'Meerlust (Rubicon)', note: 'Rubicon is South Africa\'s classic Bordeaux blend; consistently excellent and age-worthy.', approxPrice: '£28–65' },
    { name: 'Waterford Estate', note: 'Outstanding Stellenbosch estate; Kevin Arnold is their flagship, a seriously structured blend.', approxPrice: '£25–60' },
    { name: 'Jordan (Cobblers Hill)', note: 'Fine Stellenbosch Bordeaux blend with good complexity; consistent and well-priced.', approxPrice: '£22–45' },
  ],

  'swartland-syrah': [
    { name: 'Sadie Family (Columella)', note: 'South Africa\'s most celebrated red; Columella is a Swartland Syrah-led blend of world standing.', approxPrice: '£80–250' },
    { name: 'Mullineux', note: 'Outstanding natural Swartland producer; Syrah from schist, iron, and granite terroirs are benchmarks.', approxPrice: '£30–100' },
    { name: 'David & Nadia', note: 'Fine biodynamic Swartland estate with excellent Syrah; elegant, mineral, and terroir-expressive.', approxPrice: '£28–65' },
  ],

  'swartland-chenin-blanc': [
    { name: 'Sadie Family (Palladius)', note: 'Their Swartland white blend is extraordinary; Palladius showcases Chenin with other varieties.', approxPrice: '£60–180' },
    { name: 'Mullineux (Old Vines)', note: 'Outstanding old-vine Swartland Chenin with different soil-type bottlings; benchmark natural whites.', approxPrice: '£25–80' },
    { name: 'A.A. Badenhorst (Secateurs)', note: 'Excellent everyday Swartland Chenin; Secateurs is their accessible, food-friendly expression.', approxPrice: '£16–30' },
  ],

  'hemel-en-aarde-pinot': [
    { name: 'Hamilton Russell', note: 'The Hemel-en-Aarde Pinot Noir pioneer; consistently South Africa\'s most Burgundian Pinot.', approxPrice: '£35–80' },
    { name: 'Crystallum', note: 'Outstanding natural Hemel-en-Aarde Pinot; Mabalel and The Agnes are benchmark expressions.', approxPrice: '£30–70' },
    { name: 'Storm Wines', note: 'Fine small-scale producer; their Hemel-en-Aarde Pinot is elegant, mineral, and age-worthy.', approxPrice: '£28–60' },
  ],

  'hemel-en-aarde-chardonnay': [
    { name: 'Hamilton Russell', note: 'Benchmark Hemel-en-Aarde Chardonnay alongside their Pinot; one of Africa\'s finest white wines.', approxPrice: '£35–75' },
    { name: 'Creation', note: 'Outstanding Hemel-en-Aarde Chardonnay with great precision; Art of Chardonnay is their flagship.', approxPrice: '£25–55' },
    { name: 'Bouchard Finlayson', note: 'Reliable, well-made Hemel-en-Aarde Chardonnay; Missionvale is their reserve expression.', approxPrice: '£22–50' },
  ],

  // ── ARGENTINA ──

  'mendoza-malbec-lujan': [
    { name: 'Achaval Ferrer (Malbec)', note: 'Luján benchmark; their single-vineyard Finca Bella Vista is among Argentina\'s finest Malbecs.', approxPrice: '£20–80' },
    { name: 'Catena Zapata (Adrianna)', note: 'Argentina\'s most celebrated estate; Adrianna Vineyard wines are globally iconic.', approxPrice: '£35–300' },
    { name: 'Clos de los Siete', note: 'Large, reliable Luján Malbec from Michel Rolland\'s Argentine project; rich and consistently well-made.', approxPrice: '£18–30' },
  ],

  'mendoza-uco-valley-malbec': [
    { name: 'Zuccardi (Valle de Uco)', note: 'Outstanding Uco Valley specialist; their Finca Perdriel and Aluvional bottlings are world-class.', approxPrice: '£30–120' },
    { name: 'Achaval Ferrer (Finca Mirador)', note: 'Fine high-altitude Uco Valley Malbec; more restrained and mineral than lower-elevation peers.', approxPrice: '£35–80' },
    { name: 'Clos Apalta (Uco)', note: 'Reliable high-altitude Malbec from Uco Valley; textured, fresh, and well-structured.', approxPrice: '£18–35' },
  ],

  'mendoza-malbec-altamira': [
    { name: 'Matías Riccitelli (Hyde & Sons)', note: 'Outstanding Altamira Malbec from single vineyard old vines; mineral, complex, world-class.', approxPrice: '£35–80' },
    { name: 'El Enemigo (Gran Enemigo)', note: 'Remarkable single-vineyard Gualtallary Malbec from Adrián Marchand; exceptional quality.', approxPrice: '£45–120' },
    { name: 'Zuccardi (Aluvional)', note: 'Top Altamira expression from Argentina\'s finest estate; stony soils give extraordinary complexity.', approxPrice: '£55–150' },
  ],

  'mendoza-torrontes-salta': [
    { name: 'Clos de Tres Marias', note: 'Outstanding high-altitude Salta Torrontés; intensely aromatic and delicate with remarkable elevation freshness.', approxPrice: '£16–30' },
    { name: 'Cuma (Michel Torino)', note: 'Reliable, widely available Salta Torrontés; consistent and good everyday value.', approxPrice: '£12–20' },
    { name: 'El Esteco', note: 'Fine Salta producer with excellent Torrontés; their Don David is their reliable expression.', approxPrice: '£14–25' },
  ],

  // ── CHILE ──

  'maipo-cabernet': [
    { name: 'Concha y Toro (Don Melchor)', note: 'Chile\'s most celebrated Cabernet; Don Melchor is an Andean Cabernet of world-class standing.', approxPrice: '£55–130' },
    { name: 'Almaviva', note: 'The Rothschild-Concha y Toro joint venture; Chile\'s answer to a first growth, consistently excellent.', approxPrice: '£80–200' },
    { name: 'Errazuriz (Don Maximiano)', note: 'Historic Aconcagua estate; Don Maximiano is a structured, elegant Cabernet of real distinction.', approxPrice: '£45–100' },
  ],

  'colchagua-carmenere': [
    { name: 'Casa Lapostolle (Clos Apalta)', note: 'Clos Apalta is Chile\'s greatest wine; Carmenere-dominant, aged in amphora, world-class complexity.', approxPrice: '£55–150' },
    { name: 'Montes (Purple Angel)', note: 'Outstanding Carmenere with intense concentration; the variety\'s most internationally celebrated expression.', approxPrice: '£35–80' },
    { name: 'Neyen', note: 'Benchmark old-vine Carmenere from pre-phylloxera Apalta vines; earthy, complex, and age-worthy.', approxPrice: '£30–65' },
  ],

  'casablanca-pinot-noir': [
    { name: 'Kingston Family', note: 'Outstanding Casablanca Pinot Noir from a consistent producer; their Lucero is a benchmark.', approxPrice: '£22–45' },
    { name: 'Viña Casablanca', note: 'Reliable, widely available Casablanca Pinot; Santa Isabel is their quality expression.', approxPrice: '£16–30' },
    { name: 'Cousiño-Macul', note: 'Good value Casablanca Pinot with typical red-fruit freshness; consistent and food-friendly.', approxPrice: '£14–25' },
  ],

  'casablanca-sauvignon-blanc': [
    { name: 'Veramonte', note: 'Reliable Casablanca Sauvignon Blanc at excellent value; crisp, herbal, and consistently well-made.', approxPrice: '£12–20' },
    { name: 'Kingston Family (Tobiano)', note: 'Outstanding Casablanca Sauvignon with real complexity; their Tobiano is a step above most Chilean SB.', approxPrice: '£20–35' },
    { name: 'Santa Rita (Medalla Real)', note: 'Reliable, well-priced Casablanca Sauvignon; good typicity and consistent quality.', approxPrice: '£14–22' },
  ],

  'itata-pais': [
    { name: 'De Martino (Viejas Tinajas)', note: 'Outstanding Itata Pais from clay amphora (tinajas); fresh, mineral, benchmark natural expression.', approxPrice: '£18–35' },
    { name: 'Cacique Maravilla', note: 'Artisanal Itata producer making traditional Pais of remarkable freshness and authenticity.', approxPrice: '£16–30' },
    { name: 'Gillmore (Reserva Pais)', note: 'Good value Itata Pais from an organic estate; light, fragrant, and ideal for chilled drinking.', approxPrice: '£14–25' },
  ],

  'maule-carignan': [
    { name: 'De Martino (Vigno Carignan)', note: 'Outstanding dry-farmed Maule Carignan from old bush vines; one of Chile\'s most exciting reds.', approxPrice: '£25–55' },
    { name: 'Garage Wine Co.', note: 'Natural, micro-production Maule Carignan of great character; sought-after and critically acclaimed.', approxPrice: '£25–55' },
    { name: 'Miguel Torres (Cordillera)', note: 'Reliable Maule Carignan blend; Cordillera showcases the variety\'s rustic Andean character well.', approxPrice: '£18–35' },
  ],
};
