import { NextResponse } from 'next/server';
import { WesternAstrologyEngine, ASTRO_CONFIG_V1 } from '@mystic/astrology-engine';
import { ReadingResultComposer } from '@mystic/interpretation-engine';
import { ReadingRepository } from '@mystic/database';

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
      ...calcResult,
      readingId,
      reading,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Astrology calculation failed' }, { status: 400 });
  }
}
