import {
  EvidenceItem,
  EvidenceEffect,
  RuleDefinition,
} from '@mystic/core';
import { InterpretationDefinition } from './catalog.js';

// Base traits mapping for standard rule patterns and themes
const THEME_TO_TRAIT_MAP: Record<string, { trait: string; weight: number; domain: string }[]> = {
  'tiên phong': [{ trait: 'LEADERSHIP', weight: 0.7, domain: 'personality' }, { trait: 'AMBITION', weight: 0.6, domain: 'career' }],
  'dũng cảm': [{ trait: 'CONFIDENCE', weight: 0.75, domain: 'personality' }, { trait: 'FREEDOM_NEED', weight: 0.5, domain: 'personality' }],
  'nhiệt huyết': [{ trait: 'CONFIDENCE', weight: 0.65, domain: 'personality' }, { trait: 'EMOTIONAL_INTENSITY', weight: 0.6, domain: 'emotional' }],
  'tự chủ': [{ trait: 'INDEPENDENCE', weight: 0.8, domain: 'personality' }, { trait: 'SELF_CRITICISM', weight: 0.4, domain: 'personality' }],
  'vững chãi': [{ trait: 'STABILITY_NEED', weight: 0.85, domain: 'relationship' }, { trait: 'DISCIPLINE', weight: 0.75, domain: 'career' }],
  'kiên định': [{ trait: 'DISCIPLINE', weight: 0.8, domain: 'career' }, { trait: 'STABILITY_NEED', weight: 0.7, domain: 'personality' }],
  'thực tế': [{ trait: 'PRAGMATISM', weight: 0.85, domain: 'career' }, { trait: 'DISCIPLINE', weight: 0.7, domain: 'money' }],
  'tích lũy': [{ trait: 'FINANCIAL_CAUTION', weight: 0.8, domain: 'money' }, { trait: 'STABILITY_NEED', weight: 0.75, domain: 'money' }],
  'linh hoạt': [{ trait: 'ADAPTABILITY', weight: 0.85, domain: 'personality' }, { trait: 'FREEDOM_NEED', weight: 0.7, domain: 'relationship' }],
  'thông tuệ': [{ trait: 'ANALYTICAL_MIND', weight: 0.8, domain: 'personality' }, { trait: 'INTROSPECTION', weight: 0.6, domain: 'growth' }],
  'giao tiếp': [{ trait: 'COMMUNICATION', weight: 0.85, domain: 'relationship' }, { trait: 'SOCIAL_EXPANSION', weight: 0.75, domain: 'social' }],
  'sáng tạo': [{ trait: 'CREATIVITY', weight: 0.85, domain: 'career' }, { trait: 'FREEDOM_NEED', weight: 0.6, domain: 'personality' }],
  'nhạy cảm': [{ trait: 'EMOTIONAL_SENSITIVITY', weight: 0.85, domain: 'emotional' }, { trait: 'EMPATHY', weight: 0.75, domain: 'relationship' }],
  'trực giác': [{ trait: 'INTUITION', weight: 0.85, domain: 'growth' }, { trait: 'EMOTIONAL_SENSITIVITY', weight: 0.6, domain: 'emotional' }],
  'kỷ luật': [{ trait: 'DISCIPLINE', weight: 0.9, domain: 'career' }, { trait: 'STABILITY_NEED', weight: 0.7, domain: 'personality' }],
  'trách nhiệm': [{ trait: 'RESPONSIBILITY', weight: 0.85, domain: 'relationship' }, { trait: 'LOYALTY', weight: 0.8, domain: 'relationship' }],
  'chiêm nghiệm': [{ trait: 'INTROSPECTION', weight: 0.9, domain: 'growth' }, { trait: 'INDEPENDENCE', weight: 0.6, domain: 'personality' }],
  'lãnh đạo': [{ trait: 'LEADERSHIP', weight: 0.85, domain: 'career' }, { trait: 'AMBITION', weight: 0.8, domain: 'career' }],
  'bao dung': [{ trait: 'EMPATHY', weight: 0.85, domain: 'relationship' }, { trait: 'BENEVOLENCE', weight: 0.8, domain: 'growth' }],
};

export class EvidenceEngine {
  public static extractEvidence(
    matchedRules: RuleDefinition[],
    catalog: Record<string, InterpretationDefinition>,
    _dotNotatedFacts: Record<string, unknown>
  ): EvidenceItem[] {
    const evidenceList: EvidenceItem[] = [];
    let counter = 1;

    for (const rule of matchedRules) {
      // 1. Explicit Rule Evidence Generators if defined
      if (rule.action.evidenceGenerators && rule.action.evidenceGenerators.length > 0) {
        for (const gen of rule.action.evidenceGenerators) {
          evidenceList.push({
            evidenceId: `EVD-${String(counter++).padStart(4, '0')}`,
            trait: gen.trait,
            effect: gen.effect,
            weight: Math.max(0.1, Math.min(1.0, gen.weight)),
            domain: gen.domain ?? rule.action.domain ?? 'personality',
            sourceRuleCode: rule.ruleCode,
            specificity: rule.specificityScore / 100,
            relevance: 0.9,
            polarity: gen.polarity ?? 'POSITIVE',
            confidence: 1.0,
          });
        }
        continue;
      }

      // 2. Synthesize Evidence from Catalog Themes & Interpretations
      const interpId = rule.action.targetInterpretationId;
      const interp = catalog[interpId];
      if (!interp) continue;

      const themes = interp.themes || [];
      for (const theme of themes) {
        const lowerTheme = theme.toLowerCase();
        for (const [key, mappings] of Object.entries(THEME_TO_TRAIT_MAP)) {
          if (lowerTheme.includes(key)) {
            for (const map of mappings) {
              evidenceList.push({
                evidenceId: `EVD-${String(counter++).padStart(4, '0')}`,
                trait: map.trait,
                effect: EvidenceEffect.SUPPORT,
                weight: map.weight,
                domain: map.domain,
                sourceRuleCode: rule.ruleCode,
                specificity: Math.min(1.0, rule.specificityScore / 50),
                relevance: 0.85,
                polarity: 'POSITIVE',
                confidence: 0.95,
              });
            }
          }
        }
      }

      // 3. Fallback domain-based evidence if none extracted
      if (evidenceList.filter((e) => e.sourceRuleCode === rule.ruleCode).length === 0) {
        const domainTrait = rule.action.domain === 'love' ? 'ATTACHMENT_NEED' :
                            rule.action.domain === 'career' ? 'ACHIEVEMENT_DRIVE' :
                            rule.action.domain === 'finance' ? 'FINANCIAL_PRUDENCE' : 'CORE_VITALITY';

        evidenceList.push({
          evidenceId: `EVD-${String(counter++).padStart(4, '0')}`,
          trait: domainTrait,
          effect: EvidenceEffect.SUPPORT,
          weight: 0.5,
          domain: rule.action.domain ?? 'personality',
          sourceRuleCode: rule.ruleCode,
          specificity: 0.5,
          relevance: 0.7,
          polarity: 'POSITIVE',
          confidence: 0.8,
        });
      }
    }

    return evidenceList;
  }
}
