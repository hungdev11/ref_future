import { EvidenceItem } from './rules.js';

export type SignalPolarity = 'constructive' | 'shadow' | 'neutral' | 'tension' | 'supportive';

export interface SemanticProfile {
  id: string;
  name: string;
  discipline: string;
  themes: string[];
  dynamics: string[];
  constructive: string[];
  shadow: string[];
  element?: string;
  polarity?: string;
  attributes?: Record<string, unknown>;
}

export interface SemanticSignal {
  id: string;
  dimension: string;
  polarity: SignalPolarity;
  strength: number; // 0.0 to 1.0 (authentic weight based on rules/dignity/aspect)
  source: string;
  evidenceIds: string[];
  ruleIds: string[];
  contextTags?: string[];
  description?: string;
}

export type EvidenceNodeType = 'RAW_FACT' | 'FEATURE' | 'RULE' | 'SIGNAL' | 'CONCLUSION';

export interface EvidenceGraphNode {
  id: string;
  type: EvidenceNodeType;
  label: string;
  metadata?: Record<string, unknown>;
}

export interface EvidenceGraphEdge {
  from: string;
  to: string;
  relation: 'PRODUCES' | 'SUPPORTS' | 'OPPOSES' | 'MODIFIES' | 'DERIVED_FROM';
  weight?: number;
}

export interface EvidenceGraph {
  nodes: EvidenceGraphNode[];
  edges: EvidenceGraphEdge[];
}

export interface ContextualInterpretation {
  id: string;
  dimension: string;
  headline?: string;
  statement: string;
  signals: string[];
  evidenceIds: string[];
  ruleIds: string[];
  polarity: 'supportive' | 'neutral' | 'tension';
  strength: number;
  confidence?: 'low' | 'moderate' | 'high';
  context: {
    question?: string;
    position?: string;
    period?: string;
    entityId?: string;
    [key: string]: unknown;
  };
}

export interface ThemeReinforcement {
  theme: string;
  sources: string[];
  explanation: string;
}

export interface TensionResolution {
  traitA: string;
  traitB: string;
  dynamics: string;
  resolution: string;
}

export interface StructuredSynthesis {
  dominantThemes: string[];
  reinforcements: ThemeReinforcement[];
  tensions: TensionResolution[];
  coreDynamicStatement: string;
  elementalBalance?: Record<string, number>;
}

export interface PracticalGuidance {
  actionPriority: 'IMMEDIATE' | 'STRATEGIC' | 'REFLECTIVE';
  timeframe: string;
  rationale: string;
  whatToContinue: string[];
  whatToAdjustOrStop: string[];
  triggerSignals: string[];
}

export interface StructuredResult {
  facts: unknown[];
  signals: SemanticSignal[];
  relationships: unknown[];
  dimensions: string[];
  interpretations: ContextualInterpretation[];
  synthesis: StructuredSynthesis;
  guidance: PracticalGuidance[];
  evidence: EvidenceItem[];
  evidenceGraph?: EvidenceGraph;
  metadata: {
    engineVersion: string;
    rulesVersion: string;
    deterministic: boolean;
    calculatedAt: string;
  };
}
