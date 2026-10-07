import { describe, it, expect } from 'vitest';
import { ALL_CLAIMS } from '../src/claims/index.js';
import { ALL_SOURCES } from '../src/sources/index.js';

describe('Atomic Claims Extraction (Phase 3)', () => {
  it('ensures every claim links to a valid registered Source ID', () => {
    const validSourceIds = new Set(ALL_SOURCES.map((s) => s.sourceId));
    expect(ALL_CLAIMS.length).toBeGreaterThanOrEqual(20);

    for (const claim of ALL_CLAIMS) {
      expect(validSourceIds.has(claim.sourceId)).toBe(true);
      expect(claim.claimId).toMatch(/^CLM_[A-Z0-9_]+$/);
      expect(claim.subject.length).toBeGreaterThan(0);
      expect(claim.predicate.length).toBeGreaterThan(0);
      expect(claim.object.length).toBeGreaterThan(0);
      expect(claim.paraphrase.length).toBeGreaterThan(0);
      expect(claim.sourceConfidence).toBeGreaterThanOrEqual(0.7);
    }
  });

  it('verifies claims have precise structural grammar and location', () => {
    for (const claim of ALL_CLAIMS) {
      expect(claim.location).toBeDefined();
      expect(claim.location?.chapter || claim.location?.page).toBeDefined();
    }
  });

  it('contains claims for key anchor entities across all 4 domains', () => {
    const domains = new Set(ALL_CLAIMS.map((c) => c.domain));
    expect(domains.has('tarot')).toBe(true);
    expect(domains.has('tuvi')).toBe(true);
    expect(domains.has('astrology')).toBe(true);
    expect(domains.has('numerology')).toBe(true);
  });
});
