import * as crypto from 'crypto';
import {
  ICalculationEngine,
  EngineMetadata,
  CalculationResult,
  TarotFacts,
  TarotPositionResult,
  Mulberry32,
} from '@mystic/core';
import { buildRWSStandardDeck } from './deck.js';
import { STANDARD_SPREADS, SpreadDefinition } from './spreads.js';

export interface TarotConfig {
  configVersion: string;
  deckCode: string;
  allowReversals: boolean;
  reversalProbability: number;
}

export const TAROT_CONFIG_V1: TarotConfig = {
  configVersion: 'TAROT_CONFIG_V1',
  deckCode: 'RWS_STANDARD',
  allowReversals: true,
  reversalProbability: 0.35,
};

export interface TarotInput {
  spreadCode: string;
  seed?: string;
  userId?: string;
  clientNonce?: string;
  timestamp?: string; // ISO string
}

export class RiderWaiteTarotEngine
  implements ICalculationEngine<TarotInput, TarotConfig, TarotFacts>
{
  public readonly metadata: EngineMetadata = {
    discipline: 'TAROT',
    version: '1.0.0',
    description: 'Deterministic 78-card Rider-Waite-Smith Tarot Engine with Mulberry32 Seeded PRNG',
  };

  public validateInput(input: TarotInput): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!input.spreadCode || !STANDARD_SPREADS[input.spreadCode]) {
      errors.push(`Invalid spreadCode '${input.spreadCode}'. Supported: ${Object.keys(STANDARD_SPREADS).join(', ')}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  public hashInput(input: TarotInput, config: TarotConfig): string {
    const payload = JSON.stringify({
      discipline: this.metadata.discipline,
      engineVersion: this.metadata.version,
      configVersion: config.configVersion,
      spreadCode: input.spreadCode,
      seed: input.seed,
    });
    return crypto.createHash('sha256').update(payload).digest('hex');
  }

  public async calculate(
    input: TarotInput,
    config: TarotConfig = TAROT_CONFIG_V1
  ): Promise<CalculationResult<TarotFacts>> {
    const validation = this.validateInput(input);
    if (!validation.valid) {
      throw new Error(`Validation Error: ${validation.errors.join(', ')}`);
    }

    const spread: SpreadDefinition = STANDARD_SPREADS[input.spreadCode]!;

    // 1. Establish deterministic seed
    let seed = input.seed;
    if (!seed) {
      const entropy = `${input.userId ?? 'anon'}:${input.timestamp ?? new Date().toISOString()}:${input.clientNonce ?? '0'}:${input.spreadCode}`;
      seed = crypto.createHash('sha256').update(entropy).digest('hex');
    }

    // 2. Initialize Seeded PRNG and standard 78-card deck
    const prng = new Mulberry32(seed);
    const fullDeck = buildRWSStandardDeck();

    // 3. Deterministic Fisher-Yates shuffle
    const shuffledDeck = prng.shuffle(fullDeck);

    // 4. Assign cards to spread positions
    const draws: TarotPositionResult[] = [];
    for (let i = 0; i < spread.cardCount; i++) {
      const card = shuffledDeck[i]!;
      const posDef = spread.positions[i]!;

      const isReversed = config.allowReversals
        ? prng.nextFloat() < config.reversalProbability
        : false;

      draws.push({
        positionIndex: posDef.index,
        positionName: posDef.name,
        card,
        isReversed,
      });
    }

    const facts: TarotFacts = {
      deckCode: config.deckCode,
      spreadCode: spread.code,
      seed,
      draws,
    };

    // 5. Flatten to dot-notated facts for Rule Engine
    const dotNotatedFacts: Record<string, string | number | boolean | null> = {
      'tarot.deck.code': config.deckCode,
      'tarot.spread.code': spread.code,
      'tarot.seed': seed,
    };

    for (const draw of draws) {
      const prefix = `tarot.spread.position_${draw.positionIndex}`;
      dotNotatedFacts[`${prefix}.card`] = draw.card.cardCode;
      dotNotatedFacts[`${prefix}.card_number`] = draw.card.number;
      dotNotatedFacts[`${prefix}.is_reversed`] = draw.isReversed;
      dotNotatedFacts[`${prefix}.name`] = draw.positionName;
    }

    const inputHash = this.hashInput({ ...input, seed }, config);

    return {
      discipline: this.metadata.discipline,
      engineVersion: this.metadata.version,
      configVersion: config.configVersion,
      inputHash,
      calculatedAt: new Date().toISOString(),
      isDegraded: false,
      degradationReasons: [],
      facts,
      dotNotatedFacts,
      metadata: {
        totalDeckCards: fullDeck.length,
        drawnCardsCount: draws.length,
        spreadName: spread.name,
        shuffleAlgorithm: 'FISHER_YATES_MULBERRY32',
      },
    };
  }
}
