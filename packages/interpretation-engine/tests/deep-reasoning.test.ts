import { describe, it, expect } from 'vitest';
import { MysticosResultBuilder } from '../src/result-builder.js';
import { ResultDepthEngine } from '../src/depth-engine.js';
import { QuestionReactiveEngine } from '../src/question-reactive-engine.js';

describe('Advanced Reasoning Engines', () => {
  it('calculates variable depth based on importance score', () => {
    expect(ResultDepthEngine.calculateDepth(0.95, 0.9)).toBe('DEPTH_5');
    expect(ResultDepthEngine.calculateDepth(0.8, 0.7)).toBe('DEPTH_3');
    expect(ResultDepthEngine.calculateDepth(0.4, 0.3)).toBe('DEPTH_1');
  });

  it('modulates question focus into domain context', () => {
    const focus = QuestionReactiveEngine.resolveFocus('Tôi có nên chuyển công tác sang công ty mới không?');
    expect(focus.category).toBe('career');
    expect(focus.semanticKeywords).toContain('công việc');
  });

  it('produces deep result with mainStory and scenarios', () => {
    const result = MysticosResultBuilder.buildResult({
      domain: 'tarot',
      inputSummary: { question: 'Có nên bắt đầu dự án mới?', cardCount: 1 },
      facts: [
        { key: 'cardCode', value: 'MAJOR_0', domain: 'tarot', source: 'draw' },
        { key: 'positionIndex', value: 0, domain: 'tarot', source: 'draw' },
        { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
      ],
      school: 'Rider-Waite-Smith',
    });

    expect(result.mainStory).toBeDefined();
    expect(result.mainStory.headline.length).toBeGreaterThan(10);
    expect(result.scenarios.length).toBeGreaterThan(0);
    expect(result.deepInterpretations.length).toBeGreaterThan(0);
    expect(result.nextQuestions?.length).toBeGreaterThan(0);
  });
});
