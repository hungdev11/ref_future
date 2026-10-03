import { NextResponse } from 'next/server';
import { PythagoreanNumerologyEngine, PYTHAGOREAN_CONFIG_V1 } from '@mystic/numerology-engine';
import { ReadingResultComposer } from '@mystic/interpretation-engine';
import { ReadingRepository } from '@mystic/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const engine = new PythagoreanNumerologyEngine();

    const calcResult = await engine.calculate(body, PYTHAGOREAN_CONFIG_V1);

    let readingId: string | null = null;
    let reading = null;

    try {
      const composedReading = ReadingResultComposer.compose({
        readingType: 'NUMEROLOGY',
        dotNotatedFacts: calcResult.dotNotatedFacts,
        inputSnapshot: body,
      });

      const savedReading = await ReadingRepository.saveReading({
        reading: composedReading,
        inputSnapshot: body,
        factsSnapshot: calcResult.facts as unknown as Record<string, unknown>,
      });

      readingId = savedReading.id;
      reading = composedReading;
    } catch (dbErr) {
      console.warn('[DB] Failed to compose/persist numerology reading:', dbErr);
    }

    return NextResponse.json({
      ...calcResult,
      readingId,
      reading,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Numerology calculation failed' }, { status: 400 });
  }
}
