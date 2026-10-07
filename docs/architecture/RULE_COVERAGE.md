# Mysticos Rule Coverage Specification & Roadmap

**Status:** Architecture Specification  
**Authority:** Section 6, Section 7 (`prompt/result.md`), Section 27 (`prompt/source.md`)  
**Scope:** Rule Repository, Preconditions, Engine Coverage, and Phased Roadmap  

---

## 1. Executive Summary

Mysticos utilizes a declarative, deterministic rule engine that evaluates observable facts against structured precondition ASTs. To eliminate empty outputs when evaluating sparse rule sets, `MysticosResultBuilder` provides a dual-layer strategy:
1. **Catalog Rules:** High-specificity rules indexed in `KnowledgeStore` with S0/S1 bibliographic citations.
2. **Contextual Derivation Fallback:** Dynamic synthesis from domain facts and entity semantic profiles to guarantee non-empty, rich, 100% deterministic results across all inputs.

---

## 2. Current Rule Inventory by Domain

| Domain | Catalog Rules | Primary Precondition Targets | Active Patterns | Fallback Supported |
| :--- | :--- | :--- | :--- | :--- |
| **Tarot** | 3 | `cardCode`, `positionIndex`, `isReversed` | `SPONTANEOUS_INITIATIVE`, `EVALUATION_FRICTION`, `RESISTING_INEVITABLE_PURGE` | Yes (78 cards, orientations, spreads) |
| **Astrology** | 3 | `planets.sun.sign`, `houseNumber`, `aspects.mars_saturn.*` | `PRIME_INITIATOR`, `STEADFAST_HARBOR`, `PRESSURE_ANVIL` | Yes (12 signs, 12 houses, aspects) |
| **Tu Vi** | 3 | `palaceName`, `starCode`, `brightness` | `SOVEREIGN_AUTHORITY`, `PROSPERITY_FLOW`, `INTERNAL_KNOT` | Yes (14 major stars, 12 palaces) |
| **Numerology** | 3 | `results.lifePath.finalValue`, `karmicDebts` | `AUTONOMOUS_TRAILBLAZER`, `DYNAMIC_CATALYST`, `CRUCIBLE_PURIFICATION` | Yes (1–9, 11, 22, 33, karmic debts) |
| **Compatibility** | 3 | `dominantElement`, `lifePath`, cross-system stars | `CONTAINER_AND_FLOW`, `MOMENTUM_PARTNERSHIP`, `BLAZING_FURNACE` | Yes (Cross-system interactions) |
| **Total** | **15** | — | — | **100% Entity Coverage via Fallback** |

---

## 3. Precondition Mechanics & Multi-entity Matching

In `MysticosResultBuilder`, facts are aggregated into multi-value arrays per key (`Map<string, unknown[]>`):
- **Disjunctive Resolution:** When a key has multiple values (e.g. multiple stars in a palace, multiple cards in a spread), rules match if *any* value satisfies the condition.
- **Strict Exclusion:** For `NOT_EQUALS`, all collected values must not match the condition.
- **Relational Operations:** `EQUALS`, `IN`, `CONTAINS`, `BETWEEN`, `LESS_THAN`, and `GREATER_THAN` are verified against domain facts without side effects.

---

## 4. Gap Analysis

1. **Tarot Minor Arcana:** 78 cards currently have semantic profiles in `@mystic/tarot-engine`, but only 3 cards have specific rules in `@mystic/knowledge-base`.
2. **Astrology Major Aspects:** Aspects between outer planets (Uranus, Neptune, Pluto) require dedicated catalog rules.
3. **Tu Vi Combinations:** Special star configurations (Tử Phủ Vũ Tướng, Sát Phá Tham, Cơ Nguyệt Đồng Lương) need combinatorial rules.
4. **Numerology Secondary Numbers:** Attitude, Soul Urge, and Personality numbers need explicit interaction rules with Life Path.

---

## 5. Phased Roadmap to 100% Catalog Rule Coverage

### Phase 1: Core Major Arcana & Luminaries (Milestone: 2026.11)
- Add 22 rules for all Major Arcana cards (Upright and Reversed) in Tarot.
- Add 12 Sun sign + 12 Moon sign rules in Astrology.
- Add 14 Major star placement rules in Mệnh palace in Tu Vi.
- Add rules for Life Path numbers 1 through 9, 11, 22, and 33 in Numerology.
- **Target:** 65 catalog rules.

### Phase 2: Inter-entity Combinations & Aspects (Milestone: 2026.12)
- Add 5 major Ptolemaic aspect rules (Conjunction, Trine, Sextile, Square, Opposition) for personal planets.
- Add Tam Phương Tứ Chính and Hóa Lộc/Hóa Quyền/Hóa Khoa/Hóa Kỵ combination rules in Tu Vi.
- Add 4 suit-level dynamics and Court card rules in Tarot.
- **Target:** 150 catalog rules.

### Phase 3: Comprehensive Traditional Canon (Milestone: 2027.01)
- Full 78 Tarot card rules across 3 spread positions (Past, Present, Future).
- Complete 10 planets × 12 houses matrix in Astrology.
- Full 108 star catalog in Tu Vi Đẩu Số Nam Phái and Trung Châu Phái.
- Full Diamond Chart / Pinnacle cycle rules in Numerology.
- **Target:** 500+ catalog rules with zero fallback invocation required for standard readings.
