# MASTER PROMPT

## THIẾT KẾ ĐỘ TƯƠNG HỢP ENGINE 100% DETERMINISTIC

### Multi-System Compatibility → Evidence → Dimensions → Interaction → Synthesis → Practical Guidance

---

# 0. VAI TRÒ

Bạn là Senior Compatibility Systems Architect + Rules Engine Engineer.

Nhiệm vụ là xây dựng module:

# 05 — ĐỘ TƯƠNG HỢP

cho MYSTICOS.

Module phải hoàn toàn deterministic.

KHÔNG sử dụng:

* AI
* LLM
* machine learning
* embedding
* vector database
* semantic search
* random score
* AI-generated compatibility interpretation
* AI-generated relationship advice.

Toàn bộ kết quả phải đi qua:

```text
PERSON A
+
PERSON B
      ↓
NORMALIZATION
      ↓
INDIVIDUAL CHARTS / NUMEROLOGY
      ↓
PAIRWISE FEATURES
      ↓
INTERACTION RULES
      ↓
COMPATIBILITY DIMENSIONS
      ↓
EVIDENCE GRAPH
      ↓
CONFLICT RESOLUTION
      ↓
DETERMINISTIC SYNTHESIS
      ↓
PRACTICAL GUIDANCE
      ↓
JSON
      ↓
UI
```

---

# 1. NGUYÊN TẮC CỐT LÕI

Không được xây:

```text
A = Taurus
B = Libra
↓
Air + Earth
↓
82% compatible
```

Đây là quá đơn giản.

Phải xây:

```text
A DATA
×
B DATA
↓
INTERACTIONS
↓
DIMENSIONS
↓
SUPPORTING SIGNALS
↓
TENSION SIGNALS
↓
SYNTHESIS
```

---

# 2. TƯƠNG HỢP KHÔNG PHẢI "GIỐNG NHAU"

Phải phân biệt:

```text
Similarity
Complementarity
Compatibility
Friction
Growth
```

Ví dụ:

Hai người có tính cách giống nhau:

```text
Similarity = high
```

nhưng vẫn có thể:

```text
Communication compatibility = low
```

Ngược lại, hai người khác nhau:

```text
Difference = high
```

nhưng có thể:

```text
Complementarity = high
```

Do đó không được dùng:

```text
similarity = compatibility
```

---

# 3. KHÔNG CÓ "MỘT CON SỐ TƯƠNG HỢP"

Không mặc định:

```text
Compatibility = 87%
```

Nếu MYSTICOS muốn có visualization thì chỉ được dùng khi có scoring model chính thức.

Tốt hơn:

```text
Emotional connection
Communication
Attraction
Conflict
Values
Money
Commitment
Growth
```

và mỗi dimension có:

```text
Supporting
Balanced
Tension
```

hoặc:

```text
Low
Moderate
High
```

nhưng phải có rule xác định.

---

# 4. INPUT MODEL

Tối thiểu:

```ts
interface CompatibilityInput {
  personA: PersonInput
  personB: PersonInput
}
```

Trong đó:

```ts
interface PersonInput {
  name?: string

  birthDate: string

  birthTime?: string

  birthPlace?: {
    latitude: number
    longitude: number
    timezone: string
  }

  gender?: Gender
}
```

---

# 5. INPUT PRECISION LEVEL

Không được giả vờ hai người có cùng mức độ dữ liệu.

Tạo:

```ts
enum PrecisionLevel {
  BASIC,
  NUMEROLOGY,
  SUN_CHART,
  FULL_NATAL
}
```

Ví dụ:

### BASIC

Chỉ có:

```text
birth date
name
```

### FULL NATAL

Có:

```text
birth date
birth time
birth place
```

Engine phải biết:

```text
what can be calculated
what cannot be calculated.
```

---

# 6. MISSING DATA

Nếu A có birth time nhưng B không có:

Không được nói:

> Hai người có Synastry đầy đủ.

Phải ghi:

```text
Astrology compatibility precision:
PARTIAL
```

và loại bỏ các kết luận cần:

* Ascendant
* houses
* angles
* exact Moon if uncertainty is material.

---

# 7. MULTI-SYSTEM ARCHITECTURE

Compatibility Engine không tự tính lại Numerology hay Astrology.

Nó phải consume:

```text
Astrology Engine
Numerology Engine
TuVi Engine
```

Ví dụ:

```text
PERSON A
 ├── AstrologyResult
 ├── NumerologyResult
 └── TuViResult

PERSON B
 ├── AstrologyResult
 ├── NumerologyResult
 └── TuViResult
```

Sau đó:

```text
Compatibility Engine
```

chỉ làm pairwise analysis.

---

# 8. SYSTEM ENABLEMENT

Config:

```ts
interface CompatibilityConfig {
  astrology: {
    enabled: boolean
    weight?: number
  }

  numerology: {
    enabled: boolean
    weight?: number
  }

  tuVi: {
    enabled: boolean
    weight?: number
  }
}
```

Nhưng:

**Không được cộng trọng số một cách tùy tiện.**

Nếu MYSTICOS chưa có một mô hình scoring hợp lệ, hãy dùng:

```text
cross-system evidence
```

thay vì:

```text
Astrology = 50%
Numerology = 30%
TuVi = 20%
```

---

# 9. ASTROLOGY COMPATIBILITY

Nếu có birth time/place:

Tính Synastry:

```text
A planets
×
B planets
```

Bao gồm:

```text
Sun
Moon
Mercury
Venus
Mars
Jupiter
Saturn
Uranus
Neptune
Pluto
Nodes
ASC
MC
```

nếu dữ liệu cho phép.

---

# 10. SYNASTRY MATRIX

Tạo:

```ts
interface SynastryAspect {
  personAObject: AstroObject
  personBObject: AstroObject

  aspect: AspectType

  exactAngle: number
  orb: number

  applying?: boolean
  separating?: boolean

  strength: number

  ruleIds: string[]
}
```

Ví dụ:

```text
A Venus
trine
B Moon
orb 1°12'
```

Đây là raw evidence.

---

# 11. KHÔNG CHỈ SO SUN SIGN

Không:

```text
A Taurus
B Libra
```

rồi kết luận relationship.

Phải ưu tiên:

```text
Moon ↔ Moon
Sun ↔ Moon
Venus ↔ Mars
Venus ↔ Venus
Mars ↔ Mars
Mercury ↔ Mercury
Sun ↔ Venus
Moon ↔ Venus
```

và các aspects quan trọng khác.

---

# 12. RELATIONSHIP WEIGHTS

Nếu scoring được triển khai, mỗi interaction phải có weight rõ ràng.

Ví dụ:

```ts
interface CompatibilitySignal {
  id: string

  source: string

  dimension: CompatibilityDimension

  polarity:
    | "supportive"
    | "neutral"
    | "tension"

  strength: number

  evidenceIds: string[]
  ruleIds: string[]
}
```

Không được:

```text
Venus trine = +10
Venus square = -10
```

mà không có định nghĩa framework.

---

# 13. ASTROLOGY DIMENSIONS

Tối thiểu:

```text
EMOTIONAL
COMMUNICATION
ATTRACTION
AFFECTION
CONFLICT
VALUES
COMMITMENT
DAILY_LIFE
MONEY
GROWTH
```

---

# 14. EMOTIONAL COMPATIBILITY

Ưu tiên:

```text
Moon
Moon aspects
Sun-Moon
Moon-Venus
Moon-Mars
4H
8H
```

Nếu full chart.

Output không:

> Hai người chắc chắn hiểu cảm xúc nhau.

Mà:

> Các chỉ báo này tạo ra xu hướng dễ đồng điệu ở...

hoặc:

> Có một số điểm khác biệt trong nhu cầu cảm xúc có thể cần điều chỉnh.

---

# 15. COMMUNICATION COMPATIBILITY

Ưu tiên:

```text
Mercury A ↔ Mercury B
Mercury A ↔ Moon B
Mercury A ↔ Venus B
Mercury A ↔ Mars B
3H
Mercury aspects
```

Phân tích:

```text
thinking style
communication pace
directness
emotional language
conflict communication
```

Không gán:

```text
Mercury square = bad communication
```

một cách tuyệt đối.

---

# 16. ATTRACTION

Ưu tiên:

```text
Venus
Mars
Sun
Moon
5H
8H
Venus-Mars
Mars-Moon
Sun-Venus
```

Phân biệt:

```text
Attraction
Affection
Sexual chemistry
Emotional intimacy
```

Không gộp thành:

```text
Love score.
```

---

# 17. COMMITMENT

Ưu tiên:

```text
Saturn
7H
7H rulers
Venus
Moon
Sun
relevant synastry aspects
```

Saturn không được mặc định:

```text
Saturn = bad.
```

Có thể biểu hiện:

```text
structure
responsibility
longevity
restriction
seriousness
```

Context determines interpretation.

---

# 18. CONFLICT

Ưu tiên:

```text
Mars
Mercury
Saturn
Pluto
Moon
Mars aspects
Mercury-Mars
Mars-Saturn
Mars-Pluto
Moon-Mars
```

Phân tích:

```text
trigger
communication style
assertion
defensiveness
control
withdrawal
repair
```

Không nói:

> Hai người chắc chắn sẽ thường xuyên cãi nhau.

---

# 19. VALUES / LIFE DIRECTION

Ưu tiên:

```text
Sun
Jupiter
Saturn
2H
9H
10H
11H
```

và cross-chart aspects.

---

# 20. DAILY LIFE

Ưu tiên:

```text
6H
Moon
Mercury
Mars
Venus
```

Phân tích:

```text
routine
workload
habits
space
time
practical expectations
```

---

# 21. MONEY

Ưu tiên:

```text
2H
8H
Venus
Jupiter
Saturn
```

Nhưng output chỉ là:

```text
financial attitudes
resource preferences
risk/structure themes
```

Không đưa ra:

```text
investment recommendation
stock recommendation
financial prediction
```

---

# 22. GROWTH

Ưu tiên:

```text
Jupiter
Saturn
Nodes
Pluto
9H
10H
12H
```

Phân tích:

```text
what each person may learn
where relationship creates development
where differences can broaden perspective
```

Không biến thành:

> Người này là nghiệp duyên định mệnh của người kia.

---

# 23. NUMEROLOGY COMPATIBILITY

Không chỉ:

```text
Life Path A
vs
Life Path B
```

Mà phải dùng:

```text
Life Path
Expression
Soul Urge
Personality
Birthday
Maturity
Personal Year
```

nếu dữ liệu có.

---

# 24. NUMBER × NUMBER MATRIX

Tạo pairwise rules:

```text
LP_A × LP_B
Soul_A × Soul_B
Expression_A × Expression_B
LP_A × Soul_B
Soul_A × LP_B
Expression_A × Personality_B
```

Mỗi pair có thể tạo:

```text
reinforcement
complement
friction
neutral
```

---

# 25. KHÔNG DÙNG "HỢP SỐ"

Không viết:

> Số 5 hợp số 1 và 3.

trừ khi đây là một rule có source/framework rõ ràng.

Tốt hơn:

> Hai cấu trúc này có thể bổ trợ nhau ở chủ đề tự chủ và trải nghiệm.

và phải chỉ ra:

```text
LP 5
+
LP 1
```

là evidence.

---

# 26. NUMBER CONFLICT

Ví dụ:

```text
A:
Life Path 5
Soul Urge 5

B:
Life Path 4
Soul Urge 4
```

Không chỉ nói:

> 5 và 4 không hợp.

Phải synthesize:

```text
A:
freedom
variety
flexibility

B:
structure
predictability
consistency

Potential tension:
freedom vs structure

Potential complement:
exploration vs stabilization
```

---

# 27. TU VI COMPATIBILITY

Chỉ bật khi cả hai người có:

```text
birthDate
birthTime
gender
```

và chart engine đã validated.

Không được xây một compatibility engine riêng bằng các đoạn văn Tử Vi.

Consume:

```text
TuViChart A
TuViChart B
```

---

# 28. TỬ VI PAIRWISE FEATURES

Có thể xét:

```text
Mệnh
Thân
Phu Thê
Phúc Đức
Tài Bạch
Quan Lộc
```

cùng:

```text
Tứ Hóa
Tam Phương Tứ Chính
major stars
relevant palace relationships
```

nhưng chỉ khi các rule đã được định nghĩa chính thức.

---

# 29. GENDER

Gender chỉ được sử dụng nếu một framework thực sự dùng nó.

Không:

```text
gender = male
→ compatibility khác
```

một cách tự động.

Nếu Tử Vi cần gender cho chart calculation:

```text
TuVi engine handles gender.
```

Compatibility engine không tự suy luận.

---

# 30. DIMENSION ENGINE

Đây là trung tâm module.

```ts
enum CompatibilityDimension {
  EMOTIONAL,
  COMMUNICATION,
  ATTRACTION,
  AFFECTION,
  CONFLICT,
  VALUES,
  COMMITMENT,
  DAILY_LIFE,
  MONEY,
  GROWTH
}
```

Mỗi dimension:

```ts
interface DimensionAnalysis {
  dimension: CompatibilityDimension

  supportiveSignals: CompatibilitySignal[]
  tensionSignals: CompatibilitySignal[]
  neutralSignals: CompatibilitySignal[]

  dominantThemes: Theme[]
  synthesis: GeneratedText
}
```

---

# 31. SUPPORTIVE ≠ "GOOD"

Ví dụ:

```text
Saturn contact
```

có thể là:

```text
supportive:
commitment / responsibility
```

nhưng đồng thời:

```text
tension:
restriction / pressure
```

Một signal có thể đóng nhiều vai trò tùy dimension.

---

# 32. TENSION ≠ "BAD"

Tension chỉ có nghĩa:

```text
different needs
different styles
potential friction
```

Không được biến thành:

```text
relationship doomed.
```

---

# 33. CROSS-SYSTEM EVIDENCE

Đây là nơi MYSTICOS có thể tạo khác biệt.

Ví dụ:

### Astrology

```text
A Venus
trine
B Moon
```

### Numerology

```text
A Soul Urge 2
B Soul Urge 6
```

Nếu cả hai cùng support:

```text
emotional connection
```

thì tạo:

```text
Cross-system reinforcement
```

Nhưng không được nói:

> Vì hai hệ thống đều nói giống nhau nên chắc chắn đúng.

Chỉ nói:

> Hai hệ thống được MYSTICOS sử dụng cùng chỉ về một chủ đề tương tự.

---

# 34. CROSS-SYSTEM CONFLICT

Ví dụ:

```text
Astrology:
high emotional resonance

Numerology:
strong independence tension
```

Không được bỏ một bên.

Output:

```text
Supporting:
emotional resonance

Tension:
autonomy / independence

Interpretation:
relationship may combine emotional closeness
with a strong need for personal space.
```

---

# 35. EVIDENCE GRAPH

Mỗi kết luận phải có:

```ts
interface CompatibilityEvidence {
  id: string

  system:
    | "ASTROLOGY"
    | "NUMEROLOGY"
    | "TUVI"

  sourceA: string
  sourceB: string

  ruleId: string

  dimension: CompatibilityDimension

  polarity: string

  strength?: number
}
```

---

# 36. SYNTHESIS

Không:

```text
Astrology paragraph
+
Numerology paragraph
+
TuVi paragraph
```

Phải:

```text
ALL EVIDENCE
↓
GROUP BY DIMENSION
↓
FIND REINFORCEMENT
↓
FIND CONTRADICTIONS
↓
PRIORITIZE
↓
GENERATE SYNTHESIS
```

---

# 37. DIMENSION SYNTHESIS

Ví dụ:

```text
EMOTIONAL

Supporting:
A Moon trine B Venus
A Soul Urge 2
B Soul Urge 6

Tension:
A Moon square B Mars

Synthesis:
Có nền tảng đồng cảm và chăm sóc khá rõ,
nhưng phản ứng cảm xúc trong lúc căng thẳng
có thể khác nhau.
```

Đây mới là compatibility reading.

---

# 38. NO GENERIC TEXT

Không được tạo:

```text
if compatibility === "good":
  "Hai bạn rất hòa hợp..."
```

Phải có:

```text
dimension
+
evidence
+
specific interaction
```

---

# 39. REAL-LIFE SCENARIO ENGINE

Đây là phần rất đáng làm.

Thay vì chỉ:

> Emotional compatibility: high.

Tạo scenarios:

```text
ARGUMENT
MONEY
PERSONAL SPACE
JEALOUSY
CAREER CHANGE
FAMILY
COMMITMENT
DAILY ROUTINE
DECISION MAKING
```

Ví dụ:

```text
Scenario:
Personal Space

A:
high freedom theme

B:
high consistency theme

Potential pattern:
A may need flexibility;
B may seek predictability.

Practical reflection:
Agree on which areas are flexible
and which commitments are fixed.
```

Đây là ứng dụng thực tế từ evidence, không phải tiên tri.

---

# 40. RELATIONSHIP QUESTION ENGINE

User có thể hỏi:

```text
Chúng tôi có hợp nhau không?
```

Map:

```text
GENERAL_COMPATIBILITY
```

Nếu hỏi:

```text
Tại sao chúng tôi hay cãi nhau?
```

map:

```text
CONFLICT
COMMUNICATION
EMOTIONAL
```

Nếu hỏi:

```text
Có hợp cưới không?
```

map:

```text
COMMITMENT
VALUES
DAILY_LIFE
MONEY
CONFLICT
EMOTIONAL
```

Không trả lời bằng một score duy nhất.

---

# 41. COMPATIBILITY REPORT

Đề xuất:

## 01 — Tổng Quan

* Relationship themes
* Supporting patterns
* Tensions
* Data precision

## 02 — Cảm Xúc

Moon / Venus / Soul Urge

## 03 — Giao Tiếp

Mercury / numerology

## 04 — Thu Hút

Venus / Mars / 5H / 8H

## 05 — Xung Đột

Mars / Mercury / Saturn

## 06 — Giá Trị

Sun / Jupiter / Saturn / numbers

## 07 — Cam Kết

7H / Saturn / Venus / relevant numbers

## 08 — Đời Sống Chung

6H / Moon / Mars

## 09 — Tài Chính

2H / 8H / relevant numerology

## 10 — Phát Triển

Jupiter / Saturn / Nodes

## 11 — Tử Vi

nếu enabled

## 12 — Cross-System Synthesis

Astrology × Numerology × Tử Vi

## 13 — Tình Huống Thực Tế

Argument / money / space / commitment...

## 14 — Nguyên Tắc Quan Hệ

3–7 deterministic recommendations

## 15 — Evidence

Vì sao hệ thống luận như vậy?

---

# 42. RELATIONSHIP PRINCIPLES

Không dùng:

> Người A nên nhường người B.

Thay:

```text
Principle:
Freedom and predictability need explicit boundaries.

Based on:
A: Life Path 5
B: Life Path 4
A Mars ...
B Saturn ...

Practical action:
Define commitments that are fixed,
while leaving other areas flexible.
```

Advice phải tránh chọn phe.

---

# 43. KHÔNG ĐƯA RA QUYẾT ĐỊNH THAY NGƯỜI DÙNG

Không:

```text
Nên yêu.
Nên cưới.
Nên chia tay.
Người này là định mệnh.
Người kia không hợp.
```

Thay:

```text
Điểm hỗ trợ
Điểm căng thẳng
Điều kiện để vận hành tốt
Rủi ro giao tiếp
Chủ đề cần thảo luận
```

MYSTICOS cung cấp bản đồ, không quyết định thay người dùng.

---

# 44. COMPATIBILITY SCORE — NẾU THỰC SỰ MUỐN

Chỉ được triển khai khi có specification đầy đủ.

```ts
interface CompatibilityScoreModel {
  version: string

  dimensions: {
    dimension: CompatibilityDimension
    weight: number
  }[]

  signalWeights: Record<string, number>

  normalization: string
}
```

Phải có:

```text
raw score
normalization
weight
threshold
version
```

Và UI phải giải thích:

> Đây là chỉ số nội bộ của mô hình MYSTICOS, không phải xác suất quan hệ thành công.

Tuy nhiên, **khuyến nghị phiên bản đầu tiên không hiển thị một con số tổng**.

---

# 45. PRECISION LABEL

Nếu thiếu birth time:

```text
Astrology:
Partial
```

Nếu chỉ có birth date:

```text
Numerology:
Full
Astrology:
Basic
```

Nếu đủ:

```text
Astrology:
Full Natal
Numerology:
Full
TuVi:
Full
```

UI phải hiển thị rõ.

---

# 46. CANONICAL RESULT

```ts
interface CompatibilityResult {
  meta: {
    engineVersion: string
    astrologyVersion?: string
    numerologyVersion?: string
    tuViVersion?: string
  }

  precision: {
    astrology: PrecisionLevel
    numerology: PrecisionLevel
    tuVi?: PrecisionLevel
  }

  persons: {
    A: PersonSnapshot
    B: PersonSnapshot
  }

  dimensions: DimensionAnalysis[]

  crossSystemThemes: CrossSystemTheme[]

  scenarios: RelationshipScenario[]

  principles: RelationshipPrinciple[]

  evidence: CompatibilityEvidence[]

  interpretations: GeneratedText[]
}
```

---

# 47. CROSS-SYSTEM THEME

```ts
interface CrossSystemTheme {
  id: string

  theme: string

  supportingSystems: {
    system: string
    evidenceIds: string[]
  }[]

  tensionSystems?: {
    system: string
    evidenceIds: string[]
  }[]

  synthesis: GeneratedText
}
```

Ví dụ:

```text
Theme:
"Need for closeness with personal autonomy"

Astrology:
Venus-Moon support

Numerology:
A 5 / B 4 tension

Synthesis:
Closeness may work best when accompanied by clearly defined
personal space.
```

---

# 48. SCENARIO MODEL

```ts
interface RelationshipScenario {
  id: string

  type:
    | "ARGUMENT"
    | "MONEY"
    | "PERSONAL_SPACE"
    | "JEALOUSY"
    | "CAREER"
    | "FAMILY"
    | "COMMITMENT"
    | "DAILY_LIFE"

  triggers: string[]

  supportingEvidenceIds: string[]

  tensionEvidenceIds: string[]

  interpretation: GeneratedText

  practicalPrinciples: string[]
}
```

---

# 49. FRONTEND

Frontend chỉ render:

```text
result.dimensions
result.themes
result.scenarios
result.principles
result.evidence
```

Không:

```tsx
if (sunA === ...)
if (lifePathA === ...)
if (venusB === ...)
```

Không có astrology/numerology knowledge trong JSX.

---

# 50. FILE STRUCTURE

```text
/lib/compatibility/

  core/
    types.ts
    config.ts
    dimensions.ts

  pairwise/
    astrology.ts
    numerology.ts
    tuvi.ts

  dimensions/
    emotional.ts
    communication.ts
    attraction.ts
    affection.ts
    conflict.ts
    values.ts
    commitment.ts
    daily-life.ts
    money.ts
    growth.ts

  cross-system/
    reinforcement.ts
    conflict.ts
    synthesis.ts

  scenarios/
    argument.ts
    money.ts
    space.ts
    commitment.ts
    family.ts
    daily-life.ts

  rules/
    astrology.ts
    numerology.ts
    tuvi.ts

  evidence/
    graph.ts

  interpretation/
    templates.ts
    synthesis.ts

  tests/
    synastry.ts
    numerology-pairs.ts
    dimensions.ts
    cross-system.ts
    scenarios.ts
    determinism.ts
```

---

# 51. TEST CASES

Bắt buộc:

### Test 1 — Basic

```text
A birth date
B birth date
```

Chỉ Numerology + Sun-level astrology.

### Test 2 — Full Astrology

```text
A date/time/place
B date/time/place
```

Test:

* synastry
* houses
* angles
* aspects.

### Test 3 — Missing Time

```text
A full
B no time
```

Expected:

```text
partial astrology
```

### Test 4 — Strong Emotional Support

Test Moon/Venus interaction.

### Test 5 — Strong Conflict

Test Mars/Saturn/Mercury interactions.

### Test 6 — Cross-system Reinforcement

Astrology + Numerology cùng chỉ một theme.

### Test 7 — Cross-system Conflict

Hai hệ thống đưa ra các tín hiệu khác nhau.

### Test 8 — Determinism

Same input 100 times = same output.

---

# 52. REGRESSION TEST

Mỗi compatibility case phải lưu:

```text
input
engine versions
raw pairwise features
dimensions
evidence
final synthesis
```

Nếu thay rule:

```text
before
→ after
```

phải biết chính xác rule nào thay đổi output.

---

# 53. GOLDEN COMPATIBILITY PROFILE

Tạo các pair cố định:

```ts
const GOLDEN_COMPATIBILITY_001 = {
  personA: {...},
  personB: {...},

  expected: {
    emotional: {...},
    communication: {...},
    attraction: {...},
    conflict: {...}
  }
}
```

Không test chỉ bằng screenshot.

Test domain output.

---

# 54. PERFORMANCE

Compatibility có thể cần:

```text
A chart
+
B chart
+
pairwise aspects
+
hundreds of rules
```

Không tính lại toàn bộ chart mỗi khi user click một tab.

Pipeline:

```text
Calculate once
↓
Cache canonical result
↓
Derive dimensions
↓
Render
```

---

# 55. CACHING

Cache key phải bao gồm:

```text
personA input
personB input
astrology version
numerology version
tuvi version
compatibility rules version
```

Không cache chỉ theo:

```text
A+B
```

vì rule version có thể thay đổi.

---

# 56. PRIVACY

Birth data là dữ liệu cá nhân.

Không log raw birth information nếu không cần.

Không lưu:

```text
full name
birth date
birth place
```

vào analytics logs một cách mặc định.

---

# 57. LANGUAGE

Mọi interpretation phải ưu tiên:

```text
có xu hướng
có thể
thường gắn với
một chủ đề
có khả năng
điểm cần lưu ý
```

Tránh:

```text
chắc chắn
định mệnh
100%
không thể tránh
người này dành cho bạn
```

---

# 58. PHÂN BIỆT EVIDENCE VÀ OPINION

Mỗi output:

```text
FACT
↓
RULE
↓
INTERPRETATION
↓
PRACTICAL REFLECTION
```

Ví dụ:

```text
FACT:
A Venus trine B Moon.

RULE:
VENUS_MOON_TRINE_01.

INTERPRETATION:
Có chỉ báo thuận lợi cho sự đồng điệu tình cảm theo framework.

PRACTICAL:
Hai người có thể tận dụng điều này bằng cách duy trì...
```

Không được nhập cả bốn thành một paragraph không thể kiểm tra.

---

# 59. KHÔNG DÙNG AI ĐỂ "CÂN BẰNG"

Tuyệt đối không:

```text
rules conflict
↓
ask LLM to decide
```

Nếu conflict:

```text
deterministic priority rules
```

phải giải quyết.

Ví dụ:

```text
exact aspect
>
close aspect
>
placement
>
generic sign compatibility
```

hoặc hierarchy do MYSTICOS định nghĩa.

---

# 60. NGUYÊN TẮC CUỐI

Đừng xây:

```text
A
↓
B
↓
"Hai bạn khá hợp nhau."
```

Hãy xây:

```text
A DATA
+
B DATA
↓
PAIRWISE INTERACTIONS
↓
10 COMPATIBILITY DIMENSIONS
↓
SUPPORTING SIGNALS
+
TENSION SIGNALS
↓
CROSS-SYSTEM REINFORCEMENT
+
CROSS-SYSTEM CONFLICT
↓
REAL-LIFE SCENARIOS
↓
PRACTICAL PRINCIPLES
↓
EVIDENCE
```

Mục tiêu của MYSTICOS không phải trả lời:

> **"Hai người hợp bao nhiêu phần trăm?"**

Mà là trả lời được câu hỏi sâu hơn:

> **"Hai người tương tác với nhau ở đâu thuận lợi, ở đâu có ma sát, vì sao hệ thống đưa ra nhận định đó, và trong đời sống thực tế hai người có thể chủ động xử lý những khác biệt ấy như thế nào?"**

Đó mới là một Compatibility Engine thực sự có giá trị.
