import {
  ReadingDomain,
  ReadingSectionData,
  ParagraphProvenance,
  RuleDefinition,
  ConditionNode,
  EvidenceItem,
  TraitScore,
  TraitProfile,
  ContradictionItem,
} from '@mystic/core';
import { SafeTemplateRenderer, TransitionGenerator } from '@mystic/template-engine';
import { InterpretationDefinition } from './catalog.js';
import { ActiveInteraction } from './interaction-engine.js';

function extractFactKeys(node: ConditionNode): string[] {
  if ('field' in node) {
    return [node.field];
  }
  if ('conditions' in node && Array.isArray((node as { conditions: ConditionNode[] }).conditions)) {
    return (node as { conditions: ConditionNode[] }).conditions.flatMap(extractFactKeys);
  }
  return [];
}

export type ReadingDepth = 'SHORT' | 'MEDIUM' | 'DETAILED' | 'DEEP';

export interface PlanNarrativeRequest {
  readingType: string;
  matchedRules: RuleDefinition[];
  catalog: Record<string, InterpretationDefinition>;
  facts: Record<string, unknown>;
  evidenceList: EvidenceItem[];
  traitScores: TraitScore[];
  traitProfile: TraitProfile;
  interactions: ActiveInteraction[];
  syntheses: ContradictionItem[];
  depth?: ReadingDepth;
  seed?: string | number;
}

const DOMAIN_CANONICAL_ORDER: ReadingDomain[] = [
  ReadingDomain.OVERVIEW,
  ReadingDomain.STRENGTHS,
  ReadingDomain.CHALLENGES,
  ReadingDomain.CAREER,
  ReadingDomain.FINANCE,
  ReadingDomain.LOVE,
  ReadingDomain.SOCIAL,
  ReadingDomain.REFLECTION,
];

export class NarrativePlanner {
  public static plan(request: PlanNarrativeRequest): ReadingSectionData[] {
    const depth = request.depth ?? 'DETAILED';
    const seed = request.seed ?? '42';
    const catalog = request.catalog;
    const facts = request.facts;
    const traitScores = request.traitScores;

    // Create trait score quick lookup map
    const traitMap: Record<string, number> = {};
    for (const ts of traitScores) {
      traitMap[ts.trait] = ts.normalizedScore;
    }

    // Determine allowed domains based on depth
    const allowedDomains = NarrativePlanner.getAllowedDomains(depth);

    const sections: ReadingSectionData[] = [];
    const seenDomainPerInterp = new Set<string>();
    let paragraphCounter = 1;

    // 1. Process base interpretations from matched rules
    for (const rule of request.matchedRules) {
      const interpId = rule.action.targetInterpretationId;
      const interp = catalog[interpId];
      if (!interp) continue;

      for (const domain of DOMAIN_CANONICAL_ORDER) {
        if (!allowedDomains.has(domain)) continue;

        const block = interp.blocks[domain];
        if (!block) continue;

        const dedupeKey = `${interpId}:${domain}`;
        if (seenDomainPerInterp.has(dedupeKey)) continue;
        seenDomainPerInterp.add(dedupeKey);

        // Find primary relevant trait for this domain/interpretation
        const primaryTrait = interp.themes?.[0] ? interp.themes[0].toUpperCase() : 'CORE';
        const primaryTraitScore = traitMap[primaryTrait] ?? 0.6;

        let intensity: 'HIGH' | 'MEDIUM' | 'MODERATE' | 'CAUTIOUS' = 'MODERATE';
        if (primaryTraitScore >= 0.75) intensity = 'HIGH';
        else if (primaryTraitScore >= 0.6) intensity = 'MEDIUM';
        else if (primaryTraitScore >= 0.4) intensity = 'MODERATE';
        else intensity = 'CAUTIOUS';

        // Render template with context
        const renderedText = SafeTemplateRenderer.render(block.template, {
          facts,
          traits: traitMap,
          seed,
          blockId: `${interpId}_${domain}`,
          intensity: intensity === 'HIGH' ? 'HIGH' : intensity === 'MEDIUM' ? 'MODERATE' : 'LOW',
        });

        const renderedAdvice = block.actionableAdvice
          ? SafeTemplateRenderer.render(block.actionableAdvice, {
              facts,
              traits: traitMap,
              seed,
              blockId: `${interpId}_${domain}_advice`,
            })
          : undefined;

        const renderedExplanation = block.explanation
          ? SafeTemplateRenderer.render(block.explanation, {
              facts,
              traits: traitMap,
              seed,
              blockId: `${interpId}_${domain}_exp`,
            })
          : undefined;

        const renderedLayman = block.laymanSummary
          ? SafeTemplateRenderer.render(block.laymanSummary, {
              facts,
              traits: traitMap,
              seed,
              blockId: `${interpId}_${domain}_layman`,
            })
          : undefined;

        // Collect matching evidence IDs
        const relatedEvidences = request.evidenceList.filter(
          (e) => e.sourceRuleCode === rule.ruleCode || (e.domain === domain.toLowerCase())
        );
        const evidenceIds = relatedEvidences.slice(0, 3).map((e) => e.evidenceId);

        // Canonical fact keys from rule conditions
        const factKeys = extractFactKeys(rule.conditionAst);

        const provenance: ParagraphProvenance = {
          paragraphId: `PARA-${String(paragraphCounter++).padStart(3, '0')}`,
          interpretationId: interpId,
          theme: interp.themes?.[0] ?? domain,
          evidenceIds,
          sourceRuleCodes: [rule.ruleCode],
          canonicalFactKeys: factKeys,
          intensity,
          explanationWhy: `Luận giải dựa trên quy tắc [${rule.ruleCode}] và các yếu tố thực tế [${factKeys.join(', ')}].`,
        };

        sections.push({
          sectionOrder: 0,
          domain,
          title: block.title,
          renderedText,
          sourceRuleCode: rule.ruleCode,
          interpretationId: interpId,
          scope: interp.scope,
          themes: interp.themes,
          actionableAdvice: renderedAdvice,
          explanation: renderedExplanation,
          sourceReference: block.sourceReference ?? interp.sourceReference,
          laymanSummary: renderedLayman,
          provenanceTraces: [provenance],
        });
      }
    }

    // 2. Synthesize & Inject Trait Interactions (if depth >= MEDIUM)
    if (depth !== 'SHORT' && request.interactions.length > 0) {
      for (const interaction of request.interactions) {
        const domain = NarrativePlanner.mapDomainStringToEnum(interaction.domain);
        if (!allowedDomains.has(domain)) continue;

        const interactionProvenance: ParagraphProvenance = {
          paragraphId: `PARA-${String(paragraphCounter++).padStart(3, '0')}`,
          interpretationId: interaction.ruleId,
          theme: interaction.theme,
          evidenceIds: [],
          sourceRuleCodes: [interaction.ruleId],
          canonicalFactKeys: ['traithash.interaction'],
          intensity: interaction.intensity === 'HIGH' ? 'HIGH' : 'MEDIUM',
          explanationWhy: `Được tổng hợp từ sự tương tác đa chiều giữa các nét tính cách chủ đạo.`,
        };

        sections.push({
          sectionOrder: 0,
          domain,
          title: interaction.title,
          renderedText: interaction.description,
          sourceRuleCode: interaction.ruleId,
          interpretationId: interaction.ruleId,
          scope: 'INTERACTION',
          themes: [interaction.theme],
          actionableAdvice: `Nhận biết mô thức tâm lý này sẽ giúp bạn chủ động cân bằng phản ứng trong các tình huống thử thách.`,
          explanation: `Khi các nét tính cách gặp nhau ở ngưỡng năng lượng cao, chúng tạo nên sắc thái hành vi riêng biệt này.`,
          laymanSummary: interaction.description,
          provenanceTraces: [interactionProvenance],
        });
      }
    }

    // 3. Synthesize & Inject Contradictions (if depth >= MEDIUM)
    if (depth !== 'SHORT' && request.syntheses.length > 0) {
      for (const syn of request.syntheses) {
        const contradictionProvenance: ParagraphProvenance = {
          paragraphId: `PARA-${String(paragraphCounter++).padStart(3, '0')}`,
          interpretationId: syn.contradictionId,
          theme: syn.synthesisTheme,
          evidenceIds: [],
          sourceRuleCodes: [syn.contradictionId],
          canonicalFactKeys: [syn.traitA, syn.traitB],
          intensity: 'HIGH',
          explanationWhy: `Phát hiện xung đột nội tâm giữa hai nét tính cách đối lập: ${syn.traitA} (${syn.scoreA}) và ${syn.traitB} (${syn.scoreB}).`,
        };

        sections.push({
          sectionOrder: 0,
          domain: ReadingDomain.CHALLENGES,
          title: syn.synthesisTitle,
          renderedText: syn.synthesisDescription,
          sourceRuleCode: syn.contradictionId,
          interpretationId: syn.contradictionId,
          scope: 'SYNTHESIS',
          themes: [syn.synthesisTheme],
          actionableAdvice: syn.advice,
          explanation: `Sự giằng xé nội tâm giữa hai mặt đối lập là một phần tự nhiên trong quá trình hoàn thiện nhân cách.`,
          laymanSummary: `Bạn đang học cách dung hòa hai dòng năng lượng tưởng chừng đối lập để trưởng thành toàn diện hơn.`,
          provenanceTraces: [contradictionProvenance],
        });
      }
    }

    // 4. Sort strictly by canonical domain order
    sections.sort((a, b) => {
      const orderA = DOMAIN_CANONICAL_ORDER.indexOf(a.domain);
      const orderB = DOMAIN_CANONICAL_ORDER.indexOf(b.domain);
      return orderA - orderB;
    });

    // 5. Add stylistic transitions & assign 1-indexed sequential sectionOrder
    let lastDomain: ReadingDomain | null = null;
    return sections.map((sec, idx) => {
      let textWithTransition = sec.renderedText;

      // Add smooth transition prefix if switching domains
      if (lastDomain && lastDomain !== sec.domain && idx > 0) {
        let transitionType = 'DEFAULT';
        if (lastDomain === ReadingDomain.STRENGTHS && sec.domain === ReadingDomain.CHALLENGES) {
          transitionType = 'STRENGTH_TO_CHALLENGE';
        } else if (lastDomain === ReadingDomain.CHALLENGES && sec.domain === ReadingDomain.CAREER) {
          transitionType = 'CHALLENGE_TO_CAREER';
        } else if (lastDomain === ReadingDomain.CAREER && sec.domain === ReadingDomain.LOVE) {
          transitionType = 'CAREER_TO_LOVE';
        }

        const transition = TransitionGenerator.getTransition(transitionType, `${seed}_${idx}`);
        if (transition && !textWithTransition.startsWith(transition)) {
          textWithTransition = `${transition} ${textWithTransition}`;
        }
      }

      lastDomain = sec.domain;

      return {
        ...sec,
        sectionOrder: idx + 1,
        renderedText: textWithTransition,
      };
    });
  }

  private static getAllowedDomains(depth: ReadingDepth): Set<ReadingDomain> {
    switch (depth) {
      case 'SHORT':
        return new Set([
          ReadingDomain.OVERVIEW,
          ReadingDomain.STRENGTHS,
          ReadingDomain.CAREER,
          ReadingDomain.LOVE,
        ]);
      case 'MEDIUM':
        return new Set([
          ReadingDomain.OVERVIEW,
          ReadingDomain.STRENGTHS,
          ReadingDomain.CHALLENGES,
          ReadingDomain.CAREER,
          ReadingDomain.FINANCE,
          ReadingDomain.LOVE,
        ]);
      case 'DETAILED':
      case 'DEEP':
      default:
        return new Set(DOMAIN_CANONICAL_ORDER);
    }
  }

  private static mapDomainStringToEnum(domainStr: string): ReadingDomain {
    switch (domainStr.toLowerCase()) {
      case 'career': return ReadingDomain.CAREER;
      case 'money':
      case 'finance': return ReadingDomain.FINANCE;
      case 'relationship':
      case 'love': return ReadingDomain.LOVE;
      case 'emotional':
      case 'social': return ReadingDomain.SOCIAL;
      case 'growth':
      case 'reflection': return ReadingDomain.REFLECTION;
      case 'challenges': return ReadingDomain.CHALLENGES;
      case 'strengths': return ReadingDomain.STRENGTHS;
      case 'personality':
      case 'overview':
      default: return ReadingDomain.OVERVIEW;
    }
  }
}
