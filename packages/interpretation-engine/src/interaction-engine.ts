import { TraitScore, TraitInteractionRule } from '@mystic/core';

export const BASELINE_INTERACTION_RULES: TraitInteractionRule[] = [
  {
    ruleId: 'INT-CAREER-001',
    conditions: [
      { trait: 'CONFIDENCE', operator: '>=', value: 0.58 },
      { trait: 'AMBITION', operator: '>=', value: 0.58 },
      { trait: 'SELF_CRITICISM', operator: '>=', value: 0.45 },
    ],
    resultingTheme: 'AMBITION_WITH_PRESSURE',
    domain: 'career',
    title: 'Tham Vọng Đi Kèm Áp Lực Nội Tâm Tự Thân',
    description: 'Bạn sở hữu ý chí vươn lên mạnh mẽ cùng khát vọng khẳng định vị thế, nhưng sự cầu toàn đôi khi khiến bạn tự tạo áp lực tâm lý quá mức lên bản thân.',
    intensity: 'HIGH',
  },
  {
    ruleId: 'INT-EMOTION-002',
    conditions: [
      { trait: 'EMOTIONAL_SENSITIVITY', operator: '>=', value: 0.55 },
      { trait: 'DISCIPLINE', operator: '>=', value: 0.55 },
    ],
    resultingTheme: 'CONTROLLED_SENSITIVITY',
    domain: 'emotional',
    title: 'Nhạy Cảm Cảm Xúc Trong Sự Tự Chủ Vững Vàng',
    description: 'Nội tâm của bạn phong phú và tinh tế, nhưng bạn có năng lực tự chủ và lý trí điềm đạm để không để cảm xúc nhất thời chi phối hành động.',
    intensity: 'HIGH',
  },
  {
    ruleId: 'INT-LOVE-003',
    conditions: [
      { trait: 'LOYALTY', operator: '>=', value: 0.58 },
      { trait: 'STABILITY_NEED', operator: '>=', value: 0.58 },
    ],
    resultingTheme: 'SELECTIVE_ATTACHMENT',
    domain: 'relationship',
    title: 'Gắn Kết Chọn Lọc & Trung Thủy Tuyệt Đối',
    description: 'Bạn không dễ dàng trao gửi niềm tin cho người mới quen, nhưng một khi đã xác định cam kết, bạn là điểm tựa an toàn và chung thủy trọn vẹn.',
    intensity: 'HIGH',
  },
  {
    ruleId: 'INT-LEAD-004',
    conditions: [
      { trait: 'LEADERSHIP', operator: '>=', value: 0.6 },
      { trait: 'CREATIVITY', operator: '>=', value: 0.55 },
    ],
    resultingTheme: 'VISIONARY_LEADERSHIP',
    domain: 'career',
    title: 'Năng Lực Lãnh Đạo Đột Phá & Tiên Phong Sáng Tạo',
    description: 'Bạn có tầm nhìn chiến lược đổi mới kết hợp cùng bản lĩnh hành động quyết đoán, thu hút sự đồng lòng của tập thể.',
    intensity: 'HIGH',
  },
  {
    ruleId: 'INT-CARE-005',
    conditions: [
      { trait: 'EMPATHY', operator: '>=', value: 0.55 },
      { trait: 'PRAGMATISM', operator: '>=', value: 0.55 },
    ],
    resultingTheme: 'PRAGMATIC_CARE',
    domain: 'relationship',
    title: 'Tình Yêu Thương Thực Tiễn & Chở Che Chu Đáo',
    description: 'Bạn thể hiện sự quan tâm sâu sắc thông qua những hành động bảo bọc và giải pháp thiết thực cho cuộc sống hơn là những lời hứa hoa mỹ.',
    intensity: 'MEDIUM',
  },
  {
    ruleId: 'INT-GROWTH-006',
    conditions: [
      { trait: 'ANALYTICAL_MIND', operator: '>=', value: 0.58 },
      { trait: 'INTROSPECTION', operator: '>=', value: 0.58 },
    ],
    resultingTheme: 'ANALYTICAL_INTROSPECTION',
    domain: 'growth',
    title: 'Tư Duy Chiêm Nghiệm & Khám Phá Cội Nguồn Tri Thức',
    description: 'Bạn có trực giác nghiên cứu sâu sắc, luôn muốn bóc tách bản chất ngọn ngành của sự việc và không dễ bị thuyết phục bởi những nhận định hời hợt.',
    intensity: 'HIGH',
  },
];

export interface ActiveInteraction {
  ruleId: string;
  theme: string;
  domain: string;
  title: string;
  description: string;
  intensity: 'HIGH' | 'MEDIUM' | 'MODERATE';
}

export class TraitInteractionEngine {
  public static evaluate(
    traitScores: TraitScore[],
    customRules: TraitInteractionRule[] = BASELINE_INTERACTION_RULES
  ): ActiveInteraction[] {
    const scoreMap = new Map<string, number>();
    for (const ts of traitScores) {
      scoreMap.set(ts.trait, ts.normalizedScore);
    }

    const activeInteractions: ActiveInteraction[] = [];

    for (const rule of customRules) {
      let allPassed = true;

      for (const cond of rule.conditions) {
        const val = scoreMap.get(cond.trait) ?? 0.5;
        let condPassed = false;

        switch (cond.operator) {
          case '>=': condPassed = val >= cond.value; break;
          case '<=': condPassed = val <= cond.value; break;
          case '>': condPassed = val > cond.value; break;
          case '<': condPassed = val < cond.value; break;
          case '==': condPassed = Math.abs(val - cond.value) < 0.05; break;
        }

        if (!condPassed) {
          allPassed = false;
          break;
        }
      }

      if (allPassed) {
        activeInteractions.push({
          ruleId: rule.ruleId,
          theme: rule.resultingTheme,
          domain: rule.domain,
          title: rule.title,
          description: rule.description,
          intensity: rule.intensity,
        });
      }
    }

    return activeInteractions;
  }
}
