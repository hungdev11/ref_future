import * as Astronomy from 'astronomy-engine';
import { CelestialBody, BodyPosition, ZodiacSign } from '@mystic/core';
import { ZODIAC_SIGNS } from './constants.js';

export function normalizeDegrees(deg: number): number {
  let d = deg % 360;
  if (d < 0) {
    d += 360;
  }
  return d;
}

export function longitudeToSign(lon: number): { sign: ZodiacSign; signDegree: number } {
  const normalized = normalizeDegrees(lon);
  const signIndex = Math.floor(normalized / 30);
  const sign = ZODIAC_SIGNS[signIndex]!;
  const signDegree = normalized - signIndex * 30;
  return { sign, signDegree };
}

export function calculateEphemerisPositions(
  utcDate: Date
): Record<CelestialBody, Omit<BodyPosition, 'houseNumber'>> {
  const time = new Astronomy.AstroTime(utcDate);
  const nextTime = new Astronomy.AstroTime(new Date(utcDate.getTime() + 3600 * 1000)); // 1 hr later for speed

  const result = {} as Record<CelestialBody, Omit<BodyPosition, 'houseNumber'>>;

  // 1. Sun
  const sun = Astronomy.SunPosition(time);
  const nextSun = Astronomy.SunPosition(nextTime);
  const sunSpeed = (normalizeDegrees(nextSun.elon - sun.elon) * 24);
  const sunSign = longitudeToSign(sun.elon);

  result[CelestialBody.SUN] = {
    body: CelestialBody.SUN,
    longitude: sun.elon,
    latitude: sun.elat,
    distance: 1.0,
    speed: sunSpeed,
    isRetrograde: false,
    sign: sunSign.sign,
    signDegree: sunSign.signDegree,
  };

  // 2. Moon
  const moon = Astronomy.EclipticGeoMoon(time);
  const nextMoon = Astronomy.EclipticGeoMoon(nextTime);
  const moonSpeed = (normalizeDegrees(nextMoon.lon - moon.lon) * 24);
  const moonSign = longitudeToSign(moon.lon);

  result[CelestialBody.MOON] = {
    body: CelestialBody.MOON,
    longitude: moon.lon,
    latitude: moon.lat,
    distance: moon.dist / 149597870.7, // Convert km to AU
    speed: moonSpeed,
    isRetrograde: false,
    sign: moonSign.sign,
    signDegree: moonSign.signDegree,
  };

  // 3. Planets
  const planetMapping: Array<{ body: CelestialBody; astroBody: Astronomy.Body }> = [
    { body: CelestialBody.MERCURY, astroBody: Astronomy.Body.Mercury },
    { body: CelestialBody.VENUS, astroBody: Astronomy.Body.Venus },
    { body: CelestialBody.MARS, astroBody: Astronomy.Body.Mars },
    { body: CelestialBody.JUPITER, astroBody: Astronomy.Body.Jupiter },
    { body: CelestialBody.SATURN, astroBody: Astronomy.Body.Saturn },
    { body: CelestialBody.URANUS, astroBody: Astronomy.Body.Uranus },
    { body: CelestialBody.NEPTUNE, astroBody: Astronomy.Body.Neptune },
    { body: CelestialBody.PLUTO, astroBody: Astronomy.Body.Pluto },
  ];

  for (const { body, astroBody } of planetMapping) {
    const vec = Astronomy.GeoVector(astroBody, time, true);
    const ecl = Astronomy.Ecliptic(vec);

    const nextVec = Astronomy.GeoVector(astroBody, nextTime, true);
    const nextEcl = Astronomy.Ecliptic(nextVec);

    let speedDeg = (nextEcl.elon - ecl.elon);
    if (speedDeg > 180) speedDeg -= 360;
    if (speedDeg < -180) speedDeg += 360;
    const dailySpeed = speedDeg * 24;

    const signData = longitudeToSign(ecl.elon);

    result[body] = {
      body,
      longitude: ecl.elon,
      latitude: ecl.elat,
      distance: Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z),
      speed: dailySpeed,
      isRetrograde: dailySpeed < 0,
      sign: signData.sign,
      signDegree: signData.signDegree,
    };
  }

  // 4. Mean Lunar Node (North & South Node)
  // Standard IAU / Meeus formula: T = centuries from J2000.0
  const jd = time.ut + 2451545.0;
  const T = (jd - 2451545.0) / 36525.0;
  const omega = normalizeDegrees(
    125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000
  );
  const northNodeSign = longitudeToSign(omega);

  result[CelestialBody.NORTH_NODE] = {
    body: CelestialBody.NORTH_NODE,
    longitude: omega,
    latitude: 0,
    distance: 1.0,
    speed: -0.053, // Nodes move retrograde ~19.3 degrees per year
    isRetrograde: true,
    sign: northNodeSign.sign,
    signDegree: northNodeSign.signDegree,
  };

  const southNodeLon = normalizeDegrees(omega + 180);
  const southNodeSign = longitudeToSign(southNodeLon);

  result[CelestialBody.SOUTH_NODE] = {
    body: CelestialBody.SOUTH_NODE,
    longitude: southNodeLon,
    latitude: 0,
    distance: 1.0,
    speed: -0.053,
    isRetrograde: true,
    sign: southNodeSign.sign,
    signDegree: southNodeSign.signDegree,
  };

  // 5. Chiron
  // Mean orbital longitude approximation for Chiron
  const chironMeanLon = normalizeDegrees(287.8 + 7.086 * (jd - 2451545.0) / 365.25);
  const chironSign = longitudeToSign(chironMeanLon);

  result[CelestialBody.CHIRON] = {
    body: CelestialBody.CHIRON,
    longitude: chironMeanLon,
    latitude: 0,
    distance: 13.7,
    speed: 0.02,
    isRetrograde: false,
    sign: chironSign.sign,
    signDegree: chironSign.signDegree,
  };

  return result;
}
