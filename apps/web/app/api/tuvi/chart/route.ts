import { NextResponse } from 'next/server';
import { TuViEngine, TUVI_METHOD_V1_CONFIG } from '@mystic/tuvi-engine';
import { ReadingResultComposer } from '@mystic/interpretation-engine';
import { ReadingRepository } from '@mystic/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const engine = new TuViEngine();

    const calcResult = await engine.calculate(body, TUVI_METHOD_V1_CONFIG);

    let readingId: string | null = null;
    let reading = null;

    try {
      const composedReading = ReadingResultComposer.compose({
        readingType: 'TU_VI',
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
      console.warn('[DB] Failed to compose/persist Tu Vi reading:', dbErr);
    }

    return NextResponse.json({
      ...calcResult,
      readingId,
      reading,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Tu Vi calculation failed' }, { status: 400 });
  }
}
