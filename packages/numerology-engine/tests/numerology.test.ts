import { describe, it, expect } from 'vitest';
import { NumerologyNumberType } from '@mystic/core';
import {
  PythagoreanNumerologyEngine,
  normalizeVietnameseName,
  classifyWordLetters,
  PYTHAGOREAN_CONFIG_V1,
} from '../src/index.js';

describe('Vietnamese Name Normalization & Y Classification', () => {
  it('normalizes Vietnamese names properly (strips tones, maps Đ to D)', () => {
    expect(normalizeVietnameseName('  Nguyễn Văn Đức  ')).toBe('NGUYEN VAN DUC');
    expect(normalizeVietnameseName('Đặng Thị Thùy Linh')).toBe('DANG THI THUY LINH');
  });

  it('classifies Y as vowel when sole vowel or in diphthong nucleus', () => {
    // "Ý" has sole vowel Y
    const lettersY = classifyWordLetters('Y');
    expect(lettersY[0]!.isVowel).toBe(true);

    // "MY" has sole vowel Y
    const lettersMy = classifyWordLetters('MY');
    expect(lettersMy.find((l) => l.char === 'Y')!.isVowel).toBe(true);

    // "NGUYEN" has Y preceded by U
    const lettersNguyen = classifyWordLetters('NGUYEN');
    expect(lettersNguyen.find((l) => l.char === 'Y')!.isVowel).toBe(true);
  });

  it('classifies Y as consonant when leading semivowel before another vowel', () => {
    // "YEN" has leading Y followed by E
    const lettersYen = classifyWordLetters('YEN');
    expect(lettersYen[0]!.char).toBe('Y');
    expect(lettersYen[0]!.isVowel).toBe(false);
  });
});

describe('PythagoreanNumerologyEngine', () => {
  const engine = new PythagoreanNumerologyEngine();

  it('calculates Life Path correctly with component reduction & Master Numbers (1990-11-29)', async () => {
    const result = await engine.calculate({
      fullName: 'Nguyễn Văn Đức',
      birthDate: '1990-11-29',
    });

    const lp = result.facts.core[NumerologyNumberType.LIFE_PATH];
    // Month 11 (Master 11) + Day 29 (2+9=11 Master) + Year 1990 (1+9+9+0=19->10->1)
    // 11 + 11 + 1 = 23 -> 5
    expect(lp.value).toBe(5);
    expect(lp.isMasterNumber).toBe(false);
    expect(lp.rawCalculation).toContain('11');

    const bday = result.facts.core[NumerologyNumberType.BIRTHDAY];
    // Day 29 -> 11 (Master Number preserved for Birthday)
    expect(bday.value).toBe(11);
    expect(bday.isMasterNumber).toBe(true);
  });

  it('generates complete dot-notated facts for Rule Engine', async () => {
    const result = await engine.calculate({
      fullName: 'Trần Thị Mai',
      birthDate: '1995-05-15',
    });

    expect(result.dotNotatedFacts['numerology.normalized_name']).toBe('TRAN THI MAI');
    expect(result.dotNotatedFacts['numerology.core.life_path.value']).toBeDefined();
    expect(result.dotNotatedFacts['numerology.core.expression.value']).toBeDefined();
    expect(result.dotNotatedFacts['numerology.core.soul_urge.value']).toBeDefined();
    expect(result.dotNotatedFacts['numerology.core.personality.value']).toBeDefined();
  });

  it('is 100% deterministic over successive runs with identical inputs', async () => {
    const input = {
      fullName: 'Lê Hoàng Nam',
      birthDate: '1988-08-08',
    };

    const firstRun = await engine.calculate(input, PYTHAGOREAN_CONFIG_V1);
    const firstJson = JSON.stringify(firstRun.facts);

    for (let i = 0; i < 10; i++) {
      const subsequentRun = await engine.calculate(input, PYTHAGOREAN_CONFIG_V1);
      expect(JSON.stringify(subsequentRun.facts)).toBe(firstJson);
    }
  });
});

