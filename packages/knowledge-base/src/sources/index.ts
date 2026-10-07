import { SourceRecord } from '../types/source.js';
import { TAROT_SOURCES } from './tarot.sources.js';
import { TUVI_SOURCES } from './tuvi.sources.js';
import { ASTROLOGY_SOURCES } from './astrology.sources.js';
import { NUMEROLOGY_SOURCES } from './numerology.sources.js';

export * from './tarot.sources.js';
export * from './tuvi.sources.js';
export * from './astrology.sources.js';
export * from './numerology.sources.js';

export const ALL_SOURCES: SourceRecord[] = [
  ...TAROT_SOURCES,
  ...TUVI_SOURCES,
  ...ASTROLOGY_SOURCES,
  ...NUMEROLOGY_SOURCES,
];
