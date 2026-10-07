# Mysticos UI/UX Simplification & Editorial Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Mysticos user interface into an editorial, progressive-disclosure viewer where users immediately understand key takeaways without engine complexity overload, while purging legacy unused files.

**Architecture:** A page adapter `apps/web/lib/result-adapter.ts` curates `MysticosResult` into an editorial `UserFacingResult` view model. Modular user-need components in `apps/web/components/result/` (`ResultHero`, `KeyThemes`, `HowItMayManifest`, `WatchFor`, `PracticalGuidance`, `WhyThisResult`, `TechnicalDetails`) present a single cohesive story, completely hiding raw internal metrics by default. Unused legacy report files (`NumerologyFullReport.tsx`, `TuViFullReport.tsx`) are deleted.

**Tech Stack:** React 18, Next.js 14, TypeScript 5.6, Tailwind CSS, Lucide icons, Vitest.

## Global Constraints

- **Engine complexity ≠ UI complexity**: Hide internal IDs (`RUL_...`, `CLM_...`), weights, raw scores (`0.85`), and execution time from default view.
- **One screen = one story**: Maintain a focused single-column narrative answering the 5 key user questions in seconds.
- **Progressive disclosure**: "Vì sao?" and technical details are tucked into elegant, expandable panels.
- **Zero domain logic in UI**: Frontend only displays curated data from the engine adapter.
- **Strict editorial aesthetic**: Color scheme `#111110` (Background), `#161614` (Surface), `#EDEAE2` (Text), `#9E9B91` (Stone), `#282724` (Border), `#BFA15F` (Gold), `#BD3A2B` (Cinnabar); fonts `Lora` (Serif), `Be Vietnam Pro` (Sans), `JetBrains Mono` (Mono); 0px radius on cards.

---

### Task 1: Purge Legacy Unused Full Report Files

**Files:**
- Delete: `apps/web/app/numerology/NumerologyFullReport.tsx`
- Delete: `apps/web/app/tu-vi/TuViFullReport.tsx`
- Test: `apps/web/tests/api-contracts.test.ts`, `apps/web/tests/viewer-components.test.tsx`

**Interfaces:**
- Purges: 88.3 KB of unused legacy hardcoded report components.

- [ ] **Step 1: Verify files are unreferenced and delete them**

Check that no file in `apps/web` imports `NumerologyFullReport` or `TuViFullReport`.
Delete `apps/web/app/numerology/NumerologyFullReport.tsx`.
Delete `apps/web/app/tu-vi/TuViFullReport.tsx`.

- [ ] **Step 2: Run build to verify clean compilation**

Run: `npm run --workspace=@mystic/web build`
Expected: 19 routes compiled successfully with 0 errors.

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/numerology/NumerologyFullReport.tsx apps/web/app/tu-vi/TuViFullReport.tsx
git commit -m "refactor(web): purge unused legacy full report components"
```

---

### Task 2: Build Editorial Result Adapter (`apps/web/lib/result-adapter.ts`)

**Files:**
- Create: `apps/web/lib/result-adapter.ts`
- Test: `apps/web/tests/result-adapter.test.ts`

**Interfaces:**
- Produces: `UserFacingResult`, `adaptToUserFacingResult(result: MysticosResult): UserFacingResult`.

- [ ] **Step 1: Write failing test for result adapter**

Create `apps/web/tests/result-adapter.test.ts`:
```ts
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
    expect(adapted.manifestations[0].detail).toContain('Dễ dàng nắm bắt dự án mới');
    expect(adapted.tensions[0].dynamic).toContain('Giằng co');
    expect(adapted.guidance[0].continueItems).toContain('Giữ tâm thái cởi mở học hỏi');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run apps/web/tests/result-adapter.test.ts`
Expected: FAIL (Cannot find module `../lib/result-adapter.js`)

- [ ] **Step 3: Implement `apps/web/lib/result-adapter.ts`**

Create `apps/web/lib/result-adapter.ts`:
```ts
import type { MysticosResult } from '@mystic/core';

export interface UserFacingTheme {
  id: string;
  title: string;
  description: string;
  relevance: 'primary' | 'secondary';
}

export interface UserFacingManifestation {
  context: string;
  detail: string;
}

export interface UserFacingTension {
  dynamic: string;
  resolution: string;
}

export interface UserFacingGuidance {
  priority: 'IMMEDIATE' | 'STRATEGIC' | 'REFLECTIVE';
  continueItems: string[];
  adjustOrStopItems: string[];
  rationale: string;
}

export interface UserFacingResult {
  domain: string;
  domainTitle: string;
  domainNumber: string;
  school: string;
  headline: string;
  summary: string;
  keyThemes: UserFacingTheme[];
  manifestations: UserFacingManifestation[];
  tensions: UserFacingTension[];
  guidance: UserFacingGuidance[];
  whyCount: number;
  evidenceCount: number;
  rawResult: MysticosResult;
}

const DOMAIN_MAP: Record<string, { label: string; number: string }> = {
  tarot: { label: 'Khảo Cứu Tarot Rider-Waite', number: '04' },
  astrology: { label: 'Bản Đồ Sao Chiêm Tinh Học', number: '01' },
  tuvi: { label: 'Thiên Bàn Tử Vi Đẩu Số', number: '02' },
  numerology: { label: 'Hệ Thống Thần Số Học Pythagoras', number: '03' },
  compatibility: { label: 'Khảo Luận Tương Hợp Bản Mệnh', number: '05' },
};

export function adaptToUserFacingResult(result: MysticosResult): UserFacingResult {
  const meta = DOMAIN_MAP[result.domain] || {
    label: `Khảo Cứu ${result.domain?.toUpperCase() || 'Vận Mệnh'}`,
    number: '00',
  };

  const primaryInterp = result.interpretations?.[0];
  const headline = primaryInterp?.headline || 'Tổng Quan Khảo Cứu';
  const summary = primaryInterp?.statement ||
    'Các dấu chỉ thiên văn và biểu tượng cho thấy những xu hướng vận động quan trọng trong giai đoạn hiện tại.';

  // Select top 3 primary themes (Editorial judgment: maximum 3)
  const keyThemes: UserFacingTheme[] = (result.patterns || [])
    .slice(0, 3)
    .map((pat, idx) => ({
      id: pat.patternId || `theme_${idx}`,
      title: pat.headline || `Chủ Đề ${idx + 1}`,
      description: (result.interpretations?.[idx]?.statement || pat.headline),
      relevance: idx === 0 ? 'primary' : 'secondary',
    }));

  // Collect manifestations
  const manifestations: UserFacingManifestation[] = (result.implications || []).map((imp) => ({
    context: imp.context || 'Đời sống thường nhật',
    detail: imp.manifestation,
  }));

  // Collect tensions & risks
  const tensions: UserFacingTension[] = (result.tensions || []).map((t) => ({
    dynamic: t.dynamics || `${t.traitA} giao thoa cùng ${t.traitB}`,
    resolution: t.resolution || 'Cân bằng giữa các nhu cầu nội tại để giữ vững sự ổn định.',
  }));

  // Collect actionable guidance
  const guidance: UserFacingGuidance[] = (result.guidance || []).map((g) => ({
    priority: g.actionPriority || 'STRATEGIC',
    continueItems: g.whatToContinue || [],
    adjustOrStopItems: g.whatToAdjustOrStop || [],
    rationale: g.rationale || '',
  }));

  return {
    domain: result.domain,
    domainTitle: meta.label,
    domainNumber: meta.number,
    school: result.metadata?.school || 'Truyền Thống Chuẩn Xác',
    headline,
    summary,
    keyThemes,
    manifestations,
    tensions,
    guidance,
    whyCount: (result.signals?.length || 0) + (result.patterns?.length || 0),
    evidenceCount: result.evidence?.length || 0,
    rawResult: result,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run apps/web/tests/result-adapter.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/web/lib/result-adapter.ts apps/web/tests/result-adapter.test.ts
git commit -m "feat(web): implement editorial result adapter transforming MysticosResult into UserFacingResult"
```

---

### Task 3: Build User-Needs Component Suite (`apps/web/components/result/*`)

**Files:**
- Create: `apps/web/components/result/ResultHero.tsx`
- Create: `apps/web/components/result/KeyThemes.tsx`
- Create: `apps/web/components/result/HowItMayManifest.tsx`
- Create: `apps/web/components/result/WatchFor.tsx`
- Create: `apps/web/components/result/PracticalGuidance.tsx`
- Create: `apps/web/components/result/WhyThisResult.tsx`
- Create: `apps/web/components/result/TechnicalDetails.tsx`
- Create: `apps/web/components/result/index.ts`
- Test: `apps/web/tests/user-components.test.tsx`

**Interfaces:**
- Produces: Components mapping directly to user questions without leaking database complexity.

- [ ] **Step 1: Write test for user-needs components**

Create `apps/web/tests/user-components.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResultHero } from '../components/result/ResultHero';
import { KeyThemes } from '../components/result/KeyThemes';
import { PracticalGuidance } from '../components/result/PracticalGuidance';
import { adaptToUserFacingResult } from '../lib/result-adapter';
import type { MysticosResult } from '@mystic/core';

describe('User Needs Component Suite', () => {
  const dummyResult: MysticosResult = {
    resultId: 'TEST_1',
    domain: 'astrology',
    inputSummary: {},
    facts: [{ key: 'Sun', value: 'Aries', domain: 'astrology', source: 'chart' }],
    semantics: [],
    signals: [],
    relationships: [],
    patterns: [{ patternId: 'P1', type: 'CORE', headline: 'Bản Lĩnh Tiên Phong', signalIds: [], relationshipIds: [], dominance: 0.9, contextFit: 0.9 }],
    tensions: [],
    interpretations: [{
      interpretationId: 'I1',
      dimension: 'overview',
      statementId: 'S1',
      headline: 'Ý Chí Khởi Xướng Mạnh Mẽ',
      statement: 'Bạn sở hữu nguồn năng lượng mở đường dồi dào và trực diện.',
      polarity: 'supportive',
      strength: 0.9,
      confidence: 0.9,
      patternIds: ['P1'],
      signalIds: [],
      ruleIds: [],
      evidenceIds: [],
    }],
    implications: [],
    guidance: [{
      guidanceId: 'G1',
      implicationId: 'I1',
      actionPriority: 'IMMEDIATE',
      whatToContinue: ['Chủ động đề xuất phương án'],
      whatToAdjustOrStop: ['Không nóng vội bỏ qua chi tiết'],
      rationale: 'Hành động nhanh cần đi kèm kỷ luật.',
    }],
    evidence: [],
    conflicts: [],
    technical: { calculationTimeMs: 2, rulesEvaluatedCount: 5, rulesMatchedCount: 1 },
    metadata: { engineVersion: '3.0.0', knowledgeBaseVersion: '2026.10', rulesVersion: '2026.10', school: 'Classical', deterministic: true, calculatedAt: '2026-10-07' },
  };

  it('renders ResultHero answering what the result is', () => {
    const vm = adaptToUserFacingResult(dummyResult);
    render(<ResultHero result={vm} />);
    expect(screen.getByText('Ý Chí Khởi Xướng Mạnh Mẽ')).toBeDefined();
    expect(screen.getByText(/Bạn sở hữu nguồn năng lượng mở đường/)).toBeDefined();
  });

  it('renders KeyThemes displaying top patterns', () => {
    const vm = adaptToUserFacingResult(dummyResult);
    render(<KeyThemes themes={vm.keyThemes} />);
    expect(screen.getByText('Bản Lĩnh Tiên Phong')).toBeDefined();
  });

  it('renders PracticalGuidance displaying actionable items', () => {
    const vm = adaptToUserFacingResult(dummyResult);
    render(<PracticalGuidance guidance={vm.guidance} />);
    expect(screen.getByText('Chủ động đề xuất phương án')).toBeDefined();
    expect(screen.getByText('Không nóng vội bỏ qua chi tiết')).toBeDefined();
  });
});
```

- [ ] **Step 2: Implement `apps/web/components/result/ResultHero.tsx`**

Create `apps/web/components/result/ResultHero.tsx`:
```tsx
import React from 'react';
import type { UserFacingResult } from '../../lib/result-adapter';

export function ResultHero({ result }: { result: UserFacingResult }) {
  return (
    <section className="border-b border-borderDark pb-8 space-y-4">
      <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
        <span className="text-accentGold">{result.domainNumber}</span>
        <span>/</span>
        <span>{result.domainTitle}</span>
        <span>/</span>
        <span className="text-stone">{result.school}</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal leading-[1.25] tracking-tight">
          {result.headline}
        </h1>
        <p className="text-base sm:text-lg text-stone max-w-2xl leading-relaxed font-normal">
          {result.summary}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Implement `apps/web/components/result/KeyThemes.tsx`**

Create `apps/web/components/result/KeyThemes.tsx`:
```tsx
import React from 'react';
import type { UserFacingTheme } from '../../lib/result-adapter';

export function KeyThemes({ themes }: { themes: UserFacingTheme[] }) {
  if (!themes || themes.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accentGold">
        <span>✦</span>
        <span>Điểm Nổi Bật Đáng Chú Ý</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map((theme, idx) => (
          <div
            key={theme.id || idx}
            className="bg-surface border border-borderDark p-5 space-y-2 relative"
          >
            <div className="text-xs font-mono text-stone">MẪU 0{idx + 1}</div>
            <h3 className="text-base font-serif text-parchment font-normal">
              {theme.title}
            </h3>
            <p className="text-xs text-stone leading-relaxed">
              {theme.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement `apps/web/components/result/HowItMayManifest.tsx`**

Create `apps/web/components/result/HowItMayManifest.tsx`:
```tsx
import React from 'react';
import type { UserFacingManifestation } from '../../lib/result-adapter';

export function HowItMayManifest({ manifestations }: { manifestations: UserFacingManifestation[] }) {
  if (!manifestations || manifestations.length === 0) return null;

  return (
    <section className="space-y-4 border-t border-borderDark pt-8">
      <div className="text-xs font-mono uppercase tracking-wider text-stone">
        Điều Này Có Thể Biểu Hiện Trong Thực Tế
      </div>

      <div className="space-y-3">
        {manifestations.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 bg-surface/50 border border-borderDark/60 p-4 text-sm"
          >
            <span className="text-accentGold font-mono text-xs mt-0.5">0{idx + 1}.</span>
            <div className="space-y-1">
              <span className="text-xs font-mono text-stone uppercase block">{item.context}</span>
              <p className="text-parchment leading-relaxed">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Implement `apps/web/components/result/WatchFor.tsx`**

Create `apps/web/components/result/WatchFor.tsx`:
```tsx
import React from 'react';
import type { UserFacingTension } from '../../lib/result-adapter';

export function WatchFor({ tensions }: { tensions: UserFacingTension[] }) {
  if (!tensions || tensions.length === 0) return null;

  return (
    <section className="space-y-4 border-t border-borderDark pt-8">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cinnabar">
        <span>⚠</span>
        <span>Điểm Cần Lưu Ý & Cân Bằng</span>
      </div>

      <div className="space-y-3">
        {tensions.map((item, idx) => (
          <div
            key={idx}
            className="bg-surface border-l-2 border-l-cinnabar border border-borderDark p-4 space-y-2 text-sm"
          >
            <div className="text-parchment font-serif font-normal">{item.dynamic}</div>
            <p className="text-xs text-stone leading-relaxed">{item.resolution}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Implement `apps/web/components/result/PracticalGuidance.tsx`**

Create `apps/web/components/result/PracticalGuidance.tsx`:
```tsx
import React from 'react';
import type { UserFacingGuidance } from '../../lib/result-adapter';

export function PracticalGuidance({ guidance }: { guidance: UserFacingGuidance[] }) {
  if (!guidance || guidance.length === 0) return null;

  return (
    <section className="space-y-4 border-t border-borderDark pt-8">
      <div className="text-xs font-mono uppercase tracking-wider text-accentGold">
        Gợi Ý Thực Tế & Định Hướng Hành Động
      </div>

      <div className="space-y-4">
        {guidance.map((item, idx) => (
          <div key={idx} className="bg-surface border border-borderDark p-5 space-y-4">
            {item.rationale && (
              <p className="text-xs text-stone italic border-b border-borderDark pb-3">
                &ldquo;{item.rationale}&rdquo;
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {item.continueItems && item.continueItems.length > 0 && (
                <div className="space-y-2">
                  <div className="font-mono text-accentGold uppercase">Nên tiếp tục phát huy:</div>
                  <ul className="space-y-1.5 list-disc list-inside text-parchment">
                    {item.continueItems.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {item.adjustOrStopItems && item.adjustOrStopItems.length > 0 && (
                <div className="space-y-2">
                  <div className="font-mono text-stone uppercase">Cần điều chỉnh hoặc lưu tâm:</div>
                  <ul className="space-y-1.5 list-disc list-inside text-stone">
                    {item.adjustOrStopItems.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Implement `apps/web/components/result/WhyThisResult.tsx`**

Create `apps/web/components/result/WhyThisResult.tsx`:
```tsx
import React, { useState } from 'react';
import type { MysticosResult } from '@mystic/core';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { WhyPanel } from '../WhyPanel';

export function WhyThisResult({ rawResult }: { rawResult: MysticosResult }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="border-t border-borderDark pt-8 space-y-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-surface border border-borderDark hover:border-accentGold/50 transition-colors text-left"
      >
        <div className="space-y-1">
          <div className="text-sm font-serif text-parchment flex items-center gap-2">
            <span className="text-accentGold">✦</span>
            <span>Vì sao tôi nhận được kết quả này?</span>
          </div>
          <p className="text-xs text-stone">
            Khám phá chuỗi lập luận logic, các quy tắc tất định và nguồn gốc thư tịch cổ.
          </p>
        </div>
        <div className="text-stone">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="pt-2 animate-in fade-in duration-200">
          <WhyPanel result={rawResult} />
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 8: Implement `apps/web/components/result/TechnicalDetails.tsx`**

Create `apps/web/components/result/TechnicalDetails.tsx`:
```tsx
import React, { useState } from 'react';
import type { MysticosResult } from '@mystic/core';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function TechnicalDetails({ rawResult }: { rawResult: MysticosResult }) {
  const [isOpen, setIsOpen] = useState(false);
  const facts = rawResult.facts || [];

  return (
    <section className="border-t border-borderDark/60 pt-6 space-y-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs font-mono text-stone hover:text-parchment flex items-center gap-1.5 transition-colors uppercase tracking-wider"
      >
        <span>{isOpen ? '[-]' : '[+]'}</span>
        <span>Chi Tiết Kỹ Thuật & Tọa Độ Gốc ({facts.length} Dữ Kiện)</span>
      </button>

      {isOpen && (
        <div className="bg-surface/30 border border-borderDark p-4 space-y-3 text-xs font-mono animate-in fade-in duration-200">
          <div className="text-stone border-b border-borderDark pb-2 flex justify-between">
            <span>Engine: {rawResult.metadata?.engineVersion}</span>
            <span>Rules: {rawResult.metadata?.rulesVersion}</span>
            <span>Time: {rawResult.technical?.calculationTimeMs}ms</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone">
            {facts.map((fact, idx) => (
              <div key={idx} className="truncate">
                <span className="text-accentGold/80">{fact.key}:</span>{' '}
                <span className="text-parchment">{String(fact.value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 9: Create `apps/web/components/result/index.ts`**

Create `apps/web/components/result/index.ts`:
```ts
export * from './ResultHero.js';
export * from './KeyThemes.js';
export * from './HowItMayManifest.js';
export * from './WatchFor.js';
export * from './PracticalGuidance.js';
export * from './WhyThisResult.js';
export * from './TechnicalDetails.js';
```

- [ ] **Step 10: Run test to verify it passes**

Run: `npx vitest run apps/web/tests/user-components.test.tsx`
Expected: PASS (3 tests passed)

- [ ] **Step 11: Commit**

```bash
git add apps/web/components/result apps/web/tests/user-components.test.tsx
git commit -m "feat(web): build user-needs component suite for editorial results presentation"
```

---

### Task 4: Refactor `MysticosResultViewer.tsx` to Use New Components

**Files:**
- Modify: `apps/web/components/MysticosResultViewer.tsx`
- Test: `apps/web/tests/viewer-components.test.tsx`

**Interfaces:**
- Produces: `<MysticosResultViewer result={result} />` acting as an editorial narrative container with 0 clutter.

- [ ] **Step 1: Update `MysticosResultViewer.tsx`**

Replace monolithic layout in `apps/web/components/MysticosResultViewer.tsx` with:
```tsx
'use client';

import React from 'react';
import type { MysticosResult } from '@mystic/core';
import { adaptToUserFacingResult } from '../lib/result-adapter.js';
import {
  ResultHero,
  KeyThemes,
  HowItMayManifest,
  WatchFor,
  PracticalGuidance,
  WhyThisResult,
  TechnicalDetails,
} from './result/index.js';

export interface MysticosResultViewerProps {
  result: MysticosResult;
  className?: string;
}

export function MysticosResultViewer({
  result,
  className = '',
}: MysticosResultViewerProps) {
  if (!result) return null;

  const viewModel = adaptToUserFacingResult(result);

  return (
    <article className={`max-w-3xl mx-auto space-y-10 ${className}`}>
      <ResultHero result={viewModel} />
      <KeyThemes themes={viewModel.keyThemes} />
      <HowItMayManifest manifestations={viewModel.manifestations} />
      <WatchFor tensions={viewModel.tensions} />
      <PracticalGuidance guidance={viewModel.guidance} />
      <WhyThisResult rawResult={viewModel.rawResult} />
      <TechnicalDetails rawResult={viewModel.rawResult} />
    </article>
  );
}
```

- [ ] **Step 2: Run test to verify it passes**

Run: `npx vitest run apps/web/tests/viewer-components.test.tsx`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add apps/web/components/MysticosResultViewer.tsx
git commit -m "refactor(web): transform MysticosResultViewer into focused narrative orchestrator"
```

---

### Task 5: Refactor and Polish Home Page and 5 Domain Pages

**Files:**
- Modify: `apps/web/app/page.tsx`
- Modify: `apps/web/app/tarot/page.tsx`
- Modify: `apps/web/app/astrology/page.tsx`
- Modify: `apps/web/app/tu-vi/page.tsx`
- Modify: `apps/web/app/numerology/page.tsx`
- Modify: `apps/web/app/compatibility/page.tsx`

**Interfaces:**
- Streamlines: Clean 2-step user journeys (Input -> Editorial Result) on all 5 domain pages.

- [ ] **Step 1: Polish Home Page (`apps/web/app/page.tsx`)**

Streamline hero text and 5 module cards with clean editorial styling and 1 CTA each.

- [ ] **Step 2: Polish `/tarot` Page**

Ensure clear prompt for question and spread selection, followed by immediate `<MysticosResultViewer />` rendering when results are returned.

- [ ] **Step 3: Polish `/astrology` Page**

Streamline natal data inputs and provide clean feedback when birth time is missing.

- [ ] **Step 4: Polish `/tu-vi` Page**

Streamline birth time inputs; render `<MysticosResultViewer />` cleanly without forcing 12-palace table immediately.

- [ ] **Step 5: Polish `/numerology` Page**

Clean name and birthdate inputs with instant feedback.

- [ ] **Step 6: Polish `/compatibility` Page**

Streamline person A and person B inputs, removing any trace of arbitrary percentage compatibility.

- [ ] **Step 7: Run build and all tests**

Run: `npm run --workspace=@mystic/web build && npm test`
Expected: All 24+ test files pass, Next.js build clean.

- [ ] **Step 8: Commit**

```bash
git add apps/web/app
git commit -m "feat(web): polish home page and 5 domain pages with clean 2-step editorial flows"
```
