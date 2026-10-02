import { NextResponse } from 'next/server';
import { RiderWaiteTarotEngine, TAROT_CONFIG_V1 } from '@mystic/tarot-engine';
import * as crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const engine = new RiderWaiteTarotEngine();

    // Use genuine CSPRNG randomness unless an explicit user seed is provided
    const seed = body.seed && body.seed.trim() !== '' && body.seed !== 'random'
      ? body.seed
      : crypto.randomBytes(32).toString('hex');

    const result = await engine.calculate({ ...body, seed }, TAROT_CONFIG_V1);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Tarot draw failed' }, { status: 400 });
  }
}
