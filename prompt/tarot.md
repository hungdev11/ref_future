Bạn là Senior System Architect chuyên thiết kế **deterministic rule-based interpretation engine** bằng TypeScript/Next.js.

Tôi đang xây dựng module Tarot cho MYSTICOS.

## ĐIỀU KIỆN TUYỆT ĐỐI

HỆ THỐNG TAROT NÀY **KHÔNG ĐƯỢC SỬ DỤNG AI / LLM / GENERATIVE MODEL**.

Không OpenAI API.
Không Gemini.
Không Claude.
Không local LLM.
Không prompt generation.
Không gọi external AI service.

Toàn bộ kết quả phải được tạo bởi:

```text
DATA
+
RULES
+
WEIGHTS
+
RELATIONSHIPS
+
DETERMINISTIC TEMPLATES
```

và phải đảm bảo:

```text
Same Input
+
Same Tarot Dataset Version
+
Same Rule Version
=
Same Output
```

Không được có randomness trong interpretation.

Randomness, nếu có, chỉ được dùng ở bước **rút bài**, không được dùng trong bước luận.

---

# 01. MỤC TIÊU HỆ THỐNG

Thiết kế Tarot Engine theo pipeline:

```text
USER INPUT
    ↓
VALIDATION
    ↓
NORMALIZATION
    ↓
QUESTION CLASSIFICATION
    ↓
CARD LOOKUP
    ↓
POSITION LOOKUP
    ↓
ORIENTATION RULE
    ↓
THEME ACTIVATION
    ↓
RULE MATCHING
    ↓
CARD-POSITION INTERPRETATION
    ↓
CARD-TO-CARD RELATIONSHIP
    ↓
PATTERN DETECTION
    ↓
CONFLICT RESOLUTION
    ↓
SYNTHESIS
    ↓
GUIDANCE
    ↓
DETERMINISTIC TEXT RENDERING
    ↓
JSON OUTPUT
```

Không có bước:

```text
→ AI interpretation
→ LLM synthesis
→ generated prose
```

---

# 02. KIẾN TRÚC 4 LỚP

Thiết kế thành 4 layer rõ ràng:

```text
┌─────────────────────────────┐
│       PRESENTATION          │
│        Next.js UI           │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│       INTERPRETATION        │
│  deterministic rule engine  │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│       RULES / LOGIC         │
│ relationships / patterns    │
└──────────────┬──────────────┘
               │
┌──────────────▼──────────────┐
│       TAROT KNOWLEDGE       │
│ 78 cards / spreads / themes │
└─────────────────────────────┘
```

Frontend không được chứa Tarot logic.

Tarot knowledge không được nằm rải rác trong JSX.

---

# 03. CARD DATABASE

Thiết kế dữ liệu cho 78 lá.

Ví dụ:

```ts
interface TarotCardDefinition {
  id: string;
  name: string;

  arcana: "major" | "minor";

  suit?: "wands" | "cups" | "swords" | "pentacles";

  number?: number;

  element?: "fire" | "water" | "air" | "earth";

  keywords: string[];

  themes: ThemeId[];

  upright: OrientationDefinition;

  reversed: OrientationDefinition;

  dimensions: TarotDimensions;
}
```

Không lưu nguyên một đoạn văn dài làm source of truth.

Ví dụ KHÔNG:

```ts
meaning: "Bạn đang ở giai đoạn..."
```

Thay vào đó:

```ts
themes: [
  "investment",
  "evaluation",
  "patience",
  "waiting",
  "harvest"
]
```

Sau đó Rule Engine mới quyết định text.

---

# 04. CONTROLLED THEME SYSTEM

Tạo một danh sách ThemeId cố định.

Ví dụ:

```ts
type ThemeId =
  | "patience"
  | "waiting"
  | "evaluation"
  | "investment"
  | "harvest"
  | "departure"
  | "loss"
  | "hope"
  | "renewal"
  | "conflict"
  | "clarity"
  | "uncertainty"
  | "freedom"
  | "attachment"
  | "commitment"
  | "transition"
  | "transformation"
  | "healing"
  | "ambition"
  | "action"
  | "rest"
  | "communication"
  | "introspection"
  | "abundance"
  | "scarcity";
```

Phải có:

```ts
interface ThemeDefinition {
  id: ThemeId;

  category:
    | "emotion"
    | "action"
    | "cognition"
    | "relationship"
    | "material"
    | "career"
    | "spiritual"
    | "transition"
    | "conflict";

  label: string;

  relatedThemes: ThemeId[];

  opposingThemes: ThemeId[];
}
```

Theme vocabulary phải được kiểm soát.

Không cho từng card tự tạo keyword mới.

---

# 05. CARD WEIGHTS

Mỗi card có semantic weight.

Ví dụ:

```ts
interface ThemeWeight {
  theme: ThemeId;
  weight: 1 | 2 | 3 | 4 | 5;
}
```

7 Pentacles:

```ts
[
  { theme: "evaluation", weight: 5 },
  { theme: "investment", weight: 5 },
  { theme: "patience", weight: 4 },
  { theme: "waiting", weight: 4 },
  { theme: "harvest", weight: 3 }
]
```

Các số này chỉ là:

```text
semantic priority
```

KHÔNG phải xác suất.

Không hiển thị:

```text
Evaluation = 83%
```

---

# 06. ORIENTATION ENGINE

Upright và reversed là hai semantic state.

Không:

```ts
reversed ? negative : positive
```

Mà:

```ts
interface OrientationDefinition {
  primaryThemes: ThemeWeight[];

  secondaryThemes: ThemeWeight[];

  shadowThemes: ThemeWeight[];

  mechanisms: (
    | "blocked"
    | "delayed"
    | "excessive"
    | "internalized"
    | "distorted"
    | "misdirected"
    | "avoided"
  )[];
}
```

Ví dụ:

```text
7 Pentacles Upright:

evaluation
investment
patience
waiting
harvest
```

7 Pentacles Reversed:

```text
impatience
frustration
poor_evaluation
sunk_cost
premature_decision
```

Các semantic này được khai báo trước.

Engine chỉ lookup.

---

# 07. POSITION DATABASE

Mỗi position có rules riêng.

```ts
interface PositionDefinition {
  id: string;

  label: string;

  role:
    | "situation"
    | "challenge"
    | "advice"
    | "past"
    | "present"
    | "future"
    | "outcome"
    | "self"
    | "external"
    | "internal"
    | "environment";

  preferredThemeCategories: string[];

  interpretationRules: PositionRule[];
}
```

Ví dụ Challenge:

```text
Position:
Challenge

Rule:

CARD THEME
+
CHALLENGE POSITION

→ chuyển constructive theme
thành friction / difficulty / excess / avoidance
```

Ví dụ:

```text
patience
+
Challenge
```

không tự động nghĩa:

```text
“Bạn cần kiên nhẫn.”
```

Có thể render:

```text
“Khía cạnh thử thách nằm ở việc chờ đợi,
đánh giá kết quả chưa đủ rõ ràng,
hoặc khó xác định thời điểm nên tiếp tục hay điều chỉnh.”
```

Text này phải được tạo từ deterministic template.

---

# 08. QUESTION CLASSIFICATION — KHÔNG AI

Không dùng AI để hiểu câu hỏi.

Xây rule-based classifier.

Ví dụ:

```ts
const questionRules = [
  {
    keywords: ["công việc", "nghề", "sự nghiệp", "job"],
    domain: "career"
  },
  {
    keywords: ["tình yêu", "người yêu", "mối quan hệ"],
    domain: "love"
  },
  {
    keywords: ["tiền", "tài chính", "thu nhập"],
    domain: "finance"
  }
];
```

Input:

```text
"Công việc hiện tại của tôi thế nào?"
```

→

```json
{
  "domain": "career"
}
```

Nếu không match:

```text
domain = general
```

Không được đoán phức tạp.

---

# 09. CONTEXT RULES

Mỗi domain có semantic modifier.

Ví dụ:

```ts
interface ContextModifier {
  domain: QuestionDomain;

  themeBoosts: ThemeWeight[];

  themeSuppressions: ThemeWeight[];

  preferredCategories: string[];
}
```

Career:

```text
career
work
achievement
stability
direction
effort
resources
```

Love:

```text
emotion
connection
communication
attachment
commitment
boundaries
```

Question context chỉ thay đổi **weight**, không thay đổi bản chất card.

---

# 10. THEME ACTIVATION ENGINE

Đây là trung tâm.

Input:

```ts
{
  card,
  position,
  orientation,
  context
}
```

Output:

```ts
interface ActivatedTheme {
  theme: ThemeId;

  score: number;

  source:
    | "card"
    | "orientation"
    | "position"
    | "context"
    | "interaction";

  priority:
    | "primary"
    | "secondary"
    | "supporting";
}
```

Ví dụ:

```text
7 Pentacles
+
Career
+
Present
+
Upright
```

có thể:

```text
evaluation = 15
investment = 14
patience = 11
waiting = 10
harvest = 7
```

Sau đó normalize:

```text
PRIMARY:
evaluation
investment

SECONDARY:
patience
waiting

SUPPORTING:
harvest
```

Các con số chỉ dùng nội bộ.

---

# 11. RULE COMPOSITION

Không viết:

```ts
if card === "seven-of-pentacles"
```

ở khắp codebase.

Thay vào đó:

```ts
RuleEngine.apply([
  cardRules,
  orientationRules,
  positionRules,
  contextRules
]);
```

Ví dụ:

```ts
interface InterpretationRule {
  id: string;

  when: RuleCondition[];

  activate: RuleEffect[];

  priority: number;
}
```

---

# 12. RULE CONDITION

Rule condition có thể:

```ts
type RuleCondition =
  | {
      type: "card";
      cardId: string;
    }
  | {
      type: "theme";
      theme: ThemeId;
    }
  | {
      type: "position";
      positionId: string;
    }
  | {
      type: "orientation";
      value: "upright" | "reversed";
    }
  | {
      type: "domain";
      value: QuestionDomain;
    }
  | {
      type: "themePresent";
      theme: ThemeId;
    }
  | {
      type: "themeCount";
      theme: ThemeId;
      min: number;
    };
```

---

# 13. RULE EFFECT

Ví dụ:

```ts
type RuleEffect =
  | {
      type: "boostTheme";
      theme: ThemeId;
      amount: number;
    }
  | {
      type: "suppressTheme";
      theme: ThemeId;
      amount: number;
    }
  | {
      type: "addPattern";
      pattern: string;
    }
  | {
      type: "addRelationship";
      relationship: string;
    }
  | {
      type: "addGuidance";
      guidanceId: string;
    };
```

Như vậy engine hoàn toàn deterministic.

---

# 14. POSITION TRANSFORMATION

Đây là phần rất quan trọng.

Cùng:

```text
Theme = patience
```

nhưng:

```text
Present
```

→

```text
“hiện tại đang đòi hỏi sự kiên nhẫn”
```

Challenge:

```text
“sự kiên nhẫn đang trở thành điểm gây khó khăn”
```

Advice:

```text
“cân nhắc kiên nhẫn trước khi hành động”
```

Future:

```text
“xu hướng sắp tới có thể tiếp tục nhấn mạnh việc chờ và đánh giá”
```

Các câu trên phải được sinh bằng template/rule.

---

# 15. DETERMINISTIC LANGUAGE TEMPLATES

Tạo:

```text
/lib/tarot/templates/
```

Ví dụ:

```ts
const templates = {
  present: {
    evaluation:
      "Hiện tại nổi bật nhu cầu đánh giá lại kết quả và những gì đã đầu tư."
  },

  challenge: {
    evaluation:
      "Thách thức nằm ở việc đánh giá liệu hướng đi hiện tại còn xứng đáng với nguồn lực đã bỏ ra."
  },

  advice: {
    evaluation:
      "Nên dành thời gian đánh giá kết quả thực tế trước khi quyết định bước tiếp theo."
  }
};
```

Nhưng KHÔNG tạo một template cho từng:

```text
card × position × context
```

Thay vào đó:

```text
theme × position
```

để tránh explosion.

---

# 16. CARD-SPECIFIC PHRASES

Một số card có nuances riêng.

Cho phép:

```ts
cardModifiers
```

Ví dụ:

```ts
{
  card: "seven-of-pentacles",
  theme: "evaluation",

  modifiers: [
    "after sustained investment",
    "before expected harvest"
  ]
}
```

Engine compose:

```text
position template
+
theme
+
card modifier
```

---

# 17. CARD × CARD RELATIONSHIP

Không hard-code tất cả combination.

Dùng semantic relationships.

Ví dụ:

```text
Card A:
patience

Card B:
impulsivity

→ contrast
```

Hoặc:

```text
Card A:
evaluation

Card B:
departure

→ progression
```

Schema:

```ts
interface RelationshipRule {
  id: string;

  when: {
    sourceThemes: ThemeId[];
    targetThemes: ThemeId[];
  };

  relationship:
    | "reinforcement"
    | "contrast"
    | "progression"
    | "tension"
    | "transition"
    | "resolution";

  priority: number;
}
```

---

# 18. DIRECTION MATTERS

Relationship không phải lúc nào cũng symmetric.

Ví dụ:

```text
evaluation → departure
```

khác:

```text
departure → evaluation
```

Với PPF:

```text
Past → Present → Future
```

direction có ý nghĩa.

Vì vậy:

```ts
sourcePosition
targetPosition
```

phải được giữ.

---

# 19. SPREAD-SPECIFIC RULES

Mỗi spread có synthesis rules riêng.

Ví dụ PPF:

```text
Past → Present → Future
```

Rules:

```text
if Past.theme == X
and Present.theme == Y

→ detect transition X → Y
```

SCA:

```text
Situation → Challenge → Advice
```

Rules:

```text
Situation theme
vs
Challenge theme
→ identify friction

Challenge theme
vs
Advice theme
→ identify response
```

Không dùng cùng một algorithm cho tất cả spread.

---

# 20. PATTERN DETECTION

Pattern rules:

```ts
interface PatternRule {
  id: string;

  conditions: RuleCondition[];

  result: {
    patternId: string;
    priority: number;
  };
}
```

Ví dụ:

```text
evaluation
+
departure
+
renewal
```

→

```text
"reassessment-to-renewal"
```

Output:

```text
“Trải bài cho thấy một chuỗi đánh giá → buông bỏ →
tái định hướng.”
```

Đây là template cố định.

Không AI.

---

# 21. DOMINANT THEME

Không dùng dominant suit làm dominant narrative.

Tính:

```text
theme score
+
position importance
+
question relevance
+
relationship reinforcement
```

Sau đó:

```text
highest themes
=
dominant themes
```

Ví dụ:

```text
evaluation 42
transition 39
hope 31
```

→

```text
Central theme:
evaluation
Secondary:
transition
Supporting:
hope
```

---

# 22. CONFLICT RESOLUTION

Nếu có:

```text
hope
+
loss
```

không chọn:

```text
hope wins
```

Mà giữ cả hai:

```text
primary tension:
loss ↔ hope
```

Rule:

```text
opposing themes
+
same spread
=
tension
```

Sau đó position quyết định vai trò.

Ví dụ:

```text
Loss = Situation
Hope = Advice
```

→

```text
“Trải bài chuyển từ việc nhìn nhận mất mát
sang việc tìm lại hướng đi.”
```

---

# 23. SYNTHESIS MUST BE RULE-BASED

Synthesis không được generate tự do.

Có:

```ts
interface SynthesisTemplate {
  id: string;

  when: RuleCondition[];

  structure: string[];

  priority: number;
}
```

Ví dụ:

```text
Pattern:
evaluation → departure → renewal

Template:

“Trải bài bắt đầu từ việc đánh giá những gì đã đầu tư,
tiếp đến là nhận ra điều không còn phù hợp,
và cuối cùng mở ra nhu cầu tái định hướng.”
```

Engine chỉ chọn template phù hợp.

---

# 24. OUTPUT MUST BE TRACEABLE

Mỗi câu synthesis phải có:

```ts
interface GeneratedSentence {
  text: string;

  templateId: string;

  evidence: string[];

  rulesApplied: string[];
}
```

Ví dụ:

```json
{
  "text": "Trải bài nhấn mạnh nhu cầu đánh giá lại hướng đi hiện tại.",
  "templateId": "synthesis.reassessment.01",
  "evidence": [
    "card:seven-of-pentacles",
    "theme:evaluation",
    "position:present"
  ],
  "rulesApplied": [
    "theme.evaluation.primary",
    "position.present.evaluation"
  ]
}
```

Đây là yêu cầu quan trọng.

MYSTICOS phải biết:

**“Tại sao hệ thống nói câu này?”**

---

# 25. OUTPUT CONTRACT

API:

```ts
tarotEngine.read(input)
```

trả:

```ts
interface TarotReadingResult {
  version: {
    dataset: string;
    rules: string;
  };

  facts: {
    draws: TarotDraw[];
  };

  analysis: {
    cardInterpretations: CardInterpretation[];

    activatedThemes: ActivatedTheme[];

    relationships: CardRelationship[];

    patterns: DetectedPattern[];

    conflicts: ThemeConflict[];
  };

  synthesis: {
    centralThemes: ThemeId[];

    sentences: GeneratedSentence[];

    narrative: string;
  };

  guidance: {
    items: GeneratedSentence[];

    reflectionQuestions: GeneratedSentence[];
  };
}
```

---

# 26. DETERMINISM TEST

Bắt buộc test:

```ts
const a = tarotEngine.read(input);
const b = tarotEngine.read(input);

expect(a).toEqual(b);
```

1000 lần cũng phải giống nhau.

Nếu có random:

```text
random chỉ được phép ở draw stage.
```

Không random ở:

* theme selection;
* interpretation;
* synthesis;
* template selection.

---

# 27. NO AI TEST

Codebase phải không có dependency/API call:

```text
OpenAI
Anthropic
Gemini
LLM
AI SDK
```

Tarot interpretation phải chạy offline hoàn toàn.

Test:

```text
disconnect internet
→ tarotEngine.read(input)
→ vẫn hoạt động.
```

---

# 28. FRONTEND TEST

Frontend không được chứa:

```text
if cardName...
if reversed...
if suit...
```

để tự diễn giải.

Frontend chỉ:

```text
render(result)
```

---

# 29. DATABASE VERSIONING

Tarot knowledge phải versioned:

```ts
datasetVersion = "1.0.0"
rulesVersion = "1.0.0"
templateVersion = "1.0.0"
```

Vì khi thay đổi meaning của một card:

```text
7 Pentacles
```

thì output lịch sử có thể thay đổi.

Do đó result phải biết:

```text
reading created with:
dataset 1.0.0
rules 1.0.0
templates 1.0.0
```

---

# 30. DEBUG MODE

Phải có:

```ts
debug: true
```

Output:

```json
{
  "debug": {
    "questionContext": {},
    "themeScores": [],
    "rulesMatched": [],
    "relationshipsDetected": [],
    "patternsDetected": [],
    "templatesSelected": []
  }
}
```

Ví dụ:

```text
Theme evaluation
score = 42

Sources:
- Seven of Pentacles +5
- Present position +3
- Career context +2
- Reinforced by neighboring card +4

Rules:
- CARD_EVALUATION_01
- POSITION_PRESENT_03
- CONTEXT_CAREER_02
```

---

# 31. TEST CASE BẮT BUỘC

Test ít nhất:

### Case 1

```text
7 Pentacles
Present
Upright
Career
```

### Case 2

```text
7 Pentacles
Challenge
Upright
Career
```

Output phải khác.

### Case 3

```text
7 Pentacles
Present
Reversed
Career
```

Output phải khác.

### Case 4

```text
7 Pentacles
Present
Upright
Love
```

Output phải thay đổi semantic emphasis.

### Case 5

```text
7 Pentacles
8 Cups
The Star
```

phải detect:

```text
evaluation
→ departure
→ renewal
```

nếu rules/semantic data đã định nghĩa đúng.

### Case 6

```text
7 Pentacles
Knight of Wands
```

phải detect:

```text
patience
vs
impulsivity
```

### Case 7

Cùng cards:

```text
PPF
```

vs:

```text
SCA
```

phải cho synthesis khác nhau.

---

# 32. CARD MODAL OUTPUT

Khi click card:

```text
7 OF PENTACLES
Upright
Position: Challenge
```

hiển thị:

```text
Ý nghĩa trong vị trí
---------------------
...

Theme chính
------------
Evaluation
Investment
Patience

Vai trò trong trải bài
----------------------
...

Liên kết với các lá khác
------------------------
...

Vì sao?
-------
Card:
Position:
Orientation:
Question:
Rules:
```

Không hiển thị bài viết generic:

```text
Career:
...
Love:
...
Finance:
...
```

trừ khi question/context thực sự yêu cầu.

---

# 33. RENDERING RULE

Text phải được tạo từ:

```text
Theme
+
Position
+
Context
+
Relationship
+
Pattern
```

Ví dụ:

```ts
renderTheme("evaluation")
```

không đủ.

Phải:

```ts
renderInterpretation({
  theme: "evaluation",
  position: "challenge",
  context: "career"
})
```

---

# 34. 78 CARD DATA PHẢI ĐƯỢC AUDIT

Không bắt đầu bằng UI.

Đầu tiên kiểm tra:

```text
78 cards
↓
semantic completeness
↓
orientation completeness
↓
theme consistency
↓
relationship compatibility
```

Tạo validation:

```ts
validateTarotDataset()
```

Nó phải báo:

```text
Missing reversed semantics:
X

Unknown ThemeId:
Y

Orphan Theme:
Z

Card without primary theme:
A
```

---

# 35. KHÔNG ĐƯỢC OVERENGINEER

Không cần machine learning.

Không cần embeddings.

Không cần vector database.

Không cần semantic search.

Không cần LLM.

Không cần NLP phức tạp.

Mục tiêu là:

```text
clean domain data
+
explicit rules
+
deterministic composition
```

---

# 36. KIẾN TRÚC FILE ĐỀ XUẤT

```text
/lib/tarot/
│
├── engine/
│   ├── tarot-engine.ts
│   ├── validator.ts
│   ├── normalizer.ts
│   ├── question-classifier.ts
│   ├── theme-engine.ts
│   ├── interpretation-engine.ts
│   ├── relationship-engine.ts
│   ├── pattern-engine.ts
│   ├── conflict-engine.ts
│   ├── synthesis-engine.ts
│   └── guidance-engine.ts
│
├── data/
│   ├── cards/
│   │   ├── major.ts
│   │   ├── wands.ts
│   │   ├── cups.ts
│   │   ├── swords.ts
│   │   └── pentacles.ts
│   │
│   ├── themes.ts
│   ├── positions.ts
│   ├── spreads.ts
│   ├── contexts.ts
│   └── relationships.ts
│
├── rules/
│   ├── card-rules.ts
│   ├── orientation-rules.ts
│   ├── position-rules.ts
│   ├── context-rules.ts
│   ├── relationship-rules.ts
│   ├── pattern-rules.ts
│   └── synthesis-rules.ts
│
├── templates/
│   ├── interpretation.ts
│   ├── relationships.ts
│   ├── synthesis.ts
│   └── guidance.ts
│
└── types/
    └── index.ts
```

---

# 37. QUAN TRỌNG: SEPARATE DATA FROM RULES

Không:

```ts
card = {
  meaning: "...",
  rule: "..."
}
```

Tách:

```text
CARD DATA
```

khỏi:

```text
RULES
```

Ví dụ:

```text
Seven of Pentacles
→ data

Challenge Position
→ data

Career Context
→ data

“investment + challenge”
→ rule

“evaluation → departure”
→ pattern rule
```

Điều này cho phép thay đổi rules mà không phải sửa 78 cards.

---

# 38. QUAN TRỌNG: SEPARATE RULES FROM LANGUAGE

Ví dụ rule:

```text
evaluation + challenge
```

không được lưu thành:

```text
“Bạn đang gặp khó khăn...”
```

Rule chỉ nói:

```text
activate:
evaluation_as_friction
```

Language layer mới biến thành:

```text
“Thách thức nằm ở việc đánh giá liệu hướng đi hiện tại
còn xứng đáng với nguồn lực đã bỏ ra hay không.”
```

Nhờ vậy sau này có thể:

```text
Vietnamese
English
```

mà không phải viết lại Tarot engine.

---

# 39. LANGUAGE MUST BE VERSIONED

```text
rules:
1.0.0

Vietnamese templates:
1.0.0

English templates:
1.0.0
```

Tarot logic không phụ thuộc ngôn ngữ.

---

# 40. FINAL ARCHITECTURE

Hệ thống cuối cùng phải đạt:

```text
                   INPUT
                     │
                     ▼
              ┌─────────────┐
              │ NORMALIZER  │
              └──────┬──────┘
                     ▼
          ┌────────────────────┐
          │ QUESTION CONTEXT   │
          └─────────┬──────────┘
                    │
      ┌─────────────┼─────────────┐
      ▼             ▼             ▼
    CARD         POSITION      ORIENTATION
      │             │             │
      └─────────────┼─────────────┘
                    ▼
           ┌────────────────┐
           │ THEME ENGINE   │
           └───────┬────────┘
                   ▼
           ┌────────────────┐
           │ RULE ENGINE    │
           └───────┬────────┘
                   ▼
           ┌────────────────┐
           │ EVIDENCE GRAPH │
           └───────┬────────┘
                   ▼
           ┌────────────────┐
           │ RELATIONSHIPS  │
           └───────┬────────┘
                   ▼
           ┌────────────────┐
           │ PATTERN ENGINE │
           └───────┬────────┘
                   ▼
           ┌────────────────┐
           │ CONFLICT ENGINE│
           └───────┬────────┘
                   ▼
           ┌────────────────┐
           │ SYNTHESIS      │
           └───────┬────────┘
                   ▼
           ┌────────────────┐
           │ TEMPLATE ENGINE│
           └───────┬────────┘
                   ▼
                JSON
                   │
                   ▼
                   UI
```

---

# 41. DEFINITION OF DONE

Không chấp nhận câu:

> “Đã hoàn thành Tarot interpretation engine.”

nếu chưa chứng minh:

### Deterministic

Cùng input → cùng output.

### Context-sensitive

Question thay đổi → semantic emphasis thay đổi.

### Position-sensitive

Position thay đổi → interpretation thay đổi.

### Orientation-sensitive

Upright/reversed thay đổi → interpretation thay đổi.

### Relationship-sensitive

Card bên cạnh thay đổi → relationship thay đổi.

### Spread-sensitive

Spread thay đổi → synthesis thay đổi.

### Explainable

Mỗi conclusion truy được:

```text
card
→ theme
→ position
→ rule
→ relationship
→ pattern
→ template
```

### Offline

Không có AI/API bên ngoài.

### Maintainable

Có thể sửa:

```text
Card data
```

mà không phá:

```text
Rule engine
```

Có thể sửa:

```text
Rule
```

mà không sửa:

```text
Frontend
```

Có thể đổi:

```text
Vietnamese template
```

mà không đổi:

```text
Tarot logic
```

---

# 42. NGUYÊN TẮC CUỐI CÙNG

MYSTICOS Tarot không phải:

```text
78 cards
+
78 paragraphs
```

Mà phải là:

```text
78 CARD DATA
+
CONTROLLED THEMES
+
POSITION MODEL
+
ORIENTATION MODEL
+
QUESTION CONTEXT
+
DETERMINISTIC RULES
+
RELATIONSHIP RULES
+
PATTERN RULES
+
SYNTHESIS RULES
+
LANGUAGE TEMPLATES
```

Từ đó:

```text
INPUT
→
FACTS
→
SEMANTIC FEATURES
→
RULES
→
EVIDENCE
→
RELATIONSHIPS
→
PATTERNS
→
SYNTHESIS
→
DETERMINISTIC TEXT
→
OUTPUT
```

**Không sử dụng AI ở bất kỳ bước nào của interpretation.**

Nếu cần “thông minh hơn”, hãy cải thiện:

```text
DATA
RULES
THEME TAXONOMY
RELATIONSHIP MODEL
PATTERN MODEL
TEMPLATE COVERAGE
```

chứ không thêm AI.
