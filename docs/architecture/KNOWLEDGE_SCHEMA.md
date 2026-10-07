# Mysticos Knowledge Base Schema Specification

**Status:** Canonical Data Specification  
**Package:** `@mystic/knowledge-base`  
**Authority:** Section 4, Section 5 (`prompt/result.md`), Section 1–8 (`prompt/source.md`)  

---

## 1. Principles of Knowledge Modeling

The Knowledge Base is the authoritative Single Source of Truth for Mysticos. It enforces strict differentiation between:
1. **Bibliographic Sources (`SourceRecord`):** Canonical historical, scholarly, or modern texts.
2. **Atomic Claims (`AtomicClaim`):** Granular, verifiable subject-predicate-object propositions directly cited from texts.
3. **Interpretation Rules (`InterpretationRule`):** Executable precondition logic mapping calculated facts to semantic signals.
4. **Source Conflicts (`SourceConflict`):** Transparent records of genuine doctrinal divergences between classical schools.

> **Absolute Invariant:** The Knowledge Base is **not** a database of generic paragraphs. It stores structured semantic units with immutable bibliographic provenance. No web scraper or generative model output may enter the Knowledge Base without scholarly review.

---

## 2. Bibliographical Source Hierarchy (S0 to S4)

All sources incorporated into Mysticos are strictly categorized according to the authoritative tiering model:

```text
+---------------------------------------------------------------------------------+
| S0 — PRIMARY / CLASSICAL / ORIGINAL FOUNDATIONAL TEXTS                          |
| Foundational treatises forming the bedrock of the discipline.                    |
| Tarot: A.E. Waite (1910)                                                        |
| Astrology: Ptolemy Tetrabiblos (c. 150 CE)                                      |
| Tử Vi: Tử Vi Đẩu Số Toàn Thư (Chính Thống Đạo Tạng)                             |
| Numerology: Nicomachus of Gerasa / Greek Arithmological Corpus                  |
+---------------------------------------------------------------------------------+
                                      |
                                      v
+---------------------------------------------------------------------------------+
| S1 — AUTHORITATIVE SCHOLARLY COMMENTARIES & CRITICAL EDITIONS                   |
| Peer-reviewed translations, university press editions, and academic studies.    |
| Tarot: Decker & Dummett (A History of the Occult Tarot)                         |
| Astrology: Vettius Valens (Anthologies), William Lilly (Christian Astrology)     |
| Tử Vi: Thái Thứ Lang, Phan Tử Ngư, Nguyễn Phát Lộc                              |
| Numerology: D'Olivet, Schimmel (The Mystery of Numbers)                         |
+---------------------------------------------------------------------------------+
                                      |
                                      v
+---------------------------------------------------------------------------------+
| S2 — ESTABLISHED MODERN SCHOOL TEXTS                                            |
| Rigorous modern treatises with systematic, coherent interpretive frameworks.   |
| Tarot: Paul Foster Case, Rachel Pollack (Seventy-Eight Degrees of Wisdom)       |
| Astrology: Robert Hand (Horoscope Symbols), Liz Greene                          |
| Tử Vi: Khâm Thiên Môn (Bắc Phái), Trung Châu Phái (Vương Đình Chi)              |
| Numerology: Juno Jordan, Florence Campbell                                      |
+---------------------------------------------------------------------------------+
                                      |
                                      v
+---------------------------------------------------------------------------------+
| S3 — SECONDARY REFERENCE / ENCYCLOPEDIC / CROSS-CHECK ONLY                      |
| Encyclopedias, historical glossaries, reference manuals.                        |
| Role: Verification of terminology and cross-school indexing only.               |
| Cannot be used as sole backing for core interpretation rules.                   |
+---------------------------------------------------------------------------------+
                                      |
                                      v
+---------------------------------------------------------------------------------+
| S4 — COMMUNITY / BLOG / FORUM / SEO / AI GENERATED (STRICTLY PROHIBITED)         |
| Social media, Reddit, forum threads, SEO content farms, AI hallucinations.      |
| CANNOT BE USED FOR PRODUCTION CLAIMS OR RULES. Discovery only; must verify to S0|
+---------------------------------------------------------------------------------+
```

---

## 3. TypeScript Schema Definitions

### 3.1 `SourceRecord`
Defined in `packages/knowledge-base/src/types/source.ts`:

```typescript
export type SourceLevel = 'S0' | 'S1' | 'S2' | 'S3' | 'S4';
export type DomainType = 'tarot' | 'tuvi' | 'astrology' | 'numerology' | 'compatibility';

export interface SourceRecord {
  /** Unique immutable identifier (e.g., 'SRC_TAROT_WAITE_1910') */
  sourceId: string;
  /** Primary mystical domain */
  domain: DomainType;
  /** Complete bibliographic work title */
  title: string;
  /** Primary author or compiler */
  author?: string;
  /** Publishing house or academic press */
  publisher?: string;
  /** Specific edition or critical release */
  edition?: string;
  /** Original or edition publication year */
  publicationYear?: number;
  /** Permanent digital archival link (e.g. Internet Archive, CTP) */
  url?: string;
  /** Source hierarchy tier */
  sourceLevel: SourceLevel;
  /** Lineage or historical tradition (e.g., 'Hellenistic', 'Rider-Waite-Smith') */
  tradition?: string;
  /** Specific sub-school (e.g., 'Bắc Phái', 'Nam Phái', 'Pythagorean') */
  school?: string;
  /** Primary language of the cited edition */
  language?: string;
  /** Specific cited chapter */
  chapter?: string;
  /** Specific cited page range */
  page?: string;
  /** ISO date when metadata was verified */
  accessDate: string;
  /** Scholarly notes and historical context */
  notes?: string;
}
```

### 3.2 `AtomicClaim`
Defined in `packages/knowledge-base/src/types/claim.ts`:

```typescript
export interface ClaimLocation {
  chapter?: string;
  section?: string;
  page?: string;
}

export interface AtomicClaim {
  /** Unique claim identifier (e.g., 'CLM_TAROT_THE_FOOL_01') */
  claimId: string;
  /** Foreign key pointing to authenticated SourceRecord */
  sourceId: string;
  /** Mystical domain */
  domain: DomainType;
  /** Target subject (e.g., 'the_fool', 'tu_vi_star', 'sun_in_aries') */
  subject: string;
  /** Propositional relation (e.g., 'signifies', 'exalts_in', 'generates_tension_with') */
  predicate: string;
  /** Conceptual object (e.g., 'unconscious_potential', 'sovereign_authority') */
  object: string;
  /** Contextual qualifier (e.g., 'upright_orientation', 'menh_palace') */
  context?: string;
  /** Inherent affective polarity */
  polarity?: 'supportive' | 'challenging' | 'neutral' | 'mixed';
  /** Verbatim excerpt from primary text */
  quotation?: string;
  /** Exacting analytical paraphrase */
  paraphrase: string;
  /** Exact bibliographic location within the source */
  location?: ClaimLocation;
  /** Calibrated confidence rating (0.0 to 1.0) */
  sourceConfidence: number;
}
```

### 3.3 `SourceConflict`
Defined in `packages/knowledge-base/src/types/conflict.ts`:

```typescript
export type ConflictType =
  | 'different_school'
  | 'different_era'
  | 'different_definition'
  | 'true_contradiction';

export type ConflictResolution =
  | 'keep_separate'
  | 'school_specific'
  | 'prefer_primary'
  | 'requires_user_choice'
  | 'exclude';

export interface SourceConflict {
  /** Unique conflict tracking identifier (e.g., 'CONF_TUVI_HOA_KY_CAN_CANH') */
  conflictId: string;
  /** Core conceptual topic of debate */
  topic: string;
  /** Array of conflicting SourceRecord identifiers */
  sources: string[];
  /** Name of first tradition/school */
  schoolA: string;
  /** Name of second tradition/school */
  schoolB: string;
  /** Proposition asserted by School A */
  claimA: string;
  /** Proposition asserted by School B */
  claimB: string;
  /** Categorization of conflict etiology */
  conflictType: ConflictType;
  /** Systematic resolution policy */
  resolution: ConflictResolution;
  /** Explanatory commentary on the historical dispute */
  notes?: string;
}
```

---

## 4. Domain Knowledge Inventories

### 4.1 Western Astrology Canon
- **Primary Sources (S0):**
  - Claudius Ptolemy: *Tetrabiblos* (c. 150 CE, Frank Egleston Robbins Translation, Loeb Classical Library).
  - Vettius Valens: *Anthologies* (c. 175 CE, Mark Riley Translation).
  - William Lilly: *Christian Astrology* (1647, Regulus Publishing).
- **Core Claims Extracted:**
  - Planetary Essential Dignities (Ptolemaic table of Domiciles, Exaltations, Triplicities, Terms, and Faces).
  - Major Ptolemaic Aspects: Conjunction ($0^\circ$), Sextile ($60^\circ$), Square ($90^\circ$), Trine ($120^\circ$), Opposition ($180^\circ$) with classical moiety orbs.
  - Classical House Joy placements (Mercury in 1st, Moon in 3rd, Venus in 5th, Mars in 6th, Sun in 9th, Jupiter in 11th, Saturn in 12th).

### 4.2 Tarot Canon
- **Primary Sources (S0):**
  - Arthur Edward Waite: *The Pictorial Key to the Tarot* (1910, William Rider & Son, London).
- **Secondary Scholarly Sources (S1/S2):**
  - Paul Foster Case: *The Tarot: A Key to the Wisdom of the Ages* (1947, Macoy Publishing).
  - Rachel Pollack: *Seventy-Eight Degrees of Wisdom* (1980, Thorsons).
- **Core Claims Extracted:**
  - 22 Major Arcana core symbolic keys, Hebrew attributions, and psychological polarities.
  - 56 Minor Arcana suit elemental affiliations (Wands: Fire, Cups: Water, Swords: Air, Pentacles: Earth).
  - Card orientation modifications (Upright = unblocked direct expression; Reversed = delayed, internalized, or obstructed expression).

### 4.3 Tử Vi Đẩu Số Canon
- **Primary Sources (S0):**
  - Vạn Cung Thương / Trần Đoàn: *Tử Vi Đẩu Số Toàn Thư* (Bản dịch từ Chính Thống Đạo Tạng).
- **Authoritative Commentaries (S1):**
  - Thái Thứ Lang: *Tử Vi Đẩu Số Tân Biên* (1954, Tủ sách Khai Trí).
  - Phan Tử Ngư: *Tử Vi Nghiên Cứu & Trọng Điểm Đoán Mệnh* (Bắc Kinh, 1988).
  - Nguyễn Phát Lộc: *Tử Vi Hàm Số* (1974).
- **Core Claims Extracted:**
  - 14 Chính Tinh miếu, vượng, đắc, hãm và ngũ hành tương sinh tương khắc.
  - Tứ Hóa can chi (Hóa Khoa, Hóa Quyền, Hóa Lộc, Hóa Kỵ) với ghi nhận minh bạch dị biệt giữa các phái.
  - Lục Sát Tinh (Kình Dương, Đà La, Hỏa Tinh, Linh Tinh, Địa Không, Địa Kiếp) và Lục Cát Tinh.

### 4.4 Thần Số Học (Pythagorean Arithmology) Canon
- **Primary Sources (S0):**
  - Nicomachus of Gerasa: *Theologumena Arithmeticae* (Bản dịch Robin Waterfield, Phanes Press).
- **Authoritative System Builders (S2):**
  - Juno Jordan: *The Romance in Your Name* (1965) & *Numerology for the New Age*.
  - Florence Campbell: *Your Days Are Numbered* (1931).
- **Core Claims Extracted:**
  - Chữ số nền tảng 1 đến 9: Đặc tính số học, hình học thiêng và phân cực âm/dương.
  - Master Numbers 11, 22, 33: Tần số rung động bậc cao và điện thế năng lượng.
  - Karmic Debt numbers 13/4, 14/5, 16/7, 19/1: Cơ chế nợ nghiệp và giải tỏa.

---

## 5. Automated Validation & Audit Rules

The Knowledge Base enforces strict automated linting through `packages/knowledge-base/src/validators/`:

1. **`validateProvenance`:**
   - Every `InterpretationRule` must reference valid `sourceIds` present in the source registry.
   - Every `claimId` linked to a rule must exist and belong to the specified source.
   - Builds fail if any orphaned reference is encountered.

2. **`antiGenericAudit`:**
   - Rejects boilerplate phrases (e.g., "you are a very unique person", "success is coming your way", "stay positive").
   - Ensures claims contain domain-specific symbolic terminology and structural rigor.

3. **`locationIntegrityCheck`:**
   - All S0 and S1 claims must specify at least one location attribute (`chapter`, `section`, or `page`).
