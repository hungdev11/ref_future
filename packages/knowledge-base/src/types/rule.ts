import { DomainType } from './source.js';

export type EvidenceLevel = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface RulePrecondition {
  field: string;
  operator: 'EQUALS' | 'NOT_EQUALS' | 'GREATER_THAN' | 'LESS_THAN' | 'IN' | 'CONTAINS' | 'BETWEEN';
  value: unknown;
}

export interface InterpretationRule {
  ruleId: string;
  domain: DomainType;
  school: string;
  sourceIds: string[];
  claimIds: string[];
  preconditions: RulePrecondition[];
  semanticInputs: string[];
  derivedSignals: string[];
  relationships?: string[];
  pattern?: string;
  polarity?: 'constructive' | 'shadow' | 'neutral' | 'tension' | 'supportive';
  priority: number;
  evidenceLevel: EvidenceLevel;
  confidence: 'verified' | 'supported' | 'uncertain' | 'conflicted';
  exceptions?: string[];
  notes?: string;
}
