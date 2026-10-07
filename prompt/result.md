
# MASTER PROMPT
## TÁI THIẾT TOÀN BỘ HỆ THỐNG MYSTICOS SAU KHI ĐÃ CÓ KNOWLEDGE BASE

---

# 0. VAI TRÒ

Bạn là:

- Principal Software Architect
- Domain Engine Architect
- Knowledge Graph / Rule Engine Engineer
- Deterministic Reasoning Engineer
- Research Knowledge Engineer
- Data Model Architect
- QA / Validation Engineer

Bạn đang tiếp quản một hệ thống MYSTICOS đã có:

1. Knowledge Base từ các nguồn đã crawl và kiểm chứng.
2. Source provenance.
3. Atomic Claims.
4. Interpretation Rules.
5. School / Tradition metadata.
6. Evidence levels.
7. Conflict database.
8. Một hoặc nhiều domain engines hiện có.
9. Frontend hiện có nhưng có thể đang chứa rất nhiều logic cũ.

Mục tiêu không phải sửa vài bug.

Mục tiêu là:

> **TÁI THIẾT MYSTICOS ĐỂ KNOWLEDGE BASE TRỞ THÀNH SOURCE OF TRUTH CHO TOÀN BỘ DOMAIN ENGINE, RULE ENGINE, REASONING ENGINE VÀ RESULT SYSTEM.**

---

# 1. NGUYÊN TẮC TUYỆT ĐỐI

## 1.1. Knowledge Base là nguồn sự thật

Sau khi KB đã được verified/approved:

```text
KNOWLEDGE BASE
      ↓
CLAIMS
      ↓
RULES
      ↓
SEMANTIC MODEL
      ↓
SIGNALS
      ↓
RELATIONSHIPS
      ↓
CONTEXTUAL REASONING
      ↓
PATTERN SYNTHESIS
      ↓
INTERPRETATION
      ↓
PRACTICAL IMPLICATION
      ↓
GUIDANCE
      ↓
RESULT
      ↓
UI
```

Không được đi theo:

```text
KB
↓
AI prompt
↓
LLM tự luận
↓
text
```

Không sử dụng LLM/AI để quyết định domain meaning trong core engine.

LLM nếu có chỉ được dùng ở lớp ngoài cùng cho:

- paraphrase đã được xác định
- localization
- stylistic rendering

và tuyệt đối không được:

- thêm claim
- thêm rule
- thay đổi polarity
- thay đổi strength
- tạo interpretation mới
- tạo advice mới
- suy diễn domain fact.

---

# 2. MỤC TIÊU KIẾN TRÚC MỚI

Thiết kế lại hệ thống thành các layer rõ ràng:

```text
LAYER 0 — RAW INPUT
LAYER 1 — NORMALIZATION
LAYER 2 — DOMAIN CALCULATION
LAYER 3 — VALIDATION
LAYER 4 — DOMAIN FEATURES
LAYER 5 — KNOWLEDGE BASE
LAYER 6 — RULE EVALUATION
LAYER 7 — SIGNAL GENERATION
LAYER 8 — RELATIONSHIP ENGINE
LAYER 9 — CONTEXTUAL REASONING
LAYER 10 — PATTERN SYNTHESIS
LAYER 11 — INTERPRETATION
LAYER 12 — PRACTICAL IMPLICATION
LAYER 13 — GUIDANCE
LAYER 14 — EVIDENCE / PROVENANCE
LAYER 15 — RESULT JSON
LAYER 16 — TEXT RENDERING
LAYER 17 — UI
```

Mỗi layer phải có:

- input contract
- output contract
- responsibility
- invariants
- tests.

Không được để layer này làm nhiệm vụ của layer khác.

---

# 3. BƯỚC 1 — AUDIT CODEBASE HIỆN TẠI

Trước khi sửa code, phải audit toàn bộ repository.

Không được lập tức refactor.

Hãy tạo:

```text
/system-audit/
```

với:

```text
architecture-map.md
engine-map.md
domain-map.md
knowledge-map.md
rule-map.md
frontend-logic-map.md
hardcoded-interpretation-map.md
dependency-map.md
legacy-risk-map.md
migration-plan.md
```

## Audit phải tìm:

### A. Hard-coded interpretation

Tìm:

- paragraph dài
- defaultInterpretation
- defaultAdvice
- genericMeaning
- careerText
- loveText
- financeText
- uprightText
- reversedText
- description
- summary
- insight
- interpretation
- advice

và kiểm tra xem chúng có phải:

```text
input
→ semantic
→ rule
→ reasoning
```

hay chỉ là:

```text
card/number/star
→ paragraph
```

Nếu là trường hợp thứ hai:

```text
LEGACY INTERPRETATION
```

---

### B. Hard-coded domain logic trong UI

Tìm:

```tsx
if (...)
switch (...)
cardName === ...
number === ...
star === ...
```

đặc biệt trong:

- JSX
- React components
- page components
- client components
- UI helpers.

Domain logic phải được chuyển về engine.

Frontend chỉ:

```text
RESULT JSON
→ RENDER
```

---

### C. Text stitching

Tìm code kiểu:

```ts
`${meaning1} ${meaning2} ${meaning3}`
```

hoặc:

```ts
const interpretation =
  cardMeaning +
  positionMeaning +
  genericAdvice;
```

Đây không được coi là reasoning.

Phải refactor thành:

```text
semantic
→ signal
→ relationship
→ pattern
→ interpretation
```

---

### D. Duplicate rule

Tìm:

- cùng một rule ở nhiều file
- cùng một interpretation dưới nhiều tên
- cùng một card/number/star có nhiều meaning khác nhau
- rule trong frontend khác rule trong backend
- rule trong prompt khác rule trong code.

Knowledge Base phải trở thành canonical source.

---

# 4. BƯỚC 2 — THIẾT KẾ KNOWLEDGE MODEL

Knowledge Base phải có schema chuẩn.

Không lưu đơn giản:

```json
{
  "name": "Seven of Pentacles",
  "meaning": "patience"
}
```

Phải hỗ trợ provenance và reasoning.

Ví dụ:

```json
{
  "claimId": "claim.tarot.7pentacles.patience",
  "domain": "tarot",
  "subject": "seven_of_pentacles",
  "predicate": "associated_with",
  "object": "patience",
  "context": {
    "orientation": "upright"
  },
  "school": "RWS",
  "evidenceLevel": "A",
  "sourceIds": [
    "waite-1910"
  ]
}
```

---

# 5. KNOWLEDGE BASE KHÔNG PHẢI RULE DATABASE

Phân biệt tuyệt đối:

```text
SOURCE
↓
CLAIM
↓
SEMANTIC KNOWLEDGE
↓
RULE
```

Ví dụ:

```text
Claim:
Seven of Pentacles is associated with patience.

Rule:
IF
  card = Seven of Pentacles
  AND orientation = upright
  AND position context = outcome/evaluation
THEN
  signal = long_term_evaluation
```

Không được biến mọi claim thành rule trực tiếp.

---

# 6. RULE MODEL

Mỗi rule phải có:

```ts
interface InterpretationRule {
  ruleId: string;

  domain:
    | "tarot"
    | "astrology"
    | "numerology"
    | "tu_vi"
    | "compatibility";

  school: string;

  sourceIds: string[];

  claimIds: string[];

  preconditions: Condition[];

  semanticInputs: SemanticInput[];

  derivedSignals: SignalDefinition[];

  relationships?: RelationshipDefinition[];

  pattern?: PatternDefinition;

  polarity?: "supportive" | "neutral" | "tension" | "mixed";

  priority: number;

  confidence: number;

  evidenceLevel:
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F";

  exceptions?: Condition[];

  weakeningFactors?: Condition[];

  contradictionRules?: string[];

  version: string;

  status:
    | "draft"
    | "verified"
    | "approved"
    | "deprecated";
}
```

---

# 7. RULE ENGINE

Rule engine chỉ làm:

```text
FACTS
+
KNOWLEDGE
+
CONTEXT
↓
MATCH RULES
↓
GENERATE SIGNALS
```

Không generate paragraph.

Ví dụ:

```ts
evaluateRules({
  facts,
  semantics,
  context,
  rules
})
```

output:

```json
{
  "signals": [
    {
      "signalId": "sig-001",
      "type": "long_term_evaluation",
      "polarity": "supportive",
      "strength": 0.72,
      "ruleIds": ["rule-7p-001"],
      "claimIds": ["claim-7p-001"]
    }
  ]
}
```

---

# 8. SIGNAL ENGINE

Signal không phải interpretation.

Ví dụ:

```text
Semantic:
patience
investment
waiting
assessment
```

không được render ngay.

Signal engine có thể tạo:

```text
investment_under_evaluation
delayed_return
continue_or_adjust
resource_commitment
decision_pause
```

Signal phải phụ thuộc context.

---

# 9. RELATIONSHIP ENGINE

Đây là layer bắt buộc.

Không được phân tích từng semantic unit độc lập.

Relationship types tối thiểu:

```text
reinforcement
contrast
tension
progression
transition
causal_sequence
theme_repetition
complementarity
modification
amplification
mitigation
blocking
activation
resolution
```

Ví dụ Tarot:

```text
7 Pentacles
→ evaluation

8 Cups
→ departure

Star
→ reorientation
```

Không output:

```text
7 Pentacles meaning...
8 Cups meaning...
Star meaning...
```

Mà:

```text
evaluation
→ dissatisfaction / reassessment
→ departure
→ reorientation
```

Đây mới là synthesis.

---

# 10. CONTEXTUAL REASONING ENGINE

Reasoning phải phụ thuộc:

```text
INPUT
+
DOMAIN
+
POSITION
+
CONTEXT
+
OTHER FACTORS
+
RULES
+
RELATIONSHIPS
```

Ví dụ Tarot:

```text
CARD
×
POSITION
×
ORIENTATION
×
QUESTION
×
SPREAD
×
OTHER CARDS
```

Astrology:

```text
PLANET
×
SIGN
×
HOUSE
×
ASPECT
×
ORB
×
CHART CONTEXT
```

Tử Vi:

```text
PALACE
×
STARS
×
DIGNITY
×
TỨ HÓA
×
TAM PHƯƠNG TỨ CHÍNH
×
XUNG CHIẾU
×
GIÁP CUNG
×
TUẦN/TRIỆT
×
PERIOD
```

Numerology:

```text
NUMBER
×
NUMBER TYPE
×
OTHER NUMBERS
×
CYCLE
×
MATRIX
×
FRAMEWORK
```

Compatibility:

```text
PERSON A
×
PERSON B
×
SYSTEM
×
DIMENSION
×
RELATIONSHIP
×
CONTEXT
```

---

# 11. PATTERN SYNTHESIS

Pattern engine phải trả lời:

> "Các tín hiệu này đang tạo thành pattern nào?"

Không chỉ:

> "Có những tín hiệu nào?"

Ví dụ:

```json
{
  "patternId": "pattern-evaluate-adjust",
  "type": "decision_reassessment",
  "signals": [
    "investment_under_evaluation",
    "delayed_return",
    "continue_or_adjust"
  ],
  "relationships": [
    "reinforcement",
    "tension"
  ],
  "dominance": 0.81,
  "contextFit": 0.88
}
```

---

# 12. PRIORITIZATION ENGINE

Không phải signal nào cũng có giá trị như nhau.

Tính priority dựa trên:

```text
strength
×
specificity
×
contextFit
×
evidenceQuality
×
relationshipDensity
×
domainRelevance
```

Không ưu tiên dựa trên:

- độ dài text
- vị trí UI
- thứ tự database
- random
- hard-coded importance.

---

# 13. CONTRADICTION ENGINE

Nếu KB có các rule mâu thuẫn:

KHÔNG được âm thầm chọn một rule.

Phải ghi:

```json
{
  "type": "knowledge_conflict",
  "rules": [
    "rule-A",
    "rule-B"
  ],
  "reason": "different_school",
  "resolution": "preserve_both"
}
```

Nếu cùng school:

```text
higher priority
+
more specific precondition
+
higher evidence
+
context fit
```

có thể được dùng để resolve.

Nhưng phải giữ provenance.

---

# 14. SCHOOL / TRADITION ENGINE

Không được trộn các trường phái thành một hệ thống giả thống nhất.

Mỗi rule phải biết:

```text
school
tradition
version
source
```

Ví dụ:

```text
RWS
Modern Tarot
Pythagorean Numerology
Modern Numerology
Classical Astrology
Modern Western Astrology
Tử Vi school X
Tử Vi school Y
```

Nếu người dùng chọn school:

```text
ONLY USE RULES COMPATIBLE WITH THAT SCHOOL
```

Nếu MYSTICOS có canonical school:

```text
MYSTICOS DEFAULT SCHOOL
```

phải định nghĩa rõ.

---

# 15. EVIDENCE GRAPH

Mọi kết luận phải truy ngược được:

```text
RESULT
↓
INTERPRETATION
↓
PATTERN
↓
SIGNALS
↓
RULE
↓
CLAIM
↓
SOURCE
↓
DOCUMENT
↓
PAGE / SECTION
```

Không có provenance:

```text
KHÔNG ĐƯỢC COI LÀ VERIFIED KNOWLEDGE
```

---

# 16. OUTPUT MODEL MỚI

Tạo canonical result contract:

```ts
interface MysticosResult {
  resultId: string;

  domain: string;

  inputSummary: InputSummary;

  precision: PrecisionLevel;

  facts: Fact[];

  semantics: SemanticUnit[];

  signals: Signal[];

  relationships: Relationship[];

  patterns: Pattern[];

  tensions: Tension[];

  interpretations: Interpretation[];

  implications: PracticalImplication[];

  guidance: Guidance[];

  evidence: EvidenceReference[];

  conflicts: KnowledgeConflict[];

  technical: TechnicalTrace;

  metadata: {
    engineVersion: string;
    knowledgeBaseVersion: string;
    rulesVersion: string;
    school: string;
    deterministic: true;
    generatedAt?: string;
  };
}
```

---

# 17. INTERPRETATION MODEL

Interpretation phải được tạo từ pattern.

```ts
interface Interpretation {
  interpretationId: string;

  dimension: string;

  statementId: string;

  polarity:
    | "supportive"
    | "challenging"
    | "mixed"
    | "context_dependent";

  strength: number;

  confidence: number;

  patternIds: string[];

  signalIds: string[];

  ruleIds: string[];

  evidenceIds: string[];

  context: Record<string, unknown>;
}
```

Không cho phép:

```ts
interpretation: "hard coded paragraph"
```

trong domain data.

---

# 18. PRACTICAL IMPLICATION ENGINE

Không nhảy trực tiếp từ card/star/number → advice.

Phải:

```text
PATTERN
↓
INTERPRETATION
↓
IMPLICATION
↓
GUIDANCE
```

Ví dụ:

```text
Pattern:
continue_or_adjust

Interpretation:
current investment may require reassessment

Implication:
continuing automatically may not be optimal

Guidance:
review expected return, sunk cost and alternative options before increasing commitment
```

Guidance phải trace được về interpretation.

---

# 19. DOMAIN REBUILD

## 19.1 TAROT

Rebuild:

```text
CARD
→ POSITION
→ ORIENTATION
→ QUESTION
→ SEMANTICS
→ SIGNALS
→ CARD RELATIONSHIPS
→ SPREAD PATTERN
→ SYNTHESIS
→ GUIDANCE
```

Không còn:

```ts
getDetailedCardInsights()
```

trả về paragraph generic.

Thay bằng:

```ts
getCardSemantics()
evaluateCardContext()
evaluateCardRelationships()
synthesizeSpread()
```

---

## 19.2 ASTROLOGY

Không:

```text
Mars = aggression
Venus = love
```

mà:

```text
planet
+
sign
+
house
+
aspect
+
orb
+
chart context
```

→ signal → relationship → pattern.

---

## 19.3 TỬ VI

Không phân tích:

```text
12 cung
12 paragraph
```

một cách độc lập.

Phải:

```text
Mệnh
+
Thân
+
Tam Phương Tứ Chính
+
Xung Chiếu
+
Giáp Cung
+
Tứ Hóa
+
Miếu/Vượng/Đắc/Hãm
+
Tuần/Triệt
+
Đại Hạn
+
Lưu Niên
```

→ pattern.

---

## 19.4 NUMEROLOGY

Không:

```text
Life Path 7 = paragraph
Destiny 3 = paragraph
Soul 1 = paragraph
```

mà:

```text
number
×
type
×
other numbers
×
cycle
×
matrix
```

→ interactions → patterns.

---

## 19.5 COMPATIBILITY

Không:

```text
A = X
B = Y
X + Y = compatible
```

Phải:

```text
A SIGNAL
×
B SIGNAL
↓
INTERACTION
↓
DIMENSION
↓
SUPPORT / TENSION
↓
REAL-LIFE MANIFESTATION
```

Dimensions:

```text
emotional
communication
attraction
affection
conflict
values
money
daily_life
commitment
growth
```

---

# 20. CROSS-DOMAIN ENGINE

Nếu MYSTICOS kết hợp nhiều hệ thống:

KHÔNG:

```text
Tarot says X
Astrology says X
Numerology says X
→ therefore X is true
```

Phải:

```text
SYSTEM A → THEME X
SYSTEM B → THEME X
SYSTEM C → THEME Y
```

Sau đó:

```text
cross_system_reinforcement
cross_system_divergence
cross_system_uncertainty
```

MYSTICOS phải nói rõ:

```text
shared symbolic theme
```

không phải:

```text
objective confirmation
```

---

# 21. KNOWLEDGE VERSIONING

Mỗi result phải biết nó được tạo bằng:

```text
engineVersion
knowledgeBaseVersion
rulesVersion
schoolVersion
calculationVersion
```

Ví dụ:

```json
{
  "engineVersion": "2.0.0",
  "knowledgeBaseVersion": "2026.10",
  "rulesVersion": "2026.10.3",
  "schoolVersion": "rws-1.0"
}
```

Nếu KB thay đổi:

```text
same input
+
new KB
=
potentially different result
```

Điều này phải được coi là expected behavior.

---

# 22. DETERMINISM

Cùng:

```text
input
+
engine version
+
KB version
+
rule version
+
school
```

phải tạo:

```text
same facts
same signals
same relationships
same patterns
same interpretation
same guidance
```

Không:

- random
- temperature
- LLM generation
- timestamp-dependent reasoning
- unstable ordering
- unordered object iteration gây thay đổi output.

---

# 23. FRONTEND REBUILD

Frontend phải trở thành:

```text
RESULT VIEWER
```

không phải:

```text
DOMAIN ENGINE
```

Component chỉ nhận:

```ts
<MysticosResult />
```

và render:

```text
KẾT QUẢ CHÍNH
↓
DIỄN GIẢI
↓
PATTERN
↓
ỨNG DỤNG
↓
VÌ SAO?
↓
EVIDENCE
↓
TECHNICAL
```

Không được chứa:

```text
Tarot rules
Astrology rules
Numerology rules
Tử Vi rules
Compatibility rules
```

---

# 24. WHY PANEL

Mọi kết luận quan trọng phải có:

```text
VÌ SAO HỆ THỐNG ĐƯA RA KẾT QUẢ NÀY?
```

Render:

```text
Kết quả
↓
Pattern
↓
Signals
↓
Rules
↓
Evidence
↓
Sources
```

Không expose hidden chain-of-thought.

Chỉ expose:

- observable facts
- applied rules
- evidence
- provenance
- deterministic reasoning artifacts.

---

# 25. MIGRATION STRATEGY

Không rewrite toàn bộ một lần.

Thực hiện:

```text
PHASE 1
AUDIT

PHASE 2
CANONICAL DATA MODEL

PHASE 3
KNOWLEDGE BASE ADAPTER

PHASE 4
RULE ENGINE

PHASE 5
SIGNAL ENGINE

PHASE 6
RELATIONSHIP ENGINE

PHASE 7
REASONING ENGINE

PHASE 8
PATTERN SYNTHESIS

PHASE 9
INTERPRETATION

PHASE 10
GUIDANCE

PHASE 11
RESULT CONTRACT

PHASE 12
UI MIGRATION

PHASE 13
REMOVE LEGACY

PHASE 14
REGRESSION
```

Không được giữ hai nguồn sự thật lâu dài.

---

# 26. LEGACY COMPATIBILITY

Nếu cần giữ hệ thống cũ trong thời gian migration:

```text
LEGACY ENGINE
```

chỉ được coi là:

```text
fallback / comparison
```

không phải source of truth.

Mỗi legacy result phải đánh dấu:

```json
{
  "source": "legacy",
  "verified": false
}
```

---

# 27. TESTING

Bắt buộc xây test suite.

## A. Determinism

```text
same input × 100
→ same result
```

## B. Entity swap

Tarot:

```text
7 Pentacles
→
Tower
```

phải thay đổi semantic/signal/pattern/interpretation.

## C. Position swap

```text
current situation
vs
outcome
```

phải thay đổi reasoning.

## D. Orientation swap

```text
upright
vs
reversed
```

phải tạo context khác.

## E. Combination swap

```text
A + B + C
```

vs

```text
A + C + B
```

phải giữ kết quả nếu thứ tự không mang semantics.

Nhưng:

```text
Past → Present → Future
```

phải khác:

```text
Future → Present → Past
```

nếu position semantics khác.

## F. Remove-one-input

Bỏ một factor phải làm thay đổi evidence graph khi factor đó thực sự đóng góp.

## G. Counterfactual

Nếu thay đổi một fact quan trọng:

```text
expected reasoning change
```

## H. Knowledge version

```text
KB v1
vs
KB v2
```

phải trace được vì sao output thay đổi.

---

# 28. GOLDEN CASES

Tạo bộ golden cases cho từng domain.

Ví dụ:

```text
/golden/
  tarot/
  astrology/
  numerology/
  tu-vi/
  compatibility/
```

Mỗi case:

```json
{
  "input": {},
  "knowledgeVersion": "",
  "expectedSignals": [],
  "expectedRelationships": [],
  "expectedPatterns": [],
  "expectedInterpretations": [],
  "expectedEvidence": []
}
```

Không snapshot chỉ final paragraph.

Phải snapshot:

```text
facts
semantics
signals
relationships
patterns
interpretations
evidence
```

---

# 29. KNOWLEDGE COVERAGE

Tạo report:

```text
knowledge-coverage.md
```

Phải biết:

```text
claims total
claims verified
claims approved
rules total
rules approved
rules unused
rules conflicting
rules without source
claims without rule
rules without test
rules without interpretation
interpretations without evidence
```

---

# 30. DEAD KNOWLEDGE

Tìm:

```text
claim tồn tại nhưng không được engine sử dụng
rule tồn tại nhưng không bao giờ match
semantic tồn tại nhưng không tạo signal
signal tồn tại nhưng không ảnh hưởng pattern
pattern tồn tại nhưng không ảnh hưởng interpretation
```

Đây là:

```text
dead knowledge
dead rules
dead semantics
dead reasoning
```

phải được báo cáo.

---

# 31. OVERFITTING

Không tạo rule kiểu:

```text
IF card = X
AND position = Y
AND question = Z
THEN exact paragraph
```

trừ khi có nguồn rõ ràng và rule thực sự đặc thù.

Ưu tiên:

```text
general semantic rules
+
context modifiers
+
relationship rules
+
pattern synthesis
```

Điều này giúp hệ thống có khả năng generalize.

---

# 32. KHÔNG ĐƯỢC LÀM

TUYỆT ĐỐI KHÔNG:

- thêm 78 đoạn Tarot hard-code
- thêm 12 đoạn cho 12 cung
- thêm paragraph cho từng số
- dùng LLM để "luận" từ KB
- ghép text để giả reasoning
- tạo compatibility percentage không có model
- thêm generic advice
- đưa domain logic vào JSX
- duplicate rules giữa frontend/backend
- trộn school
- biến claim thành rule một cách máy móc
- bỏ provenance
- dùng source popularity làm evidence
- che giấu conflict
- tự động chọn một trường phái khi source conflict
- gọi modern interpretation là classical rule
- biến symbolic interpretation thành fact khoa học
- tạo deterministic output bằng cách hard-code final answer.

---

# 33. OUTPUT CẦN GIAO

Sau khi hoàn thành, phải trả về:

## 1. Architecture

```text
NEW_ARCHITECTURE.md
```

## 2. Migration

```text
MIGRATION_PLAN.md
```

## 3. Knowledge schema

```text
KNOWLEDGE_SCHEMA.md
```

## 4. Rule schema

```text
RULE_SCHEMA.md
```

## 5. Engine contracts

```text
ENGINE_CONTRACTS.md
```

## 6. Result contract

```text
RESULT_SCHEMA.md
```

## 7. Evidence architecture

```text
EVIDENCE_ARCHITECTURE.md
```

## 8. Legacy audit

```text
LEGACY_AUDIT.md
```

## 9. Rule coverage

```text
RULE_COVERAGE.md
```

## 10. Test report

```text
ENGINE_TEST_REPORT.md
```

## 11. Knowledge coverage

```text
KNOWLEDGE_COVERAGE.md
```

## 12. Final architecture diagram

Phải thể hiện:

```text
INPUT
 ↓
NORMALIZATION
 ↓
CALCULATION
 ↓
VALIDATION
 ↓
FEATURES
 ↓
KNOWLEDGE BASE
 ↓
RULE ENGINE
 ↓
SIGNAL ENGINE
 ↓
RELATIONSHIP ENGINE
 ↓
REASONING ENGINE
 ↓
PATTERN SYNTHESIS
 ↓
INTERPRETATION
 ↓
IMPLICATION
 ↓
GUIDANCE
 ↓
EVIDENCE
 ↓
RESULT JSON
 ↓
RENDERER
 ↓
UI
```

---

# 34. DEFINITION OF DONE

Không được tuyên bố hoàn thành chỉ vì:

```text
build pass
lint pass
UI đẹp
```

MYSTICOS chỉ được coi là hoàn thành khi:

### KNOWLEDGE

```text
Every important claim has provenance.
Every production rule has approved evidence.
School differences are explicit.
Conflicts are preserved.
```

### ENGINE

```text
Rules are executable.
Signals are contextual.
Relationships are explicit.
Patterns are synthesized.
Interpretations depend on patterns.
Guidance depends on interpretations.
```

### ARCHITECTURE

```text
No domain logic in UI.
No final interpretation hard-coded in components.
No duplicated rule source.
No hidden school mixing.
```

### DETERMINISM

```text
same input
+
same versions
=
same output
```

### TRACEABILITY

Có thể đi:

```text
RESULT
→ INTERPRETATION
→ PATTERN
→ SIGNAL
→ RULE
→ CLAIM
→ SOURCE
```

### COUNTERFACTUAL

Khi thay đổi input:

```text
relevant reasoning changes
```

chứ không chỉ thay đổi wording.

### USER VALUE

Người dùng có thể hiểu:

```text
WHAT
WHY
HOW IT MAY MANIFEST
WHAT TO WATCH
WHAT TO DO
```

---

# 35. THỨ TỰ THỰC THI BẮT BUỘC

Không được bắt đầu bằng UI.

Không được bắt đầu bằng copywriting.

Không được bắt đầu bằng prompt.

Thứ tự:

```text
1. AUDIT CURRENT SYSTEM

2. FREEZE LEGACY INTERPRETATION

3. VALIDATE KNOWLEDGE BASE

4. DEFINE CANONICAL SCHEMA

5. BUILD KNOWLEDGE ADAPTER

6. BUILD RULE ENGINE

7. BUILD SIGNAL ENGINE

8. BUILD RELATIONSHIP ENGINE

9. BUILD CONTEXTUAL REASONING

10. BUILD PATTERN SYNTHESIS

11. BUILD INTERPRETATION

12. BUILD GUIDANCE

13. BUILD EVIDENCE GRAPH

14. BUILD RESULT CONTRACT

15. MIGRATE UI

16. REMOVE LEGACY LOGIC

17. RUN GOLDEN TESTS

18. RUN COUNTERFACTUAL TESTS

19. RUN DETERMINISM TESTS

20. PRODUCE FINAL AUDIT
```

---

# 36. QUY TẮC QUAN TRỌNG NHẤT

Đừng hỏi:

> "Làm thế nào để MYSTICOS tạo ra nhiều câu luận giải hơn?"

Hãy hỏi:

> "Làm thế nào để cùng một Knowledge Base có thể tạo ra những kết luận khác nhau một cách hợp lệ khi facts, context, relationships và patterns thay đổi?"

Nếu chỉ thay đổi text:

```text
FAIL
```

Nếu semantic thay đổi nhưng reasoning không thay đổi:

```text
INVESTIGATE
```

Nếu relationship thay đổi nhưng pattern không thay đổi:

```text
INVESTIGATE
```

Nếu pattern thay đổi nhưng interpretation không thay đổi:

```text
FAIL
```

Nếu interpretation thay đổi nhưng guidance luôn giống nhau:

```text
FAIL
```

Nếu input thay đổi và toàn bộ reasoning chain thay đổi hợp lý:

```text
PASS
```

---

# FINAL PRINCIPLE

MYSTICOS không được trở thành:

```text
DATABASE
+
PARAGRAPH LIBRARY
```

MYSTICOS phải trở thành:

```text
KNOWLEDGE BASE
+
DETERMINISTIC RULES
+
CONTEXTUAL REASONING
+
PATTERN SYNTHESIS
+
EVIDENCE GRAPH
+
PRACTICAL INTERPRETATION
```

Mục tiêu cuối cùng:

> **Knowledge Base quyết định hệ thống biết gì.**
>
> **Rule Engine quyết định khi nào kiến thức được kích hoạt.**
>
> **Relationship Engine quyết định các yếu tố tác động lẫn nhau thế nào.**
>
> **Reasoning Engine quyết định pattern nào đang hình thành.**
>
> **Interpretation Engine quyết định pattern đó có ý nghĩa gì trong context.**
>
> **Guidance Engine quyết định người dùng nên chú ý hoặc hành động thế nào.**
>
> **Evidence Graph chứng minh vì sao hệ thống đi đến kết luận đó.**
>
> **UI chỉ có nhiệm vụ làm cho toàn bộ quá trình này dễ hiểu.**

**Không dùng AI để thay thế reasoning engine.**

**Không dùng paragraph để giả lập reasoning.**

**Không dùng Knowledge Base như một kho text.**

**Không dùng frontend như domain engine.**

**Không dùng “đa dạng câu chữ” làm thước đo chất lượng.**

Thước đo thật là:

```text
INPUT CHANGE
↓
FACT CHANGE
↓
SIGNAL CHANGE
↓
RELATIONSHIP CHANGE
↓
PATTERN CHANGE
↓
INTERPRETATION CHANGE
↓
GUIDANCE CHANGE
```

khi và chỉ khi những thay đổi đó có ý nghĩa theo Knowledge Base và Rule System.

Đó là kiến trúc MYSTICOS cần đạt tới.