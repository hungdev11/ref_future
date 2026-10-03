import {
  EvidenceItem,
  EvidenceEffect,
  TraitScore,
  TraitLevel,
  TraitProfile,
} from '@mystic/core';

export class TraitAggregator {
  public static aggregate(evidenceList: EvidenceItem[]): {
    traitScores: TraitScore[];
    profile: TraitProfile;
  } {
    // Group evidence by trait
    const traitMap = new Map<string, {
      positiveWeights: number[];
      negativeWeights: number[];
      supportingRules: Set<string>;
      opposingRules: Set<string>;
      domain: string;
    }>();

    for (const ev of evidenceList) {
      if (!traitMap.has(ev.trait)) {
        traitMap.set(ev.trait, {
          positiveWeights: [],
          negativeWeights: [],
          supportingRules: new Set(),
          opposingRules: new Set(),
          domain: ev.domain,
        });
      }

      const entry = traitMap.get(ev.trait)!;

      const isNegative = ev.polarity === 'NEGATIVE' ||
                         ev.effect === EvidenceEffect.OPPOSE ||
                         ev.effect === EvidenceEffect.REDUCE;

      if (isNegative) {
        entry.negativeWeights.push(ev.weight);
        entry.opposingRules.add(ev.sourceRuleCode);
      } else {
        entry.positiveWeights.push(ev.weight);
        entry.supportingRules.add(ev.sourceRuleCode);
      }
    }

    const traitScores: TraitScore[] = [];

    const defaultProfile: TraitProfile = {
      personality: {
        CONFIDENCE: 0.5,
        INDEPENDENCE: 0.5,
        DISCIPLINE: 0.5,
        ADAPTABILITY: 0.5,
      },
      emotional: {
        EMOTIONAL_SENSITIVITY: 0.5,
        EMOTIONAL_INTENSITY: 0.5,
      },
      relationship: {
        STABILITY_NEED: 0.5,
        LOYALTY: 0.5,
        COMMUNICATION: 0.5,
        EMPATHY: 0.5,
      },
      career: {
        AMBITION: 0.5,
        LEADERSHIP: 0.5,
        PRAGMATISM: 0.5,
        CREATIVITY: 0.5,
      },
      money: {
        FINANCIAL_CAUTION: 0.5,
        FINANCIAL_PRUDENCE: 0.5,
      },
      growth: {
        INTROSPECTION: 0.5,
        INTUITION: 0.5,
        BENEVOLENCE: 0.5,
      },
    };

    for (const [trait, data] of traitMap.entries()) {
      // 1. Asymptotic Bounded Product Sum: 1 - Product(1 - w)
      const posSum = data.positiveWeights.length > 0
        ? 1 - data.positiveWeights.reduce((acc, w) => acc * (1 - Math.min(0.9, w * 0.7)), 1)
        : 0;

      const negSum = data.negativeWeights.length > 0
        ? 1 - data.negativeWeights.reduce((acc, w) => acc * (1 - Math.min(0.9, w * 0.7)), 1)
        : 0;

      // Net score with damping
      const rawScore = Number((posSum - negSum * 0.4).toFixed(3));
      const normalizedScore = Number(
        Math.max(0.05, Math.min(0.99, posSum * (1 - 0.4 * negSum))).toFixed(2)
      );

      let level: TraitLevel = TraitLevel.MODERATE;
      if (normalizedScore <= 0.2) level = TraitLevel.VERY_LOW;
      else if (normalizedScore <= 0.4) level = TraitLevel.LOW;
      else if (normalizedScore <= 0.6) level = TraitLevel.MODERATE;
      else if (normalizedScore <= 0.8) level = TraitLevel.STRONG;
      else level = TraitLevel.VERY_STRONG;

      const scoreItem: TraitScore = {
        trait,
        rawScore,
        normalizedScore,
        level,
        domain: data.domain,
        supportingRules: Array.from(data.supportingRules),
        opposingRules: Array.from(data.opposingRules),
      };

      traitScores.push(scoreItem);

      // Assign into profile categories
      if (['CONFIDENCE', 'INDEPENDENCE', 'DISCIPLINE', 'ADAPTABILITY', 'SELF_CRITICISM'].includes(trait)) {
        defaultProfile.personality[trait] = normalizedScore;
      } else if (['EMOTIONAL_SENSITIVITY', 'EMOTIONAL_INTENSITY'].includes(trait)) {
        defaultProfile.emotional[trait] = normalizedScore;
      } else if (['STABILITY_NEED', 'LOYALTY', 'COMMUNICATION', 'EMPATHY', 'FREEDOM_NEED', 'ATTACHMENT_NEED'].includes(trait)) {
        defaultProfile.relationship[trait] = normalizedScore;
      } else if (['AMBITION', 'LEADERSHIP', 'PRAGMATISM', 'CREATIVITY', 'ACHIEVEMENT_DRIVE'].includes(trait)) {
        defaultProfile.career[trait] = normalizedScore;
      } else if (['FINANCIAL_CAUTION', 'FINANCIAL_PRUDENCE'].includes(trait)) {
        defaultProfile.money[trait] = normalizedScore;
      } else if (['INTROSPECTION', 'INTUITION', 'BENEVOLENCE'].includes(trait)) {
        defaultProfile.growth[trait] = normalizedScore;
      } else {
        defaultProfile.personality[trait] = normalizedScore;
      }
    }

    return {
      traitScores: traitScores.sort((a, b) => b.normalizedScore - a.normalizedScore),
      profile: defaultProfile,
    };
  }
}
