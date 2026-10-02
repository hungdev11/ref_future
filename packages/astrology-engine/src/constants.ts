import {
  ZodiacSign,
  AspectType,
  HouseSystem,
  ZodiacSystem,
} from '@mystic/core';

export interface AstrologyConfig {
  configVersion: string;
  zodiacSystem: ZodiacSystem;
  houseSystem: HouseSystem;
  aspectOrbs: Record<
    AspectType,
    {
      angle: number;
      sunMoonOrb: number;
      planetOrb: number;
    }
  >;
}

export const ASTRO_CONFIG_V1: AstrologyConfig = {
  configVersion: 'ASTRO_CONFIG_V1',
  zodiacSystem: ZodiacSystem.TROPICAL,
  houseSystem: HouseSystem.PLACIDUS,
  aspectOrbs: {
    [AspectType.CONJUNCTION]: { angle: 0, sunMoonOrb: 10.0, planetOrb: 8.0 },
    [AspectType.OPPOSITION]: { angle: 180, sunMoonOrb: 10.0, planetOrb: 8.0 },
    [AspectType.TRINE]: { angle: 120, sunMoonOrb: 9.0, planetOrb: 7.0 },
    [AspectType.SQUARE]: { angle: 90, sunMoonOrb: 9.0, planetOrb: 7.0 },
    [AspectType.SEXTILE]: { angle: 60, sunMoonOrb: 6.0, planetOrb: 5.0 },
    [AspectType.QUINCUNX]: { angle: 150, sunMoonOrb: 3.0, planetOrb: 2.5 },
    [AspectType.SEMI_SEXTILE]: { angle: 30, sunMoonOrb: 2.5, planetOrb: 2.0 },
    [AspectType.SEMI_SQUARE]: { angle: 45, sunMoonOrb: 2.5, planetOrb: 2.0 },
    [AspectType.SESQUIQUADRATE]: { angle: 135, sunMoonOrb: 2.5, planetOrb: 2.0 },
  },
};

export const ZODIAC_SIGNS: ZodiacSign[] = [
  ZodiacSign.ARIES,
  ZodiacSign.TAURUS,
  ZodiacSign.GEMINI,
  ZodiacSign.CANCER,
  ZodiacSign.LEO,
  ZodiacSign.VIRGO,
  ZodiacSign.LIBRA,
  ZodiacSign.SCORPIO,
  ZodiacSign.SAGITTARIUS,
  ZodiacSign.CAPRICORN,
  ZodiacSign.AQUARIUS,
  ZodiacSign.PISCES,
];
