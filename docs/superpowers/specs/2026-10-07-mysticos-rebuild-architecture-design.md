# Tái Thiết Toàn Bộ Hệ Thống Mysticos: Kiến Trúc 17 Layer Dựa Trên Knowledge Base

- **Date**: 2026-10-07
- **Status**: Approved
- **Reference**: `prompt/result.md`, `prompt/source.md`, `AGENTS.md`, `prompt/design_rule.md`

---

## 1. Mục Tiêu & Phạm Vi

Tái thiết toàn bộ nền tảng MYSTICOS để `@mystic/knowledge-base` trở thành Single Source of Truth cho toàn bộ:
- Domain calculation & feature extraction.
- Rule evaluation & signal generation.
- Relationship engine & contextual reasoning.
- Pattern synthesis & interpretation.
- Practical implication & guidance.
- Frontend rendering & Why Panel.

Loại bỏ hoàn toàn các file hardcode paragraph tĩnh (e.g. `planetary-interpretations.ts`, các thư viện text sao chép không qua provenance), xóa bỏ domain logic trong UI components, và chuẩn hóa hợp đồng dữ liệu đầu ra thành `MysticosResult`.

---

## 2. Kiến Trúc 17 Layer

```text
LAYER 0  — RAW INPUT             : Ngày giờ, tọa độ, tên, quẻ bài, spread code.
LAYER 1  — NORMALIZATION         : Chuẩn hóa Can Chi, Julian Day, số học Pythagoras, vị trí bài.
LAYER 2  — DOMAIN CALCULATION    : Tọa độ hành tinh, cung hoàng đạo, an sao 12 cung, chỉ số số học.
LAYER 3  — VALIDATION            : Kiểm tra tính toàn vẹn dữ liệu, kiểm soát biên thời gian.
LAYER 4  — DOMAIN FEATURES       : Trích xuất góc chiếu, vương vị, miếu hãm, tam hợp, nợ nghiệp.
LAYER 5  — KNOWLEDGE BASE        : Nguồn S0-S2, atomic claims, rule preconditions từ @mystic/knowledge-base.
LAYER 6  — RULE EVALUATION       : Khớp quy tắc logic (Rule Evaluation Engine).
LAYER 7  — SIGNAL GENERATION     : Tạo các tín hiệu (Signals) có độ mạnh (strength) và phân cực (polarity).
LAYER 8  — RELATIONSHIP ENGINE   : Xác lập quan hệ tương tác (tương hỗ, xung khắc, chuyển tiếp).
LAYER 9  — CONTEXTUAL REASONING  : Suy luận ngữ cảnh theo vị trí, câu hỏi và hoàn cảnh.
LAYER 10 — PATTERN SYNTHESIS     : Tổng hợp tín hiệu thành các cấu trúc xu hướng chủ đạo (Patterns).
LAYER 11 — INTERPRETATION        : Diễn giải có cấu trúc theo các chiều kích (không sinh text rỗng).
LAYER 12 — PRACTICAL IMPLICATION : Hệ quả thực tế trong đời sống hàng ngày.
LAYER 13 — GUIDANCE              : Lời khuyên hành động thực tế (Tiếp tục / Điều chỉnh / Dừng lại).
LAYER 14 — EVIDENCE / PROVENANCE : Chuỗi truy vết 100% về quy tắc, tuyên ngôn và thư tịch cổ.
LAYER 15 — RESULT JSON           : Hợp đồng dữ liệu nhất quán MysticosResult.
LAYER 16 — TEXT RENDERING        : Bộ tạo văn bản theo văn phong thư tịch cổ điển và cấu trúc rõ ràng.
LAYER 17 — UI                    : Giao diện người dùng thuần hiển thị (Result Viewer & Why Panel).
```

---

## 3. Data Contracts (`@mystic/core/src/types/result.ts`)

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

---

## 4. Xóa Bỏ Legacy & Dọn Dẹp Mã Nguồn Thừa

1. **Xóa bỏ các tập tin paragraph tĩnh đồ sộ**:
   - Xóa `packages/astrology-engine/src/planetary-interpretations.ts` (107.7 KB văn bản cứng).
   - Xóa `MAJOR_ARCANA_DETAILED` và các hàm giả lập luận giải tĩnh trong `packages/tarot-engine/src/interpretations.ts`.
   - Chuẩn hóa các file `interpretations.ts` trong `packages/numerology-engine`, `packages/tuvi-engine`, `packages/astrology-engine` thành adapters sinh `SemanticUnit` và `Signal` kết nối với `@mystic/knowledge-base`.
2. **Loại bỏ text-stitching**: Không ghép nối chuỗi ngẫu nhiên; mọi kết luận phải đi qua quy trình Pattern Synthesis.
3. **Loại bỏ logic nghiệp vụ trong Frontend**:
   - Xóa mọi `if/else`, `switch/case` phân tích ý nghĩa các cung/sao/lá bài nằm rải rác trong `apps/web/app/*`.
   - Chuẩn hóa các trang web thành Client Presentation Layer nhận trực tiếp `MysticosResult`.

---

## 5. Frontend: Pure Result Viewer & Why Panel

Thiết kế component trung tâm:
- `<MysticosResultViewer result={result} />` đặt tại `apps/web/components/MysticosResultViewer.tsx`.
- `<WhyPanel />`: Trình bày minh bạch chuỗi lập luận:
  `KẾT QUẢ -> PATTERN -> SIGNALS -> APPLIED RULES -> ATOMIC CLAIMS -> PRIMARY SOURCES`.
- Đảm bảo nghiêm ngặt ngôn ngữ thiết kế: Font Serif (`Lora`), Sans (`Be Vietnam Pro`), Mono (`JetBrains Mono`), màu than chì `#111110`, viền `#282724`, accent gold `#BFA15F`.

---

## 6. Bộ Tài Liệu Bàn Giao (Theo Mục 33 `prompt/result.md`)

Tạo thư mục tài liệu kiến trúc `docs/architecture/` bao gồm:
1. `NEW_ARCHITECTURE.md`: Sơ đồ luồng 17 layer và nguyên lý thiết kế.
2. `MIGRATION_PLAN.md`: Kế hoạch chuyển đổi và loại bỏ mã cũ.
3. `KNOWLEDGE_SCHEMA.md`: Đặc tả cấu trúc tri thức và thẩm quyền nguồn.
4. `RULE_SCHEMA.md`: Đặc tả quy tắc điều kiện và kiểm định.
5. `ENGINE_CONTRACTS.md`: Hợp đồng kết nối giữa các engine.
6. `RESULT_SCHEMA.md`: Đặc tả lược đồ kết quả JSON chuẩn `MysticosResult`.
7. `EVIDENCE_ARCHITECTURE.md`: Kiến trúc mạng lưới bằng chứng và provenance trace.
8. `LEGACY_AUDIT.md`: Báo cáo audit các thành phần đã dọn dẹp và xóa bỏ.

---

## 7. Tiêu Chí Hoàn Thành (Definition of Done)

1. Mọi domain engine (Tarot, Tử Vi, Chiêm Tinh, Thần Số Học, Độ Tương Hợp) đều xuất ra `MysticosResult`.
2. 100% kết quả diễn giải truy ngược được nguồn gốc thư tịch qua `EvidenceReference`.
3. Toàn bộ các file văn bản cứng hàng trăm KB được loại bỏ triệt để.
4. Frontend các trang `tarot`, `astrology`, `tu-vi`, `numerology`, `compatibility` hiển thị hoàn hảo qua `MysticosResultViewer` và có `WhyPanel`.
5. Bộ kiểm thử toàn hệ thống đạt 100% passing (`npm run test`).
