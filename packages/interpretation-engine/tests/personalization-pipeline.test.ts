import { describe, it, expect } from 'vitest';
import {
  ReadingResultComposer,
  EvidenceEngine,
  TraitAggregator,
  TraitInteractionEngine,
  TraitSynthesisEngine,
  KNOWLEDGE_CATALOG,
  BASELINE_RULES,
} from '../src/index.js';
import { TraitLevel } from '@mystic/core';

describe('Deterministic Personalization & Evidence Pipeline', () => {
  it('extracts weighted evidence correctly from matched rules', () => {
    const facts = {
      'astrology.planets.sun.sign': 'LEO',
      'astrology.planets.sun.degree': 14.5,
    };

    const rules = BASELINE_RULES.filter((r) => r.ruleCode === 'ASTRO-SUN-LEO-001');
    const evidence = EvidenceEngine.extractEvidence(rules, KNOWLEDGE_CATALOG, facts);

    expect(evidence.length).toBeGreaterThan(0);
    expect(evidence[0]!.trait).toBeDefined();
    expect(evidence[0]!.weight).toBeGreaterThan(0);
    expect(evidence[0]!.weight).toBeLessThanOrEqual(1.0);
    expect(evidence[0]!.sourceRuleCode).toBe('ASTRO-SUN-LEO-001');
  });

  it('aggregates evidence into bounded trait scores (0.0 to 1.0) and assigns correct levels', () => {
    const facts = {
      'astrology.planets.sun.sign': 'LEO',
      'numerology.core.life_path.value': 1,
    };

    const matched = BASELINE_RULES.filter(
      (r) => r.ruleCode === 'ASTRO-SUN-LEO-001' || r.ruleCode === 'NUM-LP-1-001'
    );
    const evidence = EvidenceEngine.extractEvidence(matched, KNOWLEDGE_CATALOG, facts);
    const { traitScores, profile } = TraitAggregator.aggregate(evidence);

    expect(traitScores.length).toBeGreaterThan(0);

    for (const score of traitScores) {
      expect(score.normalizedScore).toBeGreaterThanOrEqual(0.0);
      expect(score.normalizedScore).toBeLessThanOrEqual(1.0);
      expect(Object.values(TraitLevel)).toContain(score.level);
    }

    // Verify profile structure contains all domains
    expect(profile.personality).toBeDefined();
    expect(profile.career).toBeDefined();
    expect(profile.relationship).toBeDefined();
    expect(profile.growth).toBeDefined();
  });

  it('evaluates trait interactions when threshold conditions are met', () => {
    const syntheticTraitScores = [
      {
        trait: 'CONFIDENCE',
        rawScore: 0.7,
        normalizedScore: 0.75,
        level: TraitLevel.STRONG,
        domain: 'personality',
        supportingRules: ['R1'],
        opposingRules: [],
      },
      {
        trait: 'AMBITION',
        rawScore: 0.7,
        normalizedScore: 0.72,
        level: TraitLevel.STRONG,
        domain: 'career',
        supportingRules: ['R2'],
        opposingRules: [],
      },
      {
        trait: 'SELF_CRITICISM',
        rawScore: 0.5,
        normalizedScore: 0.52,
        level: TraitLevel.MODERATE,
        domain: 'personality',
        supportingRules: ['R3'],
        opposingRules: [],
      },
    ];

    const activeInteractions = TraitInteractionEngine.evaluate(syntheticTraitScores);
    expect(activeInteractions.some((i) => i.theme === 'AMBITION_WITH_PRESSURE')).toBe(true);
  });

  it('synthesizes opposing traits into reconciliation advice', () => {
    const syntheticTraitScores = [
      {
        trait: 'STABILITY_NEED',
        rawScore: 0.65,
        normalizedScore: 0.68,
        level: TraitLevel.STRONG,
        domain: 'relationship',
        supportingRules: ['R1'],
        opposingRules: [],
      },
      {
        trait: 'FREEDOM_NEED',
        rawScore: 0.62,
        normalizedScore: 0.65,
        level: TraitLevel.STRONG,
        domain: 'personality',
        supportingRules: ['R2'],
        opposingRules: [],
      },
    ];

    const contradictions = TraitSynthesisEngine.synthesize(syntheticTraitScores);
    expect(contradictions.length).toBeGreaterThan(0);
    const syn = contradictions[0]!;
    expect(syn.synthesisTheme).toBe('DYNAMIC_EQUILIBRIUM');
    expect(syn.advice).toContain('bệ phóng an toàn');
  });

  it('guarantees 100% provenance traceability across all rendered sections', () => {
    const facts = {
      'astrology.planets.sun.sign': 'LEO',
      'numerology.core.life_path.value': 1,
      'tuvi.palaces.menh.has_tu_vi': true,
    };

    const reading = ReadingResultComposer.compose({
      readingType: 'FULL_READING',
      dotNotatedFacts: facts,
      inputSnapshot: facts,
      depth: 'DETAILED',
    });

    expect(reading.sections.length).toBeGreaterThan(0);

    for (const section of reading.sections) {
      expect(section.provenanceTraces).toBeDefined();
      expect(section.provenanceTraces!.length).toBeGreaterThan(0);
      const trace = section.provenanceTraces![0]!;
      expect(trace.paragraphId).toMatch(/^PARA-\d+/);
      expect(trace.sourceRuleCodes.length).toBeGreaterThan(0);
      expect(trace.explanationWhy).toBeDefined();
    }

    expect(reading.qualityScore).toBeGreaterThanOrEqual(80);
    expect(reading.traitScores).toBeDefined();
    expect(reading.traitProfile).toBeDefined();
  });

  it('produces distinct personalized profiles and narratives for different users (User A != User B != User C)', () => {
    // User A: Leader Archetype (Sun Leo + LP 1)
    const userA = ReadingResultComposer.compose({
      readingType: 'FULL_READING',
      dotNotatedFacts: {
        'astrology.planets.sun.sign': 'LEO',
        'numerology.core.life_path.value': 1,
      },
      inputSnapshot: { user: 'A' },
      depth: 'DETAILED',
    });

    // User B: Empath/Intuitive Archetype (Moon Pisces + LP 11)
    const userB = ReadingResultComposer.compose({
      readingType: 'FULL_READING',
      dotNotatedFacts: {
        'astrology.planets.moon.sign': 'PISCES',
        'numerology.core.life_path.value': 11,
      },
      inputSnapshot: { user: 'B' },
      depth: 'DETAILED',
    });

    // User C: Sovereign / Builder Archetype (Tu Vi Menh + Hoa Loc)
    const userC = ReadingResultComposer.compose({
      readingType: 'FULL_READING',
      dotNotatedFacts: {
        'tuvi.palaces.menh.has_tu_vi': true,
        'tuvi.palaces.menh.has_hoa_loc': true,
      },
      inputSnapshot: { user: 'C' },
      depth: 'DETAILED',
    });

    // Verify narratives are distinct and not identical
    expect(userA.sections[0]!.title).not.toEqual(userB.sections[0]!.title);
    expect(userA.sections[0]!.title).not.toEqual(userC.sections[0]!.title);
    expect(userB.sections[0]!.title).not.toEqual(userC.sections[0]!.title);

    // Verify trait scores are unique per user
    const traitsA = userA.traitScores!.map((t) => t.trait);
    const traitsB = userB.traitScores!.map((t) => t.trait);
    expect(traitsA).not.toEqual(traitsB);

    // Verify determinism: repeating User A gives identical results
    const userARepeat = ReadingResultComposer.compose({
      readingType: 'FULL_READING',
      dotNotatedFacts: {
        'astrology.planets.sun.sign': 'LEO',
        'numerology.core.life_path.value': 1,
      },
      inputSnapshot: { user: 'A' },
      depth: 'DETAILED',
    });

    expect(userA.inputHash).toBe(userARepeat.inputHash);
    expect(userA.sections.map((s) => s.renderedText)).toEqual(
      userARepeat.sections.map((s) => s.renderedText)
    );
  });
});
