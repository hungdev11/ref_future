import {
  HeavenlyStem,
  EarthlyBranch,
  PalaceName,
} from '@mystic/core';

export interface DaiHanRange {
  palaceName: PalaceName;
  branch: EarthlyBranch;
  startAge: number;
  endAge: number;
}

export function calculateDaiHan(
  cucNumber: number,
  menhBranchIdx: number,
  yearStem: HeavenlyStem,
  gender: 'MALE' | 'FEMALE',
  palaces: Record<PalaceName, { branchIndex: number; branch: EarthlyBranch }>
): Record<PalaceName, { startAge: number; endAge: number }> {
  const isYangYear = [
    HeavenlyStem.GIAP,
    HeavenlyStem.BINH,
    HeavenlyStem.MAU,
    HeavenlyStem.CANH,
    HeavenlyStem.NHAM,
  ].includes(yearStem);

  const isClockwise = (isYangYear && gender === 'MALE') || (!isYangYear && gender === 'FEMALE');

  const result = {} as Record<PalaceName, { startAge: number; endAge: number }>;

  for (const [palaceKey, pos] of Object.entries(palaces)) {
    const palace = palaceKey as PalaceName;
    let dist = 0;
    if (isClockwise) {
      dist = (pos.branchIndex - menhBranchIdx + 12) % 12;
    } else {
      dist = (menhBranchIdx - pos.branchIndex + 12) % 12;
    }

    const startAge = cucNumber + dist * 10;
    const endAge = startAge + 9;

    result[palace] = {
      startAge,
      endAge,
    };
  }

  return result;
}

