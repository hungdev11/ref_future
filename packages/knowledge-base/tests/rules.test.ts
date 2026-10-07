import { describe, it, expect } from 'vitest';
import { ALL_RULES, COMPATIBILITY_RULES } from '../src/rules/index.js';
import { ALL_SOURCES } from '../src/sources/index.js';
import { ALL_CLAIMS } from '../src/claims/index.js';

describe('Interpretation Rules & Provenance Links (Phase 5 & 6)', () => {
  const validSourceIds = new Set(ALL_SOURCES.map((s) => s.sourceId));
  const validClaimIds = new Set(ALL_CLAIMS.map((c) => c.claimId));

  it('validates 100% provenance traceability from Rules to Claims and Sources', () => {
    expect(ALL_RULES.length).toBeGreaterThanOrEqual(15);

    for (const rule of ALL_RULES) {
      expect(rule.ruleId).toMatch(/^RUL_[A-Z0-9_]+$/);
      expect(rule.sourceIds.length).toBeGreaterThan(0);
      expect(rule.claimIds.length).toBeGreaterThan(0);

      // Verify every referenced source exists
      for (const sId of rule.sourceIds) {
        expect(validSourceIds.has(sId)).toBe(true);
      }

      // Verify every referenced claim exists
      for (const cId of rule.claimIds) {
        expect(validClaimIds.has(cId)).toBe(true);
      }

      // Preconditions must never be empty (anti-generic rule design)
      expect(rule.preconditions.length).toBeGreaterThan(0);
      expect(rule.derivedSignals.length).toBeGreaterThan(0);
      expect(['A', 'B', 'C', 'D', 'E', 'F']).toContain(rule.evidenceLevel);
    }
  });

  it('ensures compatibility rules are strictly multi-system derived (Evidence E)', () => {
    expect(COMPATIBILITY_RULES.length).toBeGreaterThanOrEqual(3);
    for (const rule of COMPATIBILITY_RULES) {
      expect(rule.domain).toBe('compatibility');
      expect(rule.evidenceLevel).toBe('E');
      expect(rule.notes).toContain('Mysticos-derived');
    }
  });
});
