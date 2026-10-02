import { describe, it, expect } from 'vitest';
import { CelestialBody, ZodiacSign } from '@mystic/core';
import { WesternAstrologyEngine, ASTRO_CONFIG_V1 } from '../src/index.js';

describe('WesternAstrologyEngine', () => {
  const engine = new WesternAstrologyEngine();

  it('calculates astronomical epoch positions matching NASA JPL benchmarks (2000-01-01 12:00 UTC)', async () => {
    const result = await engine.calculate({
      birthDate: '2000-01-01',
      birthTime: '12:00:00',
      timezoneOffsetMinutes: 0,
      latitude: 51.48, // Greenwich
      longitude: 0.0,
      timeAccuracy: 'EXACT',
    });

    const sun = result.facts.bodies[CelestialBody.SUN];
    const moon = result.facts.bodies[CelestialBody.MOON];
    const mars = result.facts.bodies[CelestialBody.MARS];

    // Sun at ~280.37° (Capricorn 10°)
    expect(sun.sign).toBe(ZodiacSign.CAPRICORN);
    expect(sun.longitude).toBeGreaterThan(280.0);
    expect(sun.longitude).toBeLessThan(281.0);

    // Moon at ~223.32° (Scorpio 13°)
    expect(moon.sign).toBe(ZodiacSign.SCORPIO);
    expect(moon.longitude).toBeGreaterThan(223.0);
    expect(moon.longitude).toBeLessThan(224.0);

    // Mars at ~327.96° (Aquarius 27°)
    expect(mars.sign).toBe(ZodiacSign.AQUARIUS);
    expect(mars.longitude).toBeGreaterThan(327.0);
    expect(mars.longitude).toBeLessThan(329.0);
  });

  it('calculates 12 houses and assigns valid house placements for exact birth time', async () => {
    const result = await engine.calculate({
      birthDate: '1990-07-25',
      birthTime: '08:30:00',
      timezoneOffsetMinutes: 420, // GMT+7 (Hanoi)
      latitude: 21.0285,
      longitude: 105.8542,
      timeAccuracy: 'EXACT',
    });

    expect(result.isDegraded).toBe(false);
    expect(result.facts.ascendant).not.toBeNull();
    expect(result.facts.midheaven).not.toBeNull();
    expect(result.facts.houses).toHaveLength(12);

    // Verify each planet has a valid house (1-12)
    for (const bodyKey of Object.keys(result.facts.bodies)) {
      const body = result.facts.bodies[bodyKey as CelestialBody];
      expect(body.houseNumber).toBeGreaterThanOrEqual(1);
      expect(body.houseNumber).toBeLessThanOrEqual(12);
    }

    // Verify dot-notated facts for Rule Engine
    expect(result.dotNotatedFacts['astrology.planets.sun.sign']).toBe(ZodiacSign.LEO);
    expect(result.dotNotatedFacts['astrology.ascendant.sign']).toBeDefined();
    expect(result.dotNotatedFacts['astrology.houses.house_1.sign']).toBeDefined();
  });

  it('degrades gracefully when birth time is unknown', async () => {
    const result = await engine.calculate({
      birthDate: '1995-12-15',
      timeAccuracy: 'UNKNOWN',
    });

    expect(result.isDegraded).toBe(true);
    expect(result.degradationReasons).toContain(
      'Birth time unavailable. Ascendant and house-based interpretations cannot be calculated.'
    );
    expect(result.facts.ascendant).toBeNull();
    expect(result.facts.houses).toBeNull();
    expect(result.facts.bodies[CelestialBody.SUN].houseNumber).toBeNull();

    // Planet signs and longitudes are still calculated at 12:00 UTC
    expect(result.facts.bodies[CelestialBody.SUN].sign).toBe(ZodiacSign.SAGITTARIUS);
    expect(result.dotNotatedFacts['astrology.planets.sun.house']).toBeNull();
  });

  it('is 100% deterministic over successive runs with identical inputs', async () => {
    const input = {
      birthDate: '1988-08-08',
      birthTime: '18:18:00',
      timezoneOffsetMinutes: 420,
      latitude: 10.8231,
      longitude: 106.6297, // Ho Chi Minh City
      timeAccuracy: 'EXACT' as const,
    };

    const firstRun = await engine.calculate(input, ASTRO_CONFIG_V1);
    const firstJson = JSON.stringify(firstRun.facts);

    for (let i = 0; i < 10; i++) {
      const subsequentRun = await engine.calculate(input, ASTRO_CONFIG_V1);
      expect(JSON.stringify(subsequentRun.facts)).toBe(firstJson);
    }
  });
});

