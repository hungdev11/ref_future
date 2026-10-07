# Mysticos Canonical Result Schema Specification

**Status:** Canonical Data Specification  
**Package:** `@mystic/core` (`packages/core/src/types/result.ts`)  
**Authority:** Section 16, Section 17, Section 18 (`prompt/result.md`)  

---

## 1. Overview & JSON Schema Contract

`MysticosResult` is the universal, immutable data contract returned by all domain pipelines across Mysticos. It embodies the full 17-layer deterministic processing lifecycle, providing an unbroken data lineage from raw input facts to practical everyday guidance and classical provenance citations.

---

## 2. Field-by-Field Specification

### 2.1 Root Contract

```typescript
export interface MysticosResult {
  /** Unique UUID v4 identifying the computation event */
  resultId: string;

  /** Primary mystical domain of the reading */
  domain: 'tarot' | 'astrology' | 'tuvi' | 'numerology' | 'compatibility';

  /** Normalized summary of user input parameters */
  inputSummary: Record<string, unknown>;

  /** Layer 2 & Layer 4: Mathematical, astronomical, or symbolic observables */
  facts: Fact[];

  /** Layer 5: High-level semantic concepts triggered by facts */
  semantics: SemanticUnit[];

  /** Layer 7: Directional forces and latent psychological drives */
  signals: Signal[];

  /** Layer 8: Relational edges between active signals */
  relationships: Relationship[];

  /** Layer 10: Archetypal thematic clusters synthesized from signals */
  patterns: Pattern[];

  /** Layer 8 & Layer 10: Explicit dialectical tensions and resolution pathways */
  tensions: Array<{
    traitA: string;
    traitB: string;
    dynamics: string;
    resolution: string;
  }>;

  /** Layer 11: Multidimensional analytical assessments */
  interpretations: Interpretation[];

  /** Layer 12: Everyday behavioral and situational manifestations */
  implications: PracticalImplication[];

  /** Layer 13: Tiered action recommendations */
  guidance: Guidance[];

  /** Layer 14: Verifiable bibliographic lineage back to classical texts */
  evidence: EvidenceReference[];

  /** Layer 5 & Layer 6: Documented doctrinal disputes relevant to this chart */
  conflicts: Array<{
    conflictId: string;
    topic: string;
    resolution: string;
  }>;

  /** Execution performance and rule evaluation telemetry */
  technical: {
    calculationTimeMs: number;
    rulesEvaluatedCount: number;
    rulesMatchedCount: number;
  };

  /** Engine and knowledge base versioning metadata */
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

### 2.2 Sub-Tier Interfaces

#### `Fact`
Observable astronomical or symbolic calculations. Contains zero narrative interpretation.
```typescript
export interface Fact {
  key: string;       // Dot-notated path, e.g. "planets.sun.sign"
  value: unknown;    // Calculated primitive, e.g. "Aries" or 124.5
  domain: string;    // "astrology"
  source: string;    // "swiss-ephemeris"
}
```

#### `SemanticUnit`
Normalized semantic concept activated in the Knowledge Base.
```typescript
export interface SemanticUnit {
  id: string;
  concept: string;    // e.g. "cardinal_fire_initiation"
  keywords: string[]; // ["khởi xướng", "tiên phong", "hành động"]
  polarity: 'constructive' | 'shadow' | 'neutral' | 'tension';
  weight: number;     // 0.0 to 1.0
}
```

#### `Signal`
Dynamic contextual force emitted by matched rules.
```typescript
export interface Signal {
  signalId: string;
  type: string;       // e.g. "LEADERSHIP_IMPULSE"
  polarity: 'supportive' | 'challenging' | 'neutral' | 'mixed';
  strength: number;   // 0.0 to 1.0
  ruleIds: string[];  // Traceable rule identifiers
  claimIds: string[]; // Linked atomic claim identifiers
  dimension: string;  // "career" | "overview" | "relationships"
  description?: string;
}
```

#### `Relationship`
Topology of interaction between pairs of signals.
```typescript
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
  intensity: number;  // 0.0 to 1.0
}
```

#### `Pattern`
Synthesized archetypal cluster uniting multiple signals.
```typescript
export interface Pattern {
  patternId: string;
  type: string;       // e.g. "SOVEREIGN_AUTHORITY"
  headline: string;   // Archival summary heading
  signalIds: string[];
  relationshipIds: string[];
  dominance: number;  // 0.0 to 1.0
  contextFit: number; // 0.0 to 1.0
}
```

#### `Interpretation`
Exacting analytical statement linked to pattern and dimension.
```typescript
export interface Interpretation {
  interpretationId: string;
  dimension: string;  // "overview" | "career" | "relationships" | "finance" | "growth"
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
```

#### `PracticalImplication`
Real-world, observable manifestation of an interpretation.
```typescript
export interface PracticalImplication {
  implicationId: string;
  interpretationId: string;
  context: string;        // e.g. "Quản trị công việc"
  manifestation: string;  // Concrete real-life behavioral manifestation
}
```

#### `Guidance`
Three-tiered constructive, non-coercive life action recommendations.
```typescript
export interface Guidance {
  guidanceId: string;
  implicationId: string;
  actionPriority: 'IMMEDIATE' | 'STRATEGIC' | 'REFLECTIVE';
  whatToContinue: string[];
  whatToAdjustOrStop: string[];
  rationale: string;
}
```

#### `EvidenceReference`
Complete bibliographical footnote pointing to classical source editions.
```typescript
export interface EvidenceReference {
  evidenceId: string;
  ruleId: string;
  claimId: string;
  sourceId: string;
  sourceTitle: string;
  citation: string;
  evidenceLevel: 'A' | 'B' | 'C' | 'D' | 'E';
}
```

---

## 3. Concrete Example Payload (Western Astrology Reading)

```json
{
  "resultId": "res-9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "domain": "astrology",
  "inputSummary": {
    "birthDate": "1994-03-21",
    "birthTime": "06:15",
    "latitude": 21.0285,
    "longitude": 105.8542,
    "houseSystem": "placidus"
  },
  "facts": [
    {
      "key": "planets.sun.sign",
      "value": "Aries",
      "domain": "astrology",
      "source": "swiss-ephemeris"
    },
    {
      "key": "planets.sun.degree",
      "value": 0.45,
      "domain": "astrology",
      "source": "swiss-ephemeris"
    },
    {
      "key": "planets.sun.house",
      "value": 1,
      "domain": "astrology",
      "source": "swiss-ephemeris"
    },
    {
      "key": "planets.sun.dignity",
      "value": "exaltation",
      "domain": "astrology",
      "source": "ptolemaic-dignities"
    }
  ],
  "semantics": [
    {
      "id": "SEM_RUL_ASTRO_SUN_ARIES_1ST_0",
      "concept": "pioneering_vitality",
      "keywords": ["tiên phong", "nhiệt huyết", "khởi nguyên"],
      "polarity": "constructive",
      "weight": 0.95
    }
  ],
  "signals": [
    {
      "signalId": "SIG_LEADERSHIP_IMPULSE_0",
      "type": "LEADERSHIP_IMPULSE",
      "polarity": "supportive",
      "strength": 0.95,
      "ruleIds": ["RUL_ASTRO_SUN_ARIES_1ST"],
      "claimIds": ["CLM_ASTRO_SUN_EXALT_ARIES"],
      "dimension": "overview",
      "description": "Mặt Trời vượng địa tại Cung 1 tạo xung lực tiên phong tự chủ"
    }
  ],
  "relationships": [],
  "patterns": [
    {
      "patternId": "PAT_INITIATIVE_AUTHORITY",
      "type": "INITIATIVE_AUTHORITY",
      "headline": "Xung Lực Tiên Phong & Vị Thế Khởi Xướng",
      "signalIds": ["SIG_LEADERSHIP_IMPULSE_0"],
      "relationshipIds": [],
      "dominance": 0.95,
      "contextFit": 0.9
    }
  ],
  "tensions": [
    {
      "traitA": "Khao khát tự chủ tuyệt đối",
      "traitB": "Yêu cầu hợp tác thể chế",
      "dynamics": "Sự sốt sắng hành động dễ tạo áp lực lên quy trình đồng thuận tập thể",
      "resolution": "Định vị vai trò mở đường chiến lược thay vì quản trị chi tiết vi mô"
    }
  ],
  "interpretations": [
    {
      "interpretationId": "INT_ASTRO_SUN_ARIES_1",
      "dimension": "overview",
      "statementId": "STM_001",
      "headline": "Bản Thể Khởi Xướng Quyết Đoán",
      "statement": "Mặt Trời tại Bạch Dương ngự tại Cung 1 chủ về năng lượng bản thể mãnh liệt, thiên hướng hành động trực tiếp và khả năng thiết lập vị thế lãnh đạo độc lập.",
      "polarity": "supportive",
      "strength": 0.95,
      "confidence": 0.95,
      "patternIds": ["PAT_INITIATIVE_AUTHORITY"],
      "signalIds": ["SIG_LEADERSHIP_IMPULSE_0"],
      "ruleIds": ["RUL_ASTRO_SUN_ARIES_1ST"],
      "evidenceIds": ["EVD_0001"]
    }
  ],
  "implications": [
    {
      "implicationId": "IMP_001",
      "interpretationId": "INT_ASTRO_SUN_ARIES_1",
      "context": "Môi trường công việc",
      "manifestation": "Xu hướng đảm nhận trọng trách tiên phong trong các dự án mới, nhưng dễ mất kiên nhẫn ở giai đoạn duy trì ổn định."
    }
  ],
  "guidance": [
    {
      "guidanceId": "GUI_001",
      "implicationId": "IMP_001",
      "actionPriority": "STRATEGIC",
      "whatToContinue": ["Chủ động đề xuất các phương án đổi mới có tính đột phá"],
      "whatToAdjustOrStop": ["Tránh áp đặt tốc độ cá nhân lên cộng sự trong giai đoạn củng cố"],
      "rationale": "Năng lượng vượng địa phát huy tối ưu khi giữ vai trò mở đường và phân quyền triển khai."
    }
  ],
  "evidence": [
    {
      "evidenceId": "EVD_0001",
      "ruleId": "RUL_ASTRO_SUN_ARIES_1ST",
      "claimId": "CLM_ASTRO_SUN_EXALT_ARIES",
      "sourceId": "SRC_ASTRO_PTOLEMY_TETRA",
      "sourceTitle": "Tetrabiblos",
      "citation": "Claudius Ptolemy (c. 150 CE), Tetrabiblos, Book I, Chapter 19",
      "evidenceLevel": "A"
    }
  ],
  "conflicts": [],
  "technical": {
    "calculationTimeMs": 14,
    "rulesEvaluatedCount": 42,
    "rulesMatchedCount": 1
  },
  "metadata": {
    "engineVersion": "2.0.0",
    "knowledgeBaseVersion": "2.0.0",
    "rulesVersion": "2.0.0",
    "school": "Hellenistic / Classical",
    "deterministic": true,
    "calculatedAt": "2026-10-07T11:20:00.000Z"
  }
}
```
