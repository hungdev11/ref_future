import {
  HeavenlyStem,
  EarthlyBranch,
  PalaceName,
  CucType,
  FiveElements,
} from '@mystic/core';
import { BRANCHES, STEMS } from './calendar.js';

export const PALACE_NAMES_ORDER: PalaceName[] = [
  PalaceName.MENH,
  PalaceName.PHU_MAU,
  PalaceName.PHUC_DUC,
  PalaceName.DIEN_TRACH,
  PalaceName.QUAN_LOC,
  PalaceName.NO_BOC,
  PalaceName.THIEN_DI,
  PalaceName.TAT_ACH,
  PalaceName.TAI_BACH,
  PalaceName.TU_TUC,
  PalaceName.PHU_THE,
  PalaceName.HUYNH_DE,
];

export interface PalacePosition {
  palaceName: PalaceName;
  branch: EarthlyBranch;
  branchIndex: number;
  stem: HeavenlyStem;
  isThan: boolean;
}

export function locateMenhAndThan(
  lunarMonth: number,
  hourBranch: EarthlyBranch
): { menhBranch: EarthlyBranch; menhBranchIdx: number; thanBranch: EarthlyBranch; thanBranchIdx: number } {
  const hourBranchIdx = BRANCHES.indexOf(hourBranch);

  // Month branch starting from Dần (index 2)
  const monthBranchIdx = (2 + (lunarMonth - 1)) % 12;

  // Mệnh: From month branch, count counter-clockwise to hour branch
  const menhBranchIdx = (monthBranchIdx - hourBranchIdx + 12) % 12;

  // Thân: From month branch, count clockwise to hour branch
  const thanBranchIdx = (monthBranchIdx + hourBranchIdx) % 12;

  return {
    menhBranch: BRANCHES[menhBranchIdx]!,
    menhBranchIdx,
    thanBranch: BRANCHES[thanBranchIdx]!,
    thanBranchIdx,
  };
}

export function assignPalaceBranches(
  menhBranchIdx: number,
  thanBranchIdx: number,
  yearStem: HeavenlyStem
): Record<PalaceName, PalacePosition> {
  const result = {} as Record<PalaceName, PalacePosition>;

  // Ngũ Hổ Độn for Palace Stems starting at Dần (branch index 2)
  const yearStemIdx = STEMS.indexOf(yearStem);
  const firstStemIdx = ((yearStemIdx % 5) * 2 + 2) % 10;

  for (let i = 0; i < 12; i++) {
    const palaceName = PALACE_NAMES_ORDER[i]!;
    // 12 palaces distributed counter-clockwise from Mệnh
    const branchIdx = (menhBranchIdx - i + 12) % 12;
    const branch = BRANCHES[branchIdx]!;

    // Find stem of this branch
    // Dần is branch index 2, so offset from Dần
    const offsetFromDan = (branchIdx - 2 + 12) % 12;
    const stemIdx = (firstStemIdx + offsetFromDan) % 10;
    const stem = STEMS[stemIdx]!;

    result[palaceName] = {
      palaceName,
      branch,
      branchIndex: branchIdx,
      stem,
      isThan: branchIdx === thanBranchIdx,
    };
  }

  return result;
}

// Determine Cục based on Year Stem and Mệnh Palace Branch
// Can Năm:
// Giáp, Kỷ: 1
// Ất, Canh: 2
// Bính, Tân: 3
// Đinh, Nhâm: 4
// Mậu, Quý: 5
//
// Chi Cung Mệnh:
// Tý, Sửu, Ngọ, Mùi: 1
// Dần, Mão, Thân, Dậu: 2
// Thìn, Tỵ, Tuất, Hợi: 3
export function determineCuc(
  yearStem: HeavenlyStem,
  menhBranch: EarthlyBranch
): { cuc: CucType; cucNumber: number; element: FiveElements; detail: string } {
  const stemIdx = STEMS.indexOf(yearStem);
  const stemVal = Math.floor(stemIdx / 2) + 1; // 1 to 5

  const branchIdx = BRANCHES.indexOf(menhBranch);
  let branchVal = 1;
  if ([0, 1, 6, 7].includes(branchIdx)) {
    // Tý, Sửu, Ngọ, Mùi
    branchVal = 1;
  } else if ([2, 3, 8, 9].includes(branchIdx)) {
    // Dần, Mão, Thân, Dậu
    branchVal = 2;
  } else {
    // Thìn, Tỵ, Tuất, Hợi
    branchVal = 3;
  }

  let total = stemVal + branchVal;
  if (total > 5) {
    total -= 5;
  }

  // 1: Kim (4)
  // 2: Thủy (2)
  // 3: Hỏa (6)
  // 4: Thổ (5)
  // 5: Mộc (3)
  switch (total) {
    case 1:
      return { cuc: CucType.KIM_TU_CUC, cucNumber: 4, element: FiveElements.KIM, detail: 'Kim Tứ Cục' };
    case 2:
      return { cuc: CucType.THUY_NHI_CUC, cucNumber: 2, element: FiveElements.THUY, detail: 'Thủy Nhị Cục' };
    case 3:
      return { cuc: CucType.HOA_LUC_CUC, cucNumber: 6, element: FiveElements.HOA, detail: 'Hỏa Lục Cục' };
    case 4:
      return { cuc: CucType.THO_NGU_CUC, cucNumber: 5, element: FiveElements.THO, detail: 'Thổ Ngũ Cục' };
    case 5:
    default:
      return { cuc: CucType.MOC_TAM_CUC, cucNumber: 3, element: FiveElements.MOC, detail: 'Mộc Tam Cục' };
  }
}
