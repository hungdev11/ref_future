import { NextResponse } from 'next/server';
import { ReadingRepository } from '@mystic/database';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reading = await ReadingRepository.getReadingById(params.id);
    if (!reading) {
      return NextResponse.json({ error: 'Reading not found' }, { status: 404 });
    }
    return NextResponse.json({ reading });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch reading' },
      { status: 500 }
    );
  }
}
