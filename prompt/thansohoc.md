# MASTER PROMPT

## THIẾT KẾ THẦN SỐ HỌC PYTHAGORAS ENGINE 100% DETERMINISTIC

### Input → Normalize → Calculate → Validate → Rule Engine → Evidence → Interpretation → Cycles → Output

---

# 0. VAI TRÒ

Bạn là Senior Numerology Software Architect + Deterministic Rules Engine Engineer.

Nhiệm vụ là xây dựng **Thần Số Học Pythagoras Engine** cho MYSTICOS.

MYSTICOS KHÔNG sử dụng:

* AI
* LLM
* machine learning
* embedding
* vector database
* semantic search
* random interpretation
* AI-generated horoscope
* AI-generated numerology text.

Toàn bộ kết quả phải đến từ:

```text
INPUT
→ NORMALIZATION
→ CALCULATION
→ VALIDATION
→ NUMEROLOGY RULES
→ EVIDENCE
→ DETERMINISTIC INTERPRETATION
→ TEMPLATE
→ JSON
→ UI
```

Cùng:

```text
input
+
numerology system version
+
rule version
```

phải tạo ra cùng một kết quả.

---

# 1. QUYẾT ĐỊNH QUAN TRỌNG NHẤT: CHỌN TRƯỜNG PHÁI

Không được dùng chữ:

> "Thần số học Pythagoras"

như một nhãn chung rồi trộn công thức từ nhiều trường phái.

MYSTICOS phải có:

```ts
interface NumerologySystemConfig {
  id: string
  name: string
  version: string

  letterMapping: LetterMappingConfig
  reductionMethod: ReductionConfig
  masterNumbers: MasterNumberConfig
  karmicDebt: KarmicDebtConfig
  personalCycles: PersonalCycleConfig
  pinnacles: PinnacleConfig
  challenges: ChallengeConfig
  maturity: MaturityConfig
}
```

Ví dụ:

```text
PYTHAGOREAN_MYSTICOS_V1
```

Mọi công thức phải thuộc về config này.

Nếu một quy tắc không thuộc hệ thống đã chọn:

**Không được tự tiện thêm vào.**

---

# 2. PHÂN BIỆT "CÔNG THỨC" VÀ "DIỄN GIẢI"

Đây là nguyên tắc cốt lõi.

## Tầng 1 — FACT

Ví dụ:

```text
Ngày sinh: 20/05/1990
```

## Tầng 2 — CALCULATION

```text
Life Path = 8
```

## Tầng 3 — NUMEROLOGY RULE

```text
Life Path 8
→ theme: achievement / responsibility / resources
```

## Tầng 4 — INTERPRETATION

```text
Có xu hướng chú trọng kết quả, trách nhiệm và khả năng tổ chức nguồn lực.
```

## Tầng 5 — PRACTICAL REFLECTION

```text
Có thể phát huy thế mạnh này bằng cách...
```

Không được trình bày cả 5 tầng như cùng một loại sự thật.

---

# 3. INPUT MODEL

Input cơ bản:

```ts
interface NumerologyInput {
  fullName: string
  birthDate: string
}
```

Ví dụ:

```json
{
  "fullName": "NGUYEN VAN DUC",
  "birthDate": "1990-05-20"
}
```

Không bắt buộc:

* gender
* birth time
* birth place.

Nếu module chỉ là Pythagorean Numerology thì không được yêu cầu những input không dùng trong công thức.

---

# 4. NAME NORMALIZATION

Đây là P0 vì MYSTICOS phục vụ người Việt.

Phải định nghĩa chính xác:

```text
NGUYỄN
→ NGUYEN
```

hay một phương thức khác.

Không được để JavaScript tự động:

```ts
.normalize(...)
```

mà không có rule rõ ràng.

Tạo:

```ts
interface NameNormalizationConfig {
  removeDiacritics: boolean
  uppercase: boolean
  preserveSpaces: boolean
  preserveHyphens: boolean
  preserveApostrophes: boolean
}
```

---

# 5. VIETNAMESE NAME HANDLING

Phải xử lý:

```text
Á À Ả Ã Ạ
Ă Ắ Ằ Ẳ Ẵ Ặ
Â Ấ Ầ Ẩ Ẫ Ậ
Đ
É È Ẻ Ẽ Ẹ
Ê
Í
Ó Ò Ỏ Õ Ọ
Ô
Ơ
Ú
Ư
Ý
```

và các chữ tương ứng.

Ví dụ:

```text
ĐẶNG
→ DANG
```

nếu hệ thống sử dụng Latin Pythagorean mapping.

Phải có test cho toàn bộ bảng chữ cái tiếng Việt.

---

# 6. LETTER MAPPING

Pythagorean mapping phải được lưu thành data, không hard-code rải rác trong code.

Ví dụ:

```ts
const PYTHAGOREAN_MAP = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,

  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,

  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8
}
```

Nhưng không được tự mặc định Y là nguyên âm/phụ âm.

Phải có config:

```ts
yBehavior: "VOWEL_OR_CONSONANT_BY_CONTEXT"
```

nếu trường phái đã chọn quy định như vậy.

---

# 7. REDUCTION ENGINE

Tạo một engine duy nhất:

```ts
reduceNumber(value, config)
```

Phải xử lý:

```text
1–9
11
22
33
```

theo cấu hình.

Ví dụ:

```text
38
→ 11
→ giữ 11 nếu Master Number enabled
```

hoặc:

```text
38
→ 11
→ 2
```

nếu context yêu cầu reduction tiếp.

Không được mỗi module tự viết một cách.

---

# 8. MASTER NUMBERS

Phải cấu hình:

```ts
masterNumbers = [11, 22, 33]
```

Nhưng phải xác định rõ:

* khi nào giữ Master Number?
* khi nào reduce?
* hiển thị `11/2`, `22/4`, `33/6` hay chỉ `11`?
* Master Number có được giữ ở Life Path không?
* có giữ ở Expression/Destiny không?
* có giữ ở Pinnacle không?
* có giữ ở Personal Year không?

Không được có tình trạng:

```text
Life Path = 11
```

nhưng ở nơi khác:

```text
Life Path = 2
```

mà không giải thích.

---

# 9. RAW CALCULATION TRACE

Mỗi chỉ số phải lưu cả quá trình tính.

Ví dụ:

```ts
interface CalculationTrace {
  input: string[]
  mappedValues: number[]
  rawSum: number
  reductions: number[]
  finalValue: number
  displayValue: string
}
```

Ví dụ:

```json
{
  "rawSum": 29,
  "reductions": [29, 11],
  "finalValue": 11,
  "displayValue": "11/2"
}
```

UI có thể có:

> Cách tính

để người dùng kiểm tra.

---

# 10. LIFE PATH

Life Path phải có công thức duy nhất.

Ví dụ config:

```ts
calculateLifePath(birthDate)
```

Phải quyết định rõ:

* reduce từng thành phần trước?
* cộng toàn bộ digits trước?
* giữ Master Number ở ngày?
* giữ Master Number ở tháng?
* xử lý 11/22/33 thế nào?

Không được viết một công thức ở backend và một công thức khác ở frontend.

---

# 11. BIRTHDAY NUMBER

Tính riêng:

```text
ngày sinh
```

Ví dụ:

```text
14
→ 14/5
```

Nếu hệ thống nhận diện Karmic Debt:

```text
14/5
```

phải lưu cả:

```text
rawNumber = 14
reducedNumber = 5
karmicDebt = 14
```

Không chỉ lưu `5`.

---

# 12. ATTITUDE NUMBER

Nếu MYSTICOS sử dụng Attitude Number:

```text
month + day
```

phải có rule riêng.

Không gọi nó là:

```text
Personality Number
```

nếu hai khái niệm khác nhau.

---

# 13. DESTINY / EXPRESSION NUMBER

Tính từ:

```text
FULL BIRTH NAME
```

sau normalization.

Ví dụ:

```text
NGUYEN VAN DUC
↓
letter mapping
↓
sum
↓
reduction
↓
Expression/Destiny
```

Không được dùng ngày sinh cho Destiny.

---

# 14. SOUL URGE / HEART'S DESIRE

Tính từ:

```text
VOWELS
```

nhưng phải định nghĩa rõ:

* A
* E
* I
* O
* U
* Y

xử lý thế nào.

Không được:

```text
vowels = AEIOU
```

rồi bỏ qua Y mà không có rule.

Lưu:

```ts
interface SoulUrgeResult {
  rawSum: number
  finalNumber: number
  displayNumber: string

  lettersUsed: string[]
  trace: CalculationTrace
}
```

---

# 15. PERSONALITY NUMBER

Tính từ:

```text
CONSONANTS
```

với cùng hệ thống xử lý Y.

Không được nhầm:

```text
Personality
```

với:

```text
Destiny
```

---

# 16. MATURITY NUMBER

Nếu system sử dụng:

```text
Life Path
+
Destiny/Expression
```

phải implement riêng.

Ví dụ:

```text
Life Path 5
+
Expression 7
=
12
→ 3
```

Không gọi:

```text
Maturity = tuổi trưởng thành chắc chắn sẽ...
```

Maturity là một **interpretive number**, không phải dự đoán sự kiện.

---

# 17. BIRTH NAME VS CURRENT NAME

Phải phân biệt:

```text
Birth Name
Current Name
```

Nếu MYSTICOS chỉ sử dụng birth name:

```text
nameMode = BIRTH_NAME_ONLY
```

thì không được âm thầm dùng tên hiện tại.

Nếu muốn hỗ trợ:

```text
Current Name
Married Name
Professional Name
```

phải tạo module riêng.

---

# 18. KARMIC DEBT

Nếu dùng hệ thống:

```text
13/4
14/5
16/7
19/1
```

phải cấu hình:

```ts
karmicDebtNumbers = [13, 14, 16, 19]
```

Nhưng phải xác định:

**Karmic Debt được phát hiện ở đâu?**

Ví dụ:

* Life Path
* Birthday
* Expression
* Soul Urge
* Personality
* Maturity
* các intermediate sums.

Không được thấy số 14 ở bất kỳ đâu rồi tự động kết luận:

> "Bạn có Nợ Nghiệp 14."

Phải có rule về context.

---

# 19. KARMIC DEBT LANGUAGE

Không sử dụng ngôn ngữ gây định mệnh:

```text
Bạn đã làm điều xấu ở kiếp trước.
Bạn phải trả nghiệp.
Bạn bị nghiệp phạt.
```

Thay bằng:

```text
Theo trường phái đang sử dụng, 14/5 được diễn giải
như một chủ đề liên quan đến tự do, kỷ luật và trách nhiệm.
```

Đây là symbolic framework, không phải factual claim về tiền kiếp.

---

# 20. MISSING NUMBERS

Nếu sử dụng missing numbers từ full name:

```text
letters 1–9 xuất hiện / không xuất hiện
```

phải tính deterministic.

Ví dụ:

```text
Present:
1, 3, 5, 7

Missing:
2, 4, 6, 8, 9
```

Không được gọi:

```text
Missing = karmic debt
```

trừ khi framework định nghĩa như vậy.

---

# 21. REPEATED NUMBERS

Tính frequency:

```ts
interface NumberFrequency {
  number: number
  count: number
}
```

Ví dụ:

```text
1 → 3 lần
5 → 1 lần
9 → 2 lần
```

Sau đó rule engine mới diễn giải.

Không hard-code:

```text
111 = cực kỳ mạnh
```

nếu không có định nghĩa trong trường phái.

---

# 22. BIRTH GRID 3×3

Nếu MYSTICOS dùng Birth Grid:

```text
1 2 3
4 5 6
7 8 9
```

phải xác định:

* lấy digits nào?
* có lấy ngày/tháng/năm đầy đủ không?
* có bỏ số 0 không?
* Master Numbers có liên quan không?
* số lặp tính thế nào?

Ví dụ:

```ts
interface BirthGrid {
  cells: Record<1|2|3|4|5|6|7|8|9, number[]>
}
```

Không dùng:

```text
3 = 43%
```

như thể đó là "43% năng lượng".

Nếu muốn hiển thị tỷ lệ:

```text
3/7 digits
```

thì phải ghi rõ đó là **tỷ lệ xuất hiện**, không phải năng lượng đo được.

---

# 23. ARROWS / PLANES

Nếu dùng các mũi tên:

```text
Arrow of ...
```

phải tạo data structure:

```ts
interface NumerologyArrow {
  id: string
  numbers: number[]
  name: string
  condition: ArrowCondition
  interpretation: string[]
}
```

Ví dụ:

```text
3–6–9
```

chỉ được đánh dấu activated nếu cả ba điều kiện đều thỏa.

Nếu thiếu:

```text
NOT_FORMED
```

thì không được đồng thời viết:

> "Mũi tên này cho thấy bạn có..."

Đây là lỗi logic cực kỳ nghiêm trọng cần tránh.

---

# 24. PLANES OF EXPRESSION

Nếu trường phái sử dụng:

```text
Mental
Emotional
Physical
Intuitive
```

phải có mapping rõ:

```ts
interface PlaneDefinition {
  id: string
  numbers: number[]
}
```

Không biến:

```text
3/7 = 43%
```

thành:

```text
43% năng lượng trí tuệ
```

Trừ khi đó chỉ là visualization được định nghĩa rõ là:

> tỷ lệ chữ số thuộc nhóm này.

---

# 25. PERSONAL YEAR

Đây là nơi cần sửa trực tiếp module hiện tại của MYSTICOS.

**Không dùng Personal Year = 0** nếu hệ thống của MYSTICOS không có định nghĩa riêng cho 0.

Thông thường phải có:

```text
1
2
3
4
5
6
7
8
9
```

và nếu trường phái cho phép Master Number:

```text
11/2
22/4
```

thì phải quy định rõ.

Không được có:

```text
Personal Year 0
```

chỉ vì phép tính tạm thời ra 0.

---

# 26. PERSONAL YEAR CALCULATION

Tạo:

```ts
calculatePersonalYear(
  birthMonth,
  birthDay,
  targetYear
)
```

Phải xác định:

```text
month
+
day
+
universal year
```

và reduction.

Lưu trace:

```text
2027
→ Universal Year
→ birth month
→ birth day
→ raw sum
→ final Personal Year
```

---

# 27. UNIVERSAL YEAR

Tính riêng:

```text
Universal Year
```

Ví dụ:

```text
2027
→ 2 + 0 + 2 + 7
→ 11
→ 11/2 hoặc 2
```

tùy config.

Không được hard-code:

```text
2027 = 2
```

mà không lưu quy tắc Master Number.

---

# 28. PERSONAL MONTH

Nếu hỗ trợ:

```ts
calculatePersonalMonth(
  personalYear,
  month
)
```

Không được tạo Personal Month bằng một công thức khác với Personal Year philosophy.

---

# 29. PERSONAL DAY

Nếu hỗ trợ:

```ts
calculatePersonalDay(
  personalMonth,
  day
)
```

Phải giữ cùng reduction rules.

---

# 30. 9-YEAR CYCLE

Có thể hiển thị:

```text
Personal Year 1 → 2 → 3 → ... → 9
```

nhưng không mô tả:

> "Cuộc đời là một làn sóng hình sin."

Đây là cách ví von hiện đại, không phải định luật toán học của Pythagorean Numerology.

Dùng:

> Chu kỳ 9 năm theo hệ thống Personal Year.

---

# 31. PINNACLES

Nếu H1 sản phẩm tuyên bố:

> "4 Đỉnh Cao Đời Người"

thì engine **bắt buộc phải thực sự tính 4 Pinnacles**.

Không được chỉ render title.

Phải có:

```ts
interface Pinnacle {
  index: 1 | 2 | 3 | 4
  number: number
  startAge?: number
  endAge?: number
  startYear?: number
  endYear?: number
  trace: CalculationTrace
}
```

---

# 32. PINNACLE FORMULA

Phải khóa công thức của trường phái.

Ví dụ cần xác định:

```text
Pinnacle 1
= month + day

Pinnacle 2
= day + year

Pinnacle 3
= Pinnacle 1 + Pinnacle 2

Pinnacle 4
= month + year
```

Nếu hệ thống MYSTICOS dùng công thức này thì encode thành rule.

Không để developer tự nhớ công thức.

---

# 33. PINNACLE TIMELINE

Không hard-code:

```text
1–27
28–54
55+
```

nếu chưa xác định công thức kết thúc Pinnacle 1.

Phải tính:

```text
36 - Life Path
```

nếu đây là quy tắc của school được chọn.

Sau đó:

```text
Pinnacle 1
Pinnacle 2
Pinnacle 3
Pinnacle 4
```

theo timeline.

Nếu trường phái dùng quy tắc khác, config phải nói rõ.

---

# 34. CHALLENGES

Pinnacles phải đi cùng:

```text
Challenge 1
Challenge 2
Challenge 3
Challenge 4
```

nếu hệ thống đã tuyên bố sử dụng Challenges.

Ví dụ công thức:

```text
Challenge 1 = |day - month|
Challenge 2 = |day - year|
Challenge 3 = |Challenge 1 - Challenge 2|
Challenge 4 = |month - year|
```

Nhưng phải cấu hình, không hard-code vào UI.

---

# 35. PINNACLE × CHALLENGE

Đây mới là phần sâu.

Không chỉ:

```text
Pinnacle = 5
```

mà:

```text
Pinnacle 5
+
Challenge 2
```

để tạo:

```text
theme
+
development tension
```

Ví dụ:

```text
Growth theme
vs
Challenge theme
```

được synthesis deterministic.

---

# 36. LIFE CYCLES

Nếu MYSTICOS sử dụng:

```text
First Cycle
Second Cycle
Third Cycle
```

phải có:

```ts
interface LifeCycle {
  index: 1 | 2 | 3
  number: number
  startAge: number
  endAge?: number
}
```

Không được tự động viết:

```text
1–27
28–54
55+
```

trừ khi công thức của school thực sự tạo ra các mốc đó.

---

# 37. "LIFE PATH CHIẾM 60%"

Loại bỏ các tuyên bố kiểu:

> Life Path chiếm 60% năng lượng cuộc đời.

Nếu không có mô hình định lượng được kiểm chứng trong framework, đây là **con số trang trí**.

Thay:

> Life Path là một trong những chỉ số nền tảng của hệ thống.

Nếu muốn có weighting:

```ts
interface NumberWeight {
  domain: string
  weights: Record<NumberType, number>
}
```

thì phải định nghĩa mathematically và test được.

---

# 38. NUMBER SEMANTICS

Tạo database cho:

```text
1
2
3
4
5
6
7
8
9
11
22
33
```

Mỗi số:

```ts
interface NumberMeaning {
  number: number

  coreThemes: string[]
  strengths: string[]
  tensions: string[]
  developmentThemes: string[]

  keywords: string[]
}
```

Ví dụ:

```json
{
  "number": 5,
  "coreThemes": [
    "freedom",
    "adaptability",
    "experience",
    "change"
  ],
  "tensions": [
    "restlessness",
    "inconsistency",
    "impulsiveness"
  ]
}
```

---

# 39. KHÔNG GÁN TÍNH CÁCH TUYỆT ĐỐI

Không:

> Số 5 là người thích tự do.

Mà:

> Trong hệ thống này, số 5 thường được liên hệ với các chủ đề tự do, trải nghiệm, thích nghi và thay đổi.

Điều này giữ được tính nhất quán mà không biến numerology thành chẩn đoán tính cách.

---

# 40. NUMBER × NUMBER INTERACTION

Không chỉ giải thích từng số.

Ví dụ:

```text
Life Path 5
Expression 7
Soul Urge 1
```

phải có relationship engine:

```text
5 × 7
5 × 1
7 × 1
```

Các quan hệ:

```text
reinforcement
complement
tension
contrast
```

phải được định nghĩa bằng rules.

Không dùng:

```text
AI tự viết compatibility.
```

---

# 41. NUMBER PROFILE SYNTHESIS

Tạo:

```ts
interface NumerologyProfile {
  coreNumbers: CoreNumber[]
  dominantThemes: Theme[]
  supportingThemes: Theme[]
  tensionThemes: Theme[]
}
```

Ví dụ:

```text
Core:

Life Path 5
Expression 7
Soul Urge 1
Personality 33/6

Dominant themes:
freedom
inquiry
independence

Tension:
freedom vs structure
```

---

# 42. KHÔNG CHỈ CỘNG ĐOẠN VĂN

Sai:

```text
Life Path 5 paragraph
+
Destiny 7 paragraph
+
Soul Urge 1 paragraph
```

Đúng:

```text
Life Path 5
×
Destiny 7
×
Soul Urge 1
×
Personality 33/6
↓
Cross-number synthesis
```

---

# 43. COMPATIBILITY

Nếu MYSTICOS có module tương hợp:

Không chỉ:

```text
5 hợp 8.
```

Không tạo:

```text
Compatibility = 87%
```

nếu không có mô hình toán học hợp lệ.

Thay bằng các dimensions:

```text
Communication
Freedom
Emotional needs
Structure
Goals
Money
Conflict
Commitment
```

Mỗi dimension phải có evidence từ numbers.

---

# 44. CAREER / RIASEC

Đây là phần cần tách khỏi Numerology.

Nếu MYSTICOS dùng Holland RIASEC:

```text
Realistic
Investigative
Artistic
Social
Enterprising
Conventional
```

thì phải nói rõ:

> RIASEC là một framework nghề nghiệp riêng, không phải thành phần nguyên bản của Pythagorean Numerology.

Tốt nhất:

```text
RIASEC questionnaire
+
Numerology symbolic profile
```

thành hai lớp độc lập.

---

# 45. KHÔNG ĐƯA NGHỀ NGHIỆP THEO SỐ

Không:

> Life Path 5 → bạn nên làm AI Engineer.

Đúng:

```text
Numerology:
theme = freedom / variety / adaptability

RIASEC:
Investigative + Artistic

Potential work environments:
dynamic
varied
problem-solving
autonomy
```

Sau đó mới đưa ví dụ nghề.

Nghề chỉ là **gợi ý khám phá**, không phải kết luận.

---

# 46. FAMOUS PEOPLE

Nếu hiển thị người nổi tiếng cùng số:

```text
Angelina Jolie
Mark Zuckerberg
...
```

phải xem đây là:

```text
illustrative examples
```

Không dùng:

> Người nổi tiếng X thành công vì có số 5.

Không coi correlation đó là evidence.

Tốt nhất để thành một component phụ:

```text
Explore examples
```

không đưa vào logic kết luận.

---

# 47. PERSONAL YEAR INTERPRETATION

Không dùng:

```text
2027 = chắc chắn khởi đầu
2028 = chắc chắn kết hôn
```

Mà:

```text
Personal Year 1
→ themes of initiation / independence / new direction

Personal Year 2
→ themes of cooperation / patience / relationship

...
```

Sau đó kết hợp:

```text
Personal Year
+
Natal/Core Numbers
```

nếu framework có rule cho interaction.

---

# 48. YEARLY TIMELINE

Output:

```ts
interface YearCycle {
  year: number
  universalYear: number
  personalYear: number

  themeIds: string[]
  ruleIds: string[]
}
```

Ví dụ:

```text
2027 → Personal Year 1
2028 → Personal Year 2
...
2035 → Personal Year 9
```

Không gọi:

```text
2027 = fate event
```

mà:

```text
2027 = symbolic cycle theme.
```

---

# 49. EVIDENCE GRAPH

Mỗi conclusion phải truy ngược được.

Ví dụ:

```json
{
  "claimId": "CAREER_017",
  "text": "Có xu hướng cần môi trường có mức độ tự chủ tương đối cao.",
  "evidenceIds": [
    "LIFE_PATH_5",
    "SOUL_URGE_1"
  ],
  "ruleIds": [
    "LP5_AUTONOMY",
    "SU1_INDEPENDENCE"
  ]
}
```

UI có thể hiển thị:

> Vì sao?

→ Life Path 5
→ Soul Urge 1
→ Rule LP5_AUTONOMY
→ Rule SU1_INDEPENDENCE

Không expose chain-of-thought.

---

# 50. RULE ENGINE

Tạo:

```ts
interface NumerologyRule {
  id: string
  version: string

  condition: RuleCondition

  priority: number

  themeIds: string[]

  templateIds: string[]
}
```

Ví dụ:

```text
LP5_FREEDOM_01
EXPR7_ANALYSIS_01
SOUL1_AUTONOMY_01
KARMIC14_DISCIPLINE_01
PY5_CHALLENGE2_01
```

---

# 51. RULE PRIORITY

Khi có nhiều tín hiệu:

```text
Life Path 5
+
Karmic Debt 14/5
```

không được ghi:

> 5 = freedom

rồi bỏ qua 14/5.

Phải synthesize:

```text
freedom
+
responsibility
+
self-regulation
```

Tương tự:

```text
Master Number
+
Karmic Debt
+
Missing Number
+
Pinnacle
```

phải có conflict resolution.

---

# 52. MASTER NUMBER SYNTHESIS

Ví dụ:

```text
33/6
```

không được chỉ hiển thị:

```text
33 = 6
```

Phải giữ:

```text
Master Number:
33

Root:
6
```

và engine có thể sử dụng cả:

```text
33 themes
+
6 themes
```

theo rule.

---

# 53. NUMBER STATES

Một số có thể ở:

```text
Present
Repeated
Missing
Master
Karmic
Core
Cycle
Challenge
```

Phải phân biệt metadata.

Không để:

```text
14/5
```

và:

```text
5
```

trở thành cùng một object.

---

# 54. DOMAIN ENGINE

Các domain:

```text
Identity
Emotion
Communication
Relationship
Career
Money
Growth
Cycles
Challenges
```

Mỗi domain lấy các indices phù hợp.

Ví dụ:

### Identity

```text
Life Path
Expression
Personality
Birthday
```

### Inner motivation

```text
Soul Urge
Life Path
```

### External expression

```text
Personality
Expression
```

### Career

```text
Life Path
Expression
Birthday
Pinnacle
RIASEC nếu enabled
```

### Relationship

```text
Life Path
Soul Urge
Personality
Expression
```

---

# 55. PRACTICAL ACTION ENGINE

Không dừng ở:

> Bạn là số 5.

Tạo:

```ts
interface ActionRecommendation {
  domain: string
  theme: string
  action: string
  reasonRuleIds: string[]
}
```

Ví dụ:

```text
Theme:
freedom vs consistency

Action:
Thiết kế công việc có không gian thử nghiệm nhưng đặt
một số nguyên tắc duy trì tối thiểu.
```

Đây là practical reflection, không phải tiên tri.

---

# 56. 90-DAY APPLICATION

Nếu muốn tạo phần:

> 90 ngày hành động

thì phải dựa trên:

```text
Core numbers
+
current Personal Year
+
Pinnacle
+
Challenges
```

và template cố định.

Ví dụ:

```text
Goal
Habit
Reflection
Review
```

Không AI generate kế hoạch.

---

# 57. OUTPUT ARCHITECTURE

Đề xuất:

```text
01 — Hồ Sơ Chỉ Số
02 — Con Đường Đời
03 — Sứ Mệnh / Expression
04 — Linh Hồn
05 — Personality
06 — Birthday
07 — Maturity
08 — Birth Grid
09 — Missing / Repeated Numbers
10 — Karmic Debt
11 — Pinnacles
12 — Challenges
13 — Personal Year
14 — Personal Month
15 — Tổng Hợp
16 — Ứng Dụng Thực Hành
17 — Evidence / Cách tính
```

---

# 58. CANONICAL RESULT

```ts
interface NumerologyResult {
  meta: {
    systemId: string
    systemVersion: string
    rulesVersion: string
  }

  input: {
    originalName: string
    normalizedName: string
    birthDate: string
  }

  coreNumbers: {
    lifePath: NumberResult
    birthday: NumberResult
    expression: NumberResult
    soulUrge: NumberResult
    personality: NumberResult
    maturity?: NumberResult
    attitude?: NumberResult
  }

  birthGrid?: BirthGrid

  karmicDebts: KarmicDebtResult[]

  pinnacles?: Pinnacle[]
  challenges?: Challenge[]

  cycles: {
    universalYears: YearCycle[]
    personalYears: YearCycle[]
    personalMonths?: CycleResult[]
    personalDays?: CycleResult[]
  }

  themes: Theme[]

  domains: DomainAnalysis[]

  evidence: Evidence[]

  interpretations: GeneratedText[]
}
```

---

# 59. NUMBER RESULT

```ts
interface NumberResult {
  type: NumberType

  rawValue: number
  reducedValue: number

  displayValue: string

  masterNumber?: number
  karmicDebt?: number

  trace: CalculationTrace

  evidenceIds: string[]
  ruleIds: string[]
}
```

---

# 60. GENERATED TEXT

Không hard-code text vào React.

```ts
interface GeneratedText {
  id: string

  domain: string

  templateId: string

  text: string

  ruleIds: string[]
  evidenceIds: string[]
}
```

Ví dụ:

```json
{
  "templateId": "LP_CORE_05",
  "text": "Theo hệ thống này, Life Path 5 thường gắn với...",
  "ruleIds": ["LP5_FREEDOM"],
  "evidenceIds": ["LIFE_PATH_5"]
}
```

---

# 61. "VÌ SAO?"

Mỗi chỉ số phải có:

```text
[Cách tính]
```

Ví dụ:

```text
NGUYEN VAN DUC

N = 5
G = 7
U = 3
...

Raw Sum = 68
→ 14
→ 5

Expression = 14/5
```

Người dùng phải có khả năng kiểm tra.

---

# 62. UI KHÔNG ĐƯỢC TỰ LUẬN

Không:

```tsx
if (lifePath === 5) {
  return "Bạn yêu tự do..."
}
```

Frontend chỉ nhận:

```text
result.coreNumbers
result.themes
result.interpretations
```

và render.

---

# 63. LOẠI BỎ `any`

Không:

```ts
result: any
```

Không:

```ts
selectedNumber: any
```

Tất cả phải typed.

---

# 64. FILE STRUCTURE

Đề xuất:

```text
/lib/numerology/
  /core/
    types.ts
    config.ts
    constants.ts

  /normalization/
    vietnamese.ts
    name.ts

  /calculation/
    reduction.ts
    life-path.ts
    expression.ts
    soul-urge.ts
    personality.ts
    birthday.ts
    maturity.ts
    attitude.ts

  /grid/
    birth-grid.ts
    arrows.ts
    planes.ts

  /cycles/
    universal-year.ts
    personal-year.ts
    personal-month.ts
    personal-day.ts

  /pinnacles/
    pinnacles.ts
    challenges.ts
    life-cycles.ts

  /rules/
    numbers.ts
    combinations.ts
    karmic-debt.ts
    master-numbers.ts
    cycles.ts

  /domains/
    identity.ts
    relationship.ts
    career.ts
    money.ts
    growth.ts

  /interpretation/
    evidence.ts
    synthesis.ts
    templates.ts

  /tests/
    calculation.ts
    vietnamese-names.ts
    master-numbers.ts
    karmic-debt.ts
    pinnacles.ts
    cycles.ts
    determinism.ts
```

---

# 65. TEST NAME NORMALIZATION

Bắt buộc test:

```text
NGUYỄN
ĐẶNG
PHẠM
HUỲNH
TRẦN
LÊ
VÕ
ĐỖ
BÙI
```

và các tên:

```text
Nguyễn Văn Đức
Đặng Thị Ánh
Lê Quốc Huy
Phạm Nguyễn...
```

Phải chứng minh:

```text
display name
≠
normalized calculation string
```

---

# 66. TEST REDUCTION

Test:

```text
1 → 1
9 → 9
10 → 1
19 → 1
29 → 11/2
38 → 11/2
47 → 11/2
```

nếu config Master Number cho phép.

Test riêng:

```text
11
22
33
```

---

# 67. TEST KARMIC DEBT

Test riêng:

```text
13/4
14/5
16/7
19/1
```

và test:

```text
same number
different context
```

để đảm bảo engine không gán Karmic Debt bừa bãi.

---

# 68. GOLDEN PROFILE

Tạo các hồ sơ cố định:

```ts
const GOLDEN_PROFILE_001 = {
  name: "...",
  birthDate: "...",
  expected: {
    lifePath: ...,
    expression: ...,
    soulUrge: ...,
    personality: ...,
    maturity: ...,
    pinnacles: [...],
    challenges: [...]
  }
}
```

Dùng regression test.

---

# 69. DETERMINISM TEST

Chạy cùng input 100 lần:

```text
result[0]
===
result[1]
===
...
result[99]
```

Không có:

```text
Math.random()
Date.now()
AI
LLM
```

trong engine.

---

# 70. VERSION REGRESSION

Nếu đổi:

```text
Rules 1.0
→ Rules 1.1
```

phải biết:

```text
which outputs changed
why changed
which rule caused change
```

Không âm thầm thay đổi kết quả.

---

# 71. KHÔNG TRỘN RIASEC VÀ NUMEROLOGY

Nếu hiện tại code có:

```text
Numerology
→ Holland
→ nghề nghiệp
```

hãy refactor thành:

```text
Numerology Profile
        ↓
Symbolic themes

RIASEC Assessment
        ↓
Career-interest profile

        ↓

Optional combined view
```

Không được giả vờ RIASEC là một công thức của Pythagorean Numerology.

---

# 72. KHÔNG TRỘN "TÍCH PHƯỚC CẢI MỆNH"

Không dùng:

> Tích phước cải mệnh.

nếu mục tiêu của MYSTICOS là một sản phẩm mang định vị "Khảo Cứu".

Thay bằng:

```text
Chuyển hóa thành hành động
```

hoặc:

```text
Gợi ý thực hành
```

Numerology cung cấp symbolic framework; hành động thực tế vẫn do người dùng lựa chọn.

---

# 73. KHÔNG DÙNG "TẦN SỐ" NHƯ ĐẠI LƯỢNG VẬT LÝ

Tránh:

```text
tần số số 5
rung động đo được
năng lượng 43%
```

nếu không có định nghĩa toán học.

Có thể dùng:

```text
chủ đề
mẫu hình
biểu tượng
khuynh hướng theo hệ thống
```

---

# 74. KHÔNG BIẾN NUMEROLOGY THÀNH KHOA HỌC THỰC NGHIỆM

Không viết:

```text
scientifically proven
psychologically validated
predicts career success
predicts marriage
```

Nếu cần mô tả:

> Đây là một hệ thống diễn giải mang tính biểu tượng dựa trên số học Pythagorean.

Các phép tính có thể deterministic; điều đó **không biến phần diễn giải thành bằng chứng khoa học**.

---

# 75. REPORT SYNTHESIS

Phần tổng hợp cuối phải có:

## 3 chủ đề nổi bật

Ví dụ:

```text
1. Freedom vs Structure
2. Inquiry vs Action
3. Independence vs Cooperation
```

## 3 điểm hỗ trợ

```text
...
```

## 3 vùng cần phát triển

```text
...
```

## 3 hành động thực tế

```text
...
```

Tất cả phải truy được về:

```text
number
→ rule
→ evidence
```

---

# 76. KHÔNG DÙNG SCORE

Không:

```text
Career: 92/100
Love: 81/100
Leadership: 88/100
```

Không có cơ sở nếu chưa xây một scoring model hoàn chỉnh.

Thay:

```text
Dominant
Supporting
Tension
Development
```

---

# 77. KIẾN TRÚC CUỐI

```text
                 USER INPUT
                     │
                     ▼
             NAME NORMALIZATION
                     │
                     ▼
              CALCULATION ENGINE
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
    CORE         BIRTH GRID      CYCLES
   NUMBERS       & ARROWS      & PINNACLES
       │             │             │
       └─────────────┼─────────────┘
                     ▼
                RULE ENGINE
                     │
                     ▼
              EVIDENCE GRAPH
                     │
                     ▼
              THEME SYNTHESIS
                     │
                     ▼
             DOMAIN INTERPRETATION
                     │
                     ▼
              TEMPLATE ENGINE
                     │
                     ▼
                  JSON
                     │
                     ▼
                 FRONTEND
```

---

# 78. THỨ TỰ TRIỂN KHAI

Không triển khai tất cả cùng lúc.

## Phase 1 — Calculation

```text
Name normalization
Letter mapping
Reduction
Life Path
Birthday
Expression
Soul Urge
Personality
```

## Phase 2 — Advanced numbers

```text
Maturity
Attitude
Master Numbers
Karmic Debt
```

## Phase 3 — Birth Grid

```text
3×3
frequency
missing
arrows
planes
```

## Phase 4 — Cycles

```text
Universal Year
Personal Year
Personal Month
Personal Day
```

## Phase 5 — Pinnacles

```text
Pinnacle
Challenge
Life Cycles
```

## Phase 6 — Interpretation

```text
Number semantics
Number × Number
Themes
Domains
Synthesis
```

## Phase 7 — UI

```text
Overview
Details
Cycles
Grid
Evidence
How calculated
```

---

# 79. ĐIỀU KIỆN NGHIỆM THU

Module chỉ được coi là hoàn thành khi:

### Calculation

Mọi chỉ số có công thức xác định.

### Name

Tên tiếng Việt được normalize nhất quán.

### Master Numbers

11/22/33 xử lý nhất quán.

### Karmic Debt

13/14/16/19 không bị gán bừa.

### Grid

Repeated/missing/arrows không mâu thuẫn.

### Cycles

Personal Year không xuất hiện "0" do lỗi reduction.

### Pinnacles

Nếu UI nói 4 Pinnacles thì engine phải tính thật.

### Interpretation

Mọi kết luận có:

```text
ruleId
evidenceId
templateId
```

### UI

Không có numerology logic trong JSX.

### Determinism

Cùng input + cùng version:

```text
same result
```

---

# 80. NGUYÊN TẮC CUỐI CÙNG CỦA MYSTICOS

Không xây:

```text
Tên + ngày sinh
↓
AI
↓
Một bài đọc nghe rất hay
```

Mà xây:

```text
Tên + ngày sinh
↓
NORMALIZE
↓
CALCULATE
↓
VALIDATE
↓
NUMEROLOGY SYSTEM
↓
RULES
↓
EVIDENCE
↓
SYNTHESIS
↓
DETERMINISTIC TEXT
↓
REPORT
```

**MYSTICOS không cần giả vờ rằng Numerology là khoa học để tạo cảm giác uy tín.**

Thứ MYSTICOS có thể làm rất tốt là:

> **Minh bạch trường phái, minh bạch công thức, minh bạch cách tính, nhất quán quy tắc và minh bạch dữ kiện nào dẫn đến diễn giải nào.**

Đó mới là nền móng để module Thần Số Học có chiều sâu mà không cần AI.
