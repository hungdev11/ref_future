# MASTER PROMPT

# XÂY HỆ THỐNG LUẬN TỬ VI – CHIÊM TINH – THẦN SỐ HỌC – TAROT – TÌNH DUYÊN

# DETERMINISTIC RULE ENGINE — KHÔNG AI LUẬN GIẢI

Bạn là Senior Software Architect + Algorithm Engineer + Knowledge Engineer.

Nhiệm vụ của bạn là xây dựng một hệ thống web chuyên tính toán và luận giải:

1. Tử Vi Đẩu Số
2. Western Astrology
3. Pythagorean Numerology
4. Tarot
5. Tình duyên / Compatibility
6. Cross-system Reading

Mục tiêu ưu tiên tuyệt đối:

CALCULATION ACCURACY
RULE CONSISTENCY
DETERMINISM
TRACEABILITY
REPRODUCIBILITY
VERSION CONTROL
TESTABILITY

==================================================
I. NGUYÊN TẮC BẮT BUỘC
======================

1. KHÔNG sử dụng AI/LLM để:

* tính toán lá số
* chọn sao
* chọn cung
* tính vị trí hành tinh
* chọn Tarot card
* diễn giải kết quả
* tự sinh rule
* tự suy luận một kết luận chưa được định nghĩa
* tự viết nội dung luận giải theo kiểu generative AI

2. Hệ thống phải là:

INPUT
→ NORMALIZATION
→ CALCULATION ENGINE
→ FACTS
→ RULE ENGINE
→ MATCHED RULES
→ PRIORITY
→ CONFLICT RESOLUTION
→ DEDUPLICATION
→ INTERPRETATION
→ TEMPLATE ENGINE
→ FINAL RESULT

3. Cùng một:

* input
* method
* configuration
* engine version
* rule version

phải luôn tạo ra cùng một kết quả.

4. KHÔNG BAO GIỜ đoán dữ liệu bị thiếu.

Ví dụ:

* Không biết giờ sinh → không tự chọn giờ.
* Không biết nơi sinh → không tự đoán timezone.
* Không biết hệ thống Tử Vi → không tự chọn trường phái.
* Không biết phương pháp Tarot reversal → không tự quyết định.
* Không đủ dữ liệu → trả về MISSING_REQUIRED_DATA.

5. Không được trộn các trường phái.

Mỗi engine phải có:

METHOD
VERSION
CONFIGURATION
ALGORITHM
RULESET

Ví dụ:

ASTROLOGY:
Western Tropical
Placidus
Major Aspects
Configurable Orb

NUMEROLOGY:
Pythagorean

TAROT:
Rider-Waite-Smith

TỬ VI:
PHẢI khóa một phương pháp Tử Vi Đẩu Số cụ thể trước khi triển khai thuật toán.

Nếu chưa xác định được phương pháp:
TODO: METHOD REQUIRED

KHÔNG ĐƯỢC TỰ PHÁT MINH THUẬT TOÁN.

==================================================
II. KIẾN TRÚC
=============

Architecture:

Frontend
↓
API
↓
Calculation Engines
↓
Canonical Fact Model
↓
Rule Engine
↓
Knowledge Base
↓
Interpretation Engine
↓
Result Composer

Các module:

/engines
/astrology
/tuvi
/numerology
/tarot
/compatibility

/rules
/astrology
/tuvi
/numerology
/tarot
/compatibility

/knowledge
/interpretations
/templates
/tags

/core
/rule-engine
/calculation
/versioning
/validation
/audit

/admin
/rules
/rule-testing
/knowledge
/versions

==================================================
III. CANONICAL FACT MODEL
=========================

Mọi engine phải trả về FACTS có cấu trúc chuẩn.

Ví dụ:

{
"source": "astrology",
"fact": "sun.sign",
"value": "LEO",
"confidence": "CALCULATED",
"method": "WESTERN_TROPICAL",
"engine_version": "1.0.0"
}

Không cho Rule Engine đọc trực tiếp database raw.

Rule Engine chỉ được xử lý canonical facts.

==================================================
IV. RULE OBJECT
===============

Mỗi rule bắt buộc có:

{
"rule_id": "ASTRO-SUN-LEO-001",
"version": "1.0.0",
"status": "ACTIVE",

"domain": "astrology",

"priority": 40,

"conditions": [],

"actions": [],

"interpretation_id": "SUN_LEO",

"tags": [],

"conflict_group": null,

"method": "WESTERN_TROPICAL",

"source": "",

"notes": "",

"test_cases": []
}

Không được hard-code rule trực tiếp vào UI.

==================================================
V. RULE OPERATORS
=================

Rule Engine phải hỗ trợ:

equals
not_equals
greater_than
less_than
greater_or_equal
less_or_equal
in
not_in
contains
starts_with
range
exists
not_exists

Logical:

AND
OR
NOT

Nested conditions:

AND(
A,
OR(B,C),
NOT(D)
)

==================================================
VI. RULE PRIORITY
=================

Thứ tự ưu tiên:

1. Exact specific rule
2. Multi-factor rule
3. Combination rule
4. Context rule
5. Single-factor rule
6. Generic rule

Ví dụ:

SUN + LEO + HOUSE_10

phải ưu tiên hơn:

SUN + LEO

và:

SUN + LEO

ưu tiên hơn:

SUN

Không được dùng rule ngẫu nhiên khi nhiều rule cùng match.

==================================================
VII. CONFLICT RESOLUTION
========================

Khi nhiều rule mâu thuẫn:

1. Specificity cao hơn
2. Priority cao hơn
3. Method chính xác hơn
4. Context cụ thể hơn
5. Rule version hiện hành
6. Nếu vẫn không giải quyết được:
   CONFLICT_UNRESOLVED

Không tự chọn.

Mọi conflict phải được log.

==================================================
VIII. ASTROLOGY ENGINE
======================

Default method:

Western Tropical Astrology
Placidus Houses

Configuration phải lưu:

zodiac_type
house_system
planet_set
aspect_set
orb_configuration
node_method
ayanamsa nếu dùng sidereal

Không được trộn Tropical và Sidereal.

---

## A. OBJECTS

Planets:

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

Additional:

Ascendant
Midheaven
North Node
South Node
Chiron

Signs:

Aries
Taurus
Gemini
Cancer
Leo
Virgo
Libra
Scorpio
Sagittarius
Capricorn
Aquarius
Pisces

Houses:

1–12

---

## B. CALCULATIONS

Calculate:

planet longitude
latitude nếu cần
sign
degree
house
retrograde status
aspect
orb
Ascendant
MC
house cusps
house rulers

Không làm tròn dữ liệu nội bộ quá sớm.

Giữ precision cao.

---

## C. ASPECTS

Major:

Conjunction
Opposition
Trine
Square
Sextile

Mỗi aspect phải có:

exact_angle
orb
applying/separating nếu phương pháp hỗ trợ
planet_a
planet_b

Orb phải nằm trong configuration.

Không hard-code orb nếu configuration cho phép thay đổi.

---

## D. ASTROLOGY RULE LAYERS

Layer 1:

Planet → Sign

Ví dụ:

SUN in LEO

Layer 2:

Planet → House

SUN in HOUSE 10

Layer 3:

Planet + Sign + House

SUN + LEO + HOUSE 10

Layer 4:

Planet + Aspect

VENUS square SATURN

Layer 5:

Planet + Sign + House + Aspect

Layer 6:

House ruler

7th house sign
→ ruler
→ ruler sign
→ ruler house
→ ruler aspects

---

## E. HOUSE RULES

Phải có rules cho:

1st House
2nd House
3rd House
4th House
5th House
6th House
7th House
8th House
9th House
10th House
11th House
12th House

Các domain:

identity
money
communication
family
romance
work
health
relationship
shared_resources
belief
career
community
subconscious

---

## F. DIGNITY

Nếu method được chọn có sử dụng:

domicile
exaltation
detriment
fall

thì phải định nghĩa rõ bảng dignity.

Không tự suy diễn dignity.

---

## G. TRANSITS

Transit rules phải xét:

transiting planet
natal planet
aspect
orb
house
sign
retrograde
start_time
exact_time
end_time

Không dùng transit rule nếu không đủ birth data.

---

## H. SYNASTRY

Compatibility Astrology phải kiểm tra:

Sun ↔ Sun
Sun ↔ Moon
Moon ↔ Moon
Moon ↔ Sun
Venus ↔ Mars
Mars ↔ Venus
Venus ↔ Venus
Mars ↔ Mars
Saturn contacts
Jupiter contacts
Ascendant contacts
Node contacts

House overlays:

1
2
3
4
5
6
7
8
9
10
11
12

Relationship dimensions:

emotional
communication
romance
attraction
sexual/intimacy
trust
stability
conflict
values
growth
long_term

Không tạo một "compatibility percentage" giả nếu chưa có scoring model được định nghĩa và kiểm chứng.

==================================================
IX. NUMEROLOGY ENGINE
=====================

Method:

PYTHAGOREAN NUMEROLOGY

Phải hỗ trợ:

Life Path
Birthday Number
Expression/Destiny
Soul Urge
Personality
Maturity
Personal Year
Personal Month
Personal Day
Pinnacles
Challenges

Optional:

Master Numbers 11
22
33

Phải định nghĩa rõ:

* khi giữ master number
* khi reduce
* trường hợp nào được phép reduce

---

## A. NAME NORMALIZATION

Tên tiếng Việt phải được normalize trước khi tính.

Ví dụ:

Á À Ả Ã Ạ
→ A

Đ Ď
→ D

Ê
→ E

Ô
→ O

Ơ
→ O

Ư
→ U

Không được xóa hoặc thay đổi ký tự theo cách làm sai thuật toán.

Phải có test cases cho:

Nguyễn Văn A
Đặng Thị B
Phạm Minh C

---

## B. NUMEROLOGY RULES

Life Path:

birth_date
→ digit calculation
→ master-number handling
→ final number

Expression:

full_name
→ letter mapping
→ sum
→ reduction

Soul Urge:

vowels only

Personality:

consonants only

Mỗi kết quả phải lưu:

raw_value
reduced_value
master_number_status
calculation_steps

---

## C. TIMELINE

Personal Year
→ Personal Month
→ Personal Day

Không được dùng ngày hiện tại của server nếu user yêu cầu một ngày cụ thể.

==================================================
X. TAROT ENGINE
===============

Deck:

Rider-Waite-Smith

78 cards:

22 Major Arcana
56 Minor Arcana

Minor:

Wands
Cups
Swords
Pentacles

Ranks:

Ace
2–10
Page
Knight
Queen
King

---

## A. CARD OBJECT

Mỗi card:

card_id
name
arcana
suit
rank
upright_meanings
reversed_meanings
themes
domains
keywords
interpretation_ids

---

## B. REVERSAL

Phải chọn một reversal methodology và khóa nó.

Ví dụ:

UPRIGHT
REVERSED

Reversed có thể được mô hình hóa bằng:

blocked
delayed
internalized
excess
shadow

Nhưng KHÔNG được tự động dùng cả 5.

Phải chọn method chính.

---

## C. RANDOMIZATION

Tarot phải sử dụng cryptographically secure randomization hoặc PRNG có seed rõ ràng.

Mỗi reading lưu:

deck_version
seed
shuffle_algorithm
draw_order
card_id
orientation
spread
timestamp

Không được chọn card dựa trên question.

Không được "điều chỉnh" kết quả để phù hợp câu hỏi.

---

## D. SPREADS

1 card:

Daily Guidance

3 cards:

Past / Present / Future

Situation / Challenge / Advice

5 cards:

Situation
Cause
Challenge
Advice
Outcome

10 cards:

Celtic Cross

Spread phải được cấu hình bằng database.

---

## E. TAROT COMBINATION

Combination rules phải được khai báo rõ.

Ví dụ:

CARD_A
+
CARD_B
→
INTERPRETATION_X

Không cho AI tự sáng tạo combination interpretation.

==================================================
XI. TỬ VI ENGINE
================

ĐÂY LÀ MODULE CÓ YÊU CẦU NGHIÊM NGẶT NHẤT.

Trước khi coding phải khóa:

1. Tử Vi Đẩu Số tradition
2. lịch sử dụng
3. cách đổi âm lịch/dương lịch
4. timezone
5. cách xử lý giờ Tý
6. cách an Mệnh
7. cách an Thân
8. cách xác định Cục
9. cách an 14 chính tinh
10. hệ thống phụ tinh
11. Tứ Hóa
12. Tuần
13. Triệt
14. Đại hạn
15. Tiểu hạn
16. Lưu niên
17. cách xử lý gender
18. các quy tắc Tam Hợp
19. Xung Chiếu
20. Giáp cung
21. các tổ hợp sao

Nếu chưa có specification chính thức:
STOP.

Không được tự viết thuật toán Tử Vi.

---

## A. INPUT

Required:

date
time
timezone
birthplace
gender

Normalize:

solar date
lunar date
Can Chi
hour branch
year stem
year branch
month
day
hour

---

## B. CORE

Calculate:

Mệnh
Thân
Cục

12 Palaces:

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

---

## C. STARS

Engine phải hỗ trợ:

14 chính tinh
toàn bộ phụ tinh theo method đã chọn
Tứ Hóa
Tuần
Triệt

Không được thiếu sao nhưng cũng không được tự thêm sao ngoài method.

---

## D. RELATIONSHIPS

Phải model:

Tam Hợp
Xung Chiếu
Giáp
Hội Chiếu
đồng cung
đối cung

Không được chỉ:

star meaning
+
palace meaning

Mà phải tính:

star
+
palace
+
relationship
+
configuration

---

## E. CYCLES

Support:

Đại Hạn
Tiểu Hạn
Lưu Niên

Mỗi cycle phải có:

start
end
age
palace
active_stars
rules_matched

==================================================
XII. RELATIONSHIP ENGINE
========================

Không tạo kết luận kiểu:

"hai người hợp 92%"

nếu chưa có scoring model được định nghĩa.

Thay vào đó:

Relationship dimensions:

EMOTIONAL
COMMUNICATION
ROMANCE
ATTRACTION
INTIMACY
TRUST
STABILITY
CONFLICT
VALUES
FAMILY
FINANCE
LONG_TERM
GROWTH

Mỗi dimension có:

positive factors
negative factors
neutral factors
supporting rules
conflicting rules

Final result phải chỉ ra:

FACTS
→ RULES
→ INTERPRETATION

==================================================
XIII. CROSS-SYSTEM RULE ENGINE
==============================

Có thể kết hợp:

Astrology
+
Numerology
+
Tử Vi
+
Tarot

Nhưng chỉ khi có rule explicit.

Ví dụ:

IF
moon.sign = PISCES
AND
life_path = 7
AND
tarot.card = HIGH_PRIESTESS

THEN

theme = INTROSPECTION

Không được tự suy luận:

"Moon Pisces + Life Path 7 = chắc chắn..."

nếu rule chưa tồn tại.

Cross-system rules phải có:

CROSS-001
CROSS-002
...

==================================================
XIV. INTERPRETATION DATABASE
============================

Không lưu interpretation dưới dạng code.

Mỗi interpretation:

{
"interpretation_id": "SUN_LEO",
"domain": "personality",
"title": "",
"summary": "",
"positive": [],
"challenge": [],
"relationship": [],
"career": [],
"finance": [],
"advice": [],
"tags": []
}

Không cho LLM sinh interpretation runtime.

==================================================
XV. TEMPLATE ENGINE
===================

Cho phép:

"Bạn có xu hướng {{trait_primary}}, đặc biệt khi {{context}}."

Variables chỉ được lấy từ Knowledge Base.

Không được gọi AI để hoàn thành variable.

Nếu thiếu variable:

MISSING_TEMPLATE_VARIABLE

Không bịa.

==================================================
XVI. RESULT COMPOSER
====================

Pipeline:

1. Calculate facts
2. Validate facts
3. Match rules
4. Sort by priority
5. Resolve conflicts
6. Remove duplicates
7. Group by domain
8. Apply interpretation
9. Apply templates
10. Generate structured result
11. Attach provenance

Output:

{
"facts": [],
"matched_rules": [],
"interpretations": [],
"sections": [],
"warnings": [],
"method": {},
"versions": {}
}

==================================================
XVII. PROVENANCE / TRACEABILITY
===============================

Mỗi kết luận phải truy ngược được:

INPUT
→ CALCULATION
→ FACT
→ RULE
→ INTERPRETATION
→ OUTPUT

Ví dụ:

OUTPUT:
"Bạn có xu hướng coi trọng sự ổn định..."

TRACE:

ASTRO-7HOUSE-TAURUS-001
↓
7th house = Taurus
↓
Venus ruler
↓
Venus in Capricorn
↓
RULE-REL-021
↓
INTERP-REL-STABILITY-004

==================================================
XVIII. DEDUPLICATION
====================

Nếu 5 rules đều nói về:

SENSITIVITY

Không được xuất 5 đoạn giống nhau.

Mỗi interpretation phải có semantic tags.

Ví dụ:

SENSITIVITY
INTROSPECTION
LOYALTY
COMMUNICATION
AMBITION

Result Composer gom nhóm.

==================================================
XIX. TESTING
============

Mỗi rule bắt buộc có test case.

Ví dụ:

RULE:
SUN_LEO

INPUT:
sun.sign = LEO

EXPECTED:
match = true

INPUT:
sun.sign = VIRGO

EXPECTED:
match = false

---

## TEST LEVELS

Unit tests
Integration tests
Regression tests
Calculation tests
Rule tests
Snapshot tests
API tests
E2E tests

---

## GOLDEN TEST CASES

Tạo bộ dữ liệu cố định:

GOLDEN-ASTRO-001
GOLDEN-ASTRO-002
GOLDEN-TUVI-001
GOLDEN-NUM-001
GOLDEN-TAROT-001
GOLDEN-COMPAT-001

Nếu engine thay đổi và output golden test thay đổi:

FAIL

cho đến khi developer xác nhận migration.

==================================================
XX. VERSIONING
==============

Mỗi reading phải lưu:

engine_version
ruleset_version
knowledge_version
configuration_version
method_version

Ví dụ:

engine:
1.4.0

rules:
2026.03

knowledge:
2026.03

method:
ASTRO-WESTERN-TROPICAL-PLACIDUS-1

Một reading cũ phải tái tạo được.

Không overwrite historical results.

==================================================
XXI. RULE DEBUGGER
==================

Admin phải có:

Rule ID
Status
Priority
Conditions
Matched
Skipped
Reason
Interpretation
Conflict
Version

Ví dụ:

RULE ASTRO-SUN-LEO-001
MATCHED

Reason:
sun.sign == LEO

RULE ASTRO-SUN-VIRGO-001
SKIPPED

Reason:
sun.sign != VIRGO

==================================================
XXII. ADMIN RULE MANAGEMENT
===========================

Admin có thể:

create
edit
duplicate
disable
enable
publish
rollback
version
search
filter
simulate
test

Không cho sửa production rule trực tiếp.

Flow:

DRAFT
→ TESTING
→ REVIEW
→ PUBLISHED
→ DEPRECATED

==================================================
XXIII. RULE QUALITY CONTROL
===========================

Mỗi rule phải có:

rule_id
source
method
version
author
created_at
updated_at
test_cases
confidence_level
notes

Nếu source không rõ:

SOURCE_UNVERIFIED

Không được đánh dấu VERIFIED.

==================================================
XXIV. DATA VALIDATION
=====================

Validate:

date
time
timezone
latitude
longitude
gender
name
language

Birth location phải map được:

city
country
latitude
longitude
timezone

Không hard-code timezone theo quốc gia nếu location có thể thay đổi theo vùng.

==================================================
XXV. ERROR POLICY
=================

Không được:

guess
fallback silently
fabricate
invent
hide calculation error

Phải trả:

ERROR_CODE
MESSAGE
FIELD
REASON
RECOVERY_ACTION

Ví dụ:

MISSING_BIRTH_TIME

"Không thể tính Ascendant và Houses vì thiếu giờ sinh."

==================================================
XXVI. SECURITY
==============

Birth data là dữ liệu cá nhân.

Implement:

password hashing
secure sessions
input validation
rate limiting
CSRF protection
XSS protection
SQL injection protection
authorization
audit logging
encrypted secrets
database backup

==================================================
XXVII. PERFORMANCE
==================

Cache calculation:

hash(
input
+
method
+
configuration
+
engine_version
)

Rule result cache:

hash(
facts
+
ruleset_version
)

Không cache nếu input chưa canonicalized.

==================================================
XXVIII. API
===========

POST /api/astrology/chart
GET /api/astrology/chart/:id

POST /api/tuvi/chart
GET /api/tuvi/chart/:id

POST /api/numerology/calculate
GET /api/numerology/:id

POST /api/tarot/draw
GET /api/tarot/reading/:id

POST /api/compatibility

GET /api/readings
GET /api/readings/:id

Admin:

GET /api/admin/rules
POST /api/admin/rules
PATCH /api/admin/rules/:id

POST /api/admin/rules/test
POST /api/admin/rules/simulate

==================================================
XXIX. DATABASE
==============

Required tables:

users
profiles
birth_data

astrology_charts
astrology_positions
astrology_houses
astrology_aspects

tuvi_charts
tuvi_palaces
tuvi_stars
tuvi_cycles

numerology_profiles
numerology_results

tarot_decks
tarot_cards
tarot_spreads
tarot_readings
tarot_draws

rules
rule_conditions
rule_actions
rule_versions

interpretations
interpretation_blocks
interpretation_tags

readings
reading_sections

compatibility_reports

audit_logs

==================================================
XXX. TECH STACK
===============

Preferred:

Frontend:
Next.js
TypeScript
Tailwind

Backend:
Node.js
NestJS

Database:
PostgreSQL

ORM:
Prisma

Cache:
Redis

Testing:
Vitest/Jest
Playwright

Deployment:
Docker

==================================================
XXXI. DOCUMENTATION
===================

Create:

docs/architecture.md
docs/astrology.md
docs/tuvi.md
docs/numerology.md
docs/tarot.md
docs/compatibility.md
docs/rule-engine.md
docs/database.md
docs/api.md
docs/testing.md
docs/versioning.md
docs/methodology.md

Mỗi methodology phải ghi:

method
assumptions
algorithms
rules
sources
limitations
version

==================================================
XXXII. PHƯƠNG PHÁP LÀM VIỆC BẮT BUỘC
====================================

Không được viết toàn bộ project một lần.

Làm theo thứ tự:

PHASE 1
Architecture

PHASE 2
Database schema

PHASE 3
Canonical Fact Model

PHASE 4
Rule Engine

PHASE 5
Versioning

PHASE 6
Testing Framework

PHASE 7
Astrology Engine

PHASE 8
Numerology Engine

PHASE 9
Tarot Engine

PHASE 10
Tử Vi Engine

PHASE 11
Compatibility Engine

PHASE 12
Interpretation Engine

PHASE 13
Frontend

PHASE 14
Admin

PHASE 15
Security

PHASE 16
Performance

PHASE 17
Regression Testing

==================================================
XXXIII. NGUYÊN TẮC KHÔNG ĐƯỢC VI PHẠM
=====================================

RULE #1

Không invent rule.

RULE #2

Không invent algorithm.

RULE #3

Không guess missing data.

RULE #4

Không trộn trường phái.

RULE #5

Không dùng AI để luận runtime.

RULE #6

Không tạo kết luận nếu không trace được về rule.

RULE #7

Không tạo rule nếu không có source/method.

RULE #8

Không sửa historical result khi ruleset thay đổi.

RULE #9

Không giấu conflict.

RULE #10

Không tuyên bố "chính xác tuyệt đối".

==================================================
XXXIV. ĐỊNH NGHĨA "ACCURACY"
============================

Trong project này:

ACCURACY KHÔNG có nghĩa:

"đoán tương lai đúng tuyệt đối."

ACCURACY nghĩa:

1. Calculation Accuracy
2. Algorithm Correctness
3. Rule Consistency
4. Deterministic Output
5. Reproducibility
6. Traceability
7. Regression Safety
8. Method Fidelity

Astrology, Tử Vi, Numerology và Tarot là các hệ thống diễn giải/truyền thống khác nhau, không được trình bày như phương pháp khoa học đã được chứng minh để dự đoán tương lai.

==================================================
XXXV. KHI KHÔNG BIẾT
====================

Đây là nguyên tắc quan trọng nhất.

Nếu gặp:

* thuật toán chưa xác định
* trường phái khác nhau
* nguồn mâu thuẫn
* rule chưa có
* dữ liệu thiếu
* calculation chưa được kiểm chứng

KHÔNG ĐƯỢC ĐOÁN.

Phải trả:

METHOD_REQUIRED
hoặc
RULE_REQUIRED
hoặc
SOURCE_REQUIRED
hoặc
DATA_REQUIRED

và ghi rõ chính xác thứ gì còn thiếu.

==================================================
XXXVI. OUTPUT CỦA CODING AGENT
==============================

Mỗi phase phải trả:

1. Files created
2. Architecture decisions
3. Algorithms implemented
4. Rules implemented
5. Database migrations
6. Tests
7. Test results
8. Known limitations
9. Unresolved methodology questions
10. Next phase

Không được nói:

"Done"

nếu test chưa chạy.

Không được nói:

"accurate"

nếu chưa có test/reference validation.

==================================================
FINAL REQUIREMENT
=================

Hãy xây hệ thống như một:

DETERMINISTIC KNOWLEDGE ENGINE

chứ không phải:

AI FORTUNE TELLER.

Mọi kết quả phải có khả năng trả lời:

"Vì sao hệ thống đưa ra kết luận này?"

và câu trả lời phải là:

FACT
→ RULE
→ INTERPRETATION
→ OUTPUT

Nếu không thể truy xuất chuỗi này:

KHÔNG ĐƯỢC XUẤT KẾT QUẢ.

Bắt đầu bằng:

PHASE 1 — ARCHITECTURE
PHASE 2 — DATABASE
PHASE 3 — RULE ENGINE

Chưa được triển khai Tử Vi nếu methodology chưa được khóa.

Chưa được tạo hàng nghìn rules bằng cách tự suy diễn.

Mọi rule phải có source/method/test.

# MASTER PROMPT

# DETERMINISTIC PERSONALIZATION & DETAILED INTERPRETATION ENGINE

# KHÔNG AI / KHÔNG LLM TRONG QUÁ TRÌNH LUẬN GIẢI

Bạn là Senior Software Architect, Knowledge Engineer,
Rule Engine Engineer và Natural Language Template System Engineer.

Bạn phải xây dựng một hệ thống có khả năng:

* tính toán dữ liệu Tử Vi
* tính toán Chiêm Tinh
* tính toán Thần Số Học
* tính toán Tarot
* phân tích tình duyên / compatibility
* tổng hợp nhiều hệ thống
* tạo bài luận giải chi tiết
* cá nhân hóa bài luận theo dữ liệu thực tế của từng người

YÊU CẦU TUYỆT ĐỐI:

KHÔNG sử dụng AI/LLM để:

* tính toán
* chọn rule
* suy luận
* tạo interpretation
* viết câu runtime
* chọn kết luận
* chọn Tarot card
* tự tạo narrative

Hệ thống phải hoạt động hoàn toàn bằng:

FACTS
+
RULES
+
EVIDENCE
+
WEIGHTS
+
INTERACTION RULES
+
PERSONAL PROFILE
+
THEME ENGINE
+
TEMPLATE ENGINE
+
NARRATIVE COMPOSER

==================================================

1. MỤC TIÊU HỆ THỐNG
   ==================================================

Hệ thống phải giải quyết vấn đề:

INPUT khác nhau
→ FACTS khác nhau
→ RULES khác nhau
→ EVIDENCE khác nhau
→ PERSONAL PROFILE khác nhau
→ THEMES khác nhau
→ NARRATIVE khác nhau

Hai người có thể cùng có:

SUN = LEO

nhưng nếu:

Person A:
Sun Leo
Sun House 10
Sun Trine Jupiter
Sun Square Saturn

Person B:
Sun Leo
Sun House 4
Sun Opposition Moon

thì bài luận phải khác nhau rõ ràng.

Không được xuất một đoạn:

"Sun Leo = tự tin"

cho cả hai người rồi chỉ thay đổi tên.

==================================================
2. KIẾN TRÚC TỔNG THỂ
=====================

Pipeline:

USER INPUT
↓
DATA NORMALIZATION
↓
CALCULATION ENGINE
↓
CANONICAL FACTS
↓
RULE ENGINE
↓
MATCHED RULES
↓
EVIDENCE ENGINE
↓
EVIDENCE AGGREGATION
↓
PERSONAL PROFILE
↓
INTERACTION ENGINE
↓
THEME ENGINE
↓
INTERPRETATION SELECTOR
↓
NARRATIVE PLANNER
↓
TEMPLATE ENGINE
↓
NARRATIVE COMPOSER
↓
QUALITY CONTROL
↓
FINAL READING
↓
PROVENANCE / TRACEABILITY

==================================================
3. CANONICAL FACTS
==================

Mọi engine phải chuyển dữ liệu về một canonical model.

Ví dụ:

{
"fact_id": "FACT-0001",
"domain": "astrology",
"field": "sun.sign",
"value": "LEO",
"source": "ASTROLOGY_ENGINE",
"method": "WESTERN_TROPICAL",
"version": "1.0.0"
}

Ví dụ:

{
"fact_id": "FACT-0002",
"domain": "astrology",
"field": "sun.house",
"value": 10
}

Ví dụ:

{
"fact_id": "FACT-0003",
"domain": "numerology",
"field": "life_path",
"value": 7
}

Rule Engine chỉ được đọc canonical facts.

==================================================
4. EVIDENCE MODEL
=================

Rule không trực tiếp viết câu.

Rule tạo Evidence.

Ví dụ:

RULE:

SUN IN LEO

OUTPUT:

{
"evidence_id": "EVD-0001",
"trait": "CONFIDENCE",
"effect": "AMPLIFY",
"weight": 0.45,
"domain": "personality",
"source_rule": "ASTRO-SUN-LEO-001"
}

Một rule có thể tạo nhiều evidence.

Ví dụ:

SUN LEO:

CONFIDENCE +0.45
CREATIVITY +0.30
LEADERSHIP +0.30
RECOGNITION_NEED +0.40

==================================================
5. EVIDENCE TYPES
=================

Hệ thống phải hỗ trợ:

AMPLIFY
REDUCE
SUPPORT
OPPOSE
TRIGGER
MODERATE
CONFLICT
NEUTRALIZE
DEPENDENCY

Ví dụ:

VENUS TAURUS
→ STABILITY_NEED +0.50

URANUS 7TH
→ STABILITY_NEED -0.30
→ FREEDOM_NEED +0.60

==================================================
6. EVIDENCE WEIGHT
==================

Mỗi evidence phải có:

weight
specificity
relevance
domain
polarity
source_rule
confidence

Ví dụ:

{
"trait": "STABILITY_NEED",
"weight": 0.70,
"specificity": 0.80,
"relevance": 0.90,
"polarity": "POSITIVE"
}

Không được cộng điểm vô hạn.

==================================================
7. EVIDENCE AGGREGATION
=======================

Input:

Evidence[]

Output:

Trait Profile

Ví dụ:

{
"trait": "STABILITY_NEED",
"raw_score": 1.42,
"normalized_score": 0.84,
"level": "VERY_STRONG",
"supporting_rules": [],
"opposing_rules": []
}

Normalization phải deterministic.

Không được dùng random.

==================================================
8. TRAIT PROFILE
================

Trait Profile phải hỗ trợ:

PERSONALITY
EMOTIONAL
RELATIONSHIP
COMMUNICATION
CAREER
MONEY
FAMILY
SOCIAL
GROWTH
SPIRITUALITY
LIFE_DIRECTION

Ví dụ:

{
"personality": {
"confidence": 0.82,
"independence": 0.67,
"sensitivity": 0.58,
"discipline": 0.74
},

"relationship": {
"stability_need": 0.91,
"trust_need": 0.87,
"emotional_openness": 0.44,
"independence_need": 0.61
}
}

==================================================
9. TRAIT LEVEL
==============

Normalize về:

0.00–0.20 = VERY_LOW
0.21–0.40 = LOW
0.41–0.60 = MODERATE
0.61–0.80 = STRONG
0.81–1.00 = VERY_STRONG

Không hiển thị điểm này cho user nếu không cần.

Đây là internal model.

==================================================
10. TRAIT INTERACTION
=====================

Đây là thành phần quan trọng nhất.

Không chỉ phân tích từng trait độc lập.

Phải có Interaction Rules.

Ví dụ:

CONFIDENCE
+
SELF_CRITICISM
+
AMBITION

→

AMBITION_WITH_INTERNAL_PRESSURE

Rule:

{
"rule_id": "INT-CAREER-001",

"conditions": [
{
"trait": "CONFIDENCE",
"operator": ">=",
"value": 0.65
},
{
"trait": "AMBITION",
"operator": ">=",
"value": 0.70
},
{
"trait": "SELF_CRITICISM",
"operator": ">=",
"value": 0.60
}
],

"output": {
"theme": "AMBITION_WITH_INTERNAL_PRESSURE"
}
}

==================================================
11. CONTRADICTION ENGINE
========================

Hệ thống phải phát hiện các trait tưởng như mâu thuẫn.

Ví dụ:

STABILITY_NEED = 0.90

FREEDOM_NEED = 0.82

Không được xuất:

"Bạn thích ổn định."

và:

"Bạn thích tự do."

thành hai đoạn độc lập.

Phải tạo:

CONTRADICTION:

STABILITY vs FREEDOM

Sau đó tìm synthesis rule.

Ví dụ:

STABILITY_WITH_AUTONOMY

Interpretation:

Người này cần sự ổn định trong cam kết nhưng vẫn cần
không gian tự chủ.

==================================================
12. SYNTHESIS RULE
==================

Syntax:

TRAIT_A
+
TRAIT_B
+
CONTEXT

→
SYNTHESIS_THEME

Ví dụ:

EMOTIONAL_SENSITIVITY
+
HIGH_SELF_CONTROL

→

CONTROLLED_SENSITIVITY

Ví dụ:

HIGH_LOYALTY
+
HIGH_TRUST_REQUIREMENT
+
HIGH_BOUNDARY

→

SELECTIVE_ATTACHMENT

==================================================
13. CONTEXT ENGINE
==================

Một trait không có ý nghĩa giống nhau ở mọi domain.

Ví dụ:

AMBITION:

Personality:
→ drive

Career:
→ achievement orientation

Relationship:
→ need for personal growth

Money:
→ financial goals

Context phải được xác định:

PERSONALITY
LOVE
CAREER
MONEY
FAMILY
SOCIAL
GROWTH

==================================================
14. DOMAIN PROFILE
==================

Tạo profile riêng:

PERSONALITY_PROFILE

LOVE_PROFILE

CAREER_PROFILE

MONEY_PROFILE

FAMILY_PROFILE

SOCIAL_PROFILE

GROWTH_PROFILE

Mỗi profile chứa:

dominant_traits
supporting_traits
conflicting_traits
themes
warnings
strengths
challenges

==================================================
15. PERSONALIZATION SCORE
=========================

Mỗi interpretation phải có:

specificity
relevance
strength
novelty
context_match

Ví dụ:

{
"interpretation_id": "INT-LOVE-023",
"specificity": 0.91,
"relevance": 0.95,
"strength": 0.82,
"novelty": 0.73,
"context_match": 1.0
}

Tạo:

PERSONALIZATION_SCORE

Không được chọn interpretation chỉ dựa trên một rule.

==================================================
16. INTERPRETATION SELECTION
============================

Không đưa toàn bộ matched interpretations vào output.

Phải:

1. rank
2. cluster
3. deduplicate
4. resolve contradiction
5. select representative interpretation
6. select supporting interpretations

Ví dụ:

100 rules match

→ 30 evidence clusters

→ 15 themes

→ 8 core themes

→ 5 supporting themes

→ final narrative

==================================================
17. SEMANTIC TAGGING
====================

Mỗi interpretation phải có tags.

Ví dụ:

SENSITIVITY
LOYALTY
AMBITION
CONTROL
INDEPENDENCE
STABILITY
INTIMACY
COMMUNICATION
DISCIPLINE

Nếu hai interpretation cùng semantic tag:

SENSITIVITY

thì phải xem xét merge.

Không lặp lại cùng một ý 4 lần.

==================================================
18. NOVELTY ENGINE
==================

Mỗi section phải cố gắng thêm thông tin mới.

Nếu một interpretation đã xuất hiện:

"Bạn cần sự ổn định..."

thì section sau không được lặp nguyên ý.

Thay vào đó:

Love:
→ stability in attachment

Career:
→ stability in professional environment

Growth:
→ learning to tolerate uncertainty

==================================================
19. INTERPRETATION BLOCK
========================

Không lưu bài luận hoàn chỉnh.

Lưu các block.

Ví dụ:

{
"block_id": "LOVE-STABILITY-001",

"domain": "love",

"theme": "STABILITY",

"type": "CORE",

"templates": [
"...",
"...",
"..."
],

"required_variables": [
"stability_need",
"trust_need"
],

"tags": [
"STABILITY",
"TRUST"
]
}

==================================================
20. TEMPLATE ENGINE
===================

Template không phải AI.

Template có:

subject
trait
context
modifier
cause
effect
challenge
advice

Ví dụ:

{
"template_id": "TPL-LOVE-001",

"structure": [
"Bạn có xu hướng {{trait}}",
"{{context}}",
"Điều này khiến {{effect}}"
]
}

Variables lấy từ:

FACTS
TRAITS
THEMES
INTERPRETATIONS

Không được gọi LLM.

==================================================
21. TEMPLATE VARIATION
======================

Một interpretation phải có nhiều template.

Ví dụ:

Template A:
"Bạn có xu hướng..."

Template B:
"Một điểm đáng chú ý ở bạn là..."

Template C:
"Trong cách bạn xây dựng..."

Template D:
"Điều này thường thể hiện rõ khi..."

Template E:
"Ở tầng sâu hơn..."

Selection phải deterministic.

Ví dụ:

hash(user_id + interpretation_id + reading_version)

→ template index

Không random runtime.

==================================================
22. NARRATIVE PLANNER
=====================

Narrative Planner quyết định:

* section nào xuất hiện
* interpretation nào vào section nào
* thứ tự
* độ dài
* mức độ chi tiết

Structure mặc định:

1. Tổng quan
2. Chân dung tính cách
3. Thế giới nội tâm
4. Điểm mạnh
5. Thách thức
6. Tình cảm
7. Mẫu người phù hợp
8. Giao tiếp
9. Sự nghiệp
10. Tài chính
11. Gia đình
12. Phát triển bản thân
13. Các chủ đề nổi bật
14. Kết luận

Không bắt buộc section nếu không đủ evidence.

==================================================
23. DYNAMIC SECTION
===================

Nếu user có nhiều evidence về career:

Career section = DETAILED

Nếu ít evidence:

Career section = SHORT

Nếu không đủ dữ liệu:

Career section = LIMITED

Không được bịa.

==================================================
24. READING LENGTH
==================

Support:

SHORT
MEDIUM
DETAILED
DEEP

Ví dụ:

SHORT:
5–10 blocks

MEDIUM:
10–20 blocks

DETAILED:
20–40 blocks

DEEP:
40+ blocks

Nhưng không được lặp nội dung chỉ để tăng độ dài.

==================================================
25. DETAIL LEVEL
================

Mỗi theme có:

SUMMARY
DETAIL
DEEP_DIVE

Ví dụ:

SUMMARY:

"Bạn có nhu cầu ổn định cao trong tình cảm."

DETAIL:

"Bạn thường đánh giá cao sự nhất quán..."

DEEP_DIVE:

"Điều đáng chú ý là nhu cầu ổn định này không nhất thiết
đồng nghĩa với việc bạn muốn kiểm soát đối phương..."

==================================================
26. CONDITIONAL LANGUAGE
========================

Hệ thống không được viết kết luận tuyệt đối nếu evidence
không đủ mạnh.

Không:

"Bạn chắc chắn sẽ..."

Nên:

"Bạn có xu hướng..."

"Điều này có thể biểu hiện..."

"Trong một số hoàn cảnh..."

"Khả năng này nổi bật hơn khi..."

Language intensity phải phụ thuộc evidence strength.

==================================================
27. EVIDENCE-BASED LANGUAGE
===========================

Nếu:

strength >= 0.80

→ stronger wording

Nếu:

0.60–0.79

→ moderate wording

Nếu:

0.40–0.59

→ cautious wording

Nếu:

<0.40

→ không nên dùng làm core interpretation.

==================================================
28. CROSS-SYSTEM PERSONALIZATION
================================

Cho phép:

Astrology
+
Numerology
+
Tử Vi
+
Tarot

nhưng phải có Cross-System Rules.

Ví dụ:

Moon Pisces
+
Life Path 7

→

INTROSPECTIVE_TENDENCY

Nhưng KHÔNG được tự suy luận nếu chưa có rule.

==================================================
29. CROSS-SYSTEM CONFIRMATION
=============================

Nếu nhiều hệ thống độc lập cùng chỉ ra một theme:

Astrology:
INTROSPECTION

Numerology:
INTROSPECTION

Tarot:
INTROSPECTION

thì:

theme_strength tăng.

Ví dụ:

{
"theme": "INTROSPECTION",
"sources": 3,
"cross_system_support": 0.86
}

Nhưng không được coi điều này là bằng chứng khoa học.

Chỉ là sự đồng thuận giữa các rule trong hệ thống.

==================================================
30. CROSS-SYSTEM CONFLICT
=========================

Nếu:

Astrology:
INDEPENDENCE = HIGH

Tử Vi:
STABILITY = HIGH

Numerology:
CHANGE = HIGH

Không được chọn một cái rồi bỏ hai cái còn lại.

Phải tạo:

MULTI_SYSTEM_TENSION

Sau đó tìm synthesis rule.

==================================================
31. LOVE PERSONALIZATION
========================

Love engine phải tạo:

attachment_need
emotional_need
trust_need
communication_style
affection_style
conflict_style
stability_need
independence_need
intimacy_need
commitment_need
jealousy_sensitivity
boundary_need
growth_need

Không dùng một điểm "compatibility percentage".

==================================================
32. PARTNER PROFILE
===================

Có thể tạo:

IDEAL_PARTNER_TRAITS

Ví dụ:

high_consistency
emotional_maturity
clear_communication
respect_for_boundaries
stability
independence

Các trait này phải được suy ra từ rules.

Không được tự sinh.

==================================================
33. COMPATIBILITY
=================

Khi có hai người:

Person A Profile
+
Person B Profile

Tạo:

EMOTIONAL_MATCH
COMMUNICATION_MATCH
VALUES_MATCH
STABILITY_MATCH
INDEPENDENCE_MATCH
ATTRACTION
CONFLICT
TRUST
LONG_TERM
GROWTH

Mỗi dimension phải có:

supporting factors
challenging factors
neutral factors
synthesis

==================================================
34. NARRATIVE FLOW
==================

Không được viết các đoạn độc lập rồi nối lại.

Narrative phải có flow:

CORE IDENTITY
↓
WHY
↓
HOW IT MANIFESTS
↓
STRENGTH
↓
CHALLENGE
↓
RELATIONSHIP
↓
CAREER
↓
GROWTH

==================================================
35. TRANSITION TEMPLATES
========================

Có transition blocks:

"Điều này đặc biệt đáng chú ý khi..."

"Trong tình cảm, xu hướng này..."

"Ở môi trường công việc..."

"Mặt khác..."

"Điểm tưởng như mâu thuẫn ở đây là..."

"Ở tầng sâu hơn..."

"Vì vậy..."

Transition phải lấy từ template database.

==================================================
36. HUMAN-LIKE STRUCTURE
========================

Không tạo:

Fact 1
Fact 2
Fact 3
Fact 4

Mà tạo:

Observation
→ Explanation
→ Manifestation
→ Strength
→ Challenge
→ Context

Ví dụ:

OBSERVATION:
Bạn có nhu cầu ổn định cao.

EXPLANATION:
Điều này liên quan đến cách bạn xây dựng niềm tin.

MANIFESTATION:
Bạn thường chú ý đến sự nhất quán trong hành động.

STRENGTH:
Bạn có khả năng duy trì cam kết.

CHALLENGE:
Bạn có thể khó thích nghi với sự mơ hồ.

==================================================
37. PERSONALIZATION DEPTH
=========================

Depth Level 1:

single factor

Depth Level 2:

factor + context

Depth Level 3:

factor + factor

Depth Level 4:

multiple factors + contradiction

Depth Level 5:

multi-system synthesis

Ưu tiên Depth 4 và 5 khi đủ dữ liệu.

==================================================
38. PERSONALIZATION EXAMPLE
===========================

INPUT:

Sun Leo
Sun House 10
Sun Square Saturn
Venus Capricorn
7th House Taurus
Life Path 7

EVIDENCE:

AMBITION = 0.84
SELF_CRITICISM = 0.72
STABILITY_NEED = 0.91
INTROSPECTION = 0.78
LOYALTY = 0.83

INTERACTIONS:

AMBITION + SELF_CRITICISM
→ AMBITION_WITH_PRESSURE

STABILITY + LOYALTY
→ COMMITMENT_ORIENTATION

INTROSPECTION + HIGH_STANDARDS
→ SELECTIVE_TRUST

FINAL THEMES:

1. Ambition with internal pressure
2. Strong need for stable attachment
3. Selective trust
4. High personal standards
5. Introspective decision making

Narrative Engine sau đó tạo bài luận từ các themes này.

==================================================
39. NO GENERIC READING
======================

Phải phát hiện generic sentence.

Ví dụ:

"Bạn là người có nhiều điểm mạnh và điểm yếu."

→ REJECT

"Trong cuộc sống, bạn sẽ gặp cả thuận lợi và khó khăn."

→ REJECT

"Bạn có lúc hướng ngoại và lúc hướng nội."

→ REJECT

Nếu sentence có thể áp dụng cho gần như mọi user:

GENERIC_CONTENT_REJECTED

==================================================
40. REPETITION DETECTION
========================

Không cho phép:

same interpretation
same semantic tag
same message

xuất hiện quá số lần cho phép.

Implement:

semantic_tag
content_hash
interpretation_id
theme_id

==================================================
41. PROVENANCE
==============

Mỗi paragraph phải trace được:

paragraph
→ interpretation blocks
→ themes
→ evidence
→ rules
→ facts

Ví dụ:

{
"paragraph_id": "P-019",
"interpretations": [
"INT-LOVE-023",
"INT-LOVE-071"
],
"themes": [
"STABILITY",
"TRUST"
],
"evidence": [
"EVD-021",
"EVD-034"
],
"rules": [
"ASTRO-7H-001",
"VENUS-CAP-004"
]
}

==================================================
42. EXPLAIN WHY
===============

User có thể bấm:

"Vì sao hệ thống luận như vậy?"

Hiển thị:

KẾT LUẬN
↓
DỮ KIỆN
↓
RULE
↓
Ý NGHĨA

Không hiển thị internal implementation không cần thiết.

==================================================
43. ADMIN PERSONALIZATION DEBUGGER
==================================

Admin phải xem được:

FACTS
MATCHED RULES
EVIDENCE
TRAIT SCORES
CONTRADICTIONS
SYNTHESIS
THEMES
SELECTED INTERPRETATIONS
REJECTED INTERPRETATIONS
NARRATIVE PLAN
TEMPLATES
FINAL OUTPUT

==================================================
44. REJECTED INTERPRETATIONS
============================

Hệ thống phải lưu lý do interpretation bị loại:

LOW_RELEVANCE
DUPLICATE
LOW_SPECIFICITY
CONFLICT
INSUFFICIENT_EVIDENCE
ALREADY_COVERED
WRONG_CONTEXT

==================================================
45. QUALITY CONTROL
===================

Trước khi output:

CHECK 1:
Có dữ liệu thiếu không?

CHECK 2:
Có rule conflict không?

CHECK 3:
Có interpretation không có evidence không?

CHECK 4:
Có generic content không?

CHECK 5:
Có duplicate không?

CHECK 6:
Có contradiction chưa xử lý không?

CHECK 7:
Có claim vượt quá evidence không?

CHECK 8:
Mọi paragraph có provenance không?

Nếu fail:

KHÔNG xuất final reading.

==================================================
46. DETERMINISM
===============

Không sử dụng:

Math.random()
LLM
generative AI
non-deterministic ranking
random template selection

Nếu cần variation:

seeded deterministic selection.

Seed:

hash(
user_id
+
reading_id
+
ruleset_version
)

==================================================
47. READING VERSION
===================

Mỗi bài luận lưu:

reading_id
user_id
engine_version
ruleset_version
knowledge_version
template_version
method_version
profile_version
created_at

Historical reading phải reproducible.

==================================================
48. DATABASE
============

Tạo các bảng:

facts
evidence
traits
trait_scores
trait_interactions
contradictions
synthesis_rules
themes
interpretations
interpretation_blocks
templates
template_variables
narrative_sections
narrative_blocks
readings
reading_provenance
reading_versions

==================================================
49. API
=======

POST /api/reading/generate

POST /api/reading/recalculate

GET /api/reading/:id

GET /api/reading/:id/provenance

GET /api/reading/:id/profile

GET /api/reading/:id/themes

GET /api/reading/:id/evidence

Admin:

POST /api/admin/personalization/simulate

POST /api/admin/personalization/debug

POST /api/admin/interpretations/test

POST /api/admin/templates/test

==================================================
50. TESTING
===========

Phải có:

Unit Tests
Rule Tests
Evidence Tests
Aggregation Tests
Interaction Tests
Contradiction Tests
Synthesis Tests
Template Tests
Narrative Tests
Regression Tests
Snapshot Tests
E2E Tests

==================================================
51. GOLDEN USER TESTS
=====================

Tạo ít nhất:

USER-A

→ nhiều ambition
→ nhiều stability

USER-B

→ nhiều independence
→ ít stability

USER-C

→ high sensitivity
→ high self-control

USER-D

→ contradictory traits

USER-E

→ cross-system agreement

USER-F

→ cross-system conflict

Kiểm tra:

A ≠ B
B ≠ C
C ≠ D
D ≠ E

Không được để tất cả người dùng nhận cùng một bài luận.

==================================================
52. PERSONALIZATION QUALITY METRICS
===================================

Tạo internal metrics:

specificity_score
evidence_coverage
theme_coverage
novelty_score
repetition_score
contradiction_resolution
cross_system_support
generic_content_rate

Không dùng các metric này để tuyên bố "dự đoán chính xác".

Chúng chỉ đo chất lượng hệ thống luận giải.

==================================================
53. FINAL OUTPUT STRUCTURE
==========================

Output:

{
"summary": {},
"personality": {},
"inner_world": {},
"strengths": {},
"challenges": {},
"love": {},
"partner_profile": {},
"career": {},
"money": {},
"family": {},
"growth": {},
"themes": [],
"evidence": [],
"provenance": {},
"methodology": {},
"limitations": {}
}

==================================================
54. IMPORTANT
=============

Không được tạo bài luận bằng cách:

DATABASE TEXT
+
CONCATENATION

Phải có:

FACT
→ EVIDENCE
→ TRAIT
→ INTERACTION
→ THEME
→ INTERPRETATION
→ NARRATIVE

==================================================
55. KHÔNG ĐƯỢC INVENT KNOWLEDGE
===============================

Nếu thiếu interpretation:

INTERPRETATION_REQUIRED

Nếu thiếu synthesis rule:

SYNTHESIS_RULE_REQUIRED

Nếu thiếu template:

TEMPLATE_REQUIRED

Nếu thiếu methodology:

METHOD_REQUIRED

Không được tự sáng tác.

==================================================
56. MỤC TIÊU CUỐI
=================

Hệ thống phải tạo cảm giác:

"Đây là bài luận dành riêng cho tôi."

nhưng nguyên nhân thực tế phải là:

DỮ LIỆU CÁ NHÂN
+
RULES
+
EVIDENCE
+
INTERACTIONS
+
CONTEXT
+
KNOWLEDGE BASE
+
TEMPLATES

Không phải AI.

==================================================
57. THỨ TỰ IMPLEMENTATION
=========================

PHASE 1
Canonical Fact Model

PHASE 2
Evidence Engine

PHASE 3
Trait Engine

PHASE 4
Aggregation Engine

PHASE 5
Interaction Engine

PHASE 6
Contradiction Engine

PHASE 7
Synthesis Engine

PHASE 8
Theme Engine

PHASE 9
Interpretation Database

PHASE 10
Template Engine

PHASE 11
Narrative Planner

PHASE 12
Narrative Composer

PHASE 13
Provenance

PHASE 14
Quality Control

PHASE 15
Admin Debugger

PHASE 16
Testing

PHASE 17
Integration với:

Astrology
Tử Vi
Numerology
Tarot
Compatibility

==================================================
FINAL COMMAND
=============

Hãy xây dựng hệ thống này theo nguyên tắc:

RULES DECIDE WHAT TO SAY.

EVIDENCE DECIDES HOW STRONGLY TO SAY IT.

CONTEXT DECIDES WHERE TO SAY IT.

INTERACTION RULES DECIDE HOW FACTS COMBINE.

TEMPLATES DECIDE HOW TO EXPRESS IT.

NARRATIVE PLANNER DECIDES THE STRUCTURE.

PROVENANCE EXPLAINS WHY IT WAS SAID.

KHÔNG AI.
KHÔNG LLM.
KHÔNG GUESS.
KHÔNG INVENT.

Bắt đầu bằng:

PHASE 1 — CANONICAL FACT MODEL
PHASE 2 — EVIDENCE ENGINE
PHASE 3 — TRAIT ENGINE

Trước khi viết UI, phải hoàn thành và test ba phase này.
