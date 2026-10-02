import { describe, it, expect } from 'vitest';
import {
  ConditionOperator,
  RuleStatus,
  RuleScope,
  RuleDefinition,
} from '@mystic/core';
import {
  evaluateConditionNode,
  getFactValue,
  calculateSpecificityScore,
  DeterministicRuleResolver,
  RuleSimulator,
} from '../src/index.js';

describe('Fact Value Resolution', () => {
  it('resolves direct keys and nested dot-notated keys', () => {
    const facts = {
      'flat.key': 'flatVal',
      astrology: {
        planets: {
          sun: { sign: 'LEO', degree: 14.5 },
        },
      },
    };

    expect(getFactValue(facts, 'flat.key')).toBe('flatVal');
    expect(getFactValue(facts, 'astrology.planets.sun.sign')).toBe('LEO');
    expect(getFactValue(facts, 'astrology.planets.sun.degree')).toBe(14.5);
    expect(getFactValue(facts, 'non.existent.path')).toBeUndefined();
  });
});

describe('AST Condition Evaluator', () => {
  it('evaluates EQUALS and NOT_EQUALS', () => {
    const facts = { 'sun.sign': 'LEO', 'moon.sign': 'PISCES' };

    const node1 = {
      field: 'sun.sign',
      operator: ConditionOperator.EQUALS,
      value: 'LEO',
    };
    expect(evaluateConditionNode(node1, facts).passed).toBe(true);

    const node2 = {
      field: 'sun.sign',
      operator: ConditionOperator.NOT_EQUALS,
      value: 'ARIES',
    };
    expect(evaluateConditionNode(node2, facts).passed).toBe(true);
  });

  it('evaluates numeric comparisons (GREATER_THAN, LESS_THAN, BETWEEN)', () => {
    const facts = { 'aspect.orb': 2.5, 'life_path.value': 7 };

    expect(
      evaluateConditionNode(
        { field: 'aspect.orb', operator: ConditionOperator.LESS_THAN, value: 3.0 },
        facts
      ).passed
    ).toBe(true);

    expect(
      evaluateConditionNode(
        { field: 'life_path.value', operator: ConditionOperator.BETWEEN, value: [1, 9] },
        facts
      ).passed
    ).toBe(true);
  });

  it('evaluates IN, CONTAINS, and EXISTS', () => {
    const facts = {
      'sun.sign': 'LEO',
      'tuvi.palace.stars': ['TU_VI', 'THIEN_PHU'],
      'ascendant.sign': 'SCORPIO',
    };

    expect(
      evaluateConditionNode(
        { field: 'sun.sign', operator: ConditionOperator.IN, value: ['ARIES', 'LEO', 'SAGITTARIUS'] },
        facts
      ).passed
    ).toBe(true);

    expect(
      evaluateConditionNode(
        { field: 'tuvi.palace.stars', operator: ConditionOperator.CONTAINS, value: 'TU_VI' },
        facts
      ).passed
    ).toBe(true);

    expect(
      evaluateConditionNode(
        { field: 'ascendant.sign', operator: ConditionOperator.EXISTS, value: true },
        facts
      ).passed
    ).toBe(true);
  });

  it('evaluates compound AND, OR, and NOT trees', () => {
    const facts = {
      'sun.sign': 'LEO',
      'moon.sign': 'PISCES',
      'ascendant.sign': 'SCORPIO',
    };

    const tree = {
      combinator: 'AND' as const,
      conditions: [
        { field: 'sun.sign', operator: ConditionOperator.EQUALS, value: 'LEO' },
        {
          combinator: 'OR' as const,
          conditions: [
            { field: 'moon.sign', operator: ConditionOperator.EQUALS, value: 'ARIES' },
            { field: 'moon.sign', operator: ConditionOperator.EQUALS, value: 'PISCES' },
          ],
        },
        {
          combinator: 'NOT' as const,
          conditions: [
            { field: 'ascendant.sign', operator: ConditionOperator.EQUALS, value: 'TAURUS' },
          ],
        },
      ],
    };

    expect(evaluateConditionNode(tree, facts).passed).toBe(true);
  });
});

describe('Specificity Scoring', () => {
  it('assigns higher specificity to multi-clause conditions and aspects', () => {
    const singleRuleNode = {
      field: 'sun.sign',
      operator: ConditionOperator.EQUALS,
      value: 'LEO',
    };

    const specificRuleNode = {
      combinator: 'AND' as const,
      conditions: [
        { field: 'sun.sign', operator: ConditionOperator.EQUALS, value: 'LEO' },
        { field: 'moon.sign', operator: ConditionOperator.EQUALS, value: 'PISCES' },
        { field: 'astrology.aspect.sun_moon.orb', operator: ConditionOperator.LESS_THAN, value: 5.0 },
      ],
    };

    const score1 = calculateSpecificityScore(singleRuleNode);
    const score2 = calculateSpecificityScore(specificRuleNode);

    expect(score2).toBeGreaterThan(score1);
  });
});

describe('Deterministic Rule Resolution & Admin Simulation', () => {
  const sampleRules: RuleDefinition[] = [
    {
      ruleCode: 'ASTRO-001',
      ruleSetId: 'RULESET_ASTRO_V1',
      scope: RuleScope.ASTROLOGY,
      priority: 40,
      specificityScore: 10,
      status: RuleStatus.PUBLISHED,
      version: '1.0.0',
      description: 'Sun in Leo general identity',
      conditionAst: {
        field: 'sun.sign',
        operator: ConditionOperator.EQUALS,
        value: 'LEO',
      },
      action: {
        targetInterpretationId: 'INTERP_SUN_LEO',
        domain: 'OVERVIEW',
      },
      tags: ['sun', 'leo'],
    },
    {
      ruleCode: 'ASTRO-023',
      ruleSetId: 'RULESET_ASTRO_V1',
      scope: RuleScope.ASTROLOGY,
      priority: 80,
      specificityScore: 25,
      status: RuleStatus.PUBLISHED,
      version: '1.0.0',
      description: 'Sun Leo + Moon Pisces combination',
      conditionAst: {
        combinator: 'AND',
        conditions: [
          { field: 'sun.sign', operator: ConditionOperator.EQUALS, value: 'LEO' },
          { field: 'moon.sign', operator: ConditionOperator.EQUALS, value: 'PISCES' },
        ],
      },
      action: {
        targetInterpretationId: 'INTERP_SUN_LEO_MOON_PISCES',
        domain: 'OVERVIEW',
        overrideGeneral: true,
      },
      tags: ['sun', 'moon'],
    },
    {
      ruleCode: 'ASTRO-105',
      ruleSetId: 'RULESET_ASTRO_V1',
      scope: RuleScope.ASTROLOGY,
      priority: 50,
      specificityScore: 10,
      status: RuleStatus.PUBLISHED,
      version: '1.0.0',
      description: 'Moon in Capricorn',
      conditionAst: {
        field: 'moon.sign',
        operator: ConditionOperator.EQUALS,
        value: 'CAPRICORN',
      },
      action: {
        targetInterpretationId: 'INTERP_MOON_CAPRICORN',
        domain: 'EMOTIONAL',
      },
      tags: ['moon'],
    },
  ];

  it('resolves higher rank rule and explains skipped rules in simulator', () => {
    const inputFacts = {
      'sun.sign': 'LEO',
      'moon.sign': 'PISCES',
      'venus.sign': 'CANCER',
      'ascendant.sign': 'SCORPIO',
    };

    const simulation = RuleSimulator.simulate({
      facts: inputFacts,
      rules: sampleRules,
    });

    expect(simulation.totalRulesEvaluated).toBe(3);
    expect(simulation.matchedCount).toBeGreaterThanOrEqual(1);

    expect(simulation.matchedRules[0]?.ruleCode).toBe('ASTRO-023');

    const skipped105 = simulation.skippedRules.find((r) => r.ruleCode === 'ASTRO-105');
    expect(skipped105).toBeDefined();
    expect(skipped105?.reason).toContain("Condition failed on field 'moon.sign'");
  });
});
