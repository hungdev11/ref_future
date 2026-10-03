import * as crypto from 'crypto';
import {
  ICalculationEngine,
  EngineMetadata,
  CalculationResult,
  NumerologyFacts,
  NumerologyNumberType,
} from '@mystic/core';
import { NumerologyConfig, PYTHAGOREAN_CONFIG_V1 } from './constants.js';
import { normalizeVietnameseName, classifyNameLetters } from './normalization.js';
import {
  calculateLifePath,
  calculateBirthdayNumber,
  calculateExpression,
  calculateSoulUrge,
  calculatePersonality,
  calculateMaturity,
  calculateCycles,
} from './calculator.js';

export interface NumerologyInput {
  fullName: string;
  birthDate: string; // "YYYY-MM-DD"
  targetDate?: string; // "YYYY-MM-DD" for temporal cycles, default today
}

export class PythagoreanNumerologyEngine
  implements ICalculationEngine<NumerologyInput, NumerologyConfig, NumerologyFacts>
{
  public readonly metadata: EngineMetadata = {
    discipline: 'NUMEROLOGY',
    version: '1.0.0',
    description: 'Pythagorean Numerology Engine with Vietnamese diacritic & Master Number support',
  };

  public validateInput(input: NumerologyInput): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!input.fullName || input.fullName.trim().length === 0) {
      errors.push('fullName must not be empty.');
    }

    if (!input.birthDate || !/^\d{4}-\d{2}-\d{2}$/.test(input.birthDate)) {
      errors.push('Invalid birthDate. Expected format YYYY-MM-DD.');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  public hashInput(input: NumerologyInput, config: NumerologyConfig): string {
    const payload = JSON.stringify({
      discipline: this.metadata.discipline,
      engineVersion: this.metadata.version,
      configVersion: config.configVersion,
      normalizedName: normalizeVietnameseName(input.fullName),
      birthDate: input.birthDate,
    });
    return crypto.createHash('sha256').update(payload).digest('hex');
  }

  public async calculate(
    input: NumerologyInput,
    config: NumerologyConfig = PYTHAGOREAN_CONFIG_V1
  ): Promise<CalculationResult<NumerologyFacts>> {
    const validation = this.validateInput(input);
    if (!validation.valid) {
      throw new Error(`Validation Error: ${validation.errors.join(', ')}`);
    }

    const normalizedName = normalizeVietnameseName(input.fullName);
    const letters = classifyNameLetters(normalizedName);

    const [yearStr, monthStr, dayStr] = input.birthDate.split('-');
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);

    const targetDate = input.targetDate ? new Date(input.targetDate) : new Date();

    // 1. Calculate Core Numbers
    const lifePath = calculateLifePath(input.birthDate, config);
    const birthday = calculateBirthdayNumber(day, config);
    const expression = calculateExpression(letters, config);
    const soulUrge = calculateSoulUrge(letters, config);
    const personality = calculatePersonality(letters, config);
    const maturity = calculateMaturity(lifePath.value, expression.value, config);

    // 2. Calculate Temporal Cycles & Pinnacles/Challenges
    const cycles = calculateCycles(day, month, year, lifePath.value, targetDate);

    const coreResults = {
      [NumerologyNumberType.LIFE_PATH]: lifePath,
      [NumerologyNumberType.BIRTHDAY]: birthday,
      [NumerologyNumberType.EXPRESSION]: expression,
      [NumerologyNumberType.SOUL_URGE]: soulUrge,
      [NumerologyNumberType.PERSONALITY]: personality,
      [NumerologyNumberType.MATURITY]: maturity,
      [NumerologyNumberType.PERSONAL_YEAR]: cycles.personalYear,
      [NumerologyNumberType.PERSONAL_MONTH]: cycles.personalMonth,
      [NumerologyNumberType.PERSONAL_DAY]: cycles.personalDay,
    };

    const facts: NumerologyFacts = {
      normalizedName,
      birthDateIso: input.birthDate,
      core: coreResults,
      pinnacles: cycles.pinnacles,
      challenges: cycles.challenges,
      cycles: {
        bases: cycles.bases,
        PINNACLES: {
          bases: cycles.bases,
          pinnacle1: cycles.pinnacles[0]!,
          pinnacle2: cycles.pinnacles[1]!,
          pinnacle3: cycles.pinnacles[2]!,
          pinnacle4: cycles.pinnacles[3]!,
        },
        personalYear: cycles.personalYear,
        personalMonth: cycles.personalMonth,
        personalDay: cycles.personalDay,
      },
    };

    // 3. Flatten to dot-notated facts for Rule Engine
    const dotNotatedFacts: Record<string, string | number | boolean | null> = {
      'numerology.normalized_name': normalizedName,
      'numerology.core.life_path.value': lifePath.value,
      'numerology.core.life_path.is_master': lifePath.isMasterNumber,
      'numerology.core.birthday.value': birthday.value,
      'numerology.core.birthday.is_master': birthday.isMasterNumber,
      'numerology.core.expression.value': expression.value,
      'numerology.core.expression.is_master': expression.isMasterNumber,
      'numerology.core.soul_urge.value': soulUrge.value,
      'numerology.core.soul_urge.is_master': soulUrge.isMasterNumber,
      'numerology.core.personality.value': personality.value,
      'numerology.core.personality.is_master': personality.isMasterNumber,
      'numerology.core.maturity.value': maturity.value,
      'numerology.core.maturity.is_master': maturity.isMasterNumber,
      'numerology.cycles.personal_year.value': cycles.personalYear.value,
      'numerology.cycles.personal_month.value': cycles.personalMonth.value,
      'numerology.cycles.personal_day.value': cycles.personalDay.value,
      'numerology.cycles.pinnacle_1.value': cycles.pinnacles[0]?.value ?? null,
      'numerology.cycles.pinnacle_2.value': cycles.pinnacles[1]?.value ?? null,
      'numerology.cycles.pinnacle_3.value': cycles.pinnacles[2]?.value ?? null,
      'numerology.cycles.pinnacle_4.value': cycles.pinnacles[3]?.value ?? null,
    };

    const inputHash = this.hashInput(input, config);

    return {
      discipline: this.metadata.discipline,
      engineVersion: this.metadata.version,
      configVersion: config.configVersion,
      inputHash,
      calculatedAt: new Date().toISOString(),
      isDegraded: false,
      degradationReasons: [],
      facts,
      dotNotatedFacts,
      metadata: {
        rawName: input.fullName,
        normalizedLetterCount: letters.length,
        vowelCount: letters.filter((l) => l.isVowel).length,
        consonantCount: letters.filter((l) => !l.isVowel).length,
      },
    };
  }
}
