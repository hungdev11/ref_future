import { describe, it, expect } from 'vitest';
import {
  runProvenanceAudit,
  runAntiGenericAudit,
  runGoldenSuite,
  generateMasterAuditReport,
} from '../src/validators/index.js';

describe('Audit Validators & Golden Test Suite (Phases 6, 10 & Section 42)', () => {
  it('passes 100% provenance audit with zero orphan rules or claims', () => {
    const report = runProvenanceAudit();
    expect(report.totalRules).toBeGreaterThan(0);
    expect(report.orphanRulesCount).toBe(0);
    expect(report.missingSourcesCount).toBe(0);
    expect(report.passRate).toBe(1.0);
  });

  it('passes anti-generic audit with collision rate <= 15% and zero platitudes', () => {
    const audit = runAntiGenericAudit();
    expect(audit.collisionRate).toBeLessThanOrEqual(0.15);
    expect(audit.detectedPlatitudesCount).toBe(0);
    expect(audit.isPassed).toBe(true);
  });

  it('runs golden test suite across 50 cases per domain with zero degradation', () => {
    const golden = runGoldenSuite();
    expect(golden.totalCasesRan).toBeGreaterThanOrEqual(50);
    expect(golden.passedCases).toBe(golden.totalCasesRan);
    expect(golden.failedCases).toBe(0);
  });

  it('generates compliant master report with top 20 rankings according to prompt/source.md', () => {
    const summary = generateMasterAuditReport();
    expect(summary).toContain('MASTER AUDIT REPORT — MYSTICOS KNOWLEDGE BASE');
    expect(summary).toContain('TOP 20 MOST IMPORTANT RULES');
    expect(summary).toContain('TOP 20 CONFLICTS');
    expect(summary).toContain('TOP 20 MISSING KNOWLEDGE AREAS');
  });
});
