import { RuleDefinition, RuleStatus } from '@mystic/core';
import { DeterministicRuleResolver } from './resolver.js';

export interface SimulationRequest {
  facts: Record<string, unknown>;
  rules: RuleDefinition[];
  allowedStatuses?: RuleStatus[];
}

export interface SimulationResult {
  totalRulesEvaluated: number;
  matchedCount: number;
  skippedCount: number;
  matchedRules: Array<{
    ruleCode: string;
    priority: number;
    specificity: number;
    targetInterpretationId: string;
    domain: string;
    conditionsEvaluated: unknown[];
  }>;
  skippedRules: Array<{
    ruleCode: string;
    priority: number;
    specificity: number;
    reason: string;
    conditionsEvaluated: unknown[];
  }>;
}

export class RuleSimulator {
  public static simulate(request: SimulationRequest): SimulationResult {
    const statuses = request.allowedStatuses ?? [
      RuleStatus.PUBLISHED,
      RuleStatus.TESTING,
      RuleStatus.DRAFT,
    ];

    const resolution = DeterministicRuleResolver.resolve(
      request.rules,
      request.facts,
      statuses
    );

    const matchedRules = resolution.matchedRules.map((r) => {
      const trace = resolution.allTraces.find((t) => t.ruleCode === r.ruleCode);
      return {
        ruleCode: r.ruleCode,
        priority: r.priority,
        specificity: trace?.specificity ?? 0,
        targetInterpretationId: r.action.targetInterpretationId,
        domain: r.action.domain,
        conditionsEvaluated: trace?.conditionsEvaluated ?? [],
      };
    });

    const skippedRules = resolution.skippedRules.map((s) => ({
      ruleCode: s.rule.ruleCode,
      priority: s.rule.priority,
      specificity: s.trace.specificity,
      reason: s.trace.skipReason ?? 'Condition requirements not met',
      conditionsEvaluated: s.trace.conditionsEvaluated,
    }));

    return {
      totalRulesEvaluated: request.rules.length,
      matchedCount: matchedRules.length,
      skippedCount: skippedRules.length,
      matchedRules,
      skippedRules,
    };
  }
}
