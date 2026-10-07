# MASTER PROMPT
# REBUILD TOÀN BỘ UI/UX MYSTICOS DỰA TRÊN KNOWLEDGE BASE + DETERMINISTIC RESULT ENGINE

---

# 0. NHIỆM VỤ

Bạn đang tiếp quản frontend MYSTICOS sau khi hệ thống đã được xây dựng lại với:

```text
KNOWLEDGE BASE
↓
CLAIMS
↓
RULES
↓
DOMAIN CALCULATION
↓
SEMANTICS
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
RESULT JSON
```

Nhiệm vụ hiện tại:

> **TÁI THIẾT TOÀN BỘ UI/UX CỦA TỪNG TRANG MYSTICOS ĐỂ HIỂN THỊ KẾT QUẢ ĐƯỢC ENGINE SINH RA TỪ KNOWLEDGE BASE.**

Không được quay lại cách làm cũ:

```text
UI
↓
hard-coded meaning
↓
hard-coded paragraph
↓
giả lập kết quả
```

Phải làm:

```text
USER INPUT
↓
ENGINE
↓
KNOWLEDGE BASE
↓
RULES
↓
REASONING
↓
RESULT JSON
↓
UI
```

---

# 1. NGUYÊN TẮC SOURCE OF TRUTH

## 1.1. Knowledge Base là nguồn tri thức

UI không được tự tạo domain meaning.

UI không được quyết định:

- lá bài có nghĩa gì
- con số có nghĩa gì
- hành tinh có ý nghĩa gì
- sao Tử Vi có ý nghĩa gì
- hai người hợp hay không
- pattern nào quan trọng
- guidance nào phù hợp.

Những thứ đó phải đến từ engine.

---

# 2. UI CHỈ ĐƯỢC NHẬN RESULT CONTRACT

Mỗi page phải nhận một structured result.

Ví dụ:

```ts
interface UserFacingResult {
  context: ResultContext;

  headline: string;

  summary: string;

  keyThemes: Theme[];

  interpretations: Interpretation[];

  manifestations: Manifestation[];

  tensions: Tension[];

  guidance: Guidance[];

  why: WhyResult;

  technical?: TechnicalResult;

  evidence?: EvidenceSummary;
}
```

Frontend không được tự suy luận từ raw domain data.

Không:

```tsx
if (card.name === "Seven of Pentacles") {
  ...
}
```

Không:

```tsx
if (lifePath === 7) {
  ...
}
```

Không:

```tsx
if (star === "Tử Vi") {
  ...
}
```

Không:

```tsx
if (compatibility > 80) {
  ...
}
```

---

# 3. NGUYÊN TẮC QUAN TRỌNG NHẤT

## Không được hard-code interpretation vào UI.

Ví dụ SAI:

```ts
const meaning = {
  "Seven of Pentacles":
    "Bạn cần kiên nhẫn và chờ đợi..."
}
```

Ví dụ ĐÚNG:

```ts
result.interpretations
```

được sinh từ:

```text
Seven of Pentacles
+
position
+
orientation
+
question
+
spread context
+
rules
+
relationships
```

---

# 4. CẤU TRÚC TOÀN BỘ PRODUCT

MYSTICOS hiện có 5 domain chính:

```text
01 THẦN SỐ HỌC
02 TỬ VI ĐẨU SỐ
03 CHIÊM TINH
04 TAROT
05 ĐỘ TƯƠNG HỢP
```

Tái thiết page architecture:

```text
/
├── home
│
├── /numerology
│   ├── input
│   └── result
│
├── /tu-vi
│   ├── input
│   └── result
│
├── /astrology
│   ├── input
│   └── result
│
├── /tarot
│   ├── question
│   ├── spread
│   └── result
│
├── /compatibility
│   ├── input
│   └── result
│
└── /results
```

---

# 5. HOME PAGE

## Mục tiêu

Home không phải nơi trình bày kiến thức.

Home phải trả lời:

> "MYSTICOS giúp tôi làm gì?"

## Hero

Hiển thị:

```text
KHẢO CỨU VẬN MỆNH

Khám phá các pattern trong bản đồ,
chu kỳ và mối quan hệ của bạn.
```

Không dùng:

```text
Bạn sẽ biết chính xác tương lai.
```

---

## Module selection

Hiển thị 5 module:

```text
Thần Số Học
Tử Vi Đẩu Số
Chiêm Tinh
Tarot
Độ Tương Hợp
```

Mỗi module chỉ cần:

```text
Tên
Một câu mô tả
CTA
```

Không dump kiến thức.

---

# 6. NUMEROLOGY INPUT PAGE

## Mục tiêu

Thu thập đúng dữ liệu cần cho engine.

Form:

```text
Họ tên
Ngày sinh
```

Nếu engine cần:

```text
Tên khai sinh
Tên thường dùng
```

phải giải thích ngắn tại sao.

Không thu thập dữ liệu không được engine sử dụng.

---

## Before submit

Hiển thị:

```text
Bạn sẽ nhận được:

• Chân dung số cốt lõi
• Các pattern nổi bật
• Chu kỳ hiện tại
• Điểm cần lưu ý
• Gợi ý ứng dụng
```

Không hứa:

```text
dự đoán chắc chắn tương lai
```

---

# 7. NUMEROLOGY RESULT PAGE

## FIRST VIEW

Chỉ hiển thị:

```text
THẦN SỐ HỌC

KẾT QUẢ CHÍNH

[headline được engine sinh]

[summary được engine sinh]
```

Sau đó:

```text
3–5 ĐIỂM NỔI BẬT
```

Mỗi điểm:

```text
title
short interpretation
```

---

# 8. NUMEROLOGY — CORE PROFILE

Hiển thị:

```text
CHÂN DUNG CỐT LÕI
```

Ví dụ cấu trúc:

```text
Life Path
Expression / Destiny
Soul Urge
Personality
```

Nhưng chỉ hiển thị những chỉ số thực sự được engine sử dụng.

Không dump toàn bộ số học nếu không có relevance.

Mỗi item:

```text
Tên
Giá trị
Ý nghĩa trong context
```

Không:

```text
number
formula
calculation steps
```

trên first view.

---

# 9. NUMEROLOGY — PATTERNS

Đây là section quan trọng hơn danh sách số.

Hiển thị:

```text
CÁC MẪU ĐÁNG CHÚ Ý
```

Mỗi pattern:

```text
Pattern title
1–3 câu interpretation
```

Ví dụ:

```text
Độc lập nhưng cần chiều sâu

Các chỉ số cốt lõi tạo ra một pattern
vừa đề cao tự chủ vừa cần thời gian
để suy nghĩ trước khi cam kết.
```

Nội dung này bắt buộc phải đến từ:

```text
number
+
number type
+
relationships
+
rules
+
pattern synthesis
```

Không được hard-code theo số.

---

# 10. NUMEROLOGY — CURRENT CYCLE

Hiển thị:

```text
CHU KỲ HIỆN TẠI
```

Bao gồm:

```text
cycle
current period
interpretation
practical relevance
```

Không hiển thị:

```text
raw formula
intermediate arithmetic
```

trừ trong technical panel.

---

# 11. NUMEROLOGY — PRACTICAL APPLICATION

Hiển thị:

```text
TRONG THỰC TẾ
```

Các nhóm nếu engine có dữ liệu:

```text
Công việc
Quan hệ
Ra quyết định
Phát triển cá nhân
```

Không bắt buộc phải có đủ tất cả.

Nếu engine không sinh được guidance cho một dimension:

> Không render section đó.

---

# 12. NUMEROLOGY — WHY

Expandable:

```text
VÌ SAO HỆ THỐNG ĐƯA RA KẾT QUẢ NÀY?
```

Hiển thị:

```text
Các chỉ số liên quan
Pattern được hình thành
Các rule / framework liên quan
```

Technical source chỉ hiển thị tiếp khi người dùng yêu cầu.

---

# 13. NUMEROLOGY — TECHNICAL

Ẩn mặc định.

Có thể chứa:

```text
Calculation
Formula
Framework
School
Knowledge Base version
Rule version
Evidence
```

Đây là exploration layer.

Không phải main reading.

---

# 14. TỬ VI INPUT PAGE

Thu thập:

```text
Ngày sinh
Giờ sinh
Nơi sinh
Múi giờ
Giới tính nếu school/rule yêu cầu
```

Nếu thiếu giờ:

Không giả vờ là full chart.

Hiển thị:

```text
Mức độ chính xác:
Giới hạn vì chưa có giờ sinh.
```

---

# 15. TỬ VI RESULT — HERO

Không mở đầu bằng 12 cung.

Hiển thị:

```text
TỔNG QUAN LÁ SỐ

[headline]

[summary]
```

Sau đó:

```text
3–5 CHỦ ĐỀ LỚN
```

Đây là output từ:

```text
Mệnh
Thân
Tam Phương Tứ Chính
Xung Chiếu
Tứ Hóa
Miếu/Vượng/Đắc/Hãm
Tuần/Triệt
Vận đang xét
```

theo đúng những rule đã được KB approve.

---

# 16. TỬ VI — MỆNH & THÂN

Section:

```text
MỆNH & THÂN
```

Không chỉ:

```text
Mệnh tại X
Thân tại Y
```

mà phải có:

```text
Cấu trúc
→ pattern
→ interpretation
```

Ví dụ UI:

```text
MỆNH

[giá trị]

Điều nổi bật:
[interpretation từ engine]
```

---

# 17. TỬ VI — MAJOR THEMES

Hiển thị 3–5 pattern quan trọng nhất.

Ví dụ categories:

```text
Tính cách / định hướng
Công việc
Tài chính
Quan hệ
Gia đình
Phát triển
```

Chỉ render category nếu engine có evidence.

---

# 18. TỬ VI — CUNG LIÊN QUAN

Không render 12 cung thành 12 paragraph dài.

Chỉ hiển thị những cung liên quan trực tiếp đến pattern đang được luận.

Ví dụ:

```text
CHỦ ĐỀ: CÔNG VIỆC

Quan Lộc
Tài Bạch
Mệnh
Thiên Di
```

Sau đó:

```text
Pattern
Interpretation
Evidence
```

12 cung đầy đủ chuyển xuống:

```text
KHÁM PHÁ 12 CUNG
```

---

# 19. TỬ VI — TỨ HÓA

Chỉ hiển thị Tứ Hóa nếu:

```text
engine đã tính
school đã xác định
rule đã approved
```

UI:

```text
TỨ HÓA ĐÁNG CHÚ Ý

Hóa Lộc
→ interpretation

Hóa Quyền
→ interpretation

...
```

Không hiển thị mọi metadata nếu không ảnh hưởng đến result.

---

# 20. TỬ VI — VẬN HẠN

Hiển thị:

```text
VẬN ĐANG XÉT
```

Ví dụ:

```text
Đại Hạn
Tiểu Hạn
Lưu Niên
```

Nhưng chỉ hiển thị tầng mà engine thực sự tính được.

Không giả lập.

---

# 21. TỬ VI — 12 CUNG EXPLORER

Đây là secondary navigation.

Hiển thị:

```text
Mệnh
Phụ Mẫu
Phúc Đức
Điền Trạch
Quan Lộc
Nô Bộc
Thiên Di
Tật Ách
Tài Bạch
Tử Tức
Phu Thê
Huynh Đệ
```

Click vào cung:

```text
Summary
Relevant stars
Relationships
Interpretation
Evidence
```

Không biến mỗi cung thành một bài luận dài mặc định.

---

# 22. ASTROLOGY INPUT

Thu thập:

```text
Ngày sinh
Giờ sinh
Nơi sinh
Timezone
```

Nếu không có giờ:

```text
Precision:
Sun / partial chart
```

Không render houses/ASC như full natal nếu chưa đủ dữ liệu.

---

# 23. ASTROLOGY RESULT HERO

Không bắt đầu bằng 10 hành tinh.

Hiển thị:

```text
CHÂN DUNG CHÍNH

Headline
Summary

3–5 major themes
```

---

# 24. ASTROLOGY — BIG THREE

Hiển thị:

```text
Sun
Moon
Ascendant
```

chỉ khi dữ liệu đủ.

Mỗi item:

```text
Placement
Contextual interpretation
```

Không dump degree/orb trước interpretation.

---

# 25. ASTROLOGY — MAJOR PATTERNS

Hiển thị:

```text
CÁC MẪU NỔI BẬT
```

Ví dụ:

```text
Cách thể hiện bản thân
Cảm xúc
Giao tiếp
Quan hệ
Hành động
Sự nghiệp
```

Pattern phải được engine tổng hợp từ:

```text
planet
sign
house
aspect
orb
chart context
```

---

# 26. ASTROLOGY — ASPECTS

Không hiển thị toàn bộ aspect table ở default view.

Hiển thị:

```text
CÁC TÁC ĐỘNG ĐÁNG CHÚ Ý
```

3–7 aspect quan trọng nhất.

Ví dụ:

```text
Mars □ Saturn

Điều này tạo ra tension giữa
động lực hành động và sự kiểm soát.
```

Phần:

```text
degree
orb
aspect type
```

để trong technical detail.

---

# 27. ASTROLOGY — LIFE AREAS

Nếu engine map được:

```text
Tình cảm
Công việc
Tài chính
Gia đình
Phát triển
```

thì hiển thị pattern tương ứng.

Không tạo generic interpretation nếu không có rule/evidence.

---

# 28. TAROT INPUT

Cho:

```text
Question
Spread
```

Nếu spread không cần thêm thông tin:

Không thêm form thừa.

---

# 29. TAROT DRAW

Nếu hệ thống sử dụng random draw:

UI chỉ hiển thị:

```text
đang rút bài...
```

Sau khi draw:

```text
cards
positions
orientation
```

Nhưng interpretation phải chờ engine.

Không để frontend tự luận.

---

# 30. TAROT SINGLE CARD RESULT

Cấu trúc:

```text
[TÊN LÁ]

[VỊ TRÍ]

KẾT QUẢ CHÍNH

[interpretation]
```

Sau đó:

```text
ĐIỂM ĐÁNG CHÚ Ý
```

Sau đó:

```text
TRONG THỰC TẾ
```

Sau đó:

```text
ĐIỀU NÊN LƯU Ý
```

Sau đó:

```text
VÌ SAO?
```

---

# 31. TAROT MULTI-CARD RESULT

Không render:

```text
Card 1 paragraph
Card 2 paragraph
Card 3 paragraph
```

rồi gọi đó là synthesis.

Phải:

```text
TỔNG QUAN

↓

PATTERN CHÍNH

↓

DIỄN BIẾN

Card A
→
Card B
→
Card C

↓

ĐIỂM CĂNG THẲNG / CHUYỂN ĐỔI

↓

KẾT LUẬN

↓

GỢI Ý
```

---

# 32. TAROT CARD DETAIL

Khi user click card:

Hiển thị:

```text
Card
Position
Orientation

Ý nghĩa trong context này

Vai trò của lá trong toàn bộ spread

Các mối liên hệ quan trọng
```

Không hiển thị 20 trường metadata mặc định.

---

# 33. TAROT — WHY

Hiển thị:

```text
Vì sao lá này được diễn giải như vậy?
```

Ví dụ:

```text
Vị trí:
Outcome

Orientation:
Upright

Các yếu tố liên quan:
...

Pattern:
...
```

Sau đó:

```text
[ Xem cơ sở chuyên môn ]
```

---

# 34. COMPATIBILITY INPUT

Thu thập:

```text
Person A
Person B
```

Các dữ liệu:

```text
Name
Date of birth
Birth time
Birth place
Timezone
```

chỉ khi engine cần.

---

# 35. COMPATIBILITY HERO

Không:

```text
78% compatible
```

Mở đầu:

```text
ĐỘNG LỰC CHÍNH CỦA MỐI QUAN HỆ

[headline]

[summary]
```

Ví dụ conceptual structure:

```text
Điểm kết nối mạnh:
...

Điểm dễ va chạm:
...

Pattern chính:
...
```

Tất cả phải đến từ compatibility engine.

---

# 36. COMPATIBILITY — DIMENSIONS

Render:

```text
Cảm xúc
Giao tiếp
Thu hút
Tình cảm
Xung đột
Giá trị
Tiền bạc
Đời sống hàng ngày
Cam kết
Phát triển
```

Nhưng:

> **Không bắt buộc hiển thị cả 10.**

Chỉ hiển thị dimension có meaningful result.

---

# 37. COMPATIBILITY — EACH DIMENSION

Mỗi dimension:

```text
Tên dimension

Điểm nổi bật

Supportive pattern

Tension pattern

Biểu hiện thực tế

Gợi ý
```

Không hiển thị:

```text
raw A
raw B
rule IDs
```

trên default view.

---

# 38. COMPATIBILITY — REAL-LIFE SCENARIOS

Nếu engine có contextual scenario:

```text
KHI CÓ MÂU THUẪN

KHI NÓI VỀ TIỀN

KHI CẦN KHÔNG GIAN RIÊNG

KHI RA QUYẾT ĐỊNH

KHI CAM KẾT

KHI CÓ THAY ĐỔI CÔNG VIỆC
```

Chỉ render scenario mà engine có đủ evidence.

---

# 39. COMPATIBILITY — WHY

Ví dụ:

```text
VÌ SAO HỆ THỐNG NHẬN ĐỊNH NHƯ VẬY?
```

Hiển thị:

```text
A signal
+
B signal
↓
Interaction
↓
Dimension
↓
Pattern
```

Đây là user-facing reasoning summary.

Không expose internal chain-of-thought.

---

# 40. CROSS-SYSTEM PAGE

Nếu người dùng yêu cầu khảo cứu nhiều hệ thống:

Không tạo:

```text
Tarot report
Numerology report
Astrology report
Tu Vi report
```

xếp nối nhau.

Phải có:

```text
TỔNG HỢP

Pattern chung

Các hệ thống hỗ trợ nhau ở đâu?

Các hệ thống khác nhau ở đâu?

Điểm nào nên xem như một góc nhìn bổ sung?
```

---

# 41. EVIDENCE PAGE

Không hiển thị toàn bộ Knowledge Base.

Mặc định:

```text
CƠ SỞ CỦA KẾT QUẢ

3–5 yếu tố chính

Nguồn / framework liên quan
```

Nếu user mở sâu:

```text
Rule
Claim
Source
Document
Page / Section
School
Version
```

---

# 42. HISTORY PAGE

History chỉ hiển thị:

```text
Ngày
Module
Tên / label
Question hoặc context
Tóm tắt kết quả
```

Không lưu/render raw calculation nếu không cần.

---

# 43. SETTINGS / PROFILE

Chỉ có:

```text
Thông tin cá nhân
Dữ liệu sinh
Privacy
Delete data
Preferences
```

Không trộn domain interpretation vào profile.

---

# 44. LOADING STATE

Loading phải phản ánh quá trình thật.

Không:

```text
Đang dùng AI để đọc vận mệnh...
```

Nếu engine thực sự deterministic:

```text
Đang tính toán...
Đang đối chiếu dữ liệu...
Đang tổng hợp kết quả...
```

Không fake progress.

---

# 45. ERROR STATE

Nếu engine fail:

Không hiển thị:

```text
Có vẻ năng lượng của bạn quá phức tạp...
```

Phải nói rõ:

```text
Không thể hoàn tất khảo cứu.

Dữ liệu đầu vào chưa đủ / hệ thống gặp lỗi.

[Thử lại]
```

---

# 46. PARTIAL RESULT

Nếu engine trả:

```text
precision = partial
```

UI phải nói:

```text
Kết quả hiện tại có phạm vi giới hạn
vì dữ liệu đầu vào chưa đầy đủ.
```

Không render UI giống full precision.

---

# 47. NO RESULT

Nếu không có pattern đủ mạnh:

Không ép viết:

```text
Bạn là người...
```

Phải cho phép:

```text
Chưa có pattern đủ rõ để đưa ra diễn giải cụ thể.
```

Đây là behavior bắt buộc.

---

# 48. EMPTY KNOWLEDGE / UNSUPPORTED RULE

Nếu Knowledge Base không có rule được approve:

```text
Không có đủ cơ sở từ framework hiện tại
để đưa ra diễn giải cho yếu tố này.
```

Không fallback sang:

- AI
- Google
- hard-coded paragraph
- random interpretation.

---

# 49. RESULT PRIORITIZATION

Engine có thể trả:

```text
20 interpretations
```

UI default chỉ hiển thị:

```text
3–5 primary interpretations
```

Các interpretation còn lại:

```text
Xem thêm
```

Selection phải dựa trên:

```text
strength
relevance
specificity
contextFit
evidence quality
pattern importance
```

không dựa vào array order.

---

# 50. RESULT TEXT

Mọi text có nội dung domain phải đến từ:

```text
Result Engine
```

hoặc từ một:

```text
approved presentation template
```

nhưng template chỉ định cấu trúc, không tạo domain claim mới.

Ví dụ được phép:

```text
"Kết quả chính"
```

Không được:

```text
if card === X
  return "Bạn nên kiên nhẫn..."
```

---

# 51. NO FALLBACK INTERPRETATION

Nếu:

```text
result.interpretation === null
```

không được:

```ts
interpretation || genericMeaning
```

Phải:

```text
No verified interpretation available.
```

---

# 52. NO FRONTEND DOMAIN LOGIC

Audit toàn bộ:

```text
.tsx
.ts
.jsx
.js
```

Tìm:

```text
card names
star names
numbers
planet names
zodiac signs
palace names
compatibility logic
interpretation strings
```

Nếu frontend dùng chúng để quyết định meaning:

```text
MOVE TO ENGINE
```

---

# 53. UI DATA CONTRACT

Mỗi page phải có một page-specific adapter:

```text
EngineResult
↓
PageViewModel
↓
UI
```

Ví dụ:

```ts
TarotResult
→ TarotPageViewModel

TuViResult
→ TuViPageViewModel

AstrologyResult
→ AstrologyPageViewModel

NumerologyResult
→ NumerologyPageViewModel

CompatibilityResult
→ CompatibilityPageViewModel
```

PageViewModel chỉ:

- select
- order
- group
- format

Không được:

- interpret
- infer
- invent.

---

# 54. COMPONENT RULE

Component không được biết domain rule.

Ví dụ:

```tsx
<KeyTheme theme={theme} />
```

Component không biết theme đến từ Tarot, Astrology hay Numerology.

Component chỉ render:

```text
title
summary
details
```

---

# 55. RESPONSIVE INFORMATION PRIORITY

Mobile:

```text
Primary result
↓
Key patterns
↓
Practical meaning
↓
Guidance
↓
Why
↓
Technical
```

Desktop:

```text
Main result
+
secondary context
```

Không được vì desktop rộng mà dump thêm dữ liệu.

---

# 56. PAGE-BY-PAGE QA

Mỗi page phải được test:

## Test 1 — Input change

Đổi input.

Expected:

```text
result thay đổi
```

## Test 2 — Knowledge Base change

Đổi KB version.

Expected:

```text
nội dung có thể thay đổi
```

và provenance phải thay đổi tương ứng.

## Test 3 — Remove rule

Tắt một rule.

Expected:

```text
related interpretation/pattern thay đổi hoặc biến mất.
```

## Test 4 — UI independence

Thay đổi UI copy.

Expected:

```text
domain result không thay đổi.
```

## Test 5 — No hard-code

Search toàn bộ frontend.

Không còn:

```text
domain entity → interpretation
```

---

# 57. USER TEST

Với mỗi module, test bằng người không biết domain.

Cho xem result page 30 giây.

Hỏi:

### A

"Kết quả chính là gì?"

### B

"Điểm nào đáng chú ý?"

### C

"Điều này có ý nghĩa thực tế gì?"

### D

"Vì sao hệ thống đưa ra kết quả này?"

### E

"Tôi có thể làm gì với thông tin này?"

Nếu user không trả lời được:

```text
UX FAIL
```

Không giải quyết bằng cách thêm text ngay.

Trước tiên:

```text
restructure hierarchy
```

---

# 58. FINAL PAGE TEMPLATE

Mọi domain page nên cố gắng hội tụ về:

```text
────────────────────────

CONTEXT

KẾT QUẢ CHÍNH

[Headline]

[1–3 câu summary]

────────────────────────

ĐIỂM NỔI BẬT

[Theme 1]
[Theme 2]
[Theme 3]

────────────────────────

ĐIỀU NÀY CÓ THỂ BIỂU HIỆN

[Manifestation]

────────────────────────

ĐIỀU NÊN LƯU Ý

[Tension / Opportunity]

────────────────────────

GỢI Ý THỰC TẾ

[Guidance]

────────────────────────

VÌ SAO?

[Why this result?]

────────────────────────

KHÁM PHÁ CHI TIẾT

[Technical / Evidence / Full domain data]

────────────────────────
```

Đây là **default information architecture**, không phải hard-coded domain interpretation.

---

# 59. QUY TẮC "DO NOT SHOW"

Mặc định KHÔNG hiển thị:

```text
raw claims
raw rules
rule IDs
claim IDs
signal IDs
internal weights
priority scores
confidence scores
calculation internals
database IDs
source crawler metadata
JSON
debug information
engine version
unless technical/evidence panel
```

---

# 60. QUY TẮC "MUST SHOW"

Nếu engine có dữ liệu hợp lệ, người dùng phải thấy:

```text
Kết quả chính
Ý nghĩa
Pattern chính
Biểu hiện thực tế
Điểm cần lưu ý
Guidance
Mức độ đầy đủ của dữ liệu
```

---

# 61. QUY TẮC "ONLY SHOW IF GENERATED"

Một section chỉ được render nếu engine có dữ liệu tương ứng.

Ví dụ:

```ts
if (result.guidance.length > 0)
  render(Guidance)
```

Không tạo placeholder interpretation.

Không tạo generic advice.

Không tạo filler.

---

# 62. KNOWLEDGE BASE TRACEABILITY

Mọi nội dung domain quan trọng trên UI phải trace được:

```text
UI statement
↓
Interpretation ID
↓
Pattern ID
↓
Signal IDs
↓
Rule IDs
↓
Claim IDs
↓
Source IDs
```

Không nhất thiết hiển thị toàn bộ cho user.

Nhưng hệ thống phải giữ được trace.

---

# 63. GOLDEN UI CASES

Tạo golden snapshots cho:

```text
Tarot
Numerology
Astrology
Tu Vi
Compatibility
```

Mỗi case phải kiểm tra:

```text
correct headline
correct primary patterns
correct guidance
correct precision
correct evidence availability
correct absence of unsupported sections
```

---

# 64. KHÔNG ĐƯỢC "LÀM UI ĐẸP TRƯỚC"

Thứ tự bắt buộc:

```text
1. Inspect current UI

2. Inspect current Result JSON

3. Inspect Knowledge Base provenance

4. Map Engine Result → User Need

5. Define Page View Model

6. Remove redundant information

7. Define information hierarchy

8. Build page

9. Connect real engine result

10. Test with changed input

11. Test with changed KB

12. Remove legacy hard-coded content

13. Polish visual design
```

Không được bắt đầu bằng:

```text
"hãy redesign trang này đẹp hơn"
```

---

# 65. FINAL ACCEPTANCE CRITERIA

Mỗi page chỉ đạt khi:

### 1. REAL DATA

Mọi interpretation quan trọng đều đến từ:

```text
Knowledge Base
+
approved rules
+
reasoning engine
```

### 2. NO FAKE CONTENT

Không có:

```text
generic fallback interpretation
generic advice
placeholder meaning
hard-coded domain paragraph
```

### 3. USER UNDERSTANDS

Người mới hiểu:

```text
What
Why
How
What to watch
What to do
```

### 4. INFORMATION IS CURATED

Không dump toàn bộ engine output.

### 5. PROGRESSIVE DISCLOSURE

Technical information tồn tại nhưng ẩn mặc định.

### 6. TRACEABILITY

Mọi kết luận có provenance.

### 7. RESPONSIVE

Mobile không bị data overload.

### 8. DETERMINISTIC

Cùng engine result → cùng UI content.

### 9. DYNAMIC

Đổi input → result thật sự thay đổi.

### 10. NO DOMAIN LOGIC IN UI

Frontend chỉ:

```text
select
sort
group
format
render
```

Không:

```text
infer
interpret
calculate
reason
```

---

# FINAL PRODUCT PRINCIPLE

MYSTICOS không phải là:

```text
DATABASE → DISPLAY
```

và cũng không phải:

```text
ENGINE → DUMP EVERYTHING
```

Mà là:

```text
USER INPUT
↓
KNOWLEDGE BASE
↓
DETERMINISTIC ENGINE
↓
REASONING
↓
CURATED RESULT
↓
USER-FACING VIEW
```

Trong đó:

> **Engine phải đủ sâu để tạo ra kết quả khác nhau khi dữ liệu và context khác nhau.**

> **UI phải đủ thông minh về information architecture để biết cái gì đáng cho người dùng xem trước.**

> **Không được để người dùng trả giá cho độ phức tạp của backend.**

Người dùng không cần nhìn thấy toàn bộ những gì MYSTICOS đã tính.

Họ cần nhìn thấy:

```text
ĐIỀU QUAN TRỌNG NHẤT
↓
NÓ CÓ Ý NGHĨA GÌ
↓
VÌ SAO
↓
NÓ CÓ THỂ XUẤT HIỆN THẾ NÀO
↓
TÔI NÊN LÀM GÌ
```

Và nếu họ muốn đào sâu:

```text
WHY?
↓
EVIDENCE
↓
TECHNICAL
↓
SOURCE
```

**ẨN ĐỘ PHỨC TẠP — KHÔNG ẨN ĐỘ SÂU.**

**KHÔNG HARD-CODE LUẬN GIẢI VÀO UI.**

**KHÔNG DUMP ENGINE OUTPUT RA MẶT NGƯỜI DÙNG.**

**MỌI KẾT QUẢ DOMAIN PHẢI BẮT NGUỒN TỪ KNOWLEDGE BASE ĐÃ ĐƯỢC APPROVE VÀ RESULT ENGINE.**