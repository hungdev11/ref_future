import { describe, it, expect } from 'vitest';
import { ReadingDomain } from '@mystic/core';
import { ReadingResultComposer } from '../src/index.js';

describe('ReadingResultComposer', () => {
  it('composes a structured reading with sections strictly ordered by domain', () => {
    const facts = {
      'astrology.planets.sun.sign': 'LEO',
      'astrology.planets.sun.degree': 14.5,
    };

    const reading = ReadingResultComposer.compose({
      readingType: 'NATAL_ASTROLOGY',
      dotNotatedFacts: facts,
      inputSnapshot: { birthDate: '1990-08-07' },
    });

    expect(reading.sections.length).toBeGreaterThan(0);

    // Verify sections have domain order
    const domains = reading.sections.map((s) => s.domain);
    expect(domains[0]).toBe(ReadingDomain.OVERVIEW);

    // Verify rendered text comes from template and rule matches
    expect(reading.sections[0]!.title).toContain('Mặt Trời tại Sư Tử');
    expect(reading.sections[0]!.sourceRuleCode).toBe('ASTRO-SUN-LEO-001');

    // Verify ruleTraces present
    const matchedTrace = reading.ruleTraces.find((t) => t.ruleCode === 'ASTRO-SUN-LEO-001');
    expect(matchedTrace).toBeDefined();
    expect(matchedTrace!.status).toBe('MATCHED');
  });

  it('triggers cross-system synthesis when combined Astro + Numerology facts match', () => {
    const facts = {
      'astrology.planets.moon.sign': 'PISCES',
      'numerology.core.life_path.value': 7,
    };

    const reading = ReadingResultComposer.compose({
      readingType: 'CROSS_SYNTHESIS',
      dotNotatedFacts: facts,
      inputSnapshot: { moon: 'PISCES', lifePath: 7 },
    });

    const synthesisSection = reading.sections.find(
      (s) => s.sourceRuleCode === 'CROSS-MOON-PISCES-LP7-001'
    );
    expect(synthesisSection).toBeDefined();
    expect(synthesisSection!.renderedText).toContain('Mặt Trăng Song Ngư');
    expect(synthesisSection!.renderedText).toContain('Con số Chủ đạo 7');
  });

  it('is 100% deterministic over successive compositions', () => {
    const facts = {
      'astrology.planets.sun.sign': 'CAPRICORN',
      'numerology.core.life_path.value': 11,
      'tuvi.palaces.menh.has_tu_vi': true,
      'tuvi.palaces.menh.has_hoa_loc': true,
    };

    const run1 = ReadingResultComposer.compose({
      readingType: 'COMPREHENSIVE_READING',
      dotNotatedFacts: facts,
      inputSnapshot: { sample: 1 },
    });

    const run2 = ReadingResultComposer.compose({
      readingType: 'COMPREHENSIVE_READING',
      dotNotatedFacts: facts,
      inputSnapshot: { sample: 1 },
    });

    expect(run1.sections.map((s) => s.renderedText)).toEqual(
      run2.sections.map((s) => s.renderedText)
    );
  });
});
