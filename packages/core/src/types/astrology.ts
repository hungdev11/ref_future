export enum ZodiacSign {
  ARIES = 'ARIES',
  TAURUS = 'TAURUS',
  GEMINI = 'GEMINI',
  CANCER = 'CANCER',
  LEO = 'LEO',
  VIRGO = 'VIRGO',
  LIBRA = 'LIBRA',
  SCORPIO = 'SCORPIO',
  SAGITTARIUS = 'SAGITTARIUS',
  CAPRICORN = 'CAPRICORN',
  AQUARIUS = 'AQUARIUS',
  PISCES = 'PISCES',
}

export enum CelestialBody {
  SUN = 'SUN',
  MOON = 'MOON',
  MERCURY = 'MERCURY',
  VENUS = 'VENUS',
  MARS = 'MARS',
  JUPITER = 'JUPITER',
  SATURN = 'SATURN',
  URANUS = 'URANUS',
  NEPTUNE = 'NEPTUNE',
  PLUTO = 'PLUTO',
  CHIRON = 'CHIRON',
  NORTH_NODE = 'NORTH_NODE',
  SOUTH_NODE = 'SOUTH_NODE',
  ASCENDANT = 'ASCENDANT',
  MIDHEAVEN = 'MIDHEAVEN',
  VERTEX = 'VERTEX',
}

export enum AspectType {
  CONJUNCTION = 'CONJUNCTION', // 0 deg
  OPPOSITION = 'OPPOSITION',   // 180 deg
  TRINE = 'TRINE',             // 120 deg
  SQUARE = 'SQUARE',           // 90 deg
  SEXTILE = 'SEXTILE',         // 60 deg
  QUINCUNX = 'QUINCUNX',       // 150 deg
  SEMI_SEXTILE = 'SEMI_SEXTILE', // 30 deg
  SEMI_SQUARE = 'SEMI_SQUARE', // 45 deg
  SESQUIQUADRATE = 'SESQUIQUADRATE', // 135 deg
}

export enum HouseSystem {
  PLACIDUS = 'PLACIDUS',
  WHOLE_SIGN = 'WHOLE_SIGN',
  EQUAL = 'EQUAL',
  KOCH = 'KOCH',
  CAMPANUS = 'CAMPANUS',
  REGIOMONTANUS = 'REGIOMONTANUS',
}

export enum ZodiacSystem {
  TROPICAL = 'TROPICAL',
  SIDEREAL = 'SIDEREAL',
}

export interface BodyPosition {
  body: CelestialBody;
  longitude: number;
  latitude: number;
  distance: number;
  speed: number;
  isRetrograde: boolean;
  sign: ZodiacSign;
  signDegree: number;
  houseNumber: number | null;
}

export interface HouseCusp {
  houseNumber: number;
  cuspLongitude: number;
  sign: ZodiacSign;
  signDegree: number;
}

export interface AspectData {
  bodyA: CelestialBody;
  bodyB: CelestialBody;
  aspectType: AspectType;
  angle: number;
  orb: number;
  isApplying: boolean;
}

export interface AstrologyFacts {
  bodies: Record<CelestialBody, BodyPosition>;
  houses: HouseCusp[] | null;
  aspects: AspectData[];
  hasExactTime: boolean;
  ascendant: BodyPosition | null;
  midheaven: BodyPosition | null;
}
