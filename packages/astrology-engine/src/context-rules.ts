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
import {
  getPlanetInSignInsight,
  getAspectInsight,
  synthesizeNatalChart,
} from './planetary-interpretations.js';

export interface AstrologyContextEvaluation {
  signals: SemanticSignal[];
  interpretations: ContextualInterpretation[];
  synthesis: StructuredSynthesis & {
    chartSynthesis?: ReturnType<typeof synthesizeNatalChart>;
  };
  guidance: PracticalGuidance[];
}

export function evaluateAstrologyChart(
  planets: Record<string, { sign: string; longitude: number; house?: number }>,
  houses: Array<{ houseNumber: number; sign: string; cuspLongitude: number }>,
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

    const insight = getPlanetInSignInsight(planetProfile.id, signProfile.id, houseProfile?.houseNumber);

    // Emits constructive signals
    for (const cons of (insight.strengths || signProfile.constructive).slice(0, 2)) {
      signals.push({
        id: `astro_${planetProfile.id}_${signProfile.id}_${cons}`,
        dimension: planetProfile.id,
        polarity: 'constructive',
        strength: weight,
        source: planetProfile.id,
        evidenceIds: [`planet_${planetProfile.id}`, `sign_${signProfile.id}`, ...(houseProfile ? [`house_${houseProfile.houseNumber}`] : [])],
        ruleIds: ['RULE_ASTRO_PLANET_SIGN_HARMONY'],
        contextTags: [signProfile.element, signProfile.modality, ...(houseProfile ? [houseProfile.domain] : [])],
        description: `${planetProfile.name} tại ${signProfile.name}: Phát huy ${cons}`,
      });
    }

    // Emits shadow signals
    for (const sh of (insight.pitfalls || signProfile.shadow).slice(0, 2)) {
      signals.push({
        id: `astro_${planetProfile.id}_${signProfile.id}_shadow_${sh}`,
        dimension: planetProfile.id,
        polarity: 'tension',
        strength: weight * 0.85,
        source: planetProfile.id,
        evidenceIds: [`planet_${planetProfile.id}`, `sign_${signProfile.id}`],
        ruleIds: ['RULE_ASTRO_PLANET_SIGN_SHADOW'],
        contextTags: [signProfile.element, 'shadow_trigger'],
        description: `Lưu ý cạm bẫy từ ${sh} khi gặp áp lực`,
      });
    }

    // Generate Contextual Interpretation for Major Personal Bodies
    const majorBodies = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'ascendant'];
    if (majorBodies.includes(planetProfile.id)) {
      interpretations.push({
        id: `astro_interp_${planetProfile.id}`,
        dimension: planetProfile.id.toUpperCase(),
        headline: insight.headline,
        statement: `${insight.layman} Lời khuyên: ${insight.advice}`,
        signals: signals.filter(s => s.source === planetProfile.id).map(s => s.id),
        evidenceIds: [`planet_${planetProfile.id}`, `sign_${signProfile.id}`],
        ruleIds: ['RULE_ASTRO_CORE_BODY'],
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
    const aspectInsight = getAspectInsight(asp.planet1, asp.planet2, asp.type, asp.orb);

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
        description: `${aspectInsight.headline}: ${aspectInsight.layman}`,
      });

      tensions.push({
        traitA: p1.name,
        traitB: p2.name,
        dynamics: aspectInsight.layman,
        resolution: aspectInsight.advice,
      });
    } else if (aspectTypeUpper === 'TRINE' || aspectTypeUpper === 'SEXTILE' || aspectTypeUpper === 'CONJUNCTION') {
      signals.push({
        id: `astro_aspect_${p1.id}_${aspectTypeUpper}_${p2.id}`,
        dimension: 'ASPECT_HARMONY',
        polarity: 'constructive',
        strength: orbWeight,
        source: `${p1.id}_${p2.id}`,
        evidenceIds: [`planet_${p1.id}`, `planet_${p2.id}`, `aspect_${aspectTypeUpper}`],
        ruleIds: ['RULE_ASTRO_HARMONIC_ASPECT'],
        contextTags: [aspectTypeUpper, 'synergy'],
        description: `${aspectInsight.headline}: ${aspectInsight.layman}`,
      });

      reinforcements.push({
        theme: aspectInsight.headline,
        sources: [p1.name, p2.name],
        explanation: `${aspectInsight.layman} ${aspectInsight.advice}`,
      });
    }
  }

  // 3. Dominant Elements & Synthesis
  const chartSynthesis = synthesizeNatalChart(planets, houses, aspects);

  const dominantThemes = Array.from(
    new Set(signals.filter(s => s.polarity === 'constructive').map(s => s.description || s.id))
  ).slice(0, 4);

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
      rationale: `${chartSynthesis.elementSummary.remedyAdvice}`,
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
      coreDynamicStatement: chartSynthesis.corePatternStatement,
      elementalBalance: elementCounts,
      chartSynthesis,
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
  const insight = getPlanetInSignInsight(planetKey, signKey, houseNumber);

  const signals: SemanticSignal[] = [];
  if (planetProfile && signProfile) {
    for (const cons of (insight.strengths || signProfile.constructive).slice(0, 2)) {
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

  return {
    id: `interp_${planetKey}_${signKey}`,
    dimension: planetKey,
    headline: insight.headline,
    statement: `${insight.layman} Lời khuyên: ${insight.advice}`,
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


