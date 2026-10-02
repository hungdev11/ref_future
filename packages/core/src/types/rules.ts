export enum RuleScope {
  ASTROLOGY = 'ASTROLOGY',
  TUVI = 'TUVI',
  NUMEROLOGY = 'NUMEROLOGY',
  TAROT = 'TAROT',
  CROSS_SYSTEM = 'CROSS_SYSTEM',
  COMPATIBILITY = 'COMPATIBILITY',
}

export enum RuleStatus {
  DRAFT = 'DRAFT',
  TESTING = 'TESTING',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum ConditionOperator {
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS',
  GREATER_THAN = 'GREATER_THAN',
  GREATER_EQUAL = 'GREATER_EQUAL',
  LESS_THAN = 'LESS_THAN',
  LESS_EQUAL = 'LESS_EQUAL',
  BETWEEN = 'BETWEEN',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  CONTAINS = 'CONTAINS',
  EXISTS = 'EXISTS',
  MATCHES = 'MATCHES',
}

export interface LeafCondition {
  field: string;
  operator: ConditionOperator;
  value?: unknown;
}

export interface BranchCondition {
  combinator: 'AND' | 'OR' | 'NOT';
  conditions: ConditionNode[];
}

export type ConditionNode = LeafCondition | BranchCondition;

export function isBranchCondition(node: ConditionNode): node is BranchCondition {
  return 'combinator' in node && Array.isArray((node as BranchCondition).conditions);
}

export interface RuleAction {
  targetInterpretationId: string;
  domain: string;
  weight?: string;
  tags?: string[];
  overrideGeneral?: boolean;
}

export interface RuleDefinition {
  ruleCode: string;
  ruleSetId: string;
  scope: RuleScope;
  priority: number;
  specificityScore: number;
  status: RuleStatus;
  version: string;
  description: string;
  conditionAst: ConditionNode;
  action: RuleAction;
  tags: string[];
}
