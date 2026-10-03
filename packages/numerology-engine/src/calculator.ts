import {
  NumerologyNumberType,
  NumerologySingleResult,
  PinnacleCycle,
  ChallengeCycle,
} from '@mystic/core';
import { NumerologyConfig } from './constants.js';
import { ClassifiedLetter } from './normalization.js';

export function reduceNumber(
  num: number,
  preserveMasters: boolean = true,
  masters: number[] = [11, 22, 33]
): { value: number; isMaster: boolean; trace: string } {
  let current = Math.abs(Math.floor(num));
  const steps: number[] = [current];

  while (current > 9) {
    if (preserveMasters && masters.includes(current)) {
      break;
    }

    const digits = current
      .toString()
      .split('')
      .map(Number);
    current = digits.reduce((sum, d) => sum + d, 0);
    steps.push(current);
  }

  const isMaster = preserveMasters && masters.includes(current);
  const trace = steps.join(' -> ');

  return {
    value: current,
    isMaster,
    trace,
  };
}

export function calculateLifePath(
  birthDateIso: string,
  config: NumerologyConfig
): NumerologySingleResult {
  const [yearStr, monthStr, dayStr] = birthDateIso.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (config.lifePathMethod === 'REDUCE_COMPONENTS_FIRST') {
    const redMonth = reduceNumber(month, config.preserveMasterNumbers, config.masterNumbers);
    const redDay = reduceNumber(day, config.preserveMasterNumbers, config.masterNumbers);
    const redYear = reduceNumber(year, config.preserveMasterNumbers, config.masterNumbers);

    const sum = redMonth.value + redDay.value + redYear.value;
    const finalRed = reduceNumber(sum, config.preserveMasterNumbers, config.masterNumbers);

    return {
      type: NumerologyNumberType.LIFE_PATH,
      value: finalRed.value,
      isMasterNumber: finalRed.isMaster,
      rawCalculation: `(${redMonth.trace}) + (${redDay.trace}) + (${redYear.trace}) = ${sum} -> ${finalRed.trace}`,
    };
  } else {
    const allDigits = `${year}${month}${day}`.split('').map(Number);
    const sum = allDigits.reduce((acc, d) => acc + d, 0);
    const finalRed = reduceNumber(sum, config.preserveMasterNumbers, config.masterNumbers);

    return {
      type: NumerologyNumberType.LIFE_PATH,
      value: finalRed.value,
      isMasterNumber: finalRed.isMaster,
      rawCalculation: `${allDigits.join('+')} = ${sum} -> ${finalRed.trace}`,
    };
  }
}

export function calculateBirthdayNumber(
  day: number,
  config: NumerologyConfig
): NumerologySingleResult {
  // Birthday keeps 11 and 22 as master numbers
  const red = reduceNumber(day, config.preserveMasterNumbers, [11, 22]);
  return {
    type: NumerologyNumberType.BIRTHDAY,
    value: red.value,
    isMasterNumber: red.isMaster,
    rawCalculation: `Day ${day} -> ${red.trace}`,
  };
}

export function calculateExpression(
  letters: ClassifiedLetter[],
  config: NumerologyConfig
): NumerologySingleResult {
  const total = letters.reduce((sum, l) => sum + l.value, 0);
  const red = reduceNumber(total, config.preserveMasterNumbers, config.masterNumbers);

  return {
    type: NumerologyNumberType.EXPRESSION,
    value: red.value,
    isMasterNumber: red.isMaster,
    rawCalculation: `Sum of all letters (${letters.map((l) => l.char).join('')}) = ${total} -> ${red.trace}`,
  };
}

export function calculateSoulUrge(
  letters: ClassifiedLetter[],
  config: NumerologyConfig
): NumerologySingleResult {
  const vowels = letters.filter((l) => l.isVowel);
  const total = vowels.reduce((sum, l) => sum + l.value, 0);
  const red = reduceNumber(total, config.preserveMasterNumbers, config.masterNumbers);

  return {
    type: NumerologyNumberType.SOUL_URGE,
    value: red.value,
    isMasterNumber: red.isMaster,
    rawCalculation: `Sum of vowels (${vowels.map((l) => l.char).join('')}) = ${total} -> ${red.trace}`,
  };
}

export function calculatePersonality(
  letters: ClassifiedLetter[],
  config: NumerologyConfig
): NumerologySingleResult {
  const consonants = letters.filter((l) => !l.isVowel);
  const total = consonants.reduce((sum, l) => sum + l.value, 0);
  const red = reduceNumber(total, config.preserveMasterNumbers, config.masterNumbers);

  return {
    type: NumerologyNumberType.PERSONALITY,
    value: red.value,
    isMasterNumber: red.isMaster,
    rawCalculation: `Sum of consonants (${consonants.map((l) => l.char).join('')}) = ${total} -> ${red.trace}`,
  };
}

export function calculateMaturity(
  lifePath: number,
  expression: number,
  config: NumerologyConfig
): NumerologySingleResult {
  const sum = lifePath + expression;
  const red = reduceNumber(sum, config.preserveMasterNumbers, config.masterNumbers);

  return {
    type: NumerologyNumberType.MATURITY,
    value: red.value,
    isMasterNumber: red.isMaster,
    rawCalculation: `LifePath (${lifePath}) + Expression (${expression}) = ${sum} -> ${red.trace}`,
  };
}

export function calculateCycles(
  day: number,
  month: number,
  year: number,
  lifePathValue: number,
  targetDate: Date
): {
  bases: { month: number; day: number; year: number };
  personalYear: NumerologySingleResult;
  personalMonth: NumerologySingleResult;
  personalDay: NumerologySingleResult;
  pinnacles: PinnacleCycle[];
  challenges: ChallengeCycle[];
} {
  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth() + 1;
  const targetDay = targetDate.getDate();

  // Personal Year = Day + Month + Target Year
  const pySum = day + month + targetYear;
  const pyRed = reduceNumber(pySum, true, [11, 22]);

  // Personal Month = Personal Year + Target Month
  const pmSum = pyRed.value + targetMonth;
  const pmRed = reduceNumber(pmSum, true, [11, 22]);

  // Personal Day = Personal Month + Target Day
  const pdSum = pmRed.value + targetDay;
  const pdRed = reduceNumber(pdSum, true, [11, 22]);

  // Pinnacles calculation
  const rMonth = reduceNumber(month).value;
  const rDay = reduceNumber(day).value;
  const rYear = reduceNumber(year).value;

  const p1Val = reduceNumber(rMonth + rDay).value;
  const p2Val = reduceNumber(rDay + rYear).value;
  const p3Val = reduceNumber(p1Val + p2Val).value;
  const p4Val = reduceNumber(rMonth + rYear).value;

  const firstPinnacleEndAge = 36 - (lifePathValue > 9 ? reduceNumber(lifePathValue).value : lifePathValue);

  const pinnacles: PinnacleCycle[] = [
    { pinnacleNumber: 1, startAge: 0, endAge: firstPinnacleEndAge, value: p1Val },
    { pinnacleNumber: 2, startAge: firstPinnacleEndAge + 1, endAge: firstPinnacleEndAge + 9, value: p2Val },
    { pinnacleNumber: 3, startAge: firstPinnacleEndAge + 10, endAge: firstPinnacleEndAge + 18, value: p3Val },
    { pinnacleNumber: 4, startAge: firstPinnacleEndAge + 19, endAge: 99, value: p4Val },
  ];

  // Challenges calculation
  const c1Val = Math.abs(rMonth - rDay);
  const c2Val = Math.abs(rDay - rYear);
  const c3Val = Math.abs(c1Val - c2Val);
  const c4Val = Math.abs(rMonth - rYear);

  const challenges: ChallengeCycle[] = [
    { challengeNumber: 1, value: c1Val },
    { challengeNumber: 2, value: c2Val },
    { challengeNumber: 3, value: c3Val },
    { challengeNumber: 4, value: c4Val },
  ];

  return {
    bases: {
      month: rMonth,
      day: rDay,
      year: rYear,
    },
    personalYear: {
      type: NumerologyNumberType.PERSONAL_YEAR,
      value: pyRed.value,
      isMasterNumber: pyRed.isMaster,
      rawCalculation: `Day(${day}) + Month(${month}) + TargetYear(${targetYear}) = ${pySum} -> ${pyRed.trace}`,
    },
    personalMonth: {
      type: NumerologyNumberType.PERSONAL_MONTH,
      value: pmRed.value,
      isMasterNumber: pmRed.isMaster,
      rawCalculation: `PersonalYear(${pyRed.value}) + TargetMonth(${targetMonth}) = ${pmSum} -> ${pmRed.trace}`,
    },
    personalDay: {
      type: NumerologyNumberType.PERSONAL_DAY,
      value: pdRed.value,
      isMasterNumber: pdRed.isMaster,
      rawCalculation: `PersonalMonth(${pmRed.value}) + TargetDay(${targetDay}) = ${pdSum} -> ${pdRed.trace}`,
    },
    pinnacles,
    challenges,
  };
}
