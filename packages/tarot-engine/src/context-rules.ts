import {
  SemanticSignal,
  ContextualInterpretation,
  StructuredSynthesis,
  PracticalGuidance,
  TarotPositionResult,
} from '@mystic/core';
import { TAROT_SEMANTIC_PROFILES, TarotSemanticProfile } from './semantic-profiles.js';

export interface TarotContextEvaluation {
  signals: SemanticSignal[];
  interpretations: ContextualInterpretation[];
  synthesis: StructuredSynthesis & {
    dominantSuit?: string;
    dominantSuitLabel?: string;
    spreadTheme?: string;
    summary?: string;
    practicalAdvice?: string;
    crossCardTension?: string;
  };
  guidance: PracticalGuidance[];
}

export function normalizePositionSemantics(positionName: string): {
  type: 'CURRENT_SITUATION' | 'CHALLENGE' | 'ADVICE' | 'OUTCOME' | 'PAST' | 'FUTURE' | 'GENERAL';
  labelVn: string;
} {
  const lower = positionName.toLowerCase();
  if (lower.includes('hiện tại') || lower.includes('hoàn cảnh') || lower.includes('thực trạng') || lower.includes('tổng quan')) {
    return { type: 'CURRENT_SITUATION', labelVn: 'Hoàn Cảnh / Hiện Tại' };
  }
  if (lower.includes('thách thức') || lower.includes('chướng ngại') || lower.includes('khó khăn') || lower.includes('trở ngại')) {
    return { type: 'CHALLENGE', labelVn: 'Thách Thức Cốt Lõi' };
  }
  if (lower.includes('lời khuyên') || lower.includes('định hướng') || lower.includes('hành động') || lower.includes('giải pháp')) {
    return { type: 'ADVICE', labelVn: 'Lời Khuyên Hành Động' };
  }
  if (lower.includes('tương lai') || lower.includes('kết quả') || lower.includes('dự phóng') || lower.includes('tiến triển')) {
    return { type: 'OUTCOME', labelVn: 'Xu Hướng / Kết Quả' };
  }
  if (lower.includes('quá khứ') || lower.includes('nguồn gốc') || lower.includes('nguyên nhân')) {
    return { type: 'PAST', labelVn: 'Nguồn Gốc / Quá Khứ' };
  }
  return { type: 'GENERAL', labelVn: positionName };
}

export function evaluateTarotSpread(
  draws: TarotPositionResult[],
  _spreadCode: string,
  questionContext: string = 'GENERAL'
): TarotContextEvaluation {
  const signals: SemanticSignal[] = [];
  const interpretations: ContextualInterpretation[] = [];

  const elementCounts: Record<'FIRE' | 'WATER' | 'AIR' | 'EARTH', number> = {
    FIRE: 0,
    WATER: 0,
    AIR: 0,
    EARTH: 0,
  };
  const suitCounts: Record<'WANDS' | 'CUPS' | 'SWORDS' | 'PENTACLES' | 'MAJOR', number> = {
    WANDS: 0,
    CUPS: 0,
    SWORDS: 0,
    PENTACLES: 0,
    MAJOR: 0,
  };

  const evaluatedCards: Array<{
    draw: TarotPositionResult;
    profile: TarotSemanticProfile;
    positionSemantics: ReturnType<typeof normalizePositionSemantics>;
    orientation: 'UPRIGHT' | 'REVERSED';
  }> = [];

  for (const draw of draws) {
    const profile = TAROT_SEMANTIC_PROFILES[draw.card.cardCode] ?? {
      id: draw.card.cardCode,
      name: draw.card.name,
      discipline: 'TAROT',
      arcana: (draw.card.arcana as any) || 'MINOR',
      rank: draw.card.number || 1,
      element: 'EARTH' as const,
      themes: ['tập trung', 'bài học thời điểm'],
      dynamics: ['chuyển hóa thực tế'],
      constructive: ['kiên định', 'cẩn trọng'],
      shadow: ['nóng vội', 'mất phương hướng'],
    };

    if (profile.element && (profile.element in elementCounts)) {
      elementCounts[profile.element as 'FIRE' | 'WATER' | 'AIR' | 'EARTH']++;
    }

    if (draw.card.arcana === 'MAJOR') {
      suitCounts.MAJOR++;
    } else if (draw.card.suit && (draw.card.suit in suitCounts)) {
      suitCounts[draw.card.suit as 'WANDS' | 'CUPS' | 'SWORDS' | 'PENTACLES']++;
    }

    const posSem = normalizePositionSemantics(draw.positionName);
    const orientation = draw.isReversed ? 'REVERSED' : 'UPRIGHT';

    evaluatedCards.push({
      draw,
      profile,
      positionSemantics: posSem,
      orientation,
    });

    const isConstructive = orientation === 'UPRIGHT' && posSem.type !== 'CHALLENGE';
    const strength = draw.card.arcana === 'MAJOR' ? 0.9 : 0.7;

    const signal: SemanticSignal = {
      id: `sig_tarot_${draw.positionIndex}_${draw.card.cardCode}`,
      dimension: 'PERSONALITY',
      polarity: isConstructive ? 'constructive' : 'shadow',
      strength,
      source: `TAROT_DRAW_${draw.positionIndex}`,
      evidenceIds: [draw.card.cardCode],
      ruleIds: [`RULE_${draw.card.cardCode}_${orientation}_${posSem.type}`],
      contextTags: [posSem.type, orientation, profile.arcana, profile.element || 'EARTH'],
      description: `${draw.card.name} (${draw.positionName}) — ${orientation === 'UPRIGHT' ? 'Xuôi' : 'Ngược'}`,
    };
    signals.push(signal);

    const interpretation: ContextualInterpretation = {
      id: `interp_tarot_${draw.positionIndex}`,
      dimension: 'PERSONALITY',
      headline: `${draw.card.name} tại vị trí ${draw.positionName}`,
      statement: generateContextualCardStatement(profile, posSem.type, orientation, questionContext),
      signals: [signal.id],
      evidenceIds: [draw.card.cardCode],
      ruleIds: [`RULE_${draw.card.cardCode}_${orientation}_${posSem.type}`],
      polarity: isConstructive ? 'supportive' : 'tension',
      strength,
      context: {
        positionIndex: draw.positionIndex,
        positionName: draw.positionName,
        cardCode: draw.card.cardCode,
        isReversed: draw.isReversed,
        element: profile.element,
        arcana: profile.arcana,
      },
    };
    interpretations.push(interpretation);
  }

  // Cross-card Elemental Tension
  let crossCardTension = '';
  if (elementCounts.FIRE > 0 && elementCounts.WATER > 0) {
    crossCardTension = 'Sự cọ xát giữa Lửa (hành động bộc phát, đam mê) và Nước (cảm xúc nội tâm, phòng thủ). Cần tránh để cảm xúc nhất thời dập tắt ý chí hoặc hành động vội vàng gây tổn thương.';
  } else if (elementCounts.AIR > 0 && elementCounts.WATER > 0) {
    crossCardTension = 'Sự giằng co giữa Khí (phân tích duy lý, phán đoán sắc lạnh) và Nước (trực giác, rung cảm cá nhân). Cần cân bằng giữa suy nghĩ logic và sự thấu cảm.';
  } else if (elementCounts.FIRE > 0 && elementCounts.EARTH > 0) {
    crossCardTension = 'Tương tác giữa Lửa (khát khao bứt phá nhanh) và Đất (đòi hỏi kỷ luật và an toàn tài chính). Cần kiên nhẫn để biến ý tưởng thành nền móng thực tế.';
  } else {
    crossCardTension = 'Các nguồn năng lượng trong trải bài có tính tương đồng cao, dòng chảy diễn ra trực tiếp và ít gặp sự cản trở chéo giữa các nguyên tố.';
  }

  // Dominant suit
  const sortedSuits = Object.entries(suitCounts)
    .filter(([, c]) => c > 0)
    .sort(([, a], [, b]) => b - a);
  const dominantSuit = sortedSuits[0]?.[0] ?? 'MAJOR';
  const suitLabels: Record<string, string> = {
    MAJOR: 'Bộ Ẩn Chính (Bài Học Định Mệnh & Bước Ngoặt Tâm Lý)',
    WANDS: 'Bộ Gậy (Hành Động, Ý Chí & Đam Mê Sáng Tạo)',
    CUPS: 'Bộ Chén (Cảm Xúc, Trực Giác & Gắn Kết Tâm Hồn)',
    SWORDS: 'Bộ Kiếm (Tư Duy Lý Tính, Sự Thật Khách Quan & Thách Thức)',
    PENTACLES: 'Bộ Tiền (Hiện Thực Hóa Vật Chất & Kỷ Luật Bền Vững)',
  };

  const synthesis: StructuredSynthesis & {
    dominantSuit?: string;
    dominantSuitLabel?: string;
    spreadTheme?: string;
    summary?: string;
    practicalAdvice?: string;
    crossCardTension?: string;
  } = {
    dominantThemes: evaluatedCards.flatMap((c) => c.profile.themes).slice(0, 4),
    reinforcements: [
      {
        theme: suitLabels[dominantSuit] ?? dominantSuit,
        sources: evaluatedCards.map((c) => c.draw.card.cardCode),
        explanation: `Bộ chủ đạo (${suitLabels[dominantSuit] ?? dominantSuit}) đóng vai trò định hình nhịp điệu trọng tâm của trải bài.`,
      },
    ],
    tensions: crossCardTension
      ? [
          {
            traitA: 'ELEMENT_ALPHA',
            traitB: 'ELEMENT_BETA',
            dynamics: crossCardTension,
            resolution: 'Học cách điều hòa hai cực năng lượng bằng sự nhận thức khách quan.',
          },
        ]
      : [],
    coreDynamicStatement: `Trải bài được dẫn dắt bởi năng lượng của ${suitLabels[dominantSuit] ?? dominantSuit}. ${crossCardTension}`,
    elementalBalance: elementCounts,
    dominantSuit,
    dominantSuitLabel: suitLabels[dominantSuit] ?? dominantSuit,
    crossCardTension,
    summary: `Tiến trình phản ánh sự vận hành giữa ${evaluatedCards.map((c) => c.profile.name).join(' → ')}. ${crossCardTension}`,
    practicalAdvice: generatePracticalAdvice(evaluatedCards, dominantSuit),
  };

  const guidance: PracticalGuidance[] = [
    {
      actionPriority: 'IMMEDIATE',
      timeframe: '7_DAYS',
      rationale: `Dựa trên năng lượng của bộ ${suitLabels[dominantSuit] ?? dominantSuit} và cấu trúc trải bài.`,
      whatToContinue: evaluatedCards.filter((c) => c.orientation === 'UPRIGHT').flatMap((c) => c.profile.constructive).slice(0, 3),
      whatToAdjustOrStop: evaluatedCards.filter((c) => c.orientation === 'REVERSED').flatMap((c) => c.profile.shadow).slice(0, 3),
      triggerSignals: signals.map((s) => s.id),
    },
  ];

  return {
    signals,
    interpretations,
    synthesis,
    guidance,
  };
}

function generateContextualCardStatement(
  profile: TarotSemanticProfile,
  posType: string,
  orientation: 'UPRIGHT' | 'REVERSED',
  _questionContext: string
): string {
  const isUpright = orientation === 'UPRIGHT';

  switch (posType) {
    case 'CURRENT_SITUATION':
      return isUpright
        ? `Tại vị trí Hiện Tại, ${profile.name} chỉ ra bạn đang ở trong dòng chảy thuận lợi của ${profile.constructive.join(', ')}. Đây là thời điểm phát huy ${profile.dynamics[0] ?? 'tiến trình tự nhiên'}.`
        : `Tại vị trí Hiện Tại, ${profile.name} (chiều ngược) phản ánh trạng thái nghẽn tắc hoặc áp lực từ ${profile.shadow.join(', ')}. Cần bình tâm tháo gỡ các nút thắt nội tâm trước khi đưa ra quyết sách lớn.`;

    case 'CHALLENGE':
      return isUpright
        ? `Tại vị trí Thách Thức, bài học cần vượt qua nằm ở việc kiểm soát ${profile.constructive[0]} sao cho không biến thành cứng nhắc, tránh rơi vào cái bẫy ${profile.shadow[0]}.`
        : `Tại vị trí Thách Thức, lá bài ngược cho thấy chướng ngại xuất phát từ ${profile.shadow.join(' và ')}. Năng lượng đang bị phản ứng thái quá hoặc từ chối đối diện sự thật.`;

    case 'ADVICE':
      return isUpright
        ? `Tại vị trí Lời Khuyên, giải pháp tối ưu là kiên trì áp dụng phương châm: ${profile.constructive.join(', ')}. Hãy vững tin vào ${profile.dynamics[0] ?? 'kế hoạch đã định'}.`
        : `Tại vị trí Lời Khuyên, lá bài ngược nhắc nhở bạn cần dừng ngay hành vi ${profile.shadow[0]}, chuyển hóa cách tiếp cận mềm mỏng và dành không gian tự nhìn nhận lại bản thân.`;

    case 'OUTCOME':
      return isUpright
        ? `Tại vị trí Kết Quả, chiều hướng phát triển sẽ kết tinh thành quả tích cực xoay quanh ${profile.constructive.join(' và ')}. Thành quả đến từ sự kiên định bền bỉ.`
        : `Tại vị trí Kết Quả, lá bài ngược dự phóng khả năng bị chậm trễ hoặc phát sinh biến số ngoài ý muốn nếu vẫn duy trì thói quen ${profile.shadow[0]}.`;

    default:
      return isUpright
        ? `${profile.name} mang lại năng lượng tích cực từ ${profile.constructive.join(', ')}.`
        : `${profile.name} (ngược) cảnh báo nguy cơ từ ${profile.shadow.join(', ')}.`;
  }
}

function generatePracticalAdvice(
  _evaluatedCards: Array<{ profile: TarotSemanticProfile; orientation: 'UPRIGHT' | 'REVERSED' }>,
  dominantSuit: string
): string {
  if (dominantSuit === 'SWORDS') {
    return 'Thực nghiệm 7 ngày: Liệt kê rõ 3 giả định gây lo lắng nhất ra giấy, kiểm chứng tính xác thực khách quan và chủ động dừng các cuộc tranh cãi vô bổ.';
  }
  if (dominantSuit === 'CUPS') {
    return 'Thực nghiệm 7 ngày: Dành 15 phút mỗi tối lắng nghe nhu cầu cảm xúc chân thật của chính mình; chia sẻ chân thành với người bạn tin cậy.';
  }
  if (dominantSuit === 'WANDS') {
    return 'Thực nghiệm 7 ngày: Chọn 1 mục tiêu quan trọng nhất đang bị trì hoãn và bắt tay thực hiện bước hành động đầu tiên trong vòng 24 giờ tới.';
  }
  if (dominantSuit === 'PENTACLES') {
    return 'Thực nghiệm 7 ngày: Rà soát lại kỷ luật tài chính và lập danh sách chi tiết các công việc cần hoàn thiện dứt điểm trong tuần.';
  }
  return 'Thực nghiệm 7 ngày: Xem hoàn cảnh hiện tại như một bài học lớn về bản lĩnh; giữ tâm thế điềm tĩnh, không đưa ra quyết định hệ trọng trong lúc cảm xúc dao động.';
}

export function getAuthenticTarotCardInsights(
  cardCode: string,
  cardName: string,
  arcana: string,
  positionName: string,
  isReversed: boolean
) {
  const profile = TAROT_SEMANTIC_PROFILES[cardCode] ?? {
    id: cardCode,
    name: cardName,
    discipline: 'TAROT',
    arcana: (arcana as any) || 'MINOR',
    rank: 1,
    element: 'EARTH' as const,
    themes: ['tập trung', 'bài học thời điểm'],
    dynamics: ['chuyển hóa thực tế'],
    constructive: ['kiên định', 'cẩn trọng'],
    shadow: ['nóng vội', 'mất phương hướng'],
  };

  const { labelVn: posLabel } = normalizePositionSemantics(positionName);

  const keywords = [
    ...profile.themes.slice(0, 2),
    isReversed ? (profile.shadow[0] ?? 'chậm nhịp') : (profile.constructive[0] ?? 'phát triển'),
  ];

  const orientationText = isReversed ? 'chiều Ngược (Reversed)' : 'chiều Xuôi (Upright)';

  const symbolism = `Lá bài ${profile.name} (${profile.element}) mang năng lượng của ${profile.arcana === 'MAJOR' ? 'Đại Bí Tích — bài học nền tảng vận mệnh' : 'Tiểu Bí Tích — sự kiện và ứng xử cụ thể trong đời sống'}. Biểu tượng đại diện cho sự vận hành giữa ${profile.themes.join(' và ')}.`;

  const uprightMeaning = `Ở chiều xuôi, ${profile.name} biểu thị sự phát huy lành mạnh của các phẩm chất: ${profile.constructive.join(', ')}. Tiến trình đang diễn ra tự nhiên theo hướng ${profile.dynamics.join(' & ')}.`;

  const reversedMeaning = `Ở chiều ngược, ${profile.name} cảnh báo sự xuất hiện của lực cản hoặc sự thái quá từ: ${profile.shadow.join(', ')}. Năng lượng có thể đang bị dồn nén bên trong hoặc phản ánh sự chậm trễ cần rà soát lại phương thức tiếp cận.`;

  const careerFinance = {
    upright: `Trong công việc & tài chính, năng lượng của ${profile.name} xuôi ủng hộ việc áp dụng (${profile.constructive.slice(0, 2).join(', ')}). Thời điểm thích hợp để củng cố nền tảng và duy trì cam kết dài hạn.`,
    reversed: `Cần đề phòng rủi ro từ (${profile.shadow.slice(0, 2).join(', ')}). Tránh các quyết định đầu tư chớp nhoáng hoặc vội vã từ bỏ kế hoạch chỉ vì áp lực chi phí chìm ngắn hạn.`,
  };

  const loveRelationship = {
    upright: `Trong các mối quan hệ, lá bài xuôi mang lại sự thấu hiểu qua (${profile.themes.slice(0, 2).join(', ')}). Hai bên cùng đồng thuận xây dựng mối liên kết dựa trên (${profile.constructive[0] ?? 'chân thành'}).`,
    reversed: `Cảnh báo sự hiểu lầm hoặc cảm giác bất an phát sinh từ (${profile.shadow.slice(0, 2).join(', ')}). Cần bình tĩnh đối thoại thay vì áp đặt phán xét chủ quan.`,
  };

  const dos = {
    upright: `Tập trung vào: ${profile.constructive.join('; ')}; ghi nhận tiến trình từng bước.`,
    reversed: `Bình tĩnh nhìn nhận thẳng thắn vào các điểm nghẽn (${profile.shadow.slice(0, 2).join(', ')}); thiết lập ranh giới rõ ràng.`,
  };

  const donts = {
    upright: `Tránh ngủ quên trên thành tựu bước đầu hoặc dao động trước ý kiến trái chiều.`,
    reversed: `Tuyệt đối không để sự sốt ruột hoặc tiếc nuối chi phí quá khứ dẫn dắt hành động hiện tại.`,
  };

  return {
    cardCode,
    nameVn: `${profile.name} (${posLabel} — ${orientationText})`,
    keywords,
    symbolism,
    beginnerGuide: `Tại vị trí "${posLabel}": Vị trí này đóng vai trò như một thấu kính soi chiếu chính xác khía cạnh hoàn cảnh và tâm lý của bạn tại thời điểm này.`,
    arcanaMeaning: profile.arcana === 'MAJOR'
      ? 'Bộ Ẩn Chính (Major Arcana): Biểu thị các bài học định mệnh lớn, bước ngoặt tâm lý nền tảng và quy luật phổ quát chi phối đường đời.'
      : 'Bộ Ẩn Phụ (Minor Arcana): Biểu thị các sự kiện cụ thể đời thường, công việc chi tiết, cảm xúc tức thời và tương tác ứng xử hàng ngày.',
    orientationGuide: isReversed
      ? 'Chiều NGƯỢC (Reversed): Trong Tarot cổ điển, lá ngược không phải là điềm gở. Nó phản ánh năng lượng của lá bài đang bị kìm nén, trì hoãn, diễn ra âm thầm trong nội tâm hoặc nhắc nhở bạn cần chuyển hướng tiếp cận mềm dẻo hơn.'
      : 'Chiều XUÔI (Upright): Năng lượng của lá bài biểu đạt tự nhiên, trực diện và thông suốt nhất với hoàn cảnh khách quan bên ngoài.',
    coreSummary: isReversed ? reversedMeaning : uprightMeaning,
    uprightMeaning,
    reversedMeaning,
    careerFinance: isReversed ? careerFinance.reversed : careerFinance.upright,
    loveRelationship: isReversed ? loveRelationship.reversed : loveRelationship.upright,
    dos: isReversed ? dos.reversed : dos.upright,
    donts: isReversed ? donts.reversed : donts.upright,
    detailedCareerFinance: careerFinance,
    detailedLoveRelationship: loveRelationship,
    detailedDos: dos,
    detailedDonts: donts,
  };
}

export function synthesizeSpreadNarrative(
  draws: Array<{
    positionIndex: number;
    positionName: string;
    card: { name: string; arcana: string; suit?: string; number: number };
    isReversed: boolean;
  }>,
  spreadCode: string
) {
  const context = evaluateTarotSpread(
    draws.map((d) => ({
      positionIndex: d.positionIndex,
      positionName: d.positionName,
      card: {
        cardCode: (d.card as any).cardCode || `CARD_${d.positionIndex}`,
        name: d.card.name,
        arcana: d.card.arcana as any,
        suit: d.card.suit as any,
        number: d.card.number,
      } as any,
      isReversed: d.isReversed,
    })),
    spreadCode
  );

  return {
    dominantSuit: context.synthesis.dominantSuit,
    dominantSuitLabel: context.synthesis.dominantSuitLabel,
    elementBalance: context.synthesis.elementalBalance,
    narrativeArc: context.synthesis.summary,
    tensionAnalysis: context.synthesis.crossCardTension,
    coreProgression: context.synthesis.coreDynamicStatement,
    actionableGuidance: context.synthesis.practicalAdvice,
  };
}
