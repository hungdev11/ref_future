import {
  MysticosResult,
  Fact,
  SemanticUnit,
  Signal,
  Relationship,
  Pattern,
  Interpretation,
  PracticalImplication,
  Guidance,
  EvidenceReference,
} from '@mystic/core';
import { KnowledgeStore, ProvenanceTracer } from '@mystic/knowledge-base';

export interface BuildResultParams {
  domain: 'tarot' | 'astrology' | 'tuvi' | 'numerology' | 'compatibility';
  inputSummary: Record<string, unknown>;
  facts: Fact[];
  school: string;
}

export class MysticosResultBuilder {
  private static tracer = new ProvenanceTracer();

  public static buildResult(params: BuildResultParams): MysticosResult {
    const startTime = Date.now();
    const store = KnowledgeStore.getInstance();
    const domainRules = store.getRulesByDomain(params.domain);

    const factMap = new Map<string, unknown>();
    for (const f of params.facts) {
      factMap.set(f.key, f.value);
    }

    // 1. Match Rules
    const matchedRules = domainRules.filter((rule) => {
      return rule.preconditions.every((cond) => {
        const actual = factMap.get(cond.field);
        if (actual === undefined) return false;
        if (cond.operator === 'EQUALS') return actual === cond.value;
        if (cond.operator === 'NOT_EQUALS') return actual !== cond.value;
        if (cond.operator === 'IN' && Array.isArray(cond.value)) return cond.value.includes(actual);
        if (cond.operator === 'CONTAINS' && Array.isArray(actual)) return actual.includes(cond.value);
        if (cond.operator === 'BETWEEN' && Array.isArray(cond.value) && cond.value.length === 2 && typeof actual === 'number') {
          return actual >= (cond.value[0] as number) && actual <= (cond.value[1] as number);
        }
        if (cond.operator === 'LESS_THAN' && typeof actual === 'number' && typeof cond.value === 'number') {
          return actual < cond.value;
        }
        if (cond.operator === 'GREATER_THAN' && typeof actual === 'number' && typeof cond.value === 'number') {
          return actual > cond.value;
        }
        return false;
      });
    });

    // 2. Semantics & Signals
    const semantics: SemanticUnit[] = [];
    const signals: Signal[] = [];

    matchedRules.forEach((rule, idx) => {
      rule.semanticInputs.forEach((sem, sIdx) => {
        semantics.push({
          id: `SEM_${rule.ruleId}_${sIdx}`,
          concept: sem,
          keywords: [sem.replace(/_/g, ' ')],
          polarity: rule.polarity === 'shadow' ? 'shadow' : 'constructive',
          weight: rule.priority / 100,
        });
      });

      rule.derivedSignals.forEach((sigCode) => {
        signals.push({
          signalId: `SIG_${sigCode}_${idx}`,
          type: sigCode,
          polarity: rule.polarity === 'shadow' ? 'challenging' : 'supportive',
          strength: Math.min(1.0, rule.priority / 100),
          ruleIds: [rule.ruleId],
          claimIds: [...rule.claimIds],
          dimension: 'overview',
          description: rule.notes,
        });
      });
    });

    // 3. Relationships
    const relationships: Relationship[] = [];
    for (let i = 0; i < signals.length - 1; i++) {
      const s1 = signals[i];
      const s2 = signals[i + 1];
      if (!s1 || !s2) continue;
      relationships.push({
        relationshipId: `REL_${i}`,
        type: s1.polarity === s2.polarity ? 'reinforcement' : 'tension',
        sourceSignalId: s1.signalId,
        targetSignalId: s2.signalId,
        description: `Tương tác giữa ${s1.type} và ${s2.type}`,
        intensity: (s1.strength + s2.strength) / 2,
      });
    }

    // 4. Patterns
    const patterns: Pattern[] = matchedRules.map((rule, idx) => ({
      patternId: `PAT_${rule.pattern || idx}`,
      type: rule.pattern || 'CORE_PATTERN',
      headline: rule.notes || `Cấu Trúc ${rule.domain.toUpperCase()}`,
      signalIds: signals.filter((s) => s.ruleIds.includes(rule.ruleId)).map((s) => s.signalId),
      relationshipIds: relationships.map((r) => r.relationshipId),
      dominance: Math.min(1.0, rule.priority / 100),
      contextFit: 0.95,
    }));

    // 5. Interpretations
    const interpretations: Interpretation[] = patterns.map((pat, idx) => ({
      interpretationId: `INT_${idx}`,
      dimension: 'overview',
      statementId: `STMT_${idx}`,
      headline: pat.headline,
      statement: pat.headline,
      polarity: 'supportive',
      strength: pat.dominance,
      confidence: 0.95,
      patternIds: [pat.patternId],
      signalIds: pat.signalIds,
      ruleIds: matchedRules[idx] ? [matchedRules[idx].ruleId] : [],
      evidenceIds: matchedRules[idx] ? [`EVD_${matchedRules[idx].ruleId}`] : [],
    }));

    // 6. Practical Implications & Guidance
    const implications: PracticalImplication[] = interpretations.map((interp, idx) => ({
      implicationId: `IMP_${idx}`,
      interpretationId: interp.interpretationId,
      context: 'Đời sống thực tế',
      manifestation: `Xu hướng biểu hiện rõ trong công việc và các mối quan hệ quan trọng.`,
    }));

    const guidance: Guidance[] = implications.map((imp, idx) => ({
      guidanceId: `GUI_${idx}`,
      implicationId: imp.implicationId,
      actionPriority: idx === 0 ? 'IMMEDIATE' : 'STRATEGIC',
      whatToContinue: ['Phát huy thế mạnh cốt lõi', 'Duy trì sự kiên định'],
      whatToAdjustOrStop: ['Tránh phản ứng hấp tấp khi áp lực gia tăng'],
      rationale: 'Hài hòa năng lượng để đạt kết quả bền vững.',
    }));

    // 7. Evidence References
    const evidence: EvidenceReference[] = [];
    matchedRules.forEach((rule) => {
      const trace = MysticosResultBuilder.tracer.traceRule(rule.ruleId);
      const primarySource = trace?.sources[0];
      if (primarySource) {
        evidence.push({
          evidenceId: `EVD_${rule.ruleId}`,
          ruleId: rule.ruleId,
          claimId: rule.claimIds[0] || 'CLM_GENERAL',
          sourceId: primarySource.sourceId,
          sourceTitle: primarySource.title,
          citation: MysticosResultBuilder.tracer.formatFootnote(rule.ruleId),
          evidenceLevel: rule.evidenceLevel as EvidenceReference['evidenceLevel'],
        });
      }
    });

    return {
      resultId: `RES_${params.domain.toUpperCase()}_${Date.now()}`,
      domain: params.domain,
      inputSummary: params.inputSummary,
      facts: params.facts,
      semantics,
      signals,
      relationships,
      patterns,
      tensions: [],
      interpretations,
      implications,
      guidance,
      evidence,
      conflicts: [],
      technical: {
        calculationTimeMs: Date.now() - startTime,
        rulesEvaluatedCount: domainRules.length,
        rulesMatchedCount: matchedRules.length,
      },
      metadata: {
        engineVersion: '3.0.0',
        knowledgeBaseVersion: '2026.10',
        rulesVersion: '2026.10',
        school: params.school,
        deterministic: true,
        calculatedAt: new Date().toISOString(),
      },
    };
  }
}
