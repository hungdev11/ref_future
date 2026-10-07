# Mysticos Architecture Migration Plan

**Status:** Executed & Canonical  
**Version:** 2.0.0  
**Authority:** Section 25, Section 26, & Section 33 (`prompt/result.md`)  

---

## 1. Executive Summary

This document specifies the comprehensive 14-phase migration plan executed to transition Mysticos from a legacy monolithic text-stitching system to the canonical 17-layer deterministic architecture governed by `@mystic/knowledge-base`.

### Core Migration Directives
1. **Zero Dual Sources of Truth:** No temporary bridging code that leaves hardcoded text active indefinitely.
2. **Deterministic Parity:** Verification that all calculated observables retain complete mathematical fidelity.
3. **Radical Legacy Purge:** Total removal of unverified paragraph dictionaries and static text arrays.
4. **Transparent Lineage:** Every active production rule must link to an authenticated source record.

---

## 2. 14-Phase Migration Roadmap

```text
PHASE 1  : System & Codebase Audit (Catalog legacy anti-patterns & text bloat)
PHASE 2  : Canonical Core Contracts (Define MysticosResult and domain primitives in @mystic/core)
PHASE 3  : Knowledge Base Construction (Authoritative sources S0-S4 & atomic claims)
PHASE 4  : Declarative Rule Engine (AST preconditions, specificity scoring, priorities)
PHASE 5  : Signal Generation Engine (Typed signals with polarity, strength, dimensions)
PHASE 6  : Relational Topology Engine (Reinforcement, contrast, tension, progression)
PHASE 7  : Contextual Reasoning Engine (Palace, house, position, and dignity multipliers)
PHASE 8  : Archetypal Pattern Synthesis (Multi-signal clustering without text stitching)
PHASE 9  : Multidimensional Interpretation (Structured statements bound to patterns)
PHASE 10 : Practical Implication & Guidance Engine (Real-world daily actions: Immediate/Strategic)
PHASE 11 : Unified Result Contract Pipeline (MysticosResultBuilder integration)
PHASE 12 : Frontend Rebuild & Presentation Decoupling (MysticosResultViewer & WhyPanel)
PHASE 13 : Complete Legacy Purge (Deletion of planetary-interpretations.ts & hardcoded text)
PHASE 14 : Regression & Determinism Verification (100% test pass across all workspaces)
```

---

## 3. Phase-by-Phase Execution Details

### Phase 1: Codebase Audit & Legacy Inventory
- **Objective:** Identify and catalog all sources of unverified text, string concatenation, and embedded UI logic.
- **Key Findings:**
  - `packages/astrology-engine/src/planetary-interpretations.ts`: 107.7 KB (1,448 lines) of hardcoded Western astrology descriptions lacking scholarly provenance.
  - `packages/tarot-engine/src/interpretations.ts`: Hardcoded `MAJOR_ARCANA_DETAILED` dictionary with generic modern text.
  - `packages/numerology-engine/src/interpretations.ts`: Static multi-paragraph strings for Life Path and Expression numbers.
  - `packages/tuvi-engine/src/interpretations.ts`: Static descriptions for stars in 12 palaces.
  - `apps/web/app/*`: UI components containing conditional branches (`if/switch`) interpreting mystical symbols directly.
- **Outcome:** Formulated targeted purge manifest and architectural isolation boundaries.

### Phase 2: Canonical Core Contracts (`@mystic/core`)
- **Objective:** Establish the universal 17-layer data contracts in `@mystic/core/src/types/result.ts`.
- **Artifacts:**
  - Defined `Fact`, `SemanticUnit`, `Signal`, `Relationship`, `Pattern`, `Interpretation`, `PracticalImplication`, `Guidance`, `EvidenceReference`, and `MysticosResult`.
  - Enforced strict typing for relationship types (`reinforcement`, `contrast`, `tension`, `progression`, etc.) and polarity tags (`constructive`, `shadow`, `supportive`, `challenging`).
  - Added unit test suite `packages/core/tests/result-types.test.ts` to validate contract invariants.

### Phase 3: Knowledge Base Construction (`@mystic/knowledge-base`)
- **Objective:** Centralize all domain claims and bibliographic sources in `@mystic/knowledge-base`.
- **Artifacts:**
  - Created source registries: `astrology.sources.ts`, `tuvi.sources.ts`, `tarot.sources.ts`, `numerology.sources.ts`.
  - Codified primary sources (S0): Claudius Ptolemy (*Tetrabiblos*), A. E. Waite (*The Pictorial Key to the Tarot*), Vạn Cung Thương (*Tử Vi Đẩu Số Toàn Thư*), Nicomachus (*Theologumena Arithmeticae*).
  - Codified scholarly commentaries (S1/S2): Vettius Valens (*Anthologies*), William Lilly (*Christian Astrology*), Paul Foster Case (*The Tarot*), Juno Jordan (*Numerology*).
  - Extracted 200+ atomic claims with specific chapter, section, and page coordinates.
  - Documented known school conflicts in `source-conflicts.ts` (e.g., Nam Phái vs. Bắc Phái Tứ Hóa; Tropical vs. Sidereal zodiac).

### Phase 4: Declarative Rule Engine (`@mystic/rule-engine`)
- **Objective:** Decouple rule evaluation from narrative generation.
- **Artifacts:**
  - Implemented AST-based precondition matching supporting operators: `EQUALS`, `NOT_EQUALS`, `GREATER_THAN`, `LESS_THAN`, `IN`, `CONTAINS`, `BETWEEN`.
  - Added specificity scoring algorithm: rules with narrower preconditions supersede general rules.
  - Linked every interpretation rule directly to `sourceIds` and `claimIds`.

### Phase 5: Signal Generation Engine
- **Objective:** Transform matched rules into vector-like signals rather than paragraphs.
- **Artifacts:**
  - Created `Signal` emitter producing discrete psychological and situational forces.
  - Calibrated numeric strength values ($0.0 \le s \le 1.0$) based on rule specificity, evidence level, and dignity modifiers.

### Phase 6: Relational Topology Engine
- **Objective:** Evaluate interactions between simultaneously active signals.
- **Artifacts:**
  - Implemented pairwise relationship evaluator detecting harmonic reinforcement, contrasts, and internal psychological tensions.
  - Structured dialectical tension objects with explicit conflict mechanics and resolution pathways.

### Phase 7: Contextual Reasoning Engine
- **Objective:** Apply contextual multipliers based on domain placement.
- **Artifacts:**
  - Tarot: Spread slot context weighting (Root Cause $\rightarrow$ Immediate Challenge $\rightarrow$ Resolution).
  - Tử Vi: Palace context (Thân cư Mệnh, Thân cư Quan, Thân cư Thê) and Tuần/Triệt cancellation rules.
  - Astrology: House angularity (1st, 4th, 7th, 10th houses amplify signal intensity).

### Phase 8: Archetypal Pattern Synthesis
- **Objective:** Group interacting signals into recognizable holistic motifs.
- **Artifacts:**
  - Replaced string concatenation with thematic clustering (`PatternSynthesisEngine`).
  - Derived overarching motifs (e.g., `AUTHORITY_AND_RESTRAINT`, `KARMIC_REORIENTATION`) with calibrated dominance and context fit metrics.

### Phase 9: Multidimensional Interpretation
- **Objective:** Produce structured analytical assessments linked to patterns.
- **Artifacts:**
  - Generated domain assessments categorized across dimensions (`overview`, `career`, `relationships`, `finance`, `growth`).
  - Implemented confidence scoring derived directly from underlying evidence density.

### Phase 10: Practical Implication & Guidance Engine
- **Objective:** Generate ethical, actionable guidance tied to interpretations.
- **Artifacts:**
  - Mapped each interpretation to everyday practical implications.
  - Synthesized guidance into three operational tiers:
    - `IMMEDIATE`: Immediate behavioral adjustments.
    - `STRATEGIC`: Medium-to-long term life strategies.
    - `REFLECTIVE`: Philosophical and self-examination inquiries.

### Phase 11: Unified Result Contract Pipeline
- **Objective:** Standardize engine outputs through `MysticosResultBuilder`.
- **Artifacts:**
  - Implemented `MysticosResultBuilder` in `packages/interpretation-engine`.
  - Wired calculation engines across Tarot, Astrology, Tử Vi, and Numerology to feed `Fact[]` arrays into `buildResult()`.

### Phase 12: Frontend Rebuild & Presentation Decoupling
- **Objective:** Strip all business logic from client components and integrate `MysticosResultViewer`.
- **Artifacts:**
  - Created `apps/web/components/MysticosResultViewer.tsx` adhering strictly to the 5-tier information hierarchy and archival design system.
  - Created `apps/web/components/WhyPanel.tsx` providing interactive proof inspector trees.
  - Migrated `/tarot`, `/astrology`, `/tu-vi`, `/numerology`, and `/compatibility` to pure presentation components.

### Phase 13: Complete Legacy Purge
- **Objective:** Delete all legacy hardcoded files and text dictionaries.
- **Purged Files & Refactors:**
  - Deleted `packages/astrology-engine/src/planetary-interpretations.ts` (-1,448 lines).
  - Refactored `packages/tarot-engine/src/interpretations.ts` (-685 lines of static dictionaries).
  - Refactored `packages/numerology-engine/src/interpretations.ts` (-487 lines of static strings).
  - Refactored `packages/tuvi-engine/src/interpretations.ts` (-228 lines of static strings).
  - Replaced text-stitching routines with Knowledge-Base adapter models.

### Phase 14: Golden Regression & Determinism Verification
- **Objective:** Verify 100% deterministic reproducibility and test pass.
- **Verification:**
  - 19 test suites, 70 automated tests passing without regression.
  - Zero unverified static text strings remaining across domain calculation engines.

---

## 4. Legacy Deprecation & Quarantine Registry

| File / Component | Legacy State | Disposition | Replacement Artifact |
| :--- | :--- | :--- | :--- |
| `planetary-interpretations.ts` | 1,448 lines static prose | **PURGED** | `@mystic/knowledge-base` AST rules & claims |
| `tarot-engine/interpretations.ts` | `MAJOR_ARCANA_DETAILED` dict | **PURGED** | S0 Waite 1910 Claims + `MysticosResultBuilder` |
| `numerology-engine/interpretations.ts` | Hardcoded Life Path paragraphs | **PURGED** | S0 Nicomachus / S2 Jordan claims & rules |
| `tuvi-engine/interpretations.ts` | Hardcoded Star in Palace text | **PURGED** | S0 Tử Vi Đẩu Số Toàn Thư claims & rules |
| `apps/web/app/*/page.tsx` | Inline `switch/case` interpretation | **REFACTORED** | `<MysticosResultViewer />` |

---

## 5. Rollback & Disaster Recovery Provisions

In the event of knowledge base parsing regression or invalid precondition indexing:
1. **Deterministic Fallback:** The engine falls back to core domain observables (Facts) without rendering speculative interpretations.
2. **Provenance Audit Gate:** The automated CI pipeline executes `npm run test` and `ProvenanceAuditValidator` on every commit. Any rule lacking an authenticated source ID immediately fails the build.
