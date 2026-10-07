# Mysticos Inter-Package Engine Contracts

**Status:** Canonical Interface Specification  
**Authority:** Section 2, Section 16, & Section 33 (`prompt/result.md`)  

---

## 1. Package Dependency Topology

The Mysticos monorepo strictly enforces a unidirectional dependency hierarchy:

```text
                                 [ apps/web ]  /  [ apps/api ]
                                        |
                                        v
                           [ @mystic/interpretation-engine ]
                              /         |           \
                             v          v            v
           [ @mystic/rule-engine ]  [ @mystic/template-engine ]
                             \          /
                              v        v
                    [ @mystic/knowledge-base ]
                                 |
                                 v
          [ Domain Engines: astrology, tuvi, tarot, numerology ]
                                 |
                                 v
                         [ @mystic/core ]
```

### Dependency Invariants
- `@mystic/core` has **zero external dependencies** within the workspace.
- Domain calculation engines (`@mystic/astrology-engine`, `@mystic/tuvi-engine`, etc.) depend only on `@mystic/core`.
- Domain calculation engines **never** import `@mystic/knowledge-base`, `@mystic/rule-engine`, or `@mystic/interpretation-engine`.
- `@mystic/knowledge-base` contains declarative claims, sources, and rules, acting as a passive registry.
- `apps/web` consumes only `MysticosResult` JSON payloads; it imports zero domain calculation algorithms.

---

## 2. Core Package Contracts

### 2.1 `@mystic/core`
The foundational package defining universal types, interfaces, and contracts:

```typescript
// Canonical Contract Export
export * from './types/result.js';
export * from './types/astrology.js';
export * from './types/tuvi.js';
export * from './types/numerology.js';
export * from './types/tarot.js';
export * from './types/rules.js';
export * from './types/semantic.js';
```

**Key Responsibilities:**
- Exports the canonical `MysticosResult` contract and all sub-tier interfaces (`Fact`, `Signal`, `Pattern`, etc.).
- Defines calculation input options and coordinate boundaries.
- Provides invariant assertion utilities.

---

### 2.2 Domain Calculation Engines (`@mystic/*-engine`)

Every domain engine implements a strict calculation interface transforming raw input into typed domain facts:

```typescript
export interface DomainCalculationEngine<TInput, TChart> {
  /** Calculates mathematical, astronomical, or symbolic positions */
  calculate(input: TInput): TChart;
  /** Extracts observable facts into a standardized Fact[] registry */
  extractFacts(chart: TChart): Fact[];
}
```

#### Invariant Enforcement:
- **No Text Synthesis:** Engines calculate degrees, aspects, palace stars, and numbers. They never return advice, personality text, or psychological judgments.
- **Determinism:** Calculations rely on pure mathematical algorithms (Swiss Ephemeris or astronomical calendar libraries). Given identical datetime and coordinates, output is bit-for-bit identical.

---

### 2.3 `@mystic/knowledge-base`

The passive Single Source of Truth for bibliographical metadata, atomic claims, and rules:

```typescript
export class KnowledgeStore {
  public static getInstance(): KnowledgeStore;

  // Source Operations
  public getSource(sourceId: string): SourceRecord | undefined;
  public getSourcesByDomain(domain: DomainType): SourceRecord[];

  // Claim Operations
  public getClaim(claimId: string): AtomicClaim | undefined;
  public getClaimsBySubject(domain: DomainType, subject: string): AtomicClaim[];

  // Rule Operations
  public getRule(ruleId: string): InterpretationRule | undefined;
  public getRulesByDomain(domain: DomainType): InterpretationRule[];

  // Conflict Operations
  public getConflictsByDomain(domain: DomainType): SourceConflict[];
}

export class ProvenanceTracer {
  public traceRule(ruleId: string): TraceableProvenanceResult | undefined;
  public formatFootnote(ruleId: string): string;
}
```

---

### 2.4 `@mystic/rule-engine`

The deterministic evaluator executing AST rule preconditions against domain facts:

```typescript
export interface RuleEvaluationInput {
  facts: Fact[];
  rules: InterpretationRule[];
  school?: string;
}

export interface RuleEvaluationResult {
  matchedRules: InterpretationRule[];
  specificityMap: Map<string, number>;
  evaluationTimeMs: number;
}

export class RuleEvaluator {
  public static evaluate(input: RuleEvaluationInput): RuleEvaluationResult;
}
```

---

### 2.5 `@mystic/interpretation-engine`

The central synthesis engine implementing the 17-layer transformation pipeline:

```typescript
export interface BuildResultParams {
  domain: 'tarot' | 'astrology' | 'tuvi' | 'numerology' | 'compatibility';
  inputSummary: Record<string, unknown>;
  facts: Fact[];
  school: string;
}

export class MysticosResultBuilder {
  /**
   * Orchestrates Layer 5 through Layer 15 to assemble a complete MysticosResult.
   */
  public static buildResult(params: BuildResultParams): MysticosResult;
}
```

#### Pipeline Sequence Inside `MysticosResultBuilder`:
1. **Rule Precondition Filtering:** Matches facts against domain rules in `@mystic/knowledge-base`.
2. **Semantics & Signal Emitter:** Emits `SemanticUnit[]` and `Signal[]` with calibrated polarities and strengths.
3. **Relational Analysis:** Evaluates pairwise interactions producing `Relationship[]` (reinforcement, tension, etc.).
4. **Archetypal Pattern Clustering:** Groups active signals into `Pattern[]` definitions.
5. **Dialectical Tension Mapping:** Emits `Tension[]` representing active inner dynamics.
6. **Interpretation Assembly:** Formulates multidimensional `Interpretation[]` statements bound to patterns.
7. **Practical Implication & Guidance:** Derives actionable manifestations and tiered guidance (`Guidance[]`).
8. **Evidence Graph Generation:** Binds applied rules to atomic claims, source records, and formatted citations (`EvidenceReference[]`).
9. **Conflict & Metadata Packaging:** Records execution metrics, school metadata, and active doctrinal conflicts.

---

### 2.6 `@mystic/template-engine`

The deterministic text rendering layer:

```typescript
export interface RenderOptions {
  sanitizeHtml?: boolean;
  editorialStyle?: 'archival' | 'compact' | 'pedagogical';
}

export class TemplateRenderer {
  public static render(template: string, context: Record<string, unknown>, options?: RenderOptions): string;
}
```

**Guarantees:**
- Zero runtime LLM integration.
- Strict variable interpolation with fail-safe defaults for missing keys.
- Complete protection against XSS and template injection attacks.

---

### 2.7 Presentation Layer (`apps/web`)

Consumes `MysticosResult` directly and renders pure archival UI components:

```typescript
// Component Props Specification
export interface MysticosResultViewerProps {
  result: MysticosResult;
}

export interface WhyPanelProps {
  result: MysticosResult;
  selectedInterpretationId?: string;
}
```

**Strict Presentation Guidelines:**
- The frontend performs **zero domain calculations** and contains **no rule evaluation logic**.
- Renders the standardized 5-tier information hierarchy:
  1. `RAW DATA` (Input summary and parameters)
  2. `CALCULATED RESULT` (Domain facts, planetary degrees, palaces)
  3. `PATTERN & EVIDENCE` (Synthesized archetypes, relational tensions, signal graph)
  4. `INTERPRETATION` (Multidimensional life domain statements)
  5. `PRACTICAL GUIDANCE` (Immediate, Strategic, and Reflective actions)
