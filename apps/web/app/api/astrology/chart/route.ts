import { NextResponse } from 'next/server';
import { WesternAstrologyEngine, ASTRO_CONFIG_V1 } from '@mystic/astrology-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const engine = new WesternAstrologyEngine();
    
    const config = {
      ...ASTRO_CONFIG_V1,
      houseSystem: body.houseSystem ?? ASTRO_CONFIG_V1.houseSystem,
      zodiacSystem: body.zodiacSystem ?? ASTRO_CONFIG_V1.zodiacSystem,
    };

    const result = await engine.calculate(body, config);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Astrology calculation failed' }, { status: 400 });
  }
}
