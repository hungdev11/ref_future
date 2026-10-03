import * as crypto from 'crypto';
import {
  ReadingOutput,
  ReadingSectionData,
  RuleDefinition,
  StructuredResult,
  SemanticSignal,
  ContextualInterpretation,
  StructuredSynthesis,
  PracticalGuidance,
  EvidenceGraph,
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

    // 8. Build Structured Semantic Result
    const signals: SemanticSignal[] = evidenceList.map((e, idx) => ({
      id: `sig_${e.evidenceId || idx}`,
      dimension: e.domain || 'personality',
      polarity: e.polarity === 'POSITIVE' ? 'constructive' : e.polarity === 'NEGATIVE' ? 'shadow' : 'neutral',
      strength: e.weight,
      source: e.sourceRuleCode,
      evidenceIds: [e.evidenceId],
      ruleIds: [e.sourceRuleCode],
      contextTags: [e.domain, e.trait],
      description: `${e.trait}: ${e.effect}`,
    }));

    const relationships = interactions.map((inter) => ({
      ruleId: inter.ruleId,
      theme: inter.theme,
      domain: inter.domain,
      title: inter.title,
      description: inter.description,
      intensity: inter.intensity,
    }));

    const dimensions = traitScores.map((ts) => ts.trait);

    const interpretations: ContextualInterpretation[] = sections.map((sec, idx) => ({
      id: `interp_${idx}`,
      dimension: String(sec.domain),
      headline: sec.title,
      statement: sec.renderedText,
      signals: signals.slice(0, 3).map((s) => s.id),
      evidenceIds: sec.provenanceTraces?.flatMap((p) => p.evidenceIds) ?? [],
      ruleIds: sec.sourceRuleCode ? [sec.sourceRuleCode] : [],
      polarity: 'supportive',
      strength: 0.85,
      context: {
        sectionOrder: sec.sectionOrder,
        domain: sec.domain,
        sourceReference: sec.sourceReference,
      },
    }));

    const structuredSynthesis: StructuredSynthesis = {
      dominantThemes: traitScores.slice(0, 3).map((ts) => ts.trait),
      reinforcements: interactions.map((inter) => ({
        theme: inter.theme,
        sources: [inter.ruleId],
        explanation: inter.description,
      })),
      tensions: syntheses.map((s) => ({
        traitA: s.traitA,
        traitB: s.traitB,
        dynamics: s.synthesisDescription,
        resolution: s.advice,
      })),
      coreDynamicStatement: syntheses[0]?.synthesisDescription || (sections[0]?.renderedText?.slice(0, 150) ?? 'Tổng luận hòa hợp đa diện.'),
    };

    const guidance: PracticalGuidance[] = sections
      .filter((s) => s.actionableAdvice)
      .map((s) => ({
        actionPriority: 'STRATEGIC',
        timeframe: 'TRUNG_HAN',
        rationale: s.explanation || s.renderedText.slice(0, 120),
        whatToContinue: [s.actionableAdvice!],
        whatToAdjustOrStop: s.laymanSummary ? [s.laymanSummary] : [],
        triggerSignals: signals.slice(0, 2).map((sig) => sig.id),
      }));

    const evidenceGraph: EvidenceGraph = {
      nodes: [
        ...evidenceList.map((e) => ({
          id: e.evidenceId,
          type: 'FEATURE' as const,
          label: `${e.trait} (${e.effect})`,
          metadata: { domain: e.domain, weight: e.weight },
        })),
        ...resolution.matchedRules.map((r) => ({
          id: r.ruleCode,
          type: 'RULE' as const,
          label: r.ruleCode,
          metadata: { priority: r.priority, specificity: r.specificityScore },
        })),
        ...signals.map((s) => ({
          id: s.id,
          type: 'SIGNAL' as const,
          label: `${s.dimension}: ${s.polarity}`,
          metadata: { strength: s.strength },
        })),
      ],
      edges: [
        ...evidenceList.map((e) => ({
          from: e.sourceRuleCode,
          to: e.evidenceId,
          relation: 'PRODUCES' as const,
          weight: e.weight,
        })),
        ...signals.map((s) => ({
          from: s.evidenceIds[0] || 'evidence',
          to: s.id,
          relation: 'DERIVED_FROM' as const,
        })),
      ],
    };

    const structuredResult: StructuredResult = {
      facts: Object.entries(facts).map(([key, value]) => ({ key, value })),
      signals,
      relationships,
      dimensions,
      interpretations,
      synthesis: structuredSynthesis,
      guidance,
      evidence: evidenceList,
      evidenceGraph,
      metadata: {
        engineVersion: request.engineVersion ?? '2.0.0',
        rulesVersion: request.rulesetVersion ?? 'RULESET_V2',
        deterministic: true,
        calculatedAt: new Date().toISOString(),
      },
    };

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
      structuredResult,
      createdAt: new Date().toISOString(),
    };
  }
}
