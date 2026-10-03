import { NextResponse } from 'next/server';
import { RuleSimulator } from '@mystic/rule-engine';
import {
  BASELINE_RULES,
  KNOWLEDGE_CATALOG,
  EvidenceEngine,
  TraitAggregator,
  TraitInteractionEngine,
  TraitSynthesisEngine,
  NarrativePlanner,
  QualityControlFilter,
} from '@mystic/interpretation-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { facts, rules, allowedStatuses } = body;
    const activeRules = rules && rules.length > 0 ? rules : BASELINE_RULES;
    const inputFacts = facts ?? {};

    // 1. Rule Engine Simulation
    const simulation = RuleSimulator.simulate({
      facts: inputFacts,
      rules: activeRules,
      allowedStatuses,
    });

    // 2. Personalization Engine Diagnostics
    const matchedDefinitions = (activeRules as any[]).filter((r: any) =>
      simulation.matchedRules.some((m: any) => m.ruleCode === r.ruleCode)
    );

    const evidenceList = EvidenceEngine.extractEvidence(
      matchedDefinitions,
      KNOWLEDGE_CATALOG,
      inputFacts
    );

    const { traitScores, profile } = TraitAggregator.aggregate(evidenceList);
    const interactions = TraitInteractionEngine.evaluate(traitScores);
    const syntheses = TraitSynthesisEngine.synthesize(traitScores);

    const sections = NarrativePlanner.plan({
      readingType: 'ADMIN_SIMULATION',
      matchedRules: matchedDefinitions,
      catalog: KNOWLEDGE_CATALOG,
      facts: inputFacts,
      evidenceList,
      traitScores,
      traitProfile: profile,
      interactions,
      syntheses,
      depth: 'DETAILED',
    });

    const qualityAudit = QualityControlFilter.audit(sections);

    return NextResponse.json({
      ...simulation,
      personalization: {
        evidenceList,
        traitScores,
        traitProfile: profile,
        interactions,
        syntheses,
        qualityAudit,
        sectionsCount: sections.length,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Rule simulation failed' }, { status: 400 });
  }
}
