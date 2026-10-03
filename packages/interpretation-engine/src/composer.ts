import * as crypto from 'crypto';
import {
  ReadingOutput,
  ReadingSectionData,
  RuleDefinition,
} from '@mystic/core';
import { DeterministicRuleResolver } from '@mystic/rule-engine';
import { KNOWLEDGE_CATALOG, BASELINE_RULES, InterpretationDefinition } from './catalog.js';
import { EvidenceEngine } from './evidence-engine.js';
import { TraitAggregator } from './trait-aggregator.js';
import { TraitInteractionEngine } from './interaction-engine.js';
import { TraitSynthesisEngine } from './synthesis-engine.js';
import { NarrativePlanner, ReadingDepth } from './narrative-planner.js';
import { QualityControlFilter } from './quality-control.js';

export interface ComposeReadingRequest {
  readingType: string;
  dotNotatedFacts: Record<string, unknown>;
  inputSnapshot: Record<string, unknown>;
  rules?: RuleDefinition[];
  catalog?: Record<string, InterpretationDefinition>;
  depth?: ReadingDepth;
  seed?: string | number;
  isDegraded?: boolean;
  degradationWarnings?: string[];
  engineVersion?: string;
  configVersion?: string;
  rulesetVersion?: string;
}

export class ReadingResultComposer {
  public static compose(request: ComposeReadingRequest): ReadingOutput {
    const rules = request.rules ?? BASELINE_RULES;
    const catalog = request.catalog ?? KNOWLEDGE_CATALOG;
    const facts = request.dotNotatedFacts;
    const depth = request.depth ?? 'DETAILED';

    const inputHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(request.inputSnapshot))
      .digest('hex');

    const seed = request.seed ?? inputHash.slice(0, 8);

    // 1. Evaluate Rule Engine
    const resolution = DeterministicRuleResolver.resolve(rules, facts);

    // 2. Extract Evidence
    const evidenceList = EvidenceEngine.extractEvidence(
      resolution.matchedRules,
      catalog,
      facts
    );

    // 3. Aggregate Traits
    const { traitScores, profile: traitProfile } = TraitAggregator.aggregate(evidenceList);

    // 4. Evaluate Trait Interactions
    const interactions = TraitInteractionEngine.evaluate(traitScores);

    // 5. Evaluate Contradictions & Syntheses
    const syntheses = TraitSynthesisEngine.synthesize(traitScores);

    // 6. Plan Narrative & Assemble Sections with Provenance
    const sections: ReadingSectionData[] = NarrativePlanner.plan({
      readingType: request.readingType,
      matchedRules: resolution.matchedRules,
      catalog,
      facts,
      evidenceList,
      traitScores,
      traitProfile,
      interactions,
      syntheses,
      depth,
      seed,
    });

    // 7. Quality Control Audit
    const audit = QualityControlFilter.audit(sections);

    const warnings = [...(request.degradationWarnings ?? [])];
    if (!audit.passed) {
      warnings.push(`Chất lượng luận giải đạt ${audit.qualityScore}/100.`);
    }
    if (audit.genericPhrasesDetected.length > 0) {
      warnings.push(...audit.genericPhrasesDetected);
    }

    const readingId = `reading_${crypto.randomUUID().slice(0, 8)}`;

    return {
      id: readingId,
      readingType: request.readingType,
      engineVersion: request.engineVersion ?? '2.0.0',
      configVersion: request.configVersion ?? 'V2_EVIDENCE',
      rulesetVersion: request.rulesetVersion ?? 'RULESET_V2',
      inputHash,
      isDegraded: request.isDegraded ?? !audit.passed,
      degradationWarnings: warnings,
      sections,
      ruleTraces: resolution.allTraces,
      traitScores,
      traitProfile,
      activeSyntheses: syntheses,
      evidenceItems: evidenceList,
      qualityScore: audit.qualityScore,
      createdAt: new Date().toISOString(),
    };
  }
}
