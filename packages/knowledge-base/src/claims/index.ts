import { AtomicClaim } from '../types/claim.js';
import { TAROT_CLAIMS } from './tarot.claims.js';
import { TUVI_CLAIMS } from './tuvi.claims.js';
import { ASTROLOGY_CLAIMS } from './astrology.claims.js';
import { NUMEROLOGY_CLAIMS } from './numerology.claims.js';

export * from './tarot.claims.js';
export * from './tuvi.claims.js';
export * from './astrology.claims.js';
export * from './numerology.claims.js';

export const ALL_CLAIMS: AtomicClaim[] = [
  ...TAROT_CLAIMS,
  ...TUVI_CLAIMS,
  ...ASTROLOGY_CLAIMS,
  ...NUMEROLOGY_CLAIMS,
];
