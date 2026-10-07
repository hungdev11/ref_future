import { describe, it, expect } from 'vitest';
import { MysticosResultBuilder } from '../src/result-builder.js';
import { evaluateTarotSpread } from '@mystic/tarot-engine';

describe('COUNTERFACTUAL & ENTITY SWAP TEST SUITE (Section 27.B - 27.G)', () => {
  // --------------------------------------------------------------------------
  // 1. ENTITY SWAP (Section 27.B)
  // --------------------------------------------------------------------------
  describe('Entity Swap', () => {
    it('Tarot: swapping The Fool for The Tower produces completely distinct signals, patterns, and evidence', () => {
      const foolResult = MysticosResultBuilder.buildResult({
        domain: 'tarot',
        school: 'Rider-Waite-Smith',
        inputSummary: { card: 'The Fool' },
        facts: [
          { key: 'cardCode', value: 'MAJOR_0', domain: 'tarot', source: 'deck' },
          { key: 'positionIndex', value: 0, domain: 'tarot', source: 'spread' },
          { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
        ],
      });

      const towerResult = MysticosResultBuilder.buildResult({
        domain: 'tarot',
        school: 'Rider-Waite-Smith',
        inputSummary: { card: 'The Tower' },
        facts: [
          { key: 'cardCode', value: 'MAJOR_16', domain: 'tarot', source: 'deck' },
          { key: 'isReversed', value: true, domain: 'tarot', source: 'draw' },
        ],
      });

      // Patterns must differ
      expect(foolResult.patterns.map((p) => p.type)).toEqual(['SPONTANEOUS_INITIATIVE']);
      expect(towerResult.patterns.map((p) => p.type)).toEqual(['RESISTING_INEVITABLE_PURGE']);
      expect(foolResult.patterns).not.toEqual(towerResult.patterns);

      // Signals must have zero overlap
      const foolSignalTypes = foolResult.signals.map((s) => s.type);
      const towerSignalTypes = towerResult.signals.map((s) => s.type);
      expect(foolSignalTypes).toContain('SIG_RADICAL_BEGINNING');
      expect(towerSignalTypes).toContain('SIG_RESISTING_COLLAPSE');
      foolSignalTypes.forEach((sig) => expect(towerSignalTypes).not.toContain(sig));

      // Evidence provenance must trace to different rules
      expect(foolResult.evidence[0]?.ruleId).toBe('RUL_TAROT_FOOL_PRESENT');
      expect(towerResult.evidence[0]?.ruleId).toBe('RUL_TAROT_TOWER_REVERSED');
      expect(foolResult.evidence[0]?.ruleId).not.toEqual(towerResult.evidence[0]?.ruleId);

      // Interpretations must differ
      expect(foolResult.interpretations[0]?.headline).not.toEqual(
        towerResult.interpretations[0]?.headline
      );
    });

    it('Astrology: swapping Sun in Aries for Moon in Taurus alters signals and active patterns', () => {
      const ariesResult = MysticosResultBuilder.buildResult({
        domain: 'astrology',
        school: 'Classical Ptolemaic & Modern Synthesis',
        inputSummary: { planet: 'Sun in Aries' },
        facts: [
          { key: 'planets.sun.sign', value: 'Aries', domain: 'astrology', source: 'ephemeris' },
          { key: 'planets.sun.houseNumber', value: 1, domain: 'astrology', source: 'ephemeris' },
        ],
      });

      const taurusResult = MysticosResultBuilder.buildResult({
        domain: 'astrology',
        school: 'Classical Ptolemaic & Modern Synthesis',
        inputSummary: { planet: 'Moon in Taurus' },
        facts: [
          { key: 'planets.moon.sign', value: 'Taurus', domain: 'astrology', source: 'ephemeris' },
        ],
      });

      expect(ariesResult.patterns[0]?.type).toBe('PRIME_INITIATOR');
      expect(taurusResult.patterns[0]?.type).toBe('STEADFAST_HARBOR');

      expect(ariesResult.signals.map((s) => s.type)).toContain('SIG_ASSERTIVE_IDENTITY');
      expect(taurusResult.signals.map((s) => s.type)).toContain('SIG_SERENE_NURTURANCE');

      expect(ariesResult.interpretations[0]?.headline).not.toEqual(
        taurusResult.interpretations[0]?.headline
      );
    });

    it('Tu Vi: swapping Tử Vi for Hóa Kỵ in Mệnh palace alters polarity and pattern', () => {
      const tuViResult = MysticosResultBuilder.buildResult({
        domain: 'tuvi',
        school: 'Nam Phái Toàn Thư',
        inputSummary: { star: 'TU_VI' },
        facts: [
          { key: 'palaceName', value: 'Mệnh', domain: 'tuvi', source: 'chart' },
          { key: 'starCode', value: 'TU_VI', domain: 'tuvi', source: 'chart' },
          { key: 'brightness', value: 'M', domain: 'tuvi', source: 'chart' },
        ],
      });

      const hoaKyResult = MysticosResultBuilder.buildResult({
        domain: 'tuvi',
        school: 'Trung Châu Môn',
        inputSummary: { star: 'HOA_KY' },
        facts: [
          { key: 'palaceName', value: 'Mệnh', domain: 'tuvi', source: 'chart' },
          { key: 'starCode', value: 'HOA_KY', domain: 'tuvi', source: 'chart' },
        ],
      });

      expect(tuViResult.patterns[0]?.type).toBe('SOVEREIGN_AUTHORITY');
      expect(hoaKyResult.patterns[0]?.type).toBe('INTERNAL_KNOT');

      expect(tuViResult.signals.map((s) => s.type)).toContain('SIG_EXECUTIVE_COMMAND');
      expect(hoaKyResult.signals.map((s) => s.type)).toContain('SIG_OBSESSIVE_SCRUTINY');

      expect(tuViResult.interpretations[0]?.headline).not.toEqual(
        hoaKyResult.interpretations[0]?.headline
      );
    });

    it('Numerology: swapping Life Path 1 for Life Path 5 alters core signals and pattern', () => {
      const lp1Result = MysticosResultBuilder.buildResult({
        domain: 'numerology',
        school: 'Goodwin Analytical Numerology',
        inputSummary: { lifePath: 1 },
        facts: [
          { key: 'results.lifePath.finalValue', value: 1, domain: 'numerology', source: 'calc' },
        ],
      });

      const lp5Result = MysticosResultBuilder.buildResult({
        domain: 'numerology',
        school: 'Goodwin Analytical Numerology',
        inputSummary: { lifePath: 5 },
        facts: [
          { key: 'results.lifePath.finalValue', value: 5, domain: 'numerology', source: 'calc' },
        ],
      });

      expect(lp1Result.patterns[0]?.type).toBe('AUTONOMOUS_TRAILBLAZER');
      expect(lp5Result.patterns[0]?.type).toBe('DYNAMIC_CATALYST');

      expect(lp1Result.signals.map((s) => s.type)).toContain('SIG_LEADERSHIP_IMPULSE');
      expect(lp5Result.signals.map((s) => s.type)).toContain('SIG_DIVERSE_EXPLORATION');
    });
  });

  // --------------------------------------------------------------------------
  // 2. ORIENTATION SWAP (Section 27.D)
  // --------------------------------------------------------------------------
  describe('Orientation Swap', () => {
    it('Tarot buildResult: upright vs reversed orientation alters rule preconditions and pattern generation', () => {
      const towerUpright = MysticosResultBuilder.buildResult({
        domain: 'tarot',
        school: 'Rider-Waite-Smith',
        inputSummary: { card: 'The Tower', isReversed: false },
        facts: [
          { key: 'cardCode', value: 'MAJOR_16', domain: 'tarot', source: 'deck' },
          { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
        ],
      });

      const towerReversed = MysticosResultBuilder.buildResult({
        domain: 'tarot',
        school: 'Rider-Waite-Smith',
        inputSummary: { card: 'The Tower', isReversed: true },
        facts: [
          { key: 'cardCode', value: 'MAJOR_16', domain: 'tarot', source: 'deck' },
          { key: 'isReversed', value: true, domain: 'tarot', source: 'draw' },
        ],
      });

      // Upright does not match RUL_TAROT_TOWER_REVERSED
      expect(towerUpright.technical.rulesMatchedCount).toBe(0);
      expect(towerUpright.patterns.length).toBe(0);

      // Reversed matches RUL_TAROT_TOWER_REVERSED
      expect(towerReversed.technical.rulesMatchedCount).toBe(1);
      expect(towerReversed.patterns.length).toBe(1);
      expect(towerReversed.patterns[0]?.type).toBe('RESISTING_INEVITABLE_PURGE');
      expect(towerReversed.signals.map((s) => s.type)).toContain('SIG_RESISTING_COLLAPSE');
    });

    it('Tarot Spread: orientation swap inverts polarity and yields distinct interpretations and guidance', () => {
      const uprightSpread = evaluateTarotSpread(
        [
          {
            positionIndex: 1,
            positionName: 'Hiện tại',
            card: { cardCode: 'SWORDS_01_ACE', name: 'Ace of Swords', arcana: 'MINOR', suit: 'SWORDS', number: 1 },
            isReversed: false,
          },
        ],
        'SINGLE'
      );

      const reversedSpread = evaluateTarotSpread(
        [
          {
            positionIndex: 1,
            positionName: 'Hiện tại',
            card: { cardCode: 'SWORDS_01_ACE', name: 'Ace of Swords', arcana: 'MINOR', suit: 'SWORDS', number: 1 },
            isReversed: true,
          },
        ],
        'SINGLE'
      );

      expect(uprightSpread.signals[0]?.polarity).toBe('constructive');
      expect(reversedSpread.signals[0]?.polarity).toBe('shadow');

      expect(uprightSpread.interpretations[0]?.polarity).toBe('supportive');
      expect(reversedSpread.interpretations[0]?.polarity).toBe('tension');

      expect(uprightSpread.interpretations[0]?.statement).not.toEqual(
        reversedSpread.interpretations[0]?.statement
      );

      expect(uprightSpread.guidance[0]?.actionPriority).not.toBeUndefined();
      expect(reversedSpread.guidance[0]?.actionPriority).not.toBeUndefined();
    });
  });

  // --------------------------------------------------------------------------
  // 3. POSITION SWAP (Section 27.C)
  // --------------------------------------------------------------------------
  describe('Position Swap', () => {
    it('Tarot buildResult: swapping position indices between cards alters rule triggering and result patterns', () => {
      // Configuration A: Fool at 0, Seven of Pentacles at 1
      const configA = MysticosResultBuilder.buildResult({
        domain: 'tarot',
        school: 'Rider-Waite-Smith',
        inputSummary: { cardAt0: 'The Fool', cardAt1: '7 Pentacles' },
        facts: [
          { key: 'cardCode', value: 'MAJOR_0', domain: 'tarot', source: 'deck' },
          { key: 'positionIndex', value: 0, domain: 'tarot', source: 'spread' },
          { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
        ],
      });

      // Swapping position: Fool at 1 instead of 0
      const foolAtPosition1 = MysticosResultBuilder.buildResult({
        domain: 'tarot',
        school: 'Rider-Waite-Smith',
        inputSummary: { cardAt1: 'The Fool' },
        facts: [
          { key: 'cardCode', value: 'MAJOR_0', domain: 'tarot', source: 'deck' },
          { key: 'positionIndex', value: 1, domain: 'tarot', source: 'spread' },
          { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
        ],
      });

      // Position 0 triggers RUL_TAROT_FOOL_PRESENT
      expect(configA.technical.rulesMatchedCount).toBe(1);
      expect(configA.patterns[0]?.type).toBe('SPONTANEOUS_INITIATIVE');

      // Position 1 does not trigger RUL_TAROT_FOOL_PRESENT because positionIndex != 0
      expect(foolAtPosition1.technical.rulesMatchedCount).toBe(0);
      expect(foolAtPosition1.patterns.length).toBe(0);

      // Now test Seven of Pentacles at Position 1 vs Position 0
      const pentaclesAt1 = MysticosResultBuilder.buildResult({
        domain: 'tarot',
        school: 'Rider-Waite-Smith',
        inputSummary: { cardAt1: '7 Pentacles' },
        facts: [
          { key: 'cardCode', value: 'MINOR_PENTACLES_7', domain: 'tarot', source: 'deck' },
          { key: 'positionIndex', value: 1, domain: 'tarot', source: 'spread' },
        ],
      });

      const pentaclesAt0 = MysticosResultBuilder.buildResult({
        domain: 'tarot',
        school: 'Rider-Waite-Smith',
        inputSummary: { cardAt0: '7 Pentacles' },
        facts: [
          { key: 'cardCode', value: 'MINOR_PENTACLES_7', domain: 'tarot', source: 'deck' },
          { key: 'positionIndex', value: 0, domain: 'tarot', source: 'spread' },
        ],
      });

      expect(pentaclesAt1.technical.rulesMatchedCount).toBe(1);
      expect(pentaclesAt1.patterns[0]?.type).toBe('EVALUATION_FRICTION');
      expect(pentaclesAt0.technical.rulesMatchedCount).toBe(0);
    });

    it('Tarot Spread: position swap produces position-specific contextual reasoning', () => {
      const card = {
        cardCode: 'PENTACLES_07_7',
        name: 'Seven of Pentacles',
        arcana: 'MINOR' as const,
        suit: 'PENTACLES' as const,
        number: 7,
      };

      const presentSpread = evaluateTarotSpread(
        [{ positionIndex: 0, positionName: 'Hiện tại', card, isReversed: false }],
        'SINGLE'
      );
      const challengeSpread = evaluateTarotSpread(
        [{ positionIndex: 1, positionName: 'Thách thức', card, isReversed: false }],
        'SINGLE'
      );

      expect(presentSpread.interpretations[0]?.statement).not.toEqual(
        challengeSpread.interpretations[0]?.statement
      );
      expect(presentSpread.interpretations[0]?.polarity).toBe('supportive');
      expect(challengeSpread.interpretations[0]?.polarity).toBe('tension');
    });
  });

  // --------------------------------------------------------------------------
  // 4. FACT PERTURBATION & REMOVE-ONE-INPUT (Section 27.F & 27.G)
  // --------------------------------------------------------------------------
  describe('Counterfactual Fact Perturbation & Remove-One-Input', () => {
    it('House number perturbation: changing houseNumber from 1 to 2 deactivates RUL_ASTRO_SUN_ARIES_H1', () => {
      const house1 = MysticosResultBuilder.buildResult({
        domain: 'astrology',
        school: 'Modern Humanistic Astrology',
        inputSummary: { sunSign: 'Aries', house: 1 },
        facts: [
          { key: 'planets.sun.sign', value: 'Aries', domain: 'astrology', source: 'ephemeris' },
          { key: 'planets.sun.houseNumber', value: 1, domain: 'astrology', source: 'ephemeris' },
        ],
      });

      const house2 = MysticosResultBuilder.buildResult({
        domain: 'astrology',
        school: 'Modern Humanistic Astrology',
        inputSummary: { sunSign: 'Aries', house: 2 },
        facts: [
          { key: 'planets.sun.sign', value: 'Aries', domain: 'astrology', source: 'ephemeris' },
          { key: 'planets.sun.houseNumber', value: 2, domain: 'astrology', source: 'ephemeris' },
        ],
      });

      expect(house1.technical.rulesMatchedCount).toBe(1);
      expect(house1.patterns[0]?.type).toBe('PRIME_INITIATOR');

      expect(house2.technical.rulesMatchedCount).toBe(0);
      expect(house2.patterns.length).toBe(0);
    });

    it('Orb threshold perturbation: orb 3.0 triggers RUL_ASTRO_SATURN_SQUARE_MARS, orb 7.5 does not', () => {
      const tightOrb = MysticosResultBuilder.buildResult({
        domain: 'astrology',
        school: 'Classical Ptolemaic',
        inputSummary: { aspect: 'SQUARE', orb: 3.0 },
        facts: [
          { key: 'aspects.mars_saturn.aspectType', value: 'SQUARE', domain: 'astrology', source: 'grid' },
          { key: 'aspects.mars_saturn.orb', value: 3.0, domain: 'astrology', source: 'grid' },
        ],
      });

      const wideOrb = MysticosResultBuilder.buildResult({
        domain: 'astrology',
        school: 'Classical Ptolemaic',
        inputSummary: { aspect: 'SQUARE', orb: 7.5 },
        facts: [
          { key: 'aspects.mars_saturn.aspectType', value: 'SQUARE', domain: 'astrology', source: 'grid' },
          { key: 'aspects.mars_saturn.orb', value: 7.5, domain: 'astrology', source: 'grid' },
        ],
      });

      expect(tightOrb.technical.rulesMatchedCount).toBe(1);
      expect(tightOrb.patterns[0]?.type).toBe('PRESSURE_ANVIL');
      expect(tightOrb.signals.map((s) => s.type)).toContain('SIG_HARDENED_RESILIENCE');

      expect(wideOrb.technical.rulesMatchedCount).toBe(0);
      expect(wideOrb.patterns.length).toBe(0);
    });

    it('Tu Vi brightness perturbation: miếu vượng đắc triggers SOVEREIGN_AUTHORITY, hãm địa does not', () => {
      const mieuVuong = MysticosResultBuilder.buildResult({
        domain: 'tuvi',
        school: 'Nam Phái Toàn Thư',
        inputSummary: { brightness: 'M' },
        facts: [
          { key: 'palaceName', value: 'Mệnh', domain: 'tuvi', source: 'chart' },
          { key: 'starCode', value: 'TU_VI', domain: 'tuvi', source: 'chart' },
          { key: 'brightness', value: 'M', domain: 'tuvi', source: 'chart' },
        ],
      });

      const hamDia = MysticosResultBuilder.buildResult({
        domain: 'tuvi',
        school: 'Nam Phái Toàn Thư',
        inputSummary: { brightness: 'H' },
        facts: [
          { key: 'palaceName', value: 'Mệnh', domain: 'tuvi', source: 'chart' },
          { key: 'starCode', value: 'TU_VI', domain: 'tuvi', source: 'chart' },
          { key: 'brightness', value: 'H', domain: 'tuvi', source: 'chart' },
        ],
      });

      expect(mieuVuong.technical.rulesMatchedCount).toBe(1);
      expect(mieuVuong.patterns[0]?.type).toBe('SOVEREIGN_AUTHORITY');

      expect(hamDia.technical.rulesMatchedCount).toBe(0);
      expect(hamDia.patterns.length).toBe(0);
    });

    it('Remove-one-input test (Section 27.F): removing Moon fact removes exactly its associated pattern and evidence', () => {
      const fullInput = MysticosResultBuilder.buildResult({
        domain: 'astrology',
        school: 'Classical Ptolemaic & Modern Synthesis',
        inputSummary: { hasSun: true, hasMoon: true },
        facts: [
          { key: 'planets.sun.sign', value: 'Aries', domain: 'astrology', source: 'ephemeris' },
          { key: 'planets.sun.houseNumber', value: 1, domain: 'astrology', source: 'ephemeris' },
          { key: 'planets.moon.sign', value: 'Taurus', domain: 'astrology', source: 'ephemeris' },
        ],
      });

      const removedMoon = MysticosResultBuilder.buildResult({
        domain: 'astrology',
        school: 'Classical Ptolemaic & Modern Synthesis',
        inputSummary: { hasSun: true, hasMoon: false },
        facts: [
          { key: 'planets.sun.sign', value: 'Aries', domain: 'astrology', source: 'ephemeris' },
          { key: 'planets.sun.houseNumber', value: 1, domain: 'astrology', source: 'ephemeris' },
        ],
      });

      // Full input has both rules matched
      expect(fullInput.technical.rulesMatchedCount).toBe(2);
      expect(fullInput.patterns.map((p) => p.type)).toContain('PRIME_INITIATOR');
      expect(fullInput.patterns.map((p) => p.type)).toContain('STEADFAST_HARBOR');

      // Removed Moon input has only Sun rule matched
      expect(removedMoon.technical.rulesMatchedCount).toBe(1);
      expect(removedMoon.patterns.map((p) => p.type)).toContain('PRIME_INITIATOR');
      expect(removedMoon.patterns.map((p) => p.type)).not.toContain('STEADFAST_HARBOR');

      // Evidence references accurately reflect removal
      expect(fullInput.evidence.length).toBe(2);
      expect(removedMoon.evidence.length).toBe(1);
      expect(removedMoon.evidence[0]?.ruleId).toBe('RUL_ASTRO_SUN_ARIES_H1');
    });
  });
});
