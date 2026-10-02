import { NextResponse } from 'next/server';
import { TuViEngine, TUVI_METHOD_V1_CONFIG } from '@mystic/tuvi-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const engine = new TuViEngine();

    const result = await engine.calculate(body, TUVI_METHOD_V1_CONFIG);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Tu Vi calculation failed' }, { status: 400 });
  }
}
