export enum ReadingDomain {
  OVERVIEW = 'OVERVIEW',
  STRENGTHS = 'STRENGTHS',
  CHALLENGES = 'CHALLENGES',
  LOVE = 'LOVE',
  CAREER = 'CAREER',
  FINANCE = 'FINANCE',
  SOCIAL = 'SOCIAL',
  REFLECTION = 'REFLECTION',
}

export interface ReadingSectionData {
  sectionOrder: number;
  domain: ReadingDomain;
  title: string;
  renderedText: string;
  sourceRuleCode: string;
  interpretationId: string;
  scope?: string;
  themes?: string[];
  actionableAdvice?: string;
  explanation?: string;
  sourceReference?: string;
  laymanSummary?: string;
}

export interface ConditionEvaluationTrace {
  field: string;
  operator: string;
  expected: unknown;
  actual: unknown;
  passed: boolean;
}

export interface RuleEvaluationTrace {
  ruleCode: string;
  status: 'MATCHED' | 'SKIPPED_CONDITION' | 'SUPPRESSED_BY_PRIORITY';
  priority: number;
  specificity: number;
  conditionsEvaluated: ConditionEvaluationTrace[];
  skipReason?: string;
}

export interface ReadingOutput {
  id: string;
  readingType: string;
  engineVersion: string;
  configVersion: string;
  rulesetVersion: string;
  inputHash: string;
  isDegraded: boolean;
  degradationWarnings: string[];
  sections: ReadingSectionData[];
  ruleTraces: RuleEvaluationTrace[];
  createdAt: string;
}
