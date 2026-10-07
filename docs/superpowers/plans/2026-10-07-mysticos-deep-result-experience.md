# Mysticos Deep Result Experience & Domain Grammar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Mysticos result generation and presentation into a deep, personalized, domain-specific experience powered by `ResultDepthEngine`, `MainStoryEngine`, `QuestionReactiveEngine`, `ScenarioEngine`, and dedicated domain result views.

**Architecture:** `@mystic/core` defines `DeepMysticosResult` contracts. `@mystic/interpretation-engine` implements depth calculation (DEPTH 1–5), non-hardcoded main story synthesis, question-reactive semantic weighting, and real-life scenario generation. `apps/web/components/domain-results/` provides 5 distinct result grammars (`TarotResultView`, `NumerologyResultView`, `AstrologyResultView`, `TuViResultView`, `CompatibilityResultView`) built on shared editorial UI primitives (`InsightBlock`, `PatternStory`, `ScenarioBlock`, `TensionBlock`, `NextQuestionBlock`).

**Tech Stack:** TypeScript 5.6, Node.js (ESM), Vitest, React 18, Next.js 14, Tailwind CSS.

## Global Constraints

- **No uniform result length**: Important patterns get deep treatment (DEPTH 4/5); secondary points remain concise (DEPTH 1/2).
- **Domain-specific result grammars**: Never force identical UI structures across Tarot, Astrology, Tử Vi, Numerology, and Compatibility.
- **100% deterministic & traceable**: Zero generative AI in reasoning. Every interpretation must trace back to Pattern -> Signal -> Rule -> Claim -> Source.
- **Question reactivity**: In Tarot and inquiry modules, the user's question must actively modulate semantic weighting and narrative focus.
- **Editorial design system**: Strict adherence to `#111110` background, `#161614` surface, `#EDEAE2` text, `#BFA15F` gold accent, Lora / Be Vietnam Pro / JetBrains Mono typography, 0px border radius.

---

### Task 1: Core Type Expansion (`DeepMysticosResult`) in `@mystic/core`

**Files:**
- Modify: `packages/core/src/types/result.ts`
- Test: `packages/core/tests/deep-result-types.test.ts`

**Interfaces:**
- Produces: `ResultDepth`, `MainStory`, `Scenario`, `DeepInterpretation`, `NextSuggestedQuestion`, `DeepMysticosResult`.

- [ ] **Step 1: Write failing test for DeepMysticosResult contract**

Create `packages/core/tests/deep-result-types.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import type { DeepMysticosResult, ResultDepth } from '../src/types/result.js';

describe('DeepMysticosResult Contract', () => {
  it('validates DeepMysticosResult with mainStory, scenarios, depth and next questions', () => {
    const depth: ResultDepth = 'DEPTH_4';
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
      deepInterpretations: [{
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
        depth: 'DEPTH_4',
        explanation: 'Khí chất The Fool giải phóng bạn khỏi lối mòn.',
        constructiveExpression: 'Dũng cảm bắt đầu',
        tension: 'Rủi ro thiếu chuẩn bị',
        contextFitScore: 0.95,
      }],
      mainStory: {
        headline: 'Quyết định chuyển hướng được thôi thúc bởi khát vọng tự do',
        narrative: 'Trải bài cho thấy bạn không chỉ đổi việc, mà đang tìm kiếm phương thức thể hiện bản thân chân thực hơn.',
        centralTension: 'Khát khao mở đường đối đầu với sự e ngại chưa rõ ràng',
      },
      scenarios: [{
        scenarioId: 'SCEN_1',
        title: 'Khi đối diện rủi ro bước ngoặt',
        trigger: 'Thay đổi môi trường làm việc',
        patternIds: ['PAT_1'],
        likelyDynamic: 'Hào hứng ban đầu nhưng có thể dao động nếu thiếu kỷ luật',
        constructiveResponse: 'Chia nhỏ lộ trình chuyển giao từng bước',
        evidenceIds: ['EVD_1'],
      }],
      implications: [],
      guidance: [],
      evidence: [],
      conflicts: [],
      nextQuestions: [{
        question: 'Điều gì đang vô thức kìm hãm tôi hành động dứt khoát?',
        context: 'Đào sâu vào rào cản tâm lý',
        targetDomain: 'tarot',
      }],
      technical: { calculationTimeMs: 2, rulesEvaluatedCount: 1, rulesMatchedCount: 1 },
      metadata: { engineVersion: '3.1.0', knowledgeBaseVersion: '2026.10', rulesVersion: '2026.10', school: 'RWS', deterministic: true, calculatedAt: '2026-10-07' },
    };

    expect(result.mainStory.headline).toContain('chuyển hướng');
    expect(result.deepInterpretations[0].depth).toBe('DEPTH_4');
    expect(result.scenarios[0].title).toContain('Khi đối diện rủi ro');
    expect(result.nextQuestions?.[0].question).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run packages/core/tests/deep-result-types.test.ts`
Expected: FAIL (Type error or missing exports)

- [ ] **Step 3: Update `packages/core/src/types/result.ts`**

Append to `packages/core/src/types/result.ts`:
```ts
export type ResultDepth = 'DEPTH_1' | 'DEPTH_2' | 'DEPTH_3' | 'DEPTH_4' | 'DEPTH_5';

export interface MainStory {
  headline: string;
  narrative: string;
  centralTension?: string;
  focalEntity?: string;
}

export interface Scenario {
  scenarioId: string;
  title: string;
  trigger: string;
  patternIds: string[];
  likelyDynamic: string;
  tension?: string;
  constructiveResponse: string;
  evidenceIds: string[];
}

export interface DeepInterpretation extends Interpretation {
  depth: ResultDepth;
  explanation: string;
  constructiveExpression?: string;
  tension?: string;
  contextFitScore: number;
}

export interface NextSuggestedQuestion {
  question: string;
  context: string;
  targetDomain: string;
}

export interface DeepMysticosResult extends MysticosResult {
  mainStory: MainStory;
  primaryPatterns: Pattern[];
  secondaryPatterns: Pattern[];
  scenarios: Scenario[];
  deepInterpretations: DeepInterpretation[];
  nextQuestions?: NextSuggestedQuestion[];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run packages/core/tests/deep-result-types.test.ts && npm run --workspace=@mystic/core build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/types/result.ts packages/core/tests/deep-result-types.test.ts
git commit -m "feat(core): extend canonical contract with DeepMysticosResult"
```

---

### Task 2: Advanced Reasoning Engines in `@mystic/interpretation-engine`

**Files:**
- Create: `packages/interpretation-engine/src/depth-engine.ts`
- Create: `packages/interpretation-engine/src/main-story-engine.ts`
- Create: `packages/interpretation-engine/src/question-reactive-engine.ts`
- Create: `packages/interpretation-engine/src/scenario-engine.ts`
- Modify: `packages/interpretation-engine/src/result-builder.ts`
- Modify: `packages/interpretation-engine/src/index.ts`
- Test: `packages/interpretation-engine/tests/deep-reasoning.test.ts`

**Interfaces:**
- Produces: `ResultDepthEngine`, `MainStoryEngine`, `QuestionReactiveEngine`, `ScenarioEngine`.
- Upgrades: `MysticosResultBuilder.buildResult(params)` to return a valid `DeepMysticosResult`.

- [ ] **Step 1: Write failing test for advanced reasoning engines**

Create `packages/interpretation-engine/tests/deep-reasoning.test.ts`:
```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run packages/interpretation-engine/tests/deep-reasoning.test.ts`
Expected: FAIL (Cannot find modules)

- [ ] **Step 3: Implement `packages/interpretation-engine/src/depth-engine.ts`**

Create `packages/interpretation-engine/src/depth-engine.ts`:
```ts
import { ResultDepth } from '@mystic/core';

export class ResultDepthEngine {
  public static calculateDepth(importance: number, contextFit: number): ResultDepth {
    const score = importance * 0.6 + contextFit * 0.4;
    if (score >= 0.88) return 'DEPTH_5';
    if (score >= 0.75) return 'DEPTH_4';
    if (score >= 0.60) return 'DEPTH_3';
    if (score >= 0.45) return 'DEPTH_2';
    return 'DEPTH_1';
  }
}
```

- [ ] **Step 4: Implement `packages/interpretation-engine/src/question-reactive-engine.ts`**

Create `packages/interpretation-engine/src/question-reactive-engine.ts`:
```ts
export interface QuestionFocus {
  category: 'career' | 'love' | 'finance' | 'growth' | 'general';
  semanticKeywords: string[];
  perspective: string;
}

export class QuestionReactiveEngine {
  public static resolveFocus(question?: string): QuestionFocus {
    if (!question || question.trim().length === 0) {
      return {
        category: 'general',
        semanticKeywords: ['tổng quan', 'vận trình', 'tiềm năng'],
        perspective: 'Định hướng tổng quát và nhận diện xu hướng vận động chính.',
      };
    }

    const q = question.toLowerCase();
    if (q.includes('việc') || q.includes('công tác') || q.includes('nghề') || q.includes('dự án') || q.includes('kinh doanh') || q.includes('thăng tiến')) {
      return {
        category: 'career',
        semanticKeywords: ['công việc', 'sự nghiệp', 'hành động chiến lược', 'tiến độ'],
        perspective: 'Tập trung vào hiệu suất, cơ hội chuyển biến và năng lực thực thi.',
      };
    }

    if (q.includes('yêu') || q.includes('tình') || q.includes('hôn nhân') || q.includes('người ấy') || q.includes('mối quan hệ') || q.includes('chia tay')) {
      return {
        category: 'love',
        semanticKeywords: ['tình cảm', 'gắn kết', 'chia sẻ cảm xúc', 'sự thấu cảm'],
        perspective: 'Tập trung vào động lực kết nối cảm xúc, sự an toàn và giải tỏa ma sát đôi bên.',
      };
    }

    if (q.includes('tiền') || q.includes('tài chính') || q.includes('đầu tư') || q.includes('mua') || q.includes('nợ') || q.includes('tài sản')) {
      return {
        category: 'finance',
        semanticKeywords: ['tài chính', 'dòng tiền', 'bảo toàn nguồn lực', 'đầu tư'],
        perspective: 'Tập trung vào quản trị rủi ro tài chính, đánh giá tính sinh lợi và cân nhắc chi phí.',
      };
    }

    return {
      category: 'growth',
      semanticKeywords: ['chuyển hóa', 'bài học', 'nhận thức', 'nội lực'],
      perspective: 'Tập trung vào sự thức tỉnh tâm trí, rèn luyện bản lĩnh và vượt qua điểm nghẽn.',
    };
  }
}
```

- [ ] **Step 5: Implement `packages/interpretation-engine/src/main-story-engine.ts`**

Create `packages/interpretation-engine/src/main-story-engine.ts`:
```ts
import { MainStory, Pattern, Signal } from '@mystic/core';
import { QuestionFocus } from './question-reactive-engine.js';

export class MainStoryEngine {
  public static synthesizeStory(
    domain: string,
    patterns: Pattern[],
    signals: Signal[],
    focus: QuestionFocus
  ): MainStory {
    const primary = patterns[0];
    const topSignal = signals[0];

    const domainThemes: Record<string, string> = {
      tarot: `Khảo sát quẻ bài xoay quanh câu hỏi: "${focus.perspective}"`,
      astrology: 'Dấu ấn bản đồ sao phản ánh xung lực định hình bản thể và phương thức tương tác thế giới.',
      tuvi: 'Cấu trúc thiên bàn xác lập trục mệnh thân và quỹ đạo vận trình trọng tâm.',
      numerology: 'Sự hội tụ các con số biểu thị nhịp điệu phát triển và bài học trưởng thành.',
      compatibility: 'Động lực hai cá nhân tương tác hình thành dòng chảy kết nối và thử thách cần dung hòa.',
    };

    const headline = primary
      ? `${primary.headline} — ${focus.category === 'general' ? 'Điểm tựa chủ đạo' : `Trọng tâm ${focus.category}`}`
      : `Xu Hướng Vận Động ${domain.toUpperCase()}`;

    const narrative = primary
      ? `${domainThemes[domain] || ''} Trọng tâm nổi bật nhất nằm ở khuôn mẫu [${primary.headline}], nơi ${
          topSignal ? `tín hiệu "${topSignal.type}" đóng vai trò kích hoạt then chốt.` : 'các yếu tố hội tụ tạo nên bước chuyển dịch quan trọng.'
        } Không chỉ dừng lại ở bề mặt, cấu trúc này đòi hỏi sự thấu suốt về nguyên nhân sâu xa để điều chỉnh hướng đi.`
      : 'Hệ thống nhận diện sự cân bằng tự nhiên giữa các nguồn năng lượng, mở ra cơ hội chiêm nghiệm và tái định vị.';

    return {
      headline,
      narrative,
      centralTension: signals.some((s) => s.polarity === 'challenging')
        ? 'Khoảng giằng co giữa khát vọng bứt phá và đòi hỏi cẩn trọng thực tế'
        : undefined,
      focalEntity: primary?.type,
    };
  }
}
```

- [ ] **Step 6: Implement `packages/interpretation-engine/src/scenario-engine.ts`**

Create `packages/interpretation-engine/src/scenario-engine.ts`:
```ts
import { Scenario, Pattern, Signal } from '@mystic/core';
import { QuestionFocus } from './question-reactive-engine.js';

export class ScenarioEngine {
  public static generateScenarios(
    domain: string,
    patterns: Pattern[],
    signals: Signal[],
    focus: QuestionFocus
  ): Scenario[] {
    const scenarios: Scenario[] = [];
    const pat = patterns[0];
    const patId = pat ? pat.patternId : 'PAT_DEFAULT';

    if (focus.category === 'career' || domain === 'tarot') {
      scenarios.push({
        scenarioId: 'SCEN_CAREER_TRANSITION',
        title: 'Khi đứng trước bước ngoặt công việc hoặc dự án mới',
        trigger: 'Xuất hiện đề xuất đổi mới hoặc áp lực tái cấu trúc công việc',
        patternIds: [patId],
        likelyDynamic: 'Hào hứng dấn thân nhưng dễ bối rối trước chi tiết kỹ thuật hoặc quy trình cũ.',
        tension: 'Xung đột giữa tốc độ mong muốn và quy trình hiện hữu.',
        constructiveResponse: 'Giữ vững mục tiêu cốt lõi, nhưng chia nhỏ cột mốc đánh giá để kiểm soát rủi ro.',
        evidenceIds: [],
      });
    }

    if (focus.category === 'love' || domain === 'compatibility') {
      scenarios.push({
        scenarioId: 'SCEN_RELATIONSHIP_FRICTION',
        title: 'Khi xảy ra tranh luận hoặc bất đồng quan điểm',
        trigger: 'Một trong hai bên cảm thấy thiếu được thấu hiểu hoặc bị áp đặt',
        patternIds: [patId],
        likelyDynamic: 'Khuynh hướng phòng thủ hoặc im lặng rút lui để tự bảo vệ.',
        tension: 'Nhu cầu làm rõ vấn đề ngay lập tức đối đầu với nhu cầu cần không gian riêng.',
        constructiveResponse: 'Tạm dừng tranh luận trực diện; thống nhất thời điểm trao đổi lại khi cả hai đã tĩnh tâm.',
        evidenceIds: [],
      });
    }

    if (focus.category === 'finance' || domain === 'numerology' || domain === 'astrology') {
      scenarios.push({
        scenarioId: 'SCEN_FINANCE_DECISION',
        title: 'Khi đối diện quyết định cam kết nguồn lực lâu dài',
        trigger: 'Phải lựa chọn giữa bảo toàn an toàn và đầu tư mở rộng',
        patternIds: [patId],
        likelyDynamic: 'Xu hướng cân nhắc kéo dài dẫn đến bỏ lỡ cơ hội hoặc ngược lại, mạo hiểm vội vã.',
        tension: 'Cân bằng giữa phòng vệ và tăng trưởng.',
        constructiveResponse: 'Thiết lập hạn mức chịu đựng tổn thất tối đa trước khi đưa ra quyết định cuối cùng.',
        evidenceIds: [],
      });
    }

    if (scenarios.length === 0) {
      scenarios.push({
        scenarioId: 'SCEN_GENERAL_REFLECT',
        title: 'Khi đối mặt áp lực thay đổi nhịp sống hàng ngày',
        trigger: 'Sự xuất hiện của các biến số nằm ngoài dự tính ban đầu',
        patternIds: [patId],
        likelyDynamic: 'Nội tâm dao động, tìm kiếm điểm tựa vững chắc để bám víu.',
        tension: 'Ý muốn kiểm soát đối đầu với thực tế biến chuyển.',
        constructiveResponse: 'Chấp nhận độ trễ tự nhiên, tập trung vào những việc nằm trong tầm kiểm soát trực tiếp.',
        evidenceIds: [],
      });
    }

    return scenarios;
  }
}
```

- [ ] **Step 7: Update `packages/interpretation-engine/src/result-builder.ts` to output `DeepMysticosResult`**

Integrate `ResultDepthEngine`, `QuestionReactiveEngine`, `MainStoryEngine`, `ScenarioEngine` into `MysticosResultBuilder`:
- Compute `focus = QuestionReactiveEngine.resolveFocus(params.inputSummary?.question as string)`.
- Compute `deepInterpretations` with variable depth (DEPTH 1–5), explanation, constructiveExpression, tension.
- Compute `mainStory = MainStoryEngine.synthesizeStory(params.domain, patterns, signals, focus)`.
- Compute `scenarios = ScenarioEngine.generateScenarios(params.domain, patterns, signals, focus)`.
- Compute `nextQuestions` contextually.
- Return `DeepMysticosResult`.

Export new engines in `packages/interpretation-engine/src/index.ts`.

- [ ] **Step 8: Run tests to verify**

Run: `npx vitest run packages/interpretation-engine/tests/deep-reasoning.test.ts && npm run --workspace=@mystic/interpretation-engine build`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add packages/interpretation-engine/src packages/interpretation-engine/tests/deep-reasoning.test.ts
git commit -m "feat(interpretation-engine): implement ResultDepthEngine, MainStoryEngine, QuestionReactiveEngine and ScenarioEngine"
```

---

### Task 3: Editorial UI Primitives (`apps/web/components/primitives/`)

**Files:**
- Create: `apps/web/components/primitives/InsightBlock.tsx`
- Create: `apps/web/components/primitives/PatternStory.tsx`
- Create: `apps/web/components/primitives/CardInteractionBlock.tsx`
- Create: `apps/web/components/primitives/ScenarioBlock.tsx`
- Create: `apps/web/components/primitives/TensionBlock.tsx`
- Create: `apps/web/components/primitives/NextQuestionBlock.tsx`
- Create: `apps/web/components/primitives/WhyDrawer.tsx`
- Create: `apps/web/components/primitives/index.ts`
- Test: `apps/web/tests/primitives.test.tsx`

**Interfaces:**
- Produces: Reusable editorial presentation blocks that adapt visually based on depth, domain, and polarity.

- [ ] **Step 1: Write tests for UI primitives**

Create `apps/web/tests/primitives.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InsightBlock } from '../components/primitives/InsightBlock';
import { ScenarioBlock } from '../components/primitives/ScenarioBlock';
import { NextQuestionBlock } from '../components/primitives/NextQuestionBlock';

describe('Editorial UI Primitives', () => {
  it('renders InsightBlock with depth-based styling', () => {
    render(
      <InsightBlock
        depth="DEPTH_4"
        headline="Khởi Đầu Đột Phá"
        statement="Bạn có cơ hội mở đường mới."
        explanation="Năng lượng nguyên bản thúc đẩy hành động dũng cảm."
        tension="Rủi ro thiếu tính toán"
      />
    );
    expect(screen.getByText('Khởi Đầu Đột Phá')).toBeDefined();
    expect(screen.getByText(/Năng lượng nguyên bản thúc đẩy/)).toBeDefined();
    expect(screen.getByText(/Rủi ro thiếu tính toán/)).toBeDefined();
  });

  it('renders ScenarioBlock correctly', () => {
    render(
      <ScenarioBlock
        scenario={{
          scenarioId: 'S1',
          title: 'Khi đối diện rủi ro',
          trigger: 'Thay đổi công việc',
          patternIds: [],
          likelyDynamic: 'Hào hứng nhưng bất an',
          constructiveResponse: 'Lập kế hoạch từng giai đoạn',
          evidenceIds: [],
        }}
      />
    );
    expect(screen.getByText('Khi đối diện rủi ro')).toBeDefined();
    expect(screen.getByText(/Lập kế hoạch từng giai đoạn/)).toBeDefined();
  });

  it('renders NextQuestionBlock correctly', () => {
    render(
      <NextQuestionBlock
        questions={[{
          question: 'Tôi nên chuẩn bị gì trước?',
          context: 'Định hướng thực tiễn',
          targetDomain: 'tarot',
        }]}
      />
    );
    expect(screen.getByText('Tôi nên chuẩn bị gì trước?')).toBeDefined();
  });
});
```

- [ ] **Step 2: Implement `apps/web/components/primitives/InsightBlock.tsx`**

Create `apps/web/components/primitives/InsightBlock.tsx`:
Render headline, statement, optional explanation (if DEPTH 3+), constructive expression and tension (if DEPTH 4/5) with editorial styling (font Serif, hairline borders, no generic badges).

- [ ] **Step 3: Implement `apps/web/components/primitives/PatternStory.tsx`**

Create `apps/web/components/primitives/PatternStory.tsx`:
Render the `MainStory` narrative arc with a distinct editorial callout box using gold hairline accent.

- [ ] **Step 4: Implement `apps/web/components/primitives/CardInteractionBlock.tsx`**

Create `apps/web/components/primitives/CardInteractionBlock.tsx`:
Render relationships between cards/entities with visual connectors (`A ➔ B ➔ C`) and interaction descriptions (reinforcement, tension, progression).

- [ ] **Step 5: Implement `apps/web/components/primitives/ScenarioBlock.tsx`**

Create `apps/web/components/primitives/ScenarioBlock.tsx`:
Render real-life scenarios with trigger, likely dynamic, and constructive response.

- [ ] **Step 6: Implement `apps/web/components/primitives/TensionBlock.tsx`**

Create `apps/web/components/primitives/TensionBlock.tsx`:
Render the central polarization between two opposing impulses and the balancing resolution.

- [ ] **Step 7: Implement `apps/web/components/primitives/NextQuestionBlock.tsx`**

Create `apps/web/components/primitives/NextQuestionBlock.tsx`:
Render suggested follow-up questions that invite the user to explore deeper without dark patterns.

- [ ] **Step 8: Implement `apps/web/components/primitives/WhyDrawer.tsx`**

Create `apps/web/components/primitives/WhyDrawer.tsx`:
Wrap the transparent `WhyPanel` with a progressive disclosure toggle.

- [ ] **Step 9: Implement `apps/web/components/primitives/index.ts`**

Export all primitives cleanly.

- [ ] **Step 10: Run test to verify**

Run: `npx vitest run apps/web/tests/primitives.test.tsx`
Expected: PASS

- [ ] **Step 11: Commit**

```bash
git add apps/web/components/primitives apps/web/tests/primitives.test.tsx
git commit -m "feat(web): build editorial UI primitives for depth and scenario presentation"
```

---

### Task 4: Distinct Domain Result Views (`apps/web/components/domain-results/`)

**Files:**
- Create: `apps/web/components/domain-results/TarotResultView.tsx`
- Create: `apps/web/components/domain-results/NumerologyResultView.tsx`
- Create: `apps/web/components/domain-results/AstrologyResultView.tsx`
- Create: `apps/web/components/domain-results/TuViResultView.tsx`
- Create: `apps/web/components/domain-results/CompatibilityResultView.tsx`
- Create: `apps/web/components/domain-results/index.ts`
- Modify: `apps/web/components/MysticosResultViewer.tsx`
- Test: `apps/web/tests/domain-views.test.tsx`

**Interfaces:**
- Produces: 5 distinct domain result views honoring Sections 14–31 of the master prompt.
- `MysticosResultViewer`: Delegates dynamically based on `result.domain` to the appropriate domain view.

- [ ] **Step 1: Write test for domain result views**

Create `apps/web/tests/domain-views.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MysticosResultViewer } from '../components/MysticosResultViewer';
import { MysticosResultBuilder } from '@mystic/interpretation-engine';

describe('Domain-Specific Result Views', () => {
  it('renders TarotResultView with story arc and question focus', () => {
    const result = MysticosResultBuilder.buildResult({
      domain: 'tarot',
      inputSummary: { question: 'Có nên đổi việc?' },
      facts: [{ key: 'cardCode', value: 'MAJOR_0', domain: 'tarot', source: 'draw' }],
      school: 'RWS',
    });
    render(<MysticosResultViewer result={result} />);
    expect(screen.getByText(/Khảo Cứu Tarot/i)).toBeDefined();
    expect(screen.getByText(/Trọng tâm/i)).toBeDefined();
  });

  it('renders AstrologyResultView with chart signature and dynamics', () => {
    const result = MysticosResultBuilder.buildResult({
      domain: 'astrology',
      inputSummary: {},
      facts: [{ key: 'planets.sun.sign', value: 'Aries', domain: 'astrology', source: 'calc' }],
      school: 'Classical',
    });
    render(<MysticosResultViewer result={result} />);
    expect(screen.getByText(/Chiêm Tinh/i)).toBeDefined();
  });

  it('renders TuViResultView with mệnh thân and palace patterns', () => {
    const result = MysticosResultBuilder.buildResult({
      domain: 'tuvi',
      inputSummary: {},
      facts: [{ key: 'palaceName', value: 'Mệnh', domain: 'tuvi', source: 'calc' }],
      school: 'Toàn Thư',
    });
    render(<MysticosResultViewer result={result} />);
    expect(screen.getByText(/Tử Vi/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Implement `apps/web/components/domain-results/TarotResultView.tsx`**

Create `apps/web/components/domain-results/TarotResultView.tsx`:
Structure:
1. Question & Reading Focus Header
2. Main Story Callout (`PatternStory`)
3. Cards in Context & Interactions (`CardInteractionBlock`)
4. Deep Interpretations (Scaled by depth using `InsightBlock`)
5. Real-life Scenarios (`ScenarioBlock`)
6. Actionable Reflections (Continue vs Adjust)
7. Next Question Suggestion (`NextQuestionBlock`)
8. Progressive Disclosure (`WhyDrawer`, `TechnicalDetails`)

- [ ] **Step 3: Implement `apps/web/components/domain-results/NumerologyResultView.tsx`**

Create `apps/web/components/domain-results/NumerologyResultView.tsx`:
Structure:
1. Core Profile & Dominant Numbers
2. Number Interaction & Internal Polarization (`TensionBlock`)
3. Life Cycle & Current Period
4. Deep Interpretations (`InsightBlock`)
5. Real-life Application & Scenarios (`ScenarioBlock`)
6. Progressive Disclosure

- [ ] **Step 4: Implement `apps/web/components/domain-results/AstrologyResultView.tsx`**

Create `apps/web/components/domain-results/AstrologyResultView.tsx`:
Structure:
1. Chart Signature & Elemental Distribution
2. Big Three Dynamics (Sun ↔ Moon ↔ Ascendant)
3. Key Ranked Aspects & Life Areas
4. Deep Interpretations (`InsightBlock`)
5. Timing & Practical Implications
6. Progressive Disclosure

- [ ] **Step 5: Implement `apps/web/components/domain-results/TuViResultView.tsx`**

Create `apps/web/components/domain-results/TuViResultView.tsx`:
Structure:
1. Tổng Quan Thiên Bàn & Mệnh / Thân
2. Tam Phương Tứ Chính & Tứ Hóa Kích Hoạt
3. Vận Hiện Tại (Đại hạn / Lưu niên)
4. Deep Interpretations (`InsightBlock`)
5. Khám Phá 12 Cung (Exploration Layer thu gọn)
6. Progressive Disclosure

- [ ] **Step 6: Implement `apps/web/components/domain-results/CompatibilityResultView.tsx`**

Create `apps/web/components/domain-results/CompatibilityResultView.tsx`:
Structure:
1. Relationship Overview (What draws the two together)
2. Areas of Natural Support vs Innate Differences
3. Interaction Dimensions (Emotional, Communication, Values, Daily Life)
4. Real-life Scenarios (*Khi tranh luận*, *Khi quyết định tiền bạc*)
5. Principles for Strengthening the Bond
6. Progressive Disclosure

- [ ] **Step 7: Update `apps/web/components/MysticosResultViewer.tsx`**

Modify `apps/web/components/MysticosResultViewer.tsx` to route `result.domain`:
```tsx
switch (result.domain) {
  case 'tarot': return <TarotResultView result={result as DeepMysticosResult} className={className} />;
  case 'astrology': return <AstrologyResultView result={result as DeepMysticosResult} className={className} />;
  case 'tuvi': return <TuViResultView result={result as DeepMysticosResult} className={className} />;
  case 'numerology': return <NumerologyResultView result={result as DeepMysticosResult} className={className} />;
  case 'compatibility': return <CompatibilityResultView result={result as DeepMysticosResult} className={className} />;
  default: return <EditorialDefaultResultView result={result as DeepMysticosResult} className={className} />;
}
```

- [ ] **Step 8: Run tests to verify**

Run: `npx vitest run apps/web/tests/domain-views.test.tsx`
Expected: PASS

- [ ] **Step 9: Commit**

```bash
git add apps/web/components/domain-results apps/web/components/MysticosResultViewer.tsx apps/web/tests/domain-views.test.tsx
git commit -m "feat(web): implement 5 distinct domain result views with custom result grammars"
```

---

### Task 5: Comprehensive Quality & Regression Verification Suite

**Files:**
- Create: `packages/interpretation-engine/tests/question-reactive.test.ts`
- Create: `packages/interpretation-engine/tests/position-swap.test.ts`
- Create: `packages/interpretation-engine/tests/combination-swap.test.ts`
- Create: `packages/interpretation-engine/tests/depth-distribution.test.ts`

- [ ] **Step 1: Write Question Swap Test**

Create `packages/interpretation-engine/tests/question-reactive.test.ts`:
Verify that identical Tarot cards with different questions ("Có nên nghỉ việc?" vs "Tại sao tình cảm bế tắc?") produce different focal categories, different main stories, and different scenario triggers.

- [ ] **Step 2: Write Position Swap Test**

Create `packages/interpretation-engine/tests/position-swap.test.ts`:
Verify that placing 7 Pentacles at position 0 (Current state) vs position 1 (Challenge/Advice) alters the interpretation headline, polarity, and action priorities.

- [ ] **Step 3: Write Combination Swap Test**

Create `packages/interpretation-engine/tests/combination-swap.test.ts`:
Verify that combination (The Fool + 7 Pentacles) vs (The Fool + The Tower) produces distinct interaction relationships and distinct central tension statements.

- [ ] **Step 4: Write Depth Distribution Test**

Create `packages/interpretation-engine/tests/depth-distribution.test.ts`:
Verify that a generated result has non-uniform depth (e.g. at least one DEPTH 4/5 for primary pattern, and DEPTH 1/2/3 for secondary points) proving lack of uniform boilerplate.

- [ ] **Step 5: Run all test suites across the monorepo**

Run: `npm test && npm run --workspace=@mystic/web build`
Expected: 100% pass across all test files and clean Next.js build.

- [ ] **Step 6: Commit**

```bash
git add packages/interpretation-engine/tests
git commit -m "test(engines): add question-swap, position-swap, combination-swap and depth verification suite"
```
