import { NextResponse } from 'next/server';
import { PythagoreanNumerologyEngine, PYTHAGOREAN_CONFIG_V1 } from '@mystic/numerology-engine';
import { ReadingResultComposer, MysticosResultBuilder } from '@mystic/interpretation-engine';
import { ReadingRepository } from '@mystic/database';
import type { Fact } from '@mystic/core';
import { NumerologyNumberType } from '@mystic/core';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const engine = new PythagoreanNumerologyEngine();

    const calcResult = await engine.calculate(body, PYTHAGOREAN_CONFIG_V1);

    const lpValue = calcResult.facts.core[NumerologyNumberType.LIFE_PATH]?.value;
    const karmicDebts = (body.karmicDebts as number[]) || [];

    const facts: Fact[] = [
      { key: 'results.lifePath.finalValue', value: lpValue, domain: 'numerology', source: 'calculation' },
      { key: 'lifePath', value: lpValue, domain: 'numerology', source: 'calculation' },
      { key: 'karmicDebts', value: karmicDebts, domain: 'numerology', source: 'calculation' },
      ...Object.entries(calcResult.dotNotatedFacts).map(([key, value]) => ({
        key,
        value,
        domain: 'numerology',
        source: 'engine',
      })),
    ];

    if (body.facts && Array.isArray(body.facts)) {
      facts.push(...body.facts);
    }

    const mysticosResult = MysticosResultBuilder.buildResult({
      domain: 'numerology',
      inputSummary: body,
      facts,
      school: 'Goodwin Analytical Numerology',
    });

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
      success: true,
      data: mysticosResult,
      mysticosResult,
      ...calcResult,
      readingId,
      reading,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Numerology calculation failed' }, { status: 400 });
  }
}
