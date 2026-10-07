import { NextResponse } from 'next/server';
import { WesternAstrologyEngine, ASTRO_CONFIG_V1 } from '@mystic/astrology-engine';
import { ReadingResultComposer, MysticosResultBuilder } from '@mystic/interpretation-engine';
import { ReadingRepository } from '@mystic/database';
import type { Fact } from '@mystic/core';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const engine = new WesternAstrologyEngine();

    const config = {
      ...ASTRO_CONFIG_V1,
      houseSystem: body.houseSystem ?? ASTRO_CONFIG_V1.houseSystem,
      zodiacSystem: body.zodiacSystem ?? ASTRO_CONFIG_V1.zodiacSystem,
    };

    const calcResult = await engine.calculate(body, config);

    const facts: Fact[] = [];
    for (const [key, value] of Object.entries(calcResult.dotNotatedFacts)) {
      facts.push({ key, value, domain: 'astrology', source: 'ephemeris' });
    }

    if (calcResult.facts.bodies) {
      for (const [bodyKey, pos] of Object.entries(calcResult.facts.bodies)) {
        const b = bodyKey.toLowerCase();
        facts.push(
          { key: `planets.${b}.sign`, value: pos.sign, domain: 'astrology', source: 'ephemeris' },
          { key: `planets.${b}.houseNumber`, value: pos.houseNumber, domain: 'astrology', source: 'ephemeris' },
          { key: `${b}.sign`, value: pos.sign, domain: 'astrology', source: 'ephemeris' },
          { key: `${b}.houseNumber`, value: pos.houseNumber, domain: 'astrology', source: 'ephemeris' }
        );
      }
    }

    if (calcResult.facts.aspects) {
      for (const aspect of calcResult.facts.aspects) {
        const pair1 = `${aspect.bodyA.toLowerCase()}_${aspect.bodyB.toLowerCase()}`;
        const pair2 = `${aspect.bodyB.toLowerCase()}_${aspect.bodyA.toLowerCase()}`;
        facts.push(
          { key: `aspects.${pair1}.aspectType`, value: aspect.aspectType, domain: 'astrology', source: 'ephemeris' },
          { key: `aspects.${pair1}.orb`, value: aspect.orb, domain: 'astrology', source: 'ephemeris' },
          { key: `aspects.${pair2}.aspectType`, value: aspect.aspectType, domain: 'astrology', source: 'ephemeris' },
          { key: `aspects.${pair2}.orb`, value: aspect.orb, domain: 'astrology', source: 'ephemeris' }
        );
      }
    }

    if (body.facts && Array.isArray(body.facts)) {
      facts.push(...body.facts);
    }

    const mysticosResult = MysticosResultBuilder.buildResult({
      domain: 'astrology',
      inputSummary: body,
      facts,
      school: config.zodiacSystem === 'TROPICAL' ? 'Modern Humanistic Astrology' : 'Classical Ptolemaic',
    });

    let readingId: string | null = null;
    let reading = null;

    try {
      const composedReading = ReadingResultComposer.compose({
        readingType: 'ASTROLOGY',
        dotNotatedFacts: calcResult.dotNotatedFacts,
        inputSnapshot: body,
        isDegraded: calcResult.isDegraded,
        degradationWarnings: calcResult.degradationReasons,
      });

      const savedReading = await ReadingRepository.saveReading({
        reading: composedReading,
        inputSnapshot: body,
        factsSnapshot: calcResult.facts as unknown as Record<string, unknown>,
      });

      readingId = savedReading.id;
      reading = composedReading;
    } catch (dbErr) {
      console.warn('[DB] Failed to compose/persist astrology reading:', dbErr);
    }

    return NextResponse.json({
      success: true,
      data: mysticosResult,
      mysticosResult,
      ...calcResult,
      readingId,
      reading,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Astrology calculation failed' }, { status: 400 });
  }
}
