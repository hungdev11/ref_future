import { TraitScore, ContradictionItem, SynthesisRule } from '@mystic/core';

export const BASELINE_SYNTHESIS_RULES: SynthesisRule[] = [
  {
    ruleId: 'SYN-POLARITY-001',
    opposingTraits: ['STABILITY_NEED', 'FREEDOM_NEED'],
    minThreshold: 0.55,
    resultingTheme: 'DYNAMIC_EQUILIBRIUM',
    title: 'Xung Đột Giữa Khát Vọng Tự Do và Nhu Cầu Ổn Định An Toàn',
    description:
      'Một mặt bạn khao khát bứt phá, tự do trải nghiệm những điều mới lạ; mặt khác bạn lại có nhu cầu sâu sắc về sự an toàn, chắc chắn và nền tảng bền vững.',
    advice:
      'Thiết lập "bệ phóng an toàn": củng cố nền tảng tài chính và gia đạo vững chắc làm chỗ dựa, sau đó dành riêng không gian và thời gian cho những dự án độc lập, linh hoạt.',
  },
  {
    ruleId: 'SYN-POLARITY-002',
    opposingTraits: ['INDEPENDENCE', 'ATTACHMENT_NEED'],
    minThreshold: 0.55,
    resultingTheme: 'BOUNDARIED_VULNERABILITY',
    title: 'Sự Cân Bằng Giữa Tự Chủ Độc Lập và Khao Khát Được Thấu Cảm Gắn Kết',
    description:
      'Bạn mang phong thái tự lập kiên cường và ngại phiền hà người khác, nhưng trong sâu thẳm luôn mong ước một người đồng hành thấu hiểu trọn vẹn thế giới nội tâm.',
    advice:
      'Học cách chia sẻ áp lực và cho phép mình được yếu lòng trước những người thực sự tin cậy. Bản lĩnh đích thực nằm ở sự dũng cảm đón nhận tình cảm.',
  },
  {
    ruleId: 'SYN-POLARITY-003',
    opposingTraits: ['ANALYTICAL_MIND', 'INTUITION'],
    minThreshold: 0.55,
    resultingTheme: 'INTEGRATED_DISCERNMENT',
    title: 'Hợp Nhất Trí Tuệ Logic và Giác Quan Trực Cảm Sâu Sắc',
    description:
      'Tư duy phân tích sắc bén đòi hỏi bằng chứng xác thực, nhưng trực giác nhạy cảm lại thường mách bảo hướng đi từ trước khi dữ liệu kịp chứng minh.',
    advice:
      'Áp dụng quy trình "Trực giác dẫn đường, Logic kiểm chứng": hãy lắng nghe cảm nhận đầu tiên của trực giác, sau đó sử dụng phân tích sắc bén để lập kế hoạch kiểm soát rủi ro.',
  },
  {
    ruleId: 'SYN-POLARITY-004',
    opposingTraits: ['AMBITION', 'BENEVOLENCE'],
    minThreshold: 0.55,
    resultingTheme: 'BENEVOLENT_AMBITION',
    title: 'Tham Vọng Quyết Liệt Dung Hòa Cùng Lòng Trắc Ẩn',
    description:
      'Bạn có ý chí tiến thủ và mong muốn đạt được những thành tựu vượt trội, nhưng nội tâm giàu lòng nhân ái không bao giờ cho phép chà đạp lên quyền lợi của người khác.',
    advice:
      'Định vị bản thân theo phong cách lãnh đạo nâng đỡ: biến thành công cá nhân thành giá trị chung phục vụ cộng đồng, đó là con đường đưa bạn đi xa nhất.',
  },
  {
    ruleId: 'SYN-POLARITY-005',
    opposingTraits: ['FINANCIAL_CAUTION', 'CREATIVITY'],
    minThreshold: 0.55,
    resultingTheme: 'CALCULATED_INNOVATION',
    title: 'Cẩn Trọng Tài Chính Giữa Dòng Chảy Ý Tưởng Táo Bạo',
    description:
      'Bạn dồi dào ý tưởng đổi mới và tiềm năng phá cách, nhưng nỗi sợ rủi ro tài chính đôi khi kìm hãm bạn đưa các ý tưởng táo bạo vào thực tế.',
    advice:
      'Thiết lập "ngân sách thử nghiệm có giới hạn": phân bổ 10-15% nguồn lực cho các ý tưởng mới với tâm thế sẵn sàng học hỏi, giữ 85% còn lại trong kênh an toàn tuyệt đối.',
  },
];

export class TraitSynthesisEngine {
  public static synthesize(
    traitScores: TraitScore[],
    customRules: SynthesisRule[] = BASELINE_SYNTHESIS_RULES
  ): ContradictionItem[] {
    const scoreMap = new Map<string, number>();
    for (const ts of traitScores) {
      scoreMap.set(ts.trait, ts.normalizedScore);
    }

    const contradictions: ContradictionItem[] = [];

    for (const rule of customRules) {
      const [traitA, traitB] = rule.opposingTraits;
      const scoreA = scoreMap.get(traitA) ?? 0.5;
      const scoreB = scoreMap.get(traitB) ?? 0.5;

      // Both opposing traits must meet the threshold to trigger tension/synthesis
      if (scoreA >= rule.minThreshold && scoreB >= rule.minThreshold) {
        contradictions.push({
          contradictionId: rule.ruleId,
          traitA,
          traitB,
          scoreA,
          scoreB,
          synthesisTheme: rule.resultingTheme,
          synthesisTitle: rule.title,
          synthesisDescription: rule.description,
          advice: rule.advice,
        });
      }
    }

    return contradictions;
  }
}
