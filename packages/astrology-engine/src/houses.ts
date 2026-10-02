import * as Astronomy from 'astronomy-engine';
import {
  CelestialBody,
  BodyPosition,
  HouseCusp,
  HouseSystem,
} from '@mystic/core';
import { normalizeDegrees, longitudeToSign } from './ephemeris.js';

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

export interface HouseCalculationResult {
  ascendant: BodyPosition;
  midheaven: BodyPosition;
  houses: HouseCusp[];
}

export function calculateAscendantAndMC(
  utcDate: Date,
  latitude: number,
  longitude: number
): { ascendantLon: number; mcLon: number } {
  const time = new Astronomy.AstroTime(utcDate);
  const gmstHours = Astronomy.SiderealTime(time);
  const ramc = normalizeDegrees(gmstHours * 15 + longitude);

  const ramcRad = ramc * DEG2RAD;
  const latRad = latitude * DEG2RAD;

  // True obliquity of the ecliptic
  const jd = time.ut + 2451545.0;
  const T = (jd - 2451545.0) / 36525.0;
  const eps = (23.4392911 - 0.0130042 * T) * DEG2RAD;

  // Midheaven (MC): Upper meridian
  const mcLon = normalizeDegrees(
    Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(eps)) * RAD2DEG
  );

  // Ascendant: Eastern horizon
  const ascY = Math.cos(ramcRad);
  const ascX = -Math.sin(ramcRad) * Math.cos(eps) - Math.tan(latRad) * Math.sin(eps);
  const ascLon = normalizeDegrees(Math.atan2(ascY, ascX) * RAD2DEG);

  return { ascendantLon: ascLon, mcLon };
}

export function calculateHouses(
  utcDate: Date,
  latitude: number,
  longitude: number,
  system: HouseSystem = HouseSystem.PLACIDUS
): HouseCalculationResult {
  const { ascendantLon, mcLon } = calculateAscendantAndMC(utcDate, latitude, longitude);

  const ascSign = longitudeToSign(ascendantLon);
  const mcSign = longitudeToSign(mcLon);

  const ascendant: BodyPosition = {
    body: CelestialBody.ASCENDANT,
    longitude: ascendantLon,
    latitude: 0,
    distance: 1.0,
    speed: 360,
    isRetrograde: false,
    sign: ascSign.sign,
    signDegree: ascSign.signDegree,
    houseNumber: 1,
  };

  const midheaven: BodyPosition = {
    body: CelestialBody.MIDHEAVEN,
    longitude: mcLon,
    latitude: 0,
    distance: 1.0,
    speed: 360,
    isRetrograde: false,
    sign: mcSign.sign,
    signDegree: mcSign.signDegree,
    houseNumber: 10,
  };

  const cusps: number[] = new Array(12).fill(0);

  if (system === HouseSystem.WHOLE_SIGN) {
    const ascSignIndex = Math.floor(ascendantLon / 30);
    for (let i = 0; i < 12; i++) {
      cusps[i] = normalizeDegrees((ascSignIndex + i) * 30);
    }
  } else if (system === HouseSystem.EQUAL) {
    for (let i = 0; i < 12; i++) {
      cusps[i] = normalizeDegrees(ascendantLon + i * 30);
    }
  } else {
    // Placidus (Default) with polar latitude fallback
    if (Math.abs(latitude) > 66.0) {
      const ascSignIndex = Math.floor(ascendantLon / 30);
      for (let i = 0; i < 12; i++) {
        cusps[i] = normalizeDegrees((ascSignIndex + i) * 30);
      }
    } else {
      cusps[0] = ascendantLon;  // House 1
      cusps[9] = mcLon;          // House 10
      cusps[6] = normalizeDegrees(ascendantLon + 180); // House 7 (DSC)
      cusps[3] = normalizeDegrees(mcLon + 180);        // House 4 (IC)

      // Time-proportional trisection for houses 11, 12, 2, 3
      cusps[10] = normalizeDegrees(mcLon + (normalizeDegrees(ascendantLon - mcLon) * (1 / 3))); // H11
      cusps[11] = normalizeDegrees(mcLon + (normalizeDegrees(ascendantLon - mcLon) * (2 / 3))); // H12

      const ic = normalizeDegrees(mcLon + 180);
      cusps[1] = normalizeDegrees(ascendantLon + (normalizeDegrees(ic - ascendantLon) * (1 / 3))); // H2
      cusps[2] = normalizeDegrees(ascendantLon + (normalizeDegrees(ic - ascendantLon) * (2 / 3))); // H3

      // Opposite houses (5, 6, 8, 9)
      cusps[4] = normalizeDegrees(cusps[10]! + 180); // H5 = opp H11
      cusps[5] = normalizeDegrees(cusps[11]! + 180); // H6 = opp H12
      cusps[7] = normalizeDegrees(cusps[1]! + 180);  // H8 = opp H2
      cusps[8] = normalizeDegrees(cusps[2]! + 180);  // H9 = opp H3
    }
  }

  const houses: HouseCusp[] = cusps.map((cuspLon, idx) => {
    const signInfo = longitudeToSign(cuspLon);
    return {
      houseNumber: idx + 1,
      cuspLongitude: cuspLon,
      sign: signInfo.sign,
      signDegree: signInfo.signDegree,
    };
  });

  return {
    ascendant,
    midheaven,
    houses,
  };
}

export function determinePlanetHouse(
  planetLon: number,
  houses: HouseCusp[]
): number {
  const normPlanet = normalizeDegrees(planetLon);

  for (let i = 0; i < 12; i++) {
    const currentCusp = houses[i]!.cuspLongitude;
    const nextCusp = houses[(i + 1) % 12]!.cuspLongitude;

    if (currentCusp < nextCusp) {
      if (normPlanet >= currentCusp && normPlanet < nextCusp) {
        return i + 1;
      }
    } else {
      // Crosses 0 degrees Aries
      if (normPlanet >= currentCusp || normPlanet < nextCusp) {
        return i + 1;
      }
    }
  }

  return 1;
}

