import { RuleDefinition, ConditionNode } from '../types/rules.js';
import { RuleEvaluationTrace } from '../types/readings.js';

export interface RuleEvaluationResult {
  matchedRules: RuleDefinition[];
  traces: RuleEvaluationTrace[];
}

export interface IRuleEngine {
  evaluateCondition(node: ConditionNode, facts: Record<string, unknown>): boolean;
  calculateSpecificity(node: ConditionNode): number;
  evaluateRules(rules: RuleDefinition[], facts: Record<string, unknown>): RuleEvaluationResult;
}
