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

const SEMANTIC_DICTIONARY: Record<string, string> = {
  state_of_pure_potentiality_and_spiritual_quest: 'khởi đầu thuần khiết và khám phá tiềm năng vô hạn',
  deliberate_pause_for_evaluating_accumulated_work: 'khoảng dừng chiến lược để đánh giá công sức tích lũy',
  cataclysmic_breakthrough_and_structural_shattering: 'sự phá vỡ cấu trúc lỗi thời để tái thiết',
  leadership_dignity_and_authoritative_rectitude: 'tư chất lãnh đạo uy nghiêm và phong thái chính trực',
  resource_attraction_and_harmonious_enterprise: 'khả năng quy tụ nguồn lực và kiến tạo cơ hội hanh thông',
  karmic_entanglement_obsessive_worry_and_friction: 'nút thắt tâm lý, lo âu nghi ngại và lực cản cần hóa giải',
  initiating_vitality_and_pioneering_autonomy: 'sức sống tiên phong và khát vọng tự chủ mãnh liệt',
  emotional_stability_and_sensory_groundedness: 'sự an định cảm xúc và tính kiên định thực tế',
  restrains_expansion: 'kìm nén sự phân tán để tôi luyện kỷ luật',
  friction_combative_drive: 'ý chí kiên cường vượt qua xung lực ma sát',
  independent_leadership_and_original_initiative: 'năng lực dẫn dắt độc lập và sáng kiến khai phá',
  adaptability_versatility_and_freedom_of_experience: 'sự thích ứng linh hoạt và tự do khám phá trải nghiệm',
  dissolution_of_ego_and_spiritual_reorientation: 'thanh lọc ảo tưởng bản ngã và định hướng lại nhận thức',
  emotional_stability: 'sự vững vàng cảm xúc',
  sensory_groundedness: 'tính thực tiễn kiên định',
  independent_leadership: 'vai trò dẫn dắt độc lập',
  adaptability_versatility: 'năng lực thích nghi đa dạng',
  pioneering_autonomy: 'tính tiên phong độc lập',
  volatility_impatience: 'sự bốc đồng nóng vội',
};

const SIGNAL_DICTIONARY: Record<string, string> = {
  SIG_RADICAL_BEGINNING: 'bước ngoặt khởi đầu mang tính đột phá',
  SIG_INTUITIVE_LEAP: 'quyết định trực giác dũng cảm',
  SIG_REASSESSMENT_FATIGUE: 'tâm lý mỏi mệt khi phải liên tục tái đánh giá',
  SIG_EVALUATION_IMPEDIMENT: 'sự trì hoãn do quá thận trọng soi xét',
  SIG_RESISTING_COLLAPSE: 'sự phản kháng né tránh thay đổi tất yếu',
  SIG_DENIAL_OF_PURGE: 'sự chối bỏ quá trình thanh lọc cần thiết',
  SIG_EXECUTIVE_COMMAND: 'năng lực chỉ huy và điều hành quyết đoán',
  SIG_SELF_RELIANCE: 'tính tự chủ và độc lập tự cường',
  SIG_RESOURCE_EXPANSION: 'sự mở rộng và lưu chuyển dòng chảy tài nguyên',
  SIG_ENTERPRISE_FACILITATION: 'sự trợ lực thuận lợi cho công việc và sự nghiệp',
  SIG_OBSESSIVE_SCRUTINY: 'khuynh hướng soi xét chi tiết quá mức',
  SIG_VULNERABILITY_FOCUS: 'sự bận tâm thái quá vào điểm yếu nội tâm',
  SIG_ASSERTIVE_IDENTITY: 'bản lĩnh tự khẳng định bản thân mạnh mẽ',
  SIG_BOLD_EXPRESSION: 'phong cách thể hiện trực diện và dứt khoát',
  SIG_SERENE_NURTURANCE: 'năng lực nuôi dưỡng tĩnh tại và bao dung',
  SIG_PRAGMATIC_CONTAINMENT: 'khả năng gìn giữ và bảo toàn nguồn lực',
  SIG_FRUSTRATION_BRAKE: 'lực cản thử thách tính nhẫn nại',
  SIG_HARDENED_RESILIENCE: 'sức bền bỉ tôi luyện qua áp lực',
  SIG_LEADERSHIP_IMPULSE: 'xung lực dẫn đầu và truyền cảm hứng',
  SIG_PIONEERING_DRIVE: 'động lực mở lối tiên phong',
  SIG_DIVERSE_EXPLORATION: 'khát khao trải nghiệm phong phú',
  SIG_RESTLESS_MOBILITY: 'nhu cầu chuyển dịch liên tục',
  SIG_EGO_DECONSTRUCTION: 'tiến trình rũ bỏ định kiến tôi luyện tâm tính',
  SIG_AUTHENTIC_AWAKENING: 'sự thức tỉnh giá trị chân thực',
  SIG_SYMBIOTIC_NURTURANCE: 'sự hòa hợp nuôi dưỡng cảm xúc tương hỗ',
  SIG_RECIPROCAL_SAFETY: 'cảm giác an toàn và tin cậy lẫn nhau',
  SIG_INNOVATION_ALLIANCE: 'sự liên minh thúc đẩy sáng tạo đột phá',
  SIG_AUTONOMY_RESPECT: 'sự tôn trọng không gian riêng của nhau',
  SIG_VOLATILE_HIGH_DRIVE: 'nhiệt huyết cao nhưng dễ bộc phát xung đột',
  SIG_COMPETITIVE_FRICTION: 'ma sát cạnh tranh quyền lực ngầm',
};

function humanizeSemantic(tag: string): string {
  if (SEMANTIC_DICTIONARY[tag]) return SEMANTIC_DICTIONARY[tag];
  return tag
    .replace(/^(SIG_|RUL_|SEM_|contextual_)/i, '')
    .replace(/_/g, ' ')
    .trim()
    .toLowerCase();
}

function humanizeSignal(sig: string): string {
  if (SIGNAL_DICTIONARY[sig]) return SIGNAL_DICTIONARY[sig];
  return sig
    .replace(/^SIG_CTX_|^SIG_/i, '')
    .replace(/_/g, ' ')
    .trim()
    .toLowerCase();
}

export class MysticosResultBuilder {
  private static tracer = new ProvenanceTracer();

  public static buildResult(params: BuildResultParams): MysticosResult {
    const startTime = Date.now();
    const store = KnowledgeStore.getInstance();
    const domainRules = store.getRulesByDomain(params.domain);

    // Multi-entity Fact Indexing: collect values into arrays to match if ANY element matches
    const factMap = new Map<string, unknown[]>();
    for (const f of params.facts) {
      const existing = factMap.get(f.key);
      if (existing) {
        existing.push(f.value);
      } else {
        factMap.set(f.key, [f.value]);
      }
    }

    // 1. Match Rules
    const matchedRules = domainRules.filter((rule) => {
      return rule.preconditions.every((cond) => {
        const values = factMap.get(cond.field);
        if (!values || values.length === 0) return false;

        if (cond.operator === 'NOT_EQUALS') {
          return values.every((actual) => actual !== cond.value);
        }

        return values.some((actual) => {
          if (cond.operator === 'EQUALS') return actual === cond.value;
          if (cond.operator === 'IN' && Array.isArray(cond.value)) return cond.value.includes(actual);
          if (cond.operator === 'CONTAINS') {
            if (Array.isArray(actual)) return actual.includes(cond.value);
            return actual === cond.value;
          }
          if (
            cond.operator === 'BETWEEN' &&
            Array.isArray(cond.value) &&
            cond.value.length === 2 &&
            typeof actual === 'number'
          ) {
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
    });

    // 2. Semantics & Signals
    const semantics: SemanticUnit[] = [];
    const signals: Signal[] = [];
    const patterns: Pattern[] = [];
    const interpretations: Interpretation[] = [];
    const evidence: EvidenceReference[] = [];

    if (matchedRules.length > 0) {
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
    } else {
      // Fallback contextual derivation for when 0 rules match
      const primaryFacts =
        params.facts.length > 0
          ? params.facts
          : [{ key: 'domain', value: params.domain, domain: params.domain, source: 'default' }];

      const isShadow = primaryFacts.some((f) => {
        if (f.key === 'isReversed' && f.value === true) return true;
        if (f.key === 'brightness' && f.value === 'H') return true;
        if (String(f.value).includes('HOA_KY') || String(f.value).includes('THAT_SAT')) return true;
        if (f.key.toLowerCase().includes('karmic') || String(f.value).toLowerCase().includes('karmic'))
          return true;
        if (String(f.value).toUpperCase() === 'SQUARE' || String(f.value).toUpperCase() === 'OPPOSITION')
          return true;
        return false;
      });

      primaryFacts.slice(0, 3).forEach((f, idx) => {
        const cleanKey = f.key.replace(/[^a-zA-Z0-9]+/g, '_');
        const cleanVal = String(f.value).replace(/[^a-zA-Z0-9]+/g, '_');
        semantics.push({
          id: `SEM_CTX_${cleanKey}_${idx}`,
          concept: `contextual_${f.key.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${String(f.value).toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
          keywords: [f.key, String(f.value)],
          polarity: isShadow ? 'shadow' : 'constructive',
          weight: 0.8,
        });

        signals.push({
          signalId: `SIG_CTX_${params.domain.toUpperCase()}_${cleanKey}_${idx}`,
          type: `SIG_CTX_${cleanKey.toUpperCase()}_${cleanVal.toUpperCase()}`,
          polarity: isShadow ? 'challenging' : 'supportive',
          strength: 0.8,
          ruleIds: [`RUL_CTX_${params.domain.toUpperCase()}_${idx}`],
          claimIds: [`CLM_CTX_${params.domain.toUpperCase()}_${idx}`],
          dimension: 'overview',
          description: `Tín hiệu ngữ cảnh ${params.domain.toUpperCase()}: ${f.key} xác lập giá trị ${String(f.value)}`,
        });
      });
    }

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
    if (matchedRules.length > 0) {
      matchedRules.forEach((rule, idx) => {
        patterns.push({
          patternId: `PAT_${rule.pattern || idx}`,
          type: rule.pattern || 'CORE_PATTERN',
          headline: rule.notes || `Cấu Trúc ${rule.domain.toUpperCase()}`,
          signalIds: signals.filter((s) => s.ruleIds.includes(rule.ruleId)).map((s) => s.signalId),
          relationshipIds: relationships.map((r) => r.relationshipId),
          dominance: Math.min(1.0, rule.priority / 100),
          contextFit: 0.95,
        });
      });
    } else {
      const primaryFacts =
        params.facts.length > 0
          ? params.facts
          : [{ key: 'domain', value: params.domain, domain: params.domain, source: 'default' }];
      const keyEntity = primaryFacts
        .map((f) => `${f.key.split('.').pop()}_${f.value}`)
        .join('_')
        .toUpperCase()
        .replace(/[^A-Z0-9_]+/g, '_');
      const patternType = `CONTEXTUAL_${params.domain.toUpperCase()}_${keyEntity}`.slice(0, 48);
      const headline = `Cấu Trúc Tự Nhiên ${params.domain.toUpperCase()}: ${primaryFacts
        .map((f) => `${f.key.split('.').pop()}=${f.value}`)
        .join(', ')}`;

      patterns.push({
        patternId: `PAT_CTX_${params.domain.toUpperCase()}_0`,
        type: patternType,
        headline,
        signalIds: signals.map((s) => s.signalId),
        relationshipIds: relationships.map((r) => r.relationshipId),
        dominance: 0.8,
        contextFit: 0.85,
      });
    }

    // 5. Interpretations
    patterns.forEach((pat, idx) => {
      const matchedRule = matchedRules[idx];
      const polarity = matchedRule
        ? matchedRule.polarity === 'shadow'
          ? 'challenging'
          : 'supportive'
        : signals.some((s) => s.polarity === 'challenging')
        ? 'challenging'
        : 'supportive';

      interpretations.push({
        interpretationId: `INT_${idx}`,
        dimension: 'overview',
        statementId: `STMT_${idx}`,
        headline: pat.headline,
        statement: pat.headline,
        polarity,
        strength: pat.dominance,
        confidence: 0.95,
        patternIds: [pat.patternId],
        signalIds: pat.signalIds,
        ruleIds: matchedRule ? [matchedRule.ruleId] : [`RUL_CTX_${params.domain.toUpperCase()}_${idx}`],
        evidenceIds: matchedRule ? [`EVD_${matchedRule.ruleId}`] : [`EVD_CTX_${params.domain.toUpperCase()}_${idx}`],
      });
    });

    // 6. Practical Implications & Dynamic Guidance
    const domainContexts: Record<string, string> = {
      tarot: 'Bối cảnh trải nghiệm và bước ngoặt hành động',
      astrology: 'Tâm lý học hành vi và trường năng lượng cá nhân',
      tuvi: 'Môi trường xã hội, công danh và vận trình thực tế',
      numerology: 'Định hướng chu kỳ phát triển và tiềm năng cá nhân',
      compatibility: 'Tương tác đôi bên và nhịp điệu phối hợp thực tế',
    };

    const implications: PracticalImplication[] = interpretations.map((interp, idx) => {
      const targetRule = matchedRules[idx];
      const ruleSemantics = targetRule ? targetRule.semanticInputs : semantics.map((s) => s.concept);
      const ruleSignals = targetRule ? targetRule.derivedSignals : signals.map((s) => s.type);
      const rulePattern = targetRule?.pattern || interp.headline;
      const ruleNotes = targetRule?.notes;

      const semTexts = ruleSemantics.map(humanizeSemantic);
      const sigTexts = ruleSignals.map(humanizeSignal);

      let manifestation = '';
      if (ruleNotes) {
        manifestation = `Khuôn mẫu [${rulePattern}]: ${ruleNotes} Biểu hiện qua ${
          semTexts.join(', ') || 'các đặc tính chủ đạo'
        } trong đời sống và công việc.`;
      } else if (semTexts.length > 0) {
        manifestation = `Khuôn mẫu [${rulePattern}] thể hiện rõ qua ${semTexts.join(' cùng ')}${
          sigTexts.length > 0 ? `, nhận biết qua dấu hiệu ${sigTexts.join(', ')}` : ''
        }.`;
      } else {
        manifestation = `Xu hướng biểu hiện cụ thể qua khuôn mẫu [${rulePattern}] trong các mối quan hệ và hành động thực tiễn.`;
      }

      return {
        implicationId: `IMP_${idx}`,
        interpretationId: interp.interpretationId,
        context: domainContexts[params.domain] || 'Đời sống thực tế',
        manifestation,
      };
    });

    const guidance: Guidance[] = implications.map((imp, idx) => {
      const targetRule = matchedRules[idx];
      const targetInterp = interpretations[idx];
      const isChallenging =
        targetInterp?.polarity === 'challenging' || targetRule?.polarity === 'shadow';

      const semTexts = targetRule
        ? targetRule.semanticInputs.map(humanizeSemantic)
        : semantics.map((s) => humanizeSemantic(s.concept));
      const sigTexts = targetRule
        ? targetRule.derivedSignals.map(humanizeSignal)
        : signals.map((s) => humanizeSignal(s.type));

      const mainPositive = semTexts[0] || 'thế mạnh cốt lõi';
      const secondaryPositive = sigTexts[0] || 'năng lượng chủ động';
      const mainChallenge = semTexts[0] || 'rào cản tâm lý';
      const secondaryChallenge = sigTexts[0] || 'xung lực đối kháng';

      let whatToContinue: string[];
      let whatToAdjustOrStop: string[];
      let rationale: string;

      if (!isChallenging) {
        whatToContinue = [
          `Phát huy ${mainPositive} trong các mục tiêu và quyết định then chốt.`,
          `Duy trì ${secondaryPositive} để củng cố nền tảng phát triển bền vững.`,
        ];
        if (semTexts[1]) {
          whatToContinue.push(`Bảo toàn nhịp điệu tự nhiên của ${semTexts[1]}.`);
        }

        whatToAdjustOrStop = [
          `Tránh chủ quan hoặc để ${mainPositive} phát triển thiên lệch thiếu kiểm soát.`,
          `Không để sức ỳ hoặc sự tự mãn làm chậm tiến trình đổi mới thích nghi.`,
        ];

        rationale = `Phát huy ${mainPositive} và duy trì ${secondaryPositive} tạo đòn bẩy vững chắc để hiện thực hóa tiềm năng trong hệ thống ${params.domain}.`;
      } else {
        whatToAdjustOrStop = [
          `Kiểm soát và tiết chế ${mainChallenge}, tránh phản ứng bộc phát khi đối mặt áp lực.`,
          `Chủ động nhận diện ảnh hưởng từ ${secondaryChallenge} để ngăn ngừa rủi ro phát sinh.`,
        ];
        if (sigTexts[1]) {
          whatToAdjustOrStop.push(`Dừng khuynh hướng ${sigTexts[1]} trước khi tạo thành quán tính tiêu cực.`);
        }

        whatToContinue = [
          `Giữ vững sự tĩnh tại nội tâm, kỷ luật tự thân và góc nhìn khách quan trước biến động.`,
          `Tập trung vào các giải pháp thực tế từng bước thay vì phản ứng vội vã.`,
        ];

        rationale = `Nhận diện và hóa giải kịp thời ${mainChallenge} là yếu tố quyết định để tháo gỡ tắc nghẽn, phục hồi cân bằng năng lượng trong ${params.domain}.`;
      }

      return {
        guidanceId: `GUI_${idx}`,
        implicationId: imp.implicationId,
        actionPriority: idx === 0 ? (isChallenging ? 'IMMEDIATE' : 'STRATEGIC') : isChallenging ? 'IMMEDIATE' : 'STRATEGIC',
        whatToContinue,
        whatToAdjustOrStop,
        rationale,
      };
    });

    // 7. Evidence References
    if (matchedRules.length > 0) {
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
    } else {
      const domainSource =
        store.getAllSources().find((s) => s.domain === params.domain) || store.getAllSources()[0];
      if (domainSource) {
        evidence.push({
          evidenceId: `EVD_CTX_${params.domain.toUpperCase()}_0`,
          ruleId: `RUL_CTX_${params.domain.toUpperCase()}_0`,
          claimId: `CLM_CTX_${params.domain.toUpperCase()}_0`,
          sourceId: domainSource.sourceId,
          sourceTitle: domainSource.title,
          citation: `Khảo luận hệ thống thư tịch chuẩn mục ${params.school || params.domain.toUpperCase()} (${domainSource.title})`,
          evidenceLevel: 'C',
        });
      }
    }

    // 8. Tensions
    const supportiveSignals = signals.filter((s) => s.polarity === 'supportive');
    const challengingSignals = signals.filter((s) => s.polarity === 'challenging');
    const tensions: Array<{ traitA: string; traitB: string; dynamics: string; resolution: string }> = [];

    for (const sA of supportiveSignals) {
      for (const sB of challengingSignals) {
        const descA = sA.description || humanizeSignal(sA.type);
        const descB = sB.description || humanizeSignal(sB.type);
        tensions.push({
          traitA: sA.type,
          traitB: sB.type,
          dynamics: `Xung lực phân cực giữa thế mạnh thúc đẩy (${descA}) và rào cản thách thức (${descB}).`,
          resolution: `Vận dụng năng lực chủ đạo (${descA}) làm điểm tựa vững vàng để chuyển hóa áp lực và tháo gỡ rào cản từ (${descB}).`,
        });
      }
    }

    // 9. Conflicts
    const allConflicts = store.getAllConflicts();
    const domainUpper = params.domain.toUpperCase();

    const matchedConflicts = allConflicts.filter((conf) => {
      const hasDomainSource = conf.sources.some((sId) => store.getSource(sId)?.domain === params.domain);
      const idMatchesDomain =
        conf.conflictId.toUpperCase().includes(domainUpper) ||
        (params.domain === 'numerology' && conf.conflictId.includes('NUM')) ||
        (params.domain === 'astrology' && conf.conflictId.includes('ASTRO')) ||
        (params.domain === 'tuvi' && conf.conflictId.includes('TUVI')) ||
        (params.domain === 'tarot' && conf.conflictId.includes('TAROT'));

      if (!hasDomainSource && !idMatchesDomain) return false;

      if (!params.school) return true;

      const schoolLower = params.school.toLowerCase();
      const schoolTokens = schoolLower.split(/[\s,&/()\-]+/).filter((t) => t.length > 2);

      return (
        conf.schoolA.toLowerCase().includes(schoolLower) ||
        conf.schoolB.toLowerCase().includes(schoolLower) ||
        schoolTokens.some(
          (tok) =>
            conf.schoolA.toLowerCase().includes(tok) ||
            conf.schoolB.toLowerCase().includes(tok) ||
            conf.topic.toLowerCase().includes(tok)
        )
      );
    });

    const conflicts = matchedConflicts.map((c) => ({
      conflictId: c.conflictId,
      topic: c.topic,
      resolution: c.notes ? `${c.resolution}: ${c.notes}` : c.resolution,
    }));

    return {
      resultId: `RES_${params.domain.toUpperCase()}_${Date.now()}`,
      domain: params.domain,
      inputSummary: params.inputSummary,
      facts: params.facts,
      semantics,
      signals,
      relationships,
      patterns,
      tensions,
      interpretations,
      implications,
      guidance,
      evidence,
      conflicts,
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
