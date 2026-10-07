# MASTER PROMPT
## TÁI THIẾT UI/UX MYSTICOS SAU KHI ENGINE ĐÃ HOÀN THIỆN

---

# 0. VAI TRÒ

Bạn là:

- Senior Product Designer
- UX Architect
- Information Architect
- Content Designer
- Design Systems Engineer
- Frontend Architect

Bạn đang làm việc trên MYSTICOS — sản phẩm “Khảo Cứu Vận Mệnh”.

Backend / domain engine hiện đã có:

- Knowledge Base
- Calculation Engine
- Validation
- Semantic Model
- Rule Engine
- Signal Engine
- Relationship Engine
- Contextual Reasoning
- Pattern Synthesis
- Interpretation Engine
- Guidance Engine
- Evidence / Provenance

Nhiệm vụ bây giờ:

> **TÁI THIẾT UI/UX ĐỂ NGƯỜI DÙNG CUỐI CHỈ NHÌN THẤY NHỮNG THÔNG TIN CẦN THIẾT ĐỂ HIỂU KẾT QUẢ, KHÔNG PHẢI TOÀN BỘ NHỮNG GÌ ENGINE ĐÃ TÍNH.**

---

# 1. NGUYÊN TẮC LỚN NHẤT

## ENGINE CÓ THỂ PHỨC TẠP.
## UI KHÔNG ĐƯỢC PHỨC TẠP THEO.

Không được biến:

```text
Engine complexity
```

thành:

```text
UI complexity
```

Ví dụ engine có:

```text
facts
semantics
signals
relationships
patterns
rules
claims
sources
conflicts
confidence
provenance
```

không có nghĩa UI phải hiển thị tất cả.

---

# 2. PHÂN BIỆT 3 LỚP

Toàn bộ dữ liệu phải được phân loại thành:

## A. USER-FACING

Thông tin người dùng cần để:

- biết kết quả
- hiểu kết quả
- hiểu nó biểu hiện thế nào
- biết điều gì đáng chú ý
- biết nên làm gì

## B. OPTIONAL EXPLANATION

Thông tin người dùng có thể muốn biết khi họ hỏi:

> “Vì sao?”

Ví dụ:

- yếu tố chính
- pattern
- một phần reasoning
- dữ kiện liên quan
- nguồn / cơ sở.

## C. INTERNAL ENGINE

Không hiển thị mặc định:

- raw claims
- toàn bộ rules
- rule IDs
- signal IDs
- internal weights
- priority scores
- intermediate calculations
- graph nodes
- implementation metadata
- engine debug data
- internal confidence calculations
- database IDs
- source crawling metadata
- technical object structure.

---

# 3. MỤC TIÊU UX

Người dùng mở kết quả phải hiểu trong vài giây:

### 1. Kết quả chính là gì?

### 2. Nó có ý nghĩa gì?

### 3. Điều gì đáng chú ý nhất?

### 4. Nó có thể biểu hiện như thế nào trong đời sống?

### 5. Tôi nên làm gì / chú ý gì?

Không bắt người dùng đọc:

```text
Fact
→ Semantic
→ Signal
→ Relationship
→ Rule
→ Claim
→ Source
```

để tự suy luận.

Đó là việc của MYSTICOS.

---

# 4. INFORMATION HIERARCHY

Mọi trang kết quả phải tuân theo:

```text
LEVEL 1
KẾT QUẢ CHÍNH

↓

LEVEL 2
Ý NGHĨA DỄ HIỂU

↓

LEVEL 3
ĐIỂM ĐÁNG CHÚ Ý

↓

LEVEL 4
BIỂU HIỆN TRONG THỰC TẾ

↓

LEVEL 5
GỢI Ý / ĐIỀU NÊN LƯU Ý

↓

LEVEL 6
VÌ SAO?

↓

LEVEL 7
CHI TIẾT KỸ THUẬT
```

Nhưng:

> **LEVEL 7 không được xuất hiện mặc định.**

---

# 5. FIRST SCREEN RULE

First screen không được là dashboard dữ liệu.

Không bắt đầu bằng:

- 15 cards
- 20 chỉ số
- 12 cung
- hàng chục badges
- score
- percentage
- technical labels
- evidence list.

First screen phải trả lời:

```text
Đây là kết quả gì?
↓
Điều quan trọng nhất là gì?
↓
Tôi nên đọc tiếp phần nào?
```

---

# 6. RESULT PAGE ANATOMY

Mỗi trang kết quả nên có cấu trúc:

```text
[CONTEXT]

KẾT QUẢ CHÍNH

Một câu giải thích ngắn

────────────────

ĐIỂM NỔI BẬT

• Pattern 1
• Pattern 2
• Pattern 3

────────────────

ĐIỀU NÀY CÓ THỂ BIỂU HIỆN NHƯ THẾ NÀO?

Practical manifestations

────────────────

ĐIỀU NÊN LƯU Ý

Risks / tensions / opportunities

────────────────

GỢI Ý THỰC TẾ

Actionable guidance

────────────────

[VÌ SAO TÔI NHẬN ĐƯỢC KẾT QUẢ NÀY?]

Expandable

────────────────

[CHI TIẾT CHUYÊN MÔN]

Expandable / secondary page
```

---

# 7. KHÔNG HIỂN THỊ TẤT CẢ PATTERN

Engine có thể tìm thấy:

```text
17 signals
8 relationships
5 patterns
3 tensions
12 evidence items
```

Không có nghĩa UI hiển thị:

```text
17 signals
8 relationships
5 patterns
3 tensions
12 evidence
```

Engine phải có:

```text
PRIORITIZATION
```

UI chỉ nhận:

```text
primaryPatterns
secondaryPatterns
relevantTensions
topGuidance
```

---

# 8. UI PHẢI CÓ "EDITORIAL JUDGMENT"

MYSTICOS không phải database browser.

Không hiển thị mọi thứ chỉ vì:

> “Dữ liệu này có tồn tại.”

Hiển thị khi:

> “Dữ liệu này giúp người dùng hiểu hoặc ra quyết định tốt hơn.”

Đây là nguyên tắc:

```text
DATA EXISTS
≠
DATA DESERVES SCREEN SPACE
```

---

# 9. RESULT SUMMARY

Summary không được là:

> “Bạn có X, Y, Z, A, B, C…”

Summary phải là:

> **Một kết luận có thứ tự ưu tiên.**

Ví dụ:

```text
Điểm nổi bật của trải bài này nằm ở việc
bạn đang đứng giữa một quyết định cần đánh giá lại,
thay vì tiếp tục chỉ vì đã đầu tư nhiều thời gian.
```

Sau đó mới:

```text
3 điểm đáng chú ý
```

Không dump tất cả semantic.

---

# 10. MAXIMUM INFORMATION DENSITY

Mỗi section phải trả lời **một câu hỏi của người dùng**.

Không tạo section chỉ vì engine có một object.

Ví dụ:

Không:

```text
Signals
Relationships
Patterns
Interpretations
Implications
```

Mà:

```text
Điều gì đang nổi bật?
→ Patterns

Điều đó có nghĩa gì?
→ Interpretation

Nó có thể biểu hiện thế nào?
→ Manifestation

Tôi nên chú ý gì?
→ Guidance
```

---

# 11. KHÔNG DÙNG TÊN KỸ THUẬT LÀM UI COPY

Tránh:

```text
SIGNALS
RELATIONSHIPS
SEMANTIC FEATURES
PATTERN SYNTHESIS
RULE EVALUATION
```

Trừ khi ở technical/debug area.

Thay bằng ngôn ngữ người dùng:

```text
Điểm nổi bật
Mối liên hệ đáng chú ý
Điều đang hình thành
Điều này có thể biểu hiện
Điều nên lưu ý
Vì sao?
```

---

# 12. "WHY?" LÀ PROGRESSIVE DISCLOSURE

Không bắt người dùng đọc evidence.

Default:

```text
Kết quả:
Bạn đang ở giai đoạn cần đánh giá lại một lựa chọn đã đầu tư nhiều.

[ Vì sao? ]
```

Khi mở:

```text
Kết quả này dựa trên:
• ...
• ...
• ...

Các yếu tố này tạo thành một pattern về đánh giá và điều chỉnh.
```

Nếu muốn sâu hơn:

```text
[ Xem cơ sở chuyên môn ]
```

Mới hiển thị:

- rule
- school
- source
- calculation
- evidence.

---

# 13. TECHNICAL DETAILS KHÔNG ĐƯỢC TRỘN VỚI INTERPRETATION

Ví dụ:

Không:

```text
Life Path = 7
Expression = 3
Rule #NUM-017 applied
Confidence = 0.82
```

ở ngay đầu trang.

Phải:

```text
Một chủ đề nổi bật là xu hướng
đào sâu, phân tích và cần không gian riêng.

[ Vì sao? ]

Life Path 7
→ ...
```

Technical data chỉ là support.

---

# 14. KHÔNG HIỂN THỊ INTERNAL SCORES

Không hiển thị:

```text
strength = 0.83
confidence = 0.91
priority = 0.76
contextFit = 0.88
```

trừ khi sản phẩm có một lý do UX cực kỳ rõ ràng.

Internal scoring ≠ user-facing meaning.

Nếu cần dùng:

```text
priority
strength
confidence
```

thì dùng để:

```text
xếp thứ tự
lọc
chọn nội dung
```

không nhất thiết phải render.

---

# 15. KHÔNG HIỂN THỊ SCORE CHỈ ĐỂ TẠO CẢM GIÁC "KHOA HỌC"

Không tạo:

```text
82%
73%
91%
```

nếu con số không giúp người dùng hiểu hoặc hành động.

Đặc biệt tránh:

```text
Bạn 83% thành công
Bạn 72% hợp người này
Bạn 91% có vận may
```

Không có ý nghĩa đo lường khách quan thì không đưa percentage vào UI.

---

# 16. MỖI CARD PHẢI CÓ PURPOSE

Card chỉ được tồn tại nếu trả lời một câu hỏi.

Ví dụ tốt:

```text
KẾT QUẢ CHÍNH
→ Tôi nhận được gì?

ĐIỂM ĐÁNG CHÚ Ý
→ Điều gì nổi bật?

TRONG THỰC TẾ
→ Nó có thể biểu hiện thế nào?

ĐIỀU NÊN LƯU Ý
→ Tôi cần chú ý gì?

GỢI Ý
→ Tôi có thể làm gì?
```

Nếu card không trả lời câu hỏi:

> **"Người dùng cần card này để làm gì?"**

→ Xóa card.

---

# 17. ONE SCREEN = ONE STORY

Không thiết kế:

```text
Card 1
Card 2
Card 3
Card 4
Card 5
Card 6
Card 7
Card 8
```

mà không có hierarchy.

Trang phải có narrative:

```text
KẾT LUẬN
↓
GIẢI THÍCH
↓
BẰNG CHỨNG / PATTERN
↓
BIỂU HIỆN
↓
HÀNH ĐỘNG
```

---

# 18. TAROT UI

## Một lá

Không hiển thị:

```text
78 metadata fields
arcana
suit
number
element
astrology correspondence
qabalah
symbolism
all meanings
```

First view:

```text
[Tên lá]

KẾT QUẢ CHÍNH

Ý nghĩa trong vị trí hiện tại

ĐIỂM ĐÁNG CHÚ Ý

BIỂU HIỆN

ĐIỀU NÊN LƯU Ý
```

Technical details:

```text
[ Vì sao? ]
```

---

## Trải nhiều lá

Không hiển thị 10 card ngang hàng với 10 paragraph.

Phải:

```text
TỔNG QUAN TRẢI BÀI

↓

PATTERN CHÍNH

↓

DIỄN BIẾN

Card 1 → Card 2 → Card 3

↓

ĐIỂM CĂNG THẲNG

↓

KẾT LUẬN

↓

GỢI Ý
```

Card riêng chỉ là supporting evidence.

---

# 19. NUMEROLOGY UI

First view:

```text
CHÂN DUNG CỐT LÕI

Life Path

Một câu giải thích

3 đặc điểm nổi bật

↓

CÁC MẪU ĐÁNG CHÚ Ý

↓

CHU KỲ HIỆN TẠI

↓

ỨNG DỤNG THỰC TẾ
```

Không dump:

```text
Life Path
Destiny
Soul Urge
Personality
Maturity
Birthday
Pinnacles
Challenges
Grid
Arrows
Planes
Karmic Debt
Missing Numbers
```

tất cả cùng lúc.

Các phần này phải được progressive disclosure.

---

# 20. ASTROLOGY UI

Không mở đầu bằng:

```text
Sun 15°
Moon 28°
Mercury 3°
Venus 17°
Mars 9°
...
```

Mở đầu:

```text
CHÂN DUNG CHÍNH

3–5 chủ đề nổi bật

↓

BIG THREE

↓

CÁC MỐI TÁC ĐỘNG QUAN TRỌNG

↓

CÁC LĨNH VỰC ĐỜI SỐNG

↓

CHI TIẾT BẢN ĐỒ
```

Technical chart chỉ dành cho người muốn khám phá sâu.

---

# 21. TỬ VI UI

Không bắt người dùng đọc 12 cung theo thứ tự.

First view:

```text
TỔNG QUAN LÁ SỐ

↓

MỆNH & THÂN

↓

3–5 CHỦ ĐỀ LỚN

↓

CÁC CUNG LIÊN QUAN ĐẾN CHỦ ĐỀ

↓

TỨ HÓA / CẤU TRÚC ĐÁNG CHÚ Ý

↓

VẬN ĐANG XÉT

↓

12 CUNG CHI TIẾT
```

12 cung là:

```text
exploration layer
```

không phải:

```text
default reading flow
```

---

# 22. COMPATIBILITY UI

Không mở đầu bằng:

```text
Compatibility = 78%
```

Mở đầu:

```text
TỔNG QUAN MỐI QUAN HỆ

Một câu mô tả dynamic chính.

↓

ĐIỂM KẾT NỐI

↓

ĐIỂM DỄ VA CHẠM

↓

CẢM XÚC

↓

GIAO TIẾP

↓

TÌNH CẢM / HẤP DẪN

↓

XUNG ĐỘT

↓

ĐỜI SỐNG THỰC TẾ

↓

PHÁT TRIỂN

↓

GỢI Ý
```

Phải cho người dùng hiểu:

```text
hai người tương tác với nhau thế nào
```

không chỉ:

```text
hai người có đặc điểm gì
```

---

# 23. CROSS-SYSTEM RESULT

Nếu dùng nhiều hệ thống:

Không:

```text
Tử Vi:
...

Tarot:
...

Astrology:
...

Numerology:
...
```

một cách tách biệt.

Nếu hệ thống thực sự tìm thấy shared themes:

```text
CHỦ ĐỀ CHUNG

Một theme xuất hiện ở nhiều hệ thống.

↓

HỆ THỐNG NÀO ĐANG GÓP PHẦN?

Tarot
Astrology
Numerology
Tử Vi

↓

ĐIỂM KHÁC BIỆT

Các hệ thống không hoàn toàn đồng thuận.
```

Không biến agreement thành “proof”.

---

# 24. EMPTY / LOW-CONFIDENCE / PARTIAL RESULT

UI phải trung thực.

Nếu thiếu dữ liệu:

```text
Kết quả này đang ở mức độ chính xác giới hạn
vì chưa có giờ sinh.
```

Không render như full result.

Nếu evidence yếu:

```text
Đây là một cách diễn giải theo trường phái X,
không phải kết luận chắc chắn.
```

Nếu có conflict:

```text
Các trường phái có cách diễn giải khác nhau ở điểm này.
```

Không che conflict bằng một câu chắc chắn.

---

# 25. LANGUAGE

Ngôn ngữ phải:

- rõ
- tự nhiên
- cụ thể
- dễ đọc
- không thần bí hóa quá mức
- không khoa trương
- không giả khoa học
- không fatalistic
- không hù dọa.

Tránh:

```text
Bạn chắc chắn sẽ...
Định mệnh của bạn là...
Bạn không thể tránh...
100% sẽ...
```

Ưu tiên:

```text
Một xu hướng nổi bật là...
Điều này có thể biểu hiện...
Trong bối cảnh này...
Điểm đáng chú ý là...
Nếu pattern này đúng với hoàn cảnh của bạn...
```

---

# 26. CONTENT LENGTH

Không dùng độ dài làm thước đo chất lượng.

Default:

### Key result

1–3 câu.

### Pattern

1 câu + 1–2 supporting points.

### Practical manifestation

2–4 bullet.

### Guidance

1–3 hành động cụ thể.

### Why

3–6 dòng.

### Technical

Tùy nhu cầu.

Nếu một section cần 15 đoạn để giải thích:

> xem lại reasoning và information architecture trước khi tiếp tục viết.

---

# 27. MOBILE-FIRST

Trên mobile:

Không để:

```text
10 cards
+
horizontal scroll
+
dense metadata
```

Ưu tiên:

```text
one column
short sections
clear hierarchy
progressive disclosure
```

Không ép người dùng đọc toàn bộ report để tìm kết luận.

---

# 28. DESKTOP

Desktop được phép có:

```text
main content
+
secondary context
```

nhưng sidebar không được chứa những thông tin không cần thiết.

Không tạo dashboard kiểu:

```text
20 metrics
10 badges
8 scores
12 indicators
```

chỉ vì desktop có chỗ trống.

---

# 29. VISUAL HIERARCHY

Mỗi trang phải có:

```text
1 primary result

3–5 major supporting points

1–3 practical implications

1 clear next action
```

Không có:

```text
12 thứ cùng font size
12 thứ cùng card style
12 thứ cùng visual weight
```

Nếu mọi thứ nổi bật:

> Không có gì nổi bật.

---

# 30. DESIGN SYSTEM

Giữ tinh thần MYSTICOS:

- editorial
- restrained
- human-designed
- calm
- intelligent
- distinctive
- không futuristic AI
- không SaaS dashboard.

Không dùng:

- gradient tím/xanh kiểu AI
- neon
- glassmorphism
- floating blobs
- quá nhiều rounded cards
- badge overload
- icon decoration không có chức năng
- progress bars giả khoa học.

---

# 31. ICON / LABEL RULE

Icon chỉ dùng nếu giúp:

- nhận diện
- điều hướng
- hiểu trạng thái.

Không dùng icon để trang trí mọi dòng.

Labels phải có meaning.

Không:

```text
🔥 Important
✨ Insight
🧠 Deep
⚡ Energy
```

nếu không có semantics thực sự.

---

# 32. REMOVE REDUNDANCY

Sau khi redesign, chạy audit:

```text
DUPLICATE INFORMATION
```

Ví dụ:

```text
Summary:
"Bạn cần đánh giá lại."

Pattern:
"Bạn đang đánh giá lại."

Guidance:
"Hãy đánh giá lại."
```

Đây là cùng một thông tin lặp ba lần.

Phải phân biệt:

```text
Summary
= WHAT

Pattern
= WHY / HOW IT FORMS

Guidance
= WHAT TO DO
```

---

# 33. RESULT DENSITY AUDIT

Tạo một audit cho mỗi trang:

```text
Section
Purpose
User question answered
Priority
Default visible?
Expandable?
Technical?
Duplicated?
Necessary?
```

Nếu:

```text
Purpose = unclear
```

→ remove.

Nếu:

```text
User question = none
```

→ remove.

Nếu:

```text
Duplicated = yes
```

→ merge.

---

# 34. USER JOURNEY

Thiết kế flow:

```text
INPUT
↓
PROCESSING
↓
RESULT
↓
UNDERSTAND
↓
EXPLORE
↓
VERIFY
↓
APPLY
```

Không:

```text
INPUT
↓
DATA DUMP
```

---

# 35. RESULT PAGE MUST ANSWER 7 QUESTIONS

Mỗi module phải trả lời:

```text
1. Tôi đang nhìn kết quả gì?

2. Điều quan trọng nhất là gì?

3. Vì sao điều đó đáng chú ý?

4. Nó liên quan đến hoàn cảnh nào?

5. Nó có thể biểu hiện trong thực tế ra sao?

6. Tôi nên chú ý điều gì?

7. Tôi có thể tìm hiểu sâu hơn ở đâu?
```

Nếu UI không trả lời được 7 câu này:

```text
UX INCOMPLETE
```

---

# 36. TECHNICAL / EXPERT INFORMATION

Không xóa khỏi hệ thống.

Chỉ chuyển vị trí.

Architecture:

```text
USER RESULT
    ↓
WHY?
    ↓
TECHNICAL DETAIL
    ↓
SOURCE / EVIDENCE
```

Tức là:

> **Hide complexity, don't delete capability.**

---

# 37. COMPONENT ARCHITECTURE

Không tạo component theo database structure:

```text
<Signals />
<Relationships />
<Patterns />
<Claims />
<Rules />
```

Thay vào đó tạo component theo user needs:

```text
<ResultHero />
<KeyThemes />
<WhatItMeans />
<HowItMayManifest />
<WatchFor />
<Guidance />
<WhyThisResult />
<TechnicalDetails />
```

Component structure phải phản ánh:

```text
USER MENTAL MODEL
```

không phải:

```text
DATABASE SCHEMA
```

---

# 38. RESULT API ADAPTER

Frontend không tự suy luận.

Backend có thể trả:

```json
{
  "patterns": [],
  "interpretations": [],
  "guidance": [],
  "evidence": []
}
```

Frontend adapter chuyển thành:

```ts
UserFacingResult {
  headline;
  summary;
  keyThemes;
  manifestations;
  watchFor;
  guidance;
  why;
  technical;
}
```

Frontend không được tự:

```text
pattern → sentence
```

nếu đó là domain reasoning.

---

# 39. DELETE-FIRST REDESIGN

Khi audit UI hiện tại:

Không hỏi:

> “Có thể thêm gì?”

Hỏi:

> “Có thể bỏ gì mà người dùng vẫn hiểu kết quả?”

Thứ tự:

```text
REMOVE
↓
MERGE
↓
PRIORITIZE
↓
REWRITE
↓
RESTRUCTURE
↓
ONLY THEN ADD
```

Không được tiếp tục chồng UI mới lên UI cũ.

---

# 40. DEFINITION OF DONE

UI mới chỉ được coi là đạt khi:

### USER

Người mới có thể hiểu kết quả mà không cần biết:

- Knowledge Base
- Rule Engine
- Signal
- Relationship
- Pattern
- Evidence Graph.

### PRODUCT

Người dùng có thể đọc:

```text
WHAT
WHY
HOW
WHAT TO WATCH
WHAT TO DO
```

### ARCHITECTURE

Frontend:

```text
render-only
```

không chứa domain reasoning.

### INFORMATION

Không có:

```text
duplicate sections
technical dump
unnecessary metrics
metadata overload
```

### PROGRESSIVE DISCLOSURE

Thông tin chuyên môn vẫn tồn tại nhưng không chiếm screen space mặc định.

### MOBILE

Kết quả quan trọng phải hiểu được mà không cần scroll qua hàng chục cards.

### DESKTOP

Không biến thành dashboard dữ liệu.

---

# 41. FINAL UX TEST

Đưa một người chưa biết hệ thống vào trang kết quả.

Cho họ 30 giây.

Hỏi:

> “Kết quả chính của bạn là gì?”

Họ phải trả lời được.

Hỏi:

> “Tại sao hệ thống nói như vậy?”

Họ phải tìm được:

```text
Vì sao?
```

Hỏi:

> “Điều này có ý nghĩa thực tế gì?”

Họ phải tìm được:

```text
Biểu hiện / Điều đáng chú ý
```

Hỏi:

> “Tôi nên làm gì?”

Họ phải tìm được:

```text
Gợi ý thực tế
```

Nếu họ không trả lời được:

```text
REDESIGN
```

---

# 42. FINAL PRINCIPLE

MYSTICOS không cần cho người dùng nhìn thấy toàn bộ những gì hệ thống biết.

MYSTICOS cần cho người dùng nhìn thấy:

```text
ĐIỀU GÌ QUAN TRỌNG
↓
NÓ CÓ Ý NGHĨA GÌ
↓
VÌ SAO
↓
NÓ CÓ THỂ BIỂU HIỆN THẾ NÀO
↓
TÔI NÊN LÀM GÌ
```

Còn phía sau:

```text
Knowledge Base
Rules
Signals
Relationships
Reasoning
Patterns
Evidence
Provenance
```

tiếp tục chạy đầy đủ.

> **Ẩn độ phức tạp, không xóa độ sâu.**

> **Giảm lượng thông tin hiển thị, không giảm chất lượng suy luận.**

> **UI phục vụ người dùng, không phục vụ database.**

> **MYSTICOS phải trông đơn giản vì hệ thống phía sau đã đủ thông minh — không phải vì hệ thống phía sau đơn giản.**