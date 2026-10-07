import { describe, it, expect } from 'vitest';
import {
  KnowledgeStore,
  ProvenanceTracer,
} from '../src/index.js';

describe('Knowledge Store & Provenance Tracer (Phase 9)', () => {
  it('retrieves rule by ID and traces 100% full chain to sources and claims', () => {
    const store = KnowledgeStore.getInstance();
    const rule = store.getRule('RUL_TAROT_FOOL_PRESENT');
    expect(rule).toBeDefined();

    const tracer = new ProvenanceTracer(store);
    const trace = tracer.traceRule('RUL_TAROT_FOOL_PRESENT');

    expect(trace).toBeDefined();
    expect(trace?.ruleId).toBe('RUL_TAROT_FOOL_PRESENT');
    expect(trace?.claims.length).toBeGreaterThan(0);
    expect(trace?.claims[0].claimId).toBe('CLM_TAROT_FOOL_001');
    expect(trace?.sources.length).toBeGreaterThan(0);
    expect(trace?.sources[0].sourceId).toBe('SRC_TAROT_WAITE_1911');
    expect(trace?.sources[0].title).toContain('The Pictorial Key');
    expect(trace?.evidenceLevel).toBe('A');
  });

  it('filters rules by domain and school', () => {
    const store = KnowledgeStore.getInstance();
    const tarotRules = store.getRulesByDomain('tarot');
    expect(tarotRules.length).toBeGreaterThanOrEqual(3);

    const tuviRules = store.getRulesBySchool('Nam Phái Toàn Thư');
    expect(tuviRules.length).toBeGreaterThanOrEqual(2);
  });

  it('formats verified human-readable provenance footnote', () => {
    const store = KnowledgeStore.getInstance();
    const tracer = new ProvenanceTracer(store);
    const footnote = tracer.formatFootnote('RUL_ASTRO_SUN_ARIES_H1');

    expect(footnote).toContain('Rule: RUL_ASTRO_SUN_ARIES_H1');
    expect(footnote).toContain('Nguồn: Planets in Signs');
    expect(footnote).toContain('Robert Hand');
  });
});
