export interface Fact {
  key: string;
  value: unknown;
  domain: string;
  source: string;
}

export interface SemanticUnit {
  id: string;
  concept: string;
  keywords: string[];
  polarity: 'constructive' | 'shadow' | 'neutral' | 'tension';
  weight: number;
}

export interface Signal {
  signalId: string;
  type: string;
  polarity: 'supportive' | 'challenging' | 'neutral' | 'mixed';
  strength: number; // 0.0 -> 1.0
  ruleIds: string[];
  claimIds: string[];
  dimension: string;
  description?: string;
}

export type RelationshipType =
  | 'reinforcement'
  | 'contrast'
  | 'tension'
  | 'progression'
  | 'transition'
  | 'complementarity'
  | 'amplification'
  | 'mitigation';

export interface Relationship {
  relationshipId: string;
  type: RelationshipType;
  sourceSignalId: string;
  targetSignalId: string;
  description: string;
  intensity: number;
}

export interface Pattern {
  patternId: string;
  type: string;
  headline: string;
  signalIds: string[];
  relationshipIds: string[];
  dominance: number; // 0.0 -> 1.0
  contextFit: number;
}

export interface Interpretation {
  interpretationId: string;
  dimension: string;
  statementId: string;
  headline: string;
  statement: string;
  polarity: 'supportive' | 'challenging' | 'mixed' | 'context_dependent';
  strength: number;
  confidence: number;
  patternIds: string[];
  signalIds: string[];
  ruleIds: string[];
  evidenceIds: string[];
}

export interface PracticalImplication {
  implicationId: string;
  interpretationId: string;
  context: string;
  manifestation: string;
}

export interface Guidance {
  guidanceId: string;
  implicationId: string;
  actionPriority: 'IMMEDIATE' | 'STRATEGIC' | 'REFLECTIVE';
  whatToContinue: string[];
  whatToAdjustOrStop: string[];
  rationale: string;
}

export interface EvidenceReference {
  evidenceId: string;
  ruleId: string;
  claimId: string;
  sourceId: string;
  sourceTitle: string;
  citation: string;
  evidenceLevel: 'A' | 'B' | 'C' | 'D' | 'E';
}

export interface MysticosResult {
  resultId: string;
  domain: 'tarot' | 'astrology' | 'tuvi' | 'numerology' | 'compatibility';
  inputSummary: Record<string, unknown>;
  facts: Fact[];
  semantics: SemanticUnit[];
  signals: Signal[];
  relationships: Relationship[];
  patterns: Pattern[];
  tensions: Array<{ traitA: string; traitB: string; dynamics: string; resolution: string }>;
  interpretations: Interpretation[];
  implications: PracticalImplication[];
  guidance: Guidance[];
  evidence: EvidenceReference[];
  conflicts: Array<{ conflictId: string; topic: string; resolution: string }>;
  technical: {
    calculationTimeMs: number;
    rulesEvaluatedCount: number;
    rulesMatchedCount: number;
  };
  metadata: {
    engineVersion: string;
    knowledgeBaseVersion: string;
    rulesVersion: string;
    school: string;
    deterministic: true;
    calculatedAt: string;
  };
}

export type ResultDepth = 'DEPTH_1' | 'DEPTH_2' | 'DEPTH_3' | 'DEPTH_4' | 'DEPTH_5';

export interface MainStory {
  headline: string;
  narrative: string;
  centralTension?: string;
  focalEntity?: string;
}

export interface Scenario {
  scenarioId: string;
  title: string;
  trigger: string;
  patternIds: string[];
  likelyDynamic: string;
  tension?: string;
  constructiveResponse: string;
  evidenceIds: string[];
}

export interface DeepInterpretation extends Interpretation {
  depth: ResultDepth;
  explanation: string;
  constructiveExpression?: string;
  tension?: string;
  contextFitScore: number;
}

export interface NextSuggestedQuestion {
  question: string;
  context: string;
  targetDomain: string;
}

export interface DeepMysticosResult extends MysticosResult {
  mainStory: MainStory;
  primaryPatterns: Pattern[];
  secondaryPatterns: Pattern[];
  scenarios: Scenario[];
  deepInterpretations: DeepInterpretation[];
  nextQuestions?: NextSuggestedQuestion[];
}
