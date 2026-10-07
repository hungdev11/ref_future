# Mysticos Rule Schema Specification

**Status:** Canonical Rule Specification  
**Package:** `@mystic/rule-engine` & `@mystic/knowledge-base`  
**Authority:** Section 6, Section 7 (`prompt/result.md`), Section 23–24 (`prompt/source.md`)  

---

## 1. Declarative Rule Engine Architecture

In Mysticos, interpretation rules are **declarative, executable AST structures**. Rules:
- Never generate free-form text or unformatted paragraphs.
- Evaluate calculated domain facts and features deterministically.
- Emit structured `SemanticUnit` and `Signal` definitions with mathematical properties (polarity, weight, strength).
- Maintain 100% verifiable lineage to underlying `AtomicClaim` and `SourceRecord` entities.

---

## 2. Rule Model TypeScript Definitions

### 2.1 `RulePrecondition`
Defined in `packages/knowledge-base/src/types/rule.ts`:

```typescript
export type PreconditionOperator =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'GREATER_THAN'
  | 'LESS_THAN'
  | 'IN'
  | 'CONTAINS'
  | 'BETWEEN';

export interface RulePrecondition {
  /** Dot-notated field path on the domain facts object (e.g. 'planets.sun.sign') */
  field: string;
  /** Relational comparison operator */
  operator: PreconditionOperator;
  /** Expected matching value or range */
  value: unknown;
}
```

### 2.2 `InterpretationRule`
Defined in `packages/knowledge-base/src/types/rule.ts`:

```typescript
export type EvidenceLevel = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface InterpretationRule {
  /** Unique immutable rule code (e.g. 'RUL_ASTRO_SUN_ARIES_1ST_HOUSE') */
  ruleId: string;
  /** Primary mystical domain */
  domain: DomainType;
  /** Doctrinal school (e.g. 'Hellenistic', 'RWS', 'Nam Phái', 'Pythagorean') */
  school: string;
  /** Array of foreign keys to authenticated SourceRecord entries */
  sourceIds: string[];
  /** Array of foreign keys to underlying AtomicClaim entries */
  claimIds: string[];
  /** Array of preconditions that must all evaluate to true */
  preconditions: RulePrecondition[];
  /** High-level semantic concepts activated by this rule */
  semanticInputs: string[];
  /** Identifiers of atomic signals emitted upon successful match */
  derivedSignals: string[];
  /** Relational interaction markers triggered by this rule */
  relationships?: string[];
  /** Core archetypal pattern associated with this rule */
  pattern?: string;
  /** Affective orientation */
  polarity?: 'constructive' | 'shadow' | 'neutral' | 'tension' | 'supportive';
  /** Priority score for conflict resolution (1 to 100) */
  priority: number;
  /** Sourced evidence tier */
  evidenceLevel: EvidenceLevel;
  /** Doctrinal confidence status */
  confidence: 'verified' | 'supported' | 'uncertain' | 'conflicted';
  /** Overriding conditions that nullify this rule (e.g., Tuần/Triệt, Combust) */
  exceptions?: string[];
  /** Scholarly notes explaining doctrinal nuance */
  notes?: string;
}
```

---

## 3. Evidence Levels (A through F)

Mysticos categorizes every interpretation rule into one of six evidence levels based on bibliographic rigor:

```text
+-----------------------------------------------------------------------------------+
| LEVEL A — STRONGLY SUPPORTED (CLASSICAL CONSENSUS)                                |
| Backed by multiple concordant S0/S1 primary classical texts.                       |
| Eligible for CORE RULES. Default authority across all charts.                      |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
| LEVEL B — SUPPORTED (SCHOLARLY TRADITION)                                         |
| Backed by authoritative S1 scholarly commentaries or established S2 traditions.   |
| Eligible for CORE RULES. Robust historical consensus.                             |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
| LEVEL C — SCHOOL-SPECIFIC (DOCTRINAL DIVERGENCE)                                  |
| Valid and authoritative within a specific recognized school (e.g. Bắc Phái Tử Vi).|
| Eligible for CORE RULES when the corresponding school is selected.                |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
| LEVEL D — MODERN INTERPRETATION (CONTEMPORARY SYSTEM)                             |
| Derived from 20th-century psychological or modern esoteric literature.            |
| Marked in UI as Modern Extension. Secondary weighting in core synthesis.         |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
| LEVEL E — MYSTICOS-DERIVED (SYNTHESIZED LOGIC)                                    |
| Multi-rule synthetic conclusions deduced deterministically across domains.        |
| Mandatory metadata: derivedFromRuleIds, derivedFromClaimIds, derivationLogic.    |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
| LEVEL F — UNVERIFIED / SPECULATIVE (REJECTED)                                     |
| Sourced from unauthenticated internet sources, blogs, or AI generation.           |
| STRICTLY FORBIDDEN IN PRODUCTION RULE EXECUTION.                                  |
+-----------------------------------------------------------------------------------+
```

---

## 4. Precondition Evaluation Operators

| Operator | Type Requirement | Semantics |
| :--- | :--- | :--- |
| `EQUALS` | Primitive | Exact equality (`fact === value`) |
| `NOT_EQUALS` | Primitive | Inequality (`fact !== value`) |
| `GREATER_THAN` | Numeric | Strict numeric superiority (`fact > value`) |
| `LESS_THAN` | Numeric | Strict numeric inferiority (`fact < value`) |
| `IN` | Array / Set | Membership check (`value.includes(fact)`) |
| `CONTAINS` | String / Array | Substring or element inclusion (`fact.includes(value)`) |
| `BETWEEN` | Tuple `[min, max]` | Range boundary check (`min <= fact && fact <= max`) |

---

## 5. Specificity Scoring & Conflict Resolution

When multiple rules match the same calculated facts, the engine calculates a **Specificity Score**:

$$\text{Specificity} = \sum_{p \in \text{preconditions}} w(p) + \text{EvidenceModifier}(\text{level})$$

Where:
- $w(p) = 10$ for each exact equality check (`EQUALS`).
- $w(p) = 15$ for conjunctions across multiple distinct entities (e.g., Planet $\times$ Sign $\times$ House).
- $w(p) = 25$ for complex compound interactions (e.g., Tam Hợp $\times$ Tứ Hóa).
- $\text{EvidenceModifier}$: $\text{Level A} = +20, \text{Level B} = +15, \text{Level C} = +10, \text{Level D} = +5, \text{Level E} = +0$.

### Conflict Resolution Strategy:
1. **School Segregation:** If conflicting rules originate from distinct traditions (e.g. Nam Phái vs. Bắc Phái), both branches are preserved in `conflicts` and filtered according to user tradition settings.
2. **Specificity Override:** Within the same school, a rule with a significantly higher specificity score overrides generic baseline rules.
3. **Dialectical Preservation:** Inherent psychological tensions (e.g. high autonomy vs. high dependency) are **not** resolved by clobbering one rule; they are explicitly emitted as `Tension` objects for Layer 8 to evaluate.
