import { describe, it, expect } from 'vitest';
import { MysticosResultBuilder } from '../src/result-builder.js';

describe('17-Layer MysticosResultBuilder', () => {
  it('builds a fully traceable MysticosResult with signals, relationships, patterns, and provenance', () => {
    const result = MysticosResultBuilder.buildResult({
      domain: 'astrology',
      inputSummary: { sunSign: 'Aries', moonSign: 'Taurus' },
      facts: [
        { key: 'planets.sun.sign', value: 'Aries', domain: 'astrology', source: 'ephemeris' },
        { key: 'planets.sun.houseNumber', value: 1, domain: 'astrology', source: 'ephemeris' },
      ],
      school: 'Classical Ptolemaic & Modern Synthesis',
    });

    expect(result.domain).toBe('astrology');
    expect(result.signals.length).toBeGreaterThan(0);
    expect(result.patterns.length).toBeGreaterThan(0);
    expect(result.interpretations.length).toBeGreaterThan(0);
    expect(result.guidance.length).toBeGreaterThan(0);
    expect(result.evidence.length).toBeGreaterThan(0);
    expect(result.evidence[0].sourceId).toBeDefined();
    expect(result.metadata.deterministic).toBe(true);
  });
});
