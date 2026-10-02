import { describe, it, expect } from 'vitest';
import { TarotArcana, TarotSuit } from '@mystic/core';
import {
  RiderWaiteTarotEngine,
  buildRWSStandardDeck,
  TAROT_CONFIG_V1,
} from '../src/index.js';

describe('RWS Tarot Deck Validation', () => {
  it('builds exactly 78 cards with 22 Major Arcana and 56 Minor Arcana', () => {
    const deck = buildRWSStandardDeck();
    expect(deck).toHaveLength(78);

    const major = deck.filter((c) => c.arcana === TarotArcana.MAJOR);
    expect(major).toHaveLength(22);

    const minor = deck.filter((c) => c.arcana === TarotArcana.MINOR);
    expect(minor).toHaveLength(56);

    for (const suit of [TarotSuit.WANDS, TarotSuit.CUPS, TarotSuit.SWORDS, TarotSuit.PENTACLES]) {
      const suitCards = deck.filter((c) => c.suit === suit);
      expect(suitCards).toHaveLength(14);
    }
  });
});

describe('RiderWaiteTarotEngine', () => {
  const engine = new RiderWaiteTarotEngine();

  it('draws correct number of cards for SPREAD_3_PPF with position names', async () => {
    const result = await engine.calculate({
      spreadCode: 'SPREAD_3_PPF',
      seed: 'seed_sample_fixed_98765',
    });

    expect(result.facts.draws).toHaveLength(3);
    expect(result.facts.draws[0]!.positionName).toBe('Quá Khứ');
    expect(result.facts.draws[1]!.positionName).toBe('Hiện Tại');
    expect(result.facts.draws[2]!.positionName).toBe('Xu Hướng Tương Lai');

    expect(result.dotNotatedFacts['tarot.spread.code']).toBe('SPREAD_3_PPF');
    expect(result.dotNotatedFacts['tarot.spread.position_1.card']).toBeDefined();
    expect(result.dotNotatedFacts['tarot.spread.position_1.is_reversed']).toBeDefined();
  });

  it('is 100% deterministic and replayable given the identical seed', async () => {
    const input = {
      spreadCode: 'SPREAD_10_CELTIC_CROSS',
      seed: 'deterministic_audit_seed_42',
    };

    const firstRun = await engine.calculate(input, TAROT_CONFIG_V1);
    const firstJson = JSON.stringify(firstRun.facts);

    for (let i = 0; i < 10; i++) {
      const subsequentRun = await engine.calculate(input, TAROT_CONFIG_V1);
      expect(JSON.stringify(subsequentRun.facts)).toBe(firstJson);
    }
  });
});

