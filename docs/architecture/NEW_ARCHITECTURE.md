# Mysticos 17-Layer Architecture Specification

**Status:** Canonical Architecture Specification  
**Version:** 2.0.0  
**Authority:** Section 2 & Section 33 (`prompt/result.md`), `prompt/source.md`, `AGENTS.md`  

---

## 1. Architectural Philosophy & Invariants

Mysticos is a deterministic mystical calculation and interpretation platform covering five core domains:
- **Tử Vi Đẩu Số** (Vietnamese Astronomical Lunar Calendar, 12 Palaces, Chính/Phụ Tinh, Tứ Hóa, Hạn)
- **Tarot** (Rider-Waite-Smith 78-card canon, Spread semantics, Dignities)
- **Chiêm Tinh Tây Phương** (Western Hellenistic & Classical Astrology, Tropical Zodiac, Aspects, Houses)
- **Thần Số Học** (Pythagorean Arithmology, Diacritic Normalization, Master Numbers 11/22/33)
- **Độ Tương Hợp** (Multi-System Synastry Synthesis)

### Fundamental System Invariants

1. **Zero Generative AI / LLM at Runtime:**
   No OpenAI, Anthropic, Gemini, or any stochastic text generation is used in calculations, rule matching, pattern synthesis, or interpretation generation.
   $$\text{Reading} = f(\text{Input}, \text{EngineVersion}, \text{KnowledgeBaseVersion}, \text{RulesVersion})$$
   Identical input across identical versions always produces bit-for-bit identical output.

2. **Single Source of Truth (`@mystic/knowledge-base`):**
   No hardcoded interpretation strings or static paragraph dictionaries in domain calculation engines or UI components. Every claim and rule originates from classical or scholarly sources.

3. **100% Provenance Lineage:**
   Every interpretation, pattern, and guidance recommendation exposes a verifiable provenance chain:
   $$\text{Result} \longrightarrow \text{Interpretation} \longrightarrow \text{Pattern} \longrightarrow \text{Signal} \longrightarrow \text{Rule} \longrightarrow \text{Atomic Claim} \longrightarrow \text{Source Record} \longrightarrow \text{Section/Page}$$

4. **Strict Separation of Concerns Across 18 Layers (Layer 0 to Layer 17):**
   Calculations never interpret. Rules never calculate math. Frontends never hold domain logic.

---

## 2. End-to-End 17-Layer Architecture Diagram

```text
               +-------------------------------------------------------------+
               |                  LAYER 0 — RAW INPUT                        |
               | (Birth Date/Time, Geocoordinates, Cards Drawn, Person Data) |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |                 LAYER 1 — NORMALIZATION                     |
               | (UTC Timestamp, Julian Day, Lunar Calendar, Can Chi, Names) |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |               LAYER 2 — DOMAIN CALCULATION                  |
               | (Ephemeris, Zodiac Degrees, 12 Palaces, Star Positions)     |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |                   LAYER 3 — VALIDATION                      |
               | (Astronomical Boundaries, Precision Bounds, Integrity)      |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |                 LAYER 4 — DOMAIN FEATURES                   |
               | (Aspects, Dignities, Tam Hợp, Xung Chiếu, Karmic Debts)     |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |                  LAYER 5 — KNOWLEDGE BASE                   |
               | (@mystic/knowledge-base: Sources S0-S4, Claims, Preconditions)|
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |                 LAYER 6 — RULE EVALUATION                   |
               | (Precondition AST Matching, Priority & Specificity Scoring) |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |                 LAYER 7 — SIGNAL GENERATION                 |
               | (Atomic Signals with Polarity, Strength, and Dimensions)    |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |               LAYER 8 — RELATIONSHIP ENGINE                 |
               | (Reinforcement, Contrast, Tension, Progression, Mitigation) |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |              LAYER 9 — CONTEXTUAL REASONING                 |
               | (Spread Position, Palace Multiplier, Chart Configuration)   |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |                LAYER 10 — PATTERN SYNTHESIS                 |
               | (Archetypal Clustering, Trend Dominance, Coherent Themes)   |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |                 LAYER 11 — INTERPRETATION                   |
               | (Structured Statements Bound to Dimensions & Confidence)    |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |             LAYER 12 — PRACTICAL IMPLICATION                |
               | (Real-World Manifestation in Psychology, Career, Relational)|
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |                    LAYER 13 — GUIDANCE                      |
               | (Actionable Tiers: IMMEDIATE, STRATEGIC, REFLECTIVE)        |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |             LAYER 14 — EVIDENCE & PROVENANCE                |
               | (Source Footnotes, Classical Citations, Evidence Levels)    |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |                  LAYER 15 — RESULT JSON                     |
               | (Canonical MysticosResult Contract Specification)           |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |                 LAYER 16 — TEXT RENDERING                   |
               | (Deterministic Archival Interpolation, Zero Hallucination)  |
               +-------------------------------------------------------------+
                                              |
                                              v
               +-------------------------------------------------------------+
               |                        LAYER 17 — UI                        |
               | (MysticosResultViewer, WhyPanel, Archival Editorial Theme)  |
               +-------------------------------------------------------------+
```

---

## 3. Comprehensive Layer Specifications

### Layer 0: Raw Input
- **Responsibility:** Captures external input without modification.
- **Input:** HTTP Request body or CLI arguments.
  ```json
  {
    "birthDate": "1990-05-15",
    "birthTime": "06:30",
    "timezone": 7,
    "latitude": 21.0285,
    "longitude": 105.8542,
    "gender": "male",
    "fullName": "Nguyễn Văn An",
    "cards": ["the_fool", "the_magician", "the_empress"],
    "spread": "three_card_timeline"
  }
  ```
- **Output:** `RawInputPayload`
- **Invariants:** No defaults guessed silently; missing mandatory fields trigger client-facing validation errors.
- **Participating Packages:** `apps/api`, `apps/web`.

### Layer 1: Normalization
- **Responsibility:** Standardizes heterogeneous inputs into universal astronomical and mathematical representations.
- **Transforms:**
  - Gregorian date/time + timezone $\rightarrow$ UTC `DateTime` and Julian Day Number (JDN).
  - Gregorian date $\rightarrow$ Vietnamese Lunar Calendar (Hồ Ngọc Đức astronomical algorithms), Lunar Leap Month detection, Can Chi Tiết Khí.
  - Full Name $\rightarrow$ Diacritic-stripped uppercase string for Pythagorean mapping.
  - Card identifiers $\rightarrow$ Canonical kebab-case IDs (`the-fool`, `seven-of-pentacles`).
- **Invariants:** Pure, deterministic functions; handles leap years, timezone offsets, and boundary seconds.
- **Participating Packages:** `@mystic/core`, `@mystic/tuvi-engine`, `@mystic/numerology-engine`.

### Layer 2: Domain Calculation
- **Responsibility:** Executes mathematical, astronomical, and symbolic placements.
- **Computations:**
  - *Astrology:* Swiss Ephemeris / planetary algorithms calculate ecliptic longitude, latitude, house cusps (Placidus/Koch/Whole Sign), speed, retrograde flags.
  - *Tử Vi:* An Mệnh/Thân, An 12 Cung, An Tử Vi tinh hệ, An Thiên Phủ tinh hệ, An Lục Sát Tinh, Tứ Hóa năm sinh, Đại Hạn 10 năm.
  - *Numerology:* Life Path (Đường Đời), Expression (Sứ Mệnh), Soul Urge (Linh Hồn), Personality (Nhân Cách), Maturity (Trưởng Thành), Personal Year/Month.
  - *Tarot:* Card orientation, spread slot semantics, suit and elemental distributions.
- **Output:** Typed, observable domain facts (`Fact[]`).
- **Invariants:** NEVER outputs psychological interpretations, opinions, or narrative paragraphs.
- **Participating Packages:** `@mystic/astrology-engine`, `@mystic/tuvi-engine`, `@mystic/numerology-engine`, `@mystic/tarot-engine`.

### Layer 3: Validation
- **Responsibility:** Verifies boundary conditions and data integrity of calculated facts.
- **Checks:**
  - House cusps strictly ordered ($0^\circ \le \lambda < 360^\circ$).
  - Birth time precision validation: if approximate or unknown, flag reduced precision and suppress time-sensitive calculations (Ascendant, Palaces).
  - Star count invariant: Tử Vi chart must contain exactly the standard set of canonical stars per palace.
- **Output:** `ValidatedFactRegistry`
- **Invariants:** Rejects corrupted astronomical calculations before reaching rule engines.
- **Participating Packages:** `@mystic/core`.

### Layer 4: Domain Features
- **Responsibility:** Extracts higher-level structural configurations from raw facts.
- **Features Extracted:**
  - *Astrology:* Major aspects (Conjunction, Opposition, Trine, Square, Sextile) with explicit orb tolerances; Essential dignities (Domicile, Exaltation, Detriment, Fall); Mutual receptions.
  - *Tử Vi:* Đắc/Miếu/Vượng/Hãm ratings; Tam Phương Tứ Chính intersections; Nhị Hợp, Giáp Cung; Tứ Hóa interactions.
  - *Numerology:* Karmic Debt numbers (13/4, 14/5, 16/7, 19/1); Master Numbers (11, 22, 33); Balance scores across physical/mental/emotional/spiritual planes.
  - *Tarot:* Elemental dignity (Fire vs. Water tensions); Major vs. Minor Arcana ratio; Dominant suit patterns.
- **Invariants:** Generates discrete relational flags and numbers; zero subjective text.
- **Participating Packages:** `@mystic/astrology-engine`, `@mystic/tuvi-engine`, `@mystic/numerology-engine`, `@mystic/tarot-engine`.

### Layer 5: Knowledge Base
- **Responsibility:** Supplies the authoritative knowledge repository (`@mystic/knowledge-base`).
- **Contents:**
  - `SourceRecord`: Catalog of primary texts (S0), academic commentaries (S1), and established school traditions (S2).
  - `AtomicClaim`: Unambiguous, granular assertions extracted directly from classical texts with specific chapter/page locations.
  - `InterpretationRule`: Declarative production rules linking claims to observable preconditions.
  - `SourceConflict`: Documented divergences between competing classical traditions preserved without silent clobbering.
- **Invariants:** 100% frozen, audited records with verifiable source IDs. No unverified internet forum content (S4).
- **Participating Packages:** `@mystic/knowledge-base`.

### Layer 6: Rule Evaluation
- **Responsibility:** Evaluates rule preconditions against domain features and facts.
- **Mechanisms:**
  - Precondition matching operators: `EQUALS`, `NOT_EQUALS`, `GREATER_THAN`, `LESS_THAN`, `IN`, `CONTAINS`, `BETWEEN`.
  - Specificity scoring: Higher precondition counts yield higher specificity ratings.
  - Priority execution: Rules executed deterministically in descending priority order.
- **Output:** List of verified matched rules (`InterpretationRule[]`).
- **Invariants:** Deterministic matching; no probabilistic fuzzing or stochastic branch selection.
- **Participating Packages:** `@mystic/rule-engine`.

### Layer 7: Signal Generation
- **Responsibility:** Generates atomic contextual signals from matched rules.
- **Signal Structure:**
  - `signalId`: Unique signal identifier.
  - `type`: Semantic category (e.g., `DECISION_PAUSE`, `INTELLECTUAL_AMBITION`, `RESOURCE_FRICTION`).
  - `polarity`: `'supportive' | 'challenging' | 'neutral' | 'mixed'`.
  - `strength`: Calibrated numeric scalar ($0.0 \le s \le 1.0$).
  - `ruleIds`: Linked rule identifiers.
  - `claimIds`: Direct lineage to atomic claims.
  - `dimension`: Affected life dimension (`overview`, `career`, `relationships`, `finance`, `growth`).
- **Invariants:** Signals represent latent forces and dynamics, not finished prose paragraphs.
- **Participating Packages:** `@mystic/rule-engine`, `@mystic/interpretation-engine`.

### Layer 8: Relationship Engine
- **Responsibility:** Maps relational topology and interactions between co-existing signals.
- **Relationship Taxonomies:**
  - `reinforcement`: Mutually amplifying signals of congruent nature.
  - `contrast`: Distinct signals highlighting dual facets of character or circumstance.
  - `tension`: Dialectical friction between opposing drives (e.g., need for autonomy vs. craving for security).
  - `progression`: Chronological or sequential development across stages.
  - `transition`: Movement from one psychic state to another.
  - `complementarity`: Differing signals balancing each other's extremes.
  - `amplification`: Exponential compounding of thematic intensity.
  - `mitigation`: Benefic or stabilizing factors softening harsh configurations.
- **Invariants:** Signals are never evaluated in isolation; cross-signal edges are mandatory.
- **Participating Packages:** `@mystic/interpretation-engine`.

### Layer 9: Contextual Reasoning
- **Responsibility:** Computes contextual modifiers based on situational placement.
- **Modulators:**
  - *Tarot:* Position in spread (e.g., Root Cause vs. Challenge vs. Potential Outcome).
  - *Astrology:* House placement, angular strength, orb proximity.
  - *Tử Vi:* Palace context (Cung Mệnh vs. Cung Quan Lộc vs. Cung Phu Thê), Tuần/Triệt attenuation.
  - *Numerology:* Period cycle vs. Core essence alignment.
- **Invariants:** Context attenuates or accentuates signal weights without inventing new ungrounded signals.
- **Participating Packages:** `@mystic/interpretation-engine`.

### Layer 10: Pattern Synthesis
- **Responsibility:** Aggregates interconnected signals and relationships into coherent archetypal patterns.
- **Pattern Definition:**
  - `patternId`: Unique archetype ID.
  - `type`: Architectural motif (e.g., `AUTHORITY_CONSOLIDATION`, `INTERNAL_REASSESSMENT`).
  - `headline`: Terse, classical summary banner.
  - `signalIds`: Component signals bound into the pattern.
  - `relationshipIds`: Active interactions forming the pattern.
  - `dominance`: Weighted dominance score ($0.0 \le d \le 1.0$).
  - `contextFit`: Congruence with reading objectives.
- **Invariants:** Eliminates text-stitching. Patterns represent structured thematic unities.
- **Participating Packages:** `@mystic/interpretation-engine`.

### Layer 11: Interpretation
- **Responsibility:** Formulates structured interpretive statements from synthesized patterns.
- **Statement Structure:**
  - `interpretationId`: Structured statement key.
  - `dimension`: Life domain classification.
  - `statement`: Clear, dignified analytical assessment.
  - `polarity`: Affective orientation.
  - `confidence`: Calibrated certainty rating based on evidence density.
  - `patternIds`, `signalIds`, `ruleIds`, `evidenceIds`: Explicit lineage back-pointers.
- **Invariants:** Zero boilerplate fluff; strictly analytical and archival in tone.
- **Participating Packages:** `@mystic/interpretation-engine`.

### Layer 12: Practical Implication
- **Responsibility:** Derives real-world, everyday psychological and behavioral implications.
- **Implication Mapping:**
  - Directly binds to specific interpretations (`interpretationId`).
  - `context`: Sphere of manifestation (e.g., workplace dynamics, interpersonal conflict, capital allocation).
  - `manifestation`: Tangible description of how the symbolic tension materializes in daily life.
- **Invariants:** Grounded in observable human behavior; avoids fatalistic or superstitious predictions.
- **Participating Packages:** `@mystic/interpretation-engine`.

### Layer 13: Guidance
- **Responsibility:** Generates ethical, actionable, and constructive guidance.
- **Action Priorities:**
  - `IMMEDIATE`: Tactful behavioral adjustments for immediate acute tensions.
  - `STRATEGIC`: Medium-to-long term orientations and developmental trajectories.
  - `REFLECTIVE`: Philosophical contemplation and self-inquiry topics.
- **Structure:**
  - `whatToContinue`: Constructive patterns to reinforce.
  - `whatToAdjustOrStop`: Detrimental or reactive tendencies to moderate.
  - `rationale`: Verifiable reason anchored in underlying patterns.
- **Invariants:** Guidance is non-coercive, empowering, and strictly derived from Layer 12 implications.
- **Participating Packages:** `@mystic/interpretation-engine`.

### Layer 14: Evidence & Provenance
- **Responsibility:** Compiles complete provenance citations and verification trails.
- **Evidence Reference:**
  - `evidenceId`: Tracking ID.
  - `ruleId`: Applied production rule.
  - `claimId`: Underlying atomic claim in the Knowledge Base.
  - `sourceId`: Classical reference work identifier.
  - `sourceTitle`: Full title of authoritative text.
  - `citation`: Formatted citation including author, year, and chapter/section/page.
  - `evidenceLevel`: Sourced rating from A (Classical Primary) to E (Derived).
- **Invariants:** No reading leaves this layer without complete bibliographical backing.
- **Participating Packages:** `@mystic/knowledge-base`, `@mystic/interpretation-engine`.

### Layer 15: Result JSON
- **Responsibility:** Assembles the unified, canonical `MysticosResult` contract.
- **Contract Integrity:**
  - Validates full JSON payload against schema definitions in `@mystic/core`.
  - Records execution metrics, rule evaluation counters, and metadata hashes.
- **Invariants:** Strict immutability; serializable as pure JSON.
- **Participating Packages:** `@mystic/core`, `@mystic/interpretation-engine`.

### Layer 16: Text Rendering
- **Responsibility:** Produces safe, archival Vietnamese text renderings via deterministic templating.
- **Approach:**
  - Uses `@mystic/template-engine` with strict variable binding and HTML/script sanitization.
  - Enforces archival editorial voice: restrained, classical, devoid of sensationalism or clickbait.
- **Invariants:** No probabilistic language models; deterministic template substitution only.
- **Participating Packages:** `@mystic/template-engine`.

### Layer 17: UI Presentation
- **Responsibility:** Renders the reading and provides interactive transparency.
- **Components:**
  - `MysticosResultViewer`: Visualizes the 5-tier information hierarchy (Raw Data $\rightarrow$ Calculation $\rightarrow$ Patterns $\rightarrow$ Interpretations $\rightarrow$ Guidance).
  - `WhyPanel`: Transparent proof inspector displaying the full evidence graph from claim to source.
- **Design System Standards:**
  - Dark archival editorial palette (`#111110` background, `#161614` surface, `#EDEAE2` parchment text, `#BFA15F` gold accent).
  - Classical typography (`Lora` serif headings, `Be Vietnam Pro` body, `JetBrains Mono` numbers and citations).
  - 0px border radius for content cards; strict 1px hairline graticule borders (`#282724`).
- **Invariants:** Pure presentation layer; zero business calculations or rule logic in frontend components.
- **Participating Packages:** `apps/web`.

---

## 4. Multi-Domain Cross-System Synthesis

When synthesizing across systems (e.g., Tarot + Astrology + Tử Vi in Synastry or Compatibility readings):
1. **Parallel Calculations:** Domain engines independently process normalized input into domain facts (Layers 1-4).
2. **Domain Signal Bridging:** Each engine generates standardized `Signal[]` vectors (Layer 7).
3. **Cross-System Relationship Graph:** Layer 8 evaluates affinity, tension, and complementarity across cross-domain signals (e.g., Astrology Sun-Moon trine vs. Tử Vi Phu Thê palace tensions).
4. **Unified Pattern Synthesis:** Layer 10 synthesizes composite multi-system archetypes.
5. **Harmonized Guidance:** Layer 13 provides unified practical guidance without contradictory instructions.
