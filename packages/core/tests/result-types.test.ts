import { describe, it, expect } from 'vitest';
import { MysticosResult } from '../src/types/result.js';

describe('Canonical MysticosResult Contract', () => {
  it('validates a complete 17-layer MysticosResult object structure', () => {
    const result: MysticosResult = {
      resultId: 'RES_TEST_001',
      domain: 'tarot',
      inputSummary: { spread: 'SPREAD_3_PPF', cardCount: 3 },
      facts: [{ key: 'card_0', value: 'MAJOR_0_FOOL', domain: 'tarot', source: 'draw' }],
      semantics: [{ id: 'SEM_1', concept: 'pure_potential', keywords: ['khởi đầu'], polarity: 'constructive', weight: 0.9 }],
      signals: [{
        signalId: 'SIG_1',
        type: 'spontaneous_initiative',
        polarity: 'supportive',
        strength: 0.85,
        ruleIds: ['RUL_TAROT_FOOL_PRESENT'],
        claimIds: ['CLM_TAROT_FOOL_001'],
        dimension: 'overview',
      }],
      relationships: [{
        relationshipId: 'REL_1',
        type: 'reinforcement',
        sourceSignalId: 'SIG_1',
        targetSignalId: 'SIG_1',
        description: 'Động lực kích hoạt hành trình',
        intensity: 0.8,
      }],
      patterns: [{
        patternId: 'PAT_1',
        type: 'radical_beginning',
        headline: 'Bước Nhảy Vọt Của Niềm Tin',
        signalIds: ['SIG_1'],
        relationshipIds: ['REL_1'],
        dominance: 0.9,
        contextFit: 0.95,
      }],
      tensions: [],
      interpretations: [{
        interpretationId: 'INT_1',
        dimension: 'overview',
        statementId: 'STMT_1',
        headline: 'Khởi đầu mới không định kiến',
        statement: 'Bạn đang đứng trước cơ hội mở ra trang mới tràn đầy tiềm năng.',
        polarity: 'supportive',
        strength: 0.88,
        confidence: 0.95,
        patternIds: ['PAT_1'],
        signalIds: ['SIG_1'],
        ruleIds: ['RUL_TAROT_FOOL_PRESENT'],
        evidenceIds: ['EVD_1'],
      }],
      implications: [{
        implicationId: 'IMP_1',
        interpretationId: 'INT_1',
        context: 'hành động ngay',
        manifestation: 'Dễ dàng mở rộng hướng đi mới mà không vướng bận lối mòn cũ',
      }],
      guidance: [{
        guidanceId: 'GUI_1',
        implicationId: 'IMP_1',
        actionPriority: 'IMMEDIATE',
        whatToContinue: ['Giữ tâm thái cởi mở học hỏi'],
        whatToAdjustOrStop: ['Không để nỗi sợ thất bại kìm hãm'],
        rationale: 'Thời điểm vàng để bứt phá rào cản tâm lý',
      }],
      evidence: [{
        evidenceId: 'EVD_1',
        ruleId: 'RUL_TAROT_FOOL_PRESENT',
        claimId: 'CLM_TAROT_FOOL_001',
        sourceId: 'SRC_TAROT_WAITE_1911',
        sourceTitle: 'The Pictorial Key to the Tarot',
        citation: 'Arthur Edward Waite (1911), Part II',
        evidenceLevel: 'A',
      }],
      conflicts: [],
      technical: {
        calculationTimeMs: 4,
        rulesEvaluatedCount: 15,
        rulesMatchedCount: 3,
      },
      metadata: {
        engineVersion: '3.0.0',
        knowledgeBaseVersion: '2026.10',
        rulesVersion: '2026.10',
        school: 'Rider-Waite-Smith',
        deterministic: true,
        calculatedAt: '2026-10-07T10:00:00Z',
      },
    };

    expect(result.resultId).toBe('RES_TEST_001');
    expect(result.metadata.deterministic).toBe(true);
    expect(result.evidence[0].evidenceLevel).toBe('A');
  });
});
