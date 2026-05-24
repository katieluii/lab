// wines.ts — thin combiner: imports regional arrays, re-exports everything from wines-core
export type {
  Colour, Style, Acidity, TanninLevel, Body, WorldOrigin, FruitType, Descriptor,
  Wine, PaletteProfile, WineFeedback, WineArchetype,
} from './wines-core';

export {
  DESCRIPTOR_LABELS, FRUIT_LABELS, QUESTIONNAIRE_DESCRIPTORS,
  ACIDITY_SCALE, TANNIN_SCALE, BODY_SCALE,
  recommend, recommendWithFeedback, generateWhy,
  confidenceScore,
  ARCHETYPES, detectArchetype, fillProfileWithArchetype,
  detectGaps,
} from './wines-core';

import { WINES_FRANCE } from './wines-france';
import { WINES_ITALY } from './wines-italy';
import { WINES_IBERIA } from './wines-iberia';
import { WINES_EUROPE } from './wines-europe';
import { WINES_NEWWORLD } from './wines-newworld';

export const WINES = [
  ...WINES_FRANCE,
  ...WINES_ITALY,
  ...WINES_IBERIA,
  ...WINES_EUROPE,
  ...WINES_NEWWORLD,
];
