# Mysticos Knowledge Base & Provenance Architecture Design Spec

- **Date**: 2026-10-07
- **Status**: Approved
- **Reference**: `prompt/source.md`, `AGENTS.md`, `prompt/design_rule.md`

---

## 1. Mục Tiêu & Phạm Vi

Triển khai quy trình 10 phase theo `prompt/source.md` cho 5 domain:
1. Tử Vi Đẩu Số
2. Tarot (Rider-Waite-Smith)
3. Chiêm Tinh Học (Western Astrology)
4. Thần Số Học (Pythagorean / Modern Numerology)
5. Độ Tương Hợp (Compatibility / Multi-System)

Hệ thống phải đảm bảo 100% tính xác thực (provenance traceability), phân rã tri thức thành atomic claims, điều kiện hóa rules, xử lý xung đột trường phái (conflict resolution) và cung cấp giao diện tích hợp trực tiếp cho `packages/interpretation-engine` và `packages/rule-engine`.

Tuyệt đối không dùng LLM tự bịa rule, không lưu paragraph thô, không dùng SEO/content farm làm thẩm quyền, và không ghép text sáo rỗng.

---

## 2. Cấu Trúc Gói Mới `packages/knowledge-base`

Tạo package `@mystic/knowledge-base` độc lập trong monorepo:

```text
packages/knowledge-base/
├── package.json
├── tsconfig.json
├── src/
│   ├── types/
│   │   ├── source.ts          # SourceRecord, SourceLevel, DomainType
│   │   ├── claim.ts           # AtomicClaim, ClaimPolarity, Location
│   │   ├── rule.ts            # InterpretationRule, EvidenceLevel, Condition
│   │   ├── conflict.ts        # SourceConflict, ConflictType, Resolution
│   │   └── registry.ts        # KnowledgeRegistry, TraceableEvidence
│   ├── sources/               # Thư viện nguồn chuẩn S0/S1/S2
│   │   ├── tarot.sources.ts       # A.E. Waite Pictorial Key, Golden Dawn
│   │   ├── tuvi.sources.ts        # Đạo Tạng, Tử Vi Đẩu Số Toàn Thư, Trung Châu
│   │   ├── astrology.sources.ts   # Ptolemy Tetrabiblos, Robert Hand, Steven Forrest
│   │   ├── numerology.sources.ts  # Greek Arithmology vs Matthew Goodwin / Juno Jordan
│   │   └── index.ts
│   ├── claims/                # Atomic Claims trích xuất từ nguồn
│   │   ├── tarot.claims.ts
│   │   ├── tuvi.claims.ts
│   │   ├── astrology.claims.ts
│   │   ├── numerology.claims.ts
│   │   └── index.ts
│   ├── rules/                 # Rules có điều kiện, tín hiệu và trọng số
│   │   ├── tarot.rules.ts
│   │   ├── tuvi.rules.ts
│   │   ├── astrology.rules.ts
│   │   ├── numerology.rules.ts
│   │   ├── compatibility.rules.ts
│   │   └── index.ts
│   ├── conflicts/             # Conflict Registry & Resolution Strategies
│   │   ├── source-conflicts.ts
│   │   └── index.ts
│   ├── registry/              # Knowledge Registry Manager
│   │   ├── knowledge-store.ts
│   │   └── provenance-tracer.ts
│   ├── validators/            # Bộ công cụ Audit & Test
│   │   ├── provenance-audit.ts
│   │   ├── anti-generic-audit.ts
│   │   └── golden-suite.ts
│   └── index.ts
```

---

## 3. Data Models & Type System

### 3.1. SourceRecord (Provenance Level S0–S4)

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

### 3.2. AtomicClaim (Tuyên bố nguyên tử)

```ts
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
  location?: {
    chapter?: string;
    page?: string;
    section?: string;
  };
  sourceConfidence: number; // 0.0 -> 1.0
}
```

### 3.3. InterpretationRule (Quy tắc diễn giải có điều kiện)

```ts
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

### 3.4. SourceConflict & Multi-System Compatibility

```ts
export interface SourceConflict {
  conflictId: string;
  topic: string;
  sources: string[];
  schoolA: string;
  schoolB: string;
  claimA: string;
  claimB: string;
  conflictType: 'different_school' | 'different_era' | 'different_definition' | 'true_contradiction';
  resolution: 'keep_separate' | 'school_specific' | 'prefer_primary' | 'requires_user_choice' | 'exclude';
  notes?: string;
}
```

---

## 4. Quy Trình Thực Thi 10 Phase

1. **Phase 1: Source Discovery**
   - Rà soát văn bản nền tảng S0 (A.E. Waite Pictorial Key, Chính Thống Đạo Tạng / Tử Vi Đẩu Số Toàn Thư, Ptolemy Tetrabiblos, Greek arithmology).
   - Thêm nguồn S1/S2 uy tín (Robert Hand, Steven Forrest, Matthew Goodwin, Vương Đình Chi - Trung Châu Phái).
2. **Phase 2: Source Verification**
   - Xác minh xuất bản, ấn bản, độ độc lập của nguồn.
   - Không gộp các trường phái (tách bạch RWS vs Thoth, Tử Vi Nam Phái vs Bắc Phái).
3. **Phase 3: Claim Extraction**
   - Trích xuất claim nguyên tử (Subject - Predicate - Object - Context - Polarity).
   - Lưu số trang, chương, paraphrase tiếng Việt chính xác.
4. **Phase 4: Cross-Source Validation**
   - Đối chiếu tối thiểu 2 nguồn độc lập cho các claim cốt lõi.
   - Ghi nhận dị biệt và mâu thuẫn vào `source-conflicts.ts`.
5. **Phase 5: Rule Extraction**
   - Chuyển hóa claims thành preconditions logic chính xác.
   - Không tạo rule dạng chung chung "Moon = emotions" mà phải qua "vị trí + cung + nhà + góc chiếu".
6. **Phase 6: Rule Audit**
   - Phân loại Evidence Level A, B, C, D, E, F.
   - Chỉ đưa A/B/C vào Core Rules. Đánh dấu rõ E (Mysticos-derived) với `derivationLogic`.
7. **Phase 7: Semantic Mapping**
   - Đồng bộ hóa các signals và themes với `packages/interpretation-engine/src/catalog.ts`.
8. **Phase 8: Interaction & Cross-System Patterns**
   - Xây dựng luật phối hợp tam hợp, nhị hợp, xung chiếu, synastry và số học tương hợp.
9. **Phase 9: Interpretation Engine Integration**
   - Xuất API `TraceableRegistry.lookupProvenance(outputId)` trả về chuỗi bằng chứng:
     `OUTPUT -> INTERPRETATION -> RULE -> CLAIM -> SOURCE -> PAGE/SECTION`.
10. **Phase 10: Golden & Anti-Generic Test**
    - Suite 50 test cases chuẩn trên từng domain.
    - Đo collision rate: tỷ lệ trùng lặp reasoning khi input khác nhau phải < 15%.
    - Kiểm tra loại bỏ triệt để các câu sáo rỗng vô căn cứ.

---

## 5. Báo Cáo Thẩm Định (Audit Report Summary)

Package cung cấp tiện ích chạy CLI report:
- Tổng số nguồn (Sources by Level S0/S1/S2).
- Tổng số Claims (Verified vs Unverified).
- Tổng số Rules (Evidence Level A/B/C/E).
- Bảng Top 20 Rules quan trọng nhất.
- Bảng Top 20 Mâu thuẫn trường phái (Conflicts & Resolutions).
- Bảng Top 20 Vùng tri thức còn thiếu (Missing Knowledge Areas).

---

## 6. Tiêu Chí Hoàn Thành (Definition of Done)

1. Package `@mystic/knowledge-base` build sạch, typecheck không lỗi.
2. 100% Core Rules có provenance dẫn ngược tới Claim ID và Source ID cụ thể.
3. Chạy thành công toàn bộ Golden Tests (tối thiểu 50 cases/domain) và Anti-Generic tests.
4. Đạt chuẩn monorepo workspace `pnpm build` và `pnpm test`.
