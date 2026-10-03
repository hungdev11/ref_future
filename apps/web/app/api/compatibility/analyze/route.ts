import { NextResponse } from 'next/server';
import { MultiSystemCompatibilityEngine } from '@mystic/interpretation-engine';
import { CompatibilityRepository } from '@mystic/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { personA, personB, relationshipType } = body;

    if (!personA?.birthDate || !personB?.birthDate) {
      return NextResponse.json(
        { error: 'Ngày sinh của cả hai người là bắt buộc.' },
        { status: 400 }
      );
    }

    const report = await MultiSystemCompatibilityEngine.analyze(
      personA,
      personB,
      relationshipType || 'LOVE'
    );

    // Persist report to Prisma SQLite database (Completely anonymous)
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
      report,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Compatibility analysis failed' },
      { status: 400 }
    );
  }
}
