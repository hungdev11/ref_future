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

export interface RuleEvidenceGenerator {
  trait: string;
  effect: EvidenceEffect;
  weight: number;
  polarity?: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  domain?: string;
}

export interface RuleAction {
  targetInterpretationId: string;
  domain: string;
  weight?: string;
  tags?: string[];
  overrideGeneral?: boolean;
  evidenceGenerators?: RuleEvidenceGenerator[];
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

// =========================================================================
// EVIDENCE, TRAIT, INTERACTION & SYNTHESIS MODELS (require.md PART II)
// =========================================================================

export enum EvidenceEffect {
  AMPLIFY = 'AMPLIFY',
  REDUCE = 'REDUCE',
  SUPPORT = 'SUPPORT',
  OPPOSE = 'OPPOSE',
  TRIGGER = 'TRIGGER',
  MODERATE = 'MODERATE',
  CONFLICT = 'CONFLICT',
  NEUTRALIZE = 'NEUTRALIZE',
  DEPENDENCY = 'DEPENDENCY',
}

export interface EvidenceItem {
  evidenceId: string;
  trait: string;
  effect: EvidenceEffect;
  weight: number; // 0.0 -> 1.0
  domain: string;
  sourceRuleCode: string;
  specificity: number;
  relevance: number;
  polarity: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  confidence: number;
}

export enum TraitLevel {
  VERY_LOW = 'VERY_LOW',     // 0.00 - 0.20
  LOW = 'LOW',               // 0.21 - 0.40
  MODERATE = 'MODERATE',     // 0.41 - 0.60
  STRONG = 'STRONG',         // 0.61 - 0.80
  VERY_STRONG = 'VERY_STRONG'// 0.81 - 1.00
}

export interface TraitScore {
  trait: string;
  rawScore: number;
  normalizedScore: number; // 0.0 -> 1.0
  level: TraitLevel;
  domain: string;
  supportingRules: string[];
  opposingRules: string[];
}

export interface TraitProfile {
  personality: Record<string, number>;
  emotional: Record<string, number>;
  relationship: Record<string, number>;
  career: Record<string, number>;
  money: Record<string, number>;
  growth: Record<string, number>;
}

export interface TraitInteractionCondition {
  trait: string;
  operator: '>=' | '<=' | '==' | '>' | '<';
  value: number;
}

export interface TraitInteractionRule {
  ruleId: string;
  conditions: TraitInteractionCondition[];
  resultingTheme: string;
  domain: string;
  title: string;
  description: string;
  intensity: 'HIGH' | 'MEDIUM' | 'MODERATE';
}

export interface ContradictionItem {
  contradictionId: string;
  traitA: string;
  traitB: string;
  scoreA: number;
  scoreB: number;
  synthesisTheme: string;
  synthesisTitle: string;
  synthesisDescription: string;
  advice: string;
}

export interface SynthesisRule {
  ruleId: string;
  opposingTraits: [string, string];
  minThreshold: number;
  resultingTheme: string;
  title: string;
  description: string;
  advice: string;
}
