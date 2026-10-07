import { describe, it, expect } from 'vitest';
import { MysticosResultBuilder } from '../src/result-builder.js';
import { evaluateTarotSpread } from '@mystic/tarot-engine';

describe('Position Swap Verification Suite (Sections 44-49 & 67-70)', () => {
  it('placing 7 Pentacles at position 0 (Current state) vs position 1 (Challenge/Advice) alters interpretation headline, polarity, and action priorities', () => {
    // 1. MysticosResultBuilder Evaluation
    const pos0Result = MysticosResultBuilder.buildResult({
      domain: 'tarot',
      school: 'Rider-Waite-Smith',
      inputSummary: { positionName: 'Current state' },
      facts: [
        { key: 'cardCode', value: 'MINOR_PENTACLES_7', domain: 'tarot', source: 'draw' },
        { key: 'positionIndex', value: 0, domain: 'tarot', source: 'draw' },
        { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
      ],
    });

    const pos1Result = MysticosResultBuilder.buildResult({
      domain: 'tarot',
      school: 'Rider-Waite-Smith',
      inputSummary: { positionName: 'Challenge' },
      facts: [
        { key: 'cardCode', value: 'MINOR_PENTACLES_7', domain: 'tarot', source: 'draw' },
        { key: 'positionIndex', value: 1, domain: 'tarot', source: 'draw' },
        { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
      ],
    });

    // Verification 1: Headline change
    const headline0 = pos0Result.interpretations[0]?.headline;
    const headline1 = pos1Result.interpretations[0]?.headline;
    expect(headline0).toBeDefined();
    expect(headline1).toBeDefined();
    expect(headline0).not.toEqual(headline1);
    expect(headline1).toContain('7 Pentacles tại vị trí Thử Thách');

    // Verification 2: Polarity shift (supportive vs challenging)
    const polarity0 = pos0Result.interpretations[0]?.polarity;
    const polarity1 = pos1Result.interpretations[0]?.polarity;
    expect(polarity0).toBe('supportive');
    expect(polarity1).toBe('challenging');
    expect(polarity0).not.toEqual(polarity1);

    // Verification 3: Action Priority shift (STRATEGIC vs IMMEDIATE)
    const actionPriority0 = pos0Result.guidance[0]?.actionPriority;
    const actionPriority1 = pos1Result.guidance[0]?.actionPriority;
    expect(actionPriority0).toBe('STRATEGIC');
    expect(actionPriority1).toBe('IMMEDIATE');
    expect(actionPriority0).not.toEqual(actionPriority1);

    // 2. Tarot Spread Engine Verification
    const card = {
      cardCode: 'PENTACLES_07_7',
      name: 'Seven of Pentacles',
      arcana: 'MINOR' as const,
      suit: 'PENTACLES' as const,
      number: 7,
    };

    const spreadCurrent = evaluateTarotSpread(
      [{ positionIndex: 1, positionName: 'Hiện tại', card, isReversed: false }],
      'SINGLE'
    );
    const spreadChallenge = evaluateTarotSpread(
      [{ positionIndex: 1, positionName: 'Thách thức', card, isReversed: false }],
      'SINGLE'
    );

    expect(spreadCurrent.interpretations[0]?.statement).not.toEqual(
      spreadChallenge.interpretations[0]?.statement
    );
    expect(spreadCurrent.interpretations[0]?.polarity).toBe('supportive');
    expect(spreadChallenge.interpretations[0]?.polarity).toBe('tension');
  });
});
