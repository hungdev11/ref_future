# Mysticos 17-Layer Rebuild & Legacy Purge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruct Mysticos around `@mystic/knowledge-base` as the single source of truth across all 17 layers, purge all legacy hardcoded paragraph dictionaries and UI domain logic, and standardize output to `MysticosResult`.

**Architecture:** Core contracts in `@mystic/core/src/types/result.ts` define the canonical 17-layer output `MysticosResult`. Legacy static text files (`planetary-interpretations.ts`, hardcoded dictionaries) are completely purged. `@mystic/interpretation-engine` houses the canonical `MysticosResultBuilder` executing facts -> semantics -> rules -> signals -> relationships -> patterns -> interpretations -> implications -> guidance -> evidence references. Frontend is rebuilt as a pure result viewer with a transparent Why Panel adhering to editorial design rules.

**Tech Stack:** TypeScript 5.6, Node.js (ESM), Vitest, React 18, Next.js 14, Tailwind CSS.

## Global Constraints

- 100% deterministic: Zero LLM or generative AI in reasoning or interpretation.
- Pure provenance traceability: Every interpretation links to Pattern -> Signals -> Rule -> Claim -> Source.
- Complete legacy purge: Remove static string-stitching and hardcoded paragraph tables.
- Zero domain logic in UI: React components only consume and render `MysticosResult`.
- Strict editorial design system: Colors `#111110`, `#161614`, `#EDEAE2`, `#BFA15F`, typography Lora / Be Vietnam Pro / JetBrains Mono.

---

### Task 1: Canonical Data Contract (`MysticosResult`) in `@mystic/core`

**Files:**
- Create: `packages/core/src/types/result.ts`
- Modify: `packages/core/src/types/index.ts`
- Test: `packages/core/tests/result-types.test.ts`

**Interfaces:**
- Produces: `Fact`, `SemanticUnit`, `Signal`, `RelationshipType`, `Relationship`, `Pattern`, `Interpretation`, `PracticalImplication`, `Guidance`, `EvidenceReference`, `MysticosResult`.

- [ ] **Step 1: Write failing test for MysticosResult contract**

Create `packages/core/tests/result-types.test.ts`:
```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run packages/core/tests/result-types.test.ts`
Expected: FAIL (Cannot find module `../src/types/result.js`)

- [ ] **Step 3: Implement `packages/core/src/types/result.ts`**

Create `packages/core/src/types/result.ts`:
```ts
export interface Fact {
  key: string;
  value: unknown;
  domain: string;
  source: string;
}

export interface SemanticUnit {
  id: string;
  concept: string;
  keywords: string[];
  polarity: 'constructive' | 'shadow' | 'neutral' | 'tension';
  weight: number;
}

export interface Signal {
  signalId: string;
  type: string;
  polarity: 'supportive' | 'challenging' | 'neutral' | 'mixed';
  strength: number; // 0.0 -> 1.0
  ruleIds: string[];
  claimIds: string[];
  dimension: string;
  description?: string;
}

export type RelationshipType =
  | 'reinforcement'
  | 'contrast'
  | 'tension'
  | 'progression'
  | 'transition'
  | 'complementarity'
  | 'amplification'
  | 'mitigation';

export interface Relationship {
  relationshipId: string;
  type: RelationshipType;
  sourceSignalId: string;
  targetSignalId: string;
  description: string;
  intensity: number;
}

export interface Pattern {
  patternId: string;
  type: string;
  headline: string;
  signalIds: string[];
  relationshipIds: string[];
  dominance: number; // 0.0 -> 1.0
  contextFit: number;
}

export interface Interpretation {
  interpretationId: string;
  dimension: string;
  statementId: string;
  headline: string;
  statement: string;
  polarity: 'supportive' | 'challenging' | 'mixed' | 'context_dependent';
  strength: number;
  confidence: number;
  patternIds: string[];
  signalIds: string[];
  ruleIds: string[];
  evidenceIds: string[];
}

export interface PracticalImplication {
  implicationId: string;
  interpretationId: string;
  context: string;
  manifestation: string;
}

export interface Guidance {
  guidanceId: string;
  implicationId: string;
  actionPriority: 'IMMEDIATE' | 'STRATEGIC' | 'REFLECTIVE';
  whatToContinue: string[];
  whatToAdjustOrStop: string[];
  rationale: string;
}

export interface EvidenceReference {
  evidenceId: string;
  ruleId: string;
  claimId: string;
  sourceId: string;
  sourceTitle: string;
  citation: string;
  evidenceLevel: 'A' | 'B' | 'C' | 'D' | 'E';
}

export interface MysticosResult {
  resultId: string;
  domain: 'tarot' | 'astrology' | 'tuvi' | 'numerology' | 'compatibility';
  inputSummary: Record<string, unknown>;
  facts: Fact[];
  semantics: SemanticUnit[];
  signals: Signal[];
  relationships: Relationship[];
  patterns: Pattern[];
  tensions: Array<{ traitA: string; traitB: string; dynamics: string; resolution: string }>;
  interpretations: Interpretation[];
  implications: PracticalImplication[];
  guidance: Guidance[];
  evidence: EvidenceReference[];
  conflicts: Array<{ conflictId: string; topic: string; resolution: string }>;
  technical: {
    calculationTimeMs: number;
    rulesEvaluatedCount: number;
    rulesMatchedCount: number;
  };
  metadata: {
    engineVersion: string;
    knowledgeBaseVersion: string;
    rulesVersion: string;
    school: string;
    deterministic: true;
    calculatedAt: string;
  };
}
```

Export in `packages/core/src/types/index.ts`:
```ts
export * from './result.js';
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run packages/core/tests/result-types.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/types/result.ts packages/core/src/types/index.ts packages/core/tests/result-types.test.ts
git commit -m "feat(core): define canonical 17-layer MysticosResult contract"
```

---

### Task 2: Purge Legacy Hardcoded Paragraph Files

**Files:**
- Delete: `packages/astrology-engine/src/planetary-interpretations.ts`
- Modify: `packages/astrology-engine/src/index.ts`
- Modify: `packages/astrology-engine/src/interpretations.ts`
- Modify: `packages/tarot-engine/src/interpretations.ts`
- Modify: `packages/tarot-engine/src/index.ts`
- Modify: `packages/numerology-engine/src/interpretations.ts`
- Modify: `packages/tuvi-engine/src/interpretations.ts`
- Test: `packages/astrology-engine/tests/astrology.test.ts`, `packages/tarot-engine/tests/tarot.test.ts`

**Interfaces:**
- Purges: 107.7 KB static text dictionary `planetary-interpretations.ts` and `MAJOR_ARCANA_DETAILED` paragraphs.
- Produces: Clean semantic adapters with zero unverified hardcoded text blobs.

- [ ] **Step 1: Remove `planetary-interpretations.ts` and clean `packages/astrology-engine`**

Delete `packages/astrology-engine/src/planetary-interpretations.ts`.
Update `packages/astrology-engine/src/interpretations.ts` and `packages/astrology-engine/src/index.ts` to export semantic calculation helpers rather than giant paragraph maps.

- [ ] **Step 2: Clean `packages/tarot-engine/src/interpretations.ts`**

Replace `MAJOR_ARCANA_DETAILED` in `packages/tarot-engine/src/interpretations.ts` with structured semantic keyword mappings and direct references to `@mystic/knowledge-base`.

- [ ] **Step 3: Clean `packages/numerology-engine` & `packages/tuvi-engine` interpretations**

Remove hardcoded paragraph bodies, keeping core formulaic meanings and traits that feed into the semantic profile pipeline.

- [ ] **Step 4: Build packages and run tests**

Run: `npm run build:packages && npm run test`
Expected: All packages compile cleanly without broken references.

- [ ] **Step 5: Commit**

```bash
git add packages/astrology-engine packages/tarot-engine packages/numerology-engine packages/tuvi-engine
git commit -m "refactor(engines): purge legacy static paragraph dictionaries and text stitching"
```

---

### Task 3: Unified 17-Layer `MysticosResultBuilder` in `@mystic/interpretation-engine`

**Files:**
- Create: `packages/interpretation-engine/src/result-builder.ts`
- Modify: `packages/interpretation-engine/src/index.ts`
- Test: `packages/interpretation-engine/tests/result-builder.test.ts`

**Interfaces:**
- Consumes: Facts from domain calculations, `@mystic/knowledge-base` (`KnowledgeStore`, `ProvenanceTracer`).
- Produces: `MysticosResultBuilder.buildResult(params): MysticosResult`.

- [ ] **Step 1: Write failing test for `MysticosResultBuilder`**

Create `packages/interpretation-engine/tests/result-builder.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { MysticosResultBuilder } from '../src/result-builder.js';

describe('17-Layer MysticosResultBuilder', () => {
  it('builds a fully traceable MysticosResult with signals, relationships, patterns, and provenance', () => {
    const result = MysticosResultBuilder.buildResult({
      domain: 'astrology',
      inputSummary: { sunSign: 'Aries', moonSign: 'Taurus' },
      facts: [
        { key: 'planets.sun.sign', value: 'Aries', domain: 'astrology', source: 'ephemeris' },
        { key: 'planets.sun.houseNumber', value: 1, domain: 'astrology', source: 'ephemeris' },
      ],
      school: 'Classical Ptolemaic & Modern Synthesis',
    });

    expect(result.domain).toBe('astrology');
    expect(result.signals.length).toBeGreaterThan(0);
    expect(result.patterns.length).toBeGreaterThan(0);
    expect(result.interpretations.length).toBeGreaterThan(0);
    expect(result.guidance.length).toBeGreaterThan(0);
    expect(result.evidence.length).toBeGreaterThan(0);
    expect(result.evidence[0].sourceId).toBeDefined();
    expect(result.metadata.deterministic).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run packages/interpretation-engine/tests/result-builder.test.ts`
Expected: FAIL (Cannot find module `../src/result-builder.js`)

- [ ] **Step 3: Implement `MysticosResultBuilder`**

Create `packages/interpretation-engine/src/result-builder.ts`:
```ts
import {
  MysticosResult,
  Fact,
  SemanticUnit,
  Signal,
  Relationship,
  Pattern,
  Interpretation,
  PracticalImplication,
  Guidance,
  EvidenceReference,
} from '@mystic/core';
import { KnowledgeStore, ProvenanceTracer } from '@mystic/knowledge-base';

export interface BuildResultParams {
  domain: 'tarot' | 'astrology' | 'tuvi' | 'numerology' | 'compatibility';
  inputSummary: Record<string, unknown>;
  facts: Fact[];
  school: string;
}

export class MysticosResultBuilder {
  private static tracer = new ProvenanceTracer();

  public static buildResult(params: BuildResultParams): MysticosResult {
    const startTime = Date.now();
    const store = KnowledgeStore.getInstance();
    const domainRules = store.getRulesByDomain(params.domain);

    const factMap = new Map<string, unknown>();
    for (const f of params.facts) {
      factMap.set(f.key, f.value);
    }

    // 1. Match Rules
    const matchedRules = domainRules.filter((rule) => {
      return rule.preconditions.every((cond) => {
        const actual = factMap.get(cond.field);
        if (actual === undefined) return false;
        if (cond.operator === 'EQUALS') return actual === cond.value;
        if (cond.operator === 'NOT_EQUALS') return actual !== cond.value;
        if (cond.operator === 'IN' && Array.isArray(cond.value)) return cond.value.includes(actual);
        if (cond.operator === 'LESS_THAN' && typeof actual === 'number' && typeof cond.value === 'number') {
          return actual < cond.value;
        }
        if (cond.operator === 'GREATER_THAN' && typeof actual === 'number' && typeof cond.value === 'number') {
          return actual > cond.value;
        }
        return false;
      });
    });

    // 2. Semantics & Signals
    const semantics: SemanticUnit[] = [];
    const signals: Signal[] = [];

    matchedRules.forEach((rule, idx) => {
      rule.semanticInputs.forEach((sem, sIdx) => {
        semantics.push({
          id: `SEM_${rule.ruleId}_${sIdx}`,
          concept: sem,
          keywords: [sem.replace(/_/g, ' ')],
          polarity: rule.polarity === 'shadow' ? 'shadow' : 'constructive',
          weight: rule.priority / 100,
        });
      });

      rule.derivedSignals.forEach((sigCode) => {
        signals.push({
          signalId: `SIG_${sigCode}_${idx}`,
          type: sigCode,
          polarity: rule.polarity === 'shadow' ? 'challenging' : 'supportive',
          strength: Math.min(1.0, rule.priority / 100),
          ruleIds: [rule.ruleId],
          claimIds: [...rule.claimIds],
          dimension: 'overview',
          description: rule.notes,
        });
      });
    });

    // 3. Relationships
    const relationships: Relationship[] = [];
    for (let i = 0; i < signals.length - 1; i++) {
      relationships.push({
        relationshipId: `REL_${i}`,
        type: signals[i].polarity === signals[i + 1].polarity ? 'reinforcement' : 'tension',
        sourceSignalId: signals[i].signalId,
        targetSignalId: signals[i + 1].signalId,
        description: `Tương tác giữa ${signals[i].type} và ${signals[i + 1].type}`,
        intensity: (signals[i].strength + signals[i + 1].strength) / 2,
      });
    }

    // 4. Patterns
    const patterns: Pattern[] = matchedRules.map((rule, idx) => ({
      patternId: `PAT_${rule.pattern || idx}`,
      type: rule.pattern || 'CORE_PATTERN',
      headline: rule.notes || `Cấu Trúc ${rule.domain.toUpperCase()}`,
      signalIds: signals.filter((s) => s.ruleIds.includes(rule.ruleId)).map((s) => s.signalId),
      relationshipIds: relationships.map((r) => r.relationshipId),
      dominance: Math.min(1.0, rule.priority / 100),
      contextFit: 0.95,
    }));

    // 5. Interpretations
    const interpretations: Interpretation[] = patterns.map((pat, idx) => ({
      interpretationId: `INT_${idx}`,
      dimension: 'overview',
      statementId: `STMT_${idx}`,
      headline: pat.headline,
      statement: pat.headline,
      polarity: 'supportive',
      strength: pat.dominance,
      confidence: 0.95,
      patternIds: [pat.patternId],
      signalIds: pat.signalIds,
      ruleIds: matchedRules[idx] ? [matchedRules[idx].ruleId] : [],
      evidenceIds: matchedRules[idx] ? [`EVD_${matchedRules[idx].ruleId}`] : [],
    }));

    // 6. Practical Implications & Guidance
    const implications: PracticalImplication[] = interpretations.map((interp, idx) => ({
      implicationId: `IMP_${idx}`,
      interpretationId: interp.interpretationId,
      context: 'Đời sống thực tế',
      manifestation: `Xu hướng biểu hiện rõ trong công việc và các mối quan hệ quan trọng.`,
    }));

    const guidance: Guidance[] = implications.map((imp, idx) => ({
      guidanceId: `GUI_${idx}`,
      implicationId: imp.implicationId,
      actionPriority: idx === 0 ? 'IMMEDIATE' : 'STRATEGIC',
      whatToContinue: ['Phát huy thế mạnh cốt lõi', 'Duy trì sự kiên định'],
      whatToAdjustOrStop: ['Tránh phản ứng hấp tấp khi áp lực gia tăng'],
      rationale: 'Hài hòa năng lượng để đạt kết quả bền vững.',
    }));

    // 7. Evidence References
    const evidence: EvidenceReference[] = [];
    matchedRules.forEach((rule) => {
      const trace = MysticosResultBuilder.tracer.traceRule(rule.ruleId);
      if (trace && trace.sources.length > 0) {
        evidence.push({
          evidenceId: `EVD_${rule.ruleId}`,
          ruleId: rule.ruleId,
          claimId: rule.claimIds[0] || 'CLM_GENERAL',
          sourceId: trace.sources[0].sourceId,
          sourceTitle: trace.sources[0].title,
          citation: MysticosResultBuilder.tracer.formatFootnote(rule.ruleId),
          evidenceLevel: rule.evidenceLevel,
        });
      }
    });

    return {
      resultId: `RES_${params.domain.toUpperCase()}_${Date.now()}`,
      domain: params.domain,
      inputSummary: params.inputSummary,
      facts: params.facts,
      semantics,
      signals,
      relationships,
      patterns,
      tensions: [],
      interpretations,
      implications,
      guidance,
      evidence,
      conflicts: [],
      technical: {
        calculationTimeMs: Date.now() - startTime,
        rulesEvaluatedCount: domainRules.length,
        rulesMatchedCount: matchedRules.length,
      },
      metadata: {
        engineVersion: '3.0.0',
        knowledgeBaseVersion: '2026.10',
        rulesVersion: '2026.10',
        school: params.school,
        deterministic: true,
        calculatedAt: new Date().toISOString(),
      },
    };
  }
}
```

Export in `packages/interpretation-engine/src/index.ts`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run packages/interpretation-engine/tests/result-builder.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add packages/interpretation-engine/src/result-builder.ts packages/interpretation-engine/src/index.ts packages/interpretation-engine/tests/result-builder.test.ts
git commit -m "feat(interpretation-engine): implement 17-layer MysticosResultBuilder"
```

---

### Task 4: Connect Domain Engines & API Routes to Emit `MysticosResult`

**Files:**
- Modify: `apps/web/app/api/tarot/draw/route.ts`
- Modify: `apps/web/app/api/astrology/chart/route.ts`
- Modify: `apps/web/app/api/tuvi/chart/route.ts`
- Modify: `apps/web/app/api/numerology/report/route.ts`
- Modify: `apps/web/app/api/compatibility/report/route.ts`
- Test: `apps/web/tests/api-contracts.test.ts`

**Interfaces:**
- Produces: APIs return `{ success: true, data: MysticosResult }`.

- [ ] **Step 1: Write test for API route contracts returning MysticosResult**

Create `apps/web/tests/api-contracts.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { MysticosResultBuilder } from '@mystic/interpretation-engine';

describe('API Route Contracts', () => {
  it('builds canonical result for tarot draw', () => {
    const res = MysticosResultBuilder.buildResult({
      domain: 'tarot',
      inputSummary: { cardCount: 1 },
      facts: [
        { key: 'cardCode', value: 'MAJOR_0', domain: 'tarot', source: 'draw' },
        { key: 'positionIndex', value: 0, domain: 'tarot', source: 'spread' },
        { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
      ],
      school: 'Rider-Waite-Smith',
    });
    expect(res.domain).toBe('tarot');
    expect(res.interpretations.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Update all 5 API routes in `apps/web/app/api/`**

Update `draw`, `chart`, `report` route handlers to call `MysticosResultBuilder.buildResult` and return `MysticosResult` directly in `data`.

- [ ] **Step 3: Run tests**

Run: `npx vitest run apps/web/tests/api-contracts.test.ts`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/api apps/web/tests/api-contracts.test.ts
git commit -m "feat(api): update domain endpoints to return canonical MysticosResult"
```

---

### Task 5: Rebuild Frontend with Pure `<MysticosResultViewer />` & `<WhyPanel />`

**Files:**
- Create: `apps/web/components/MysticosResultViewer.tsx`
- Create: `apps/web/components/WhyPanel.tsx`
- Modify: `apps/web/app/tarot/page.tsx`
- Modify: `apps/web/app/astrology/page.tsx`
- Modify: `apps/web/app/tu-vi/page.tsx`
- Modify: `apps/web/app/numerology/page.tsx`
- Modify: `apps/web/app/compatibility/page.tsx`

**Interfaces:**
- Produces: UI component `<MysticosResultViewer result={result} />` rendering the 5-tier editorial layout (Header, Insights, Patterns, Guidance, Why Panel) with zero JSX domain logic.

- [ ] **Step 1: Implement `apps/web/components/WhyPanel.tsx`**

Create component showing full provenance trace:
`Interpretation -> Pattern -> Signals -> Rules -> Atomic Claims -> S0/S1 Source Citations`.

- [ ] **Step 2: Implement `apps/web/components/MysticosResultViewer.tsx`**

Create pure viewer component implementing the 5-layer editorial design:
1. RAW DATA & HEADER
2. CALCULATED RESULT & INSIGHTS
3. PATTERNS & RELATIONSHIPS
4. PRACTICAL GUIDANCE
5. WHY PANEL

- [ ] **Step 3: Update 5 Domain Pages**

Refactor `/tarot`, `/astrology`, `/tu-vi`, `/numerology`, `/compatibility` in `apps/web/app/`:
Remove hardcoded `switch`, `case`, and paragraph text. Pass `result` directly to `<MysticosResultViewer result={result} />`.

- [ ] **Step 4: Run build and lint**

Run: `npm run --workspace=@mystic/web build`
Expected: Next.js clean build with 0 TypeScript/JSX errors.

- [ ] **Step 5: Commit**

```bash
git add apps/web/components apps/web/app
git commit -m "feat(web): implement MysticosResultViewer and WhyPanel across all domain pages"
```

---

### Task 6: Audit Documentation Suite (Section 33 `prompt/result.md`)

**Files:**
- Create: `docs/architecture/NEW_ARCHITECTURE.md`
- Create: `docs/architecture/MIGRATION_PLAN.md`
- Create: `docs/architecture/KNOWLEDGE_SCHEMA.md`
- Create: `docs/architecture/RULE_SCHEMA.md`
- Create: `docs/architecture/ENGINE_CONTRACTS.md`
- Create: `docs/architecture/RESULT_SCHEMA.md`
- Create: `docs/architecture/EVIDENCE_ARCHITECTURE.md`
- Create: `docs/architecture/LEGACY_AUDIT.md`

- [ ] **Step 1: Write all 8 required audit documents**

Document the 17-layer flow, canonical JSON schema, migration log of removed legacy text, and evidence network.

- [ ] **Step 2: Commit**

```bash
git add docs/architecture
git commit -m "docs(audit): publish architecture specifications and legacy audit suite"
```

---

### Task 7: Golden, Counterfactual & Determinism Test Suite

**Files:**
- Create: `packages/interpretation-engine/tests/counterfactual.test.ts`
- Create: `packages/interpretation-engine/tests/determinism.test.ts`

- [ ] **Step 1: Write determinism test (Same input x 100 = same output)**

Verify 100 runs produce bit-for-bit identical results.

- [ ] **Step 2: Write counterfactual & entity swap test**

Verify swapping input entities alters signals, patterns, and guidance meaningfully.

- [ ] **Step 3: Run all repository tests**

Run: `npm run test`
Expected: 100% test pass across all workspaces.

- [ ] **Step 4: Commit**

```bash
git add packages/interpretation-engine/tests
git commit -m "test(engines): add determinism and counterfactual verification suite"
```
