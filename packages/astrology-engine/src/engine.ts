import * as crypto from 'crypto';
import {
  ICalculationEngine,
  EngineMetadata,
  CalculationResult,
  CelestialBody,
  AstrologyFacts,
  BodyPosition,
} from '@mystic/core';
import { AstrologyConfig, ASTRO_CONFIG_V1 } from './constants.js';
import { calculateEphemerisPositions } from './ephemeris.js';
import { calculateHouses, determinePlanetHouse } from './houses.js';
import { calculateAspects } from './aspects.js';

export interface AstrologyInput {
  birthDate: string; // "YYYY-MM-DD"
  birthTime?: string; // "HH:mm:ss" or "HH:mm"
  timezoneOffsetMinutes?: number; // e.g. 420 for UTC+7, 0 for UTC
  latitude?: number;
  longitude?: number;
  timeAccuracy?: 'EXACT' | 'APPROXIMATE' | 'UNKNOWN';
}

export class WesternAstrologyEngine
  implements ICalculationEngine<AstrologyInput, AstrologyConfig, AstrologyFacts>
{
  public readonly metadata: EngineMetadata = {
    discipline: 'ASTROLOGY',
    version: '1.0.0',
    description: 'High-precision VSOP87/ELP2000 Western Astrology Calculation Engine',
  };

  public validateInput(input: AstrologyInput): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!input.birthDate || !/^\d{4}-\d{2}-\d{2}$/.test(input.birthDate)) {
      errors.push('Invalid birthDate. Expected format YYYY-MM-DD.');
    }

    if (input.latitude !== undefined && (input.latitude < -90 || input.latitude > 90)) {
      errors.push('Latitude must be between -90 and 90 degrees.');
    }

    if (input.longitude !== undefined && (input.longitude < -180 || input.longitude > 180)) {
      errors.push('Longitude must be between -180 and 180 degrees.');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  public hashInput(input: AstrologyInput, config: AstrologyConfig): string {
    const payload = JSON.stringify({
      discipline: this.metadata.discipline,
      engineVersion: this.metadata.version,
      configVersion: config.configVersion,
      input,
    });
    return crypto.createHash('sha256').update(payload).digest('hex');
  }

  public async calculate(
    input: AstrologyInput,
    config: AstrologyConfig = ASTRO_CONFIG_V1
  ): Promise<CalculationResult<AstrologyFacts>> {
    const validation = this.validateInput(input);
    if (!validation.valid) {
      throw new Error(`Validation Error: ${validation.errors.join(', ')}`);
    }

    const hasExactTime =
      Boolean(input.birthTime) &&
      input.timeAccuracy !== 'UNKNOWN' &&
      input.latitude !== undefined &&
      input.longitude !== undefined;

    let utcDate: Date;
    let isDegraded = false;
    const degradationReasons: string[] = [];

    if (hasExactTime && input.birthTime) {
      const [year, month, day] = input.birthDate.split('-').map(Number);
      const timeParts = input.birthTime.split(':').map(Number);
      const hour = timeParts[0] ?? 0;
      const min = timeParts[1] ?? 0;
      const sec = timeParts[2] ?? 0;

      const offsetMinutes = input.timezoneOffsetMinutes ?? 0;
      // Convert local time to UTC
      const localEpochMs = Date.UTC(year!, month! - 1, day!, hour, min, sec);
      utcDate = new Date(localEpochMs - offsetMinutes * 60 * 1000);
    } else {
      // Degraded Mode: Exact birth time missing
      isDegraded = true;
      degradationReasons.push(
        'Birth time unavailable. Ascendant and house-based interpretations cannot be calculated.'
      );
      // Anchor to 12:00:00 UTC for planetary positions
      const [year, month, day] = input.birthDate.split('-').map(Number);
      utcDate = new Date(Date.UTC(year!, month! - 1, day!, 12, 0, 0));
    }

    // 1. Calculate celestial body coordinates
    const basePositions = calculateEphemerisPositions(utcDate);
    const finalBodies = {} as Record<CelestialBody, BodyPosition>;

    let ascendant: BodyPosition | null = null;
    let midheaven: BodyPosition | null = null;
    let houses = null;

    if (hasExactTime && input.latitude !== undefined && input.longitude !== undefined) {
      const houseResult = calculateHouses(
        utcDate,
        input.latitude,
        input.longitude,
        config.houseSystem
      );

      ascendant = houseResult.ascendant;
      midheaven = houseResult.midheaven;
      houses = houseResult.houses;

      for (const [bodyKey, pos] of Object.entries(basePositions)) {
        const body = bodyKey as CelestialBody;
        const houseNum = determinePlanetHouse(pos.longitude, houses);
        finalBodies[body] = {
          ...pos,
          houseNumber: houseNum,
        };
      }
      finalBodies[CelestialBody.ASCENDANT] = ascendant;
      finalBodies[CelestialBody.MIDHEAVEN] = midheaven;
    } else {
      for (const [bodyKey, pos] of Object.entries(basePositions)) {
        const body = bodyKey as CelestialBody;
        finalBodies[body] = {
          ...pos,
          houseNumber: null,
        };
      }
    }

    // 2. Calculate aspects
    const aspects = calculateAspects(finalBodies, config);

    // 3. Assemble canonical facts
    const facts: AstrologyFacts = {
      bodies: finalBodies,
      houses,
      aspects,
      hasExactTime,
      ascendant,
      midheaven,
    };

    // 4. Flatten to dot-notated facts for Rule Engine
    const dotNotatedFacts: Record<string, string | number | boolean | null> = {};

    for (const [bodyKey, pos] of Object.entries(finalBodies)) {
      const prefix = `astrology.planets.${bodyKey.toLowerCase()}`;
      dotNotatedFacts[`${prefix}.sign`] = pos.sign;
      dotNotatedFacts[`${prefix}.degree`] = Math.round(pos.signDegree * 100) / 100;
      dotNotatedFacts[`${prefix}.longitude`] = Math.round(pos.longitude * 100) / 100;
      dotNotatedFacts[`${prefix}.house`] = pos.houseNumber;
      dotNotatedFacts[`${prefix}.is_retrograde`] = pos.isRetrograde;
    }

    if (ascendant) {
      dotNotatedFacts['astrology.ascendant.sign'] = ascendant.sign;
      dotNotatedFacts['astrology.ascendant.degree'] = Math.round(ascendant.signDegree * 100) / 100;
    }

    if (midheaven) {
      dotNotatedFacts['astrology.midheaven.sign'] = midheaven.sign;
      dotNotatedFacts['astrology.midheaven.degree'] = Math.round(midheaven.signDegree * 100) / 100;
    }

    if (houses) {
      for (const house of houses) {
        dotNotatedFacts[`astrology.houses.house_${house.houseNumber}.sign`] = house.sign;
        dotNotatedFacts[`astrology.houses.house_${house.houseNumber}.cusp`] =
          Math.round(house.cuspLongitude * 100) / 100;
      }
    }

    for (const aspect of aspects) {
      const pairKey = `${aspect.bodyA.toLowerCase()}_${aspect.aspectType.toLowerCase()}_${aspect.bodyB.toLowerCase()}`;
      dotNotatedFacts[`astrology.aspects.${pairKey}.orb`] = Math.round(aspect.orb * 100) / 100;
      dotNotatedFacts[`astrology.aspects.${pairKey}.is_applying`] = aspect.isApplying;
    }

    const inputHash = this.hashInput(input, config);

    return {
      discipline: this.metadata.discipline,
      engineVersion: this.metadata.version,
      configVersion: config.configVersion,
      inputHash,
      calculatedAt: new Date().toISOString(),
      isDegraded,
      degradationReasons,
      facts,
      dotNotatedFacts,
      metadata: {
        utcCalculatedTime: utcDate.toISOString(),
        zodiacSystem: config.zodiacSystem,
        houseSystem: config.houseSystem,
        totalAspectsCount: aspects.length,
      },
    };
  }
}

