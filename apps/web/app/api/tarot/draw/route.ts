import { NextResponse } from 'next/server';
import { RiderWaiteTarotEngine, TAROT_CONFIG_V1 } from '@mystic/tarot-engine';
import { ReadingResultComposer } from '@mystic/interpretation-engine';
import { ReadingRepository } from '@mystic/database';
import * as crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const engine = new RiderWaiteTarotEngine();

    // Use genuine CSPRNG randomness unless an explicit user seed is provided
    const seed = body.seed && body.seed.trim() !== '' && body.seed !== 'random'
      ? body.seed
      : crypto.randomBytes(32).toString('hex');

    const inputData = { ...body, seed };
    const calcResult = await engine.calculate(inputData, TAROT_CONFIG_V1);

    let readingId: string | null = null;
    let reading = null;

    try {
      const composedReading = ReadingResultComposer.compose({
        readingType: 'TAROT',
        dotNotatedFacts: {
          ...calcResult.dotNotatedFacts,
          spread: calcResult.facts.spreadCode,
        },
        inputSnapshot: inputData,
        seed,
      });

      const savedReading = await ReadingRepository.saveReading({
        reading: composedReading,
        inputSnapshot: inputData,
        factsSnapshot: calcResult.facts as unknown as Record<string, unknown>,
      });

      readingId = savedReading.id;
      reading = composedReading;
    } catch (dbErr) {
      console.warn('[DB] Failed to compose/persist tarot reading:', dbErr);
    }

    return NextResponse.json({
      ...calcResult,
      readingId,
      reading,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Tarot draw failed' }, { status: 400 });
  }
}
