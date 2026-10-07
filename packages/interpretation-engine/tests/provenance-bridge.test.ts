import { describe, it, expect } from 'vitest';
import { RuleDefinition } from '@mystic/core';
import { KnowledgeStore, ProvenanceTracer } from '@mystic/knowledge-base';
import { BASELINE_RULES, KNOWLEDGE_CATALOG } from '../src/catalog.js';
import { EvidenceEngine } from '../src/evidence-engine.js';

describe('Interpretation Engine & Knowledge Base Provenance Bridge', () => {
  it('bridges catalog interpretations to registered authoritative sources', () => {
    const store = KnowledgeStore.getInstance();
    const tracer = new ProvenanceTracer(store);

    // Verify sun aries rule in interpretation engine traces to knowledge-base
    const astroSource = store.getSource('SRC_ASTRO_HAND_1976');
    expect(astroSource).toBeDefined();

    const footnote = tracer.formatFootnote('RUL_ASTRO_SUN_ARIES_H1');
    expect(footnote).toContain('Planets in Signs');
  });

  it('extracts evidence items preserving authentic provenance links', () => {
    const evidence = EvidenceEngine.extractEvidence(
      [BASELINE_RULES[0]],
      KNOWLEDGE_CATALOG,
      {}
    );
    expect(evidence.length).toBeGreaterThan(0);
    expect(evidence[0].sourceRuleCode).toBe(BASELINE_RULES[0].ruleCode);
    expect(evidence[0].confidence).toBeGreaterThan(0.8);
  });

  it('attaches traceable provenance footnote to evidence items', () => {
    const sampleRule: RuleDefinition = {
      ...BASELINE_RULES[0],
      ruleCode: 'RUL_ASTRO_SUN_ARIES_H1',
    };
    const evidence = EvidenceEngine.extractEvidence([sampleRule], KNOWLEDGE_CATALOG, {});
    expect(evidence.length).toBeGreaterThan(0);
    expect(evidence[0].provenanceFootnote).toBeDefined();
    expect(evidence[0].provenanceFootnote).toContain('Planets in Signs');
    expect(evidence[0].provenanceFootnote).toContain('Robert Hand');
  });
});
