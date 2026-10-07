import { describe, it, expect } from 'vitest';
import { MysticosResultBuilder } from '../src/result-builder.js';

describe('Combination Swap Verification Suite (Sections 44-49 & 67-70)', () => {
  it('combination (The Fool + 7 Pentacles) vs (The Fool + The Tower) produces distinct interaction relationships and distinct central tension statements', () => {
    // Combination A: The Fool + 7 Pentacles
    const resultA = MysticosResultBuilder.buildResult({
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

    // Combination B: The Fool + The Tower (Reversed)
    const resultB = MysticosResultBuilder.buildResult({
      domain: 'tarot',
      school: 'Rider-Waite-Smith',
      inputSummary: { cards: ['The Fool', 'The Tower'] },
      facts: [
        { key: 'cardCode', value: 'MAJOR_0', domain: 'tarot', source: 'draw' },
        { key: 'positionIndex', value: 0, domain: 'tarot', source: 'draw' },
        { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
        { key: 'cardCode', value: 'MAJOR_16', domain: 'tarot', source: 'draw' },
        { key: 'positionIndex', value: 1, domain: 'tarot', source: 'draw' },
        { key: 'isReversed', value: true, domain: 'tarot', source: 'draw' },
      ],
    });

    // 1. Relationships must be distinct
    expect(resultA.relationships.length).toBeGreaterThan(0);
    expect(resultB.relationships.length).toBeGreaterThan(0);

    const relDescriptionsA = resultA.relationships.map((r) => r.description);
    const relDescriptionsB = resultB.relationships.map((r) => r.description);

    expect(relDescriptionsA).not.toEqual(relDescriptionsB);
    expect(relDescriptionsA.some((d) => d.includes('SIG_REASSESSMENT_FATIGUE'))).toBe(true);
    expect(relDescriptionsA.some((d) => d.includes('SIG_RESISTING_COLLAPSE'))).toBe(false);

    expect(relDescriptionsB.some((d) => d.includes('SIG_RESISTING_COLLAPSE'))).toBe(true);
    expect(relDescriptionsB.some((d) => d.includes('SIG_REASSESSMENT_FATIGUE'))).toBe(false);

    // 2. Central Tension Statements must be distinct
    expect(resultA.mainStory.centralTension).toBeDefined();
    expect(resultB.mainStory.centralTension).toBeDefined();
    expect(resultA.mainStory.centralTension).not.toEqual(resultB.mainStory.centralTension);

    expect(resultA.mainStory.centralTension).toContain('7 Pentacles');
    expect(resultB.mainStory.centralTension).toContain('The Tower');

    // 3. Trait Tensions must also reflect differing opposing forces
    expect(resultA.tensions.length).toBeGreaterThan(0);
    expect(resultB.tensions.length).toBeGreaterThan(0);
    const traitsA = resultA.tensions.map((t) => t.traitB);
    const traitsB = resultB.tensions.map((t) => t.traitB);
    expect(traitsA).toContain('SIG_REASSESSMENT_FATIGUE');
    expect(traitsB).toContain('SIG_RESISTING_COLLAPSE');
    expect(traitsA).not.toEqual(traitsB);
  });
});
