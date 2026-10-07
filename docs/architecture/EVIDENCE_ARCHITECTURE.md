# Mysticos Evidence Architecture & Provenance Tracing

**Status:** Canonical Evidence Specification  
**Authority:** Section 15, Section 24, Section 33 (`prompt/result.md`), Section 8 (`prompt/source.md`)  

---

## 1. Principles of the Evidence Graph

In traditional automated mystical applications, readings are generated as arbitrary black-box prose or LLM hallucinations. Mysticos operates on an uncompromising counter-principle:

> **Every assertion, pattern, and recommendation must be backed by a directed, acyclic evidence graph connecting observable facts to specific passages in authoritative classical treatises.**

If an assertion cannot be traced to an approved historical claim in `@mystic/knowledge-base`, it is classified as **Unverified (Level F)** and strictly suppressed from production interpretation pipelines.

---

## 2. Evidence Graph Topology & Schema

The Evidence Graph models relationships as typed nodes and directed edges:

```text
[ FACT / OBSERVABLE ]
        |
        | (satisfies preconditions)
        v
[ INTERPRETATION RULE ]
        |
        | (substantiated by)
        v
[ ATOMIC CLAIM ]
        |
        | (cited from)
        v
[ SOURCE RECORD ]
        |
        | (located at)
        v
[ BIBLIOGRAPHIC LOCATION ] (Chapter, Section, Page)
```

### Node Typology:
1. **Fact Node ($N_F$):** Computed astronomical or symbolic datum (e.g. `planets.sun.sign = "Aries"`).
2. **Rule Node ($N_R$):** Declarative precondition logic defined in `@mystic/knowledge-base`.
3. **Claim Node ($N_C$):** Granular historical statement extracted verbatim or paraphrased from literature.
4. **Source Node ($N_S$):** Authoritative bibliographic work (S0, S1, S2).
5. **Location Node ($N_L$):** Specific coordinates within the physical or digital text (e.g. Book I, Chap. 19, p. 84).

---

## 3. Provenance Tracing Engine (`ProvenanceTracer`)

The `ProvenanceTracer` class (`packages/knowledge-base/src/registry/provenance-tracer.ts`) resolves complete lineage trees at runtime:

```typescript
export interface TraceableProvenanceResult {
  ruleId: string;
  domain: string;
  school: string;
  evidenceLevel: EvidenceLevel;
  confidence: string;
  pattern?: string;
  rule: InterpretationRule;
  claims: AtomicClaim[];
  sources: SourceRecord[];
}
```

### 3.1 Tracing Resolution Algorithm:
1. Lookup `ruleId` in `KnowledgeStore`.
2. Retrieve all linked `claimIds` referenced by the rule.
3. Retrieve all parent `sourceIds` referenced by both the rule and associated claims.
4. Assemble compound citations incorporating author, work, publication year, chapter, section, and page number.

### 3.2 Canonical Footnote Formatting:
The system formats standard scholarly footnotes according to the format:

```text
Rule: {ruleId} [Level {evidenceLevel}] | Nguồn: {title} ({author}, {year}) | Vị trí: {chapter}, {section}, {page}
```

**Concrete Example:**
```text
Rule: RUL_ASTRO_SUN_ARIES_1ST [Level A] | Nguồn: Tetrabiblos (Claudius Ptolemy, c. 150 CE) | Vị trí: Book I, Chapter 19
```

---

## 4. Evidence Levels & Verification Weights

Evidence quality determines the algorithmic weight of signals and patterns:

| Level | Classification | Backing Criteria | Base Weight Modifier |
| :---: | :--- | :--- | :---: |
| **A** | **Strongly Supported** | Concordant S0 foundational classical texts | $\times 1.25$ |
| **B** | **Supported** | Authoritative S1 scholarly commentaries | $\times 1.10$ |
| **C** | **School-Specific** | Established S2 single-tradition doctrines | $\times 1.00$ |
| **D** | **Modern Extension** | Contemporary 20th-century literature | $\times 0.85$ |
| **E** | **Mysticos-Derived** | Multi-rule logical deduction with explicit audit trail | $\times 0.75$ |
| **F** | **Unverified** | Blogs, forums, SEO content, generative AI | **REJECTED (0.00)** |

---

## 5. WhyPanel UI Contract & Transparent Reasoning

The `WhyPanel` component (`apps/web/components/WhyPanel.tsx`) renders the evidence graph interactively for end users, allowing them to inspect exactly why any given statement was reached.

### 5.1 5-Stage Transparency Breadcrumb:
Users can expand any interpretation to reveal:
1. **Observable Fact:** The exact mathematical coordinates that triggered the rule (e.g. Sun at $0^\circ 27'$ Aries in House 1).
2. **Applied Rule:** The rule identifier, priority score, and school attribution.
3. **Derived Signals:** The polarity, strength, and life dimension assigned to the force.
4. **Active Patterns:** How this signal clustered with other chart dynamics.
5. **Bibliographical Citation:** The exact classical book, chapter, and page backing the claim.

### 5.2 Editorial Design Compliance:
- Rendered in dark archival styling (`#111110` background, `#282724` hairline border).
- Classical typography (`JetBrains Mono` for rule IDs and coordinates, `Lora` for citations).
- Prohibits obfuscated or deceptive "confidence meters" (e.g. "87% compatibility match"). Replaces them with transparent citation badges (`Level A: Thư Tịch Cổ`).
