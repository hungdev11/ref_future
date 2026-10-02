import * as crypto from 'crypto';
import {
  ICalculationEngine,
  EngineMetadata,
  CalculationResult,
  TuViFacts,
  TuViPalaceData,
  PalaceName,
} from '@mystic/core';
import {
  convertSolarToLunar,
  getYearStemBranch,
  getMonthStemBranch,
  getDayStemBranch,
  getHourStemBranch,
  jdFromDate,
  STEMS,
} from './calendar.js';
import { locateMenhAndThan, assignPalaceBranches, determineCuc } from './palaces.js';
import { placeAllStars, locateTuanTriet } from './stars.js';
import { calculateDaiHan } from './cycles.js';

export interface TuViConfig {
  methodVersion: string;
  leapMonthHandling: 'SPLIT_AT_15' | 'KEEP_CURRENT';
}

export const TUVI_METHOD_V1_CONFIG: TuViConfig = {
  methodVersion: 'TUVI_METHOD_V1',
  leapMonthHandling: 'SPLIT_AT_15',
};

export interface TuViInput {
  solarDate: string; // "YYYY-MM-DD"
  birthTime?: string; // "HH:mm:ss" or "HH:mm"
  gender: 'MALE' | 'FEMALE';
  timezoneOffsetMinutes?: number; // default 420 for UTC+7
}

export class TuViEngine implements ICalculationEngine<TuViInput, TuViConfig, TuViFacts> {
  public readonly metadata: EngineMetadata = {
    discipline: 'TUVI',
    version: '1.0.0',
    description: 'Classical Vietnamese Tu Vi Dau So Engine (Nam Phai, GMT+7)',
  };

  public validateInput(input: TuViInput): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!input.solarDate || !/^\d{4}-\d{2}-\d{2}$/.test(input.solarDate)) {
      errors.push('Invalid solarDate. Expected format YYYY-MM-DD.');
    }

    if (!input.birthTime || input.birthTime.trim().length === 0) {
      errors.push(
        'ERR_MISSING_BIRTH_HOUR: Tử Vi Đẩu Số requires birth hour branch. Cannot construct chart without birth hour.'
      );
    }

    if (!['MALE', 'FEMALE'].includes(input.gender)) {
      errors.push("gender must be either 'MALE' or 'FEMALE'.");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  public hashInput(input: TuViInput, config: TuViConfig): string {
    const payload = JSON.stringify({
      discipline: this.metadata.discipline,
      engineVersion: this.metadata.version,
      methodVersion: config.methodVersion,
      solarDate: input.solarDate,
      birthTime: input.birthTime,
      gender: input.gender,
    });
    return crypto.createHash('sha256').update(payload).digest('hex');
  }

  public async calculate(
    input: TuViInput,
    config: TuViConfig = TUVI_METHOD_V1_CONFIG
  ): Promise<CalculationResult<TuViFacts>> {
    const validation = this.validateInput(input);
    if (!validation.valid) {
      throw new Error(`Validation Error: ${validation.errors.join(', ')}`);
    }

    const [year, month, day] = input.solarDate.split('-').map(Number);
    const [hour, minute] = input.birthTime!.split(':').map(Number);

    // 1. Solar to Lunar Conversion (GMT+7)
    const lunar = convertSolarToLunar(day!, month!, year!, 7);

    // 2. Can Chi 4 Trụ
    const yearCanChi = getYearStemBranch(lunar.year);
    const monthCanChi = getMonthStemBranch(yearCanChi.stem, lunar.month);
    const jd = jdFromDate(day!, month!, year!);
    const dayCanChi = getDayStemBranch(jd);
    const hourCanChi = getHourStemBranch(dayCanChi.stem, hour!, minute ?? 0);

    // 3. Mệnh & Thân
    const { menhBranch, menhBranchIdx, thanBranch, thanBranchIdx } = locateMenhAndThan(
      lunar.month,
      hourCanChi.branch
    );

    // 4. 12 Palaces
    const palacePositions = assignPalaceBranches(menhBranchIdx, thanBranchIdx, yearCanChi.stem);

    // 5. Cục (Ngũ Hành Cục)
    const cucInfo = determineCuc(yearCanChi.stem, menhBranch);

    // 6. Stars placement
    const starPlacements = placeAllStars(
      cucInfo.cucNumber,
      lunar.day,
      lunar.month,
      hourCanChi.branch,
      yearCanChi.stem,
      yearCanChi.branch,
      input.gender
    );

    // 7. Tuần Không & Triệt Không
    const { tuanBranches, trietBranches } = locateTuanTriet(yearCanChi.stem, yearCanChi.branch);

    // 8. Đại Hạn
    const daiHan = calculateDaiHan(
      cucInfo.cucNumber,
      menhBranchIdx,
      yearCanChi.stem,
      input.gender,
      palacePositions
    );

    // 9. Build Palace Fact Record
    const palaces = {} as Record<PalaceName, TuViPalaceData>;

    for (const [palaceKey, pos] of Object.entries(palacePositions)) {
      const pName = palaceKey as PalaceName;
      const starsInPalace = starPlacements
        .filter((sp) => sp.branchIndex === pos.branchIndex)
        .map((sp) => sp.star);

      const isTuan = tuanBranches.includes(pos.branch);
      const isTriet = trietBranches.includes(pos.branch);
      const dhRange = daiHan[pName] ?? { startAge: 0, endAge: 0 };

      palaces[pName] = {
        palaceName: pName,
        branch: pos.branch,
        stem: pos.stem,
        isThan: pos.isThan,
        isTuan,
        isTriet,
        daiHanStartAge: dhRange.startAge,
        daiHanEndAge: dhRange.endAge,
        stars: starsInPalace,
      };
    }

    const isYangYear = [0, 2, 4, 6, 8].includes(STEMS.indexOf(yearCanChi.stem));
    const amDuongNamNu = `${isYangYear ? 'Dương' : 'Âm'} ${input.gender === 'MALE' ? 'Nam' : 'Nữ'}`;

    const facts: TuViFacts = {
      yearStem: yearCanChi.stem,
      yearBranch: yearCanChi.branch,
      monthStem: monthCanChi.stem,
      monthBranch: monthCanChi.branch,
      dayStem: dayCanChi.stem,
      dayBranch: dayCanChi.branch,
      hourStem: hourCanChi.stem,
      hourBranch: hourCanChi.branch,
      menhNguHanh: cucInfo.element,
      menhDetail: cucInfo.detail,
      cuc: cucInfo.cuc,
      cucNumber: cucInfo.cucNumber,
      menhBranch,
      thanBranch,
      amDuongNamNu,
      palaces,
    };

    // 10. Flatten to dot-notated facts for Rule Engine
    const dotNotatedFacts: Record<string, string | number | boolean | null> = {
      'tuvi.year_stem': yearCanChi.stem,
      'tuvi.year_branch': yearCanChi.branch,
      'tuvi.cuc.type': cucInfo.cuc,
      'tuvi.cuc.number': cucInfo.cucNumber,
      'tuvi.menh.branch': menhBranch,
      'tuvi.than.branch': thanBranch,
      'tuvi.am_duong_nam_nu': amDuongNamNu,
    };

    for (const [palaceKey, pData] of Object.entries(palaces)) {
      const prefix = `tuvi.palaces.${palaceKey.toLowerCase()}`;
      dotNotatedFacts[`${prefix}.branch`] = pData.branch;
      dotNotatedFacts[`${prefix}.stem`] = pData.stem;
      dotNotatedFacts[`${prefix}.is_than`] = pData.isThan;
      dotNotatedFacts[`${prefix}.is_tuan`] = pData.isTuan;
      dotNotatedFacts[`${prefix}.is_triet`] = pData.isTriet;
      dotNotatedFacts[`${prefix}.dai_han_start`] = pData.daiHanStartAge;

      for (const s of pData.stars) {
        dotNotatedFacts[`${prefix}.has_${s.code.toLowerCase()}`] = true;
      }
    }

    const inputHash = this.hashInput(input, config);

    return {
      discipline: this.metadata.discipline,
      engineVersion: this.metadata.version,
      configVersion: config.methodVersion,
      inputHash,
      calculatedAt: new Date().toISOString(),
      isDegraded: false,
      degradationReasons: [],
      facts,
      dotNotatedFacts,
      metadata: {
        lunarDay: lunar.day,
        lunarMonth: lunar.month,
        lunarYear: lunar.year,
        isLeapMonth: lunar.isLeap,
        cucDetail: cucInfo.detail,
        methodVersion: config.methodVersion,
      },
    };
  }
}

