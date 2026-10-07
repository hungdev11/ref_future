import { NextResponse } from 'next/server';
import { MultiSystemCompatibilityEngine, MysticosResultBuilder } from '@mystic/interpretation-engine';
import { CompatibilityRepository } from '@mystic/database';
import type { Fact } from '@mystic/core';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { personA, personB, relationshipType } = body;

    if (!personA?.birthDate || !personB?.birthDate) {
      return NextResponse.json(
        { success: false, error: 'Ngày sinh của cả hai người là bắt buộc.' },
        { status: 400 }
      );
    }

    const report = await MultiSystemCompatibilityEngine.analyze(
      personA,
      personB,
      relationshipType || 'LOVE'
    );

    const facts: Fact[] = [
      { key: 'personA.dominantElement', value: report.personA.sunElement?.toUpperCase() || 'EARTH', domain: 'compatibility', source: 'astrology' },
      { key: 'personB.dominantElement', value: report.personB.sunElement?.toUpperCase() || 'WATER', domain: 'compatibility', source: 'astrology' },
      { key: 'personA.lifePath', value: report.personA.lifePath, domain: 'compatibility', source: 'numerology' },
      { key: 'personB.lifePath', value: report.personB.lifePath, domain: 'compatibility', source: 'numerology' },
      { key: 'personA.sunSign', value: report.personA.sunSign, domain: 'compatibility', source: 'astrology' },
      { key: 'personB.sunSign', value: report.personB.sunSign, domain: 'compatibility', source: 'astrology' },
      { key: 'relationshipType', value: relationshipType || 'LOVE', domain: 'compatibility', source: 'input' },
    ];

    if (body.facts && Array.isArray(body.facts)) {
      facts.push(...body.facts);
    }

    const mysticosResult = MysticosResultBuilder.buildResult({
      domain: 'compatibility',
      inputSummary: { personA, personB, relationshipType: relationshipType || 'LOVE' },
      facts,
      school: 'Mysticos Cross-System Synthesis',
    });

    try {
      await CompatibilityRepository.saveReport({
        personAName: report.personA.name,
        personBName: report.personB.name,
        precisionLevel: report.precisionLevel,
        relationshipType: report.relationshipType,
        factsSnapshot: {
          personA: report.personA,
          personB: report.personB,
          pairwise: report.pairwiseFeatures,
        },
        reportSections: report.dimensions,
        dimensions: report.dimensions,
        synthesis: report.synthesis,
        guidance: [report.guidance],
      });
    } catch (dbErr) {
      console.warn('[DB] Could not persist compatibility report:', dbErr);
    }

    return NextResponse.json({
      success: true,
      data: mysticosResult,
      mysticosResult,
      report,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Compatibility analysis failed' },
      { status: 400 }
    );
  }
}
