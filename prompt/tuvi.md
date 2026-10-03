Bạn là Senior System Architect + Domain Engineer chuyên xây dựng hệ thống **Tử Vi Đẩu Số deterministic/rule-based** bằng TypeScript/Next.js.

Tôi đang xây dựng module:

**02 — TỬ VI ĐẨU SỐ**

cho MYSTICOS — “Khảo Cứu Vận Mệnh”.

## ĐIỀU KIỆN TUYỆT ĐỐI

HỆ THỐNG TỬ VI NÀY KHÔNG ĐƯỢC SỬ DỤNG AI / LLM.

Không OpenAI.
Không Gemini.
Không Claude.
Không local LLM.
Không embedding.
Không vector database.
Không generated interpretation.

Toàn bộ kết quả phải được tạo bởi:

```text
INPUT
+
CALENDAR ENGINE
+
CHART GENERATION
+
STAR PLACEMENT RULES
+
PALACE RELATIONSHIPS
+
TRADITIONAL RULES
+
TRANSFORMATION RULES
+
PERIOD RULES
+
DETERMINISTIC TEMPLATES
```

Cùng:

```text
Input
+
Dataset Version
+
Rule Version
+
Calendar Version
```

phải luôn cho:

```text
Same Chart
+
Same Interpretation
+
Same Output
```

Randomness tuyệt đối không được xuất hiện trong chart calculation hoặc interpretation.

---

# 01. MỤC TIÊU

Không xây hệ thống theo kiểu:

```text
Input
→
database stars
→
mỗi cung một đoạn văn
```

Đó là sai kiến trúc.

Phải xây:

```text
RAW INPUT
    ↓
CALENDAR NORMALIZATION
    ↓
BIRTH DATA VALIDATION
    ↓
CAN CHI / NGŨ HÀNH
    ↓
CỤC
    ↓
MỆNH / THÂN
    ↓
12 CUNG
    ↓
14 CHÍNH TINH
    ↓
PHỤ TINH / BẠI TINH / CÁT TINH / SÁT TINH
    ↓
MIẾU / VƯỢNG / ĐẮC / HÃM
    ↓
TUẦN / TRIỆT
    ↓
TỨ HÓA
    ↓
TAM PHƯƠNG TỨ CHÍNH
    ↓
XUNG CHIẾU / GIÁP CUNG
    ↓
CUNG + SAO + QUAN HỆ
    ↓
BẢN MỆNH / THÂN
    ↓
ĐẠI HẠN
    ↓
TIỂU HẠN
    ↓
LƯU NIÊN
    ↓
LƯU TINH / LƯU HÓA nếu hệ thống hỗ trợ
    ↓
RULE ENGINE
    ↓
SYNTHESIS
    ↓
DETERMINISTIC TEXT
    ↓
STRUCTURED JSON
    ↓
FRONTEND
```

---

# 02. NGUYÊN TẮC QUAN TRỌNG NHẤT

## KHÔNG ĐƯỢC LUẬN CUNG ĐỘC LẬP

Ví dụ:

```text
Mệnh
→ đọc sao Mệnh
→ viết đoạn văn
```

là chưa đủ.

Mệnh phải được phân tích thông qua:

```text
Mệnh
+
Tài Bạch
+
Quan Lộc
+
Thiên Di
+
Tam hợp
+
Xung chiếu
+
Giáp cung
+
Tứ Hóa
+
Tuần/Triệt
+
độ mạnh yếu của sao
```

Do đó:

```text
PALACE INTERPRETATION
```

chỉ là một intermediate result.

Không phải final result.

---

# 03. INPUT CONTRACT

Thiết kế input chính xác.

```ts
interface TuViInput {
  birthDate: {
    calendar: "solar" | "lunar";
    year: number;
    month: number;
    day: number;
  };

  birthTime: {
    hour: number;
    minute?: number;
  };

  gender:
    | "male"
    | "female";

  birthPlace?: {
    country?: string;
    province?: string;
    city?: string;
    timezone?: string;
  };

  options?: {
    school?: string;
    language?: "vi";
    depth?: "standard" | "deep";
    includeAnnualForecast?: boolean;
    forecastYear?: number;
  };
}
```

Nhưng phải phân biệt:

```text
raw input
```

và:

```text
normalized birth data
```

---

# 04. BIRTH DATA NORMALIZATION

Tạo:

```ts
interface NormalizedBirthData {
  solarDate: string;
  lunarDate: string;

  yearCan: HeavenlyStem;
  yearChi: EarthlyBranch;

  monthCan: HeavenlyStem;
  monthChi: EarthlyBranch;

  dayCan: HeavenlyStem;
  dayChi: EarthlyBranch;

  hourCan: HeavenlyStem;
  hourChi: EarthlyBranch;

  yinYang: "yin" | "yang";

  gender: "male" | "female";

  timezone: string;

  solarTime?: string;

  trueSolarTime?: string;
}
```

Phải có một nơi duy nhất làm canonical normalization.

Không để:

```text
frontend
API
chart engine
forecast engine
```

tự tính ngày âm riêng.

---

# 05. LỊCH PHÁP LÀ CORE DEPENDENCY

Đây là tầng P0.

Phải kiểm tra chính xác:

* Dương lịch → Âm lịch;
* Can Chi năm;
* Can Chi tháng;
* Can Chi ngày;
* Can Chi giờ;
* tiết khí nếu trường phái cần;
* giờ Tý;
* ngày đổi sang ngày mới ở thời điểm nào;
* múi giờ;
* DST nếu có;
* true solar time nếu trường phái yêu cầu.

Không được giả định:

```text
00:00 = luôn sang ngày mới
```

nếu rule của school đang sử dụng quy ước khác.

Tạo:

```ts
CalendarEngine
```

và test độc lập.

---

# 06. CANONICAL CHART OBJECT

Sau khi tính xong, phải tạo đúng một object:

```ts
interface TuViChart {
  chartId: string;

  birthData: NormalizedBirthData;

  destiny: DestinyInfo;

  palaces: Palace[];

  stars: StarPlacement[];

  transformations: Transformation[];

  majorPeriods: MajorPeriod[];

  minorPeriods?: MinorPeriod[];

  annualPeriods?: AnnualPeriod[];

  metadata: ChartMetadata;
}
```

Mọi UI đều đọc từ object này.

Không được có:

```text
Chart A ở backend
+
Chart B trong frontend
+
Chart C trong annual forecast
```

---

# 07. DESTINY CALCULATION

Tạo riêng:

```ts
interface DestinyInfo {
  menhBranch: EarthlyBranch;

  thanBranch: EarthlyBranch;

  menhElement: Element;

  cuc: CucInfo;

  cucElement: Element;

  relation:
    | "menh_sinh_cuc"
    | "cuc_sinh_menh"
    | "menh_cuc_binh_hoa"
    | "menh_khac_cuc"
    | "cuc_khac_menh";

  yinYangRelation?: string;

  menhPosition: number;

  thanPosition: number;
}
```

Không render câu kiểu:

```text
“Mệnh Kim khắc Mộc Tam Cục Mệnh”
```

nếu semantic object không thể hiện rõ:

```text
Mệnh = X
Cục = Y
Quan hệ = X khắc Y
```

---

# 08. MỆNH / THÂN

Phải xác định:

```text
Mệnh
Thân
Thân cư Mệnh
Thân cư Tài
Thân cư Quan
Thân cư Phúc
Thân cư Phu
...
```

và lưu:

```ts
interface ShenPlacement {
  palaceId: string;
  branch: EarthlyBranch;
  placementType: string;
}
```

Không chỉ lưu text:

```text
"Thân cư Phu Thê"
```

---

# 09. 12 CUNG

Canonical enum:

```ts
type PalaceType =
  | "menh"
  | "phu_mau"
  | "phuc_duc"
  | "dien_trach"
  | "quan_loc"
  | "no_boc"
  | "thien_di"
  | "tat_ach"
  | "tai_bach"
  | "tu_tuc"
  | "phu_the"
  | "huynh_de";
```

Mỗi cung:

```ts
interface Palace {
  id: string;

  type: PalaceType;

  name: string;

  branch: EarthlyBranch;

  positionIndex: number;

  stars: string[];

  isMenh: boolean;

  isThan: boolean;

  isTuan: boolean;

  isTriet: boolean;
}
```

---

# 10. SAO PHẢI LÀ DOMAIN OBJECT

Không lưu:

```ts
stars: ["Tử Vi", "Thiên Phủ"]
```

là đủ.

Phải có:

```ts
interface StarDefinition {
  id: string;

  name: string;

  category:
    | "major"
    | "minor"
    | "auspicious"
    | "inauspicious"
    | "special";

  nature: string[];

  element?: Element;

  polarity?: string;

  strengthByBranch?: Record<
    EarthlyBranch,
    "mieu" | "vuong" | "dac" | "ham"
  >;

  themes: ThemeId[];

  constructiveThemes: ThemeId[];

  challengingThemes: ThemeId[];
}
```

---

# 11. MIẾU / VƯỢNG / ĐẮC / HÃM

Không được hiển thị badge:

```text
Miếu
Vượng
Đắc
Hãm
```

mà không dùng nó trong logic.

Nếu star ở:

```text
Miếu
```

thì phải có rule modifier.

Ví dụ:

```ts
strengthModifier = +2
```

Nếu:

```text
Hãm
```

thì:

```ts
strengthModifier = -2
```

Nhưng phải kiểm tra đúng bảng theo school.

Không được tự suy diễn rằng:

```text
Hãm = xấu tuyệt đối
Miếu = tốt tuyệt đối
```

Mà:

```text
strength modifies expression of the star
```

---

# 12. TUẦN / TRIỆT

Tuần/Triệt không được chỉ là:

```text
isTuan = true
isTriet = true
```

Phải có semantic rule.

Ví dụ:

```ts
interface VoidModifier {
  type: "tuan" | "triet";

  affectedPalace: string;

  affectedStars: string[];

  effects: ModifierEffect[];
}
```

Rule phải xác định:

```text
Tuần/Triệt đang tác động vào cung nào?
Sao nào?
Tác động theo trường hợp nào?
```

Không viết generic:

```text
“Tuần làm mọi thứ chậm lại.”
```

cho tất cả trường hợp.

---

# 13. TỨ HÓA

Đây là P0 nếu muốn gọi là Tử Vi chuyên sâu.

Phải hỗ trợ:

```text
Lộc
Quyền
Khoa
Kỵ
```

và mapping theo Can.

```ts
interface Transformation {
  type:
    | "hoa_loc"
    | "hoa_quyen"
    | "hoa_khoa"
    | "hoa_ky";

  sourceStem: HeavenlyStem;

  sourceStar: string;

  targetPalace: string;

  targetStar?: string;
}
```

Phải có bảng mapping versioned.

Không hard-code trong component.

---

# 14. TỨ HÓA PHẢI CÓ SOURCE

Ví dụ:

```text
Can năm
↓
Hóa Lộc → sao A
Hóa Quyền → sao B
Hóa Khoa → sao C
Hóa Kỵ → sao D
```

UI phải có thể giải thích:

```text
“Hóa Kỵ này xuất phát từ Can nào,
tác động lên sao nào,
và sao đó đang nằm tại cung nào.”
```

---

# 15. TAM PHƯƠNG TỨ CHÍNH

Đây là core interpretation engine.

Mỗi palace phải có:

```ts
interface PalaceRelations {
  target: PalaceType;

  tamHop: PalaceType[];

  xungChieu: PalaceType;

  giapCung: PalaceType[];

  tamPhuongTuChinh: PalaceType[];
}
```

Ví dụ Mệnh:

```text
Mệnh
+
Tài Bạch
+
Quan Lộc
+
Thiên Di
```

phải được engine xử lý như một cluster.

---

# 16. KHÔNG LUẬN SAO THEO CUNG ĐƠN

Ví dụ:

```text
Quan Lộc có Thất Sát
```

không được lập tức:

```text
“Bạn có sự nghiệp mạnh mẽ.”
```

Phải tính:

```text
Quan Lộc
+
Mệnh
+
Tài Bạch
+
Thiên Di
+
Tứ Hóa
+
Miếu/Vượng/Hãm
+
Tuần/Triệt
+
phụ tinh
```

sau đó mới tạo interpretation.

---

# 17. PALACE CLUSTER ENGINE

Tạo:

```ts
interface PalaceCluster {
  anchor: PalaceType;

  primary: PalaceType;

  supporting: PalaceType[];

  opposing: PalaceType[];

  adjacent: PalaceType[];

  stars: StarPlacement[];

  transformations: Transformation[];

  evidence: Evidence[];
}
```

Engine:

```text
buildPalaceCluster("menh")
```

phải trả toàn bộ dữ liệu cần để luận Mệnh.

---

# 18. SAO CHÍNH + PHỤ TINH

Không chỉ đọc chính tinh.

Phải phân loại:

```text
14 chính tinh
+
cát tinh
+
sát tinh
+
bại tinh
+
tả hữu
+
khôi việt
+
xương khúc
+
không kiếp
+
kình đà
+
hỏa linh
+
...
```

Nhưng không được hard-code rằng:

```text
Cát tinh = +1
Sát tinh = -1
```

vì ý nghĩa phụ thuộc:

* cung;
* chính tinh;
* trạng thái;
* tổ hợp;
* Tứ Hóa;
* vận hạn.

---

# 19. STAR INTERACTION ENGINE

Phải có:

```ts
interface StarInteractionRule {
  id: string;

  requiredStars: string[];

  palaceRelation?:
    | "same_palace"
    | "tam_hop"
    | "xung_chieu"
    | "giap_cung";

  conditions?: RuleCondition[];

  effects: RuleEffect[];
}
```

Ví dụ:

```text
Star A + Star B
```

có thể tạo:

```text
reinforcement
mitigation
tension
amplification
special_pattern
```

Không chỉ cộng điểm.

---

# 20. “BỘ SAO” PHẢI ĐƯỢC MODEL

Tử Vi không chỉ là từng sao.

Phải hỗ trợ:

```text
Star Combination
```

Ví dụ:

```ts
interface StarPattern {
  id: string;

  stars: string[];

  relation:
    | "same_palace"
    | "tam_hop"
    | "xung_chieu"
    | "distributed";

  requiredConditions: RuleCondition[];

  interpretationThemes: ThemeId[];

  modifiers: RuleEffect[];
}
```

Nếu có một tổ hợp đặc biệt, engine nhận diện pattern.

---

# 21. EVIDENCE GRAPH

Mọi luận điểm quan trọng phải truy được nguồn.

Ví dụ:

```text
KẾT LUẬN:
Sự nghiệp có tính chất biến động và đòi hỏi khả năng thích nghi.

EVIDENCE:
├── Quan Lộc
├── Thất Sát
├── vị trí sao
├── Miếu/Vượng/Hãm
├── Mệnh
├── Thiên Di
├── Tứ Hóa
└── quan hệ Tam Phương Tứ Chính
```

Schema:

```ts
interface TuViEvidence {
  id: string;

  claim: string;

  sourceType:
    | "palace"
    | "star"
    | "star_combination"
    | "transformation"
    | "palace_relation"
    | "period"
    | "calendar";

  sourceIds: string[];

  strength: "primary" | "secondary" | "supporting";
}
```

---

# 22. RULE ENGINE

Tạo:

```ts
interface TuViRule {
  id: string;

  priority: number;

  conditions: RuleCondition[];

  effects: RuleEffect[];

  explanation?: string;
}
```

Ví dụ:

```text
IF
  target = Quan Lộc
  AND star = Thất Sát
  AND starStrength = Miếu
  AND no mitigating condition

THEN
  activateTheme("decisiveness")
  activateTheme("high_pressure")
  activateTheme("independent_action")
```

Nhưng KHÔNG viết:

```text
THEN
“Bạn chắc chắn thành công.”
```

Rule tạo semantic.

Template tạo câu.

---

# 23. SEPARATE SEMANTIC FROM LANGUAGE

Không:

```ts
rule.effect = "Bạn là người quyết đoán..."
```

Mà:

```text
Rule
→ theme: decisiveness
→ theme: pressure
→ theme: autonomy
```

Sau đó:

```text
Template
→ “Cấu trúc này thường nhấn mạnh...”
```

Điều này cho phép:

* đổi văn phong;
* đổi ngôn ngữ;
* đổi UI;
* audit logic.

---

# 24. 12 CUNG PHẢI CÓ DOMAIN SEMANTICS

Mỗi cung cần có:

```ts
interface PalaceDomain {
  palace: PalaceType;

  domains: string[];

  lifeAreas: string[];

  questions: string[];
}
```

Ví dụ:

```text
Tài Bạch:
money
resources
earning
financial_behavior
```

Quan Lộc:

```text
career
work
status
professional_direction
```

Phu Thê:

```text
partnership
marriage
relationship_pattern
```

Tật Ách:

```text
vitality
stress
wellbeing
```

Không được biến Tật Ách thành hệ thống chẩn đoán bệnh.

---

# 25. TẬT ÁCH

Không output:

```text
“Bạn sẽ mắc bệnh X.”
```

Không output:

```text
“Bạn có nguy cơ mắc bệnh Y.”
```

Chỉ dùng:

```text
stress pattern
wellness tendency
traditional symbolic interpretation
```

Nếu có health guidance:

```text
“Có thể xem đây như một gợi ý để chú ý tới...”
```

không phải diagnosis.

---

# 26. 12 CUNG KHÔNG CÓ CÙNG ĐỘ ƯU TIÊN

Nếu người dùng hỏi:

```text
“Sự nghiệp của tôi?”
```

engine không cần trình bày 12 cung ngang nhau.

Priority:

```text
Quan Lộc
Mệnh
Tài Bạch
Thiên Di
Phúc Đức
```

Các cung còn lại là supporting evidence.

Nếu hỏi:

```text
“Hôn nhân?”
```

priority:

```text
Phu Thê
Mệnh
Phúc Đức
Thiên Di
```

Tạo:

```ts
QuestionDomainMapping
```

---

# 27. QUESTION ENGINE

Không AI.

Rule-based.

```ts
interface TuViQuestionContext {
  rawQuestion?: string;

  domain:
    | "general"
    | "career"
    | "finance"
    | "relationship"
    | "family"
    | "health"
    | "education"
    | "life_direction";

  priorityPalaces: PalaceType[];

  secondaryPalaces: PalaceType[];
}
```

Keyword classifier:

```text
công việc
sự nghiệp
nghề nghiệp
→ career

tiền
tài chính
thu nhập
→ finance

hôn nhân
vợ chồng
tình cảm
→ relationship
```

Không match:

```text
general
```

---

# 28. MỆNH — KHÔNG LUẬN CHỈ BẰNG CHÍNH TINH

Mệnh phải được tổng hợp:

```text
Mệnh cung
+
Thân
+
Chính tinh
+
Phụ tinh
+
Tam hợp
+
Xung chiếu
+
Giáp cung
+
Tứ Hóa
+
Tuần/Triệt
+
Mệnh/Cục
```

Output intermediate:

```ts
interface CorePersonalityAnalysis {
  dominantThemes: ThemeId[];

  strengths: ThemeId[];

  tensions: ThemeId[];

  developmentalThemes: ThemeId[];

  evidence: TuViEvidence[];
}
```

---

# 29. THÂN PHẢI ĐƯỢC TÍCH HỢP

Không chỉ render:

```text
Thân cư Phu Thê
```

Phải có:

```text
Thân placement
→ modify life emphasis
→ modify relevant palace cluster
```

Ví dụ:

```text
Thân cư Quan Lộc
```

→ theme:

```text
career emphasis
public role
achievement orientation
```

Nhưng không deterministic kiểu:

```text
“Bạn chắc chắn sống vì sự nghiệp.”
```

---

# 30. MỆNH + THÂN SYNTHESIS

Tạo:

```ts
interface CoreChartSynthesis {
  menhThemes: ThemeId[];

  thanThemes: ThemeId[];

  interaction: ThemeId[];

  tension?: ThemeId[];

  evidence: TuViEvidence[];
}
```

Ví dụ:

```text
Mệnh:
independence

Thân:
career emphasis

→ combined:
independence expressed through professional direction
```

---

# 31. ĐẠI HẠN

Đại hạn không được viết:

```text
30–40 tuổi = sự nghiệp tốt
```

một cách hard-coded.

Phải tính:

```text
Cục
+
Âm Dương
+
Giới tính
+
thuận/nghịch hành
+
tuổi khởi đại hạn
+
cung đại hạn
```

Tạo:

```ts
interface MajorPeriod {
  startAge: number;

  endAge: number;

  startYear?: number;

  endYear?: number;

  palace: PalaceType;

  branch: EarthlyBranch;

  stars: string[];

  transformations: Transformation[];

  themes: ThemeId[];
}
```

---

# 32. THUẬN / NGHỊCH HÀNH

Đây là logic P0.

Phải có rule rõ ràng:

```text
gender
+
yin/yang
+
school convention
→
forward / backward
```

Không hard-code theo ví dụ.

Phải có unit tests.

---

# 33. ĐẠI HẠN INTERPRETATION

Đại hạn phải lấy:

```text
Original natal chart
+
Major Period palace
+
stars in that palace
+
palace relations
+
period transformations
```

Không:

```text
Major Period = standalone chart
```

---

# 34. TIỂU HẠN

Nếu hỗ trợ:

```ts
MinorPeriod
```

phải có calculation engine riêng.

Không trộn:

```text
Đại hạn
Tiểu hạn
Lưu niên
```

thành một “vận hạn” chung chung.

---

# 35. LƯU NIÊN

Nếu user chọn:

```text
2026
```

output phải nói rõ:

```text
Lưu niên 2026
```

Không gọi đơn giản:

```text
“Vận mệnh năm 2026”
```

nếu engine chưa tính đủ các tầng liên quan.

---

# 36. YEARLY FORECAST

Pipeline:

```text
Natal Chart
↓
Major Period
↓
Minor Period
↓
Annual Position
↓
Annual Stars
↓
Annual Transformations
↓
Interaction
↓
Interpretation
```

Nếu thiếu một tầng, phải nói rõ engine đang ở depth nào.

Không giả vờ rằng:

```text
2026
+
nạp âm năm
=
personal forecast
```

---

# 37. MONTHLY FORECAST

Nếu hỗ trợ tháng:

```text
Year
→ Month
```

phải có calendar/rule riêng.

Không dùng:

```text
year theme / 12
```

---

# 38. TIMELINE

Frontend nên hiển thị:

```text
BẢN MỆNH
   ↓
ĐẠI HẠN
   ↓
TIỂU HẠN
   ↓
LƯU NIÊN
   ↓
THÁNG
```

User phải hiểu:

```text
“Tại sao năm này được luận như vậy?”
```

---

# 39. KHÔNG DÙNG SCORE 59/100

Không tạo:

```text
Mệnh: 59/100
Quan Lộc: 77/100
Tài Bạch: 69/100
```

trừ khi có một scoring framework được định nghĩa hoàn chỉnh và công khai.

Ưu tiên:

```text
Chủ đề nổi bật
Điểm thuận
Điểm cần lưu ý
Mức độ nhấn mạnh
```

Ví dụ:

```text
Sự nghiệp:
Nổi bật

Tài chính:
Hỗn hợp

Quan hệ:
Cần chú ý
```

Nếu dùng internal score:

```text
không expose raw number.
```

---

# 40. NO “POSITIVE / NEGATIVE” OVERSIMPLIFICATION

Một sao không phải:

```text
good
bad
```

mà:

```text
constructive expression
+
challenging expression
```

Ví dụ:

```text
Tham Lang
```

có thể liên quan:

```text
resourcefulness
ambition
sociality
desire
opportunity
```

và shadow:

```text
excess
distraction
overindulgence
```

Context quyết định expression.

---

# 41. STAR INTERACTION > STAR LABEL

Không:

```text
Thất Sát = mạnh mẽ
```

Mà:

```text
Thất Sát
+
Quan Lộc
+
Miếu
+
Thiên Khôi
+
Tứ Hóa
+
Mệnh cluster
```

→ interpretation.

---

# 42. TAM PHƯƠNG TỨ CHÍNH PHẢI HIỆN TRONG OUTPUT

Ví dụ user xem Quan Lộc:

```text
QUAN LỘC
```

phải có:

```text
Cung chính:
...

Tam hợp:
...

Xung chiếu:
...

Giáp cung:
...

Tứ Hóa liên quan:
...

Kết luận:
...
```

Không chỉ:

```text
Sao tại Quan Lộc:
...
```

---

# 43. “WHY THIS INTERPRETATION?”

Mỗi section phải có:

```text
Vì sao hệ thống luận như vậy?
```

Ví dụ:

```text
1. Quan Lộc có Thất Sát
2. Trạng thái sao = ...
3. Tam phương có ...
4. Thiên Di xung chiếu có ...
5. Hóa Quyền tác động ...
```

Đây là evidence.

Không phải chain-of-thought.

Chỉ expose **facts/rules đã dùng**, không expose reasoning nội bộ dài dòng.

---

# 44. OUTPUT CONTRACT

API:

```ts
interface TuViResult {
  version: {
    calendar: string;
    chartRules: string;
    interpretationRules: string;
    templates: string;
  };

  input: NormalizedBirthData;

  chart: TuViChart;

  analysis: {
    core: CoreChartSynthesis;

    palaces: PalaceAnalysis[];

    transformations: TransformationAnalysis[];

    majorPeriod?: PeriodAnalysis;

    annual?: AnnualAnalysis;
  };

  synthesis: TuViSynthesis;

  guidance: Guidance[];
}
```

---

# 45. PALACE ANALYSIS

```ts
interface PalaceAnalysis {
  palace: PalaceType;

  headline: string;

  dominantThemes: ThemeId[];

  strengths: ThemeId[];

  tensions: ThemeId[];

  evidence: TuViEvidence[];

  relatedPalaces: {
    type: PalaceType;
    role:
      | "tam_hop"
      | "xung_chieu"
      | "giap_cung";
  }[];

  interpretation: GeneratedText[];

  caveats?: string[];
}
```

---

# 46. GENERATED TEXT PHẢI TRACE ĐƯỢC

Không:

```ts
interpretation: "Sự nghiệp của bạn..."
```

mà:

```ts
interface GeneratedText {
  text: string;

  templateId: string;

  ruleIds: string[];

  evidenceIds: string[];
}
```

Như vậy:

```text
text
→ template
→ rule
→ evidence
→ chart data
```

đều truy ngược được.

---

# 47. TỔNG HỢP CUỐI

Không tổng hợp bằng cách nối 12 đoạn văn.

Phải:

```text
12 palace analyses
+
core Mệnh/Thân
+
dominant patterns
+
Tứ Hóa
+
major period
+
annual
```

→ theme aggregation.

Ví dụ:

```text
dominant themes:
independence
career
adaptation
financial caution
relationship responsibility
```

sau đó template synthesis.

---

# 48. SYNTHESIS TEMPLATE

```ts
interface TuViSynthesis {
  headline: string;

  corePattern: string;

  strengths: string[];

  tensions: string[];

  keyLifeAreas: {
    domain: string;
    summary: string;
    evidence: string[];
  }[];

  periodFocus?: string;

  practicalReflection: string[];

  evidence: TuViEvidence[];
}
```

Không viết:

```text
“Bạn có số giàu.”
```

mà:

```text
“Cấu trúc Tài Bạch và Quan Lộc cho thấy chủ đề
quản trị nguồn lực và năng lực tạo thu nhập nổi bật;
tuy nhiên các yếu tố X/Y khiến tính ổn định cần được
xem xét cùng bối cảnh vận hạn.”
```

---

# 49. PRACTICAL GUIDANCE

Advice phải tách khỏi traditional interpretation.

Ví dụ:

```text
TRUYỀN THỐNG:
Cung Tài Bạch nhấn mạnh chủ đề...

ỨNG DỤNG:
Có thể dùng điều này như gợi ý để theo dõi...

KHÔNG:
“Bạn nên đầu tư cổ phiếu X.”
```

Không đưa quyết định tài chính cụ thể dựa trên lá số.

---

# 50. HEALTH

Tương tự:

```text
TRUYỀN THỐNG:
Cấu trúc Tật Ách thường được diễn giải theo...

ỨNG DỤNG:
Có thể chú ý tới nghỉ ngơi, stress, thói quen sinh hoạt.

KHÔNG:
Chẩn đoán bệnh.
```

---

# 51. DATA → RULE → INTERPRETATION → ACTION

Đây là nguyên tắc bắt buộc.

Mọi output phải thuộc một trong:

```text
FACT
RULE
INTERPRETATION
GUIDANCE
```

Không trộn chúng.

Ví dụ:

```text
FACT:
Quan Lộc có Thất Sát.

RULE:
Thất Sát tại vị trí này kích hoạt theme...

INTERPRETATION:
Theo hệ thống Tử Vi đang sử dụng...

GUIDANCE:
Trong thực tế có thể xem đây là gợi ý...
```

---

# 52. SCHOOL CONFIGURATION

Tử Vi có nhiều cách quy tắc/phiên bản.

Không hard-code mọi thứ vào engine.

Tạo:

```ts
interface TuViSchoolConfig {
  id: string;

  name: string;

  calendarRules: CalendarRules;

  hourBoundaryRule: string;

  majorPeriodRule: string;

  transformationRule: string;

  starPlacementRule: string;

  strengthTableVersion: string;
}
```

Mọi kết quả phải biết:

```text
school/config version
```

---

# 53. KHÔNG TRỘN TỬ VI VỚI BÁT TỰ

Nếu engine chỉ tạo:

```text
năm
tháng
ngày
giờ
Can Chi
```

không gọi là:

```text
Bát Tự luận giải
```

trừ khi thực sự có Bát Tự engine.

Nếu muốn hiển thị:

```text
Thiên bàn
Can Chi
Ngũ hành
```

thì gọi đúng tên.

Tử Vi và Bát Tự phải là:

```text
separate domain modules
```

---

# 54. CÂN LƯỢNG

Nếu có:

```text
4 lượng 1 chỉ
```

thì tách thành module:

```text
CanLuongEngine
```

Không để nó làm thay đổi logic Tử Vi chính.

Output:

```text
Phương pháp Cân Xương Tính Số
```

phải được ghi rõ.

Không gọi:

```text
điểm số Tử Vi
```

---

# 55. VALIDATION ENGINE

Tạo:

```ts
validateChart(chart)
```

phải kiểm tra:

```text
12 cung có đủ?
Mỗi cung đúng một địa chi?
Mệnh có đúng?
Thân có đúng?
14 chính tinh có được an?
Tuần đúng?
Triệt đúng?
Tứ Hóa đúng?
Đại hạn có đúng thứ tự?
```

Nếu fail:

```text
DO NOT GENERATE INTERPRETATION
```

Đây là P0.

---

# 56. GOLDEN CHART TESTS

Phải có một bộ lá số chuẩn đã kiểm chứng độc lập.

Mỗi test:

```text
INPUT
→
expected:
Can Chi
Mệnh
Thân
Cục
12 cung
14 chính tinh
Tứ Hóa
Tuần/Triệt
Đại hạn
```

So sánh toàn bộ chart object.

Không chỉ snapshot UI.

---

# 57. REGRESSION TEST

Khi sửa một rule:

```text
calendar
star placement
transformation
major period
```

phải chạy lại toàn bộ golden charts.

Nếu chart thay đổi:

```text
show diff
```

Ví dụ:

```text
Mệnh:
before = Ngọ
after = Tỵ

Quan Lộc:
before = ...
after = ...
```

Không cho merge nếu chưa xác nhận.

---

# 58. DEBUG CHART

Thêm:

```ts
debugChart(input)
```

trả:

```json
{
  "calendar": {},
  "destiny": {},
  "palacePlacement": {},
  "starPlacement": {},
  "transformations": {},
  "periods": {},
  "validation": {}
}
```

Đây là công cụ bắt buộc trước khi làm UI đẹp.

---

# 59. DETERMINISM TEST

```ts
const resultA = generateChart(input);
const resultB = generateChart(input);

expect(resultA).toEqual(resultB);
```

Phải pass.

Không được có:

```text
Math.random()
Date.now()
AI API
non-deterministic sorting
```

trong chart calculation.

---

# 60. SORTING

Mọi array phải có deterministic ordering.

Ví dụ stars:

```text
major stars
→ supporting stars
→ auspicious
→ challenging
```

hoặc một canonical order được định nghĩa.

Không dựa vào database insertion order.

---

# 61. VERSIONING

Mỗi output:

```json
{
  "version": {
    "calendar": "1.0.0",
    "chart": "1.0.0",
    "rules": "1.0.0",
    "templates": "1.0.0"
  }
}
```

Vì:

```text
same birth data
```

có thể cho kết quả khác nếu:

```text
rule version
```

thay đổi.

---

# 62. FRONTEND

Frontend chỉ render:

```text
ChartOverview
DestinySummary
MệnhThân
12Palaces
TamPhuongTuChinh
TuHoa
DaiHanTimeline
AnnualForecast
EvidencePanel
```

Không có:

```text
if star === ...
if palace === ...
```

để luận.

---

# 63. UI CẤU TRÚC

### LEVEL 1 — TỔNG QUAN

```text
Mệnh
Thân
Cục
Mệnh/Cục relation
Can Chi
```

### LEVEL 2 — CỐT LÕI

```text
Mệnh
Thân
Mệnh + Thân interaction
```

### LEVEL 3 — TAM PHƯƠNG TỨ CHÍNH

```text
Mệnh
↙   ↓   ↘
Tài  Quan  Di
```

### LEVEL 4 — 12 CUNG

Mỗi cung:

```text
Chính tinh
Phụ tinh
Miếu/Vượng/Đắc/Hãm
Tuần/Triệt
Tứ Hóa
Tam hợp
Xung chiếu
Giáp cung
Interpretation
Evidence
```

### LEVEL 5 — TỨ HÓA

```text
Lộc
Quyền
Khoa
Kỵ
```

### LEVEL 6 — VẬN HẠN

```text
Đại hạn
Tiểu hạn
Lưu niên
```

### LEVEL 7 — TỔNG HỢP

```text
3–5 chủ đề nổi bật
Điểm thuận
Điểm cần chú ý
Xu hướng phát triển
```

---

# 64. “WHY?”

Mỗi cung có:

```text
Vì sao hệ thống luận như vậy?
```

Ví dụ:

```text
Nguồn dữ liệu:
• Quan Lộc: Thất Sát
• Trạng thái: ...
• Tam hợp: ...
• Xung chiếu: ...
• Tứ Hóa: ...
• Tuần/Triệt: ...

Rules:
• RULE_QAN_LOC_...
• RULE_STAR_...
```

Chỉ hiển thị **facts + rule names + kết quả**, không cần expose internal implementation details.

---

# 65. KHÔNG DÙNG “AI-LIKE” TEXT

Không viết kiểu:

```text
“Có vẻ vũ trụ đang muốn nói rằng...”
```

Không viết:

```text
“Vũ trụ gửi bạn thông điệp...”
```

MYSTICOS định vị là:

```text
Khảo Cứu
```

nên ngôn ngữ nên là:

```text
Theo hệ thống Tử Vi đang sử dụng...
Cấu trúc lá số cho thấy...
Yếu tố nổi bật là...
Điểm cần đối chiếu là...
```

---

# 66. LANGUAGE TEMPLATE

Tách:

```text
Vietnamese interpretation templates
```

khỏi engine.

Ví dụ:

```ts
templates.palace.primaryTheme
templates.palace.tension
templates.palace.support
templates.period.transition
templates.annual.focus
```

Engine chỉ trả:

```text
theme = career_autonomy
```

Template quyết định cách viết.

---

# 67. KHÔNG TẠO 12 × 1000 ĐOẠN VĂN

Không tạo:

```text
12 cung
×
14 chính tinh
×
phụ tinh
×
Tứ Hóa
×
12 năm
```

thành hàng chục nghìn paragraph hard-code.

Phải composition:

```text
STAR SEMANTICS
+
PALACE SEMANTICS
+
RELATIONSHIP RULES
+
TRANSFORMATION RULES
+
PERIOD RULES
+
TEMPLATES
```

---

# 68. DEFINITION OF DONE

Chỉ coi engine hoàn thành khi:

### Chart accuracy

Input giống nhau → chart giống nhau.

### Calendar accuracy

Can Chi / lịch âm / giờ sinh đúng theo school config.

### Structural accuracy

12 cung / Mệnh / Thân / Cục / sao đúng.

### Relationship accuracy

Tam phương tứ chính được tính đúng.

### Transformation accuracy

Tứ Hóa được tính đúng.

### Period accuracy

Đại hạn / tiểu hạn / lưu niên được tính riêng biệt.

### Interpretation traceability

Mọi kết luận truy được về chart facts + rules.

### Determinism

Không AI, không randomness trong interpretation.

### Separation

```text
Data
≠
Rules
≠
Interpretation
≠
Language
≠
UI
```

---

# 69. FINAL ARCHITECTURE

```text
                  USER INPUT
                       │
                       ▼
              ┌─────────────────┐
              │ CALENDAR ENGINE │
              └────────┬────────┘
                       ▼
              ┌─────────────────┐
              │ CHART BUILDER   │
              └────────┬────────┘
                       ▼
              ┌─────────────────┐
              │ CHART VALIDATOR │
              └────────┬────────┘
                       ▼
        ┌─────────────────────────────┐
        │       CANONICAL CHART       │
        └──────────────┬──────────────┘
                       │
       ┌───────────────┼────────────────┐
       ▼               ▼                ▼
    PALACES           STARS          TỨ HÓA
       │               │                │
       └───────────────┼────────────────┘
                       ▼
              ┌─────────────────┐
              │ RELATION ENGINE │
              │ Tam Phương      │
              │ Xung Chiếu      │
              │ Giáp Cung       │
              │ Star Patterns   │
              └────────┬────────┘
                       ▼
              ┌─────────────────┐
              │ PERIOD ENGINE   │
              │ Đại Hạn         │
              │ Tiểu Hạn        │
              │ Lưu Niên        │
              └────────┬────────┘
                       ▼
              ┌─────────────────┐
              │  RULE ENGINE    │
              └────────┬────────┘
                       ▼
              ┌─────────────────┐
              │ EVIDENCE GRAPH  │
              └────────┬────────┘
                       ▼
              ┌─────────────────┐
              │ SYNTHESIS       │
              └────────┬────────┘
                       ▼
              ┌─────────────────┐
              │ TEMPLATE ENGINE │
              └────────┬────────┘
                       ▼
                     JSON
                       │
                       ▼
                     UI
```

---

# 70. NGUYÊN TẮC CUỐI CÙNG

Không thiết kế Tử Vi MYSTICOS như:

```text
LÁ SỐ
+
12 ĐOẠN VĂN
=
TỬ VI
```

Mà:

```text
BIRTH DATA
↓
CANONICAL CHART
↓
STRUCTURAL RELATIONSHIPS
↓
TRADITIONAL RULES
↓
EVIDENCE
↓
INTERPRETATION
↓
SYNTHESIS
```

Đặc biệt:

```text
MỆNH
≠
CHỈ CUNG MỆNH
```

mà:

```text
MỆNH
+
THÂN
+
TÀI
+
QUAN
+
DI
+
TAM PHƯƠNG TỨ CHÍNH
+
TỨ HÓA
+
TUẦN TRIỆT
+
CÁC TỔ HỢP SAO
```

Tương tự:

```text
2026
≠
“năm Bính Ngọ”
```

mà:

```text
LÁ SỐ GỐC
+
ĐẠI HẠN
+
TIỂU HẠN
+
LƯU NIÊN
+
LƯU TINH / LƯU HÓA
+
QUAN HỆ CUNG
```

nếu engine tuyên bố hỗ trợ đầy đủ các tầng đó.

**Ưu tiên số 1: xác minh chart engine trước.**

Nếu Mệnh, Thân, cung, sao hoặc Tứ Hóa sai thì không được tiếp tục viết interpretation.

**Không dùng AI để che lấp lỗi tính toán.**

Hãy xây hệ thống mà một developer có thể mở:

```text
Birth Data
→ Chart
→ Rule
→ Evidence
→ Output
```

và kiểm tra từng bước một cách deterministic.
