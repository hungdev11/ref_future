import {
  SemanticSignal,
  ContextualInterpretation,
  StructuredSynthesis,
  PracticalGuidance,
} from '@mystic/core';
import {
  NUMEROLOGY_NUMBER_PROFILES,
  NumerologyNumberSemanticProfile,
} from './semantic-profiles.js';

export interface NumerologyContextEvaluation {
  signals: SemanticSignal[];
  interpretations: ContextualInterpretation[];
  synthesis: StructuredSynthesis;
  guidance: PracticalGuidance[];
}

export function evaluateNumerologyProfile(input: {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  personalYear: number;
  activePinnacle?: number;
  attitudeNumber?: number;
  karmicDebts?: string[];
}): NumerologyContextEvaluation {
  const signals: SemanticSignal[] = [];
  const interpretations: ContextualInterpretation[] = [];

  const coreSpecs: Array<{
    dimension: 'LIFE_PATH' | 'EXPRESSION' | 'SOUL_URGE' | 'PERSONAL_YEAR' | 'PINNACLE';
    number: number;
    labelVn: string;
    weight: number;
  }> = [
    { dimension: 'LIFE_PATH', number: input.lifePath, labelVn: 'Đường Đời (Life Path)', weight: 0.95 },
    { dimension: 'EXPRESSION', number: input.expression, labelVn: 'Sứ Mệnh / Năng Lực (Expression)', weight: 0.85 },
    { dimension: 'SOUL_URGE', number: input.soulUrge, labelVn: 'Linh Hồn (Soul Urge)', weight: 0.80 },
    { dimension: 'PERSONAL_YEAR', number: input.personalYear, labelVn: 'Năm Cá Nhân (Personal Year)', weight: 0.85 },
  ];

  if (input.activePinnacle !== undefined) {
    coreSpecs.push({
      dimension: 'PINNACLE',
      number: input.activePinnacle,
      labelVn: 'Đỉnh Cao Hiện Tại (Pinnacle)',
      weight: 0.80,
    });
  }

  const profilesMap: Record<string, NumerologyNumberSemanticProfile> = {};

  // 1. Evaluate Core Number Placements
  for (const spec of coreSpecs) {
    const profile = NUMEROLOGY_NUMBER_PROFILES[spec.number] ?? NUMEROLOGY_NUMBER_PROFILES[1]!;
    profilesMap[spec.dimension] = profile;

    // Emits constructive signals
    for (const cons of profile.constructive.slice(0, 2)) {
      signals.push({
        id: `num_${spec.dimension.toLowerCase()}_${profile.number}_${cons}`,
        dimension: spec.dimension,
        polarity: 'constructive',
        strength: spec.weight,
        source: `NUM_${profile.number}`,
        evidenceIds: [`dimension_${spec.dimension}`, `number_${profile.number}`],
        ruleIds: [`RULE_NUM_${spec.dimension}`],
        contextTags: [spec.dimension, profile.plane],
        description: `${spec.labelVn} mang năng lượng số ${profile.number}: ${cons}`,
      });
    }

    // Emits shadow signals
    for (const sh of profile.shadow.slice(0, 2)) {
      signals.push({
        id: `num_${spec.dimension.toLowerCase()}_${profile.number}_shadow_${sh}`,
        dimension: spec.dimension,
        polarity: 'tension',
        strength: spec.weight * 0.8,
        source: `NUM_${profile.number}`,
        evidenceIds: [`dimension_${spec.dimension}`, `number_${profile.number}`],
        ruleIds: [`RULE_NUM_${spec.dimension}_SHADOW`],
        contextTags: [spec.dimension, 'shadow'],
        description: `Nguy cơ mất cân bằng ở ${spec.labelVn}: ${sh}`,
      });
    }

    // Contextual Interpretation per Dimension
    const headline = `${spec.labelVn}: Số ${profile.number} — ${profile.name}`;
    let statement = '';

    if (spec.dimension === 'LIFE_PATH') {
      statement = `Con số Đường Đời ${profile.number} xác định bài học tiến hóa cốt lõi xuyên suốt hành trình đời người. Bạn được định hình bởi (${profile.themes.slice(0, 3).join(', ')}). Sức mạnh thực sự bộc lộ khi bạn áp dụng (${profile.constructive.join(', ')}), và kiểm soát nguy cơ (${profile.shadow.join(', ')}).`;
    } else if (spec.dimension === 'EXPRESSION') {
      statement = `Con số Sứ Mệnh ${profile.number} cho biết phương tiện và năng lực thực thi tự nhiên của bạn. Vũ khí thế mạnh của bạn là (${profile.constructive.slice(0, 3).join(', ')}), giúp bạn biến ý tưởng thành thành quả cụ thể.`;
    } else if (spec.dimension === 'SOUL_URGE') {
      statement = `Con số Linh Hồn ${profile.number} phản ánh khát khao nội tâm thầm kín nhất. Bạn tìm thấy sự thỏa mãn tinh thần sâu sắc khi được sống trong dòng chảy của (${profile.themes.slice(0, 2).join(' & ')}).`;
    } else if (spec.dimension === 'PERSONAL_YEAR') {
      statement = `Năm cá nhân số ${profile.number} tạo nên khí hậu năng lượng chủ đạo trong 12 tháng. Trọng tâm của chu kỳ này là (${profile.dynamics.join(' & ')}). Đây là thời điểm lý tưởng để gặt hái (${profile.constructive.slice(0, 2).join(', ')}).`;
    } else {
      statement = `Đỉnh cao chặng đời số ${profile.number} thúc đẩy sự tích lũy thành tựu ở lĩnh vực (${profile.themes.join(', ')}).`;
    }

    interpretations.push({
      id: `num_interp_${spec.dimension}`,
      dimension: spec.dimension,
      headline,
      statement,
      signals: signals.filter(s => s.dimension === spec.dimension).map(s => s.id),
      evidenceIds: [`number_${profile.number}`, `dimension_${spec.dimension}`],
      ruleIds: [`RULE_NUM_${spec.dimension}`],
      polarity: 'supportive',
      strength: spec.weight,
      confidence: 'high',
      context: {
        dimension: spec.dimension,
        number: profile.number,
        plane: profile.plane,
      },
    });
  }

  // 2. Synthesize Inter-Number Tensions & Synergies
  const tensions: Array<{ traitA: string; traitB: string; dynamics: string; resolution: string }> = [];
  const reinforcements: Array<{ theme: string; sources: string[]; explanation: string }> = [];

  const lpProfile = profilesMap.LIFE_PATH;
  const expProfile = profilesMap.EXPRESSION;
  const soulProfile = profilesMap.SOUL_URGE;

  if (lpProfile && expProfile) {
    if (lpProfile.number === expProfile.number) {
      reinforcements.push({
        theme: `Đồng nhất tuyệt đối giữa Đường Đời và Sứ Mệnh (Số ${lpProfile.number})`,
        sources: ['Đường Đời', 'Sứ Mệnh'],
        explanation: `Bạn có sự tập trung năng lượng phi thường khi phương thức hành động hòa làm một với mục tiêu tiến hóa cốt lõi.`,
      });
    } else {
      tensions.push({
        traitA: `Đường Đời ${lpProfile.number} (${lpProfile.themes[0]})`,
        traitB: `Sứ Mệnh ${expProfile.number} (${expProfile.themes[0]})`,
        dynamics: `Hành trình lớn đòi hỏi ${lpProfile.themes[0]}, trong khi phương thức hành động tự nhiên thiên về ${expProfile.themes[0]}.`,
        resolution: `Tích hợp hai nguồn lực: Dùng năng lực chuyên môn của số ${expProfile.number} để phục vụ trọn vẹn cho bài học trưởng thành của số ${lpProfile.number}.`,
      });
    }
  }

  if (lpProfile && soulProfile && lpProfile.number !== soulProfile.number) {
    tensions.push({
      traitA: `Đường Đời ${lpProfile.number} (Mục tiêu bên ngoài)`,
      traitB: `Linh Hồn ${soulProfile.number} (Động lực nội tâm)`,
      dynamics: `Áp lực hiện thực hóa của số ${lpProfile.number} cần được nuôi dưỡng bởi sự thỏa mãn nội tâm từ số ${soulProfile.number}.`,
      resolution: `Dành thời gian thỏa mãn giá trị tinh thần của số ${soulProfile.number} để duy trì ngọn lửa nội lực cho số ${lpProfile.number}.`,
    });
  }

  const dominantThemes = Array.from(
    new Set(signals.filter(s => s.polarity === 'constructive').map(s => s.description || s.id))
  ).slice(0, 4);

  const coreDynamicStatement = `Cấu trúc số học xoay quanh trục Đường Đời ${input.lifePath} và Sứ Mệnh ${input.expression}. Năm cá nhân số ${input.personalYear} định hướng hành động trực tiếp. ${tensions.length > 0 ? tensions[0]?.dynamics : 'Hệ thống vận hành hài hòa.'}`;

  // 3. Practical Guidance
  const whatToContinue: string[] = [];
  const whatToAdjustOrStop: string[] = [];

  for (const sig of signals) {
    if (sig.polarity === 'constructive' && whatToContinue.length < 4) {
      whatToContinue.push(sig.description || sig.id);
    }
    if (sig.polarity === 'tension' && whatToAdjustOrStop.length < 4) {
      whatToAdjustOrStop.push(sig.description || sig.id);
    }
  }

  const guidance: PracticalGuidance[] = [
    {
      actionPriority: 'STRATEGIC',
      timeframe: `Năm cá nhân số ${input.personalYear}`,
      rationale: `Phát sinh từ nhịp điệu của năm cá nhân ${input.personalYear} kết hợp với bài học số ${input.lifePath}.`,
      whatToContinue,
      whatToAdjustOrStop,
      triggerSignals: signals.filter(s => s.polarity === 'tension').map(s => s.id),
    },
  ];

  return {
    signals,
    interpretations,
    synthesis: {
      dominantThemes,
      reinforcements,
      tensions,
      coreDynamicStatement,
    },
    guidance,
  };
}
