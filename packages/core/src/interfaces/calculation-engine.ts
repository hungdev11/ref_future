export interface EngineMetadata {
  discipline: 'ASTROLOGY' | 'TUVI' | 'NUMEROLOGY' | 'TAROT';
  version: string;
  description: string;
}

export interface CalculationResult<TFacts, TMetadata = Record<string, unknown>> {
  discipline: string;
  engineVersion: string;
  configVersion: string;
  inputHash: string;
  calculatedAt: string;
  isDegraded: boolean;
  degradationReasons: string[];
  facts: TFacts;
  dotNotatedFacts: Record<string, string | number | boolean | null>;
  metadata: TMetadata;
}

export interface ICalculationEngine<TInput, TConfig, TFacts, TMetadata = Record<string, unknown>> {
  readonly metadata: EngineMetadata;
  hashInput(input: TInput, config: TConfig): string;
  validateInput(input: TInput): { valid: boolean; errors: string[] };
  calculate(input: TInput, config: TConfig): Promise<CalculationResult<TFacts, TMetadata>>;
}
