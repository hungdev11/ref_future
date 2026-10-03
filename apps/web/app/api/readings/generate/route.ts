import { NextResponse } from 'next/server';
import { ReadingResultComposer } from '@mystic/interpretation-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      readingType,
      dotNotatedFacts,
      inputSnapshot,
      depth,
      seed,
      isDegraded,
      degradationWarnings,
    } = body;

    const result = ReadingResultComposer.compose({
      readingType: readingType ?? 'COMPREHENSIVE_READING',
      dotNotatedFacts: dotNotatedFacts ?? {},
      inputSnapshot: inputSnapshot ?? {},
      depth: depth ?? 'DETAILED',
      seed: seed ?? undefined,
      isDegraded: isDegraded ?? false,
      degradationWarnings: degradationWarnings ?? [],
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Reading generation failed' }, { status: 400 });
  }
}
