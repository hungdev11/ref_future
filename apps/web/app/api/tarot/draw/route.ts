import { NextResponse } from 'next/server';
import { RiderWaiteTarotEngine, TAROT_CONFIG_V1 } from '@mystic/tarot-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const engine = new RiderWaiteTarotEngine();

    const result = await engine.calculate(body, TAROT_CONFIG_V1);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Tarot draw failed' }, { status: 400 });
  }
}
