import { describe, it, expect } from 'vitest';
import { adaptToUserFacingResult } from '../lib/result-adapter.js';
import type { MysticosResult } from '@mystic/core';

describe('Result Adapter (Editorial Judgment)', () => {
  const sampleResult: MysticosResult = {
    resultId: 'RES_TAROT_123',
    domain: 'tarot',
    inputSummary: { spread: '3_cards' },
    facts: [{ key: 'card_0', value: 'The Fool', domain: 'tarot', source: 'draw' }],
    semantics: [],
    signals: [{
      signalId: 'SIG_1',
      type: 'spontaneous_initiative',
      polarity: 'supportive',
      strength: 0.85,
      ruleIds: ['RUL_1'],
      claimIds: ['CLM_1'],
      dimension: 'overview',
    }],
    relationships: [],
    patterns: [{
      patternId: 'PAT_1',
      type: 'radical_beginning',
      headline: 'Bước Nhảy Vọt Của Niềm Tin',
      signalIds: ['SIG_1'],
      relationshipIds: [],
      dominance: 0.9,
      contextFit: 0.95,
    }],
    tensions: [{
      traitA: 'Khát khao tự do',
      traitB: 'Nhu cầu an toàn',
      dynamics: 'Giằng co giữa dấn thân và do dự',
      resolution: 'Thiết lập giới hạn rủi ro trước khi bắt đầu',
    }],
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
      ruleIds: ['RUL_1'],
      evidenceIds: ['EVD_1'],
    }],
    implications: [{
      implicationId: 'IMP_1',
      interpretationId: 'INT_1',
      context: 'công việc',
      manifestation: 'Dễ dàng nắm bắt dự án mới mà không bị giới hạn bởi kinh nghiệm cũ.',
    }],
    guidance: [{
      guidanceId: 'GUI_1',
      implicationId: 'IMP_1',
      actionPriority: 'IMMEDIATE',
      whatToContinue: ['Giữ tâm thái cởi mở học hỏi'],
      whatToAdjustOrStop: ['Không để nỗi sợ thất bại kìm hãm'],
      rationale: 'Thời điểm thuận lợi để bứt phá rào cản.',
    }],
    evidence: [{
      evidenceId: 'EVD_1',
      ruleId: 'RUL_1',
      claimId: 'CLM_1',
      sourceId: 'SRC_1',
      sourceTitle: 'The Pictorial Key',
      citation: 'Arthur Edward Waite (1911)',
      evidenceLevel: 'A',
    }],
    conflicts: [],
    technical: { calculationTimeMs: 4, rulesEvaluatedCount: 15, rulesMatchedCount: 3 },
    metadata: {
      engineVersion: '3.0.0',
      knowledgeBaseVersion: '2026.10',
      rulesVersion: '2026.10',
      school: 'Rider-Waite-Smith',
      deterministic: true,
      calculatedAt: '2026-10-07T12:00:00Z',
    },
  };

  it('transforms MysticosResult into an editorial UserFacingResult', () => {
    const adapted = adaptToUserFacingResult(sampleResult);
    expect(adapted.domainTitle).toContain('Tarot');
    expect(adapted.headline).toBe('Khởi đầu mới không định kiến');
    expect(adapted.summary).toBe('Bạn đang đứng trước cơ hội mở ra trang mới tràn đầy tiềm năng.');
    expect(adapted.keyThemes.length).toBeLessThanOrEqual(3);
    expect(adapted.keyThemes[0].title).toBe('Bước Nhảy Vọt Của Niềm Tin');
    expect(adapted.keyThemes[0].description).toBe('Bạn đang đứng trước cơ hội mở ra trang mới tràn đầy tiềm năng.');
    expect(adapted.manifestations[0].detail).toContain('Dễ dàng nắm bắt dự án mới');
    expect(adapted.tensions[0].dynamic).toContain('Giằng co');
    expect(adapted.guidance[0].continueItems).toContain('Giữ tâm thái cởi mở học hỏi');
  });
});
