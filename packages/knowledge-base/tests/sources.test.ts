import { describe, it, expect } from 'vitest';
import {
  ALL_SOURCES,
  TAROT_SOURCES,
  TUVI_SOURCES,
  ASTROLOGY_SOURCES,
  NUMEROLOGY_SOURCES,
} from '../src/sources/index.js';

describe('Source Registries (S0 - S2)', () => {
  it('contains primary classical S0 sources for all 4 primary domains', () => {
    const s0Sources = ALL_SOURCES.filter((s) => s.sourceLevel === 'S0');
    expect(s0Sources.length).toBeGreaterThanOrEqual(4);

    const tarotS0 = TAROT_SOURCES.find((s) => s.sourceLevel === 'S0');
    expect(tarotS0?.author).toContain('Arthur Edward Waite');

    const tuviS0 = TUVI_SOURCES.find((s) => s.sourceLevel === 'S0');
    expect(tuviS0?.title).toContain('Tử Vi Đẩu Số');

    const astroS0 = ASTROLOGY_SOURCES.find((s) => s.sourceLevel === 'S0');
    expect(astroS0?.title).toContain('Tetrabiblos');

    const numS0 = NUMEROLOGY_SOURCES.find((s) => s.sourceLevel === 'S0');
    expect(numS0?.school).toContain('Greek Arithmology');
  });

  it('has valid metadata on all registered sources with no empty required fields', () => {
    for (const source of ALL_SOURCES) {
      expect(source.sourceId).toMatch(/^SRC_[A-Z0-9_]+$/);
      expect(source.title.trim().length).toBeGreaterThan(0);
      expect(['S0', 'S1', 'S2']).toContain(source.sourceLevel);
      expect(source.accessDate).toBeDefined();
    }
  });

  it('differentiates ancient arithmology from modern Western numerology', () => {
    const ancient = NUMEROLOGY_SOURCES.find((s) => s.sourceId === 'SRC_NUM_PYTHAGORAS');
    const modern = NUMEROLOGY_SOURCES.find((s) => s.sourceId === 'SRC_NUM_GOODWIN');
    expect(ancient?.sourceLevel).toBe('S0');
    expect(modern?.sourceLevel).toBe('S2');
    expect(ancient?.school).not.toBe(modern?.school);
  });
});
