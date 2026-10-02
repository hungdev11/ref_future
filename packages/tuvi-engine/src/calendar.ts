import { HeavenlyStem, EarthlyBranch } from '@mystic/core';

export const STEMS: HeavenlyStem[] = [
  HeavenlyStem.GIAP,
  HeavenlyStem.AT,
  HeavenlyStem.BINH,
  HeavenlyStem.DINH,
  HeavenlyStem.MAU,
  HeavenlyStem.KY,
  HeavenlyStem.CANH,
  HeavenlyStem.TAN,
  HeavenlyStem.NHAM,
  HeavenlyStem.QUY,
];

export const BRANCHES: EarthlyBranch[] = [
  EarthlyBranch.TY_RAT,
  EarthlyBranch.SUU_OX,
  EarthlyBranch.DAN_TIGER,
  EarthlyBranch.MAO_CAT,
  EarthlyBranch.THIN_DRAGON,
  EarthlyBranch.TY_SNAKE,
  EarthlyBranch.NGO_HORSE,
  EarthlyBranch.MUI_GOAT,
  EarthlyBranch.THAN_MONKEY,
  EarthlyBranch.DAU_ROOSTER,
  EarthlyBranch.TUAT_DOG,
  EarthlyBranch.HOI_PIG,
];

export interface LunarDateResult {
  lunarDay: number;
  lunarMonth: number;
  lunarYear: number;
  isLeapMonth: boolean;
  yearStem: HeavenlyStem;
  yearBranch: EarthlyBranch;
  monthStem: HeavenlyStem;
  monthBranch: EarthlyBranch;
  dayStem: HeavenlyStem;
  dayBranch: EarthlyBranch;
}

export function jdFromDate(dd: number, mm: number, yy: number): number {
  const a = Math.floor((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  if (jd < 2299161) {
    jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  return jd;
}

function getNewMoonDay(k: number, timeZone: number = 7): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 -= 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(2 * dr * Mpr);
  C1 -= 0.0004 * Math.sin(3 * dr * Mpr);
  C1 += 0.0104 * Math.sin(2 * dr * F) - 0.0051 * Math.sin((M + Mpr) * dr);
  C1 -= 0.0074 * Math.sin((M - Mpr) * dr) + 0.0004 * Math.sin((2 * F + M) * dr);
  C1 -= 0.0004 * Math.sin((2 * F - M) * dr) - 0.0006 * Math.sin((2 * F + Mpr) * dr);
  C1 += 0.0010 * Math.sin((2 * F - Mpr) * dr) + 0.0005 * Math.sin((2 * Mpr + M) * dr);
  const deltat = T < -11 ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 : -0.00007 + 0.00008 * T;
  const JdNew = Jd1 + C1 - deltat;
  return Math.floor(JdNew + 0.5 + timeZone / 24);
}

function getSunLongitude(jdn: number, timeZone: number = 7): number {
  const T = (jdn - 2451545.0 + 0.5 - timeZone / 24) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  let L = L0 + DL;
  L = L * dr;
  L = L - Math.PI * 2 * Math.floor(L / (Math.PI * 2));
  return Math.floor((L / Math.PI) * 6);
}

function getLunarMonth11(yy: number, timeZone: number = 7): number {
  let off = jdFromDate(31, 12, yy) - 2415021;
  let k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  let sunLong = getSunLongitude(nm, timeZone);
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}

export function convertSolarToLunar(
  dd: number,
  mm: number,
  yy: number,
  timeZone: number = 7
): { day: number; month: number; year: number; isLeap: boolean } {
  const dayNumber = jdFromDate(dd, mm, yy);
  let k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }

  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear: number;

  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }

  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  let lunarMonth = diff + 11;
  let isLeap = false;

  if (b11 - a11 > 365) {
    let leapMonthDiff = -1;
    for (let i = 0; i <= 13; i++) {
      const nm1 = getNewMoonDay(k - diff + i, timeZone);
      const nm2 = getNewMoonDay(k - diff + i + 1, timeZone);
      const sl1 = getSunLongitude(nm1, timeZone);
      const sl2 = getSunLongitude(nm2, timeZone);
      if (sl1 === sl2) {
        leapMonthDiff = i;
        break;
      }
    }
    if (diff >= leapMonthDiff && leapMonthDiff !== -1) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) isLeap = true;
    }
  }

  if (lunarMonth > 12) {
    lunarMonth -= 12;
  }
  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }

  return { day: lunarDay, month: lunarMonth, year: lunarYear, isLeap };
}

export function getYearStemBranch(lunarYear: number): { stem: HeavenlyStem; branch: EarthlyBranch } {
  const stemIndex = (lunarYear + 6) % 10;
  const branchIndex = (lunarYear + 8) % 12;
  return {
    stem: STEMS[stemIndex]!,
    branch: BRANCHES[branchIndex]!,
  };
}

export function getMonthStemBranch(
  yearStem: HeavenlyStem,
  lunarMonth: number
): { stem: HeavenlyStem; branch: EarthlyBranch } {
  const yearStemIdx = STEMS.indexOf(yearStem);
  const firstMonthStemIdx = ((yearStemIdx % 5) * 2 + 2) % 10;

  const monthStemIdx = (firstMonthStemIdx + (lunarMonth - 1)) % 10;
  const monthBranchIdx = (2 + (lunarMonth - 1)) % 12;

  return {
    stem: STEMS[monthStemIdx]!,
    branch: BRANCHES[monthBranchIdx]!,
  };
}

export function getDayStemBranch(jd: number): { stem: HeavenlyStem; branch: EarthlyBranch } {
  const stemIndex = (jd + 9) % 10;
  const branchIndex = (jd + 1) % 12;
  return {
    stem: STEMS[stemIndex]!,
    branch: BRANCHES[branchIndex]!,
  };
}

export function getHourStemBranch(
  dayStem: HeavenlyStem,
  hour: number,
  _minute: number = 0
): { stem: HeavenlyStem; branch: EarthlyBranch } {
  const branchIdx = Math.floor((hour + 1) / 2) % 12;

  const dayStemIdx = STEMS.indexOf(dayStem);
  const tyHourStemIdx = ((dayStemIdx % 5) * 2) % 10;
  const hourStemIdx = (tyHourStemIdx + branchIdx) % 10;

  return {
    stem: STEMS[hourStemIdx]!,
    branch: BRANCHES[branchIdx]!,
  };
}
