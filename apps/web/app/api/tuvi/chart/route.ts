import { NextResponse } from 'next/server';
import { TuViEngine, TUVI_METHOD_V1_CONFIG } from '@mystic/tuvi-engine';
import { ReadingResultComposer, MysticosResultBuilder } from '@mystic/interpretation-engine';
import { ReadingRepository } from '@mystic/database';
import type { Fact } from '@mystic/core';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const engine = new TuViEngine();

    const inputData = {
      ...body,
      solarDate: body.solarDate || body.birthDate,
    };
    const calcResult = await engine.calculate(inputData, TUVI_METHOD_V1_CONFIG);

    const facts: Fact[] = [];
    for (const [key, value] of Object.entries(calcResult.dotNotatedFacts)) {
      facts.push({ key, value, domain: 'tuvi', source: 'calculation' });
    }

    if (calcResult.facts.palaces) {
      const palacesRecord = calcResult.facts.palaces as Record<string, any>;
      const menhPalace = palacesRecord.MENH || palacesRecord['Mệnh'];
      if (menhPalace && menhPalace.stars?.length > 0) {
        const mainStar = menhPalace.stars[0];
        facts.push(
          { key: 'palaceName', value: 'Mệnh', domain: 'tuvi', source: 'chart' },
          { key: 'starCode', value: mainStar.code, domain: 'tuvi', source: 'chart' },
          { key: 'brightness', value: mainStar.brightness || 'M', domain: 'tuvi', source: 'chart' }
        );
      }

      for (const [pKey, palace] of Object.entries(palacesRecord)) {
        const pVn = pKey === 'MENH' ? 'Mệnh' : pKey === 'TAI_BACH' ? 'Tài Bạch' : pKey === 'TAT_ACH' ? 'Tật Ách' : pKey;
        for (const s of palace.stars || []) {
          facts.push(
            { key: `palace_${pKey}_star_${s.code}`, value: true, domain: 'tuvi', source: 'chart' },
            { key: `star_${s.code}_palace`, value: pKey, domain: 'tuvi', source: 'chart' }
          );
          if (s.code === 'TU_VI' && (pKey === 'MENH' || pKey === 'Mệnh')) {
            facts.push(
              { key: 'palaceName', value: 'Mệnh', domain: 'tuvi', source: 'chart' },
              { key: 'starCode', value: 'TU_VI', domain: 'tuvi', source: 'chart' },
              { key: 'brightness', value: s.brightness || 'M', domain: 'tuvi', source: 'chart' }
            );
          }
          if (s.code === 'HOA_LOC' && (pKey === 'MENH' || pKey === 'TAI_BACH' || pVn === 'Mệnh' || pVn === 'Tài Bạch')) {
            facts.push(
              { key: 'palaceName', value: pVn, domain: 'tuvi', source: 'chart' },
              { key: 'starCode', value: 'HOA_LOC', domain: 'tuvi', source: 'chart' }
            );
          }
          if (s.code === 'HOA_KY' && (pKey === 'MENH' || pKey === 'TAT_ACH' || pVn === 'Mệnh' || pVn === 'Tật Ách')) {
            facts.push(
              { key: 'palaceName', value: pVn, domain: 'tuvi', source: 'chart' },
              { key: 'starCode', value: 'HOA_KY', domain: 'tuvi', source: 'chart' }
            );
          }
        }
      }
    }

    if (body.facts && Array.isArray(body.facts)) {
      facts.push(...body.facts);
    }

    const mysticosResult = MysticosResultBuilder.buildResult({
      domain: 'tuvi',
      inputSummary: body,
      facts,
      school: 'Nam Phái Toàn Thư',
    });

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
      success: true,
      data: mysticosResult,
      mysticosResult,
      ...calcResult,
      readingId,
      reading,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Tu Vi calculation failed' }, { status: 400 });
  }
}
