import { NextResponse } from 'next/server';
import { RuleSimulator } from '@mystic/rule-engine';
import { BASELINE_RULES } from '@mystic/interpretation-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { facts, rules, allowedStatuses } = body;

    const simulation = RuleSimulator.simulate({
      facts: facts ?? {},
      rules: rules && rules.length > 0 ? rules : BASELINE_RULES,
      allowedStatuses,
    });

    return NextResponse.json(simulation);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Rule simulation failed' }, { status: 400 });
  }
}
