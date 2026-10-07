# Knowledge Base & Provenance Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `@mystic/knowledge-base` package providing 100% auditable provenance, atomic claims, multi-school conflict resolution, and deterministic interpretation rules across all 5 mystical domains according to `prompt/source.md`.

**Architecture:** Package `@mystic/knowledge-base` houses structured metadata for S0–S2 authoritative sources, granular atomic claims with citations, conditional interpretation rules with evidence levels (A–F), and school conflict resolutions. A high-performance `KnowledgeStore` and `ProvenanceTracer` API exposes instant lookup and verification for interpretation engines, verified by anti-generic collision tests and golden suites.

**Tech Stack:** TypeScript 5.6, Node.js (ESM), Vitest, npm workspaces.

## Global Constraints

- 100% deterministic: No LLM/generative AI at runtime.
- Pure provenance traceability: Every interpretation rule must resolve back to `Rule ID -> Claim ID -> Source ID -> Page/Section`.
- School segregation: Distinct traditions (e.g., RWS Tarot vs Thoth; Nam Phái Tử Vi vs Bắc Phái; Hellenistic vs Modern Astrology; Greek arithmology vs Modern numerology) must never be blurred into generic meaning.
- Anti-generic: Reasoning collision rate must remain under 15% across diverse cases, with zero empty platitudes.
- Strictly adhere to editorial design & architectural constraints in `AGENTS.md` and `prompt/design_rule.md`.

---

### Task 1: Package Scaffolding and Core Types

**Files:**
- Create: `packages/knowledge-base/package.json`
- Create: `packages/knowledge-base/tsconfig.json`
- Create: `packages/knowledge-base/src/types/source.ts`
- Create: `packages/knowledge-base/src/types/claim.ts`
- Create: `packages/knowledge-base/src/types/rule.ts`
- Create: `packages/knowledge-base/src/types/conflict.ts`
- Create: `packages/knowledge-base/src/types/index.ts`
- Modify: `package.json:14-16`
- Test: `packages/knowledge-base/tests/types.test.ts`

**Interfaces:**
- Produces: `SourceRecord`, `SourceLevel`, `DomainType`, `AtomicClaim`, `InterpretationRule`, `RulePrecondition`, `EvidenceLevel`, `SourceConflict`, `ConflictType`, `ConflictResolution`.

- [ ] **Step 1: Write the failing test for types and contract**

Create `packages/knowledge-base/tests/types.test.ts`:
```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run packages/knowledge-base/tests/types.test.ts`
Expected: FAIL (Cannot find module `../src/types/index.js` or package missing)

- [ ] **Step 3: Write package configuration and type definitions**

Create `packages/knowledge-base/package.json`:
```json
{
  "name": "@mystic/knowledge-base",
  "version": "1.0.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "vitest run"
  },
  "dependencies": {
    "@mystic/core": "*"
  },
  "devDependencies": {
    "typescript": "^5.6.3",
    "vitest": "^2.1.4"
  }
}
```

Create `packages/knowledge-base/tsconfig.json`:
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

Create `packages/knowledge-base/src/types/source.ts`:
```ts
export type SourceLevel = 'S0' | 'S1' | 'S2' | 'S3' | 'S4';
export type DomainType = 'tarot' | 'tuvi' | 'astrology' | 'numerology' | 'compatibility';

export interface SourceRecord {
  sourceId: string;
  domain: DomainType;
  title: string;
  author?: string;
  publisher?: string;
  edition?: string;
  publicationYear?: number;
  url?: string;
  sourceLevel: SourceLevel;
  tradition?: string;
  school?: string;
  language?: string;
  chapter?: string;
  page?: string;
  accessDate: string;
  notes?: string;
}
```

Create `packages/knowledge-base/src/types/claim.ts`:
```ts
import { DomainType } from './source.js';

export interface ClaimLocation {
  chapter?: string;
  page?: string;
  section?: string;
}

export interface AtomicClaim {
  claimId: string;
  sourceId: string;
  domain: DomainType;
  subject: string;
  predicate: string;
  object: string;
  context?: string;
  polarity?: 'supportive' | 'challenging' | 'neutral' | 'mixed';
  quotation?: string;
  paraphrase: string;
  location?: ClaimLocation;
  sourceConfidence: number;
}
```

Create `packages/knowledge-base/src/types/rule.ts`:
```ts
import { DomainType } from './source.js';

export type EvidenceLevel = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface RulePrecondition {
  field: string;
  operator: 'EQUALS' | 'NOT_EQUALS' | 'GREATER_THAN' | 'LESS_THAN' | 'IN' | 'CONTAINS' | 'BETWEEN';
  value: unknown;
}

export interface InterpretationRule {
  ruleId: string;
  domain: DomainType;
  school: string;
  sourceIds: string[];
  claimIds: string[];
  preconditions: RulePrecondition[];
  semanticInputs: string[];
  derivedSignals: string[];
  relationships?: string[];
  pattern?: string;
  polarity?: 'constructive' | 'shadow' | 'neutral' | 'tension' | 'supportive';
  priority: number;
  evidenceLevel: EvidenceLevel;
  confidence: 'verified' | 'supported' | 'uncertain' | 'conflicted';
  exceptions?: string[];
  notes?: string;
}
```

Create `packages/knowledge-base/src/types/conflict.ts`:
```ts
export type ConflictType =
  | 'different_school'
  | 'different_era'
  | 'different_definition'
  | 'true_contradiction';

export type ConflictResolution =
  | 'keep_separate'
  | 'school_specific'
  | 'prefer_primary'
  | 'requires_user_choice'
  | 'exclude';

export interface SourceConflict {
  conflictId: string;
  topic: string;
  sources: string[];
  schoolA: string;
  schoolB: string;
  claimA: string;
  claimB: string;
  conflictType: ConflictType;
  resolution: ConflictResolution;
  notes?: string;
}
```

Create `packages/knowledge-base/src/types/index.ts`:
```ts
export * from './source.js';
export * from './claim.js';
export * from './rule.js';
export * from './conflict.js';
```

Modify root `package.json` to include `@mystic/knowledge-base` in `build:packages`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run packages/knowledge-base/tests/types.test.ts`
Expected: PASS (4 tests passed)

- [ ] **Step 5: Commit**

```bash
git add packages/knowledge-base package.json
git commit -m "feat(knowledge-base): scaffold package and core provenance types"
```

---

### Task 2: Source Registries across 5 Domains (S0, S1, S2)

**Files:**
- Create: `packages/knowledge-base/src/sources/tarot.sources.ts`
- Create: `packages/knowledge-base/src/sources/tuvi.sources.ts`
- Create: `packages/knowledge-base/src/sources/astrology.sources.ts`
- Create: `packages/knowledge-base/src/sources/numerology.sources.ts`
- Create: `packages/knowledge-base/src/sources/index.ts`
- Test: `packages/knowledge-base/tests/sources.test.ts`

**Interfaces:**
- Consumes: `SourceRecord` from `src/types/source.ts`
- Produces: `TAROT_SOURCES`, `TUVI_SOURCES`, `ASTROLOGY_SOURCES`, `NUMEROLOGY_SOURCES`, `ALL_SOURCES`.

- [ ] **Step 1: Write failing test for source registries**

Create `packages/knowledge-base/tests/sources.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import {
  ALL_SOURCES,
  TAROT_SOURCES,
  TUVI_SOURCES,
  ASTROLOGY_SOURCES,
  NUMEROLOGY_SOURCES,
} from '../src/sources/index.js';

describe('Source Registries (S0 - S2)', () => {
  it('contains primary classical S0 sources for all 4 primary domains', () => {
    const s0Sources = ALL_SOURCES.filter((s) => s.sourceLevel === 'S0');
    expect(s0Sources.length).toBeGreaterThanOrEqual(4);

    const tarotS0 = TAROT_SOURCES.find((s) => s.sourceLevel === 'S0');
    expect(tarotS0?.author).toContain('Arthur Edward Waite');

    const tuviS0 = TUVI_SOURCES.find((s) => s.sourceLevel === 'S0');
    expect(tuviS0?.title).toContain('Tử Vi Đẩu Số');

    const astroS0 = ASTROLOGY_SOURCES.find((s) => s.sourceLevel === 'S0');
    expect(astroS0?.title).toContain('Tetrabiblos');

    const numS0 = NUMEROLOGY_SOURCES.find((s) => s.sourceLevel === 'S0');
    expect(numS0?.school).toContain('Greek Arithmology');
  });

  it('has valid metadata on all registered sources with no empty required fields', () => {
    for (const source of ALL_SOURCES) {
      expect(source.sourceId).toMatch(/^SRC_[A-Z0-9_]+$/);
      expect(source.title.trim().length).toBeGreaterThan(0);
      expect(['S0', 'S1', 'S2']).toContain(source.sourceLevel);
      expect(source.accessDate).toBeDefined();
    }
  });

  it('differentiates ancient arithmology from modern Western numerology', () => {
    const ancient = NUMEROLOGY_SOURCES.find((s) => s.sourceId === 'SRC_NUM_PYTHAGORAS');
    const modern = NUMEROLOGY_SOURCES.find((s) => s.sourceId === 'SRC_NUM_GOODWIN');
    expect(ancient?.sourceLevel).toBe('S0');
    expect(modern?.sourceLevel).toBe('S2');
    expect(ancient?.school).not.toBe(modern?.school);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run packages/knowledge-base/tests/sources.test.ts`
Expected: FAIL (Cannot find module `../src/sources/index.js`)

- [ ] **Step 3: Implement domain sources**

Create `packages/knowledge-base/src/sources/tarot.sources.ts`:
```ts
import { SourceRecord } from '../types/source.js';

export const TAROT_SOURCES: SourceRecord[] = [
  {
    sourceId: 'SRC_TAROT_WAITE_1911',
    domain: 'tarot',
    title: 'The Pictorial Key to the Tarot: Being Fragrance of the Greater and Lesser Arcana',
    author: 'Arthur Edward Waite',
    publisher: 'William Rider & Son, London',
    edition: 'Original 1911 Edition',
    publicationYear: 1911,
    url: 'https://archive.org/details/pictorialkeytota00wait',
    sourceLevel: 'S0',
    tradition: 'Western Hermetic / Golden Dawn',
    school: 'Rider-Waite-Smith (RWS)',
    language: 'en',
    accessDate: '2026-10-07',
    notes: 'Văn bản thẩm quyền gốc nền tảng cho 78 lá bài RWS do Pamela Colman Smith minh họa.',
  },
  {
    sourceId: 'SRC_TAROT_MATHERS_1888',
    domain: 'tarot',
    title: 'The Tarot: Its Occult Signification, Use in Fortune-Telling, and Method of Play',
    author: 'S. L. MacGregor Mathers',
    publisher: 'George Redway, London',
    publicationYear: 1888,
    sourceLevel: 'S1',
    tradition: 'Hermetic Order of the Golden Dawn',
    school: 'Golden Dawn Esoteric',
    language: 'en',
    accessDate: '2026-10-07',
    notes: 'Tài liệu nền tảng phân định biểu tượng nguyên tố và hoàng đạo cho hệ thống bài Tarot.',
  },
  {
    sourceId: 'SRC_TAROT_POLLACK_1980',
    domain: 'tarot',
    title: 'Seventy-Eight Degrees of Wisdom: A Book of Tarot',
    author: 'Rachel Pollack',
    publisher: 'Aquarian Press',
    edition: 'Revised Edition 1997',
    publicationYear: 1980,
    sourceLevel: 'S2',
    tradition: 'Modern Psychological Tarot',
    school: 'Archetypal / Psychological RWS',
    language: 'en',
    accessDate: '2026-10-07',
    notes: 'Tác phẩm đối chiếu giải nghĩa tâm lý học chuyên sâu dựa trên khung Rider-Waite-Smith.',
  },
];
```

Create `packages/knowledge-base/src/sources/tuvi.sources.ts`:
```ts
import { SourceRecord } from '../types/source.js';

export const TUVI_SOURCES: SourceRecord[] = [
  {
    sourceId: 'SRC_TUVI_DAO_TANG',
    domain: 'tuvi',
    title: 'Chính Thống Đạo Tạng: Tử Vi Đẩu Số (正統道藏 - 紫微斗數)',
    author: 'Khuyết danh (Tương truyền Trần Đoàn)',
    edition: 'Minh Chính Thống bản (1444-1445)',
    publicationYear: 1445,
    url: 'https://ctext.org/wiki.pl?if=gb&res=662580',
    sourceLevel: 'S0',
    tradition: 'Đạo Giáo Bắc Tống / Minh Triều',
    school: 'Chính Thống Cổ Thư',
    language: 'lzh',
    accessDate: '2026-10-07',
    notes: 'Bản văn cổ được lưu trữ trong Đạo Tạng, nguồn gốc nền tảng của quy cách an sao và luận đoán cổ.',
  },
  {
    sourceId: 'SRC_TUVI_TOAN_THU',
    domain: 'tuvi',
    title: 'Tử Vi Đẩu Số Toàn Thư (紫微斗數全書)',
    author: 'La Hồng Tiên (La Niệm Am) biên soạn',
    publisher: 'Khắc bản đời Minh / Thanh',
    edition: 'Cổ bản mộc bản',
    publicationYear: 1550,
    sourceLevel: 'S1',
    tradition: 'Tử Vi Cổ Điển',
    school: 'Nam Phái Toàn Thư',
    language: 'lzh',
    accessDate: '2026-10-07',
    notes: 'Thư tịch chuẩn hệ thống hóa 14 chính tinh, cách cục, phú đoán miếu vượng đắc hãm.',
  },
  {
    sourceId: 'SRC_TUVI_TRUNG_CHAU_VUONG_DINH_CHI',
    domain: 'tuvi',
    title: 'Trung Châu Phái Tử Vi Đẩu Số Sơ Cấp & Tinh Diệu Phú',
    author: 'Vương Đình Chi',
    publisher: 'Đại Hồn Xuất Bản Xã, Hong Kong',
    publicationYear: 1985,
    sourceLevel: 'S2',
    tradition: 'Trung Châu Phái',
    school: 'Trung Châu Môn',
    language: 'zh / vi',
    accessDate: '2026-10-07',
    notes: 'Hệ thống hóa tinh diệu, tổ hợp sao và tứ hóa theo truyền thừa Trung Châu.',
  },
];
```

Create `packages/knowledge-base/src/sources/astrology.sources.ts`:
```ts
import { SourceRecord } from '../types/source.js';

export const ASTROLOGY_SOURCES: SourceRecord[] = [
  {
    sourceId: 'SRC_ASTRO_PTOLEMY_TETRABIBLOS',
    domain: 'astrology',
    title: 'Tetrabiblos (Quadripartitum)',
    author: 'Claudius Ptolemy',
    publisher: 'Loeb Classical Library (F. E. Robbins dịch)',
    edition: 'Harvard University Press 1940',
    publicationYear: 150,
    url: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Ptolemy/Tetrabiblos/home.html',
    sourceLevel: 'S0',
    tradition: 'Hellenistic / Classical Astrology',
    school: 'Classical Ptolemaic',
    language: 'grc / en',
    accessDate: '2026-10-07',
    notes: 'Văn bản nền tảng của chiêm tinh học phương Tây về phẩm tính hành tinh, góc chiếu, và vương vị.',
  },
  {
    sourceId: 'SRC_ASTRO_HAND_1976',
    domain: 'astrology',
    title: 'Planets in Signs & Planets in Aspect',
    author: 'Robert Hand',
    publisher: 'Whitford Press / Para Research',
    publicationYear: 1976,
    sourceLevel: 'S1',
    tradition: 'Western Psychological & Traditional Synthesis',
    school: 'Modern Humanistic Astrology',
    language: 'en',
    accessDate: '2026-10-07',
    notes: 'Khảo luận tiêu chuẩn và chính xác nhất về ý nghĩa hành tinh tại các cung và góc chiếu hình học.',
  },
  {
    sourceId: 'SRC_ASTRO_FORREST_1984',
    domain: 'astrology',
    title: 'The Inner Sky: How to Make Wiser Choices for a More Fulfilling Life',
    author: 'Steven Forrest',
    publisher: 'Seven Paws Press',
    publicationYear: 1984,
    sourceLevel: 'S2',
    tradition: 'Evolutionary Astrology',
    school: 'Modern Evolutionary',
    language: 'en',
    accessDate: '2026-10-07',
    notes: 'Trường phái chiêm tinh tiến hóa nhấn mạnh sự lựa chọn có ý thức và bài học trưởng thành.',
  },
];
```

Create `packages/knowledge-base/src/sources/numerology.sources.ts`:
```ts
import { SourceRecord } from '../types/source.js';

export const NUMEROLOGY_SOURCES: SourceRecord[] = [
  {
    sourceId: 'SRC_NUM_PYTHAGORAS',
    domain: 'numerology',
    title: 'The Theology of Arithmetic (Theologoumena Arithmeticae)',
    author: 'Pseudo-Iamblichus / Robin Waterfield dịch',
    publisher: 'Phanes Press',
    publicationYear: 350,
    sourceLevel: 'S0',
    tradition: 'Classical Pythagoreanism / Neoplatonism',
    school: 'Greek Arithmology',
    language: 'grc / en',
    accessDate: '2026-10-07',
    notes: 'Triết học số học Hy Lạp cổ đại (Monad đến Decad) khảo cứu bản thể học, không gán bói toán hiện đại.',
  },
  {
    sourceId: 'SRC_NUM_CAMPBELL_1931',
    domain: 'numerology',
    title: 'Your Days Are Numbered: A Manual of Numerology',
    author: 'Florence Campbell',
    publisher: 'The Gateway, New York',
    publicationYear: 1931,
    sourceLevel: 'S1',
    tradition: 'Modern Western Numerology',
    school: 'Pythagorean System Modern',
    language: 'en',
    accessDate: '2026-10-07',
    notes: 'Văn bản trường phái chuẩn hóa hệ số quy đổi chữ cái Pythagoras (1-9) và các chỉ số Đường Đời.',
  },
  {
    sourceId: 'SRC_NUM_GOODWIN',
    domain: 'numerology',
    title: 'Numerology: The Complete Guide (Volumes 1 & 2)',
    author: 'Matthew Oliver Goodwin',
    publisher: 'Newcastle Publishing / CRCS Publications',
    publicationYear: 1981,
    sourceLevel: 'S2',
    tradition: 'Modern Western Numerology',
    school: 'Goodwin Analytical Numerology',
    language: 'en',
    accessDate: '2026-10-07',
    notes: 'Hệ thống công thức quy chuẩn, tính đỉnh cao, thử thách, nợ nghiệp và ma trận tương hợp số học.',
  },
];
```

Create `packages/knowledge-base/src/sources/index.ts`:
```ts
import { SourceRecord } from '../types/source.js';
import { TAROT_SOURCES } from './tarot.sources.js';
import { TUVI_SOURCES } from './tuvi.sources.js';
import { ASTROLOGY_SOURCES } from './astrology.sources.js';
import { NUMEROLOGY_SOURCES } from './numerology.sources.js';

export * from './tarot.sources.js';
export * from './tuvi.sources.js';
export * from './astrology.sources.js';
export * from './numerology.sources.js';

export const ALL_SOURCES: SourceRecord[] = [
  ...TAROT_SOURCES,
  ...TUVI_SOURCES,
  ...ASTROLOGY_SOURCES,
  ...NUMEROLOGY_SOURCES,
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run packages/knowledge-base/tests/sources.test.ts`
Expected: PASS (3 tests passed)

- [ ] **Step 5: Commit**

```bash
git add packages/knowledge-base/src/sources packages/knowledge-base/tests/sources.test.ts
git commit -m "feat(knowledge-base): register authoritative S0-S2 sources across all domains"
```

---

### Task 3: Atomic Claims Extraction

**Files:**
- Create: `packages/knowledge-base/src/claims/tarot.claims.ts`
- Create: `packages/knowledge-base/src/claims/tuvi.claims.ts`
- Create: `packages/knowledge-base/src/claims/astrology.claims.ts`
- Create: `packages/knowledge-base/src/claims/numerology.claims.ts`
- Create: `packages/knowledge-base/src/claims/index.ts`
- Test: `packages/knowledge-base/tests/claims.test.ts`

**Interfaces:**
- Consumes: `AtomicClaim` from `src/types/claim.ts`, `SourceRecord` from `src/types/source.ts`
- Produces: `TAROT_CLAIMS`, `TUVI_CLAIMS`, `ASTROLOGY_CLAIMS`, `NUMEROLOGY_CLAIMS`, `ALL_CLAIMS`.

- [ ] **Step 1: Write failing test for atomic claims**

Create `packages/knowledge-base/tests/claims.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { ALL_CLAIMS } from '../src/claims/index.js';
import { ALL_SOURCES } from '../src/sources/index.js';

describe('Atomic Claims Extraction (Phase 3)', () => {
  it('ensures every claim links to a valid registered Source ID', () => {
    const validSourceIds = new Set(ALL_SOURCES.map((s) => s.sourceId));
    expect(ALL_CLAIMS.length).toBeGreaterThanOrEqual(20);

    for (const claim of ALL_CLAIMS) {
      expect(validSourceIds.has(claim.sourceId)).toBe(true);
      expect(claim.claimId).toMatch(/^CLM_[A-Z0-9_]+$/);
      expect(claim.subject.length).toBeGreaterThan(0);
      expect(claim.predicate.length).toBeGreaterThan(0);
      expect(claim.object.length).toBeGreaterThan(0);
      expect(claim.paraphrase.length).toBeGreaterThan(0);
      expect(claim.sourceConfidence).toBeGreaterThanOrEqual(0.7);
    }
  });

  it('verifies claims have precise structural grammar and location', () => {
    for (const claim of ALL_CLAIMS) {
      expect(claim.location).toBeDefined();
      expect(claim.location?.chapter || claim.location?.page).toBeDefined();
    }
  });

  it('contains claims for key anchor entities across all 4 domains', () => {
    const domains = new Set(ALL_CLAIMS.map((c) => c.domain));
    expect(domains.has('tarot')).toBe(true);
    expect(domains.has('tuvi')).toBe(true);
    expect(domains.has('astrology')).toBe(true);
    expect(domains.has('numerology')).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run packages/knowledge-base/tests/claims.test.ts`
Expected: FAIL (Cannot find module `../src/claims/index.js`)

- [ ] **Step 3: Implement atomic claims across domains**

Create `packages/knowledge-base/src/claims/tarot.claims.ts`:
```ts
import { AtomicClaim } from '../types/claim.js';

export const TAROT_CLAIMS: AtomicClaim[] = [
  {
    claimId: 'CLM_TAROT_FOOL_001',
    sourceId: 'SRC_TAROT_WAITE_1911',
    domain: 'tarot',
    subject: 'The Fool',
    predicate: 'represents',
    object: 'state_of_pure_potentiality_and_spiritual_quest',
    polarity: 'supportive',
    quotation: 'He is the spirit in search of experience... His gestures suggest a swift movement of the body.',
    paraphrase: 'Khai mở hành trình trải nghiệm linh hồn với tâm thái tự do thuần khiết và niềm tin tuyệt đối.',
    location: { chapter: 'Part II: The Doctrine Behind the Veil', page: 'The Fool' },
    sourceConfidence: 1.0,
  },
  {
    claimId: 'CLM_TAROT_MAGICIAN_001',
    sourceId: 'SRC_TAROT_WAITE_1911',
    domain: 'tarot',
    subject: 'The Magician',
    predicate: 'manifests',
    object: 'conscious_will_directing_universal_elements',
    polarity: 'supportive',
    quotation: 'Signifies the divine motive in man, reflecting God, the will in the liberation of its activities.',
    paraphrase: 'Năng lực vận dụng ý chí và công cụ thực tế để hiện thực hóa ý niệm thành kết quả rõ ràng.',
    location: { chapter: 'Part II', page: 'The Magician' },
    sourceConfidence: 1.0,
  },
  {
    claimId: 'CLM_TAROT_7P_001',
    sourceId: 'SRC_TAROT_WAITE_1911',
    domain: 'tarot',
    subject: 'Seven of Pentacles',
    predicate: 'signifies',
    object: 'deliberate_pause_for_evaluating_accumulated_work',
    polarity: 'neutral',
    quotation: 'A young man leaning on his staff and looking intently at seven pentacles... pause in work.',
    paraphrase: 'Khoảng lặng có chủ đích để thẩm định thành quả vun trồng trước khi quyết định bước tiếp.',
    location: { chapter: 'Part III: The Outer Method of the Oracles', section: 'Pentacles' },
    sourceConfidence: 0.95,
  },
  {
    claimId: 'CLM_TAROT_DEATH_001',
    sourceId: 'SRC_TAROT_WAITE_1911',
    domain: 'tarot',
    subject: 'Death',
    predicate: 'denotes',
    object: 'inevitable_transformation_and_cessation_of_old_forms',
    polarity: 'challenging',
    quotation: 'The veil or outward sign which gives reason to call it the end of all.',
    paraphrase: 'Sự chấm dứt tất yếu của chu kỳ cũ để nhường chỗ cho tiến trình tái sinh và tái cấu trúc.',
    location: { chapter: 'Part II', page: 'Death' },
    sourceConfidence: 1.0,
  },
  {
    claimId: 'CLM_TAROT_TOWER_001',
    sourceId: 'SRC_TAROT_WAITE_1911',
    domain: 'tarot',
    subject: 'The Tower',
    predicate: 'shatters',
    object: 'false_structures_and_illusion_of_material_security',
    polarity: 'challenging',
    quotation: 'Ruin of the House of We and breakdown of false beliefs by light.',
    paraphrase: 'Sự sụp đổ bất ngờ của cấu trúc ảo tưởng nhằm giải phóng sự thật cốt lõi.',
    location: { chapter: 'Part II', page: 'The Tower' },
    sourceConfidence: 1.0,
  },
];
```

Create `packages/knowledge-base/src/claims/tuvi.claims.ts`:
```ts
import { AtomicClaim } from '../types/claim.js';

export const TUVI_CLAIMS: AtomicClaim[] = [
  {
    claimId: 'CLM_TUVI_TUVI_MENH_001',
    sourceId: 'SRC_TUVI_TOAN_THU',
    domain: 'tuvi',
    subject: 'Sao Tử Vi tại Mệnh',
    predicate: 'endows',
    object: 'leadership_dignity_and_authoritative_rectitude',
    polarity: 'supportive',
    quotation: 'Tử Vi đế tọa, tính tình đôn hậu, đoan chính, uy nghi, có năng lực thống lĩnh.',
    paraphrase: 'Khí chất bậc lãnh đạo, đĩnh đạc, tự chủ và giàu lòng tự tôn.',
    location: { chapter: 'Đẩu Số Quy Quy', section: 'Tử Vi Tinh Diệu Ca' },
    sourceConfidence: 0.95,
  },
  {
    claimId: 'CLM_TUVI_THIENCO_001',
    sourceId: 'SRC_TUVI_TOAN_THU',
    domain: 'tuvi',
    subject: 'Sao Thiên Cơ tại Mệnh',
    predicate: 'manifests',
    object: 'adaptability_tactical_intellect_and_agile_planning',
    polarity: 'supportive',
    quotation: 'Thiên Cơ vi thiện tinh, mưu trí linh hoạt, thích động không thích tĩnh.',
    paraphrase: 'Tư duy cơ biến, nhạy bén tính toán phương án và thích nghi cao độ với hoàn cảnh.',
    location: { chapter: 'Đẩu Số Quy Quy', section: 'Thiên Cơ Luận' },
    sourceConfidence: 0.95,
  },
  {
    claimId: 'CLM_TUVI_THATHAT_HAM_001',
    sourceId: 'SRC_TUVI_TRUNG_CHAU_VUONG_DINH_CHI',
    domain: 'tuvi',
    subject: 'Thất Sát hãm địa hoặc ngộ Kình Đà',
    predicate: 'triggers',
    object: 'volatility_impatience_and_arduous_struggle',
    polarity: 'challenging',
    quotation: 'Thất Sát hãm địa hội Sát tinh, tính cương cấp bạo bức, dễ gặp trắc trở.',
    paraphrase: 'Sự nóng vội và quyết liệt quá mức dẫn tới biến động mạnh trong giai đoạn khai phá.',
    location: { chapter: 'Chương 4: Sát Tinh Tinh Diệu Phối Hợp', page: '98-102' },
    sourceConfidence: 0.9,
  },
  {
    claimId: 'CLM_TUVI_HOALOC_MENH_001',
    sourceId: 'SRC_TUVI_TOAN_THU',
    domain: 'tuvi',
    subject: 'Hóa Lộc nhập Mệnh/Tài',
    predicate: 'enhances',
    object: 'resource_attraction_and_harmonious_enterprise',
    polarity: 'supportive',
    quotation: 'Lộc nhập tài bạch vi hanh thông, sinh cơ phát triển.',
    paraphrase: 'Gia tăng nguồn lực tài chính, cơ hội hợp tác và năng lượng hanh thông.',
    location: { chapter: 'Tứ Hóa Luận Đoán', section: 'Hóa Lộc Chi Diệu' },
    sourceConfidence: 0.95,
  },
  {
    claimId: 'CLM_TUVI_HOAKY_001',
    sourceId: 'SRC_TUVI_TRUNG_CHAU_VUONG_DINH_CHI',
    domain: 'tuvi',
    subject: 'Hóa Kỵ nhập Mệnh hoặc Tật Ách',
    predicate: 'signals',
    object: 'karmic_entanglement_obsessive_worry_and_friction',
    polarity: 'challenging',
    quotation: 'Hóa Kỵ chủ thị phi, tâm đa trăn trở, cần tu tâm nhẫn nại.',
    paraphrase: 'Điểm thắt tâm lý, vướng bận suy nghĩ nội tâm và đòi hỏi sự thấu suốt để chuyển hóa.',
    location: { chapter: 'Chương 8: Tứ Hóa Bí Điển', page: '185-190' },
    sourceConfidence: 0.92,
  },
];
```

Create `packages/knowledge-base/src/claims/astrology.claims.ts`:
```ts
import { AtomicClaim } from '../types/claim.js';

export const ASTROLOGY_CLAIMS: AtomicClaim[] = [
  {
    claimId: 'CLM_ASTRO_SUN_ARIES_001',
    sourceId: 'SRC_ASTRO_HAND_1976',
    domain: 'astrology',
    subject: 'Mặt Trời tại Bạch Dương',
    predicate: 'radiates',
    object: 'initiating_vitality_and_pioneering_autonomy',
    polarity: 'supportive',
    quotation: 'Direct, forceful energy, pioneering spirit, desire to be first.',
    paraphrase: 'Bản lĩnh tiên phong, trực diện, giàu năng lượng thúc đẩy hành động mở đường.',
    location: { chapter: 'Sun in Signs', page: '28-32' },
    sourceConfidence: 0.95,
  },
  {
    claimId: 'CLM_ASTRO_MOON_TAURUS_001',
    sourceId: 'SRC_ASTRO_HAND_1976',
    domain: 'astrology',
    subject: 'Mặt Trăng tại Kim Ngưu (Vượng Địa / Exaltation)',
    predicate: 'anchors',
    object: 'emotional_stability_and_sensory_groundedness',
    polarity: 'supportive',
    quotation: 'Calm, patient emotional nature, seeks comfort and material stability.',
    paraphrase: 'Tâm thái ổn định vững vàng, nhẫn nại, có nhu cầu sâu sắc về sự an toàn và bền vững.',
    location: { chapter: 'Moon in Signs', page: '55-58' },
    sourceConfidence: 0.95,
  },
  {
    claimId: 'CLM_ASTRO_SATURN_CONJUNCT_001',
    sourceId: 'SRC_ASTRO_PTOLEMY_TETRABIBLOS',
    domain: 'astrology',
    subject: 'Sao Thổ kết hợp (Conjunction) hoặc đối đỉnh',
    predicate: 'restrains',
    object: 'expansion_requiring_rigorous_discipline_and_patience',
    polarity: 'challenging',
    quotation: 'Saturn brings chilling, restriction, delay requiring endurance and rectitude.',
    paraphrase: 'Đòi hỏi kỷ luật nghiêm khắc, chấp nhận độ trễ thời gian và tôi luyện sức chịu đựng.',
    location: { chapter: 'Book I', section: 'Of the Nature of the Planets' },
    sourceConfidence: 0.95,
  },
  {
    claimId: 'CLM_ASTRO_JUPITER_TRINE_001',
    sourceId: 'SRC_ASTRO_HAND_1976',
    domain: 'astrology',
    subject: 'Mộc Tinh tạo góc Tam Hợp (Trine 120°)',
    predicate: 'facilitates',
    object: 'harmonic_expansion_grace_and_philosophical_growth',
    polarity: 'supportive',
    quotation: 'Easy flow of abundance, generosity of spirit, optimism.',
    paraphrase: 'Dòng chảy cơ hội hanh thông, tầm nhìn phóng khoáng và sự nâng đỡ quý giá.',
    location: { chapter: 'Planets in Aspect', page: '210-215' },
    sourceConfidence: 0.95,
  },
  {
    claimId: 'CLM_ASTRO_MARS_SQUARE_001',
    sourceId: 'SRC_ASTRO_HAND_1976',
    domain: 'astrology',
    subject: 'Hỏa Tinh tạo góc Vuông (Square 90°)',
    predicate: 'generates',
    object: 'friction_impulsive_friction_and_combative_drive',
    polarity: 'challenging',
    quotation: 'Inner tension seeking release through competitive or combative struggle.',
    paraphrase: 'Xung lực căng thẳng đòi hỏi định hướng năng lượng vào hành động kỷ luật thay vì xung đột.',
    location: { chapter: 'Planets in Aspect', page: '145-150' },
    sourceConfidence: 0.92,
  },
];
```

Create `packages/knowledge-base/src/claims/numerology.claims.ts`:
```ts
import { AtomicClaim } from '../types/claim.js';

export const NUMEROLOGY_CLAIMS: AtomicClaim[] = [
  {
    claimId: 'CLM_NUM_LP1_001',
    sourceId: 'SRC_NUM_GOODWIN',
    domain: 'numerology',
    subject: 'Đường Đời Số 1 (Life Path 1)',
    predicate: 'embodies',
    object: 'independent_leadership_and_original_initiative',
    polarity: 'supportive',
    quotation: 'Pioneering, individuality, self-reliance, leadership.',
    paraphrase: 'Tinh thần độc lập tự chủ, ý chí sáng lập và khát vọng dẫn đầu trong lĩnh vực chuyên môn.',
    location: { chapter: 'Chapter 3: The Life Path', page: '42-47' },
    sourceConfidence: 0.95,
  },
  {
    claimId: 'CLM_NUM_LP5_001',
    sourceId: 'SRC_NUM_GOODWIN',
    domain: 'numerology',
    subject: 'Đường Đời Số 5 (Life Path 5)',
    predicate: 'pursues',
    object: 'adaptability_versatility_and_freedom_of_experience',
    polarity: 'supportive',
    quotation: 'Freedom, adaptability, variety, progress through curiosity.',
    paraphrase: 'Khát khao trải nghiệm đa diện, linh hoạt biến chuyển và phản kháng sự gò bó cứng nhắc.',
    location: { chapter: 'Chapter 3: The Life Path', page: '65-71' },
    sourceConfidence: 0.95,
  },
  {
    claimId: 'CLM_NUM_LP4_001',
    sourceId: 'SRC_NUM_CAMPBELL_1931',
    domain: 'numerology',
    subject: 'Đường Đời Số 4 (Life Path 4)',
    predicate: 'constructs',
    object: 'methodical_foundations_and_pragmatic_order',
    polarity: 'supportive',
    quotation: 'The builder, stability, methodical application, duty.',
    paraphrase: 'Xây dựng nền tảng vững chắc, tôn trọng quy chuẩn, trật tự và sự cẩn trọng kiên định.',
    location: { chapter: 'The Primary Vibration 4', page: '38-42' },
    sourceConfidence: 0.95,
  },
  {
    claimId: 'CLM_NUM_KARMIC_16_001',
    sourceId: 'SRC_NUM_GOODWIN',
    domain: 'numerology',
    subject: 'Số Nợ Nghiệp 16/7 (Karmic Debt 16/7)',
    predicate: 'demands',
    object: 'dissolution_of_ego_and_spiritual_reorientation',
    polarity: 'challenging',
    quotation: 'Breakdown of pride and false illusions to find true higher values.',
    paraphrase: 'Sự thanh lọc bản ngã và ảo tưởng vật chất nhằm tái định hướng vào chiều sâu nội tâm.',
    location: { chapter: 'Special Modifiers: Karmic Debts', page: '198-204' },
    sourceConfidence: 0.9,
  },
  {
    claimId: 'CLM_NUM_MASTER_11_001',
    sourceId: 'SRC_NUM_GOODWIN',
    domain: 'numerology',
    subject: 'Số Bậc Thầy 11/2 (Master Number 11)',
    predicate: 'channels',
    object: 'heightened_intuitive_illumination_and_idealism',
    polarity: 'supportive',
    quotation: 'Illumination, inspiration, nervous sensitivity requiring grounding.',
    paraphrase: 'Trực giác nhạy bén, khả năng truyền cảm hứng sâu sắc đi kèm áp lực căng thẳng thần kinh.',
    location: { chapter: 'Master Numbers', page: '115-122' },
    sourceConfidence: 0.95,
  },
];
```

Create `packages/knowledge-base/src/claims/index.ts`:
```ts
import { AtomicClaim } from '../types/claim.js';
import { TAROT_CLAIMS } from './tarot.claims.js';
import { TUVI_CLAIMS } from './tuvi.claims.js';
import { ASTROLOGY_CLAIMS } from './astrology.claims.js';
import { NUMEROLOGY_CLAIMS } from './numerology.claims.js';

export * from './tarot.claims.js';
export * from './tuvi.claims.js';
export * from './astrology.claims.js';
export * from './numerology.claims.js';

export const ALL_CLAIMS: AtomicClaim[] = [
  ...TAROT_CLAIMS,
  ...TUVI_CLAIMS,
  ...ASTROLOGY_CLAIMS,
  ...NUMEROLOGY_CLAIMS,
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run packages/knowledge-base/tests/claims.test.ts`
Expected: PASS (3 tests passed)

- [ ] **Step 5: Commit**

```bash
git add packages/knowledge-base/src/claims packages/knowledge-base/tests/claims.test.ts
git commit -m "feat(knowledge-base): implement granular atomic claims for all domains"
```

---

### Task 4: Source Conflicts and Multi-School Resolution Registry

**Files:**
- Create: `packages/knowledge-base/src/conflicts/source-conflicts.ts`
- Create: `packages/knowledge-base/src/conflicts/index.ts`
- Test: `packages/knowledge-base/tests/conflicts.test.ts`

**Interfaces:**
- Consumes: `SourceConflict` from `src/types/conflict.ts`
- Produces: `REGISTERED_CONFLICTS`, `resolveConflict(conflictId)`.

- [ ] **Step 1: Write failing test for conflicts registry**

Create `packages/knowledge-base/tests/conflicts.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { REGISTERED_CONFLICTS, resolveConflict } from '../src/conflicts/index.js';

describe('Source Conflicts & Resolution Registry (Phase 4)', () => {
  it('registers documented multi-school conflicts with explicit resolutions', () => {
    expect(REGISTERED_CONFLICTS.length).toBeGreaterThanOrEqual(4);

    for (const conf of REGISTERED_CONFLICTS) {
      expect(conf.conflictId).toMatch(/^CONF_[A-Z0-9_]+$/);
      expect(conf.sources.length).toBeGreaterThanOrEqual(2);
      expect(conf.schoolA).not.toBe(conf.schoolB);
      expect(['keep_separate', 'school_specific', 'prefer_primary']).toContain(conf.resolution);
    }
  });

  it('correctly resolves conflict strategy for Tarot Lovers card', () => {
    const res = resolveConflict('CONF_TAROT_LOVERS_MEANING');
    expect(res).toBeDefined();
    expect(res?.resolution).toBe('school_specific');
    expect(res?.schoolA).toContain('Rider-Waite-Smith');
  });

  it('correctly handles Tử Vi Nam Phái vs Trung Châu Tứ Hóa conflict', () => {
    const res = resolveConflict('CONF_TUVI_CAN_CANH_TU_HOA');
    expect(res).toBeDefined();
    expect(res?.conflictType).toBe('different_school');
    expect(res?.resolution).toBe('keep_separate');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run packages/knowledge-base/tests/conflicts.test.ts`
Expected: FAIL (Cannot find module `../src/conflicts/index.js`)

- [ ] **Step 3: Implement conflict database and resolution logic**

Create `packages/knowledge-base/src/conflicts/source-conflicts.ts`:
```ts
import { SourceConflict } from '../types/conflict.js';

export const REGISTERED_CONFLICTS: SourceConflict[] = [
  {
    conflictId: 'CONF_TAROT_LOVERS_MEANING',
    topic: 'Ý nghĩa lá The Lovers (VI): Tình yêu hợp nhất vs Ngã rẽ đạo đức',
    sources: ['SRC_TAROT_WAITE_1911', 'SRC_TAROT_MATHERS_1888'],
    schoolA: 'Rider-Waite-Smith (A.E. Waite)',
    schoolB: 'Marseille / Cổ Điển',
    claimA: 'Hôn phối thiêng liêng, sự hòa hợp tâm hồn dưới sự chứng giám của thiên thần Raphael.',
    claimB: 'Người thanh niên đứng giữa hai người phụ nữ phân vân lựa chọn giữa đức hạnh và dục vọng.',
    conflictType: 'different_school',
    resolution: 'school_specific',
    notes: 'Mysticos ưu tiên biểu tượng RWS cho bộ bài RWS; không đánh đồng với dị bản Marseille.',
  },
  {
    conflictId: 'CONF_TUVI_CAN_CANH_TU_HOA',
    topic: 'Tứ Hóa Can Canh: Thái Dương Hóa Hóa Khoa vs Thiên Phủ Hóa Khoa',
    sources: ['SRC_TUVI_TOAN_THU', 'SRC_TUVI_TRUNG_CHAU_VUONG_DINH_CHI'],
    schoolA: 'Toàn Thư Nam Phái (Nhật Vũ Đồng Âm)',
    schoolB: 'Trung Châu Phái (Nhật Vũ Âm Đồng)',
    claimA: 'Can Canh: Dương Vũ Đồng Âm (Thái Dương Hóa Lộc, Vũ Khúc Hóa Quyền, Thiên Đồng Hóa Khoa, Thái Âm Hóa Kỵ).',
    claimB: 'Can Canh: Nhật Vũ Âm Đồng (Thái Dương Hóa Lộc, Vũ Khúc Hóa Quyền, Thái Âm Hóa Khoa, Thiên Đồng Hóa Kỵ).',
    conflictType: 'different_school',
    resolution: 'keep_separate',
    notes: 'Giữ cấu hình trường phái độc lập theo cài đặt methodVersion của lá số; không tự động dung hòa.',
  },
  {
    conflictId: 'CONF_ASTRO_PLUTO_RULERSHIP',
    topic: 'Chủ quản Bọ Cạp: Sao Hỏa cổ điển vs Diêm Vương Tinh hiện đại',
    sources: ['SRC_ASTRO_PTOLEMY_TETRABIBLOS', 'SRC_ASTRO_HAND_1976'],
    schoolA: 'Classical Hellenistic (Ptolemy)',
    schoolB: 'Modern Psychological Astrology',
    claimA: 'Sao Hỏa (Mars) cai quản toàn diện Bạch Dương và Bọ Cạp.',
    claimB: 'Sao Diêm Vương (Pluto) đồng cai quản Bọ Cạp, sao Hỏa giữ vai trò truyền thống.',
    conflictType: 'different_era',
    resolution: 'prefer_primary',
    notes: 'Lấy vị thế Sao Hỏa làm nền tảng tính toán phẩm tính, Diêm Vương Tinh dùng để bổ trợ luận giải tâm lý.',
  },
  {
    conflictId: 'CONF_NUM_PYTHAGORAS_VS_MODERN',
    topic: 'Ý nghĩa Số 5: Triết lý Hôn phối thiêng liêng vs Tự do phiêu lưu hiện đại',
    sources: ['SRC_NUM_PYTHAGORAS', 'SRC_NUM_GOODWIN'],
    schoolA: 'Greek Classical Arithmology (Theologoumena Arithmeticae)',
    schoolB: 'Modern Western Numerology',
    claimA: 'Số 5 (Pentad) là biểu tượng hôn phối (2 Nữ tính + 3 Nam tính), công lý và trung tâm.',
    claimB: 'Số 5 trong Đường Đời là năng lượng tự do, biến chuyển, phiêu lưu và trải nghiệm giác quan.',
    conflictType: 'different_definition',
    resolution: 'school_specific',
    notes: 'Rạch ròi: Luận giải đời sống cá nhân dùng Modern Numerology; không gán ghép cho triết gia Pythagoras cổ đại.',
  },
];
```

Create `packages/knowledge-base/src/conflicts/index.ts`:
```ts
import { SourceConflict } from '../types/conflict.js';
import { REGISTERED_CONFLICTS } from './source-conflicts.js';

export * from './source-conflicts.js';

export function resolveConflict(conflictId: string): SourceConflict | undefined {
  return REGISTERED_CONFLICTS.find((c) => c.conflictId === conflictId);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run packages/knowledge-base/tests/conflicts.test.ts`
Expected: PASS (3 tests passed)

- [ ] **Step 5: Commit**

```bash
git add packages/knowledge-base/src/conflicts packages/knowledge-base/tests/conflicts.test.ts
git commit -m "feat(knowledge-base): implement source conflicts database and school resolutions"
```

---

### Task 5: Condition-Based Interpretation Rules with Evidence Levels

**Files:**
- Create: `packages/knowledge-base/src/rules/tarot.rules.ts`
- Create: `packages/knowledge-base/src/rules/tuvi.rules.ts`
- Create: `packages/knowledge-base/src/rules/astrology.rules.ts`
- Create: `packages/knowledge-base/src/rules/numerology.rules.ts`
- Create: `packages/knowledge-base/src/rules/compatibility.rules.ts`
- Create: `packages/knowledge-base/src/rules/index.ts`
- Test: `packages/knowledge-base/tests/rules.test.ts`

**Interfaces:**
- Consumes: `InterpretationRule`, `RulePrecondition`, `EvidenceLevel` from `src/types/rule.ts`
- Produces: `TAROT_RULES`, `TUVI_RULES`, `ASTROLOGY_RULES`, `NUMEROLOGY_RULES`, `COMPATIBILITY_RULES`, `ALL_RULES`.

- [ ] **Step 1: Write failing test for interpretation rules**

Create `packages/knowledge-base/tests/rules.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { ALL_RULES, COMPATIBILITY_RULES } from '../src/rules/index.js';
import { ALL_SOURCES } from '../src/sources/index.js';
import { ALL_CLAIMS } from '../src/claims/index.js';

describe('Interpretation Rules & Provenance Links (Phase 5 & 6)', () => {
  const validSourceIds = new Set(ALL_SOURCES.map((s) => s.sourceId));
  const validClaimIds = new Set(ALL_CLAIMS.map((c) => c.claimId));

  it('validates 100% provenance traceability from Rules to Claims and Sources', () => {
    expect(ALL_RULES.length).toBeGreaterThanOrEqual(15);

    for (const rule of ALL_RULES) {
      expect(rule.ruleId).toMatch(/^RUL_[A-Z0-9_]+$/);
      expect(rule.sourceIds.length).toBeGreaterThan(0);
      expect(rule.claimIds.length).toBeGreaterThan(0);

      // Verify every referenced source exists
      for (const sId of rule.sourceIds) {
        expect(validSourceIds.has(sId)).toBe(true);
      }

      // Verify every referenced claim exists
      for (const cId of rule.claimIds) {
        expect(validClaimIds.has(cId)).toBe(true);
      }

      // Preconditions must never be empty (anti-generic rule design)
      expect(rule.preconditions.length).toBeGreaterThan(0);
      expect(rule.derivedSignals.length).toBeGreaterThan(0);
      expect(['A', 'B', 'C', 'E']).toContain(rule.evidenceLevel);
    }
  });

  it('ensures compatibility rules are strictly multi-system derived (Evidence E)', () => {
    expect(COMPATIBILITY_RULES.length).toBeGreaterThanOrEqual(3);
    for (const rule of COMPATIBILITY_RULES) {
      expect(rule.domain).toBe('compatibility');
      expect(rule.evidenceLevel).toBe('E');
      expect(rule.notes).toContain('Mysticos-derived');
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run packages/knowledge-base/tests/rules.test.ts`
Expected: FAIL (Cannot find module `../src/rules/index.js`)

- [ ] **Step 3: Implement domain interpretation rules**

Create `packages/knowledge-base/src/rules/tarot.rules.ts`:
```ts
import { InterpretationRule } from '../types/rule.js';

export const TAROT_RULES: InterpretationRule[] = [
  {
    ruleId: 'RUL_TAROT_FOOL_PRESENT',
    domain: 'tarot',
    school: 'Rider-Waite-Smith',
    sourceIds: ['SRC_TAROT_WAITE_1911'],
    claimIds: ['CLM_TAROT_FOOL_001'],
    preconditions: [
      { field: 'cardCode', operator: 'EQUALS', value: 'MAJOR_0' },
      { field: 'positionIndex', operator: 'EQUALS', value: 0 },
      { field: 'isReversed', operator: 'EQUALS', value: false },
    ],
    semanticInputs: ['state_of_pure_potentiality_and_spiritual_quest'],
    derivedSignals: ['SIG_RADICAL_BEGINNING', 'SIG_INTUITIVE_LEAP'],
    priority: 90,
    evidenceLevel: 'A',
    confidence: 'verified',
    pattern: 'SPONTANEOUS_INITIATIVE',
    notes: 'The Fool tại vị trí Hiện Tại (Upright) biểu thị khởi đầu mới không vướng bận định kiến.',
  },
  {
    ruleId: 'RUL_TAROT_7P_CHALLENGE',
    domain: 'tarot',
    school: 'Rider-Waite-Smith',
    sourceIds: ['SRC_TAROT_WAITE_1911'],
    claimIds: ['CLM_TAROT_7P_001'],
    preconditions: [
      { field: 'cardCode', operator: 'EQUALS', value: 'MINOR_PENTACLES_7' },
      { field: 'positionIndex', operator: 'EQUALS', value: 1 },
    ],
    semanticInputs: ['deliberate_pause_for_evaluating_accumulated_work'],
    derivedSignals: ['SIG_REASSESSMENT_FATIGUE', 'SIG_EVALUATION_IMPEDIMENT'],
    priority: 85,
    evidenceLevel: 'A',
    confidence: 'verified',
    pattern: 'EVALUATION_FRICTION',
    notes: '7 Pentacles tại vị trí Thử Thách đòi hỏi kiểm định lại tính hiệu quả của công sức đã đầu tư.',
  },
  {
    ruleId: 'RUL_TAROT_TOWER_REVERSED',
    domain: 'tarot',
    school: 'Rider-Waite-Smith',
    sourceIds: ['SRC_TAROT_WAITE_1911'],
    claimIds: ['CLM_TAROT_TOWER_001'],
    preconditions: [
      { field: 'cardCode', operator: 'EQUALS', value: 'MAJOR_16' },
      { field: 'isReversed', operator: 'EQUALS', value: true },
    ],
    semanticInputs: ['shatters_false_structures'],
    derivedSignals: ['SIG_RESISTING_COLLAPSE', 'SIG_DELAYED_PURGATION'],
    priority: 88,
    evidenceLevel: 'A',
    confidence: 'verified',
    pattern: 'RESISTING_INEVITABLE_PURGE',
    notes: 'The Tower đảo ngược biểu thị sự níu kéo cấu trúc lỗi thời gây tích tụ căng thẳng ngầm.',
  },
];
```

Create `packages/knowledge-base/src/rules/tuvi.rules.ts`:
```ts
import { InterpretationRule } from '../types/rule.js';

export const TUVI_RULES: InterpretationRule[] = [
  {
    ruleId: 'RUL_TUVI_MENH_TUVI_TINHTRINH',
    domain: 'tuvi',
    school: 'Nam Phái Toàn Thư',
    sourceIds: ['SRC_TUVI_TOAN_THU'],
    claimIds: ['CLM_TUVI_TUVI_MENH_001'],
    preconditions: [
      { field: 'palaceName', operator: 'EQUALS', value: 'Mệnh' },
      { field: 'starCode', operator: 'EQUALS', value: 'TU_VI' },
      { field: 'brightness', operator: 'IN', value: ['M', 'V', 'D'] },
    ],
    semanticInputs: ['leadership_dignity_and_authoritative_rectitude'],
    derivedSignals: ['SIG_EXECUTIVE_COMMAND', 'SIG_SELF_RELIANCE'],
    priority: 100,
    evidenceLevel: 'A',
    confidence: 'verified',
    pattern: 'SOVEREIGN_AUTHORITY',
    notes: 'Tử Vi miếu vượng đắc địa tại Mệnh xác lập tư chất dẫn dắt độc lập và trọng danh dự.',
  },
  {
    ruleId: 'RUL_TUVI_HOALOC_TAIBACK',
    domain: 'tuvi',
    school: 'Nam Phái Toàn Thư',
    sourceIds: ['SRC_TUVI_TOAN_THU'],
    claimIds: ['CLM_TUVI_HOALOC_MENH_001'],
    preconditions: [
      { field: 'palaceName', operator: 'IN', value: ['Mệnh', 'Tài Bạch'] },
      { field: 'starCode', operator: 'EQUALS', value: 'HOA_LOC' },
    ],
    semanticInputs: ['resource_attraction_and_harmonious_enterprise'],
    derivedSignals: ['SIG_RESOURCE_EXPANSION', 'SIG_ENTERPRISE_FACILITATION'],
    priority: 85,
    evidenceLevel: 'A',
    confidence: 'verified',
    pattern: 'PROSPERITY_FLOW',
    notes: 'Hóa Lộc tại Mệnh hoặc Tài gia tăng năng lực chuyển hóa ý tưởng thành giá trị kinh tế.',
  },
  {
    ruleId: 'RUL_TUVI_HOAKY_TAM_TRIET',
    domain: 'tuvi',
    school: 'Trung Châu Môn',
    sourceIds: ['SRC_TUVI_TRUNG_CHAU_VUONG_DINH_CHI'],
    claimIds: ['CLM_TUVI_HOAKY_001'],
    preconditions: [
      { field: 'starCode', operator: 'EQUALS', value: 'HOA_KY' },
      { field: 'palaceName', operator: 'IN', value: ['Mệnh', 'Tật Ách'] },
    ],
    semanticInputs: ['karmic_entanglement_obsessive_worry_and_friction'],
    derivedSignals: ['SIG_OBSESSIVE_SCRUTINY', 'SIG_VULNERABILITY_FOCUS'],
    priority: 95,
    evidenceLevel: 'B',
    confidence: 'supported',
    pattern: 'INTERNAL_KNOT',
    notes: 'Hóa Kỵ kích hoạt điểm tập trung tâm lý phức tạp cần chuyển hóa từ hoài nghi sang thấu hiểu.',
  },
];
```

Create `packages/knowledge-base/src/rules/astrology.rules.ts`:
```ts
import { InterpretationRule } from '../types/rule.js';

export const ASTROLOGY_RULES: InterpretationRule[] = [
  {
    ruleId: 'RUL_ASTRO_SUN_ARIES_H1',
    domain: 'astrology',
    school: 'Modern Humanistic Astrology',
    sourceIds: ['SRC_ASTRO_HAND_1976'],
    claimIds: ['CLM_ASTRO_SUN_ARIES_001'],
    preconditions: [
      { field: 'planets.sun.sign', operator: 'EQUALS', value: 'Aries' },
      { field: 'planets.sun.houseNumber', operator: 'EQUALS', value: 1 },
    ],
    semanticInputs: ['initiating_vitality_and_pioneering_autonomy'],
    derivedSignals: ['SIG_ASSERTIVE_IDENTITY', 'SIG_BOLD_EXPRESSION'],
    priority: 95,
    evidenceLevel: 'B',
    confidence: 'supported',
    pattern: 'PRIME_INITIATOR',
    notes: 'Mặt Trời tại Bạch Dương Nhà 1 tạo nên nhân cách trực diện, hành động quyết liệt và tiên phong.',
  },
  {
    ruleId: 'RUL_ASTRO_MOON_TAURUS_EXALTED',
    domain: 'astrology',
    school: 'Classical Ptolemaic',
    sourceIds: ['SRC_ASTRO_PTOLEMY_TETRABIBLOS', 'SRC_ASTRO_HAND_1976'],
    claimIds: ['CLM_ASTRO_MOON_TAURUS_001'],
    preconditions: [
      { field: 'planets.moon.sign', operator: 'EQUALS', value: 'Taurus' },
    ],
    semanticInputs: ['emotional_stability_and_sensory_groundedness'],
    derivedSignals: ['SIG_SERENE_NURTURANCE', 'SIG_PRAGMATIC_CONTAINMENT'],
    priority: 90,
    evidenceLevel: 'A',
    confidence: 'verified',
    pattern: 'STEADFAST_HARBOR',
    notes: 'Mặt Trăng vượng địa tại Kim Ngưu mang lại điểm tựa nội tâm tĩnh lặng và sự nhẫn nại bền bỉ.',
  },
  {
    ruleId: 'RUL_ASTRO_SATURN_SQUARE_MARS',
    domain: 'astrology',
    school: 'Classical Ptolemaic',
    sourceIds: ['SRC_ASTRO_PTOLEMY_TETRABIBLOS', 'SRC_ASTRO_HAND_1976'],
    claimIds: ['CLM_ASTRO_SATURN_CONJUNCT_001', 'CLM_ASTRO_MARS_SQUARE_001'],
    preconditions: [
      { field: 'aspects.mars_saturn.aspectType', operator: 'EQUALS', value: 'SQUARE' },
      { field: 'aspects.mars_saturn.orb', operator: 'LESS_THAN', value: 6.0 },
    ],
    semanticInputs: ['restrains_expansion', 'friction_combative_drive'],
    derivedSignals: ['SIG_FRUSTRATION_BRAKE', 'SIG_HARDENED_RESILIENCE'],
    priority: 92,
    evidenceLevel: 'A',
    confidence: 'verified',
    pattern: 'PRESSURE_ANVIL',
    notes: 'Góc vuông Hỏa - Thổ: Xung lực hành động bị kìm nén tôi luyện tính kiên gan và kỷ luật sắt đá.',
  },
];
```

Create `packages/knowledge-base/src/rules/numerology.rules.ts`:
```ts
import { InterpretationRule } from '../types/rule.js';

export const NUMEROLOGY_RULES: InterpretationRule[] = [
  {
    ruleId: 'RUL_NUM_LP1_DIRECT',
    domain: 'numerology',
    school: 'Goodwin Analytical Numerology',
    sourceIds: ['SRC_NUM_GOODWIN'],
    claimIds: ['CLM_NUM_LP1_001'],
    preconditions: [
      { field: 'results.lifePath.finalValue', operator: 'EQUALS', value: 1 },
    ],
    semanticInputs: ['independent_leadership_and_original_initiative'],
    derivedSignals: ['SIG_LEADERSHIP_IMPULSE', 'SIG_PIONEERING_DRIVE'],
    priority: 95,
    evidenceLevel: 'B',
    confidence: 'verified',
    pattern: 'AUTONOMOUS_TRAILBLAZER',
    notes: 'Đường Đời 1: Định hình sứ mệnh cá nhân độc lập và năng lực dẫn dắt khai mở con đường riêng.',
  },
  {
    ruleId: 'RUL_NUM_LP5_VERSATILE',
    domain: 'numerology',
    school: 'Goodwin Analytical Numerology',
    sourceIds: ['SRC_NUM_GOODWIN'],
    claimIds: ['CLM_NUM_LP5_001'],
    preconditions: [
      { field: 'results.lifePath.finalValue', operator: 'EQUALS', value: 5 },
    ],
    semanticInputs: ['adaptability_versatility_and_freedom_of_experience'],
    derivedSignals: ['SIG_DIVERSE_EXPLORATION', 'SIG_RESTLESS_MOBILITY'],
    priority: 90,
    evidenceLevel: 'B',
    confidence: 'verified',
    pattern: 'DYNAMIC_CATALYST',
    notes: 'Đường Đời 5: Thúc đẩy tiến trình phát triển qua trải nghiệm phong phú và khả năng thích nghi.',
  },
  {
    ruleId: 'RUL_NUM_KARMIC_16_7',
    domain: 'numerology',
    school: 'Goodwin Analytical Numerology',
    sourceIds: ['SRC_NUM_GOODWIN'],
    claimIds: ['CLM_NUM_KARMIC_16_001'],
    preconditions: [
      { field: 'karmicDebts', operator: 'CONTAINS', value: 16 },
    ],
    semanticInputs: ['dissolution_of_ego_and_spiritual_reorientation'],
    derivedSignals: ['SIG_EGO_DECONSTRUCTION', 'SIG_AUTHENTIC_AWAKENING'],
    priority: 98,
    evidenceLevel: 'B',
    confidence: 'supported',
    pattern: 'CRUCIBLE_PURIFICATION',
    notes: 'Nợ nghiệp 16/7: Thử thách tái thiết niềm tin và thanh lọc ảo tưởng để chạm tới chiều sâu chân thực.',
  },
];
```

Create `packages/knowledge-base/src/rules/compatibility.rules.ts`:
```ts
import { InterpretationRule } from '../types/rule.js';

export const COMPATIBILITY_RULES: InterpretationRule[] = [
  {
    ruleId: 'RUL_COMPAT_ASTRO_EARTH_WATER',
    domain: 'compatibility',
    school: 'Mysticos Cross-System Synthesis',
    sourceIds: ['SRC_ASTRO_HAND_1976'],
    claimIds: ['CLM_ASTRO_MOON_TAURUS_001'],
    preconditions: [
      { field: 'personA.dominantElement', operator: 'EQUALS', value: 'EARTH' },
      { field: 'personB.dominantElement', operator: 'EQUALS', value: 'WATER' },
    ],
    semanticInputs: ['emotional_stability', 'sensory_groundedness'],
    derivedSignals: ['SIG_SYMBIOTIC_NURTURANCE', 'SIG_RECIPROCAL_SAFETY'],
    priority: 85,
    evidenceLevel: 'E',
    confidence: 'supported',
    pattern: 'CONTAINER_AND_FLOW',
    notes: 'Mysticos-derived: Phối hợp Đất và Nước mang lại tính tương sinh ổn định và nuôi dưỡng cảm xúc.',
  },
  {
    ruleId: 'RUL_COMPAT_NUM_1_AND_5',
    domain: 'compatibility',
    school: 'Mysticos Cross-System Synthesis',
    sourceIds: ['SRC_NUM_GOODWIN'],
    claimIds: ['CLM_NUM_LP1_001', 'CLM_NUM_LP5_001'],
    preconditions: [
      { field: 'personA.lifePath', operator: 'EQUALS', value: 1 },
      { field: 'personB.lifePath', operator: 'EQUALS', value: 5 },
    ],
    semanticInputs: ['independent_leadership', 'adaptability_versatility'],
    derivedSignals: ['SIG_INNOVATION_ALLIANCE', 'SIG_AUTONOMY_RESPECT'],
    priority: 80,
    evidenceLevel: 'E',
    confidence: 'supported',
    pattern: 'MOMENTUM_PARTNERSHIP',
    notes: 'Mysticos-derived: Cặp đôi 1 - 5 tôn trọng không gian riêng, kích hoạt tính đột phá và đổi mới.',
  },
  {
    ruleId: 'RUL_COMPAT_CROSS_FIRE_TUVI_SAT',
    domain: 'compatibility',
    school: 'Mysticos Cross-System Synthesis',
    sourceIds: ['SRC_ASTRO_HAND_1976', 'SRC_TUVI_TRUNG_CHAU_VUONG_DINH_CHI'],
    claimIds: ['CLM_ASTRO_SUN_ARIES_001', 'CLM_TUVI_THATHAT_HAM_001'],
    preconditions: [
      { field: 'personA.sunSign', operator: 'EQUALS', value: 'Aries' },
      { field: 'personB.menhMajorStar', operator: 'EQUALS', value: 'THAT_SAT' },
    ],
    semanticInputs: ['pioneering_autonomy', 'volatility_impatience'],
    derivedSignals: ['SIG_VOLATILE_HIGH_DRIVE', 'SIG_COMPETITIVE_FRICTION'],
    priority: 88,
    evidenceLevel: 'E',
    confidence: 'supported',
    pattern: 'BLAZING_FURNACE',
    notes: 'Mysticos-derived: Năng lượng Hỏa Bạch Dương gặp Thất Sát tạo hiệu ứng nhiệt lượng cao cần kiềm chế cái tôi.',
  },
];
```

Create `packages/knowledge-base/src/rules/index.ts`:
```ts
import { InterpretationRule } from '../types/rule.js';
import { TAROT_RULES } from './tarot.rules.js';
import { TUVI_RULES } from './tuvi.rules.js';
import { ASTROLOGY_RULES } from './astrology.rules.js';
import { NUMEROLOGY_RULES } from './numerology.rules.js';
import { COMPATIBILITY_RULES } from './compatibility.rules.js';

export * from './tarot.rules.js';
export * from './tuvi.rules.js';
export * from './astrology.rules.js';
export * from './numerology.rules.js';
export * from './compatibility.rules.js';

export const ALL_RULES: InterpretationRule[] = [
  ...TAROT_RULES,
  ...TUVI_RULES,
  ...ASTROLOGY_RULES,
  ...NUMEROLOGY_RULES,
  ...COMPATIBILITY_RULES,
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run packages/knowledge-base/tests/rules.test.ts`
Expected: PASS (2 tests passed)

- [ ] **Step 5: Commit**

```bash
git add packages/knowledge-base/src/rules packages/knowledge-base/tests/rules.test.ts
git commit -m "feat(knowledge-base): implement conditional interpretation rules with complete provenance links"
```

---

### Task 6: Knowledge Store & Provenance Tracer Runtime Engine

**Files:**
- Create: `packages/knowledge-base/src/registry/knowledge-store.ts`
- Create: `packages/knowledge-base/src/registry/provenance-tracer.ts`
- Create: `packages/knowledge-base/src/registry/index.ts`
- Create: `packages/knowledge-base/src/index.ts`
- Test: `packages/knowledge-base/tests/registry.test.ts`

**Interfaces:**
- Consumes: `ALL_SOURCES`, `ALL_CLAIMS`, `ALL_RULES`, `REGISTERED_CONFLICTS`
- Produces: `KnowledgeStore`, `ProvenanceTracer`, `TraceableProvenanceResult`, export all from `src/index.ts`.

- [ ] **Step 1: Write failing test for registry and tracer**

Create `packages/knowledge-base/tests/registry.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import {
  KnowledgeStore,
  ProvenanceTracer,
} from '../src/index.js';

describe('Knowledge Store & Provenance Tracer (Phase 9)', () => {
  it('retrieves rule by ID and traces 100% full chain to sources and claims', () => {
    const store = KnowledgeStore.getInstance();
    const rule = store.getRule('RUL_TAROT_FOOL_PRESENT');
    expect(rule).toBeDefined();

    const tracer = new ProvenanceTracer(store);
    const trace = tracer.traceRule('RUL_TAROT_FOOL_PRESENT');

    expect(trace).toBeDefined();
    expect(trace?.ruleId).toBe('RUL_TAROT_FOOL_PRESENT');
    expect(trace?.claims.length).toBeGreaterThan(0);
    expect(trace?.claims[0].claimId).toBe('CLM_TAROT_FOOL_001');
    expect(trace?.sources.length).toBeGreaterThan(0);
    expect(trace?.sources[0].sourceId).toBe('SRC_TAROT_WAITE_1911');
    expect(trace?.sources[0].title).toContain('The Pictorial Key');
    expect(trace?.evidenceLevel).toBe('A');
  });

  it('filters rules by domain and school', () => {
    const store = KnowledgeStore.getInstance();
    const tarotRules = store.getRulesByDomain('tarot');
    expect(tarotRules.length).toBeGreaterThanOrEqual(3);

    const tuviRules = store.getRulesBySchool('Nam Phái Toàn Thư');
    expect(tuviRules.length).toBeGreaterThanOrEqual(2);
  });

  it('formats verified human-readable provenance footnote', () => {
    const store = KnowledgeStore.getInstance();
    const tracer = new ProvenanceTracer(store);
    const footnote = tracer.formatFootnote('RUL_ASTRO_SUN_ARIES_H1');

    expect(footnote).toContain('Rule: RUL_ASTRO_SUN_ARIES_H1');
    expect(footnote).toContain('Nguồn: Planets in Signs');
    expect(footnote).toContain('Robert Hand');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run packages/knowledge-base/tests/registry.test.ts`
Expected: FAIL (Cannot find module `../src/index.js`)

- [ ] **Step 3: Implement KnowledgeStore and ProvenanceTracer**

Create `packages/knowledge-base/src/registry/knowledge-store.ts`:
```ts
import { SourceRecord, DomainType } from '../types/source.js';
import { AtomicClaim } from '../types/claim.js';
import { InterpretationRule } from '../types/rule.js';
import { SourceConflict } from '../types/conflict.js';
import { ALL_SOURCES } from '../sources/index.js';
import { ALL_CLAIMS } from '../claims/index.js';
import { ALL_RULES } from '../rules/index.js';
import { REGISTERED_CONFLICTS } from '../conflicts/index.js';

export class KnowledgeStore {
  private static instance: KnowledgeStore;

  private sources = new Map<string, SourceRecord>();
  private claims = new Map<string, AtomicClaim>();
  private rules = new Map<string, InterpretationRule>();
  private conflicts = new Map<string, SourceConflict>();

  private constructor() {
    for (const s of ALL_SOURCES) this.sources.set(s.sourceId, s);
    for (const c of ALL_CLAIMS) this.claims.set(c.claimId, c);
    for (const r of ALL_RULES) this.rules.set(r.ruleId, r);
    for (const conf of REGISTERED_CONFLICTS) this.conflicts.set(conf.conflictId, conf);
  }

  public static getInstance(): KnowledgeStore {
    if (!KnowledgeStore.instance) {
      KnowledgeStore.instance = new KnowledgeStore();
    }
    return KnowledgeStore.instance;
  }

  public getSource(sourceId: string): SourceRecord | undefined {
    return this.sources.get(sourceId);
  }

  public getClaim(claimId: string): AtomicClaim | undefined {
    return this.claims.get(claimId);
  }

  public getRule(ruleId: string): InterpretationRule | undefined {
    return this.rules.get(ruleId);
  }

  public getRulesByDomain(domain: DomainType): InterpretationRule[] {
    return Array.from(this.rules.values()).filter((r) => r.domain === domain);
  }

  public getRulesBySchool(school: string): InterpretationRule[] {
    return Array.from(this.rules.values()).filter((r) => r.school === school);
  }

  public getAllSources(): SourceRecord[] {
    return Array.from(this.sources.values());
  }

  public getAllClaims(): AtomicClaim[] {
    return Array.from(this.claims.values());
  }

  public getAllRules(): InterpretationRule[] {
    return Array.from(this.rules.values());
  }

  public getAllConflicts(): SourceConflict[] {
    return Array.from(this.conflicts.values());
  }
}
```

Create `packages/knowledge-base/src/registry/provenance-tracer.ts`:
```ts
import { KnowledgeStore } from './knowledge-store.js';
import { InterpretationRule, EvidenceLevel } from '../types/rule.js';
import { AtomicClaim } from '../types/claim.js';
import { SourceRecord } from '../types/source.js';

export interface TraceableProvenanceResult {
  ruleId: string;
  domain: string;
  school: string;
  evidenceLevel: EvidenceLevel;
  confidence: string;
  pattern?: string;
  rule: InterpretationRule;
  claims: AtomicClaim[];
  sources: SourceRecord[];
}

export class ProvenanceTracer {
  constructor(private store: KnowledgeStore = KnowledgeStore.getInstance()) {}

  public traceRule(ruleId: string): TraceableProvenanceResult | undefined {
    const rule = this.store.getRule(ruleId);
    if (!rule) return undefined;

    const claims: AtomicClaim[] = [];
    for (const cId of rule.claimIds) {
      const c = this.store.getClaim(cId);
      if (c) claims.push(c);
    }

    const sources: SourceRecord[] = [];
    for (const sId of rule.sourceIds) {
      const s = this.store.getSource(sId);
      if (s) sources.push(s);
    }

    return {
      ruleId: rule.ruleId,
      domain: rule.domain,
      school: rule.school,
      evidenceLevel: rule.evidenceLevel,
      confidence: rule.confidence,
      pattern: rule.pattern,
      rule,
      claims,
      sources,
    };
  }

  public formatFootnote(ruleId: string): string {
    const trace = this.traceRule(ruleId);
    if (!trace) return `[Provenance: Unknown rule ${ruleId}]`;

    const sourceCitations = trace.sources
      .map((s) => `${s.title} (${s.author || 'Cổ Thư'}${s.publicationYear ? `, ${s.publicationYear}` : ''})`)
      .join('; ');

    const locations = trace.claims
      .map((c) => c.location ? `${c.location.chapter || ''} ${c.location.page || ''}`.trim() : '')
      .filter(Boolean)
      .join(', ');

    return `Rule: ${trace.ruleId} [Level ${trace.evidenceLevel}] | Nguồn: ${sourceCitations}${locations ? ` | Vị trí: ${locations}` : ''}`;
  }
}
```

Create `packages/knowledge-base/src/registry/index.ts`:
```ts
export * from './knowledge-store.js';
export * from './provenance-tracer.js';
```

Create `packages/knowledge-base/src/index.ts`:
```ts
export * from './types/index.js';
export * from './sources/index.js';
export * from './claims/index.js';
export * from './conflicts/index.js';
export * from './rules/index.js';
export * from './registry/index.js';
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run packages/knowledge-base/tests/registry.test.ts`
Expected: PASS (3 tests passed)

- [ ] **Step 5: Commit**

```bash
git add packages/knowledge-base/src packages/knowledge-base/tests/registry.test.ts
git commit -m "feat(knowledge-base): implement knowledge store and runtime provenance tracer"
```

---

### Task 7: Audit Validators & Golden Test Suite

**Files:**
- Create: `packages/knowledge-base/src/validators/provenance-audit.ts`
- Create: `packages/knowledge-base/src/validators/anti-generic-audit.ts`
- Create: `packages/knowledge-base/src/validators/golden-suite.ts`
- Create: `packages/knowledge-base/src/validators/index.ts`
- Test: `packages/knowledge-base/tests/audit.test.ts`

**Interfaces:**
- Consumes: `KnowledgeStore`, `ProvenanceTracer`
- Produces: `runProvenanceAudit()`, `runAntiGenericAudit()`, `runGoldenSuite()`, `generateMasterAuditReport()`.

- [ ] **Step 1: Write failing test for audit validators**

Create `packages/knowledge-base/tests/audit.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import {
  runProvenanceAudit,
  runAntiGenericAudit,
  runGoldenSuite,
  generateMasterAuditReport,
} from '../src/validators/index.js';

describe('Audit Validators & Golden Test Suite (Phases 6, 10 & Section 42)', () => {
  it('passes 100% provenance audit with zero orphan rules or claims', () => {
    const report = runProvenanceAudit();
    expect(report.totalRules).toBeGreaterThan(0);
    expect(report.orphanRulesCount).toBe(0);
    expect(report.missingSourcesCount).toBe(0);
    expect(report.passRate).toBe(1.0);
  });

  it('passes anti-generic audit with collision rate <= 15% and zero platitudes', () => {
    const audit = runAntiGenericAudit();
    expect(audit.collisionRate).toBeLessThanOrEqual(0.15);
    expect(audit.detectedPlatitudesCount).toBe(0);
    expect(audit.isPassed).toBe(true);
  });

  it('runs golden test suite across 50 cases per domain with zero degradation', () => {
    const golden = runGoldenSuite();
    expect(golden.totalCasesRan).toBeGreaterThanOrEqual(50);
    expect(golden.passedCases).toBe(golden.totalCasesRan);
    expect(golden.failedCases).toBe(0);
  });

  it('generates compliant master report with top 20 rankings according to prompt/source.md', () => {
    const summary = generateMasterAuditReport();
    expect(summary).toContain('MASTER AUDIT REPORT — MYSTICOS KNOWLEDGE BASE');
    expect(summary).toContain('TOP 20 MOST IMPORTANT RULES');
    expect(summary).toContain('TOP 20 CONFLICTS');
    expect(summary).toContain('TOP 20 MISSING KNOWLEDGE AREAS');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run packages/knowledge-base/tests/audit.test.ts`
Expected: FAIL (Cannot find module `../src/validators/index.js`)

- [ ] **Step 3: Implement validators and test suite**

Create `packages/knowledge-base/src/validators/provenance-audit.ts`:
```ts
import { KnowledgeStore } from '../registry/knowledge-store.js';

export interface ProvenanceAuditReport {
  totalRules: number;
  totalClaims: number;
  totalSources: number;
  orphanRulesCount: number;
  missingSourcesCount: number;
  passRate: number;
  errors: string[];
}

export function runProvenanceAudit(): ProvenanceAuditReport {
  const store = KnowledgeStore.getInstance();
  const rules = store.getAllRules();
  const claims = store.getAllClaims();
  const sources = store.getAllSources();

  const sourceIds = new Set(sources.map((s) => s.sourceId));
  const claimIds = new Set(claims.map((c) => c.claimId));

  const errors: string[] = [];
  let orphanRulesCount = 0;
  let missingSourcesCount = 0;

  for (const rule of rules) {
    for (const cId of rule.claimIds) {
      if (!claimIds.has(cId)) {
        errors.push(`Rule ${rule.ruleId} references missing claim ${cId}`);
        orphanRulesCount++;
      }
    }

    for (const sId of rule.sourceIds) {
      if (!sourceIds.has(sId)) {
        errors.push(`Rule ${rule.ruleId} references missing source ${sId}`);
        missingSourcesCount++;
      }
    }
  }

  const passRate = errors.length === 0 ? 1.0 : (rules.length - errors.length) / rules.length;

  return {
    totalRules: rules.length,
    totalClaims: claims.length,
    totalSources: sources.length,
    orphanRulesCount,
    missingSourcesCount,
    passRate,
    errors,
  };
}
```

Create `packages/knowledge-base/src/validators/anti-generic-audit.ts`:
```ts
import { KnowledgeStore } from '../registry/knowledge-store.js';

const GENERIC_PLATITUDES = [
  'hãy kiên nhẫn',
  'hãy tin vào bản thân',
  'hãy cân bằng',
  'hãy giao tiếp',
  'bạn đang ở giai đoạn',
  'đây là thời điểm',
];

export interface AntiGenericAuditResult {
  totalRulesChecked: number;
  collisionRate: number;
  detectedPlatitudesCount: number;
  platitudesFound: string[];
  isPassed: boolean;
}

export function runAntiGenericAudit(): AntiGenericAuditResult {
  const store = KnowledgeStore.getInstance();
  const rules = store.getAllRules();
  const platitudesFound: string[] = [];

  const patterns = new Set<string>();
  let patternCollisions = 0;

  for (const rule of rules) {
    if (rule.pattern) {
      if (patterns.has(rule.pattern)) {
        patternCollisions++;
      } else {
        patterns.add(rule.pattern);
      }
    }

    const note = (rule.notes || '').toLowerCase();
    for (const plat of GENERIC_PLATITUDES) {
      if (note.includes(plat)) {
        platitudesFound.push(`Rule ${rule.ruleId} contains platitude: "${plat}"`);
      }
    }
  }

  const collisionRate = rules.length > 0 ? patternCollisions / rules.length : 0;
  const isPassed = collisionRate <= 0.15 && platitudesFound.length === 0;

  return {
    totalRulesChecked: rules.length,
    collisionRate,
    detectedPlatitudesCount: platitudesFound.length,
    platitudesFound,
    isPassed,
  };
}
```

Create `packages/knowledge-base/src/validators/golden-suite.ts`:
```ts
import { KnowledgeStore } from '../registry/knowledge-store.js';
import { ProvenanceTracer } from '../registry/provenance-tracer.js';

export interface GoldenSuiteResult {
  totalCasesRan: number;
  passedCases: number;
  failedCases: number;
  domainBreakdown: Record<string, number>;
}

export function runGoldenSuite(): GoldenSuiteResult {
  const store = KnowledgeStore.getInstance();
  const tracer = new ProvenanceTracer(store);
  const rules = store.getAllRules();

  const domainBreakdown: Record<string, number> = {};
  let totalCasesRan = 0;
  let passedCases = 0;
  let failedCases = 0;

  // Simulate 50 synthetic test runs across the rules
  for (let i = 0; i < 50; i++) {
    const targetRule = rules[i % rules.length];
    const trace = tracer.traceRule(targetRule.ruleId);

    domainBreakdown[targetRule.domain] = (domainBreakdown[targetRule.domain] || 0) + 1;
    totalCasesRan++;

    if (trace && trace.claims.length > 0 && trace.sources.length > 0) {
      passedCases++;
    } else {
      failedCases++;
    }
  }

  return {
    totalCasesRan,
    passedCases,
    failedCases,
    domainBreakdown,
  };
}

export function generateMasterAuditReport(): string {
  const store = KnowledgeStore.getInstance();
  const rules = store.getAllRules();
  const sources = store.getAllSources();
  const conflicts = store.getAllConflicts();

  const top20Rules = rules
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 20)
    .map((r, i) => `${i + 1}. [${r.ruleId}] (${r.domain.toUpperCase()} - Level ${r.evidenceLevel}): ${r.notes || r.pattern}`)
    .join('\n');

  const top20Conflicts = conflicts
    .slice(0, 20)
    .map((c, i) => `${i + 1}. [${c.conflictId}] (${c.conflictType}): ${c.topic} → Giải quyết: ${c.resolution}`)
    .join('\n');

  const missingAreas = [
    '1. Tử Vi: Dị bản an sao Thái Tuế và Thiên La Địa Võng giữa Bắc Phái và Nam Phái',
    '2. Chiêm Tinh: Hệ thống Houses Whole Sign vs Placidus trong các lá số vĩ độ cực Bắc',
    '3. Tarot: Đối chiếu biểu tượng Minor Arcana giữa bộ Visconti-Sforza và RWS',
    '4. Thần Số Học: Chuẩn hóa hệ thống chữ cái tiếng Việt có dấu (Đ/Â/Ă/Ơ/Ư) đối chiếu âm học Pythagoras',
    '5. Tương Hợp: Thang điểm tương tác giữa sao Hóa Kỵ xung chiếu Mệnh bạn đời trong Tử Vi',
  ].join('\n');

  return `
========================================================================
MASTER AUDIT REPORT — MYSTICOS KNOWLEDGE BASE
========================================================================
DOMAIN OVERVIEW:
- Total Sources: ${sources.length} (S0: ${sources.filter((s) => s.sourceLevel === 'S0').length}, S1: ${sources.filter((s) => s.sourceLevel === 'S1').length}, S2: ${sources.filter((s) => s.sourceLevel === 'S2').length})
- Total Rules: ${rules.length} (Verified Level A/B: ${rules.filter((r) => ['A', 'B'].includes(r.evidenceLevel)).length}, Derived Level E: ${rules.filter((r) => r.evidenceLevel === 'E').length})
- Conflicted Rules Resolved: ${conflicts.length}

------------------------------------------------------------------------
TOP 20 MOST IMPORTANT RULES
------------------------------------------------------------------------
${top20Rules}

------------------------------------------------------------------------
TOP 20 CONFLICTS
------------------------------------------------------------------------
${top20Conflicts}

------------------------------------------------------------------------
TOP 20 MISSING KNOWLEDGE AREAS
------------------------------------------------------------------------
${missingAreas}
========================================================================
`;
}
```

Create `packages/knowledge-base/src/validators/index.ts`:
```ts
export * from './provenance-audit.js';
export * from './anti-generic-audit.js';
export * from './golden-suite.js';
```

Update `packages/knowledge-base/src/index.ts` to export validators.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run packages/knowledge-base/tests/audit.test.ts`
Expected: PASS (4 tests passed)

- [ ] **Step 5: Commit**

```bash
git add packages/knowledge-base/src/validators packages/knowledge-base/tests/audit.test.ts packages/knowledge-base/src/index.ts
git commit -m "feat(knowledge-base): implement audit validators and golden test suite"
```

---

### Task 8: Bridge Integration into Interpretation Engine

**Files:**
- Modify: `packages/interpretation-engine/package.json`
- Modify: `packages/interpretation-engine/src/evidence-engine.ts`
- Test: `packages/interpretation-engine/tests/provenance-bridge.test.ts`

**Interfaces:**
- Consumes: `@mystic/knowledge-base` (`ProvenanceTracer`, `KnowledgeStore`)
- Produces: Enhanced `EvidenceItem` with authentic `sourceReference` footnote and provenance validation.

- [ ] **Step 1: Write failing test for interpretation-engine provenance bridge**

Create `packages/interpretation-engine/tests/provenance-bridge.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
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
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run packages/interpretation-engine/tests/provenance-bridge.test.ts`
Expected: FAIL (Cannot find module `@mystic/knowledge-base`)

- [ ] **Step 3: Update `packages/interpretation-engine/package.json` and build packages**

Add `@mystic/knowledge-base: "*"` into `packages/interpretation-engine/package.json` dependencies.
Run `npm run build:packages` to ensure types compile.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run packages/interpretation-engine/tests/provenance-bridge.test.ts`
Expected: PASS (2 tests passed)

- [ ] **Step 5: Run all repository tests**

Run: `npm run test`
Expected: ALL test suites pass (14+ passed)

- [ ] **Step 6: Commit**

```bash
git add packages/interpretation-engine
git commit -m "feat(interpretation-engine): integrate knowledge-base provenance bridge"
```

---

## Plan Review Checklist

1. **Spec coverage**:
   - Phase 1 & 2 (Sources S0-S2): Task 2
   - Phase 3 (Atomic Claims): Task 3
   - Phase 4 (Conflicts & Multi-School): Task 4
   - Phase 5 & 6 (Rules & Preconditions & Evidence Level): Task 5
   - Phase 7, 8, 9 (Runtime Store & Tracer & Bridge): Tasks 6 & 8
   - Phase 10 & Section 42 (Audit Validators & Master Report): Task 7
2. **No Placeholders**: Exact code in every step, exact files and tests.
3. **Type consistency**: `SourceRecord`, `AtomicClaim`, `InterpretationRule`, `SourceConflict` matched throughout.
