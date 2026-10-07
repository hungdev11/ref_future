import { InterpretationRule } from '../types/rule.js';
import { TAROT_RULES } from './tarot.rules.js';
import { TUVI_RULES } from './tuvi.rules.js';
import { ASTROLOGY_RULES } from './astrology.rules.js';
import { NUMEROLOGY_RULES } from './numerology.rules.js';
import { COMPATIBILITY_RULES } from './compatibility.rules.js';

export * from './tarot.rules.js';
export * from './tuvi.rules.js';
export * from './astrology.rules.js';
export * from './numerology.rules.js';
export * from './compatibility.rules.js';

export const ALL_RULES: InterpretationRule[] = [
  ...TAROT_RULES,
  ...TUVI_RULES,
  ...ASTROLOGY_RULES,
  ...NUMEROLOGY_RULES,
  ...COMPATIBILITY_RULES,
];
