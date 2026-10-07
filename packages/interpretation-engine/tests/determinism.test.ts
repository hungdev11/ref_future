import { describe, it, expect } from 'vitest';
import { MysticosResultBuilder, BuildResultParams } from '../src/result-builder.js';

describe('DETERMINISM TEST SUITE (Section 22 & 27.A)', () => {
  it('Tarot: executing buildResult 100 times with identical inputs produces bit-for-bit identical results', () => {
    const params: BuildResultParams = {
      domain: 'tarot',
      school: 'Rider-Waite-Smith',
      inputSummary: {
        cardCode: 'MAJOR_0',
        positionIndex: 0,
        isReversed: false,
      },
      facts: [
        { key: 'cardCode', value: 'MAJOR_0', domain: 'tarot', source: 'deck' },
        { key: 'positionIndex', value: 0, domain: 'tarot', source: 'spread' },
        { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
      ],
    };

    const baseline = MysticosResultBuilder.buildResult(params);

    expect(baseline.signals.length).toBeGreaterThan(0);
    expect(baseline.patterns.length).toBeGreaterThan(0);
    expect(baseline.interpretations.length).toBeGreaterThan(0);
    expect(baseline.guidance.length).toBeGreaterThan(0);
    expect(baseline.evidence.length).toBeGreaterThan(0);
    expect(baseline.metadata.deterministic).toBe(true);

    for (let run = 1; run <= 100; run++) {
      const next = MysticosResultBuilder.buildResult(params);

      expect(next.domain).toBe(baseline.domain);
      expect(next.signals).toEqual(baseline.signals);
      expect(next.relationships).toEqual(baseline.relationships);
      expect(next.patterns).toEqual(baseline.patterns);
      expect(next.interpretations).toEqual(baseline.interpretations);
      expect(next.implications).toEqual(baseline.implications);
      expect(next.guidance).toEqual(baseline.guidance);
      expect(next.evidence).toEqual(baseline.evidence);
      expect(next.semantics).toEqual(baseline.semantics);
      expect(next.technical.rulesMatchedCount).toBe(baseline.technical.rulesMatchedCount);
      expect(next.technical.rulesEvaluatedCount).toBe(baseline.technical.rulesEvaluatedCount);
    }
  });

  it('Astrology: executing buildResult 100 times with identical inputs produces bit-for-bit identical results', () => {
    const params: BuildResultParams = {
      domain: 'astrology',
      school: 'Classical Ptolemaic & Modern Synthesis',
      inputSummary: { sun: 'Aries', moon: 'Taurus', marsSaturnSquare: true },
      facts: [
        { key: 'planets.sun.sign', value: 'Aries', domain: 'astrology', source: 'ephemeris' },
        { key: 'planets.sun.houseNumber', value: 1, domain: 'astrology', source: 'ephemeris' },
        { key: 'planets.moon.sign', value: 'Taurus', domain: 'astrology', source: 'ephemeris' },
        { key: 'aspects.mars_saturn.aspectType', value: 'SQUARE', domain: 'astrology', source: 'aspect-grid' },
        { key: 'aspects.mars_saturn.orb', value: 3.2, domain: 'astrology', source: 'aspect-grid' },
      ],
    };

    const baseline = MysticosResultBuilder.buildResult(params);

    expect(baseline.signals.length).toBeGreaterThanOrEqual(4);
    expect(baseline.patterns.length).toBe(3);
    expect(baseline.relationships.length).toBeGreaterThan(0);

    for (let run = 1; run <= 100; run++) {
      const next = MysticosResultBuilder.buildResult(params);

      expect(next.signals).toEqual(baseline.signals);
      expect(next.relationships).toEqual(baseline.relationships);
      expect(next.patterns).toEqual(baseline.patterns);
      expect(next.interpretations).toEqual(baseline.interpretations);
      expect(next.guidance).toEqual(baseline.guidance);
      expect(next.evidence).toEqual(baseline.evidence);
    }
  });

  it('Tu Vi: executing buildResult 100 times with identical inputs produces bit-for-bit identical results', () => {
    const params: BuildResultParams = {
      domain: 'tuvi',
      school: 'Nam Phái Toàn Thư & Trung Châu Môn',
      inputSummary: { menhStar: 'TU_VI', hoaLocPalace: 'Tài Bạch', hoaKyPalace: 'Mệnh' },
      facts: [
        { key: 'palaceName', value: 'Mệnh', domain: 'tuvi', source: 'chart' },
        { key: 'starCode', value: 'TU_VI', domain: 'tuvi', source: 'chart' },
        { key: 'brightness', value: 'M', domain: 'tuvi', source: 'chart' },
      ],
    };

    const baseline = MysticosResultBuilder.buildResult(params);

    expect(baseline.signals.length).toBeGreaterThan(0);
    expect(baseline.patterns[0]?.type).toBe('SOVEREIGN_AUTHORITY');

    for (let run = 1; run <= 100; run++) {
      const next = MysticosResultBuilder.buildResult(params);

      expect(next.signals).toEqual(baseline.signals);
      expect(next.relationships).toEqual(baseline.relationships);
      expect(next.patterns).toEqual(baseline.patterns);
      expect(next.interpretations).toEqual(baseline.interpretations);
      expect(next.guidance).toEqual(baseline.guidance);
      expect(next.evidence).toEqual(baseline.evidence);
    }
  });

  it('Numerology: executing buildResult 100 times with identical inputs produces bit-for-bit identical results', () => {
    const params: BuildResultParams = {
      domain: 'numerology',
      school: 'Goodwin Analytical Numerology',
      inputSummary: { lifePath: 1, karmicDebts: [16] },
      facts: [
        { key: 'results.lifePath.finalValue', value: 1, domain: 'numerology', source: 'calc' },
        { key: 'karmicDebts', value: [16], domain: 'numerology', source: 'calc' },
      ],
    };

    const baseline = MysticosResultBuilder.buildResult(params);

    expect(baseline.signals.length).toBeGreaterThanOrEqual(2);
    expect(baseline.patterns.length).toBe(2);

    for (let run = 1; run <= 100; run++) {
      const next = MysticosResultBuilder.buildResult(params);

      expect(next.signals).toEqual(baseline.signals);
      expect(next.relationships).toEqual(baseline.relationships);
      expect(next.patterns).toEqual(baseline.patterns);
      expect(next.interpretations).toEqual(baseline.interpretations);
      expect(next.guidance).toEqual(baseline.guidance);
      expect(next.evidence).toEqual(baseline.evidence);
    }
  });

  it('Fact Order Invariance: permutations of facts array produce identical results', () => {
    const factsA = [
      { key: 'planets.sun.sign', value: 'Aries', domain: 'astrology' as const, source: 'ephemeris' },
      { key: 'planets.sun.houseNumber', value: 1, domain: 'astrology' as const, source: 'ephemeris' },
      { key: 'planets.moon.sign', value: 'Taurus', domain: 'astrology' as const, source: 'ephemeris' },
    ];

    const factsB = [
      { key: 'planets.moon.sign', value: 'Taurus', domain: 'astrology' as const, source: 'ephemeris' },
      { key: 'planets.sun.houseNumber', value: 1, domain: 'astrology' as const, source: 'ephemeris' },
      { key: 'planets.sun.sign', value: 'Aries', domain: 'astrology' as const, source: 'ephemeris' },
    ];

    const resA = MysticosResultBuilder.buildResult({
      domain: 'astrology',
      school: 'Classical Ptolemaic',
      inputSummary: {},
      facts: factsA,
    });

    const resB = MysticosResultBuilder.buildResult({
      domain: 'astrology',
      school: 'Classical Ptolemaic',
      inputSummary: {},
      facts: factsB,
    });

    expect(resA.signals).toEqual(resB.signals);
    expect(resA.relationships).toEqual(resB.relationships);
    expect(resA.patterns).toEqual(resB.patterns);
    expect(resA.interpretations).toEqual(resB.interpretations);
    expect(resA.guidance).toEqual(resB.guidance);
    expect(resA.evidence).toEqual(resB.evidence);
  });
});
