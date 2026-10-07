import { DomainType } from './source.js';

export interface ClaimLocation {
  chapter?: string;
  page?: string;
  section?: string;
}

export interface AtomicClaim {
  claimId: string;
  sourceId: string;
  domain: DomainType;
  subject: string;
  predicate: string;
  object: string;
  context?: string;
  polarity?: 'supportive' | 'challenging' | 'neutral' | 'mixed';
  quotation?: string;
  paraphrase: string;
  location?: ClaimLocation;
  sourceConfidence: number;
}
