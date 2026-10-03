import {
  SemanticSignal,
  ContextualInterpretation,
  StructuredSynthesis,
  PracticalGuidance,
  TarotPositionResult,
} from '@mystic/core';
import { TAROT_SEMANTIC_PROFILES, TarotSemanticProfile } from './semantic-profiles.js';
import { MAJOR_ARCANA_DETAILED, MINOR_ARCANA_DETAILED } from './interpretations.js';

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

function getCardDetailed(cardCode: string) {
  return MAJOR_ARCANA_DETAILED[cardCode] || MINOR_ARCANA_DETAILED[cardCode];
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
    detailed?: ReturnType<typeof getCardDetailed>;
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

    const detailed = getCardDetailed(draw.card.cardCode);

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
      detailed,
      positionSemantics: posSem,
      orientation,
    });

    const isConstructive = orientation === 'UPRIGHT' && posSem.type !== 'CHALLENGE';
    const strength = draw.card.arcana === 'MAJOR' ? 0.9 : 0.7;
    const cardDisplayName = detailed?.nameVn || draw.card.name;

    const signal: SemanticSignal = {
      id: `sig_tarot_${draw.positionIndex}_${draw.card.cardCode}`,
      dimension: 'PERSONALITY',
      polarity: isConstructive ? 'constructive' : 'shadow',
      strength,
      source: `TAROT_DRAW_${draw.positionIndex}`,
      evidenceIds: [draw.card.cardCode],
      ruleIds: [`RULE_${draw.card.cardCode}_${orientation}_${posSem.type}`],
      contextTags: [posSem.type, orientation, profile.arcana, profile.element || 'EARTH'],
      description: `${cardDisplayName} (${draw.positionName}) — ${orientation === 'UPRIGHT' ? 'Xuôi' : 'Ngược'}`,
    };
    signals.push(signal);

    const interpretation: ContextualInterpretation = {
      id: `interp_tarot_${draw.positionIndex}`,
      dimension: 'PERSONALITY',
      headline: `${cardDisplayName} tại vị trí ${draw.positionName}`,
      statement: generateContextualCardStatement(profile, detailed, posSem.type, orientation, questionContext),
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
    crossCardTension = 'Sự cọ xát giữa Lửa (hành động bộc phát, đam mê nóng bỏng) và Nước (cảm xúc nội tâm, sự phòng thủ). Tránh để cảm xúc nhất thời dập tắt ý chí hoặc hành động vội vàng gây tổn thương các mối quan hệ.';
  } else if (elementCounts.AIR > 0 && elementCounts.WATER > 0) {
    crossCardTension = 'Sự giằng co giữa Khí (phân tích duy lý, phán đoán sắc lạnh) và Nước (trực giác, rung cảm cá nhân). Cần cân bằng giữa tư duy logic và sự thấu cảm mềm mỏng.';
  } else if (elementCounts.FIRE > 0 && elementCounts.EARTH > 0) {
    crossCardTension = 'Tương tác giữa Lửa (khát khao bứt phá nhanh) và Đất (đòi hỏi kỷ luật và an toàn tài chính). Cần kiên nhẫn để biến ngọn lửa ý tưởng thành nền móng thực tế vững vàng.';
  } else if (elementCounts.AIR > 0 && elementCounts.EARTH > 0) {
    crossCardTension = 'Khoảng cách giữa Khí (ý tưởng chiến lược, kế hoạch trừu tượng) và Đất (khả năng thực thi và ngân sách cụ thể). Cần đưa các giả định vào thử nghiệm thực tế nhỏ.';
  } else {
    crossCardTension = 'Các nguồn năng lượng trong trải bài có tính tương đồng cao, dòng chảy diễn ra trực tiếp và ít gặp sự cản trở chéo giữa các nguyên tố.';
  }

  // Dominant suit
  const sortedSuits = Object.entries(suitCounts)
    .filter(([, c]) => c > 0)
    .sort(([, a], [, b]) => b - a);
  const dominantSuit = sortedSuits[0]?.[0] ?? 'MAJOR';
  const suitLabels: Record<string, string> = {
    MAJOR: 'Bộ Ẩn Chính (Bài Học Định Mệnh & Bước Ngoặt Tâm Lý Lớn)',
    WANDS: 'Bộ Gậy (Hành Động, Ý Chí & Đam Mê Sáng Tạo)',
    CUPS: 'Bộ Chén (Cảm Xúc, Trực Giác & Gắn Kết Tâm Hồn)',
    SWORDS: 'Bộ Kiếm (Tư Duy Lý Tính, Sự Thật Khách Quan & Thách Thức)',
    PENTACLES: 'Bộ Tiền (Hiện Thực Hóa Vật Chất & Kỷ Luật Bền Vững)',
  };

  // Build holistic narrative
  const reversedCount = evaluatedCards.filter((c) => c.orientation === 'REVERSED').length;
  const majorCount = evaluatedCards.filter((c) => c.profile.arcana === 'MAJOR').length;

  let narrativeOverview = '';
  if (evaluatedCards.length >= 3) {
    const first = evaluatedCards[0];
    const mid = evaluatedCards[1];
    const last = evaluatedCards[evaluatedCards.length - 1];

    const firstTheme = first?.orientation === 'UPRIGHT'
      ? (first?.detailed?.keywords?.slice(0, 2).join(' & ') || 'khởi đầu thuận lợi')
      : (first?.detailed?.keywords?.[0] ? `sự chậm lại ở ${first.detailed.keywords[0]}` : 'áp lực tiềm ẩn');
    const midTheme = mid?.orientation === 'UPRIGHT'
      ? (mid?.detailed?.keywords?.slice(0, 2).join(' & ') || 'động lực phát triển')
      : (mid?.detailed?.keywords?.[0] ? `thử thách xoay quanh ${mid.detailed.keywords[0]}` : 'rào cản nội tâm');
    const lastTheme = last?.orientation === 'UPRIGHT'
      ? (last?.detailed?.keywords?.slice(0, 2).join(' & ') || 'kết quả sáng rõ')
      : (last?.detailed?.keywords?.[0] ? `sự thận trọng với ${last.detailed.keywords[0]}` : 'điều chỉnh kế hoạch');

    narrativeOverview = `Hành trình mở ra từ ${first?.detailed?.nameVn || first?.profile.name} (${first?.draw.positionName}), gắn liền với ${firstTheme}. Bước ngoặt trọng yếu chuyển tiếp qua ${mid?.detailed?.nameVn || mid?.profile.name} (${mid?.draw.positionName}), đòi hỏi bạn thấu suốt ${midTheme}. Cuối cùng, thông điệp định hướng hội tụ tại ${last?.detailed?.nameVn || last?.profile.name} (${last?.draw.positionName}), mang lại chỉ dẫn then chốt về ${lastTheme}.`;
  } else if (evaluatedCards.length === 1) {
    const single = evaluatedCards[0];
    const singleTheme = single?.orientation === 'UPRIGHT'
      ? (single?.detailed?.keywords?.slice(0, 2).join(' & ') || 'năng lượng tích cực')
      : (single?.detailed?.keywords?.[0] ? `bài học nội tâm về ${single.detailed.keywords[0]}` : 'sự kìm nén');
    narrativeOverview = `Lá bài ${single?.detailed?.nameVn || single?.profile.name} ngự tại ${single?.draw.positionName}, đóng vai trò như ngọn hải đăng soi sáng trọng tâm năng lượng xoay quanh ${singleTheme}.`;
  } else {
    narrativeOverview = `Tiến trình phản ánh sự vận hành liên tục giữa ${evaluatedCards.map((c) => c.detailed?.nameVn || c.profile.name).join(' → ')}.`;
  }

  let structureNote = '';
  if (majorCount >= 2) {
    structureNote = `Với ${majorCount} lá Ẩn Chính xuất hiện, đây là giai đoạn mang tính bước ngoặt định mệnh, đòi hỏi sự thức tỉnh nhận thức sâu sắc hơn là những điều chỉnh kỹ thuật nhỏ nhặt.`;
  } else if (reversedCount >= 2) {
    structureNote = `Sự xuất hiện của ${reversedCount} lá ngược cho thấy năng lượng đang vận hành âm ỉ bên trong nội tâm, nhắc nhở bạn cần đi chậm lại để quan sát và tháo gỡ các nút thắt trước khi tiến bước.`;
  } else {
    structureNote = `Năng lượng các lá bài đa phần ở chiều xuôi, cho thấy dòng chảy thuận lợi, hoàn cảnh bên ngoài và nội tâm của bạn đang có sự đồng điệu cao.`;
  }

  const fullNarrative = `${narrativeOverview} ${structureNote} ${crossCardTension}`;

  // Resolve concrete element names for tension
  let traitA = 'Nguyên tố chủ đạo';
  let traitB = 'Nguyên tố đối ứng';
  if (elementCounts.FIRE > 0 && elementCounts.WATER > 0) {
    traitA = 'Hành Hỏa (Ý chí & Hành động)';
    traitB = 'Hành Thủy (Cảm xúc & Nội tâm)';
  } else if (elementCounts.AIR > 0 && elementCounts.WATER > 0) {
    traitA = 'Hành Khí (Lý trí & Phán đoán)';
    traitB = 'Hành Thủy (Trực giác & Cảm xúc)';
  } else if (elementCounts.FIRE > 0 && elementCounts.EARTH > 0) {
    traitA = 'Hành Hỏa (Tốc độ & Đam mê)';
    traitB = 'Hành Thổ (Thực tiễn & Kỷ luật)';
  } else if (elementCounts.AIR > 0 && elementCounts.EARTH > 0) {
    traitA = 'Hành Khí (Chiến lược & Ý tưởng)';
    traitB = 'Hành Thổ (Ngân sách & Thực thi)';
  }

  const synthesis: StructuredSynthesis & {
    dominantSuit?: string;
    dominantSuitLabel?: string;
    spreadTheme?: string;
    summary?: string;
    practicalAdvice?: string;
    crossCardTension?: string;
  } = {
    dominantThemes: evaluatedCards.flatMap((c) => c.detailed?.keywords || c.profile.themes).slice(0, 4),
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
            traitA,
            traitB,
            dynamics: crossCardTension,
            resolution: 'Học cách điều hòa hai cực năng lượng bằng sự nhận thức khách quan và hành động có ý thức.',
          },
        ]
      : [],
    coreDynamicStatement: `Trọng tâm được dẫn dắt bởi ${suitLabels[dominantSuit] ?? dominantSuit}. ${structureNote}`,
    elementalBalance: elementCounts,
    dominantSuit,
    dominantSuitLabel: suitLabels[dominantSuit] ?? dominantSuit,
    crossCardTension,
    summary: fullNarrative,
    practicalAdvice: generatePracticalAdvice(evaluatedCards, dominantSuit),
  };

  const whatToContinue = evaluatedCards
    .filter((c) => c.orientation === 'UPRIGHT')
    .map((c) => c.detailed?.dos.upright || c.profile.constructive[0])
    .filter(Boolean) as string[];

  const whatToAdjustOrStop = evaluatedCards
    .filter((c) => c.orientation === 'REVERSED')
    .map((c) => c.detailed?.donts.reversed || c.profile.shadow[0])
    .filter(Boolean) as string[];

  const guidance: PracticalGuidance[] = [
    {
      actionPriority: 'IMMEDIATE',
      timeframe: '7_DAYS',
      rationale: `Dựa trên năng lượng của ${suitLabels[dominantSuit] ?? dominantSuit} và cấu trúc trải bài.`,
      whatToContinue: whatToContinue.slice(0, 3),
      whatToAdjustOrStop: whatToAdjustOrStop.slice(0, 3),
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
  detailed: ReturnType<typeof getCardDetailed> | undefined,
  posType: string,
  orientation: 'UPRIGHT' | 'REVERSED',
  _questionContext: string
): string {
  const isUpright = orientation === 'UPRIGHT';
  const cardName = detailed?.nameVn || profile.name;
  const kw = detailed?.keywords?.join(', ') || profile.constructive.join(', ');
  const kwShadow = detailed?.keywords?.slice(0, 2).join(', ') || profile.shadow.join(', ');

  switch (posType) {
    case 'CURRENT_SITUATION':
      return isUpright
        ? `${detailed?.uprightMeaning ?? `${cardName} biểu thị dòng chảy tích cực xoay quanh ${kw}.`} Đây là điểm tựa hiện hữu để bạn tự tin phát huy tối đa năng lực sẵn có.`
        : `${detailed?.reversedMeaning ?? `${cardName} (chiều ngược) phản ánh trạng thái nghẽn tắc từ ${kwShadow}.`} Cần bình tâm tháo gỡ các nút thắt nội tâm trước khi đưa ra quyết sách lớn.`;

    case 'CHALLENGE':
      return isUpright
        ? `${cardName} đóng vai trò như phép thử: ${detailed?.uprightMeaning ?? `bài học kiểm soát năng lượng ${kw}`}. Thách thức nằm ở việc giữ vững kỷ luật mà không biến thành cứng nhắc, giáo điều.`
        : `${cardName} (chiều ngược) chỉ ra chướng ngại xuất phát từ: ${kwShadow}. ${detailed?.reversedMeaning ?? 'Năng lượng đang bị phản ứng thái quá hoặc từ chối nhìn nhận sự thật.'}`;

    case 'ADVICE':
      return isUpright
        ? `${detailed?.dos.upright ? `Hành động tối ưu: ${detailed.dos.upright}.` : ''} ${detailed?.uprightMeaning ?? `${cardName} nhắc nhở bạn kiên định với ${kw}.`}`
        : `${detailed?.donts.reversed ? `Lời nhắc nhở: ${detailed.donts.reversed}.` : ''} ${detailed?.reversedMeaning ?? 'Chuyển hóa cách tiếp cận mềm mỏng và dành không gian tự nhìn nhận lại bản thân.'}`;

    case 'OUTCOME':
      return isUpright
        ? `${detailed?.uprightMeaning ?? `${cardName} kết tinh thành quả tích cực từ ${kw}.`} Xu hướng phát triển đang mở ra cơ hội vững chắc nếu bạn duy trì sự kiên định.`
        : `${detailed?.reversedMeaning ?? `${cardName} (chiều ngược) dự phóng sự chậm trễ từ ${kwShadow}.`} Cần chủ động rà soát lại các phương án dự phòng để giảm thiểu rủi ro biến số ngoài ý muốn.`;

    default:
      return isUpright
        ? (detailed?.uprightMeaning ?? `${cardName} mang lại nguồn năng lượng tích cực từ ${kw}.`)
        : (detailed?.reversedMeaning ?? `${cardName} (chiều ngược) cảnh báo nguy cơ từ ${kwShadow}.`);
  }
}

function generatePracticalAdvice(
  _evaluatedCards: Array<{ profile: TarotSemanticProfile; orientation: 'UPRIGHT' | 'REVERSED' }>,
  dominantSuit: string
): string {
  if (dominantSuit === 'SWORDS') {
    return 'Phác đồ 7 ngày (Nguyên tố Khí — Trí tuệ): 1. Ngày 1-2: Liệt kê rõ 3 giả định gây lo lắng nhất ra giấy, kiểm chứng tính xác thực khách quan; 2. Ngày 3-5: Dừng tranh cãi vô bổ, nói sự thật với lòng trắc ẩn; 3. Ngày 6-7: Đưa ra quyết định dứt khoát dựa trên dữ liệu minh bạch.';
  }
  if (dominantSuit === 'CUPS') {
    return 'Phác đồ 7 ngày (Nguyên tố Nước — Cảm xúc): 1. Ngày 1-2: Dành 15 phút mỗi tối lắng nghe nhu cầu cảm xúc chân thật của chính mình; 2. Ngày 3-5: Chia sẻ chân thành với một người bạn tin cậy, tháo gỡ hiểu lầm; 3. Ngày 6-7: Thực hành tha thứ và thiết lập ranh giới cảm xúc an toàn.';
  }
  if (dominantSuit === 'WANDS') {
    return 'Phác đồ 7 ngày (Nguyên tố Lửa — Hành động): 1. Ngày 1-2: Chọn 1 mục tiêu quan trọng nhất đang bị trì hoãn và bắt tay làm bước đầu tiên trong 24h tới; 2. Ngày 3-5: Duy trì ngọn lửa nhiệt huyết, kiên trì vượt qua rào cản cọ xát; 3. Ngày 6-7: Đánh giá thành quả và chuẩn bị mở rộng quy mô.';
  }
  if (dominantSuit === 'PENTACLES') {
    return 'Phác đồ 7 ngày (Nguyên tố Đất — Thực tiễn): 1. Ngày 1-2: Rà soát lại kỷ luật tài chính và lập danh sách chi tiết các công việc cần hoàn thiện dứt điểm; 2. Ngày 3-5: Tập trung chuyên tâm nâng cao chất lượng tay nghề; 3. Ngày 6-7: Tận hưởng thành quả lao động và tái đầu tư an toàn.';
  }
  return 'Phác đồ 7 ngày (Bộ Ẩn Chính — Bài học Định Mệnh): 1. Ngày 1-2: Nhìn nhận hoàn cảnh hiện tại như một bài học lớn về bản lĩnh nhân sinh; 2. Ngày 3-5: Giữ tâm thế điềm tĩnh, không đưa ra quyết định hệ trọng trong lúc cảm xúc dao động; 3. Ngày 6-7: Đón nhận sự chuyển hóa với tâm thế can đảm và tự do.';
}

export function getAuthenticTarotCardInsights(
  cardCode: string,
  cardName: string,
  arcana: string,
  positionName: string,
  isReversed: boolean
) {
  const detailed = getCardDetailed(cardCode);
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
  const orientationText = isReversed ? 'chiều Ngược (Reversed)' : 'chiều Xuôi (Upright)';
  const displayName = detailed?.nameVn || profile.name;

  if (detailed) {
    return {
      cardCode,
      nameVn: `${detailed.nameVn} (${posLabel} — ${orientationText})`,
      cardTitle: detailed.nameVn,
      keywords: detailed.keywords,
      symbolism: detailed.symbolism,
      beginnerGuide: `Tại vị trí "${posLabel}": Vị trí này đóng vai trò như một thấu kính soi chiếu chính xác khía cạnh hoàn cảnh và tâm lý của bạn tại thời điểm này.`,
      arcanaMeaning: profile.arcana === 'MAJOR'
        ? 'Bộ Ẩn Chính (Major Arcana): Biểu thị các bài học định mệnh lớn, bước ngoặt tâm lý nền tảng và quy luật phổ quát chi phối đường đời.'
        : 'Bộ Ẩn Phụ (Minor Arcana): Biểu thị các sự kiện cụ thể đời thường, công việc chi tiết, cảm xúc tức thời và tương tác ứng xử hàng ngày.',
      orientationGuide: isReversed
        ? 'Chiều NGƯỢC (Reversed): Trong Tarot cổ điển, lá ngược không phải là điềm gở. Nó phản ánh năng lượng của lá bài đang bị kìm nén, trì hoãn, diễn ra âm thầm trong nội tâm hoặc nhắc nhở bạn cần chuyển hướng tiếp cận mềm dẻo hơn.'
        : 'Chiều XUÔI (Upright): Năng lượng của lá bài biểu đạt tự nhiên, trực diện và thông suốt nhất với hoàn cảnh khách quan bên ngoài.',
      coreSummary: isReversed ? detailed.reversedMeaning : detailed.uprightMeaning,
      uprightMeaning: detailed.uprightMeaning,
      reversedMeaning: detailed.reversedMeaning,
      careerFinance: isReversed ? detailed.careerFinance.reversed : detailed.careerFinance.upright,
      loveRelationship: isReversed ? detailed.loveRelationship.reversed : detailed.loveRelationship.upright,
      dos: isReversed ? detailed.dos.reversed : detailed.dos.upright,
      donts: isReversed ? detailed.donts.reversed : detailed.donts.upright,
      detailedCareerFinance: detailed.careerFinance,
      detailedLoveRelationship: detailed.loveRelationship,
      detailedDos: detailed.dos,
      detailedDonts: detailed.donts,
    };
  }

  // Fallback if not found in dictionary
  const keywords = [
    ...profile.themes.slice(0, 2),
    isReversed ? (profile.shadow[0] ?? 'chậm nhịp') : (profile.constructive[0] ?? 'phát triển'),
  ];

  const uprightMeaning = `Ở chiều xuôi, ${displayName} biểu thị sự phát huy lành mạnh của các phẩm chất tích cực. Tiến trình đang diễn ra tự nhiên theo đúng định hướng.`;
  const reversedMeaning = `Ở chiều ngược, ${displayName} cảnh báo sự xuất hiện của lực cản hoặc sự thái quá. Năng lượng có thể đang bị dồn nén bên trong cần rà soát lại phương thức tiếp cận.`;

  return {
    cardCode,
    nameVn: `${displayName} (${posLabel} — ${orientationText})`,
    cardTitle: displayName,
    keywords,
    symbolism: `Lá bài ${displayName} mang năng lượng nguyên tố ${profile.element}. Biểu tượng đại diện cho sự vận hành giữa ${profile.themes.join(' và ')}.`,
    beginnerGuide: `Tại vị trí "${posLabel}": Thấu kính phản chiếu tâm lý và hoàn cảnh của bạn tại thời điểm này.`,
    arcanaMeaning: profile.arcana === 'MAJOR' ? 'Bộ Ẩn Chính (Bài học lớn)' : 'Bộ Ẩn Phụ (Đời sống thực tế)',
    orientationGuide: isReversed ? 'Chiều Ngược: Năng lượng nội tâm/chậm lại.' : 'Chiều Xuôi: Năng lượng thông suốt trực diện.',
    coreSummary: isReversed ? reversedMeaning : uprightMeaning,
    uprightMeaning,
    reversedMeaning,
    careerFinance: isReversed
      ? 'Cần đề phòng rủi ro; tránh các quyết định đầu tư chớp nhoáng hoặc vội vã từ bỏ kế hoạch.'
      : 'Thời điểm thích hợp để củng cố nền tảng và duy trì cam kết dài hạn trong công việc.',
    loveRelationship: isReversed
      ? 'Cảnh báo sự hiểu lầm hoặc bất an; cần bình tĩnh đối thoại thay vì áp đặt phán xét.'
      : 'Mang lại sự thấu hiểu và chân thành trong các mối quan hệ tình cảm.',
    dos: isReversed ? 'Bình tĩnh rà soát lại phương án; thiết lập ranh giới rõ ràng.' : 'Kiên trì theo đuổi mục tiêu; ghi nhận tiến trình từng bước.',
    donts: isReversed ? 'Không để sự sốt ruột dẫn dắt hành động hiện tại.' : 'Không chủ quan tự mãn khi bước đầu có thành tựu.',
    detailedCareerFinance: { upright: 'Thuận lợi trong công việc.', reversed: 'Cẩn trọng rủi ro tài chính.' },
    detailedLoveRelationship: { upright: 'Gắn kết chân thành.', reversed: 'Cần lắng nghe thấu hiểu.' },
    detailedDos: { upright: 'Hành động kiên định.', reversed: 'Bình tâm xem xét lại.' },
    detailedDonts: { upright: 'Không chủ quan.', reversed: 'Không bốc đồng.' },
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

