import {
  SemanticSignal,
  ContextualInterpretation,
  StructuredSynthesis,
  PracticalGuidance,
} from '@mystic/core';
import {
  TUVI_STAR_PROFILES,
  TUVI_PALACE_PROFILES,
  TuViStarSemanticProfile,
} from './semantic-profiles.js';

export interface TuViPalaceContextEvaluation {
  palaceKey: string;
  palaceNameVn: string;
  signals: SemanticSignal[];
  interpretations: ContextualInterpretation[];
  synthesis: StructuredSynthesis;
  guidance: PracticalGuidance[];
}

export function evaluateTuViPalace(
  palaceKey: string,
  palaceData: {
    name: string;
    branch: string;
    majorStars: Array<{ starCode?: string; name: string; brightness?: string }>;
    minorStars?: Array<{ starCode?: string; name: string; type?: string }>;
    hasTuan?: boolean;
    hasTriet?: boolean;
    cungThan?: boolean;
  },
  menhElement?: string
): TuViPalaceContextEvaluation {
  const palaceProfile = TUVI_PALACE_PROFILES[palaceKey] ?? {
    id: palaceKey,
    name: palaceData.name || palaceKey,
    discipline: 'TUVI',
    category: 'TAM_PHUONG_TU_CHINH' as const,
    coreFocus: 'Lĩnh vực đời sống',
    themes: ['van_trinh', 'tich_luy'],
    dynamics: ['chuyen_hoa'],
    constructive: ['on_dinh'],
    shadow: ['bien_dong'],
  };

  const signals: SemanticSignal[] = [];
  const interpretations: ContextualInterpretation[] = [];

  const majorStarEvaluations: Array<{
    star: { starCode?: string; name: string; brightness?: string };
    profile: TuViStarSemanticProfile;
    brightness: string;
    isMieuVuong: boolean;
    isHam: boolean;
  }> = [];

  for (const s of palaceData.majorStars || []) {
    const code = s.starCode || s.name;
    const profile = TUVI_STAR_PROFILES[code] ?? {
      id: code,
      name: s.name,
      discipline: 'TUVI',
      category: 'CHINH_TINH' as const,
      element: 'THO' as const,
      yinYang: 'DUONG' as const,
      themes: ['tinh_tu_chieu_menh', 'khi_chat_rieng'],
      dynamics: ['van_hanh_quy_dao'],
      constructive: ['phat_huy_thuc_luc'],
      shadow: ['canh_giac_tro_ngai'],
    };

    const brightness = (s.brightness || 'Đ').toUpperCase();
    const isMieuVuong = brightness.includes('M') || brightness.includes('V');
    const isHam = brightness.includes('H');

    majorStarEvaluations.push({
      star: s,
      profile,
      brightness,
      isMieuVuong,
      isHam,
    });

    // 1. Generate Star Signals
    if (isMieuVuong) {
      for (const cons of profile.constructive) {
        signals.push({
          id: `tuvi_${palaceKey}_${profile.id}_${cons}`,
          dimension: palaceKey,
          polarity: 'constructive',
          strength: 0.90,
          source: profile.id,
          evidenceIds: [`palace_${palaceKey}`, `star_${profile.id}_${brightness}`],
          ruleIds: ['RULE_TUVI_STAR_MIEU_VUONG'],
          contextTags: [palaceKey, 'MIEU_VUONG', profile.element],
          description: `Chính tinh ${profile.name} đắc/miếu địa phát huy phẩm chất: ${cons}`,
        });
      }
    } else if (isHam) {
      for (const sh of profile.shadow) {
        signals.push({
          id: `tuvi_${palaceKey}_${profile.id}_${sh}`,
          dimension: palaceKey,
          polarity: 'tension',
          strength: 0.85,
          source: profile.id,
          evidenceIds: [`palace_${palaceKey}`, `star_${profile.id}_${brightness}`],
          ruleIds: ['RULE_TUVI_STAR_HAM_DIA'],
          contextTags: [palaceKey, 'HAM_DIA', profile.element],
          description: `Chính tinh ${profile.name} hãm địa bộc lộ nguy cơ: ${sh}`,
        });
      }
    } else {
      // Đắc địa / Bình hòa
      for (const theme of profile.themes.slice(0, 3)) {
        signals.push({
          id: `tuvi_${palaceKey}_${profile.id}_${theme}`,
          dimension: palaceKey,
          polarity: 'constructive',
          strength: 0.75,
          source: profile.id,
          evidenceIds: [`palace_${palaceKey}`, `star_${profile.id}_${brightness}`],
          ruleIds: ['RULE_TUVI_STAR_DAC_BINH'],
          contextTags: [palaceKey, 'DAC_DIA', profile.element],
          description: `Chính tinh ${profile.name} bình hòa định hình chủ đề: ${theme}`,
        });
      }
    }
  }

  // 2. Modifiers: Tuần, Triệt, Cung Thân
  if (palaceData.hasTuan) {
    signals.push({
      id: `tuvi_${palaceKey}_tuan_khong`,
      dimension: palaceKey,
      polarity: 'neutral',
      strength: 0.70,
      source: 'TUAN_KHONG',
      evidenceIds: [`palace_${palaceKey}`, 'tuan_modifier'],
      ruleIds: ['RULE_TUVI_TUAN_MODIFIER'],
      contextTags: ['tuan', 'moderation'],
      description: 'Tuần Không đóng tại cung: Giảm bớt hung tinh, nhưng làm chậm thời cơ phát tác cát tinh',
    });
  }

  if (palaceData.hasTriet) {
    signals.push({
      id: `tuvi_${palaceKey}_triet_lo`,
      dimension: palaceKey,
      polarity: 'tension',
      strength: 0.80,
      source: 'TRIET_LO',
      evidenceIds: [`palace_${palaceKey}`, 'triet_modifier'],
      ruleIds: ['RULE_TUVI_TRIET_MODIFIER'],
      contextTags: ['triet', 'early_disruption'],
      description: 'Triệt Lộ Không Vong: Tạo trở ngại tiền vận trước 30 tuổi, phá vỡ hãm địa nhưng cản trở miếu vượng',
    });
  }

  // 3. Build Contextual Interpretation for this Palace
  const starNames = majorStarEvaluations.map(e => `${e.profile.name} (${e.brightness})`).join(', ');
  const dominantStarThemes = Array.from(
    new Set(majorStarEvaluations.flatMap(e => e.profile.themes))
  );

  let headline = `${palaceProfile.name}: ${starNames ? starNames : 'Vô Chính Diệu'}`;
  let statement = '';

  if (majorStarEvaluations.length === 0) {
    statement = `${palaceProfile.name} không có chính tinh tọa thủ (Vô Chính Diệu). Tính chất cung này phản ánh sự linh hoạt, dễ hấp thu năng lượng từ cung xung chiếu và tam hợp. Trọng tâm là dựa vào nội lực tự thân hoặc mượn lực từ quý nhân đối phương.`;
  } else {
    const hasMieu = majorStarEvaluations.some(e => e.isMieuVuong);
    const hasHam = majorStarEvaluations.some(e => e.isHam);

    if (hasMieu && !hasHam) {
      statement = `${palaceProfile.name} đắc cách với ${starNames}, hội tụ năng lượng sáng rực của (${dominantStarThemes.slice(0, 3).join(', ')}). Bản lĩnh và cơ hội ở lĩnh vực này rất rõ ràng, tạo bệ phóng vững chắc để hiện thực hóa các mục tiêu dài hạn.`;
    } else if (hasHam) {
      statement = `${palaceProfile.name} gặp vị thế hãm địa của ${starNames}. Năng lượng của (${dominantStarThemes.slice(0, 3).join(', ')}) dễ gặp lực cản hoặc biến động nếu thiếu sự kiên nhẫn. Tuy nhiên, nếu biết rèn luyện và kiểm soát điểm yếu, đây chính là nơi tôi luyện nội lực lớn nhất.`;
    } else {
      statement = `${palaceProfile.name} an vị với ${starNames}. Tiến trình phát triển ổn định, từng bước tích lũy theo quy luật tự nhiên mà không trải qua quá nhiều thăng trầm cực đoan.`;
    }
  }

  if (palaceData.hasTuan) {
    statement += ' Có Tuần Không án ngữ giúp dung hòa các xung đột nhưng đòi hỏi sự nhẫn nại trước các biến chuyển chậm.';
  }
  if (palaceData.hasTriet) {
    statement += ' Gặp Triệt Lộ cảnh báo giai đoạn khởi đầu trước 30 tuổi cần thận trọng, tránh nôn nóng đốt cháy giai đoạn.';
  }

  interpretations.push({
    id: `tuvi_interp_${palaceKey}`,
    dimension: palaceKey,
    headline,
    statement,
    signals: signals.map(s => s.id),
    evidenceIds: [`palace_${palaceKey}`, ...majorStarEvaluations.map(e => `star_${e.profile.id}`)],
    ruleIds: ['RULE_TUVI_PALACE_COMPREHENSIVE'],
    polarity: majorStarEvaluations.some(e => e.isHam) ? 'tension' : 'supportive',
    strength: majorStarEvaluations.length > 0 ? 0.85 : 0.65,
    confidence: 'high',
    context: {
      palaceKey,
      palaceName: palaceData.name,
      starCount: majorStarEvaluations.length,
      hasTuan: palaceData.hasTuan,
      hasTriet: palaceData.hasTriet,
      menhElement,
    },
  });

  // 4. Synthesis & Guidance
  const constructiveList: string[] = [];
  const shadowList: string[] = [];

  for (const e of majorStarEvaluations) {
    constructiveList.push(...e.profile.constructive.slice(0, 2));
    if (e.isHam) {
      shadowList.push(...e.profile.shadow.slice(0, 2));
    }
  }

  const guidance: PracticalGuidance[] = [
    {
      actionPriority: majorStarEvaluations.some(e => e.isHam) ? 'STRATEGIC' : 'REFLECTIVE',
      timeframe: 'Trung hạn (chu kỳ đại vận 10 năm)',
      rationale: `Dựa trên cách cục tọa thủ tại ${palaceProfile.name} với ${starNames || 'Vô Chính Diệu'}.`,
      whatToContinue: constructiveList.length > 0 ? Array.from(new Set(constructiveList)) : ['Duy trì tính thận trọng và linh hoạt thích ứng'],
      whatToAdjustOrStop: shadowList.length > 0 ? Array.from(new Set(shadowList)) : ['Tránh nóng vội và bảo thủ trước thay đổi'],
      triggerSignals: signals.filter(s => s.polarity === 'tension').map(s => s.id),
    },
  ];

  return {
    palaceKey,
    palaceNameVn: palaceProfile.name,
    signals,
    interpretations,
    synthesis: {
      dominantThemes: dominantStarThemes.slice(0, 4),
      reinforcements: [],
      tensions: [],
      coreDynamicStatement: statement,
    },
    guidance,
  };
}
