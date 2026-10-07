import { describe, it, expect } from 'vitest';
import { MysticosResultBuilder } from '../src/result-builder.js';
import { ResultDepthEngine } from '../src/depth-engine.js';

describe('Depth Distribution Verification Suite (Sections 44-49 & 67-70)', () => {
  it('ResultDepthEngine maps gradient score to 5 differentiated depth tiers', () => {
    expect(ResultDepthEngine.calculateDepth(1.0, 1.0)).toBe('DEPTH_5');
    expect(ResultDepthEngine.calculateDepth(0.85, 0.75)).toBe('DEPTH_4');
    expect(ResultDepthEngine.calculateDepth(0.7, 0.6)).toBe('DEPTH_3');
    expect(ResultDepthEngine.calculateDepth(0.5, 0.45)).toBe('DEPTH_2');
    expect(ResultDepthEngine.calculateDepth(0.2, 0.2)).toBe('DEPTH_1');
  });

  it('generated result exhibits non-uniform depth distribution between primary and secondary patterns', () => {
    const multiCardResult = MysticosResultBuilder.buildResult({
      domain: 'tarot',
      school: 'Rider-Waite-Smith',
      inputSummary: { cards: ['The Fool', '7 Pentacles'] },
      facts: [
        { key: 'cardCode', value: 'MAJOR_0', domain: 'tarot', source: 'draw' },
        { key: 'positionIndex', value: 0, domain: 'tarot', source: 'draw' },
        { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
        { key: 'cardCode', value: 'MINOR_PENTACLES_7', domain: 'tarot', source: 'draw' },
        { key: 'positionIndex', value: 1, domain: 'tarot', source: 'draw' },
        { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
      ],
    });

    expect(multiCardResult.deepInterpretations.length).toBeGreaterThanOrEqual(2);

    const depths = multiCardResult.deepInterpretations.map((d) => d.depth);

    // 1. Proves non-uniform boilerplate (depths are not all identical)
    const uniqueDepths = new Set(depths);
    expect(uniqueDepths.size).toBeGreaterThan(1);

    // 2. Primary pattern receives elevated depth (DEPTH_4 or DEPTH_5)
    const primaryDepth = depths[0];
    expect(['DEPTH_4', 'DEPTH_5']).toContain(primaryDepth);

    // 3. Secondary points receive restrained/secondary depth (DEPTH_1, DEPTH_2, or DEPTH_3)
    const secondaryDepth = depths[1];
    expect(['DEPTH_1', 'DEPTH_2', 'DEPTH_3']).toContain(secondaryDepth);

    // 4. Primary and secondary pattern separation
    expect(multiCardResult.primaryPatterns.length).toBeGreaterThan(0);
    expect(multiCardResult.secondaryPatterns.length).toBeGreaterThan(0);
    expect(multiCardResult.primaryPatterns[0]?.dominance).toBeGreaterThan(
      multiCardResult.secondaryPatterns[0]?.dominance
    );
  });
});
