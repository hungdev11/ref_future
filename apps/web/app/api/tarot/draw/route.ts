import { NextResponse } from 'next/server';
import { RiderWaiteTarotEngine, TAROT_CONFIG_V1 } from '@mystic/tarot-engine';
import { ReadingResultComposer, MysticosResultBuilder } from '@mystic/interpretation-engine';
import { ReadingRepository } from '@mystic/database';
import type { Fact } from '@mystic/core';
import * as crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const engine = new RiderWaiteTarotEngine();

    const SPREAD_ALIASES: Record<string, string> = {
      SPREAD_1_SINGLE: 'SPREAD_1_DAILY',
      SPREAD_1: 'SPREAD_1_DAILY',
      SPREAD_3_SITUATION: 'SPREAD_3_SCA',
      SPREAD_5_DEEP: 'SPREAD_5_SCCA_OUTCOME',
      SPREAD_10_CELTIC: 'SPREAD_10_CELTIC_CROSS',
      CELTIC_CROSS: 'SPREAD_10_CELTIC_CROSS',
    };

    const spreadCode = SPREAD_ALIASES[body.spreadCode] || body.spreadCode || 'SPREAD_3_PPF';

    // Use genuine CSPRNG randomness unless an explicit user seed is provided
    const seed = body.seed && body.seed.trim() !== '' && body.seed !== 'random'
      ? body.seed
      : crypto.randomBytes(32).toString('hex');

    const inputData = { ...body, spreadCode, seed };
    const calcResult = await engine.calculate(inputData, TAROT_CONFIG_V1);

    const primaryDraw = calcResult.facts.draws[0];
    const facts: Fact[] = [
      ...(primaryDraw
        ? [
            { key: 'cardCode', value: primaryDraw.card.cardCode, domain: 'tarot', source: 'draw' },
            { key: 'positionIndex', value: primaryDraw.positionIndex, domain: 'tarot', source: 'spread' },
            { key: 'isReversed', value: primaryDraw.isReversed, domain: 'tarot', source: 'draw' },
          ]
        : []),
      ...Object.entries(calcResult.dotNotatedFacts).map(([key, value]) => ({
        key,
        value,
        domain: 'tarot',
        source: 'engine',
      })),
    ];

    if (body.cardCode) {
      facts.push(
        { key: 'cardCode', value: body.cardCode, domain: 'tarot', source: 'draw' },
        { key: 'positionIndex', value: body.positionIndex ?? 0, domain: 'tarot', source: 'spread' },
        { key: 'isReversed', value: Boolean(body.isReversed), domain: 'tarot', source: 'draw' }
      );
    }

    if (body.facts && Array.isArray(body.facts)) {
      facts.push(...body.facts);
    }

    const mysticosResult = MysticosResultBuilder.buildResult({
      domain: 'tarot',
      inputSummary: inputData,
      facts,
      school: 'Rider-Waite-Smith',
    });

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
      success: true,
      data: mysticosResult,
      mysticosResult,
      ...calcResult,
      readingId,
      reading,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Tarot draw failed' }, { status: 400 });
  }
}
