# MASTER PROMPT

## THIẾT KẾ CHIÊM TINH TÂY PHƯƠNG ENGINE 100% DETERMINISTIC

### Từ Input → Thiên Văn → Natal Chart → Houses → Aspects → Transits → Rules → Interpretation → Evidence → Output

---

## 0. VAI TRÒ

Bạn là Senior Astrology Software Architect + Astronomical Calculation Engineer.

Nhiệm vụ là xây dựng một **Chiêm Tinh Tây Phương Engine hoàn toàn deterministic** cho MYSTICOS.

MYSTICOS KHÔNG sử dụng:

* AI
* LLM
* machine learning
* embedding
* vector database
* semantic search
* random interpretation
* prompt-generated astrology
* nội dung được AI sinh động theo từng người dùng.

Mọi kết quả phải được tạo bằng:

**DỮ LIỆU THIÊN VĂN + CÔNG THỨC + CONFIG + QUY TẮC CHIÊM TINH + TEMPLATE DETERMINISTIC.**

Cùng một input + cùng một phiên bản engine + cùng một phiên bản ephemeris/config phải luôn cho cùng một output.

---

# 1. KIẾN TRÚC TỔNG THỂ

Thiết kế pipeline:

```text
USER INPUT
   ↓
INPUT NORMALIZATION
   ↓
TIMEZONE / UTC CONVERSION
   ↓
ASTRONOMICAL EPHEMERIS
   ↓
PLANETARY POSITIONS
   ↓
ZODIAC CALCULATION
   ↓
ASCENDANT / MC
   ↓
HOUSE SYSTEM
   ↓
PLANET-IN-SIGN
   ↓
PLANET-IN-HOUSE
   ↓
ASPECT ENGINE
   ↓
CHART PATTERN ENGINE
   ↓
DIGNITY / RETROGRADE / ANGULARITY
   ↓
TRANSIT / PROGRESSION ENGINE
   ↓
RULE ENGINE
   ↓
EVIDENCE GRAPH
   ↓
DETERMINISTIC INTERPRETATION
   ↓
SYNTHESIS
   ↓
JSON RESULT
   ↓
FRONTEND
```

Frontend tuyệt đối không tự tính hoặc tự luận Chiêm Tinh.

---

# 2. INPUT MODEL

Tối thiểu:

```ts
interface AstrologyInput {
  birthDate: string
  birthTime: string
  birthPlace: {
    latitude: number
    longitude: number
    timezone: string
  }

  houseSystem: HouseSystem
  zodiacType: ZodiacType
}
```

Ví dụ:

```json
{
  "birthDate": "1990-05-20",
  "birthTime": "14:35",
  "birthPlace": {
    "latitude": 10.7769,
    "longitude": 106.7009,
    "timezone": "Asia/Ho_Chi_Minh"
  },
  "houseSystem": "PLACIDUS",
  "zodiacType": "TROPICAL"
}
```

Không cho phép engine tự đoán:

* giờ sinh
* địa điểm
* timezone
* Ascendant
* Moon sign
* house.

Nếu thiếu birth time:

```text
CHART_PRECISION = LIMITED
```

và không được giả vờ cung cấp:

* Ascendant chính xác
* Houses chính xác
* MC/IC chính xác
* house-based interpretation chính xác.

---

# 3. TIME ENGINE

Đây là P0.

Phải xử lý:

* local time
* UTC
* timezone
* daylight saving nếu có
* historical timezone rules nếu cần
* latitude
* longitude
* birth time precision.

Không được hard-code:

```text
Vietnam = UTC+7
```

cho mọi thời kỳ mà không kiểm tra timezone rules.

Canonical representation:

```ts
interface BirthMoment {
  localDateTime: string
  timezone: string
  utcDateTime: string
  latitude: number
  longitude: number
}
```

---

# 4. ASTRONOMICAL ENGINE

Phải có một nguồn ephemeris xác định và version hóa.

Ví dụ:

```ts
interface EphemerisConfig {
  provider: string
  version: string
  precision: string
  coordinateSystem: string
}
```

Mọi planetary position phải lưu:

```ts
interface PlanetPosition {
  planet: Planet
  longitude: number
  latitude: number
  speed: number
  retrograde: boolean

  sign: ZodiacSign
  degree: number
  minute: number

  house?: number
}
```

Không lưu chỉ:

```text
Sun = Taurus
Moon = Scorpio
```

mà phải lưu tọa độ đầy đủ:

```text
Sun = 28°31' Taurus
```

vì aspect và house cần degree thực.

---

# 5. ZODIAC ENGINE

Hỗ trợ rõ ràng:

```ts
enum ZodiacType {
  TROPICAL,
  SIDEREAL
}
```

Không được trộn Tropical và Sidereal.

Config phải chứa:

```ts
interface ZodiacConfig {
  type: ZodiacType
  ayanamsa?: AyanamsaType
}
```

Nếu Sidereal:

* phải xác định ayanamsa
* version
* công thức.

Không được dùng từ "Chiêm tinh" như thể mọi hệ đều dùng cùng zodiac.

---

# 6. 12 CUNG HOÀNG ĐẠO

Canonical enum:

```text
ARIES
TAURUS
GEMINI
CANCER
LEO
VIRGO
LIBRA
SCORPIO
SAGITTARIUS
CAPRICORN
AQUARIUS
PISCES
```

Mỗi sign phải có metadata:

```ts
interface SignDefinition {
  element: Fire | Earth | Air | Water
  modality: Cardinal | Fixed | Mutable
  polarity: Masculine | Feminine
  ruler: Planet
  traditionalRuler?: Planet
}
```

Không viết logic:

```text
Fire = nóng tính
Earth = thực tế
Air = thông minh
Water = nhạy cảm
```

như fact tuyệt đối.

Đây chỉ là symbolic attributes.

---

# 7. PLANET MODEL

Ít nhất:

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
North Node
South Node
Chiron
Ascendant
MC
```

Tách:

### Luminaries

* Sun
* Moon

### Personal planets

* Mercury
* Venus
* Mars

### Social planets

* Jupiter
* Saturn

### Outer planets

* Uranus
* Neptune
* Pluto

### Points

* Nodes
* Chiron
* ASC
* MC.

Không coi mọi object có cùng trọng số.

---

# 8. PLANETARY WEIGHT

Không được cho:

```text
Pluto = Venus = Moon
```

một cách mặc định.

Config:

```ts
interface PlanetWeight {
  natalImportance: number
  transitImportance: number
  aspectImportance: number
}
```

Nhưng nếu có trọng số, phải giải thích đó là:

```text
ENGINE PRIORITY
```

chứ không biến thành:

```text
Planet này quan trọng gấp 2 lần trong vũ trụ.
```

---

# 9. ASCENDANT / MC

Ascendant phải được tính từ:

* birth UTC
* latitude
* longitude
* sidereal time
* selected zodiac system.

MC phải được tính độc lập.

Lưu:

```ts
interface Angles {
  ascendant: DegreePosition
  descendant: DegreePosition
  midheaven: DegreePosition
  imumCoeli: DegreePosition
}
```

Đặc biệt:

```text
ASC = 15°32' Leo
```

không chỉ:

```text
ASC Leo
```

---

# 10. HOUSE ENGINE

Hỗ trợ version hóa:

```text
Placidus
Whole Sign
Equal
Koch
Porphyry
...
```

House system phải là config.

```ts
interface HouseDefinition {
  house: number
  cusp: number
  sign: ZodiacSign
  degree: number
}
```

Phải xử lý:

* intercepted signs
* duplicated signs
* planets near cusp
* house cusp orb nếu framework cho phép.

Không được dùng một house system để tính chart rồi UI ghi hệ khác.

---

# 11. PLANET-IN-SIGN

Mỗi placement phải có:

```ts
interface Placement {
  planet: Planet
  sign: ZodiacSign
  degree: number
  house?: number
}
```

Interpretation phải phân biệt:

```text
PLANET
×
SIGN
×
HOUSE
```

Ví dụ:

```text
Venus
in Scorpio
in 7th House
```

không được chỉ lookup:

```text
Venus Scorpio
```

rồi bỏ qua House.

---

# 12. PLANET-IN-HOUSE

Mỗi house phải có:

* house number
* cusp sign
* ruler
* ruler location
* planets inside
* aspects to cusp/house ruler nếu framework hỗ trợ.

Ví dụ:

```text
7th House
Cusp = Scorpio
Ruler = Mars
Mars = Gemini, 3rd House
```

Đây tạo thành:

```text
HOUSE
→ RULER
→ RULER PLACEMENT
```

và phải được dùng trong interpretation.

---

# 13. HOUSE RULERSHIP ENGINE

Đây là phần rất quan trọng.

Không chỉ:

```text
7th House = relationships
```

mà phải xác định:

```text
7H cusp sign
↓
7H ruler
↓
ruler sign
↓
ruler house
↓
ruler aspects
```

Ví dụ:

```text
7H Scorpio
→ ruler Mars
→ Mars Gemini
→ Mars 3H
→ Mars square Saturn
```

Kết luận phải có evidence chain.

---

# 14. ASPECT ENGINE

Không dùng:

```text
same sign = aspect
```

Aspect phải dựa trên angular distance.

Core aspects:

```text
Conjunction 0°
Opposition 180°
Trine 120°
Square 90°
Sextile 60°
```

Optional:

```text
Quincunx 150°
Semi-sextile 30°
Semi-square 45°
Sesquiquadrate 135°
```

Mỗi aspect:

```ts
interface Aspect {
  planetA: Planet
  planetB: Planet

  type: AspectType

  exactAngle: number
  orb: number
  applying?: boolean
  separating?: boolean

  strength: number
}
```

---

# 15. ORB ENGINE

Không dùng một orb chung cho mọi thứ.

Ví dụ config:

```ts
interface OrbConfig {
  Sun: number
  Moon: number
  Mercury: number
  Venus: number
  Mars: number
  Jupiter: number
  Saturn: number

  conjunction: number
  opposition: number
  trine: number
  square: number
  sextile: number
}
```

Orb phải version hóa.

Không được viết:

```text
orb <= 10 => strong
```

nếu không có rule definition.

---

# 16. APPLYING / SEPARATING

Nếu ephemeris cho phép, xác định:

```text
Applying
Separating
Exact
```

Ví dụ:

```text
Mars applying square Saturn
```

có thể được xử lý khác với:

```text
Mars separating square Saturn
```

nhưng chỉ khi framework được định nghĩa rõ.

---

# 17. RETROGRADE ENGINE

Không dùng:

```text
Retrograde = bad
```

Retrograde phải là một thuộc tính:

```ts
retrograde: boolean
```

và interpretation layer có thể map thành:

```text
internalized
reconsideration
delay
review
reworking
```

tùy planet và context.

Không được tự động:

```text
Mercury Rx = communication disaster.
```

---

# 18. PLANETARY DIGNITIES

Nếu MYSTICOS sử dụng traditional dignity, phải implement riêng:

```text
Domicile
Exaltation
Detriment
Fall
Triplicity
Term
Face
```

Không trộn:

```text
traditional dignity
modern psychological interpretation
```

thành một rule duy nhất.

Mỗi dignity:

```ts
interface DignityResult {
  planet: Planet
  dignity: DignityType
  ruleId: string
  strength: number
}
```

---

# 19. ELEMENT / MODALITY DISTRIBUTION

Tính:

```text
Fire
Earth
Air
Water
```

và:

```text
Cardinal
Fixed
Mutable
```

Nhưng không dùng kiểu:

```text
60% Fire = bạn nóng tính.
```

Thay vào đó:

```text
Chart distribution
→ thematic emphasis
→ deterministic interpretation rule.
```

Ví dụ:

```text
Fire emphasis
```

có thể map tới:

```text
action
initiative
expression
drive
```

theo glossary của hệ thống.

---

# 20. POLARITY

Tính:

```text
Yang / Masculine
Yin / Feminine
```

nhưng đây là symbolic classification.

Không dùng để suy đoán:

* giới tính
* tính cách tuyệt đối
* hành vi xã hội bắt buộc.

---

# 21. CHART PATTERNS

Xây pattern detector.

Ví dụ:

```text
Stellium
Grand Trine
T-Square
Grand Cross
Yod
Kite
Mystic Rectangle
Grand Cross
```

Mỗi pattern phải có:

```ts
interface ChartPattern {
  id: string
  type: PatternType
  planets: Planet[]
  geometry: number[]
  ruleIds: string[]
}
```

Không nhận diện pattern bằng AI.

---

# 22. STELLIUM

Định nghĩa rõ:

* bao nhiêu planets?
* cùng sign?
* cùng house?
* orb bao nhiêu?

Không viết:

```text
3 planets gần nhau = Stellium
```

nếu rule của MYSTICOS khác.

---

# 23. CHART EMPHASIS

Xác định deterministic:

```text
Angular planets
Chart ruler
Sun
Moon
ASC ruler
MC ruler
Stellium
Dominant houses
Dominant signs
Dominant elements
```

Nhưng phải tránh tạo ra một "điểm tổng thể" giả tạo như:

```text
Personality Score = 87/100
```

Chiêm tinh không cần biến toàn bộ chart thành game score.

---

# 24. CHART RULER

Chart ruler:

```text
ASC sign
↓
traditional/modern ruler
↓
planet placement
↓
house
↓
aspects
```

Ví dụ:

```text
ASC Libra
→ Venus
→ Venus Taurus
→ Venus 8H
→ Venus trine Moon
```

Chart ruler phải được ưu tiên trong synthesis.

---

# 25. SUN / MOON / ASC SYNTHESIS

Không viết đơn giản:

```text
Sun = bản ngã
Moon = cảm xúc
ASC = vẻ ngoài
```

Mà tạo ba layer:

```text
SUN
identity / vitality / conscious direction

MOON
emotional regulation / needs / habitual responses

ASC
approach / presentation / first-contact pattern
```

Sau đó phân tích:

```text
Sun × Moon
Sun × ASC
Moon × ASC
```

nếu có aspects/relationship đủ mạnh.

---

# 26. BIG THREE

Output:

```ts
interface BigThree {
  sun: Placement
  moon: Placement
  ascendant: DegreePosition
}
```

UI:

```text
Mặt Trời
Mặt Trăng
Cung Mọc
```

Nhưng không gọi đây là "3 yếu tố duy nhất quyết định tính cách".

---

# 27. MERCURY / VENUS / MARS

Phải có các domain:

### Mercury

* communication
* learning
* reasoning
* information processing

### Venus

* attraction
* values
* affection
* aesthetics
* relational preferences

### Mars

* action
* assertion
* desire
* conflict response

Nhưng tất cả phải là symbolic interpretation, không phải chẩn đoán tâm lý.

---

# 28. HOUSE DOMAIN MAP

Tạo canonical map:

```text
1H → self / approach / identity
2H → resources / values / possessions
3H → communication / learning / local environment
4H → home / roots / private life
5H → creativity / romance / play
6H → work routines / service / habits
7H → partnership
8H → shared resources / intimacy / transformation
9H → worldview / higher learning / travel
10H → career / public role
11H → networks / groups / aspirations
12H → retreat / hidden processes / closure
```

Đây là domain definitions.

Không dùng như lời tiên tri.

---

# 29. RELATIONSHIP ANALYSIS

Nếu user hỏi:

```text
Tình yêu của tôi?
```

engine phải ưu tiên:

```text
5H
7H
Venus
Mars
Moon
rulers
relevant aspects
```

Nếu hỏi:

```text
Sự nghiệp?
```

ưu tiên:

```text
10H
6H
2H
MC
Sun
Saturn
Jupiter
house rulers
```

Nếu hỏi:

```text
Tài chính?
```

ưu tiên:

```text
2H
8H
Venus
Jupiter
Saturn
rulers
```

Không dùng AI để tự chọn dữ liệu.

---

# 30. SYNTHESIS ENGINE

Đây là phần quan trọng nhất.

Không được:

```text
Sun interpretation
+
Moon interpretation
+
Mars interpretation
=
paragraph.
```

Phải có:

```text
FACTS
↓
SIGNIFICANT FEATURES
↓
INTERACTIONS
↓
PATTERNS
↓
DOMAIN
↓
RULE PRIORITY
↓
SYNTHESIS
```

---

# 31. RULE PRIORITY

Khi nhiều tín hiệu cùng nói về một chủ đề, engine phải resolve conflict.

Ví dụ:

```text
Venus strong
but Venus square Saturn
and Venus opposite Pluto
```

Không được chỉ lấy:

```text
Venus Taurus = love tốt.
```

Phải tổng hợp:

```text
Base placement
+
supporting aspects
+
challenging aspects
+
house
+
ruler context.
```

---

# 32. EVIDENCE GRAPH

Mọi interpretation phải trace được.

Ví dụ:

```json
{
  "claimId": "REL_023",
  "text": "Có xu hướng nghiêm túc trong quan hệ.",
  "evidence": [
    "Venus in Capricorn",
    "Venus square Saturn",
    "7H ruler Saturn"
  ],
  "ruleIds": [
    "VENUS_CAPRICORN_01",
    "VENUS_SATURN_02"
  ]
}
```

Không cần expose chain-of-thought.

Chỉ expose:

```text
Dữ kiện
→ Quy tắc
→ Kết luận
```

---

# 33. "VÌ SAO HỆ THỐNG LUẬN NHƯ VẬY?"

Mỗi conclusion có nút:

```text
Vì sao?
```

Hiển thị:

```text
Dữ kiện:
Venus 18° Capricorn
Venus square Saturn 2° orb
Venus ở House 7

Quy tắc:
VENUS_CAPRICORN_01
VENUS_SATURN_02
HOUSE_7_VENUS_01

Kết luận:
...
```

Không hiển thị hidden chain-of-thought.

---

# 34. TRANSIT ENGINE

Đây là module bắt buộc nếu muốn sản phẩm sâu.

Input:

```text
Natal Chart
+
Target Date
```

Output:

```text
Transit planet
→ natal planet
→ aspect
→ orb
→ applying/separating
→ house activated
```

Ví dụ:

```text
Transit Saturn
square natal Venus
orb 0°42'
```

Không diễn giải:

```text
Bạn chắc chắn sẽ chia tay.
```

Mà:

```text
Chủ đề quan hệ có thể trở nên nghiêm túc,
đòi hỏi xem xét lại cam kết, giới hạn hoặc trách nhiệm.
```

---

# 35. TRANSIT PRIORITY

Không coi mọi transit như nhau.

Ưu tiên:

```text
Saturn
Jupiter
Uranus
Neptune
Pluto
Nodes
```

khi tạo long-term themes.

Personal planets có thể dùng cho:

```text
short-term triggers.
```

---

# 36. TRANSIT TO ANGLES

Phải đặc biệt xử lý:

```text
Transit planet
→ natal ASC
→ natal MC
→ natal IC
→ natal DSC
```

Các transit tới angles có thể được đánh dấu:

```text
HIGH_VISIBILITY
```

nhưng không được diễn giải thành sự kiện chắc chắn.

---

# 37. TRANSIT TIMELINE

Output:

```text
Ngày bắt đầu ảnh hưởng
Exact aspect
Peak
Separating
Ngày kết thúc orb
```

Nếu có retrograde:

```text
Pass 1
Pass 2
Pass 3
```

Có thể tạo:

```text
Transit Timeline
```

để user thấy một chủ đề quay lại nhiều lần.

---

# 38. PROGRESSIONS

Nếu MYSTICOS triển khai secondary progressions:

```text
1 day after birth ≈ 1 year of life
```

phải tách thành engine riêng.

Không trộn:

```text
Natal
Transit
Progression
Solar Return
```

---

# 39. SOLAR RETURN

Nếu triển khai:

Input:

```text
Birth chart
+
year
```

Tính thời điểm Sun return về natal Sun degree.

Sau đó tạo:

```text
Solar Return Chart
```

và giải thích riêng.

Không gọi:

```text
Annual horoscope
```

nếu thực tế chỉ dùng Sun sign.

---

# 40. SYNSTRY

Module tương hợp phải dùng:

```text
Chart A
+
Chart B
```

Không chỉ:

```text
Sun sign A
vs
Sun sign B
```

Tối thiểu:

```text
Sun
Moon
Mercury
Venus
Mars
ASC
7H
5H
8H
major aspects
```

Phải có:

```text
A planet → B planet
A planet → B angle
B planet → A angle
```

---

# 41. COMPOSITE CHART

Nếu triển khai:

```text
Composite Chart
```

phải tính midpoint đúng quy tắc.

Tách biệt:

```text
Synastry
=
A interacts with B

Composite
=
relationship as its own symbolic chart
```

Không được trộn hai hệ.

---

# 42. INTERPRETATION LANGUAGE

MYSTICOS phải dùng:

```text
có xu hướng
có thể biểu hiện
thường gắn với
một chủ đề nổi bật
có khả năng
theo hệ thống Chiêm Tinh được chọn
```

Tránh:

```text
chắc chắn
bạn sẽ
định mệnh bắt buộc
100%
không thể tránh
```

---

# 43. KHÔNG DỰ ĐOÁN CỨNG

Không viết:

```text
2027 bạn sẽ kết hôn.
```

Mà:

```text
Trong giai đoạn này, các chủ đề liên quan đến quan hệ,
cam kết và cấu trúc partnership được nhấn mạnh.
```

Nếu engine xác định một transit cụ thể:

```text
Transit Saturn conjunct natal Venus
```

phải hiển thị dữ kiện trước khi diễn giải.

---

# 44. KHÔNG CHẨN ĐOÁN SỨC KHỎE

6H/8H/12H và các placement không được dùng để:

* chẩn đoán bệnh
* dự đoán bệnh
* dự đoán tuổi thọ
* xác định tình trạng tâm thần
* thay thế tư vấn y tế.

Nếu user hỏi sức khỏe:

```text
symbolic wellness reflection
```

không phải diagnosis.

---

# 45. KHÔNG ĐƯA RA QUYẾT ĐỊNH TÀI CHÍNH

2H/8H/Jupiter/Saturn không được biến thành:

```text
Mua cổ phiếu X.
Đầu tư crypto.
Bán nhà.
```

Có thể nói về symbolic themes:

```text
risk awareness
resources
shared finances
long-term planning
```

nhưng không biến Chiêm Tinh thành financial advisor.

---

# 46. KHÔNG DÙNG SCORE 0–100

Loại bỏ:

```text
Personality 87/100
Career 92/100
Love 74/100
```

Thay bằng:

```text
Dominant themes
Supporting themes
Tensions
Opportunities for reflection
```

Nếu cần visualization:

```text
Theme intensity
```

nhưng phải là deterministic metric có định nghĩa rõ ràng.

---

# 47. KHÔNG GÁN "TỐT / XẤU" TUYỆT ĐỐI

Không:

```text
Saturn = xấu
Jupiter = tốt
Pluto = nguy hiểm
```

Thay:

```text
Saturn
→ structure
→ limits
→ responsibility
→ maturation

Jupiter
→ expansion
→ belief
→ opportunity
→ excess risk

Pluto
→ intensity
→ transformation
→ power dynamics
```

Context quyết định interpretation.

---

# 48. INTERPRETATION DATABASE

Không hard-code hàng trăm paragraph trong React.

Tạo data:

```text
/signs
/planets
/houses
/aspects
/dignities
/patterns
/rules
/templates
/transits
```

Ví dụ:

```ts
{
  id: "VENUS_SCORPIO",
  planet: "VENUS",
  sign: "SCORPIO",

  themes: [
    "depth",
    "intensity",
    "loyalty",
    "trust"
  ],

  shadowThemes: [
    "possessiveness",
    "control",
    "fear_of_vulnerability"
  ]
}
```

---

# 49. RULE STRUCTURE

Mỗi rule:

```ts
interface AstrologyRule {
  id: string
  version: string

  condition: Condition
  priority: number

  themes: string[]
  shadowThemes?: string[]

  templateIds: string[]
}
```

Ví dụ:

```text
VENUS_SCORPIO_01
VENUS_SATURN_SQUARE_01
MOON_8H_01
SATURN_7H_01
```

---

# 50. RULE CONFLICT RESOLUTION

Nếu có:

```text
positive signal
+
challenging signal
```

không được random chọn.

Có priority:

```text
Exact aspect
> close aspect
> placement
> generic sign meaning
```

hoặc một hierarchy được định nghĩa rõ trong config.

Quan trọng nhất:

**Hierarchy phải được version hóa và test.**

---

# 51. DOMAIN SYNTHESIS

Các domain:

```text
Identity
Emotion
Communication
Love
Sexuality / attraction
Career
Money
Home
Friendship
Learning
Personal growth
Long-term cycles
```

Mỗi domain có input priority riêng.

---

# 52. CAREER SYNTHESIS

Không lấy:

```text
Sun sign
```

để quyết định nghề.

Ưu tiên:

```text
10H
MC
10H ruler
6H
2H
Saturn
Jupiter
Sun
Mercury
Mars
relevant aspects
```

Output:

```text
Work themes
Preferred environments
Potential strengths
Potential friction
```

Không:

```text
Bạn chắc chắn nên làm nghề X.
```

---

# 53. LOVE SYNTHESIS

Ưu tiên:

```text
Venus
Mars
Moon
5H
7H
8H
7H ruler
major relationship aspects
```

Phân biệt:

```text
attraction
emotional needs
communication
commitment
conflict
intimacy
```

Không gộp toàn bộ thành:

```text
Love score.
```

---

# 54. COMMUNICATION

Ưu tiên:

```text
Mercury
3H
Mercury aspects
Mercury ruler
```

Nếu Mercury square Saturn:

không được tự động:

```text
giao tiếp kém.
```

Mà rule phải định nghĩa cụ thể:

```text
cautious communication
self-editing
structured thinking
possible hesitation under pressure
```

---

# 55. RELATIONSHIP BETWEEN SIGNALS

Engine phải nhận biết:

```text
reinforcement
contrast
tension
modification
amplification
mitigation
```

Ví dụ:

```text
Venus Scorpio
+
Venus trine Moon
+
Venus square Saturn
```

Không thể chỉ cộng 3 đoạn văn.

Phải tổng hợp:

```text
depth
+
emotional compatibility
+
constraint / seriousness
```

thành một theme có cấu trúc.

---

# 56. CHART THEMES

Output dạng:

```ts
interface ChartTheme {
  id: string
  title: string
  strength: "low" | "medium" | "high"

  evidenceIds: string[]
  ruleIds: string[]

  supportingSignals: string[]
  tensionSignals: string[]
}
```

Ví dụ:

```text
Theme:
"Need for emotional depth"

Supporting:
Venus Scorpio
Moon 8H

Tension:
Venus square Saturn
```

---

# 57. REPORT STRUCTURE

MYSTICOS nên render theo:

## 01 — Tổng Quan Lá Số

* Big Three
* Chart ruler
* dominant elements
* dominant modalities
* major patterns
* top themes

## 02 — Mặt Trời

Identity / direction / vitality

## 03 — Mặt Trăng

Emotional needs / habits

## 04 — Cung Mọc

Approach / presentation

## 05 — Hành Tinh Cá Nhân

Mercury / Venus / Mars

## 06 — Các Nhà

12 houses

## 07 — Các Góc Chiếu

Major aspects

## 08 — Pattern

Stellium / T-square / Grand Trine...

## 09 — Tình Yêu

Venus / Mars / Moon / 5H / 7H / 8H

## 10 — Sự Nghiệp

MC / 10H / 6H / 2H

## 11 — Chu Kỳ Hiện Tại

Transits

## 12 — Tổng Hợp

3–7 dominant themes

## 13 — Evidence

"Vì sao?"

---

# 58. JSON OUTPUT

Ví dụ:

```ts
interface AstrologyResult {
  meta: {
    engineVersion: string
    ephemerisVersion: string
    zodiacType: string
    houseSystem: string
  }

  input: AstrologyInput

  chart: {
    planets: PlanetPosition[]
    houses: HouseDefinition[]
    angles: Angles[]
    aspects: Aspect[]
    patterns: ChartPattern[]
  }

  themes: ChartTheme[]

  domains: {
    identity: DomainAnalysis
    emotion: DomainAnalysis
    love: DomainAnalysis
    career: DomainAnalysis
    money: DomainAnalysis
  }

  transits?: TransitAnalysis[]

  evidence: Evidence[]

  interpretations: GeneratedText[]
}
```

---

# 59. GENERATED TEXT

Không cho frontend tự tạo câu.

```ts
interface GeneratedText {
  id: string
  templateId: string

  text: string

  ruleIds: string[]
  evidenceIds: string[]

  domain: string
}
```

Ví dụ:

```json
{
  "templateId": "LOVE_THEME_03",
  "ruleIds": [
    "VENUS_SCORPIO_01",
    "VENUS_SATURN_SQUARE_01"
  ],
  "evidenceIds": [
    "VENUS_01",
    "ASPECT_17"
  ]
}
```

---

# 60. TEMPLATE ENGINE

Template phải deterministic.

Ví dụ:

```text
TEMPLATE:
"Về {domain}, lá số nhấn mạnh {theme}. Điều này có thể biểu hiện qua {manifestation}."
```

Input:

```text
domain = quan hệ
theme = nhu cầu chiều sâu
manifestation = xu hướng coi trọng sự tin cậy và cam kết
```

Không để AI rewrite.

---

# 61. QUESTION ENGINE

User có thể hỏi:

```text
Tình yêu của tôi thế nào?
```

Engine map:

```text
QUESTION
↓
DOMAIN
↓
RELEVANT HOUSES
↓
RELEVANT PLANETS
↓
RELEVANT ASPECTS
↓
RULES
↓
ANSWER
```

Không dùng semantic AI.

Tạo dictionary:

```ts
const questionDomains = {
  love: [
    "tình yêu",
    "tình cảm",
    "người yêu",
    "hôn nhân"
  ],

  career: [
    "sự nghiệp",
    "công việc",
    "nghề nghiệp"
  ]
}
```

Có fallback:

```text
GENERAL_CHART_OVERVIEW
```

---

# 62. VERSIONING

Bắt buộc version:

```text
Engine version
Ephemeris version
Zodiac version
House-system version
Aspect-orb version
Interpretation-rule version
Template version
```

Ví dụ:

```text
Astrology Engine 1.4.0
Ephemeris 2026.03
Rules 2.1.0
Templates 1.8.0
```

Nếu rule thay đổi:

```text
same chart
→ potentially different interpretation
```

nhưng phải biết chính xác vì sao.

---

# 63. GOLDEN CHART TEST

Tạo các birth charts cố định.

Ví dụ:

```ts
describe("Golden Chart #001", () => {
  expect(chart.sun.sign).toBe(...)
  expect(chart.moon.sign).toBe(...)
  expect(chart.ascendant).toBe(...)
  expect(chart.houses).toEqual(...)
  expect(chart.aspects).toEqual(...)
})
```

Không chỉ test UI.

---

# 64. ASTRONOMICAL REGRESSION TEST

Test:

```text
Planet longitude
ASC
MC
House cusps
Retrograde
Aspect orb
```

với expected values.

Sai 1° có thể làm:

* aspect đổi
* house đổi
* interpretation đổi.

Do đó calculation engine phải được test độc lập.

---

# 65. EDGE CASES

Bắt buộc test:

* birth at 00:00
* birth at 23:59
* timezone boundary
* DST
* near sign cusp
* near house cusp
* retrograde station
* exact aspect
* orb boundary
* planets at same degree
* polar latitude
* missing birth time
* invalid coordinates
* historical dates.

---

# 66. DETERMINISM TEST

Test:

```text
same input
+
same versions
=
byte-equivalent result
```

Không được:

```ts
Math.random()
Date.now()
AI-generated text
```

trong calculation/interpretation.

---

# 67. FRONTEND ARCHITECTURE

React component chỉ làm:

```text
render
format
interaction
filter
expand/collapse
```

Không được chứa:

```text
if Venus && Scorpio => ...
if Saturn => ...
if reversed => ...
```

Tất cả rule phải nằm backend/domain engine.

---

# 68. UI "RAW → INTERPRETATION"

Mỗi section nên có:

```text
KẾT QUẢ
↓
DỮ KIỆN CHÍNH
↓
Ý NGHĨA THEO HỆ THỐNG
↓
ỨNG DỤNG THỰC TẾ
```

Ví dụ:

```text
Venus 18° Scorpio — House 7

Dữ kiện:
Venus in Scorpio
Venus in 7H
Venus square Saturn

Diễn giải:
...
```

---

# 69. KHÔNG ĐỂ UI GIẢ VỜ KHOA HỌC

Không sử dụng wording:

```text
scientifically proven
psychologically accurate
guaranteed
```

Chiêm tinh phải được mô tả đúng là:

```text
một hệ thống biểu tượng / diễn giải truyền thống
```

Các phép tính thiên văn có thể chính xác về mặt toán học, nhưng interpretation chiêm tinh là framework diễn giải, không phải kết luận khoa học về con người.

---

# 70. PHÂN BIỆT 4 TẦNG

Mỗi output phải phân biệt:

### FACT

Ví dụ:

```text
Venus = 18° Scorpio
```

### ASTROLOGY RULE

Ví dụ:

```text
Venus in Scorpio
```

theo rule của hệ thống.

### INTERPRETATION

```text
Theme of depth / intensity...
```

### PRACTICAL REFLECTION

```text
Có thể dùng chủ đề này để tự quan sát...
```

Không được trình bày cả bốn như cùng một mức độ sự thật.

---

# 71. KHÔNG ĐƯỢC HARD-CODE COPY

Tuyệt đối không xây:

```ts
if (sun === "Aries") {
 return "Bạn là người..."
}
```

cho hàng trăm trường hợp.

Thay bằng:

```text
structured semantic data
+
rule engine
+
template engine.
```

---

# 72. DATA MODEL CUỐI

Đề xuất:

```text
/lib/astrology/
  /core/
    types.ts
    constants.ts

  /astronomy/
    ephemeris.ts
    coordinates.ts
    sidereal-time.ts

  /zodiac/
    tropical.ts
    sidereal.ts

  /houses/
    placidus.ts
    whole-sign.ts
    equal.ts

  /planets/
    planets.ts
    dignities.ts
    retrograde.ts

  /aspects/
    aspects.ts
    orbs.ts
    applying.ts

  /patterns/
    stellium.ts
    t-square.ts
    grand-trine.ts

  /rules/
    placements.ts
    houses.ts
    aspects.ts
    rulers.ts
    patterns.ts

  /domains/
    identity.ts
    emotion.ts
    love.ts
    career.ts
    money.ts

  /transits/
    transits.ts
    timeline.ts

  /synastry/
    synastry.ts

  /composite/
    composite.ts

  /interpretation/
    evidence.ts
    synthesis.ts
    templates.ts

  /tests/
    golden-charts.ts
    regression.ts
    determinism.ts
```

---

# 73. NGUYÊN TẮC VÀNG

Không được xây:

```text
INPUT
↓
AI
↓
HOROSCOPE
```

Mà phải xây:

```text
INPUT
↓
ASTRONOMICAL CALCULATION
↓
CHART
↓
RELATIONSHIPS
↓
RULE ENGINE
↓
EVIDENCE
↓
DETERMINISTIC SYNTHESIS
↓
TEMPLATE
↓
OUTPUT
```

---

# 74. DELIVERABLE

Agent phải thực hiện:

1. Audit code hiện tại.
2. Xác định toàn bộ logic Chiêm Tinh đang nằm trong frontend.
3. Di chuyển calculation ra domain engine.
4. Xây canonical chart model.
5. Implement planetary positions.
6. Implement zodiac.
7. Implement ASC/MC.
8. Implement house system.
9. Implement planet-in-sign.
10. Implement planet-in-house.
11. Implement aspects.
12. Implement orb.
13. Implement retrograde.
14. Implement rulers.
15. Implement dignities nếu enabled.
16. Implement chart patterns.
17. Implement evidence graph.
18. Implement deterministic interpretation.
19. Implement domain synthesis.
20. Implement transit engine.
21. TypeScript strict.
22. Loại bỏ `any`.
23. Viết golden tests.
24. Viết regression tests.
25. Viết determinism tests.
26. Refactor frontend thành render-only.

---

# 75. ĐIỀU KIỆN NGHIỆM THU

Chỉ coi module hoàn thành khi:

### Calculation

```text
Planet positions đúng
ASC đúng
MC đúng
House cusps đúng
Aspects đúng
```

### Logic

```text
Planet × Sign
Planet × House
House ruler
Aspect
Pattern
Transit
```

đều deterministic.

### Interpretation

Mỗi conclusion có:

```text
ruleId
evidenceId
templateId
```

### UI

Frontend không chứa astrology rules.

### Determinism

Cùng input/version:

```text
same output
```

100% reproducible.

---

# 76. QUY TẮC CUỐI CÙNG

**ĐỪNG VIẾT THÊM COPY TRƯỚC KHI ENGINE ĐÚNG.**

Thứ tự ưu tiên:

```text
1. Astronomy
2. Chart calculation
3. House calculation
4. Aspect calculation
5. Chart relationships
6. Rule engine
7. Evidence
8. Synthesis
9. Templates
10. UI
```

Không được dùng văn phong đẹp để che một chart engine sai.

Mục tiêu của MYSTICOS không phải là:

> "Một trang horoscope đọc nghe rất hay."

Mục tiêu là:

> **Một hệ thống Chiêm Tinh có thể giải thích chính xác dữ kiện nào đã tạo ra kết luận nào, tái lập được kết quả, kiểm thử được và không cần AI để suy luận.**
