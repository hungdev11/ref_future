export enum TarotArcana {
  MAJOR = 'MAJOR',
  MINOR = 'MINOR',
}

export enum TarotSuit {
  WANDS = 'WANDS',
  CUPS = 'CUPS',
  SWORDS = 'SWORDS',
  PENTACLES = 'PENTACLES',
}

export interface TarotCardDef {
  cardCode: string;
  name: string;
  arcana: TarotArcana;
  suit?: TarotSuit;
  number: number;
  keywords: string[];
}

export interface TarotPositionResult {
  positionIndex: number;
  positionName: string;
  card: TarotCardDef;
  isReversed: boolean;
}

export interface TarotFacts {
  deckCode: string;
  spreadCode: string;
  seed: string;
  draws: TarotPositionResult[];
}
