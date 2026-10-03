import { describe, it, expect } from 'vitest';
import {
  TAROT_SEMANTIC_PROFILES,
  getAuthenticTarotCardInsights,
  evaluateTarotSpread,
} from '@mystic/tarot-engine';
import {
  TUVI_STAR_PROFILES,
  TUVI_PALACE_PROFILES,
  evaluateTuViPalace,
} from '@mystic/tuvi-engine';
import {
  ASTROLOGY_PLANET_PROFILES,
  ASTROLOGY_ZODIAC_PROFILES,
  evaluatePlanetPlacement,
} from '@mystic/astrology-engine';
import {
  NUMEROLOGY_NUMBER_PROFILES,
  evaluateCoreNumbers,
} from '@mystic/numerology-engine';
import {
  MultiSystemCompatibilityEngine,
  ReadingResultComposer,
} from '../src/index.js';

describe('MASTER AUDIT: Semantic Profile Driven & Contextual Result Engine', () => {
  // --------------------------------------------------------------------------
  // 1. DATA VS PROSE AUDIT: Pure Semantic Data, No Pre-written Text Paragraphs
  // --------------------------------------------------------------------------
  it('Entity profiles store pure semantic properties (themes, dynamics, constructive, shadow) without pre-written paragraphs', () => {
    // Tarot
    for (const [code, profile] of Object.entries(TAROT_SEMANTIC_PROFILES)) {
      expect(profile.themes.length).toBeGreaterThan(0);
      expect(profile.constructive.length).toBeGreaterThan(0);
      expect(profile.shadow.length).toBeGreaterThan(0);
      expect(profile).not.toHaveProperty('uprightMeaningParagraph');
      expect(profile).not.toHaveProperty('reversedMeaningParagraph');
    }

    // Tu Vi
    for (const [code, profile] of Object.entries(TUVI_STAR_PROFILES)) {
      expect(profile.themes.length).toBeGreaterThan(0);
      expect(profile.constructive.length).toBeGreaterThan(0);
      expect(profile.shadow.length).toBeGreaterThan(0);
      expect(profile).not.toHaveProperty('cannedReading');
    }

    // Astrology
    for (const [code, profile] of Object.entries(ASTROLOGY_ZODIAC_PROFILES)) {
      expect(profile.themes.length).toBeGreaterThan(0);
      expect(profile.constructive.length).toBeGreaterThan(0);
      expect(profile.shadow.length).toBeGreaterThan(0);
      expect(profile).not.toHaveProperty('cannedReading');
    }

    // Numerology
    for (const [num, profile] of Object.entries(NUMEROLOGY_NUMBER_PROFILES)) {
      expect(profile.themes.length).toBeGreaterThan(0);
      expect(profile.constructive.length).toBeGreaterThan(0);
      expect(profile.shadow.length).toBeGreaterThan(0);
      expect(profile).not.toHaveProperty('cannedReading');
    }
  });

  // --------------------------------------------------------------------------
  // 2. ENTITY SWAP TEST: Different entity produces distinct signals & statement
  // --------------------------------------------------------------------------
  it('Entity Swap Test: Changing entity produces completely different signals, evidence and claims', () => {
    // Tarot: The Fool vs The Tower
    const foolResult = getAuthenticTarotCardInsights('MAJOR_00_FOOL', 'The Fool', 'MAJOR', 'Hiện Tại', false);
    const towerResult = getAuthenticTarotCardInsights('MAJOR_16_TOWER', 'The Tower', 'MAJOR', 'Hiện Tại', false);

    expect(foolResult.keywords).not.toEqual(towerResult.keywords);
    expect(foolResult.coreSummary).not.toEqual(towerResult.coreSummary);
    expect(foolResult.careerFinance).not.toEqual(towerResult.careerFinance);
    expect(foolResult.dos).not.toEqual(towerResult.dos);

    // Astro: Sun in Aries vs Sun in Pisces
    const ariesEval = evaluatePlanetPlacement('SUN', 'ARIES', 1);
    const piscesEval = evaluatePlanetPlacement('SUN', 'PISCES', 1);

    expect(ariesEval.statement).not.toEqual(piscesEval.statement);
    expect(ariesEval.signals[0]).not.toEqual(piscesEval.signals[0]);
    expect(ariesEval.context.signElement).toBe('FIRE');
    expect(piscesEval.context.signElement).toBe('WATER');
  });

  // --------------------------------------------------------------------------
  // 3. POSITION SWAP TEST: Same entity in different positions produces different interpretations
  // --------------------------------------------------------------------------
  it('Position Swap Test: Same card in CURRENT_SITUATION vs CHALLENGE vs ADVICE yields context-specific interpretations', () => {
    const cardCode = 'PENTACLES_07_7';
    const cardName = 'Seven of Pentacles';

    const spreadCurrent = evaluateTarotSpread(
      [{ positionIndex: 1, positionName: 'Hiện tại', card: { cardCode, name: cardName, arcana: 'MINOR', suit: 'PENTACLES', number: 7 }, isReversed: false }],
      'SINGLE'
    );
    const spreadChallenge = evaluateTarotSpread(
      [{ positionIndex: 1, positionName: 'Thách thức', card: { cardCode, name: cardName, arcana: 'MINOR', suit: 'PENTACLES', number: 7 }, isReversed: false }],
      'SINGLE'
    );
    const spreadAdvice = evaluateTarotSpread(
      [{ positionIndex: 1, positionName: 'Lời khuyên', card: { cardCode, name: cardName, arcana: 'MINOR', suit: 'PENTACLES', number: 7 }, isReversed: false }],
      'SINGLE'
    );

    const textCurrent = spreadCurrent.interpretations[0]?.statement;
    const textChallenge = spreadChallenge.interpretations[0]?.statement;
    const textAdvice = spreadAdvice.interpretations[0]?.statement;

    expect(textCurrent).toBeDefined();
    expect(textChallenge).toBeDefined();
    expect(textAdvice).toBeDefined();

    // Must be completely distinct contextual text
    expect(textCurrent).not.toEqual(textChallenge);
    expect(textCurrent).not.toEqual(textAdvice);
    expect(textChallenge).not.toEqual(textAdvice);

    // Polarity differences: challenge should reflect tension
    expect(spreadCurrent.interpretations[0]?.polarity).toBe('supportive');
    expect(spreadChallenge.interpretations[0]?.polarity).toBe('tension');
  });

  // --------------------------------------------------------------------------
  // 4. ORIENTATION SWAP TEST: Upright vs Reversed produces polarity & text shift
  // --------------------------------------------------------------------------
  it('Orientation Swap Test: Upright vs Reversed inverts polarity, triggers shadow tags and modifies guidance', () => {
    const uprightSpread = evaluateTarotSpread(
      [{ positionIndex: 1, positionName: 'Hiện tại', card: { cardCode: 'SWORDS_01_ACE', name: 'Ace of Swords', arcana: 'MINOR', suit: 'SWORDS', number: 1 }, isReversed: false }],
      'SINGLE'
    );
    const reversedSpread = evaluateTarotSpread(
      [{ positionIndex: 1, positionName: 'Hiện tại', card: { cardCode: 'SWORDS_01_ACE', name: 'Ace of Swords', arcana: 'MINOR', suit: 'SWORDS', number: 1 }, isReversed: true }],
      'SINGLE'
    );

    expect(uprightSpread.signals[0]?.polarity).toBe('constructive');
    expect(reversedSpread.signals[0]?.polarity).toBe('shadow');

    expect(uprightSpread.interpretations[0]?.polarity).toBe('supportive');
    expect(reversedSpread.interpretations[0]?.polarity).toBe('tension');

    expect(uprightSpread.interpretations[0]?.statement).not.toEqual(
      reversedSpread.interpretations[0]?.statement
    );
  });

  // --------------------------------------------------------------------------
  // 5. COMBINATION SWAP TEST: Element combinations trigger cross-system tension
  // --------------------------------------------------------------------------
  it('Combination Swap Test: Fire + Water produces tension while Fire + Fire produces energetic resonance', () => {
    const fireWaterSpread = evaluateTarotSpread(
      [
        { positionIndex: 1, positionName: 'Hiện tại', card: { cardCode: 'WANDS_01_ACE', name: 'Ace of Wands', arcana: 'MINOR', suit: 'WANDS', number: 1 }, isReversed: false },
        { positionIndex: 2, positionName: 'Mối quan hệ', card: { cardCode: 'CUPS_01_ACE', name: 'Ace of Cups', arcana: 'MINOR', suit: 'CUPS', number: 1 }, isReversed: false },
      ],
      'PAIR'
    );

    const fireFireSpread = evaluateTarotSpread(
      [
        { positionIndex: 1, positionName: 'Hiện tại', card: { cardCode: 'WANDS_01_ACE', name: 'Ace of Wands', arcana: 'MINOR', suit: 'WANDS', number: 1 }, isReversed: false },
        { positionIndex: 2, positionName: 'Mục tiêu', card: { cardCode: 'WANDS_04_4', name: 'Four of Wands', arcana: 'MINOR', suit: 'WANDS', number: 4 }, isReversed: false },
      ],
      'PAIR'
    );

    expect(fireWaterSpread.synthesis.crossCardTension).toContain('Lửa');
    expect(fireWaterSpread.synthesis.crossCardTension).toContain('Nước');
    expect(fireWaterSpread.synthesis.crossCardTension).not.toEqual(fireFireSpread.synthesis.crossCardTension);
  });

  // --------------------------------------------------------------------------
  // 6. DETERMINISM TEST: 100% Deterministic Over Repeated Executions
  // --------------------------------------------------------------------------
  it('Determinism Test: Same inputs always yield 100% identical outputs without random drift or LLM jitter', async () => {
    const personA = { name: 'Người A', birthDate: '1990-05-15', gender: 'MALE' as const };
    const personB = { name: 'Người B', birthDate: '1992-10-20', gender: 'FEMALE' as const };

    const run1 = await MultiSystemCompatibilityEngine.analyze(personA, personB, 'LOVE');
    const run2 = await MultiSystemCompatibilityEngine.analyze(personA, personB, 'LOVE');

    expect(JSON.stringify(run1)).toEqual(JSON.stringify(run2));
  });

  // --------------------------------------------------------------------------
  // 7. EVIDENCE TRACEABILITY TEST: Every conclusion traces back to rules & facts
  // --------------------------------------------------------------------------
  it('Evidence Traceability Test: Output contains full provenance and Evidence Graph', () => {
    const reading = ReadingResultComposer.compose({
      readingType: 'FULL_AUDIT',
      dotNotatedFacts: {
        'astrology.planets.sun.sign': 'LEO',
        'astrology.planets.moon.sign': 'PISCES',
        'numerology.core.life_path.value': 7,
      },
      inputSnapshot: { birthDate: '1990-08-10' },
    });

    expect(reading.structuredResult).toBeDefined();
    const result = reading.structuredResult!;

    // Signals exist and have rule and evidence links
    expect(result.signals.length).toBeGreaterThan(0);
    for (const sig of result.signals) {
      expect(sig.evidenceIds.length).toBeGreaterThan(0);
      expect(sig.ruleIds.length).toBeGreaterThan(0);
      expect(['constructive', 'shadow', 'neutral', 'tension', 'supportive']).toContain(sig.polarity);
    }

    // Evidence Graph exists and has connected nodes and edges
    expect(result.evidenceGraph).toBeDefined();
    expect(result.evidenceGraph!.nodes.length).toBeGreaterThan(0);
    expect(result.evidenceGraph!.edges.length).toBeGreaterThan(0);

    // Guidance exists and connects to trigger signals
    expect(result.guidance.length).toBeGreaterThan(0);
    for (const guide of result.guidance) {
      expect(guide.whatToContinue.length).toBeGreaterThan(0);
      expect(guide.rationale).toBeDefined();
    }
  });
});
