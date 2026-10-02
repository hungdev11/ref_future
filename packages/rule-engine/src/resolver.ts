import {
  RuleDefinition,
  RuleEvaluationTrace,
  ConditionEvaluationTrace,
  RuleStatus,
} from '@mystic/core';
import { evaluateConditionNode } from './evaluator.js';
import { calculateSpecificityScore } from './specificity.js';

export interface EvaluatedRuleOutcome {
  rule: RuleDefinition;
  passed: boolean;
  rankScore: number;
  trace: RuleEvaluationTrace;
}

export interface RuleResolutionResult {
  matchedRules: RuleDefinition[];
  skippedRules: EvaluatedRuleOutcome[];
  allTraces: RuleEvaluationTrace[];
}

export class DeterministicRuleResolver {
  public static resolve(
    rules: RuleDefinition[],
    facts: Record<string, unknown>,
    allowedStatuses: RuleStatus[] = [RuleStatus.PUBLISHED]
  ): RuleResolutionResult {
    const matchedOutcomes: EvaluatedRuleOutcome[] = [];
    const skippedRules: EvaluatedRuleOutcome[] = [];
    const allTraces: RuleEvaluationTrace[] = [];

    for (const rule of rules) {
      if (!allowedStatuses.includes(rule.status)) {
        continue;
      }

      const specificity = calculateSpecificityScore(rule.conditionAst);
      const evalResult = evaluateConditionNode(rule.conditionAst, facts);

      const conditionsEvaluated: ConditionEvaluationTrace[] = evalResult.traces.map((t) => ({
        field: t.field,
        operator: String(t.operator),
        expected: t.expected,
        actual: t.actual,
        passed: t.passed,
      }));

      const rankScore = rule.priority * 1000 + specificity;

      if (evalResult.passed) {
        const trace: RuleEvaluationTrace = {
          ruleCode: rule.ruleCode,
          status: 'MATCHED',
          priority: rule.priority,
          specificity,
          conditionsEvaluated,
        };
        allTraces.push(trace);
        matchedOutcomes.push({
          rule,
          passed: true,
          rankScore,
          trace,
        });
      } else {
        const failedCondition = evalResult.traces.find((t) => !t.passed);
        const skipReason = failedCondition
          ? `Condition failed on field '${failedCondition.field}': expected ${JSON.stringify(
              failedCondition.expected
            )}, actual ${JSON.stringify(failedCondition.actual)}`
          : 'Conditions evaluated to false';

        const trace: RuleEvaluationTrace = {
          ruleCode: rule.ruleCode,
          status: 'SKIPPED_CONDITION',
          priority: rule.priority,
          specificity,
          conditionsEvaluated,
          skipReason,
        };
        allTraces.push(trace);
        skippedRules.push({
          rule,
          passed: false,
          rankScore,
          trace,
        });
      }
    }

    matchedOutcomes.sort((a, b) => b.rankScore - a.rankScore);

    const finalMatchedRules: RuleDefinition[] = [];
    const seenInterpretations = new Set<string>();
    const domainSpecificChosen = new Map<string, EvaluatedRuleOutcome>();

    for (const outcome of matchedOutcomes) {
      const interpId = outcome.rule.action.targetInterpretationId;
      const domain = outcome.rule.action.domain;

      if (interpId && seenInterpretations.has(interpId)) {
        outcome.trace.status = 'SUPPRESSED_BY_PRIORITY';
        outcome.trace.skipReason = `Interpretation ID '${interpId}' already satisfied by higher rank rule`;
        continue;
      }

      if (domain) {
        const existing = domainSpecificChosen.get(domain);
        if (existing && outcome.rule.action.overrideGeneral) {
          continue;
        }
        if (!existing) {
          domainSpecificChosen.set(domain, outcome);
        }
      }

      if (interpId) {
        seenInterpretations.add(interpId);
      }
      finalMatchedRules.push(outcome.rule);
    }

    return {
      matchedRules: finalMatchedRules,
      skippedRules,
      allTraces,
    };
  }
}
