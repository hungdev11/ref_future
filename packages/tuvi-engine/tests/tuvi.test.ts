import { describe, it, expect } from 'vitest';
import {
  PalaceName,
  HeavenlyStem,
  EarthlyBranch,
} from '@mystic/core';
import {
  TuViEngine,
  TUVI_METHOD_V1_CONFIG,
  convertSolarToLunar,
  getYearStemBranch,
} from '../src/index.js';

describe('Vietnamese Astronomical Lunar Calendar', () => {
  it('converts solar date 1990-11-29 correctly to Canh Ngọ lunar year', () => {
    const lunar = convertSolarToLunar(29, 11, 1990, 7);
    expect(lunar.year).toBe(1990);
    expect(lunar.month).toBe(10);
    expect(lunar.day).toBe(13);

    const yearCanChi = getYearStemBranch(lunar.year);
    expect(yearCanChi.stem).toBe(HeavenlyStem.CANH);
    expect(yearCanChi.branch).toBe(EarthlyBranch.NGO_HORSE);
  });
});

describe('TuViEngine', () => {
  const engine = new TuViEngine();

  it('rejects chart generation when birth time is missing with ERR_MISSING_BIRTH_HOUR', () => {
    const val = engine.validateInput({
      solarDate: '1990-11-29',
      gender: 'MALE',
    });

    expect(val.valid).toBe(false);
    expect(val.errors[0]).toContain('ERR_MISSING_BIRTH_HOUR');
  });

  it('calculates full Tu Vi chart with 12 palaces, Cuc, and stars for exact input', async () => {
    const result = await engine.calculate({
      solarDate: '1990-11-29',
      birthTime: '09:30:00', // Giờ Tỵ
      gender: 'MALE',
    });

    expect(result.facts.palaces[PalaceName.MENH]).toBeDefined();
    expect(result.facts.palaces[PalaceName.THAN_MONKEY] ?? result.facts.palaces[PalaceName.PHUC_DUC]).toBeDefined();
    expect(result.facts.cucNumber).toBeGreaterThanOrEqual(2);
    expect(result.facts.cucNumber).toBeLessThanOrEqual(6);

    // Verify 12 palaces
    const palaceKeys = Object.keys(result.facts.palaces);
    expect(palaceKeys).toHaveLength(12);

    // Exactly one palace has isThan === true
    const thanPalaces = palaceKeys.filter((k) => result.facts.palaces[k as PalaceName]!.isThan);
    expect(thanPalaces).toHaveLength(1);

    // Verify dot-notated facts
    expect(result.dotNotatedFacts['tuvi.year_stem']).toBe(HeavenlyStem.CANH);
    expect(result.dotNotatedFacts['tuvi.cuc.number']).toBeDefined();
    expect(result.dotNotatedFacts['tuvi.palaces.menh.branch']).toBeDefined();
  });

  it('is 100% deterministic over successive runs with identical inputs', async () => {
    const input = {
      solarDate: '1985-06-15',
      birthTime: '14:20:00',
      gender: 'FEMALE' as const,
    };

    const firstRun = await engine.calculate(input, TUVI_METHOD_V1_CONFIG);
    const firstJson = JSON.stringify(firstRun.facts);

    for (let i = 0; i < 10; i++) {
      const subsequentRun = await engine.calculate(input, TUVI_METHOD_V1_CONFIG);
      expect(JSON.stringify(subsequentRun.facts)).toBe(firstJson);
    }
  });
});
