export type SourceLevel = 'S0' | 'S1' | 'S2' | 'S3' | 'S4';
export type DomainType = 'tarot' | 'tuvi' | 'astrology' | 'numerology' | 'compatibility';

export interface SourceRecord {
  sourceId: string;
  domain: DomainType;
  title: string;
  author?: string;
  publisher?: string;
  edition?: string;
  publicationYear?: number;
  url?: string;
  sourceLevel: SourceLevel;
  tradition?: string;
  school?: string;
  language?: string;
  chapter?: string;
  page?: string;
  accessDate: string;
  notes?: string;
}
