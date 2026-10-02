import { NextResponse } from 'next/server';
import { PythagoreanNumerologyEngine, PYTHAGOREAN_CONFIG_V1 } from '@mystic/numerology-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const engine = new PythagoreanNumerologyEngine();

    const result = await engine.calculate(body, PYTHAGOREAN_CONFIG_V1);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Numerology calculation failed' }, { status: 400 });
  }
}
