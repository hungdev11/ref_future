import { describe, it, expect } from 'vitest';
import { MysticosResultBuilder } from '../src/result-builder.js';
import { QuestionReactiveEngine } from '../src/question-reactive-engine.js';

describe('Question Reactive Verification Suite (Sections 44-49 & 67-70)', () => {
  it('identical Tarot cards with distinct questions produce different focal categories, main stories, and scenario triggers', () => {
    const identicalFacts = [
      { key: 'cardCode', value: 'MAJOR_0', domain: 'tarot', source: 'draw' },
      { key: 'positionIndex', value: 0, domain: 'tarot', source: 'draw' },
      { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
    ];

    const questionCareer = 'Có nên nghỉ việc?';
    const questionLove = 'Tại sao tình cảm bế tắc?';

    // 1. Focal Category Resolution
    const focusCareer = QuestionReactiveEngine.resolveFocus(questionCareer);
    const focusLove = QuestionReactiveEngine.resolveFocus(questionLove);

    expect(focusCareer.category).toBe('career');
    expect(focusLove.category).toBe('love');
    expect(focusCareer.category).not.toEqual(focusLove.category);
    expect(focusCareer.perspective).not.toEqual(focusLove.perspective);
    expect(focusCareer.semanticKeywords).toContain('công việc');
    expect(focusLove.semanticKeywords).toContain('tình cảm');

    // 2. Build Deep Results with identical cards
    const careerResult = MysticosResultBuilder.buildResult({
      domain: 'tarot',
      school: 'Rider-Waite-Smith',
      inputSummary: { question: questionCareer, spread: 'SINGLE' },
      facts: identicalFacts,
    });

    const loveResult = MysticosResultBuilder.buildResult({
      domain: 'tarot',
      school: 'Rider-Waite-Smith',
      inputSummary: { question: questionLove, spread: 'SINGLE' },
      facts: identicalFacts,
    });

    // 3. Main Story Differentiation
    expect(careerResult.mainStory).toBeDefined();
    expect(loveResult.mainStory).toBeDefined();
    expect(careerResult.mainStory.headline).not.toEqual(loveResult.mainStory.headline);
    expect(careerResult.mainStory.headline).toContain('career');
    expect(loveResult.mainStory.headline).toContain('love');

    expect(careerResult.mainStory.narrative).not.toEqual(loveResult.mainStory.narrative);
    expect(careerResult.mainStory.narrative).toContain(focusCareer.perspective);
    expect(loveResult.mainStory.narrative).toContain(focusLove.perspective);

    // 4. Scenario Triggers Differentiation
    expect(careerResult.scenarios.length).toBeGreaterThan(0);
    expect(loveResult.scenarios.length).toBeGreaterThan(0);

    const careerTriggers = careerResult.scenarios.map((s) => s.trigger);
    const loveTriggers = loveResult.scenarios.map((s) => s.trigger);

    expect(careerTriggers).not.toEqual(loveTriggers);
    expect(careerTriggers).toContain('Xuất hiện đề xuất đổi mới hoặc áp lực tái cấu trúc công việc');
    expect(loveTriggers).toContain('Một trong hai bên cảm thấy thiếu được thấu hiểu hoặc bị áp đặt');
    expect(careerTriggers).not.toContain('Một trong hai bên cảm thấy thiếu được thấu hiểu hoặc bị áp đặt');
    expect(loveTriggers).not.toContain('Xuất hiện đề xuất đổi mới hoặc áp lực tái cấu trúc công việc');
  });
});
