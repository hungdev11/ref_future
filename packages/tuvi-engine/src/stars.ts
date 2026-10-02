import {
  HeavenlyStem,
  EarthlyBranch,
  FiveElements,
  TuViStar,
  StarBrightness,
} from '@mystic/core';
import { BRANCHES, STEMS } from './calendar.js';

export interface StarPlacementResult {
  branchIndex: number;
  star: TuViStar;
}

export function locateTuVi(cucNumber: number, lunarDay: number): number {
  let remainder = lunarDay % cucNumber;
  let quotient = Math.floor(lunarDay / cucNumber);

  if (remainder === 0) {
    return (2 + quotient - 1) % 12;
  }

  const addVal = cucNumber - remainder;
  const newQuotient = (lunarDay + addVal) / cucNumber;

  if (addVal % 2 === 0) {
    return (2 + newQuotient - 1 + addVal) % 12;
  } else {
    return (2 + newQuotient - 1 - addVal + 12) % 12;
  }
}

export function placeAllStars(
  cucNumber: number,
  lunarDay: number,
  lunarMonth: number,
  hourBranch: EarthlyBranch,
  yearStem: HeavenlyStem,
  _yearBranch: EarthlyBranch,
  _gender: 'MALE' | 'FEMALE'
): StarPlacementResult[] {
  const placements: StarPlacementResult[] = [];
  const hourBranchIdx = BRANCHES.indexOf(hourBranch);

  // 1. Vòng Tử Vi (6 Chính Tinh)
  const tuViIdx = locateTuVi(cucNumber, lunarDay);

  const tuViStars = [
    { name: 'Tử Vi', offset: 0, element: FiveElements.THO },
    { name: 'Thiên Cơ', offset: -1, element: FiveElements.MOC },
    { name: 'Thái Dương', offset: -3, element: FiveElements.HOA },
    { name: 'Vũ Khúc', offset: -4, element: FiveElements.KIM },
    { name: 'Thiên Đồng', offset: -5, element: FiveElements.THUY },
    { name: 'Liêm Trinh', offset: -8, element: FiveElements.HOA },
  ];

  for (const s of tuViStars) {
    const idx = (tuViIdx + s.offset + 12) % 12;
    placements.push({
      branchIndex: idx,
      star: {
        code: s.name.toUpperCase().replace(/\s+/g, '_'),
        name: s.name,
        element: s.element,
        isMain: true,
        brightness: StarBrightness.DAC_DIA,
      },
    });
  }

  // 2. Vòng Thiên Phủ (8 Chính Tinh)
  const thienPhuIdx = (4 - tuViIdx + 12) % 12;

  const thienPhuStars = [
    { name: 'Thiên Phủ', offset: 0, element: FiveElements.THO },
    { name: 'Thái Âm', offset: 1, element: FiveElements.THUY },
    { name: 'Tham Lang', offset: 2, element: FiveElements.THUY },
    { name: 'Cự Môn', offset: 3, element: FiveElements.THUY },
    { name: 'Thiên Tướng', offset: 4, element: FiveElements.THUY },
    { name: 'Thiên Lương', offset: 5, element: FiveElements.MOC },
    { name: 'Thất Sát', offset: 6, element: FiveElements.KIM },
    { name: 'Phá Quân', offset: 10, element: FiveElements.THUY },
  ];

  for (const s of thienPhuStars) {
    const idx = (thienPhuIdx + s.offset) % 12;
    placements.push({
      branchIndex: idx,
      star: {
        code: s.name.toUpperCase().replace(/\s+/g, '_'),
        name: s.name,
        element: s.element,
        isMain: true,
        brightness: StarBrightness.DAC_DIA,
      },
    });
  }

  // 3. Phụ Tinh theo Tháng sinh
  const taPhuIdx = (4 + (lunarMonth - 1)) % 12;
  const huuBatIdx = (10 - (lunarMonth - 1) + 12) % 12;

  placements.push(
    { branchIndex: taPhuIdx, star: { code: 'TA_PHU', name: 'Tả Phụ', element: FiveElements.THO, isMain: false } },
    { branchIndex: huuBatIdx, star: { code: 'HUU_BAT', name: 'Hữu Bật', element: FiveElements.THO, isMain: false } }
  );

  // 4. Phụ Tinh theo Giờ sinh
  const vanXuongIdx = (10 - hourBranchIdx + 12) % 12;
  const vanKhucIdx = (4 + hourBranchIdx) % 12;

  placements.push(
    { branchIndex: vanXuongIdx, star: { code: 'VAN_XUONG', name: 'Văn Xương', element: FiveElements.KIM, isMain: false } },
    { branchIndex: vanKhucIdx, star: { code: 'VAN_KHUC', name: 'Văn Khúc', element: FiveElements.THUY, isMain: false } }
  );

  const diaKiepIdx = (11 + hourBranchIdx) % 12;
  const diaKhongIdx = (11 - hourBranchIdx + 12) % 12;

  placements.push(
    { branchIndex: diaKiepIdx, star: { code: 'DIA_KIEP', name: 'Địa Kiếp', element: FiveElements.HOA, isMain: false } },
    { branchIndex: diaKhongIdx, star: { code: 'DIA_KHONG', name: 'Địa Không', element: FiveElements.HOA, isMain: false } }
  );

  // 5. Thiên Khôi & Thiên Việt
  const khoiVietMap: Record<HeavenlyStem, { khoi: number; viet: number }> = {
    [HeavenlyStem.GIAP]: { khoi: 1, viet: 7 },
    [HeavenlyStem.AT]: { khoi: 0, viet: 8 },
    [HeavenlyStem.BINH]: { khoi: 11, viet: 9 },
    [HeavenlyStem.DINH]: { khoi: 11, viet: 9 },
    [HeavenlyStem.MAU]: { khoi: 1, viet: 7 },
    [HeavenlyStem.KY]: { khoi: 0, viet: 8 },
    [HeavenlyStem.CANH]: { khoi: 2, viet: 6 },
    [HeavenlyStem.TAN]: { khoi: 6, viet: 2 },
    [HeavenlyStem.NHAM]: { khoi: 3, viet: 5 },
    [HeavenlyStem.QUY]: { khoi: 3, viet: 5 },
  };

  const kv = khoiVietMap[yearStem] ?? { khoi: 1, viet: 7 };
  placements.push(
    { branchIndex: kv.khoi, star: { code: 'THIEN_KHOI', name: 'Thiên Khôi', element: FiveElements.HOA, isMain: false } },
    { branchIndex: kv.viet, star: { code: 'THIEN_VIET', name: 'Thiên Việt', element: FiveElements.HOA, isMain: false } }
  );

  // 6. Tứ Hóa (TUVI_METHOD_V1: Nam Phái truyền thống)
  const tuHoaRules: Record<HeavenlyStem, { loc: string; quyen: string; khoa: string; ky: string }> = {
    [HeavenlyStem.GIAP]: { loc: 'LIEM_TRINH', quyen: 'PHA_QUAN', khoa: 'VU_KHUC', ky: 'THAI_DUONG' },
    [HeavenlyStem.AT]: { loc: 'THIEN_CO', quyen: 'THIEN_LUONG', khoa: 'TU_VI', ky: 'THAI_AM' },
    [HeavenlyStem.BINH]: { loc: 'THIEN_DONG', quyen: 'THIEN_CO', khoa: 'VAN_XUONG', ky: 'LIEM_TRINH' },
    [HeavenlyStem.DINH]: { loc: 'THAI_AM', quyen: 'THIEN_DONG', khoa: 'THIEN_CO', ky: 'CU_MON' },
    [HeavenlyStem.MAU]: { loc: 'THAM_LANG', quyen: 'THAI_AM', khoa: 'HUU_BAT', ky: 'THIEN_CO' },
    [HeavenlyStem.KY]: { loc: 'VU_KHUC', quyen: 'THAM_LANG', khoa: 'THIEN_LUONG', ky: 'VAN_KHUC' },
    [HeavenlyStem.CANH]: { loc: 'THAI_DUONG', quyen: 'VU_KHUC', khoa: 'THAI_AM', ky: 'THIEN_DONG' },
    [HeavenlyStem.TAN]: { loc: 'CU_MON', quyen: 'THAI_DUONG', khoa: 'VAN_KHUC', ky: 'VAN_XUONG' },
    [HeavenlyStem.NHAM]: { loc: 'THIEN_LUONG', quyen: 'TU_VI', khoa: 'TA_PHU', ky: 'VU_KHUC' },
    [HeavenlyStem.QUY]: { loc: 'PHA_QUAN', quyen: 'CU_MON', khoa: 'THAI_AM', ky: 'THAM_LANG' },
  };

  const th = tuHoaRules[yearStem];
  if (th) {
    const attachTuHoa = (targetCode: string, hoaName: string, hoaCode: string) => {
      const match = placements.find((p) => p.star.code === targetCode);
      if (match) {
        placements.push({
          branchIndex: match.branchIndex,
          star: {
            code: hoaCode,
            name: hoaName,
            element: FiveElements.THUY,
            isMain: false,
          },
        });
      }
    };

    attachTuHoa(th.loc, 'Hóa Lộc', 'HOA_LOC');
    attachTuHoa(th.quyen, 'Hóa Quyền', 'HOA_QUYEN');
    attachTuHoa(th.khoa, 'Hóa Khoa', 'HOA_KHOA');
    attachTuHoa(th.ky, 'Hóa Kỵ', 'HOA_KY');
  }

  return placements;
}

export function locateTuanTriet(yearStem: HeavenlyStem, yearBranch: EarthlyBranch): {
  tuanBranches: EarthlyBranch[];
  trietBranches: EarthlyBranch[];
} {
  const stemIdx = STEMS.indexOf(yearStem);
  const branchIdx = BRANCHES.indexOf(yearBranch);

  const tuanStartIdx = (branchIdx - stemIdx + 10 + 12) % 12;
  const tuanBranches = [BRANCHES[tuanStartIdx]!, BRANCHES[(tuanStartIdx + 1) % 12]!];

  const trietMap: Record<number, number[]> = {
    0: [8, 9],
    1: [6, 7],
    2: [4, 5],
    3: [2, 3],
    4: [0, 1],
  };
  const trietPair = trietMap[stemIdx % 5] ?? [8, 9];
  const trietBranches = [BRANCHES[trietPair[0]!]!, BRANCHES[trietPair[1]!]!];

  return {
    tuanBranches,
    trietBranches,
  };
}

