import {
  SemanticSignal,
  ContextualInterpretation,
  StructuredSynthesis,
  PracticalGuidance,
} from '@mystic/core';
import {
  ASTROLOGY_PLANET_PROFILES,
  ASTROLOGY_ZODIAC_PROFILES,
  ASTROLOGY_HOUSE_PROFILES,
} from './semantic-profiles.js';

export interface AstrologyContextEvaluation {
  signals: SemanticSignal[];
  interpretations: ContextualInterpretation[];
  synthesis: StructuredSynthesis;
  guidance: PracticalGuidance[];
}

export function evaluateAstrologyChart(
  planets: Record<string, { sign: string; longitude: number; house?: number }>,
  _houses: Array<{ houseNumber: number; sign: string; cuspLongitude: number }>,
  aspects: Array<{ planet1: string; planet2: string; type: string; orb: number; isHarmonious?: boolean }>
): AstrologyContextEvaluation {
  const signals: SemanticSignal[] = [];
  const interpretations: ContextualInterpretation[] = [];

  const elementCounts: Record<string, number> = { FIRE: 0, EARTH: 0, AIR: 0, WATER: 0 };
  const modalityCounts: Record<string, number> = { CARDINAL: 0, FIXED: 0, MUTABLE: 0 };

  // 1. Evaluate Planet in Sign & House
  for (const [pKey, pData] of Object.entries(planets)) {
    const planetProfile = ASTROLOGY_PLANET_PROFILES[pKey.toLowerCase()];
    const signProfile = ASTROLOGY_ZODIAC_PROFILES[pData.sign.toUpperCase()];
    const houseProfile = pData.house ? ASTROLOGY_HOUSE_PROFILES[`house_${pData.house}`] : undefined;

    if (!planetProfile || !signProfile) continue;

    elementCounts[signProfile.element] = (elementCounts[signProfile.element] || 0) + 1;
    modalityCounts[signProfile.modality] = (modalityCounts[signProfile.modality] || 0) + 1;

    // Is Luminary/Personal?
    const isLuminary = planetProfile.category === 'LUMINARY';
    const weight = isLuminary ? 0.90 : 0.75;

    // Emits constructive signals
    for (const cons of signProfile.constructive.slice(0, 2)) {
      signals.push({
        id: `astro_${planetProfile.id}_${signProfile.id}_${cons}`,
        dimension: planetProfile.id,
        polarity: 'constructive',
        strength: weight,
        source: planetProfile.id,
        evidenceIds: [`planet_${planetProfile.id}`, `sign_${signProfile.id}`, ...(houseProfile ? [`house_${houseProfile.houseNumber}`] : [])],
        ruleIds: ['RULE_ASTRO_PLANET_SIGN_HARMONY'],
        contextTags: [signProfile.element, signProfile.modality, ...(houseProfile ? [houseProfile.domain] : [])],
        description: `${planetProfile.name} tại ${signProfile.name}: Phát huy phẩm chất ${cons}`,
      });
    }

    // Emits shadow signals
    for (const sh of signProfile.shadow.slice(0, 2)) {
      signals.push({
        id: `astro_${planetProfile.id}_${signProfile.id}_shadow_${sh}`,
        dimension: planetProfile.id,
        polarity: 'tension',
        strength: weight * 0.85,
        source: planetProfile.id,
        evidenceIds: [`planet_${planetProfile.id}`, `sign_${signProfile.id}`],
        ruleIds: ['RULE_ASTRO_PLANET_SIGN_SHADOW'],
        contextTags: [signProfile.element, 'shadow_trigger'],
        description: `Nguy cơ phát sinh từ ${sh} khi gặp áp lực`,
      });
    }

    // Generate Contextual Interpretation for Sun, Moon, Ascendant
    if (['sun', 'moon'].includes(planetProfile.id)) {
      const houseText = houseProfile ? ` tại ${houseProfile.name}` : '';
      const headline = `${planetProfile.name} tại ${signProfile.name}${houseText}`;
      const statement = `Vị trí ${planetProfile.name} tại cung ${signProfile.name} (${signProfile.element}, ${signProfile.modality}) thể hiện sự kết hợp giữa (${planetProfile.themes.slice(0, 2).join(' & ')}) và (${signProfile.themes.slice(0, 2).join(' & ')}). Năng lượng tích cực hướng tới (${signProfile.constructive.join(', ')}), đồng thời cần ý thức kiểm soát (${signProfile.shadow.join(', ')}).`;

      interpretations.push({
        id: `astro_interp_${planetProfile.id}`,
        dimension: planetProfile.id.toUpperCase(),
        headline,
        statement,
        signals: signals.filter(s => s.source === planetProfile.id).map(s => s.id),
        evidenceIds: [`planet_${planetProfile.id}`, `sign_${signProfile.id}`],
        ruleIds: ['RULE_ASTRO_CORE_LUMINARY'],
        polarity: 'supportive',
        strength: weight,
        confidence: 'high',
        context: {
          planet: planetProfile.id,
          sign: signProfile.id,
          element: signProfile.element,
          modality: signProfile.modality,
          houseNumber: houseProfile?.houseNumber,
        },
      });
    }
  }

  // 2. Evaluate Aspects & Orbs
  const tensions: Array<{ traitA: string; traitB: string; dynamics: string; resolution: string }> = [];
  const reinforcements: Array<{ theme: string; sources: string[]; explanation: string }> = [];

  for (const asp of aspects) {
    const p1 = ASTROLOGY_PLANET_PROFILES[asp.planet1.toLowerCase()];
    const p2 = ASTROLOGY_PLANET_PROFILES[asp.planet2.toLowerCase()];
    if (!p1 || !p2) continue;

    const orbWeight = Math.max(0.4, Math.round((1 - asp.orb / 8.0) * 100) / 100);
    const aspectTypeUpper = asp.type.toUpperCase();

    if (aspectTypeUpper === 'SQUARE' || aspectTypeUpper === 'OPPOSITION') {
      signals.push({
        id: `astro_aspect_${p1.id}_${aspectTypeUpper}_${p2.id}`,
        dimension: 'ASPECT_TENSION',
        polarity: 'tension',
        strength: orbWeight,
        source: `${p1.id}_${p2.id}`,
        evidenceIds: [`planet_${p1.id}`, `planet_${p2.id}`, `aspect_${aspectTypeUpper}`],
        ruleIds: ['RULE_ASTRO_TENSE_ASPECT'],
        contextTags: [aspectTypeUpper, 'friction_point'],
        description: `Góc căng ${aspectTypeUpper} giữa ${p1.name} và ${p2.name} (sai số ${asp.orb.toFixed(1)}°): Đòi hỏi sự tích hợp giữa ${p1.themes[0]} và ${p2.themes[0]}`,
      });

      tensions.push({
        traitA: `${p1.name} (${p1.themes.slice(0, 2).join(', ')})`,
        traitB: `${p2.name} (${p2.themes.slice(0, 2).join(', ')})`,
        dynamics: `Sự giằng co giữa ${p1.themes[0]} và ${p2.themes[0]} tạo nên áp lực cần chuyển hóa thành động lực hành động.`,
        resolution: `Tích hợp bài học kỷ luật: Dùng sự thận trọng và phương pháp thực tế để định hướng cho nguồn năng lượng này.`,
      });
    } else if (aspectTypeUpper === 'TRINE' || aspectTypeUpper === 'SEXTILE') {
      signals.push({
        id: `astro_aspect_${p1.id}_${aspectTypeUpper}_${p2.id}`,
        dimension: 'ASPECT_HARMONY',
        polarity: 'constructive',
        strength: orbWeight,
        source: `${p1.id}_${p2.id}`,
        evidenceIds: [`planet_${p1.id}`, `planet_${p2.id}`, `aspect_${aspectTypeUpper}`],
        ruleIds: ['RULE_ASTRO_HARMONIC_ASPECT'],
        contextTags: [aspectTypeUpper, 'synergy'],
        description: `Góc thuận ${aspectTypeUpper} giữa ${p1.name} và ${p2.name}: Hỗ trợ tự nhiên giữa ${p1.constructive[0]} và ${p2.constructive[0]}`,
      });

      reinforcements.push({
        theme: `Dòng chảy thuận hòa giữa ${p1.name} và ${p2.name}`,
        sources: [p1.name, p2.name],
        explanation: `Góc chiếu ${aspectTypeUpper} tạo điều kiện thuận lợi để bổ trợ năng lực lẫn nhau mà không gặp cản trở nội tại.`,
      });
    }
  }

  // 3. Dominant Elements
  const dominantElementEntry = Object.entries(elementCounts).sort((a, b) => b[1] - a[1])[0];
  const dominantElement = dominantElementEntry ? dominantElementEntry[0] : 'FIRE';

  const dominantThemes = Array.from(
    new Set(signals.filter(s => s.polarity === 'constructive').map(s => s.description || s.id))
  ).slice(0, 4);

  const coreDynamicStatement = `Bản đồ sao mang cấu trúc nổi trội của nguyên tố ${dominantElement} (${elementCounts[dominantElement]} hành tinh). Có ${tensions.length} trục đối kháng cần chuyển hóa và ${reinforcements.length} liên kết tương sinh hỗ trợ vận trình.`;

  // 4. Practical Guidance
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
      actionPriority: tensions.length > 2 ? 'IMMEDIATE' : 'STRATEGIC',
      timeframe: 'Theo chu kỳ vận chuyển hành tinh (Transit)',
      rationale: `Dựa trên cân bằng nguyên tố ${dominantElement} và các góc chiếu căng thẳng trên bản đồ sao cá nhân.`,
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
      elementalBalance: elementCounts,
    },
    guidance,
  };
}

export const ASTROLOGY_SIGN_PROFILES = ASTROLOGY_ZODIAC_PROFILES;

export function evaluatePlanetPlacement(
  planetKey: string,
  signKey: string,
  houseNumber: number = 1
): ContextualInterpretation & { signalItems: SemanticSignal[] } {
  const planetProfile = ASTROLOGY_PLANET_PROFILES[planetKey.toLowerCase()];
  const signProfile = ASTROLOGY_ZODIAC_PROFILES[signKey.toUpperCase()];
  const houseProfile = ASTROLOGY_HOUSE_PROFILES[`house_${houseNumber}`];

  const signals: SemanticSignal[] = [];
  if (planetProfile && signProfile) {
    for (const cons of signProfile.constructive.slice(0, 2)) {
      signals.push({
        id: `astro_${planetProfile.id}_${signProfile.id}_${cons}`,
        dimension: planetProfile.id,
        polarity: 'constructive',
        strength: 0.85,
        source: planetProfile.id,
        evidenceIds: [`planet_${planetProfile.id}`, `sign_${signProfile.id}`],
        ruleIds: ['RULE_ASTRO_PLANET_SIGN'],
        contextTags: [signProfile.element, signProfile.modality],
        description: `${planetProfile.name} tại ${signProfile.name}: ${cons}`,
      });
    }
  }

  const statement = planetProfile && signProfile
    ? `${planetProfile.name} tại cung ${signProfile.name} (${signProfile.element}): Thể hiện phẩm chất ${signProfile.constructive.join(', ')} trong lĩnh vực ${houseProfile?.domain ?? 'bản mệnh'}.`
    : 'Luận giải vị trí hành tinh.';

  return {
    id: `interp_${planetKey}_${signKey}`,
    dimension: planetKey,
    headline: `${planetProfile?.name ?? planetKey} tại ${signProfile?.name ?? signKey}`,
    statement,
    signals: signals.map((s) => s.id),
    evidenceIds: [`planet_${planetKey}`, `sign_${signKey}`],
    ruleIds: ['RULE_ASTRO_PLANET_SIGN'],
    polarity: 'supportive',
    strength: 0.85,
    context: {
      planet: planetKey,
      sign: signKey,
      signElement: signProfile?.element ?? 'FIRE',
      houseNumber,
    },
    signalItems: signals,
  };
}

