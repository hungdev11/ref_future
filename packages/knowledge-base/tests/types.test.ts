import { describe, it, expect } from 'vitest';
import {
  SourceRecord,
  AtomicClaim,
  InterpretationRule,
  SourceConflict,
} from '../src/types/index.js';

describe('Knowledge Base Core Type Contracts', () => {
  it('validates SourceRecord structure', () => {
    const source: SourceRecord = {
      sourceId: 'SRC_TEST_001',
      domain: 'tarot',
      title: 'The Pictorial Key to the Tarot',
      author: 'Arthur Edward Waite',
      sourceLevel: 'S0',
      accessDate: '2026-10-07',
    };
    expect(source.sourceLevel).toBe('S0');
    expect(source.domain).toBe('tarot');
  });

  it('validates AtomicClaim structure', () => {
    const claim: AtomicClaim = {
      claimId: 'CLM_TEST_001',
      sourceId: 'SRC_TEST_001',
      domain: 'tarot',
      subject: 'The Fool',
      predicate: 'symbolizes',
      object: 'divine_journey_and_spontaneity',
      paraphrase: 'Khai mở hành trình linh hồn với niềm tin thuần khiết.',
      sourceConfidence: 1.0,
    };
    expect(claim.subject).toBe('The Fool');
    expect(claim.sourceConfidence).toBe(1.0);
  });

  it('validates InterpretationRule with evidence level and preconditions', () => {
    const rule: InterpretationRule = {
      ruleId: 'RUL_TEST_001',
      domain: 'tarot',
      school: 'Rider-Waite-Smith',
      sourceIds: ['SRC_TEST_001'],
      claimIds: ['CLM_TEST_001'],
      preconditions: [
        { field: 'cardCode', operator: 'EQUALS', value: 'MAJOR_0' },
      ],
      semanticInputs: ['spontaneity', 'clean_slate'],
      derivedSignals: ['SIG_FREEDOM'],
      priority: 100,
      evidenceLevel: 'A',
      confidence: 'verified',
    };
    expect(rule.evidenceLevel).toBe('A');
    expect(rule.preconditions[0].operator).toBe('EQUALS');
  });

  it('validates SourceConflict structure', () => {
    const conflict: SourceConflict = {
      conflictId: 'CONF_TEST_001',
      topic: 'The Lovers meaning',
      sources: ['SRC_WAITE', 'SRC_MARSEILLE'],
      schoolA: 'Rider-Waite-Smith',
      schoolB: 'Tarot de Marseille',
      claimA: 'Union and moral choice',
      claimB: 'Crossroads and social indecision',
      conflictType: 'different_school',
      resolution: 'school_specific',
    };
    expect(conflict.conflictType).toBe('different_school');
  });
});
