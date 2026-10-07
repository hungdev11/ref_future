import { describe, it, expect } from 'vitest';
import type {
  DeepMysticosResult,
  ResultDepth,
  MainStory,
  Scenario,
  DeepInterpretation,
  NextSuggestedQuestion,
} from '../src/types/result.js';
import type { DeepMysticosResult as DeepFromIndex } from '../src/index.js';
import type { DeepMysticosResult as DeepFromTypes } from '../src/types/index.js';

describe('DeepMysticosResult Contract', () => {
  it('validates DeepMysticosResult with mainStory, scenarios, depth and next questions', () => {
    const depth: ResultDepth = 'DEPTH_4';
    const mainStory: MainStory = {
      headline: 'Quyết định chuyển hướng được thôi thúc bởi khát vọng tự do',
      narrative: 'Trải bài cho thấy bạn không chỉ đổi việc, mà đang tìm kiếm phương thức thể hiện bản thân chân thực hơn.',
      centralTension: 'Khát khao mở đường đối đầu với sự e ngại chưa rõ ràng',
    };
    const scenarios: Scenario[] = [{
      scenarioId: 'SCEN_1',
      title: 'Khi đối diện rủi ro bước ngoặt',
      trigger: 'Thay đổi môi trường làm việc',
      patternIds: ['PAT_1'],
      likelyDynamic: 'Hào hứng ban đầu nhưng có thể dao động nếu thiếu kỷ luật',
      constructiveResponse: 'Chia nhỏ lộ trình chuyển giao từng bước',
      evidenceIds: ['EVD_1'],
    }];
    const deepInterpretations: DeepInterpretation[] = [{
      interpretationId: 'INT_1',
      dimension: 'career',
      statementId: 'STMT_1',
      headline: 'Thời điểm chuyển hướng',
      statement: 'Bạn đang đứng trước cơ hội khởi sắc mới.',
      polarity: 'supportive',
      strength: 0.9,
      confidence: 0.95,
      patternIds: ['PAT_1'],
      signalIds: ['SIG_1'],
      ruleIds: ['RUL_1'],
      evidenceIds: ['EVD_1'],
      depth,
      explanation: 'Khí chất The Fool giải phóng bạn khỏi lối mòn.',
      constructiveExpression: 'Dũng cảm bắt đầu',
      tension: 'Rủi ro thiếu chuẩn bị',
      contextFitScore: 0.95,
    }];
    const nextQuestions: NextSuggestedQuestion[] = [{
      question: 'Điều gì đang vô thức kìm hãm tôi hành động dứt khoát?',
      context: 'Đào sâu vào rào cản tâm lý',
      targetDomain: 'tarot',
    }];

    const result: DeepMysticosResult = {
      resultId: 'RES_DEEP_001',
      domain: 'tarot',
      inputSummary: { question: 'Có nên chuyển hướng nghề nghiệp?' },
      facts: [{ key: 'cardCode', value: 'MAJOR_0', domain: 'tarot', source: 'draw' }],
      semantics: [],
      signals: [{
        signalId: 'SIG_1',
        type: 'spontaneous_initiative',
        polarity: 'supportive',
        strength: 0.9,
        ruleIds: ['RUL_1'],
        claimIds: ['CLM_1'],
        dimension: 'career',
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
      primaryPatterns: [{
        patternId: 'PAT_1',
        type: 'radical_beginning',
        headline: 'Bước Nhảy Vọt Của Niềm Tin',
        signalIds: ['SIG_1'],
        relationshipIds: [],
        dominance: 0.9,
        contextFit: 0.95,
      }],
      secondaryPatterns: [],
      tensions: [],
      interpretations: [{
        interpretationId: 'INT_1',
        dimension: 'career',
        statementId: 'STMT_1',
        headline: 'Thời điểm chuyển hướng',
        statement: 'Bạn đang đứng trước cơ hội khởi sắc mới.',
        polarity: 'supportive',
        strength: 0.9,
        confidence: 0.95,
        patternIds: ['PAT_1'],
        signalIds: ['SIG_1'],
        ruleIds: ['RUL_1'],
        evidenceIds: ['EVD_1'],
      }],
      deepInterpretations,
      mainStory,
      scenarios,
      implications: [],
      guidance: [],
      evidence: [],
      conflicts: [],
      nextQuestions,
      technical: { calculationTimeMs: 2, rulesEvaluatedCount: 1, rulesMatchedCount: 1 },
      metadata: { engineVersion: '3.1.0', knowledgeBaseVersion: '2026.10', rulesVersion: '2026.10', school: 'RWS', deterministic: true, calculatedAt: '2026-10-07' },
    };

    const _fromIndex: DeepFromIndex = result;
    const _fromTypes: DeepFromTypes = _fromIndex;

    expect(_fromTypes.mainStory.headline).toContain('chuyển hướng');
    expect(result.deepInterpretations[0].depth).toBe('DEPTH_4');
    expect(result.scenarios[0].title).toContain('Khi đối diện rủi ro');
    expect(result.nextQuestions?.[0].question).toBeDefined();
  });
});
